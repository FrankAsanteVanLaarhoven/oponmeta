import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  FileText, 
  Upload, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Percent,
  Download,
  Share2,
  Settings,
  Info,
  Zap,
  Shield,
  Globe,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlagiarismResult {
  overallScore: number;
  totalWords: number;
  uniqueWords: number;
  matchedSources: MatchedSource[];
  detailedReport: DetailedReport;
  timestamp: string;
  documentId: string;
}

interface MatchedSource {
  url: string;
  title: string;
  similarity: number;
  matchedText: string[];
  sourceType: 'web' | 'academic' | 'internal';
}

interface DetailedReport {
  sentenceAnalysis: SentenceAnalysis[];
  paragraphAnalysis: ParagraphAnalysis[];
  recommendations: string[];
}

interface SentenceAnalysis {
  sentence: string;
  similarity: number;
  sources: string[];
  flagged: boolean;
}

interface ParagraphAnalysis {
  paragraph: string;
  averageSimilarity: number;
  flaggedSentences: number;
}

const PlagiarismChecker = () => {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PlagiarismResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  // Mock subscription status - in real app, this would come from user profile
  const [subscriptionStatus] = useState({
    hasPlagiarismChecker: true,
    plan: 'premium',
    remainingChecks: 50,
    features: ['web_search', 'academic_database', 'internal_database', 'detailed_reports']
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const analyzeText = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to analyze",
        description: "Please enter or upload text to check for plagiarism",
        variant: "destructive"
      });
      return;
    }

    if (!subscriptionStatus.hasPlagiarismChecker) {
      toast({
        title: "Premium Feature",
        description: "Plagiarism checker is available as a premium add-on. Please upgrade your subscription.",
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
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      
      // Mock results
      const mockResults: PlagiarismResult = {
        overallScore: 87,
        totalWords: text.split(' ').length,
        uniqueWords: Math.floor(text.split(' ').length * 0.85),
        matchedSources: [
          {
            url: "https://example.com/article1",
            title: "Similar content found on educational website",
            similarity: 23,
            matchedText: ["This is a sample matched text", "Another matched sentence"],
            sourceType: 'web'
          },
          {
            url: "https://academic.edu/paper123",
            title: "Academic paper with similar content",
            similarity: 15,
            matchedText: ["Academic reference text"],
            sourceType: 'academic'
          }
        ],
        detailedReport: {
          sentenceAnalysis: [
            {
              sentence: "This is a sample sentence that might be flagged.",
              similarity: 85,
              sources: ["https://example.com/article1"],
              flagged: true
            },
            {
              sentence: "This is an original sentence with no matches.",
              similarity: 0,
              sources: [],
              flagged: false
            }
          ],
          paragraphAnalysis: [
            {
              paragraph: "Sample paragraph with mixed content...",
              averageSimilarity: 45,
              flaggedSentences: 2
            }
          ],
          recommendations: [
            "Rewrite flagged sentences to improve originality",
            "Add proper citations for referenced content",
            "Consider using more original examples"
          ]
        },
        timestamp: new Date().toISOString(),
        documentId: `DOC-${Date.now()}`
      };

      setResults(mockResults);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: `Plagiarism score: ${mockResults.overallScore}% original content`,
      });
    }, 3000);
  };

  const downloadReport = () => {
    if (!results) return;

    const report = {
      ...results,
      analysisDate: new Date().toLocaleDateString(),
      recommendations: results.detailedReport.recommendations
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `plagiarism-report-${results.documentId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plagiarism Checker</h1>
        <p className="text-gray-600">
          Advanced AI-powered plagiarism detection with comprehensive analysis and detailed reports
        </p>
      </div>

      {!subscriptionStatus.hasPlagiarismChecker && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This is a premium feature. <Button variant="link" className="p-0 h-auto">Upgrade your subscription</Button> to access the plagiarism checker.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Text Input</TabsTrigger>
                  <TabsTrigger value="file">File Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="text-input">Enter or paste your text</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Paste your text here to check for plagiarism..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[300px]"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="file" className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Upload Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Supported formats: .txt, .doc, .docx, .pdf
                      </p>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".txt,.doc,.docx,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        Choose File
                      </Button>
                    </div>
                    {uploadedFile && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {uploadedFile.name} uploaded successfully
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {text.split(' ').length} words
                </div>
                <Button 
                  onClick={analyzeText} 
                  disabled={isAnalyzing || !text.trim() || !subscriptionStatus.hasPlagiarismChecker}
                  className="flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Check Plagiarism
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing document...</span>
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
                <Globe className="h-4 w-4 text-blue-500" />
                <span>Web Search</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Database className="h-4 w-4 text-green-500" />
                <span>Academic Database</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-purple-500" />
                <span>Internal Database</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-orange-500" />
                <span>Detailed Reports</span>
              </div>
            </CardContent>
          </Card>

          {subscriptionStatus.hasPlagiarismChecker && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {subscriptionStatus.remainingChecks}
                  </div>
                  <div className="text-sm text-gray-600">
                    Checks remaining
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Results Section */}
      {results && (
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Results</span>
                <div className="flex items-center gap-2">
                  <Badge className={getScoreBadge(results.overallScore)}>
                    {results.overallScore}% Original
                  </Badge>
                  <Button variant="outline" size="sm" onClick={downloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                    {results.overallScore}%
                  </div>
                  <div className="text-sm text-gray-600">Originality Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {results.totalWords}
                  </div>
                  <div className="text-sm text-gray-600">Total Words</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {results.matchedSources.length}
                  </div>
                  <div className="text-sm text-gray-600">Matched Sources</div>
                </div>
              </div>

              {results.matchedSources.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Matched Sources</h3>
                  {results.matchedSources.map((source, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span 
                          className="text-blue-600 hover:underline font-medium cursor-pointer"
                          onClick={() => toast({
                            title: "Source Link",
                            description: "Source link would open here"
                          })}
                        >
                          {source.title}
                        </span>
                        <Badge variant="outline">
                          {source.similarity}% match
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {source.url}
                      </div>
                      <div className="text-sm">
                        <strong>Matched text:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {source.matchedText.map((text, i) => (
                            <li key={i} className="text-gray-700">"{text}"</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {results.detailedReport.recommendations.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.detailedReport.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker; 