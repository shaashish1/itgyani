import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, Clock, User, TrendingUp, Brain, Zap, Target, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to AI Automation in 2024: Transform Your Business",
      excerpt: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI.",
      content: "Complete guide covering AI automation fundamentals, implementation strategies, ROI calculation, and real-world case studies from Fortune 500 companies.",
      category: "AI Automation",
      author: "Sarah Chen",
      date: "2024-01-15",
      readTime: "12 min read",
      image: "/api/placeholder/800/400",
      tags: ["AI Automation", "Business Transformation", "ROI", "Strategy"],
      featured: true
    },
    {
      id: 2,
      title: "AI Training Best Practices: Building Intelligent Systems That Scale",
      excerpt: "Master the art of AI training with proven methodologies that reduce development time by 60% while improving model accuracy and performance.",
      content: "Deep dive into AI training techniques, data preparation, model optimization, and deployment strategies for enterprise-scale applications.",
      category: "AI Training",
      author: "Dr. Michael Rodriguez",
      date: "2024-01-12",
      readTime: "15 min read",
      image: "/api/placeholder/800/400",
      tags: ["AI Training", "Machine Learning", "Model Optimization", "Best Practices"],
      featured: true
    },
    {
      id: 3,
      title: "n8n Workflow Automation: 50 Power User Tips That Save Hours Daily",
      excerpt: "Unlock the full potential of n8n with advanced techniques, custom integrations, and workflow optimizations that automate complex business processes.",
      content: "Comprehensive collection of n8n tips, tricks, and advanced workflows for business automation, API integrations, and process optimization.",
      category: "Workflow Automation",
      author: "Alex Thompson",
      date: "2024-01-10",
      readTime: "10 min read",
      image: "/api/placeholder/800/400",
      tags: ["n8n", "Workflow Automation", "Integration", "Productivity"],
      featured: false
    },
    {
      id: 4,
      title: "ROI Calculator: Measuring the Impact of AI Automation Investments",
      excerpt: "Learn how to calculate, track, and maximize ROI from AI automation projects with our comprehensive framework and real client examples.",
      content: "Financial analysis framework for AI automation projects, including cost-benefit analysis, payback period calculation, and performance metrics.",
      category: "Business Intelligence",
      author: "Jennifer Park",
      date: "2024-01-08",
      readTime: "8 min read",
      image: "/api/placeholder/800/400",
      tags: ["ROI", "Financial Analysis", "Business Intelligence", "Metrics"],
      featured: false
    },
    {
      id: 5,
      title: "Enterprise AI Integration: Overcoming Common Implementation Challenges",
      excerpt: "Navigate the complexities of enterprise AI integration with proven strategies for data migration, security compliance, and change management.",
      content: "Practical guide to enterprise AI implementation, covering technical challenges, organizational change, security considerations, and success metrics.",
      category: "Enterprise Solutions",
      author: "David Kim",
      date: "2024-01-05",
      readTime: "14 min read",
      image: "/api/placeholder/800/400",
      tags: ["Enterprise AI", "Integration", "Change Management", "Security"],
      featured: false
    },
    {
      id: 6,
      title: "Future of Work: How AI Automation Creates New Job Opportunities",
      excerpt: "Explore how AI automation augments human capabilities, creates new roles, and transforms the workplace landscape for the better.",
      content: "Analysis of AI's impact on employment, emerging job categories, skill development needs, and strategies for workforce transformation.",
      category: "Future of Work",
      author: "Emma Wilson",
      date: "2024-01-03",
      readTime: "11 min read",
      image: "/api/placeholder/800/400",
      tags: ["Future of Work", "Employment", "Skills Development", "Workforce"],
      featured: false
    },
    {
      id: 7,
      title: "Customer Support Automation: 10x Your Team's Efficiency",
      excerpt: "Transform customer support with AI-powered automation that delivers 24/7 service while maintaining personal touch and high satisfaction rates.",
      content: "Complete guide to customer support automation, including chatbot implementation, ticket routing, escalation procedures, and performance optimization.",
      category: "Customer Success",
      author: "Ryan Jackson",
      date: "2024-01-01",
      readTime: "9 min read",
      image: "/api/placeholder/800/400",
      tags: ["Customer Support", "Chatbots", "Automation", "Efficiency"],
      featured: false
    },
    {
      id: 8,
      title: "Data Integration Masterclass: Connecting Your Business Ecosystem",
      excerpt: "Master the art of data integration with advanced techniques for connecting disparate systems, ensuring data quality, and enabling real-time insights.",
      content: "Technical deep-dive into data integration patterns, API design, real-time synchronization, and building robust data pipelines for enterprise applications.",
      category: "Data Integration",
      author: "Lisa Zhang",
      date: "2023-12-28",
      readTime: "16 min read",
      image: "/api/placeholder/800/400",
      tags: ["Data Integration", "APIs", "Real-time Data", "Architecture"],
      featured: false
    }
  ];

  const categories = ["All", "AI Automation", "AI Training", "Workflow Automation", "Business Intelligence", "Enterprise Solutions", "Future of Work", "Customer Success", "Data Integration"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>AI Automation Blog - Expert Insights & Best Practices | ITGYANI</title>
      <meta name="description" content="Stay ahead with the latest AI automation trends, best practices, and implementation guides. Expert insights on AI training, workflow automation, and business transformation strategies." />
      <meta name="keywords" content="AI automation blog, AI training guides, workflow automation tips, business automation insights, artificial intelligence articles, n8n tutorials, automation best practices" />
      <meta property="og:title" content="AI Automation Blog - Expert Insights & Strategies" />
      <meta property="og:description" content="Expert insights on AI automation, training, and business transformation. Learn from real case studies and implementation guides." />
      
      <div className="min-h-screen bg-background">
        <Header />
        <GoogleAd adSlot="1234567896" />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="container mx-auto px-6 relative">
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
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Articles */}
          {selectedCategory === "All" && (
            <section className="py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">
                  <span className="gradient-text">Featured Articles</span>
                </h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 backdrop-blur-sm group">
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
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            Read More <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Articles */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-foreground/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-foreground/70">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 group">
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
                            {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                            Read More <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    className="flex-1 bg-input/50 border-border/50 focus:border-primary"
                  />
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
      </div>
    </>
  );
};

export default Blog;