-- Add blogs_total column to track the target number of blogs for each run
ALTER TABLE public.daily_blog_runs 
ADD COLUMN blogs_total integer NOT NULL DEFAULT 10;

COMMENT ON COLUMN public.daily_blog_runs.blogs_total IS 'Target number of blogs to generate in this run';