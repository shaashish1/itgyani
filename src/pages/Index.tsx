import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Bot, Workflow, Clock, Zap, Users, Target, TrendingUp, Building, Heart, ShoppingCart, Factory, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConsultationModal from "@/components/modals/ConsultationModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const heroStats = [
    { value: "100%", label: "Data Accuracy" },
    { value: "24/7", label: "Operations" },
    { value: "60%", label: "Cost Reduction" }
  ];

  const services = [
    {
      icon: Bot,
      title: "Agents & Automation",
      description: "Deploy AI that makes decisions, takes action, and manages customer interactions while delivering ROI.",
      features: ["Simple AI with smart intent", "Built-in conversational AI", "Integration with popular platforms"],
      percentage: "90%",
      metric: "ROI Increase"
    },
    {
      icon: Workflow,
      title: "Algorithmic Trading",
      description: "Advanced trading algorithms and market intelligence for optimal investment strategies.",
      features: ["AI risk management system", "Real-time market analysis", "Automated portfolio optimization"],
      percentage: "15%",
      metric: "Monthly Returns"
    },
    {
      icon: Clock,
      title: "API Workflow Automation",
      description: "Connect and automate workflows across all your business applications seamlessly.",
      features: ["Native integrations", "Custom API connections", "Real-time synchronization"],
      percentage: "70%",
      metric: "Time Saved"
    }
  ];

  const impactStats = [
    { value: "$12.5M", label: "Cost Savings generated", sublabel: "across all customer projects" },
    { value: "6,000", label: "Hours Automated", sublabel: "saving companies valuable time" },
    { value: "97%", label: "Process Accuracy", sublabel: "maintaining high quality standards" },
    { value: "500+", label: "Business Transformed", sublabel: "across various industries" },
    { value: "2.4x", label: "Average Revenue 10x", sublabel: "return on AI investment" },
    { value: "95.2%", label: "System Uptime", sublabel: "ensuring reliable operations" }
  ];

  const industryStats = [
    {
      industry: "Financial Services",
      metrics: [
        { label: "Operational Savings", value: "+340%" },
        { label: "Processing Speed", value: "+65%" },
        { label: "Error Reduction", value: "+28%" }
      ]
    },
    {
      industry: "E-commerce",
      metrics: [
        { label: "Revenue Growth", value: "+280%" },
        { label: "Customer Satisfaction", value: "+45%" },
        { label: "Order Processing", value: "+35%" }
      ]
    },
    {
      industry: "Manufacturing",
      metrics: [
        { label: "Production Efficiency", value: "+220%" },
        { label: "Quality Control", value: "+55%" },
        { label: "Waste Reduction", value: "+42%" }
      ]
    },
    {
      industry: "Healthcare",
      metrics: [
        { label: "Patient Processing", value: "+190%" },
        { label: "Diagnostic Accuracy", value: "+40%" },
        { label: "Administrative Tasks", value: "+18%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5">
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Most Innovative Live AI Automation API</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Accelerate Your Business with{" "}
              <span className="gradient-text">Intelligent Automation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-3xl mx-auto">
              Transform critical business functions with top AI algorithms, reduce costs by 60%, increase efficiency by 300%, and scale without limits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                className="btn-hero text-lg px-8 py-6"
                onClick={() => setConsultationModalOpen(true)}
              >
                Get Your AI Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6">
                Learn More
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {heroStats.map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Transform Your Business with <span className="gradient-text">Intelligent Systems</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Our AI solutions are built to add REAL business value by delivering outstanding while delivering value in days, not months.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="glass-card p-8 hover-lift">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-foreground/70 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center pt-4 border-t border-border">
                    <div className="text-3xl font-bold text-primary mb-1">{service.percentage}</div>
                    <div className="text-sm text-foreground/70">{service.metric}</div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ready to Deploy Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready-to-Deploy with <span className="gradient-text">Templates & Solutions</span>
            </h2>
            <p className="text-xl text-foreground/80 mb-8">
              Jump start with 200+ pre-built templates and solutions. Choose from accounting, CRM, e-commerce, 
              workflow systems, email marketing and custom designed platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="btn-hero text-lg px-8 py-6"
                onClick={() => setConsultationModalOpen(true)}
              >
                Browse Solutions Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Real Problems Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Real Problems. <span className="gradient-text">AI Solutions.</span> Measurable Impact.
            </h2>
            <p className="text-xl text-foreground/70">
              Our AI solutions deliver quantifiable results for common business challenges across enterprises
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="glass-card p-8 text-center hover-lift">
                <div className="text-5xl font-bold text-primary mb-4">{stat.value}</div>
                <h4 className="text-lg font-semibold mb-2">{stat.label}</h4>
                <p className="text-sm text-foreground/70">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Impact Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Measurable Impact Across <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Our AI solutions deliver quantifiable results for businesses across various industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {industryStats.map((industry, index) => (
              <div key={index} className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">{industry.industry}</h3>
                <div className="space-y-4">
                  {industry.metrics.map((metric, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-border/20">
                      <span className="text-foreground/80">{metric.label}</span>
                      <span className="text-2xl font-bold text-primary">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Industry-Specific <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Get specific and industry-led solutions right out of the box - it's never been that easy to maximize.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-foreground/60 mb-8">Optimized across numerous business solutions and ROI</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-500">+340%</div>
                <div className="text-sm text-foreground/70">Financial Services ROI</div>
              </div>
              <div>
                <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-500">+280%</div>
                <div className="text-sm text-foreground/70">E-commerce Growth</div>
              </div>
              <div>
                <Factory className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-500">+220%</div>
                <div className="text-sm text-foreground/70">Manufacturing Efficiency</div>
              </div>
              <div>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-500">+190%</div>
                <div className="text-sm text-foreground/70">Healthcare Processing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 10,000+ companies already using our AI automation solutions to scale their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              className="text-lg px-8 py-6"
              onClick={() => setConsultationModalOpen(true)}
            >
              Schedule Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
            >
              Explore Solutions
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
};

export default Index;