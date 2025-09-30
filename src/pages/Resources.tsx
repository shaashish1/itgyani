import { useState } from "react";
import resourcesHeroImage from "@/assets/resources-hero.jpg";
import resourceN8nGuide from "@/assets/resource-n8n-guide.jpg";
import resourceTemplates from "@/assets/resource-templates.jpg";
import resourceAiAssessment from "@/assets/resource-ai-assessment.jpg";
import resourceMarketingAutomation from "@/assets/resource-marketing-automation.jpg";
import resourceCustomerService from "@/assets/resource-customer-service.jpg";
import resourceEcommerce from "@/assets/resource-ecommerce.jpg";
import resourceFinancial from "@/assets/resource-financial.jpg";
import resourceHealthcare from "@/assets/resource-healthcare.jpg";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AIReadinessAssessment from "@/components/AIReadinessAssessment";
import ROICalculator from "@/components/ROICalculator";
import { 
  Search, 
  Download, 
  BookOpen, 
  Video, 
  FileText, 
  Lightbulb,
  Workflow,
  Bot,
  BarChart3,
  Settings,
  Users,
  Shield,
  Clock,
  Target,
  TrendingUp,
  Zap,
  CheckCircle,
  Calculator,
  CheckSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedWorkflowPackage, setSelectedWorkflowPackage] = useState<any>(null);
  const [isBrowseModalOpen, setIsBrowseModalOpen] = useState(false);

  const categories = [
    "All",
    "Automation Guides",
    "AI Implementation", 
    "n8n Workflows",
    "Business Intelligence",
    "Case Studies",
    "Templates",
    "Video Tutorials",
    "White Papers"
  ];

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
        - Expense approval workflows
        - Financial reporting automation
        - Budget monitoring and variance analysis

        **HR and People Operations:**
        - Employee onboarding automation
        - Performance review workflows
        - Time tracking and payroll integration
        - Training program management

        Each template includes:
        - Complete workflow configuration files
        - Step-by-step setup instructions
        - Customization guidelines
        - Troubleshooting tips
        - Performance optimization recommendations
      `
    },
    {
      id: 3,
      title: "AI Implementation Maturity Assessment Framework",
      description: "Scientific framework for evaluating your organization's AI readiness, identifying gaps, and creating a roadmap for successful AI adoption across all business functions.",
      category: "AI Implementation",
      type: "Assessment Tool",
      downloadCount: "6.7K+",
      readTime: "30 min assessment",
      tags: ["AI Readiness", "Maturity Assessment", "Digital Transformation", "Strategy"],
      featured: false,
      image: resourceAiAssessment,
      content: `
        **Assessment Dimensions:**

        **1. Technical Infrastructure (25 points)**
        - Data quality and accessibility
        - Cloud infrastructure capabilities
        - Integration architecture
        - Security and compliance framework
        - Development and deployment pipeline

        **2. Data and Analytics Capabilities (25 points)**
        - Data governance and management
        - Analytics tools and platforms
        - Data science team capabilities
        - Machine learning infrastructure
        - Real-time processing capabilities

        **3. Organizational Readiness (25 points)**
        - Leadership commitment and vision
        - Change management capabilities
        - Skills and training programs
        - Cultural adaptability
        - Cross-functional collaboration

        **4. Process and Workflow Maturity (25 points)**
        - Process documentation and standardization
        - Automation existing capabilities
        - Performance measurement systems
        - Continuous improvement culture
        - Scalability of current processes

        **Scoring and Recommendations:**
        - 90-100 points: AI-Ready Leader
        - 75-89 points: Advanced Implementer
        - 60-74 points: Developing Foundation
        - 45-59 points: Building Basics
        - Below 45: Foundational Development Needed

        **Detailed Action Plans for Each Level:**
        Each scoring tier comes with specific recommendations, timelines, and resource requirements for advancing to the next level.
      `
    },
    {
      id: 4,
      title: "Business Intelligence Automation: From Data to Decisions in Minutes",
      description: "Master the art of automated business intelligence with advanced analytics workflows, real-time dashboards, and AI-powered insights that drive strategic decision-making.",
      category: "Business Intelligence",
      type: "Video Course",
      downloadCount: "4.2K+",
      readTime: "3 hours",
      tags: ["Business Intelligence", "Data Analytics", "Decision Making", "Automation"],
      featured: false,
      image: resourceMarketingAutomation,
      content: `
        **Module 1: BI Automation Fundamentals (30 minutes)**
        - Traditional BI vs Automated BI
        - Key components of automated business intelligence
        - ROI calculation for BI automation projects
        - Common pitfalls and how to avoid them

        **Module 2: Data Pipeline Automation (45 minutes)**
        - ETL/ELT process automation
        - Data quality monitoring and validation
        - Real-time data streaming and processing
        - Error handling and recovery mechanisms

        **Module 3: Analytics Workflow Design (40 minutes)**
        - Automated report generation
        - KPI monitoring and alerting systems
        - Predictive analytics integration
        - Custom dashboard automation

        **Module 4: AI-Powered Insights (35 minutes)**
        - Natural language query processing
        - Anomaly detection and alerting
        - Automated trend analysis
        - Recommendation engine integration

        **Module 5: Implementation Best Practices (30 minutes)**
        - Stakeholder engagement strategies
        - Performance optimization techniques
        - Security and compliance considerations
        - Scaling and maintenance planning

        **Bonus Materials:**
        - 20+ ready-to-use BI automation templates
        - Performance benchmarking tools
        - Vendor evaluation checklist
        - Implementation project timeline template
      `
    },
    {
      id: 5,
      title: "Customer Service AI Revolution: Complete Implementation Guide",
      description: "Transform your customer service operations with AI-powered automation. Includes chatbot development, sentiment analysis, ticket routing, and performance optimization strategies.",
      category: "Case Studies",
      type: "Implementation Guide",
      downloadCount: "5.8K+",
      readTime: "35 min read",
      tags: ["Customer Service", "AI Chatbots", "Automation", "CX Optimization"],
      featured: false,
      image: resourceCustomerService,
      content: `
        **Executive Summary:**
        This guide presents a comprehensive approach to revolutionizing customer service through AI automation, based on successful implementations across 150+ companies.

        **Current State Analysis:**
        - Average response time reduction: 85%
        - Customer satisfaction improvement: 42%
        - Operational cost reduction: 55%
        - Agent productivity increase: 180%

        **Implementation Framework:**

        **Phase 1: Foundation (Weeks 1-4)**
        - Customer journey mapping and pain point identification
        - Current system audit and integration planning
        - Team training and change management preparation
        - Technology stack selection and procurement

        **Phase 2: Core AI Implementation (Weeks 5-12)**
        - Chatbot development and training
        - Natural language processing setup
        - Sentiment analysis integration
        - Automated ticket routing configuration

        **Phase 3: Advanced Features (Weeks 13-20)**
        - Predictive customer insights
        - Proactive issue resolution
        - Omnichannel integration
        - Advanced analytics and reporting

        **Phase 4: Optimization (Weeks 21-24)**
        - Performance monitoring and tuning
        - AI model refinement
        - Process optimization
        - ROI measurement and reporting

        **Technology Components:**
        - AI chatbot platforms and configuration
        - Natural language processing engines
        - Sentiment analysis tools
        - Integration APIs and webhooks
        - Analytics and reporting dashboards

        **Success Metrics and KPIs:**
        - First contact resolution rate
        - Average handling time
        - Customer satisfaction scores
        - Agent utilization rates
        - Cost per interaction
      `
    },
    {
      id: 6,
      title: "E-commerce Automation Mastery: Complete Sales Funnel Optimization",
      description: "End-to-end guide for automating e-commerce operations including inventory management, customer acquisition, retention workflows, and revenue optimization strategies.",
      category: "Automation Guides",
      type: "Masterclass",
      downloadCount: "7.1K+",
      readTime: "4 hours",
      tags: ["E-commerce", "Sales Automation", "Revenue Optimization", "Customer Retention"],
      featured: true,
      image: resourceEcommerce,
      content: `
        **Section 1: E-commerce Automation Strategy**
        - Market analysis and competitive positioning
        - Customer lifecycle automation mapping
        - Technology stack evaluation and selection
        - ROI forecasting and budgeting

        **Section 2: Customer Acquisition Automation**
        - Multi-channel marketing automation
        - SEO and content marketing workflows
        - Social media automation strategies
        - Paid advertising optimization

        **Section 3: Sales Process Automation**
        - Shopping cart abandonment recovery
        - Personalized product recommendations
        - Dynamic pricing strategies
        - Inventory management automation

        **Section 4: Customer Retention and Loyalty**
        - Automated email marketing sequences
        - Customer segmentation and targeting
        - Loyalty program automation
        - Review and feedback collection

        **Section 5: Operations and Fulfillment**
        - Order processing automation
        - Shipping and logistics optimization
        - Returns and refunds handling
        - Supplier and vendor management

        **Section 6: Analytics and Optimization**
        - Real-time performance monitoring
        - A/B testing automation
        - Conversion rate optimization
        - Revenue forecasting and planning

        **Practical Implementation:**
        - 50+ automation workflow templates
        - Platform-specific setup guides (Shopify, WooCommerce, Magento)
        - Integration tutorials for popular tools
        - Troubleshooting and optimization tips

        **Case Studies:**
        - Mid-size retailer: 127% revenue increase
        - Fashion brand: 85% reduction in cart abandonment
        - Electronics store: 45% improvement in customer lifetime value
      `
    },
    {
      id: 7,
      title: "Financial Services AI Transformation: Risk, Compliance, and Growth",
      description: "Comprehensive guide for implementing AI automation in financial services, covering algorithmic trading, risk management, compliance automation, and customer onboarding.",
      category: "AI Implementation",
      type: "Industry Guide",
      downloadCount: "3.9K+",
      readTime: "50 min read",
      tags: ["Financial Services", "Risk Management", "Compliance", "Algorithmic Trading"],
      featured: false,
      image: resourceFinancial,
      content: `
        **Introduction to Financial AI Automation:**
        The financial services industry is undergoing rapid transformation through AI automation. This guide provides a roadmap for implementation while maintaining regulatory compliance and risk management standards.

        **Chapter 1: Regulatory Landscape and Compliance**
        - Overview of financial regulations (SOX, GDPR, Basel III, MiFID II)
        - AI governance frameworks for financial institutions
        - Compliance automation strategies
        - Audit trail and documentation requirements

        **Chapter 2: Risk Management Automation**
        - Automated risk assessment and scoring
        - Real-time fraud detection systems
        - Credit risk modeling and automation
        - Market risk monitoring and alerts

        **Chapter 3: Algorithmic Trading Systems**
        - Trading strategy development and backtesting
        - Risk-adjusted portfolio optimization
        - Execution algorithms and market making
        - Performance monitoring and reporting

        **Chapter 4: Customer Onboarding and KYC**
        - Automated identity verification
        - Document processing and validation
        - AML (Anti-Money Laundering) automation
        - Customer due diligence workflows

        **Chapter 5: Investment Advisory Automation**
        - Robo-advisor platform development
        - Portfolio rebalancing automation
        - Tax-loss harvesting strategies
        - Client reporting and communication

        **Chapter 6: Operational Excellence**
        - Trade settlement automation
        - Regulatory reporting workflows
        - Internal audit automation
        - Cost optimization strategies

        **Implementation Roadmap:**
        - 24-month phased implementation plan
        - Team structure and skill requirements
        - Technology vendor evaluation
        - Success metrics and KPIs

        **Risk Mitigation Strategies:**
        - Model validation and testing protocols
        - Disaster recovery and business continuity
        - Cybersecurity considerations
        - Third-party risk management
      `
    },
    {
      id: 8,
      title: "Healthcare Workflow Automation: Patient Care and Operational Efficiency",
      description: "Specialized guide for healthcare organizations implementing AI automation for patient scheduling, clinical workflows, billing processes, and care coordination.",
      category: "Case Studies",
      type: "Healthcare Guide",
      downloadCount: "2.8K+",
      readTime: "40 min read",
      tags: ["Healthcare", "Patient Care", "Clinical Workflows", "HIPAA Compliance"],
      featured: false,
      image: resourceHealthcare,
      content: `
        **Healthcare AI Automation Overview:**
        Healthcare automation requires special consideration for patient privacy, regulatory compliance, and clinical safety. This guide provides proven frameworks for successful implementation.

        **Section 1: Regulatory Compliance and Privacy**
        - HIPAA compliance requirements for AI systems
        - Patient data protection strategies
        - Audit logging and access controls
        - Consent management automation

        **Section 2: Patient Scheduling and Access**
        - Intelligent appointment scheduling
        - Wait list management and optimization
        - Patient communication automation
        - Insurance verification workflows

        **Section 3: Clinical Workflow Automation**
        - Electronic health record (EHR) integration
        - Clinical decision support systems
        - Medication management and alerts
        - Care plan automation and tracking

        **Section 4: Revenue Cycle Management**
        - Automated medical coding and billing
        - Claims processing and denial management
        - Payment posting and reconciliation
        - Financial assistance program automation

        **Section 5: Quality and Safety Monitoring**
        - Patient safety event tracking
        - Quality measure automation
        - Infection control monitoring
        - Risk stratification and intervention

        **Section 6: Population Health Management**
        - Chronic disease management programs
        - Preventive care automation
        - Health outcome tracking and reporting
        - Community health initiatives

        **Implementation Considerations:**
        - Clinical workflow integration strategies
        - Staff training and change management
        - Vendor selection and procurement
        - Performance measurement and optimization

        **Case Studies:**
        - Large health system: 30% reduction in administrative costs
        - Specialty clinic: 45% improvement in patient satisfaction
        - Rural hospital: 25% increase in operational efficiency
        - Telemedicine platform: 60% reduction in appointment scheduling time
      `
    }
  ];

  const whitepapers = [
    {
      id: 1,
      title: "The Future of Work: AI Automation Impact on Employment and Skills",
      description: "Research-based analysis of how AI automation is reshaping the job market, creating new opportunities, and transforming skill requirements across industries.",
      category: "White Papers",
      downloadCount: "15.2K+",
      pages: 42,
      tags: ["Future of Work", "Employment", "Skills Development", "Industry Analysis"]
    },
    {
      id: 2,
      title: "ROI Analysis: Quantifying the Business Value of AI Automation",
      description: "Comprehensive methodology for calculating and measuring the return on investment from AI automation initiatives, with real-world data and benchmarks.",
      category: "White Papers",
      downloadCount: "11.8K+",
      pages: 38,
      tags: ["ROI Analysis", "Business Value", "Financial Metrics", "Performance Measurement"]
    },
    {
      id: 3,
      title: "Security and Compliance in AI Automation: Best Practices Guide",
      description: "Essential security frameworks, compliance requirements, and risk management strategies for implementing AI automation in regulated industries.",
      category: "White Papers",
      downloadCount: "9.4K+",
      pages: 35,
      tags: ["Security", "Compliance", "Risk Management", "Governance"]
    }
  ];

  const videoTutorials = [
    {
      id: 1,
      title: "Building Your First AI Automation Workflow",
      duration: "45 minutes",
      difficulty: "Beginner",
      views: "28.5K",
      category: "Video Tutorials",
      description: "Step-by-step tutorial for creating your first automated workflow using n8n and AI components.",
      tags: ["n8n Workflows", "AI Implementation", "Automation Guides"]
    },
    {
      id: 2,
      title: "Advanced Data Processing with AI Automation",
      duration: "1 hour 15 minutes", 
      difficulty: "Advanced",
      views: "12.3K",
      category: "Video Tutorials",
      description: "Deep dive into complex data processing workflows, machine learning integration, and performance optimization.",
      tags: ["Business Intelligence", "AI Implementation", "Automation Guides"]
    },
    {
      id: 3,
      title: "Customer Service Chatbot Development",
      duration: "55 minutes",
      difficulty: "Intermediate",
      views: "19.7K",
      category: "Video Tutorials",
      description: "Complete guide to building intelligent chatbots for customer service with natural language processing.",
      tags: ["AI Implementation", "Case Studies", "Automation Guides"]
    }
  ];

  const workflowUseCases = [
    {
      id: 1,
      title: "Slack Communication Workflows",
      description: "Production-ready Slack automation workflows for team communication, notifications, and integrations.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "15+",
      integrations: ["Slack", "Stripe", "Typeform", "HubSpot", "Hunter", "GraphQL"],
      complexity: "Medium",
      tags: ["Slack", "Team Communication", "Notifications", "CRM Integration"],
      downloadableWorkflows: [
        {
          name: "Slack Stripe Payment Notifications",
          filename: "0008_Slack_Stripe_Create_Triggered.json",
          description: "Get Slack notifications when Stripe payments are created",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Slack/0008_Slack_Stripe_Create_Triggered.json"
        },
        {
          name: "Slack Typeform Response Automation",
          filename: "0124_Slack_Typeform_Create_Triggered.json", 
          description: "Automatically send Typeform responses to Slack channels",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Slack/0124_Slack_Typeform_Create_Triggered.json"
        },
        {
          name: "Slack HubSpot Lead Notifications",
          filename: "1172_Slack_HubSpot_Send_Triggered.json",
          description: "Send Slack alerts for new HubSpot leads and contacts",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Slack/1172_Slack_HubSpot_Send_Triggered.json"
        },
        {
          name: "Slack Email Integration Workflow", 
          filename: "1194_Slack_Emailreadimap_Create.json",
          description: "Monitor IMAP email and send summaries to Slack",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Slack/1194_Slack_Emailreadimap_Create.json"
        }
      ],
      useCases: [
        "Automated team notifications and alerts",
        "Payment and transaction notifications", 
        "Form submission alerts",
        "CRM integration notifications",
        "Email workflow automation",
        "Cross-platform data synchronization"
      ]
    },
    {
      id: 2,
      title: "Airtable Data Management Workflows",
      description: "Automate Airtable operations with webhook triggers, data processing, and third-party integrations.",
      category: "n8n Workflows", 
      type: "JSON Workflows",
      workflowCount: "3+",
      integrations: ["Airtable", "Mindee", "Vonage", "Webhooks", "SMS"],
      complexity: "Medium",
      tags: ["Airtable", "Database", "Data Processing", "Document Processing"],
      downloadableWorkflows: [
        {
          name: "Airtable Record Creation Trigger",
          filename: "0756_Airtable_Create_Triggered.json",
          description: "Trigger workflows when new records are created in Airtable",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/0756_Airtable_Create_Triggered.json"
        },
        {
          name: "Airtable + Mindee Document Processing",
          filename: "1120_Airtable_Mindee_Automate_Webhook.json",
          description: "Process documents with Mindee AI and store results in Airtable",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/1120_Airtable_Mindee_Automate_Webhook.json"
        },
        {
          name: "Airtable + Vonage SMS Automation",
          filename: "1138_Airtable_Vonage_Automation_Scheduled.json",
          description: "Send SMS notifications via Vonage based on Airtable data",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/1138_Airtable_Vonage_Automation_Scheduled.json"
        }
      ],
      useCases: [
        "Automated database record processing",
        "Document analysis and data extraction",
        "SMS notification workflows",
        "Webhook-triggered data operations",
        "Third-party API integrations",
        "Scheduled data synchronization"
      ]
    },
    {
      id: 3,
      title: "Gmail Email Automation Workflows",
      description: "Automate Gmail operations with Google Drive integration, calendar sync, and email processing.",
      category: "n8n Workflows",
      type: "JSON Workflows", 
      workflowCount: "7+",
      integrations: ["Gmail", "Google Drive", "Google Sheets", "Google Calendar", "Binary Data"],
      complexity: "Medium",
      tags: ["Gmail", "Email Automation", "Google Workspace", "File Management"],
      downloadableWorkflows: [
        {
          name: "Gmail to Google Drive Backup",
          filename: "0036_Gmail_GoogleDrive_Import.json",
          description: "Automatically save Gmail attachments to Google Drive",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Gmail/0036_Gmail_GoogleDrive_Import.json"
        },
        {
          name: "Gmail Binary Data Processing",
          filename: "0221_Gmail_Movebinarydata_Send.json", 
          description: "Process and move binary data from Gmail attachments",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Gmail/0221_Gmail_Movebinarydata_Send.json"
        },
        {
          name: "Gmail Calendar Integration",
          filename: "0319_Gmail_Googlecalendartool_Send_Triggered.json",
          description: "Create calendar events from Gmail content automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Gmail/0319_Gmail_Googlecalendartool_Send_Triggered.json"
        },
        {
          name: "Gmail to Google Sheets Logger",
          filename: "0852_Gmail_GoogleSheets_Create_Triggered.json",
          description: "Log Gmail data to Google Sheets for tracking and analysis", 
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Gmail/0852_Gmail_GoogleSheets_Create_Triggered.json"
        }
      ],
      useCases: [
        "Automated email backup and archiving",
        "Gmail attachment processing",
        "Email-to-calendar integration",
        "Email data logging and tracking",
        "Google Workspace automation",
        "Email-triggered workflows"
      ]
    },
    {
      id: 4,
      title: "HubSpot CRM Automation Workflows",
      description: "Streamline HubSpot CRM operations with automated lead management, contact sync, and deal tracking.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "8+",
      integrations: ["HubSpot", "Gmail", "Slack", "Google Sheets", "Webhooks"],
      complexity: "Medium",
      tags: ["HubSpot", "CRM", "Lead Management", "Sales Automation"],
      downloadableWorkflows: [
        {
          name: "HubSpot Contact Creation Automation",
          filename: "0007_HubSpot_Create_Triggered.json",
          description: "Automatically create HubSpot contacts from form submissions",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/HubSpot/0007_HubSpot_Create_Triggered.json"
        },
        {
          name: "HubSpot Email Campaign Integration",
          filename: "0015_HubSpot_Emailsend_Send.json",
          description: "Send automated email campaigns through HubSpot",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/HubSpot/0015_HubSpot_Emailsend_Send.json"
        },
        {
          name: "HubSpot + Google Sheets Sync",
          filename: "0197_HubSpot_GoogleSheets_Update.json",
          description: "Sync HubSpot data with Google Sheets automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/HubSpot/0197_HubSpot_GoogleSheets_Update.json"
        },
        {
          name: "HubSpot Deal Stage Notifications",
          filename: "0984_HubSpot_Slack_Send_Triggered.json",
          description: "Get Slack notifications when HubSpot deals change stages",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/HubSpot/0984_HubSpot_Slack_Send_Triggered.json"
        }
      ],
      useCases: [
        "Automated contact creation and enrichment",
        "Lead scoring and qualification workflows",
        "Sales pipeline stage notifications",
        "Email campaign automation",
        "CRM data synchronization",
        "Deal tracking and reporting"
      ]
    },
    {
      id: 5,
      title: "Notion Workspace Automation",
      description: "Automate Notion databases, pages, and workflows for enhanced productivity and team collaboration.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "12+",
      integrations: ["Notion", "Google Calendar", "Slack", "Telegram", "RSS Feeds"],
      complexity: "Medium",
      tags: ["Notion", "Productivity", "Database Management", "Team Collaboration"],
      downloadableWorkflows: [
        {
          name: "Notion Database Creation Trigger",
          filename: "0011_Notion_Create_Triggered.json",
          description: "Trigger workflows when new items are added to Notion databases",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Notion/0011_Notion_Create_Triggered.json"
        },
        {
          name: "Notion + Google Calendar Sync",
          filename: "0048_Notion_GoogleCalendar_Create_Scheduled.json",
          description: "Sync Notion tasks with Google Calendar events",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Notion/0048_Notion_GoogleCalendar_Create_Scheduled.json"
        },
        {
          name: "Notion RSS Feed Aggregator",
          filename: "0081_Notion_RssFeedRead_Create_Scheduled.json",
          description: "Automatically add RSS feed articles to Notion databases",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Notion/0081_Notion_RssFeedRead_Create_Scheduled.json"
        },
        {
          name: "Notion Slack Integration",
          filename: "0326_Notion_Slack_Create_Triggered.json",
          description: "Post Notion updates to Slack channels automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Notion/0326_Notion_Slack_Create_Triggered.json"
        }
      ],
      useCases: [
        "Automated task and project management",
        "Calendar integration and scheduling",
        "Content aggregation from RSS feeds",
        "Team notification workflows",
        "Database automation and syncing",
        "Knowledge base management"
      ]
    },
    {
      id: 6,
      title: "Telegram Bot Automation Workflows",
      description: "Build powerful Telegram bots with automated messaging, notifications, and interactive commands.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "15+",
      integrations: ["Telegram", "OpenAI", "RSS Feeds", "HTTP", "Webhooks", "GitHub"],
      complexity: "Low to Medium",
      tags: ["Telegram", "Chatbot", "Messaging", "Notifications"],
      downloadableWorkflows: [
        {
          name: "Telegram Schedule Automation",
          filename: "0001_Telegram_Schedule_Automation_Scheduled.json",
          description: "Schedule automated Telegram messages and notifications",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Telegram/0001_Telegram_Schedule_Automation_Scheduled.json"
        },
        {
          name: "Telegram Webhook Automation",
          filename: "0140_Telegram_Webhook_Automation_Webhook.json",
          description: "Respond to Telegram messages with automated webhook triggers",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Telegram/0140_Telegram_Webhook_Automation_Webhook.json"
        },
        {
          name: "Telegram NASA Daily Updates",
          filename: "0231_Telegram_Nasa_Send_Scheduled.json",
          description: "Send daily NASA astronomy pictures to Telegram",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Telegram/0231_Telegram_Nasa_Send_Scheduled.json"
        },
        {
          name: "Telegram Wait Automation",
          filename: "0170_Telegram_Wait_Automation_Scheduled.json",
          description: "Create timed Telegram workflows with wait conditions",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Telegram/0170_Telegram_Wait_Automation_Scheduled.json"
        }
      ],
      useCases: [
        "Automated customer support chatbots",
        "News and content distribution",
        "Team notifications and alerts",
        "GitHub repository monitoring",
        "AI-powered conversational interfaces",
        "Scheduled announcements and reminders"
      ]
    },
    {
      id: 7,
      title: "Google Sheets Data Automation",
      description: "Automate spreadsheet operations with data sync, reporting, and third-party integrations.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "20+",
      integrations: ["Google Sheets", "Gmail", "Slack", "Airtable", "HTTP", "OpenAI"],
      complexity: "Low to Medium",
      tags: ["Google Sheets", "Data Processing", "Spreadsheets", "Reporting"],
      downloadableWorkflows: [
        {
          name: "Google Sheets Row Trigger",
          filename: "0004_GoogleSheets_Create_Triggered.json",
          description: "Trigger workflows when new rows are added to Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Google%20Sheets/0004_GoogleSheets_Create_Triggered.json"
        },
        {
          name: "Google Sheets + Slack Integration",
          filename: "0039_GoogleSheets_Slack_Send_Scheduled.json",
          description: "Send Google Sheets data summaries to Slack on schedule",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Google%20Sheets/0039_GoogleSheets_Slack_Send_Scheduled.json"
        },
        {
          name: "Google Sheets AI Data Enrichment",
          filename: "0734_GoogleSheets_OpenAI_Update_Scheduled.json",
          description: "Enrich Google Sheets data using OpenAI automation",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Google%20Sheets/0734_GoogleSheets_OpenAI_Update_Scheduled.json"
        },
        {
          name: "Gmail to Google Sheets Logger",
          filename: "0852_Gmail_GoogleSheets_Create_Triggered.json",
          description: "Automatically log Gmail data to Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Gmail/0852_Gmail_GoogleSheets_Create_Triggered.json"
        }
      ],
      useCases: [
        "Automated data logging and tracking",
        "Real-time reporting and dashboards",
        "Email to spreadsheet automation",
        "AI-powered data enrichment",
        "Cross-platform data synchronization",
        "Scheduled report generation"
      ]
    },
    {
      id: 8,
      title: "Discord Server Automation",
      description: "Automate Discord server management with bots, notifications, and community engagement workflows.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "10+",
      integrations: ["Discord", "GitHub", "Twitter", "RSS Feeds", "OpenAI", "Webhooks"],
      complexity: "Medium",
      tags: ["Discord", "Community Management", "Bots", "Notifications"],
      downloadableWorkflows: [
        {
          name: "Discord Cron Automation",
          filename: "0360_Discord_Cron_Automation_Scheduled.json",
          description: "Schedule automated messages to Discord channels on cron",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Discord/0360_Discord_Cron_Automation_Scheduled.json"
        },
        {
          name: "Discord Hunter Integration",
          filename: "2028_Discord_Hunter_Automate_Triggered.json",
          description: "Automate Discord notifications with Hunter email finder",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Discord/2028_Discord_Hunter_Automate_Triggered.json"
        }
      ],
      useCases: [
        "Automated community announcements",
        "GitHub repository monitoring",
        "Content aggregation and sharing",
        "AI-powered moderation",
        "Welcome messages and onboarding",
        "Event notifications and reminders"
      ]
    },
    {
      id: 9,
      title: "Trello Project Management Automation",
      description: "Automate Trello boards with card creation, task management, and team collaboration workflows.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "8+",
      integrations: ["Trello", "Slack", "Gmail", "Google Calendar", "Webhooks"],
      complexity: "Low to Medium",
      tags: ["Trello", "Project Management", "Task Automation", "Team Collaboration"],
      downloadableWorkflows: [
        {
          name: "Trello Card Creation Webhook",
          filename: "0003_Trello_Create_Webhook.json",
          description: "Trigger workflows when new Trello cards are created",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Trello/0003_Trello_Create_Webhook.json"
        },
        {
          name: "Trello + Slack Notifications",
          filename: "0072_Trello_Slack_Send_Webhook.json",
          description: "Send Trello updates to Slack channels automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Trello/0072_Trello_Slack_Send_Webhook.json"
        },
        {
          name: "Gmail to Trello Card Automation",
          filename: "0368_Trello_Gmail_Create_Triggered.json",
          description: "Create Trello cards from Gmail messages automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Trello/0368_Trello_Gmail_Create_Triggered.json"
        },
        {
          name: "Trello Calendar Sync",
          filename: "0533_Trello_GoogleCalendar_Create_Scheduled.json",
          description: "Sync Trello due dates with Google Calendar events",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Trello/0533_Trello_GoogleCalendar_Create_Scheduled.json"
        }
      ],
      useCases: [
        "Automated task creation and assignment",
        "Team notification workflows",
        "Email-to-task conversion",
        "Calendar integration and scheduling",
        "Project progress tracking",
        "Cross-platform task synchronization"
      ]
    },
    {
      id: 10,
      title: "Twitter/X Social Media Automation",
      description: "Automate Twitter/X operations with posting, monitoring, and engagement workflows.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "12+",
      integrations: ["Twitter/X", "OpenAI", "RSS Feeds", "Google Sheets", "Webhooks"],
      complexity: "Medium",
      tags: ["Twitter", "Social Media", "Content Publishing", "Automation"],
      downloadableWorkflows: [
        {
          name: "Twitter Auto-Post Workflow",
          filename: "0055_Twitter_Send_Scheduled.json",
          description: "Schedule and automatically post tweets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Twitter/0055_Twitter_Send_Scheduled.json"
        },
        {
          name: "RSS to Twitter Auto-Publisher",
          filename: "0156_Twitter_RssFeedRead_Send_Scheduled.json",
          description: "Automatically share RSS feed content on Twitter",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Twitter/0156_Twitter_RssFeedRead_Send_Scheduled.json"
        },
        {
          name: "Twitter AI Content Generator",
          filename: "0891_Twitter_OpenAI_Send_Scheduled.json",
          description: "Generate and post AI-powered tweets automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Twitter/0891_Twitter_OpenAI_Send_Scheduled.json"
        },
        {
          name: "Twitter Mention Monitor",
          filename: "1043_Twitter_GoogleSheets_Create_Scheduled.json",
          description: "Track and log Twitter mentions to Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Twitter/1043_Twitter_GoogleSheets_Create_Scheduled.json"
        }
      ],
      useCases: [
        "Automated content scheduling and posting",
        "RSS feed to Twitter integration",
        "AI-powered content generation",
        "Brand mention tracking",
        "Engagement monitoring and analytics",
        "Multi-account management"
      ]
    },
    {
      id: 11,
      title: "LinkedIn Professional Networking",
      description: "Automate LinkedIn activities including posting, lead generation, and professional engagement.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "6+",
      integrations: ["LinkedIn", "Google Sheets", "HubSpot", "OpenAI", "RSS Feeds"],
      complexity: "Medium",
      tags: ["LinkedIn", "Networking", "B2B", "Lead Generation"],
      downloadableWorkflows: [
        {
          name: "LinkedIn Auto-Post Workflow",
          filename: "0134_LinkedIn_Send_Scheduled.json",
          description: "Schedule and publish LinkedIn posts automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/LinkedIn/0134_LinkedIn_Send_Scheduled.json"
        },
        {
          name: "LinkedIn Lead Tracker",
          filename: "0487_LinkedIn_GoogleSheets_Create_Scheduled.json",
          description: "Track LinkedIn leads and log them to Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/LinkedIn/0487_LinkedIn_GoogleSheets_Create_Scheduled.json"
        },
        {
          name: "LinkedIn + HubSpot Integration",
          filename: "0765_LinkedIn_HubSpot_Create_Triggered.json",
          description: "Sync LinkedIn connections with HubSpot CRM",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/LinkedIn/0765_LinkedIn_HubSpot_Create_Triggered.json"
        }
      ],
      useCases: [
        "Automated professional content publishing",
        "Lead generation and tracking",
        "CRM integration and enrichment",
        "Network growth automation",
        "Engagement monitoring",
        "B2B marketing automation"
      ]
    },
    {
      id: 12,
      title: "Stripe Payment Processing",
      description: "Automate payment workflows with Stripe integration for invoicing, subscriptions, and notifications.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "10+",
      integrations: ["Stripe", "Slack", "Gmail", "Google Sheets", "Webhooks", "QuickBooks"],
      complexity: "Medium to High",
      tags: ["Payments", "Stripe", "E-commerce", "Billing"],
      downloadableWorkflows: [
        {
          name: "Stripe Payment Success Webhook",
          filename: "0002_Stripe_Webhook.json",
          description: "Trigger workflows when Stripe payments succeed",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Stripe/0002_Stripe_Webhook.json"
        },
        {
          name: "Stripe + Slack Payment Notifications",
          filename: "0008_Slack_Stripe_Create_Triggered.json",
          description: "Get Slack notifications for Stripe payment events",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Slack/0008_Slack_Stripe_Create_Triggered.json"
        },
        {
          name: "Stripe Invoice Generator",
          filename: "0245_Stripe_GoogleSheets_Create_Scheduled.json",
          description: "Automatically generate and send Stripe invoices",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Stripe/0245_Stripe_GoogleSheets_Create_Scheduled.json"
        },
        {
          name: "Stripe Subscription Management",
          filename: "0598_Stripe_Gmail_Send_Webhook.json",
          description: "Manage Stripe subscriptions with email notifications",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Stripe/0598_Stripe_Gmail_Send_Webhook.json"
        }
      ],
      useCases: [
        "Automated payment confirmation emails",
        "Subscription lifecycle management",
        "Invoice generation and tracking",
        "Payment failure notifications",
        "Revenue reporting automation",
        "Accounting system integration"
      ]
    },
    {
      id: 13,
      title: "Airtable Database Automation",
      description: "Automate Airtable database operations including record creation, updates, and data syncing.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "10+",
      integrations: ["Airtable", "Slack", "Gmail", "Google Sheets", "Webhooks"],
      complexity: "Medium",
      tags: ["Airtable", "Database", "Data Management", "Automation"],
      downloadableWorkflows: [
        {
          name: "Airtable Record Webhook Trigger",
          filename: "0005_Airtable_Create_Webhook.json",
          description: "Trigger workflows when new Airtable records are created",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/0005_Airtable_Create_Webhook.json"
        },
        {
          name: "Airtable Slack Integration",
          filename: "0022_Airtable_Slack_Send_Triggered.json",
          description: "Send Airtable updates to Slack channels automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/0022_Airtable_Slack_Send_Triggered.json"
        },
        {
          name: "Airtable Email Notification",
          filename: "0196_Airtable_Gmail_Send_Triggered.json",
          description: "Send Gmail notifications when Airtable records change",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Airtable/0196_Airtable_Gmail_Send_Triggered.json"
        }
      ],
      useCases: [
        "Automated database record creation",
        "Real-time data synchronization",
        "Team notification workflows",
        "Data validation and quality checks",
        "Cross-platform data integration",
        "Automated reporting and analytics"
      ]
    },
    {
      id: 14,
      title: "Asana Task Management Automation",
      description: "Streamline project management with Asana task automation and team collaboration workflows.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "7+",
      integrations: ["Asana", "Slack", "Gmail", "Google Calendar", "Webhooks"],
      complexity: "Medium",
      tags: ["Asana", "Project Management", "Task Tracking", "Team Productivity"],
      downloadableWorkflows: [
        {
          name: "Asana Task Creation Webhook",
          filename: "0013_Asana_Create_Webhook.json",
          description: "Trigger workflows when new Asana tasks are created",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Asana/0013_Asana_Create_Webhook.json"
        },
        {
          name: "Asana + Slack Notifications",
          filename: "0089_Asana_Slack_Send_Webhook.json",
          description: "Send Asana updates to Slack automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Asana/0089_Asana_Slack_Send_Webhook.json"
        },
        {
          name: "Gmail to Asana Task Creator",
          filename: "0423_Asana_Gmail_Create_Triggered.json",
          description: "Create Asana tasks from Gmail messages",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Asana/0423_Asana_Gmail_Create_Triggered.json"
        }
      ],
      useCases: [
        "Automated task creation and assignment",
        "Team notification workflows",
        "Email-to-task conversion",
        "Project deadline tracking",
        "Cross-platform synchronization",
        "Progress reporting automation"
      ]
    },
    {
      id: 15,
      title: "Shopify E-commerce Automation",
      description: "Automate Shopify store operations including orders, inventory, and customer management.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "12+",
      integrations: ["Shopify", "Gmail", "Slack", "Google Sheets", "Stripe", "Mailchimp"],
      complexity: "Medium to High",
      tags: ["Shopify", "E-commerce", "Retail", "Order Management"],
      downloadableWorkflows: [
        {
          name: "Shopify Order Webhook",
          filename: "0026_Shopify_Create_Webhook.json",
          description: "Trigger workflows when new Shopify orders are placed",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Shopify/0026_Shopify_Create_Webhook.json"
        },
        {
          name: "Shopify + Gmail Order Notifications",
          filename: "0143_Shopify_Gmail_Send_Webhook.json",
          description: "Send custom order confirmation emails via Gmail",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Shopify/0143_Shopify_Gmail_Send_Webhook.json"
        },
        {
          name: "Shopify Inventory Tracker",
          filename: "0376_Shopify_GoogleSheets_Update_Scheduled.json",
          description: "Track Shopify inventory levels in Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Shopify/0376_Shopify_GoogleSheets_Update_Scheduled.json"
        },
        {
          name: "Shopify + Slack Sales Alerts",
          filename: "0621_Shopify_Slack_Send_Webhook.json",
          description: "Get Slack notifications for new sales and orders",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Shopify/0621_Shopify_Slack_Send_Webhook.json"
        }
      ],
      useCases: [
        "Automated order processing",
        "Inventory management and alerts",
        "Customer notification workflows",
        "Sales tracking and reporting",
        "Abandoned cart recovery",
        "Product catalog synchronization"
      ]
    },
    {
      id: 16,
      title: "OpenAI & AI Integration Workflows",
      description: "Leverage AI capabilities with OpenAI integration for content generation, analysis, and automation.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "25+",
      integrations: ["OpenAI", "Google Sheets", "Slack", "Discord", "Gmail", "Notion"],
      complexity: "Medium to High",
      tags: ["AI", "OpenAI", "Machine Learning", "Content Generation"],
      downloadableWorkflows: [
        {
          name: "AI Content Generator",
          filename: "0512_OpenAI_GoogleSheets_Update_Scheduled.json",
          description: "Generate AI content and save to Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/OpenAI/0512_OpenAI_GoogleSheets_Update_Scheduled.json"
        },
        {
          name: "AI Chatbot for Slack",
          filename: "0734_OpenAI_Slack_Send_Webhook.json",
          description: "Create an AI-powered Slack chatbot",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/OpenAI/0734_OpenAI_Slack_Send_Webhook.json"
        },
        {
          name: "AI Email Response Generator",
          filename: "0876_OpenAI_Gmail_Send_Triggered.json",
          description: "Generate AI-powered email responses automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/OpenAI/0876_OpenAI_Gmail_Send_Triggered.json"
        },
        {
          name: "AI Data Analysis Workflow",
          filename: "1021_OpenAI_Notion_Update_Scheduled.json",
          description: "Analyze data with AI and update Notion databases",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/OpenAI/1021_OpenAI_Notion_Update_Scheduled.json"
        }
      ],
      useCases: [
        "Automated content generation",
        "AI-powered chatbots and assistants",
        "Email response automation",
        "Data analysis and insights",
        "Text summarization and translation",
        "Sentiment analysis and classification"
      ]
    },
    {
      id: 17,
      title: "Jira Project Tracking Automation",
      description: "Automate Jira workflows for issue tracking, sprint management, and team coordination.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "10+",
      integrations: ["Jira", "Slack", "GitHub", "Gmail", "Google Sheets"],
      complexity: "Medium to High",
      tags: ["Jira", "Agile", "Project Management", "DevOps"],
      downloadableWorkflows: [
        {
          name: "Jira Issue Creation Webhook",
          filename: "0024_Jira_Create_Webhook.json",
          description: "Trigger workflows when Jira issues are created",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Jira/0024_Jira_Create_Webhook.json"
        },
        {
          name: "Jira + Slack Notifications",
          filename: "0097_Jira_Slack_Send_Webhook.json",
          description: "Send Jira updates to Slack channels",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Jira/0097_Jira_Slack_Send_Webhook.json"
        },
        {
          name: "Jira + GitHub Integration",
          filename: "0345_Jira_GitHub_Update_Webhook.json",
          description: "Sync Jira issues with GitHub pull requests",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Jira/0345_Jira_GitHub_Update_Webhook.json"
        },
        {
          name: "Jira Sprint Report Automation",
          filename: "0789_Jira_GoogleSheets_Create_Scheduled.json",
          description: "Generate automated sprint reports in Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Jira/0789_Jira_GoogleSheets_Create_Scheduled.json"
        }
      ],
      useCases: [
        "Automated issue tracking and assignment",
        "Sprint planning and management",
        "Code deployment synchronization",
        "Bug tracking workflows",
        "Team collaboration notifications",
        "Performance reporting and analytics"
      ]
    },
    {
      id: 18,
      title: "Mailchimp Email Marketing Automation",
      description: "Automate email marketing campaigns with Mailchimp integration for subscriber management and analytics.",
      category: "n8n Workflows",
      type: "JSON Workflows",
      workflowCount: "8+",
      integrations: ["Mailchimp", "Google Sheets", "Shopify", "WordPress", "Webhooks"],
      complexity: "Medium",
      tags: ["Email Marketing", "Mailchimp", "Marketing Automation", "Subscribers"],
      downloadableWorkflows: [
        {
          name: "Mailchimp Subscriber Webhook",
          filename: "0032_Mailchimp_Subscribe_Webhook.json",
          description: "Trigger workflows when users subscribe to Mailchimp",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Mailchimp/0032_Mailchimp_Subscribe_Webhook.json"
        },
        {
          name: "Mailchimp + Google Sheets Sync",
          filename: "0198_Mailchimp_GoogleSheets_Update_Scheduled.json",
          description: "Sync Mailchimp subscribers with Google Sheets",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Mailchimp/0198_Mailchimp_GoogleSheets_Update_Scheduled.json"
        },
        {
          name: "Shopify to Mailchimp Integration",
          filename: "0456_Mailchimp_Shopify_Subscribe_Webhook.json",
          description: "Add Shopify customers to Mailchimp automatically",
          downloadUrl: "https://raw.githubusercontent.com/Zie619/n8n-workflows/main/workflows/Mailchimp/0456_Mailchimp_Shopify_Subscribe_Webhook.json"
        }
      ],
      useCases: [
        "Automated subscriber management",
        "Email campaign triggering",
        "E-commerce customer sync",
        "Subscriber segmentation",
        "Marketing analytics tracking",
        "Welcome email automation"
      ]
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || 
                           resource.category === selectedCategory ||
                           (selectedCategory === "Templates" && resource.category === "Templates") ||
                           (selectedCategory === "Automation Guides" && resource.category === "Automation Guides") ||
                           (selectedCategory === "AI Implementation" && resource.category === "AI Implementation") ||
                           (selectedCategory === "Business Intelligence" && resource.category === "Business Intelligence") ||
                           (selectedCategory === "Case Studies" && resource.category === "Case Studies");
    return matchesSearch && matchesCategory;
  });

  const filteredWhitepapers = whitepapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || selectedCategory === "White Papers";
    return matchesSearch && matchesCategory;
  });

  const filteredVideoTutorials = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || selectedCategory === "Video Tutorials";
    return matchesSearch && matchesCategory;
  });

  const filteredWorkflowUseCases = workflowUseCases.filter(workflow => {
    const matchesSearch = workflow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         workflow.integrations.some(integration => integration.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || selectedCategory === "n8n Workflows";
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
              <BookOpen className="w-4 h-4 mr-2" />
              Resource Library
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master <span className="gradient-text">AI Automation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Access our comprehensive library of guides, templates, and tools to accelerate your AI automation journey. 
              Over 150+ resources downloaded by 25,000+ professionals worldwide.
            </p>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search resources, guides, templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-12">
              <TabsTrigger value="guides" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Guides & Templates
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center gap-2">
                <Workflow className="w-4 h-4" />
                n8n Workflows
              </TabsTrigger>
              <TabsTrigger value="whitepapers" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                White Papers
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="tools" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Tools & Assessments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className={`glass-card hover-lift ${resource.featured ? 'border-primary/50' : ''}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden rounded-t-lg">
                      <img 
                        src={resource.image || "/images/generated/ai-automation-guide.svg"} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {resource.featured && (
                        <Badge className="absolute top-4 right-4 bg-primary/20 text-primary border-primary/30">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {resource.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {resource.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {resource.downloadCount}
                          </span>
                        </div>

                        <Button 
                          className="w-full"
                          asChild
                        >
                          <Link to={`/resources/${resource.id}`}>
                            View Resource
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workflows">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWorkflowUseCases.map((workflow) => (
                  <Card key={workflow.id} className="glass-card hover-lift border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {workflow.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs text-primary">
                          {workflow.workflowCount} workflows
                        </Badge>
                      </div>
                      <CardTitle className="text-xl leading-tight">{workflow.title}</CardTitle>
                      <CardDescription className="text-sm">{workflow.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Complexity:</span>
                            <Badge variant="outline" className="text-xs">
                              {workflow.complexity}
                            </Badge>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Key Integrations:</h4>
                            <div className="flex flex-wrap gap-1">
                              {workflow.integrations.slice(0, 4).map((integration, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {integration}
                                </Badge>
                              ))}
                              {workflow.integrations.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{workflow.integrations.length - 4}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {workflow.downloadableWorkflows && (
                            <div>
                              <h4 className="text-sm font-medium mb-2">Available Workflows:</h4>
                              <div className="space-y-2 max-h-32 overflow-y-auto">
                                {workflow.downloadableWorkflows.slice(0, 3).map((wf, index) => (
                                  <div key={index} className="p-2 bg-muted/30 rounded text-xs">
                                    <div className="font-medium text-foreground mb-1">{wf.name}</div>
                                    <div className="text-muted-foreground mb-2">{wf.description}</div>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      className="h-6 text-xs px-2"
                                      onClick={() => window.open(wf.downloadUrl, '_blank')}
                                    >
                                      <Download className="w-3 h-3 mr-1" />
                                      Download JSON
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="text-sm font-medium mb-2">Use Cases:</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {workflow.useCases.slice(0, 3).map((useCase, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {useCase}
                                </li>
                              ))}
                              {workflow.useCases.length > 3 && (
                                <li className="text-xs text-primary">
                                  +{workflow.useCases.length - 3} more use cases
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {workflow.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            className="flex-1"
                            onClick={() => {
                              setSelectedWorkflowPackage(workflow);
                              setIsBrowseModalOpen(true);
                            }}
                          >
                            <Workflow className="w-4 h-4 mr-2" />
                            Browse All
                          </Button>
                          {workflow.downloadableWorkflows && (
                            <Button 
                              variant="outline"
                              className="flex-1"
                              onClick={() => {
                                // Download the first workflow as example
                                const link = document.createElement('a');
                                link.href = workflow.downloadableWorkflows[0].downloadUrl;
                                link.download = workflow.downloadableWorkflows[0].filename;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Sample JSON
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Complete n8n Workflow Collection</h3>
                  <p className="text-muted-foreground mb-6">
                    Access 2,053+ production-ready automation workflows with 365+ integrations. 
                    From simple notifications to complex AI-powered business processes.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2,053+</div>
                      <div className="text-sm text-muted-foreground">Total Workflows</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">365+</div>
                      <div className="text-sm text-muted-foreground">Integrations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">29,445</div>
                      <div className="text-sm text-muted-foreground">Total Nodes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">33.8K</div>
                      <div className="text-sm text-muted-foreground">GitHub Stars</div>
                    </div>
                  </div>
                  <Button size="lg" onClick={() => {
                    window.open('https://github.com/Zie619/n8n-workflows', '_blank');
                  }}>
                    <Download className="w-4 h-4 mr-2" />
                    Access Full Repository
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="whitepapers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWhitepapers.map((paper) => (
                  <Card key={paper.id} className="glass-card hover-lift">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit text-xs mb-2">
                        Research Paper
                      </Badge>
                      <CardTitle className="text-xl leading-tight">{paper.title}</CardTitle>
                      <CardDescription className="text-sm">{paper.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {paper.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{paper.pages} pages</span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {paper.downloadCount}
                          </span>
                        </div>

                        <Button 
                          className="w-full"
                          onClick={() => {
                            // Map whitepapers to relevant research documents
                            const getPdfUrl = (paperId: number) => {
                              const pdfMap: Record<number, string> = {
                                1: "https://www.mckinsey.com/~/media/mckinsey/future-of-work-ai-automation-report.pdf",
                                2: "https://www.bcg.com/publications/2023/roi-analysis-ai-automation-business-value.pdf", 
                                3: "https://www.deloitte.com/content/dam/assets/us/en/insights/focus/cognitive-technologies/ai-automation-security-compliance-guide.pdf"
                              };
                              return pdfMap[paperId] || `#download-whitepaper-${paperId}`;
                            };
                            
                            const url = getPdfUrl(paper.id);
                            if (url.startsWith('http')) {
                              window.open(url, '_blank');
                            } else {
                              // Fallback for placeholder URLs - would normally trigger actual download
                              console.log(`Downloading whitepaper: ${paper.title}`);
                              alert(`This would download: ${paper.title}\n\nPages: ${paper.pages}\n\nIn a production environment, this would download the actual PDF whitepaper.`);
                            }
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVideoTutorials.map((video) => (
                  <Card key={video.id} className="glass-card hover-lift">
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit text-xs mb-2">
                        Video Tutorial
                      </Badge>
                      <CardTitle className="text-xl leading-tight">{video.title}</CardTitle>
                      <CardDescription className="text-sm">{video.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <Badge 
                            variant={video.difficulty === 'Beginner' ? 'default' : 
                                   video.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                          >
                            {video.difficulty}
                          </Badge>
                          <span className="text-muted-foreground">{video.views} views</span>
                        </div>
                        
                        <div className="text-sm text-muted-foreground">
                          Duration: {video.duration}
                        </div>

                        <Button className="w-full">
                          <Video className="w-4 h-4 mr-2" />
                          Watch Tutorial
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      AI Readiness Assessment
                    </CardTitle>
                    <CardDescription>
                      Evaluate your organization's readiness for AI automation implementation with our comprehensive assessment tool.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          5-minute assessment
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Personalized roadmap
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Industry benchmarks
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Actionable insights
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <CheckSquare className="w-4 h-4 mr-2" />
                            Start Assessment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>AI Readiness Assessment</DialogTitle>
                          </DialogHeader>
                          <AIReadinessAssessment />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      ROI Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate the potential return on investment for your AI automation projects with our advanced ROI calculator.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Cost-benefit analysis
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Payback period
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Risk assessment
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Scenario modeling
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Calculator className="w-4 h-4 mr-2" />
                            Calculate ROI
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>AI Automation ROI Calculator</DialogTitle>
                          </DialogHeader>
                          <ROICalculator />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Latest Resources
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get notified when we release new guides, templates, and tools to accelerate your AI automation journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Browse Workflows Modal */}
      <Dialog open={isBrowseModalOpen} onOpenChange={setIsBrowseModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedWorkflowPackage?.title || 'Available Workflows'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedWorkflowPackage?.downloadableWorkflows?.map((workflow: any, index: number) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Workflow className="w-8 h-8 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{workflow.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {workflow.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <FileText className="w-3 h-3" />
                      <span>{workflow.filename}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = workflow.downloadUrl;
                      link.download = workflow.filename;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Workflow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedWorkflowPackage?.useCases && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Use Cases
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {selectedWorkflowPackage.useCases.map((useCase: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      <PopupManager page="resources" />
    </div>
  );
};

export default Resources;