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
import { YouTubeVideo, YouTubeVideoGallery } from "@/components/YouTubeVideo";
import { PageHeader } from "@/components/ImageComponents";

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
    },
    {
      id: 7,
      title: "Email Marketing Automation",
      description: "Create sophisticated email marketing campaigns with AI personalization",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      students: "11.2K",
      rating: 4.7,
      track: "intermediate",
      type: "hands-on",
      content: "Design and implement email marketing automation workflows with AI-powered personalization, behavioral triggers, A/B testing, and performance analytics. Integration with popular email platforms and CRM systems."
    },
    {
      id: 8,
      title: "Social Media Automation Strategy",
      description: "Automate social media posting, engagement, and analytics across platforms",
      duration: "2 hours",
      difficulty: "Beginner",
      students: "9.8K",
      rating: 4.5,
      track: "beginner",
      type: "video",
      content: "Learn to automate social media management across multiple platforms. Covers content scheduling, cross-platform posting, engagement tracking, hashtag optimization, and social listening automation."
    },
    {
      id: 9,
      title: "Database Integration and Management",
      description: "Connect and manage databases with automated workflows",
      duration: "3.5 hours",
      difficulty: "Advanced",
      students: "5.4K",
      rating: 4.8,
      track: "expert",
      type: "project",
      content: "Master database integration patterns including MySQL, PostgreSQL, MongoDB connections, data synchronization, automated backups, query optimization, and real-time data processing workflows."
    },
    {
      id: 10,
      title: "CRM Automation Essentials",
      description: "Streamline customer relationship management with intelligent automation",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      students: "8.9K",
      rating: 4.6,
      track: "business",
      type: "hands-on",
      content: "Automate CRM workflows including lead scoring, contact management, follow-up sequences, pipeline management, and integration with sales tools like HubSpot, Salesforce, and Pipedrive."
    },
    {
      id: 11,
      title: "Webhook Security and Best Practices",
      description: "Implement secure webhook handling and event-driven automation",
      duration: "1 hour",
      difficulty: "Advanced",
      students: "4.2K",
      rating: 4.9,
      track: "expert",
      type: "video",
      content: "Learn webhook security fundamentals including authentication, validation, encryption, rate limiting, and monitoring. Implement secure event-driven architectures with proper error handling and retry mechanisms."
    },
    {
      id: 12,
      title: "Project Management Automation",
      description: "Automate project workflows with Jira, Trello, and Asana integrations",
      duration: "2 hours",
      difficulty: "Beginner",
      students: "10.5K",
      rating: 4.4,
      track: "beginner",
      type: "hands-on",
      content: "Streamline project management with automated task creation, status updates, deadline reminders, team notifications, and progress reporting across popular project management platforms."
    },
    {
      id: 13,
      title: "AI Content Generation Workflows",
      description: "Create automated content generation using OpenAI and Claude APIs",
      duration: "3 hours",
      difficulty: "Advanced",
      students: "6.7K",
      rating: 4.8,
      track: "expert",
      type: "project",
      content: "Build intelligent content generation systems using AI APIs for blog posts, social media content, product descriptions, and marketing materials. Includes content optimization and quality control workflows."
    },
    {
      id: 14,
      title: "Inventory Management Automation",
      description: "Automate inventory tracking, reordering, and supplier communications",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      students: "7.1K",
      rating: 4.5,
      track: "business",
      type: "video",
      content: "Implement comprehensive inventory management automation including stock level monitoring, automatic reordering, supplier communications, and integration with accounting systems and e-commerce platforms."
    },
    {
      id: 15,
      title: "Customer Onboarding Automation",
      description: "Design seamless customer onboarding experiences with automated workflows",
      duration: "1.5 hours",
      difficulty: "Intermediate",
      students: "8.3K",
      rating: 4.7,
      track: "intermediate",
      type: "hands-on",
      content: "Create sophisticated customer onboarding workflows including welcome sequences, account setup automation, training material delivery, progress tracking, and feedback collection systems."
    },
    {
      id: 16,
      title: "Voice Assistant Integration",
      description: "Build voice-activated automation workflows with Alexa and Google Assistant",
      duration: "2 hours",
      difficulty: "Advanced",
      students: "3.8K",
      rating: 4.6,
      track: "expert",
      type: "project",
      content: "Develop voice-controlled automation systems integrating with smart home devices, business applications, and IoT sensors. Learn voice command processing, natural language understanding, and response generation."
    },
    {
      id: 17,
      title: "Multi-Channel Marketing Automation",
      description: "Coordinate marketing campaigns across email, SMS, social media, and web",
      duration: "3.5 hours",
      difficulty: "Advanced",
      students: "5.9K",
      rating: 4.8,
      track: "business",
      type: "project",
      content: "Design unified marketing automation strategies spanning multiple channels with consistent messaging, audience segmentation, performance tracking, and attribution modeling across touchpoints."
    },
    {
      id: 18,
      title: "IoT Device Integration",
      description: "Connect and automate IoT devices with cloud-based workflows",
      duration: "2.5 hours",
      difficulty: "Advanced",
      students: "4.1K",
      rating: 4.7,
      track: "expert",
      type: "hands-on",
      content: "Learn to integrate IoT devices into automation workflows including sensor data processing, device control, alert systems, and integration with cloud platforms for scalable IoT automation solutions."
    },
    {
      id: 19,
      title: "Compliance and Audit Automation",
      description: "Automate compliance monitoring and audit trail generation",
      duration: "2 hours",
      difficulty: "Advanced",
      students: "3.2K",
      rating: 4.9,
      track: "business",
      type: "video",
      content: "Implement automated compliance monitoring systems including audit trail generation, regulatory reporting, data governance workflows, and automated compliance checks for various industry standards."
    },
    {
      id: 20,
      title: "Performance Monitoring and Analytics",
      description: "Build comprehensive monitoring and analytics dashboards for your automations",
      duration: "2.5 hours",
      difficulty: "Intermediate",
      students: "6.5K",
      rating: 4.6,
      track: "intermediate",
      type: "project",
      content: "Create monitoring and analytics systems for automation workflows including performance metrics, error tracking, usage analytics, cost optimization, and automated reporting dashboards."
    }
  ];

  // YouTube Educational Videos
  const youtubeVideos = [
    {
      videoId: "CfD17vBCPEU",
      title: "n8n Tutorial for Beginners - Complete AI Automation Guide",
      description: "Complete 98-minute masterclass showing how to create AI-powered business automation from scratch. Build AI-powered email automation, smart customer support chatbot with sentiment analysis, and website & Telegram integration.",
      duration: "1:38:12",
      views: "45K",
      likes: "1.8K",
      category: "n8n Basics",
      difficulty: "Beginner" as const
    },
    {
      videoId: "2GZ2SNXWK-c",
      title: "N8N FULL COURSE 6 HOURS - Build & Sell AI Automations + Agents",
      description: "Complete 6-hour course covering everything from basics to advanced AI automation. Learn to build and sell AI automations and agents using n8n platform with real-world examples.",
      duration: "6:00:00",
      views: "156K",
      likes: "5.8K",
      category: "Advanced AI",
      difficulty: "Advanced" as const
    },
    {
      videoId: "ufk_qiAhiqw",
      title: "Master n8n in 1 Hour - Automate Workflows & Build AI Agents",
      description: "Learn n8n fundamentals in just 1 hour. Covers first workflow, data transformation, routing, using AI in workflows, debugging, HTTP nodes, AI agents, and looping patterns.",
      duration: "1:00:00",
      views: "89K",
      likes: "3.1K",
      category: "Quick Start",
      difficulty: "Intermediate" as const
    },
    {
      videoId: "lK3veuZAg0c",
      title: "Step-by-Step: N8N Webhooks (From Beginner to Pro)",
      description: "Detailed walkthrough of how the N8N webhook node functions, including practical examples and advanced webhook patterns. Learn to build event-driven automation systems.",
      duration: "41:27",
      views: "94K",
      likes: "3.7K",
      category: "Webhooks",
      difficulty: "Intermediate" as const
    },
    {
      videoId: "3hDQGhcmBg4",
      title: "How To Connect ChatGPT To N8N In Minutes!",
      description: "Quick tutorial showing exactly how to connect ChatGPT to n8n step by step. Learn to set up OpenAI credentials, avoid common errors, understand pricing, and pick the right ChatGPT model.",
      duration: "12:45",
      views: "67K",
      likes: "2.9K",
      category: "AI Integration",
      difficulty: "Beginner" as const
    },
    {
      videoId: "dcuxyPuwV7k",
      title: "N8N + Postgres Event-Driven Workflows",
      description: "Learn to trigger automations in n8n based on database changes in PostgreSQL without constantly polling. Use Postgres triggers and functions for real-time automation.",
      duration: "36:42",
      views: "73K",
      likes: "2.8K",
      category: "Database Integration",
      difficulty: "Advanced" as const
    },
    {
      videoId: "2oea8rihdGM",
      title: "How to Use Webhooks in n8n (Step-by-Step Beginner's Guide)",
      description: "Clear, beginner-friendly walkthrough of webhooks in n8n. Learn to set up webhook triggers, parse incoming payloads, and build responsive automation workflows.",
      duration: "29:14",
      views: "112K",
      likes: "4.5K",
      category: "Webhooks",
      difficulty: "Beginner" as const
    },
    {
      videoId: "DkV7ztrhLh8",
      title: "Complete n8n Masterclass: Build AI Agents & Automate (7.5 Hours)",
      description: "All-in-one guide to mastering n8n with AI integration, agent-based automation, and product-building skills. Complete masterclass from beginner to professional level.",
      duration: "7:30:00",
      views: "58K",
      likes: "2.3K",
      category: "Masterclass",
      difficulty: "Advanced" as const
    },
    {
      videoId: "RRIgP3Msgqs",
      title: "n8n Tutorial For Beginners: Set Up AI Agents That Save You Hours",
      description: "Learn to build AI agents using n8n self-hosted that automate repetitive tasks without coding. Includes a real-life, practical AI agent example for YouTube workflow automation.",
      duration: "45:23",
      views: "45K",
      likes: "1.9K",
      category: "AI Agents",
      difficulty: "Beginner" as const
    },
    {
      videoId: "cgbtHBVmMFc",
      title: "n8n Tutorial: Understanding Webhooks, If/Switch and API Nodes",
      description: "Develop deeper understanding of n8n by learning webhooks, API calls, and workflow routing using If/Switch nodes. Build a custom API while mastering core concepts.",
      duration: "35:18",
      views: "89K",
      likes: "3.4K",
      category: "API Integration",
      difficulty: "Intermediate" as const
    },
    {
      videoId: "FNFL_jsbnyE",
      title: "Easy Tutorial on OpenAI ChatGPT AI Agents in n8n",
      description: "Learn to properly create OpenAI ChatGPT AI Agents in n8n. Comprehensive tutorial covering AI agent setup, configuration, and advanced automation patterns.",
      duration: "52:12",
      views: "67K",
      likes: "2.7K",
      category: "AI Agents",
      difficulty: "Advanced" as const
    },
    {
      videoId: "AURnISajubk",
      title: "Master n8n in 2 Hours: Complete Beginner's Guide for 2025",
      description: "Full masterclass on n8n covering everything you need to know to go from beginner to professional. Updated for 2025 with latest features and best practices.",
      duration: "2:00:00",
      views: "78K",
      likes: "3.2K",
      category: "Complete Guide",
      difficulty: "Beginner" as const
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
      <section className="relative overflow-hidden">
        <PageHeader type="academy" className="w-full" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

      {/* YouTube Video Tutorials */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-red-500/20 text-red-600 border-red-500/30">
              <PlayCircle className="w-4 h-4 mr-2" />
              YouTube Video Library
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Best Video Tutorials</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Hand-picked YouTube tutorials from industry experts covering every aspect of AI automation. 
              Learn from the best content creators in the automation space.
            </p>
          </div>

          <YouTubeVideoGallery 
            videos={youtubeVideos}
            className="mb-12"
          />

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-red-500/20 text-red-600 hover:bg-red-500/10">
              <a href="https://www.youtube.com/c/n8n-io" target="_blank" rel="noopener noreferrer">
                <PlayCircle className="w-5 h-5 mr-2" />
                View Complete Playlist on YouTube
              </a>
            </Button>
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
                    
                    <Button 
                      className="w-full"
                      onClick={() => {
                        // Map courses to relevant YouTube videos
                        const getVideoForCourse = (courseId: number) => {
                          const videoMap: Record<number, string> = {
                            1: "CfD17vBCPEU", // n8n Tutorial for Beginners
                            2: "2GZ2SNXWK-c", // Advanced AI Automation
                            3: "cgbtHBVmMFc", // API Integration
                            4: "FNFL_jsbnyE", // AI Customer Support
                            5: "2GZ2SNXWK-c", // E-commerce Automation
                            6: "dcuxyPuwV7k", // Database Integration
                            7: "2GZ2SNXWK-c", // Email Marketing
                            8: "AURnISajubk", // Social Media Automation
                            9: "dcuxyPuwV7k", // Database Management
                            10: "2GZ2SNXWK-c", // CRM Automation
                            11: "lK3veuZAg0c", // Webhook Security
                            12: "ufk_qiAhiqw", // Project Management
                            13: "3hDQGhcmBg4", // AI Content Generation
                            14: "2GZ2SNXWK-c", // Inventory Management
                            15: "ufk_qiAhiqw", // Customer Onboarding
                            16: "FNFL_jsbnyE", // Voice Assistant
                            17: "2GZ2SNXWK-c", // Multi-Channel Marketing
                            18: "DkV7ztrhLh8", // IoT Integration
                            19: "2GZ2SNXWK-c", // Compliance Automation
                            20: "ufk_qiAhiqw"  // Performance Monitoring
                          };
                          return videoMap[courseId] || "CfD17vBCPEU";
                        };
                        
                        const videoId = getVideoForCourse(course.id);
                        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
                      }}
                    >
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