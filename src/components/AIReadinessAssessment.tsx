import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  BarChart3,
  ArrowRight,
  Download,
  RefreshCw
} from "lucide-react";

interface AssessmentQuestion {
  id: string;
  category: string;
  question: string;
  options: { value: number; label: string; description: string }[];
}

interface AssessmentResult {
  score: number;
  level: string;
  color: string;
  recommendations: string[];
  nextSteps: string[];
}

const AIReadinessAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: AssessmentQuestion[] = [
    {
      id: "data-quality",
      category: "Data Infrastructure",
      question: "How would you rate the quality and accessibility of your organization's data?",
      options: [
        { value: 1, label: "Poor", description: "Data is scattered, inconsistent, or difficult to access" },
        { value: 2, label: "Fair", description: "Some data is organized but requires significant cleanup" },
        { value: 3, label: "Good", description: "Most data is well-organized and accessible" },
        { value: 4, label: "Excellent", description: "Data is clean, well-structured, and easily accessible" }
      ]
    },
    {
      id: "tech-infrastructure",
      category: "Technology Infrastructure",
      question: "How modern and flexible is your current technology infrastructure?",
      options: [
        { value: 1, label: "Legacy", description: "Mostly legacy systems with limited integration capabilities" },
        { value: 2, label: "Mixed", description: "Combination of legacy and modern systems" },
        { value: 3, label: "Modern", description: "Mostly modern systems with good integration capabilities" },
        { value: 4, label: "Cutting-edge", description: "Cloud-native, API-first, highly scalable infrastructure" }
      ]
    },
    {
      id: "team-skills",
      category: "Team & Skills",
      question: "What is the AI/automation skill level of your team?",
      options: [
        { value: 1, label: "Beginner", description: "Limited or no experience with AI/automation" },
        { value: 2, label: "Basic", description: "Some team members have basic automation experience" },
        { value: 3, label: "Intermediate", description: "Several team members experienced in automation/AI" },
        { value: 4, label: "Advanced", description: "Strong team with deep AI/automation expertise" }
      ]
    },
    {
      id: "process-maturity",
      category: "Process Maturity",
      question: "How well-documented and standardized are your business processes?",
      options: [
        { value: 1, label: "Ad-hoc", description: "Processes are mostly informal and undocumented" },
        { value: 2, label: "Basic", description: "Some processes documented but inconsistently followed" },
        { value: 3, label: "Standardized", description: "Most processes well-documented and consistently followed" },
        { value: 4, label: "Optimized", description: "Processes are highly optimized and continuously improved" }
      ]
    },
    {
      id: "leadership-support",
      category: "Leadership & Culture",
      question: "How supportive is leadership of AI automation initiatives?",
      options: [
        { value: 1, label: "Resistant", description: "Leadership is skeptical or resistant to change" },
        { value: 2, label: "Cautious", description: "Leadership is open but cautious about automation" },
        { value: 3, label: "Supportive", description: "Leadership actively supports automation initiatives" },
        { value: 4, label: "Champion", description: "Leadership champions AI automation as strategic priority" }
      ]
    }
  ];

  const calculateResults = (): AssessmentResult => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 4;
    const percentage = (totalScore / maxScore) * 100;

    if (percentage >= 80) {
      return {
        score: percentage,
        level: "AI-Ready Leader",
        color: "text-green-600",
        recommendations: [
          "You're well-positioned to implement advanced AI automation",
          "Consider enterprise-scale automation projects",
          "Focus on ROI optimization and scaling existing initiatives",
          "Explore cutting-edge AI technologies like machine learning and NLP"
        ],
        nextSteps: [
          "Schedule a strategic consultation for enterprise AI roadmap",
          "Download our Advanced AI Implementation Guide",
          "Consider custom AI solution development",
          "Join our AI Leaders Executive Program"
        ]
      };
    } else if (percentage >= 60) {
      return {
        score: percentage,
        level: "Automation Ready",
        color: "text-blue-600",
        recommendations: [
          "You have a solid foundation for AI automation",
          "Start with workflow automation and basic AI integration",
          "Invest in team training and skill development",
          "Standardize processes before scaling automation"
        ],
        nextSteps: [
          "Start with our n8n workflow automation templates",
          "Enroll team in AI automation training program",
          "Begin with pilot automation projects",
          "Download our Implementation Roadmap Guide"
        ]
      };
    } else if (percentage >= 40) {
      return {
        score: percentage,
        level: "Getting Started",
        color: "text-yellow-600",
        recommendations: [
          "Focus on building foundational capabilities",
          "Improve data quality and process documentation",
          "Invest in basic automation training",
          "Start with simple, low-risk automation projects"
        ],
        nextSteps: [
          "Complete our AI Fundamentals course",
          "Download our Getting Started with Automation guide",
          "Attend our monthly automation workshops",
          "Consider consulting services for foundation building"
        ]
      };
    } else {
      return {
        score: percentage,
        level: "Foundation Building",
        color: "text-red-600",
        recommendations: [
          "Significant preparation needed before AI automation",
          "Focus on data organization and process standardization",
          "Build internal capability and leadership alignment",
          "Start with manual process improvements first"
        ],
        nextSteps: [
          "Schedule a foundational assessment consultation",
          "Download our Business Process Optimization guide",
          "Attend our AI Strategy workshop",
          "Consider organizational change management support"
        ]
      };
    }
  };

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const assessmentResult = calculateResults();
      setResult(assessmentResult);
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2 border-primary/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">Assessment Complete!</CardTitle>
            <CardDescription className="text-lg">
              Your AI Automation Readiness Score
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Score Display */}
            <div className="text-center">
              <div className={`text-6xl font-bold mb-2 ${result.color}`}>
                {Math.round(result.score)}%
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {result.level}
              </Badge>
              <Progress value={result.score} className="mt-4 h-3" />
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Recommendations
              </h3>
              <div className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-primary" />
                Recommended Next Steps
              </h3>
              <div className="space-y-2">
                {result.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-foreground/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <Button className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Detailed Report
              </Button>
              <Button variant="outline" className="flex-1">
                Schedule Consultation
              </Button>
              <Button variant="ghost" onClick={resetAssessment}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <div className="text-sm text-foreground/60">
              {questions[currentQuestion].category}
            </div>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="mb-4" />
          <CardTitle className="text-xl">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full text-left h-auto p-4 hover:border-primary"
                onClick={() => handleAnswer(option.value)}
              >
                <div>
                  <div className="font-semibold mb-1">{option.label}</div>
                  <div className="text-sm text-foreground/70">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIReadinessAssessment;