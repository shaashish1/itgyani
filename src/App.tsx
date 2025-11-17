import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from 'react-helmet-async';
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary';

// Lazy load pages for better performance
const NewITGyaniIndex = lazy(() => import("./pages/NewITGyaniIndex"));
const Index = lazy(() => import("./pages/Index"));
const FutureFlowIndex = lazy(() => import("./pages/NewFutureFlowIndex"));
const ServicesPage = lazy(() => import("./pages/Services"));
const AIStudio = lazy(() => import("./pages/AIStudio"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const BusinessAutomation = lazy(() => import("./pages/services/BusinessAutomation"));
const AICustomerSupport = lazy(() => import("./pages/services/AICustomerSupport"));
const DataIntegration = lazy(() => import("./pages/services/DataIntegration"));
const EcommerceAutomation = lazy(() => import("./pages/services/EcommerceAutomation"));
const MarketingAutomation = lazy(() => import("./pages/services/MarketingAutomation"));
const SchedulingManagement = lazy(() => import("./pages/services/SchedulingManagement"));
const N8nWorkflow = lazy(() => import("./pages/services/N8nWorkflow"));
const AIStrategyConsulting = lazy(() => import("./pages/services/AIStrategyConsulting"));
const AutomationDetail = lazy(() => import("./pages/automations/AutomationDetail"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const CaseStudyReport = lazy(() => import("./pages/CaseStudyReport"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceDetail = lazy(() => import("./pages/ResourceDetail"));
const WhitepaperDetail = lazy(() => import("./pages/WhitepaperDetail"));
const Academy = lazy(() => import("./pages/Academy"));
const Industries = lazy(() => import("./pages/Industries"));
const Careers = lazy(() => import("./pages/Careers"));
const BlogStatic = lazy(() => import("./pages/BlogStatic"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AdminBlogPage = lazy(() => import("./pages/AdminBlogPageStatic"));
const APIDocumentationPage = lazy(() => import("./pages/APIDocumentationPage"));
const APIBackendDocumentation = lazy(() => import("./pages/APIBackendDocumentation"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const LearningTrackDetail = lazy(() => import("./pages/LearningTrackDetail"));
const ImageShowcase = lazy(() => import("./pages/ImageShowcase"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const UGCVideoCreator = lazy(() => import("./pages/UGCVideoCreator"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component with Skeleton
const PageLoader = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-8 space-y-8">
      <div className="h-16 bg-muted/30 animate-pulse rounded-lg" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video bg-muted/30 animate-pulse rounded-lg" />
            <div className="h-6 bg-muted/30 animate-pulse rounded" />
            <div className="h-4 bg-muted/30 animate-pulse rounded w-3/4" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GlobalErrorBoundary>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<PageLoader />}>
                <Routes>
              <Route path="/" element={<NewITGyaniIndex />} />
              <Route path="/old" element={<Index />} />
              <Route path="/future-flow" element={<FutureFlowIndex />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/ai-studio" element={<AIStudio />} />
              <Route path="/services/business-automation" element={<BusinessAutomation />} />
              <Route path="/services/ai-customer-support" element={<AICustomerSupport />} />
              <Route path="/services/data-integration" element={<DataIntegration />} />
              <Route path="/services/ecommerce-automation" element={<EcommerceAutomation />} />
              <Route path="/services/marketing-automation" element={<MarketingAutomation />} />
              <Route path="/services/scheduling-management" element={<SchedulingManagement />} />
              <Route path="/services/n8n-workflow" element={<N8nWorkflow />} />
              <Route path="/services/ai-strategy-consulting" element={<AIStrategyConsulting />} />
              <Route path="/automation/:toolName" element={<AutomationDetail />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
              <Route path="/case-studies/:id/report" element={<CaseStudyReport />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:id" element={<ResourceDetail />} />
              <Route path="/whitepapers/:id" element={<WhitepaperDetail />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/learning-track/:trackId" element={<LearningTrackDetail />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blog" element={<BlogStatic />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/admin/blog" element={<AdminBlogPage />} />
              <Route path="/api-docs" element={<APIDocumentationPage />} />
              <Route path="/backend-api" element={<APIBackendDocumentation />} />
              <Route path="/images" element={<ImageShowcase />} />
              <Route path="/ugc-video-creator" element={<UGCVideoCreator />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </GlobalErrorBoundary>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;