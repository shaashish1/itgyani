import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <GoogleAd position="contactHeader" />
    <main>
      <GoogleAd position="contactContent" />
      <Contact />
      <GoogleAd position="contactSidebar" />
    </main>
    <Footer />
  </div>
);

export default ContactPage;
