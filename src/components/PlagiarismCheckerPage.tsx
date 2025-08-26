import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  FileText, 
  Copy, 
  Download, 
  Share2, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Percent, 
  Globe,
  Database,
  Shield,
  Zap,
  Target,
  TrendingUp,
  Users,
  Award,
  RotateCcw,
  History,
  Settings,
  Eye,
  EyeOff,
  Upload,
  Link,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlagiarismResult {
  id: string;
  source: string;
  similarity: number;
  matchedText: string;
  url?: string;
  type: 'web' | 'academic' | 'internal';
  severity: 'low' | 'medium' | 'high';
}

interface AnalysisStats {
  totalWords: number;
  uniqueWords: number;
  similarityScore: number;
  originalityScore: number;
  sourcesFound: number;
  analysisTime: number;
}

const PlagiarismCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PlagiarismResult[]>([]);
  const [stats, setStats] = useState<AnalysisStats | null>(null);
  const [selectedResult, setSelectedResult] = useState<PlagiarismResult | null>(null);
  const [showDetailedReport, setShowDetailedReport] = useState(false);

  // Mock plagiarism results for demonstration
  const mockResults: PlagiarismResult[] = [
    {
      id: '1',
      source: 'Wikipedia - Machine Learning',
      similarity: 15,
      matchedText: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.',
      url: 'https://en.wikipedia.org/wiki/Machine_learning',
      type: 'web',
      severity: 'medium'
    },
    {
      id: '2',
      source: 'Academic Paper - Neural Networks',
      similarity: 8,
      matchedText: 'Neural networks are computational models inspired by biological neural networks.',
      type: 'academic',
      severity: 'low'
    },
    {
      id: '3',
      source: 'Internal Database - Previous Submission',
      similarity: 25,
      matchedText: 'The implementation of deep learning algorithms requires significant computational resources and large datasets.',
      type: 'internal',
      severity: 'high'
    }
  ];

  const mockStats: AnalysisStats = {
    totalWords: 245,
    uniqueWords: 198,
    similarityScore: 16,
    originalityScore: 84,
    sourcesFound: 3,
    analysisTime: 2.3
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setResults(mockResults);
    setStats(mockStats);
    setIsAnalyzing(false);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(inputText);
    alert('Text copied to clipboard!');
  };

  const handleDownloadReport = () => {
    const report = `
Plagiarism Check Report
======================

Analysis Date: ${new Date().toLocaleDateString()}
Total Words: ${stats?.totalWords}
Originality Score: ${stats?.originalityScore}%
Similarity Score: ${stats?.similarityScore}%

Sources Found: ${stats?.sourcesFound}

Detailed Results:
${results.map(result => `
Source: ${result.source}
Similarity: ${result.similarity}%
Matched Text: "${result.matchedText}"
`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plagiarism-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400';
      case 'medium':
        return 'text-orange-400 bg-orange-400/10 border-orange-400';
      case 'low':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'web':
        return <Globe className="h-4 w-4" />;
      case 'academic':
        return <BookOpen className="h-4 w-4" />;
      case 'internal':
        return <Database className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Detection',
      description: 'Advanced algorithms scan billions of web pages and academic databases'
    },
    {
      icon: Shield,
      title: 'Academic Standards',
      description: 'Meets university and academic institution requirements'
    },
    {
      icon: Clock,
      title: 'Fast Analysis',
      description: 'Get results in seconds with our optimized scanning engine'
    },
    {
      icon: Database,
      title: 'Comprehensive Database',
      description: 'Access to web content, academic papers, and internal submissions'
    },
    {
      icon: Target,
      title: 'Detailed Reports',
      description: 'Get comprehensive reports with source links and similarity percentages'
    },
    {
      icon: Users,
      title: 'Educational Use',
      description: 'Perfect for students, teachers, and academic institutions'
    }
  ];

  const tips = [
    'Always cite your sources properly to avoid plagiarism',
    'Use quotation marks for direct quotes',
    'Paraphrase content in your own words',
    'Keep track of all sources used in your research',
    'Use multiple sources to develop your own perspective',
    'Review your work before submission'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1834] via-[#11204a] to-[#16203a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Search className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Plagiarism Checker
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
              Ensure your work is original with our AI-powered plagiarism detection tool. 
              Scan against billions of web pages, academic databases, and internal submissions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Your Text</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopyText}
                    className="flex items-center px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </button>
                  <button
                    onClick={() => setInputText('')}
                    className="flex items-center px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </button>
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here to check for plagiarism. We'll scan against billions of web pages and academic databases..."
                className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-yellow-400">
                  {inputText.length} characters
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Check Plagiarism
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Analysis Results */}
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Plagiarism Results ({results.length} sources found)
                  </h3>
                  <button
                    onClick={handleDownloadReport}
                    className="flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </button>
                </div>
                
                <div className="space-y-4">
                  {results.map((result) => (
                    <div
                      key={result.id}
                      className={`p-4 rounded-lg border ${getSeverityColor(result.severity)}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(result.type)}
                          <div>
                            <h4 className="text-white font-medium">{result.source}</h4>
                            <p className="text-yellow-400 text-sm">
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)} source
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-white">{result.similarity}%</p>
                          <p className="text-yellow-400 text-sm">Similarity</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded p-3 mb-3">
                        <p className="text-yellow-400 text-sm font-medium mb-1">Matched Text:</p>
                        <p className="text-white text-sm italic">"{result.matchedText}"</p>
                      </div>
                      
                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 text-sm"
                        >
                          <Link className="h-4 w-4 mr-1" />
                          View Source
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analysis Statistics */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Analysis Summary</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{stats.totalWords}</p>
                    <p className="text-yellow-400 text-sm">Total Words</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{stats.uniqueWords}</p>
                    <p className="text-yellow-400 text-sm">Unique Words</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{stats.sourcesFound}</p>
                    <p className="text-yellow-400 text-sm">Sources Found</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-white">{stats.analysisTime}s</p>
                    <p className="text-yellow-400 text-sm">Analysis Time</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-yellow-400">Originality Score</span>
                      <span className="text-white">{stats.originalityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-green-400 h-3 rounded-full" 
                        style={{ width: `${stats.originalityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-yellow-400">Similarity Score</span>
                      <span className="text-white">{stats.similarityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-red-400 h-3 rounded-full" 
                        style={{ width: `${stats.similarityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {stats.originalityScore >= 90 ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : stats.originalityScore >= 70 ? (
                      <AlertTriangle className="h-6 w-6 text-yellow-400" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    )}
                    <div>
                      <p className="text-white font-medium">
                        {stats.originalityScore >= 90 
                          ? 'Excellent! Your text appears to be original.' 
                          : stats.originalityScore >= 70 
                          ? 'Good, but consider reviewing highlighted sections.' 
                          : 'Please review and revise your text to improve originality.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                        <p className="text-yellow-400 text-xs">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Avoiding Plagiarism</h3>
              <div className="space-y-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Sparkles className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-400 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/grammar-checker')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Grammar Checker
                </button>
                <button
                  onClick={() => setShowDetailedReport(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detailed Report
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
                >
                  <Award className="h-4 w-4 mr-2" />
                  Get Premium
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismCheckerPage;
