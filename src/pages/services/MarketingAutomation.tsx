import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Mail, TrendingUp, Target, Users, BarChart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const MarketingAutomation = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      title: "5x Lead Generation",
      description: "Dramatically increase qualified leads with automated nurturing"
    },
    {
      icon: <Target className="h-6 w-6 text-secondary" />,
      title: "80% Higher Conversion",
      description: "Personalized campaigns that convert prospects into customers"
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary-glow" />,
      title: "Real-time Analytics",
      description: "Track performance and optimize campaigns automatically"
    }
  ];

  const features = [
    "Advanced Lead Scoring & Segmentation",
    "Multi-channel Campaign Orchestration",
    "Behavioral Trigger Automation",
    "Personalized Content Delivery",
    "A/B Testing & Optimization",
    "CRM Integration & Data Sync",
    "Attribution & ROI Tracking",
    "Predictive Analytics & AI Insights"
  ];

  const campaigns = [
    {
      title: "Lead Nurturing Sequences",
      description: "Guide prospects through the sales funnel with personalized content",
      features: ["Progressive profiling", "Content scoring", "Sales handoff triggers"],
      result: "300% increase in sales-qualified leads"
    },
    {
      title: "Customer Onboarding",
      description: "Welcome new customers and drive product adoption",
      features: ["Welcome series", "Product tutorials", "Success milestones"],
      result: "85% reduction in churn rate"
    },
    {
      title: "Re-engagement Campaigns",
      description: "Win back inactive customers with targeted campaigns",
      features: ["Behavior tracking", "Win-back offers", "Preference updates"],
      result: "40% reactivation rate"
    },
    {
      title: "Event-triggered Marketing",
      description: "Respond instantly to customer actions and behaviors",
      features: ["Real-time triggers", "Cross-channel delivery", "Dynamic content"],
      result: "250% higher engagement"
    }
  ];

  const integrations = [
    "HubSpot", "Marketo", "Pardot", "Mailchimp", "Klaviyo", 
    "ActiveCampaign", "ConvertKit", "Drip", "Autopilot", "Eloqua"
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
                Marketing Automation & Lead Nurturing
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Turn Prospects into <span className="gradient-text">Loyal Customers</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Create intelligent marketing campaigns that adapt to customer behavior, 
                deliver personalized experiences, and drive measurable business growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="btn-hero text-lg px-8 py-4">
                  Get Marketing Audit
                </Button>
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                  See Campaign Examples
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

        {/* Campaign Types */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Intelligent <span className="gradient-text">Campaign Automation</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Deploy sophisticated marketing workflows that respond to customer behavior and drive conversions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {campaigns.map((campaign, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-bold">{campaign.title}</h3>
                    </div>
                    
                    <p className="text-foreground/70 mb-6">{campaign.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {campaign.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                      {campaign.result}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Advanced <span className="gradient-text">Marketing Features</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our marketing automation platform combines AI-powered insights with 
                  sophisticated workflow capabilities to maximize campaign performance.
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
                      <Target className="h-6 w-6 text-primary" />
                      Campaign Setup Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Audience Segmentation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">Content Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Workflow Configuration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Testing & Launch</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-secondary" />
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold gradient-text">92%</div>
                        <div className="text-xs text-foreground/70">Email Open Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold gradient-text">45%</div>
                        <div className="text-xs text-foreground/70">Click-through Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                    Seamless <span className="gradient-text">Platform Integration</span>
                  </h2>
                  <p className="text-foreground/70">
                    Connect with your existing marketing stack for unified automation
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
                  {integrations.map((platform, index) => (
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

        {/* ROI Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Proven <span className="gradient-text">Marketing ROI</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">451%</div>
                    <div className="text-sm text-foreground/70">Average ROI Increase</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">67%</div>
                    <div className="text-sm text-foreground/70">Cost Per Lead Reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">3.2x</div>
                    <div className="text-sm text-foreground/70">Conversion Rate Improvement</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">85%</div>
                    <div className="text-sm text-foreground/70">Customer Retention Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card text-center">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Supercharge Your Marketing</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Let our marketing automation experts design intelligent campaigns that convert 
                  prospects into loyal customers and drive sustainable business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Get Free Marketing Assessment
                  </Button>
                  <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                    View Campaign Templates
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

export default MarketingAutomation;