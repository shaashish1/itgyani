import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CaseStudyReport = () => {
  const { id } = useParams();
  
  // Case studies data matching CaseStudyDetail.tsx
  const caseStudies: Record<string, any> = {
    "techflow-ecommerce": {
      title: "TechFlow E-commerce: 127% Revenue Increase Through Complete AI Automation",
      company: "TechFlow Electronics",
      industry: "E-commerce",
      timeline: "6 months implementation",
      overview: "TechFlow Electronics faced multiple operational bottlenecks that were severely limiting their growth potential and market competitiveness. Cart abandonment, manual inventory management, and overwhelmed customer support were costing them millions annually.",
      challenge: "TechFlow faced critical business challenges including 68% cart abandonment rate causing $1.2M monthly revenue loss, manual inventory management resulting in frequent stockouts, overwhelmed customer support team with 1,200+ monthly tickets, lack of personalized customer experience, inefficient order processing causing 3.5-day delays, and no real-time business intelligence capabilities.",
      solution: "We implemented a phased AI automation strategy addressing every aspect of operations: Phase 1 focused on cart recovery with AI-powered email sequences and dynamic discounts. Phase 2 deployed NLP chatbot handling 80% of inquiries with intelligent routing. Phase 3 introduced ML-powered demand forecasting and dynamic pricing. Phase 4 implemented advanced personalization and real-time business intelligence.",
      results: [
        { metric: "Revenue Growth", value: "127%", description: "Monthly revenue increased from $2.1M to $4.8M" },
        { metric: "Cart Recovery", value: "66%", description: "Cart abandonment reduced from 68% to 23%" },
        { metric: "Support Efficiency", value: "94%", description: "Response time improved from 72h to 4h" },
        { metric: "Order Processing", value: "77%", description: "Processing time reduced from 3.5 days to 8 hours" },
        { metric: "Conversion Rate", value: "150%", description: "Improved from 1.8% to 4.5%" },
        { metric: "Customer Lifetime Value", value: "162%", description: "Increased from $340 to $890" },
        { metric: "Customer Satisfaction", value: "24%", description: "Improved from 76% to 94%" },
        { metric: "ROI", value: "340%", description: "Overall return on investment" }
      ],
      technologies: ["n8n", "OpenAI GPT-4", "TensorFlow", "Redis", "PostgreSQL", "React"],
      testimonial: {
        quote: "The AI automation transformation exceeded every expectation. We not only solved our operational challenges but achieved growth we never thought possible. The ROI was evident within the first month.",
        author: "Sarah Mitchell",
        position: "CEO, TechFlow Electronics"
      }
    },
    "healthplus-automation": {
      title: "HealthPlus Clinic: 85% Administrative Cost Reduction with Healthcare AI",
      company: "HealthPlus Medical Group",
      industry: "Healthcare",
      timeline: "8 months implementation",
      overview: "HealthPlus Medical Group faced overwhelming administrative burden that was impacting patient care quality and operational efficiency, with manual processes consuming staff time and creating poor patient experiences.",
      challenge: "HealthPlus struggled with manual appointment scheduling consuming 40% of staff time, patient document processing taking 5+ days, insurance verification requiring 3-4 phone calls per patient, billing errors resulting in 15% payment delays, scattered patient records across multiple systems, and compliance documentation requiring 20+ hours weekly.",
      solution: "Implemented comprehensive healthcare automation suite in four phases: Phase 1 automated appointment scheduling with AI conflict resolution and patient reminders. Phase 2 digitized documents with OCR and automated insurance verification. Phase 3 streamlined billing with automated insurance claims and compliance reporting. Phase 4 deployed analytics for patient flow optimization and predictive scheduling.",
      results: [
        { metric: "Cost Reduction", value: "85%", description: "Administrative costs reduced from $2.4M to $360K" },
        { metric: "Wait Time", value: "73%", description: "Patient wait time reduced from 45 min to 12 min" },
        { metric: "Scheduling", value: "98%", description: "Appointment scheduling now 98% automated" },
        { metric: "Document Processing", value: "95%", description: "Processing time reduced from 5 days to 2 hours" },
        { metric: "Patient Satisfaction", value: "33%", description: "Improved from 72% to 96%" },
        { metric: "Staff Productivity", value: "98%", description: "Increased from 45% to 89%" },
        { metric: "Billing Accuracy", value: "17%", description: "Improved from 85% to 99.8%" },
        { metric: "ROI", value: "420%", description: "Overall return on investment" }
      ],
      technologies: ["Microsoft Healthcare Bot", "Azure Healthcare APIs", "Tesseract OCR", "Power BI", "Logic Apps", "Azure SQL"],
      testimonial: {
        quote: "The healthcare automation suite has revolutionized our practice. We're providing better patient care while dramatically reducing operational costs. Staff can now focus on what matters most - our patients.",
        author: "Dr. Jennifer Williams",
        position: "Chief Medical Officer, HealthPlus Medical Group"
      }
    },
    "fintech-security": {
      title: "SecureBank: 99.9% Fraud Detection with AI-Powered Financial Security",
      company: "SecureBank Financial",
      industry: "Financial Services",
      timeline: "12 months implementation",
      overview: "SecureBank Financial faced escalating fraud threats and compliance pressures while needing to maintain excellent customer experience. Traditional security measures were insufficient for modern threats.",
      challenge: "SecureBank struggled with fraud detection rate of only 78% with rising sophisticated attacks, high false positive rate (12%) causing customer frustration, manual investigation process taking 48+ hours per case, compliance reporting requiring weeks of manual effort, customer onboarding delays due to security checks, and risk assessment inconsistencies across departments.",
      solution: "Deployed advanced AI security and compliance platform in four phases: Phase 1 implemented real-time fraud detection with ML models analyzing 200+ variables and behavioral biometrics. Phase 2 automated investigation workflows with AI-powered evidence collection. Phase 3 automated AML/KYC compliance and regulatory reporting. Phase 4 added predictive fraud modeling and advanced threat intelligence.",
      results: [
        { metric: "Fraud Detection", value: "99.9%", description: "Improved from 78% to 99.9% detection rate" },
        { metric: "False Positives", value: "97%", description: "Reduced from 12% to 0.3%" },
        { metric: "Investigation Speed", value: "99%", description: "Investigation time reduced from 48h to 5 minutes" },
        { metric: "Customer Satisfaction", value: "31%", description: "Satisfaction increased from 73% to 96%" },
        { metric: "Transaction Speed", value: "88%", description: "Processing improved from 3.2s to 0.4s" },
        { metric: "Compliance Score", value: "22%", description: "Improved from 82% to 99.7%" },
        { metric: "Cost Reduction", value: "77%", description: "Operational costs reduced from $3.8M to $890K" },
        { metric: "ROI", value: "580%", description: "Overall return on investment" }
      ],
      technologies: ["Apache Kafka", "TensorFlow", "Elasticsearch", "AWS FinTech", "Oracle Database", "Tableau"],
      testimonial: {
        quote: "The AI security platform has transformed our risk management capabilities. We now detect fraud with unprecedented accuracy while providing a seamless experience for our legitimate customers. It's a game-changer for our industry.",
        author: "Robert Chen",
        position: "Chief Risk Officer, SecureBank Financial"
      }
    },
    "cloudscale-saas": {
      title: "CloudScale SaaS: 500% User Growth Through AI-Powered Platform Automation",
      company: "CloudScale Solutions",
      industry: "SaaS",
      timeline: "9 months implementation",
      overview: "CloudScale Solutions faced critical challenges preventing scalable growth and threatening their position in the competitive SaaS market. Manual onboarding, high churn, and scaling bottlenecks were limiting their potential.",
      challenge: "CloudScale struggled with manual user onboarding taking 14+ days causing 35% abandonment, customer support overwhelmed with 2,500+ monthly tickets for basic setup, high churn rate of 18% due to poor user experience, feature discovery issues with only 15% utilizing advanced features, scaling bottlenecks preventing growth beyond 50K users, and manual billing consuming 60+ hours weekly.",
      solution: "Built intelligent SaaS automation ecosystem in four phases: Phase 1 deployed smart user onboarding with AI profiling and automated setup. Phase 2 implemented proactive user success with churn prediction and automated engagement. Phase 3 created intelligent support with advanced chatbot and self-service portal. Phase 4 optimized growth with lifecycle automation and AI-powered upselling.",
      results: [
        { metric: "User Growth", value: "500%", description: "User base grew from 50K to 300K users" },
        { metric: "Churn Reduction", value: "82%", description: "Monthly churn reduced from 18% to 3.2%" },
        { metric: "Support Efficiency", value: "84%", description: "Support tickets reduced from 2,500 to 400/month" },
        { metric: "Time to Value", value: "99%", description: "Onboarding reduced from 14 days to 2 hours" },
        { metric: "MRR Growth", value: "567%", description: "Monthly recurring revenue grew from $420K to $2.8M" },
        { metric: "Customer Activation", value: "178%", description: "Activation improved from 32% to 89%" },
        { metric: "Net Promoter Score", value: "171%", description: "NPS increased from 28 to 76" },
        { metric: "ROI", value: "650%", description: "Overall return on investment" }
      ],
      technologies: ["Segment CDP", "Intercom", "Mixpanel", "Zapier", "Stripe", "AWS Lambda"],
      testimonial: {
        quote: "The AI automation platform didn't just solve our scaling problems - it completely transformed our user experience. We went from struggling to onboard users to having them achieve value in hours instead of weeks. Our growth trajectory completely changed.",
        author: "Sarah Rodriguez",
        position: "CEO & Founder, CloudScale Solutions"
      }
    }
  };

  const caseStudy = caseStudies[id as keyof typeof caseStudies];

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Action Bar - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to={`/case-studies/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Study
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-card rounded-lg shadow-lg p-8 print:shadow-none">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <div className="text-sm text-muted-foreground mb-2">CASE STUDY REPORT</div>
            <h1 className="text-4xl font-bold mb-2">{caseStudy.title}</h1>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>Company: {caseStudy.company}</span>
              <span>•</span>
              <span>Industry: {caseStudy.industry}</span>
              <span>•</span>
              <span>Timeline: {caseStudy.timeline}</span>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.overview}</p>
          </section>

          {/* Challenge */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
          </section>

          {/* Solution */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
          </section>

          {/* Technologies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Results */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="p-4">
                  <div className="text-3xl font-bold text-primary mb-1">{result.value}</div>
                  <div className="font-semibold mb-1">{result.metric}</div>
                  <div className="text-sm text-muted-foreground">{result.description}</div>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Client Testimonial</h2>
            <Card className="p-6 bg-primary/5">
              <p className="text-lg italic mb-4">"{caseStudy.testimonial.quote}"</p>
              <div className="font-semibold">{caseStudy.testimonial.author}</div>
              <div className="text-sm text-muted-foreground">{caseStudy.testimonial.position}</div>
            </Card>
          </section>

          {/* Footer */}
          <div className="border-t pt-6 mt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AI Automation Agency. All rights reserved.</p>
            <p className="mt-2">For more information, visit our website or contact us for a consultation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyReport;
