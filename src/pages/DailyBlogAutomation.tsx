import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { aiProviderService } from '@/services/aiProviderService';
import { Calendar, Clock, Play, Pause, Settings, Zap, AlertTriangle, Brain, CheckCircle, XCircle } from 'lucide-react';

export const DailyBlogAutomation: React.FC = () => {
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [providers, setProviders] = useState(aiProviderService.getProviders());
  const [activeProvider, setActiveProviderState] = useState(aiProviderService.getActiveProvider());
  const [generationHistory, setGenerationHistory] = useState<Array<{
    id: string;
    timestamp: string;
    status: 'success' | 'failed';
    provider: string;
    error?: string;
    published: number;
    failed: number;
    content?: string;
  }>>([
    {
      id: '1',
      timestamp: '11/8/2025, 9:14:49 PM',
      status: 'failed',
      provider: 'OpenAI GPT-4',
      error: 'OpenAI API error: 429 - You exceeded your current quota, please check your plan and billing details',
      published: 0,
      failed: 1
    },
    {
      id: '2',
      timestamp: '11/8/2025, 5:43:12 PM', 
      status: 'failed',
      provider: 'OpenAI GPT-4',
      error: 'Generation process timed out or did not complete',
      published: 0,
      failed: 1
    },
    {
      id: '3',
      timestamp: '11/8/2025, 2:52:07 PM',
      status: 'failed', 
      provider: 'OpenAI GPT-4',
      error: 'Generation process timed out or did not complete',
      published: 0,
      failed: 1
    }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Update providers state when service changes
    const updateProviders = () => {
      setProviders(aiProviderService.getProviders());
      setActiveProviderState(aiProviderService.getActiveProvider());
    };

    // Initial update
    updateProviders();
    
    // Set up periodic updates
    const interval = setInterval(updateProviders, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle provider switching
  const handleProviderSwitch = async (providerName: string) => {
    try {
      const success = aiProviderService.setActiveProvider(providerName);
      
      if (success) {
        setActiveProviderState(aiProviderService.getActiveProvider());
        setProviders(aiProviderService.getProviders());
        
        toast({
          title: "Provider Switched",
          description: `Successfully switched to ${providerName}`,
        });
      } else {
        toast({
          title: "Switch Failed",
          description: `Cannot switch to ${providerName} - provider unavailable`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to switch provider: ${error}`,
        variant: "destructive"
      });
    }
  };

  // Handle blog generation
  const handleGenerateBlog = async () => {
    setIsGenerating(true);
    
    try {
      const response = await aiProviderService.generateContent({
        prompt: "Generate a comprehensive blog post about cryptocurrency market trends",
        maxTokens: 1500,
        temperature: 0.7
      });

      if (response.success) {
        // Add successful generation to history
        const newGeneration = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          status: 'success' as const,
          provider: response.provider,
          published: 1,
          failed: 0,
          content: response.content
        };
        
        setGenerationHistory(prev => [newGeneration, ...prev]);
        
        toast({
          title: "Blog Generated",
          description: `Successfully generated blog using ${response.provider}`,
        });
      } else {
        // Add failed generation to history
        const newGeneration = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleString(),
          status: 'failed' as const,
          provider: activeProvider?.displayName || 'Unknown',
          error: response.error || 'Unknown error',
          published: 0,
          failed: 1
        };
        
        setGenerationHistory(prev => [newGeneration, ...prev]);
        
        toast({
          title: "Generation Failed",
          description: response.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Generation failed: ${error}`,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">AI Blog Generation System</h2>
          <p className="text-muted-foreground">Automated blog creation with intelligent provider switching</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="automation-toggle">Auto Generation</Label>
            <Switch
              id="automation-toggle"
              checked={isAutomationEnabled}
              onCheckedChange={setIsAutomationEnabled}
            />
          </div>
          <Badge variant={activeProvider?.status === 'active' ? "default" : "destructive"}>
            {activeProvider?.displayName || 'No Provider'}
          </Badge>
        </div>
      </div>

      {/* Provider Status Alert */}
      {activeProvider?.status === 'quota_exceeded' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>API Quota Exceeded</AlertTitle>
          <AlertDescription>
            {activeProvider.displayName} has exceeded its quota. 
            {aiProviderService.getProviders().find(p => p.status === 'active') 
              ? ' System will automatically fallback to available providers.' 
              : ' Please configure another provider or update your API keys.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Provider Selection
          </CardTitle>
          <CardDescription>
            Choose your AI provider or enable automatic fallback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <Card 
                key={provider.name} 
                className={`cursor-pointer transition-all ${
                  activeProvider?.name === provider.name 
                    ? 'ring-2 ring-primary' 
                    : 'hover:shadow-md'
                } ${
                  provider.status === 'quota_exceeded' 
                    ? 'border-red-500 bg-red-50' 
                    : provider.status === 'active'
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300'
                }`}
                onClick={() => handleProviderSwitch(provider.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {provider.status === 'active' ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : provider.status === 'quota_exceeded' ? (
                      <XCircle className="h-6 w-6 text-red-500" />
                    ) : (
                      <Pause className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold">{provider.displayName}</h3>
                  <Badge 
                    variant={
                      provider.status === 'active' ? 'default' :
                      provider.status === 'quota_exceeded' ? 'destructive' : 'secondary'
                    }
                    className="mt-2"
                  >
                    {provider.status === 'quota_exceeded' ? 'Quota Exceeded' :
                     provider.status === 'active' ? 'Available' : 
                     provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                  </Badge>
                  {provider.lastError && (
                    <p className="text-xs text-red-600 mt-2 truncate">
                      {provider.lastError}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Active Provider</span>
                <Badge variant={activeProvider?.status === 'active' ? "default" : "destructive"}>
                  {activeProvider?.displayName || 'None'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Automation</span>
                <Badge variant={isAutomationEnabled ? "default" : "secondary"}>
                  {isAutomationEnabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Last Success</span>
                <span className="text-sm text-muted-foreground">
                  {generationHistory.find(h => h.status === 'success')?.timestamp || 'Never'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Failed Today</span>
                <Badge variant="destructive">
                  {generationHistory.filter(h => h.status === 'failed').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="post-frequency">Generation Frequency</Label>
                <Input id="post-frequency" defaultValue="Every 4 hours" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="preferred-time">Next Scheduled</Label>
                <Input id="preferred-time" defaultValue="Today, 11:30 PM" className="mt-1" readOnly />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-fallback" defaultChecked />
                <Label htmlFor="auto-fallback" className="text-sm">Auto fallback</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={handleGenerateBlog}
                disabled={isGenerating || !activeProvider || activeProvider.status !== 'active'}
              >
                {isGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Generate Now
                  </>
                )}
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => setIsAutomationEnabled(!isAutomationEnabled)}
              >
                {isAutomationEnabled ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Automation
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Automation
                  </>
                )}
              </Button>
              <Button className="w-full" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generation Runs */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Generation Runs
              </CardTitle>
              <CardDescription>
                History of automated and manual blog generation runs
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {generationHistory.map((run) => (
              <div key={run.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{run.timestamp}</span>
                      <Badge variant={run.status === 'success' ? 'default' : 'destructive'}>
                        {run.status === 'success' ? 'Success' : 'Failed'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Provider: {run.provider} • Published: {run.published} • Failed: {run.failed}
                    </div>
                    {run.error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-sm">
                          {run.error}
                        </AlertDescription>
                      </Alert>
                    )}
                    {run.content && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        <strong>Generated Content Preview:</strong>
                        <p className="mt-1 truncate">{run.content.substring(0, 150)}...</p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {run.status === 'failed' && (
                      <Button variant="outline" size="sm" onClick={handleGenerateBlog}>
                        Retry
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {generationHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No generation runs yet. Click "Generate Now" to start.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
          <CardDescription>
            Configure your blog automation preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topics">Target Topics</Label>
                <Input id="topics" placeholder="cryptocurrency, defi, nft..." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="tone">Content Tone</Label>
                <Input id="tone" placeholder="Professional, informative..." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="length">Post Length</Label>
                <Input id="length" placeholder="800-1200 words" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-publish">Auto Publish</Label>
                <Switch id="auto-publish" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="seo-optimize">SEO Optimization</Label>
                <Switch id="seo-optimize" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="social-share">Auto Social Share</Label>
                <Switch id="social-share" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Automation Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};