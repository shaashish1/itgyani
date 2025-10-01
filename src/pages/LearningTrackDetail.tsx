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
      title: "Automation Fundamentals",
      description: "Start your AI automation journey with core concepts and basic workflows",
      courses: 8,
      duration: "12 hours",
      students: 5200,
      color: "bg-green-500/10 border-green-500/20 text-green-600",
      longDescription: "Perfect for newcomers to AI automation. This comprehensive track will take you from zero to confident in building your first automated workflows. You'll learn the fundamental concepts, tools, and best practices that form the foundation of all automation work.",
      learningOutcomes: [
        "Understand core automation concepts and terminology",
        "Build your first automated workflows from scratch",
        "Connect different services and APIs",
        "Implement basic error handling and debugging",
        "Design maintainable automation systems",
        "Apply best practices for workflow organization"
      ],
      prerequisites: "No prior experience required. Basic computer literacy is sufficient.",
      coursesInTrack: [1, 8, 12]
    },
    {
      id: "intermediate",
      title: "Advanced Workflows",
      description: "Master complex automation scenarios and integration patterns",
      courses: 12,
      duration: "18 hours",
      students: 3800,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600",
      longDescription: "Build on your foundational knowledge to create sophisticated, production-ready automation systems. Learn advanced integration patterns, complex workflow design, and optimization techniques used by professional automation engineers.",
      learningOutcomes: [
        "Design complex multi-step workflows",
        "Implement advanced API integration patterns",
        "Master conditional logic and routing",
        "Build scalable automation architectures",
        "Optimize workflow performance",
        "Handle advanced error scenarios"
      ],
      prerequisites: "Completion of Automation Fundamentals or equivalent experience with basic workflows.",
      coursesInTrack: [3, 7, 10, 15, 20]
    },
    {
      id: "expert",
      title: "AI & Machine Learning",
      description: "Implement AI models and machine learning in automation workflows",
      courses: 10,
      duration: "25 hours",
      students: 2100,
      color: "bg-purple-500/10 border-purple-500/20 text-purple-600",
      longDescription: "Dive deep into AI-powered automation. Learn to integrate cutting-edge AI models, implement machine learning algorithms, and build intelligent systems that can learn and adapt. This track covers everything from basic AI integration to advanced custom model deployment.",
      learningOutcomes: [
        "Integrate AI models (GPT, Claude, etc.) into workflows",
        "Implement natural language processing",
        "Build intelligent data processing pipelines",
        "Create AI-powered decision systems",
        "Deploy custom machine learning models",
        "Optimize AI workflow costs and performance"
      ],
      prerequisites: "Strong understanding of advanced workflows. Python knowledge recommended but not required.",
      coursesInTrack: [2, 4, 6, 9, 11, 13, 16, 18]
    },
    {
      id: "business",
      title: "Business Strategy",
      description: "Strategic implementation and ROI optimization for enterprises",
      courses: 6,
      duration: "8 hours",
      students: 1500,
      color: "bg-orange-500/10 border-orange-500/20 text-orange-600",
      longDescription: "Learn to think strategically about automation in business contexts. This track focuses on identifying automation opportunities, calculating ROI, managing automation projects, and aligning automation initiatives with business objectives.",
      learningOutcomes: [
        "Identify high-impact automation opportunities",
        "Calculate and present automation ROI",
        "Manage automation implementation projects",
        "Build business cases for automation",
        "Design enterprise-scale automation strategies",
        "Measure and optimize automation success"
      ],
      prerequisites: "Some business or project management experience helpful. Basic automation knowledge recommended.",
      coursesInTrack: [5, 10, 14, 17, 19]
    }
  ];

  const allCourses = [
    { id: 1, title: "Introduction to n8n Automation", difficulty: "Beginner", duration: "2 hours", students: "12.3K", rating: 4.8, type: "video" },
    { id: 2, title: "Advanced Data Processing with Python and AI", difficulty: "Advanced", duration: "45 minutes", students: "8.7K", rating: 4.9, type: "hands-on" },
    { id: 3, title: "API Integration Masterclass", difficulty: "Intermediate", duration: "3 hours", students: "9.2K", rating: 4.7, type: "video" },
    { id: 4, title: "Building AI Customer Support Systems", difficulty: "Advanced", duration: "90 minutes", students: "6.1K", rating: 4.9, type: "project" },
    { id: 5, title: "E-commerce Automation Strategies", difficulty: "Intermediate", duration: "2.5 hours", students: "7.8K", rating: 4.6, type: "hands-on" },
    { id: 6, title: "Financial Data Analysis & Reporting", difficulty: "Advanced", duration: "2 hours", students: "4.9K", rating: 4.8, type: "project" },
    { id: 7, title: "Email Marketing Automation", difficulty: "Intermediate", duration: "1.5 hours", students: "11.2K", rating: 4.7, type: "hands-on" },
    { id: 8, title: "Social Media Automation Strategy", difficulty: "Beginner", duration: "2 hours", students: "9.8K", rating: 4.5, type: "video" },
    { id: 9, title: "Database Integration and Management", difficulty: "Advanced", duration: "3.5 hours", students: "5.4K", rating: 4.8, type: "project" },
    { id: 10, title: "CRM Automation Essentials", difficulty: "Intermediate", duration: "2.5 hours", students: "8.9K", rating: 4.6, type: "hands-on" },
    { id: 11, title: "Webhook Security and Best Practices", difficulty: "Advanced", duration: "1 hour", students: "4.2K", rating: 4.9, type: "video" },
    { id: 12, title: "Project Management Automation", difficulty: "Beginner", duration: "2 hours", students: "10.5K", rating: 4.4, type: "hands-on" },
    { id: 13, title: "AI Content Generation Workflows", difficulty: "Advanced", duration: "3 hours", students: "6.7K", rating: 4.8, type: "project" },
    { id: 14, title: "Inventory Management Automation", difficulty: "Intermediate", duration: "2.5 hours", students: "7.1K", rating: 4.5, type: "video" },
    { id: 15, title: "Customer Onboarding Automation", difficulty: "Intermediate", duration: "1.5 hours", students: "8.3K", rating: 4.7, type: "hands-on" },
    { id: 16, title: "Voice Assistant Integration", difficulty: "Advanced", duration: "2 hours", students: "3.8K", rating: 4.6, type: "project" },
    { id: 17, title: "Multi-Channel Marketing Automation", difficulty: "Advanced", duration: "3.5 hours", students: "5.9K", rating: 4.8, type: "project" },
    { id: 18, title: "IoT Device Integration", difficulty: "Advanced", duration: "2.5 hours", students: "4.1K", rating: 4.7, type: "hands-on" },
    { id: 19, title: "Compliance and Audit Automation", difficulty: "Advanced", duration: "2 hours", students: "3.2K", rating: 4.9, type: "video" },
    { id: 20, title: "Performance Monitoring and Analytics", difficulty: "Intermediate", duration: "2.5 hours", students: "6.5K", rating: 4.6, type: "project" }
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
