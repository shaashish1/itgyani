import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const templates = [
  { name: "Instagram Carousel #1", category: "Instagram", uses: "1.2k", image: "/images/generated/automation-trends.svg" },
  { name: "YouTube Script Template", category: "Video", uses: "890", image: "/images/generated/tech-innovation.svg" },
  { name: "LinkedIn Post #1", category: "LinkedIn", uses: "2.1k", image: "/images/generated/business-transformation.svg" },
  { name: "Tweet Thread Starter", category: "Twitter", uses: "1.5k", image: "/images/generated/ai-automation-guide.svg" },
  { name: "Reels Caption Pack", category: "Instagram", uses: "980", image: "/images/generated/workflow-optimization.svg" },
  { name: "Facebook Ad Template", category: "Ads", uses: "756", image: "/images/generated/ai-implementation.svg" },
  { name: "Email Campaign #1", category: "Email", uses: "1.8k", image: "/images/generated/case-study-success.svg" },
  { name: "Blog Outline Template", category: "Blog", uses: "1.1k", image: "/images/generated/automation-trends.svg" },
  { name: "Instagram Carousel #2", category: "Instagram", uses: "945", image: "/images/generated/business-transformation.svg" },
  { name: "LinkedIn Post #2", category: "LinkedIn", uses: "1.3k", image: "/images/generated/tech-innovation.svg" },
  { name: "YouTube Intro Script", category: "Video", uses: "670", image: "/images/generated/ai-automation-guide.svg" },
  { name: "Tweet Thread Pack", category: "Twitter", uses: "820", image: "/images/generated/workflow-optimization.svg" },
];

const categories = ["All", "Social Media", "Blog", "Video", "Email", "Ads"];

const ContentStudioGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Content Studio Templates
          </h2>
          <p className="text-lg font-body text-muted-foreground mb-6">
            Professional templates for every content need
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category)}
                size="sm"
                className={activeCategory === category ? "bg-neon-green text-black hover:bg-neon-green/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 4-Column Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="group glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-neon-green/50 hover:scale-[1.03] transition-all duration-300 hover:shadow-xl hover:shadow-neon-green/10"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-neon-green text-black font-semibold hover:bg-neon-green/90"
                    >
                      Use Template
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 text-white hover:text-neon-green"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-base font-display font-semibold mb-2 line-clamp-1">
                  {template.name}
                </h3>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs border-electric-blue text-electric-blue">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" />
                    <span>{template.uses} uses</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
          >
            Load More Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentStudioGallery;
