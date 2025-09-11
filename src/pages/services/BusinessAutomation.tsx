import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import ConsultationModal from "@/components/modals/ConsultationModal";
import { ArrowLeft, CheckCircle, Zap, Clock, DollarSign, Users, Workflow, BarChart, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const BusinessAutomation = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const benefits = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "90% Time Savings",
      description: "Eliminate manual data entry and repetitive tasks"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-secondary" />,
      title: "ROI in 30 Days",
      description: "See immediate cost savings and efficiency gains"
    },
    {
      icon: <Users className="h-6 w-6 text-primary-glow" />,
      title: "Team Productivity",
      description: "Free your team to focus on high-value work"
    }
  ];

  const features = [
    "Custom Workflow Design & Implementation",
    "Real-time Process Monitoring & Analytics",
    "Automated Approval & Review Processes",
    "Document Management & Routing",
    "Data Validation & Error Handling",
    "Integration with Existing Systems",
    "Compliance & Audit Trail Management",
    "Scalable Architecture for Growth"
  ];

  const useCases = [
    {
      title: "Invoice Processing",
      description: "Automatically extract, validate, and process invoices from multiple vendors",
      timesSaved: "15 hours/week"
    },
    {
      title: "Employee Onboarding",
      description: "Streamline new hire paperwork, system access, and training workflows",
      timesSaved: "8 hours/employee"
    },
    {
      title: "Expense Management",
      description: "Automate expense report submissions, approvals, and reimbursements",
      timesSaved: "12 hours/week"
    },
    {
      title: "Quality Assurance",
      description: "Implement automated QA checks and reporting across production processes",
      timesSaved: "20 hours/week"
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
                Business Process Automation
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Streamline Your <span className="gradient-text">Business Operations</span>
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                Transform manual processes into intelligent, automated workflows that scale with your business. 
                Reduce errors, save time, and boost productivity across every department.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  className="btn-hero text-lg px-8 py-4"
                  onClick={() => setConsultationModalOpen(true)}
                >
                  Schedule Free Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-ghost text-lg px-8 py-4"
                  onClick={() => setConsultationModalOpen(true)}
                >
                  View Case Studies
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
                  Comprehensive <span className="gradient-text">Automation Features</span>
                </h2>
                <p className="text-lg text-foreground/80 mb-8">
                  Our business process automation solutions are designed to handle complex workflows 
                  while maintaining flexibility and scalability for your growing business needs.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <Workflow className="h-6 w-6 text-primary" />
                      Implementation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <span className="text-sm">Process Analysis & Mapping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <span className="text-sm">Workflow Design & Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <span className="text-sm">Testing & Quality Assurance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <span className="text-sm">Deployment & Training</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Real-World <span className="gradient-text">Success Stories</span>
              </h2>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                See how businesses like yours have transformed their operations with our automation solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="glass-card hover-glow">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold">{useCase.title}</h3>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {useCase.timesSaved}
                      </Badge>
                    </div>
                    <p className="text-foreground/70 mb-6">{useCase.description}</p>
                    <Button 
                      variant="ghost" 
                      className="btn-ghost w-full"
                      onClick={() => setConsultationModalOpen(true)}
                    >
                      View Full Case Study
                    </Button>
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
                  Ready to <span className="gradient-text">Automate Your Success</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
                  Let our automation experts analyze your processes and design a custom solution 
                  that delivers measurable results within 30 days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="btn-hero text-lg px-8 py-4"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Get Free Process Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    className="btn-ghost text-lg px-8 py-4"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Download ROI Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        serviceType="Business Process Automation"
      />

      <Footer />
    </div>
  );
};

export default BusinessAutomation;