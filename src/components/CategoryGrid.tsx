import { Bot, Workflow, GraduationCap, Sparkles, Briefcase, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: Bot,
    title: "AI Agents",
    description: "Deploy custom task automators that work 24/7",
    href: "/ai-agents",
    color: "neon-green",
  },
  {
    icon: Workflow,
    title: "Automation Workflows",
    description: "Run tasks automatically across your favorite apps",
    href: "/automation",
    color: "electric-blue",
  },
  {
    icon: GraduationCap,
    title: "AI Training Academy",
    description: "Skill up in AI, automation, and prompt engineering",
    href: "/academy",
    color: "neon-green",
  },
  {
    icon: Sparkles,
    title: "AI Content Studio",
    description: "Generate social posts, carousels, and video scripts",
    href: "/ai-studio",
    color: "electric-blue",
  },
  {
    icon: Briefcase,
    title: "Business Automations",
    description: "CRM, sales, and marketing pipelines on autopilot",
    href: "/services/business-automation",
    color: "neon-green",
  },
  {
    icon: Wrench,
    title: "Tools & Resources",
    description: "Free templates, libraries, and community assets",
    href: "/resources",
    color: "electric-blue",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Explore Our Ecosystem
          </h2>
          <p className="text-lg md:text-xl font-body text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate, learn, and scale with AI
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isGreen = category.color === "neon-green";
            
            return (
              <Link
                key={index}
                to={category.href}
                className="group glass-card p-8 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-400"
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
                <div className={`w-16 h-16 rounded-xl bg-${category.color}/20 flex items-center justify-center mb-6`}>
                  <Icon className={`h-8 w-8 text-${category.color}`} />
                </div>
                
                <h3 className="text-xl font-display font-semibold mb-3">
                  {category.title}
                </h3>
                
                <p className="text-base font-body text-muted-foreground mb-4 line-clamp-2">
                  {category.description}
                </p>
                
                <div className={`inline-flex items-center gap-2 text-${category.color} group-hover:gap-3 transition-all duration-300 font-medium`}>
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
