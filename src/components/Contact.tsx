import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ConsultationModal from "@/components/modals/ConsultationModal";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Calendar,
  MessageCircle,
  Zap
} from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Us",
      details: "hello@itgyani.ai",
      action: "Send Email"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      action: "Schedule Call"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Visit Us",
      details: "San Francisco, CA",
      action: "Get Directions"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Business Hours",
      details: "Mon-Fri 9AM-6PM PST",
      action: "Book Meeting"
    }
  ];

  const quickActions = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Free Consultation",
      description: "30-minute strategy session to discuss your automation needs",
      buttonText: "Book Now",
      color: "primary"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat Support",
      description: "Get instant answers to your technical questions",
      buttonText: "Chat Now",
      color: "secondary"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Emergency Support",
      description: "24/7 support for critical automation issues",
      buttonText: "Get Help",
      color: "primary-glow"
    }
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
            Get In Touch
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Automate Your Success</span>?
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Let's discuss how IT GYANI can transform your business operations. 
            Our experts are ready to design a custom automation solution for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                        className="bg-input/50 border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                        className="bg-input/50 border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tell us about your automation needs *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe the processes you'd like to automate, current challenges, and your goals..."
                      rows={5}
                      required
                      className="bg-input/50 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-hero w-full md:w-auto"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information Cards - Moved below form */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{info.title}</div>
                        <div className="text-foreground/70 text-sm">{info.details}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="glass-card hover-glow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-${action.color}/20 rounded-lg flex items-center justify-center mb-4 text-${action.color}`}>
                    {action.icon}
                  </div>
                  <h4 className="font-bold mb-2">{action.title}</h4>
                  <p className="text-sm text-foreground/70 mb-4">
                    {action.description}
                  </p>
                   <Button 
                     variant="ghost" 
                     className="btn-ghost w-full text-sm"
                     onClick={() => {
                       if (action.title.includes("Schedule")) {
                         setConsultationModalOpen(true);
                       } else {
                         toast.info(`${action.title} feature coming soon!`);
                       }
                     }}
                   >
                     {action.buttonText}
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 glass-card rounded-full">
            <span className="text-sm text-foreground/70">Trusted by industry leaders</span>
            <div className="flex items-center gap-6 text-foreground/40">
              <span className="font-semibold">TechCorp</span>
              <span className="font-semibold">InnovateCo</span>
              <span className="font-semibold">FutureLab</span>
            </div>
          </div>
        </div>

        {/* Consultation Modal */}
        <ConsultationModal
          isOpen={consultationModalOpen}
          onClose={() => setConsultationModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default Contact;