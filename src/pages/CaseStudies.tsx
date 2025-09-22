import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Play,
  BarChart3,
  Workflow,
  Bot,
  ShoppingCart,
  Building,
  Heart,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/modals/ConsultationModal";

const CaseStudies = () => {
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStudy, setSelectedStudy] = useState(1);

  const industries = ["All", "E-commerce", "Healthcare", "Financial Services", "Manufacturing", "SaaS", "Retail"];

  const successMetrics = [
    { label: "Average ROI", value: "340%", description: "Return on automation investment across all projects" },
    { label: "Implementation Time", value: "4.2 months", description: "Average time from start to full deployment" },
    { label: "Cost Reduction", value: "42%", description: "Average operational cost savings achieved" },
    { label: "Efficiency Gains", value: "225%", description: "Average productivity improvement measured" }
  ];

  const detailedCaseStudies = [
    {
      id: 1,
      slug: "techflow-ecommerce",
      title: "TechFlow E-commerce: 127% Revenue Increase Through Complete AI Automation Transformation",
      industry: "E-commerce",
      company: "TechFlow Electronics",
      size: "Mid-size Electronics Retailer",
      revenue: "$2.1M → $4.8M monthly",
      timeline: "6 months implementation",
      featured: true,
      overview: "TechFlow Electronics transformed from a struggling mid-size retailer to an industry leader through comprehensive AI automation implementation, achieving remarkable growth in revenue, customer satisfaction, and operational efficiency.",
      
      challenge: `TechFlow Electronics faced critical challenges that threatened their market position and growth potential:

      **Primary Business Challenges:**
      • Extremely high cart abandonment rate of 68%, well above industry average of 45%
      • Manual inventory management causing frequent stockouts and overstocking situations
      • Overwhelmed customer support team struggling with 1,200+ monthly tickets with only 3 agents
      • Lack of personalized customer experience leading to low customer lifetime value
      • Inefficient order processing workflows causing delays and customer dissatisfaction
      • Limited visibility into customer behavior and purchasing patterns
      • Manual pricing strategies missing market opportunities and competitive advantages

      **Financial Impact of Problems:**
      • Estimated $1.2M monthly revenue loss due to cart abandonment
      • $340K annual losses from poor inventory management
      • Customer acquisition cost of $85 with lifetime value of only $340
      • Support team burnout leading to 40% annual turnover
      • Average order processing time of 3.5 days vs. industry standard of 1.5 days

      **Technical Limitations:**
      • Legacy systems with no integration capabilities
      • Manual data entry processes prone to human error
      • No real-time analytics or business intelligence
      • Inability to scale operations without proportional staff increases
      • Lack of automated workflows for repetitive tasks`,

      solution: `Our comprehensive AI automation solution addressed every aspect of TechFlow's operations through a phased implementation approach:

      **Phase 1: Cart Abandonment Recovery & Customer Intelligence (Months 1-2)**
      
      *Intelligent Abandonment Detection:*
      • Real-time behavior tracking to identify abandonment triggers
      • Machine learning algorithms analyzing user session data, time spent, and interaction patterns
      • Predictive modeling to determine optimal intervention timing
      • Advanced exit-intent detection with precision targeting

      *Personalized Recovery Workflows:*
      • Dynamic email sequences customized based on user behavior, product interest, and historical data
      • AI-powered content generation for personalized product recommendations
      • Progressive discount strategies optimized through machine learning
      • Multi-channel recovery including email, SMS, and retargeting ads
      • A/B testing automation for continuous optimization of recovery messages

      **Phase 2: Customer Service Revolution (Months 2-3)**
      
      *AI-Powered Customer Support:*
      • Natural language processing chatbot capable of handling 80% of common inquiries
      • Intelligent ticket routing based on inquiry type, urgency, and customer value
      • Sentiment analysis for proactive customer care and escalation management
      • Automated resolution suggestions for support agents
      • 24/7 availability with seamless handoff to human agents when needed

      *Knowledge Management System:*
      • AI-powered knowledge base with intelligent search capabilities
      • Automated FAQ generation from customer interactions
      • Self-service portal reducing simple inquiry volume
      • Continuous learning from successful resolutions

      **Phase 3: Smart Inventory & Operations (Months 3-4)**
      
      *Predictive Inventory Management:*
      • Machine learning models analyzing sales patterns, seasonality, and market trends
      • Automated supplier order processing based on demand forecasting
      • Real-time inventory tracking across multiple channels
      • Dynamic safety stock optimization to prevent stockouts
      • Automated alerts for slow-moving inventory and clearance opportunities

      *Intelligent Pricing Optimization:*
      • Competitive price monitoring and automated adjustments
      • Demand-based dynamic pricing strategies
      • Margin optimization while maintaining competitiveness
      • A/B testing for pricing strategies across different customer segments

      **Phase 4: Advanced Personalization & Analytics (Months 4-6)**
      
      *Customer Segmentation & Targeting:*
      • AI-driven customer behavior analysis and segmentation
      • Personalized product recommendations based on browsing and purchase history
      • Customized marketing campaigns for different customer segments
      • Lifecycle-based automation for customer retention and upselling

      *Business Intelligence & Analytics:*
      • Real-time dashboard for key business metrics
      • Automated reporting for stakeholders
      • Predictive analytics for business planning
      • ROI tracking for all automation initiatives`,

      implementation: `**Technical Architecture & Integration Strategy:**

      *Central Orchestration Platform:*
      • n8n as the core workflow automation platform
      • Microservices architecture for scalability and maintainability
      • API-first approach for seamless integrations
      • Cloud-based infrastructure ensuring 99.9% uptime

      *Key System Integrations:*
      • Shopify Plus e-commerce platform integration
      • Klaviyo email marketing automation
      • Zendesk customer support platform
      • Google Analytics and Facebook Pixel for comprehensive tracking
      • Stripe payment processing with fraud detection
      • Multiple supplier APIs for inventory management
      • OpenAI integration for content generation and customer insights

      *Data Infrastructure:*
      • Real-time data pipeline processing 10,000+ events daily
      • Customer data platform (CDP) for unified customer profiles
      • Advanced analytics warehouse for business intelligence
      • GDPR-compliant data handling and privacy protection

      **Specific Workflow Examples:**

      *1. Intelligent Cart Recovery Workflow:*
      → Trigger: User adds items to cart but doesn't complete purchase within 30 minutes
      → AI Analysis: Analyze user profile, product interest, price sensitivity, and historical behavior
      → Personalization: Generate customized email with relevant products and optimal discount
      → Timing Optimization: Send first email after 1 hour, second after 24 hours, third after 3 days
      → Content Adaptation: Different messaging for first-time vs. returning customers
      → Success Tracking: Monitor open rates, click-through rates, and conversion rates
      → Outcome: Achieved 45% cart recovery rate vs. previous 12%

      *2. Smart Customer Support Workflow:*
      → Trigger: Customer submits inquiry through any channel (chat, email, phone)
      → AI Classification: Automatically categorize inquiry type and determine urgency level
      → Knowledge Base Search: Attempt automatic resolution using AI-powered knowledge base
      → Intelligent Routing: If escalation needed, route to most appropriate specialist
      → Sentiment Monitoring: Continuously monitor customer sentiment and escalate if negative
      → Follow-up Automation: Send satisfaction surveys and follow-up communications
      → Outcome: 73% reduction in manual ticket volume, 2-minute average response time

      *3. Predictive Inventory Management:*
      → Data Collection: Gather sales data, seasonality patterns, market trends, and supplier information
      → Demand Forecasting: Use machine learning to predict demand for each product
      → Automated Ordering: Generate purchase orders when inventory reaches optimal reorder points
      → Supplier Communication: Automatically send orders to suppliers and track delivery status
      → Quality Control: Monitor delivery times and supplier performance
      → Optimization: Continuously refine forecasting models based on actual vs. predicted demand
      → Outcome: 90% reduction in stockouts, 60% improvement in inventory turnover`,

      results: [
        { 
          category: "Revenue Growth",
          metrics: [
            { label: "Monthly Revenue", before: "$2.1M", after: "$4.8M", improvement: "+127%" },
            { label: "Average Order Value", before: "$89", after: "$126", improvement: "+42%" },
            { label: "Customer Lifetime Value", before: "$340", after: "$520", improvement: "+53%" },
            { label: "Conversion Rate", before: "2.3%", after: "4.1%", improvement: "+78%" }
          ]
        },
        {
          category: "Operational Efficiency", 
          metrics: [
            { label: "Cart Abandonment Rate", before: "68%", after: "23%", improvement: "-66%" },
            { label: "Support Response Time", before: "24 hours", after: "2 minutes", improvement: "-99%" },
            { label: "Order Processing Time", before: "3.5 days", after: "1.2 days", improvement: "-66%" },
            { label: "Inventory Accuracy", before: "78%", after: "96%", improvement: "+23%" }
          ]
        },
        {
          category: "Customer Experience",
          metrics: [
            { label: "Customer Satisfaction", before: "3.2/5", after: "4.6/5", improvement: "+44%" },
            { label: "Net Promoter Score", before: "18", after: "67", improvement: "+272%" },
            { label: "Return Customer Rate", before: "23%", after: "45%", improvement: "+96%" },
            { label: "Support Ticket Volume", before: "1,200/month", after: "320/month", improvement: "-73%" }
          ]
        }
      ],
      
      technologies: [
        "n8n Workflow Automation",
        "OpenAI GPT Integration", 
        "Shopify Plus E-commerce",
        "Klaviyo Email Marketing",
        "Zendesk Customer Support",
        "Google Analytics 4",
        "Facebook Conversion API",
        "Stripe Payment Processing",
        "Python Machine Learning",
        "TensorFlow Predictive Models",
        "PostgreSQL Database",
        "Redis Caching"
      ],

      roi_analysis: `**Comprehensive ROI Analysis:**

      *Initial Investment:*
      • Platform setup and configuration: $45,000
      • Custom development and integrations: $75,000
      • Staff training and change management: $25,000
      • First-year platform and tool costs: $35,000
      • Total Initial Investment: $180,000

      *Annual Benefits Achieved:*
      • Revenue increase: $32.4M annually (vs. previous $25.2M)
      • Cost savings from automation: $850,000 annually
      • Reduced support costs: $320,000 annually
      • Improved inventory efficiency: $480,000 annually
      • Total Annual Benefits: $8.05M

      *Payback Period: 0.8 months*
      *5-Year Net Present Value: $38.2M*
      *Internal Rate of Return: 4,475%*

      *Ongoing Operational Savings:*
      • 85% reduction in manual data entry tasks
      • 70% reduction in inventory management time
      • 60% improvement in staff productivity
      • 45% reduction in customer acquisition costs`,

      testimonial: {
        quote: "The AI automation transformation exceeded every expectation. We've not only doubled our revenue but fundamentally changed how we operate. The level of personalization and efficiency we now achieve would have been impossible with manual processes.",
        author: "Sarah Mitchell",
        position: "CEO, TechFlow Electronics",
        company: "TechFlow Electronics"
      },

      nextSteps: [
        "Advanced machine learning model development for demand forecasting",
        "International market expansion using automation frameworks",
        "Voice commerce integration and optimization",
        "Predictive customer service with proactive issue resolution",
        "Advanced personalization using computer vision for product recommendations"
      ]
    },

    // Additional detailed case studies would continue here...
  ];

  const caseStudies = [
    {
      id: 1,
      slug: "techflow-ecommerce",
      title: "Fortune 500 Retail Chain Automates Inventory Management",
      industry: "Retail",
      company: "RetailGlobal Corp",
      challenge: "Manual inventory tracking across 500+ stores causing $2M+ annual losses",
      solution: "AI-powered inventory automation with predictive analytics and real-time sync",
      results: [
        { metric: "Cost Reduction", value: "75%", icon: DollarSign },
        { metric: "Time Saved", value: "40 hrs/week", icon: Clock },
        { metric: "Accuracy Improved", value: "99.5%", icon: Target },
        { metric: "ROI", value: "320%", icon: TrendingUp }
      ],
      description: "Implemented comprehensive AI automation solution that transformed inventory management across 500+ retail locations, eliminating manual processes and delivering exceptional ROI.",
      technologies: ["AI Machine Learning", "Real-time Analytics", "Automated Workflows", "Predictive Modeling"],
      timeframe: "6 months",
      category: "Enterprise AI Automation",
      hasDetailedCaseStudy: true
    },
    {
      id: 2,
      slug: "healthplus-automation",
      title: "Healthcare Provider Revolutionizes Patient Communication",
      industry: "Healthcare",
      company: "MedCare Systems",
      challenge: "Patient inquiries overwhelming staff, 60% response delays affecting satisfaction",
      solution: "AI customer support automation with intelligent triage and 24/7 availability",
      results: [
        { metric: "Response Time", value: "95% faster", icon: Clock },
        { metric: "Staff Efficiency", value: "65% increase", icon: Users },
        { metric: "Patient Satisfaction", value: "92% rating", icon: Target },
        { metric: "Cost Savings", value: "$500K annually", icon: DollarSign }
      ],
      description: "Deployed intelligent AI automation system that handles patient communications 24/7, providing instant responses while maintaining HIPAA compliance.",
      technologies: ["Natural Language Processing", "AI Chatbots", "Automated Scheduling", "HIPAA Compliance"],
      timeframe: "4 months",
      category: "AI Training & Support",
      hasDetailedCaseStudy: true
    },
    {
      id: 3,
      slug: "fintech-security",
      title: "Manufacturing Giant Optimizes Production Workflows",
      industry: "Manufacturing",
      company: "IndustrialTech Inc",
      challenge: "Complex production scheduling causing 25% efficiency losses and delays",
      solution: "AI automation for production planning, quality control, and resource optimization",
      results: [
        { metric: "Production Efficiency", value: "45% increase", icon: TrendingUp },
        { metric: "Downtime Reduction", value: "80% less", icon: Clock },
        { metric: "Quality Improvements", value: "35% fewer defects", icon: Target },
        { metric: "Annual Savings", value: "$3.2M", icon: DollarSign }
      ],
      description: "Transformed manufacturing operations with AI-driven automation, optimizing production workflows and achieving unprecedented efficiency gains.",
      technologies: ["Predictive Maintenance", "Quality Control AI", "Resource Optimization", "Real-time Monitoring"],
      timeframe: "8 months",
      category: "Industrial AI Automation",
      hasDetailedCaseStudy: true
    },
    {
      id: 4,
      title: "E-commerce Platform Scales Customer Support 10x",
      industry: "E-commerce",
      company: "ShopSmart Online",
      challenge: "Growing customer base overwhelming support team, 48-hour response times",
      solution: "AI training system for automated customer support with human escalation",
      results: [
        { metric: "Support Capacity", value: "10x increase", icon: Users },
        { metric: "Resolution Time", value: "90% faster", icon: Clock },
        { metric: "Customer Rating", value: "4.9/5 stars", icon: Target },
        { metric: "Team Productivity", value: "200% boost", icon: TrendingUp }
      ],
      description: "Implemented comprehensive AI training and automation solution that scaled customer support operations while maintaining exceptional service quality.",
      technologies: ["AI Training Models", "Automated Responses", "Sentiment Analysis", "Smart Routing"],
      timeframe: "3 months",
      category: "AI Training & Automation"
    },
    {
      id: 5,
      title: "Financial Services Automates Compliance Reporting",
      industry: "Financial Services",
      company: "SecureBank Holdings",
      challenge: "Manual compliance reporting taking 200+ hours monthly, high error risk",
      solution: "AI automation for regulatory compliance with intelligent data processing",
      results: [
        { metric: "Time Savings", value: "85% reduction", icon: Clock },
        { metric: "Accuracy Rate", value: "99.9%", icon: Target },
        { metric: "Compliance Score", value: "100% rating", icon: CheckCircle },
        { metric: "Cost Efficiency", value: "$800K saved", icon: DollarSign }
      ],
      description: "Automated complex compliance workflows using advanced AI systems, ensuring 100% regulatory compliance while dramatically reducing operational overhead.",
      technologies: ["Regulatory AI", "Document Processing", "Automated Reporting", "Risk Assessment"],
      timeframe: "5 months",
      category: "Financial AI Automation"
    }
  ];

  const filteredCaseStudies = selectedIndustry === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  return (
    <>
      {/* SEO Meta Tags */}
      <title>AI Automation Case Studies - Real Success Stories | ITGYANI</title>
      <meta name="description" content="Discover how leading companies achieved 300%+ ROI with AI automation solutions. Real case studies showing dramatic cost savings, efficiency gains, and business transformation through intelligent automation." />
      <meta name="keywords" content="AI automation case studies, AI training success stories, business automation results, artificial intelligence ROI, automation implementation, AI transformation" />
      <meta property="og:title" content="AI Automation Case Studies - Proven Success Stories" />
      <meta property="og:description" content="See how Fortune 500 companies transformed their operations with AI automation. Real results: 75% cost reduction, 320% ROI, 99.9% accuracy rates." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="container mx-auto px-6 relative">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>
              
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">AI Automation</span><br />
                  Success Stories
                </h1>
                <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
                  Real companies. Real results. See how industry leaders achieved <strong>300%+ ROI</strong> and 
                  transformed their operations with our AI automation solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-hero"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Get Your Custom Strategy
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/services">View All Services</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Industry Filter */}
          <section className="py-8 border-b border-border/50">
            <div className="container mx-auto px-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {industries.map((industry) => (
                  <Button
                    key={industry}
                    variant={selectedIndustry === industry ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedIndustry(industry)}
                    className="transition-all duration-300"
                  >
                    {industry}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="py-24">
            <div className="container mx-auto px-6">
              <div className="grid gap-8">
                {filteredCaseStudies.map((study, index) => (
                  <Card key={study.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-border/50 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                              {study.category}
                            </Badge>
                            <Badge variant="outline">{study.industry}</Badge>
                          </div>
                          <CardTitle className="text-2xl lg:text-3xl mb-3 leading-tight">
                            {study.title}
                          </CardTitle>
                          <CardDescription className="text-lg text-foreground/70">
                            <strong>{study.company}</strong> • {study.timeframe} implementation
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-8">
                      {/* Challenge & Solution */}
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-red-400">Challenge</h4>
                          <p className="text-foreground/80">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-green-400">AI Solution</h4>
                          <p className="text-foreground/80">{study.solution}</p>
                        </div>
                      </div>

                      {/* Results Metrics */}
                      <div>
                        <h4 className="font-semibold text-lg mb-6">Measurable Results</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                          {study.results.map((result, idx) => {
                            const IconComponent = result.icon;
                            return (
                              <div key={idx} className="text-center p-4 rounded-lg bg-card/50 border border-border/50">
                                <IconComponent className="h-8 w-8 text-primary mx-auto mb-2" />
                                <div className="text-2xl font-bold text-primary mb-1">{result.value}</div>
                                <div className="text-sm text-foreground/70">{result.metric}</div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Technologies & Description */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold text-lg mb-3">Implementation Details</h4>
                          <p className="text-foreground/80">{study.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                        {study.hasDetailedCaseStudy && (
                          <Button asChild className="flex-1">
                            <Link to={`/case-studies/${study.slug}`}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Full Case Study
                            </Link>
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setConsultationModalOpen(true)}
                        >
                          Get Similar Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Write Your <span className="gradient-text">Success Story</span>?
                </h2>
                <p className="text-xl text-foreground/80 mb-8">
                  Join hundreds of companies who've transformed their operations with AI automation. 
                  Get your custom strategy and ROI projection today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="btn-hero"
                    onClick={() => setConsultationModalOpen(true)}
                  >
                    Schedule Strategy Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/services">Explore AI Solutions</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        
        <ConsultationModal
          isOpen={consultationModalOpen}
          onClose={() => setConsultationModalOpen(false)}
        />
        <PopupManager page="case-studies" />
      </div>
    </>
  );
};

export default CaseStudies;