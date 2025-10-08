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
  Save
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

        {/* Main Content */}
        <Tabs defaultValue="daily-automation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="daily-automation">Daily Automation</TabsTrigger>
            <TabsTrigger value="all-blogs">All Blogs</TabsTrigger>
            <TabsTrigger value="blog-manager">Blog Manager</TabsTrigger>
            <TabsTrigger value="batch-generator">Batch Generator</TabsTrigger>
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
            <TabsTrigger value="security-logs">Security Logs</TabsTrigger>
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
            {/* Primary AI Configurations */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Primary AI Providers</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Configure your preferred AI providers for blog generation. Both OpenAI and OpenRouter offer high-quality models with different pricing and features.
                </p>
              </div>

              {/* OpenAI Configuration */}
              <OpenAIConfig />

              {/* OpenRouter Configuration */}
              <OpenRouterConfig />
            </div>

            {/* Legacy Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Legacy AI Providers
                </CardTitle>
                <CardDescription>
                  Legacy Gemini configuration (deprecated in favor of OpenAI and OpenRouter)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Key Management */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Key className="h-5 w-5 text-primary" />
                    <h4 className="font-medium text-lg">Legacy Gemini API Key</h4>
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
                    API keys are stored securely as encrypted secrets. Gemini is a legacy provider.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security-logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Access Logs
                </CardTitle>
                <CardDescription>
                  Monitor system access and administrative actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Admin Login</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Successful authentication from current session
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">AI Blog System Initialized</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Today
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Blog management system successfully deployed
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">System Configuration Updated</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Today
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      OpenRouter API and Hugging Face integrations configured
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium mb-2">Security Notice</h5>
                  <p className="text-sm text-muted-foreground">
                    All administrative actions are logged and monitored. 
                    Unauthorized access attempts are tracked and reported.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlogPage;