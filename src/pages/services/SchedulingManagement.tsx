import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Calendar, Clock, Users, Zap, Settings, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const SchedulingManagement = () => {
  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "75% Time Savings",
      description: "Eliminate manual scheduling and reduce administrative overhead"
    },
    {
      icon: <Users className="h-6 w-6 text-secondary" />,
      title: "90% Efficiency Gain",
      description: "Optimize resource allocation and minimize scheduling conflicts"
    },
    {
      icon: <Zap className="h-6 w-6 text-primary-glow" />,
      title: "Real-time Updates",
      description: "Instant notifications and automatic schedule adjustments"
    }
  ];

  const features = [
    "Intelligent Resource Allocation",
    "Automated Conflict Resolution",
    "Multi-timezone Coordination",
    "Capacity Planning & Optimization",
    "Automated Reminder Systems",
    "Integration with Calendar Systems",
    "Real-time Availability Tracking",
    "Advanced Scheduling Rules Engine"
  ];

  const useCases = [
    {
      title: "Healthcare Scheduling",
      description: "Optimize patient appointments, staff schedules, and resource allocation",
      features: [
        "Patient appointment booking",
        "Staff shift management",
        "Equipment scheduling",
        "Emergency slot allocation"
      ],
      result: "40% reduction in wait times"
    },
    {
      title: "Service Business Management",
      description: "Coordinate field technicians, appointments, and service delivery",
      features: [
        "Technician dispatching",
        "Route optimization",
        "Customer notifications",
        "Job status tracking"
      ],
      result: "60% improvement in on-time delivery"
    },
    {
      title: "Educational Institution Planning",
      description: "Manage class schedules, room bookings, and faculty assignments",
      features: [
        "Class timetabling",
        "Room allocation",
        "Faculty scheduling",
        "Exam coordination"
      ],
      result: "50% reduction in scheduling conflicts"
    },
    {
      title: "Corporate Meeting Management",
      description: "Streamline meeting coordination across teams and departments",
      features: [
        "Meeting room booking",
        "Attendee coordination",
        "Resource preparation",
        "Follow-up automation"
      ],
      result: "70% faster meeting setup"
    }
  ];

  const integrations = [
    "Google Calendar", "Outlook", "Calendly", "Zoom", "Microsoft Teams",
    "Slack", "Salesforce", "HubSpot", "Trello", "Asana"
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
                Scheduling & Resource Management
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master Your <span className="gradient-text">Time & Resources</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Optimize scheduling, resource allocation, and coordination with intelligent automation. 
                Eliminate conflicts, maximize efficiency, and deliver exceptional service experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button className="btn-hero text-lg px-8 py-4">
                  Get Scheduling Analysis
                </Button>
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                  See Demo
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

        {/* Use Cases Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Intelligent <span className="gradient-text">Scheduling Solutions</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Transform scheduling across industries with AI-powered optimization and automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-bold">{useCase.title}</h3>
                    </div>
                    
                    <p className="text-foreground/70 mb-6">{useCase.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      {useCase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                      {useCase.result}
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
                  Advanced <span className="gradient-text">Scheduling Engine</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our intelligent scheduling platform uses AI algorithms to optimize resource allocation, 
                  predict conflicts, and automatically adjust schedules for maximum efficiency.
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
                      <Settings className="h-6 w-6 text-primary" />
                      Implementation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Current Process Analysis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">System Integration Setup</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Rules Engine Configuration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Testing & Optimization</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Bell className="h-5 w-5 text-secondary" />
                      Smart Features
                    </h4>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Predictive conflict detection</li>
                      <li>• Automatic rescheduling suggestions</li>
                      <li>• Capacity optimization algorithms</li>
                      <li>• Multi-criteria decision making</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Universal <span className="gradient-text">Calendar Integration</span>
                  </h2>
                  <p className="text-foreground/70">
                    Seamlessly connect with your existing tools and platforms
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

        {/* Performance Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Card className="glass-card">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Measurable <span className="gradient-text">Performance Improvements</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">95%</div>
                    <div className="text-sm text-foreground/70">Schedule Accuracy</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">75%</div>
                    <div className="text-sm text-foreground/70">Time Savings</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">50%</div>
                    <div className="text-sm text-foreground/70">Conflict Reduction</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold gradient-text mb-2">85%</div>
                    <div className="text-sm text-foreground/70">Resource Utilization</div>
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
                  Ready to <span className="gradient-text">Optimize Your Schedule</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Transform your scheduling operations with intelligent automation that saves time, 
                  reduces conflicts, and maximizes resource efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Get Free Scheduling Assessment
                  </Button>
                  <Button variant="outline" className="btn-ghost text-lg px-8 py-4">
                    Book System Demo
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

export default SchedulingManagement;