import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  DollarSign, 
  Zap,
  Clock,
  BarChart3,
  TrendingDown,
  Activity
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AnalyticsData {
  totalViews: number;
  totalLikes: number;
  totalBlogs: number;
  publishedBlogs: number;
  avgReadingTime: number;
  totalCost: number;
  avgCostPerBlog: number;
  topBlogs: Array<{
    id: string;
    title: string;
    views: number;
    likes: number;
    category: string;
    engagement: number;
  }>;
  categoryStats: Array<{
    category: string;
    count: number;
    views: number;
    avgViews: number;
  }>;
  recentGeneration: Array<{
    date: string;
    blogs: number;
    cost: number;
    tokens: number;
  }>;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch blog statistics
      const { data: blogs, error: blogsError } = await supabase
        .from('blog_posts')
        .select('id, title, views, likes, reading_time, category_id, created_at');

      if (blogsError) throw blogsError;

      // Fetch categories
      const categoryIds = [...new Set(blogs?.map(b => b.category_id).filter(Boolean) || [])];
      const { data: categories } = await supabase
        .from('categories')
        .select('id, name')
        .in('id', categoryIds);

      const categoryMap = new Map(categories?.map(c => [c.id, c.name]) || []);

      // Fetch generation costs
      const { data: costs, error: costsError } = await supabase
        .from('ai_generation_logs')
        .select('tokens_used, created_at, status')
        .eq('status', 'success');

      if (costsError) throw costsError;

      // Calculate metrics
      const totalViews = blogs?.reduce((sum, b) => sum + (b.views || 0), 0) || 0;
      const totalLikes = blogs?.reduce((sum, b) => sum + (b.likes || 0), 0) || 0;
      const publishedBlogs = blogs?.filter(b => b.views !== null).length || 0;
      const avgReadingTime = blogs?.reduce((sum, b) => sum + (b.reading_time || 0), 0) / (blogs?.length || 1);

      // Cost calculations (OpenAI pricing: ~$0.01 per 1K tokens for GPT-4o-mini)
      const totalTokens = costs?.reduce((sum, c) => sum + (c.tokens_used || 0), 0) || 0;
      const totalCost = (totalTokens / 1000) * 0.01; // $0.01 per 1K tokens
      const avgCostPerBlog = totalCost / (publishedBlogs || 1);

      // Top performing blogs
      const topBlogs = blogs
        ?.map(b => ({
          id: b.id,
          title: b.title,
          views: b.views || 0,
          likes: b.likes || 0,
          category: categoryMap.get(b.category_id) || 'General',
          engagement: ((b.views || 0) + (b.likes || 0) * 5) // Engagement score: views + likes*5
        }))
        .sort((a, b) => b.engagement - a.engagement)
        .slice(0, 10) || [];

      // Category statistics
      const categoryStats = Array.from(
        blogs?.reduce((acc, blog) => {
          const cat = categoryMap.get(blog.category_id) || 'General';
          if (!acc.has(cat)) {
            acc.set(cat, { category: cat, count: 0, views: 0 });
          }
          const stats = acc.get(cat)!;
          stats.count++;
          stats.views += blog.views || 0;
          return acc;
        }, new Map<string, { category: string; count: number; views: number }>()) || new Map()
      ).map(([_, stats]) => ({
        ...stats,
        avgViews: stats.views / stats.count
      })).sort((a, b) => b.views - a.views);

      // Recent generation activity (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentCosts = costs?.filter(c => new Date(c.created_at) >= sevenDaysAgo) || [];
      const recentBlogs = blogs?.filter(b => new Date(b.created_at) >= sevenDaysAgo) || [];

      const recentGeneration = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const dayBlogs = recentBlogs.filter(b => 
          new Date(b.created_at).toDateString() === date.toDateString()
        );
        const dayCosts = recentCosts.filter(c => 
          new Date(c.created_at).toDateString() === date.toDateString()
        );
        const dayTokens = dayCosts.reduce((sum, c) => sum + (c.tokens_used || 0), 0);
        
        return {
          date: dateStr,
          blogs: dayBlogs.length,
          cost: (dayTokens / 1000) * 0.01,
          tokens: dayTokens
        };
      });

      setAnalytics({
        totalViews,
        totalLikes,
        totalBlogs: blogs?.length || 0,
        publishedBlogs,
        avgReadingTime,
        totalCost,
        avgCostPerBlog,
        topBlogs,
        categoryStats,
        recentGeneration
      });

    } catch (error) {
      console.error('Error loading analytics:', error);
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200/50 bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-500" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {analytics.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {analytics.publishedBlogs} blogs
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200/50 bg-gradient-to-br from-purple-50/50 to-background dark:from-purple-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ThumbsUp className="h-4 w-4 text-purple-500" />
              Total Likes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {analytics.totalLikes.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((analytics.totalLikes / analytics.totalViews) * 100).toFixed(1)}% engagement rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200/50 bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(analytics.totalCost)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(analytics.avgCostPerBlog)} per blog
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200/50 bg-gradient-to-br from-orange-50/50 to-background dark:from-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              Avg Reading Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {analytics.avgReadingTime.toFixed(1)} min
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.totalBlogs} total blogs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Last 7 Days Activity
          </CardTitle>
          <CardDescription>Blog generation and cost tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.recentGeneration.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{day.date}</Badge>
                  <span className="text-sm">
                    {day.blogs} {day.blogs === 1 ? 'blog' : 'blogs'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{day.tokens.toLocaleString()} tokens</span>
                  <span className="font-medium text-foreground">{formatCurrency(day.cost)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Blogs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Top Performing Blogs
          </CardTitle>
          <CardDescription>Based on views and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Likes</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.topBlogs.map((blog, index) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium max-w-md truncate">
                    <div className="flex items-center gap-2">
                      {index < 3 && (
                        <Badge variant="secondary" className="h-5 w-5 p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                      )}
                      {blog.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{blog.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{blog.views.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{blog.likes.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">{blog.engagement.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Category Performance
          </CardTitle>
          <CardDescription>Views and blog count by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.categoryStats.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Badge variant="outline">{cat.category}</Badge>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-purple-600"
                      style={{ 
                        width: `${(cat.views / analytics.categoryStats[0].views) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-muted-foreground">{cat.count} posts</span>
                  <span className="font-medium">{cat.views.toLocaleString()} views</span>
                  <span className="text-muted-foreground">{cat.avgViews.toFixed(0)} avg</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
