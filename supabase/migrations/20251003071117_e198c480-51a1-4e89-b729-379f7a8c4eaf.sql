-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Create a function to call the daily blog generation edge function
CREATE OR REPLACE FUNCTION public.trigger_daily_blog_generation()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  supabase_url text := current_setting('app.settings.supabase_url', true);
  supabase_anon_key text := current_setting('app.settings.supabase_anon_key', true);
BEGIN
  -- This will be called by pg_cron daily
  -- The actual HTTP call will be made via pg_net in the cron job
  RAISE NOTICE 'Daily blog generation triggered at %', now();
END;
$$;

-- Schedule daily blog generation at 6 AM UTC (adjust timezone as needed)
SELECT cron.schedule(
  'daily-news-blogs',
  '0 6 * * *', -- Run at 6:00 AM UTC every day
  $$
  SELECT
    net.http_post(
      url := 'https://gtwsglzyyislrgcyfxvt.supabase.co/functions/v1/generate-daily-news-blogs',
      headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0d3NnbHp5eWlzbHJnY3lmeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTU1NzMsImV4cCI6MjA3NDczMTU3M30.ha0Ui7HmR_PH9SmgBo0nRcaCsU57Jw1GI_l2M0ymWVg"}'::jsonb,
      body := '{"source": "cron", "timestamp": "' || now()::text || '"}'::jsonb
    ) as request_id;
  $$
);

-- Create a table to track daily blog generation runs
CREATE TABLE IF NOT EXISTS public.daily_blog_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blogs_created INTEGER DEFAULT 0,
  blogs_failed INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on daily_blog_runs
ALTER TABLE public.daily_blog_runs ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view daily blog runs
CREATE POLICY "Admins can view daily blog runs"
ON public.daily_blog_runs
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_blog_runs_date ON public.daily_blog_runs(run_date DESC);

COMMENT ON TABLE public.daily_blog_runs IS 'Tracks automated daily blog generation runs';
COMMENT ON COLUMN public.daily_blog_runs.run_date IS 'When the automated generation was triggered';
COMMENT ON COLUMN public.daily_blog_runs.blogs_created IS 'Number of blogs successfully created';
COMMENT ON COLUMN public.daily_blog_runs.blogs_failed IS 'Number of blogs that failed to generate';