import { useEffect, useState } from "react";
import FutureFlowHeader from "@/components/FutureFlowHeader";
import FutureFlowHero from "@/components/FutureFlowHero";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Calendar, Clock, Eye, Heart, Bot, Zap, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  reading_time: number;
  views: number;
  likes: number;
  published_at: string;
  categories: {
    name: string;
    slug: string;
    color: string;
  } | null;
  is_premium: boolean;
}

const FutureFlowIndex = () => {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          reading_time,
          views,
          likes,
          published_at,
          is_premium,
          categories (
            name,
            slug,
            color
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      if (!error && data) {
        setFeaturedPosts(data as BlogPost[]);
      }
      setIsLoading(false);
    };

    fetchFeaturedPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <FutureFlowHeader />
      
      <main>
        <FutureFlowHero />
        
        {/* Featured Content Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <TrendingUp className="w-4 h-4 mr-2" />
                Latest Insights
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI-Powered Content Hub
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay ahead with our automatically generated, SEO-optimized content on the latest in AI, automation, and future technology.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : featuredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        {post.categories && (
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{ 
                              backgroundColor: `${post.categories.color}15`, 
                              color: post.categories.color,
                              borderColor: `${post.categories.color}30`
                            }}
                          >
                            {post.categories.name}
                          </Badge>
                        )}
                        {post.is_premium && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.published_at)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.reading_time} min
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Content Coming Soon</h3>
                <p className="text-muted-foreground">
                  Our AI is preparing fresh content. Check back soon for the latest insights!
                </p>
              </div>
            )}

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Our Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Transform Your Business with AI
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From consultation to implementation, we provide end-to-end AI automation solutions tailored to your business needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>AI Automation Consulting</CardTitle>
                  <CardDescription>
                    Expert guidance on implementing AI-driven automation solutions for your specific industry and use case.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">
                      Book Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>n8n Workflow Design</CardTitle>
                  <CardDescription>
                    Custom workflow automation using n8n, designed to streamline your business processes and boost productivity.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/services/data-integration">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Premium Learning</CardTitle>
                  <CardDescription>
                    Access exclusive courses, workshops, and resources to master AI automation and stay ahead of the curve.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/academy">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already leveraging AI automation to scale their operations and stay competitive.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FutureFlowIndex;