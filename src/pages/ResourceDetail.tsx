import { useParams, Link } from "react-router-dom";
import FutureFlowHeader from "@/components/FutureFlowHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Clock, Share2, BookOpen } from "lucide-react";
import resourceN8nGuide from "@/assets/resource-n8n-guide.jpg";
import resourceTemplates from "@/assets/resource-templates.jpg";
import resourceAiAssessment from "@/assets/resource-ai-assessment.jpg";
import resourceMarketingAutomation from "@/assets/resource-marketing-automation.jpg";
import resourceCustomerService from "@/assets/resource-customer-service.jpg";
import resourceEcommerce from "@/assets/resource-ecommerce.jpg";
import resourceFinancial from "@/assets/resource-financial.jpg";
import resourceHealthcare from "@/assets/resource-healthcare.jpg";

const ResourceDetail = () => {
  const { id } = useParams();

  const resources = [
    {
      id: 1,
      title: "Complete Guide to AI Workflow Automation for Business Growth",
      description: "A comprehensive 50-page guide covering AI automation fundamentals, implementation strategies, ROI calculation methods, and real-world case studies from Fortune 500 companies.",
      category: "Automation Guides",
      type: "PDF Guide",
      downloadCount: "12.5K+",
      readTime: "45 min read",
      tags: ["AI Automation", "Business Strategy", "ROI Analysis", "Implementation"],
      featured: true,
      image: resourceN8nGuide,
      content: `
        This comprehensive guide provides everything you need to know about implementing AI workflow automation in your business:

        **Chapter 1: Understanding AI Automation**
        - Definition and core concepts of AI-powered workflow automation
        - Difference between traditional automation and AI automation
        - Key benefits: cost reduction, efficiency gains, accuracy improvements
        - Common misconceptions and how to avoid them

        **Chapter 2: Business Case Development** 
        - ROI calculation frameworks and methodologies
        - Cost-benefit analysis templates
        - Risk assessment and mitigation strategies
        - Timeline planning and milestone setting

        **Chapter 3: Technology Stack Selection**
        - Evaluation criteria for automation platforms
        - n8n vs other workflow automation tools
        - Integration capabilities and API requirements
        - Scalability and security considerations

        **Chapter 4: Implementation Roadmap**
        - Phase-by-phase implementation approach
        - Team structure and skill requirements
        - Change management best practices
        - Success metrics and KPIs

        **Chapter 5: Real-World Case Studies**
        - E-commerce: 280% efficiency increase at mid-size retailer
        - Finance: Algorithmic trading system generating 34% annual returns
        - Manufacturing: Predictive maintenance reducing downtime by 70%
        - Healthcare: Patient workflow automation improving satisfaction by 45%

        **Chapter 6: Advanced Optimization Techniques**
        - AI model training and fine-tuning
        - Performance monitoring and optimization
        - Troubleshooting common issues
        - Scaling strategies for enterprise deployment
      `
    },
    {
      id: 2,
      title: "n8n Workflow Templates Library: 100+ Production-Ready Automations",
      description: "Extensive collection of battle-tested n8n workflow templates covering customer service, sales automation, marketing campaigns, data processing, and financial operations.",
      category: "Templates",
      type: "Template Pack",
      downloadCount: "8.3K+",
      readTime: "Variable",
      tags: ["n8n", "Workflow Templates", "Automation", "Production Ready"],
      featured: true,
      image: resourceTemplates,
      content: `
        **Customer Service Automation Templates:**
        - Ticket routing and escalation workflows
        - Automated response systems with sentiment analysis
        - Customer satisfaction survey automation
        - Support team performance tracking

        **Sales Process Automation:**
        - Lead qualification and scoring workflows  
        - Automated follow-up sequences
        - CRM synchronization and data cleaning
        - Sales pipeline management and reporting

        **Marketing Campaign Automation:**
        - Multi-channel campaign orchestration
        - A/B testing automation workflows
        - Social media posting and engagement tracking
        - Email marketing with behavioral triggers

        **Data Processing and Analytics:**
        - Real-time data ingestion and transformation
        - Automated report generation and distribution
        - Data quality monitoring and alerts
        - Cross-platform data synchronization

        **Financial Operations:**
        - Invoice processing and payment tracking
        - Expense report automation
        - Budget monitoring and alerts
        - Financial reporting and reconciliation
      `
    },
    {
      id: 3,
      title: "AI Implementation Framework: From Strategy to Execution",
      description: "Step-by-step framework for successful AI implementation including readiness assessment, technology selection, team building, and change management strategies.",
      category: "AI Implementation",
      type: "White Paper",
      downloadCount: "6.7K+",
      readTime: "35 min read",
      tags: ["AI Strategy", "Implementation", "Change Management", "Team Building"],
      image: resourceAiAssessment,
      content: `
        **Phase 1: Strategic Assessment**
        - Business objective alignment
        - Current capability evaluation
        - Gap analysis and prioritization
        - Budget and resource planning

        **Phase 2: Technology Selection**
        - Platform evaluation criteria
        - Vendor assessment framework
        - Proof of concept design
        - Risk mitigation strategies

        **Phase 3: Team Development**
        - Role definition and responsibilities
        - Skill gap analysis
        - Training program design
        - External talent acquisition

        **Phase 4: Pilot Implementation**
        - Use case selection
        - Success metrics definition
        - Testing and validation
        - Iteration and refinement

        **Phase 5: Scale and Optimization**
        - Rollout planning
        - Performance monitoring
        - Continuous improvement
        - ROI measurement and reporting
      `
    },
    {
      id: 4,
      title: "AI-Powered Customer Service Transformation Guide",
      description: "Transform customer support with AI chatbots, sentiment analysis, and automated ticket routing. Includes implementation blueprints and best practices.",
      category: "AI Implementation",
      type: "Implementation Guide",
      downloadCount: "5.2K+",
      readTime: "30 min read",
      tags: ["Customer Service", "AI Chatbots", "Automation", "Support"],
      image: resourceCustomerService,
      content: `
        **Customer Service AI Overview:**
        - Current challenges in customer support
        - AI solutions and their benefits
        - Integration with existing systems
        - Measuring success and ROI

        **Chatbot Implementation:**
        - Natural language processing setup
        - Conversation flow design
        - Training data preparation
        - Testing and refinement

        **Sentiment Analysis:**
        - Understanding customer emotions
        - Automated escalation triggers
        - Feedback categorization
        - Trend analysis and reporting

        **Ticket Automation:**
        - Smart routing algorithms
        - Priority assignment
        - SLA management
        - Performance analytics
      `
    },
    {
      id: 5,
      title: "Marketing Automation Playbook: AI-Driven Growth Strategies",
      description: "Leverage AI for personalized marketing campaigns, predictive analytics, and automated customer journeys. Includes campaign templates and analytics frameworks.",
      category: "Templates",
      type: "Playbook",
      downloadCount: "7.1K+",
      readTime: "40 min read",
      tags: ["Marketing", "Campaign Automation", "Personalization", "Analytics"],
      image: resourceMarketingAutomation,
      content: `
        **AI Marketing Fundamentals:**
        - Personalization at scale
        - Predictive customer behavior
        - Channel optimization
        - Budget allocation strategies

        **Campaign Automation:**
        - Email sequence design
        - Multi-touch attribution
        - A/B testing frameworks
        - Performance optimization

        **Customer Journey Mapping:**
        - Touchpoint identification
        - Behavioral triggers
        - Automated nurturing flows
        - Conversion optimization

        **Analytics and Reporting:**
        - KPI dashboard creation
        - ROI measurement
        - Attribution modeling
        - Predictive forecasting
      `
    },
    {
      id: 6,
      title: "E-commerce Automation Mastery: From Orders to Fulfillment",
      description: "Complete guide to e-commerce automation covering inventory management, order processing, customer communications, and analytics.",
      category: "n8n Workflows",
      type: "Implementation Guide",
      downloadCount: "4.8K+",
      readTime: "35 min read",
      tags: ["E-commerce", "Order Management", "Inventory", "Fulfillment"],
      image: resourceEcommerce,
      content: `
        **Order Processing Automation:**
        - Real-time order capture
        - Payment verification
        - Fraud detection
        - Order routing optimization

        **Inventory Management:**
        - Stock level monitoring
        - Automated reordering
        - Multi-warehouse coordination
        - Supplier integration

        **Customer Communications:**
        - Order confirmations
        - Shipping notifications
        - Delivery updates
        - Review requests

        **Returns and Refunds:**
        - Automated approval workflows
        - Refund processing
        - Inventory adjustments
        - Customer service integration
      `
    },
    {
      id: 7,
      title: "Financial Services AI Transformation Guide",
      description: "AI applications in financial services including fraud detection, risk assessment, algorithmic trading, and regulatory compliance automation.",
      category: "Case Studies",
      type: "Industry Guide",
      downloadCount: "3.9K+",
      readTime: "42 min read",
      tags: ["Finance", "Risk Management", "Compliance", "Trading"],
      image: resourceFinancial,
      content: `
        **Fraud Detection Systems:**
        - Real-time transaction monitoring
        - Anomaly detection algorithms
        - Risk scoring models
        - Alert management workflows

        **Risk Assessment:**
        - Credit scoring automation
        - Portfolio risk analysis
        - Stress testing scenarios
        - Regulatory reporting

        **Algorithmic Trading:**
        - Market data processing
        - Signal generation
        - Trade execution automation
        - Performance monitoring

        **Compliance Automation:**
        - KYC/AML workflows
        - Document verification
        - Audit trail management
        - Regulatory reporting
      `
    },
    {
      id: 8,
      title: "Healthcare Workflow Automation: Patient Care Excellence",
      description: "Transform healthcare operations with AI-powered patient scheduling, medical record management, billing automation, and care coordination.",
      category: "Case Studies",
      type: "Industry Guide",
      downloadCount: "4.5K+",
      readTime: "38 min read",
      tags: ["Healthcare", "Patient Care", "Medical Records", "Compliance"],
      image: resourceHealthcare,
      content: `
        **Patient Scheduling:**
        - Appointment optimization
        - Reminder automation
        - Cancellation management
        - Resource allocation

        **Medical Records:**
        - Digital documentation
        - Records management
        - HIPAA compliance
        - Provider access control

        **Billing and Insurance:**
        - Claims processing
        - Insurance verification
        - Payment collection
        - Revenue cycle optimization

        **Care Coordination:**
        - Referral management
        - Follow-up scheduling
        - Treatment plan tracking
        - Patient communication
      `
    }
  ];

  const resource = resources.find(r => r.id === parseInt(id || "0"));

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <FutureFlowHeader />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-4">Resource Not Found</h1>
          <p className="text-muted-foreground mb-8">The resource you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/resources">Back to Resources</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FutureFlowHeader />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <div className="mb-8">
          <Badge className="mb-4">{resource.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{resource.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{resource.description}</p>
          
          <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {resource.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              {resource.downloadCount} downloads
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {resource.type}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {resource.tags.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>

          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link to="/contact">
                <Download className="mr-2 h-4 w-4" />
                Request Full Resource
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <img 
            src={resource.image} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>

        <Card>
          <CardContent className="p-8 md:p-12">
            <div className="space-y-8">
              {resource.content.split('\n\n').map((section, index) => {
                const trimmedSection = section.trim();
                if (!trimmedSection) return null;

                // Check if it's a heading (starts with **)
                if (trimmedSection.startsWith('**') && trimmedSection.includes(':**')) {
                  const headingText = trimmedSection.replace(/\*\*/g, '').replace(':', '');
                  return (
                    <div key={index} className="space-y-4">
                      <h2 className="text-2xl font-bold text-foreground border-b border-border pb-3">
                        {headingText}
                      </h2>
                    </div>
                  );
                }

                // Check if it's a list section (contains bullet points)
                if (trimmedSection.includes('\n- ')) {
                  const lines = trimmedSection.split('\n');
                  return (
                    <ul key={index} className="space-y-3 ml-6">
                      {lines.map((line, lineIndex) => {
                        if (line.trim().startsWith('- ')) {
                          return (
                            <li key={lineIndex} className="text-muted-foreground leading-relaxed list-disc">
                              {line.replace('- ', '')}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  );
                }

                // Regular paragraph
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {trimmedSection}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement This?</h2>
          <p className="text-muted-foreground mb-6">
            Get personalized guidance and support for implementing these strategies in your business.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourceDetail;
