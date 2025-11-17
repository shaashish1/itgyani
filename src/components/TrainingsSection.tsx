import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const trainings = [
  {
    badge: "Beginner",
    badgeColor: "bg-neon-green text-black",
    title: "AI Fundamentals for Everyone",
    instructor: "Sarah Chen",
    instructorAvatar: "",
    duration: "8 hours",
    lessons: "24 lessons",
    students: "3,200 enrolled",
    rating: 4.8,
    reviews: "640",
    price: "Free",
    image: "/images/generated/academy-header.svg",
  },
  {
    badge: "Advanced",
    badgeColor: "bg-destructive text-white",
    title: "Advanced Workflow Automation",
    instructor: "Michael Torres",
    instructorAvatar: "",
    duration: "12 hours",
    lessons: "36 lessons",
    students: "1,850 enrolled",
    rating: 4.9,
    reviews: "890",
    price: "$99",
    originalPrice: "$149",
    image: "/images/generated/workflow-optimization.svg",
  },
  {
    badge: "Intermediate",
    badgeColor: "bg-electric-blue text-white",
    title: "AI Content Creation Bootcamp",
    instructor: "Emma Rodriguez",
    instructorAvatar: "",
    duration: "10 hours",
    lessons: "30 lessons",
    students: "2,450 enrolled",
    rating: 4.7,
    reviews: "520",
    price: "$79",
    image: "/images/generated/automation-trends.svg",
  },
];

const TrainingsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Master AI Skills
          </h2>
          <p className="text-lg font-body text-muted-foreground">
            Expert-led courses from beginner to advanced
          </p>
        </div>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainings.map((training, index) => (
            <Card
              key={index}
              className="glass-card border border-white/10 rounded-2xl overflow-hidden hover:border-neon-green/50 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-green/10"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <Badge className={`absolute top-3 left-3 ${training.badgeColor} font-semibold`}>
                  {training.badge}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-3">
                  {training.title}
                </h3>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center text-neon-green font-semibold text-xs">
                    {training.instructor.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span>{training.instructor}</span>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4 text-electric-blue" />
                    <span>{training.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-neon-green" />
                    <span>{training.lessons}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4 text-electric-blue" />
                    <span className="text-[10px]">{training.students}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(training.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{training.rating}</span>
                  <span className="text-xs text-muted-foreground">({training.reviews} reviews)</span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-2xl font-display font-bold ${training.price === "Free" ? "text-neon-green" : ""}`}>
                      {training.price}
                    </span>
                    {training.originalPrice && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {training.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link to="/academy">
                    <Button className="bg-gradient-to-r from-neon-green to-electric-blue text-black font-semibold hover:shadow-lg hover:shadow-neon-green/20">
                      {training.price === "Free" ? "Start Learning" : "Enroll Now"}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/academy">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue/10"
            >
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrainingsSection;
