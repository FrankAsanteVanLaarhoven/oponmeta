import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Heart, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  BarChart3,
  Target,
  Award,
  Star,
  Timer,
  Brain,
  Zap,
  TrendingUp,
  Lightbulb,
  UserCheck,
  Shield,
  Activity,
  Smile,
  AlertTriangle,
  Phone,
  Mail,
  Globe,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  category: string;
  weight: number;
}

interface WellnessResult {
  overallScore: number;
  moodScore: number;
  stressScore: number;
  sleepScore: number;
  socialScore: number;
  recommendations: string[];
  resources: Resource[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'hotline' | 'article' | 'exercise' | 'professional';
  link?: string;
  phone?: string;
}

const WELLNESS_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'How would you rate your overall mood today?',
    options: [
      'Excellent - I feel great and positive',
      'Good - I feel mostly positive',
      'Okay - I feel neutral',
      'Poor - I feel down or negative',
      'Very poor - I feel very distressed'
    ],
    category: 'mood',
    weight: 1
  },
  {
    id: '2',
    text: 'How well did you sleep last night?',
    options: [
      'Very well - 8+ hours, felt rested',
      'Well - 7-8 hours, mostly rested',
      'Okay - 6-7 hours, somewhat rested',
      'Poor - 5-6 hours, tired',
      'Very poor - Less than 5 hours, exhausted'
    ],
    category: 'sleep',
    weight: 1
  },
  {
    id: '3',
    text: 'How would you rate your stress level?',
    options: [
      'Very low - I feel relaxed and calm',
      'Low - I feel mostly calm',
      'Moderate - Some stress but manageable',
      'High - I feel quite stressed',
      'Very high - I feel overwhelmed'
    ],
    category: 'stress',
    weight: 1
  },
  {
    id: '4',
    text: 'How connected do you feel to others?',
    options: [
      'Very connected - Strong relationships',
      'Connected - Good relationships',
      'Somewhat connected - Some relationships',
      'Disconnected - Few relationships',
      'Very disconnected - Isolated'
    ],
    category: 'social',
    weight: 1
  },
  {
    id: '5',
    text: 'How would you rate your energy level?',
    options: [
      'Very high - I feel energetic and motivated',
      'High - I feel good energy',
      'Moderate - Normal energy level',
      'Low - I feel tired',
      'Very low - I feel exhausted'
    ],
    category: 'energy',
    weight: 1
  },
  {
    id: '6',
    text: 'How often do you feel anxious or worried?',
    options: [
      'Rarely or never',
      'Occasionally',
      'Sometimes',
      'Often',
      'Very often or constantly'
    ],
    category: 'anxiety',
    weight: 1
  },
  {
    id: '7',
    text: 'How would you rate your ability to concentrate?',
    options: [
      'Excellent - I can focus very well',
      'Good - I can focus well',
      'Okay - I can focus sometimes',
      'Poor - I have trouble focusing',
      'Very poor - I cannot focus at all'
    ],
    category: 'concentration',
    weight: 1
  },
  {
    id: '8',
    text: 'How would you rate your overall life satisfaction?',
    options: [
      'Very satisfied - I love my life',
      'Satisfied - I like my life',
      'Neutral - My life is okay',
      'Dissatisfied - I don\'t like my life much',
      'Very dissatisfied - I hate my life'
    ],
    category: 'satisfaction',
    weight: 1
  }
];

const MENTAL_HEALTH_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'National Suicide Prevention Lifeline',
    description: '24/7 crisis support and suicide prevention',
    type: 'hotline',
    phone: '988'
  },
  {
    id: '2',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741 for crisis support',
    type: 'hotline',
    phone: '741741'
  },
  {
    id: '3',
    title: 'Breathing Exercise',
    description: 'Simple 4-7-8 breathing technique for stress relief',
    type: 'exercise',
    link: '#breathing-exercise'
  },
  {
    id: '4',
    title: 'Mindfulness Meditation',
    description: '5-minute guided meditation for beginners',
    type: 'exercise',
    link: '#meditation'
  },
  {
    id: '5',
    title: 'Find a Therapist',
    description: 'Directory of licensed mental health professionals',
    type: 'professional',
    link: 'https://www.psychologytoday.com/us/therapists'
  },
  {
    id: '6',
    title: 'Mental Health Articles',
    description: 'Educational resources about mental wellness',
    type: 'article',
    link: '#articles'
  }
];

const MentalHealthAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [results, setResults] = useState<WellnessResult | null>(null);

  const currentQuestionData = WELLNESS_QUESTIONS[currentQuestion];

  const startAssessment = () => {
    setAssessmentStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionData.id]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < WELLNESS_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const completeAssessment = () => {
    // Calculate wellness scores (reverse scale: 0 = best, 4 = worst)
    const scores = {
      mood: 0,
      sleep: 0,
      stress: 0,
      social: 0,
      energy: 0,
      anxiety: 0,
      concentration: 0,
      satisfaction: 0
    };

    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = WELLNESS_QUESTIONS.find(q => q.id === questionId);
      if (question) {
        scores[question.category as keyof typeof scores] = answerIndex;
      }
    });

    // Convert to percentages (reverse scale)
    const overallScore = Math.round(((4 - Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length) / 4) * 100);
    const moodScore = Math.round(((4 - scores.mood) / 4) * 100);
    const stressScore = Math.round(((4 - scores.stress) / 4) * 100);
    const sleepScore = Math.round(((4 - scores.sleep) / 4) * 100);
    const socialScore = Math.round(((4 - scores.social) / 4) * 100);

    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (overallScore < 40) riskLevel = 'high';
    else if (overallScore < 70) riskLevel = 'medium';

    // Generate recommendations
    const recommendations = [];
    if (moodScore < 60) {
      recommendations.push('Consider talking to a friend, family member, or mental health professional about your mood');
    }
    if (stressScore < 60) {
      recommendations.push('Try stress-reduction techniques like deep breathing, meditation, or exercise');
    }
    if (sleepScore < 60) {
      recommendations.push('Establish a regular sleep schedule and create a relaxing bedtime routine');
    }
    if (socialScore < 60) {
      recommendations.push('Make an effort to connect with friends, family, or join social activities');
    }
    if (overallScore < 50) {
      recommendations.push('Consider reaching out to a mental health professional for support');
    }

    setResults({
      overallScore,
      moodScore,
      stressScore,
      sleepScore,
      socialScore,
      recommendations,
      resources: MENTAL_HEALTH_RESOURCES,
      riskLevel
    });
    setAssessmentCompleted(true);
  };

  const resetAssessment = () => {
    setAssessmentStarted(false);
    setAssessmentCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / WELLNESS_QUESTIONS.length) * 100;
  };

  if (assessmentCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Wellness Assessment</h1>
              <p className="text-xl text-gray-600">Here's your mental health and wellness overview</p>
            </div>

            {/* Risk Level Alert */}
            {results.riskLevel === 'high' && (
              <Card className="mb-8 border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-900">Important Notice</h3>
                      <p className="text-red-700">
                        Your assessment indicates you may be experiencing significant distress. Please consider reaching out to a mental health professional or crisis hotline for support.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overall Score */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Overall Wellness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-4">{results.overallScore}%</div>
                  <Progress value={results.overallScore} className="h-3 mb-4" />
                  <p className="text-gray-600">
                    {results.overallScore >= 80 ? 'Excellent wellness' : 
                     results.overallScore >= 60 ? 'Good wellness' : 
                     results.overallScore >= 40 ? 'Moderate wellness' : 'Low wellness'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mood</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-semibold">{results.moodScore}%</span>
                  </div>
                  <Progress value={results.moodScore} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stress Level</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-semibold">{results.stressScore}%</span>
                  </div>
                  <Progress value={results.stressScore} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sleep Quality</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-semibold">{results.sleepScore}%</span>
                  </div>
                  <Progress value={results.sleepScore} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Social Connection</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="font-semibold">{results.socialScore}%</span>
                  </div>
                  <Progress value={results.socialScore} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <span>Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Mental Health Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.resources.map(resource => (
                    <Card key={resource.id} className="border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                          </div>
                          {resource.type === 'hotline' && resource.phone && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Phone className="w-4 h-4 mr-1" />
                              {resource.phone}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button onClick={resetAssessment} className="bg-blue-600 hover:bg-blue-700">
                Take Assessment Again
              </Button>
              <Button variant="outline">
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (assessmentStarted && currentQuestionData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mental Health & Wellness Assessment</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {WELLNESS_QUESTIONS.length}</p>
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
                    <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="text-lg cursor-pointer flex-1">
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
                disabled={!answers[currentQuestionData.id]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === WELLNESS_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mental Health & Wellness Assessment</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a moment to check in with yourself. This assessment helps you understand your current mental health and wellness status.
          </p>
        </div>

        {/* Assessment Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About This Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                This wellness assessment is designed to help you understand your current mental health status. It covers mood, stress, sleep, social connection, and overall life satisfaction. Your responses are confidential and will help provide personalised recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Duration</h4>
                  <p className="text-sm text-gray-600">5-10 minutes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Confidential</h4>
                  <p className="text-sm text-gray-600">Your privacy is protected</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Supportive</h4>
                  <p className="text-sm text-gray-600">Get helpful resources</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Mental Health Check</h3>
            <p className="text-gray-600">Assess your current mental health status and identify areas for improvement</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Wellness Tracking</h3>
            <p className="text-gray-600">Track your mood, stress, sleep, and social connection over time</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-purple-600" />
            </div>
                            <h3 className="text-lg font-semibold mb-2">Personalised Tips</h3>
                            <p className="text-gray-600">Receive customised recommendations based on your assessment results</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Professional Support</h3>
            <p className="text-gray-600">Access to mental health resources and professional help when needed</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button onClick={startAssessment} className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
