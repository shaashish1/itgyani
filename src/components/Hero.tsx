import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Bot, 
  Mail, 
  MessageSquare, 
  ShoppingCart, 
  Database, 
  Github, 
  Globe, 
  Cloud, 
  CreditCard, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  Smartphone, 
  Video, 
  Lock, 
  Search 
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import heroAnimatedBg from "@/assets/hero-animated-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full filter blur-xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-scale-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Automation Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Automate Your World with{" "}
            <span className="gradient-text">Neural Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Transform repetitive tasks into intelligent workflows. Our AI-powered n8n automation solutions 
            help businesses scale, reduce costs, and focus on what matters most.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Button className="btn-hero text-lg px-8 py-6 hover-glow">
              Start Automating Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/ai-studio">
              <Button variant="outline" className="btn-ghost text-lg px-8 py-6">
                Try AI Studio Free
                <Bot className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <div className="glass-card p-6 hover-lift">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lightning Fast Setup</h3>
              <p className="text-sm text-foreground/70">Deploy automation workflows in minutes, not days</p>
            </div>

            <div className="glass-card p-6 hover-lift" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Bot className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Intelligence</h3>
              <p className="text-sm text-foreground/70">Smart workflows that learn and adapt to your needs</p>
            </div>

            <div className="glass-card p-6 hover-lift" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-primary-glow/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="h-6 w-6 text-primary-glow" />
              </div>
              <h3 className="font-semibold mb-2">Enterprise Ready</h3>
              <p className="text-sm text-foreground/70">Scalable solutions trusted by leading companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;