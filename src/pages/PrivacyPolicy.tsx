import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Privacy Policy - AI Automation Data Protection | ITGYANI</title>
      <meta name="description" content="ITGYANI's privacy policy covering data collection, usage, and protection in AI automation services. Learn how we safeguard your business information and ensure compliance." />
      <meta name="keywords" content="privacy policy, data protection, AI automation privacy, GDPR compliance, data security, business automation privacy" />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
              <p className="text-xl leading-relaxed">
                <strong>Effective Date:</strong> January 1, 2024
              </p>
              
              <p className="text-xl leading-relaxed">
                At ITGYANI, we are committed to protecting your privacy and ensuring the security of your personal and business information. 
                This Privacy Policy explains how we collect, use, share, and protect information when you use our AI automation services.
              </p>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">1. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Company information (business name, industry, size)</li>
                  <li>Professional details (job title, department)</li>
                  <li>Account credentials and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Business Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Workflow and process information</li>
                  <li>Integration requirements and specifications</li>
                  <li>Usage patterns and automation performance metrics</li>
                  <li>System logs and technical data for service improvement</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage analytics (pages visited, features used, session duration)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Performance and error logs</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">2. How We Use Your Information</h2>
                
                <h3 className="text-xl font-semibold mb-3">Service Delivery</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide AI automation solutions and consulting services</li>
                  <li>Customize workflows and integrations for your business needs</li>
                  <li>Monitor system performance and optimize automation processes</li>
                  <li>Provide technical support and troubleshooting</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Communication</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Send service updates and important notifications</li>
                  <li>Respond to inquiries and support requests</li>
                  <li>Share relevant industry insights and best practices</li>
                  <li>Provide training materials and documentation</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Service Improvement</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analyze usage patterns to enhance our AI automation platform</li>
                  <li>Develop new features and capabilities</li>
                  <li>Conduct research and development for advanced AI solutions</li>
                  <li>Ensure security and prevent fraudulent activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">3. Information Sharing and Disclosure</h2>
                
                <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following limited circumstances:</p>
                
                <h3 className="text-xl font-semibold mb-3 mt-6">Service Providers</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cloud hosting and infrastructure providers (AWS, Google Cloud)</li>
                  <li>Analytics and monitoring services</li>
                  <li>Customer support platforms</li>
                  <li>Payment processing services</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Legal Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Compliance with applicable laws and regulations</li>
                  <li>Response to valid legal requests or court orders</li>
                  <li>Protection of our rights, property, or safety</li>
                  <li>Prevention of fraud or security incidents</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Business Transfers</h3>
                <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to the same privacy protections.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">4. Data Security</h2>
                
                <p>We implement comprehensive security measures to protect your information:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
                  <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms</li>
                  <li><strong>Network Security:</strong> Firewalls, intrusion detection, and monitoring systems</li>
                  <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                  <li><strong>Employee Training:</strong> Regular security awareness training for all staff</li>
                  <li><strong>Incident Response:</strong> Established procedures for security incident management</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">5. Data Retention</h2>
                
                <p>We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Account Data:</strong> Retained while your account is active and for 7 years after closure</li>
                  <li><strong>Business Data:</strong> Retained according to contract terms, typically 3-7 years</li>
                  <li><strong>Technical Logs:</strong> Retained for 12-24 months for security and performance analysis</li>
                  <li><strong>Marketing Data:</strong> Retained until you opt-out or request deletion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">6. Your Rights and Choices</h2>
                
                <p>You have the following rights regarding your personal information:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Restrict Processing:</strong> Request limitation of how we use your information</li>
                </ul>

                <p className="mt-4">To exercise these rights, contact us at <a href="mailto:privacy@itgyani.com" className="text-primary hover:underline">privacy@itgyani.com</a></p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">7. International Transfers</h2>
                
                <p>As a global AI automation provider, we may transfer your information internationally. We ensure adequate protection through:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Standard Contractual Clauses approved by regulatory authorities</li>
                  <li>Adequacy decisions for countries with equivalent data protection laws</li>
                  <li>Binding Corporate Rules for intra-group transfers</li>
                  <li>Your explicit consent where required</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">8. Cookies and Tracking</h2>
                
                <p>We use cookies and similar technologies to enhance your experience:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li><strong>Essential Cookies:</strong> Required for basic site functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how you use our services</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Deliver relevant content and measure campaign effectiveness</li>
                </ul>

                <p className="mt-4">You can control cookie settings through your browser preferences or our cookie consent manager.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">9. Children's Privacy</h2>
                
                <p>Our services are designed for businesses and are not intended for individuals under 16 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">10. Changes to This Policy</h2>
                
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Notify you of material changes via email or prominent website notice</li>
                  <li>Update the "Effective Date" at the top of this policy</li>
                  <li>Provide a summary of key changes where appropriate</li>
                  <li>Obtain your consent for material changes that affect how we use your information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">11. Contact Information</h2>
                
                <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
                
                <div className="bg-card/50 p-6 rounded-lg border border-border/50 mt-4">
                  <p><strong>ITGYANI Privacy Team</strong></p>
                  <p>Email: <a href="mailto:privacy@itgyani.com" className="text-primary hover:underline">privacy@itgyani.com</a></p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Address: 123 AI Innovation Drive, Tech Valley, CA 94000</p>
                </div>

                <p className="mt-4">
                  <strong>EU Representative:</strong> For users in the European Union, our representative can be contacted at 
                  <a href="mailto:eu-privacy@itgyani.com" className="text-primary hover:underline ml-1">eu-privacy@itgyani.com</a>
                </p>
              </section>

              <section className="border-t border-border/50 pt-8">
                <p className="text-sm text-foreground/60">
                  This Privacy Policy was last updated on January 1, 2024. It supersedes all previous versions and is effective immediately for new users and 30 days after posting for existing users.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
        <PopupManager page="privacy" />
      </div>
    </>
  );
};

export default PrivacyPolicy;