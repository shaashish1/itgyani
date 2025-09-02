import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Database, RefreshCw, Shield, Zap, GitBranch, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const DataIntegration = () => {
  const benefits = [
    {
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
      title: "Real-time Sync",
      description: "Keep all systems updated instantly with bi-directional data flow"
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: "Data Integrity",
      description: "Ensure accuracy with automated validation and error handling"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-glow" />,
      title: "Zero Downtime",
      description: "Seamless integration without disrupting existing operations"
    }
  ];

  const integrations = [
    {
      category: "CRM Systems",
      platforms: ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Microsoft Dynamics"],
      icon: <Database className="h-6 w-6" />
    },
    {
      category: "E-commerce",
      platforms: ["Shopify", "WooCommerce", "Magento", "BigCommerce", "Amazon"],
      icon: <Cloud className="h-6 w-6" />
    },
    {
      category: "Marketing Tools",
      platforms: ["Mailchimp", "Klaviyo", "Marketo", "Pardot", "ConvertKit"],
      icon: <GitBranch className="h-6 w-6" />
    },
    {
      category: "Business Tools",
      platforms: ["Slack", "Trello", "Asana", "Notion", "Airtable"],
      icon: <Zap className="h-6 w-6" />
    }
  ];

  const features = [
    "Real-time Data Synchronization",
    "Custom API Development & Integration",
    "Data Transformation & Mapping",
    "Automated Error Detection & Recovery",
    "Scalable Architecture Design",
    "Performance Monitoring & Analytics",
    "Security & Compliance Management",
    "Legacy System Modernization"
  ];

  const useCases = [
    {
      title: "CRM to Marketing Automation",
      description: "Sync customer data between Salesforce and marketing platforms for personalized campaigns",
      result: "300% increase in campaign effectiveness"
    },
    {
      title: "E-commerce Inventory Sync",
      description: "Real-time inventory updates across multiple sales channels and warehouses",
      result: "99.5% inventory accuracy achieved"
    },
    {
      title: "Financial System Integration",
      description: "Connect accounting software with CRM and e-commerce for unified reporting",
      result: "50% reduction in manual data entry"
    }
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
                Data Integration & Synchronization
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Unify Your <span className="gradient-text">Data Ecosystem</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Connect all your business systems with seamless data integration. Eliminate silos, 
                ensure data consistency, and create a single source of truth across your organization.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="btn-hero text-lg px-8 py-4">
                  Get Integration Assessment
                </Button>
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                  View Integration Map
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

        {/* Integration Platforms */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="gradient-text">200+</span> Platform Integrations
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                We integrate with all major business platforms and can build custom connectors for any system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                        {integration.icon}
                      </div>
                      <h3 className="font-bold">{integration.category}</h3>
                    </div>
                    <div className="space-y-2">
                      {integration.platforms.map((platform, idx) => (
                        <div key={idx} className="text-sm text-foreground/70 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {platform}
                        </div>
                      ))}
                    </div>
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
                  Enterprise-Grade <span className="gradient-text">Integration Features</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our data integration platform is built for scale, security, and reliability, 
                  ensuring your business-critical data flows seamlessly across all systems.
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
                      <Database className="h-6 w-6 text-primary" />
                      Integration Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">System Analysis & Mapping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">API Design & Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Data Flow Implementation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Monitoring & Maintenance</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-secondary" />
                      Security & Compliance
                    </h4>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• End-to-end encryption</li>
                      <li>• GDPR & CCPA compliant</li>
                      <li>• SOC 2 Type II certified</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Success <span className="gradient-text">Case Studies</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                    <p className="text-foreground/70 mb-6">{useCase.description}</p>
                    <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                      {useCase.result}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card text-center">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Connect Everything</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Let us analyze your current systems and design a comprehensive integration strategy 
                  that eliminates data silos and drives business growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Get Free System Analysis
                  </Button>
                  <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                    Download Integration Guide
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

export default DataIntegration;