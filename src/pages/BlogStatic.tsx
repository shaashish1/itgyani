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
