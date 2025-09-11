import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <GoogleAd adSlot="1234567894" />
    <main>
      <Contact />
    </main>
    <Footer />
  </div>
);

export default ContactPage;
