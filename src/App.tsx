import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import AIStudio from "./pages/AIStudio";
import BusinessAutomation from "./pages/services/BusinessAutomation";
import AICustomerSupport from "./pages/services/AICustomerSupport";
import DataIntegration from "./pages/services/DataIntegration";
import EcommerceAutomation from "./pages/services/EcommerceAutomation";
import MarketingAutomation from "./pages/services/MarketingAutomation";
import SchedulingManagement from "./pages/services/SchedulingManagement";
import AutomationDetail from "./pages/automations/AutomationDetail";
import CaseStudies from "./pages/CaseStudies";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/ai-studio" element={<AIStudio />} />
            <Route path="/services/business-automation" element={<BusinessAutomation />} />
            <Route path="/services/ai-customer-support" element={<AICustomerSupport />} />
            <Route path="/services/data-integration" element={<DataIntegration />} />
            <Route path="/services/ecommerce-automation" element={<EcommerceAutomation />} />
            <Route path="/services/marketing-automation" element={<MarketingAutomation />} />
            <Route path="/services/scheduling-management" element={<SchedulingManagement />} />
            <Route path="/automation/:toolName" element={<AutomationDetail />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
