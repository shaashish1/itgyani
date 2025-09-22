import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PopupManager from "@/components/PopupManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Code,
  Lightbulb,
  Target,
  Workflow,
  Bot,
  TrendingUp,
  Shield,
  Database,
  BarChart3,
  Settings,
  Zap,
  CheckCircle,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

const Academy = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");

  const learningPaths = [
    {
      id: 1,
      title: "AI Automation Fundamentals",
      description: "Master the basics of AI-powered workflow automation from concept to implementation",
      level: "Beginner",
      duration: "8 weeks",
      modules: 12,
      students: "15.2K+",
      rating: 4.9,
      progress: 0,
      featured: true,
      modules_detail: [
        {
          title: "Introduction to AI Automation",
          duration: "45 minutes",
          topics: ["What is AI Automation", "Benefits and Use Cases", "Technology Stack Overview", "Getting Started"]
        },
        {
          title: "Understanding Workflow Automation", 
          duration: "60 minutes",
          topics: ["Workflow Design Principles", "Process Mapping", "Automation Triggers", "Data Flow Management"]
        },
        {
          title: "AI Components and Integration",
          duration: "75 minutes", 
          topics: ["Machine Learning Models", "Natural Language Processing", "Computer Vision", "API Integration"]
        },
        {
          title: "Platform Selection and Setup",
          duration: "90 minutes",
          topics: ["Comparing Automation Platforms", "n8n Setup and Configuration", "Environment Management", "Security Best Practices"]
        }
      ]
    },
    {
      id: 2,
      title: "Advanced n8n Workflow Development",
      description: "Build complex, production-ready workflows with advanced n8n features and integrations",
      level: "Intermediate",
      duration: "6 weeks",
      modules: 10,
      students: "8.7K+", 
      rating: 4.8,
      progress: 35,
      featured: true,
      modules_detail: [
        {
          title: "Advanced Node Configuration",
          duration: "50 minutes",
          topics: ["Custom Node Development", "Error Handling", "Conditional Logic", "Data Transformation"]
        },
        {
          title: "API Integration Mastery",
          duration: "65 minutes",
          topics: ["REST API Integration", "GraphQL Queries", "Webhook Management", "Authentication Methods"]
        },
        {
          title: "Database Operations",
          duration: "55 minutes",
          topics: ["SQL Query Building", "NoSQL Integration", "Data Synchronization", "Backup Strategies"]
        },
        {
          title: "Performance Optimization",
          duration: "70 minutes",
          topics: ["Workflow Optimization", "Resource Management", "Monitoring and Alerts", "Scaling Strategies"]
        }
      ]
    },
    {
      id: 3,
      title: "Enterprise AI Implementation",
      description: "Learn to design and deploy AI automation solutions for large-scale enterprise environments",
      level: "Advanced",
      duration: "10 weeks",
      modules: 15,
      students: "3.4K+",
      rating: 4.9,
      progress: 0,
      featured: false,
      modules_detail: [
        {
          title: "Enterprise Architecture Design",
          duration: "90 minutes",
          topics: ["Scalable Architecture Patterns", "Microservices Integration", "Security Framework", "Compliance Requirements"]
        },
        {
          title: "Change Management and Adoption",
          duration: "75 minutes",
          topics: ["Stakeholder Engagement", "Training Programs", "Rollout Strategies", "Success Metrics"]
        },
        {
          title: "Advanced AI Model Integration",
          duration: "100 minutes",
          topics: ["Custom Model Development", "Model Training and Deployment", "MLOps Practices", "Performance Monitoring"]
        },
        {
          title: "Governance and Risk Management",
          duration: "85 minutes",
          topics: ["AI Governance Frameworks", "Risk Assessment", "Audit Compliance", "Data Privacy"]
        }
      ]
    }
  ];

  const skillTracks = [
    {
      id: 1,
      title: "Customer Service Automation",
      description: "Build intelligent customer service systems with AI chatbots, sentiment analysis, and automated routing",
      duration: "4 weeks",
      lessons: 16,
      difficulty: "Intermediate",
      skills: ["Chatbot Development", "NLP Integration", "Sentiment Analysis", "Ticket Routing"],
      projects: ["AI Customer Support Bot", "Sentiment Analysis Dashboard", "Automated Ticket System"]
    },
    {
      id: 2,
      title: "Sales Process Automation",
      description: "Automate lead generation, qualification, and nurturing processes to increase sales efficiency",
      duration: "5 weeks", 
      lessons: 20,
      difficulty: "Intermediate",
      skills: ["Lead Scoring", "CRM Integration", "Email Automation", "Sales Analytics"],
      projects: ["Lead Qualification System", "Automated Sales Pipeline", "Performance Dashboard"]
    },
    {
      id: 3,
      title: "Data Processing and Analytics",
      description: "Master automated data collection, processing, and analysis with AI-powered insights",
      duration: "6 weeks",
      lessons: 24,
      difficulty: "Advanced",
      skills: ["ETL Automation", "Real-time Processing", "Predictive Analytics", "Data Visualization"],
      projects: ["Automated ETL Pipeline", "Real-time Analytics Dashboard", "Predictive Model Integration"]
    },
    {
      id: 4,
      title: "E-commerce Automation",
      description: "Optimize e-commerce operations with inventory management, personalization, and conversion optimization",
      duration: "4 weeks",
      lessons: 18,
      difficulty: "Intermediate", 
      skills: ["Inventory Management", "Personalization", "Cart Recovery", "Price Optimization"],
      projects: ["Smart Inventory System", "Personalization Engine", "Conversion Optimizer"]
    }
  ];

  const tutorials = [
    {
      id: 1,
      title: "Building Your First AI Workflow in 30 Minutes",
      description: "Step-by-step tutorial to create your first automated workflow using n8n and OpenAI",
      duration: "30 minutes",
      difficulty: "Beginner",
      views: "45.2K",
      category: "Getting Started",
      content: `
        **What You'll Learn:**
        - Setting up your n8n environment
        - Integrating OpenAI API for text processing
        - Creating trigger-based workflows
        - Testing and debugging your automation

        **Prerequisites:**
        - Basic understanding of APIs
        - n8n account (free tier available)
        - OpenAI API key

        **Step 1: Environment Setup (5 minutes)**
        First, let's set up your n8n environment. You can use either the cloud version or self-hosted installation.

        For cloud setup:
        1. Visit n8n.cloud and create an account
        2. Access your dashboard and create a new workflow
        3. Familiarize yourself with the interface

        For self-hosted setup:
        1. Install Docker on your machine
        2. Run: docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
        3. Access n8n at http://localhost:5678

        **Step 2: Creating Your First Node (5 minutes)**
        1. Add a Manual Trigger node - this will start your workflow
        2. Configure the trigger to accept input data
        3. Test the trigger to ensure it's working correctly

        **Step 3: OpenAI Integration (10 minutes)**
        1. Add an HTTP Request node after your trigger
        2. Configure it to connect to OpenAI's API:
           - Method: POST
           - URL: https://api.openai.com/v1/chat/completions
           - Headers: Authorization: Bearer YOUR_API_KEY
           - Body: JSON with your prompt and parameters

        **Step 4: Processing and Output (7 minutes)**
        1. Add a Set node to process the AI response
        2. Extract the relevant text from the API response
        3. Add a final node to send the result (email, Slack, etc.)

        **Step 5: Testing and Refinement (3 minutes)**
        1. Execute your workflow with test data
        2. Check each node's output for accuracy
        3. Adjust parameters and retry until satisfied

        **Best Practices:**
        - Always handle API errors gracefully
        - Use environment variables for sensitive data
        - Test with various input types
        - Monitor API usage and costs

        **Next Steps:**
        - Explore advanced OpenAI parameters
        - Add conditional logic to your workflow
        - Integrate with other services (Slack, Email, CRM)
        - Set up scheduling for automated execution
      `
    },
    {
      id: 2,
      title: "Advanced Data Processing with Python and AI",
      description: "Learn to process large datasets using Python functions within n8n workflows",
      duration: "45 minutes",
      difficulty: "Advanced", 
      views: "18.7K",
      category: "Data Processing",
      content: `
        **Advanced Data Processing Workflow**

        **Overview:**
        This tutorial covers creating sophisticated data processing workflows that combine Python scripting with AI models for advanced analytics and insights.

        **What You'll Build:**
        - Automated data ingestion from multiple sources
        - Python-based data cleaning and transformation
        - AI-powered data analysis and pattern recognition
        - Automated reporting and visualization

        **Section 1: Data Ingestion Setup (10 minutes)**
        
        **Multi-Source Data Collection:**
        1. Configure multiple trigger nodes for different data sources:
           - Database polling trigger for transactional data
           - Webhook trigger for real-time events
           - Scheduled trigger for periodic data pulls
           - File system monitor for new file processing

        2. Data source connectors:
           - PostgreSQL/MySQL database connections
           - REST API integrations
           - CSV/Excel file processors
           - Cloud storage integrations (AWS S3, Google Cloud)

        **Section 2: Python Data Processing (15 minutes)**

        **Setting up Python Functions:**
        1. Install required Python packages in your n8n environment:
           - pandas for data manipulation
           - numpy for numerical operations
           - scikit-learn for machine learning
           - matplotlib/plotly for visualization

        2. Create a Function node with Python code:
        
        \`\`\`python
        import pandas as pd
        import numpy as np
        from sklearn.preprocessing import StandardScaler
        from sklearn.cluster import KMeans

        # Get input data from previous node
        input_data = items[0]['json']
        
        # Convert to pandas DataFrame
        df = pd.DataFrame(input_data['data'])
        
        # Data cleaning operations
        df = df.dropna()  # Remove null values
        df = df.drop_duplicates()  # Remove duplicates
        
        # Feature engineering
        df['derived_metric'] = df['value1'] / df['value2']
        df['category_encoded'] = pd.Categorical(df['category']).codes
        
        # Outlier detection using IQR method
        Q1 = df['value'].quantile(0.25)
        Q3 = df['value'].quantile(0.75)
        IQR = Q3 - Q1
        df_clean = df[~((df['value'] < (Q1 - 1.5 * IQR)) | 
                       (df['value'] > (Q3 + 1.5 * IQR)))]
        
        # Return processed data
        return [{'json': {'processed_data': df_clean.to_dict('records'),
                         'summary_stats': df_clean.describe().to_dict()}}]
        ```

        **Section 3: AI-Powered Analysis (12 minutes)**

        **Integrating Machine Learning Models:**
        1. Pattern Recognition with Clustering:
        ```python
        # Prepare data for clustering
        features = ['metric1', 'metric2', 'derived_metric']
        X = df_clean[features]
        
        # Standardize features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Perform K-means clustering
        kmeans = KMeans(n_clusters=3, random_state=42)
        clusters = kmeans.fit_predict(X_scaled)
        
        # Add cluster labels to dataframe
        df_clean['cluster'] = clusters
        
        # Generate insights
        cluster_summary = df_clean.groupby('cluster').agg({
            'value': ['mean', 'std', 'count'],
            'derived_metric': ['mean', 'std']
        }).round(2)
        ```

        2. Anomaly Detection:
        ```python
        from sklearn.ensemble import IsolationForest
        
        # Train anomaly detection model
        iso_forest = IsolationForest(contamination=0.1, random_state=42)
        anomalies = iso_forest.fit_predict(X_scaled)
        
        # Flag anomalous records
        df_clean['is_anomaly'] = anomalies == -1
        anomaly_count = df_clean['is_anomaly'].sum()
        ```

        **Section 4: AI Text Analysis (8 minutes)**

        **Sentiment and Topic Analysis:**
        1. If your data includes text, add OpenAI integration:
        ```python
        # Prepare text data for AI analysis
        text_data = df_clean['comments'].fillna('').tolist()
        
        # Batch process with OpenAI
        ai_insights = []
        for text in text_data[:10]:  # Process first 10 for demo
            if len(text) > 10:
                prompt = f"Analyze the sentiment and extract key topics from: {text}"
                # Send to OpenAI API (configure in HTTP Request node)
                ai_insights.append({'text': text, 'needs_analysis': True})
        ```

        **Section 5: Automated Reporting**

        **Generate Executive Summary:**
        1. Create summary statistics and insights
        2. Format results for different audiences
        3. Generate visualizations (charts, graphs)
        4. Distribute reports via email, Slack, or dashboard

        **Error Handling and Monitoring:**
        - Implement try-catch blocks for robust error handling
        - Add logging for debugging and monitoring
        - Set up alerts for processing failures
        - Create fallback procedures for critical errors

        **Performance Optimization:**
        - Use chunking for large datasets
        - Implement parallel processing where possible
        - Cache intermediate results
        - Monitor memory usage and execution time

        **Next Steps:**
        - Implement real-time streaming data processing
        - Add advanced ML models (neural networks, deep learning)
        - Create interactive dashboards
        - Set up automated model retraining
      `
    }
  ];

  const certifications = [
    {
      id: 1,
      title: "Certified AI Automation Specialist",
      description: "Industry-recognized certification for AI automation professionals",
      duration: "3 months",
      requirements: ["Complete fundamentals course", "Pass practical exam", "Submit portfolio project"],
      benefits: ["Industry recognition", "Salary increase potential", "Career advancement", "Professional network access"]
    },
    {
      id: 2,
      title: "n8n Workflow Expert Certification", 
      description: "Advanced certification for n8n workflow development and optimization",
      duration: "2 months",
      requirements: ["Advanced n8n course completion", "Build 5 production workflows", "Pass technical assessment"],
      benefits: ["Technical expertise validation", "Client trust building", "Premium project access", "Community recognition"]
    }
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const topics = ["All", "Getting Started", "Data Processing", "Customer Service", "Sales Automation", "E-commerce", "Analytics"];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesLevel = selectedLevel === "All" || tutorial.difficulty === selectedLevel;
    const matchesTopic = selectedTopic === "All" || tutorial.category === selectedTopic;
    return matchesLevel && matchesTopic;
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
              <GraduationCap className="w-4 h-4 mr-2" />
              AI Automation Academy
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master <span className="gradient-text">AI Automation</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Comprehensive learning platform with structured courses, hands-on tutorials, and industry certifications. 
              Join 25,000+ professionals advancing their AI automation skills.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Video Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">25K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-lg text-muted-foreground">
              Follow our expertly designed curriculum to master AI automation step by step
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Card key={path.id} className={`glass-card hover-lift ${path.featured ? 'border-primary/50' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={path.level === 'Beginner' ? 'default' : 
                              path.level === 'Intermediate' ? 'secondary' : 'destructive'}
                    >
                      {path.level}
                    </Badge>
                    {path.featured && (
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        {path.modules} modules
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {path.students}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {path.rating}/5.0
                      </div>
                    </div>

                    {path.progress > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="w-full">
                      {path.progress > 0 ? "Continue Learning" : "Start Learning"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skill-Based Tracks */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skill-Based Learning Tracks
            </h2>
            <p className="text-lg text-muted-foreground">
              Focus on specific automation skills and build practical projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillTracks.map((track) => (
              <Card key={track.id} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{track.difficulty}</Badge>
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{track.title}</CardTitle>
                  <CardDescription>{track.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {track.lessons} lessons • {track.duration}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Skills You'll Learn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {track.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Projects:</h4>
                      <ul className="text-sm space-y-1">
                        {track.projects.map((project, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
                      Start Track
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Step-by-Step Tutorials
            </h2>
            <p className="text-lg text-muted-foreground">
              Practical tutorials to build real automation solutions
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex gap-2">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className="rounded-full"
                >
                  {level}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedTopic(topic)}
                  className="rounded-full"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="glass-card hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline">{tutorial.category}</Badge>
                    <Badge 
                      variant={tutorial.difficulty === 'Beginner' ? 'default' : 
                              tutorial.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}
                    >
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                  <CardDescription>{tutorial.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {tutorial.views} views
                      </span>
                    </div>

                    <Button className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Start Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Certifications
            </h2>
            <p className="text-lg text-muted-foreground">
              Validate your expertise with industry-recognized certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert) => (
              <Card key={cert.id} className="glass-card hover-lift">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {cert.title}
                  </CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm">
                      <strong>Duration:</strong> {cert.duration}
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="text-sm space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Benefits:</h4>
                      <ul className="text-sm space-y-1">
                        {cert.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full">
                      Start Certification Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <PopupManager page="academy" />
    </div>
  );
};

export default Academy;