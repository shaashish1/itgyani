// Google Analytics and Search Console integration utilities
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export class AnalyticsManager {
  private static GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID
  private static GTM_ID = 'GTM-XXXXXXX'; // Replace with actual GTM ID
  
  // Initialize Google Analytics 4
  static initializeGA4() {
    // Load gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${this.GA_MEASUREMENT_ID}`;
    document.head.appendChild(gtagScript);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    window.gtag('js', new Date());
    window.gtag('config', this.GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true,
      allow_google_signals: false,
      send_page_view: true
    });

    console.log('Google Analytics 4 initialized');
  }

  // Initialize Google Tag Manager
  static initializeGTM() {
    // GTM script
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${this.GTM_ID}');
    `;
    document.head.appendChild(gtmScript);

    // GTM noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.insertBefore(noscript, document.body.firstChild);
  }

  // Track page views
  static trackPageView(url: string, title: string) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', this.GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title
      });
    }
  }

  // Track blog post reads
  static trackBlogRead(blogId: string, blogTitle: string, category: string) {
    this.trackEvent({
      event_name: 'blog_read',
      event_category: 'Blog',
      event_label: blogTitle,
      custom_parameters: {
        blog_id: blogId,
        blog_category: category,
        content_type: 'blog_post'
      }
    });
  }

  // Track search queries
  static trackSearch(searchTerm: string, resultsCount: number) {
    this.trackEvent({
      event_name: 'search',
      event_category: 'Site Search',
      event_label: searchTerm,
      custom_parameters: {
        search_term: searchTerm,
        results_count: resultsCount
      }
    });
  }

  // Track contact form submissions
  static trackContactForm(formType: string) {
    this.trackEvent({
      event_name: 'form_submit',
      event_category: 'Contact',
      event_label: formType,
      custom_parameters: {
        form_type: formType
      }
    });
  }

  // Track service page views
  static trackServiceView(serviceName: string) {
    this.trackEvent({
      event_name: 'service_view',
      event_category: 'Services',
      event_label: serviceName,
      custom_parameters: {
        service_name: serviceName,
        content_type: 'service_page'
      }
    });
  }

  // Track resource downloads
  static trackResourceDownload(resourceName: string, resourceType: string) {
    this.trackEvent({
      event_name: 'download',
      event_category: 'Resources',
      event_label: resourceName,
      custom_parameters: {
        resource_name: resourceName,
        resource_type: resourceType
      }
    });
  }

  // Generic event tracking
  static trackEvent({
    event_name,
    event_category,
    event_label,
    value,
    custom_parameters = {}
  }: {
    event_name: string;
    event_category: string;
    event_label?: string;
    value?: number;
    custom_parameters?: Record<string, any>;
  }) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', event_name, {
        event_category: event_category,
        event_label: event_label,
        value: value,
        ...custom_parameters
      });
    }

    console.log('Analytics Event:', {
      event_name,
      event_category,
      event_label,
      value,
      custom_parameters
    });
  }

  // Track performance metrics
  static trackPerformance() {
    if ('PerformanceObserver' in window) {
      // Core Web Vitals tracking
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            
            // Track load time
            this.trackEvent({
              event_name: 'timing_complete',
              event_category: 'Performance',
              event_label: 'page_load_time',
              value: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart)
            });

            // Track TTFB (Time to First Byte)
            this.trackEvent({
              event_name: 'timing_complete',
              event_category: 'Performance',
              event_label: 'ttfb',
              value: Math.round(navEntry.responseStart - navEntry.requestStart)
            });
          }
        }
      });

      observer.observe({ entryTypes: ['navigation'] });
    }
  }

  // Setup enhanced ecommerce tracking (for future use)
  static trackPurchase(transactionId: string, value: number, currency: string = 'USD', items: any[] = []) {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: currency,
        items: items
      });
    }
  }

  // Track user engagement
  static trackEngagement(engagementType: string, details: Record<string, any> = {}) {
    this.trackEvent({
      event_name: 'engagement',
      event_category: 'User Engagement',
      event_label: engagementType,
      custom_parameters: details
    });
  }

  // Initialize scroll tracking
  static initializeScrollTracking() {
    let maxScroll = 0;
    let scrollTimer: NodeJS.Timeout;

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track scroll depth milestones
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.trackEvent({
            event_name: 'scroll',
            event_category: 'User Engagement',
            event_label: `${scrollPercent}%_scroll`,
            value: scrollPercent
          });
        }
      }
    };

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(trackScroll, 250);
    });
  }

  // Initialize all analytics
  static initialize() {
    // Initialize analytics platforms
    this.initializeGA4();
    
    // Setup tracking
    this.trackPerformance();
    this.initializeScrollTracking();
    
    // Track initial page view
    this.trackPageView(window.location.pathname, document.title);
    
    console.log('Analytics Manager initialized');
  }
}

// Google Search Console utilities
export class SearchConsoleManager {
  
  // Add Google Search Console verification meta tag
  static addVerificationTag(verificationCode: string) {
    const metaTag = document.createElement('meta');
    metaTag.name = 'google-site-verification';
    metaTag.content = verificationCode;
    document.head.appendChild(metaTag);
  }

  // Submit URLs to Google for indexing
  static async submitUrlForIndexing(url: string) {
    // This would typically be done server-side with proper authentication
    console.log(`URL submitted for indexing: ${url}`);
    
    // Track the submission
    AnalyticsManager.trackEvent({
      event_name: 'url_index_request',
      event_category: 'SEO',
      event_label: url
    });
  }

  // Monitor and report crawl errors
  static reportCrawlError(url: string, errorType: string) {
    console.error(`Crawl error detected: ${errorType} on ${url}`);
    
    AnalyticsManager.trackEvent({
      event_name: 'crawl_error',
      event_category: 'SEO',
      event_label: errorType,
      custom_parameters: {
        error_url: url,
        error_type: errorType
      }
    });
  }

  // Track internal link clicks for user behavior analysis
  static trackInternalLinkClick(linkUrl: string, linkText: string) {
    AnalyticsManager.trackEvent({
      event_name: 'internal_link_click',
      event_category: 'Navigation',
      event_label: linkText,
      custom_parameters: {
        link_url: linkUrl,
        link_text: linkText
      }
    });
  }
}

// Bing Webmaster Tools utilities
export class BingWebmasterManager {
  
  // Add Bing verification meta tag
  static addVerificationTag(verificationCode: string) {
    const metaTag = document.createElement('meta');
    metaTag.name = 'msvalidate.01';
    metaTag.content = verificationCode;
    document.head.appendChild(metaTag);
  }

  // Track for Bing-specific analytics
  static trackBingEvent(eventName: string, details: Record<string, any> = {}) {
    // Bing UET tracking would go here
    console.log(`Bing Event: ${eventName}`, details);
  }
}