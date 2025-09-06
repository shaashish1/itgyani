import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, TrendingUp, Zap, Play, ExternalLink, Star, Users, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/modals/ConsultationModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-animated-bg.jpg";

const Index = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const heroStats = [
    { value: "300%", label: "Efficiency Increase" },
    { value: "24/7", label: "AI Agent Operations" },
    { value: "60%", label: "Cost Reduction" }
  ];

  const services = [
    {
      icon: Bot,
      title: "AI Agents & Automation",
      description: "Deploy intelligent agents that handle customer service, data processing, and decision-making 24/7.",
      features: [
        "Reduce response time by 90%",
        "Handle 1000+ queries simultaneously", 
        "Learn and improve continuously"
      ],
      metric: "90%",
      metricLabel: "Faster Response",
      href: "/services/ai-customer-support"
    },
    {
      icon: TrendingUp,
      title: "Algorithmic Trading",
      description: "Advanced trading algorithms that analyze market patterns and execute profitable trades automatically.",
      features: [
        "Real-time market analysis",
        "Risk management automation",
        "Consistent profit generation"
      ],
      metric: "15%+",
      metricLabel: "Annual Returns",
      href: "/services/algorithmic-trading"
    },
    {
      icon: Zap,
      title: "n8n Workflow Automation",
      description: "Connect your entire tech stack with intelligent workflows that eliminate manual processes.",
      features: [
        "Connect 200+ applications",
        "Zero-code automation",
        "Custom business logic"
      ],
      metric: "70%",
      metricLabel: "Time Saved",
      href: "/services/business-automation"
    }
  ];

  const problemSolutions = [
    {
      problem: "Manual Invoice Processing",
      solution: "n8n + AI Document Extraction",
      metric: "100%",
      result: "Process 500+ invoices daily, zero manual entry"
    },
    {
      problem: "Lead Qualification Bottleneck", 
      solution: "AI Lead Scoring + CRM Automation",
      metric: "10x",
      result: "Qualify leads instantly, route to sales in seconds"
    },
    {
      problem: "Cross-Platform Data Silos",
      solution: "n8n Data Pipeline Integration", 
      metric: "24/7",
      result: "Sync Salesforce, Slack, Google Sheets in real-time"
    }
  ];

  const impactStats = [
    {
      value: "$12.5M",
      label: "Cost Savings Generated",
      description: "For clients in the last 12 months",
      change: "+180%"
    },
    {
      value: "45,000",
      label: "Hours Automated", 
      description: "Manual processes eliminated monthly",
      change: "+250%"
    },
    {
      value: "97%",
      label: "Process Accuracy",
      description: "AI-driven decision making",
      change: "+15%"
    },
    {
      value: "500+",
      label: "Businesses Transformed",
      description: "Across 50+ industries", 
      change: "+300%"
    },
    {
      value: "2.4s",
      label: "Average Response Time",
      description: "AI agent customer interactions",
      change: "-85%"
    },
    {
      value: "99.2%",
      label: "System Uptime",
      description: "Enterprise-grade reliability",
      change: "+2%"
    }
  ];

  const industryStats = [
    {
      industry: "Financial Services",
      efficiency: "+340%",
      costs: "-65%", 
      revenue: "+28%",
      highlight: "Algorithmic trading increased portfolio returns by 28%"
    },
    {
      industry: "E-commerce",
      efficiency: "+280%",
      costs: "-45%",
      revenue: "+35%", 
      highlight: "AI agents handle 95% of customer inquiries autonomously"
    },
    {
      industry: "Manufacturing", 
      efficiency: "+220%",
      costs: "-55%",
      revenue: "+22%",
      highlight: "Predictive maintenance reduced downtime by 70%"
    },
    {
      industry: "Healthcare",
      efficiency: "+190%",
      costs: "-40%",
      revenue: "+18%",
      highlight: "Automated patient scheduling and record management"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Next-Generation AI Automation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-text">
                Accelerate Your Business with{" "}
                <span className="text-primary">Intelligent Automation</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Transform critical business processes with AI agents, algorithmic trading, and workflow automation. 
                Reduce costs by 60%, increase efficiency by 300%, and scale without limits.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="group btn-hero text-lg px-8 py-6"
                onClick={() => setConsultationModalOpen(true)}
              >
                Start Your AI Transformation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {heroStats.map((stat, idx) => (
                <div key={idx} className="glass-card p-6 text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Solutions */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Solutions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Transform Your Business with{" "}
              <span className="gradient-text">Intelligent Systems</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI solutions tackle your most critical business challenges while delivering measurable results and ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="glass-card hover-lift group cursor-pointer">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{service.metric}</div>
                        <div className="text-xs text-muted-foreground">{service.metricLabel}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={service.href}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-to-Deploy Templates */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">New: In-House Solutions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready-to-Deploy{" "}
              <span className="gradient-text">n8n Templates & Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our library of 100+ pre-built automation templates and 3,300+ community nodes. Deploy production-ready workflows in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-hero">
              Browse Solutions Library
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              View on GitHub
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Real Problems, AI Solutions */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">
              Real Problems. AI Solutions.{" "}
              <span className="gradient-text">Measurable Impact.</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our clients transformed their operations and achieved unprecedented growth.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {problemSolutions.map((item, idx) => (
              <Card key={idx} className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">Problem</h4>
                        <p className="font-semibold">{item.problem}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">AI Solution</h4>
                        <p className="font-semibold text-primary">{item.solution}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{item.metric}</div>
                      <p className="text-sm text-muted-foreground">{item.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Performance Metrics</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold">
              Measurable Impact Across{" "}
              <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI solutions deliver quantifiable results that transform businesses and drive sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {impactStats.map((stat, idx) => (
              <Card key={idx} className="glass-card hover-lift text-center">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-primary">{stat.change}</div>
                    <div className="text-4xl font-bold">{stat.value}</div>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{stat.label}</h4>
                      <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Success Stories */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold">Industry-Specific Success Stories</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how different industries leverage our AI solutions to achieve breakthrough results.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industryStats.map((industry, idx) => (
              <Card key={idx} className="glass-card hover-lift">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold">{industry.industry}</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{industry.efficiency}</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{industry.costs}</div>
                        <div className="text-xs text-muted-foreground">Costs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{industry.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{industry.highlight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
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