import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowRight, Bot, BookOpen, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { blogService } from "@/services/blogService";
import { SEOUtils } from "@/utils/seoUtils";

const NotFound = () => {
  const location = useLocation();
  const recentBlogs = blogService.getRecentBlogs(4);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Track 404 errors for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_not_found', {
        page_path: location.pathname,
        page_title: '404 - Page Not Found'
      });
    }
  }, [location.pathname]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - 404 Error",
    "description": "The page you are looking for could not be found. Explore our AI automation resources, blog posts, and services instead.",
    "url": `https://itgyani.com${location.pathname}`,
    "mainEntity": {
      "@type": "Thing",
      "name": "404 Error Page"
    }
  };

  return (
    <>
      <SEO
        title="Page Not Found - 404 Error"
        description="The page you requested could not be found. Discover our AI automation solutions, expert guides, and business transformation resources instead."
        keywords="404 error, page not found, AI automation, business automation, ITGYANI"
        canonicalUrl={SEOUtils.generateCanonicalUrl(location.pathname)}
        structuredData={structuredData}
        ogType="website"
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <h1 className="text-8xl font-bold text-primary/20 mb-4">404</h1>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Oops! Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  The page you're looking for doesn't exist or has been moved. 
                  But don't worry – we have plenty of amazing AI automation content to explore!
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <Button asChild variant="default" size="lg" className="h-14">
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Go Home
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14">
                  <Link to="/blog" className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Read Blog
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14">
                  <Link to="/services" className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Popular Resources */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Popular Resources
                </h3>
                <p className="text-muted-foreground">
                  Explore our most popular AI automation content instead
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Navigation Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Quick Navigation</h4>
                  {[
                    { name: 'AI Automation Services', href: '/services', icon: Bot, desc: 'Explore our automation solutions' },
                    { name: 'Learning Academy', href: '/academy', icon: BookOpen, desc: 'Master AI automation skills' },
                    { name: 'Case Studies', href: '/case-studies', icon: Users, desc: 'See real transformation stories' },
                    { name: 'Resources Hub', href: '/resources', icon: Settings, desc: 'Tools and templates' }
                  ].map((item) => (
                    <Card key={item.name} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <Link to={item.href} className="flex items-center gap-3 group">
                          <item.icon className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h5>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Recent Blog Posts */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Latest Blog Posts</h4>
                  {recentBlogs.map((blog) => (
                    <Card key={blog.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <Link to={blog.url} className="block group">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <h5 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                {blog.title}
                              </h5>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {blog.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {blog.readingTime} min read
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {blog.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/blog">
                      View All Articles
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section */}
          <section className="py-16">
            <div className="container mx-auto px-6 text-center max-w-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still can't find what you're looking for?
              </h3>
              <p className="text-muted-foreground mb-8">
                Try searching our site or get in touch with our team
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" size="lg">
                  <Link to="/blog?search=" className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Articles
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact" className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
