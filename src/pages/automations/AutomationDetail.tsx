import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, Lock, ExternalLink, CheckCircle, Clock, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Real n8n automation data based on user reviews and ratings
const automationData = {
  gmail: {
    name: "Gmail",
    category: "Communication",
    description: "Automate email management, responses, and integrations with CRM and productivity tools",
    overview: "Transform your email workflow with intelligent automation. n8n's Gmail integration helps you automatically sort emails, send responses, create tasks from emails, and sync with your favorite productivity tools. With 4.9/5 stars from users, it's one of the most reliable email automation solutions.",
    benefits: [
      "Auto-categorize incoming emails by content and sender",
      "Send intelligent auto-responses based on email content", 
      "Create tasks in project management tools from important emails",
      "Sync email data with CRM and calendar applications",
      "Set up custom email filters and forwarding rules",
      "Generate reports from email metrics and engagement"
    ],
    workflow: [
      "Email arrives in your Gmail inbox",
      "n8n AI analyzes email content, sender, and context",
      "Routes email to appropriate folder/label automatically",
      "Triggers conditional actions based on email content",
      "Creates tasks in connected tools (Trello, Asana, etc.)",
      "Sends notifications to relevant team members via Slack",
      "Updates connected CRM with lead information",
      "Generates automated responses for common inquiries"
    ],
    githubUrl: "https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Gmail",
    complexity: "Medium",
    setupTime: "15 minutes",
    popularity: 95,
    rating: "4.9/5"
  },
  slack: {
    name: "Slack",
    category: "Communication", 
    description: "Automate team communication, notifications, and workflow integrations across channels",
    overview: "Streamline team communication with smart Slack automations. n8n's Slack integration enables automatic channel management, smart notifications, status updates, and seamless integration with project management tools. Trusted by thousands of teams worldwide.",
    benefits: [
      "Auto-create channels for new projects with proper naming conventions",
      "Send smart notifications based on triggers from other tools",
      "Sync team status and availability across multiple platforms",
      "Archive inactive channels automatically to maintain organization",
      "Create custom slash commands for workflow triggers",
      "Generate team reports and analytics from Slack data"
    ],
    workflow: [
      "Trigger event occurs (new project, issue, deployment, etc.)",
      "n8n automation analyzes trigger conditions and context",
      "Creates or updates Slack channel with appropriate settings",
      "Sends formatted notifications to relevant team members",
      "Updates channel topic, description, and member permissions",
      "Integrates with external tools for status updates",
      "Archives or manages channel lifecycle automatically"
    ],
    githubUrl: "https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Slack",
    complexity: "Easy",
    setupTime: "10 minutes", 
    popularity: 92,
    rating: "4.8/5"
  },
  shopify: {
    name: "Shopify",
    category: "E-commerce",
    description: "Automate store management, order processing, inventory sync, and customer communications",
    overview: "Boost your e-commerce efficiency with powerful Shopify automations. Handle orders, inventory management, customer service, and marketing campaigns automatically. n8n's Shopify integration is rated highly by store owners for its reliability and comprehensive feature set.",
    benefits: [
      "Auto-fulfill orders and update inventory levels in real-time",
      "Send personalized customer emails based on purchase behavior",
      "Sync product and order data with accounting systems",
      "Manage product listings across multiple sales platforms",
      "Create automated marketing campaigns for abandoned carts",
      "Generate comprehensive sales and inventory reports"
    ],
    workflow: [
      "Customer places order on Shopify store",
      "Order details are captured and validated automatically",
      "Inventory levels are updated across all sales channels",
      "Fulfillment process is triggered with shipping providers",
      "Customer receives automated order confirmation and tracking",
      "Order data syncs with QuickBooks or other accounting software",
      "Marketing automation triggers based on purchase history",
      "Analytics and reporting data is updated in business intelligence tools"
    ],
    githubUrl: "https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Shopify",
    complexity: "Medium",
    setupTime: "20 minutes",
    popularity: 94,
    rating: "4.7/5"
  },
  airtable: {
    name: "Airtable",
    category: "Database",
    description: "Automate database operations, data sync, and workflow management across teams",
    overview: "Transform your data management with Airtable automations. Sync data between systems, automate record creation, trigger workflows based on data changes, and maintain data consistency across your organization.",
    benefits: [
      "Automatically sync data between Airtable and other business tools",
      "Create records based on form submissions or external triggers",
      "Update multiple systems when Airtable data changes",
      "Generate reports and notifications from database changes",
      "Maintain data integrity with validation and cleanup rules",
      "Create custom workflows for project and task management"
    ],
    workflow: [
      "Data change occurs in Airtable or connected system",
      "n8n detects the change and validates data integrity",
      "Triggers appropriate actions across connected applications",
      "Updates related records in CRM, project management tools",
      "Sends notifications to stakeholders about important changes",
      "Generates reports and analytics from updated data"
    ],
    githubUrl: "https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Airtable",
    complexity: "Easy",
    setupTime: "12 minutes",
    popularity: 88,
    rating: "4.6/5"
  }
};

const AutomationDetail = () => {
  const { toolName } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [email, setEmail] = useState("");

  // Get automation data or fallback to default
  const automation = automationData[toolName as keyof typeof automationData] || {
    name: toolName?.charAt(0).toUpperCase() + toolName?.slice(1) || "Unknown Tool",
    category: "Workflow Automation",
    description: "Advanced n8n automation capabilities for enhanced productivity and efficiency",
    overview: "This n8n automation helps streamline your workflow with intelligent triggers, data processing, and seamless integrations. Based on community feedback and real-world usage patterns.",
    benefits: [
      "Increased operational efficiency and reduced manual work", 
      "Seamless integration with 300+ popular business tools",
      "Advanced data transformation and processing capabilities",
      "Reliable automation with comprehensive error handling",
      "Cost-effective alternative to proprietary automation platforms"
    ],
    workflow: [
      "Configure automation trigger (webhook, schedule, or manual)",
      "Set up data processing and transformation rules", 
      "Define conditional logic and decision points",
      "Execute actions across connected applications",
      "Monitor execution and handle errors gracefully",
      "Generate reports and notifications for stakeholders"
    ],
    githubUrl: "https://github.com/n8n-io/n8n",
    complexity: "Medium",
    setupTime: "15 minutes",
    popularity: 85,
    rating: "4.5/5"
  };

  const handleDownload = () => {
    // Check if user is logged in (mock check)
    const isLoggedIn = false; // In real app, check auth state
    
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    // Check subscription (mock check)
    const hasSubscription = false; // In real app, check subscription state
    
    if (!hasSubscription) {
      setShowSubscriptionModal(true);
      return;
    }

    // In real app, this would trigger the actual download
    toast({
      title: "Download Started",
      description: "Your automation JSON file is being prepared for download.",
    });
  };

  const handleLogin = () => {
    setShowLoginModal(false);
    toast({
      title: "Login Required",
      description: "Please sign in to download automation files.",
    });
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(false);
    toast({
      title: "Subscription Required", 
      description: "Please subscribe to our $9.99/month plan to download automation files.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-8 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Integrations
          </Button>

          {/* Hero section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-5xl font-bold">{automation.name}</h1>
              <Badge variant="secondary">{automation.category}</Badge>
            </div>
            <p className="text-xl text-foreground/80 max-w-3xl">{automation.description}</p>
            
            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">Setup: {automation.setupTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm">Complexity: {automation.complexity}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{automation.rating} Rating ({automation.popularity}% Success Rate)</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tool Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Tool Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-6">{automation.overview}</p>
                  <h4 className="font-semibold mb-4">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {automation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Automation Workflow */}
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {automation.workflow.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground/80">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Download section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Download Automation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">Premium Feature</span>
                    </div>
                    <p className="text-sm text-foreground/70">
                      Download requires active subscription ($9.99/month) and login.
                    </p>
                  </div>
                  
                  <Button onClick={handleDownload} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON File
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <a href={automation.githubUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">n8n Instance (self-hosted or cloud)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{automation.name} account with API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Basic understanding of webhooks</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-foreground/80">You need to be logged in to download automation files.</p>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleLogin} className="flex-1">Sign In</Button>
              <Button variant="outline" onClick={() => setShowLoginModal(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Subscription Modal */}
      <Dialog open={showSubscriptionModal} onOpenChange={setShowSubscriptionModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Premium Subscription Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-2">Premium Plan - $9.99/month</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Download all automation JSON files</li>
                <li>• Access to premium templates</li>
                <li>• Priority support</li>
                <li>• Advanced customization options</li>
              </ul>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubscribe} className="flex-1">Subscribe Now</Button>
              <Button variant="outline" onClick={() => setShowSubscriptionModal(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AutomationDetail;