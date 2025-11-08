import { useState, useEffect, useMemo, useCallback, memo } from "react";
import blogDefaultImage from "@/assets/blog-default.jpg";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import AdSenseAd from "@/components/AdSenseAd";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
  Volume2,
  VolumeX,
  Pause,
  Play
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ReadMeButton } from "@/components/ImageComponents";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useToast } from "@/hooks/use-toast";
import OptimizedImage from "@/components/OptimizedImage";
import { LazyAd } from "@/components/LazyAd";
import { prefetchResource } from "@/lib/performance";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id?: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
  metaDescription: string;
  readingTime: number;
  views?: number;
}

// Memoized components for performance
const RelatedPostCard = memo(({ post }: { post: BlogPost }) => (
  <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
    <CardContent className="p-6">
      <Badge variant="outline" className="mb-3">
        {post.category}
      </Badge>
      <h3 className="font-semibold mb-2 line-clamp-2">
        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between text-xs text-foreground/60">
        <span>{post.readingTime} min read</span>
        <Link to={`/blog/${post.slug}`}>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
            Read More <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </CardContent>
  </Card>
));

RelatedPostCard.displayName = 'RelatedPostCard';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { isPlaying, isPaused, isSupported, speak, pause, resume, stop } = useTextToSpeech();
  const { toast } = useToast();

  // Prefetch related posts on hover
  const handleRelatedPostHover = useCallback((postSlug: string) => {
    prefetchResource(`/blog/${postSlug}`);
  }, []);

  useEffect(() => {
    if (slug) {
      loadBlogPost(slug);
    }
  }, [slug]);

  // Track view count
  useEffect(() => {
    if (blogPost?.id) {
      incrementViewCount(blogPost.id);
    }
  }, [blogPost?.id]);

  const incrementViewCount = async (postId: string) => {
    try {
      // Increment view count in database
      const { error } = await supabase
        .from('blog_posts')
        .update({ views: (blogPost?.views || 0) + 1 })
        .eq('id', postId);

      if (error) {
        console.error('Error incrementing view count:', error);
      }
    } catch (error) {
      console.error('Failed to increment view count:', error);
    }
  };

  const loadBlogPost = useCallback(async (postSlug: string) => {
    try {
      setLoading(true);
      
      // Try to load from Supabase first with optimized query
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, content, excerpt, author_id, category_id, tags, published_at, created_at, updated_at, status, meta_description, reading_time, featured_image_url')
        .eq('slug', postSlug)
        .eq('status', 'published')
        .maybeSingle();

      if (error || !data) {
        console.error('Error loading blog post:', error);
        // Fallback to demo content
        const demoPost = getDemoPost(postSlug);
        if (demoPost) {
          setBlogPost(demoPost);
          await loadRelatedPosts(demoPost.category);
        } else {
          navigate('/blog');
        }
      } else {
        // Resolve category name without join
        let categoryName = 'General';
        if (data.category_id) {
          const { data: cat } = await supabase
            .from('categories')
            .select('name')
            .eq('id', data.category_id)
            .maybeSingle();
          if (cat?.name) categoryName = cat.name;
        }

        const formattedPost = {
          id: data.id,
          title: data.title,
          slug: data.slug,
          content: data.content || '',
          excerpt: data.excerpt || '',
          author_id: data.author_id,
          category: categoryName,
          tags: data.tags || [],
          publishedAt: new Date(data.published_at || data.created_at),
          updatedAt: new Date(data.updated_at),
          status: data.status as 'published',
          metaDescription: data.meta_description || '',
          readingTime: data.reading_time || 5
        };
        setBlogPost(formattedPost);
        await loadRelatedPosts(formattedPost.category);
      }
    } catch (error) {
      console.error('Failed to load blog post:', error);
      const demoPost = getDemoPost(postSlug);
      if (demoPost) {
        setBlogPost(demoPost);
        await loadRelatedPosts(demoPost.category);
      } else {
        navigate('/blog');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const loadRelatedPosts = useCallback(async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category_id, tags, published_at, reading_time')
        .eq('status', 'published')
        .neq('slug', slug)
        .order('published_at', { ascending: false })
        .limit(3);
      
      if (error || !data) {
        setRelatedPosts(getDemoRelatedPosts(category));
      } else {
        // Fetch category names in a single query
        const catIds = [...new Set(data.map(p => p.category_id).filter(Boolean))];
        let catMap = new Map<string, string>();
        if (catIds.length) {
          const { data: cats } = await supabase
            .from('categories')
            .select('id, name')
            .in('id', catIds);
          catMap = new Map((cats || []).map(c => [c.id, c.name]));
        }
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          content: '',
          excerpt: post.excerpt || '',
          author_id: undefined,
          category: (post.category_id && catMap.get(post.category_id)) || 'General',
          tags: post.tags || [],
          publishedAt: new Date(post.published_at),
          updatedAt: new Date(post.published_at),
          status: 'published' as const,
          metaDescription: '',
          readingTime: post.reading_time || 5
        }));
        setRelatedPosts(formattedPosts);
      }
    } catch (error) {
      setRelatedPosts(getDemoRelatedPosts(category));
    }
  }, [slug]);

  const getDemoPost = (postSlug: string): BlogPost | null => {
    const demoPosts: Record<string, BlogPost> = {
      "ai-automation-guide-2025": {
        id: "demo-1",
        title: "The Ultimate Guide to AI Automation in 2025: Transform Your Business",
        slug: "ai-automation-guide-2025",
        content: `
# The Ultimate Guide to AI Automation in 2025: Transform Your Business

Artificial Intelligence automation has evolved from a futuristic concept to a business necessity. In 2025, companies that embrace AI automation are seeing unprecedented levels of efficiency, cost reduction, and competitive advantage.

## What is AI Automation?

AI automation combines artificial intelligence with workflow automation to create intelligent systems that can:

- **Learn and adapt** from data patterns
- **Make decisions** based on complex criteria
- **Execute tasks** with minimal human intervention
- **Optimize processes** continuously

## The Business Case for AI Automation

### ROI Statistics That Matter

Our research across 500+ implementations shows:

- **Average ROI**: 340% within 18 months
- **Cost Reduction**: 42% in operational expenses
- **Efficiency Gains**: 225% productivity improvement
- **Error Reduction**: 95% fewer manual errors

### Key Benefits

1. **Operational Efficiency**
   - Automate repetitive tasks
   - Reduce manual errors
   - 24/7 operations capability
   - Faster processing times

2. **Cost Optimization**
   - Lower labor costs
   - Reduced infrastructure needs
   - Minimized waste
   - Better resource allocation

3. **Enhanced Decision Making**
   - Data-driven insights
   - Predictive analytics
   - Real-time monitoring
   - Pattern recognition

## Implementation Strategy

### Phase 1: Assessment and Planning (4-6 weeks)

**Objectives:**
- Identify automation opportunities
- Assess current technology stack
- Define success metrics
- Create implementation roadmap

**Key Activities:**
- Process mapping and analysis
- Technology audit
- Team skill assessment
- Budget planning

### Phase 2: Pilot Implementation (8-12 weeks)

**Focus Areas:**
- Start with high-impact, low-complexity processes
- Implement proof of concepts
- Gather user feedback
- Measure initial results

**Common Pilot Projects:**
- Customer support automation
- Data entry and processing
- Report generation
- Email marketing automation

### Phase 3: Scaling and Optimization (12-24 weeks)

**Expansion Strategy:**
- Roll out to additional departments
- Integrate with existing systems
- Advanced AI model training
- Performance optimization

## Technology Stack Recommendations

### Core Platforms

1. **n8n** - Workflow automation platform
   - Visual workflow designer
   - 400+ integrations
   - Self-hosted option
   - Advanced scripting capabilities

2. **OpenAI GPT-4** - Language processing
   - Content generation
   - Text analysis
   - Conversational AI
   - Code generation

3. **TensorFlow/PyTorch** - Machine learning
   - Custom model development
   - Deep learning capabilities
   - Scalable deployment
   - Community support

### Integration Tools

- **Zapier/n8n** for workflow automation
- **Apache Kafka** for real-time data streaming
- **Docker/Kubernetes** for containerization
- **AWS/Azure/GCP** for cloud infrastructure

## Real-World Case Studies

### E-commerce: TechFlow Electronics

**Challenge:** Manual inventory management causing stockouts and overstock

**Solution:** AI-powered demand forecasting with automated reordering

**Results:**
- 65% reduction in stockouts
- 30% lower inventory costs
- 85% improvement in forecast accuracy
- ROI: 280% in 12 months

### Finance: SecureBank

**Challenge:** Time-consuming loan approval process

**Solution:** AI risk assessment with automated decision making

**Results:**
- 75% faster approval times
- 40% reduction in default rates
- 90% of applications processed automatically
- ROI: 450% in 18 months

### Healthcare: MedCare Systems

**Challenge:** Patient appointment scheduling inefficiencies

**Solution:** AI-powered scheduling with patient preference learning

**Results:**
- 50% reduction in no-shows
- 35% increase in patient satisfaction
- 60% less time spent on scheduling
- ROI: 220% in 15 months

## Common Implementation Challenges

### Technical Challenges

1. **Data Quality Issues**
   - Solution: Implement data cleaning pipelines
   - Use AI for data validation
   - Establish data governance policies

2. **System Integration Complexity**
   - Solution: Use API-first approach
   - Implement middleware solutions
   - Gradual migration strategy

3. **Scalability Concerns**
   - Solution: Cloud-native architecture
   - Microservices design
   - Load balancing strategies

### Organizational Challenges

1. **Change Resistance**
   - Solution: Comprehensive training programs
   - Clear communication of benefits
   - Involve employees in design process

2. **Skill Gaps**
   - Solution: Upskilling programs
   - Partner with external experts
   - Hire specialized talent

## Best Practices for Success

### 1. Start Small, Think Big

- Begin with pilot projects
- Prove value before scaling
- Learn from failures
- Iterate quickly

### 2. Focus on Data Quality

- Clean, structured data is essential
- Implement data governance
- Establish data pipelines
- Monitor data quality continuously

### 3. Measure Everything

- Define clear KPIs
- Implement monitoring dashboards
- Regular performance reviews
- Continuous optimization

### 4. Invest in Training

- Employee education programs
- Change management support
- Technical skill development
- Leadership alignment

## Future Trends in AI Automation

### 2025-2026 Predictions

1. **Hyper-Personalization**
   - AI-driven customer experiences
   - Real-time personalization
   - Predictive customer needs

2. **Autonomous Operations**
   - Self-healing systems
   - Automated optimization
   - Minimal human intervention

3. **Explainable AI**
   - Transparent decision making
   - Regulatory compliance
   - Trust and accountability

## Getting Started: Your Next Steps

1. **Assess Your Readiness**
   - Complete our AI Readiness Assessment
   - Identify quick wins
   - Plan your strategy

2. **Build Your Team**
   - Identify internal champions
   - Consider external partnerships
   - Invest in training

3. **Start Your Pilot**
   - Choose a high-impact process
   - Set clear success criteria
   - Plan for scale

## Conclusion

AI automation is no longer a question of "if" but "when" and "how." Organizations that move quickly to implement intelligent automation will gain significant competitive advantages in efficiency, cost reduction, and customer satisfaction.

The key to success lies in strategic planning, starting with manageable pilots, and scaling systematically. With the right approach, tools, and mindset, any organization can transform their operations through AI automation.

Ready to begin your AI automation journey? Contact our experts for a free consultation and personalized roadmap.
        `,
        excerpt: "Discover how AI automation is revolutionizing industries and learn practical strategies to implement intelligent workflows that deliver 300%+ ROI.",
        author_id: "demo-author",
        category: "technology",
        tags: ["AI Automation", "Business Transformation", "ROI", "Strategy"],
        publishedAt: new Date("2025-01-15"),
        updatedAt: new Date("2025-01-15"),
        status: "published",
        metaDescription: "Complete guide to AI automation in 2025 with practical implementation strategies and ROI calculation methods.",
        readingTime: 12
      },
      // Add other demo posts...
    };

    return demoPosts[postSlug] || null;
  };

  const getDemoRelatedPosts = (category: string): BlogPost[] => {
    return [
      {
        id: "related-1",
        title: "Building Your First AI Automation Workflow",
        slug: "first-ai-automation-workflow",
        content: "Learn the basics...",
        excerpt: "Step-by-step guide to creating your first AI-powered automation workflow",
        author_id: "demo-author",
        category: category,
        tags: ["Getting Started", "Tutorial"],
        publishedAt: new Date("2025-01-20"),
        updatedAt: new Date("2025-01-20"),
        status: "published",
        metaDescription: "Learn to build your first AI automation workflow",
        readingTime: 8
      }
    ];
  };

  const formatDate = useMemo(() => {
    return (date: Date) => date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }, []);

  const handleReadAloud = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support text-to-speech.",
        variant: "destructive"
      });
      return;
    }

    if (isPlaying && !isPaused) {
      pause();
    } else if (isPaused) {
      resume();
    } else if (blogPost) {
      const textToRead = `${blogPost.title}. ${blogPost.content}`;
      speak(textToRead);
      toast({
        title: "Reading Started",
        description: "Blog post is now being read aloud.",
      });
    }
  };

  const handleStopReading = () => {
    stop();
    toast({
      title: "Reading Stopped",
      description: "Text-to-speech has been stopped.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{blogPost.title} | ITGYANI Blog</title>
      <meta name="description" content={blogPost.metaDescription} />
      <meta name="keywords" content={blogPost.tags?.join(", ")} />
      <meta property="og:title" content={blogPost.title} />
      <meta property="og:description" content={blogPost.excerpt} />
      <meta property="og:image" content={blogDefaultImage} />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 bg-gradient-to-br from-background via-accent/5 to-secondary/10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <Link to="/blog" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-6">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <Badge variant="secondary">{blogPost.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-foreground/70">
                    <Calendar className="h-4 w-4" />
                    {formatDate(blogPost.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/70">
                    <Clock className="h-4 w-4" />
                    {blogPost.readingTime} min read
                  </div>
                  <div className="flex items-center gap-1 text-sm text-foreground/70">
                    <User className="h-4 w-4" />
                    ITGYANI AI
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="gradient-text">{blogPost.title}</span>
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blogPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {isSupported && (
                    <Button 
                      variant={isPlaying ? "default" : "outline"} 
                      size="sm"
                      onClick={handleReadAloud}
                    >
                      {isPlaying && !isPaused ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Pause
                        </>
                      ) : isPaused ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Volume2 className="h-4 w-4 mr-2" />
                          Read Aloud
                        </>
                      )}
                    </Button>
                  )}
                  {isPlaying && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleStopReading}
                    >
                      <VolumeX className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto">
                <div className="max-w-3xl">
                {/* Featured Image */}
                <div className="mb-10 rounded-2xl overflow-hidden shadow-xl">
                  <OptimizedImage 
                    src={blogDefaultImage} 
                    alt={blogPost.title}
                    className="w-full h-[400px] object-cover"
                    priority
                  />
                </div>

                {/* AdSense - Top of Content (After Title, Before Content) */}
                <div className="my-8 flex justify-center">
                  <AdSenseAd 
                    slot="content-top" 
                    format="leaderboard"
                    responsive={true}
                    style={{ maxWidth: '728px' }}
                  />
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4 mb-10 p-6 bg-accent/5 rounded-xl border border-border/50">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                    IG
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">ITGYANI Team</h3>
                    <p className="text-sm text-foreground/70">AI & Automation Experts</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Article Content with Custom Styling */}
                <article className="blog-content prose prose-xl max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => (
                        <h1 className="text-5xl md:text-6xl font-bold mt-16 mb-8 leading-tight text-foreground bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 p-6 rounded-xl border-l-8 border-primary shadow-sm" {...props} />
                      ),
                      h2: ({node, index, ...props}: any) => {
                        // Insert ad after 2nd and 4th H2
                        const showAd = index === 1 || index === 3;
                        return (
                          <>
                            <h2 className="text-4xl md:text-5xl font-bold mt-14 mb-7 leading-tight text-foreground bg-gradient-to-r from-accent/15 to-secondary/10 p-5 rounded-xl border-l-8 border-secondary shadow-sm" {...props} />
                            {showAd && (
                              <div className="my-16 flex justify-center">
                                <AdSenseAd 
                                  slot="content-mid" 
                                  format="rectangle"
                                  responsive={false}
                                  style={{ width: '300px', height: '250px' }}
                                />
                              </div>
                            )}
                          </>
                        );
                      },
                      h3: ({node, ...props}) => (
                        <h3 className="text-3xl md:text-4xl font-semibold mt-12 mb-6 text-foreground bg-accent/10 p-4 rounded-lg border-l-6 border-accent shadow-sm" {...props} />
                      ),
                      h4: ({node, ...props}) => (
                        <h4 className="text-2xl md:text-3xl font-semibold mt-10 mb-5 text-foreground bg-muted/50 p-4 rounded-lg border-l-4 border-muted-foreground/30" {...props} />
                      ),
                      p: ({node, children, ...props}) => {
                        // Check if this paragraph comes right after a heading (lead paragraph)
                        const text = String(children);
                        const isShort = text.length < 150;
                        const hasStrongEmphasis = text.includes('**') || (typeof children === 'object' && children);
                        
                        // Style as subheading if it's a short, emphasized paragraph
                        if (isShort && text.trim().length > 0) {
                          return (
                            <p className="text-xl md:text-2xl font-semibold leading-relaxed mb-6 text-foreground/95 mt-6" {...props}>
                              {children}
                            </p>
                          );
                        }
                        
                        return (
                          <p className="text-lg md:text-xl leading-relaxed mb-8 text-foreground/90 font-normal" {...props}>
                            {children}
                          </p>
                        );
                      },
                      ul: ({node, ...props}) => (
                        <ul className="space-y-4 mb-8 ml-8 list-disc marker:text-primary" {...props} />
                      ),
                      ol: ({node, ...props}) => (
                        <ol className="space-y-4 mb-8 ml-8 list-decimal marker:text-secondary marker:font-bold" {...props} />
                      ),
                      li: ({node, ...props}) => (
                        <li className="text-lg md:text-xl leading-relaxed text-foreground/90 pl-3" {...props} />
                      ),
                      blockquote: ({node, ...props}) => (
                        <blockquote className="border-l-8 border-primary pl-8 py-6 my-10 italic bg-gradient-to-r from-accent/10 to-transparent rounded-r-xl text-lg md:text-xl font-medium shadow-sm" {...props} />
                      ),
                      code: ({node, inline, ...props}: any) => 
                        inline ? (
                          <code className="bg-accent/30 px-3 py-1 rounded-md text-base font-mono text-primary" {...props} />
                        ) : (
                          <code className="block bg-accent/20 p-6 rounded-xl my-8 overflow-x-auto font-mono text-base leading-relaxed shadow-inner" {...props} />
                        ),
                      strong: ({node, ...props}) => (
                        <strong className="font-bold text-foreground" {...props} />
                      ),
                      a: ({node, ...props}) => (
                        <a className="text-primary hover:underline font-semibold hover:text-primary/80 transition-colors" {...props} />
                      ),
                      hr: ({node, ...props}) => (
                        <Separator className="my-12 h-1 bg-gradient-to-r from-transparent via-border to-transparent" {...props} />
                      ),
                    }}
                  >
                    {blogPost.content}
                  </ReactMarkdown>
                </article>

                {/* AdSense - Bottom of Content (After Article, Before Related) */}
                <div className="my-10 flex justify-center border-t border-border/30 pt-8">
                  <AdSenseAd 
                    slot="content-bottom" 
                    format="leaderboard"
                    responsive={true}
                    style={{ maxWidth: '728px' }}
                  />
                </div>

                {/* Share Section */}
                <div className="mt-16 pt-8 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Share this article</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl border border-border/50">
                  <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
                  <p className="text-foreground/80 mb-6">Get the latest insights on AI automation delivered to your inbox.</p>
                  <div className="flex gap-3">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button>Subscribe</Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-6 sticky top-24 self-start">
                {/* AdSense - Sidebar Top */}
                <LazyAd minHeight="600px">
                  <AdSenseAd 
                    slot="sidebar-top" 
                    format="vertical"
                    responsive={true}
                  />
                </LazyAd>

                {/* Table of Contents */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground/70">Scroll to explore the full article</p>
                  </div>
                </Card>

                {/* AdSense - Sidebar Middle */}
                <LazyAd minHeight="600px">
                  <AdSenseAd 
                    slot="sidebar-mid" 
                    format="vertical"
                    responsive={true}
                  />
                </LazyAd>

                {/* Popular Posts */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
                  <div className="space-y-3 text-sm">
                    <Link to="/blog" className="block hover:text-primary transition-colors">
                      <p className="font-medium line-clamp-2">Explore more articles</p>
                    </Link>
                  </div>
                </Card>

                {/* AdSense - Sidebar Bottom */}
                <LazyAd minHeight="600px">
                  <AdSenseAd 
                    slot="sidebar-bottom" 
                    format="vertical"
                    responsive={true}
                  />
                </LazyAd>
              </aside>
            </div>
            </div>
          </section>

          {/* AdSense - Before Related Posts */}
          <section className="py-8 bg-accent/5">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <LazyAd>
                  <AdSenseAd 
                    slot="before-related" 
                    format="horizontal"
                    responsive={true}
                  />
                </LazyAd>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-background">
              <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold mb-10 text-center">
                    <span className="gradient-text">Related Articles</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((post) => (
                      <div 
                        key={post.id}
                        onMouseEnter={() => handleRelatedPostHover(post.slug)}
                      >
                        <RelatedPostCard post={post} />
                      </div>
                    ))}
                  </div>

                  {/* AdSense - After Related Posts */}
                  <LazyAd className="mt-12">
                    <AdSenseAd 
                      slot="after-related" 
                      format="horizontal"
                      responsive={true}
                    />
                  </LazyAd>
                </div>
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-r from-primary/20 to-secondary/20">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">
                  Ready to <span className="gradient-text">Transform</span> Your Business?
                </h2>
                <p className="text-xl text-foreground/80 mb-8">
                  Get expert guidance on implementing AI automation in your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <ReadMeButton 
                    variant="primary" 
                    text="getStarted" 
                    className="mr-4"
                  />
                  <Link to="/resources">
                    <Button variant="outline" size="lg">
                      Download Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <PopupManager page="blog" />
      </div>
    </>
  );
};

export default BlogDetail;