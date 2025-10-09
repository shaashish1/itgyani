-- Add indexes to blog_posts table for better query performance
-- Index on status and created_at for common filtering/sorting
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_created ON public.blog_posts(status, created_at DESC);

-- Index on published_at for published posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC) WHERE status = 'published';

-- Index on category_id for category lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON public.blog_posts(category_id) WHERE category_id IS NOT NULL;

COMMENT ON INDEX idx_blog_posts_status_created IS 'Optimizes queries filtering by status and ordering by creation date';
COMMENT ON INDEX idx_blog_posts_published_at IS 'Optimizes queries for published posts ordered by publish date';
COMMENT ON INDEX idx_blog_posts_category_id IS 'Optimizes category foreign key lookups';