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
      title: "AI Automation Fundamentals",
      description: "Master the basics of n8n, AI integration, and workflow automation from scratch",
      courses: 10,
      duration: "16 hours",
      students: 15420,
      color: "bg-green-500/10 border-green-500/20 text-green-600"
    },
    {
      id: "intermediate", 
      title: "Advanced AI Workflows",
      description: "Build sophisticated AI-powered automation systems with complex logic and integrations",
      courses: 12,
      duration: "24 hours", 
      students: 8750,
      color: "bg-blue-500/10 border-blue-500/20 text-blue-600"
    },
    {
      id: "expert",
      title: "AI Engineering & Custom Models",
      description: "Deploy custom AI models, build scalable systems, and create enterprise solutions",
      courses: 15,
      duration: "35 hours",
      students: 4280,
      color: "bg-purple-500/10 border-purple-500/20 text-purple-600"
    },
    {
      id: "business",
      title: "AI Strategy & ROI Optimization",
      description: "Strategic implementation, team management, and maximizing ROI from AI automation",
      courses: 8,
      duration: "14 hours",
      students: 3650,
      color: "bg-orange-500/10 border-orange-500/20 text-orange-600"
    }
  ];

  const courses = [
    // Beginner Track
    { id: 1, title: "Getting Started with n8n", description: "Learn to set up and navigate the n8n workspace, understand the interface, and explore automation possibilities", duration: "1.5 hours", difficulty: "Beginner", students: "15.4K", rating: 4.9, track: "beginner", type: "video", content: "Complete introduction to n8n platform. Learn workspace setup, interface navigation, node types, and basic concepts. Perfect starting point for automation beginners." },
    { id: 2, title: "Your First Automation Workflow", description: "Build your first complete automation from scratch using visual workflow builder", duration: "2 hours", difficulty: "Beginner", students: "14.8K", rating: 4.8, track: "beginner", type: "hands-on", content: "Hands-on tutorial to create your first working automation. Learn to connect nodes, test workflows, and deploy your first automation successfully." },
    { id: 3, title: "Connecting Apps & Services", description: "Master connecting popular apps like Gmail, Slack, and Google Sheets to your workflows", duration: "2.5 hours", difficulty: "Beginner", students: "13.9K", rating: 4.7, track: "beginner", type: "hands-on", content: "Learn to integrate common business applications into n8n workflows. Covers authentication, data mapping, and real-world integration examples." },
    { id: 4, title: "Introduction to AI Integration", description: "Understand AI models and how to connect them to your automation workflows", duration: "2 hours", difficulty: "Beginner", students: "12.6K", rating: 4.9, track: "beginner", type: "video", content: "Introduction to AI concepts and integration in n8n. Learn about different AI models, APIs, and how to add AI capabilities to workflows." },
    { id: 5, title: "Building Simple AI Chatbots", description: "Create your first AI-powered chatbot using n8n and AI models", duration: "3 hours", difficulty: "Beginner", students: "11.8K", rating: 4.8, track: "beginner", type: "project", content: "Build a functional AI chatbot from scratch. Learn conversation flow, AI integration, response handling, and deployment strategies." },
    { id: 6, title: "API Basics & Webhooks", description: "Learn API fundamentals and how to use webhooks for real-time automation", duration: "2 hours", difficulty: "Beginner", students: "11.2K", rating: 4.6, track: "beginner", type: "video", content: "Master API concepts, REST principles, and webhook implementation. Understand how to trigger workflows based on external events." },
    { id: 7, title: "Data Transformation Fundamentals", description: "Learn to transform, filter, and manipulate data flowing through your workflows", duration: "2.5 hours", difficulty: "Beginner", students: "10.5K", rating: 4.7, track: "beginner", type: "hands-on", content: "Essential data transformation techniques in n8n. Learn to clean, filter, merge, and format data for automation workflows." },
    { id: 8, title: "Error Handling & Debugging", description: "Master debugging techniques and implement proper error handling in workflows", duration: "1.5 hours", difficulty: "Beginner", students: "9.8K", rating: 4.8, track: "beginner", type: "video", content: "Learn to identify and fix workflow issues. Covers debugging tools, error handling strategies, and troubleshooting common problems." },
    { id: 9, title: "Workflow Testing Best Practices", description: "Learn systematic testing approaches for reliable automation", duration: "1 hour", difficulty: "Beginner", students: "9.2K", rating: 4.7, track: "beginner", type: "video", content: "Best practices for testing n8n workflows. Learn testing strategies, validation techniques, and quality assurance methods." },
    { id: 10, title: "Deploying Your First Automation", description: "Deploy, monitor, and maintain your automation workflows in production", duration: "1.5 hours", difficulty: "Beginner", students: "8.9K", rating: 4.9, track: "beginner", type: "hands-on", content: "Complete guide to deploying workflows. Learn deployment strategies, monitoring setup, and maintenance best practices." },
    
    // Intermediate Track
    { id: 11, title: "Advanced n8n Workflow Design", description: "Master complex workflow patterns and advanced n8n features", duration: "3 hours", difficulty: "Intermediate", students: "8.1K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced workflow design patterns including sub-workflows, loops, and complex branching logic for sophisticated automations." },
    { id: 12, title: "Multi-AI Model Integration", description: "Integrate multiple AI models (GPT, Claude, Gemini) in single workflows", duration: "3.5 hours", difficulty: "Intermediate", students: "7.6K", rating: 4.9, track: "intermediate", type: "hands-on", content: "Learn to combine different AI models for enhanced capabilities. Compare models, optimize costs, and leverage strengths of each." },
    { id: 13, title: "Building RAG Systems with n8n", description: "Create Retrieval Augmented Generation systems for knowledge-based AI", duration: "4 hours", difficulty: "Intermediate", students: "7.2K", rating: 4.9, track: "intermediate", type: "project", content: "Build complete RAG systems using n8n. Learn document ingestion, vector embeddings, semantic search, and AI-powered responses." },
    { id: 14, title: "Advanced Data Processing Pipelines", description: "Build sophisticated data pipelines with transformations and validations", duration: "3 hours", difficulty: "Intermediate", students: "6.8K", rating: 4.7, track: "intermediate", type: "hands-on", content: "Advanced data processing techniques including ETL pipelines, data validation, enrichment, and complex transformations." },
    { id: 15, title: "Conditional Logic & Dynamic Routing", description: "Master conditional branching and dynamic workflow routing", duration: "2.5 hours", difficulty: "Intermediate", students: "6.5K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced control flow with conditional logic, switch statements, and dynamic routing based on data and context." },
    { id: 16, title: "Database Integration Masterclass", description: "Connect and manage databases with automated workflows", duration: "3.5 hours", difficulty: "Intermediate", students: "6.1K", rating: 4.8, track: "intermediate", type: "hands-on", content: "Comprehensive database integration covering SQL databases, NoSQL, query optimization, and data synchronization." },
    { id: 17, title: "AI Agents with Memory & Context", description: "Build stateful AI agents that remember conversations and learn", duration: "4 hours", difficulty: "Intermediate", students: "5.8K", rating: 4.9, track: "intermediate", type: "project", content: "Create intelligent AI agents with memory, context awareness, and learning capabilities using n8n and AI models." },
    { id: 18, title: "CRM & Marketing Automation", description: "Automate customer relationship management and marketing workflows", duration: "3 hours", difficulty: "Intermediate", students: "5.5K", rating: 4.7, track: "intermediate", type: "hands-on", content: "CRM automation including lead management, email campaigns, customer segmentation, and marketing analytics." },
    { id: 19, title: "E-commerce Automation with AI", description: "Build AI-powered e-commerce automation for orders, inventory, and support", duration: "3.5 hours", difficulty: "Intermediate", students: "5.2K", rating: 4.8, track: "intermediate", type: "project", content: "Complete e-commerce automation with AI-powered customer support, inventory management, and personalized marketing." },
    { id: 20, title: "Workflow Performance Optimization", description: "Optimize workflow speed, reduce costs, and improve efficiency", duration: "2 hours", difficulty: "Intermediate", students: "4.9K", rating: 4.7, track: "intermediate", type: "video", content: "Performance optimization techniques including execution analysis, bottleneck identification, and cost reduction strategies." },
    { id: 21, title: "Advanced Error Handling Strategies", description: "Implement robust error handling and recovery mechanisms", duration: "2 hours", difficulty: "Intermediate", students: "4.6K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced error handling including retry logic, fallback strategies, and graceful failure management." },
    { id: 22, title: "Workflow Versioning & Testing", description: "Manage workflow versions and implement comprehensive testing", duration: "2.5 hours", difficulty: "Intermediate", students: "4.4K", rating: 4.7, track: "intermediate", type: "hands-on", content: "Version control for workflows, automated testing, CI/CD integration, and deployment strategies." },
    
    // Expert Track
    { id: 23, title: "Custom AI Model Deployment", description: "Deploy and manage custom machine learning models in n8n", duration: "5 hours", difficulty: "Advanced", students: "4.1K", rating: 4.9, track: "expert", type: "project", content: "Deploy custom AI models including model hosting, API creation, and integration with n8n workflows." },
    { id: 24, title: "Fine-Tuning LLMs for Workflows", description: "Fine-tune large language models for specific automation use cases", duration: "6 hours", difficulty: "Advanced", students: "3.8K", rating: 4.9, track: "expert", type: "project", content: "Advanced LLM fine-tuning techniques for custom AI behaviors tailored to specific automation needs." },
    { id: 25, title: "Vector Databases & Semantic Search", description: "Implement vector databases and semantic search capabilities", duration: "4 hours", difficulty: "Advanced", students: "3.6K", rating: 4.8, track: "expert", type: "hands-on", content: "Master vector databases, embeddings, and semantic search for intelligent data retrieval in workflows." },
    { id: 26, title: "Advanced RAG Architectures", description: "Build sophisticated RAG systems with advanced retrieval techniques", duration: "5 hours", difficulty: "Advanced", students: "3.4K", rating: 4.9, track: "expert", type: "project", content: "Advanced RAG patterns including hybrid search, re-ranking, and multi-modal retrieval systems." },
    { id: 27, title: "Multi-Agent AI Systems", description: "Create systems with multiple AI agents working together", duration: "6 hours", difficulty: "Advanced", students: "3.2K", rating: 4.9, track: "expert", type: "project", content: "Build complex multi-agent systems with agent coordination, task delegation, and collaborative problem-solving." },
    { id: 28, title: "AI Cost Optimization at Scale", description: "Optimize AI usage costs for large-scale production systems", duration: "3 hours", difficulty: "Advanced", students: "3.0K", rating: 4.8, track: "expert", type: "video", content: "Cost optimization strategies including model selection, caching, batching, and usage monitoring." },
    { id: 29, title: "Enterprise Automation Infrastructure", description: "Design and build enterprise-grade automation infrastructure", duration: "5 hours", difficulty: "Advanced", students: "2.8K", rating: 4.8, track: "expert", type: "hands-on", content: "Enterprise architecture including high availability, disaster recovery, and scalable infrastructure design." },
    { id: 30, title: "AI Monitoring & Observability", description: "Implement comprehensive monitoring for AI-powered workflows", duration: "3.5 hours", difficulty: "Advanced", students: "2.6K", rating: 4.7, track: "expert", type: "video", content: "AI monitoring strategies including performance tracking, quality metrics, and observability best practices." },
    { id: 31, title: "Fault-Tolerant AI Workflows", description: "Build resilient workflows that handle failures gracefully", duration: "4 hours", difficulty: "Advanced", students: "2.5K", rating: 4.8, track: "expert", type: "hands-on", content: "Fault tolerance patterns including circuit breakers, retries, and graceful degradation strategies." },
    { id: 32, title: "Building Custom n8n Nodes", description: "Create custom n8n nodes for specialized functionality", duration: "5 hours", difficulty: "Advanced", students: "2.3K", rating: 4.9, track: "expert", type: "project", content: "Develop custom n8n nodes including node development, testing, and distribution." },
    { id: 33, title: "AI Security & Compliance", description: "Implement security and compliance for AI automation systems", duration: "3.5 hours", difficulty: "Advanced", students: "2.2K", rating: 4.8, track: "expert", type: "video", content: "AI security including data privacy, access control, compliance frameworks, and security best practices." },
    { id: 34, title: "Microservices-Based Automation", description: "Architect automation using microservices patterns", duration: "5 hours", difficulty: "Advanced", students: "2.1K", rating: 4.8, track: "expert", type: "project", content: "Microservices architecture for automation including service design, API gateways, and orchestration." },
    { id: 35, title: "Advanced Python Integration", description: "Leverage Python for complex data processing in n8n", duration: "4 hours", difficulty: "Advanced", students: "2.0K", rating: 4.7, track: "expert", type: "hands-on", content: "Advanced Python integration including custom libraries, data science workflows, and ML integration." },
    { id: 36, title: "Real-Time AI Processing", description: "Build real-time AI systems with streaming data", duration: "4.5 hours", difficulty: "Advanced", students: "1.9K", rating: 4.8, track: "expert", type: "project", content: "Real-time AI processing including streaming data, event processing, and low-latency AI responses." },
    { id: 37, title: "Enterprise AI Architecture", description: "Design comprehensive enterprise AI automation architectures", duration: "5 hours", difficulty: "Advanced", students: "1.8K", rating: 4.9, track: "expert", type: "video", content: "Enterprise AI architecture patterns including scalability, governance, and integration strategies." },
    
    // Business Track
    { id: 38, title: "AI ROI Analysis & Metrics", description: "Calculate and present ROI for AI automation initiatives", duration: "2.5 hours", difficulty: "Intermediate", students: "3.5K", rating: 4.7, track: "business", type: "video", content: "ROI calculation methodologies, success metrics, and presenting business value of AI automation." },
    { id: 39, title: "Building Business Cases for AI", description: "Create compelling business cases for AI automation projects", duration: "2 hours", difficulty: "Intermediate", students: "3.3K", rating: 4.6, track: "business", type: "video", content: "Business case development including cost-benefit analysis, risk assessment, and stakeholder communication." },
    { id: 40, title: "AI Project Management", description: "Manage AI automation projects from planning to deployment", duration: "3 hours", difficulty: "Intermediate", students: "3.1K", rating: 4.7, track: "business", type: "hands-on", content: "AI project management including planning, resource allocation, timeline management, and delivery." },
    { id: 41, title: "Scaling AI Automation Teams", description: "Build and scale teams for AI automation initiatives", duration: "2.5 hours", difficulty: "Intermediate", students: "2.9K", rating: 4.8, track: "business", type: "video", content: "Team building strategies including hiring, training, organizational structure, and scaling operations." },
    { id: 42, title: "Enterprise AI Strategy", description: "Develop comprehensive AI automation strategies for enterprises", duration: "3 hours", difficulty: "Advanced", students: "2.7K", rating: 4.8, track: "business", type: "video", content: "Strategic planning for enterprise AI including roadmap development, prioritization, and alignment with business goals." },
    { id: 43, title: "AI Governance & Compliance", description: "Establish governance frameworks for AI automation", duration: "2.5 hours", difficulty: "Advanced", students: "2.5K", rating: 4.7, track: "business", type: "video", content: "AI governance including policies, compliance requirements, ethical considerations, and risk management." },
    { id: 44, title: "Change Management for AI", description: "Lead organizational change for AI automation adoption", duration: "2 hours", difficulty: "Intermediate", students: "2.4K", rating: 4.6, track: "business", type: "video", content: "Change management strategies including stakeholder engagement, training programs, and adoption tactics." },
    { id: 45, title: "Measuring AI Success Metrics", description: "Define and track success metrics for AI automation", duration: "2 hours", difficulty: "Intermediate", students: "2.3K", rating: 4.7, track: "business", type: "hands-on", content: "Success metrics including KPIs, dashboards, reporting strategies, and continuous improvement frameworks." }
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
                    <Link to={`/learning-track/${track.id}`}>
                      <Button 
                        className="w-full mt-4"
                        variant="outline"
                      >
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
                    
                    <Link to={`/course/${course.id}`}>
                      <Button className="w-full">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Course
                      </Button>
                    </Link>
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
                    
                    <Link to="/contact">
                      <Button className="w-full">
                        Start Certification
                      </Button>
                    </Link>
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
            <Link to="/course/1">
              <Button size="lg" className="px-8">
                Start Free Course
              </Button>
            </Link>
            <Link to="/academy">
              <Button variant="outline" size="lg" className="px-8">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <PopupManager page="academy" />
    </div>
  );
};

export default Academy;