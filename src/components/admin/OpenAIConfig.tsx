import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  Sparkles
} from 'lucide-react';

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

          <div className="pt-4 border-t space-y-2">
            <h5 className="font-medium text-sm">Model Information</h5>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Content Model: <span className="font-medium text-foreground">gpt-5-mini-2025-08-07</span></p>
              <p>• Image Model: <span className="font-medium text-foreground">gpt-image-1</span></p>
              <p>• Image Size: 1792x1024 (landscape)</p>
              <p>• Quality: High-resolution, professional images</p>
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
