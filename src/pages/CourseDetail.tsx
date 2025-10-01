import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  Star,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Download,
  Share2,
  Video,
  Laptop,
  Target
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
      content: "Master the basics of n8n automation platform with hands-on examples. Learn to create your first workflows, understand node connections, and implement basic automation patterns. Covers workflow design principles, debugging techniques, and best practices for maintainable automation.",
      modules: [
        "Introduction to n8n Platform",
        "Setting Up Your First Workflow",
        "Understanding Nodes and Connections",
        "Data Flow and Transformations",
        "Debugging and Error Handling",
        "Best Practices and Patterns"
      ]
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
      content: "Build sophisticated data processing workflows combining Python scripting with AI models for advanced analytics. Learn data ingestion, Python-based cleaning and transformation, AI-powered analysis, pattern recognition, and automated reporting systems.",
      modules: [
        "Python Integration in n8n",
        "Data Ingestion and Validation",
        "Advanced Data Transformations",
        "AI Model Integration",
        "Pattern Recognition Techniques",
        "Automated Reporting Systems"
      ]
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
      content: "Master API integrations with comprehensive coverage of REST APIs, webhooks, authentication methods, error handling, and rate limiting. Build robust integrations with popular services like Salesforce, HubSpot, and custom APIs.",
      modules: [
        "REST API Fundamentals",
        "Authentication Methods (OAuth, API Keys, JWT)",
        "Webhook Implementation",
        "Error Handling and Retry Logic",
        "Rate Limiting Strategies",
        "Real-World Integration Examples"
      ]
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
      content: "Build end-to-end AI customer support systems using OpenAI API, natural language processing, automated ticket routing, sentiment analysis, and intelligent response generation. Includes real-world case studies and implementation patterns.",
      modules: [
        "OpenAI API Integration",
        "Natural Language Processing",
        "Automated Ticket Routing",
        "Sentiment Analysis Implementation",
        "Response Generation Strategies",
        "Case Studies and Best Practices"
      ]
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
      content: "Comprehensive e-commerce automation covering order processing, inventory management, customer communications, automated marketing campaigns, and integration with major e-commerce platforms like Shopify and WooCommerce.",
      modules: [
        "Order Processing Automation",
        "Inventory Management Systems",
        "Customer Communication Workflows",
        "Marketing Campaign Automation",
        "Shopify Integration",
        "WooCommerce Integration"
      ]
    }
  ];

  const course = courses.find(c => c.id === parseInt(id || "0"));

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/academy")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Academy
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      case "intermediate": return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "advanced": return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
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

      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Button
            variant="ghost"
            onClick={() => navigate("/academy")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Academy
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getDifficultyColor(course.difficulty)} variant="outline">
                  {course.difficulty}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  {getTypeIcon(course.type)}
                  <span className="text-sm capitalize">{course.type}</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {course.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {course.students} students
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {course.rating} rating
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact">
                  <Button size="lg">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    <Download className="w-5 h-5 mr-2" />
                    Download Materials
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Course
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-20">
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Track your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span className="font-semibold">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Modules</span>
                        <span className="font-semibold">{course.modules.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Completed</span>
                        <span className="font-semibold">0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Remaining</span>
                        <span className="font-semibold">{course.modules.length}</span>
                      </div>
                    </div>

                    <Link to="/contact">
                      <Button className="w-full mt-4" variant="outline">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Get Access
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>About This Course</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.content}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    {course.modules.length} modules to master {course.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.modules.map((module, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{module}</h4>
                        </div>
                        <CheckCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.modules.map((module, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{module}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Related Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Explore more courses in the {course.track} track to expand your skills.
                    </p>
                    <Link to="/academy">
                      <Button variant="outline" className="w-full mt-4">
                        Browse All Courses
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Learn from industry experts with years of experience in AI automation and workflow optimization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
