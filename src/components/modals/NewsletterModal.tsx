import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Mail, Sparkles, CheckCircle, TrendingUp, Bot, Zap } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

const NewsletterModal = ({ isOpen, onClose, initialEmail = "" }: NewsletterModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: initialEmail,
    name: "",
    interests: {
      automationTips: true,
      aiTrends: false,
      caseStudies: false,
      productUpdates: false
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: checked
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Welcome to the IT GYANI community! Check your email for confirmation.");
    setIsLoading(false);
    onClose();
  };

  const benefits = [
    {
      icon: <TrendingUp className="h-4 w-4" />,
      text: "Weekly automation insights & trends"
    },
    {
      icon: <Bot className="h-4 w-4" />,
      text: "AI-powered business tips"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      text: "Exclusive case studies & ROI reports"
    },
    {
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Early access to new features"
    }
  ];

  const interestOptions = [
    {
      id: "automationTips",
      label: "Automation Tips & Best Practices",
      description: "Weekly tips to optimize your workflows"
    },
    {
      id: "aiTrends", 
      label: "AI Industry Trends",
      description: "Latest developments in AI and automation"
    },
    {
      id: "caseStudies",
      label: "Success Stories & Case Studies", 
      description: "Real-world automation implementations"
    },
    {
      id: "productUpdates",
      label: "Product Updates & Features",
      description: "New tools and platform improvements"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Join Our Newsletter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Benefits */}
          <div className="space-y-3">
            <p className="text-foreground/80">
              Get the latest automation insights and exclusive content delivered to your inbox.
            </p>
            
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="text-primary">{benefit.icon}</div>
                  <span className="text-foreground/70">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newsletter-email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newsletter-name">First Name (Optional)</Label>
              <Input
                id="newsletter-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John"
                className="bg-input/50 border-border/50 focus:border-primary"
              />
            </div>

            <div className="space-y-3">
              <Label>Content Preferences</Label>
              {interestOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg glass-card">
                  <Checkbox
                    id={option.id}
                    checked={formData.interests[option.id as keyof typeof formData.interests]}
                    onCheckedChange={(checked) => 
                      handleInterestChange(option.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <Label 
                      htmlFor={option.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {option.label}
                    </Label>
                    <p className="text-xs text-foreground/60">
                      {option.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button type="submit" className="btn-hero w-full" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe Now"}
            </Button>
          </form>

          <div className="text-center text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;