import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, 
  Zap, 
  Database, 
  Globe, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  Play,
  CheckCircle,
  BarChart3,
  Target,
  Lightbulb,
  Settings,
  Brain,
  Video,
  Mic,
  Image,
  Cloud,
  Code,
  FileText,
  Workflow,
  Cpu,
  MonitorPlay,
  Activity
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import FutureFlowHeader from '@/components/FutureFlowHeader';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  path: string;
  endpoints: number;
  features: string[];
}

const ITGyaniHomepage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services: Service[] = [
    {
      id: "ai-blog",
      title: "AI Blog Automation",
      description: "Intelligent content generation with SEO optimization and auto-publishing capabilities",
      icon: <Bot className="w-8 h-8" />,
      category: "AI Content",
      color: "from-blue-500 to-indigo-600",
      path: "/admin/blog",
      endpoints: 3,
      features: ["Auto-generation", "SEO optimization", "Social sharing", "Content scheduling"]
    },
    {
      id: "media-toolkit",
      title: "NCAT Media Toolkit",
      description: "Comprehensive media processing with FFmpeg, transcription, and conversion services",
      icon: <Video className="w-8 h-8" />,
      category: "Media Processing",
      color: "from-purple-500 to-pink-600",
      path: "/backend-api",
      endpoints: 15,
      features: ["Video processing", "Audio transcription", "Format conversion", "Batch operations"]
    },
    {
      id: "nexa-ai",
      title: "Nexa AI SDK",
      description: "Advanced AI inference across NPU, GPU, and CPU with multimodal capabilities",
      icon: <Brain className="w-8 h-8" />,
      category: "AI Inference",
      color: "from-green-500 to-emerald-600",
      path: "/backend-api",
      endpoints: 8,
      features: ["LLM inference", "Vision models", "Speech recognition", "Embeddings"]
    },
    {
      id: "n8n-workflows",
      title: "N8N Automation",
      description: "Workflow orchestration and automation with visual interface and API integration",
      icon: <Workflow className="w-8 h-8" />,
      category: "Workflow",
      color: "from-orange-500 to-red-600",
      path: "/services/n8n-workflow",
      endpoints: 4,
      features: ["Visual workflows", "API integrations", "Event triggers", "Data transformation"]
    },
    {
      id: "minio-storage",
      title: "MinIO Storage",
      description: "Object storage solution with S3 compatibility for file management and processing",
      icon: <Cloud className="w-8 h-8" />,
      category: "Storage",
      color: "from-cyan-500 to-blue-600",
      path: "/backend-api",
      endpoints: 4,
      features: ["S3 compatible", "File management", "Secure storage", "API access"]
    },
    {
      id: "system-tools",
      title: "System & Toolkit",
      description: "Authentication, job management, and Python code execution services",
      icon: <Settings className="w-8 h-8" />,
      category: "System",
      color: "from-gray-500 to-slate-600",
      path: "/backend-api",
      endpoints: 5,
      features: ["Authentication", "Job tracking", "Code execution", "System monitoring"]
    }
  ];

  const stats = [
    { label: "API Endpoints", value: "35+", icon: <Code className="w-5 h-5" /> },
    { label: "AI Models", value: "20+", icon: <Brain className="w-5 h-5" /> },
    { label: "Media Formats", value: "50+", icon: <Video className="w-5 h-5" /> },
    { label: "Automation Workflows", value: "100+", icon: <Workflow className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ITGyani - Advanced AI Automation & Media Processing Platform</title>
        <meta name="description" content="Comprehensive AI automation platform with advanced media processing, machine learning inference, workflow orchestration, and intelligent content generation." />
        <meta name="keywords" content="AI automation, media processing, machine learning, workflow orchestration, content generation, API platform" />
      </Helmet>
      
      <FutureFlowHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className={cn(
            "text-center max-w-5xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                <Activity className="w-4 h-4 mr-2" />
                Enterprise AI Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Advanced AI
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Automation Platform
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive suite of AI services including intelligent content generation, 
              advanced media processing, machine learning inference, and workflow orchestration 
              — all accessible through unified APIs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Link to="/backend-api">
                  <Code className="w-5 h-5 mr-2" />
                  Explore APIs
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Link to="/services">
                  <MonitorPlay className="w-5 h-5 mr-2" />
                  Live Demo
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="flex justify-center mb-2 text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Platform Services
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Unified AI Services Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Six powerful service categories working together to provide comprehensive 
              AI automation, media processing, and workflow orchestration capabilities.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai">AI Services</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={cn(
                          "p-3 rounded-xl bg-gradient-to-br text-white shadow-lg",
                          `bg-gradient-to-br ${service.color}`
                        )}>
                          {service.icon}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {service.endpoints} endpoints
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {service.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{service.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                          <Link to={service.path}>
                            Explore Service
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Services Tab */}
            <TabsContent value="ai" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.filter(s => s.category === "AI Content" || s.category === "AI Inference").map((service) => (
                  <Card key={service.id} className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn(
                        "p-3 rounded-xl bg-gradient-to-br text-white",
                        `bg-gradient-to-br ${service.color}`
                      )}>
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{service.title}</h3>
                        <Badge variant="secondary">{service.category}</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link to={service.path}>
                        Access {service.title}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tabs with similar structure... */}
            <TabsContent value="media" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Advanced Media Processing</h3>
                <p className="text-muted-foreground">
                  Comprehensive toolkit for audio, video, and image processing with FFmpeg integration
                </p>
              </div>
              {/* Media services content */}
            </TabsContent>

            <TabsContent value="workflow" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Workflow Automation</h3>
                <p className="text-muted-foreground">
                  Visual workflow designer with powerful automation capabilities
                </p>
              </div>
              {/* Workflow services content */}
            </TabsContent>

            <TabsContent value="storage" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Cloud Storage Solutions</h3>
                <p className="text-muted-foreground">
                  S3-compatible object storage with advanced file management
                </p>
              </div>
              {/* Storage services content */}
            </TabsContent>

            <TabsContent value="system" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">System & Management Tools</h3>
                <p className="text-muted-foreground">
                  Authentication, monitoring, and system management utilities
                </p>
              </div>
              {/* System services content */}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Start building with our comprehensive API platform today. 
              Access powerful AI services, media processing, and automation tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-lg">
                <Link to="/backend-api">
                  <FileText className="w-5 h-5 mr-2" />
                  API Documentation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-6 text-lg border-white/20 text-white hover:bg-white/10">
                <Link to="/contact">
                  <Users className="w-5 h-5 mr-2" />
                  Get Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ITGyaniHomepage;