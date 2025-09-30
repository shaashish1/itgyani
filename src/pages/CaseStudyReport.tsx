import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CaseStudyReport = () => {
  const { id } = useParams();
  
  // Same case studies data from CaseStudyDetail
  const caseStudies = {
    "techflow": {
      title: "TechFlow SaaS Platform",
      company: "TechFlow Inc.",
      industry: "Technology",
      overview: "TechFlow needed to automate their customer onboarding process and integrate multiple tools to reduce manual work.",
      challenge: "Manual data entry across 5 different platforms was causing delays and errors in customer onboarding.",
      solution: "Implemented automated workflows using n8n to connect CRM, email marketing, billing, and support systems.",
      results: [
        { metric: "Time Saved", value: "85%", description: "Reduction in onboarding time" },
        { metric: "Error Rate", value: "95%", description: "Decrease in data entry errors" },
        { metric: "Customer Satisfaction", value: "40%", description: "Increase in CSAT scores" },
        { metric: "Cost Savings", value: "$120K", description: "Annual operational savings" },
        { metric: "Processing Speed", value: "10x", description: "Faster workflow execution" },
        { metric: "Integration Points", value: "12", description: "Systems connected" },
        { metric: "Conversion Rate", value: "32%", description: "Improvement in trial-to-paid" },
        { metric: "Customer Lifetime Value", value: "45%", description: "Increase in LTV" }
      ],
      technologies: ["n8n", "Salesforce", "HubSpot", "Stripe", "Zendesk", "Slack"],
      timeline: "8 weeks",
      testimonial: {
        quote: "The automation solution transformed our operations. We've seen remarkable improvements in efficiency and customer satisfaction.",
        author: "Sarah Johnson",
        position: "CTO, TechFlow Inc."
      }
    },
    "healthplus": {
      title: "HealthPlus Clinic",
      company: "HealthPlus Medical",
      industry: "Healthcare",
      overview: "Healthcare provider needed to streamline patient appointment scheduling and automated reminders.",
      challenge: "High no-show rates and manual scheduling processes were impacting clinic efficiency and revenue.",
      solution: "Deployed automated appointment management system with SMS/email reminders and calendar integration.",
      results: [
        { metric: "No-Show Rate", value: "60%", description: "Reduction in missed appointments" },
        { metric: "Booking Time", value: "75%", description: "Decrease in scheduling time" },
        { metric: "Patient Engagement", value: "50%", description: "Increase in appointment confirmations" },
        { metric: "Revenue Impact", value: "$200K", description: "Additional annual revenue" },
        { metric: "Staff Hours", value: "30", description: "Hours saved per week" },
        { metric: "Patient Satisfaction", value: "88%", description: "Overall satisfaction score" },
        { metric: "Staff Productivity", value: "45%", description: "Improvement in efficiency" },
        { metric: "Billing Accuracy", value: "98%", description: "Automated billing accuracy" }
      ],
      technologies: ["n8n", "Google Calendar", "Twilio", "Square", "EHR System"],
      timeline: "6 weeks",
      testimonial: {
        quote: "Patient satisfaction has soared since implementing the automated system. It's been a game-changer for our practice.",
        author: "Dr. Michael Chen",
        position: "Medical Director, HealthPlus"
      }
    },
    "securebank": {
      title: "SecureBank Financial",
      company: "SecureBank Corp",
      industry: "Finance",
      overview: "Financial institution required secure automation for compliance reporting and data processing.",
      challenge: "Manual compliance reporting was time-consuming and prone to errors, risking regulatory issues.",
      solution: "Built automated compliance workflow with data validation, encryption, and audit trails.",
      results: [
        { metric: "Report Generation", value: "90%", description: "Faster compliance reporting" },
        { metric: "Accuracy", value: "99.9%", description: "Data accuracy improvement" },
        { metric: "Compliance Risk", value: "80%", description: "Reduction in compliance violations" },
        { metric: "Audit Time", value: "70%", description: "Decrease in audit preparation time" },
        { metric: "Processing Volume", value: "5x", description: "Increase in data processing" },
        { metric: "Transaction Speed", value: "3x", description: "Faster transaction processing" },
        { metric: "Compliance Score", value: "100%", description: "Regulatory compliance rate" },
        { metric: "Operational Costs", value: "$180K", description: "Annual cost reduction" }
      ],
      technologies: ["n8n", "PostgreSQL", "AWS", "Compliance APIs", "Encryption Services"],
      timeline: "12 weeks",
      testimonial: {
        quote: "The automated compliance system has given us peace of mind and freed up our team to focus on strategic initiatives.",
        author: "Robert Martinez",
        position: "Chief Compliance Officer, SecureBank"
      }
    },
    "saasflow": {
      title: "SaaSFlow Marketing",
      company: "SaaSFlow Ltd",
      industry: "Marketing",
      overview: "Marketing agency needed to automate client reporting and social media management.",
      challenge: "Creating custom reports for 50+ clients was consuming 40 hours per week of team time.",
      solution: "Implemented automated reporting system pulling data from multiple marketing platforms.",
      results: [
        { metric: "Time Saved", value: "92%", description: "Reduction in reporting time" },
        { metric: "Client Reports", value: "50+", description: "Automated monthly reports" },
        { metric: "Client Retention", value: "35%", description: "Improvement in retention rate" },
        { metric: "Team Capacity", value: "200%", description: "Increase in client capacity" },
        { metric: "Report Accuracy", value: "100%", description: "Error-free reporting" },
        { metric: "Monthly Recurring Revenue", value: "$85K", description: "Additional MRR from capacity" },
        { metric: "Customer Activation", value: "68%", description: "30-day activation rate" },
        { metric: "Net Promoter Score", value: "72", description: "Client satisfaction score" }
      ],
      technologies: ["n8n", "Google Analytics", "Facebook Ads", "LinkedIn Ads", "Google Sheets"],
      timeline: "10 weeks",
      testimonial: {
        quote: "Automation has allowed us to scale our client base without increasing headcount. It's been incredible.",
        author: "Emily Rodriguez",
        position: "CEO, SaaSFlow Ltd"
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
