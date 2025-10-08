import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Key, 
  Save, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Sparkles,
  Settings
} from 'lucide-react';

interface ModelConfig {
  contentModel: string;
  imageModel: string;
  maxTokens: number;
  imageSize: string;
  imageQuality: string;
  temperature: number;
}

export const OpenAIConfig: React.FC = () => {
  const [openAIApiKey, setOpenAIApiKey] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    model?: string;
  } | null>(null);
  const { toast } = useToast();
  
  // Model configuration
  const [config, setConfig] = useState<ModelConfig>({
    contentModel: 'auto',
    imageModel: 'gpt-image-1',
    maxTokens: 3000,
    imageSize: '1792x1024',
    imageQuality: 'high',
    temperature: 0.7
  });

  // Load saved config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('openai_model_config');
    if (saved) {
      try {
        setConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved config:', e);
      }
    }
  }, []);

  // Save config to localStorage
  const saveConfig = () => {
    localStorage.setItem('openai_model_config', JSON.stringify(config));
    toast({
      title: "Settings Saved",
      description: "Model configuration saved successfully"
    });
  };

  const handleTestConnection = async () => {
    if (!openAIApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key first",
        variant: "destructive"
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('test-openai-connection', {
        body: { apiKey: openAIApiKey }
      });

      if (error) throw error;

      setTestResult({
        success: data.success,
        message: data.message,
        model: data.model
      });

      if (data.success) {
        toast({
          title: "Connection Successful",
          description: "OpenAI API is working correctly"
        });
      } else {
        toast({
          title: "Connection Failed",
          description: data.message,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error testing OpenAI connection:', error);
      setTestResult({
        success: false,
        message: error.message || "Failed to test connection"
      });
      toast({
        title: "Error",
        description: error.message || "Failed to test OpenAI connection",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleUpdateKey = async () => {
    if (!openAIApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { data, error } = await supabase.functions.invoke('update-openai-key', {
        body: { apiKey: openAIApiKey }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "OpenAI API key updated successfully"
      });
      setOpenAIApiKey('');
      setTestResult(null);
    } catch (error: any) {
      console.error('Error updating OpenAI key:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update OpenAI API key",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          OpenAI Configuration
        </CardTitle>
        <CardDescription>
          Configure OpenAI for advanced blog content and image generation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 border rounded-lg bg-muted/50 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai-key" className="text-sm font-medium">
              OpenAI API Key
            </Label>
            <p className="text-sm text-muted-foreground">
              Primary AI provider for blog generation. Get your API key from{' '}
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenAI Platform
              </a>
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="openai-key"
                  type={showKey ? "text" : "password"}
                  value={openAIApiKey}
                  onChange={(e) => setOpenAIApiKey(e.target.value)}
                  placeholder="Enter OpenAI API key (sk-proj-...)..."
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleTestConnection}
                disabled={isTesting || !openAIApiKey.trim()}
                variant="outline"
              >
                {isTesting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                {isTesting ? 'Testing...' : 'Test'}
              </Button>
              <Button
                onClick={handleUpdateKey}
                disabled={isUpdating || !openAIApiKey.trim()}
                className="btn-hero"
              >
                <Save className="h-4 w-4 mr-2" />
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>

          {/* Test Result */}
          {testResult && (
            <Alert variant={testResult.success ? "default" : "destructive"}>
              {testResult.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertTriangle className="h-4 w-4" />
              )}
              <AlertTitle>
                {testResult.success ? 'Connection Successful' : 'Connection Failed'}
              </AlertTitle>
              <AlertDescription className="space-y-1">
                <p>{testResult.message}</p>
                {testResult.model && (
                  <p className="font-medium">Model: {testResult.model}</p>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Model Configuration */}
          <div className="pt-4 border-t space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-sm flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Model Configuration
              </h5>
              <Button onClick={saveConfig} size="sm" variant="outline">
                <Save className="h-3 w-3 mr-1" />
                Save Settings
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Content Model Selection */}
              <div className="space-y-2">
                <Label htmlFor="content-model" className="text-xs">Content Generation Model</Label>
                <Select 
                  value={config.contentModel} 
                  onValueChange={(value) => setConfig({...config, contentModel: value})}
                >
                  <SelectTrigger id="content-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Let AI Decide)</SelectItem>
                    <SelectItem value="gpt-5-2025-08-07">GPT-5 (Best Quality)</SelectItem>
                    <SelectItem value="gpt-5-mini-2025-08-07">GPT-5 Mini (Balanced)</SelectItem>
                    <SelectItem value="gpt-5-nano-2025-08-07">GPT-5 Nano (Fast)</SelectItem>
                    <SelectItem value="gpt-4.1-2025-04-14">GPT-4.1 (Reliable)</SelectItem>
                    <SelectItem value="o3-2025-04-16">O3 (Reasoning)</SelectItem>
                    <SelectItem value="o4-mini-2025-04-16">O4 Mini (Fast Reasoning)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {config.contentModel === 'auto' 
                    ? 'AI selects optimal model based on task complexity' 
                    : 'Fixed model for all blog generation'}
                </p>
              </div>

              {/* Max Tokens */}
              <div className="space-y-2">
                <Label htmlFor="max-tokens" className="text-xs">
                  Max Tokens: {config.maxTokens}
                </Label>
                <Slider
                  id="max-tokens"
                  min={1000}
                  max={8000}
                  step={500}
                  value={[config.maxTokens]}
                  onValueChange={([value]) => setConfig({...config, maxTokens: value})}
                />
                <p className="text-xs text-muted-foreground">Content length (1000-8000)</p>
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <Label htmlFor="temperature" className="text-xs">
                  Creativity: {config.temperature.toFixed(1)}
                </Label>
                <Slider
                  id="temperature"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[config.temperature]}
                  onValueChange={([value]) => setConfig({...config, temperature: value})}
                />
                <p className="text-xs text-muted-foreground">0 = Focused, 2 = Creative</p>
              </div>

              {/* Image Model */}
              <div className="space-y-2">
                <Label htmlFor="image-model" className="text-xs">Image Generation Model</Label>
                <Select 
                  value={config.imageModel} 
                  onValueChange={(value) => setConfig({...config, imageModel: value})}
                >
                  <SelectTrigger id="image-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-image-1">GPT Image 1 (High Quality)</SelectItem>
                    <SelectItem value="dall-e-3">DALL-E 3 (Reliable)</SelectItem>
                    <SelectItem value="dall-e-2">DALL-E 2 (Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Size */}
              <div className="space-y-2">
                <Label htmlFor="image-size" className="text-xs">Image Size</Label>
                <Select 
                  value={config.imageSize} 
                  onValueChange={(value) => setConfig({...config, imageSize: value})}
                >
                  <SelectTrigger id="image-size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1792x1024">1792x1024 (Landscape)</SelectItem>
                    <SelectItem value="1024x1792">1024x1792 (Portrait)</SelectItem>
                    <SelectItem value="1024x1024">1024x1024 (Square)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Quality */}
              <div className="space-y-2">
                <Label htmlFor="image-quality" className="text-xs">Image Quality</Label>
                <Select 
                  value={config.imageQuality} 
                  onValueChange={(value) => setConfig({...config, imageQuality: value})}
                >
                  <SelectTrigger id="image-quality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High (Premium)</SelectItem>
                    <SelectItem value="medium">Medium (Balanced)</SelectItem>
                    <SelectItem value="low">Low (Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <h5 className="font-medium text-sm">Features</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                GPT-5 Content Generation
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                High-Quality Images
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                Category-Specific Styles
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                Structured JSON Output
              </Badge>
            </div>
          </div>
        </div>

        <Alert>
          <Key className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            API keys are stored securely as encrypted secrets. The system uses OpenAI for both content and image generation with automatic retry and fallback logic.
          </AlertDescription>
        </Alert>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Cost Estimate
          </h5>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• ~$0.14-0.28 per blog post (content + image)</p>
            <p>• 10 blogs/day: ~$42-84/month</p>
            <p>• Higher quality than free alternatives</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
