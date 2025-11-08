import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Search, Filter } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  publishedAt: string;
  views: number;
}

const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with Cryptocurrency Trading',
    excerpt: 'Learn the fundamentals of cryptocurrency trading...',
    category: 'Cryptocurrency',
    status: 'Published',
    publishedAt: '2024-01-15',
    views: 15420
  },
  {
    id: '2',
    title: 'Bitcoin Price Analysis: What to Expect in 2024',
    excerpt: 'Comprehensive analysis of Bitcoin price trends...',
    category: 'Cryptocurrency',
    status: 'Published',
    publishedAt: '2024-01-12',
    views: 28950
  }
];

export const BlogPostManager: React.FC = () => {
  const [blogs] = useState<Blog[]>(sampleBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Post Manager</h2>
          <p className="text-muted-foreground">Manage your blog posts and content</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Blog Posts</CardTitle>
              <CardDescription>
                View and manage your published and draft blog posts
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{blog.excerpt}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{blog.category}</Badge>
                    <span>Status: {blog.status}</span>
                    <span>Published: {blog.publishedAt}</span>
                    <span>Views: {blog.views.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common blog management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-4 h-auto">
              <div className="text-center">
                <Plus className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Create New Post</div>
                <div className="text-sm text-muted-foreground">Start writing a new blog post</div>
              </div>
            </Button>
            <Button variant="outline" className="p-4 h-auto">
              <div className="text-center">
                <Edit className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Edit Drafts</div>
                <div className="text-sm text-muted-foreground">Continue working on drafts</div>
              </div>
            </Button>
            <Button variant="outline" className="p-4 h-auto">
              <div className="text-center">
                <Filter className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold">Manage Categories</div>
                <div className="text-sm text-muted-foreground">Organize blog categories</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};