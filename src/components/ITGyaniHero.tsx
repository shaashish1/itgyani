import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Sparkles, CheckCircle, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConsultationModal from "@/components/modals/ConsultationModal";

const ITGyaniHero = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-neon-green/20 rounded-full filter blur-[100px] animate-float" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-electric-blue/20 rounded-full filter blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/10 rounded-full filter blur-[150px]" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-neon-green" />
            <span className="text-sm font-medium font-body">AI-Powered Business Automation</span>
          </div>

          {/* Hero Messages - Staggered */}
          <div className="space-y-4 mb-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] animate-slide-up">
              <span className="bg-gradient-to-r from-neon-green via-electric-blue to-neon-green bg-clip-text text-transparent">
                AI Agents for Everyone
              </span>
            </h1>
            
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Upskill Faster With AI-Powered Training
            </h2>
            
            <h3 className="text-3xl md:text-5xl font-display font-semibold text-foreground/90 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Automate Your Business, Content, and Workflows
            </h3>
            
            <h3 className="text-2xl md:text-4xl font-display font-medium text-foreground/80 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              Create Social Media Posts, Reels & Carousels Using Automation
            </h3>
            
            <h3 className="text-xl md:text-3xl font-display font-medium text-foreground/70 animate-slide-up flex items-center justify-center gap-2" style={{ animationDelay: "0.4s" }}>
              <Sparkles className="h-6 w-6 text-neon-green" />
              Build & Deploy Your Own AI Workforce With Zero Coding
              <Sparkles className="h-6 w-6 text-electric-blue" />
            </h3>
          </div>

          {/* Subheadline */}
          <p className="text-lg md:text-xl font-body text-muted-foreground mb-12 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.5s" }}>
            Join thousands of professionals transforming their workflow with AI
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-neon-green to-electric-blue text-black font-semibold hover:shadow-2xl hover:shadow-neon-green/30 hover:scale-105 transition-all duration-300"
              onClick={() => setConsultationModalOpen(true)}
            >
              Launch Your AI Agent
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/academy">
              <Button 
                size="lg"
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10"
              >
                Explore Trainings
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.7s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <CheckCircle className="h-4 w-4 text-neon-green" />
              <span className="text-sm font-body">Verified AI Tools</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <BookOpen className="h-4 w-4 text-electric-blue" />
              <span className="text-sm font-body">Learn-By-Doing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <Clock className="h-4 w-4 text-neon-green" />
              <span className="text-sm font-body">24/7 Automation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neon-green/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neon-green rounded-full mt-2" />
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </section>
  );
};

export default ITGyaniHero;
