import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Target, 
  Eye, 
  Users, 
  Award, 
  TrendingUp, 
  Globe, 
  Lightbulb,
  CheckCircle,
  Star,
  Zap,
  Bot
} from "lucide-react";
import { Link } from "react-router-dom";
import ProcessModal from "@/components/modals/ProcessModal";

const About = () => {
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const stats = [
    { metric: "500+", label: "Businesses Automated", icon: <Users className="h-6 w-6" /> },
    { metric: "$100M+", label: "Cost Savings Generated", icon: <TrendingUp className="h-6 w-6" /> },
    { metric: "98%", label: "Client Satisfaction Rate", icon: <Star className="h-6 w-6" /> },
    { metric: "40+", label: "Countries Served", icon: <Globe className="h-6 w-6" /> }
  ];

  const certifications = [
    "Certified n8n Implementation Partners",
    "AI/ML Integration Specialists",
    "Enterprise Security Compliant",
    "24/7 Technical Support",
    "Custom Solution Development",
    "Training & Onboarding Included"
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
              About IT GYANI
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Pioneering the Future of{" "}
              <span className="gradient-text">Intelligent Automation</span>
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              At IT GYANI, we believe that every business deserves to operate at peak efficiency. 
              Our mission is to democratize AI-powered automation, making sophisticated workflow solutions 
              accessible to companies of all sizes.
            </p>

            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Founded by automation experts and AI specialists, we combine cutting-edge technology 
              with deep business understanding to deliver solutions that don't just work – they evolve 
              and improve over time.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {certifications.map((certification, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{certification}</span>
                </div>
              ))}
            </div>

            <Button className="btn-hero" onClick={() => setIsProcessModalOpen(true)}>
              Learn Our Process
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="glass-card hover-lift text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {stat.metric}
                    </div>
                    <div className="text-sm text-foreground/70">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Vision Statement */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-center">Our Vision</h3>
                <p className="text-foreground/80 text-center leading-relaxed">
                  "To create a world where businesses spend less time on repetitive tasks 
                  and more time on innovation, growth, and meaningful human connections."
                </p>
                <div className="text-center mt-4">
                  <span className="text-sm text-primary font-semibold">
                    — IT GYANI Team
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="flex justify-center space-x-8 opacity-60">
              <div className="text-center">
                <div className="text-sm font-medium">SOC 2 Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">ISO 27001</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">GDPR Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProcessModal 
        isOpen={isProcessModalOpen} 
        onClose={() => setIsProcessModalOpen(false)} 
      />
    </section>
  );
};

export default About;