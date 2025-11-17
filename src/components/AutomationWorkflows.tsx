import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const workflows = [
  {
    name: "Lead Enrichment Pipeline",
    description: "Automatically enrich leads with company data and social profiles",
    platform: "N8N",
    apps: ["Gmail", "OpenAI", "Slack", "Sheets"],
    timeSaved: "8hrs/week",
    users: "850+",
    flow: "Email Received → AI Analysis → Data Enrichment → CRM Update",
  },
  {
    name: "Content Publishing Automation",
    description: "Schedule and publish content across multiple platforms",
    platform: "N8N",
    apps: ["Notion", "Buffer", "Twitter", "LinkedIn"],
    timeSaved: "6hrs/week",
    users: "720+",
    flow: "Content Created → AI Optimization → Multi-Platform Post",
  },
  {
    name: "Customer Onboarding Flow",
    description: "Welcome new customers with personalized email sequences",
    platform: "N8N",
    apps: ["Stripe", "SendGrid", "Notion", "Slack"],
    timeSaved: "10hrs/week",
    users: "650+",
    flow: "New Customer → Welcome Email → Setup Tasks → Team Notify",
  },
  {
    name: "Email to CRM Sync",
    description: "Automatically sync important emails to your CRM",
    platform: "Zapier",
    apps: ["Gmail", "HubSpot", "Slack"],
    timeSaved: "5hrs/week",
    users: "980+",
    flow: "Email Received → Parse Data → CRM Entry → Notification",
  },
  {
    name: "Social Media Scheduler",
    description: "Queue and post content at optimal times",
    platform: "Zapier",
    apps: ["Airtable", "Twitter", "Instagram", "Facebook"],
    timeSaved: "7hrs/week",
    users: "1.2k+",
    flow: "Content Queue → Time Check → Multi-Post → Analytics",
  },
  {
    name: "E-commerce Order Processing",
    description: "Process orders and update inventory automatically",
    platform: "Make.com",
    apps: ["Shopify", "QuickBooks", "Sheets", "Email"],
    timeSaved: "12hrs/week",
    users: "540+",
    flow: "Order Placed → Payment → Inventory → Shipping → Receipt",
  },
  {
    name: "Invoice Generation Workflow",
    description: "Create and send invoices automatically",
    platform: "Make.com",
    apps: ["Stripe", "QuickBooks", "Gmail", "Drive"],
    timeSaved: "4hrs/week",
    users: "430+",
    flow: "Payment Received → Generate Invoice → Email → Archive",
  },
];

const AutomationWorkflows = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Popular Automations
          </h2>
          <p className="text-lg font-body text-muted-foreground mb-6">
            Ready-to-deploy workflows that save hours every week
          </p>
          
          {/* Platform Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="default" size="sm" className="bg-neon-green text-black hover:bg-neon-green/90">
              All
            </Button>
            <Button variant="ghost" size="sm">N8N</Button>
            <Button variant="ghost" size="sm">Zapier</Button>
            <Button variant="ghost" size="sm">Make.com</Button>
            <Button variant="ghost" size="sm">Custom</Button>
          </div>
        </div>

        {/* Workflows Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {workflows.map((workflow, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="glass-card p-6 rounded-2xl border border-white/10 hover:border-neon-green/50 hover:-translate-y-2 transition-all duration-300 h-full">
                  {/* Platform Badge */}
                  <Badge className="mb-4 bg-electric-blue text-white">{workflow.platform}</Badge>

                  {/* Integration Icons Row */}
                  <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                    {workflow.apps.map((app, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold">{app.slice(0, 2)}</span>
                        </div>
                        {i < workflow.apps.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Workflow Name */}
                  <h3 className="text-xl font-display font-bold mb-2">
                    {workflow.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm font-body text-muted-foreground mb-4 line-clamp-2">
                    {workflow.description}
                  </p>

                  {/* Flow Diagram */}
                  <div className="bg-white/5 rounded-lg p-3 mb-4">
                    <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                      {workflow.flow}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-electric-blue/20">
                      <Clock className="h-4 w-4 text-electric-blue" />
                      <span className="text-sm font-semibold text-electric-blue">
                        Saves {workflow.timeSaved}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Used by {workflow.users} users
                    </span>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-neon-green to-electric-blue text-black font-semibold hover:shadow-lg hover:shadow-neon-green/20">
                    Copy Workflow
                  </Button>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default AutomationWorkflows;
