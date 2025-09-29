-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'scheduled');
CREATE TYPE subscription_plan AS ENUM ('free', 'premium', 'enterprise');
CREATE TYPE user_role AS ENUM ('user', 'admin', 'editor');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  subscription_plan subscription_plan DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  category_id UUID REFERENCES public.categories(id),
  status blog_status DEFAULT 'draft',
  is_premium BOOLEAN DEFAULT FALSE,
  reading_time INTEGER DEFAULT 5,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  tags TEXT[],
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create consulting_requests table
CREATE TABLE public.consulting_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT,
  preferred_date DATE,
  preferred_time TIME,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_generation_logs table
CREATE TABLE public.ai_generation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  model_used TEXT NOT NULL,
  tokens_used INTEGER,
  generation_time_ms INTEGER,
  status TEXT DEFAULT 'success',
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consulting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generation_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create RLS policies for categories
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON public.categories
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for blog_posts
CREATE POLICY "Published blogs are viewable by everyone" ON public.blog_posts
  FOR SELECT USING (status = 'published' AND (NOT is_premium OR auth.uid() IS NOT NULL));

CREATE POLICY "Premium blogs require authentication" ON public.blog_posts
  FOR SELECT USING (
    status = 'published' AND 
    (NOT is_premium OR 
     (auth.uid() IS NOT NULL AND 
      EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND subscription_plan IN ('premium', 'enterprise'))))
  );

CREATE POLICY "Authors can manage their own posts" ON public.blog_posts
  FOR ALL USING (auth.uid() = author_id);

CREATE POLICY "Admins can manage all posts" ON public.blog_posts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for consulting_requests
CREATE POLICY "Anyone can insert consulting requests" ON public.consulting_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view all consulting requests" ON public.consulting_requests
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Create RLS policies for ai_generation_logs
CREATE POLICY "Admins can view AI generation logs" ON public.ai_generation_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Insert default categories
INSERT INTO public.categories (name, slug, description, color) VALUES
('AI & Machine Learning', 'ai-machine-learning', 'Articles about artificial intelligence and machine learning', '#8B5CF6'),
('Automation', 'automation', 'Business process automation and workflow optimization', '#10B981'),
('n8n Workflows', 'n8n-workflows', 'n8n workflow tutorials and templates', '#F59E0B'),
('Quantum Computing', 'quantum-computing', 'The future of quantum computing technology', '#3B82F6'),
('Edge AI', 'edge-ai', 'Edge computing and AI at the edge', '#EF4444'),
('Future Tech', 'future-tech', 'Emerging technologies and future trends', '#6366F1');

-- Create function to automatically create profile on user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();