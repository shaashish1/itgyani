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
import { Loader2, Upload, Video, History, RotateCcw, Trash2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Activity } from "lucide-react";
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
  timestamp: string;
}

interface WebhookTestResult {
  url: string;
  status: number;
  statusText: string;
  body: string;
  error?: string;
  timestamp: string;
}

const UGCVideoCreator = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [webhookStatus, setWebhookStatus] = useState<"live" | "test_mode" | "checking" | "error">("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<WebhookTestResult[]>([]);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  // Check webhook status
  const checkWebhookStatus = async () => {
    setWebhookStatus("checking");
    try {
      const { data, error } = await supabase.functions.invoke('check-webhook-status');
      
      if (error) throw error;
      
      setWebhookStatus(data.status);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking webhook status:', error);
      setWebhookStatus("error");
      setLastChecked(new Date());
    }
  };

  // Run detailed diagnostics on both webhook URLs
  const runWebhookDiagnostics = async () => {
    setIsRunningDiagnostics(true);
    setDiagnosticResults([]);
    
    const urls = [
      { name: "Production Webhook", url: "https://n8n.itgyani.com/webhook/31abdab0-4859-46e6-8a16-867b79604ff1" },
      { name: "Test Webhook", url: "https://n8n.itgyani.com/webhook-test/31abdab0-4859-46e6-8a16-867b79604ff1" }
    ];
    
    const results: WebhookTestResult[] = [];
    
    for (const { name, url } of urls) {
      try {
        const startTime = Date.now();
        const response = await fetch(url, {
          method: 'GET',
          signal: AbortSignal.timeout(10000),
        });
        
        const responseTime = Date.now() - startTime;
        let body = '';
        
        try {
          const contentType = response.headers.get('content-type');
          if (contentType?.includes('application/json')) {
            body = JSON.stringify(await response.json(), null, 2);
          } else {
            body = await response.text();
          }
        } catch {
          body = '[Unable to parse response body]';
        }
        
        results.push({
          url: `${name}: ${url}`,
          status: response.status,
          statusText: response.statusText,
          body: body || '[Empty response]',
          timestamp: `${new Date().toLocaleString()} (${responseTime}ms)`,
        });
      } catch (error: any) {
        results.push({
          url: `${name}: ${url}`,
          status: 0,
          statusText: 'Network Error',
          body: '',
          error: error.message || 'Unknown error',
          timestamp: new Date().toLocaleString(),
        });
      }
    }
    
    setDiagnosticResults(results);
    setIsRunningDiagnostics(false);
    
    toast({
      title: "Diagnostics Complete",
      description: `Tested ${results.length} webhook URLs`,
    });
  };

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
    
    // Check webhook status on mount
    checkWebhookStatus();
  }, []);

  // Save history to localStorage whenever it changes
  const saveHistory = (newHistory: HistoryItem[]) => {
    try {
      localStorage.setItem("ugc_video_history", JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error("Error saving history:", error);
      // If quota exceeded, keep only last 5 items and try again
      if (error.name === 'QuotaExceededError') {
        const reducedHistory = newHistory.slice(0, 5);
        try {
          localStorage.setItem("ugc_video_history", JSON.stringify(reducedHistory));
          setHistory(reducedHistory);
        } catch (retryError) {
          console.error("Failed to save even reduced history:", retryError);
        }
      }
    }
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
        
        // Save to history (without image to prevent quota issues)
        const newHistoryItem: HistoryItem = {
          id: Date.now().toString(),
          description: data.description,
          imageName: data.image[0].name,
          timestamp: new Date().toISOString(),
        };
        
        const updatedHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10 items
        saveHistory(updatedHistory);
      }

      const { data: result, error } = await supabase.functions.invoke('submit-ugc-video', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Success!",
        description: "Your video creation request has been submitted.",
      });

      form.reset();
      setSelectedFileName("");
      setSelectedImageDataUrl("");
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

  const loadFromHistory = (item: HistoryItem) => {
    // Load description only (image is not stored to save space)
    form.setValue("description", item.description);
    
    // Clear the image field since we don't have it saved
    form.resetField("image");
    setSelectedFileName("");
    setSelectedImageDataUrl("");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    toast({
      title: "Loaded from history",
      description: "Description loaded. Please upload the image again.",
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
            
            {/* Webhook Status Badge */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <Badge 
                variant="outline" 
                className={`px-4 py-2 flex items-center gap-2 ${
                  webhookStatus === "live" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : webhookStatus === "test_mode"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : webhookStatus === "checking"
                    ? "bg-gray-50 text-gray-700 border-gray-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {webhookStatus === "live" && <CheckCircle2 className="w-4 h-4" />}
                {webhookStatus === "test_mode" && <AlertCircle className="w-4 h-4" />}
                {webhookStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin" />}
                {webhookStatus === "error" && <AlertCircle className="w-4 h-4" />}
                <span className="font-semibold">
                  {webhookStatus === "live" && "Live"}
                  {webhookStatus === "test_mode" && "Test Mode"}
                  {webhookStatus === "checking" && "Checking..."}
                  {webhookStatus === "error" && "Connection Error"}
                </span>
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={checkWebhookStatus}
                disabled={webhookStatus === "checking"}
                className="h-8"
              >
                <RefreshCw className={`w-3 h-3 ${webhookStatus === "checking" ? "animate-spin" : ""}`} />
              </Button>
            </div>
            
            {lastChecked && (
              <p className="text-xs text-muted-foreground mt-2">
                Last checked: {lastChecked.toLocaleTimeString()}
              </p>
            )}
            
            {/* Diagnostic Panel Toggle */}
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDiagnostics(!showDiagnostics)}
                className="gap-2"
              >
                <Activity className="w-4 h-4" />
                {showDiagnostics ? "Hide" : "Show"} Webhook Diagnostics
              </Button>
            </div>
            
            {/* Diagnostic Panel */}
            {showDiagnostics && (
              <Card className="mt-6 max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Webhook Diagnostics
                      </CardTitle>
                      <CardDescription>
                        Test both webhook URLs and view detailed HTTP responses
                      </CardDescription>
                    </div>
                    <Button
                      onClick={runWebhookDiagnostics}
                      disabled={isRunningDiagnostics}
                      size="sm"
                    >
                      {isRunningDiagnostics ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        "Run Diagnostics"
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {diagnosticResults.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Click "Run Diagnostics" to test webhook endpoints</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {diagnosticResults.map((result, index) => (
                        <Card key={index} className={`border-2 ${
                          result.status === 200 
                            ? "border-green-200 bg-green-50/50" 
                            : result.error 
                            ? "border-red-200 bg-red-50/50"
                            : "border-yellow-200 bg-yellow-50/50"
                        }`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {result.status === 200 ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                  )}
                                  <h3 className="font-semibold text-sm truncate">{result.url.split(': ')[0]}</h3>
                                </div>
                                <p className="text-xs text-muted-foreground font-mono break-all">
                                  {result.url.split(': ')[1]}
                                </p>
                              </div>
                              <Badge 
                                variant={result.status === 200 ? "default" : "destructive"}
                                className="flex-shrink-0"
                              >
                                {result.status === 0 ? 'ERROR' : result.status}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground mb-1">Status</p>
                                <p className="font-medium">
                                  {result.status === 0 ? 'Network Error' : `${result.status} ${result.statusText}`}
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground mb-1">Tested At</p>
                                <p className="font-medium">{result.timestamp}</p>
                              </div>
                            </div>
                            
                            {result.error && (
                              <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                                <p className="text-xs font-semibold text-red-800 mb-1">Error Details</p>
                                <p className="text-xs text-red-700 font-mono">{result.error}</p>
                              </div>
                            )}
                            
                            {result.body && (
                              <div className="bg-muted/50 rounded-lg p-3">
                                <p className="text-xs font-semibold text-foreground mb-2">Response Body</p>
                                <ScrollArea className="h-32 w-full">
                                  <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                                    {result.body}
                                  </pre>
                                </ScrollArea>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <h4 className="font-semibold text-sm text-blue-900 mb-2">💡 Troubleshooting Tips</h4>
                        <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
                          <li><strong>404 Not Found:</strong> Webhook is not active in n8n. Activate your workflow and ensure it's in listening mode.</li>
                          <li><strong>200 OK:</strong> Webhook is active and responding correctly.</li>
                          <li><strong>Network Error:</strong> Cannot reach the n8n server. Check your n8n instance URL and network connection.</li>
                          <li><strong>Test vs Production:</strong> Test URL is for testing in n8n editor. Production URL is used when workflow is active.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
                            <div className="p-4 space-y-2">
                              <div className="flex items-start gap-2 mb-2">
                                <Video className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-sm font-medium text-muted-foreground">{item.imageName}</p>
                              </div>
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
