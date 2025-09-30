import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, TrendingUp, Zap, Play, ExternalLink, Star, Users, Clock, Target, CheckCircle, Building, DollarSign, BarChart3, Sparkles, Globe, Rocket, Shield, Workflow, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/modals/ConsultationModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import AdSenseAd from "@/components/AdSenseAd";
import { ReadMeButton, PageHeader } from "@/components/ImageComponents";

const Index = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const impactStats = [
    {
      value: "$12.5M",
      label: "Cost Savings Generated",
      description: "For clients in the last 12 months",
      color: "text-green-500"
    },
    {
      value: "45,000",
      label: "Hours Automated", 
      description: "Manual processes eliminated monthly",
      color: "text-blue-500"
    },
    {
      value: "97%",
      label: "Process Accuracy",
      description: "AI-driven decision making",
      color: "text-purple-500"
    },
    {
      value: "500+",
      label: "Businesses Transformed",
      description: "Across 50+ industries", 
      color: "text-orange-500"
    },
    {
      value: "2.4s",
      label: "Average Response Time",
      description: "AI agent customer interactions",
      color: "text-red-500"
    },
    {
      value: "99.2%",
      label: "System Uptime",
      description: "Enterprise-grade reliability",
      color: "text-cyan-500"
    }
  ];

  const industryStats = [
    {
      industry: "Financial Services",
      efficiency: "+340%",
      costs: "-28%",
      revenue: "+35%",
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
    <div className="min-h-screen">
      <Header />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-drift"></div>
        <div className="absolute bottom-32 left-1/3 w-64 h-64 bg-primary-glow/25 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card hover-glow mb-8">
              <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" />
              <span className="text-sm font-semibold gradient-text">AI-POWERED WORKFLOWS YOU CAN'T COMPROMISE</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="gradient-text">For the workflows</span><br />
              <span className="text-foreground">you can't compromise</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your business with intelligent automation that delivers measurable results. 
              No compromises, just pure efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="btn-hero text-lg px-12 py-6" onClick={() => setConsultationModalOpen(true)}>
                <Rocket className="w-5 h-5 mr-2" />
                Start Building
              </Button>
              <Button variant="ghost" size="lg" className="btn-ghost text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass-card hover-lift p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center justify-between">
                  <Bot className="w-12 h-12 text-primary" />
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Operations</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Agent Automation</h3>
                  <p className="text-muted-foreground">Deploy intelligent agents that work around the clock</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift p-8 bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-12 h-12 text-secondary" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-secondary">300%</div>
                    <div className="text-sm text-muted-foreground">Efficiency</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Smart Analytics</h3>
                  <p className="text-muted-foreground">Real-time insights that drive decision making</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift p-8 bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center justify-between">
                  <Shield className="w-12 h-12 text-green-500" />
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-500">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground">Bank-grade security for your workflows</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AdSense - After Hero */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseAd 
            slot="content-top" 
            format="horizontal"
            responsive={true}
            className="my-4"
          />
        </div>
      </section>

      {/* Workflow Showcase */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Powerful workflows</span> for every need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From customer support to financial analysis, we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="glass-card hover-lift p-12 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="p-0 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-orange-500/20">
                    <Building className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">E-commerce Automation</h3>
                    <p className="text-muted-foreground">Complete sales funnel optimization</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Cart abandonment recovery
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Personalized product recommendations
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Automated customer support
                  </div>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-orange-500">+127%</div>
                  <div className="text-sm text-muted-foreground">Revenue increase</div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift p-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
              <CardContent className="p-0 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-blue-500/20">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Financial Intelligence</h3>
                    <p className="text-muted-foreground">Advanced trading algorithms</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Algorithmic trading strategies
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Risk management automation
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                    Real-time market analysis
                  </div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4">
                  <div className="text-3xl font-bold text-blue-500">+34%</div>
                  <div className="text-sm text-muted-foreground">Annual returns</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AdSense - After Workflow */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseAd 
            slot="content-mid" 
            format="rectangle"
            responsive={true}
            className="my-4"
          />
        </div>
      </section>

      {/* Community & Templates */}
      <section className="py-24 bg-gradient-to-r from-green-500/5 via-background to-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-8">
              <Globe className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-green-500">COMMUNITY POWERED</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Loved by our <span className="gradient-text">customers</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses transforming their operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {impactStats.slice(0, 3).map((stat, idx) => (
              <Card key={idx} className="glass-card text-center p-8 hover-lift">
                <CardContent className="p-0">
                  <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="btn-hero">
              <Users className="w-5 h-5 mr-2" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Find <span className="gradient-text">much work</span> for good
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly integrate with your favorite tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-card hover-lift p-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-purple-500/20">
                    <Workflow className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">200+ Integrations</h3>
                    <p className="text-muted-foreground">Connect everything seamlessly</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Slack & Teams
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Salesforce & HubSpot
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Google Workspace
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Shopify & WooCommerce
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card hover-lift p-12 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/20">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-cyan-500/20">
                    <Zap className="w-8 h-8 text-cyan-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Lightning Fast</h3>
                    <p className="text-muted-foreground">Deploy in minutes, not months</p>
                  </div>
                </div>
                <div className="bg-cyan-500/10 rounded-lg p-6">
                  <div className="text-4xl font-bold text-cyan-500 mb-2">2.4s</div>
                  <div className="text-sm text-muted-foreground">Average response time</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AdSense - After Integration */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseAd 
            slot="content-mid" 
            format="horizontal"
            responsive={true}
            className="my-4"
          />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Real problems. <span className="gradient-text">AI solutions.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryStats.map((industry, idx) => (
              <Card key={idx} className="glass-card hover-lift p-6">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-lg font-bold">{industry.industry}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <span className="text-lg font-bold text-green-500">{industry.efficiency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Cost Reduction</span>
                      <span className="text-lg font-bold text-red-500">{industry.costs}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="text-lg font-bold text-blue-500">{industry.revenue}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic border-t pt-4">
                    {industry.highlight}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Learning Hub */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Accelerate your <span className="gradient-text">AI journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive resources, expert guidance, and proven strategies to help you master AI automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/resources" className="group">
              <Card className="glass-card hover-lift h-full p-8 bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 transition-all group-hover:scale-105">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 rounded-2xl bg-blue-500/20 w-fit">
                    <Building className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Resource Library</h3>
                    <p className="text-muted-foreground mb-4">8+ comprehensive guides covering AI automation strategies, implementation frameworks, and best practices.</p>
                    <ReadMeButton 
                      variant="primary" 
                      text="exploreNow" 
                      className="mb-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/academy" className="group">
              <Card className="glass-card hover-lift h-full p-8 bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 transition-all group-hover:scale-105">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 rounded-2xl bg-green-500/20 w-fit">
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Learning Academy</h3>
                    <p className="text-muted-foreground mb-4">Structured courses and hands-on tutorials with 150+ lessons to master AI automation from beginner to expert.</p>
                    <div className="flex items-center text-green-500 font-semibold">
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/case-studies" className="group">
              <Card className="glass-card hover-lift h-full p-8 bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20 transition-all group-hover:scale-105">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 rounded-2xl bg-purple-500/20 w-fit">
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Success Stories</h3>
                    <p className="text-muted-foreground mb-4">Detailed case studies showcasing real business transformations with measurable ROI and implementation insights.</p>
                    <div className="flex items-center text-purple-500 font-semibold">
                      View Case Studies
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/industries" className="group">
              <Card className="glass-card hover-lift h-full p-8 bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20 transition-all group-hover:scale-105">
                <CardContent className="p-0 space-y-6">
                  <div className="p-4 rounded-2xl bg-orange-500/20 w-fit">
                    <Globe className="w-8 h-8 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Industry Solutions</h3>
                    <p className="text-muted-foreground mb-4">Specialized automation strategies for 12+ industries with proven frameworks and implementation roadmaps.</p>
                    <ReadMeButton 
                      variant="primary" 
                      text="exploreNow" 
                      className="mb-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-6">
              Join thousands of professionals mastering AI automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/academy">
                <Button className="btn-hero px-8">
                  Start Free Course
                </Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline" className="px-8">
                  Download Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AdSense - Before Final CTA */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseAd 
            slot="content-bottom" 
            format="horizontal"
            responsive={true}
            className="my-4"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-drift"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8">
              <Star className="w-5 h-5 text-primary animate-glow-pulse" />
              <span className="text-sm font-semibold gradient-text">JOIN 500+ COMPANIES</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Ready to <span className="gradient-text">transform</span><br />
              your business?
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start your AI transformation today. No setup fees, no long-term contracts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <ReadMeButton 
                variant="primary" 
                text="getStarted" 
                onClick={() => setConsultationModalOpen(true)}
                className="mr-4"
              />
              <Button variant="ghost" size="lg" className="btn-ghost text-lg px-8 py-6">
                <Play className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Popup Advertisement System */}
      <PopupManager page="home" />
      
      {/* Modals */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
};

export default Index;