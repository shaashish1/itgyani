import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const featuredItems = [
  {
    badge: "Trending",
    badgeColor: "bg-neon-green text-black",
    title: "10 Best Sales Automation Workflows",
    description: "Boost your pipeline with these ready-to-use automations",
    image: "/images/generated/workflow-optimization.svg",
    cta: "View Workflow",
    href: "/automation",
  },
  {
    badge: "Hot",
    badgeColor: "bg-destructive text-white",
    title: "Lead Generation AI Agent",
    description: "Automatically find and qualify leads while you sleep",
    image: "/images/generated/ai-automation-guide.svg",
    cta: "Launch Agent",
    href: "/ai-agents",
  },
  {
    badge: "Top Rated",
    badgeColor: "bg-yellow-500 text-black",
    title: "Complete AI Automation Masterclass",
    description: "Learn to build no-code automations in 30 days",
    image: "/images/generated/academy-header.svg",
    rating: 5,
    reviews: "1,240",
    cta: "Enroll Now",
    href: "/academy",
  },
  {
    badge: "New",
    badgeColor: "bg-electric-blue text-white",
    title: "Instagram Carousel Templates Pack",
    description: "50+ AI-generated carousel designs for your brand",
    image: "/images/generated/automation-trends.svg",
    cta: "Download Free",
    href: "/ai-studio",
  },
];

const FeaturedSlider = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured Highlights
          </h2>
          <p className="text-lg font-body text-muted-foreground">
            Trending innovations and top-rated solutions
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featuredItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to={item.href}>
                  <Card className="group relative h-[400px] overflow-hidden rounded-2xl border border-white/10 hover:border-neon-green/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-neon-green/20">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${item.badgeColor} font-semibold`}>
                        {item.badge}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-2xl font-display font-bold mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="text-base font-body text-gray-300 mb-4">
                        {item.description}
                      </p>
                      
                      {item.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">({item.reviews} reviews)</span>
                        </div>
                      )}
                      
                      <Button
                        variant="ghost"
                        className="text-electric-blue hover:text-neon-green hover:bg-transparent p-0 group-hover:gap-3 transition-all"
                      >
                        {item.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
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

export default FeaturedSlider;
