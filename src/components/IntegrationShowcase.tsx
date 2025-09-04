import { 
  Mail, 
  MessageSquare, 
  ShoppingCart, 
  Database, 
  Github, 
  Globe, 
  Cloud, 
  CreditCard, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  Smartphone, 
  Video, 
  Lock, 
  Search,
  Slack,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Mic,
  Phone,
  MapPin,
  Briefcase,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const IntegrationShowcase = () => {
  const navigate = useNavigate();

  const handleIntegrationClick = (integrationName: string) => {
    const toolName = integrationName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/automation/${toolName}`);
  };
  const integrationCategories = [
    {
      title: "Communication",
      color: "primary",
      integrations: [
        { icon: Mail, name: "Gmail", description: "Email automation" },
        { icon: MessageSquare, name: "Slack", description: "Team messaging" },
        { icon: Smartphone, name: "Discord", description: "Community chat" },
        { icon: Video, name: "Zoom", description: "Video meetings" },
        { icon: Phone, name: "Twilio", description: "SMS & Voice" },
        { icon: Mic, name: "WhatsApp", description: "Messaging" }
      ]
    },
    {
      title: "E-commerce",
      color: "secondary",
      integrations: [
        { icon: ShoppingCart, name: "Shopify", description: "Online store" },
        { icon: CreditCard, name: "Stripe", description: "Payments" },
        { icon: Globe, name: "WooCommerce", description: "WordPress store" },
        { icon: Briefcase, name: "Amazon", description: "Marketplace" },
        { icon: TrendingUp, name: "BigCommerce", description: "E-commerce platform" },
        { icon: MapPin, name: "Square", description: "Point of sale" }
      ]
    },
    {
      title: "Productivity",
      color: "primary-glow",
      integrations: [
        { icon: FileText, name: "Notion", description: "All-in-one workspace" },
        { icon: Calendar, name: "Google Calendar", description: "Scheduling" },
        { icon: Database, name: "Airtable", description: "Database" },
        { icon: Cloud, name: "Google Drive", description: "File storage" },
        { icon: Settings, name: "Zapier", description: "Automation" },
        { icon: Activity, name: "Trello", description: "Project management" }
      ]
    },
    {
      title: "Development",
      color: "accent",
      integrations: [
        { icon: Github, name: "GitHub", description: "Code repository" },
        { icon: Globe, name: "Webhook", description: "HTTP requests" },
        { icon: Search, name: "Elasticsearch", description: "Search engine" },
        { icon: Lock, name: "Auth0", description: "Authentication" },
        { icon: Database, name: "PostgreSQL", description: "Database" },
        { icon: Settings, name: "Docker", description: "Containerization" }
      ]
    },
    {
      title: "Social Media",
      color: "primary",
      integrations: [
        { icon: Twitter, name: "Twitter", description: "Social networking" },
        { icon: Facebook, name: "Facebook", description: "Social platform" },
        { icon: Linkedin, name: "LinkedIn", description: "Professional network" },
        { icon: Instagram, name: "Instagram", description: "Photo sharing" },
        { icon: Youtube, name: "YouTube", description: "Video platform" },
        { icon: MessageSquare, name: "Telegram", description: "Messaging" }
      ]
    },
    {
      title: "Analytics",
      color: "secondary",
      integrations: [
        { icon: BarChart3, name: "Google Analytics", description: "Web analytics" },
        { icon: PieChart, name: "Mixpanel", description: "Product analytics" },
        { icon: TrendingUp, name: "HubSpot", description: "CRM analytics" },
        { icon: Activity, name: "Amplitude", description: "User analytics" },
        { icon: BarChart3, name: "Tableau", description: "Data visualization" },
        { icon: Users, name: "Salesforce", description: "CRM platform" }
      ]
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Connect <span className="gradient-text">Everything</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            With 400+ integrations, n8n connects all your favorite tools and services. 
            Build powerful automation workflows that span across your entire tech stack.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">400+ Integrations Available</span>
          </div>
        </div>

        {/* Integration Categories */}
        <div className="space-y-16">
          {integrationCategories.map((category, categoryIndex) => (
            <div key={category.title} className="animate-slide-up" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <div className={`w-16 h-1 bg-${category.color} mx-auto rounded-full`} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {category.integrations.map((integration, index) => {
                  const IconComponent = integration.icon;
                  return (
                    <Card 
                      key={integration.name} 
                      className="glass-card hover-glow group cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${(categoryIndex * 0.1) + (index * 0.05)}s` }}
                      onClick={() => handleIntegrationClick(integration.name)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-${category.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`h-6 w-6 text-${category.color}`} />
                        </div>
                        <h4 className="font-semibold mb-1 text-sm">{integration.name}</h4>
                        <p className="text-xs text-foreground/60">{integration.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Don't see your tool? <span className="gradient-text">No problem!</span>
            </h3>
            <p className="text-foreground/70 mb-6">
              With n8n's flexible webhook system and custom node creation, you can connect virtually any service with an API.
              Plus, new integrations are added regularly by our active community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Custom Webhooks</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">REST API Support</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">Community Nodes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full filter blur-xl animate-float" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full filter blur-xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-primary-glow/10 rounded-full filter blur-xl animate-drift" />
    </section>
  );
};

export default IntegrationShowcase;