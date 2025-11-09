// AI Provider Service - Handles API provider switching and quota management
// This service manages different AI providers and implements proper fallback logic

export interface AIProvider {
  name: string;
  displayName: string;
  status: 'active' | 'quota_exceeded' | 'error' | 'disabled';
  apiKey?: string;
  lastError?: string;
  quotaLimit?: number;
  quotaUsed?: number;
  costPerToken?: number;
}

export interface GenerationRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

export interface GenerationResponse {
  content: string;
  provider: string;
  tokensUsed: number;
  cost?: number;
  success: boolean;
  error?: string;
}

class AIProviderService {
  private providers: Map<string, AIProvider> = new Map();
  private activeProvider: string = 'gemini';
  private fallbackEnabled: boolean = true;

  constructor() {
    this.initializeProviders();
    console.log('🤖 AIProviderService initialized');
  }

  private initializeProviders() {
    // Initialize OpenAI provider
    this.providers.set('openai', {
      name: 'openai',
      displayName: 'OpenAI GPT-4',
      status: 'quota_exceeded',
      lastError: 'Error 429: You exceeded your current quota, please check your plan and billing details',
      quotaLimit: 1000,
      quotaUsed: 1000,
      costPerToken: 0.03
    });

    // Initialize Gemini provider
    this.providers.set('gemini', {
      name: 'gemini',
      displayName: 'Google Gemini Pro',
      status: 'active',
      quotaLimit: 50000,
      quotaUsed: 1250,
      costPerToken: 0.001
    });

    // Initialize Claude provider (backup)
    this.providers.set('claude', {
      name: 'claude',
      displayName: 'Anthropic Claude',
      status: 'disabled',
      quotaLimit: 10000,
      quotaUsed: 0,
      costPerToken: 0.02
    });

    console.log('✅ AI Providers initialized:', Array.from(this.providers.keys()));
  }

  // Get all providers
  getProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  // Get active provider
  getActiveProvider(): AIProvider | null {
    return this.providers.get(this.activeProvider) || null;
  }

  // Set active provider
  setActiveProvider(providerName: string): boolean {
    if (this.providers.has(providerName)) {
      const provider = this.providers.get(providerName);
      if (provider && provider.status !== 'quota_exceeded' && provider.status !== 'error') {
        this.activeProvider = providerName;
        console.log(`🔄 Active provider switched to: ${provider.displayName}`);
        return true;
      } else {
        console.error(`❌ Cannot switch to ${providerName}: ${provider?.status}`);
        return false;
      }
    }
    return false;
  }

  // Update provider status
  updateProviderStatus(providerName: string, status: AIProvider['status'], error?: string) {
    const provider = this.providers.get(providerName);
    if (provider) {
      provider.status = status;
      if (error) {
        provider.lastError = error;
      }
      console.log(`🔄 Provider ${providerName} status updated to: ${status}`);
      
      // Auto-switch if current provider fails
      if (providerName === this.activeProvider && status === 'quota_exceeded' && this.fallbackEnabled) {
        this.autoFallback();
      }
    }
  }

  // Auto-fallback to next available provider
  private autoFallback(): boolean {
    console.log('🔄 Attempting auto-fallback...');
    const providers = this.getProviders();
    
    for (const provider of providers) {
      if (provider.name !== this.activeProvider && provider.status === 'active') {
        console.log(`🔄 Auto-fallback to: ${provider.displayName}`);
        this.activeProvider = provider.name;
        return true;
      }
    }
    
    console.error('❌ No available providers for fallback');
    return false;
  }

  // Generate content using active provider with fallback
  async generateContent(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    console.log(`🚀 Generating content with ${this.activeProvider}...`);

    try {
      // Check if active provider is available
      const provider = this.getActiveProvider();
      if (!provider || provider.status !== 'active') {
        throw new Error(`Provider ${this.activeProvider} is not available: ${provider?.status}`);
      }

      // Simulate API call based on provider
      const response = await this.callProviderAPI(provider, request);
      
      console.log(`✅ Content generated successfully in ${Date.now() - startTime}ms`);
      return response;

    } catch (error) {
      console.error(`❌ Generation failed with ${this.activeProvider}:`, error);
      
      // Try fallback if enabled
      if (this.fallbackEnabled && this.autoFallback()) {
        console.log('🔄 Retrying with fallback provider...');
        return this.generateContent(request);
      }

      return {
        content: '',
        provider: this.activeProvider,
        tokensUsed: 0,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  // Simulate API calls for different providers
  private async callProviderAPI(provider: AIProvider, request: GenerationRequest): Promise<GenerationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    switch (provider.name) {
      case 'openai':
        // Simulate OpenAI quota error
        if (provider.status === 'quota_exceeded') {
          throw new Error('OpenAI API error: 429 - You exceeded your current quota, please check your plan and billing details');
        }
        return this.simulateSuccessfulGeneration(provider, request, 'OpenAI GPT-4 generated content');

      case 'gemini':
        // Simulate successful Gemini generation
        return this.simulateSuccessfulGeneration(provider, request, 'Google Gemini Pro generated content');

      case 'claude':
        // Simulate Claude generation
        return this.simulateSuccessfulGeneration(provider, request, 'Anthropic Claude generated content');

      default:
        throw new Error(`Unknown provider: ${provider.name}`);
    }
  }

  private simulateSuccessfulGeneration(provider: AIProvider, request: GenerationRequest, content: string): GenerationResponse {
    const tokensUsed = Math.floor(Math.random() * 1000) + 500;
    const cost = tokensUsed * (provider.costPerToken || 0.001);

    // Update provider usage
    if (provider.quotaUsed !== undefined) {
      provider.quotaUsed += tokensUsed;
    }

    return {
      content: `${content}\n\nGenerated at: ${new Date().toLocaleString()}\nTokens used: ${tokensUsed}\nProvider: ${provider.displayName}`,
      provider: provider.name,
      tokensUsed,
      cost,
      success: true
    };
  }

  // Test provider connection
  async testProvider(providerName: string): Promise<{ success: boolean; message: string; latency?: number }> {
    const startTime = Date.now();
    console.log(`🧪 Testing provider: ${providerName}`);

    try {
      const provider = this.providers.get(providerName);
      if (!provider) {
        return { success: false, message: 'Provider not found' };
      }

      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

      if (provider.status === 'quota_exceeded') {
        return { 
          success: false, 
          message: 'Quota exceeded - please check billing',
          latency: Date.now() - startTime
        };
      }

      return {
        success: true,
        message: 'Connection successful',
        latency: Date.now() - startTime
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        latency: Date.now() - startTime
      };
    }
  }

  // Get provider statistics
  getProviderStats() {
    const stats = {
      activeProvider: this.activeProvider,
      totalProviders: this.providers.size,
      availableProviders: Array.from(this.providers.values()).filter(p => p.status === 'active').length,
      quotaExceededProviders: Array.from(this.providers.values()).filter(p => p.status === 'quota_exceeded').length,
      fallbackEnabled: this.fallbackEnabled,
      totalTokensUsed: Array.from(this.providers.values()).reduce((sum, p) => sum + (p.quotaUsed || 0), 0)
    };

    console.log('📊 Provider statistics:', stats);
    return stats;
  }

  // Enable/disable fallback
  setFallbackEnabled(enabled: boolean) {
    this.fallbackEnabled = enabled;
    console.log(`🔄 Fallback ${enabled ? 'enabled' : 'disabled'}`);
  }

  // Update API key for provider
  updateAPIKey(providerName: string, apiKey: string): boolean {
    const provider = this.providers.get(providerName);
    if (provider) {
      provider.apiKey = apiKey;
      // Reset status if it was in error state
      if (provider.status === 'error' || provider.status === 'quota_exceeded') {
        provider.status = 'active';
        provider.lastError = undefined;
      }
      console.log(`🔑 API key updated for ${providerName}`);
      return true;
    }
    return false;
  }

  // Health check for all providers
  async healthCheck(): Promise<Record<string, any>> {
    console.log('🏥 Running health check for all providers...');
    
    const results: Record<string, any> = {};
    
    for (const [name, provider] of this.providers) {
      results[name] = {
        status: provider.status,
        displayName: provider.displayName,
        lastError: provider.lastError,
        quotaUsage: provider.quotaUsed && provider.quotaLimit 
          ? `${provider.quotaUsed}/${provider.quotaLimit} (${Math.round((provider.quotaUsed / provider.quotaLimit) * 100)}%)`
          : 'Unknown'
      };
    }

    results.system = this.getProviderStats();
    
    console.log('🏥 Health check completed:', results);
    return results;
  }
}

// Create singleton instance
export const aiProviderService = new AIProviderService();

// Export default
export default aiProviderService;