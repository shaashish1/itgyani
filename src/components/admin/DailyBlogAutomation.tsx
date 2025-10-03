import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Newspaper,
  Play,
  Loader2
} from 'lucide-react';

export const DailyBlogAutomation: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recentRuns, setRecentRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRecentRuns();
  }, []);

  const loadRecentRuns = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_blog_runs')
        .select('*')
        .order('run_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentRuns(data || []);
    } catch (error) {
      console.error('Error loading recent runs:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerManualGeneration = async (count: number = 3) => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Daily Blogs",
        description: `Fetching trending topics and generating ${count} AI-powered blog posts...`,
      });

      const { data, error } = await supabase.functions.invoke('generate-daily-news-blogs', {
        body: { count }
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Generated ${data.results?.successful || 0} blogs successfully`,
      });

      // Reload runs
      await loadRecentRuns();
      
      // Refresh the page after a short delay to show new blogs
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate daily blogs",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Automation Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Automated Daily Blog Generation
              </CardTitle>
              <CardDescription>
                Automatically generates 10 trending news blogs every day at 6:00 AM UTC
              </CardDescription>
            </div>
            <Badge variant="default" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Schedule Info */}
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>Automation Schedule</AlertTitle>
            <AlertDescription>
              The system automatically generates 10 news-based blog posts daily at <strong>6:00 AM UTC</strong> (2:00 AM EST).
              Topics are sourced from trending AI, automation, and technology news.
            </AlertDescription>
          </Alert>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Trending Topics</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                AI analyzes latest tech news to find trending topics
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Newspaper className="h-5 w-5 text-primary" />
                <h4 className="font-medium">10 Blogs Daily</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Generates comprehensive, SEO-optimized blog posts
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Auto-Publish</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Posts are automatically published and categorized
              </p>
            </div>
          </div>

          {/* Manual Trigger */}
          <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-primary/10">
            <div>
              <h4 className="font-medium mb-1">Test Generation (3 Blogs)</h4>
              <p className="text-sm text-muted-foreground">
                Generate 3 trending AI news blogs to test the system
              </p>
            </div>
            <Button 
              onClick={() => triggerManualGeneration(3)}
              disabled={isGenerating}
              className="btn-hero"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate 3 Blogs
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Generation Runs
          </CardTitle>
          <CardDescription>
            History of automated and manual blog generation runs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : recentRuns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No generation runs yet. Click "Generate Now" to create your first batch.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRuns.map((run) => (
                <div 
                  key={run.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {run.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : run.status === 'failed' ? (
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        {new Date(run.run_date).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {run.blogs_created || 0} created, {run.blogs_failed || 0} failed
                      </p>
                    </div>
                  </div>
                  <Badge variant={run.status === 'success' ? 'default' : 'destructive'}>
                    {run.status || 'pending'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <p className="font-medium">AI News Analysis</p>
              <p className="text-muted-foreground">
                System scans latest AI, automation, and tech news to identify trending topics
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Content Generation</p>
              <p className="text-muted-foreground">
                AI creates 10 comprehensive, SEO-optimized blog posts with proper categorization
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Auto-Publishing</p>
              <p className="text-muted-foreground">
                Posts are automatically published and made live on your blog
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
