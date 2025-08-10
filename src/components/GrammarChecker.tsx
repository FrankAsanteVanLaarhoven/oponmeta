import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Sparkles,
  Lightbulb,
  TrendingUp,
  Clock,
  Download,
  Share2,
  Settings,
  Zap,
  BookOpen,
  PenTool,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GrammarError {
  id: string;
  type: 'spelling' | 'grammar' | 'style' | 'punctuation' | 'clarity';
  message: string;
  suggestion: string;
  start: number;
  end: number;
  severity: 'error' | 'warning' | 'info';
  context: string;
}

interface GrammarResult {
  originalText: string;
  correctedText: string;
  errors: GrammarError[];
  stats: {
    totalWords: number;
    totalErrors: number;
    errorRate: number;
    readabilityScore: number;
    gradeLevel: string;
    timeToRead: string;
  };
  suggestions: string[];
  timestamp: string;
}

const GrammarChecker = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<GrammarResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  const analyzeGrammar = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please enter text to check for grammar and style issues",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 15;
      });
    }, 150);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Mock results with realistic grammar errors
      const mockErrors: GrammarError[] = [
        {
          id: '1',
          type: 'grammar',
          message: 'Subject-verb agreement error',
          suggestion: 'are',
          start: 15,
          end: 18,
          severity: 'error',
          context: 'The students is working hard.'
        },
        {
          id: '2',
          type: 'spelling',
          message: 'Misspelled word',
          suggestion: 'definitely',
          start: 45,
          end: 54,
          severity: 'error',
          context: 'I will definately attend the meeting.'
        },
        {
          id: '3',
          type: 'punctuation',
          message: 'Missing comma',
          suggestion: 'However,',
          start: 0,
          end: 8,
          severity: 'warning',
          context: 'However I think we should proceed.'
        },
        {
          id: '4',
          type: 'style',
          message: 'Wordy phrase',
          suggestion: 'because',
          start: 120,
          end: 135,
          severity: 'info',
          context: 'due to the fact that'
        },
        {
          id: '5',
          type: 'clarity',
          message: 'Unclear sentence structure',
          suggestion: 'The report, which was submitted yesterday, contains important findings.',
          start: 200,
          end: 250,
          severity: 'warning',
          context: 'The report was submitted yesterday it contains important findings.'
        }
      ];

      const correctedText = text
        .replace('is', 'are')
        .replace('definately', 'definitely')
        .replace('However ', 'However, ')
        .replace('due to the fact that', 'because');

      const mockResults: GrammarResult = {
        originalText: text,
        correctedText: correctedText,
        errors: mockErrors,
        stats: {
          totalWords: text.split(' ').length,
          totalErrors: mockErrors.length,
          errorRate: Math.round((mockErrors.length / text.split(' ').length) * 1000) / 10,
          readabilityScore: 75,
          gradeLevel: 'College',
          timeToRead: '2 min'
        },
        suggestions: [
          "Consider using more active voice",
          "Vary sentence length for better flow",
          "Add transitional phrases between paragraphs",
          "Use more specific vocabulary"
        ],
        timestamp: new Date().toISOString()
      };

      setResults(mockResults);
      setIsAnalyzing(false);

      toast({
        title: "Grammar Check Complete",
        description: `Found ${mockErrors.length} issues. Your text has been improved!`,
      });
    }, 2000);
  };

  const applySuggestion = (errorId: string) => {
    if (!results) return;

    const error = results.errors.find(e => e.id === errorId);
    if (!error) return;

    const newText = text.slice(0, error.start) + error.suggestion + text.slice(error.end);
    setText(newText);
    
    toast({
      title: "Suggestion Applied",
      description: "The correction has been applied to your text.",
    });
  };

  const getErrorColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getErrorIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      spelling: 'bg-red-100 text-red-800',
      grammar: 'bg-orange-100 text-orange-800',
      style: 'bg-blue-100 text-blue-800',
      punctuation: 'bg-purple-100 text-purple-800',
      clarity: 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Grammar Checker</h1>
        <p className="text-gray-600">
          Free AI-powered grammar and style checker to improve your writing
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5" />
                Text Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Textarea
                  placeholder="Enter or paste your text here to check for grammar, spelling, and style issues..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {text.split(' ').length} words
                </div>
                <Button 
                  onClick={analyzeGrammar} 
                  disabled={isAnalyzing || !text.trim()}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Check Grammar
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing text...</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Grammar & Spelling</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Lightbulb className="h-4 w-4 text-blue-500" />
                <span>Style Suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>Readability Score</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-orange-500" />
                <span>Grade Level</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Free Tool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  Free
                </div>
                <div className="text-sm text-gray-600">
                  Unlimited checks
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="mt-8 space-y-6">
          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {results.stats.totalWords}
                  </div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {results.stats.totalErrors}
                  </div>
                  <div className="text-sm text-gray-600">Issues Found</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {results.stats.readabilityScore}
                  </div>
                  <div className="text-sm text-gray-600">Readability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {results.stats.gradeLevel}
                  </div>
                  <div className="text-sm text-gray-600">Grade Level</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Errors List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Issues Found ({results.errors.length})</span>
                <Badge variant="outline">
                  {results.stats.errorRate}% error rate
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.errors.map((error) => (
                  <div key={error.id} className={`border rounded-lg p-4 ${getErrorColor(error.severity)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getErrorIcon(error.severity)}
                        <Badge className={getTypeBadge(error.type)}>
                          {error.type.charAt(0).toUpperCase() + error.type.slice(1)}
                        </Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => applySuggestion(error.id)}
                      >
                        Apply Fix
                      </Button>
                    </div>
                    <div className="mb-2">
                      <p className="font-medium">{error.message}</p>
                      <p className="text-sm mt-1">
                        <strong>Context:</strong> "{error.context}"
                      </p>
                    </div>
                    <div className="bg-white rounded p-2 border">
                      <p className="text-sm">
                        <strong>Suggestion:</strong> {error.suggestion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Writing Suggestions */}
          {results.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Writing Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Corrected Text */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Corrected Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <Textarea
                  value={results.correctedText}
                  readOnly
                  className="min-h-[200px] resize-none bg-white"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setText(results.correctedText)}>
                  Use Corrected Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker; 