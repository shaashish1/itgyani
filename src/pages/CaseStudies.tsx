import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Clock, DollarSign, Users, Target, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/modals/ConsultationModal";

const CaseStudies = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const caseStudies = [
    {
      id: 1,
      title: "Fortune 500 Retail Chain Automates Inventory Management",
      industry: "Retail",
      company: "RetailGlobal Corp",
      challenge: "Manual inventory tracking across 500+ stores causing $2M+ annual losses",
      solution: "AI-powered inventory automation with predictive analytics and real-time sync",
      results: [
        { metric: "Cost Reduction", value: "75%", icon: DollarSign },
        { metric: "Time Saved", value: "40 hrs/week", icon: Clock },
        { metric: "Accuracy Improved", value: "99.5%", icon: Target },
        { metric: "ROI", value: "320%", icon: TrendingUp }
      ],
      description: "Implemented comprehensive AI automation solution that transformed inventory management across 500+ retail locations, eliminating manual processes and delivering exceptional ROI.",
      technologies: ["AI Machine Learning", "Real-time Analytics", "Automated Workflows", "Predictive Modeling"],
      timeframe: "6 months",
      category: "Enterprise AI Automation"
    },
    {
      id: 2,
      title: "Healthcare Provider Revolutionizes Patient Communication",
      industry: "Healthcare",
      company: "MedCare Systems",
      challenge: "Patient inquiries overwhelming staff, 60% response delays affecting satisfaction",
      solution: "AI customer support automation with intelligent triage and 24/7 availability",
      results: [
        { metric: "Response Time", value: "95% faster", icon: Clock },
        { metric: "Staff Efficiency", value: "65% increase", icon: Users },
        { metric: "Patient Satisfaction", value: "92% rating", icon: Target },
        { metric: "Cost Savings", value: "$500K annually", icon: DollarSign }
      ],
      description: "Deployed intelligent AI automation system that handles patient communications 24/7, providing instant responses while maintaining HIPAA compliance.",
      technologies: ["Natural Language Processing", "AI Chatbots", "Automated Scheduling", "HIPAA Compliance"],
      timeframe: "4 months",
      category: "AI Training & Support"
    },
    {
      id: 3,
      title: "Manufacturing Giant Optimizes Production Workflows",
      industry: "Manufacturing",
      company: "IndustrialTech Inc",
      challenge: "Complex production scheduling causing 25% efficiency losses and delays",
      solution: "AI automation for production planning, quality control, and resource optimization",
      results: [
        { metric: "Production Efficiency", value: "45% increase", icon: TrendingUp },
        { metric: "Downtime Reduction", value: "80% less", icon: Clock },
        { metric: "Quality Improvements", value: "35% fewer defects", icon: Target },
        { metric: "Annual Savings", value: "$3.2M", icon: DollarSign }
      ],
      description: "Transformed manufacturing operations with AI-driven automation, optimizing production workflows and achieving unprecedented efficiency gains.",
      technologies: ["Predictive Maintenance", "Quality Control AI", "Resource Optimization", "Real-time Monitoring"],
      timeframe: "8 months",
      category: "Industrial AI Automation"
    },
    {
      id: 4,
      title: "E-commerce Platform Scales Customer Support 10x",
      industry: "E-commerce",
      company: "ShopSmart Online",
      challenge: "Growing customer base overwhelming support team, 48-hour response times",
      solution: "AI training system for automated customer support with human escalation",
      results: [
        { metric: "Support Capacity", value: "10x increase", icon: Users },
        { metric: "Resolution Time", value: "90% faster", icon: Clock },
        { metric: "Customer Rating", value: "4.9/5 stars", icon: Target },
        { metric: "Team Productivity", value: "200% boost", icon: TrendingUp }
      ],
      description: "Implemented comprehensive AI training and automation solution that scaled customer support operations while maintaining exceptional service quality.",
      technologies: ["AI Training Models", "Automated Responses", "Sentiment Analysis", "Smart Routing"],
      timeframe: "3 months",
      category: "AI Training & Automation"
    },
    {
      id: 5,
      title: "Financial Services Automates Compliance Reporting",
      industry: "Financial Services",
      company: "SecureBank Holdings",
      challenge: "Manual compliance reporting taking 200+ hours monthly, high error risk",
      solution: "AI automation for regulatory compliance with intelligent data processing",
      results: [
        { metric: "Time Savings", value: "85% reduction", icon: Clock },
        { metric: "Accuracy Rate", value: "99.9%", icon: Target },
        { metric: "Compliance Score", value: "100% rating", icon: CheckCircle },
        { metric: "Cost Efficiency", value: "$800K saved", icon: DollarSign }
      ],
      description: "Automated complex compliance workflows using advanced AI systems, ensuring 100% regulatory compliance while dramatically reducing operational overhead.",
      technologies: ["Regulatory AI", "Document Processing", "Automated Reporting", "Risk Assessment"],
      timeframe: "5 months",
      category: "Financial AI Automation"
    }
  ];

  const industries = ["All", "Retail", "Healthcare", "Manufacturing", "E-commerce", "Financial Services"];
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const filteredCaseStudies = selectedIndustry === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>AI Automation Case Studies - Real Success Stories | ITGYANI</title>
      <meta name="description" content="Discover how leading companies achieved 300%+ ROI with AI automation solutions. Real case studies showing dramatic cost savings, efficiency gains, and business transformation through intelligent automation." />
      <meta name="keywords" content="AI automation case studies, AI training success stories, business automation results, artificial intelligence ROI, automation implementation, AI transformation" />
      <meta property="og:title" content="AI Automation Case Studies - Proven Success Stories" />
      <meta property="og:description" content="See how Fortune 500 companies transformed their operations with AI automation. Real results: 75% cost reduction, 320% ROI, 99.9% accuracy rates." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="container mx-auto px-6 relative">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">AI Automation</span><br />
                  Success Stories
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                  Real companies. Real results. See how industry leaders achieved <strong>300%+ ROI</strong> and 
                  transformed their operations with our AI automation solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-hero"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Get Your Custom Strategy
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/services">View All Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Industry Filter */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIndustry(industry)}
                    className="transition-all duration-300"
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="grid gap-8">
                {filteredCaseStudies.map((study, index) => (
                  <Card key={study.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {study.category}
                            </Badge>
                            <Badge variant="outline">{study.industry}</Badge>
                          </div>
                          <CardTitle className="text-2xl lg:text-3xl mb-3 leading-tight">
                            {study.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-foreground/70">
                            <strong>{study.company}</strong> • {study.timeframe} implementation
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {/* Challenge & Solution */}
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-red-400">Challenge</h4>
                          <p className="text-foreground/80">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-green-400">AI Solution</h4>
                          <p className="text-foreground/80">{study.solution}</p>
                        </div>
                      </div>

                      {/* Results Metrics */}
                      <div>
                        <h4 className="font-semibold text-lg mb-6">Measurable Results</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          {study.results.map((result, idx) => {
                            const IconComponent = result.icon;
                            return (
                              <div key={idx} className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                                <IconComponent className="h-8 w-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                                <div className="text-sm text-foreground/70">{result.metric}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Technologies & Description */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-lg mb-3">Implementation Details</h4>
                          <p className="text-foreground/80">{study.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Write Your <span className="gradient-text">Success Story</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8">
                  Join hundreds of companies who've transformed their operations with AI automation. 
                  Get your custom strategy and ROI projection today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-hero"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Schedule Strategy Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/services">Explore AI Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        
        <ConsultationModal
          isOpen={consultationModalOpen}
          onClose={() => setConsultationModalOpen(false)}
        />
      </div>
    </>
  );
};

export default CaseStudies;