import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Users, 
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
  Heart,
  Zap,
  TrendingUp,
  Lightbulb,
  UserCheck,
  Users as UserGroup,
  Crown,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  category: string;
  weight: number;
}

interface PersonalityResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  teamRole: string;
  communicationStyle: string;
  leadershipStyle: string;
  careerRecommendations: string[];
  scores: { [key: string]: number };
}

const PERSONALITY_QUESTIONS: Question[] = [
  {
    id: '1',
    text: 'In a team meeting, I prefer to:',
    options: [
      'Listen carefully and think before speaking',
      'Share my ideas immediately and encourage discussion',
      'Focus on the agenda and keep things moving',
      'Support others and help build consensus'
    ],
    category: 'communication',
    weight: 1
  },
  {
    id: '2',
    text: 'When faced with a deadline, I typically:',
    options: [
      'Plan carefully and work systematically',
      'Work quickly and adapt as needed',
      'Focus on the most important tasks first',
      'Collaborate with others to meet the goal'
    ],
    category: 'workstyle',
    weight: 1
  },
  {
    id: '3',
    text: 'In a conflict situation, I usually:',
    options: [
      'Analyze the situation and find a logical solution',
      'Address the issue directly and openly',
      'Focus on finding a quick resolution',
      'Try to understand everyone\'s perspective'
    ],
    category: 'conflict',
    weight: 1
  },
  {
    id: '4',
    text: 'When learning something new, I prefer:',
    options: [
      'Reading and researching thoroughly',
      'Trying it out and learning through experience',
      'Getting straight to the practical application',
      'Discussing it with others and sharing ideas'
    ],
    category: 'learning',
    weight: 1
  },
  {
    id: '5',
    text: 'In a leadership role, I would:',
    options: [
      'Set clear goals and provide detailed guidance',
      'Inspire and motivate the team',
      'Focus on results and efficiency',
      'Build relationships and support team growth'
    ],
    category: 'leadership',
    weight: 1
  },
  {
    id: '6',
    text: 'When making decisions, I rely most on:',
    options: [
      'Data and logical analysis',
      'Intuition and gut feeling',
      'Practical considerations and results',
      'How it affects people and relationships'
    ],
    category: 'decision',
    weight: 1
  },
  {
    id: '7',
    text: 'In social situations at work, I:',
    options: [
      'Prefer one-on-one conversations',
      'Enjoy group activities and networking',
      'Focus on getting things done',
      'Build relationships and help others'
    ],
    category: 'social',
    weight: 1
  },
  {
    id: '8',
    text: 'When working on a project, I value:',
    options: [
      'Accuracy and attention to detail',
      'Innovation and creative solutions',
      'Efficiency and getting results',
      'Team collaboration and harmony'
    ],
    category: 'values',
    weight: 1
  }
];

const PERSONALITY_TYPES = {
  'Analytical': {
    description: 'Logical, systematic, and detail-oriented',
    strengths: ['Analytical thinking', 'Attention to detail', 'Problem-solving', 'Reliability'],
    weaknesses: ['Can be overly critical', 'May miss big picture', 'Slow to make decisions'],
    workStyle: 'Methodical and thorough',
    teamRole: 'Technical expert and quality controller',
    communicationStyle: 'Direct and factual',
    leadershipStyle: 'Sets clear standards and processes',
    careerRecommendations: ['Data Analyst', 'Quality Assurance', 'Research', 'Engineering']
  },
  'Innovative': {
    description: 'Creative, adaptable, and forward-thinking',
    strengths: ['Creativity', 'Adaptability', 'Big-picture thinking', 'Innovation'],
    weaknesses: ['May lack follow-through', 'Can be disorganized', 'May overlook details'],
    workStyle: 'Flexible and creative',
    teamRole: 'Idea generator and change agent',
    communicationStyle: 'Enthusiastic and inspiring',
    leadershipStyle: 'Visionary and motivating',
    careerRecommendations: ['Product Manager', 'Marketing', 'Design', 'Entrepreneurship']
  },
  'Practical': {
    description: 'Results-oriented, efficient, and action-focused',
    strengths: ['Efficiency', 'Results-driven', 'Decisiveness', 'Practicality'],
    weaknesses: ['May rush decisions', 'Can be impatient', 'May overlook feelings'],
    workStyle: 'Fast-paced and goal-oriented',
    teamRole: 'Project manager and implementer',
    communicationStyle: 'Direct and action-oriented',
    leadershipStyle: 'Results-focused and decisive',
    careerRecommendations: ['Project Management', 'Operations', 'Sales', 'Consulting']
  },
  'Supportive': {
    description: 'Collaborative, empathetic, and relationship-focused',
    strengths: ['Teamwork', 'Empathy', 'Communication', 'Reliability'],
    weaknesses: ['May avoid conflict', 'Can be too accommodating', 'May struggle with tough decisions'],
    workStyle: 'Collaborative and supportive',
    teamRole: 'Team builder and mediator',
    communicationStyle: 'Warm and encouraging',
    leadershipStyle: 'Supportive and inclusive',
    careerRecommendations: ['Human Resources', 'Teaching', 'Counseling', 'Customer Service']
  }
};

const WorkplacePersonalityAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<PersonalityResult | null>(null);

  const currentQuestionData = PERSONALITY_QUESTIONS[currentQuestion];

  const startTest = () => {
    setTestStarted(true);
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
    if (currentQuestion < PERSONALITY_QUESTIONS.length - 1) {
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
    // Calculate personality scores based on answers
    const scores = {
      analytical: 0,
      innovative: 0,
      practical: 0,
      supportive: 0
    };

    // Simple scoring logic - in a real app, this would be more sophisticated
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = PERSONALITY_QUESTIONS.find(q => q.id === questionId);
      if (question) {
        // Assign points based on answer patterns
        if (answerIndex === 0) scores.analytical += 2;
        if (answerIndex === 1) scores.innovative += 2;
        if (answerIndex === 2) scores.practical += 2;
        if (answerIndex === 3) scores.supportive += 2;
      }
    });

    // Determine dominant personality type
    const maxScore = Math.max(...Object.values(scores));
    const dominantType = Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) || 'Analytical';
    
    const personalityType = PERSONALITY_TYPES[dominantType as keyof typeof PERSONALITY_TYPES];

    setResults({
      type: dominantType,
      description: personalityType.description,
      strengths: personalityType.strengths,
      weaknesses: personalityType.weaknesses,
      workStyle: personalityType.workStyle,
      teamRole: personalityType.teamRole,
      communicationStyle: personalityType.communicationStyle,
      leadershipStyle: personalityType.leadershipStyle,
      careerRecommendations: personalityType.careerRecommendations,
      scores
    });
    setTestCompleted(true);
  };

  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  const getProgress = () => {
    return ((currentQuestion + 1) / PERSONALITY_QUESTIONS.length) * 100;
  };

  if (testCompleted && results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Personality Profile</h1>
              <p className="text-xl text-gray-600">Discover your workplace personality type and how it affects your professional life</p>
            </div>

            {/* Personality Type */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-2xl">{results.type} Personality</CardTitle>
                    <p className="text-gray-600">{results.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span>Your Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    <span>Areas for Growth</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {results.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Lightbulb className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Work Style Analysis */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Work Style Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Work Style</h4>
                    <p className="text-gray-600">{results.workStyle}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Team Role</h4>
                    <p className="text-gray-600">{results.teamRole}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Communication Style</h4>
                    <p className="text-gray-600">{results.communicationStyle}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Leadership Style</h4>
                    <p className="text-gray-600">{results.leadershipStyle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Recommendations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span>Recommended Career Paths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {results.careerRecommendations.map((career, index) => (
                    <Badge key={index} variant="secondary" className="text-center py-2">
                      {career}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personality Scores */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Personality Dimensions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(results.scores).map(([dimension, score]) => (
                    <div key={dimension} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize font-medium">{dimension}</span>
                        <span>{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button onClick={resetTest} className="bg-blue-600 hover:bg-blue-700">
                Take Test Again
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

  if (testStarted && currentQuestionData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Workplace Personality Assessment</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {PERSONALITY_QUESTIONS.length}</p>
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
                {currentQuestion === PERSONALITY_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Workplace Personality Assessment</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your workplace personality type and understand how it influences your professional relationships, work style, and career success.
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
                This assessment will help you understand your workplace personality by evaluating your preferences in communication, decision-making, teamwork, and leadership. The results will provide insights into your strengths, areas for growth, and career recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Duration</h4>
                  <p className="text-sm text-gray-600">10-15 minutes</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Questions</h4>
                  <p className="text-sm text-gray-600">{PERSONALITY_QUESTIONS.length} questions</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-1">Results</h4>
                  <p className="text-sm text-gray-600">Detailed personality profile</p>
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
            <h3 className="text-lg font-semibold mb-2">Personality Insights</h3>
            <p className="text-gray-600">Understand your unique personality traits and how they affect your work</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <UserGroup className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Dynamics</h3>
            <p className="text-gray-600">Learn how you interact with others and your preferred team role</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Crown className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Leadership Style</h3>
            <p className="text-gray-600">Discover your natural leadership approach and how to leverage it</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Communication</h3>
            <p className="text-gray-600">Understand your communication preferences and how to improve</p>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button onClick={startTest} className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkplacePersonalityAssessment;
