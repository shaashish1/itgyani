
import FutureFlowHeader from "@/components/FutureFlowHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, Users, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const services = [
    {
      title: "AI Business Automation",
      description: "Streamline your operations with intelligent automation workflows",
      icon: Bot,
      features: ["Process optimization", "Custom AI workflows", "24/7 monitoring"],
      price: "Starting at $2,500/month"
    },
    {
      title: "n8n Workflow Design", 
      description: "Custom automation workflows using n8n platform",
      icon: Zap,
      features: ["Visual workflow builder", "API integrations", "Real-time sync"],
      price: "Starting at $1,500/project"
    },
    {
      title: "AI Strategy Consulting",
      description: "Expert guidance for AI implementation planning",
      icon: Users,
      features: ["Readiness assessment", "Custom roadmap", "ROI analysis"],
      price: "Starting at $500/session"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <FutureFlowHeader />
      <main>
        <section className="py-24 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI Automation Services
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Business with AI-Powered Automation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              From consultation to implementation, we provide end-to-end AI automation solutions 
              that streamline operations, reduce costs, and accelerate growth.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get Free Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="font-semibold text-primary mb-4">{service.price}</div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={
                          service.title === "AI Business Automation" ? "/services/business-automation" :
                          service.title === "n8n Workflow Design" ? "/services/n8n-workflow" :
                          "/services/ai-strategy-consulting"
                        }>
                          Learn More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
