import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Sparkles, Database, Search, Zap, CheckCircle } from "lucide-react";

const agents = [
  {
    icon: Target,
    name: "Lead Generation Agent",
    purpose: "Automatically find and qualify high-value leads",
    capabilities: [
      "LinkedIn & website scraping",
      "Email verification & scoring",
      "CRM integration",
    ],
    tags: ["Sales", "B2B", "Outreach"],
    price: "$49/month",
    color: "neon-green",
  },
  {
    icon: Sparkles,
    name: "Social Media Post Agent",
    purpose: "Create engaging posts for all platforms",
    capabilities: [
      "Multi-platform content",
      "AI image generation",
      "Hashtag optimization",
    ],
    tags: ["Marketing", "Social Media", "Content"],
    price: "$39/month",
    color: "electric-blue",
  },
  {
    icon: Database,
    name: "CRM Automation Agent",
    purpose: "Sync and automate your CRM workflows",
    capabilities: [
      "Data entry automation",
      "Pipeline management",
      "Follow-up reminders",
    ],
    tags: ["CRM", "Sales", "Operations"],
    price: "$59/month",
    color: "neon-green",
  },
  {
    icon: Search,
    name: "Research Agent",
    purpose: "Conduct deep research on any topic",
    capabilities: [
      "Web scraping & analysis",
      "Competitive intelligence",
      "Report generation",
    ],
    tags: ["Research", "Analysis", "Strategy"],
    price: "$69/month",
    color: "electric-blue",
  },
  {
    icon: Zap,
    name: "Task Execution Agent",
    purpose: "Execute complex multi-step tasks",
    capabilities: [
      "Workflow orchestration",
      "API integrations",
      "Error handling",
    ],
    tags: ["Automation", "DevOps", "Integration"],
    price: "$79/month",
    color: "neon-green",
  },
];

const AIAgentStore = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            AI Agent Marketplace
          </h2>
          <p className="text-lg font-body text-muted-foreground">
            Deploy intelligent agents in seconds — no coding required
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            const isGreen = agent.color === "neon-green";
            
            return (
              <Card
                key={index}
                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-400 group"
                style={{
                  boxShadow: `0 20px 50px -10px ${isGreen ? "rgba(0, 255, 156, 0)" : "rgba(26, 140, 255, 0)"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 30px 60px -10px ${isGreen ? "rgba(0, 255, 156, 0.2)" : "rgba(26, 140, 255, 0.2)"}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 50px -10px ${isGreen ? "rgba(0, 255, 156, 0)" : "rgba(26, 140, 255, 0)"}`;
                }}
              >
                {/* Icon */}
                <div className={`w-20 h-20 rounded-xl bg-${agent.color}/20 flex items-center justify-center mb-6 mx-auto`}>
                  <Icon className={`h-10 w-10 text-${agent.color}`} />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-display font-bold mb-3 text-center">
                  {agent.name}
                </h3>

                {/* Purpose */}
                <p className="text-base font-body text-muted-foreground text-center mb-6">
                  {agent.purpose}
                </p>

                {/* Capabilities */}
                <div className="space-y-2 mb-6">
                  {agent.capabilities.map((capability, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className={`h-4 w-4 mt-0.5 text-${agent.color} flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground">{capability}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {agent.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs border-white/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-2xl font-display font-bold">{agent.price}</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2">
                  <Button className={`w-full bg-gradient-to-r from-${agent.color} to-electric-blue text-black font-semibold hover:shadow-lg`}>
                    Deploy Agent
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/5">
                    Preview Demo
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AIAgentStore;
