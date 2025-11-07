import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GenerationStepsViewer } from './GenerationStepsViewer';
import { QueueProgressViewer } from './QueueProgressViewer';
import { 
  Clock, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  Newspaper,
  Play,
  Loader2,
  Flame,
  Pin
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

export const DailyBlogAutomation: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUpdatingImages, setIsUpdatingImages] = useState(false);
  const [recentRuns, setRecentRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [monitoredRunId, setMonitoredRunId] = useState<string | null>(null);
  const [previousStatus, setPreviousStatus] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [firstBlogTimeout, setFirstBlogTimeout] = useState<NodeJS.Timeout | null>(null);
  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);
  const [blogCount, setBlogCount] = useState<number>(10);
  const [selectedPriority, setSelectedPriority] = useState<'1' | '2' | '3'>('2');
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRecentRuns();

    // Subscribe to realtime changes on daily_blog_runs table
    const channel = supabase
      .channel('daily-blog-runs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'daily_blog_runs'
        },
        (payload) => {
          console.log('🔄 Realtime update received:', payload);
          loadRecentRuns(); // Reload when any change happens
        }
      )
      .subscribe();

    let interval: NodeJS.Timeout | undefined;
    const hasPending = recentRuns.some((r) => r.status === 'pending');
    const hasRunning = recentRuns.some((r) => r.status === 'running');

    // Refresh every 10 seconds as backup (realtime will handle most updates)
    if (isGenerating || hasPending || hasRunning) {
      interval = setInterval(() => {
        loadRecentRuns();
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (firstBlogTimeout) clearTimeout(firstBlogTimeout);
      supabase.removeChannel(channel);
    };
  }, [isGenerating, recentRuns]);

  const checkGenerationHealth = async (runId: string) => {
    console.log('🔍 Checking generation health for stuck run:', runId);
    
    try {
      // Check the current run status directly
      const { data: runData } = await supabase
        .from('daily_blog_runs')
        .select('*')
        .eq('id', runId)
        .single();

      if (!runData) return;

      const elapsedMinutes = Math.floor((Date.now() - new Date(runData.created_at).getTime()) / 60000);
      const blogsCreated = runData.blogs_created || 0;

      console.log(`📊 Health check: ${elapsedMinutes}min elapsed, ${blogsCreated} blogs created`);

      // Decision logic based on elapsed time and progress
      if (blogsCreated === 0 && elapsedMinutes >= 7) {
        // No blogs after 7 minutes - likely failed
        console.log('❌ No progress after 7 minutes, marking as failed');
        await supabase
          .from('daily_blog_runs')
          .update({
            status: 'failed',
            error_message: 'First blog generation exceeded timeout (7 minutes) with no progress'
          })
          .eq('id', runId);

        toast({
          title: "❌ Generation Failed",
          description: "The first blog took too long to generate. Please check your API configuration and try again.",
          variant: "destructive"
        });

        setMonitoredRunId(null);
        setIsGenerating(false);
        if (firstBlogTimeout) clearTimeout(firstBlogTimeout);
      } else if (blogsCreated > 0) {
        // Progress detected - continue
        console.log(`✅ Progress detected (${blogsCreated} blogs), continuing...`);
        toast({
          title: "✅ Generation Proceeding",
          description: `First blog completed! ${blogsCreated} blog(s) generated so far.`,
        });
        
        // Clear the timeout since we have progress
        if (firstBlogTimeout) {
          clearTimeout(firstBlogTimeout);
          setFirstBlogTimeout(null);
        }
      } else if (elapsedMinutes >= 5 && elapsedMinutes < 7) {
        // Between 5-7 minutes, warn but continue
        console.log('⚠️ Slow progress, but continuing...');
        toast({
          title: "⚠️ Slow Progress",
          description: "First blog is taking longer than expected. Continuing to monitor...",
        });
        
        // Set another timeout for 2 more minutes
        if (firstBlogTimeout) clearTimeout(firstBlogTimeout);
        const newTimeout = setTimeout(() => {
          checkGenerationHealth(runId);
        }, 2 * 60 * 1000); // Check again in 2 minutes
        setFirstBlogTimeout(newTimeout);
      } else {
        // Still within acceptable range - let it continue
        console.log('✅ Generation still active within acceptable time range');
        toast({
          title: "🔄 Still Processing",
          description: "First blog is being generated. This can take a few minutes...",
        });
      }

    } catch (error) {
      console.error('Error checking generation health:', error);
      toast({
        title: "Error",
        description: "Failed to check generation status",
        variant: "destructive"
      });
    }
  };

  const loadRecentRuns = async () => {
    try {
      // Server-side cleanup to avoid client-side RLS/permission quirks
      try {
        await supabase.functions.invoke('fix-stuck-daily-blog-runs', { body: {} });
      } catch (e) {
        console.warn('Cleanup function failed', e);
      }

      const { data, error } = await supabase
        .from('daily_blog_runs')
        .select('*')
        .order('run_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const runs = data || [];
      setRecentRuns(runs);
      setLastRefresh(new Date());

      // Monitor running job for completion
      if (monitoredRunId && runs.length > 0) {
        const monitoredRun = runs.find(r => r.id === monitoredRunId);
        if (monitoredRun && monitoredRun.status !== 'running' && previousStatus === 'running') {
          // Run has completed - determine actual status
          const actualStatus = (monitoredRun.status === 'completed' && monitoredRun.blogs_created === 0 && monitoredRun.blogs_failed === 0)
            ? 'failed'
            : monitoredRun.status;
          
          // Show completion notification
          if (actualStatus === 'completed') {
            toast({
              title: "✅ Generation Complete",
              description: `Successfully generated ${monitoredRun.blogs_created} blog post(s)`,
            });
          } else if (actualStatus === 'partial') {
            toast({
              title: "⚠️ Generation Partially Complete",
              description: `Generated ${monitoredRun.blogs_created} blog(s), ${monitoredRun.blogs_failed} failed`,
              variant: "destructive",
            });
          } else {
            toast({
              title: "❌ Generation Failed",
              description: monitoredRun.error_message || "The generation process did not complete successfully",
              variant: "destructive",
            });
          }
          
          // Clear monitoring state and timeout
          setMonitoredRunId(null);
          setPreviousStatus(null);
          setIsGenerating(false);
          if (firstBlogTimeout) {
            clearTimeout(firstBlogTimeout);
            setFirstBlogTimeout(null);
          }
        } else if (monitoredRun) {
          // Update previous status for next check
          setPreviousStatus(monitoredRun.status);
        }
      }
      
      // Check if there's a new running job to monitor
      if (!monitoredRunId) {
        const runningJob = runs.find(r => r.status === 'running');
        if (runningJob) {
          setMonitoredRunId(runningJob.id);
          setPreviousStatus('running');
          setIsGenerating(true);
          
          // Set timeout to check if first blog is stuck (5 minutes)
          const timeout = setTimeout(() => {
            console.log('⏰ First blog timeout reached, checking status...');
            if (runningJob.blogs_created === 0) {
              checkGenerationHealth(runningJob.id);
            }
          }, 5 * 60 * 1000); // 5 minutes
          
          setFirstBlogTimeout(timeout);
        }
      }
    } catch (error) {
      console.error('Error loading recent runs:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerManualGeneration = async () => {
    setIsGenerating(true);
    
    try {
      toast({
        title: "Generating Daily Blogs",
        description: `Creating ${blogCount} blog topics with ${selectedPriority === '1' ? 'HIGH' : selectedPriority === '3' ? 'LOW' : 'NORMAL'} priority and starting queue processor...`,
      });

      const { data, error } = await supabase.functions.invoke('generate-daily-news-blogs', {
        body: { 
          count: blogCount,
          topicsOnly: true,
          priority: parseInt(selectedPriority)
        }
      });

      if (error) throw error;

      const runId = data?.runId;

      // Start queue runner immediately
      if (runId) {
        setActiveRunId(runId);
        
        const { error: runnerError } = await supabase.functions.invoke('queue-runner', {
          body: { runId }
        });

        if (runnerError) {
          console.error('Runner start error:', runnerError);
          toast({
            title: "⚠️ Runner Warning",
            description: "Queue created but auto-processor may not have started. Use 'Process Queue Now' button.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "✅ Queue Processing Started",
            description: "Topics queued and processing in background. Watch progress below.",
          });
        }

        // Monitor this run
        setMonitoredRunId(runId);
      }

      await loadRecentRuns();

    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start blog generation",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const processQueueNow = async () => {
    try {
      toast({
        title: "Starting Queue Processor",
        description: "Processing all pending items in the background...",
      });

      const { error } = await supabase.functions.invoke('queue-runner', {
        body: {}
      });

      if (error) throw error;

      toast({
        title: "✅ Processor Started",
        description: "Queue is being processed. Check Recent Runs for progress.",
      });

      loadRecentRuns();
    } catch (error: any) {
      console.error('Queue processor error:', error);
      toast({
        title: "Processor Failed",
        description: error.message || "Failed to start queue processor",
        variant: "destructive"
      });
    }
  };

  const handleUpdateImages = async (retryCount = 0) => {
    const MAX_RETRIES = 2;
    setIsUpdatingImages(true);
    
    try {
      toast({
        title: "Updating Blog Images",
        description: "Generating AI images for all blogs without images...",
      });

      const { data, error } = await supabase.functions.invoke('update-blog-images', {
        body: {},
      });

      if (error) {
        // Check if it's a network error and retry
        if (error.message.includes('Failed to send a request') && retryCount < MAX_RETRIES) {
          console.log(`Retrying image update (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
          setIsUpdatingImages(false);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
          return handleUpdateImages(retryCount + 1);
        }
        throw error;
      }

      const result = data;
      
      toast({
        title: "Images Updated!",
        description: `Successfully updated ${result.results?.successful || 0} blogs with AI-generated images.`,
      });

      // Reload recent runs to show updated data
      loadRecentRuns();

    } catch (error: any) {
      console.error('Image update error:', error);
      toast({
        title: "Image Update Failed",
        description: retryCount >= MAX_RETRIES 
          ? "Unable to connect to the server. Please try again in a moment."
          : error.message || "Failed to update blog images",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingImages(false);
    }
  };

  const handleKillRun = async (runId: string, reason = 'Terminated by admin') => {
    try {
      await supabase.functions.invoke('kill-daily-blog-run', { body: { runId, reason } });
      toast({ title: 'Run Terminated', description: 'The generation run was marked as failed.' });
      if (monitoredRunId === runId) {
        setMonitoredRunId(null);
        setIsGenerating(false);
      }
      await loadRecentRuns();
    } catch (e: any) {
      toast({ title: 'Kill Failed', description: e.message || 'Could not terminate run', variant: 'destructive' });
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
              Topics are sourced from trending AI, automation, and technology news. Each blog is published immediately after generation.
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
                <h4 className="font-medium">Queue System</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Generates blogs every 10 minutes to avoid rate limits
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Auto-Publish</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Posts are automatically published (700-1000 words)
              </p>
            </div>
          </div>

          {/* Manual Trigger */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex-1">
                <h4 className="font-medium mb-1">Generate & Queue Blogs</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate trending AI news topics and queue them for automatic generation (1 blog every 12 seconds). Each blog is published automatically.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <label htmlFor="blog-count" className="text-sm font-medium">
                      Number of blogs:
                    </label>
                    <input
                      id="blog-count"
                      type="number"
                      min="1"
                      max="20"
                      value={blogCount}
                      onChange={(e) => setBlogCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                      disabled={isGenerating}
                      className="w-20 px-3 py-1 border rounded-md bg-background text-foreground"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Label htmlFor="priority-select" className="text-sm font-medium">
                      Priority:
                    </Label>
                    <Select
                      value={selectedPriority}
                      onValueChange={(value: '1' | '2' | '3') => setSelectedPriority(value)}
                      disabled={isGenerating}
                    >
                      <SelectTrigger id="priority-select" className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">
                          <div className="flex items-center gap-2">
                            <Flame className="h-3 w-3 text-destructive" />
                            High (Urgent)
                          </div>
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3" />
                            Normal
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center gap-2">
                            <Pin className="h-3 w-3" />
                            Low
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button 
                onClick={triggerManualGeneration}
                disabled={isGenerating}
                className="btn-hero ml-4"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Queue {blogCount} {blogCount === 1 ? 'Blog' : 'Blogs'}
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-blue-500/5 to-blue-500/10">
              <div>
                <h4 className="font-medium mb-1">Process Queue Now</h4>
                <p className="text-sm text-muted-foreground">
                  Manually start the background queue processor for all pending blog items.
                </p>
              </div>
              <Button 
                onClick={processQueueNow}
                disabled={isGenerating}
                variant="outline"
              >
                <Play className="mr-2 h-4 w-4" />
                Process Queue
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-orange-500/5 to-orange-500/10">
              <div>
                <h4 className="font-medium mb-1">Generate Images for Existing Blogs</h4>
                <p className="text-sm text-muted-foreground">
                  One-time backfill: Generate AI images for all existing blogs without images.
                </p>
              </div>
              <Button 
                onClick={() => handleUpdateImages()}
                disabled={isUpdatingImages}
                variant="outline"
              >
                {isUpdatingImages ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Update Images
                  </>
                )}
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Live Queue Progress */}
      {activeRunId && (
        <QueueProgressViewer runId={activeRunId} />
      )}

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Generation Runs
              </CardTitle>
              <CardDescription>
                History of automated and manual blog generation runs
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>
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
              {recentRuns.map((run) => {
                // Determine actual status based on results
                const actualStatus = run.status === 'completed' && run.blogs_created === 0 && run.blogs_failed === 0 
                  ? 'failed' 
                  : run.status;
                
                const isRunning = actualStatus === 'running' || actualStatus === 'pending';
                const isFailed = actualStatus === 'failed';
                const isPartial = actualStatus === 'partial';
                const isSuccess = actualStatus === 'completed' && run.blogs_created > 0;

                // Calculate elapsed time for running jobs
                const elapsedMs = isRunning ? Date.now() - new Date(run.created_at).getTime() : 0;
                const elapsedMinutes = Math.floor(elapsedMs / 60000);
                const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000);
                
                // Calculate estimated time remaining based on actual progress
                const blogsCompleted = run.blogs_created || 0;
                const blogsTotal = run.blogs_total || 10;
                const blogsRemaining = blogsTotal - blogsCompleted;
                let estimatedMinutesLeft = 0;
                
                if (isRunning && blogsCompleted > 0 && elapsedMs > 0) {
                  // Calculate average time per blog based on actual progress
                  const avgTimePerBlog = elapsedMs / blogsCompleted;
                  estimatedMinutesLeft = Math.ceil((avgTimePerBlog * blogsRemaining) / 60000);
                } else if (isRunning) {
                  // Default estimate if no blogs completed yet
                  estimatedMinutesLeft = blogsRemaining * 2; // 2 min per blog estimate
                }
                
                const handleForceRefresh = async (runId: string) => {
                  console.log('🔄 Force refreshing status for run:', runId);
                  
                  // First, fetch the latest data from the database
                  const { data: freshRun, error } = await supabase
                    .from('daily_blog_runs')
                    .select('*')
                    .eq('id', runId)
                    .single();
                  
                  if (error) {
                    toast({
                      title: "Error",
                      description: "Failed to check status",
                      variant: "destructive"
                    });
                    return;
                  }
                  
                  // Calculate elapsed time based on fresh data
                  const freshElapsedMs = Date.now() - new Date(freshRun.created_at).getTime();
                  const freshElapsedMinutes = Math.floor(freshElapsedMs / 60000);
                  
                  console.log(`📊 Fresh status: ${freshRun.status}, elapsed: ${freshElapsedMinutes}min, blogs: ${freshRun.blogs_created}`);
                  
                  // If still running after 3 minutes with no progress, mark as failed
                  if (freshRun.status === 'running' && freshElapsedMinutes > 3 && (freshRun.blogs_created || 0) === 0) {
                    await supabase.functions.invoke('kill-daily-blog-run', {
                      body: { runId, reason: 'Generation stuck - no progress after 3 minutes' }
                    });
                    
                    toast({
                      title: "Generation Failed",
                      description: "Marked as failed due to no progress",
                      variant: "destructive"
                    });
                  } else {
                    toast({
                      title: "Status Updated",
                      description: `Status: ${freshRun.status}, Blogs: ${freshRun.blogs_created || 0}`,
                    });
                  }
                  
                  // Reload to show updated status (realtime will also handle this)
                  await loadRecentRuns();
                };

                return (
                  <div key={run.id} className="border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 flex-1">
                        {isSuccess ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : isFailed ? (
                          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                        ) : isPartial ? (
                          <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        ) : (
                          <Loader2 className="h-5 w-5 text-blue-500 animate-spin flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">
                            {new Date(run.run_date).toLocaleString()}
                          </p>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {isRunning ? (
                              <div className="space-y-1">
                                <p className="font-medium text-blue-600">
                                  🔄 Generating blog {run.blogs_created + 1}/{run.blogs_total || 10}...
                                </p>
                                <p className="text-xs">
                                  Elapsed: {elapsedMinutes}m {elapsedSeconds}s
                                  {elapsedMinutes >= 5 && blogsCompleted === 0 && (
                                    <span className="ml-2 text-orange-500 font-medium animate-pulse">
                                      ⚠️ Checking status...
                                    </span>
                                  )}
                                  {elapsedMinutes >= 5 && blogsCompleted > 0 && (
                                    <span className="ml-2 text-green-600">
                                      ✓ On track
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-purple-600 font-medium">
                                  ⏱️ Est. time left: ~{estimatedMinutesLeft}m
                                  {blogsCompleted > 0 && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      (based on current speed)
                                    </span>
                                  )}
                                  {blogsCompleted === 0 && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      (avg. 2min/blog)
                                    </span>
                                  )}
                                </p>
                                {run.blogs_created > 0 && (
                                  <div className="space-y-1">
                                    <p className="text-xs text-green-600 font-medium">
                                      ✓ {run.blogs_created} completed • {blogsRemaining} remaining
                                    </p>
                                    <div className="w-full bg-muted rounded-full h-1.5">
                                      <div 
                                        className="bg-gradient-to-r from-primary to-purple-600 h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${(run.blogs_created / (run.blogs_total || 10)) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p>
                                {run.blogs_created || 0} published, {run.blogs_failed || 0} failed
                              </p>
                            )}
                            {isFailed && run.error_message && (
                              <span className="block text-xs text-destructive mt-1">
                                {run.error_message}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          isSuccess ? 'default' : 
                          isRunning ? 'secondary' :
                          isPartial ? 'outline' :
                          'destructive'
                        } className={
                          isSuccess ? 'bg-green-500 hover:bg-green-600 flex-shrink-0' :
                          isRunning ? 'bg-blue-500 hover:bg-blue-600 flex-shrink-0' :
                          isPartial ? 'bg-orange-500 hover:bg-orange-600 text-white flex-shrink-0' :
                          'flex-shrink-0'
                        }>
                          {isRunning ? 'Generating...' : 
                           isSuccess ? 'Success' :
                           isPartial ? 'Partial' :
                           'Failed'}
                        </Badge>
                        
                          {isRunning && elapsedMinutes >= 3 && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleForceRefresh(run.id)}
                                className="flex-shrink-0"
                              >
                                Force Refresh
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleKillRun(run.id)}
                                className="flex-shrink-0"
                              >
                                Kill Run
                              </Button>
                            </>
                          )}
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setExpandedRunId(expandedRunId === run.id ? null : run.id)}
                          className="flex-shrink-0"
                        >
                          {expandedRunId === run.id ? 'Hide Steps' : 'View Steps'}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedRunId === run.id && (
                      <div className="px-4 pb-4">
                        <GenerationStepsViewer runId={run.id} />
                      </div>
                    )}
                  </div>
            );
          })}
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
                Each post is automatically published immediately after generation, one at a time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
