import { useState, useEffect } from "react";
import blogDefaultImage from "@/assets/blog-default.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, Clock, User, TrendingUp, Brain, Zap, Target, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogStorageService, BlogPost } from "@/services/blogStorageBrowser";
import { ReadMeButton, BlogThumbnail, PageHeader } from "@/components/ImageComponents";
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load real blog posts from storage
  useEffect(() => {
    loadBlogPosts();
  }, []);
  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const result = await blogStorageService.listBlogPosts({
        status: 'published',
        sortBy: 'publishedAt',
        sortOrder: 'desc'
      });
      if (result.success && result.data) {
        setBlogPosts(result.data);
        // Set first 3 as featured
        setFeaturedPosts(result.data.slice(0, 3));
      } else {
        // Fallback to demo posts if no real posts exist
        setBlogPosts(getDemoBlogPosts());
        setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      // Fallback to demo posts
      setBlogPosts(getDemoBlogPosts());
      setFeaturedPosts(getDemoBlogPosts().slice(0, 3));
    } finally {
      setLoading(false);
    }
  };

  // Demo content for when no AI-generated posts exist yet
  const getDemoBlogPosts = (): BlogPost[] => [{
    id: "demo-1",
    title: "The Ultimate Guide to AI Automation in 2024: Transform Your Business",
    slug: "ai-automation-guide-2024",
    content: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI...",
    excerpt: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI.",
    author: "ITGYANI AI",
    category: "technology",
    tags: ["AI Automation", "Business Transformation", "ROI", "Strategy"],
    publishedAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    status: "published",
    metaDescription: "Complete guide to AI automation in 2024 with practical implementation strategies and ROI calculation methods.",
    seo: {
      keywords: ["AI Automation", "Business Transformation", "ROI"],
      openGraph: {
        title: "The Ultimate Guide to AI Automation in 2024",
        description: "Transform your business with AI automation strategies",
        image: blogDefaultImage
      }
    },
    wordCount: 2500,
    readingTime: 12,
    generatedBy: "Demo Content"
  }, {
    id: "demo-2",
    title: "Building Intelligent Business Workflows with n8n and AI",
    slug: "intelligent-workflows-n8n-ai",
    content: "Learn how to create powerful business workflows that combine n8n automation with AI capabilities for maximum efficiency...",
    excerpt: "Learn how to create powerful business workflows that combine n8n automation with AI capabilities for maximum efficiency.",
    author: "ITGYANI AI",
    category: "automation",
    tags: ["n8n", "Workflows", "AI Integration", "Business Automation"],
    publishedAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
    status: "published",
    metaDescription: "Master n8n workflow automation with AI integration for intelligent business processes.",
    seo: {
      keywords: ["n8n", "Workflow Automation", "AI Integration"],
      openGraph: {
        title: "Building Intelligent Business Workflows",
        description: "Combine n8n and AI for powerful automation",
        image: blogDefaultImage
      }
    },
    wordCount: 1800,
    readingTime: 9,
    generatedBy: "Demo Content"
  }, {
    id: "demo-3",
    title: "Digital Transformation Success Stories: Real ROI from AI Implementation",
    slug: "digital-transformation-ai-roi",
    content: "Explore real-world case studies showing how businesses achieved significant ROI through strategic AI implementation...",
    excerpt: "Explore real-world case studies showing how businesses achieved significant ROI through strategic AI implementation.",
    author: "ITGYANI AI",
    category: "business",
    tags: ["Digital Transformation", "Case Studies", "ROI", "AI Implementation"],
    publishedAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
    status: "published",
    metaDescription: "Real case studies of digital transformation success with AI implementation and measurable ROI.",
    seo: {
      keywords: ["Digital Transformation", "AI ROI", "Case Studies"],
      openGraph: {
        title: "Digital Transformation Success Stories",
        description: "Real ROI from AI implementation case studies",
        image: blogDefaultImage
      }
    },
    wordCount: 2200,
    readingTime: 11,
    generatedBy: "Demo Content"
  }];
  const categories = ["All", "Technology", "Business", "Automation", "Industry", "AI Studio"];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return <>
      {/* SEO Meta Tags */}
      <title>AI Automation Blog - Expert Insights & Best Practices | ITGYANI</title>
      <meta name="description" content="Stay ahead with the latest AI automation trends, best practices, and implementation guides. Expert insights on AI training, workflow automation, and business transformation strategies." />
      <meta name="keywords" content="AI automation blog, AI training guides, workflow automation tips, business automation insights, artificial intelligence articles, n8n tutorials, automation best practices" />
      <meta property="og:title" content="AI Automation Blog - Expert Insights & Strategies" />
      <meta property="og:description" content="Expert insights on AI automation, training, and business transformation. Learn from real case studies and implementation guides." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
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
                <div className="max-w-md mx-auto relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Input type="text" placeholder="Search articles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 bg-input/50 border-border/50 focus:border-primary" />
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(category => <Button key={category} variant={selectedCategory === category ? "default" : "outline"} size="sm" onClick={() => setSelectedCategory(category)} className="transition-all duration-300">
                    {category}
                  </Button>)}
              </div>
            </div>
          </section>

          {/* Featured Articles */}
          {selectedCategory === "All" && <section className="py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="gradient-text">Featured Articles</span>
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 backdrop-blur-sm group">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge variant="secondary" className="mb-2">
                            {post.category}
                          </Badge>
                          <h3 className="text-white font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-foreground/70 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-foreground/60 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readingTime} min read
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, idx) => <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>)}
                          </div>
                          <ReadMeButton variant="primary" text="readMore" className="ml-auto" />
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </section>}

          {/* All Articles */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </h2>
              
              {filteredPosts.length === 0 ? <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filter criteria.</p>
                </div> : <div className="grid lg:grid-cols-3 gap-8">
                  {filteredPosts.map(post => <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 group">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
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
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readingTime} min read
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, idx) => <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>)}
                          </div>
                          <Link to={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                              Read More <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>}
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Stay Ahead of the <span className="gradient-text">AI Revolution</span>
                </h2>
                <p className="text-xl text-foreground/80 mb-8">
                  Get weekly insights on AI automation trends, implementation guides, 
                  and exclusive case studies delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input type="email" placeholder="Enter your email" className="flex-1 bg-input/50 border-border/50 focus:border-primary" />
                  <Button className="btn-hero px-6">
                    Subscribe Now
                  </Button>
                </div>
                <p className="text-sm text-foreground/60 mt-4">
                  Join 10,000+ professionals who trust our insights. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <PopupManager page="blog" />
      </div>
    </>;
};
export default Blog;