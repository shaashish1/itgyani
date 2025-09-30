-- Make author_id optional to allow automated/blog-batch inserts
ALTER TABLE public.blog_posts ALTER COLUMN author_id DROP NOT NULL;