-- Fix search path security issue for trigger_daily_blog_generation function
CREATE OR REPLACE FUNCTION public.trigger_daily_blog_generation()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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