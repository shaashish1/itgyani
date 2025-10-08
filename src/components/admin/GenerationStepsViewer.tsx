import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface GenerationStep {
  id: string;
  step_number: number;
  step_name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  details: any;
  error_message?: string;
  started_at: string;
  completed_at?: string;
  duration_ms?: number;
}

interface GenerationStepsViewerProps {
  runId: string;
}

export const GenerationStepsViewer: React.FC<GenerationStepsViewerProps> = ({ runId }) => {
  const [steps, setSteps] = useState<GenerationStep[]>([]);
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadSteps();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`steps-${runId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_generation_steps',
          filter: `run_id=eq.${runId}`
        },
        () => {
          loadSteps();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [runId]);

  const loadSteps = async () => {
    const { data } = await supabase
      .from('blog_generation_steps')
      .select('*')
      .eq('run_id', runId)
      .order('step_number', { ascending: true });

    if (data) {
      setSteps(data as GenerationStep[]);
    }
  };

  const toggleStep = (stepNumber: number) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(stepNumber)) {
      newExpanded.delete(stepNumber);
    } else {
      newExpanded.add(stepNumber);
    }
    setExpandedSteps(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      completed: 'default',
      running: 'secondary',
      failed: 'destructive',
      pending: 'outline'
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="ml-2">
        {status}
      </Badge>
    );
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return '-';
    if (ms < 1000) return `${ms}ms`;
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  if (steps.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No generation steps tracked yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Generation Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {steps.map((step) => {
            const isExpanded = expandedSteps.has(step.step_number);
            const hasDetails = step.details && Object.keys(step.details).length > 0;

            return (
              <div
                key={step.id}
                className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
              >
                <div 
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => hasDetails && toggleStep(step.step_number)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm">
                        Step {step.step_number}: {step.step_name}
                      </span>
                      {getStatusBadge(step.status)}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {formatDuration(step.duration_ms)}
                      </span>
                    </div>

                    {step.error_message && (
                      <div className="mt-1 text-xs text-destructive">
                        Error: {step.error_message}
                      </div>
                    )}

                    {isExpanded && hasDetails && (
                      <div className="mt-2 p-2 bg-muted rounded text-xs">
                        <pre className="whitespace-pre-wrap break-words">
                          {JSON.stringify(step.details, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>

                  {hasDetails && (
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
