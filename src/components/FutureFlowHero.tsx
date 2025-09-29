import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Bot, Zap, Sparkles, TrendingUp, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const FutureFlowHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container relative z-10 px-4 mx-auto">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Business Automation
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Welcome to the
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                Future of AI Automation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge insights, premium content, and automated solutions that transform how businesses operate in the AI era.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">500+</div>
                <div className="text-sm text-muted-foreground">AI Articles</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">10K+</div>
                <div className="text-sm text-muted-foreground">Professionals</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">24/7</div>
                <div className="text-sm text-muted-foreground">AI Content</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="group px-8 py-6 text-lg" asChild>
              <Link to="/blog">
                <Bot className="mr-2 h-5 w-5" />
                Explore AI Content
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
              <Link to="/services">
                <Zap className="mr-2 h-5 w-5" />
                Get Automation
              </Link>
            </Button>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="p-6 bg-card/50 backdrop-blur-sm border rounded-xl hover:bg-card/70 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI-Generated Content</h3>
              <p className="text-muted-foreground">
                Fresh, SEO-optimized articles on trending tech topics, generated daily by advanced AI
              </p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm border rounded-xl hover:bg-card/70 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Automation</h3>
              <p className="text-muted-foreground">
                Exclusive n8n workflows, automation templates, and expert consulting services
              </p>
            </div>
            
            <div className="p-6 bg-card/50 backdrop-blur-sm border rounded-xl hover:bg-card/70 transition-colors">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Learning Hub</h3>
              <p className="text-muted-foreground">
                Curated courses, tutorials, and resources to master AI and automation technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureFlowHero;