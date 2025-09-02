import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, MessageSquare, Clock, Users, TrendingUp, Bot, Headphones, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const AICustomerSupport = () => {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "24/7 Availability",
      description: "Never miss a customer inquiry with round-the-clock AI support"
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-secondary" />,
      title: "95% Resolution Rate",
      description: "Resolve most queries instantly without human intervention"
    },
    {
      icon: <Users className="h-6 w-6 text-primary-glow" />,
      title: "Enhanced Experience",
      description: "Provide personalized, context-aware customer interactions"
    }
  ];

  const features = [
    "Natural Language Processing & Understanding",
    "Multi-channel Support (Chat, Email, Voice)",
    "Intelligent Query Routing & Escalation",
    "Sentiment Analysis & Emotion Detection",
    "Automated Ticket Creation & Management",
    "Knowledge Base Integration & Updates",
    "Real-time Analytics & Performance Metrics",
    "Seamless Human Agent Handoff"
  ];

  const channels = [
    {
      title: "Website Chat",
      description: "Embedded chatbot with instant responses and smooth escalation",
      features: ["Proactive engagement", "File sharing", "Screen sharing", "Multi-language support"]
    },
    {
      title: "Email Automation",
      description: "Intelligent email processing with automated responses and routing",
      features: ["Auto-categorization", "Priority detection", "Template responses", "Follow-up scheduling"]
    },
    {
      title: "Social Media",
      description: "Monitor and respond to customer inquiries across social platforms",
      features: ["Multi-platform monitoring", "Brand mention alerts", "Automated responses", "Crisis management"]
    },
    {
      title: "Voice Integration",
      description: "AI-powered voice assistants for phone-based customer support",
      features: ["Speech recognition", "Intent detection", "Call routing", "Voice analytics"]
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
                AI-Powered Customer Support
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your <span className="gradient-text">Customer Experience</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Deploy intelligent AI assistants that provide instant, personalized customer support 
                across all channels while seamlessly escalating complex issues to human agents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="btn-hero text-lg px-8 py-4">
                  Start Free Trial
                </Button>
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                  See Live Demo
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

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Advanced AI <span className="gradient-text">Support Features</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our AI customer support platform combines cutting-edge natural language processing 
                  with intelligent automation to deliver exceptional customer experiences.
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
                      <Bot className="h-6 w-6 text-primary" />
                      AI Training Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Knowledge Base Analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">Custom Model Training</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Testing & Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Deployment & Monitoring</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Channels Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Multi-Channel <span className="gradient-text">Support Integration</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Provide consistent, intelligent support across every customer touchpoint with unified AI assistance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {channels.map((channel, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-bold">{channel.title}</h3>
                    </div>
                    <p className="text-foreground/70 mb-6">{channel.description}</p>
                    <div className="space-y-2">
                      {channel.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Proven <span className="gradient-text">Results</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">85%</div>
                    <div className="text-sm text-foreground/70">Reduction in Response Time</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                    <div className="text-sm text-foreground/70">Customer Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">60%</div>
                    <div className="text-sm text-foreground/70">Cost Reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                    <div className="text-sm text-foreground/70">Availability</div>
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
                  Ready to <span className="gradient-text">Revolutionize</span> Your Support?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses already using AI to deliver exceptional customer experiences. 
                  Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Start 14-Day Free Trial
                  </Button>
                  <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                    Schedule Product Demo
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

export default AICustomerSupport;