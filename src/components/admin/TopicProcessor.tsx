import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Play, CheckCircle2, XCircle } from 'lucide-react';

export function TopicProcessor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState<{
    successful: number;
    failed: number;
    total: number;
  } | null>(null);
  const { toast } = useToast();

  const procesTopics = async () => {
    setIsProcessing(true);
    setStats(null);

    try {
      const { data, error } = await supabase.functions.invoke('process-blog-topics', {
        body: {},
      });

      if (error) throw error;

      setStats({
        successful: data.successful || 0,
        failed: data.failed || 0,
        total: data.total || 0,
      });

      toast({
        title: 'Processing Complete',
        description: `Generated ${data.successful} blog posts successfully`,
      });
    } catch (error) {
      console.error('Error processing topics:', error);
      toast({
        title: 'Processing Failed',
        description: error.message || 'Failed to process blog topics',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Process Blog Topics Queue</h3>
          <p className="text-sm text-muted-foreground">
            Generate blog posts from pending topics in the queue (processes 10 at a time)
          </p>
        </div>

        <Button
          onClick={procesTopics}
          disabled={isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing Topics...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Process Topics Queue
            </>
          )}
        </Button>

        {stats && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Processed:</span>
              <span className="text-sm font-bold">{stats.total}</span>
            </div>
            <div className="flex items-center justify-between text-green-600">
              <span className="text-sm font-medium flex items-center">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Successful:
              </span>
              <span className="text-sm font-bold">{stats.successful}</span>
            </div>
            {stats.failed > 0 && (
              <div className="flex items-center justify-between text-red-600">
                <span className="text-sm font-medium flex items-center">
                  <XCircle className="mr-1 h-4 w-4" />
                  Failed:
                </span>
                <span className="text-sm font-bold">{stats.failed}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
