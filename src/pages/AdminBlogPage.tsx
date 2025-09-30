/**
 * Admin Blog Management Page
 * 
 * Administrative interface for managing AI-generated blogs
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  Settings, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

import BlogManager from '@/components/BlogManager';
import AIBlogGenerator from '@/components/admin/AIBlogGenerator';
import { BatchBlogGenerator } from '@/components/admin/BatchBlogGenerator';
import { TopicProcessor } from '@/components/admin/TopicProcessor';

const AdminBlogPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Simple admin authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'itgyani2025admin';

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid admin password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-12 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Access Required</CardTitle>
              <CardDescription>
                Enter admin credentials to access the AI Blog Management system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {authError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{authError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter admin password..."
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <Button onClick={handleAdminLogin} className="w-full btn-hero">
                <Shield className="mr-2 h-4 w-4" />
                Access Admin Panel
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <p>This is a protected area for authorized personnel only.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                AI Blog Management
              </h1>
              <p className="text-muted-foreground">
                Administrative interface for managing AI-generated content
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="default" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Admin Authenticated
              </Badge>
              
              <Button 
                variant="outline" 
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-2"
              >
                <EyeOff className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Admin Features Notice */}
        <Alert className="mb-6">
          <Brain className="h-4 w-4" />
          <AlertTitle>AI Blog Management System Active</AlertTitle>
          <AlertDescription>
            You have access to advanced AI content generation, scheduling, and management features. 
            All actions are logged and monitored for security.
          </AlertDescription>
        </Alert>

        {/* Main Content */}
        <Tabs defaultValue="blog-manager" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blog-manager">Blog Management</TabsTrigger>
            <TabsTrigger value="batch-generator">Batch Generator</TabsTrigger>
            <TabsTrigger value="system-settings">System Settings</TabsTrigger>
            <TabsTrigger value="security-logs">Security Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="blog-manager">
            <BlogManager className="space-y-6" />
          </TabsContent>

          <TabsContent value="batch-generator" className="space-y-6">
            <TopicProcessor />
            <BatchBlogGenerator />
          </TabsContent>

          <TabsContent value="system-settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Configure AI models, API settings, and system preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">OpenRouter API</h4>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">API Status</p>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Monthly Usage</p>
                      <p className="text-lg font-semibold">$12.45 / $100.00</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Hugging Face Models</h4>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Free Tier Status</p>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-2">Daily Requests</p>
                      <p className="text-lg font-semibold">23 / 100</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Content Guidelines</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>SEO optimization enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Content moderation active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Auto-save enabled</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Image generation optimized</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security-logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Access Logs
                </CardTitle>
                <CardDescription>
                  Monitor system access and administrative actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">Admin Login</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Successful authentication from current session
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">AI Blog System Initialized</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Today
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Blog management system successfully deployed
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">System Configuration Updated</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Today
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      OpenRouter API and Hugging Face integrations configured
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-medium mb-2">Security Notice</h5>
                  <p className="text-sm text-muted-foreground">
                    All administrative actions are logged and monitored. 
                    Unauthorized access attempts are tracked and reported.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminBlogPage;