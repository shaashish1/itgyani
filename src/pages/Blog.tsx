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
import { ArrowLeft, Search, Calendar, Clock, User, TrendingUp, Brain, Zap, Target, BookOpen, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ReadMeButton, BlogThumbnail, PageHeader } from "@/components/ImageComponents";
import { toast } from "sonner";

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
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category_id, tags, published_at, created_at, reading_time, featured_image_url')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error loading blog posts:', error);
        toast.error('Failed to load blog posts');
        setBlogPosts(getDemoBlogPosts());
        setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
      } else if (data && data.length > 0) {
        const categoryIds = [...new Set(data.map(p => p.category_id).filter(Boolean))];
        let categoryMap = new Map<string, string>();
        
        if (categoryIds.length > 0) {
          const { data: categoriesData, error: catError } = await supabase
            .from('categories')
            .select('id, name')
            .in('id', categoryIds);
          
          if (!catError && categoriesData) {
            categoryMap = new Map(categoriesData.map(c => [c.id, c.name]));
          }
        }
        
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: '',
          excerpt: post.excerpt || '',
          author_id: 'itgyani-ai',
          category: categoryMap.get(post.category_id) || 'General',
          tags: post.tags || [],
          publishedAt: new Date(post.published_at || post.created_at),
          updatedAt: new Date(post.published_at || post.created_at),
          status: 'published' as const,
          metaDescription: post.excerpt || '',
          readingTime: post.reading_time || 5,
          featured_image_url: post.featured_image_url
        }));
        
        setBlogPosts(formattedPosts);
        setFeaturedPosts(formattedPosts.slice(0, 3));
        
        const uniqueTags = [...new Set(formattedPosts.flatMap(post => post.tags))];
        setAllTags(uniqueTags);
      } else {
        setBlogPosts(getDemoBlogPosts());
        setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
      }
    } catch (error) {
      console.error('Exception loading blog posts:', error);
      toast.error('An error occurred loading posts');
      setBlogPosts(getDemoBlogPosts());
      setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  const getDemoBlogPosts = (): BlogPost[] => {
    return [
      {
        id: "1",
        title: "Getting Started with AI Automation",
        slug: "getting-started-ai-automation",
        content: "Demo content...",
        excerpt: "Learn the fundamentals of AI automation and how to implement it in your business.",
        author_id: "demo-author",
        category: "AI Automation",
        tags: ["AI", "Automation", "Beginner"],
        publishedAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        status: "published",
        metaDescription: "Learn AI automation basics",
        readingTime: 5,
        featured_image_url: blogDefaultImage
      }
    ];
  };

  const filteredBlogs = blogPosts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedTags([]);
    setDateRange({});
    setCurrentPage(1);
  };

  return (
    <>
      <SEO 
        title="AI Automation Blog - Latest Insights & Trends | ITGyani"
        description="Explore expert articles on AI automation, workflow optimization, and digital transformation. Stay updated with the latest trends in AI technology."
        canonicalUrl="https://itgyani.com/blog"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                AI Automation Insights
              </h1>
              <p className="text-xl text-muted-foreground">
                Expert articles, guides, and insights on AI automation, workflow optimization, and digital transformation
              </p>
              
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                <div className="p-4 rounded-lg bg-card/50 backdrop-blur">
                  <div className="text-3xl font-bold text-primary">{blogPosts.length}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="p-4 rounded-lg bg-card/50 backdrop-blur">
                  <div className="text-3xl font-bold text-secondary">{categories.length - 1}</div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div className="p-4 rounded-lg bg-card/50 backdrop-blur">
                  <div className="text-3xl font-bold text-accent">{allTags.length}</div>
                  <div className="text-sm text-muted-foreground">Topics</div>
                </div>
              </div>

              <div className="relative max-w-2xl mx-auto mt-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles by title, category, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-card/50 backdrop-blur border-primary/20"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                    >
                      {category}
                      {category !== "All" && (
                        <Badge variant="secondary" className="ml-2">
                          {blogPosts.filter(p => p.category === category).length}
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {(searchTerm || selectedCategory !== "All" || selectedTags.length > 0) && (
                <div className="mb-6 p-4 bg-card rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Active Filters</h4>
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && <Badge variant="secondary">Search: "{searchTerm}"</Badge>}
                    {selectedCategory !== "All" && <Badge variant="secondary">Category: {selectedCategory}</Badge>}
                    {selectedTags.map(tag => <Badge key={tag} variant="secondary">Tag: {tag}</Badge>)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing {filteredBlogs.length} of {blogPosts.length} articles
                  </p>
                </div>
              )}

              <div className="mb-6 flex justify-end">
                <Button variant="outline" size="sm" onClick={loadBlogPosts} disabled={loading}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Posts
                </Button>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : currentPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {currentPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="relative h-48 overflow-hidden">
                          <OptimizedImage
                            src={post.featured_image_url || blogDefaultImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-4 left-4 bg-primary">{post.category}</Badge>
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.publishedAt.toLocaleDateString()}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span>{post.readingTime} min read</span>
                          </div>
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <Link to={`/blog/${post.slug}`}>
                            <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                              Read More <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                            className="w-10"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No articles found matching your filters.</p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>

            <aside className="w-full lg:w-80 space-y-6">
              <LazyAd>
                <AdSenseAd slot="1234567890" format="vertical" className="min-h-[600px]" />
              </LazyAd>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Popular Articles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {featuredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="block group">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <OptimizedImage
                            src={post.featured_image_url || blogDefaultImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{post.readingTime} min read</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    Browse by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.filter(c => c !== "All").map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-between"
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                      >
                        <span>{category}</span>
                        <Badge variant="secondary">
                          {blogPosts.filter(p => p.category === category).length}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                  <CardDescription>Get the latest AI automation insights delivered to your inbox</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input type="email" placeholder="Enter your email" className="mb-3" />
                  <Button className="w-full">Subscribe</Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>

        <Footer />
        <PopupManager page="blog" />
      </div>
    </>
  );
};

export default Blog;
