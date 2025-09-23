import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark,
  ThumbsUp,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { blogStorageService, BlogPost } from "@/services/blogStorageBrowser";
import { ReadMeButton } from "@/components/ImageComponents";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadBlogPost(slug);
    }
  }, [slug]);

  const loadBlogPost = async (postSlug: string) => {
    try {
      setLoading(true);
      
      // Try to load from storage first
      const result = await blogStorageService.getBlogPost(postSlug);
      
      if (result.success && result.data) {
        setBlogPost(result.data);
        await loadRelatedPosts(result.data.category);
      } else {
        // Fallback to demo content
        const demoPost = getDemoPost(postSlug);
        if (demoPost) {
          setBlogPost(demoPost);
          await loadRelatedPosts(demoPost.category);
        } else {
          navigate('/blog');
        }
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
  };

  const loadRelatedPosts = async (category: string) => {
    try {
      const result = await blogStorageService.listBlogPosts({
        status: 'published',
        category: category,
        limit: 3
      });
      
      if (result.success && result.data) {
        setRelatedPosts(result.data.filter(post => post.slug !== slug));
      } else {
        setRelatedPosts(getDemoRelatedPosts(category));
      }
    } catch (error) {
      setRelatedPosts(getDemoRelatedPosts(category));
    }
  };

  const getDemoPost = (postSlug: string): BlogPost | null => {
    const demoPosts: Record<string, BlogPost> = {
      "ai-automation-guide-2024": {
        id: "demo-1",
        title: "The Ultimate Guide to AI Automation in 2024: Transform Your Business",
        slug: "ai-automation-guide-2024",
        content: `
# The Ultimate Guide to AI Automation in 2024: Transform Your Business

Artificial Intelligence automation has evolved from a futuristic concept to a business necessity. In 2024, companies that embrace AI automation are seeing unprecedented levels of efficiency, cost reduction, and competitive advantage.

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

### 2024-2025 Predictions

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
        author: "ITGYANI AI",
        category: "technology",
        tags: ["AI Automation", "Business Transformation", "ROI", "Strategy"],
        publishedAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
        status: "published",
        metaDescription: "Complete guide to AI automation in 2024 with practical implementation strategies and ROI calculation methods.",
        seo: {
          keywords: ["AI Automation", "Business Transformation", "ROI"],
          openGraph: {
            title: "The Ultimate Guide to AI Automation in 2024",
            description: "Transform your business with AI automation strategies",
            image: "/hero-bg.jpg"
          }
        },
        wordCount: 2500,
        readingTime: 12,
        generatedBy: "Demo Content"
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
        author: "ITGYANI AI",
        category: category,
        tags: ["Getting Started", "Tutorial"],
        publishedAt: new Date("2024-01-20"),
        updatedAt: new Date("2024-01-20"),
        status: "published",
        metaDescription: "Learn to build your first AI automation workflow",
        wordCount: 1500,
        readingTime: 8,
        generatedBy: "Demo Content"
      }
    ];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
      <meta name="keywords" content={blogPost.seo?.keywords?.join(", ")} />
      <meta property="og:title" content={blogPost.seo?.openGraph?.title || blogPost.title} />
      <meta property="og:description" content={blogPost.seo?.openGraph?.description || blogPost.excerpt} />
      <meta property="og:image" content={blogPost.seo?.openGraph?.image || "/hero-bg.jpg"} />
      
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
                    {blogPost.author}
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
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br>') }} />
                </div>
              </div>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="py-16 bg-accent/5">
              <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bold mb-8 text-center">
                    <span className="gradient-text">Related Articles</span>
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedPosts.map((post) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
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
                    ))}
                  </div>
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