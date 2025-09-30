import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProcessModal = ({ isOpen, onClose }: ProcessModalProps) => {
  const steps = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Choose Your Path",
      description: "Start from scratch or pick a ready-made template from our library",
      highlight: "No coding required"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Customize & Connect",
      description: "Tailor the automation to your needs with our simple interface",
      highlight: "Drag & drop simplicity"
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Launch & Scale",
      description: "Deploy instantly and watch your automation work 24/7",
      highlight: "Live in minutes"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text text-center mb-2">
            AI Automation Made Simple
          </DialogTitle>
          <p className="text-center text-foreground/70">
            From idea to implementation in 3 easy steps
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {steps.map((step, index) => (
            <Card key={index} className="glass-card hover-lift border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-primary">
                        Step {index + 1}
                      </span>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-foreground/70 mb-3">{step.description}</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {step.highlight}
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-6 w-6 text-primary/40 flex-shrink-0 mt-4" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Template Library Callout */}
          <Card className="glass-card border-primary/30 bg-primary/5">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Ready-Made Templates</h3>
              <p className="text-foreground/70 mb-4">
                Browse our template library and start with proven automation workflows. 
                No need to build from scratch – customize and deploy in minutes!
              </p>
              <Link to="/resources">
                <Button className="btn-hero">
                  Explore Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/contact" className="flex-1">
              <Button className="btn-hero w-full">
                Start Your Project
                <Rocket className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessModal;
