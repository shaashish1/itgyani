import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import {
  MessageCircle,
  Sparkles,
  Code,
  BarChart3,
  Loader2,
  Send,
  Bot,
  User,
  Trash2
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AIMode = "chat" | "creative" | "code" | "analyze";

const AIStudio = () => {
  const [activeMode, setActiveMode] = useState<AIMode>("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const AI_STUDIO_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-studio`;
      
      const response = await fetch(AI_STUDIO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          })),
          type: activeMode
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
          return;
        }
        if (response.status === 402) {
          toast.error("AI credits exhausted. Please contact support.");
          return;
        }
        throw new Error("Failed to get AI response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error("No response body");

      let assistantContent = "";
      let textBuffer = "";
      let streamDone = false;

      // Add initial assistant message
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = assistantContent;
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to get AI response. Please try again.");
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter((m, i) => i !== prev.length - 1 || m.content));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    toast.success("Conversation cleared");
  };

  const modeConfig = {
    chat: {
      icon: MessageCircle,
      title: "Chat Assistant",
      description: "General conversation and questions",
      color: "text-blue-500",
      examples: [
        "Explain quantum computing in simple terms",
        "What are the benefits of AI automation?",
        "How does machine learning work?"
      ]
    },
    creative: {
      icon: Sparkles,
      title: "Creative Writing",
      description: "Stories, poems, and creative content",
      color: "text-purple-500",
      examples: [
        "Write a short story about AI in the future",
        "Create a product description for a smart home device",
        "Generate marketing copy for our automation service"
      ]
    },
    code: {
      icon: Code,
      title: "Code Assistant",
      description: "Programming help and code examples",
      color: "text-green-500",
      examples: [
        "Write a Python function to sort a list",
        "Explain React hooks with examples",
        "How do I connect to a REST API in JavaScript?"
      ]
    },
    analyze: {
      icon: BarChart3,
      title: "Data Analysis",
      description: "Analysis and insights",
      color: "text-orange-500",
      examples: [
        "Analyze the pros and cons of cloud computing",
        "What metrics should I track for e-commerce?",
        "Compare different project management methodologies"
      ]
    }
  };

  const currentConfig = modeConfig[activeMode];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
                <Bot className="inline-block mr-2 h-4 w-4" />
                Powered by AI
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI <span className="gradient-text">Studio</span>
              </h1>
              <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
                Experience the power of advanced AI. Chat, create, code, and analyze with cutting-edge AI models.
              </p>
            </div>
          </div>
        </section>

        {/* Mode Selection */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <Tabs value={activeMode} onValueChange={(v) => setActiveMode(v as AIMode)} className="mb-8">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  {(Object.keys(modeConfig) as AIMode[]).map((mode) => {
                    const config = modeConfig[mode];
                    const Icon = config.icon;
                    return (
                      <TabsTrigger key={mode} value={mode} className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{config.title.split(" ")[0]}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {(Object.keys(modeConfig) as AIMode[]).map((mode) => {
                  const config = modeConfig[mode];
                  const Icon = config.icon;
                  return (
                    <TabsContent key={mode} value={mode}>
                      <Card className="glass-card mb-6">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-3">
                            <Icon className={`h-6 w-6 ${config.color}`} />
                            {config.title}
                          </CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground/70">Try these examples:</p>
                            <div className="flex flex-wrap gap-2">
                              {config.examples.map((example, i) => (
                                <Button
                                  key={i}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setInput(example)}
                                  className="text-xs"
                                >
                                  {example}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Chat Interface */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Conversation</CardTitle>
                  {messages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClear}
                      className="text-foreground/60 hover:text-foreground"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="p-6">
                  {/* Messages Area */}
                  <ScrollArea className="h-[500px] mb-6 pr-4" ref={scrollAreaRef}>
                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center text-foreground/60">
                        <Bot className="h-16 w-16 mb-4 opacity-50" />
                        <p className="text-lg font-medium">Start a conversation</p>
                        <p className="text-sm">Ask me anything or try one of the examples above</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {messages.map((message, i) => (
                          <div
                            key={i}
                            className={`flex gap-4 ${
                              message.role === "user" ? "justify-end" : "justify-start"
                            }`}
                          >
                            {message.role === "assistant" && (
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                  <Bot className="h-5 w-5 text-primary" />
                                </div>
                              </div>
                            )}
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "glass-card"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            {message.role === "user" && (
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                                  <User className="h-5 w-5 text-secondary" />
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder={`Ask ${currentConfig.title.toLowerCase()}...`}
                      className="min-h-[60px] max-h-[200px] resize-none"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="btn-hero self-end"
                      size="lg"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-foreground/60 mt-4 text-center">
                    Powered by Google Gemini 2.5 Flash • Press Enter to send, Shift+Enter for new line
                  </p>
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
