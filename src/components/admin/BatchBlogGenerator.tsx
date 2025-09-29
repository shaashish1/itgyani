import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, FileText, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

const DEFAULT_TOPICS = `GPT-5 vs Claude Opus 4.1: The Ultimate AI Showdown
Gemini 2.5 Pro: Google's Latest AI Breakthrough
OpenAI O3 Mini: Revolutionary Reasoning Model Explained
How Manus AI is Changing Web Automation Forever
Building AI Agents with OpenManus Framework
Julian Goldie's Top AI SEO Strategies for 2025
The Rise of Chinese AI Super Agents
DeepSeek V3.1: China's Answer to GPT-5
AI Coding Competition Winners: What Gemini Achieved
Future of AI Automation: Trends to Watch
AI-Powered Content Creation Tools Comparison
Best AI Models for Code Generation in 2025
How AI is Revolutionizing Digital Marketing
Voice-Enabled AI Assistants: Local vs Cloud
Privacy-First AI: Running Models Locally
AI Agent Platforms: Comprehensive Guide
Real-World AI Applications in Business
AI vs Human: Latest Productivity Studies
GPT-5 Nano: Speed vs Accuracy Trade-offs
Building Custom AI Workflows with n8n
AI Image Generation: Stable Diffusion Updates
Text-to-Video AI: Latest Developments
AI for Customer Service Automation
Sentiment Analysis with Modern AI Models
AI-Powered Sales Funnel Optimization
Natural Language Processing Breakthroughs 2025
AI Ethics and Responsible Development
Open Source AI Models: Community Impact
AI Benchmarks: Understanding Performance Metrics
Fine-Tuning Large Language Models Guide
AI API Integration Best Practices
Multimodal AI: Text, Image, and Video Processing
AI Cost Optimization Strategies
Enterprise AI Adoption Success Stories
AI Security: Protecting Against Prompt Injection
AI Hallucinations: Detection and Prevention
Context Windows: Why Size Matters in AI
AI Token Economics and Pricing Models
Retrieval Augmented Generation (RAG) Explained
Vector Databases for AI Applications
AI Agent Memory Systems Deep Dive
Building Conversational AI Chatbots
AI for Data Analysis and Visualization
Predictive Analytics with Machine Learning
AI-Driven Business Intelligence Tools
Automated Testing with AI Assistance
AI Code Review and Quality Assurance
DevOps Automation Using AI
AI for Cybersecurity Threat Detection
Machine Learning Operations (MLOps) Best Practices
AI Model Deployment Strategies
Edge AI: Running Models on Devices
AI Hardware: GPUs vs TPUs vs NPUs
Quantum Computing and AI Integration
AI in Healthcare: Diagnostic Applications
AI-Powered Drug Discovery Revolution
AI for Financial Forecasting
Algorithmic Trading with AI Models
AI in Legal Research and Document Review
Educational AI: Personalized Learning Systems
AI for Content Moderation at Scale
Recommendation Systems with Neural Networks
AI Music Generation and Composition
AI Game Development Tools
3D Asset Generation with AI
AI Video Editing and Post-Production
Real-Time Translation with Neural Networks
AI Accessibility Tools for Disabilities
Environmental AI: Climate Change Solutions
AI in Agriculture: Precision Farming
Autonomous Vehicles: Latest AI Advances
Robotics and AI Integration
AI for Supply Chain Optimization
Inventory Management with Predictive AI
AI-Powered Customer Insights
Sentiment Analysis for Brand Monitoring
AI Email Marketing Automation
Social Media AI Analytics Tools
AI Content Planning and Strategy
SEO Optimization with AI Tools
AI Keyword Research Methodologies
Link Building Automation with AI
AI for Technical SEO Audits
Voice Search Optimization Strategies
AI-Generated FAQ and Support Content
Chatbot Development Frameworks Comparison
AI Training Data: Quality vs Quantity
Transfer Learning in Modern AI
Few-Shot Learning Applications
Zero-Shot Learning Capabilities
Prompt Engineering Advanced Techniques
AI Safety and Alignment Research
Constitutional AI Frameworks
AI Governance and Regulation Updates
AI Job Market: Skills in Demand
Future of Work with AI Collaboration
AI Productivity Tools for Professionals
Time Management AI Applications`;

export function BatchBlogGenerator() {
  const [topics, setTopics] = useState(DEFAULT_TOPICS);
  const [tone, setTone] = useState<'professional' | 'casual' | 'technical'>('professional');
  const [audience, setAudience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [category, setCategory] = useState('ai-automation');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topics.trim()) {
      toast.error("Please enter at least one topic");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setResults(null);

    try {
      // Parse topics (one per line)
      const topicList = topics
        .split('\n')
        .map(t => t.trim())
        .filter(t => t.length > 0)
        .map(topic => ({
          topic,
          category,
          keywords: [] // Can be enhanced to parse keywords from topic
        }));

      if (topicList.length === 0) {
        toast.error("No valid topics found");
        setIsGenerating(false);
        return;
      }

      toast.info(`Starting batch generation of ${topicList.length} blog posts...`, {
        duration: 5000
      });

      const { data, error } = await supabase.functions.invoke('generate-blog-batch', {
        body: {
          topics: topicList,
          tone,
          audience,
          length,
          isPremium: false,
          delayBetweenRequests: 2000 // 2 seconds between requests
        }
      });

      if (error) {
        console.error('Batch generation error:', error);
        throw error;
      }

      setResults(data.results);
      
      if (data.results.successful > 0) {
        toast.success(`Successfully generated ${data.results.successful} blog posts!`, {
          description: data.results.failed > 0 
            ? `${data.results.failed} posts failed to generate` 
            : 'All posts generated successfully',
          duration: 10000
        });
      } else {
        toast.error("No blog posts were generated", {
          description: "Check the error log below for details",
          duration: 10000
        });
      }

      // Calculate progress
      setProgress(100);

    } catch (error: any) {
      console.error('Error generating batch:', error);
      toast.error("Failed to generate blog posts", {
        description: error.message || "Please try again",
        duration: 5000
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const topicCount = topics.split('\n').filter(t => t.trim().length > 0).length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Batch Blog Generator
          </CardTitle>
          <CardDescription>
            Generate multiple AI-powered blog posts at once. Enter one topic per line.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topics">Blog Topics ({topicCount} topics)</Label>
            <Textarea
              id="topics"
              placeholder="Enter one topic per line..."
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              rows={12}
              className="font-mono text-sm"
              disabled={isGenerating}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} disabled={isGenerating}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai-automation">AI & Automation</SelectItem>
                  <SelectItem value="business-transformation">Business Transformation</SelectItem>
                  <SelectItem value="tech-innovation">Tech Innovation</SelectItem>
                  <SelectItem value="workflow-optimization">Workflow Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={(v: any) => setTone(v)} disabled={isGenerating}>
                <SelectTrigger id="tone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Select value={audience} onValueChange={(v: any) => setAudience(v)} disabled={isGenerating}>
                <SelectTrigger id="audience">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Article Length</Label>
              <Select value={length} onValueChange={(v: any) => setLength(v)} disabled={isGenerating}>
                <SelectTrigger id="length">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (800-1200 words)</SelectItem>
                  <SelectItem value="medium">Medium (1500-2000 words)</SelectItem>
                  <SelectItem value="long">Long (2500-3500 words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || topicCount === 0}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating {topicCount} Posts...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate {topicCount} Blog Posts
              </>
            )}
          </Button>

          {isGenerating && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">
                This may take several minutes. Please don't close this page.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Generation Results</CardTitle>
            <CardDescription>
              {results.successful} successful • {results.failed} failed • {results.total} total
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-4 rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
                <div>
                  <div className="text-2xl font-bold">{results.successful}</div>
                  <div className="text-sm text-muted-foreground">Successful</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
                <div>
                  <div className="text-2xl font-bold">{results.failed}</div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{results.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </div>

            {results.posts && results.posts.length > 0 && (
              <div className="space-y-2">
                <Label>Generated Posts</Label>
                <ScrollArea className="h-48 rounded-md border p-4">
                  <div className="space-y-2">
                    {results.posts.map((post: any, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <div className="font-medium">{post.title}</div>
                          <div className="text-muted-foreground text-xs">{post.topic}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {results.errors && results.errors.length > 0 && (
              <div className="space-y-2">
                <Label className="text-destructive">Errors</Label>
                <ScrollArea className="h-32 rounded-md border border-destructive/20 p-4">
                  <div className="space-y-1">
                    {results.errors.map((error: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-destructive">{error}</div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
