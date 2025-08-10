import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Target, Zap } from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Recommendations = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    learningHistory: "",
    performanceData: "",
    learningGoals: "",
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate AI analysis
    for (let i = 0; i <= 100; i += 25) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(i);
    }
    
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#16203a] rounded-lg">
            <Sparkles className="h-8 w-8 text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-cyan-300">Personalised Learning Recommendations</h1>
            <p className="text-gray-600 mt-1">
              Fill in your details to receive AI-powered course recommendations tailored to your learning journey.
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-purple-600 bg-purple-50">
          <Brain className="mr-1 h-3 w-3" />
          AI-Powered
        </Badge>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-cyan-300" />
            <span>Get AI Recommendations</span>
          </CardTitle>
          <p className="text-gray-600">Our AI analyzes your learning patterns to suggest the most suitable courses.</p>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="space-y-6 py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-300 mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Learning Profile</h3>
                <p className="text-gray-600">This may take a few moments...</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Analysis Progress</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  placeholder="Enter your Student ID"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learningHistory">Learning History</Label>
                <Textarea
                  id="learningHistory"
                  placeholder="e.g., Completed 'Intro to Python', scored 85% in 'Web Fundamentals'."
                  value={formData.learningHistory}
                  onChange={(e) => setFormData({ ...formData, learningHistory: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="performanceData">Performance Data</Label>
                <Textarea
                  id="performanceData"
                  placeholder="e.g., Strong in practical coding, weak in theory. High engagement in interactive modules."
                  value={formData.performanceData}
                  onChange={(e) => setFormData({ ...formData, performanceData: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="learningGoals">Learning Goals</Label>
                <Textarea
                  id="learningGoals"
                  placeholder="e.g., Want to become a full-stack developer, improve data analysis skills."
                  value={formData.learningGoals}
                  onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]">
                <Sparkles className="mr-2 h-4 w-4" />
                Get Recommendations
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;