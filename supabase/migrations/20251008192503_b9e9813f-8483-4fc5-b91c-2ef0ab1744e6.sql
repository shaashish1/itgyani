-- Create table for tracking blog generation steps
CREATE TABLE IF NOT EXISTS public.blog_generation_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  run_id UUID NOT NULL REFERENCES public.daily_blog_runs(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  step_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, running, completed, failed
  details JSONB DEFAULT '{}',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_generation_steps ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view steps
CREATE POLICY "Admins can view generation steps" 
ON public.blog_generation_steps 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::user_role));

-- Add index for faster queries
CREATE INDEX idx_generation_steps_run_id ON public.blog_generation_steps(run_id);
CREATE INDEX idx_generation_steps_status ON public.blog_generation_steps(status);

-- Enable realtime for the steps table
ALTER TABLE public.blog_generation_steps REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_generation_steps;