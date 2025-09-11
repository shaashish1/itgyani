
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";


const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GoogleAd position="servicesHeader" />
      <main>
        <Hero />
        <GoogleAd position="servicesContent" />
        <IntegrationShowcase />
        <GoogleAd position="servicesSidebar" />
        <Services />
        <GoogleAd position="servicesContent" />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
