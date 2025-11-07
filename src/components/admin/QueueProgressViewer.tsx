import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Clock, CheckCircle2, XCircle, Flame, Zap, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QueueItem {
  id: string;
  run_id: string | null;
  topic: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  priority: 1 | 2 | 3;
  attempts: number;
  max_attempts: number;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  error_message: string | null;
}

interface QueueProgressViewerProps {
  runId?: string | null;
}

export function QueueProgressViewer({ runId }: QueueProgressViewerProps) {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQueueItems();
    
    // Subscribe to real-time updates
    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_generation_queue',
          filter: runId ? `run_id=eq.${runId}` : undefined
        },
        (payload) => {
          console.log('Queue change:', payload);
          loadQueueItems();
        }
      )
      .subscribe();

    // Refresh every 5 seconds for safety
    const interval = setInterval(loadQueueItems, 5000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, [runId]);

  const loadQueueItems = async () => {
    try {
      let query = supabase
        .from('blog_generation_queue')
        .select('*')
        .order('priority', { ascending: true })
        .order('created_at', { ascending: true })
        .limit(50);

      if (runId) {
        query = query.eq('run_id', runId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setQueueItems((data || []) as QueueItem[]);
    } catch (error) {
      console.error('Error loading queue items:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    processing: queueItems.filter(item => item.status === 'processing').length,
    pending: queueItems.filter(item => item.status === 'pending').length,
    completed: queueItems.filter(item => item.status === 'completed').length,
    failed: queueItems.filter(item => item.status === 'failed').length,
  };

  const total = queueItems.length;
  const processed = stats.completed + stats.failed;
  const progressPercent = total > 0 ? (processed / total) * 100 : 0;

  const processingItem = queueItems.find(item => item.status === 'processing');
  const pendingItems = queueItems.filter(item => item.status === 'pending');
  const completedItems = queueItems.filter(item => item.status === 'completed' || item.status === 'failed');

  const getPriorityBadge = (priority: 1 | 2 | 3) => {
    switch (priority) {
      case 1:
        return (
          <Badge variant="destructive" className="gap-1">
            <Flame className="h-3 w-3" />
            High
          </Badge>
        );
      case 2:
        return (
          <Badge variant="secondary" className="gap-1">
            <Zap className="h-3 w-3" />
            Normal
          </Badge>
        );
      case 3:
        return (
          <Badge variant="outline" className="gap-1">
            <Pin className="h-3 w-3" />
            Low
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (queueItems.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Live Queue Status</span>
          {stats.processing > 0 && (
            <Badge variant="default" className="gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              Processing
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real-time blog generation progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-primary/10">
            <div className="text-2xl font-bold text-primary">{stats.processing}</div>
            <div className="text-xs text-muted-foreground">Processing</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted">
            <div className="text-2xl font-bold">{stats.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-500/10">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-destructive/10">
            <div className="text-2xl font-bold text-destructive">{stats.failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">{processed} / {total}</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Currently Processing */}
        {processingItem && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Currently Processing
            </h4>
            <div className="p-4 rounded-lg border-2 border-primary bg-primary/5 animate-pulse">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{processingItem.topic.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {processingItem.topic.category} • Attempt {processingItem.attempts}/{processingItem.max_attempts}
                  </div>
                </div>
                {getPriorityBadge(processingItem.priority)}
              </div>
            </div>
          </div>
        )}

        {/* Pending Items */}
        {pendingItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              Pending ({pendingItems.length})
            </h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {getStatusIcon(item.status)}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{item.topic.title}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.topic.category}
                        </div>
                      </div>
                    </div>
                    {getPriorityBadge(item.priority)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Items (Collapsed) */}
        {completedItems.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Completed ({completedItems.length})
            </h4>
            <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
              {completedItems.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "p-2 rounded text-xs flex items-center gap-2",
                    item.status === 'completed' ? "bg-green-500/10 text-green-700" : "bg-destructive/10 text-destructive"
                  )}
                >
                  {getStatusIcon(item.status)}
                  <span className="truncate flex-1">{item.topic.title}</span>
                  {item.status === 'failed' && item.error_message && (
                    <span className="text-xs opacity-70 truncate max-w-xs" title={item.error_message}>
                      {item.error_message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
