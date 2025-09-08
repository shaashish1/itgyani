import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, TrendingUp, Zap, Play, ExternalLink, Star, Users, Clock, Target, CheckCircle, Building, DollarSign, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/modals/ConsultationModal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      problem: "Problems",
      solution: "AI Solutions",
      icon: Building,
      title: "E-commerce",
      description: "Cart abandonment recovery",
      metric: "100%",
      metricLabel: "Increase in Sales",
      color: "text-purple-500"
    },
    {
      problem: "Problems", 
      solution: "AI Solutions",
      icon: DollarSign,
      title: "Finance",
      description: "Fraud detection & prevention",
      metric: "10x",
      metricLabel: "Faster Detection",
      color: "text-green-500"
    },
    {
      problem: "Problems",
      solution: "AI Solutions",
      icon: BarChart3,
      title: "Analytics",
      description: "Real-time data processing",
      metric: "24/7",
      metricLabel: "Continuous Monitoring",
      color: "text-blue-500"
    }
  ];

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
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Next-Generation AI Automation Badge */}
      <section className="pb-8 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
            <Bot className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">NEXT-GENERATION AI AUTOMATION</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900">
              Accelerate Your Business with{" "}
              <span className="text-blue-600">Intelligent Automation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Transform critical business processes with AI agents, algorithmic trading, 
              and workflow automation. Reduce costs by 60%, increase efficiency by 
              300%, and scale without limits.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-lg"
                onClick={() => setConsultationModalOpen(true)}
              >
                Start Your AI Transformation
              </Button>
              <a href="/demo" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-8 py-6 rounded-lg"
                >
                  Watch Demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroStats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 rounded-2xl bg-gray-50">
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transform Your Business Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">AI-POWERED SOLUTIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Transform Your Business with{" "}
              <span className="text-blue-600">Intelligent Systems</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI solutions tackle your most critical business challenges while delivering 
              measurable results and ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{service.metric}</div>
                        <div className="text-xs text-gray-500">{service.metricLabel}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link to={service.href}>
                      <Button 
                        variant="outline" 
                        className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ready-to-Deploy Templates Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-600">READY-TO-DEPLOY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              AI& Templates & Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access 50+ AI & automation templates and 100+ community-built 
              workflows to solve your specific business challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
              >
                Browse Solutions Library
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4"
              >
                View All GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Real Problems AI Solutions Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Real Problems. <span className="text-blue-600">AI Solutions.</span> Measurable Impact.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our clients transformed their operations with AI-powered solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {problemSolutions.map((item, idx) => (
              <Card key={idx} className="text-center border border-gray-200">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">{item.problem}</div>
                      <div className="text-sm text-blue-600 font-medium mb-3">{item.solution}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{item.metric}</div>
                      <div className="text-sm text-gray-600">{item.metricLabel}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Measurable Impact Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Measurable Impact Across <span className="text-blue-600">Every Industry</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI solutions deliver quantifiable results that transform businesses and drive 
              sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {impactStats.map((stat, idx) => (
              <Card key={idx} className="text-center border border-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              Industry-Specific Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how different industries have leveraged our AI solutions to achieve breakthrough results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industryStats.map((industry, idx) => (
              <Card key={idx} className="border border-gray-200">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">{industry.industry}</h3>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{industry.efficiency}</div>
                        <div className="text-sm text-gray-600">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{industry.costs}</div>
                        <div className="text-sm text-gray-600">Costs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{industry.revenue}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 italic">{industry.highlight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-100">
              Join 500+ companies already using AI automation to scale and thrive
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-6"
                onClick={() => setConsultationModalOpen(true)}
              >
                Schedule Free Consultation
              </Button>
              <a href="/case-studies" target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Download Case Studies
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Modals */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
};

export default Index;