import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, Pause, Settings, Zap } from 'lucide-react';

export const DailyBlogAutomation: React.FC = () => {
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);
  const [scheduledPosts] = useState([
    {
      id: '1',
      title: 'Automated: Weekly Crypto Market Analysis',
      scheduledDate: '2024-01-20',
      scheduledTime: '09:00',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Automated: DeFi Protocol Updates',
      scheduledDate: '2024-01-22',
      scheduledTime: '14:30',
      status: 'scheduled'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Daily Blog Automation</h2>
          <p className="text-muted-foreground">Automate your blog post creation and scheduling</p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="automation-toggle">Automation</Label>
          <Switch
            id="automation-toggle"
            checked={isAutomationEnabled}
            onCheckedChange={setIsAutomationEnabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Automation</span>
                <Badge variant={isAutomationEnabled ? "default" : "secondary"}>
                  {isAutomationEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Next Post</span>
                <span className="text-sm text-muted-foreground">Jan 20, 09:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Generated Today</span>
                <Badge variant="outline">2 posts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="post-frequency">Post Frequency</Label>
                <Input id="post-frequency" defaultValue="Daily" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="preferred-time">Preferred Time</Label>
                <Input id="preferred-time" type="time" defaultValue="09:00" className="mt-1" />
              </div>
              <Button className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Update Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full" variant="default">
                <Play className="h-4 w-4 mr-2" />
                Generate Now
              </Button>
              <Button className="w-full" variant="outline">
                <Pause className="h-4 w-4 mr-2" />
                Pause Automation
              </Button>
              <Button className="w-full" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configure Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Posts</CardTitle>
          <CardDescription>
            Upcoming automated blog posts in the queue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Scheduled for {post.scheduledDate} at {post.scheduledTime}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{post.status}</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Automation Settings</CardTitle>
          <CardDescription>
            Configure your blog automation preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="topics">Target Topics</Label>
                <Input id="topics" placeholder="cryptocurrency, defi, nft..." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="tone">Content Tone</Label>
                <Input id="tone" placeholder="Professional, informative..." className="mt-1" />
              </div>
              <div>
                <Label htmlFor="length">Post Length</Label>
                <Input id="length" placeholder="800-1200 words" className="mt-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-publish">Auto Publish</Label>
                <Switch id="auto-publish" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="seo-optimize">SEO Optimization</Label>
                <Switch id="seo-optimize" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="social-share">Auto Social Share</Label>
                <Switch id="social-share" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button>Save Automation Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};