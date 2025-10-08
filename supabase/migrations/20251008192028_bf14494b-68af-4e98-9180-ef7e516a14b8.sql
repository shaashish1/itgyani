-- Enable realtime for daily_blog_runs table
ALTER TABLE public.daily_blog_runs REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.daily_blog_runs;