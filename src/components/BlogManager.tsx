/**
 * AI Blog Management Interface
 * 
 * Complete UI for managing AI-generated blogs, scheduling, and content creation
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  Image, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Eye,
  Download,
  Settings,
  BarChart3,
  Lightbulb
} from 'lucide-react';

import { openRouterBlogService, BlogGenerationRequest } from '@/services/openRouterBlog';
import { huggingFaceImageService } from '@/services/huggingFaceImageBrowser';
import { blogSchedulingService, ScheduleRequest, ScheduledBlog } from '@/services/blogSchedulingBrowser';

interface BlogManagerProps {
  className?: string;
}

const BlogManager: React.FC<BlogManagerProps> = ({ className = '' }) => {
  // State management
  const [activeTab, setActiveTab] = useState('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<any>(null);
  const [scheduledBlogs, setScheduledBlogs] = useState<ScheduledBlog[]>([]);
  const [scheduleStats, setScheduleStats] = useState<any>(null);
  
  // Form states
  const [blogForm, setBlogForm] = useState({
    topic: '',
    category: 'technology',
    keywords: '',
    tone: 'professional',
    audience: 'business',
    wordCount: 1500,
    includeImages: true
  });

  const [scheduleForm, setScheduleForm] = useState({
    topic: '',
    category: 'technology',
    frequency: 'weekly' as 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'custom',
    customInterval: { interval: 'days' as 'hours' | 'days' | 'weeks' | 'months', count: 1 },
    startDate: '',
    autoPublish: false,
    keywords: '',
    tone: 'professional',
    audience: 'business'
  });

  const [alerts, setAlerts] = useState<Array<{ type: 'success' | 'error' | 'warning'; message: string }>>([]);

  // Load data on component mount
  useEffect(() => {
    loadScheduledBlogs();
    loadScheduleStats();
  }, []);

  /**
   * Generate a single blog post
   */
  const handleGenerateBlog = async () => {
    if (!blogForm.topic.trim()) {
      addAlert('error', 'Please enter a topic for the blog post');
      return;
    }

    setIsGenerating(true);
    setGeneratedBlog(null);

    try {
      const request: BlogGenerationRequest = {
        topic: blogForm.topic,
        category: blogForm.category,
        keywords: blogForm.keywords.split(',').map(k => k.trim()).filter(k => k),
        tone: blogForm.tone as any,
        audience: blogForm.audience as any,
        wordCount: blogForm.wordCount,
        includeImages: blogForm.includeImages,
        seoOptimized: true
      };

      const result = await openRouterBlogService.generateBlog(request);

      if (result.success && result.data) {
        setGeneratedBlog(result.data);
        addAlert('success', 'Blog generated successfully!');
        
        // Generate images if requested
        if (blogForm.includeImages && result.data.imagePrompts.length > 0) {
          await generateBlogImages(result.data);
        }
      } else {
        addAlert('error', result.error || 'Failed to generate blog');
      }
    } catch (error) {
      addAlert('error', `Error generating blog: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Generate images for a blog
   */
  const generateBlogImages = async (blog: any) => {
    try {
      const images = await huggingFaceImageService.generateBlogImages(
        blog.title,
        blog.category,
        Math.min(blog.imagePrompts.length, 2)
      );

      const successfulImages = images.filter(img => img.success);
      
      if (successfulImages.length > 0) {
        addAlert('success', `Generated ${successfulImages.length} images for the blog`);
        // Update blog with image URLs
        setGeneratedBlog({
          ...blog,
          images: successfulImages.map(img => img.data)
        });
      } else {
        addAlert('warning', 'Failed to generate images, but blog content is ready');
      }
    } catch (error) {
      addAlert('warning', `Image generation failed: ${error.message}`);
    }
  };

  /**
   * Schedule a blog for automated generation
   */
  const handleScheduleBlog = async () => {
    if (!scheduleForm.topic.trim()) {
      addAlert('error', 'Please enter a topic for scheduled blog');
      return;
    }

    try {
      const request: ScheduleRequest = {
        topic: scheduleForm.topic,
        category: scheduleForm.category,
        frequency: scheduleForm.frequency,
        customInterval: scheduleForm.frequency === 'custom' ? scheduleForm.customInterval : undefined,
        startDate: scheduleForm.startDate || undefined,
        autoPublish: scheduleForm.autoPublish,
        keywords: scheduleForm.keywords.split(',').map(k => k.trim()).filter(k => k),
        tone: scheduleForm.tone,
        audience: scheduleForm.audience,
        generateImages: true
      };

      const result = await blogSchedulingService.scheduleBlog(request);

      if (result.success) {
        addAlert('success', 'Blog scheduled successfully!');
        setScheduleForm({
          ...scheduleForm,
          topic: ''
        });
        loadScheduledBlogs();
        loadScheduleStats();
      } else {
        addAlert('error', result.error || 'Failed to schedule blog');
      }
    } catch (error) {
      addAlert('error', `Error scheduling blog: ${error.message}`);
    }
  };

  /**
   * Cancel a scheduled blog
   */
  const handleCancelScheduled = async (id: string) => {
    try {
      const result = await blogSchedulingService.cancelScheduledBlog(id);
      
      if (result.success) {
        addAlert('success', 'Scheduled blog cancelled');
        loadScheduledBlogs();
        loadScheduleStats();
      } else {
        addAlert('error', result.error || 'Failed to cancel scheduled blog');
      }
    } catch (error) {
      addAlert('error', `Error cancelling scheduled blog: ${error.message}`);
    }
  };

  /**
   * Load scheduled blogs
   */
  const loadScheduledBlogs = () => {
    const blogs = blogSchedulingService.getScheduledBlogs();
    setScheduledBlogs(blogs);
  };

  /**
   * Load schedule statistics
   */
  const loadScheduleStats = () => {
    const stats = blogSchedulingService.getScheduleStats();
    setScheduleStats(stats);
  };

  /**
   * Add alert message
   */
  const addAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    const newAlert = { type, message };
    setAlerts(prev => [...prev, newAlert]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert !== newAlert));
    }, 5000);
  };

  /**
   * Get status icon for scheduled blogs
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'generating': return <RotateCcw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'generated': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'published': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  /**
   * Get status badge variant
   */
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'scheduled': return 'secondary';
      case 'generating': return 'default';
      case 'generated': return 'default';
      case 'published': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Alerts */}
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>
              {alert.type === 'success' ? 'Success' : 
               alert.type === 'error' ? 'Error' : 'Warning'}
            </AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Blog</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Blogs</TabsTrigger>
          <TabsTrigger value="manage">Manage Queue</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Generate Single Blog Tab */}
        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Generate Blog Post
              </CardTitle>
              <CardDescription>
                Create a single blog post using AI with customizable parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Blog Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="Enter blog topic..."
                    value={blogForm.topic}
                    onChange={(e) => setBlogForm({...blogForm, topic: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={blogForm.category} onValueChange={(value) => setBlogForm({...blogForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                      <SelectItem value="aiStudio">AI Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Tone</Label>
                  <Select value={blogForm.tone} onValueChange={(value) => setBlogForm({...blogForm, tone: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={blogForm.audience} onValueChange={(value) => setBlogForm({...blogForm, audience: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business Professionals</SelectItem>
                      <SelectItem value="technical">Technical Experts</SelectItem>
                      <SelectItem value="general">General Audience</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  placeholder="AI, automation, digital transformation..."
                  value={blogForm.keywords}
                  onChange={(e) => setBlogForm({...blogForm, keywords: e.target.value})}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="space-y-2">
                  <Label htmlFor="wordCount">Word Count</Label>
                  <Input
                    id="wordCount"
                    type="number"
                    min="500"
                    max="3000"
                    value={blogForm.wordCount}
                    onChange={(e) => setBlogForm({...blogForm, wordCount: parseInt(e.target.value) || 1500})}
                    className="w-32"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="includeImages"
                    checked={blogForm.includeImages}
                    onChange={(e) => setBlogForm({...blogForm, includeImages: e.target.checked})}
                  />
                  <Label htmlFor="includeImages">Generate Images</Label>
                </div>
              </div>

              <Button 
                onClick={handleGenerateBlog} 
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Blog...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Blog Preview */}
          {generatedBlog && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Generated Blog Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{generatedBlog.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{generatedBlog.metaDescription}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(generatedBlog.tags || []).map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <div className="bg-muted/50 p-4 rounded-lg max-h-64 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-foreground">{generatedBlog.content.substring(0, 500)}...</pre>
                </div>

                {generatedBlog.images && generatedBlog.images.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Generated Images:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {(generatedBlog.images || []).map((image: any, index: number) => (
                        <img 
                          key={index}
                          src={image.url} 
                          alt={image.prompt}
                          className="w-full h-32 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Content
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Schedule Blogs Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Schedule Automated Blogs
              </CardTitle>
              <CardDescription>
                Set up recurring blog generation with custom schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduleTopic">Blog Topic *</Label>
                  <Input
                    id="scheduleTopic"
                    placeholder="Enter topic for scheduled blogs..."
                    value={scheduleForm.topic}
                    onChange={(e) => setScheduleForm({...scheduleForm, topic: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="scheduleCategory">Category</Label>
                  <Select value={scheduleForm.category} onValueChange={(value) => setScheduleForm({...scheduleForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="automation">Automation</SelectItem>
                      <SelectItem value="industry">Industry</SelectItem>
                      <SelectItem value="aiStudio">AI Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={scheduleForm.frequency} onValueChange={(value: any) => setScheduleForm({...scheduleForm, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom Interval</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {scheduleForm.frequency === 'custom' && (
                  <div className="space-y-2">
                    <Label>Custom Interval</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={scheduleForm.customInterval.count}
                        onChange={(e) => setScheduleForm({
                          ...scheduleForm,
                          customInterval: {
                            ...scheduleForm.customInterval,
                            count: parseInt(e.target.value) || 1
                          }
                        })}
                        className="w-20"
                      />
                      <Select 
                        value={scheduleForm.customInterval.interval} 
                        onValueChange={(value: any) => setScheduleForm({
                          ...scheduleForm,
                          customInterval: {
                            ...scheduleForm.customInterval,
                            interval: value
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date (Optional)</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={scheduleForm.startDate}
                    onChange={(e) => setScheduleForm({...scheduleForm, startDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoPublish"
                  checked={scheduleForm.autoPublish}
                  onChange={(e) => setScheduleForm({...scheduleForm, autoPublish: e.target.checked})}
                />
                <Label htmlFor="autoPublish">Auto-publish generated blogs</Label>
              </div>

              <Button 
                onClick={handleScheduleBlog}
                className="w-full"
                size="lg"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Blog Series
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manage Queue Tab */}
        <TabsContent value="manage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scheduleStats && (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Scheduled</span>
                    </div>
                    <p className="text-2xl font-bold">{scheduleStats.pendingGeneration}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Generated</span>
                    </div>
                    <p className="text-2xl font-bold">{scheduleStats.generated}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Failed</span>
                    </div>
                    <p className="text-2xl font-bold">{scheduleStats.failed}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Scheduled Blogs Queue
              </CardTitle>
              <CardDescription>
                Manage your scheduled blog generation queue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledBlogs.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No scheduled blogs found</p>
                ) : (
                  (scheduledBlogs || []).map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(blog.status)}
                        <div>
                          <h4 className="font-medium">{blog.topic}</h4>
                          <p className="text-sm text-gray-600">
                            {blog.category} • {new Date(blog.scheduledFor).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusVariant(blog.status)}>
                          {blog.status}
                        </Badge>
                        
                        {blog.status === 'scheduled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelScheduled(blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                        
                        {blog.status === 'generated' && (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Blog Generation Analytics
              </CardTitle>
              <CardDescription>
                Track your AI blog generation performance and costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Generation Success Rate</h4>
                  {scheduleStats && (
                    <div className="space-y-2">
                      <Progress 
                        value={scheduleStats.totalScheduled > 0 ? 
                          ((scheduleStats.generated + scheduleStats.published) / scheduleStats.totalScheduled) * 100 : 0
                        } 
                      />
                      <p className="text-sm text-gray-600">
                        {scheduleStats.generated + scheduleStats.published} successful out of {scheduleStats.totalScheduled} total
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Queue Health</h4>
                  {scheduleStats && (
                    <Badge 
                      variant={
                        scheduleStats.queueHealth === 'good' ? 'default' :
                        scheduleStats.queueHealth === 'warning' ? 'secondary' : 'destructive'
                      }
                    >
                      {scheduleStats.queueHealth.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>

              {scheduleStats?.nextScheduled && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Next Scheduled:</strong> {new Date(scheduleStats.nextScheduled).toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogManager;