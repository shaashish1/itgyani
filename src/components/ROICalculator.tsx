import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Users, 
  BarChart3,
  Calculator,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ROIInputs {
  // Current Costs
  currentStaffCost: number;
  currentOperatingCost: number;
  currentErrorCost: number;
  currentTimeSpent: number;
  
  // Implementation Costs
  implementationCost: number;
  trainingCost: number;
  maintenanceCost: number;
  
  // Expected Improvements
  efficiencyGain: number;
  errorReduction: number;
  timeReduction: number;
  
  // Project Details
  projectDuration: number;
  staffCount: number;
}

interface ROIResults {
  totalInvestment: number;
  annualSavings: number;
  roi: number;
  paybackPeriod: number;
  npv: number;
  breakEvenPoint: number;
  fiveYearValue: number;
}

const ROICalculator = () => {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentStaffCost: 500000,
    currentOperatingCost: 200000,
    currentErrorCost: 50000,
    currentTimeSpent: 2000,
    implementationCost: 150000,
    trainingCost: 25000,
    maintenanceCost: 30000,
    efficiencyGain: 35,
    errorReduction: 80,
    timeReduction: 60,
    projectDuration: 12,
    staffCount: 10
  });

  const [results, setResults] = useState<ROIResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const calculateROI = () => {
    // Current Annual Costs
    const totalCurrentCosts = inputs.currentStaffCost + inputs.currentOperatingCost + inputs.currentErrorCost;
    
    // Total Investment
    const totalInvestment = inputs.implementationCost + inputs.trainingCost;
    
    // Annual Savings Calculations
    const staffSavings = inputs.currentStaffCost * (inputs.efficiencyGain / 100);
    const operationalSavings = inputs.currentOperatingCost * (inputs.timeReduction / 100);
    const errorSavings = inputs.currentErrorCost * (inputs.errorReduction / 100);
    const annualSavings = staffSavings + operationalSavings + errorSavings - inputs.maintenanceCost;
    
    // ROI Calculations
    const roi = ((annualSavings * 3 - totalInvestment) / totalInvestment) * 100; // 3-year ROI
    const paybackPeriod = totalInvestment / (annualSavings / 12); // in months
    
    // NPV Calculation (using 10% discount rate)
    const discountRate = 0.10;
    let npv = -totalInvestment;
    for (let year = 1; year <= 5; year++) {
      npv += (annualSavings - (year > 1 ? inputs.maintenanceCost : 0)) / Math.pow(1 + discountRate, year);
    }
    
    const breakEvenPoint = totalInvestment / annualSavings * 12; // in months
    const fiveYearValue = (annualSavings * 5) - totalInvestment;

    const calculatedResults: ROIResults = {
      totalInvestment,
      annualSavings,
      roi,
      paybackPeriod,
      npv,
      breakEvenPoint,
      fiveYearValue
    };

    setResults(calculatedResults);
    setShowResults(true);
  };

  const updateInput = (field: keyof ROIInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const resetCalculator = () => {
    setResults(null);
    setShowResults(false);
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  const formatMonths = (months: number): string => {
    if (months < 12) {
      return `${months.toFixed(1)} months`;
    } else {
      const years = (months / 12).toFixed(1);
      return `${years} years`;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl mb-2">AI Automation ROI Calculator</CardTitle>
          <CardDescription className="text-lg">
            Calculate the potential return on investment for your AI automation project
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!showResults ? (
            <Tabs defaultValue="costs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="costs">Current Costs</TabsTrigger>
                <TabsTrigger value="implementation">Implementation</TabsTrigger>
                <TabsTrigger value="benefits">Expected Benefits</TabsTrigger>
              </TabsList>

              <TabsContent value="costs" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="staffCost">Annual Staff Costs</Label>
                      <Input
                        id="staffCost"
                        type="number"
                        value={inputs.currentStaffCost}
                        onChange={(e) => updateInput('currentStaffCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Total annual salary and benefits for staff involved in processes to be automated
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="operatingCost">Annual Operating Costs</Label>
                      <Input
                        id="operatingCost"
                        type="number"
                        value={inputs.currentOperatingCost}
                        onChange={(e) => updateInput('currentOperatingCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Software licenses, infrastructure, and other operational expenses
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="errorCost">Annual Error/Rework Costs</Label>
                      <Input
                        id="errorCost"
                        type="number"
                        value={inputs.currentErrorCost}
                        onChange={(e) => updateInput('currentErrorCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Costs associated with manual errors, rework, and quality issues
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="timeSpent">Weekly Hours Spent on Manual Tasks</Label>
                      <Input
                        id="timeSpent"
                        type="number"
                        value={inputs.currentTimeSpent}
                        onChange={(e) => updateInput('currentTimeSpent', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Total weekly hours across all staff for processes to be automated
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="implementation" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="implementationCost">Implementation Cost</Label>
                      <Input
                        id="implementationCost"
                        type="number"
                        value={inputs.implementationCost}
                        onChange={(e) => updateInput('implementationCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Software, consulting, development, and setup costs
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="trainingCost">Training & Change Management</Label>
                      <Input
                        id="trainingCost"
                        type="number"
                        value={inputs.trainingCost}
                        onChange={(e) => updateInput('trainingCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Staff training, change management, and onboarding costs
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="maintenanceCost">Annual Maintenance Cost</Label>
                      <Input
                        id="maintenanceCost"
                        type="number"
                        value={inputs.maintenanceCost}
                        onChange={(e) => updateInput('maintenanceCost', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Ongoing support, updates, and maintenance expenses
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="projectDuration">Project Duration (months)</Label>
                      <Input
                        id="projectDuration"
                        type="number"
                        value={inputs.projectDuration}
                        onChange={(e) => updateInput('projectDuration', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Expected time to fully implement the automation solution
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="efficiencyGain">Efficiency Gain (%)</Label>
                      <Input
                        id="efficiencyGain"
                        type="number"
                        value={inputs.efficiencyGain}
                        onChange={(e) => updateInput('efficiencyGain', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Expected percentage improvement in staff productivity
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="errorReduction">Error Reduction (%)</Label>
                      <Input
                        id="errorReduction"
                        type="number"
                        value={inputs.errorReduction}
                        onChange={(e) => updateInput('errorReduction', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Expected percentage reduction in errors and rework
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="timeReduction">Time Reduction (%)</Label>
                      <Input
                        id="timeReduction"
                        type="number"
                        value={inputs.timeReduction}
                        onChange={(e) => updateInput('timeReduction', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Expected percentage reduction in time spent on manual tasks
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="staffCount">Number of Staff Affected</Label>
                      <Input
                        id="staffCount"
                        type="number"
                        value={inputs.staffCount}
                        onChange={(e) => updateInput('staffCount', e.target.value)}
                        className="mt-1"
                      />
                      <p className="text-xs text-foreground/60 mt-1">
                        Number of employees who will benefit from the automation
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="flex justify-center pt-6 border-t">
                <Button onClick={calculateROI} size="lg" className="px-8">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate ROI
                </Button>
              </div>
            </Tabs>
          ) : results && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-2 border-green-200 dark:border-green-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      3-Year ROI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600">
                      {formatPercentage(results.roi)}
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">
                      Return on investment over 3 years
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Payback Period
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600">
                      {formatMonths(results.paybackPeriod)}
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">
                      Time to recover initial investment
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                      Annual Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600">
                      {formatCurrency(results.annualSavings)}
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">
                      Expected yearly cost savings
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Detailed Financial Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Investment:</span>
                        <span className="font-semibold">{formatCurrency(results.totalInvestment)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Break-even Point:</span>
                        <span className="font-semibold">{formatMonths(results.breakEvenPoint)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Net Present Value:</span>
                        <span className="font-semibold">{formatCurrency(results.npv)}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>5-Year Value:</span>
                        <span className="font-semibold">{formatCurrency(results.fiveYearValue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Monthly Savings:</span>
                        <span className="font-semibold">{formatCurrency(results.annualSavings / 12)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download ROI Report
                </Button>
                <Button variant="outline" className="flex-1">
                  Schedule Consultation
                </Button>
                <Button variant="ghost" onClick={resetCalculator}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Calculation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ROICalculator;