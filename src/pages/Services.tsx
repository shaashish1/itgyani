
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import IntegrationShowcase from "@/components/IntegrationShowcase";
import Footer from "@/components/Footer";


const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Google AdSense Responsive Ad - below header */}
      <div className="flex justify-center py-4">
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
      <main>
        <Hero />
        <IntegrationShowcase />
        {/* Google AdSense Responsive Ad - within content */}
        <div className="flex justify-center py-4">
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
            data-ad-slot="1234567890"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
        <Services />
      </main>
      <Footer />
      {/* Google AdSense script */}
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <script>{`(adsbygoogle = window.adsbygoogle || []).push({});`}</script>
    </div>
  );
};

export default ServicesPage;
