import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  Calendar,
  FileText
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  created_at: string;
  category_id: string | null;
  category_name?: string;
  featured_image_url: string | null;
  views: number;
  likes: number;
  reading_time: number;
}

export const BlogPostManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadBlogPosts();
  }, [statusFilter]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      
      // Optimized query without JOIN - fetch only essential fields
      let query = supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, status, created_at, published_at, category_id, featured_image_url, views, likes, reading_time')
        .order('created_at', { ascending: false })
        .limit(50); // Reduced limit for better performance

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Fetch categories separately if needed
      if (data && data.length > 0) {
        const categoryIds = [...new Set(data.map(p => p.category_id).filter(Boolean))];
        
        if (categoryIds.length > 0) {
          const { data: categoriesData } = await supabase
            .from('categories')
            .select('id, name')
            .in('id', categoryIds);
          
          const categoryMap = new Map(categoriesData?.map(c => [c.id, c.name]) || []);
          
          // Merge category names
          const postsWithCategories = data.map(post => ({
            ...post,
            category_name: categoryMap.get(post.category_id) || 'Uncategorized'
          }));
          
          setBlogPosts(postsWithCategories);
        } else {
          setBlogPosts(data.map(p => ({ ...p, category_name: 'Uncategorized' })));
        }
      } else {
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post published successfully"
      });

      loadBlogPosts();
    } catch (error) {
      console.error('Error publishing blog:', error);
      toast({
        title: "Error",
        description: "Failed to publish blog post",
        variant: "destructive"
      });
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ 
          status: 'draft',
          published_at: null
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post unpublished successfully"
      });

      loadBlogPosts();
    } catch (error) {
      console.error('Error unpublishing blog:', error);
      toast({
        title: "Error",
        description: "Failed to unpublish blog post",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post deleted successfully"
      });

      loadBlogPosts();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    draft: blogPosts.filter(p => p.status === 'draft').length,
    withImages: blogPosts.filter(p => p.featured_image_url).length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Blogs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
            <p className="text-xs text-muted-foreground">Published</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
            <p className="text-xs text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.withImages}</div>
            <p className="text-xs text-muted-foreground">With Images</p>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                All Blog Posts
              </CardTitle>
              <CardDescription>
                Manage all blog posts with publish/unpublish controls
              </CardDescription>
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('all')}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('draft')}
                size="sm"
              >
                Drafts
              </Button>
              <Button
                variant={statusFilter === 'published' ? 'default' : 'outline'}
                onClick={() => setStatusFilter('published')}
                size="sm"
              >
                Published
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No blog posts found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {post.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {post.category_name || 'Uncategorized'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                      >
                        {post.status === 'published' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Calendar className="h-3 w-3 mr-1" />
                        )}
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {post.featured_image_url ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          ✓ Has Image
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500">
                          No Image
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {post.status === 'draft' ? (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handlePublish(post.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Publish
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnpublish(post.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Unpublish
                          </Button>
                        )}
                        
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
