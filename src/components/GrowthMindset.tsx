import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Users, 
  Award, 
  Star, 
  Clock, 
  Calendar,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Heart,
  Shield,
  ArrowRight,
  Play,
  Download,
  Share2,
  MessageSquare,
  Video,
  FileText,
  Image,
  Music,
  Globe,
  Target as TargetIcon,
  BarChart3,
  RefreshCw,
  Eye,
  Edit,
  Save,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';

interface GrowthStrategy {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeRequired: string;
  benefits: string[];
  steps: string[];
  resources: string[];
  isCompleted: boolean;
}

interface MindsetAssessment {
  id: string;
  question: string;
  fixedMindset: string;
  growthMindset: string;
  category: string;
}

const GROWTH_STRATEGIES: GrowthStrategy[] = [
  {
    id: '1',
    title: 'Embrace Challenges',
    description: 'Learn to see challenges as opportunities for growth rather than threats to your abilities.',
    category: 'Challenge Response',
    difficulty: 'beginner',
    timeRequired: '5-10 minutes daily',
    benefits: ['Increased resilience', 'Better problem-solving skills', 'Reduced fear of failure'],
    steps: [
      'Identify your automatic response to challenges',
      'Reframe challenges as learning opportunities',
      'Practice facing small challenges daily',
      'Celebrate effort, not just outcomes'
    ],
    resources: ['Mindset by Carol Dweck', 'Growth Mindset Workbook', 'Daily Challenge Journal'],
    isCompleted: false
  },
  {
    id: '2',
    title: 'Learn from Criticism',
    description: 'Develop the ability to receive feedback constructively and use it for improvement.',
    category: 'Feedback Processing',
    difficulty: 'intermediate',
    timeRequired: '15-20 minutes per feedback session',
    benefits: ['Faster skill development', 'Better relationships', 'Improved performance'],
    steps: [
      'Listen without immediately defending',
      'Ask clarifying questions',
      'Separate feedback about work from personal criticism',
      'Create an action plan based on feedback'
    ],
    resources: ['Feedback Mastery Course', 'Communication Skills Workshop', 'Reflection Templates'],
    isCompleted: false
  },
  {
    id: '3',
    title: 'Celebrate Others\' Success',
    description: 'Learn to find inspiration in others\' achievements rather than feeling threatened.',
    category: 'Social Mindset',
    difficulty: 'beginner',
    timeRequired: '2-3 minutes per interaction',
    benefits: ['Stronger relationships', 'Reduced envy', 'More learning opportunities'],
    steps: [
      'Practice genuine congratulations',
      'Ask about their journey and lessons learned',
      'Reflect on what you can learn from their success',
      'Share your own goals and progress'
    ],
    resources: ['Social Intelligence Training', 'Networking Guide', 'Success Stories Collection'],
    isCompleted: false
  },
  {
    id: '4',
    title: 'Focus on Process Over Outcome',
    description: 'Shift your attention from results to the learning and growth process.',
    category: 'Goal Setting',
    difficulty: 'intermediate',
    timeRequired: '10-15 minutes daily',
    benefits: ['Reduced performance anxiety', 'More consistent progress', 'Greater satisfaction'],
    steps: [
      'Set process-based goals alongside outcome goals',
      'Track daily habits and practices',
      'Reflect on what you learned each day',
      'Adjust strategies based on process feedback'
    ],
    resources: ['Process-Oriented Goal Setting', 'Habit Tracking Tools', 'Daily Reflection Prompts'],
    isCompleted: false
  },
  {
    id: '5',
    title: 'Develop a Learning Routine',
    description: 'Create consistent habits that support continuous learning and skill development.',
    category: 'Habit Formation',
    difficulty: 'advanced',
    timeRequired: '30-60 minutes daily',
    benefits: ['Consistent skill development', 'Better time management', 'Increased confidence'],
    steps: [
      'Identify your peak learning hours',
      'Create a dedicated learning space',
      'Schedule regular learning sessions',
      'Track and review your progress weekly'
    ],
    resources: ['Learning Routine Builder', 'Productivity Tools', 'Progress Tracking Templates'],
    isCompleted: false
  },
  {
    id: '6',
    title: 'Practice Self-Compassion',
    description: 'Learn to be kind to yourself during setbacks and failures.',
    category: 'Self-Care',
    difficulty: 'intermediate',
    timeRequired: '5-10 minutes daily',
    benefits: ['Reduced stress and anxiety', 'Faster recovery from setbacks', 'Better mental health'],
    steps: [
      'Recognize when you\'re being self-critical',
      'Practice self-compassionate self-talk',
      'Treat yourself as you would a good friend',
      'Acknowledge that everyone makes mistakes'
    ],
    resources: ['Self-Compassion Workbook', 'Mindfulness Meditation', 'Therapy Resources'],
    isCompleted: false
  }
];

const MINDSET_ASSESSMENT: MindsetAssessment[] = [
  {
    id: '1',
    question: 'When I face a difficult challenge, I...',
    fixedMindset: 'Avoid it or give up easily',
    growthMindset: 'See it as an opportunity to learn and grow',
    category: 'Challenge Response'
  },
  {
    id: '2',
    question: 'When someone succeeds where I failed, I...',
    fixedMindset: 'Feel threatened and envious',
    growthMindset: 'Feel inspired and want to learn from them',
    category: 'Social Comparison'
  },
  {
    id: '3',
    question: 'When I receive criticism, I...',
    fixedMindset: 'Take it personally and feel defensive',
    growthMindset: 'See it as valuable feedback for improvement',
    category: 'Feedback Processing'
  },
  {
    id: '4',
    question: 'When I make a mistake, I...',
    fixedMindset: 'Feel ashamed and try to hide it',
    growthMindset: 'Learn from it and try a different approach',
    category: 'Error Handling'
  },
  {
    id: '5',
    question: 'When I see someone struggling, I...',
    fixedMindset: 'Think they\'re not smart enough',
    growthMindset: 'Think they need more practice or a different strategy',
    category: 'Ability Beliefs'
  },
  {
    id: '6',
    question: 'When I achieve something, I...',
    fixedMindset: 'Feel like I\'ve proven my natural talent',
    growthMindset: 'Feel motivated to take on the next challenge',
    category: 'Success Response'
  }
];

const CATEGORIES = ['All Categories', 'Challenge Response', 'Feedback Processing', 'Social Mindset', 'Goal Setting', 'Habit Formation', 'Self-Care'];
const DIFFICULTY_LEVELS = ['All Levels', 'beginner', 'intermediate', 'advanced'];

const GrowthMindset = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [completedStrategies, setCompletedStrategies] = useState<string[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<{[key: string]: 'fixed' | 'growth'}>({});
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);

  const filteredStrategies = GROWTH_STRATEGIES.filter(strategy => {
    const matchesCategory = selectedCategory === 'All Categories' || strategy.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All Levels' || strategy.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const completedCount = completedStrategies.length;
  const totalStrategies = GROWTH_STRATEGIES.length;
  const progressPercentage = (completedCount / totalStrategies) * 100;

  const handleStrategyToggle = (strategyId: string) => {
    setCompletedStrategies(prev => 
      prev.includes(strategyId) 
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleAssessmentAnswer = (questionId: string, answer: 'fixed' | 'growth') => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const getAssessmentScore = () => {
    const growthAnswers = Object.values(assessmentAnswers).filter(answer => answer === 'growth').length;
    return Math.round((growthAnswers / MINDSET_ASSESSMENT.length) * 100);
  };

  const getMindsetType = (score: number) => {
    if (score >= 80) return { type: 'Strong Growth Mindset', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { type: 'Growth Mindset', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { type: 'Mixed Mindset', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { type: 'Fixed Mindset', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Build a Growth Mindset</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Develop the mindset that embraces challenges, learns from failures, and believes in the power of effort and persistence.
          </p>
        </div>

        {/* Quick Assessment */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              Mindset Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Take this quick assessment to understand your current mindset and identify areas for growth.
            </p>
            <Button onClick={() => setShowAssessment(true)} className="bg-blue-600 hover:bg-blue-700">
              <Target className="w-4 h-4 mr-2" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Strategies Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}/{totalStrategies}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <Progress value={progressPercentage} className="mt-4" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">7 days</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Learning Time</p>
                  <p className="text-2xl font-bold text-gray-900">24h 30m</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Growth Strategies */}
        <div className="space-y-6">
          {filteredStrategies.map(strategy => (
            <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-xl">{strategy.title}</CardTitle>
                      <Badge variant="outline" className="capitalize">
                        {strategy.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {strategy.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{strategy.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={completedStrategies.includes(strategy.id)}
                      onCheckedChange={() => handleStrategyToggle(strategy.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)}
                    >
                      {expandedStrategy === strategy.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {expandedStrategy === strategy.id && (
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <TargetIcon className="w-4 h-4 mr-2" />
                        Implementation Steps
                      </h4>
                      <ol className="space-y-2">
                        {strategy.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Benefits
                      </h4>
                      <ul className="space-y-2">
                        {strategy.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Recommended Resources
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {strategy.resources.map((resource, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {strategy.timeRequired}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Save Strategy
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Mindset Assessment Modal */}
        {showAssessment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Mindset Assessment</h2>
                    <p className="text-gray-600">Answer each question based on your typical response.</p>
                  </div>
                  <Button variant="ghost" onClick={() => setShowAssessment(false)}>
                    ✕
                  </Button>
                </div>

                {Object.keys(assessmentAnswers).length < MINDSET_ASSESSMENT.length ? (
                  <div className="space-y-6">
                    {MINDSET_ASSESSMENT.map((question, index) => (
                      <Card key={question.id}>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-gray-900 mb-4">
                            {index + 1}. {question.question}
                          </h3>
                          <div className="space-y-3">
                            <button
                              onClick={() => handleAssessmentAnswer(question.id, 'fixed')}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                                assessmentAnswers[question.id] === 'fixed'
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center">
                                <XCircle className="w-5 h-5 text-red-500 mr-3" />
                                <span className="text-gray-700">{question.fixedMindset}</span>
                              </div>
                            </button>
                            <button
                              onClick={() => handleAssessmentAnswer(question.id, 'growth')}
                              className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                                assessmentAnswers[question.id] === 'growth'
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                                <span className="text-gray-700">{question.growthMindset}</span>
                              </div>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="text-6xl">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-900">Assessment Complete!</h3>
                    <div className="text-center">
                      <div className={`inline-block p-4 rounded-lg ${getMindsetType(getAssessmentScore()).bg}`}>
                        <p className={`text-lg font-semibold ${getMindsetType(getAssessmentScore()).color}`}>
                          {getMindsetType(getAssessmentScore()).type}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">
                          {getAssessmentScore()}%
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {getAssessmentScore() >= 80 
                        ? "Excellent! You have a strong growth mindset. Keep building on these strengths."
                        : getAssessmentScore() >= 60
                        ? "Good! You're developing a growth mindset. Focus on the strategies above to improve further."
                        : "You have room to grow! The strategies above will help you develop a stronger growth mindset."
                      }
                    </p>
                    <Button onClick={() => setShowAssessment(false)} className="bg-blue-600 hover:bg-blue-700">
                      Continue to Strategies
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthMindset;
