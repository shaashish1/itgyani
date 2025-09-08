import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <IntegrationShowcase />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
