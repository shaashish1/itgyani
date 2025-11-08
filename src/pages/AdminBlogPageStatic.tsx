import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { BlogPostManager } from './BlogPostManager';
import { DailyBlogAutomation } from './DailyBlogAutomation';
import { Settings, BarChart3, BookOpen, Bot } from 'lucide-react';

export function AdminBlogPageStatic() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Blog Administration</h1>
          <p className="text-muted-foreground mt-2">
            Manage your blog content, analytics, and automated generation
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="blogs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Daily Automation
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blogs" className="space-y-6">
            <BlogPostManager />
          </TabsContent>

          {/* Daily Automation Tab */}
          <TabsContent value="automation" className="space-y-6">
            <DailyBlogAutomation />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Settings</CardTitle>
                <CardDescription>
                  Configure your blog preferences and automation settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* SEO Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">SEO Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Default Meta Description
                        </label>
                        <textarea 
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          placeholder="Default meta description for blog posts..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Default Keywords
                        </label>
                        <textarea 
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          placeholder="AI, automation, technology, digital marketing..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Automation Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Automation Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Daily Generation Time
                        </label>
                        <input 
                          type="time" 
                          className="w-full p-2 border rounded-md"
                          defaultValue="09:00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Posts per Day
                        </label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="3">3 posts</option>
                          <option value="5">5 posts</option>
                          <option value="10">10 posts</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* API Configuration */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">API Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          OpenAI API Status
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Connected</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          News API Status
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Connected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Settings */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Content Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Auto-publish generated posts</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Generate featured images</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Enable social media sharing</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span className="text-sm">Send email notifications on generation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}