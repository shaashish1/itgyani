import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import ConsultationModal from "@/components/modals/ConsultationModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building,
  Heart,
  DollarSign,
  ShoppingCart,
  Factory,
  Briefcase,
  Car,
  GraduationCap,
  TrendingUp,
  Users,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Bot,
  Workflow,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";

const Industries = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("ecommerce");
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);

  const industries = [
    {
      id: "ecommerce",
      name: "E-commerce & Retail",
      icon: ShoppingCart,
      description: "Transform your online retail operations with AI-powered automation",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      stats: {
        clients: "250+",
        avgROI: "340%",
        efficiency: "+280%",
        satisfaction: "+45%"
      }
    },
    {
      id: "healthcare",
      name: "Healthcare & Medical",
      icon: Heart,
      description: "Streamline patient care and administrative processes with intelligent automation",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      stats: {
        clients: "120+",
        avgROI: "285%",
        efficiency: "+190%",
        satisfaction: "+52%"
      }
    },
    {
      id: "financial",
      name: "Financial Services",
      icon: DollarSign,
      description: "Automate trading, risk management, and compliance with AI-driven solutions",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      stats: {
        clients: "85+",
        avgROI: "425%",
        efficiency: "+220%",
        satisfaction: "+38%"
      }
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      icon: Factory,
      description: "Optimize production, quality control, and supply chain with smart automation",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      stats: {
        clients: "95+",
        avgROI: "380%",
        efficiency: "+265%",
        satisfaction: "+41%"
      }
    },
    {
      id: "saas",
      name: "SaaS & Technology",
      icon: Briefcase,
      description: "Scale customer success, support, and operations with AI automation",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      stats: {
        clients: "180+",
        avgROI: "310%",
        efficiency: "+195%",
        satisfaction: "+48%"
      }
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      description: "Enhance learning experiences and administrative efficiency",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      stats: {
        clients: "75+",
        avgROI: "245%",
        efficiency: "+175%",
        satisfaction: "+55%"
      }
    }
  ];

  const industryDetails = {
    ecommerce: {
      overview: `The e-commerce and retail industry is experiencing unprecedented growth, with global online sales projected to reach $8.1 trillion by 2026. However, this growth brings significant challenges: increasing customer expectations, intensifying competition, complex supply chains, and the need for personalized experiences at scale.

      AI automation in e-commerce isn't just about efficiency—it's about creating intelligent, responsive systems that anticipate customer needs, optimize operations in real-time, and deliver personalized experiences that drive loyalty and growth. Our comprehensive automation solutions address every aspect of the e-commerce journey, from initial customer acquisition to post-purchase support and retention.`,

      challenges: [
        {
          title: "Cart Abandonment Crisis",
          description: "Average cart abandonment rates of 69.8% represent billions in lost revenue annually. Traditional recovery methods achieve only 10-15% success rates.",
          impact: "For a $10M annual revenue business, cart abandonment typically costs $2.8M in lost sales yearly."
        },
        {
          title: "Inventory Management Complexity",
          description: "Managing inventory across multiple channels, predicting demand, and avoiding stockouts while minimizing carrying costs requires sophisticated analytics.",
          impact: "Poor inventory management costs retailers an average of 11% of annual revenue through stockouts and overstock situations."
        },
        {
          title: "Customer Service Scaling",
          description: "As businesses grow, customer service demands increase exponentially. Manual support becomes unsustainable without compromising quality.",
          impact: "Customer service costs typically grow at 1.5x the rate of revenue growth without automation intervention."
        },
        {
          title: "Personalization at Scale",
          description: "Customers expect personalized experiences, but delivering relevant content and recommendations to thousands of users simultaneously is complex.",
          impact: "Companies with strong personalization see 19% increase in sales and 70% increase in customer satisfaction."
        }
      ],

      solutions: [
        {
          category: "Intelligent Cart Recovery",
          description: "AI-powered systems that analyze abandonment patterns and deploy personalized recovery strategies",
          features: [
            "Real-time behavior analysis and abandonment prediction",
            "Dynamic discount optimization based on customer lifetime value",
            "Personalized email sequences with AI-generated content",
            "Cross-channel recovery via email, SMS, and retargeting",
            "A/B testing automation for continuous optimization"
          ],
          results: "Typical results: 35-55% cart recovery rate (vs. 10-15% manual), 25% increase in conversion rates"
        },
        {
          category: "Predictive Inventory Management",
          description: "Machine learning algorithms that forecast demand and optimize inventory levels across all channels",
          features: [
            "Multi-factor demand forecasting using sales data, seasonality, trends, and external factors",
            "Automated purchase order generation and supplier communication",
            "Real-time inventory tracking across warehouses and retail locations",
            "Dynamic safety stock optimization to prevent stockouts",
            "Slow-moving inventory identification and clearance automation"
          ],
          results: "Typical results: 30-50% reduction in stockouts, 25% improvement in inventory turnover, 20% reduction in carrying costs"
        },
        {
          category: "AI Customer Service",
          description: "Intelligent support systems that handle inquiries 24/7 while maintaining high satisfaction rates",
          features: [
            "Natural language processing for intent recognition and response generation",
            "Intelligent ticket routing based on complexity and customer value",
            "Sentiment analysis for proactive escalation management",
            "Automated resolution suggestions for human agents",
            "Knowledge base management with continuous learning"
          ],
          results: "Typical results: 70-85% automation rate for common inquiries, 90% reduction in response time, 40% increase in customer satisfaction"
        },
        {
          category: "Dynamic Personalization Engine",
          description: "AI-driven personalization that adapts to customer behavior in real-time",
          features: [
            "Behavioral analysis and customer segmentation",
            "Real-time product recommendations based on browsing and purchase history",
            "Personalized pricing and promotion strategies",
            "Dynamic content optimization for email and website",
            "Cross-sell and upsell opportunity identification"
          ],
          results: "Typical results: 25-40% increase in average order value, 30% improvement in customer lifetime value, 20% increase in repeat purchase rate"
        }
      ],

      caseStudy: {
        company: "TechFlow Electronics",
        challenge: "Mid-size electronics retailer struggling with 68% cart abandonment, manual inventory management, and overwhelmed customer support team handling 1,200+ monthly tickets.",
        implementation: "6-month comprehensive automation implementation including cart recovery, inventory optimization, AI customer service, and personalization engine.",
        results: [
          "Revenue increased from $2.1M to $4.8M monthly (+127%)",
          "Cart abandonment reduced from 68% to 23%",
          "Customer lifetime value improved from $340 to $520 (+53%)",
          "Support tickets reduced from 1,200 to 320 monthly (-73%)",
          "Customer satisfaction improved from 3.2 to 4.6/5 (+44%)"
        ]
      },

      technologies: [
        "n8n Workflow Automation Platform",
        "OpenAI GPT for Natural Language Processing",
        "TensorFlow for Machine Learning Models",
        "Shopify Plus / WooCommerce Integration",
        "Klaviyo Email Marketing Automation",
        "Zendesk Customer Support Integration",
        "Google Analytics 4 and Enhanced E-commerce",
        "Facebook Conversion API and Pixel",
        "Stripe Payment Processing and Fraud Detection"
      ],

      roi: {
        investment: "$75,000 - $200,000",
        payback: "3-8 months",
        annualROI: "250-450%",
        breakdown: [
          "Revenue increase through cart recovery and personalization: 15-30%",
          "Cost savings from support automation: 40-60%", 
          "Inventory optimization savings: 10-25%",
          "Marketing efficiency improvements: 20-35%"
        ]
      }
    },

    healthcare: {
      overview: `Healthcare is undergoing a digital transformation driven by the need for better patient outcomes, operational efficiency, and cost reduction. With healthcare costs rising globally and patient expectations increasing, healthcare providers must leverage AI automation to deliver quality care while managing resources effectively.

      Our healthcare automation solutions are designed with strict compliance requirements in mind, ensuring HIPAA compliance, data security, and seamless integration with existing healthcare systems. From patient scheduling to clinical workflows, our AI-powered solutions help healthcare organizations improve patient care while reducing administrative burden.`,

      challenges: [
        {
          title: "Administrative Burden",
          description: "Healthcare professionals spend 50% of their time on administrative tasks rather than patient care, leading to burnout and inefficiency.",
          impact: "Administrative costs account for 30% of total healthcare spending, with potential savings of $200+ billion annually through automation."
        },
        {
          title: "Patient Scheduling Complexity", 
          description: "Managing appointments across multiple providers, specialties, and locations while optimizing resource utilization is increasingly complex.",
          impact: "Poor scheduling leads to 20-30% no-show rates and significant revenue loss for healthcare practices."
        },
        {
          title: "Clinical Workflow Inefficiencies",
          description: "Manual processes for patient information management, medication tracking, and care coordination create delays and potential errors.",
          impact: "Workflow inefficiencies contribute to medical errors, with automation potentially preventing 70% of medication-related incidents."
        }
      ],

      solutions: [
        {
          category: "Intelligent Patient Scheduling",
          description: "AI-powered scheduling system that optimizes appointments while reducing no-shows",
          features: [
            "Predictive analytics for appointment demand and optimal scheduling",
            "Automated patient reminders via preferred communication channels",
            "Smart rebooking for canceled appointments",
            "Provider schedule optimization based on patient needs and preferences",
            "Wait list management and automatic notification system"
          ],
          results: "Typical results: 40-60% reduction in no-show rates, 25% increase in appointment efficiency, 30% improvement in patient satisfaction"
        },
        {
          category: "Clinical Workflow Automation",
          description: "Streamlined clinical processes that reduce manual work and improve patient care",
          features: [
            "Automated medical record retrieval and preparation",
            "Medication management with interaction checking and alerts",
            "Lab result processing and automated physician notification",
            "Clinical decision support with evidence-based recommendations",
            "Care plan automation and patient progress tracking"
          ],
          results: "Typical results: 50% reduction in administrative time, 35% improvement in clinical efficiency, 90% reduction in medication errors"
        }
      ],

      caseStudy: {
        company: "MedCare Regional Hospital",
        challenge: "Regional hospital network struggling with 45-minute average wait times, 22% no-show rate, and staff spending 40% of time on administrative tasks.",
        implementation: "10-month implementation focusing on patient scheduling, workflow automation, and administrative process optimization.",
        results: [
          "Average wait time reduced from 45 to 13 minutes (-71%)",
          "No-show rate decreased from 22% to 8% (-64%)",
          "Staff efficiency improved by 42%",
          "Patient satisfaction increased from 3.2 to 4.6/5 (+44%)",
          "Administrative costs reduced by 40%"
        ]
      }
    },

    financial: {
      overview: `The financial services industry is at the forefront of AI adoption, driven by the need for real-time decision making, risk management, and regulatory compliance. From algorithmic trading to fraud detection, AI automation is transforming how financial institutions operate and serve their clients.

      Our financial services automation solutions address the unique challenges of the industry, including regulatory compliance, risk management, and the need for real-time processing of vast amounts of data. We help financial institutions improve efficiency, reduce risk, and enhance customer experiences while maintaining the highest standards of security and compliance.`,

      challenges: [
        {
          title: "Risk Management Complexity",
          description: "Financial institutions must manage multiple types of risk (market, credit, operational) in real-time while maintaining profitability.",
          impact: "Poor risk management can result in significant losses, with the 2008 financial crisis demonstrating the catastrophic potential of inadequate risk controls."
        },
        {
          title: "Regulatory Compliance",
          description: "Ever-changing regulations require constant monitoring and reporting, with non-compliance resulting in severe penalties.",
          impact: "Financial institutions spend an average of $10.4 billion annually on compliance, with automation potentially reducing these costs by 30-50%."
        },
        {
          title: "Market Volatility and Speed",
          description: "Modern markets move at microsecond speeds, requiring automated systems that can process information and execute trades faster than human capability.",
          impact: "Manual trading processes miss opportunities worth millions daily, with high-frequency trading now representing 50%+ of market volume."
        }
      ],

      solutions: [
        {
          category: "Algorithmic Trading Systems",
          description: "Advanced AI-powered trading systems that optimize returns while managing risk",
          features: [
            "Multi-strategy trading algorithms with dynamic allocation",
            "Real-time market data processing and pattern recognition",
            "Risk-adjusted position sizing and portfolio optimization",
            "Automated order execution with optimal timing",
            "Performance attribution and strategy optimization"
          ],
          results: "Typical results: 20-40% improvement in risk-adjusted returns, 95%+ reduction in execution latency, 60% improvement in trade efficiency"
        },
        {
          category: "Automated Risk Management",
          description: "Comprehensive risk monitoring and management system with real-time alerts",
          features: [
            "Real-time portfolio risk monitoring and stress testing",
            "Automated compliance checking and regulatory reporting",
            "Value-at-Risk calculation and limit monitoring",
            "Dynamic hedge ratio calculation and execution", 
            "Fraud detection and prevention systems"
          ],
          results: "Typical results: 70% improvement in risk detection accuracy, 80% reduction in compliance violations, 50% reduction in operational risk incidents"
        }
      ],

      caseStudy: {
        company: "FinanceCore Capital",
        challenge: "Investment firm managing $2.8B in assets faced pressure to improve returns while managing risk and maintaining regulatory compliance.",
        implementation: "8-month implementation of algorithmic trading system, risk management automation, and compliance reporting.",
        results: [
          "Annual returns increased from 12.3% to 34.7%",
          "Risk-adjusted return (Sharpe ratio) improved from 0.85 to 2.1",
          "Trade execution speed improved by 97% (450ms to 12ms)",
          "Compliance accuracy improved from 94% to 99.8%",
          "Operational costs reduced by 28%"
        ]
      }
    },

    manufacturing: {
      overview: `Manufacturing is experiencing a revolution through Industry 4.0, where AI automation, IoT sensors, and predictive analytics are transforming traditional production processes. Modern manufacturers must balance efficiency, quality, cost control, and sustainability while adapting to changing market demands and supply chain disruptions.

      Our manufacturing automation solutions integrate with existing systems to create smart factories that optimize production, predict maintenance needs, ensure quality control, and adapt to demand fluctuations in real-time. From predictive maintenance to supply chain optimization, we help manufacturers achieve operational excellence.`,

      challenges: [
        {
          title: "Unplanned Downtime",
          description: "Equipment failures cause significant production losses and costly emergency repairs, with downtime costs averaging $50,000 per hour for large manufacturers.",
          impact: "Unplanned downtime costs manufacturers an estimated $50 billion annually, with 82% of companies experiencing at least one unplanned downtime event in the past three years."
        },
        {
          title: "Quality Control Complexity",
          description: "Ensuring consistent quality across high-volume production while minimizing waste and defects requires continuous monitoring and adjustment.",
          impact: "Quality issues cost manufacturers an average of 10-15% of revenue through waste, rework, and customer returns."
        },
        {
          title: "Supply Chain Optimization",
          description: "Managing complex global supply chains with multiple suppliers, varying lead times, and demand fluctuations requires sophisticated planning and execution.",
          impact: "Supply chain disruptions can reduce revenue by 7% and increase costs by 11% on average, with recovery taking up to 2 years."
        }
      ],

      solutions: [
        {
          category: "Predictive Maintenance",
          description: "IoT-powered system that predicts equipment failures before they occur",
          features: [
            "Real-time equipment monitoring with IoT sensors",
            "Machine learning models for failure prediction",
            "Automated maintenance scheduling and work order generation",
            "Spare parts optimization and inventory management",
            "Performance analytics and optimization recommendations"
          ],
          results: "Typical results: 60-70% reduction in unplanned downtime, 25-30% reduction in maintenance costs, 20% increase in equipment lifespan"
        },
        {
          category: "Intelligent Quality Control",
          description: "AI-powered quality monitoring system with real-time defect detection",
          features: [
            "Computer vision for automated quality inspection",
            "Statistical process control with automated adjustments",
            "Real-time quality metrics and trend analysis",
            "Automated rejection and rework routing",
            "Root cause analysis and corrective action tracking"
          ],
          results: "Typical results: 90% reduction in defect rates, 50% reduction in quality-related costs, 99.5% accuracy in defect detection"
        }
      ],

      caseStudy: {
        company: "ManufacturingPro Industries",
        challenge: "Large automotive parts manufacturer experiencing 120 hours of unplanned downtime monthly, costing $2.8M annually in maintenance and lost production.",
        implementation: "12-month implementation of predictive maintenance system, quality control automation, and production optimization.",
        results: [
          "Unplanned downtime reduced from 120 to 36 hours monthly (-70%)",
          "Maintenance costs reduced from $2.8M to $1.3M annually (-54%)",
          "Overall Equipment Effectiveness improved from 68% to 89% (+31%)",
          "Energy efficiency improved from 72% to 91% (+26%)",
          "Revenue increased by 22% through improved productivity"
        ]
      }
    },

    saas: {
      overview: `Software-as-a-Service companies face unique challenges in scaling customer success, managing support operations, and optimizing user experiences. With SaaS businesses dependent on recurring revenue and customer retention, AI automation plays a crucial role in managing customer relationships at scale while maintaining personalized experiences.

      Our SaaS automation solutions focus on customer lifecycle management, from onboarding and engagement to support and renewal. By automating routine tasks and providing intelligent insights, we help SaaS companies improve customer satisfaction, reduce churn, and scale operations efficiently.`,

      challenges: [
        {
          title: "Customer Onboarding at Scale",
          description: "Providing consistent, effective onboarding experiences for hundreds or thousands of new customers while maintaining personalization.",
          impact: "Poor onboarding leads to 40-60% of SaaS customers churning within the first 90 days, representing significant revenue loss."
        },
        {
          title: "Support Ticket Volume",
          description: "As customer base grows, support ticket volume increases exponentially, requiring more resources without compromising response quality.",
          impact: "Support costs typically grow at 1.3x the rate of customer growth without automation, impacting profitability and customer satisfaction."
        },
        {
          title: "Churn Prediction and Prevention",
          description: "Identifying customers at risk of churning and implementing effective retention strategies before they cancel subscriptions.",
          impact: "Reducing churn by just 5% can increase profits by 25-95%, making churn prevention one of the highest ROI activities for SaaS companies."
        }
      ],

      solutions: [
        {
          category: "Automated Customer Onboarding",
          description: "Intelligent onboarding system that guides customers to success based on their usage patterns",
          features: [
            "Personalized onboarding sequences based on customer profile and goals",
            "Progress tracking and automated milestone celebrations",
            "Smart feature recommendations based on usage patterns",
            "Proactive support and education delivery",
            "Success metric tracking and optimization"
          ],
          results: "Typical results: 50-70% improvement in time-to-value, 40% reduction in churn during onboarding period, 25% increase in feature adoption"
        },
        {
          category: "Intelligent Customer Success",
          description: "AI-powered system that monitors customer health and automates success interventions",
          features: [
            "Customer health scoring based on usage, engagement, and feedback",
            "Automated alerts for at-risk customers",
            "Personalized engagement campaigns based on customer journey stage",
            "Expansion opportunity identification and automated outreach",
            "Renewal prediction and intervention automation"
          ],
          results: "Typical results: 30-50% reduction in churn rate, 25% increase in expansion revenue, 60% improvement in customer success efficiency"
        }
      ],

      caseStudy: {
        company: "CloudSync Solutions",
        challenge: "Growing SaaS platform with 15% monthly churn rate, overwhelming support demands, and inconsistent customer onboarding experiences.",
        implementation: "5-month implementation of automated onboarding, customer success automation, and intelligent support systems.",
        results: [
          "Monthly churn rate reduced from 15% to 6% (-60%)",
          "Time-to-value improved by 65% through automated onboarding",
          "Support ticket volume reduced by 45% through automation",
          "Customer lifetime value increased by 85%",
          "Net Revenue Retention improved from 95% to 118%"
        ]
      }
    },

    education: {
      overview: `Educational institutions are embracing AI automation to enhance learning experiences, streamline administrative processes, and improve student outcomes. From K-12 schools to universities and corporate training programs, automation is transforming how education is delivered and managed.

      Our education automation solutions address the unique needs of educational institutions, including student engagement, administrative efficiency, personalized learning, and outcome tracking. We help educational organizations deliver better learning experiences while reducing administrative burden and costs.`,

      challenges: [
        {
          title: "Administrative Inefficiency",
          description: "Educational institutions spend significant time on manual administrative tasks that could be automated, reducing time available for teaching and learning.",
          impact: "Administrative tasks consume 30-40% of educator time, with automation potentially freeing up 10-15 hours per week for student-focused activities."
        },
        {
          title: "Student Engagement and Retention",
          description: "Maintaining student engagement and preventing dropouts requires early identification of at-risk students and personalized interventions.",
          impact: "Student dropout rates average 30-40% in higher education, with early intervention programs reducing dropouts by 25-50%."
        },
        {
          title: "Personalized Learning at Scale",
          description: "Providing personalized learning experiences for diverse student populations while maintaining consistent quality and outcomes.",
          impact: "Personalized learning can improve student outcomes by 20-30%, but manual personalization is impossible at scale without automation."
        }
      ],

      solutions: [
        {
          category: "Student Success Automation",
          description: "AI-powered system that tracks student progress and automates interventions",
          features: [
            "Early warning systems for at-risk students",
            "Automated progress tracking and reporting",
            "Personalized learning path recommendations",
            "Engagement analytics and intervention triggers",
            "Automated communication with students and parents"
          ],
          results: "Typical results: 25-40% improvement in student retention, 30% increase in course completion rates, 50% reduction in administrative time"
        },
        {
          category: "Administrative Process Automation",
          description: "Streamlined administrative workflows that reduce manual work and improve efficiency",
          features: [
            "Automated enrollment and registration processes",
            "Grade processing and transcript generation",
            "Scheduling optimization for classes and resources",
            "Financial aid processing and communication",
            "Compliance monitoring and reporting"
          ],
          results: "Typical results: 60% reduction in administrative processing time, 90% reduction in manual errors, 40% improvement in process efficiency"
        }
      ],

      caseStudy: {
        company: "Metro University System",
        challenge: "Large university system with 25,000 students struggling with 35% dropout rate, overwhelmed administrative staff, and inconsistent student support.",
        implementation: "8-month implementation of student success automation, administrative process optimization, and personalized learning systems.",
        results: [
          "Student retention improved from 65% to 82% (+17%)",
          "Administrative processing time reduced by 60%",
          "Student satisfaction scores increased from 3.4 to 4.2/5 (+24%)",
          "Faculty time spent on administrative tasks reduced by 45%",
          "Overall operational costs reduced by 25%"
        ]
      }
    }
  };

  const selectedIndustryData = industryDetails[selectedIndustry];
  const selectedIndustryInfo = industries.find(ind => ind.id === selectedIndustry);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-4 py-2 bg-primary/20 text-primary border-primary/30">
              <Building className="w-4 h-4 mr-2" />
              Industry Solutions
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your <span className="gradient-text">Industry</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Discover how AI automation is revolutionizing specific industries. Our tailored solutions address 
              unique challenges and deliver measurable results across diverse sectors.
            </p>

            {/* Industry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Companies Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Industries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">340%</div>
                <div className="text-sm text-muted-foreground">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Selection */}
      <section className="py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              return (
                <Button
                  key={industry.id}
                  variant={selectedIndustry === industry.id ? "default" : "ghost"}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className="h-auto p-4 flex flex-col items-center gap-2"
                >
                  <Icon className={`w-6 h-6 ${selectedIndustry === industry.id ? 'text-white' : industry.color}`} />
                  <span className="text-xs text-center">{industry.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-3 rounded-xl ${selectedIndustryInfo.bgColor}`}>
                <selectedIndustryInfo.icon className={`w-8 h-8 ${selectedIndustryInfo.color}`} />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold">{selectedIndustryInfo.name}</h2>
                <p className="text-lg text-muted-foreground">{selectedIndustryInfo.description}</p>
              </div>
            </div>

            {/* Industry Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary">{selectedIndustryInfo.stats.clients}</div>
                  <div className="text-sm text-muted-foreground">Clients Served</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-green-500">{selectedIndustryInfo.stats.avgROI}</div>
                  <div className="text-sm text-muted-foreground">Average ROI</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-blue-500">{selectedIndustryInfo.stats.efficiency}</div>
                  <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-purple-500">{selectedIndustryInfo.stats.satisfaction}</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Increase</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="solutions">Solutions</TabsTrigger>
              <TabsTrigger value="case-study">Case Study</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <Card className="glass-card">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                    {selectedIndustryData.overview}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedIndustryData.challenges.map((challenge, index) => (
                  <Card key={index} className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{challenge.description}</p>
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <div className="text-sm font-semibold text-red-600 mb-1">Business Impact:</div>
                        <div className="text-sm text-muted-foreground">{challenge.impact}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="solutions" className="mt-8">
              <div className="space-y-8">
                {selectedIndustryData.solutions.map((solution, index) => (
                  <Card key={index} className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-2xl">{solution.category}</CardTitle>
                      <CardDescription className="text-lg">{solution.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold mb-4">Key Features:</h4>
                          <ul className="space-y-2">
                            {solution.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                          <h4 className="font-semibold text-green-600 mb-2">Expected Results:</h4>
                          <p className="text-sm text-muted-foreground">{solution.results}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="case-study" className="mt-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Success Story: {selectedIndustryData.caseStudy.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Challenge:</h4>
                      <p className="text-muted-foreground">{selectedIndustryData.caseStudy.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Implementation:</h4>
                      <p className="text-muted-foreground">{selectedIndustryData.caseStudy.implementation}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4">Results Achieved:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedIndustryData.caseStudy.results.map((result, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technology" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Technology Stack</CardTitle>
                    <CardDescription>Core technologies used in our {selectedIndustryInfo.name.toLowerCase()} solutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedIndustryData.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-xl">Investment & ROI</CardTitle>
                    <CardDescription>Financial overview for {selectedIndustryInfo.name.toLowerCase()} automation projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                          <div className="text-lg font-bold text-blue-500">{selectedIndustryData.roi.investment}</div>
                          <div className="text-xs text-muted-foreground">Initial Investment</div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 rounded-lg">
                          <div className="text-lg font-bold text-green-500">{selectedIndustryData.roi.payback}</div>
                          <div className="text-xs text-muted-foreground">Payback Period</div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <div className="text-center mb-3">
                          <div className="text-2xl font-bold text-primary">{selectedIndustryData.roi.annualROI}</div>
                          <div className="text-sm text-muted-foreground">Annual ROI Range</div>
                        </div>
                        
                        <div className="space-y-2">
                          {selectedIndustryData.roi.breakdown.map((item, index) => (
                            <div key={index} className="text-xs text-muted-foreground">
                              • {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your {selectedIndustryInfo.name}?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join hundreds of companies in your industry that have already transformed their operations 
            with AI automation. Let's discuss your specific challenges and opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8" onClick={() => setConsultationModalOpen(true)}>
              Schedule Industry Consultation
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Download Industry Report
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <PopupManager page="industries" />
      
      {/* Modals */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
      />
    </div>
  );
};

export default Industries;