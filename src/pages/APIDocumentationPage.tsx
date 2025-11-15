import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Activity, 
  Zap, 
  Brain, 
  Search, 
  FileText, 
  Settings, 
  Play, 
  CheckCircle, 
  XCircle,
  Copy,
  Loader2,
  Cpu,
  Database,
  Cloud,
  Monitor
} from 'lucide-react';

interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  category: string;
  status: 'active' | 'deprecated' | 'beta';
  params?: any;
  example?: any;
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'loading';
  endpoint: string;
  icon: React.ReactNode;
  description: string;
}

const APIDocumentationPage: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [testResponse, setTestResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatuses, setServiceStatuses] = useState<ServiceStatus[]>([
    {
      name: 'AI Models API',
      status: 'loading',
      endpoint: 'http://localhost:8082/api/ai',
      icon: <Brain className="w-4 h-4" />,
      description: 'Local AI processing with Nexa SDK'
    },
    {
      name: 'N8N Toolkit API',
      status: 'loading', 
      endpoint: 'http://localhost:8082/api/v1',
      icon: <Settings className="w-4 h-4" />,
      description: 'Media processing and automation tools'
    }
  ]);

  const aiEndpoints: ApiEndpoint[] = [
    {
      path: '/api/ai/health',
      method: 'GET',
      description: 'Check AI service health status',
      category: 'System',
      status: 'active',
      example: { success: true, status: 'healthy' }
    },
    {
      path: '/api/ai/status',
      method: 'GET', 
      description: 'Get comprehensive AI services status',
      category: 'System',
      status: 'active',
      example: { success: true, services: { local_ai: true, rag: true, mcp: true } }
    },
    {
      path: '/api/ai/capabilities',
      method: 'GET',
      description: 'List available AI capabilities and models',
      category: 'System', 
      status: 'active',
      example: { text_generation: true, rag: true, multimodal: false }
    },
    {
      path: '/api/ai/generate',
      method: 'POST',
      description: 'Generate text using local AI models',
      category: 'Generation',
      status: 'active',
      params: { prompt: 'string', max_tokens: 'number', temperature: 'number' },
      example: { prompt: 'What are the benefits of local AI?', max_tokens: 500 }
    },
    {
      path: '/api/ai/blog/generate',
      method: 'POST',
      description: 'Generate blog content with AI',
      category: 'Generation',
      status: 'active',
      params: { topic: 'string', type: 'string', tone: 'string', keywords: 'array' },
      example: { topic: 'Local AI Benefits', type: 'article', tone: 'professional' }
    },
    {
      path: '/api/ai/rag/query',
      method: 'POST',
      description: 'Query knowledge base using RAG',
      category: 'Knowledge',
      status: 'beta',
      params: { query: 'string', top_k: 'number' },
      example: { query: 'How does local AI work?', top_k: 5 }
    },
    {
      path: '/api/ai/rag/add-document',
      method: 'POST',
      description: 'Add document to knowledge base',
      category: 'Knowledge',
      status: 'beta',
      params: { content: 'string', metadata: 'object' },
      example: { content: 'AI documentation...', metadata: { type: 'guide' } }
    },
    {
      path: '/api/ai/enhanced/query',
      method: 'POST',
      description: 'Enhanced query using RAG + AI + MCP',
      category: 'Advanced',
      status: 'beta',
      params: { query: 'string', use_rag: 'boolean', max_tokens: 'number' },
      example: { query: 'Explain local AI setup', use_rag: true }
    }
  ];

  const toolkitEndpoints: ApiEndpoint[] = [
    {
      path: '/api/v1/toolkit/test',
      method: 'GET',
      description: 'Test toolkit service connectivity',
      category: 'System',
      status: 'active',
      example: { success: true, message: 'Toolkit operational' }
    },
    {
      path: '/api/v1/toolkit/authenticate',
      method: 'POST',
      description: 'Authenticate API requests',
      category: 'Auth',
      status: 'active',
      params: { api_key: 'string' }
    },
    {
      path: '/api/v1/toolkit/job_status',
      method: 'GET',
      description: 'Check job processing status',
      category: 'Jobs',
      status: 'active',
      params: { job_id: 'string' }
    },
    {
      path: '/api/v1/video/trim',
      method: 'POST',
      description: 'Trim video files',
      category: 'Video',
      status: 'active',
      params: { video_url: 'string', start_time: 'number', end_time: 'number' }
    },
    {
      path: '/api/v1/video/concatenate',
      method: 'POST',
      description: 'Concatenate multiple videos',
      category: 'Video',
      status: 'active',
      params: { video_urls: 'array', output_format: 'string' }
    },
    {
      path: '/api/v1/video/thumbnail',
      method: 'POST',
      description: 'Generate video thumbnails',
      category: 'Video',
      status: 'active',
      params: { video_url: 'string', timestamp: 'number' }
    },
    {
      path: '/api/v1/audio/concatenate',
      method: 'POST',
      description: 'Concatenate audio files',
      category: 'Audio',
      status: 'active',
      params: { audio_urls: 'array', output_format: 'string' }
    },
    {
      path: '/api/v1/media/convert',
      method: 'POST',
      description: 'Convert media files between formats',
      category: 'Media',
      status: 'active',
      params: { media_url: 'string', target_format: 'string' }
    },
    {
      path: '/api/v1/s3/upload',
      method: 'POST',
      description: 'Upload files to S3 storage',
      category: 'Storage',
      status: 'active',
      params: { file: 'file', bucket: 'string', key: 'string' }
    }
  ];

  const allEndpoints = [...aiEndpoints, ...toolkitEndpoints];

  // Check service status on mount
  useEffect(() => {
    checkServiceStatuses();
  }, []);

  const checkServiceStatuses = async () => {
    const updatedStatuses = await Promise.all(
      serviceStatuses.map(async (service) => {
        try {
          const healthEndpoint = service.name === 'AI Models API' 
            ? `${service.endpoint}/health`
            : `${service.endpoint}/toolkit/test`;
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(healthEndpoint, { 
            method: 'GET',
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          return {
            ...service,
            status: response.ok ? 'online' as const : 'offline' as const
          };
        } catch (error) {
          return {
            ...service,
            status: 'offline' as const
          };
        }
      })
    );
    
    setServiceStatuses(updatedStatuses);
  };

  const testEndpoint = async (endpoint: ApiEndpoint) => {
    setIsLoading(true);
    setSelectedEndpoint(endpoint);
    
    try {
      const baseUrl = endpoint.path.startsWith('/api/ai') 
        ? 'http://localhost:8082'
        : 'http://localhost:8082';
      
      const url = `${baseUrl}${endpoint.path}`;
      const options: RequestInit = {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (endpoint.method === 'POST' && endpoint.example) {
        options.body = JSON.stringify(endpoint.example);
      }

      const response = await fetch(url, options);
      const data = await response.json();
      
      setTestResponse({
        status: response.status,
        statusText: response.statusText,
        data: data
      });
    } catch (error) {
      setTestResponse({
        status: 'Error',
        statusText: 'Network Error',
        data: { error: error.message }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'POST':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'PUT':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'DELETE':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'beta':
        return 'bg-yellow-100 text-yellow-700';
      case 'deprecated':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              API Documentation Center
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation for AI Models API and N8N Toolkit API endpoints
          </p>
        </div>

        {/* Service Status Dashboard */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Service Status Dashboard</span>
            </CardTitle>
            <CardDescription>
              Real-time status of all API services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceStatuses.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                      <p className="text-xs text-gray-400 font-mono">{service.endpoint}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(service.status)}
                    <span className={`text-sm font-medium ${
                      service.status === 'online' ? 'text-green-600' :
                      service.status === 'offline' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {service.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={checkServiceStatuses} 
                variant="outline" 
                size="sm"
                className="flex items-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Refresh Status</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoints List */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="ai" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm">
                <TabsTrigger value="ai" className="flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Models API</span>
                </TabsTrigger>
                <TabsTrigger value="toolkit" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>N8N Toolkit API</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-4">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                      <span>AI Models API Endpoints</span>
                    </CardTitle>
                    <CardDescription>
                      Local AI processing with Nexa SDK integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiEndpoints.map((endpoint, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={`${getMethodColor(endpoint.method)} border font-mono text-xs`}>
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                {endpoint.path}
                              </code>
                              <Badge className={`${getStatusColor(endpoint.status)} text-xs`}>
                                {endpoint.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {endpoint.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`)}
                              className="flex items-center space-x-1"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => testEndpoint(endpoint)}
                              disabled={isLoading}
                              className="flex items-center space-x-1"
                            >
                              {isLoading && selectedEndpoint?.path === endpoint.path ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                              <span>Test</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="toolkit" className="space-y-4">
                <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-purple-500" />
                      <span>N8N Toolkit API Endpoints</span>
                    </CardTitle>
                    <CardDescription>
                      Media processing and automation tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {toolkitEndpoints.map((endpoint, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={`${getMethodColor(endpoint.method)} border font-mono text-xs`}>
                                {endpoint.method}
                              </Badge>
                              <code className="text-sm font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                                {endpoint.path}
                              </code>
                              <Badge className={`${getStatusColor(endpoint.status)} text-xs`}>
                                {endpoint.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {endpoint.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(`${endpoint.method} ${endpoint.path}`)}
                              className="flex items-center space-x-1"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => testEndpoint(endpoint)}
                              disabled={isLoading}
                              className="flex items-center space-x-1"
                            >
                              {isLoading && selectedEndpoint?.path === endpoint.path ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                              <span>Test</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Test Panel */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>API Tester</span>
                </CardTitle>
                <CardDescription>
                  Test endpoints and view responses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEndpoint ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Testing Endpoint</h4>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={`${getMethodColor(selectedEndpoint.method)} border text-xs`}>
                            {selectedEndpoint.method}
                          </Badge>
                          <code className="text-sm font-mono text-gray-700">
                            {selectedEndpoint.path}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">{selectedEndpoint.description}</p>
                      </div>
                    </div>

                    {selectedEndpoint.params && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Parameters</h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <pre className="text-xs text-gray-700 font-mono">
                            {JSON.stringify(selectedEndpoint.params, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {testResponse && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">Status:</span>
                            <Badge className={
                              typeof testResponse.status === 'number' && testResponse.status < 400
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }>
                              {testResponse.status} {testResponse.statusText}
                            </Badge>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg max-h-60 overflow-auto">
                            <pre className="text-xs text-gray-700 font-mono">
                              {JSON.stringify(testResponse.data, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Alert>
                    <Activity className="w-4 h-4" />
                    <AlertDescription>
                      Select an endpoint from the list to test it here. The tester will show you the request parameters and response data.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">API Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{aiEndpoints.length}</div>
                      <div className="text-sm opacity-90">AI Endpoints</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{toolkitEndpoints.length}</div>
                      <div className="text-sm opacity-90">Toolkit Endpoints</div>
                    </div>
                  </div>
                  <div className="text-center pt-2 border-t border-white/20">
                    <div className="text-3xl font-bold">{allEndpoints.length}</div>
                    <div className="text-sm opacity-90">Total Endpoints</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentationPage;