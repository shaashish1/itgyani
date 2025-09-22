import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap,
  Clock,
  Users,
  Star,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowRight,
  Filter,
  Search,
  Download,
  Video,
  FileText,
  Laptop,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

const Academy = () => {
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const learningTracks = [
    {
      id: "beginner",
      title: "Automation Fundamentals",
      description: "Start your AI automation journey with core concepts and basic workflows",
      courses: 8,
      duration: "12 hours",
      students: 5200,
      color: "bg-green-500/10 border-green-500/20 text-green-600"
    },
    {
      id: "intermediate", 
      title: "Advanced Workflows",
      description: "Master complex automation scenarios and integration patterns",
      courses: 12,
      duration: "18 hours", 
      students: 3800,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600"
    },
    {
      id: "expert",
      title: "AI & Machine Learning",
      description: "Implement AI models and machine learning in automation workflows",
      courses: 10,
      duration: "25 hours",
      students: 2100,
      color: "bg-purple-500/10 border-purple-500/20 text-purple-600"
    },
    {
      id: "business",
      title: "Business Strategy",
      description: "Strategic implementation and ROI optimization for enterprises",
      courses: 6,
      duration: "8 hours",
      students: 1500,
      color: "bg-orange-500/10 border-orange-500/20 text-orange-600"
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to n8n Automation",
      description: "Learn the fundamentals of workflow automation using n8n platform",
      duration: "2 hours",
      difficulty: "Beginner",
      students: "12.3K",
      rating: 4.8,
      track: "beginner",
      type: "video",
      content: "Master the basics of n8n automation platform with hands-on examples. Learn to create your first workflows, understand node connections, and implement basic automation patterns. Covers workflow design principles, debugging techniques, and best practices for maintainable automation."
    },
    {
      id: 2,
      title: "Advanced Data Processing with Python and AI",
      description: "Learn to process large datasets using Python functions within n8n workflows",
      duration: "45 minutes",
      difficulty: "Advanced",
      students: "8.7K",
      rating: 4.9,
      track: "expert",
      type: "hands-on",
      content: "Build sophisticated data processing workflows combining Python scripting with AI models for advanced analytics. Learn data ingestion, Python-based cleaning and transformation, AI-powered analysis, pattern recognition, and automated reporting systems."
    },
    {
      id: 3,
      title: "API Integration Masterclass",
      description: "Comprehensive guide to integrating various APIs and services",
      duration: "3 hours",
      difficulty: "Intermediate",
      students: "9.2K", 
      rating: 4.7,
      track: "intermediate",
      type: "video",
      content: "Master API integrations with comprehensive coverage of REST APIs, webhooks, authentication methods, error handling, and rate limiting. Build robust integrations with popular services like Salesforce, HubSpot, and custom APIs."
    },
    {
      id: 4,
      title: "Building AI Customer Support Systems",
      description: "Create intelligent customer support workflows with OpenAI integration",
      duration: "90 minutes",
      difficulty: "Advanced",
      students: "6.1K",
      rating: 4.9,
      track: "expert",
      type: "project",
      content: "Build end-to-end AI customer support systems using OpenAI API, natural language processing, automated ticket routing, sentiment analysis, and intelligent response generation. Includes real-world case studies and implementation patterns."
    },
    {
      id: 5,
      title: "E-commerce Automation Strategies",
      description: "Automate order processing, inventory management, and customer communications",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      students: "7.8K",
      rating: 4.6,
      track: "business",
      type: "hands-on",
      content: "Comprehensive e-commerce automation covering order processing, inventory management, customer communications, automated marketing campaigns, and integration with major e-commerce platforms like Shopify and WooCommerce."
    },
    {
      id: 6,
      title: "Financial Data Analysis & Reporting",
      description: "Automate financial reporting and analysis workflows",
      duration: "2 hours",
      difficulty: "Advanced",
      students: "4.9K",
      rating: 4.8,
      track: "expert",
      type: "project",
      content: "Build automated financial analysis systems with real-time data processing, automated report generation, risk assessment algorithms, compliance monitoring, and integration with financial APIs and databases."
    }
  ];

  const certifications = [
    {
      title: "Certified n8n Automation Specialist",
      description: "Fundamental certification covering basic automation principles and n8n platform mastery",
      courses: 8,
      duration: "20 hours",
      badge: "Specialist",
      students: 2800
    },
    {
      title: "Advanced AI Automation Expert", 
      description: "Advanced certification for implementing AI models and machine learning in automation workflows",
      courses: 12,
      duration: "35 hours",
      badge: "Expert",
      students: 1200
    },
    {
      title: "Enterprise Automation Architect",
      description: "Strategic certification for designing and implementing enterprise-scale automation solutions",
      courses: 15,
      duration: "45 hours", 
      badge: "Architect",
      students: 650
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesTrack = selectedTrack === "all" || course.track === selectedTrack;
    const matchesDifficulty = selectedDifficulty === "all" || course.difficulty.toLowerCase() === selectedDifficulty;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTrack && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200";
      case "intermediate": return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="w-4 h-4" />;
      case "hands-on": return <Laptop className="w-4 h-4" />;
      case "project": return <Target className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
              <GraduationCap className="w-4 h-4 mr-2" />
              AI Automation Academy
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master <span className="gradient-text">AI Automation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Comprehensive learning platform with structured courses, hands-on tutorials, and industry certifications. 
              Join 25,000+ professionals advancing their AI automation skills.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow our expertly designed curriculum to master AI automation step by step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningTracks.map((track, index) => (
              <Card key={track.id} className={`glass-card hover-lift cursor-pointer transition-all ${track.color}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <CardDescription>{track.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Courses</span>
                      <span className="font-semibold">{track.courses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{track.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Students</span>
                      <span className="font-semibold">{track.students.toLocaleString()}</span>
                    </div>
                    <Button 
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => setSelectedTrack(track.id)}
                    >
                      Start Learning
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Course Catalog
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our comprehensive collection of hands-on courses and tutorials
            </p>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-border rounded-lg bg-background"
                value={selectedTrack}
                onChange={(e) => setSelectedTrack(e.target.value)}
              >
                <option value="all">All Tracks</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
                <option value="business">Business</option>
              </select>
              <select
                className="px-4 py-2 border border-border rounded-lg bg-background"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(course.difficulty)} variant="outline">
                      {course.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getTypeIcon(course.type)}
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {course.rating}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {course.content}
                    </p>
                    
                    <Button className="w-full">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Start Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industry Certifications
            </h2>
            <p className="text-lg text-muted-foreground">
              Earn recognized certifications to validate your AI automation expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="glass-card hover-lift text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {cert.badge}
                    </Badge>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-lg">{cert.courses}</div>
                        <div className="text-muted-foreground">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg">{cert.duration}</div>
                        <div className="text-muted-foreground">Duration</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">{cert.students}</div>
                      <div className="text-xs text-muted-foreground">Certified Professionals</div>
                    </div>
                    
                    <Button className="w-full">
                      Start Certification
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your AI Automation Journey Today
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who have transformed their careers with AI automation skills. 
            Start with our free introductory course or explore our full certification programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Start Free Course
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              <Download className="w-4 h-4 mr-2" />
              Download Curriculum
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <PopupManager page="academy" />
    </div>
  );
};

export default Academy;