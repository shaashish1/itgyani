
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";


const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <IntegrationShowcase />
        <Services />
      </main>
      <Footer />
      
      {/* Popup Advertisement System */}
      <PopupManager page="services" />
    </div>
  );
};

export default ServicesPage;
