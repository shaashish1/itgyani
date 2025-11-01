-- Add database index for faster blog queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published 
ON blog_posts(status, published_at DESC) 
WHERE status = 'published';

-- Create blog generation queue table
CREATE TABLE IF NOT EXISTS blog_generation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID REFERENCES daily_blog_runs(id) ON DELETE CASCADE,
  topic JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  error_message TEXT,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for queue processing
CREATE INDEX IF NOT EXISTS idx_queue_status_created 
ON blog_generation_queue(status, created_at) 
WHERE status IN ('pending', 'processing');

-- Enable RLS
ALTER TABLE blog_generation_queue ENABLE ROW LEVEL SECURITY;

-- Add policy for admins
CREATE POLICY "Admins can manage queue" 
ON blog_generation_queue 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::user_role))
WITH CHECK (has_role(auth.uid(), 'admin'::user_role));