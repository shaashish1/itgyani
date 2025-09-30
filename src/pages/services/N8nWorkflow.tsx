import FutureFlowHeader from "@/components/FutureFlowHeader";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, ArrowRight, Workflow, GitBranch, Clock, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const N8nWorkflow = () => {
  const features = [
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Design complex automation workflows with an intuitive drag-and-drop interface"
    },
    {
      icon: GitBranch,
      title: "API Integrations",
      description: "Connect 400+ apps and services including CRM, marketing tools, and databases"
    },
    {
      icon: Clock,
      title: "Real-time Sync",
      description: "Keep your data synchronized across all platforms in real-time"
    },
    {
      icon: BarChart,
      title: "Performance Monitoring",
      description: "Track workflow execution, errors, and performance metrics"
    }
  ];

  const useCases = [
    {
      title: "Lead Management Automation",
      description: "Automatically route leads from forms to CRM, send notifications, and trigger follow-up sequences"
    },
    {
      title: "Data Synchronization",
      description: "Keep customer data synchronized between your e-commerce platform, CRM, and marketing tools"
    },
    {
      title: "Notification Systems",
      description: "Create intelligent notification workflows across email, Slack, SMS, and other channels"
    },
    {
      title: "Report Generation",
      description: "Automatically compile and distribute reports from multiple data sources"
    }
  ];

  const integrations = [
    "Salesforce", "HubSpot", "Slack", "Google Workspace", "Microsoft 365",
    "Shopify", "WooCommerce", "Stripe", "Mailchimp", "Zapier"
  ];

  return (
    <div className="min-h-screen bg-background">
      <FutureFlowHeader />
      <main>
        <section className="py-24 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              n8n Workflow Design
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Custom Automation Workflows with n8n
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Transform your business operations with powerful, visual automation workflows. 
              Connect your tools, automate repetitive tasks, and scale your operations efficiently.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/case-studies">View Examples</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      {useCase.title}
                    </CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Integrations</h2>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {integrations.map((integration, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-base">
                  {integration}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Automate?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's build custom workflows that streamline your operations and boost productivity.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default N8nWorkflow;
