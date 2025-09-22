/**
 * Individual Case Study Detail Page
 * 
 * Dynamic page for displaying detailed case study information
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  CheckCircle, 
  ArrowRight,
  Download,
  ExternalLink,
  Building,
  BarChart3,
  Lightbulb,
  Zap
} from "lucide-react";
import ConsultationModal from "@/components/modals/ConsultationModal";

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Case study data
  const caseStudies = {
    "techflow-ecommerce": {
      id: "techflow-ecommerce",
      title: "TechFlow E-commerce: 127% Revenue Increase Through Complete AI Automation",
      company: "TechFlow Electronics",
      industry: "E-commerce",
      size: "Mid-size Electronics Retailer",
      timeline: "6 months implementation",
      featured: true,
      heroImage: "/hero-bg.jpg",
      
      // Key Metrics
      metrics: {
        revenue: { before: "$2.1M", after: "$4.8M", increase: "127%" },
        cartAbandonment: { before: "68%", after: "23%", improvement: "66%" },
        customerSupport: { before: "72h", after: "4h", improvement: "94%" },
        orderProcessing: { before: "3.5 days", after: "8 hours", improvement: "77%" },
        roi: "340%"
      },

      // Challenge
      challenge: {
        title: "Critical Business Challenges Threatening Growth",
        description: "TechFlow Electronics faced multiple operational bottlenecks that were severely limiting their growth potential and market competitiveness.",
        points: [
          "Cart abandonment rate of 68% causing $1.2M monthly revenue loss",
          "Manual inventory management resulting in frequent stockouts and overstock situations",
          "Overwhelmed customer support team with 1,200+ monthly tickets and only 3 agents",
          "Lack of personalized customer experience leading to low lifetime value",
          "Inefficient order processing workflows causing 3.5-day delays",
          "No real-time business intelligence or analytics capabilities"
        ],
        impact: "These challenges were costing TechFlow an estimated $2.3M annually in lost revenue and operational inefficiencies."
      },

      // Solution
      solution: {
        title: "Comprehensive AI Automation Transformation",
        description: "We implemented a phased AI automation strategy that addressed every aspect of TechFlow's operations, from customer acquisition to fulfillment.",
        phases: [
          {
            title: "Phase 1: Cart Recovery & Customer Intelligence",
            duration: "Months 1-2",
            description: "Implemented intelligent abandonment detection and personalized recovery workflows",
            features: [
              "Real-time behavior tracking and exit-intent detection",
              "AI-powered personalized email sequences",
              "Dynamic discount strategies optimized through machine learning",
              "Multi-channel recovery including email, SMS, and retargeting"
            ]
          },
          {
            title: "Phase 2: Customer Service Revolution",
            duration: "Months 2-3",
            description: "Deployed AI-powered customer support with 24/7 availability",
            features: [
              "NLP chatbot handling 80% of common inquiries",
              "Intelligent ticket routing and sentiment analysis",
              "Automated resolution suggestions for support agents",
              "Self-service portal with AI-powered knowledge base"
            ]
          },
          {
            title: "Phase 3: Smart Inventory & Operations",
            duration: "Months 3-4",
            description: "Introduced predictive inventory management and intelligent pricing",
            features: [
              "ML models for demand forecasting and inventory optimization",
              "Automated supplier order processing",
              "Dynamic pricing based on market conditions and demand",
              "Real-time inventory tracking across all channels"
            ]
          },
          {
            title: "Phase 4: Advanced Personalization & Analytics",
            duration: "Months 4-6",
            description: "Implemented customer segmentation and business intelligence",
            features: [
              "AI-driven customer behavior analysis and segmentation",
              "Personalized product recommendations",
              "Real-time business intelligence dashboard",
              "Predictive analytics for business planning"
            ]
          }
        ]
      },

      // Technology Stack
      technology: {
        title: "Advanced Technology Implementation",
        description: "We leveraged cutting-edge AI and automation technologies to create a comprehensive solution.",
        stack: [
          { name: "n8n", role: "Workflow Automation Platform", description: "Central orchestration for all automated processes" },
          { name: "OpenAI GPT-4", role: "Content Generation & Analysis", description: "Personalized email content and customer insights" },
          { name: "TensorFlow", role: "Machine Learning Models", description: "Predictive analytics and recommendation engines" },
          { name: "Redis", role: "Real-time Data Processing", description: "High-performance caching and session management" },
          { name: "PostgreSQL", role: "Data Management", description: "Customer data and analytics storage" },
          { name: "React", role: "Dashboard Interface", description: "Real-time business intelligence dashboard" }
        ]
      },

      // Results
      results: {
        title: "Transformational Business Results",
        description: "The AI automation implementation delivered exceptional results across all key performance indicators.",
        achievements: [
          {
            metric: "Revenue Growth",
            value: "127%",
            description: "Monthly revenue increased from $2.1M to $4.8M",
            icon: DollarSign
          },
          {
            metric: "Cart Recovery",
            value: "66%",
            description: "Cart abandonment reduced from 68% to 23%",
            icon: TrendingUp
          },
          {
            metric: "Support Efficiency",
            value: "94%",
            description: "Response time improved from 72h to 4h",
            icon: Users
          },
          {
            metric: "Order Processing",
            value: "77%",
            description: "Processing time reduced from 3.5 days to 8 hours",
            icon: Clock
          }
        ],
        timeline: "All results achieved within 6 months of implementation start"
      },

      // Testimonial
      testimonial: {
        quote: "The AI automation transformation exceeded every expectation. We not only solved our operational challenges but achieved growth we never thought possible. The ROI was evident within the first month.",
        author: "Sarah Mitchell",
        title: "CEO, TechFlow Electronics",
        image: "/hero-bg.jpg"
      },

      // Next Steps
      nextSteps: {
        title: "Ready to Transform Your Business?",
        description: "See how AI automation can revolutionize your operations and drive exceptional growth.",
        cta: "Schedule Your Free AI Assessment"
      }
    },

    "healthplus-automation": {
      id: "healthplus-automation",
      title: "HealthPlus Clinic: 85% Administrative Cost Reduction with Healthcare AI",
      company: "HealthPlus Medical Group",
      industry: "Healthcare",
      size: "Multi-location Medical Practice",
      timeline: "8 months implementation",
      featured: true,
      heroImage: "/hero-bg.jpg",
      
      metrics: {
        adminCosts: { before: "$2.4M", after: "$360K", reduction: "85%" },
        patientWaitTime: { before: "45 min", after: "12 min", improvement: "73%" },
        appointmentScheduling: { before: "Manual", after: "98% Automated", improvement: "98%" },
        documentProcessing: { before: "5 days", after: "2 hours", improvement: "95%" },
        roi: "420%"
      },

      challenge: {
        title: "Healthcare Administration Bottlenecks",
        description: "HealthPlus faced overwhelming administrative burden that was impacting patient care quality and operational efficiency.",
        points: [
          "Manual appointment scheduling consuming 40% of staff time",
          "Patient document processing taking 5+ days",
          "Insurance verification requiring 3-4 phone calls per patient",
          "Billing errors resulting in 15% payment delays",
          "Patient records scattered across multiple systems",
          "Compliance documentation requiring 20+ hours weekly"
        ],
        impact: "Administrative inefficiencies were costing $2.4M annually and creating poor patient experiences."
      },

      solution: {
        title: "Intelligent Healthcare Automation Suite",
        description: "Comprehensive AI solution automating patient journey from scheduling to billing while ensuring HIPAA compliance.",
        phases: [
          {
            title: "Phase 1: Appointment & Patient Management",
            duration: "Months 1-2",
            description: "Automated scheduling and patient communication systems",
            features: [
              "AI-powered appointment scheduling with conflict resolution",
              "Automated patient reminders via SMS and email",
              "Intelligent waitlist management and optimization",
              "Real-time calendar synchronization across locations"
            ]
          },
          {
            title: "Phase 2: Document Processing & Records",
            duration: "Months 3-4",
            description: "Digitized and automated document workflows",
            features: [
              "OCR-powered document digitization",
              "Automated insurance verification",
              "Electronic health record integration",
              "HIPAA-compliant document routing"
            ]
          },
          {
            title: "Phase 3: Billing & Compliance Automation",
            duration: "Months 5-6",
            description: "Streamlined billing and automated compliance reporting",
            features: [
              "Automated insurance claim processing",
              "Real-time billing verification",
              "Compliance reporting automation",
              "Payment processing and follow-up"
            ]
          },
          {
            title: "Phase 4: Analytics & Optimization",
            duration: "Months 7-8",
            description: "Advanced analytics and continuous improvement",
            features: [
              "Patient flow analytics and optimization",
              "Revenue cycle analytics",
              "Predictive scheduling models",
              "Performance monitoring dashboards"
            ]
          }
        ]
      },

      technology: {
        title: "Healthcare-Grade Technology Stack",
        description: "HIPAA-compliant technology solution designed specifically for healthcare operations.",
        stack: [
          { name: "Microsoft Healthcare Bot", role: "Patient Communication", description: "HIPAA-compliant patient interactions" },
          { name: "Azure Healthcare APIs", role: "EMR Integration", description: "Secure health record management" },
          { name: "Tesseract OCR", role: "Document Processing", description: "Medical document digitization" },
          { name: "Power BI", role: "Healthcare Analytics", description: "Patient and operational insights" },
          { name: "Logic Apps", role: "Workflow Automation", description: "Healthcare process orchestration" },
          { name: "Azure SQL", role: "Secure Data Storage", description: "HIPAA-compliant data management" }
        ]
      },

      results: {
        title: "Exceptional Healthcare Transformation",
        description: "Dramatic improvements in efficiency, cost reduction, and patient satisfaction.",
        achievements: [
          {
            metric: "Cost Reduction",
            value: "85%",
            description: "Administrative costs reduced from $2.4M to $360K",
            icon: DollarSign
          },
          {
            metric: "Wait Time Reduction",
            value: "73%",
            description: "Patient wait time reduced from 45 to 12 minutes",
            icon: Clock
          },
          {
            metric: "Scheduling Automation",
            value: "98%",
            description: "Appointment scheduling fully automated",
            icon: Target
          },
          {
            metric: "Document Processing",
            value: "95%",
            description: "Processing time reduced from 5 days to 2 hours",
            icon: BarChart3
          }
        ],
        timeline: "Results achieved progressively over 8-month implementation"
      },

      testimonial: {
        quote: "This transformation allowed our medical staff to focus on what matters most - patient care. The administrative burden is virtually eliminated, and our patients are much happier with the streamlined experience.",
        author: "Dr. Jennifer Adams",
        title: "Chief Medical Officer, HealthPlus Medical Group",
        image: "/hero-bg.jpg"
      },

      nextSteps: {
        title: "Transform Your Healthcare Practice",
        description: "Discover how AI automation can revolutionize your healthcare operations while ensuring compliance.",
        cta: "Get Your Healthcare AI Consultation"
      }
    },

    "fintech-security": {
      id: "fintech-security",
      title: "SecureBank: 99.9% Fraud Detection with AI-Powered Financial Security",
      company: "SecureBank Financial",
      industry: "Financial Services",
      size: "Regional Bank with 500K+ Customers",
      timeline: "12 months implementation",
      featured: true,
      heroImage: "/hero-bg.jpg",

      metrics: {
        fraudDetection: { before: "78%", after: "99.9%", improvement: "28%" },
        falsePositives: { before: "12%", after: "0.3%", reduction: "97%" },
        investigationTime: { before: "48 hours", after: "5 minutes", improvement: "99%" },
        customerSatisfaction: { before: "73%", after: "96%", improvement: "31%" },
        roi: "580%"
      },

      challenge: {
        title: "Critical Financial Security Challenges",
        description: "SecureBank faced escalating fraud threats and compliance pressures while maintaining customer experience.",
        points: [
          "Fraud detection rate of only 78% with rising sophisticated attacks",
          "High false positive rate (12%) causing customer frustration",
          "Manual investigation process taking 48+ hours per case",
          "Compliance reporting requiring weeks of manual effort",
          "Customer onboarding delays due to security checks",
          "Risk assessment inconsistencies across departments"
        ],
        impact: "Security gaps were costing $8.7M annually in fraud losses and compliance penalties."
      },

      solution: {
        title: "Advanced AI Security & Compliance Platform",
        description: "Comprehensive AI solution providing real-time fraud detection, automated compliance, and enhanced customer experience.",
        phases: [
          {
            title: "Phase 1: Real-time Fraud Detection",
            duration: "Months 1-3",
            description: "AI-powered transaction monitoring and fraud prevention",
            features: [
              "Machine learning models analyzing 200+ transaction variables",
              "Real-time behavioral biometrics analysis",
              "Anomaly detection using deep learning algorithms",
              "Adaptive fraud scoring with continuous learning"
            ]
          },
          {
            title: "Phase 2: Automated Investigation & Response",
            duration: "Months 4-6",
            description: "Intelligent case management and automated response systems",
            features: [
              "Automated fraud investigation workflows",
              "AI-powered evidence collection and analysis",
              "Intelligent alert prioritization and routing",
              "Automated customer notification systems"
            ]
          },
          {
            title: "Phase 3: Compliance Automation",
            duration: "Months 7-9",
            description: "Automated regulatory compliance and reporting",
            features: [
              "Automated AML/KYC compliance checks",
              "Real-time regulatory reporting",
              "Suspicious activity report (SAR) automation",
              "Compliance audit trail automation"
            ]
          },
          {
            title: "Phase 4: Advanced Analytics & Optimization",
            duration: "Months 10-12",
            description: "Predictive analytics and continuous improvement",
            features: [
              "Predictive fraud modeling and prevention",
              "Customer risk profiling and segmentation",
              "Advanced threat intelligence integration",
              "Performance optimization and model tuning"
            ]
          }
        ]
      },

      technology: {
        title: "Enterprise-Grade Security Technology",
        description: "Bank-grade security technology stack ensuring highest levels of protection and compliance.",
        stack: [
          { name: "Apache Kafka", role: "Real-time Data Streaming", description: "High-throughput transaction processing" },
          { name: "TensorFlow", role: "Machine Learning Models", description: "Advanced fraud detection algorithms" },
          { name: "Elasticsearch", role: "Security Analytics", description: "Real-time search and analytics" },
          { name: "AWS FinTech", role: "Cloud Infrastructure", description: "Secure, compliant cloud platform" },
          { name: "Oracle Database", role: "Transaction Processing", description: "High-performance financial data management" },
          { name: "Tableau", role: "Risk Visualization", description: "Executive dashboards and reporting" }
        ]
      },

      results: {
        title: "Exceptional Security & Compliance Results",
        description: "Industry-leading fraud detection with minimal false positives and enhanced customer experience.",
        achievements: [
          {
            metric: "Fraud Detection",
            value: "99.9%",
            description: "Improved from 78% to 99.9% detection rate",
            icon: Target
          },
          {
            metric: "False Positives",
            value: "97%",
            description: "Reduced from 12% to 0.3%",
            icon: CheckCircle
          },
          {
            metric: "Investigation Speed",
            value: "99%",
            description: "Investigation time reduced from 48h to 5 minutes",
            icon: Zap
          },
          {
            metric: "Customer Satisfaction",
            value: "31%",
            description: "Satisfaction increased from 73% to 96%",
            icon: Users
          }
        ],
        timeline: "Progressive results over 12-month implementation period"
      },

      testimonial: {
        quote: "The AI security platform has transformed our risk management capabilities. We now detect fraud with unprecedented accuracy while providing a seamless experience for our legitimate customers. It's a game-changer for our industry.",
        author: "Robert Chen",
        title: "Chief Risk Officer, SecureBank Financial",
        image: "/hero-bg.jpg"
      },

      nextSteps: {
        title: "Secure Your Financial Operations",
        description: "Protect your institution with AI-powered security and compliance automation.",
        cta: "Schedule Your Security Assessment"
      }
    }
  };

  useEffect(() => {
    if (id && caseStudies[id as keyof typeof caseStudies]) {
      setCaseStudy(caseStudies[id as keyof typeof caseStudies]);
    } else {
      // Redirect to case studies page if invalid ID
      navigate('/case-studies');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 bg-gradient-to-br from-background via-accent/5 to-secondary/10 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <Link to="/case-studies" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" />
                Back to Case Studies
              </Link>

              {/* Company & Industry Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {caseStudy.company}
                </Badge>
                <Badge variant="outline">{caseStudy.industry}</Badge>
                <Badge variant="outline">{caseStudy.size}</Badge>
                <Badge variant="outline">
                  <Clock className="h-4 w-4 mr-1" />
                  {caseStudy.timeline}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="gradient-text">{caseStudy.title}</span>
              </h1>

              {/* Key Metrics Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(caseStudy.metrics).map(([key, metric]) => (
                  <Card key={key} className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {typeof metric === 'object' && 'improvement' in metric ? String(metric.improvement) : String(metric)}
                    </div>
                    <div className="text-sm text-foreground/70 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </Card>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={() => setConsultationModalOpen(true)}
                >
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Get Similar Results
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="mr-2 h-5 w-5" />
                  Download Case Study
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                <span className="gradient-text">{caseStudy.challenge.title}</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                {caseStudy.challenge.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Challenges:</h3>
                  <ul className="space-y-3">
                    {caseStudy.challenge.points.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-2 w-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        <span className="text-foreground/80">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Card className="p-6 bg-destructive/5 border-destructive/20">
                  <h3 className="text-xl font-semibold mb-4 text-destructive">Business Impact</h3>
                  <p className="text-foreground/80">{caseStudy.challenge.impact}</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                <span className="gradient-text">{caseStudy.solution.title}</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-12">
                {caseStudy.solution.description}
              </p>

              {/* Implementation Phases */}
              <div className="space-y-8">
                {caseStudy.solution.phases.map((phase: any, index: number) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-xl font-semibold">{phase.title}</h3>
                          <Badge variant="outline">{phase.duration}</Badge>
                        </div>
                        <p className="text-foreground/80 mb-4">{phase.description}</p>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {phase.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground/80">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                <span className="gradient-text">{caseStudy.technology.title}</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-12">
                {caseStudy.technology.description}
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.technology.stack.map((tech: any, index: number) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">{tech.name}</h3>
                    <p className="text-sm text-primary mb-2">{tech.role}</p>
                    <p className="text-sm text-foreground/70">{tech.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="gradient-text">{caseStudy.results.title}</span>
              </h2>
              <p className="text-lg text-foreground/80 mb-12 text-center">
                {caseStudy.results.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {caseStudy.results.achievements.map((achievement: any, index: number) => (
                  <Card key={index} className="p-6 text-center">
                    <achievement.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-4xl font-bold text-primary mb-2">
                      {achievement.value}
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.metric}</h3>
                    <p className="text-sm text-foreground/70">{achievement.description}</p>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Badge variant="secondary" className="text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {caseStudy.results.timeline}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 text-center">
                <blockquote className="text-xl italic text-foreground/80 mb-6">
                  "{caseStudy.testimonial.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full" />
                  <div className="text-left">
                    <div className="font-semibold">{caseStudy.testimonial.author}</div>
                    <div className="text-sm text-foreground/70">{caseStudy.testimonial.title}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Next Steps CTA */}
        <section className="py-24 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                <span className="gradient-text">{caseStudy.nextSteps.title}</span>
              </h2>
              <p className="text-xl text-foreground/80 mb-8">
                {caseStudy.nextSteps.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-hero"
                  onClick={() => setConsultationModalOpen(true)}
                >
                  <Lightbulb className="mr-2 h-5 w-5" />
                  {caseStudy.nextSteps.cta}
                </Button>
                <Link to="/case-studies">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View More Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PopupManager page="case-studies" />
      
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </>
  );
};

export default CaseStudyDetail;