import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAd from "@/components/GoogleAd";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <title>Terms of Service - AI Automation Legal Agreement | ITGYANI</title>
      <meta name="description" content="ITGYANI's terms of service for AI automation and training solutions. Legal terms, service conditions, and user responsibilities for business automation services." />
      <meta name="keywords" content="terms of service, AI automation legal, service agreement, business automation terms, legal conditions, AI training terms" />
      
      <div className="min-h-screen bg-background">
        <Header />
        <GoogleAd adSlot="1234567900" />
        
        <main className="container mx-auto px-6 py-16">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="gradient-text">Terms of Service</span>
            </h1>
            
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-8">
              <p className="text-xl leading-relaxed">
                <strong>Effective Date:</strong> January 1, 2024
              </p>
              
              <p className="text-xl leading-relaxed">
                Welcome to ITGYANI. These Terms of Service ("Terms") govern your use of our AI automation platform, 
                consulting services, and related offerings. By accessing or using our services, you agree to be bound by these Terms.
              </p>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">1. Acceptance of Terms</h2>
                
                <p>By accessing, browsing, or using ITGYANI's services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our services.</p>
                
                <p className="mt-4">These Terms constitute a legally binding agreement between you ("Customer," "you," or "your") and ITGYANI Inc. ("ITGYANI," "we," "us," or "our").</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">2. Service Description</h2>
                
                <h3 className="text-xl font-semibold mb-3">AI Automation Platform</h3>
                <p>ITGYANI provides a comprehensive AI automation platform that enables businesses to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Design and implement automated workflows</li>
                  <li>Integrate disparate business systems and applications</li>
                  <li>Deploy AI-powered decision-making processes</li>
                  <li>Monitor and optimize automation performance</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Professional Services</h3>
                <p>Our professional services include:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>AI automation consulting and strategy development</li>
                  <li>Custom workflow design and implementation</li>
                  <li>AI training and model development</li>
                  <li>System integration and migration services</li>
                  <li>Ongoing support and maintenance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">3. Account Registration and Security</h2>
                
                <h3 className="text-xl font-semibold mb-3">Account Creation</h3>
                <p>To access our services, you must create an account by providing accurate, current, and complete information. You are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Maintaining the accuracy of your account information</li>
                  <li>Keeping your login credentials secure and confidential</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Authorized Users</h3>
                <p>You may authorize employees and contractors to access your account. You remain fully responsible for all actions taken by authorized users and must ensure they comply with these Terms.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">4. Acceptable Use Policy</h2>
                
                <h3 className="text-xl font-semibold mb-3">Permitted Uses</h3>
                <p>You may use our services for legitimate business purposes in accordance with these Terms and applicable laws.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Prohibited Activities</h3>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Use the services for any illegal, harmful, or fraudulent activities</li>
                  <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Reverse engineer, decompile, or attempt to extract our source code</li>
                  <li>Use our services to compete with us or develop competing products</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">5. Service Availability and Performance</h2>
                
                <h3 className="text-xl font-semibold mb-3">Service Level Commitment</h3>
                <p>We strive to maintain 99.9% uptime for our core platform services. However, we do not guarantee uninterrupted or error-free service operation.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Scheduled Maintenance</h3>
                <p>We may perform scheduled maintenance with advance notice. Emergency maintenance may be performed without prior notice when necessary to protect service integrity or security.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Service Modifications</h3>
                <p>We reserve the right to modify, update, or discontinue services with reasonable notice. We will work with you to minimize disruption from any changes.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">6. Data Rights and Responsibilities</h2>
                
                <h3 className="text-xl font-semibold mb-3">Your Data</h3>
                <p>You retain all rights to your business data, content, and information. You grant us a limited license to use your data solely to provide our services.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Data Security</h3>
                <p>We implement industry-standard security measures to protect your data, including:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Encryption in transit and at rest</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security assessments and updates</li>
                  <li>Incident response procedures</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Data Processing</h3>
                <p>We process your data in accordance with our Privacy Policy and applicable data protection laws, including GDPR and CCPA where applicable.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">7. Payment Terms</h2>
                
                <h3 className="text-xl font-semibold mb-3">Fees and Billing</h3>
                <p>Service fees are as specified in your service agreement or order form. Unless otherwise specified:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Subscription fees are billed in advance</li>
                  <li>Professional services are billed as performed</li>
                  <li>Payment is due within 30 days of invoice date</li>
                  <li>All fees are non-refundable except as specified in your agreement</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Late Payment</h3>
                <p>Overdue amounts may incur late fees of 1.5% per month. We may suspend services for accounts more than 30 days overdue.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Taxes</h3>
                <p>You are responsible for all applicable taxes, duties, and assessments except for taxes based on our net income.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">8. Intellectual Property</h2>
                
                <h3 className="text-xl font-semibold mb-3">Our IP Rights</h3>
                <p>ITGYANI retains all rights, title, and interest in our platform, software, algorithms, methodologies, and related intellectual property.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Your IP Rights</h3>
                <p>You retain ownership of your business data, processes, and pre-existing intellectual property. Custom solutions developed specifically for you may be jointly owned as specified in your service agreement.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Feedback and Suggestions</h3>
                <p>Any feedback, suggestions, or ideas you provide about our services become our property and may be used without restriction or compensation.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">9. Confidentiality</h2>
                
                <p>Both parties acknowledge that they may receive confidential information. We agree to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Keep your confidential information strictly confidential</li>
                  <li>Use it only to provide services to you</li>
                  <li>Protect it with the same care we use for our own confidential information</li>
                  <li>Return or destroy it upon termination of our relationship</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">10. Limitation of Liability</h2>
                
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>OUR TOTAL LIABILITY FOR ANY CLAIMS RELATED TO OUR SERVICES SHALL NOT EXCEED THE AMOUNTS PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM</li>
                  <li>WE SHALL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                  <li>WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE</li>
                  <li>YOU ACKNOWLEDGE THAT AI AND AUTOMATION TECHNOLOGIES HAVE INHERENT LIMITATIONS</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">11. Indemnification</h2>
                
                <p>You agree to indemnify and hold harmless ITGYANI from any claims, damages, or expenses arising from:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Your use of our services in violation of these Terms</li>
                  <li>Your data or content that infringes third-party rights</li>
                  <li>Your negligence or willful misconduct</li>
                  <li>Your violation of applicable laws or regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">12. Termination</h2>
                
                <h3 className="text-xl font-semibold mb-3">Termination for Convenience</h3>
                <p>Either party may terminate these Terms with 30 days' written notice, subject to your service agreement terms.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Termination for Cause</h3>
                <p>We may terminate immediately if you:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  <li>Materially breach these Terms</li>
                  <li>Fail to pay undisputed amounts when due</li>
                  <li>Become insolvent or cease business operations</li>
                  <li>Engage in activities that harm our business or reputation</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Effect of Termination</h3>
                <p>Upon termination, your access to our services will cease, and we will provide reasonable assistance to export your data within 30 days.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">13. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold mb-3">Governing Law</h3>
                <p>These Terms are governed by the laws of Delaware, USA, without regard to conflict of law provisions.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Dispute Resolution Process</h3>
                <p>Any disputes will be resolved through:</p>
                <ol className="list-decimal pl-6 space-y-2 mt-4">
                  <li>Good faith negotiations between the parties</li>
                  <li>Mediation by a mutually agreed mediator</li>
                  <li>Binding arbitration under AAA Commercial Rules if mediation fails</li>
                </ol>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">14. General Provisions</h2>
                
                <h3 className="text-xl font-semibold mb-3">Entire Agreement</h3>
                <p>These Terms, together with your service agreement and privacy policy, constitute the entire agreement between the parties.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Modifications</h3>
                <p>We may update these Terms with 30 days' notice. Continued use of our services constitutes acceptance of updated Terms.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Severability</h3>
                <p>If any provision is found unenforceable, the remaining provisions will continue in full force and effect.</p>

                <h3 className="text-xl font-semibold mb-3 mt-6">Force Majeure</h3>
                <p>Neither party will be liable for delays or failures due to circumstances beyond their reasonable control.</p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4 text-primary">15. Contact Information</h2>
                
                <p>For questions about these Terms, please contact us:</p>
                
                <div className="bg-card/50 p-6 rounded-lg border border-border/50 mt-4">
                  <p><strong>ITGYANI Legal Department</strong></p>
                  <p>Email: <a href="mailto:legal@itgyani.com" className="text-primary hover:underline">legal@itgyani.com</a></p>
                  <p>Phone: +91 (954) 555-0083</p>
                  <p>Address: Kharadi, Pune, India</p>
                </div>
              </section>

              <section className="border-t border-border/50 pt-8">
                <p className="text-sm text-foreground/60">
                  These Terms of Service were last updated on January 1, 2024. They supersede all previous versions and are effective immediately for new users and 30 days after posting for existing users.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;