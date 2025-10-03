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
    // Beginner Track (1-10)
    { id: 1, title: "Getting Started with n8n", description: "Learn to set up and navigate the n8n workspace, understand the interface, and explore automation possibilities", duration: "1.5 hours", difficulty: "Beginner", students: "15.4K", rating: 4.9, track: "beginner", type: "video", content: "Complete introduction to n8n platform. Learn workspace setup, interface navigation, node types, and basic concepts. Perfect starting point for automation beginners.", modules: ["n8n Platform Overview", "Workspace Setup", "Interface Navigation", "Understanding Nodes", "First Workflow Example", "Getting Help and Resources"] },
    { id: 2, title: "Your First Automation Workflow", description: "Build your first complete automation from scratch using visual workflow builder", duration: "2 hours", difficulty: "Beginner", students: "14.8K", rating: 4.8, track: "beginner", type: "hands-on", content: "Hands-on tutorial to create your first working automation. Learn to connect nodes, test workflows, and deploy your first automation successfully.", modules: ["Planning Your Workflow", "Adding and Connecting Nodes", "Testing Workflows", "Debugging Basics", "Deploying Your Automation", "Monitoring Execution"] },
    { id: 3, title: "Connecting Apps & Services", description: "Master connecting popular apps like Gmail, Slack, and Google Sheets to your workflows", duration: "2.5 hours", difficulty: "Beginner", students: "13.9K", rating: 4.7, track: "beginner", type: "hands-on", content: "Learn to integrate common business applications into n8n workflows. Covers authentication, data mapping, and real-world integration examples.", modules: ["Gmail Integration", "Slack Automation", "Google Sheets Connection", "Authentication Methods", "Data Mapping Techniques", "Common Integration Patterns"] },
    { id: 4, title: "Introduction to AI Integration", description: "Understand AI models and how to connect them to your automation workflows", duration: "2 hours", difficulty: "Beginner", students: "12.6K", rating: 4.9, track: "beginner", type: "video", content: "Introduction to AI concepts and integration in n8n. Learn about different AI models, APIs, and how to add AI capabilities to workflows.", modules: ["AI Basics for Automation", "Understanding LLMs", "AI API Overview", "Your First AI Node", "Prompt Engineering Basics", "AI Use Cases"] },
    { id: 5, title: "Building Simple AI Chatbots", description: "Create your first AI-powered chatbot using n8n and AI models", duration: "3 hours", difficulty: "Beginner", students: "11.8K", rating: 4.8, track: "beginner", type: "project", content: "Build a functional AI chatbot from scratch. Learn conversation flow, AI integration, response handling, and deployment strategies.", modules: ["Chatbot Architecture", "Conversation Design", "AI Integration", "User Input Handling", "Response Generation", "Testing and Deployment"] },
    { id: 6, title: "API Basics & Webhooks", description: "Learn API fundamentals and how to use webhooks for real-time automation", duration: "2 hours", difficulty: "Beginner", students: "11.2K", rating: 4.6, track: "beginner", type: "video", content: "Master API concepts, REST principles, and webhook implementation. Understand how to trigger workflows based on external events.", modules: ["REST API Fundamentals", "API Authentication", "Making API Calls", "Understanding Webhooks", "Setting Up Webhook Triggers", "Real-Time Automation"] },
    { id: 7, title: "Data Transformation Fundamentals", description: "Learn to transform, filter, and manipulate data flowing through your workflows", duration: "2.5 hours", difficulty: "Beginner", students: "10.5K", rating: 4.7, track: "beginner", type: "hands-on", content: "Essential data transformation techniques in n8n. Learn to clean, filter, merge, and format data for automation workflows.", modules: ["Data Types and Structures", "Filtering Data", "Transforming Values", "Merging Data Sources", "Data Validation", "Formatting Output"] },
    { id: 8, title: "Error Handling & Debugging", description: "Master debugging techniques and implement proper error handling in workflows", duration: "1.5 hours", difficulty: "Beginner", students: "9.8K", rating: 4.8, track: "beginner", type: "video", content: "Learn to identify and fix workflow issues. Covers debugging tools, error handling strategies, and troubleshooting common problems.", modules: ["Debugging Tools", "Reading Error Messages", "Common Errors", "Error Handling Strategies", "Logging and Monitoring", "Troubleshooting Tips"] },
    { id: 9, title: "Workflow Testing Best Practices", description: "Learn systematic testing approaches for reliable automation", duration: "1 hour", difficulty: "Beginner", students: "9.2K", rating: 4.7, track: "beginner", type: "video", content: "Best practices for testing n8n workflows. Learn testing strategies, validation techniques, and quality assurance methods.", modules: ["Testing Strategies", "Test Data Creation", "Validation Techniques", "Edge Case Testing", "Performance Testing", "Documentation"] },
    { id: 10, title: "Deploying Your First Automation", description: "Deploy, monitor, and maintain your automation workflows in production", duration: "1.5 hours", difficulty: "Beginner", students: "8.9K", rating: 4.9, track: "beginner", type: "hands-on", content: "Complete guide to deploying workflows. Learn deployment strategies, monitoring setup, and maintenance best practices.", modules: ["Deployment Options", "Environment Setup", "Monitoring Tools", "Maintenance Strategies", "Scaling Considerations", "Best Practices"] },
    
    // Intermediate Track (11-22)
    { id: 11, title: "Advanced n8n Workflow Design", description: "Master complex workflow patterns and advanced n8n features", duration: "3 hours", difficulty: "Intermediate", students: "8.1K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced workflow design patterns including sub-workflows, loops, and complex branching logic for sophisticated automations.", modules: ["Sub-Workflow Patterns", "Loop Structures", "Complex Branching", "Workflow Variables", "Advanced Triggers", "Optimization Techniques"] },
    { id: 12, title: "Multi-AI Model Integration", description: "Integrate multiple AI models (GPT, Claude, Gemini) in single workflows", duration: "3.5 hours", difficulty: "Intermediate", students: "7.6K", rating: 4.9, track: "intermediate", type: "hands-on", content: "Learn to combine different AI models for enhanced capabilities. Compare models, optimize costs, and leverage strengths of each.", modules: ["Model Comparison", "API Integration", "Cost Optimization", "Model Selection Strategy", "Fallback Patterns", "Performance Tuning"] },
    { id: 13, title: "Building RAG Systems with n8n", description: "Create Retrieval Augmented Generation systems for knowledge-based AI", duration: "4 hours", difficulty: "Intermediate", students: "7.2K", rating: 4.9, track: "intermediate", type: "project", content: "Build complete RAG systems using n8n. Learn document ingestion, vector embeddings, semantic search, and AI-powered responses.", modules: ["RAG Architecture", "Document Processing", "Vector Embeddings", "Semantic Search", "Context Retrieval", "Response Generation"] },
    { id: 14, title: "Advanced Data Processing Pipelines", description: "Build sophisticated data pipelines with transformations and validations", duration: "3 hours", difficulty: "Intermediate", students: "6.8K", rating: 4.7, track: "intermediate", type: "hands-on", content: "Advanced data processing techniques including ETL pipelines, data validation, enrichment, and complex transformations.", modules: ["ETL Patterns", "Data Validation", "Enrichment Strategies", "Complex Transformations", "Pipeline Optimization", "Error Recovery"] },
    { id: 15, title: "Conditional Logic & Dynamic Routing", description: "Master conditional branching and dynamic workflow routing", duration: "2.5 hours", difficulty: "Intermediate", students: "6.5K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced control flow with conditional logic, switch statements, and dynamic routing based on data and context.", modules: ["Conditional Statements", "Switch Logic", "Dynamic Routing", "Route Selection", "Context-Based Decisions", "Advanced Patterns"] },
    { id: 16, title: "Database Integration Masterclass", description: "Connect and manage databases with automated workflows", duration: "3.5 hours", difficulty: "Intermediate", students: "6.1K", rating: 4.8, track: "intermediate", type: "hands-on", content: "Comprehensive database integration covering SQL databases, NoSQL, query optimization, and data synchronization.", modules: ["SQL Databases", "NoSQL Integration", "Query Optimization", "Data Synchronization", "Transaction Handling", "Backup Strategies"] },
    { id: 17, title: "AI Agents with Memory & Context", description: "Build stateful AI agents that remember conversations and learn", duration: "4 hours", difficulty: "Intermediate", students: "5.8K", rating: 4.9, track: "intermediate", type: "project", content: "Create intelligent AI agents with memory, context awareness, and learning capabilities using n8n and AI models.", modules: ["Agent Architecture", "Memory Management", "Context Handling", "State Management", "Learning Patterns", "Agent Deployment"] },
    { id: 18, title: "CRM & Marketing Automation", description: "Automate customer relationship management and marketing workflows", duration: "3 hours", difficulty: "Intermediate", students: "5.5K", rating: 4.7, track: "intermediate", type: "hands-on", content: "CRM automation including lead management, email campaigns, customer segmentation, and marketing analytics.", modules: ["Lead Management", "Email Campaigns", "Customer Segmentation", "Marketing Analytics", "CRM Integration", "Campaign Optimization"] },
    { id: 19, title: "E-commerce Automation with AI", description: "Build AI-powered e-commerce automation for orders, inventory, and support", duration: "3.5 hours", difficulty: "Intermediate", students: "5.2K", rating: 4.8, track: "intermediate", type: "project", content: "Complete e-commerce automation with AI-powered customer support, inventory management, and personalized marketing.", modules: ["Order Processing", "Inventory Management", "AI Customer Support", "Personalized Marketing", "Platform Integration", "Analytics Dashboard"] },
    { id: 20, title: "Workflow Performance Optimization", description: "Optimize workflow speed, reduce costs, and improve efficiency", duration: "2 hours", difficulty: "Intermediate", students: "4.9K", rating: 4.7, track: "intermediate", type: "video", content: "Performance optimization techniques including execution analysis, bottleneck identification, and cost reduction strategies.", modules: ["Performance Metrics", "Bottleneck Analysis", "Execution Optimization", "Cost Reduction", "Resource Management", "Scaling Strategies"] },
    { id: 21, title: "Advanced Error Handling Strategies", description: "Implement robust error handling and recovery mechanisms", duration: "2 hours", difficulty: "Intermediate", students: "4.6K", rating: 4.8, track: "intermediate", type: "video", content: "Advanced error handling including retry logic, fallback strategies, and graceful failure management.", modules: ["Error Types", "Retry Logic", "Fallback Strategies", "Circuit Breakers", "Recovery Mechanisms", "Monitoring Errors"] },
    { id: 22, title: "Workflow Versioning & Testing", description: "Manage workflow versions and implement comprehensive testing", duration: "2.5 hours", difficulty: "Intermediate", students: "4.4K", rating: 4.7, track: "intermediate", type: "hands-on", content: "Version control for workflows, automated testing, CI/CD integration, and deployment strategies.", modules: ["Version Control", "Testing Frameworks", "CI/CD Integration", "Deployment Pipelines", "Rollback Strategies", "Documentation"] },
    
    // Expert Track (23-37)
    { id: 23, title: "Custom AI Model Deployment", description: "Deploy and manage custom machine learning models in n8n", duration: "5 hours", difficulty: "Advanced", students: "4.1K", rating: 4.9, track: "expert", type: "project", content: "Deploy custom AI models including model hosting, API creation, and integration with n8n workflows.", modules: ["Model Deployment", "API Creation", "Model Hosting", "Integration Patterns", "Performance Optimization", "Monitoring"] },
    { id: 24, title: "Fine-Tuning LLMs for Workflows", description: "Fine-tune large language models for specific automation use cases", duration: "6 hours", difficulty: "Advanced", students: "3.8K", rating: 4.9, track: "expert", type: "project", content: "Advanced LLM fine-tuning techniques for custom AI behaviors tailored to specific automation needs.", modules: ["Fine-Tuning Basics", "Dataset Preparation", "Training Process", "Model Evaluation", "Deployment", "Optimization"] },
    { id: 25, title: "Vector Databases & Semantic Search", description: "Implement vector databases and semantic search capabilities", duration: "4 hours", difficulty: "Advanced", students: "3.6K", rating: 4.8, track: "expert", type: "hands-on", content: "Master vector databases, embeddings, and semantic search for intelligent data retrieval in workflows.", modules: ["Vector Databases", "Embeddings", "Semantic Search", "Similarity Matching", "Index Optimization", "Query Performance"] },
    { id: 26, title: "Advanced RAG Architectures", description: "Build sophisticated RAG systems with advanced retrieval techniques", duration: "5 hours", difficulty: "Advanced", students: "3.4K", rating: 4.9, track: "expert", type: "project", content: "Advanced RAG patterns including hybrid search, re-ranking, and multi-modal retrieval systems.", modules: ["Hybrid Search", "Re-Ranking Techniques", "Multi-Modal RAG", "Context Management", "Performance Tuning", "Quality Assessment"] },
    { id: 27, title: "Multi-Agent AI Systems", description: "Create systems with multiple AI agents working together", duration: "6 hours", difficulty: "Advanced", students: "3.2K", rating: 4.9, track: "expert", type: "project", content: "Build complex multi-agent systems with agent coordination, task delegation, and collaborative problem-solving.", modules: ["Multi-Agent Architecture", "Agent Coordination", "Task Delegation", "Communication Protocols", "Conflict Resolution", "System Optimization"] },
    { id: 28, title: "AI Cost Optimization at Scale", description: "Optimize AI usage costs for large-scale production systems", duration: "3 hours", difficulty: "Advanced", students: "3.0K", rating: 4.8, track: "expert", type: "video", content: "Cost optimization strategies including model selection, caching, batching, and usage monitoring.", modules: ["Cost Analysis", "Model Selection", "Caching Strategies", "Batching Techniques", "Usage Monitoring", "Budget Management"] },
    { id: 29, title: "Enterprise Automation Infrastructure", description: "Design and build enterprise-grade automation infrastructure", duration: "5 hours", difficulty: "Advanced", students: "2.8K", rating: 4.8, track: "expert", type: "hands-on", content: "Enterprise architecture including high availability, disaster recovery, and scalable infrastructure design.", modules: ["Infrastructure Design", "High Availability", "Disaster Recovery", "Scalability Patterns", "Security Architecture", "Compliance"] },
    { id: 30, title: "AI Monitoring & Observability", description: "Implement comprehensive monitoring for AI-powered workflows", duration: "3.5 hours", difficulty: "Advanced", students: "2.6K", rating: 4.7, track: "expert", type: "video", content: "AI monitoring strategies including performance tracking, quality metrics, and observability best practices.", modules: ["Monitoring Tools", "Performance Metrics", "Quality Assessment", "Alert Systems", "Dashboard Creation", "Incident Response"] },
    { id: 31, title: "Fault-Tolerant AI Workflows", description: "Build resilient workflows that handle failures gracefully", duration: "4 hours", difficulty: "Advanced", students: "2.5K", rating: 4.8, track: "expert", type: "hands-on", content: "Fault tolerance patterns including circuit breakers, retries, and graceful degradation strategies.", modules: ["Fault Tolerance Patterns", "Circuit Breakers", "Retry Mechanisms", "Graceful Degradation", "Recovery Strategies", "Testing Resilience"] },
    { id: 32, title: "Building Custom n8n Nodes", description: "Create custom n8n nodes for specialized functionality", duration: "5 hours", difficulty: "Advanced", students: "2.3K", rating: 4.9, track: "expert", type: "project", content: "Develop custom n8n nodes including node development, testing, and distribution.", modules: ["Node Architecture", "Development Setup", "Node Implementation", "Testing Nodes", "Documentation", "Distribution"] },
    { id: 33, title: "AI Security & Compliance", description: "Implement security and compliance for AI automation systems", duration: "3.5 hours", difficulty: "Advanced", students: "2.2K", rating: 4.8, track: "expert", type: "video", content: "AI security including data privacy, access control, compliance frameworks, and security best practices.", modules: ["Security Fundamentals", "Data Privacy", "Access Control", "Compliance Frameworks", "Audit Trails", "Best Practices"] },
    { id: 34, title: "Microservices-Based Automation", description: "Architect automation using microservices patterns", duration: "5 hours", difficulty: "Advanced", students: "2.1K", rating: 4.8, track: "expert", type: "project", content: "Microservices architecture for automation including service design, API gateways, and orchestration.", modules: ["Microservices Design", "API Gateways", "Service Orchestration", "Inter-Service Communication", "Deployment Strategies", "Monitoring"] },
    { id: 35, title: "Advanced Python Integration", description: "Leverage Python for complex data processing in n8n", duration: "4 hours", difficulty: "Advanced", students: "2.0K", rating: 4.7, track: "expert", type: "hands-on", content: "Advanced Python integration including custom libraries, data science workflows, and ML integration.", modules: ["Python Setup", "Custom Libraries", "Data Science Integration", "ML Workflows", "Performance Optimization", "Debugging"] },
    { id: 36, title: "Real-Time AI Processing", description: "Build real-time AI systems with streaming data", duration: "4.5 hours", difficulty: "Advanced", students: "1.9K", rating: 4.8, track: "expert", type: "project", content: "Real-time AI processing including streaming data, event processing, and low-latency AI responses.", modules: ["Streaming Architecture", "Event Processing", "Real-Time AI", "Latency Optimization", "Scalability", "Monitoring"] },
    { id: 37, title: "Enterprise AI Architecture", description: "Design comprehensive enterprise AI automation architectures", duration: "5 hours", difficulty: "Advanced", students: "1.8K", rating: 4.9, track: "expert", type: "video", content: "Enterprise AI architecture patterns including scalability, governance, and integration strategies.", modules: ["Architecture Patterns", "Scalability Design", "Governance Frameworks", "Integration Strategies", "Security Design", "Best Practices"] },
    
    // Business Track (38-45)
    { id: 38, title: "AI ROI Analysis & Metrics", description: "Calculate and present ROI for AI automation initiatives", duration: "2.5 hours", difficulty: "Intermediate", students: "3.5K", rating: 4.7, track: "business", type: "video", content: "ROI calculation methodologies, success metrics, and presenting business value of AI automation.", modules: ["ROI Fundamentals", "Metric Selection", "Cost Analysis", "Value Calculation", "Presentation Strategies", "Case Studies"] },
    { id: 39, title: "Building Business Cases for AI", description: "Create compelling business cases for AI automation projects", duration: "2 hours", difficulty: "Intermediate", students: "3.3K", rating: 4.6, track: "business", type: "video", content: "Business case development including cost-benefit analysis, risk assessment, and stakeholder communication.", modules: ["Business Case Framework", "Cost-Benefit Analysis", "Risk Assessment", "Stakeholder Analysis", "Presentation Skills", "Approval Strategies"] },
    { id: 40, title: "AI Project Management", description: "Manage AI automation projects from planning to deployment", duration: "3 hours", difficulty: "Intermediate", students: "3.1K", rating: 4.7, track: "business", type: "hands-on", content: "AI project management including planning, resource allocation, timeline management, and delivery.", modules: ["Project Planning", "Resource Management", "Timeline Development", "Risk Management", "Team Coordination", "Delivery Management"] },
    { id: 41, title: "Scaling AI Automation Teams", description: "Build and scale teams for AI automation initiatives", duration: "2.5 hours", difficulty: "Intermediate", students: "2.9K", rating: 4.8, track: "business", type: "video", content: "Team building strategies including hiring, training, organizational structure, and scaling operations.", modules: ["Team Structure", "Hiring Strategies", "Training Programs", "Skill Development", "Team Scaling", "Culture Building"] },
    { id: 42, title: "Enterprise AI Strategy", description: "Develop comprehensive AI automation strategies for enterprises", duration: "3 hours", difficulty: "Advanced", students: "2.7K", rating: 4.8, track: "business", type: "video", content: "Strategic planning for enterprise AI including roadmap development, prioritization, and alignment with business goals.", modules: ["Strategy Development", "Roadmap Planning", "Prioritization", "Alignment Strategies", "Governance", "Implementation"] },
    { id: 43, title: "AI Governance & Compliance", description: "Establish governance frameworks for AI automation", duration: "2.5 hours", difficulty: "Advanced", students: "2.5K", rating: 4.7, track: "business", type: "video", content: "AI governance including policies, compliance requirements, ethical considerations, and risk management.", modules: ["Governance Frameworks", "Policy Development", "Compliance Requirements", "Ethical Considerations", "Risk Management", "Audit Processes"] },
    { id: 44, title: "Change Management for AI", description: "Lead organizational change for AI automation adoption", duration: "2 hours", difficulty: "Intermediate", students: "2.4K", rating: 4.6, track: "business", type: "video", content: "Change management strategies including stakeholder engagement, training programs, and adoption tactics.", modules: ["Change Strategy", "Stakeholder Engagement", "Communication Plans", "Training Programs", "Adoption Tactics", "Success Measurement"] },
    { id: 45, title: "Measuring AI Success Metrics", description: "Define and track success metrics for AI automation", duration: "2 hours", difficulty: "Intermediate", students: "2.3K", rating: 4.7, track: "business", type: "hands-on", content: "Success metrics including KPIs, dashboards, reporting strategies, and continuous improvement frameworks.", modules: ["KPI Definition", "Dashboard Design", "Reporting Strategies", "Performance Tracking", "Continuous Improvement", "Optimization"] }
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
