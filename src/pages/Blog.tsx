import { useState, useEffect } from "react";
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
import { ArrowLeft, Search, Calendar, Clock, User, TrendingUp, Brain, Zap, Target, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ReadMeButton, BlogThumbnail, PageHeader } from "@/components/ImageComponents";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  metaDescription: string;
  readingTime: number;
  featured_image_url?: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Load real blog posts from storage
  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      
      // Performance-optimized query - fetch only fields needed for blog list display
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category_id, tags, published_at, created_at, reading_time, featured_image_url')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(50); // Reduced limit to prevent timeout - load more via pagination

      if (error) {
        console.error('Error loading blog posts:', error);
        setBlogPosts(getDemoBlogPosts());
        setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
      } else if (data && data.length > 0) {
        // Fetch categories separately in a lighter query (don't fail if categories fail)
        const categoryIds = [...new Set(data.map(p => p.category_id).filter(Boolean))];
        let categoryMap = new Map<string, string>();
        
        if (categoryIds.length > 0) {
          const { data: categoriesData, error: catError } = await supabase
            .from('categories')
            .select('id, name, slug')
            .in('id', categoryIds);
          
          if (catError) {
            console.warn('Categories fetch failed, using defaults:', catError);
          } else {
            categoryMap = new Map(categoriesData?.map(c => [c.id, c.name]) || []);
          }
        }
        
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: '',
          excerpt: post.excerpt || '',
          author_id: 'itgyani-ai', // Default author for all posts
          category: categoryMap.get(post.category_id) || 'General',
          tags: post.tags || [],
          publishedAt: new Date(post.published_at || post.created_at),
          updatedAt: new Date(post.created_at), // Use created_at since updated_at not fetched
          status: 'published' as 'published', // All fetched posts are published
          metaDescription: post.title, // Use title as meta description fallback
          readingTime: post.reading_time || 5,
          featured_image_url: post.featured_image_url
        }));
        
        console.log(`✅ Loaded ${formattedPosts.length} published posts`);
        setBlogPosts(formattedPosts);
        setFeaturedPosts(formattedPosts.slice(0, 3));
        
        // Extract unique tags
        const tags = new Set<string>();
        formattedPosts.forEach(post => {
          post.tags?.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
      } else {
        // No posts found, use demo posts
        const demoPosts = getDemoBlogPosts();
        setBlogPosts(demoPosts);
        setFeaturedPosts(demoPosts.slice(0, 3));
        
        // Extract tags from demo posts
        const tags = new Set<string>();
        demoPosts.forEach(post => {
          post.tags?.forEach(tag => tags.add(tag));
        });
        setAllTags(Array.from(tags).sort());
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setBlogPosts(getDemoBlogPosts());
      setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  // Demo content for when no AI-generated posts exist yet
  const getDemoBlogPosts = (): BlogPost[] => [{
    id: "demo-1",
    title: "The Ultimate Guide to AI Automation in 2025: Transform Your Business",
    slug: "ai-automation-guide-2025",
    content: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI...",
    excerpt: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI.",
    author_id: "demo-author",
    category: "technology",
    tags: ["AI Automation", "Business Transformation", "ROI", "Strategy"],
    publishedAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
    status: "published",
    metaDescription: "Complete guide to AI automation in 2025 with practical implementation strategies and ROI calculation methods.",
    readingTime: 12,
    featured_image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop"
  }, {
    id: "demo-2",
    title: "Building Intelligent Business Workflows with n8n and AI",
    slug: "intelligent-workflows-n8n-ai",
    content: "Learn how to create powerful business workflows that combine n8n automation with AI capabilities for maximum efficiency...",
    excerpt: "Learn how to create powerful business workflows that combine n8n automation with AI capabilities for maximum efficiency.",
    author_id: "demo-author",
    category: "automation",
    tags: ["n8n", "Workflows", "AI Integration", "Business Automation"],
    publishedAt: new Date("2025-01-12"),
    updatedAt: new Date("2025-01-12"),
    status: "published",
    metaDescription: "Master n8n workflow automation with AI integration for intelligent business processes.",
    readingTime: 9,
    featured_image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop"
  }, {
    id: "demo-3",
    title: "Digital Transformation Success Stories: Real ROI from AI Implementation",
    slug: "digital-transformation-ai-roi",
    content: "Explore real-world case studies showing how businesses achieved significant ROI through strategic AI implementation...",
    excerpt: "Explore real-world case studies showing how businesses achieved significant ROI through strategic AI implementation.",
    author_id: "demo-author",
    category: "business",
    tags: ["Digital Transformation", "Case Studies", "ROI", "AI Implementation"],
    publishedAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-01-10"),
    status: "published",
    metaDescription: "Real case studies of digital transformation success with AI implementation and measurable ROI.",
    readingTime: 11,
    featured_image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
  }, {
    id: "demo-4",
    title: "AI in Healthcare: Revolutionizing Patient Care and Diagnostics",
    slug: "ai-healthcare-revolution",
    content: "Explore how AI is transforming healthcare with advanced diagnostics, personalized treatment plans, and improved patient outcomes...",
    excerpt: "Explore how AI is transforming healthcare with advanced diagnostics, personalized treatment plans, and improved patient outcomes.",
    author_id: "demo-author",
    category: "industry",
    tags: ["Healthcare", "AI Diagnostics", "Patient Care", "Medical Technology"],
    publishedAt: new Date("2025-01-08"),
    updatedAt: new Date("2025-01-08"),
    status: "published",
    metaDescription: "Discover how AI is revolutionizing healthcare through advanced diagnostics and personalized patient care.",
    readingTime: 10,
    featured_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop"
  }, {
    id: "demo-5",
    title: "Manufacturing 4.0: Smart Factories Powered by AI",
    slug: "manufacturing-ai-smart-factories",
    content: "Learn how AI-driven manufacturing is increasing productivity by 40% through predictive maintenance, quality control, and optimization...",
    excerpt: "Learn how AI-driven manufacturing is increasing productivity by 40% through predictive maintenance, quality control, and optimization.",
    author_id: "demo-author",
    category: "industry",
    tags: ["Manufacturing", "Industry 4.0", "Smart Factories", "AI Optimization"],
    publishedAt: new Date("2025-01-06"),
    updatedAt: new Date("2025-01-06"),
    status: "published",
    metaDescription: "Discover how AI is transforming manufacturing with smart factories and predictive maintenance systems.",
    readingTime: 8,
    featured_image_url: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&auto=format&fit=crop"
  }, {
    id: "demo-6",
    title: "Create Custom AI Models: A Beginner's Guide to AI Studio",
    slug: "ai-studio-beginner-guide",
    content: "Master the art of creating custom AI models with our comprehensive AI Studio guide, from data preparation to model deployment...",
    excerpt: "Master the art of creating custom AI models with our comprehensive AI Studio guide, from data preparation to model deployment.",
    author_id: "demo-author",
    category: "ai studio",
    tags: ["AI Studio", "Machine Learning", "Model Training", "Custom AI"],
    publishedAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
    status: "published",
    metaDescription: "Complete beginner's guide to creating custom AI models using AI Studio platform.",
    readingTime: 15,
    featured_image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop"
  }, {
    id: "demo-7",
    title: "Advanced AI Model Training: Optimization Techniques",
    slug: "advanced-ai-model-optimization",
    content: "Deep dive into advanced techniques for optimizing AI models, including hyperparameter tuning, transfer learning, and performance optimization...",
    excerpt: "Deep dive into advanced techniques for optimizing AI models, including hyperparameter tuning, transfer learning, and performance optimization.",
    author_id: "demo-author",
    category: "ai studio",
    tags: ["Model Optimization", "AI Training", "Deep Learning", "Performance"],
    publishedAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
    status: "published",
    metaDescription: "Advanced techniques for optimizing AI models with proven strategies for better performance.",
    readingTime: 13,
    featured_image_url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop"
  }, {
    id: "demo-8",
    title: "E-commerce AI: Personalizing Customer Experiences at Scale",
    slug: "ecommerce-ai-personalization",
    content: "Discover how leading e-commerce brands use AI to deliver personalized shopping experiences that increase conversion rates by 35%...",
    excerpt: "Discover how leading e-commerce brands use AI to deliver personalized shopping experiences that increase conversion rates by 35%.",
    author_id: "demo-author",
    category: "industry",
    tags: ["E-commerce", "Personalization", "Customer Experience", "AI Retail"],
    publishedAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
    status: "published",
    metaDescription: "Learn how AI is revolutionizing e-commerce through personalized customer experiences.",
    readingTime: 9,
    featured_image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop"
  }];
  const categories = ["All", "Technology", "Business", "Automation", "Industry", "AI Studio"];

  // Filter posts based on search, category, tags, and date range
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
    
    const matchesDateRange = (!dateRange.from || post.publishedAt >= dateRange.from) &&
                            (!dateRange.to || post.publishedAt <= dateRange.to);
    
    return matchesSearch && matchesCategory && matchesTags && matchesDateRange;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTags([]);
    setDateRange({});
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
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
    "blogPost": filteredPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.publishedAt.toISOString(),
      "dateModified": post.updatedAt.toISOString(),
      "author": {
        "@type": "Organization",
        "name": "ITGYANI"
      }
    }))
  };

  return <>
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
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-input/50 border-border/50 focus:border-primary" />
              </div>
              
              <div className="text-center">
                <Button onClick={loadBlogPosts} variant="outline" size="sm">
                  Refresh Posts
                </Button>
              </div>
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
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Tags</h3>
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

              {/* Date Range Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Date Range</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={!dateRange.from && !dateRange.to ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setDateRange({});
                      setCurrentPage(1);
                    }}
                  >
                    All Time
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const lastWeek = new Date(today);
                      lastWeek.setDate(today.getDate() - 7);
                      setDateRange({ from: lastWeek, to: today });
                      setCurrentPage(1);
                    }}
                  >
                    Last 7 Days
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const lastMonth = new Date(today);
                      lastMonth.setMonth(today.getMonth() - 1);
                      setDateRange({ from: lastMonth, to: today });
                      setCurrentPage(1);
                    }}
                  >
                    Last 30 Days
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const today = new Date();
                      const lastYear = new Date(today);
                      lastYear.setFullYear(today.getFullYear() - 1);
                      setDateRange({ from: lastYear, to: today });
                      setCurrentPage(1);
                    }}
                  >
                    Last Year
                  </Button>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(selectedCategory !== "All" || selectedTags.length > 0 || dateRange.from || dateRange.to) && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  <Badge variant="secondary">{filteredPosts.length} results</Badge>
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

        {/* AdSense - Top of Content (Lazy Loaded) */}
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
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden border-border/50">
                    <Skeleton className="aspect-video w-full" />
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-2/3 mt-1" />
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-9 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 group">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    {post.featured_image_url && (
                      <OptimizedImage 
                        src={post.featured_image_url} 
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
                    <Link to={`/blog/${post.slug}`} className="inline-block">
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
                  Page {currentPage} of {totalPages}
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
    </>;
};

export default Blog;
