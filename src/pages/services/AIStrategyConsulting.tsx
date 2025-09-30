import FutureFlowHeader from "@/components/FutureFlowHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle, ArrowRight, Target, TrendingUp, Shield, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const AIStrategyConsulting = () => {
  const services = [
    {
      icon: Target,
      title: "AI Readiness Assessment",
      description: "Comprehensive evaluation of your current infrastructure, processes, and team capabilities"
    },
    {
      icon: Lightbulb,
      title: "Custom AI Roadmap",
      description: "Strategic implementation plan tailored to your business goals and resources"
    },
    {
      icon: TrendingUp,
      title: "ROI Analysis",
      description: "Detailed cost-benefit analysis and projected returns on AI investments"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify and mitigate potential challenges in AI adoption"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Discovery Session",
      description: "Deep dive into your business challenges, goals, and current technology stack"
    },
    {
      step: "2",
      title: "Assessment & Analysis",
      description: "Evaluate your AI readiness and identify high-impact opportunities"
    },
    {
      step: "3",
      title: "Strategy Development",
      description: "Create a customized AI implementation roadmap with clear milestones"
    },
    {
      step: "4",
      title: "Implementation Support",
      description: "Ongoing guidance and support throughout your AI transformation journey"
    }
  ];

  const benefits = [
    "Avoid costly mistakes in AI implementation",
    "Prioritize initiatives with highest ROI",
    "Build internal AI capabilities",
    "Stay ahead of industry trends",
    "Ensure ethical and responsible AI use",
    "Scale AI solutions effectively"
  ];

  return (
    <div className="min-h-screen bg-background">
      <FutureFlowHeader />
      <main>
        <section className="py-24 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6">
              <Users className="w-4 h-4 mr-2" />
              AI Strategy Consulting
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expert Guidance for AI Implementation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Navigate your AI transformation with confidence. Get expert strategy consulting 
              to maximize ROI, minimize risks, and build sustainable AI capabilities.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Book Consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/resources">Free AI Assessment</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your AI Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a strategy session and get actionable insights to transform your business with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Card className="p-6 text-left">
                <CardHeader className="p-0 mb-4">
                  <CardTitle>Single Session</CardTitle>
                  <CardDescription>Perfect for quick wins</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-3xl font-bold mb-4">$500</div>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card className="p-6 text-left border-primary">
                <CardHeader className="p-0 mb-4">
                  <Badge className="w-fit mb-2">Most Popular</Badge>
                  <CardTitle>Strategic Package</CardTitle>
                  <CardDescription>Complete AI roadmap</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="text-3xl font-bold mb-4">$2,500</div>
                  <Button className="w-full" asChild>
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIStrategyConsulting;
