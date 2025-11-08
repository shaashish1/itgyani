import { useState, useEffect, useMemo } from "react";
import blogDefaultImage from "@/assets/blog-default.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import AdSenseAd from "@/components/AdSenseAd";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { LazyAd } from "@/components/LazyAd";
import { Breadcrumbs, generateBreadcrumbs } from "@/components/Breadcrumbs";
import { PopularPosts } from "@/components/RelatedPosts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search, Clock, User, ArrowRight, TrendingUp, Calendar, BookOpen, Tag, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { blogService, Blog } from "@/services/blogService";
import { PageHeader } from "@/components/ImageComponents";
import { SEOUtils } from "@/utils/seoUtils";
import { InternalLinkingService } from "@/utils/internalLinking";

const BlogStatic = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all blogs and sort by latest first
  const allBlogs = useMemo(() => {
    const blogs = blogService.getAllBlogs();
    return blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }, []);

  const categories = ["All", ...blogService.getCategories()];
  const allTags = blogService.getTags();
  const metadata = blogService.getMetadata();

  // Filter blogs based on search, category, and tags
  const filteredBlogs = useMemo(() => {
    let blogs = allBlogs;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      blogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchLower) ||
        blog.excerpt.toLowerCase().includes(searchLower) ||
        blog.searchText.toLowerCase().includes(searchLower) ||
        blog.category.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
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

  // Pagination logic - 12 posts per page for better AdSense placement
  const postsPerPage = 12;
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

  // Get popular posts for sidebar
  const popularPosts = useMemo(() => 
    InternalLinkingService.getPopularPosts(allBlogs, 8), 
    [allBlogs]
  );

  // Enhanced structured data for better SEO
  const structuredData = useMemo(() => {
    const blogListSchema = SEOUtils.generateBlogListSchema(allBlogs);
    const organizationSchema = SEOUtils.generateOrganizationSchema();
    const websiteSchema = SEOUtils.generateWebsiteSchema();
    
    return [blogListSchema, organizationSchema, websiteSchema];
  }, [allBlogs]);

  return (
    <>
      <SEO
        title="AI Automation Blog - Latest Insights & Comprehensive Guides"
        description={`Discover ${allBlogs.length} comprehensive articles on AI automation, machine learning, n8n workflows, and business intelligence. Expert insights for enterprise automation success.`}
        keywords={`AI automation blog, machine learning guides, business automation, n8n workflows, artificial intelligence, automation strategies, ${allBlogs.slice(0,10).map(b => b.tags.slice(0,2).join(', ')).join(', ')}`}
        canonicalUrl={SEOUtils.generateCanonicalUrl('/blog')}
        structuredData={structuredData}
        ogImage="https://itgyani.com/blog-og-image.jpg"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section with Statistics */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-6 py-16">
            <Breadcrumbs items={generateBreadcrumbs.blog()} className="mb-8" />
            
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                AI Automation
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Insights & Guides
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Expert insights, practical guides, and proven strategies to help you master{" "}
                <span className="font-semibold text-primary">AI automation</span> and{" "}
                <span className="font-semibold text-secondary">AI training</span> for business success.
              </p>

              {/* Blog Statistics */}
              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">{allBlogs.length}</div>
                    <div className="text-sm text-muted-foreground">Total Articles</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">{categories.length - 1}</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">⚡ Fresh</div>
                    <div className="text-sm text-muted-foreground">Content Daily</div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or technologies..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-12 pr-4 py-4 text-lg border-border/50 focus:border-primary rounded-full bg-background/80 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              {searchTerm && (
                <div className="text-center text-sm text-muted-foreground mt-4">
                  Found {filteredBlogs.length} articles matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </section>

        {/* AdSense - Top Banner */}
        <div className="container mx-auto px-6 py-4">
          <LazyAd minHeight="250px">
            <AdSenseAd 
              slot="content-top" 
              format="horizontal"
              responsive={true}
              className="w-full max-w-4xl mx-auto"
            />
          </LazyAd>
        </div>

        {/* Filters Section */}
        <section className="py-8 border-b border-border/30 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Category Filters */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Categories</h3>
                </div>
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
                      className="text-xs"
                    >
                      {category}
                      {category !== "All" && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {allBlogs.filter(blog => blog.category === category).length}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="lg:w-80">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2 max-h-20 overflow-hidden">
                  {allTags.slice(0, 12).map(tag => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className="text-xs h-7"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedCategory !== "All" || selectedTags.length > 0 || searchTerm) && (
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border/30">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                <Badge variant="secondary" className="text-xs">
                  {filteredBlogs.length} results
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs text-destructive hover:text-destructive"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Blog Posts - Main Content */}
              <div className="lg:col-span-3">
                {filteredBlogs.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or filters
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Results Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {filteredBlogs.length === allBlogs.length 
                            ? "All Articles" 
                            : `Search Results`}
                        </h2>
                        <p className="text-muted-foreground">
                          Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredBlogs.length)} of {filteredBlogs.length} articles
                        </p>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        Page {currentPage} of {totalPages}
                      </Badge>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                      {paginatedBlogs.map((post, index) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 group h-full flex flex-col">
                          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                            {post.featuredImage ? (
                              <OptimizedImage
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading={index < 6 ? "eager" : "lazy"}
                              />
                            ) : (
                              <OptimizedImage
                                src={blogDefaultImage}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading={index < 6 ? "eager" : "lazy"}
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">
                              {post.category}
                            </Badge>
                          </div>
                          
                          <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readingTime}min read
                              </div>
                            </div>
                            
                            <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                              {post.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <Link
                                to={post.url}
                                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                              >
                                Read More
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* AdSense - Middle Content */}
                    {currentPage === 1 && paginatedBlogs.length > 6 && (
                      <div className="my-12">
                        <LazyAd minHeight="250px">
                          <AdSenseAd
                            slot="content-middle"
                            format="rectangle"
                            responsive={true}
                            className="w-full max-w-2xl mx-auto"
                          />
                        </LazyAd>
                      </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 p-6 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                          </Button>
                          <Button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            Next
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">
                            Page {currentPage} of {totalPages}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ({filteredBlogs.length} total articles)
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* AdSense - Sidebar */}
                <div className="sticky top-4">
                  <LazyAd minHeight="600px">
                    <AdSenseAd
                      slot="sidebar"
                      format="vertical"
                      responsive={true}
                      className="w-full"
                    />
                  </LazyAd>
                </div>

                {/* Popular Posts */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Popular Articles
                  </h4>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <Link
                        key={post.id}
                        to={post.url}
                        className="block p-3 rounded-lg hover:bg-background transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-sm line-clamp-2 mb-1">
                              {post.title}
                            </h5>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {post.readingTime}min
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Categories List */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Browse by Category
                  </h4>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const categoryCount = allBlogs.filter(blog => blog.category === category).length;
                      return (
                        <button
                          key={category}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors text-left"
                          onClick={() => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                          }}
                        >
                          <span className={`text-sm ${selectedCategory === category ? 'text-primary font-medium' : 'text-foreground'}`}>
                            {category}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {categoryCount}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-3">Stay Updated</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest automation insights, AI trends, and exclusive tips delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-background"
                    />
                    <Button className="w-full" size="sm">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <PopupManager />
      </div>
    </>
  );
};

export default BlogStatic;
