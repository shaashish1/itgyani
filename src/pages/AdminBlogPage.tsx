/**
 * Admin Blog Management Page
 * 
 * Administrative interface for managing AI-generated blogs
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Zap,
  LayoutDashboard,
  FileText,
  PenTool,
  Layers,
  LogOut,
  Menu,
  X
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
  const [activeTab, setActiveTab] = useState('daily-automation');
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const navItems = [
    { id: 'daily-automation', label: 'Daily Automation', icon: Zap, description: 'Automated blog generation' },
    { id: 'all-blogs', label: 'All Blogs', icon: FileText, description: 'View all blog posts' },
    { id: 'blog-manager', label: 'Manual Editor', icon: PenTool, description: 'Create & edit posts' },
    { id: 'batch-generator', label: 'Batch Generator', icon: Layers, description: 'Generate multiple blogs' },
    { id: 'system-settings', label: 'AI Settings', icon: Settings, description: 'Configure AI providers' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`${
            sidebarOpen ? 'w-72' : 'w-20'
          } bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out`}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center gap-3 animate-fade-in">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg gradient-text">AI Admin</h2>
                    <p className="text-xs text-muted-foreground">Blog Manager</p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hover:bg-primary/10"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* AI Provider Status */}
          {sidebarOpen && (
            <div className="px-4 py-3 bg-gradient-to-br from-primary/5 to-purple-500/5 m-4 rounded-xl border border-primary/10 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground">Active Provider</span>
              </div>
              <Select value={selectedAIProvider} onValueChange={handleProviderChange}>
                <SelectTrigger className="w-full h-9 text-sm bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="openai">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-blue-500" />
                      <span className="text-sm">OpenAI GPT-5</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="openrouter">
                    <div className="flex items-center gap-2">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span className="text-sm">OpenRouter</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="gemini">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-orange-500" />
                      <span className="text-sm">Gemini</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/20'
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'group-hover:text-primary'}`} />
                  {sidebarOpen && (
                    <div className="flex-1 text-left animate-fade-in">
                      <p className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                        {item.label}
                      </p>
                      {!isActive && (
                        <p className="text-xs text-muted-foreground group-hover:text-foreground/70">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border/50">
            <div className={`flex items-center gap-3 ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
              {sidebarOpen && (
                <div className="flex items-center gap-3 animate-fade-in">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Admin</p>
                    <p className="text-xs text-muted-foreground">Authenticated</p>
                  </div>
                </div>
              )}
              <Button
                variant="ghost"
                size={sidebarOpen ? "sm" : "icon"}
                onClick={handleSignOut}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">Sign Out</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header Bar */}
          <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-border/50 sticky top-0 z-10">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold gradient-text mb-1">
                    {navItems.find(item => item.id === activeTab)?.label}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    {navItems.find(item => item.id === activeTab)?.description}
                  </p>
                </div>
                <Badge variant="default" className="flex items-center gap-2 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  System Active
                </Badge>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'daily-automation' && <DailyBlogAutomation />}
              {activeTab === 'all-blogs' && <BlogPostManager />}
              {activeTab === 'blog-manager' && <BlogManager className="space-y-6" />}
              {activeTab === 'batch-generator' && (
                <div className="space-y-6">
                  <TopicProcessor />
                  <BatchBlogGenerator />
                </div>
              )}
              {activeTab === 'system-settings' && (
                <div className="space-y-6">
                  {/* Active Provider Configuration */}
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBlogPage;