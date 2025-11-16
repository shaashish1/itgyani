import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Video, History, RotateCcw, Trash2, Sparkles } from "lucide-react";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Please upload an image"),
});

type FormData = z.infer<typeof formSchema>;

interface HistoryItem {
  id: string;
  description: string;
  imageName: string;
  imageDataUrl: string;
  timestamp: string;
}

const UGCVideoCreator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("ugc_video_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error loading history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  const saveHistory = (newHistory: HistoryItem[]) => {
    localStorage.setItem("ugc_video_history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const convertFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("description", data.description);
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
        
        // Save to history
        const imageDataUrl = await convertFileToDataUrl(data.image[0]);
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          description: data.description,
          imageName: data.image[0].name,
          imageDataUrl: imageDataUrl,
          timestamp: new Date().toISOString(),
        };
        
        const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10 items
        saveHistory(updatedHistory);
      }

      const response = await fetch(
        "https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit video request");
      }

      toast({
        title: "Success!",
        description: "Your video creation request has been submitted.",
      });

      form.reset();
      setSelectedFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadFromHistory = async (item: HistoryItem) => {
    // Convert data URL back to File object
    const response = await fetch(item.imageDataUrl);
    const blob = await response.blob();
    const file = new File([blob], item.imageName, { type: blob.type });
    
    // Create FileList-like object
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    
    form.setValue("description", item.description);
    form.setValue("image", dataTransfer.files);
    setSelectedFileName(item.imageName);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    toast({
      title: "Loaded from history",
      description: "Form populated with previous submission. You can edit and resubmit.",
    });
  };

  const deleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistory(updatedHistory);
    toast({
      title: "Deleted",
      description: "History item removed.",
    });
  };

  const clearAllHistory = () => {
    saveHistory([]);
    toast({
      title: "History cleared",
      description: "All history items have been removed.",
    });
  };

  const generatePromptWithAI = async () => {
    if (!selectedImageDataUrl) {
      toast({
        title: "No image uploaded",
        description: "Please upload an image first to use AI magic.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingPrompt(true);

    try {
      const currentPrompt = form.getValues("description");
      
      const { data, error } = await supabase.functions.invoke('generate-video-prompt', {
        body: { 
          imageDataUrl: selectedImageDataUrl,
          currentPrompt: currentPrompt || ""
        }
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const generatedPrompt = data?.prompt;
      
      if (generatedPrompt) {
        form.setValue("description", generatedPrompt);
        toast({
          title: "✨ AI Magic Complete!",
          description: currentPrompt 
            ? "Your prompt has been refined and enhanced."
            : "A video prompt has been generated from your image.",
        });
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  return (
    <>
      <SEO 
        title="UGC Video Creator | AI Workflow Automation"
        description="Create custom UGC videos with AI. Upload your image and describe the video you want to generate."
        canonicalUrl="/ugc-video-creator"
      />
      
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              UGC Video Creator
            </h1>
            <p className="text-lg text-muted-foreground">
              Transform your ideas into engaging UGC videos powered by AI
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel className="text-lg font-semibold">
                              Describe The Video You Want
                            </FormLabel>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={generatePromptWithAI}
                              disabled={isGeneratingPrompt || !selectedImageDataUrl}
                              className="gap-2"
                            >
                              {isGeneratingPrompt ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4" />
                                  AI Magic
                                </>
                              )}
                            </Button>
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your video in detail... Or use AI Magic to generate a prompt from your image!"
                              className="min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Upload Image
                          </FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Label
                                htmlFor="image-upload"
                                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors bg-muted/30"
                              >
                                <div className="text-center">
                                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    {selectedFileName || "Click to upload an image"}
                                  </span>
                                </div>
                              </Label>
                              <Input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                {...field}
                                onChange={async (e) => {
                                  onChange(e.target.files);
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setSelectedFileName(file.name);
                                    // Convert to data URL for AI analysis
                                    const dataUrl = await convertFileToDataUrl(file);
                                    setSelectedImageDataUrl(dataUrl);
                                  } else {
                                    setSelectedFileName("");
                                    setSelectedImageDataUrl("");
                                  }
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Create Video"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              <div className="mt-8 bg-muted/50 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-3">Tips for Best Results:</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be specific in your description - include details about style, tone, and key messages</li>
                  <li>• Upload high-quality images (JPG, PNG) for better results</li>
                  <li>• Describe the desired length and pacing of your video</li>
                  <li>• Mention any specific calls-to-action you want included</li>
                </ul>
              </div>
            </div>

            {/* History Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="w-5 h-5 text-primary" />
                      <CardTitle>History</CardTitle>
                    </div>
                    {history.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllHistory}
                        className="h-8 text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <CardDescription>
                    Your recent video requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>No history yet</p>
                      <p className="text-xs mt-1">Your submissions will appear here</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px] pr-4">
                      <div className="space-y-4">
                        {history.map((item) => (
                          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative aspect-video bg-muted">
                              <img
                                src={item.imageDataUrl}
                                alt={item.imageName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 space-y-2">
                              <p className="text-sm line-clamp-3 text-foreground">
                                {item.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className="text-xs">
                                  {new Date(item.timestamp).toLocaleDateString()}
                                </Badge>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => loadFromHistory(item)}
                                    className="h-7 px-2"
                                  >
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Reuse
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteHistoryItem(item.id)}
                                    className="h-7 px-2 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UGCVideoCreator;
