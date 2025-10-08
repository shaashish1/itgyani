/**
 * Admin Blog Management Page
 * 
 * Administrative interface for managing AI-generated blogs
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Shield, 
  Settings, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Key,
  Save,
  Sparkles,
  Zap
} from 'lucide-react';

import BlogManager from '@/components/BlogManager';
import AIBlogGenerator from '@/components/admin/AIBlogGenerator';
import { BatchBlogGenerator } from '@/components/admin/BatchBlogGenerator';
import { TopicProcessor } from '@/components/admin/TopicProcessor';
import { DailyBlogAutomation } from '@/components/admin/DailyBlogAutomation';
import { BlogPostManager } from '@/components/admin/BlogPostManager';
import { OpenAIConfig } from '@/components/admin/OpenAIConfig';
import { OpenRouterConfig } from '@/components/admin/OpenRouterConfig';

const AdminBlogPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing session
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
  const [isUpdatingGemini, setIsUpdatingGemini] = useState(false);
  const [isUpdatingOpenRouter, setIsUpdatingOpenRouter] = useState(false);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [selectedAIProvider, setSelectedAIProvider] = useState<string>(() => {
    return localStorage.getItem('selected_ai_provider') || 'openai';
  });
  const { toast } = useToast();

  // Simple admin authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'itgyani2025admin';

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid admin password');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const handleUpdateGeminiKey = async () => {
    if (!geminiApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingGemini(true);
    try {
      const { data, error } = await supabase.functions.invoke('update-gemini-key', {
        body: { apiKey: geminiApiKey }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gemini API key updated successfully"
      });
      setGeminiApiKey('');
    } catch (error) {
      console.error('Error updating Gemini key:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update Gemini API key",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingGemini(false);
    }
  };

  const handleUpdateOpenRouterKey = async () => {
    if (!openRouterApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingOpenRouter(true);
    try {
      const { data, error } = await supabase.functions.invoke('update-openrouter-key', {
        body: { apiKey: openRouterApiKey }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "OpenRouter API key updated successfully"
      });
      setOpenRouterApiKey('');
    } catch (error) {
      console.error('Error updating OpenRouter key:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update OpenRouter API key",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingOpenRouter(false);
    }
  };

  const handleProviderChange = (provider: string) => {
    setSelectedAIProvider(provider);
    localStorage.setItem('selected_ai_provider', provider);
    toast({
      title: "AI Provider Updated",
      description: `Now using ${provider === 'openai' ? 'OpenAI' : provider === 'openrouter' ? 'OpenRouter' : 'Gemini'} for blog generation`
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Enter admin credentials to access the AI Blog Management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter admin password..."
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button onClick={handleAdminLogin} className="w-full btn-hero">
                <Shield className="mr-2 h-4 w-4" />
                Access Admin Panel
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>This is a protected area for authorized personnel only.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                AI Blog Management
              </h1>
              <p className="text-muted-foreground">
                Administrative interface for managing AI-generated content
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="default" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Admin Authenticated
              </Badge>
              
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <EyeOff className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Features Notice */}
        <Alert className="mb-6">
          <Brain className="h-4 w-4" />
          <AlertTitle>AI Blog Management System Active</AlertTitle>
          <AlertDescription>
            You have access to advanced AI content generation, scheduling, and management features. 
            All actions are logged and monitored for security.
          </AlertDescription>
        </Alert>

        {/* AI Provider Selection Banner */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold text-lg">Active AI Provider</h3>
                  <p className="text-sm text-muted-foreground">
                    Select which AI service to use for blog generation
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Select value={selectedAIProvider} onValueChange={handleProviderChange}>
                  <SelectTrigger className="w-[200px] bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background z-50">
                    <SelectItem value="openai">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        OpenAI (GPT-5)
                      </div>
                    </SelectItem>
                    <SelectItem value="openrouter">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-500" />
                        OpenRouter
                      </div>
                    </SelectItem>
                    <SelectItem value="gemini">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-orange-500" />
                        Gemini (Legacy)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Badge 
                  variant={selectedAIProvider === 'openai' ? 'default' : 'secondary'}
                  className="flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  {selectedAIProvider === 'openai' ? 'Premium' : selectedAIProvider === 'openrouter' ? 'Advanced' : 'Legacy'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="daily-automation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 h-auto gap-2 bg-muted/50 p-2">
            <TabsTrigger value="daily-automation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="h-4 w-4 mr-2" />
              Daily Automation
            </TabsTrigger>
            <TabsTrigger value="all-blogs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="h-4 w-4 mr-2" />
              All Blogs
            </TabsTrigger>
            <TabsTrigger value="blog-manager" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Settings className="h-4 w-4 mr-2" />
              Manual Editor
            </TabsTrigger>
            <TabsTrigger value="batch-generator" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="h-4 w-4 mr-2" />
              Batch Generator
            </TabsTrigger>
            <TabsTrigger value="system-settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Key className="h-4 w-4 mr-2" />
              AI Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily-automation">
            <DailyBlogAutomation />
          </TabsContent>

          <TabsContent value="all-blogs">
            <BlogPostManager />
          </TabsContent>

          <TabsContent value="blog-manager">
            <BlogManager className="space-y-6" />
          </TabsContent>

          <TabsContent value="batch-generator" className="space-y-6">
            <TopicProcessor />
            <BatchBlogGenerator />
          </TabsContent>

          <TabsContent value="system-settings" className="space-y-6">
            {/* Active Provider Configuration */}
            <div className="space-y-6">
              <Alert className="border-primary/20 bg-primary/5">
                <Sparkles className="h-4 w-4 text-primary" />
                <AlertTitle>Active AI Provider: {selectedAIProvider === 'openai' ? 'OpenAI' : selectedAIProvider === 'openrouter' ? 'OpenRouter' : 'Gemini'}</AlertTitle>
                <AlertDescription>
                  Configure settings for {selectedAIProvider === 'openai' ? 'OpenAI GPT-5' : selectedAIProvider === 'openrouter' ? 'OpenRouter' : 'Google Gemini'}. 
                  Switch providers using the dropdown above to configure different AI services.
                </AlertDescription>
              </Alert>

              {/* OpenAI Configuration */}
              {selectedAIProvider === 'openai' && <OpenAIConfig />}

              {/* OpenRouter Configuration */}
              {selectedAIProvider === 'openrouter' && <OpenRouterConfig />}

              {/* Legacy Gemini Configuration */}
              {selectedAIProvider === 'gemini' && (
                <Card className="border-orange-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      Google Gemini (Legacy Provider)
                    </CardTitle>
                    <CardDescription>
                      Legacy Gemini configuration - Consider upgrading to OpenAI or OpenRouter for better quality and features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* API Key Management */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Key className="h-5 w-5 text-orange-500" />
                        <h4 className="font-medium text-lg">Gemini API Key</h4>
                      </div>

                      <div className="p-6 border rounded-lg bg-muted/50 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="gemini-key" className="text-sm font-medium">
                            Google Gemini API Key
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Legacy AI provider. Get your API key from{' '}
                            <a 
                              href="https://aistudio.google.com/apikey" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Google AI Studio
                            </a>
                          </p>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                id="gemini-key"
                                type={showGeminiKey ? "text" : "password"}
                                value={geminiApiKey}
                                onChange={(e) => setGeminiApiKey(e.target.value)}
                                placeholder="Enter Gemini API key (starts with AI...)..."
                                className="pr-10"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowGeminiKey(!showGeminiKey)}
                              >
                                {showGeminiKey ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <Button
                              onClick={handleUpdateGeminiKey}
                              disabled={isUpdatingGemini || !geminiApiKey.trim()}
                              className="btn-hero"
                            >
                              <Save className="h-4 w-4 mr-2" />
                              {isUpdatingGemini ? 'Updating...' : 'Update'}
                            </Button>
                          </div>
                        </div>

                        <div className="pt-4 border-t space-y-2">
                          <h5 className="font-medium text-sm">Model Information</h5>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>• Current Model: <span className="font-medium">gemini-1.5-flash-latest</span></p>
                            <p>• Free tier: 15 requests/minute</p>
                            <p>• Best for: Fast, cost-effective generation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Security Notice</AlertTitle>
                      <AlertDescription>
                        API keys are stored securely as encrypted secrets. Gemini is a legacy provider - consider upgrading to OpenAI or OpenRouter.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlogPage;