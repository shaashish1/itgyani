
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
      <GoogleAd adSlot="1234567891" />
      <main>
        <Hero />
        <IntegrationShowcase />
        <GoogleAd adSlot="1234567892" />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
