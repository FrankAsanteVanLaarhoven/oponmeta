import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  BarChart3,
  Target,
  Award,
  Star,
  Timer,
  BookOpen,
  Calculator,
  Palette,
  Globe,
  Zap,
  TrendingUp,
  Users,
  Lightbulb
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface TestResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeTaken: number;
  categoryScores: { [key: string]: number };
  recommendations: string[];
}

const APTITUDE_TESTS = [
  {
    id: 'numerical',
    name: 'Numerical Reasoning',
    description: 'Test your mathematical and analytical skills',
    icon: Calculator,
    duration: 30,
    questions: 20,
    color: 'text-blue-600'
  },
  {
    id: 'verbal',
    name: 'Verbal Reasoning',
    description: 'Assess your language and comprehension skills',
    icon: BookOpen,
    duration: 25,
    questions: 15,
    color: 'text-green-600'
  },
  {
    id: 'logical',
    name: 'Logical Reasoning',
    description: 'Evaluate your problem-solving and critical thinking',
    icon: Brain,
    duration: 35,
    questions: 25,
    color: 'text-purple-600'
  },
  {
    id: 'spatial',
    name: 'Spatial Reasoning',
    description: 'Test your visual and spatial awareness',
    icon: Palette,
    duration: 20,
    questions: 15,
    color: 'text-orange-600'
  },
  {
    id: 'abstract',
    name: 'Abstract Reasoning',
    description: 'Assess your pattern recognition abilities',
    icon: Lightbulb,
    duration: 30,
    questions: 20,
    color: 'text-red-600'
  }
];

const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'If a train travels 120 km in 2 hours, what is its average speed?',
    options: ['40 km/h', '60 km/h', '80 km/h', '100 km/h'],
    correctAnswer: 1,
    explanation: 'Speed = Distance ÷ Time = 120 km ÷ 2 hours = 60 km/h',
    category: 'numerical',
    difficulty: 'easy'
  },
  {
    id: '2',
    text: 'Complete the sequence: 2, 4, 8, 16, __',
    options: ['20', '24', '32', '30'],
    correctAnswer: 2,
    explanation: 'Each number is multiplied by 2: 2×2=4, 4×2=8, 8×2=16, 16×2=32',
    category: 'logical',
    difficulty: 'medium'
  },
  {
    id: '3',
    text: 'Which word is most similar to "Eloquent"?',
    options: ['Quiet', 'Articulate', 'Rude', 'Simple'],
    correctAnswer: 1,
    explanation: 'Eloquent means fluent or persuasive in speech, similar to articulate',
    category: 'verbal',
    difficulty: 'medium'
  },
  {
    id: '4',
    text: 'If 3 workers can complete a task in 6 days, how many days will it take 2 workers?',
    options: ['4 days', '6 days', '9 days', '12 days'],
    correctAnswer: 2,
    explanation: 'More workers = less time. 3 workers = 6 days, so 2 workers = 9 days',
    category: 'numerical',
    difficulty: 'hard'
  },
  {
    id: '5',
    text: 'Which figure comes next in the pattern?',
    options: ['Triangle', 'Square', 'Circle', 'Diamond'],
    correctAnswer: 2,
    explanation: 'The pattern alternates between geometric shapes',
    category: 'spatial',
    difficulty: 'easy'
  }
];

const AptitudeTest = () => {
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [results, setResults] = useState<TestResult | null>(null);

  const currentQuestions = MOCK_QUESTIONS.filter(q => q.category === selectedTest);
  const currentQuestionData = currentQuestions[currentQuestion];

  const startTest = (testId: string) => {
    setSelectedTest(testId);
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeRemaining(APTITUDE_TESTS.find(t => t.id === testId)?.duration || 30);
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeTest = () => {
    const totalQuestions = currentQuestions.length;
    const correctAnswers = currentQuestions.filter(q => 
      answers[q.id] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const categoryScores: { [key: string]: number } = {};
    currentQuestions.forEach(q => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = 0;
      }
      if (answers[q.id] === q.correctAnswer) {
        categoryScores[q.category]++;
      }
    });

    const recommendations = [];
    if (score < 50) {
      recommendations.push('Focus on fundamental concepts and practice regularly');
    } else if (score < 75) {
      recommendations.push('Good foundation, work on advanced topics');
    } else {
      recommendations.push('Excellent performance! Consider challenging yourself with harder questions');
    }

    setResults({
      totalQuestions,
      correctAnswers,
      score,
      timeTaken: 0,
      categoryScores,
      recommendations
    });
    setTestCompleted(true);
  };

  const resetTest = () => {
    setSelectedTest('');
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / currentQuestions.length) * 100;
  };

  if (testCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Results</h1>
              <p className="text-xl text-gray-600">Here's how you performed on the aptitude test</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{results.score}%</div>
                  <p className="text-gray-600">Overall Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{results.correctAnswers}/{results.totalQuestions}</div>
                  <p className="text-gray-600">Correct Answers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {results.score >= 80 ? 'Excellent' : results.score >= 60 ? 'Good' : 'Needs Improvement'}
                  </div>
                  <p className="text-gray-600">Performance Level</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Numerical Reasoning</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={75} className="w-32" />
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Logical Reasoning</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={60} className="w-32" />
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Verbal Reasoning</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={85} className="w-32" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button onClick={resetTest} className="bg-blue-600 hover:bg-blue-700">
                Take Another Test
              </Button>
              <Button variant="outline">
                Download Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testStarted && currentQuestionData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {APTITUDE_TESTS.find(t => t.id === selectedTest)?.name}
                </h1>
                <p className="text-gray-600">Question {currentQuestion + 1} of {currentQuestions.length}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Timer className="w-5 h-5 text-red-600" />
                  <span className="font-medium">{timeRemaining}:00</span>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {currentQuestionData.difficulty}
                </Badge>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <Progress value={getProgress()} className="h-2" />
            </div>

            {/* Question */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestionData.text}
                </h2>

                <RadioGroup
                  value={answers[currentQuestionData.id]?.toString() || ''}
                  onValueChange={(value) => handleAnswer(parseInt(value))}
                  className="space-y-4"
                >
                  {currentQuestionData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-lg cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="bg-white text-black border-gray-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={nextQuestion}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === currentQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aptitude Tests</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Assess your skills and abilities with our comprehensive aptitude tests. Choose a test type to get started.
          </p>
        </div>

        {/* Test Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {APTITUDE_TESTS.map(test => {
            const Icon = test.icon;
            return (
              <Card 
                key={test.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => startTest(test.id)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-8 h-8 ${test.color}`} />
                    <CardTitle className="text-lg">{test.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{test.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{test.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span>{test.questions} questions</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Start Test
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
            <p className="text-gray-600">Get comprehensive insights into your strengths and areas for improvement</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
            <p className="text-gray-600">Track your progress over time and see how you improve</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
                            <h3 className="text-xl font-semibold mb-2">Personalised Recommendations</h3>
            <p className="text-gray-600">Receive tailored suggestions to enhance your skills</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
