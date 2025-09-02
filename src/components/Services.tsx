import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Workflow, 
  MessageSquare, 
  Database, 
  ShoppingCart, 
  Mail, 
  Calendar,
  BarChart,
  Shield,
  Zap
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Workflow className="h-8 w-8" />,
      title: "Business Process Automation",
      description: "Streamline repetitive tasks, data entry, and approval workflows with intelligent automation that scales with your business.",
      features: ["Custom Workflow Design", "Real-time Monitoring", "Performance Analytics"],
      color: "primary"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "AI-Powered Customer Support",
      description: "Deploy smart chatbots and automated support systems that provide 24/7 customer assistance and route complex queries to humans.",
      features: ["Multi-channel Support", "Natural Language Processing", "Escalation Management"],
      color: "secondary"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Data Integration & Sync",
      description: "Connect disparate systems, synchronize data across platforms, and maintain consistent information flow throughout your organization.",
      features: ["Real-time Sync", "Data Transformation", "Error Handling"],
      color: "primary-glow"
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "E-commerce Automation",
      description: "Automate order processing, inventory management, customer communications, and fulfillment workflows for seamless operations.",
      features: ["Order Processing", "Inventory Sync", "Customer Notifications"],
      color: "secondary"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Marketing Automation",
      description: "Create personalized marketing campaigns, lead nurturing sequences, and automated follow-ups that convert prospects into customers.",
      features: ["Email Campaigns", "Lead Scoring", "Behavioral Triggers"],
      color: "primary"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Scheduling & Resource Management",
      description: "Optimize resource allocation, automate appointment booking, and manage team schedules with intelligent coordination systems.",
      features: ["Smart Scheduling", "Resource Optimization", "Conflict Resolution"],
      color: "primary-glow"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "10x Faster Processing",
      description: "Reduce manual work by up to 90% with intelligent automation"
    },
    {
      icon: <BarChart className="h-6 w-6 text-secondary" />,
      title: "ROI Within 30 Days",
      description: "See immediate returns on your automation investment"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-glow" />,
      title: "Enterprise Security",
      description: "Bank-grade security for all your automated workflows"
    }
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Business with{" "}
            <span className="gradient-text">Smart Automation</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            From simple task automation to complex AI-driven workflows, we solve the problems 
            that slow down your business and drain your resources.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover-glow group">
              <CardContent className="p-8">
                <div className={`w-16 h-16 rounded-xl bg-${service.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-${service.color}`}>
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-foreground/60">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${service.color} mr-3`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="btn-ghost w-full group-hover:bg-primary/10">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="glass-card p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="gradient-text">SynGini</span>?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-hero text-lg px-8 py-4">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;