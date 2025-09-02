import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertCircle, 
  Edit3, 
  Copy, 
  Download, 
  Share2, 
  BookOpen, 
  Zap, 
  Target, 
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Sparkles,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  Settings,
  History,
  Star,
  Award,
  Users,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GrammarError {
  id: string;
  type: 'grammar' | 'spelling' | 'style' | 'punctuation';
  message: string;
  suggestion: string;
  start: number;
  end: number;
  severity: 'low' | 'medium' | 'high';
}

interface WritingStats {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
  readabilityScore: number;
  grammarScore: number;
  styleScore: number;
}

const GrammarCheckerPage: React.FC = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [stats, setStats] = useState<WritingStats | null>(null);
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Mock grammar errors for demonstration
  const mockErrors: GrammarError[] = [
    {
      id: '1',
      type: 'grammar',
      message: 'Subject-verb agreement error',
      suggestion: 'Change "is" to "are"',
      start: 15,
      end: 17,
      severity: 'medium'
    },
    {
      id: '2',
      type: 'spelling',
      message: 'Misspelled word',
      suggestion: 'Change "recieve" to "receive"',
      start: 45,
      end: 52,
      severity: 'high'
    },
    {
      id: '3',
      type: 'style',
      message: 'Wordy phrase',
      suggestion: 'Replace "due to the fact that" with "because"',
      start: 78,
      end: 95,
      severity: 'low'
    }
  ];

  const mockStats: WritingStats = {
    wordCount: 156,
    characterCount: 892,
    sentenceCount: 8,
    paragraphCount: 3,
    readingTime: 1,
    readabilityScore: 85,
    grammarScore: 92,
    styleScore: 78
  };

  const handleAnalyse = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setErrors(mockErrors);
    setStats(mockStats);
    setIsAnalyzing(false);
  };

  const handleApplySuggestion = (error: GrammarError) => {
    const before = inputText.substring(0, error.start);
    const after = inputText.substring(error.end);
    const newText = before + error.suggestion + after;
    setInputText(newText);
    setErrors(errors.filter(e => e.id !== error.id));
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(inputText);
    alert('Text copied to clipboard!');
  };

  const handleDownloadText = () => {
    const blob = new Blob([inputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grammar-checked-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'grammar':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'spelling':
        return <AlertCircle className="h-4 w-4 text-orange-400" />;
      case 'style':
        return <Edit3 className="h-4 w-4 text-yellow-400" />;
      case 'punctuation':
        return <AlertCircle className="h-4 w-4 text-blue-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-red-500 bg-red-500/10';
      case 'medium':
        return 'border-orange-500 bg-orange-500/10';
      case 'low':
        return 'border-yellow-500 bg-yellow-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Advanced AI algorithms detect grammar, spelling, and style issues'
    },
    {
      icon: Target,
      title: 'Smart Suggestions',
      description: 'Get intelligent suggestions to improve your writing'
    },
    {
      icon: Clock,
      title: 'Real-time Checking',
      description: 'Instant feedback as you type with live error detection'
    },
    {
      icon: TrendingUp,
      title: 'Writing Analytics',
      description: 'Track your writing progress and improvement over time'
    },
    {
      icon: Users,
      title: 'Multiple Languages',
      description: 'Support for English, Spanish, French, and more'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'Follow international writing standards and best practices'
    }
  ];

  const writingTips = [
    'Use active voice instead of passive voice for clearer writing',
    'Keep sentences concise and avoid unnecessary words',
    'Vary sentence structure to maintain reader interest',
    'Use specific nouns and strong verbs',
    'Proofread your work before submitting',
    'Read your writing aloud to catch awkward phrasing'
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
            <BookOpen className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Grammar Checker
            </h1>
            <p className="text-xl text-yellow-400 max-w-3xl mx-auto">
              Enhance your writing with AI-powered grammar checking, style suggestions, and real-time feedback. 
              Perfect for essays, emails, reports, and any written content.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor */}
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
                    onClick={handleDownloadText}
                    className="flex items-center px-3 py-1 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here to check for grammar, spelling, and style issues..."
                className="w-full h-64 p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 resize-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-yellow-400">
                  {inputText.length} characters
                </div>
                <button
                  onClick={handleAnalyse}
                  disabled={isAnalyzing || !inputText.trim()}
                  className="flex items-center px-6 py-2 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-300 disabled:bg-gray-600 disabled:text-gray-400 transition-colors"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check Grammar
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Analysis Results */}
            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Issues Found ({errors.length})
                </h3>
                <div className="space-y-4">
                  {errors.map((error) => (
                    <div
                      key={error.id}
                      className={`p-4 rounded-lg border-l-4 ${getSeverityColor(error.severity)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {getErrorIcon(error.type)}
                          <div>
                            <p className="text-white font-medium">{error.message}</p>
                            <p className="text-yellow-400 text-sm mt-1">
                              Suggestion: {error.suggestion}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleApplySuggestion(error)}
                          className="px-3 py-1 bg-yellow-400 text-gray-900 rounded text-sm hover:bg-yellow-300 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Writing Statistics */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Writing Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.wordCount}</p>
                    <p className="text-yellow-400 text-sm">Words</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.characterCount}</p>
                    <p className="text-yellow-400 text-sm">Characters</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.sentenceCount}</p>
                    <p className="text-yellow-400 text-sm">Sentences</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{stats.readingTime}</p>
                    <p className="text-yellow-400 text-sm">Min Read</p>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-400">Grammar Score</span>
                      <span className="text-white">{stats.grammarScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full" 
                        style={{ width: `${stats.grammarScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-400">Style Score</span>
                      <span className="text-white">{stats.styleScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full" 
                        style={{ width: `${stats.styleScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-yellow-400">Readability</span>
                      <span className="text-white">{stats.readabilityScore}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-400 h-2 rounded-full" 
                        style={{ width: `${stats.readabilityScore}%` }}
                      ></div>
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

            {/* Writing Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Writing Tips</h3>
              <div className="space-y-3">
                {writingTips.map((tip, index) => (
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
                  onClick={() => setInputText('')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Text
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="w-full flex items-center justify-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  <History className="h-4 w-4 mr-2" />
                  View History
                </button>
                <button
                  onClick={() => navigate('/plagiarism-checker')}
                  className="w-full flex items-center justify-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors font-semibold"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Check Plagiarism
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarCheckerPage;
