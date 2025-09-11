import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, ShoppingCart, Package, Mail, TrendingUp, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EcommerceAutomation = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "40% Revenue Growth",
      description: "Increase sales with automated upsells and personalized experiences"
    },
    {
      icon: <Package className="h-6 w-6 text-secondary" />,
      title: "99% Order Accuracy",
      description: "Eliminate fulfillment errors with automated order processing"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-primary-glow" />,
      title: "60% Cost Reduction",
      description: "Cut operational costs through intelligent automation"
    }
  ];

  const features = [
    "Automated Order Processing & Fulfillment",
    "Real-time Inventory Management & Sync",
    "Dynamic Pricing & Promotion Management",
    "Customer Segmentation & Personalization",
    "Automated Email Marketing Campaigns",
    "Return & Refund Process Automation",
    "Multi-channel Sales Integration",
    "Performance Analytics & Reporting"
  ];

  const automationAreas = [
    {
      title: "Order Management",
      description: "From cart to delivery, automate the entire order lifecycle",
      processes: [
        "Order validation and processing",
        "Payment verification",
        "Inventory allocation",
        "Shipping label generation",
        "Tracking notifications"
      ],
      icon: <ShoppingCart className="h-8 w-8" />
    },
    {
      title: "Inventory Control",
      description: "Keep perfect stock levels across all channels and locations",
      processes: [
        "Real-time stock updates",
        "Low stock alerts",
        "Automatic reordering",
        "Multi-warehouse sync",
        "Demand forecasting"
      ],
      icon: <Package className="h-8 w-8" />
    },
    {
      title: "Customer Communications",
      description: "Deliver personalized experiences at every touchpoint",
      processes: [
        "Welcome email sequences",
        "Abandoned cart recovery",
        "Order confirmations",
        "Shipping updates",
        "Review requests"
      ],
      icon: <Mail className="h-8 w-8" />
    },
    {
      title: "Marketing Automation",
      description: "Drive sales with intelligent, data-driven campaigns",
      processes: [
        "Personalized product recommendations",
        "Dynamic pricing updates",
        "Customer win-back campaigns",
        "Loyalty program management",
        "Cross-sell & upsell automation"
      ],
      icon: <Users className="h-8 w-8" />
    }
  ];

  const platforms = [
    "Shopify", "WooCommerce", "Magento", "BigCommerce", "Amazon", 
    "eBay", "Etsy", "Walmart", "Square", "Prestashop"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-glow mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
                E-commerce Automation Solutions
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Scale Your <span className="gradient-text">Online Business</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Automate your entire e-commerce operation from order processing to customer retention. 
                Increase sales, reduce costs, and deliver exceptional customer experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="btn-hero text-lg px-8 py-4">
                  Start Free Automation Audit
                </Button>
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                  View ROI Calculator
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <Card key={index} className="glass-card text-center hover-glow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-muted/20 rounded-xl flex items-center justify-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 gradient-text">{benefit.title}</h3>
                    <p className="text-foreground/70">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Areas */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Complete <span className="gradient-text">E-commerce Automation</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Transform every aspect of your online business with intelligent automation workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {automationAreas.map((area, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        {area.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                        <p className="text-foreground/70 text-sm">{area.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {area.processes.map((process, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{process}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Integration */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Works With <span className="gradient-text">All Major Platforms</span>
                  </h2>
                  <p className="text-foreground/70">
                    Seamless integration with your existing e-commerce stack
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
                  {platforms.map((platform, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-muted/20 rounded-xl flex items-center justify-center mb-2 mx-auto">
                        <span className="text-xs font-medium text-foreground/70">{platform}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Advanced <span className="gradient-text">Automation Features</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our e-commerce automation platform delivers enterprise-grade capabilities 
                  designed to scale with your business growth.
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                      Implementation Roadmap
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Business Process Analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">Platform Integration Setup</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Workflow Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Testing & Optimization</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-2">14 Days</div>
                      <div className="text-sm text-foreground/70">Average Implementation Time</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card text-center">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Automate Your Store</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of e-commerce businesses already using automation to scale faster, 
                  reduce costs, and deliver exceptional customer experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Get Free Store Analysis
                  </Button>
                  <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                    See Success Stories
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EcommerceAutomation;