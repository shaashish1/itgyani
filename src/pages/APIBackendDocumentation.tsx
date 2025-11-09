import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Code, Database, Mic, Image, Video, Play, Brain, Cloud, FileText, Bot, Zap } from "lucide-react";

const APIBackendDocumentation = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const apiCategories = {
    "AI & Blog Automation": {
      icon: <Bot className="w-5 h-5" />,
      color: "bg-blue-500",
      endpoints: [
        {
          path: "/api/blog/generate",
          method: "POST",
          description: "Generate AI-powered blog content with SEO optimization",
          params: ["topic", "keywords", "tone", "length"]
        },
        {
          path: "/api/blog/auto-publish",
          method: "POST", 
          description: "Automatically publish generated blogs with scheduling",
          params: ["content", "publishTime", "socialShare"]
        },
        {
          path: "/api/seo/optimize",
          method: "POST",
          description: "Optimize content for search engines with meta tags and structure",
          params: ["content", "targetKeywords", "competitorAnalysis"]
        }
      ]
    },
    "NCAT Media Toolkit": {
      icon: <Video className="w-5 h-5" />,
      color: "bg-purple-500",
      endpoints: [
        {
          path: "/v1/audio/concatenate",
          method: "POST",
          description: "Combine multiple audio files into a single audio file",
          params: ["audio_urls", "webhook_url", "id"]
        },
        {
          path: "/v1/media/transcribe",
          method: "POST",
          description: "Transcribe or translate audio/video content with timestamps",
          params: ["media_url", "task", "language", "word_timestamps", "response_type"]
        },
        {
          path: "/v1/video/caption",
          method: "POST",
          description: "Add customizable captions to videos with styling options",
          params: ["video_url", "subtitle_data", "font_size", "font_color", "position"]
        },
        {
          path: "/v1/image/convert/video",
          method: "POST",
          description: "Transform static images into videos with zoom effects",
          params: ["image_url", "duration", "zoom_effect", "output_format"]
        },
        {
          path: "/v1/ffmpeg/compose",
          method: "POST",
          description: "Flexible FFmpeg interface for complex media processing",
          params: ["input_files", "operations", "output_settings", "filters"]
        },
        {
          path: "/v1/media/convert",
          method: "POST",
          description: "Convert media files between different formats",
          params: ["media_url", "output_format", "quality", "codec_options"]
        },
        {
          path: "/v1/video/thumbnail",
          method: "POST",
          description: "Extract thumbnail images from videos at specific timestamps",
          params: ["video_url", "timestamp", "size", "format"]
        },
        {
          path: "/v1/s3/upload",
          method: "POST",
          description: "Upload files to S3-compatible storage directly from URLs",
          params: ["file_url", "bucket", "key", "metadata"]
        }
      ]
    },
    "Nexa AI SDK": {
      icon: <Brain className="w-5 h-5" />,
      color: "bg-green-500",
      endpoints: [
        {
          path: "/nexa/llm/inference",
          method: "POST",
          description: "Run Large Language Model inference on NPU/GPU/CPU",
          params: ["model_id", "prompt", "max_tokens", "temperature", "backend"]
        },
        {
          path: "/nexa/vlm/multimodal",
          method: "POST",
          description: "Multimodal inference with vision and language understanding",
          params: ["model_id", "image_url", "text_prompt", "task_type"]
        },
        {
          path: "/nexa/asr/transcribe",
          method: "POST",
          description: "Automatic Speech Recognition with real-time processing",
          params: ["audio_url", "language", "real_time", "confidence_threshold"]
        },
        {
          path: "/nexa/embedder/vectorize",
          method: "POST",
          description: "Text vectorization and similarity computation",
          params: ["text", "model_type", "normalize", "dimensions"]
        },
        {
          path: "/nexa/reranker/rank",
          method: "POST",
          description: "Document reranking for improved search results",
          params: ["query", "documents", "top_k", "model_id"]
        },
        {
          path: "/nexa/cv/ocr",
          method: "POST",
          description: "Computer Vision OCR and text recognition",
          params: ["image_url", "detection_type", "language", "confidence_min"]
        }
      ]
    },
    "N8N Workflows": {
      icon: <Zap className="w-5 h-5" />,
      color: "bg-orange-500",
      endpoints: [
        {
          path: "/n8n/workflow/execute",
          method: "POST",
          description: "Execute N8N automation workflows programmatically",
          params: ["workflow_id", "input_data", "webhook_response", "async_mode"]
        },
        {
          path: "/n8n/workflow/status",
          method: "GET",
          description: "Check the status of running workflow executions",
          params: ["execution_id", "workflow_id"]
        },
        {
          path: "/n8n/image-to-video",
          method: "POST",
          description: "Specialized workflow for image to video conversion",
          params: ["image_urls", "transition_type", "duration", "output_quality"]
        }
      ]
    },
    "MinIO Storage": {
      icon: <Cloud className="w-5 h-5" />,
      color: "bg-red-500",
      endpoints: [
        {
          path: "/minio/upload",
          method: "POST",
          description: "Upload files to MinIO object storage",
          params: ["file", "bucket", "object_name", "metadata"]
        },
        {
          path: "/minio/download",
          method: "GET",
          description: "Download files from MinIO storage with presigned URLs",
          params: ["bucket", "object_name", "expires"]
        },
        {
          path: "/minio/ffmpeg-input",
          method: "POST",
          description: "Upload files to FFmpeg input directory for processing",
          params: ["file", "processing_type", "priority"]
        },
        {
          path: "/minio/ffmpeg-output",
          method: "GET",
          description: "Retrieve processed files from FFmpeg output directory",
          params: ["job_id", "file_type", "download_url"]
        }
      ]
    },
    "System & Toolkit": {
      icon: <FileText className="w-5 h-5" />,
      color: "bg-gray-500",
      endpoints: [
        {
          path: "/v1/toolkit/authenticate",
          method: "POST",
          description: "Simple authentication mechanism for API key validation",
          params: ["api_key", "service_type"]
        },
        {
          path: "/v1/toolkit/test",
          method: "GET",
          description: "Verify API installation and functionality",
          params: []
        },
        {
          path: "/v1/toolkit/job/status",
          method: "GET",
          description: "Retrieve status of specific job by ID",
          params: ["job_id"]
        },
        {
          path: "/v1/toolkit/jobs/status",
          method: "GET",
          description: "Retrieve status of all jobs within time range",
          params: ["start_time", "end_time", "status_filter"]
        },
        {
          path: "/v1/code/execute/python",
          method: "POST",
          description: "Execute Python code remotely and return results",
          params: ["code", "timeout", "environment", "libraries"]
        }
      ]
    }
  };

  const EndpointCard = ({ endpoint, category }: { endpoint: any, category: string }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-xs">
              {endpoint.method}
            </Badge>
            <code className="text-sm bg-muted px-2 py-1 rounded">
              {endpoint.path}
            </code>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-2">
          {endpoint.description}
        </CardDescription>
      </CardHeader>
      {endpoint.params && endpoint.params.length > 0 && (
        <CardContent>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Parameters:</h4>
            <div className="flex flex-wrap gap-2">
              {endpoint.params.map((param: string, idx: number) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {param}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ITGyani API Backend Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive API documentation for AI-powered automation, media processing, 
            machine learning inference, and workflow orchestration services.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(apiCategories).map(([category, info]) => (
                <Card key={category} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${info.color} text-white`}>
                        {info.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category}</CardTitle>
                        <CardDescription>
                          {info.endpoints.length} endpoints available
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {category === "AI & Blog Automation" && "Automated content generation and SEO optimization"}
                      {category === "NCAT Media Toolkit" && "Comprehensive media processing and conversion"}
                      {category === "Nexa AI SDK" && "Advanced AI inference across multiple modalities"}
                      {category === "N8N Workflows" && "Workflow automation and orchestration"}
                      {category === "MinIO Storage" && "Object storage and file management"}
                      {category === "System & Toolkit" && "Authentication and system utilities"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <ScrollArea className="h-[800px] w-full rounded-md border p-4">
              {Object.entries(apiCategories).map(([category, info]) => (
                <Collapsible
                  key={category}
                  open={openSections[category]}
                  onOpenChange={() => toggleSection(category)}
                  className="mb-6"
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-between p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${info.color} text-white`}>
                          {info.icon}
                        </div>
                        <span className="text-lg font-semibold">{category}</span>
                        <Badge variant="secondary">{info.endpoints.length} endpoints</Badge>
                      </div>
                      {openSections[category] ? <ChevronDown /> : <ChevronRight />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4">
                    <div className="grid gap-4 mt-4">
                      {info.endpoints.map((endpoint, idx) => (
                        <EndpointCard key={idx} endpoint={endpoint} category={category} />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Authentication Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">API Key Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Most endpoints require API key authentication via headers:
                  </p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    {`Authorization: Bearer YOUR_API_KEY\nContent-Type: application/json`}
                  </code>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Nexa AI Token</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nexa AI endpoints require special license tokens for Pro models:
                  </p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    {`nexa config set license '<your_token_here>'`}
                  </code>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Webhook Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Many endpoints support webhook callbacks for async processing:
                  </p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    {`{
  "webhook_url": "https://your-domain.com/webhook",
  "webhook_secret": "optional_secret_for_verification"
}`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIBackendDocumentation;