import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import FutureFlowIndex from "./pages/FutureFlowIndex";
import ServicesPage from "./pages/Services";
import AIStudio from "./pages/AIStudio";
import AuthPage from "./components/auth/AuthPage";
import BusinessAutomation from "./pages/services/BusinessAutomation";
import AICustomerSupport from "./pages/services/AICustomerSupport";
import DataIntegration from "./pages/services/DataIntegration";
import EcommerceAutomation from "./pages/services/EcommerceAutomation";
import MarketingAutomation from "./pages/services/MarketingAutomation";
import SchedulingManagement from "./pages/services/SchedulingManagement";
import N8nWorkflow from "./pages/services/N8nWorkflow";
import AIStrategyConsulting from "./pages/services/AIStrategyConsulting";
import AutomationDetail from "./pages/automations/AutomationDetail";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CaseStudyReport from "./pages/CaseStudyReport";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import WhitepaperDetail from "./pages/WhitepaperDetail";
import Academy from "./pages/Academy";
import Industries from "./pages/Industries";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import AdminBlogPage from "./pages/AdminBlogPage";
import CourseDetail from "./pages/CourseDetail";
import ImageShowcase from "./pages/ImageShowcase";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<FutureFlowIndex />} />
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
            <Route path="/industries" element={<Industries />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin/blog" element={<AdminBlogPage />} />
            <Route path="/images" element={<ImageShowcase />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
