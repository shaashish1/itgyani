import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bot, Loader2, Sparkles, Zap, Clock, Brain, Edit, Download } from "lucide-react";
import BlogPreview from "@/components/BlogPreview";

interface GenerationRequest {
  topic: string;
  category: string;
  tone: 'professional' | 'casual' | 'technical';
  audience: 'beginner' | 'intermediate' | 'advanced';
  length: 'short' | 'medium' | 'long';
  keywords: string[];
  isPremium: boolean;
}

const AIBlogGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingTopic, setIsGeneratingTopic] = useState(false);
  const [generatedBlog, setGeneratedBlog] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [request, setRequest] = useState<GenerationRequest>({
    topic: '',
    category: 'ai-machine-learning',
    tone: 'professional',
    audience: 'intermediate',
    length: 'medium',
    keywords: [],
    isPremium: false
  });
  const [keywordInput, setKeywordInput] = useState('');

  const categories = [
    { value: 'ai-machine-learning', label: 'AI & Machine Learning' },
    { value: 'automation', label: 'Automation' },
    { value: 'n8n-workflows', label: 'n8n Workflows' },
    { value: 'quantum-computing', label: 'Quantum Computing' },
    { value: 'edge-ai', label: 'Edge AI' },
    { value: 'future-tech', label: 'Future Tech' }
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && !request.keywords.includes(keywordInput.trim())) {
      setRequest(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setRequest(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleGenerate = async () => {
    if (!request.topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for the blog post.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedBlog(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-blog', {
        body: {
          ...request,
          adminPassword: 'itgyani2025admin'
        }
      });

      if (error) {
        console.error('Generation error:', error);
        toast({
          title: "Generation failed",
          description: error.message || "Failed to generate blog post. Please try again.",
          variant: "destructive",
        });
      } else if (data?.error) {
        toast({
          title: "Generation failed",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setGeneratedBlog(data.blogPost);
        toast({
          title: "Blog generated successfully! 🎉",
          description: `Generated in ${data.generationTime}`,
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Unexpected error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTopic = async () => {
    if (!request.category) {
      toast({
        title: "Category required",
        description: "Please select a category first.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingTopic(true);
    try {
      const categoryName = categories.find(c => c.value === request.category)?.label || request.category;
      const { data, error } = await supabase.functions.invoke('generate-daily-news-blogs', {
        body: { 
          count: 5,
          topicsOnly: true,
          category: categoryName
        }
      });

      if (error) throw error;

      if (data?.topics && data.topics.length > 0) {
        // Pick a random topic
        const randomTopic = data.topics[Math.floor(Math.random() * data.topics.length)];
        setRequest(prev => ({
          ...prev,
          topic: randomTopic.title,
          keywords: randomTopic.keywords || []
        }));
        toast({
          title: "Topic generated! 💡",
          description: "AI suggested a trending topic for you.",
        });
      }
    } catch (error: any) {
      console.error('Topic generation error:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate topic.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTopic(false);
    }
  };

  const handleSaveEdits = async () => {
    if (!generatedBlog || !editedContent) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ content: editedContent })
        .eq('id', generatedBlog.id);

      if (error) throw error;

      setGeneratedBlog(prev => ({ ...prev, content: editedContent }));
      setEditMode(false);
      toast({
        title: "Changes saved ✓",
        description: "Blog content has been updated.",
      });
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (!generatedBlog) return;

    const markdown = `# ${generatedBlog.title}\n\n${generatedBlog.excerpt}\n\n---\n\n${generatedBlog.content}`;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedBlog.slug || 'blog-post'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded ✓",
      description: "Blog post saved as Markdown file.",
    });
  };

  const handlePublish = async () => {
    if (!generatedBlog) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', generatedBlog.id);

      if (error) {
        toast({
          title: "Publish failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setGeneratedBlog(prev => ({ ...prev, status: 'published' }));
        toast({
          title: "Blog published! 🚀",
          description: "The blog post is now live and visible to users.",
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected error",
        description: "Failed to publish the blog post.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            AI Blog Generator
          </CardTitle>
          <CardDescription>
            Generate SEO-optimized blog content using advanced AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">Blog Topic</Label>
            <div className="flex gap-2">
              <Textarea
                id="topic"
                placeholder="e.g., The Future of Edge AI in Healthcare Applications"
                value={request.topic}
                onChange={(e) => setRequest(prev => ({ ...prev, topic: e.target.value }))}
                rows={3}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateTopic}
                disabled={isGeneratingTopic || isGenerating}
                className="h-auto"
              >
                {isGeneratingTopic ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Click the <Brain className="h-3 w-3 inline" /> button to generate AI topic suggestions
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={request.category}
                onValueChange={(value) => setRequest(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select
                value={request.tone}
                onValueChange={(value: any) => setRequest(prev => ({ ...prev, tone: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Audience</Label>
              <Select
                value={request.audience}
                onValueChange={(value: any) => setRequest(prev => ({ ...prev, audience: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Length</Label>
              <Select
                value={request.length}
                onValueChange={(value: any) => setRequest(prev => ({ ...prev, length: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short (700-900 words)</SelectItem>
                  <SelectItem value="medium">Medium (900-1000 words)</SelectItem>
                  <SelectItem value="long">Long (1000-1200 words)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>SEO Keywords</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add keyword"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button type="button" onClick={addKeyword} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {request.keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="premium"
              checked={request.isPremium}
              onCheckedChange={(checked) => setRequest(prev => ({ ...prev, isPremium: checked }))}
            />
            <Label htmlFor="premium">Premium Content</Label>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Generated Blog Preview
          </CardTitle>
          <CardDescription>
            Preview exactly how your blog will look when published
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="text-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">AI is crafting your content...</p>
            </div>
          ) : generatedBlog ? (
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex gap-2 pb-4 border-b">
                <Button
                  onClick={() => {
                    setEditMode(!editMode);
                    if (!editMode) setEditedContent(generatedBlog.content);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {editMode ? 'Cancel Edit' : 'Edit Content'}
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                {generatedBlog.status === 'draft' && (
                  <Button
                    onClick={handlePublish}
                    size="sm"
                    className="ml-auto"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Publish Now
                  </Button>
                )}
                {generatedBlog.status === 'published' && (
                  <Badge variant="default" className="ml-auto">
                    Published ✓
                  </Badge>
                )}
              </div>

              {/* Edit Mode */}
              {editMode ? (
                <div className="space-y-4">
                  <Label>Edit Content (Markdown)</Label>
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <Button onClick={handleSaveEdits} className="w-full">
                    Save Changes
                  </Button>
                </div>
              ) : (
                /* Full Blog Preview */
                <div className="border rounded-lg p-6 bg-background max-h-[600px] overflow-y-auto">
                  <BlogPreview
                    title={generatedBlog.title}
                    excerpt={generatedBlog.excerpt}
                    content={generatedBlog.content}
                    featuredImage={generatedBlog.featured_image_url}
                    readingTime={generatedBlog.reading_time || 5}
                    category={generatedBlog.category?.name || 'General'}
                    tags={generatedBlog.tags}
                    keywords={generatedBlog.keywords}
                    publishedAt={generatedBlog.published_at || new Date().toLocaleDateString()}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Generate a blog post to see the preview here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIBlogGenerator;