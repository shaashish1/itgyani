import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Code, Brain, Rocket, Heart, Coffee, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const openPositions = [
    {
      id: 1,
      title: "Senior AI Automation Engineer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      salary: "$140K - $180K",
      description: "Lead the development of cutting-edge AI automation solutions. Work with n8n, machine learning models, and enterprise integrations.",
      requirements: ["5+ years Python/Node.js", "AI/ML experience", "n8n expertise", "Cloud platforms (AWS/GCP)"],
      skills: ["AI Training", "Automation Frameworks", "API Development", "Machine Learning"]
    },
    {
      id: 2,
      title: "AI Training Specialist",
      department: "AI Research",
      location: "Remote / New York",
      type: "Full-time", 
      salary: "$120K - $160K",
      description: "Design and implement AI training programs for enterprise clients. Focus on custom model development and optimization.",
      requirements: ["ML/AI background", "Training program design", "Client interaction", "Data science expertise"],
      skills: ["Machine Learning", "AI Training", "Data Analysis", "Client Success"]
    },
    {
      id: 3,
      title: "Business Automation Consultant",
      department: "Consulting",
      location: "Remote / Chicago",
      type: "Full-time",
      salary: "$100K - $130K", 
      description: "Help Fortune 500 companies implement AI automation strategies. Drive digital transformation initiatives.",
      requirements: ["Business consulting experience", "Process automation knowledge", "Client management", "Technical communication"],
      skills: ["Process Optimization", "AI Strategy", "Client Relations", "Project Management"]
    },
    {
      id: 4,
      title: "DevOps Engineer - AI Infrastructure",
      department: "Engineering",
      location: "Remote / Austin",
      type: "Full-time",
      salary: "$130K - $170K",
      description: "Build and maintain infrastructure for AI automation platforms. Focus on scalability and reliability.",
      requirements: ["DevOps experience", "Kubernetes/Docker", "CI/CD pipelines", "Cloud infrastructure"],
      skills: ["Infrastructure as Code", "Container Orchestration", "Monitoring", "Security"]
    },
    {
      id: 5,
      title: "Product Manager - AI Solutions",
      department: "Product",
      location: "Remote / Seattle",
      type: "Full-time",
      salary: "$150K - $190K",
      description: "Drive product strategy for AI automation tools. Work closely with engineering and design teams.",
      requirements: ["Product management experience", "AI/tech background", "User research", "Roadmap planning"],
      skills: ["Product Strategy", "User Experience", "Market Analysis", "Team Leadership"]
    },
    {
      id: 6,
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote / Boston",
      type: "Full-time",
      salary: "$80K - $110K",
      description: "Create compelling content about AI automation and training. Drive thought leadership and SEO strategy.",
      requirements: ["Content marketing experience", "Technical writing", "SEO knowledge", "B2B marketing"],
      skills: ["Content Strategy", "SEO Optimization", "Technical Writing", "Social Media"]
    }
  ];

  const departments = ["All", "Engineering", "AI Research", "Consulting", "Product", "Marketing"];
  
  const filteredPositions = selectedDepartment === "All" 
    ? openPositions 
    : openPositions.filter(position => position.department === selectedDepartment);

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness stipend."
    },
    {
      icon: Coffee,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours. Home office setup stipend and co-working space access."
    },
    {
      icon: Brain,
      title: "Learning & Development",
      description: "$5,000 annual learning budget. Conference attendance, courses, and certification support."
    },
    {
      icon: Rocket,
      title: "Equity & Growth",
      description: "Competitive equity package. Clear career progression paths with regular reviews and feedback."
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative environment with quarterly team retreats. Open communication and innovation time."
    },
    {
      icon: Zap,
      title: "Impact & Innovation",
      description: "Work on cutting-edge AI projects. Direct impact on business outcomes and industry transformation."
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible with AI automation, always seeking better solutions."
    },
    {
      title: "Customer Success",
      description: "Our clients' success is our success. We go above and beyond to deliver exceptional results."
    },
    {
      title: "Continuous Learning",
      description: "The AI field evolves rapidly. We embrace learning and adapt to new technologies and methodologies."
    },
    {
      title: "Transparency",
      description: "Open communication, honest feedback, and clear expectations create a foundation for growth."
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <title>AI Automation Careers - Join the Future of Work | ITGYANI</title>
      <meta name="description" content="Join ITGYANI's mission to transform businesses with AI automation. Remote-first culture, competitive salaries, equity packages. Open positions in AI training, automation engineering, and consulting." />
      <meta name="keywords" content="AI automation jobs, AI training careers, machine learning jobs, automation engineer, AI consultant, remote AI jobs, artificial intelligence careers" />
      <meta property="og:title" content="AI Automation Careers - Shape the Future of Business" />
      <meta property="og:description" content="Join the leading AI automation company. Remote-first culture, $140K+ salaries, equity packages. Help Fortune 500 companies transform with AI." />
      
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
                  Build the Future of<br />
                  <span className="gradient-text">AI Automation</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                  Join a team of passionate innovators transforming how businesses operate. 
                  Work on cutting-edge AI projects with <strong>Fortune 500 companies</strong>.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-hero" asChild>
                    <a href="#open-positions">View Open Positions</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#culture">Learn About Our Culture</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Company Stats */}
          <section className="py-16 border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-foreground/70">Companies Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                  <div className="text-foreground/70">Client Savings Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">95%</div>
                  <div className="text-foreground/70">Employee Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">Remote</div>
                  <div className="text-foreground/70">First Culture</div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="culture" className="py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why Work at <span className="gradient-text">ITGYANI</span>?
                </h2>
                <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                  We're building the future of business automation. Join us and enjoy industry-leading benefits, 
                  cutting-edge projects, and a culture that values innovation and growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {benefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <IconComponent className="h-12 w-12 text-primary mb-4" />
                        <CardTitle className="text-xl">{benefit.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/70">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Company Values */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center p-6 rounded-lg bg-card/50 border border-border/50">
                    <h3 className="font-semibold text-lg mb-3 text-primary">{value.title}</h3>
                    <p className="text-foreground/70 text-sm">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section id="open-positions" className="py-24 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">Open Positions</span>
                </h2>
                <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                  Join our growing team and help shape the future of AI automation. 
                  Competitive salaries, equity, and the opportunity to work on cutting-edge projects.
                </p>
              </div>

              {/* Department Filter */}
              <div className="flex flex-wrap gap-2 justify-center mb-12">
                {departments.map((dept) => (
                  <Button
                    key={dept}
                    variant={selectedDepartment === dept ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDepartment(dept)}
                    className="transition-all duration-300"
                  >
                    {dept}
                  </Button>
                ))}
              </div>

              {/* Positions Grid */}
              <div className="grid gap-6">
                {filteredPositions.map((position) => (
                  <Card key={position.id} className="border-border/50 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {position.department}
                            </Badge>
                            <Badge variant="outline">{position.type}</Badge>
                          </div>
                          <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                          <CardDescription className="text-lg">
                            <div className="flex flex-wrap items-center gap-4 text-foreground/70">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {position.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {position.salary}
                              </span>
                            </div>
                          </CardDescription>
                        </div>
                        <Button className="btn-hero">
                          Apply Now
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <p className="text-foreground/80">{position.description}</p>
                      
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {position.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-foreground/70">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {position.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
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
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Don't See the Perfect Role?
                </h2>
                <p className="text-xl text-foreground/80 mb-8">
                  We're always looking for talented individuals who share our passion for AI automation. 
                  Send us your resume and let's start a conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-hero" asChild>
                    <a href="mailto:careers@itgyani.com">Send Your Resume</a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/#contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <PopupManager page="careers" />
      </div>
    </>
  );
};

export default Careers;