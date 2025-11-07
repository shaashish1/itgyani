-- Add priority column to blog_generation_queue
ALTER TABLE blog_generation_queue 
ADD COLUMN priority INTEGER DEFAULT 2 CHECK (priority IN (1, 2, 3));

-- Add index for efficient priority ordering
CREATE INDEX idx_queue_priority_created 
ON blog_generation_queue(priority, created_at);

-- Enable realtime for live queue updates
ALTER PUBLICATION supabase_realtime 
ADD TABLE blog_generation_queue;