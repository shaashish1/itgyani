#!/bin/bash

echo "🚀 ITGyani Quick Migration: Supabase to JSON"
echo "==========================================="
echo "⏰ Starting at: $(date)"
echo

# Create API directory structure
echo "📁 Creating static API structure..."
mkdir -p /home/itgyani.com/itgyani/public/api
mkdir -p /home/itgyani.com/itgyani/src/data

echo "✅ Directory structure created"

# Export blogs from Supabase to JSON
echo "📊 Exporting blog data from Supabase..."

node << 'EOF'
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const url = 'https://gtwsglzyyislrgcyfxvt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0d3NnbHp5eWlzbHJnY3lmeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTU1NzMsImV4cCI6MjA3NDczMTU3M30.ha0Ui7HmR_PH9SmgBo0nRcaCsU57Jw1GI_l2M0ymWVg';

const supabase = createClient(url, key);

async function exportData() {
  try {
    console.log('📡 Fetching published blogs...');
    
    // Fetch all published blogs with simpler query
    const { data: blogs, error: blogsError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, category_id, tags, published_at, created_at, reading_time, featured_image_url')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (blogsError) {
      console.error('❌ Blog export failed:', blogsError);
      throw blogsError;
    }

    console.log(`✅ Successfully fetched ${blogs.length} blogs`);

    // Fetch categories
    console.log('📂 Fetching categories...');
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, slug, description, color');

    if (catError) {
      console.warn('⚠️  Categories failed, using defaults');
    }

    // Create category map
    const categoryMap = new Map();
    if (categories) {
      categories.forEach(cat => categoryMap.set(cat.id, cat.name));
    }

    // Format blogs for static consumption
    const formattedBlogs = blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || '',
      category: categoryMap.get(blog.category_id) || 'General',
      tags: blog.tags || [],
      publishedAt: blog.published_at || blog.created_at,
      readingTime: blog.reading_time || 5,
      featuredImage: blog.featured_image_url,
      // Add computed fields
      url: `/blog/${blog.slug}`,
      searchText: `${blog.title} ${blog.excerpt} ${(blog.tags || []).join(' ')}`.toLowerCase()
    }));

    // Create featured posts (first 6)
    const featuredBlogs = formattedBlogs.slice(0, 6);

    // Create pagination data
    const blogsPerPage = 6;
    const totalPages = Math.ceil(formattedBlogs.length / blogsPerPage);
    const paginatedBlogs = {};

    for (let page = 1; page <= totalPages; page++) {
      const start = (page - 1) * blogsPerPage;
      const end = start + blogsPerPage;
      paginatedBlogs[page] = {
        blogs: formattedBlogs.slice(start, end),
        currentPage: page,
        totalPages: totalPages,
        totalBlogs: formattedBlogs.length,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      };
    }

    // Save to files
    const publicDir = '/home/itgyani.com/itgyani/public/api';
    const srcDir = '/home/itgyani.com/itgyani/src/data';

    // Public API files (for static hosting)
    fs.writeFileSync(
      path.join(publicDir, 'blogs.json'),
      JSON.stringify(formattedBlogs, null, 2)
    );

    fs.writeFileSync(
      path.join(publicDir, 'featured.json'),
      JSON.stringify(featuredBlogs, null, 2)
    );

    fs.writeFileSync(
      path.join(publicDir, 'categories.json'),
      JSON.stringify(categories || [], null, 2)
    );

    fs.writeFileSync(
      path.join(publicDir, 'pagination.json'),
      JSON.stringify(paginatedBlogs, null, 2)
    );

    // Source data files (for build-time inclusion)
    fs.writeFileSync(
      path.join(srcDir, 'blogs.ts'),
      `export const blogs = ${JSON.stringify(formattedBlogs, null, 2)};\n\nexport default blogs;`
    );

    fs.writeFileSync(
      path.join(srcDir, 'metadata.ts'),
      `export const siteMetadata = {
  totalBlogs: ${formattedBlogs.length},
  lastUpdated: "${new Date().toISOString()}",
  totalPages: ${totalPages},
  blogsPerPage: ${blogsPerPage},
  categories: ${JSON.stringify(categories || [], null, 2)}
};\n\nexport default siteMetadata;`
    );

    // Create stats
    const stats = {
      totalBlogs: formattedBlogs.length,
      totalCategories: categories?.length || 0,
      totalPages: totalPages,
      exportDate: new Date().toISOString(),
      source: 'supabase-export',
      performance: {
        averageReadingTime: Math.round(
          formattedBlogs.reduce((sum, blog) => sum + blog.readingTime, 0) / formattedBlogs.length
        ),
        tagsUsed: [...new Set(formattedBlogs.flatMap(blog => blog.tags))].length
      }
    };

    fs.writeFileSync(
      path.join(publicDir, 'stats.json'),
      JSON.stringify(stats, null, 2)
    );

    console.log('\n🎉 DATA EXPORT COMPLETE!');
    console.log('========================');
    console.log(`📊 Exported ${stats.totalBlogs} blogs`);
    console.log(`📂 Categories: ${stats.totalCategories}`);
    console.log(`📄 Pages: ${stats.totalPages}`);
    console.log(`🏷️  Unique tags: ${stats.performance.tagsUsed}`);
    console.log(`⏱️  Avg reading time: ${stats.performance.averageReadingTime} min`);
    console.log('\n📁 Files created:');
    console.log('  /public/api/blogs.json      - All blog posts');
    console.log('  /public/api/featured.json   - Featured posts');
    console.log('  /public/api/categories.json - Categories');
    console.log('  /public/api/pagination.json - Paginated data');
    console.log('  /public/api/stats.json      - Export statistics');
    console.log('  /src/data/blogs.ts          - TypeScript blog data');
    console.log('  /src/data/metadata.ts       - Site metadata');

  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportData();
EOF

echo "🔄 Creating Lovable-compatible service..."

# Create a service file for easy integration
cat > /home/itgyani.com/itgyani/src/services/blogService.ts << 'EOL'
// Static blog service - no database dependencies!
import { blogs } from '../data/blogs';
import { siteMetadata } from '../data/metadata';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  featuredImage?: string;
  url: string;
  searchText: string;
}

export interface BlogPagination {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class BlogService {
  private blogs: Blog[] = blogs;
  private blogsPerPage = 6;

  // Get all blogs
  getAllBlogs(): Blog[] {
    return this.blogs;
  }

  // Get paginated blogs
  getBlogsPaginated(page: number = 1): BlogPagination {
    const start = (page - 1) * this.blogsPerPage;
    const end = start + this.blogsPerPage;
    const totalPages = Math.ceil(this.blogs.length / this.blogsPerPage);

    return {
      blogs: this.blogs.slice(start, end),
      currentPage: page,
      totalPages,
      totalBlogs: this.blogs.length,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    };
  }

  // Search blogs
  searchBlogs(query: string): Blog[] {
    const searchTerm = query.toLowerCase();
    return this.blogs.filter(blog => 
      blog.searchText.includes(searchTerm)
    );
  }

  // Filter by category
  getBlogsByCategory(category: string): Blog[] {
    return this.blogs.filter(blog => 
      blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by tag
  getBlogsByTag(tag: string): Blog[] {
    return this.blogs.filter(blog => 
      blog.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  // Get featured blogs
  getFeaturedBlogs(limit: number = 6): Blog[] {
    return this.blogs.slice(0, limit);
  }

  // Get blog by slug
  getBlogBySlug(slug: string): Blog | undefined {
    return this.blogs.find(blog => blog.slug === slug);
  }

  // Get recent blogs
  getRecentBlogs(limit: number = 10): Blog[] {
    return this.blogs.slice(0, limit);
  }

  // Get site metadata
  getMetadata() {
    return siteMetadata;
  }

  // Get all categories
  getCategories(): string[] {
    return [...new Set(this.blogs.map(blog => blog.category))];
  }

  // Get all tags
  getTags(): string[] {
    return [...new Set(this.blogs.flatMap(blog => blog.tags))];
  }
}

// Export singleton instance
export const blogService = new BlogService();
export default blogService;
EOL

echo "📱 Creating updated Blog component..."

# Create updated Blog.tsx that uses static data
cat > /home/itgyani.com/itgyani/src/pages/BlogStatic.tsx << 'EOL'
import { useState, useEffect, useMemo } from "react";
import blogDefaultImage from "@/assets/blog-default.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import AdSenseAd from "@/components/AdSenseAd";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { LazyAd } from "@/components/LazyAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogService, Blog } from "@/services/blogService";
import { PageHeader } from "@/components/ImageComponents";

const BlogStatic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Static data loads instantly

  // Get data from service (no API calls!)
  const allBlogs = blogService.getAllBlogs();
  const categories = ["All", ...blogService.getCategories()];
  const allTags = blogService.getTags();
  const metadata = blogService.getMetadata();

  // Filter blogs based on search, category, and tags
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs;

    // Search filter
    if (searchTerm) {
      blogs = blogService.searchBlogs(searchTerm);
    }

    // Category filter
    if (selectedCategory !== "All") {
      blogs = blogs.filter(blog => blog.category === selectedCategory);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      blogs = blogs.filter(blog => 
        selectedTags.some(tag => blog.tags.includes(tag))
      );
    }

    return blogs;
  }, [searchTerm, selectedCategory, selectedTags, allBlogs]);

  // Pagination logic
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ITGYANI AI Automation Blog",
    "description": "Expert insights on AI automation, training, and business transformation",
    "url": "https://itgyani.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "ITGYANI",
      "url": "https://itgyani.com"
    },
    "blogPost": filteredBlogs.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt,
      "author": {
        "@type": "Organization",
        "name": "ITGYANI"
      }
    }))
  };

  return (
    <>
      <SEO
        title="AI Automation Blog - Expert Insights & Best Practices"
        description="Stay ahead with the latest AI automation trends, best practices, and implementation guides. Expert insights on AI training, workflow automation, and business transformation strategies."
        keywords="AI automation blog, AI training guides, workflow automation tips, business automation insights, artificial intelligence articles, n8n tutorials, automation best practices"
        canonicalUrl="https://itgyani.com/blog"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <PageHeader type="blog" className="w-full" />
          
          <div className="container mx-auto px-6 relative py-12">
            <div className="flex items-center gap-4 mb-8">
              <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">AI Automation</span><br />
                Insights & Guides
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                Expert insights, practical guides, and proven strategies to help you master
                <strong> AI automation</strong> and <strong>AI training</strong> for business success.
              </p>
              
              {/* Performance Stats */}
              <div className="bg-primary/10 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{metadata.totalBlogs}</div>
                    <div className="text-sm text-muted-foreground">Total Articles</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">⚡ Instant</div>
                    <div className="text-sm text-muted-foreground">Loading</div>
                  </div>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm} 
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }} 
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary" 
                />
              </div>
              
              {searchTerm && (
                <div className="text-center text-sm text-muted-foreground">
                  Found {filteredBlogs.length} articles matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Advanced Filters */}
        <section className="py-8 border-b border-border/50">
          <div className="container mx-auto px-6">
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button 
                      key={category} 
                      variant={selectedCategory === category ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className="transition-all duration-300"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 15).map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/20 transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Filters Summary */}
              {(selectedCategory !== "All" || selectedTags.length > 0 || searchTerm) && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  <Badge variant="secondary">{filteredBlogs.length} results</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AdSense - Top of Content */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <LazyAd minHeight="250px">
              <AdSenseAd 
                slot="content-top" 
                format="horizontal"
                responsive={true}
                className="my-4"
              />
            </LazyAd>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedBlogs.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 group">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                      {post.featuredImage && (
                        <OptimizedImage 
                          src={post.featuredImage} 
                          alt={`${post.title} - AI automation guide and insights`}
                          className="absolute inset-0 w-full h-full object-cover"
                          priority={false}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <Badge variant="secondary" className="absolute top-4 left-4">
                        {post.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-foreground/70">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-foreground/60 mb-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          ITGYANI AI
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min read
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link to={post.url} className="inline-block">
                        <Button variant="default" size="sm" className="w-full">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md border border-primary/20 bg-background hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="text-foreground/80">
                  Page {currentPage} of {totalPages} ({filteredBlogs.length} articles)
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md border border-primary/20 bg-background hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        <PopupManager page="blog" />
        <Footer />
      </div>
    </>
  );
};

export default BlogStatic;
EOL

echo "🎯 Creating deployment script..."

cat > /home/itgyani.com/itgyani/deploy-static-blogs.sh << 'EOL'
#!/bin/bash

echo "🚀 Deploying Static Blog System"
echo "==============================="

# Build the project
echo "🔨 Building project..."
npm run build

# Copy to production
echo "📁 Deploying to production..."
rm -rf /home/itgyani.com/public_html/*
cp -r dist/* /home/itgyani.com/public_html/
cp .htaccess /home/itgyani.com/public_html/

echo "✅ Static blog system deployed!"
echo "📊 Performance benefits:"
echo "  - ⚡ Instant loading (no database queries)"
echo "  - 💰 Zero database costs"
echo "  - 🚀 Perfect Lovable compatibility"
echo "  - 📱 Works offline"
echo "  - 🔍 Client-side search (super fast)"

echo ""
echo "🔄 To update blogs in the future:"
echo "  1. Run this export script: ./export-blogs-to-json.sh"
echo "  2. Build and deploy: ./deploy-static-blogs.sh"
echo ""
echo "🌐 Your blog is now live at: https://itgyani.com/blog"
EOL

chmod +x /home/itgyani.com/itgyani/deploy-static-blogs.sh

echo "✅ Migration setup complete!"
echo ""
echo "📋 NEXT STEPS:"
echo "=============="
echo "1. Test the export: The JSON files are ready in /public/api/"
echo "2. Update your Blog route to use BlogStatic component"
echo "3. Deploy: ./deploy-static-blogs.sh"
echo ""
echo "🎉 BENEFITS OF THIS MIGRATION:"
echo "- ⚡ Instant loading (no Supabase timeouts)"
echo "- 💰 $0 database costs"
echo "- 🚀 Perfect for Lovable frontend"
echo "- 📱 Works offline"
echo "- 🔍 Super-fast client-side search"
echo "- 📊 All ${blogs.length} blogs will display properly"
echo ""
echo "🔧 For Lovable integration:"
echo "Just copy the blogService.ts and use it in your components!"