import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  Star,
  ArrowLeft,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Award,
  Video,
  Laptop,
  Target
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const LearningTrackDetail = () => {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const learningTracks = [
    {
      id: "beginner",
      title: "AI Automation Fundamentals",
      description: "Master the basics of n8n, AI integration, and workflow automation from scratch",
      courses: 10,
      duration: "16 hours",
      students: 15420,
      color: "bg-green-500/10 border-green-500/20 text-green-600",
      longDescription: "Perfect for complete beginners to AI and automation. Start with n8n basics, learn to connect APIs, and build your first AI-powered workflows. No coding required - you'll use visual workflow builders and pre-built AI integrations to create powerful automations.",
      learningOutcomes: [
        "Set up and navigate n8n workspace",
        "Create basic automation workflows with visual builder",
        "Integrate common apps and services (Gmail, Slack, Google Sheets)",
        "Connect AI models to your workflows",
        "Build simple chatbots and AI assistants",
        "Understand API basics and webhooks",
        "Implement error handling and testing",
        "Deploy and monitor your automations"
      ],
      prerequisites: "No prior experience required. Basic computer literacy is all you need.",
      coursesInTrack: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      id: "intermediate",
      title: "Advanced AI Workflows",
      description: "Build sophisticated AI-powered automation systems with complex logic and integrations",
      courses: 12,
      duration: "24 hours",
      students: 8750,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600",
      longDescription: "Take your automation skills to the next level. Learn advanced n8n techniques, master multiple AI model integrations, and build production-ready systems. You'll work with complex data transformations, multi-step AI workflows, and enterprise integrations.",
      learningOutcomes: [
        "Design complex multi-step AI workflows",
        "Integrate multiple AI models (GPT, Claude, Gemini, custom models)",
        "Build advanced data processing pipelines",
        "Implement conditional logic and dynamic routing",
        "Create RAG (Retrieval Augmented Generation) systems",
        "Master database integrations and data management",
        "Optimize workflow performance and costs",
        "Build AI agents with memory and context",
        "Handle advanced error scenarios and retries",
        "Implement workflow versioning and testing"
      ],
      prerequisites: "Completion of AI Automation Fundamentals or 3+ months experience with basic n8n workflows.",
      coursesInTrack: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    },
    {
      id: "expert",
      title: "AI Engineering & Custom Models",
      description: "Deploy custom AI models, build scalable systems, and create enterprise solutions",
      courses: 15,
      duration: "35 hours",
      students: 4280,
      color: "bg-purple-500/10 border-purple-500/20 text-purple-600",
      longDescription: "Become an AI automation expert. Deploy custom machine learning models, build scalable enterprise systems, and create advanced AI solutions. Learn to fine-tune models, optimize costs, and architect production-grade AI automation infrastructure.",
      learningOutcomes: [
        "Deploy and manage custom AI models",
        "Fine-tune LLMs for specific use cases",
        "Build vector databases and semantic search systems",
        "Implement advanced RAG architectures",
        "Create multi-agent AI systems",
        "Optimize AI costs and performance at scale",
        "Build enterprise-grade automation infrastructure",
        "Implement AI monitoring and observability",
        "Design fault-tolerant AI workflows",
        "Create custom n8n nodes and integrations",
        "Master AI security and compliance",
        "Architect microservices-based automation"
      ],
      prerequisites: "Strong n8n and AI workflow experience. Python knowledge helpful. Completion of Advanced AI Workflows track recommended.",
      coursesInTrack: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
    },
    {
      id: "business",
      title: "AI Strategy & ROI Optimization",
      description: "Strategic implementation, team management, and maximizing ROI from AI automation",
      courses: 8,
      duration: "14 hours",
      students: 3650,
      color: "bg-orange-500/10 border-orange-500/20 text-orange-600",
      longDescription: "Learn to think strategically about AI automation in business contexts. This track focuses on identifying high-impact opportunities, calculating ROI, managing AI projects, scaling teams, and aligning automation initiatives with business objectives.",
      learningOutcomes: [
        "Identify high-ROI automation opportunities",
        "Calculate and present AI automation ROI",
        "Build business cases for AI investments",
        "Manage AI automation projects and teams",
        "Design enterprise AI automation strategies",
        "Implement governance and compliance frameworks",
        "Scale AI automation across organizations",
        "Measure and optimize automation success metrics"
      ],
      prerequisites: "Business or project management experience. Basic understanding of AI automation concepts recommended.",
      coursesInTrack: [38, 39, 40, 41, 42, 43, 44, 45]
    }
  ];

  const allCourses = [
    // Beginner Track (1-10)
    { id: 1, title: "Getting Started with n8n", difficulty: "Beginner", duration: "1.5 hours", students: "15.4K", rating: 4.9, type: "video" },
    { id: 2, title: "Your First Automation Workflow", difficulty: "Beginner", duration: "2 hours", students: "14.8K", rating: 4.8, type: "hands-on" },
    { id: 3, title: "Connecting Apps & Services", difficulty: "Beginner", duration: "2.5 hours", students: "13.9K", rating: 4.7, type: "hands-on" },
    { id: 4, title: "Introduction to AI Integration", difficulty: "Beginner", duration: "2 hours", students: "12.6K", rating: 4.9, type: "video" },
    { id: 5, title: "Building Simple AI Chatbots", difficulty: "Beginner", duration: "3 hours", students: "11.8K", rating: 4.8, type: "project" },
    { id: 6, title: "API Basics & Webhooks", difficulty: "Beginner", duration: "2 hours", students: "11.2K", rating: 4.6, type: "video" },
    { id: 7, title: "Data Transformation Fundamentals", difficulty: "Beginner", duration: "2.5 hours", students: "10.5K", rating: 4.7, type: "hands-on" },
    { id: 8, title: "Error Handling & Debugging", difficulty: "Beginner", duration: "1.5 hours", students: "9.8K", rating: 4.8, type: "video" },
    { id: 9, title: "Workflow Testing Best Practices", difficulty: "Beginner", duration: "1 hour", students: "9.2K", rating: 4.7, type: "video" },
    { id: 10, title: "Deploying Your First Automation", difficulty: "Beginner", duration: "1.5 hours", students: "8.9K", rating: 4.9, type: "hands-on" },
    
    // Intermediate Track (11-22)
    { id: 11, title: "Advanced n8n Workflow Design", difficulty: "Intermediate", duration: "3 hours", students: "8.1K", rating: 4.8, type: "video" },
    { id: 12, title: "Multi-AI Model Integration", difficulty: "Intermediate", duration: "3.5 hours", students: "7.6K", rating: 4.9, type: "hands-on" },
    { id: 13, title: "Building RAG Systems with n8n", difficulty: "Intermediate", duration: "4 hours", students: "7.2K", rating: 4.9, type: "project" },
    { id: 14, title: "Advanced Data Processing Pipelines", difficulty: "Intermediate", duration: "3 hours", students: "6.8K", rating: 4.7, type: "hands-on" },
    { id: 15, title: "Conditional Logic & Dynamic Routing", difficulty: "Intermediate", duration: "2.5 hours", students: "6.5K", rating: 4.8, type: "video" },
    { id: 16, title: "Database Integration Masterclass", difficulty: "Intermediate", duration: "3.5 hours", students: "6.1K", rating: 4.8, type: "hands-on" },
    { id: 17, title: "AI Agents with Memory & Context", difficulty: "Intermediate", duration: "4 hours", students: "5.8K", rating: 4.9, type: "project" },
    { id: 18, title: "CRM & Marketing Automation", difficulty: "Intermediate", duration: "3 hours", students: "5.5K", rating: 4.7, type: "hands-on" },
    { id: 19, title: "E-commerce Automation with AI", difficulty: "Intermediate", duration: "3.5 hours", students: "5.2K", rating: 4.8, type: "project" },
    { id: 20, title: "Workflow Performance Optimization", difficulty: "Intermediate", duration: "2 hours", students: "4.9K", rating: 4.7, type: "video" },
    { id: 21, title: "Advanced Error Handling Strategies", difficulty: "Intermediate", duration: "2 hours", students: "4.6K", rating: 4.8, type: "video" },
    { id: 22, title: "Workflow Versioning & Testing", difficulty: "Intermediate", duration: "2.5 hours", students: "4.4K", rating: 4.7, type: "hands-on" },
    
    // Expert Track (23-37)
    { id: 23, title: "Custom AI Model Deployment", difficulty: "Advanced", duration: "5 hours", students: "4.1K", rating: 4.9, type: "project" },
    { id: 24, title: "Fine-Tuning LLMs for Workflows", difficulty: "Advanced", duration: "6 hours", students: "3.8K", rating: 4.9, type: "project" },
    { id: 25, title: "Vector Databases & Semantic Search", difficulty: "Advanced", duration: "4 hours", students: "3.6K", rating: 4.8, type: "hands-on" },
    { id: 26, title: "Advanced RAG Architectures", difficulty: "Advanced", duration: "5 hours", students: "3.4K", rating: 4.9, type: "project" },
    { id: 27, title: "Multi-Agent AI Systems", difficulty: "Advanced", duration: "6 hours", students: "3.2K", rating: 4.9, type: "project" },
    { id: 28, title: "AI Cost Optimization at Scale", difficulty: "Advanced", duration: "3 hours", students: "3.0K", rating: 4.8, type: "video" },
    { id: 29, title: "Enterprise Automation Infrastructure", difficulty: "Advanced", duration: "5 hours", students: "2.8K", rating: 4.8, type: "hands-on" },
    { id: 30, title: "AI Monitoring & Observability", difficulty: "Advanced", duration: "3.5 hours", students: "2.6K", rating: 4.7, type: "video" },
    { id: 31, title: "Fault-Tolerant AI Workflows", difficulty: "Advanced", duration: "4 hours", students: "2.5K", rating: 4.8, type: "hands-on" },
    { id: 32, title: "Building Custom n8n Nodes", difficulty: "Advanced", duration: "5 hours", students: "2.3K", rating: 4.9, type: "project" },
    { id: 33, title: "AI Security & Compliance", difficulty: "Advanced", duration: "3.5 hours", students: "2.2K", rating: 4.8, type: "video" },
    { id: 34, title: "Microservices-Based Automation", difficulty: "Advanced", duration: "5 hours", students: "2.1K", rating: 4.8, type: "project" },
    { id: 35, title: "Advanced Python Integration", difficulty: "Advanced", duration: "4 hours", students: "2.0K", rating: 4.7, type: "hands-on" },
    { id: 36, title: "Real-Time AI Processing", difficulty: "Advanced", duration: "4.5 hours", students: "1.9K", rating: 4.8, type: "project" },
    { id: 37, title: "Enterprise AI Architecture", difficulty: "Advanced", duration: "5 hours", students: "1.8K", rating: 4.9, type: "video" },
    
    // Business Track (38-45)
    { id: 38, title: "AI ROI Analysis & Metrics", difficulty: "Intermediate", duration: "2.5 hours", students: "3.5K", rating: 4.7, type: "video" },
    { id: 39, title: "Building Business Cases for AI", difficulty: "Intermediate", duration: "2 hours", students: "3.3K", rating: 4.6, type: "video" },
    { id: 40, title: "AI Project Management", difficulty: "Intermediate", duration: "3 hours", students: "3.1K", rating: 4.7, type: "hands-on" },
    { id: 41, title: "Scaling AI Automation Teams", difficulty: "Intermediate", duration: "2.5 hours", students: "2.9K", rating: 4.8, type: "video" },
    { id: 42, title: "Enterprise AI Strategy", difficulty: "Advanced", duration: "3 hours", students: "2.7K", rating: 4.8, type: "video" },
    { id: 43, title: "AI Governance & Compliance", difficulty: "Advanced", duration: "2.5 hours", students: "2.5K", rating: 4.7, type: "video" },
    { id: 44, title: "Change Management for AI", difficulty: "Intermediate", duration: "2 hours", students: "2.4K", rating: 4.6, type: "video" },
    { id: 45, title: "Measuring AI Success Metrics", difficulty: "Intermediate", duration: "2 hours", students: "2.3K", rating: 4.7, type: "hands-on" }
  ];

  const track = learningTracks.find(t => t.id === trackId);

  if (!track) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Learning Track Not Found</h1>
          <p className="text-muted-foreground mb-8">The learning track you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/academy")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Academy
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const trackCourses = allCourses.filter(course => track.coursesInTrack.includes(course.id));

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
              <Badge className={`mb-6 ${track.color}`}>
                {track.id.charAt(0).toUpperCase() + track.id.slice(1)} Track
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {track.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-6">
                {track.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {track.courses} courses
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {track.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {track.students.toLocaleString()} students
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to={`/course/${trackCourses[0]?.id || 1}`}>
                  <Button size="lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Start Track
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    <Award className="w-5 h-5 mr-2" />
                    Get Certified
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="glass-card sticky top-20">
                <CardHeader>
                  <CardTitle>Track Details</CardTitle>
                  <CardDescription>Everything you need to know</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Prerequisites</h4>
                      <p className="text-sm text-muted-foreground">{track.prerequisites}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Total Courses</span>
                        <span className="font-semibold">{track.courses}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Est. Duration</span>
                        <span className="font-semibold">{track.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Students</span>
                        <span className="font-semibold">{track.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <Link to="/contact">
                      <Button className="w-full mt-4">
                        Enroll Now
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
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {track.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Courses in This Track</CardTitle>
                  <CardDescription>
                    {trackCourses.length} courses designed to build your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackCourses.map((course, index) => (
                      <Link key={course.id} to={`/course/${course.id}`}>
                        <div className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{course.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                {getTypeIcon(course.type)}
                                <span className="capitalize">{course.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </div>
                              <Badge className={getDifficultyColor(course.difficulty)} variant="outline">
                                {course.difficulty}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Track Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Structured learning path</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Hands-on projects</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Industry certification</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Lifetime access</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Expert support</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Other Tracks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore other learning paths to expand your skills
                    </p>
                    <Link to="/academy">
                      <Button variant="outline" className="w-full">
                        View All Tracks
                      </Button>
                    </Link>
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

export default LearningTrackDetail;
