import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Wand2,
  Image,
  Video,
  Download,
  Loader,
  Sparkles,
  Zap,
  Upload,
  Settings,
  Play
} from "lucide-react";

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState<{
    type: 'image' | 'video';
    url: string;
    filename: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!webhookUrl.trim()) {
      toast.error("Please enter your n8n webhook URL");
      return;
    }

    setIsGenerating(true);
    console.log(`Generating ${activeTab} with prompt:`, prompt);

    try {
      // Send request to n8n webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS for webhook
        body: JSON.stringify({
          type: activeTab,
          prompt: prompt,
          timestamp: new Date().toISOString(),
          source: "neuralflow-ai-studio",
        }),
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock generated content - in real implementation, this would come from the second webhook
      const mockContent = {
        type: activeTab as 'image' | 'video',
        url: activeTab === 'image' 
          ? `https://picsum.photos/512/512?random=${Date.now()}` 
          : `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`,
        filename: `generated_${activeTab}_${Date.now()}.${activeTab === 'image' ? 'png' : 'mp4'}`
      };

      setGeneratedContent(mockContent);
      toast.success(`${activeTab === 'image' ? 'Image' : 'Video'} generated successfully!`);
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Generation request sent to n8n workflow. Check your webhook configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedContent) {
      // Create download link
      const link = document.createElement('a');
      link.href = generatedContent.url;
      link.download = generatedContent.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Download started!");
    }
  };

  const examples = {
    image: [
      "A futuristic AI robot working in a modern office",
      "Abstract geometric pattern with vibrant colors",
      "Professional headshot photo of a business person",
      "Minimalist logo design for tech startup"
    ],
    video: [
      "Smooth camera movement through a digital landscape",
      "Product showcase with dynamic lighting effects",
      "Abstract animation with flowing particles",
      "Professional presentation intro animation"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
                AI Studio - Powered by n8n
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Create <span className="gradient-text">AI Content</span> Instantly
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Generate stunning images and videos using our AI-powered n8n workflows. 
                Simply enter your prompt and let our automation handle the rest.
              </p>
            </div>
          </div>
        </section>

        {/* Studio Interface */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Wand2 className="h-6 w-6 text-primary" />
                    AI Content Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {/* Content Type Tabs */}
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="image" className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        Images
                      </TabsTrigger>
                      <TabsTrigger value="video" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Videos
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="image" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Generate AI Images</h3>
                        <p className="text-foreground/70 mb-6">
                          Create stunning, high-quality images from text descriptions using our advanced AI models.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="video" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Generate AI Videos</h3>
                        <p className="text-foreground/70 mb-6">
                          Transform your ideas into dynamic video content with AI-powered video generation.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Webhook Configuration */}
                  <div className="mb-8 p-6 glass-card rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings className="h-5 w-5 text-secondary" />
                      <h4 className="font-semibold">n8n Webhook Configuration</h4>
                    </div>
                    <Input
                      type="url"
                      placeholder="https://your-n8n-instance.com/webhook/ai-generator"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="bg-input/50 border-border/50 focus:border-primary"
                    />
                    <p className="text-sm text-foreground/60 mt-2">
                      Enter your n8n webhook URL that will handle the AI generation request.
                    </p>
                  </div>

                  {/* Prompt Input */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium mb-3">
                      Describe what you want to create *
                    </label>
                    <Textarea
                      placeholder={`Describe the ${activeTab} you want to generate...`}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                      className="bg-input/50 border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  {/* Example Prompts */}
                  <div className="mb-8">
                    <h4 className="font-medium mb-3">Example Prompts:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {examples[activeTab as keyof typeof examples].map((example, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="text-left text-sm h-auto p-3 btn-ghost justify-start"
                          onClick={() => setPrompt(example)}
                        >
                          "{example}"
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim() || !webhookUrl.trim()}
                    className="btn-hero w-full md:w-auto text-lg px-8 py-4"
                  >
                    {isGenerating ? (
                      <>
                        <Loader className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate {activeTab === 'image' ? 'Image' : 'Video'}
                      </>
                    )}
                  </Button>

                  {/* Generated Content */}
                  {generatedContent && (
                    <div className="mt-8 p-6 glass-card rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Zap className="h-5 w-5 text-primary" />
                          Generated {generatedContent.type === 'image' ? 'Image' : 'Video'}
                        </h4>
                        <Button
                          onClick={handleDownload}
                          variant="outline"
                          className="btn-ghost"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>

                      <div className="bg-muted/20 rounded-lg p-4">
                        {generatedContent.type === 'image' ? (
                          <img
                            src={generatedContent.url}
                            alt="Generated content"
                            className="w-full max-w-md mx-auto rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg">
                            <div className="text-center">
                              <Play className="h-12 w-12 mx-auto mb-4 text-primary" />
                              <p className="text-sm text-foreground/70 mb-4">
                                Video generated successfully
                              </p>
                              <p className="text-xs text-foreground/50">
                                {generatedContent.filename}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* How It Works */}
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <h4 className="font-semibold mb-4">How It Works:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-foreground/70">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary/20 text-primary rounded-lg flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                          1
                        </div>
                        <p>Enter your prompt and webhook URL</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-secondary/20 text-secondary rounded-lg flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                          2
                        </div>
                        <p>n8n workflow processes your request</p>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-primary-glow/20 text-primary-glow rounded-lg flex items-center justify-center mx-auto mb-2 text-xs font-bold">
                          3
                        </div>
                        <p>AI generates and returns your content</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AIStudio;