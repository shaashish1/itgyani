import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <Contact />
      <GoogleAd position="contact-post" />
    </main>
    <Footer />
  </div>
);

export default ContactPage;
