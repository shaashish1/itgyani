/**
 * Admin Blog Management Page - Static Version
 * 
 * Administrative interface for managing static blogs
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { blogService } from '@/services/blogService';
import { 
  Shield, 
  Settings, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff,
  Key,
  Save,
  Sparkles,
  Zap,
  LayoutDashboard,
  FileText,
  PenTool,
  Layers,
  LogOut,
  Menu,
  X,
  Calendar,
  TrendingUp,
  BookOpen,
  Tag
} from 'lucide-react';

const AdminBlogPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing session
    return localStorage.getItem('adminAuthenticated') === 'true';
  });
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [blogStats, setBlogStats] = useState({
    total: 0,
    categories: {},
    recentCount: 0,
    avgReadTime: 0
  });
  const { toast } = useToast();

  // Simple admin authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'itgyani2025admin';

  useEffect(() => {
    if (isAuthenticated) {
      loadBlogData();
    }
  }, [isAuthenticated]);

  const loadBlogData = async () => {
    try {
      const allBlogs = await blogService.getAllBlogs();
      setBlogs(allBlogs);
      
      // Calculate statistics
      const stats = {
        total: allBlogs.length,
        categories: {},
        recentCount: 0,
        avgReadTime: 0
      };

      let totalReadTime = 0;
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      allBlogs.forEach(blog => {
        // Count categories
        stats.categories[blog.category] = (stats.categories[blog.category] || 0) + 1;
        
        // Count recent blogs (last week)
        if (new Date(blog.date) > oneWeekAgo) {
          stats.recentCount++;
        }
        
        // Calculate average read time
        totalReadTime += blog.readTime || 5;
      });

      stats.avgReadTime = Math.round(totalReadTime / allBlogs.length);
      setBlogStats(stats);
    } catch (error) {
      console.error('Error loading blog data:', error);
      toast({
        title: "Error",
        description: "Failed to load blog data",
        variant: "destructive"
      });
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setAuthError('');
      loadBlogData();
    } else {
      setAuthError('Invalid admin password');
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
    setBlogs([]);
    setBlogStats({ total: 0, categories: {}, recentCount: 0, avgReadTime: 0 });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
            <CardDescription>Enter admin password to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter admin password"
                className="w-full"
              />
            </div>
            {authError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            <Button 
              onClick={handleAdminLogin} 
              className="w-full"
              disabled={!adminPassword}
            >
              <Lock className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-3xl font-bold text-blue-600">{blogStats.total}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-green-600">{Object.keys(blogStats.categories).length}</p>
              </div>
              <Tag className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Blogs</p>
                <p className="text-3xl font-bold text-purple-600">{blogStats.recentCount}</p>
                <p className="text-xs text-gray-500">Last 7 days</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Read Time</p>
                <p className="text-3xl font-bold text-orange-600">{blogStats.avgReadTime}m</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>Number of blogs per category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(blogStats.categories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / blogStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blogs</CardTitle>
            <CardDescription>Latest published blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blogs.slice(0, 5).map((blog, index) => (
                <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{blog.title}</p>
                    <p className="text-xs text-gray-500">{blog.date}</p>
                  </div>
                  <Badge variant="secondary">{blog.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBlogManager = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blog Management</CardTitle>
          <CardDescription>Manage your static blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Static Blog System</AlertTitle>
            <AlertDescription>
              This system uses static JSON files. To add new blogs, update the blogs.ts file and rebuild the application.
            </AlertDescription>
          </Alert>
          
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">Blog Structure</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Each blog contains title, content, category, date, and metadata
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">SEO Optimized</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    All blogs include meta descriptions, keywords, and structured data
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium">Performance</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Static files ensure fast loading and optimal SEO performance
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>Complete list of blog posts in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {blogs.map((blog, index) => (
              <div key={blog.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{blog.title}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">{blog.date}</span>
                    <Badge variant="outline" className="text-xs">{blog.category}</Badge>
                    <span className="text-xs text-gray-500">{blog.readTime || 5}min read</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">#{index + 1}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const sidebarItems = [
    { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
    { id: 'blogs', label: 'Blog Manager', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${!sidebarOpen && 'px-2'}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="w-4 h-4" />
                {sidebarOpen && <span className="ml-2">{item.label}</span>}
              </Button>
            ))}
          </div>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="outline"
            onClick={handleSignOut}
            className={`w-full ${!sidebarOpen && 'px-2'}`}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'analytics' && 'Analytics Dashboard'}
              {activeTab === 'blogs' && 'Blog Management'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
            <p className="text-gray-600 mt-2">
              {activeTab === 'analytics' && 'Overview of your blog performance and statistics'}
              {activeTab === 'blogs' && 'Manage your blog posts and content'}
              {activeTab === 'settings' && 'Configure your admin panel settings'}
            </p>
          </div>

          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'blogs' && renderBlogManager()}
          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Admin panel configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Settings className="h-4 w-4" />
                  <AlertTitle>Static Configuration</AlertTitle>
                  <AlertDescription>
                    Settings are managed through environment variables and build configuration.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;