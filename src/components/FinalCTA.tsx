import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, X } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/modals/ConsultationModal";

const FinalCTA = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/40 to-background">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-green/20 rounded-full filter blur-[150px] animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-electric-blue/20 rounded-full filter blur-[180px] animate-float" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-green via-electric-blue to-neon-green bg-clip-text text-transparent">
              Ready to Transform
            </span>
            <br />
            Your Workflow?
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl font-body text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join 10,000+ users automating their success with AI
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button
              size="lg"
              className="text-xl px-10 py-7 bg-gradient-to-r from-neon-green to-electric-blue text-black font-bold hover:shadow-2xl hover:shadow-neon-green/40 hover:scale-105 transition-all duration-300 animate-pulse-slow"
              onClick={() => setConsultationModalOpen(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-10 py-7 border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/20"
              onClick={() => setConsultationModalOpen(true)}
            >
              Book a Demo
              <Calendar className="ml-3 h-6 w-6" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-neon-green" />
              </div>
              <span className="text-sm font-body">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-electric-blue" />
              </div>
              <span className="text-sm font-body">14-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                <X className="h-5 w-5 text-neon-green" />
              </div>
              <span className="text-sm font-body">Cancel Anytime</span>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </section>
  );
};

export default FinalCTA;
