import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Eye, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const contentItems = [
  {
    thumbnail: "/images/generated/ai-automation-guide.svg",
    category: "Tutorial",
    title: "Complete Guide to N8N Automation",
    author: { name: "Sarah Chen", avatar: "" },
    date: "2 days ago",
    readTime: "5 mins",
    rating: 5,
    reviews: 142,
    views: "2.4k",
  },
  {
    thumbnail: "/images/generated/workflow-optimization.svg",
    category: "Workflow",
    title: "Sales Pipeline Automation Blueprint",
    author: { name: "Michael Torres", avatar: "" },
    date: "3 days ago",
    readTime: "8 mins",
    rating: 4.8,
    reviews: 98,
    views: "1.8k",
  },
  {
    thumbnail: "/images/generated/business-transformation.svg",
    category: "Guide",
    title: "AI Content Creation for Social Media",
    author: { name: "Emma Rodriguez", avatar: "" },
    date: "5 days ago",
    readTime: "6 mins",
    rating: 4.9,
    reviews: 215,
    views: "3.1k",
  },
  {
    thumbnail: "/images/generated/tech-innovation.svg",
    category: "Tutorial",
    title: "Building Custom AI Agents",
    author: { name: "David Kim", avatar: "" },
    date: "1 week ago",
    readTime: "10 mins",
    rating: 5,
    reviews: 178,
    views: "2.9k",
  },
  {
    thumbnail: "/images/generated/automation-trends.svg",
    category: "Workflow",
    title: "CRM Integration Best Practices",
    author: { name: "Lisa Wang", avatar: "" },
    date: "1 week ago",
    readTime: "7 mins",
    rating: 4.7,
    reviews: 124,
    views: "2.2k",
  },
  {
    thumbnail: "/images/generated/ai-implementation.svg",
    category: "Guide",
    title: "Email Marketing Automation Setup",
    author: { name: "James Brown", avatar: "" },
    date: "2 weeks ago",
    readTime: "9 mins",
    rating: 4.8,
    reviews: 156,
    views: "2.7k",
  },
];

const tabs = ["All", "Tutorials", "Workflows", "Posts"];

const LatestContent = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-2">
              Latest from ITGyani
            </h2>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                onClick={() => setActiveTab(tab)}
                className={activeTab === tab ? "bg-neon-green text-black hover:bg-neon-green/90" : ""}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-8">
          {contentItems.map((item, index) => (
            <Link key={index} to="/blog">
              <Card className="group glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-neon-green/50 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-neon-green/10">
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 left-3 bg-electric-blue text-white font-semibold">
                    {item.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-3 line-clamp-2 group-hover:text-neon-green transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Meta Row */}
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.author.avatar} />
                        <AvatarFallback className="text-xs bg-neon-green/20 text-neon-green">
                          {item.author.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{item.author.name}</span>
                    </div>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{item.readTime}</span>
                  </div>
                  
                  {/* Rating & Views */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(item.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-electric-blue text-electric-blue hover:bg-electric-blue/10"
          >
            Load More Content
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestContent;
