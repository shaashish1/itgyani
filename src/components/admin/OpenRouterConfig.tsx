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
  Zap,
  Settings
} from 'lucide-react';

interface ModelConfig {
  contentModel: string;
  maxTokens: number;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export const OpenRouterConfig: React.FC = () => {
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
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
    maxTokens: 3000,
    temperature: 0.7,
    topP: 1.0,
    frequencyPenalty: 0,
    presencePenalty: 0
  });

  // Load saved config from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('openrouter_model_config');
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
    localStorage.setItem('openrouter_model_config', JSON.stringify(config));
    toast({
      title: "Settings Saved",
      description: "OpenRouter model configuration saved successfully"
    });
  };

  const handleTestConnection = async () => {
    if (!openRouterApiKey.trim()) {
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
      // Test with a simple request to OpenRouter
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ITGyani Blog System'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 10
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTestResult({
          success: true,
          message: 'Connection successful!',
          model: data.model || 'OpenRouter'
        });
        toast({
          title: "Connection Successful",
          description: "OpenRouter API is working correctly"
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Connection failed');
      }
    } catch (error: any) {
      console.error('Error testing OpenRouter connection:', error);
      setTestResult({
        success: false,
        message: error.message || "Failed to test connection"
      });
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to test OpenRouter connection",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleUpdateKey = async () => {
    if (!openRouterApiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
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
      setTestResult(null);
    } catch (error: any) {
      console.error('Error updating OpenRouter key:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update OpenRouter API key",
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
          <Zap className="h-5 w-5 text-primary" />
          OpenRouter Configuration
        </CardTitle>
        <CardDescription>
          Access multiple AI models through OpenRouter's unified API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 border rounded-lg bg-muted/50 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openrouter-key" className="text-sm font-medium">
              OpenRouter API Key
            </Label>
            <p className="text-sm text-muted-foreground">
              Access Claude, GPT-4, Gemini and more. Get your API key from{' '}
              <a 
                href="https://openrouter.ai/keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenRouter Platform
              </a>
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="openrouter-key"
                  type={showKey ? "text" : "password"}
                  value={openRouterApiKey}
                  onChange={(e) => setOpenRouterApiKey(e.target.value)}
                  placeholder="Enter OpenRouter API key (sk-or-v1-...)..."
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
                disabled={isTesting || !openRouterApiKey.trim()}
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
                disabled={isUpdating || !openRouterApiKey.trim()}
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
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="or-content-model" className="text-xs">Content Generation Model</Label>
                <Select 
                  value={config.contentModel} 
                  onValueChange={(value) => setConfig({...config, contentModel: value})}
                >
                  <SelectTrigger id="or-content-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Let AI Decide)</SelectItem>
                    <SelectItem value="anthropic/claude-opus-4-1-20250805">Claude Opus 4.1 (Best Quality)</SelectItem>
                    <SelectItem value="anthropic/claude-sonnet-4-20250514">Claude Sonnet 4 (Balanced)</SelectItem>
                    <SelectItem value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet (Fast)</SelectItem>
                    <SelectItem value="anthropic/claude-3-7-sonnet-20250219">Claude 3.7 Sonnet (Thinking)</SelectItem>
                    <SelectItem value="openai/gpt-5-2025-08-07">GPT-5 (Best GPT)</SelectItem>
                    <SelectItem value="openai/gpt-4.1-2025-04-14">GPT-4.1 (Reliable)</SelectItem>
                    <SelectItem value="google/gemini-2.5-pro-latest">Gemini 2.5 Pro (Multimodal)</SelectItem>
                    <SelectItem value="google/gemini-2.5-flash">Gemini 2.5 Flash (Fast)</SelectItem>
                    <SelectItem value="meta-llama/llama-3.3-70b-instruct">Llama 3.3 70B (Open)</SelectItem>
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
                <Label htmlFor="or-max-tokens" className="text-xs">
                  Max Tokens: {config.maxTokens}
                </Label>
                <Slider
                  id="or-max-tokens"
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
                <Label htmlFor="or-temperature" className="text-xs">
                  Temperature: {config.temperature.toFixed(1)}
                </Label>
                <Slider
                  id="or-temperature"
                  min={0}
                  max={2}
                  step={0.1}
                  value={[config.temperature]}
                  onValueChange={([value]) => setConfig({...config, temperature: value})}
                />
                <p className="text-xs text-muted-foreground">0 = Focused, 2 = Creative</p>
              </div>

              {/* Top P */}
              <div className="space-y-2">
                <Label htmlFor="or-top-p" className="text-xs">
                  Top P: {config.topP.toFixed(2)}
                </Label>
                <Slider
                  id="or-top-p"
                  min={0}
                  max={1}
                  step={0.05}
                  value={[config.topP]}
                  onValueChange={([value]) => setConfig({...config, topP: value})}
                />
                <p className="text-xs text-muted-foreground">Nucleus sampling threshold</p>
              </div>

              {/* Frequency Penalty */}
              <div className="space-y-2">
                <Label htmlFor="or-freq-penalty" className="text-xs">
                  Frequency Penalty: {config.frequencyPenalty.toFixed(1)}
                </Label>
                <Slider
                  id="or-freq-penalty"
                  min={-2}
                  max={2}
                  step={0.1}
                  value={[config.frequencyPenalty]}
                  onValueChange={([value]) => setConfig({...config, frequencyPenalty: value})}
                />
                <p className="text-xs text-muted-foreground">Reduce repetition (-2 to 2)</p>
              </div>

              {/* Presence Penalty */}
              <div className="space-y-2">
                <Label htmlFor="or-pres-penalty" className="text-xs">
                  Presence Penalty: {config.presencePenalty.toFixed(1)}
                </Label>
                <Slider
                  id="or-pres-penalty"
                  min={-2}
                  max={2}
                  step={0.1}
                  value={[config.presencePenalty]}
                  onValueChange={([value]) => setConfig({...config, presencePenalty: value})}
                />
                <p className="text-xs text-muted-foreground">Encourage new topics (-2 to 2)</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t space-y-2">
            <h5 className="font-medium text-sm">Available Models</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                Claude 4 Family
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                GPT-5 & GPT-4
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                Gemini 2.5 Pro/Flash
              </Badge>
              <Badge variant="secondary" className="justify-start">
                <CheckCircle className="h-3 w-3 mr-1" />
                Llama 3.3 (Open Source)
              </Badge>
            </div>
          </div>
        </div>

        <Alert>
          <Key className="h-4 w-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            API keys are stored securely as encrypted secrets. OpenRouter provides access to multiple AI providers through a single unified API.
          </AlertDescription>
        </Alert>

        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Cost Estimate
          </h5>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• Variable pricing based on selected model</p>
            <p>• Claude models: ~$0.003-0.015 per 1K tokens</p>
            <p>• GPT models: ~$0.002-0.010 per 1K tokens</p>
            <p>• Competitive pricing with pay-as-you-go</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
