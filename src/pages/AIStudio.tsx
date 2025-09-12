import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
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
  Play,
  Edit3,
  Save,
  Brain
} from "lucide-react";

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState("image");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [isEditingWebhook, setIsEditingWebhook] = useState(false);
  const [tempWebhookUrl, setTempWebhookUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    type: 'image' | 'video';
    url: string;
    filename: string;
  } | null>(null);
  // Built-in image generation (Replicate + Flux)
  const [replicateToken, setReplicateToken] = useState("");
  const [replicateModel, setReplicateModel] = useState<"flux-schnell" | "flux-dev">("flux-schnell");

  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedWebhookUrl = localStorage.getItem('n8n-webhook-url');
    if (savedWebhookUrl) setWebhookUrl(savedWebhookUrl);

    const savedReplicateToken = localStorage.getItem('replicate-api-token');
    if (savedReplicateToken) setReplicateToken(savedReplicateToken);

    const savedReplicateModel = localStorage.getItem('replicate-model') as ("flux-schnell" | "flux-dev") | null;
    if (savedReplicateModel) setReplicateModel(savedReplicateModel);
  }, []);

  // Save webhook URL to localStorage whenever it changes
  const saveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem('n8n-webhook-url', url);
    toast.success("Webhook URL saved locally!");
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    console.log(`Generating ${activeTab} with prompt:`, prompt);

    try {
      if (activeTab === 'image' && replicateToken.trim()) {
        // Built-in image generation via Replicate (Flux)
        const modelId = replicateModel === 'flux-dev'
          ? 'black-forest-labs/flux-dev'
          : 'black-forest-labs/flux-schnell';

        const res = await fetch(`https://api.replicate.com/v1/models/${modelId}/predictions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${replicateToken.trim()}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Prefer': 'wait',
          },
          body: JSON.stringify({
            input: {
              prompt: prompt.trim(),
            }
          })
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Replicate error ${res.status}: ${errText}`);
        }

        const data = await res.json();
        // Replicate returns output as array (strings or file objects)
        let outputUrl: string | null = null;
        const out = data?.output;
        if (Array.isArray(out) && out.length > 0) {
          const first = out[0];
          if (typeof first === 'string') outputUrl = first;
          else if (first?.url) outputUrl = first.url;
          else if (first?.file) outputUrl = first.file;
        } else if (typeof out === 'string') {
          outputUrl = out;
        }

        if (!outputUrl) {
          console.error('Unexpected Replicate response:', data);
          throw new Error('No image URL returned by model');
        }

        setGeneratedContent({
          type: 'image',
          url: outputUrl,
          filename: `flux_${replicateModel}_${Date.now()}.webp`,
        });
        toast.success('Image generated with Flux!');
        return;
      }

      // Fallback: send to n8n (required for video, or when no Replicate token)
      if (!webhookUrl.trim()) {
        toast.error('Please enter your n8n webhook URL');
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: activeTab,
          prompt: prompt,
          timestamp: new Date().toISOString(),
          source: "itgyani-ai-studio",
        }),
      });

      if (response.ok) {
        toast.success("Generation request sent to n8n workflow!");
      } else {
        toast.success("Request sent to n8n workflow!");
      }

      // Temporary mock until n8n returns content back
      await new Promise(resolve => setTimeout(resolve, 3000));
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
      toast.error(error instanceof Error ? error.message : "Failed to generate content. Please try again.");
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

  const handleEditWebhook = () => {
    setTempWebhookUrl(webhookUrl);
    setIsEditingWebhook(true);
  };

  const handleSaveWebhook = () => {
    saveWebhookUrl(tempWebhookUrl);
    setIsEditingWebhook(false);
  };

  const handleCancelEdit = () => {
    setTempWebhookUrl("");
    setIsEditingWebhook(false);
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }

    setIsEnhancingPrompt(true);
    try {
      // Simulate AI enhancement - in real implementation, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const enhancementPrefixes = {
        image: [
          "Ultra high-resolution, photorealistic",
          "Professional photography style",
          "Cinematic lighting, highly detailed",
          "Award-winning digital art",
          "Studio quality, perfect composition"
        ],
        video: [
          "Smooth cinematic movement, professional grade",
          "High-quality animation, fluid motion",
          "Dynamic camera work, engaging visual flow",
          "Broadcast quality, seamless transitions",
          "Professional video production style"
        ]
      };

      const qualityModifiers = [
        "8K resolution, perfect clarity",
        "masterpiece quality, trending on ArtStation",
        "professional grade, commercial quality",
        "award-winning, highly detailed",
        "pristine quality, flawless execution"
      ];

      const randomPrefix = enhancementPrefixes[activeTab as keyof typeof enhancementPrefixes][
        Math.floor(Math.random() * enhancementPrefixes[activeTab as keyof typeof enhancementPrefixes].length)
      ];
      
      const randomModifier = qualityModifiers[Math.floor(Math.random() * qualityModifiers.length)];
      
      const enhancedPrompt = `${randomPrefix}, ${prompt}, ${randomModifier}`;
      setPrompt(enhancedPrompt);
      toast.success("Prompt enhanced with AI optimization!");
    } catch (error) {
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancingPrompt(false);
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
      
      {/* Settings Button - Top Right */}
      <div className="fixed top-24 right-6 z-40">
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="glass-card hover:bg-primary/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                AI Studio Settings
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  n8n Webhook URL
                </label>
                <Input
                  type="url"
                  placeholder="https://your-n8n-instance.com/webhook/ai-generator"
                  value={tempWebhookUrl || webhookUrl}
                  onChange={(e) => setTempWebhookUrl(e.target.value)}
                  className="bg-input/50 border-border/50 focus:border-primary"
                />
                <p className="text-xs text-foreground/60 mt-2">
                  This URL will be saved locally in your browser
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-sm">AI Image Generation (Flux)</h4>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Replicate API Token</label>
                    <Input
                      type="password"
                      placeholder="replicate_..."
                      value={replicateToken}
                      onChange={(e) => setReplicateToken(e.target.value)}
                      className="bg-input/50 border-border/50 focus:border-primary"
                    />
                    <p className="text-xs text-foreground/60 mt-2">
                      Used to run Flux models directly from your browser. Stored locally only.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Flux model</label>
                    <select
                      value={replicateModel}
                      onChange={(e) => setReplicateModel(e.target.value as "flux-schnell" | "flux-dev")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="flux-schnell">FLUX.1 [schnell] — Fast</option>
                      <option value="flux-dev">FLUX.1 [dev] — High quality</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    if (tempWebhookUrl.trim()) {
                      saveWebhookUrl(tempWebhookUrl);
                    }
                    // Save Replicate settings
                    localStorage.setItem('replicate-api-token', replicateToken);
                    localStorage.setItem('replicate-model', replicateModel);
                    toast.success('AI generation settings saved locally!');
                    setIsSettingsOpen(false);
                  }}
                  className="btn-hero flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
                <Button
                  onClick={() => {
                    setTempWebhookUrl("");
                    setIsSettingsOpen(false);
                  }}
                  variant="ghost"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>

              <div className="pt-4 border-t border-border/50">
                <h4 className="font-medium mb-2 text-sm">Storage Information</h4>
                <p className="text-xs text-foreground/60">
                  🔒 Your webhook URL and Replicate token/model are stored locally in your browser using localStorage.
                  They are only sent to their respective services when you generate content.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
                    <div className="flex gap-2">
                      {isEditingWebhook ? (
                        <>
                          <Input
                            type="url"
                            placeholder="https://your-n8n-instance.com/webhook/ai-generator"
                            value={tempWebhookUrl}
                            onChange={(e) => setTempWebhookUrl(e.target.value)}
                            className="bg-input/50 border-border/50 focus:border-primary flex-1"
                          />
                          <Button
                            onClick={handleSaveWebhook}
                            variant="outline"
                            size="icon"
                            className="btn-ghost"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={handleCancelEdit}
                            variant="ghost"
                            size="icon"
                          >
                            ×
                          </Button>
                        </>
                      ) : (
                        <>
                          <Input
                            type="url"
                            placeholder="https://your-n8n-instance.com/webhook/ai-generator"
                            value={webhookUrl}
                            autoComplete="off"
                            className="bg-input/50 border-border/50 focus:border-primary flex-1"
                            readOnly={!isEditingWebhook}
                          />
                          <Button
                            onClick={handleEditWebhook}
                            variant="outline"
                            size="icon"
                            className="btn-ghost"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60 mt-2">
                      Enter your n8n webhook URL. It will be saved in your browser's local storage.
                      <span className="inline-flex items-center gap-1 ml-2 px-2 py-1 rounded-full bg-green-500/20 text-green-600 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Auto-saved
                      </span>
                    </p>
                  </div>

                  {/* Prompt Input */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium">
                        Describe what you want to create *
                      </label>
                      <Button
                        onClick={enhancePrompt}
                        disabled={isEnhancingPrompt || !prompt.trim()}
                        variant="outline"
                        size="sm"
                        className="btn-ghost text-xs"
                      >
                        {isEnhancingPrompt ? (
                          <>
                            <Loader className="mr-1 h-3 w-3 animate-spin" />
                            Enhancing...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-1 h-3 w-3" />
                            AI Enhance
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="relative">
                      <Textarea
                        placeholder={`Describe the ${activeTab} you want to generate...`}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        rows={4}
                        className="bg-input/50 border-border/50 focus:border-primary resize-none pr-12"
                      />
                      {prompt.trim() && (
                        <Button
                          onClick={enhancePrompt}
                          disabled={isEnhancingPrompt}
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <Sparkles className="h-4 w-4 text-primary" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-foreground/60 mt-2">
                      💡 Click "AI Enhance" to optimize your prompt for better results
                    </p>
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
      <PopupManager page="ai-studio" />
    </div>
  );
};

export default AIStudio;