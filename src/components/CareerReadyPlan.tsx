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
  Target, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Star, 
  Users, 
  BookOpen,
  Award,
  MapPin,
  DollarSign,
  Clock,
  ArrowRight,
  Plus,
  Edit,
  Save,
  Download,
  Share2,
  BarChart3,
  Lightbulb,
  Zap,
  Globe,
  Building,
  GraduationCap,
  Briefcase,
  Heart,
  Brain,
  Settings
} from 'lucide-react';

interface CareerGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'not-started' | 'in-progress' | 'completed';
  category: string;
}

interface SkillGap {
  id: string;
  skill: string;
  currentLevel: number;
  targetLevel: number;
  importance: 'low' | 'medium' | 'high';
  learningPath: string[];
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: string;
  growth: string;
  timeline: string;
  courses: string[];
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'Develop software applications and systems',
    requirements: ['Programming skills', 'Problem solving', 'Team collaboration'],
    salary: '$80,000 - $150,000',
    growth: 'High demand, 22% growth',
    timeline: '6-12 months',
    courses: ['Web Development', 'Data Structures', 'System Design']
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Analyze data to drive business decisions',
    requirements: ['Statistics', 'Python/R', 'Machine Learning'],
    salary: '$90,000 - $160,000',
    growth: 'Very high demand, 31% growth',
    timeline: '8-15 months',
    courses: ['Python for Data Science', 'Machine Learning', 'Statistics']
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Lead product development and strategy',
    requirements: ['Leadership', 'Analytics', 'Communication'],
    salary: '$85,000 - $140,000',
    growth: 'High demand, 18% growth',
    timeline: '12-18 months',
    courses: ['Product Management', 'Business Strategy', 'User Research']
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    description: 'Design user experiences and interfaces',
    requirements: ['Design skills', 'User research', 'Prototyping'],
    salary: '$70,000 - $130,000',
    growth: 'High demand, 15% growth',
    timeline: '6-12 months',
    courses: ['UI/UX Design', 'User Research', 'Prototyping']
  }
];

const SKILL_CATEGORIES = [
  'Technical Skills',
  'Soft Skills',
  'Leadership',
  'Communication',
  'Analytics',
  'Creativity',
  'Problem Solving',
  'Industry Knowledge'
];

const CareerReadyPlan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCareerPath, setSelectedCareerPath] = useState<string>('');
  const [careerGoals, setCareerGoals] = useState<CareerGoal[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    currentRole: '',
    experience: '',
    education: '',
    interests: '',
    preferredIndustry: '',
    salaryExpectation: '',
    workStyle: '',
    location: ''
  });

  const addCareerGoal = () => {
    const newGoal: CareerGoal = {
      id: Date.now().toString(),
      title: '',
      description: '',
      targetDate: '',
      priority: 'medium',
      status: 'not-started',
      category: 'Career'
    };
    setCareerGoals(prev => [...prev, newGoal]);
  };

  const updateCareerGoal = (id: string, field: keyof CareerGoal, value: any) => {
    setCareerGoals(prev => 
      prev.map(goal => goal.id === id ? { ...goal, [field]: value } : goal)
    );
  };

  const removeCareerGoal = (id: string) => {
    setCareerGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const addSkillGap = () => {
    const newGap: SkillGap = {
      id: Date.now().toString(),
      skill: '',
      currentLevel: 1,
      targetLevel: 5,
      importance: 'medium',
      learningPath: []
    };
    setSkillGaps(prev => [...prev, newGap]);
  };

  const updateSkillGap = (id: string, field: keyof SkillGap, value: any) => {
    setSkillGaps(prev => 
      prev.map(gap => gap.id === id ? { ...gap, [field]: value } : gap)
    );
  };

  const removeSkillGap = (id: string) => {
    setSkillGaps(prev => prev.filter(gap => gap.id !== id));
  };

  const getProgress = () => {
    const steps = [
      selectedCareerPath,
      careerGoals.length > 0,
      skillGaps.length > 0,
      personalInfo.currentRole
    ];
    return (steps.filter(Boolean).length / steps.length) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Assessment</h3>
              <p className="text-gray-600 mb-6">Let's understand your current situation and career aspirations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Role</label>
                <Input
                  value={personalInfo.currentRole}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, currentRole: e.target.value }))}
                  placeholder="e.g., Student, Junior Developer, Marketing Assistant"
                  className="bg-white text-black border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <Select value={personalInfo.experience} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, experience: value }))}>
                  <SelectTrigger className="bg-white text-black border-gray-300">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-3">2-3 years</SelectItem>
                    <SelectItem value="4-6">4-6 years</SelectItem>
                    <SelectItem value="7-10">7-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <Select value={personalInfo.education} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, education: value }))}>
                  <SelectTrigger className="bg-white text-black border-gray-300">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="associate">Associate Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Industry</label>
                <Select value={personalInfo.preferredIndustry} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, preferredIndustry: value }))}>
                  <SelectTrigger className="bg-white text-black border-gray-300">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Career Interests & Passions</label>
              <Textarea
                value={personalInfo.interests}
                onChange={(e) => setPersonalInfo(prev => ({ ...prev, interests: e.target.value }))}
                placeholder="Describe what excites you, what problems you want to solve, and what kind of work environment you prefer..."
                rows={4}
                className="bg-white text-black border-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Expectation</label>
                <Select value={personalInfo.salaryExpectation} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, salaryExpectation: value }))}>
                  <SelectTrigger className="bg-white text-black border-gray-300">
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-50k">$30,000 - $50,000</SelectItem>
                    <SelectItem value="50-80k">$50,000 - $80,000</SelectItem>
                    <SelectItem value="80-120k">$80,000 - $120,000</SelectItem>
                    <SelectItem value="120k+">$120,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                <Input
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Remote, New York, San Francisco"
                  className="bg-white text-black border-gray-300"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Career Path</h3>
              <p className="text-gray-600 mb-6">Based on your assessment, here are some recommended career paths.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAREER_PATHS.map(path => (
                <Card 
                  key={path.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedCareerPath === path.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedCareerPath(path.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{path.title}</CardTitle>
                      {selectedCareerPath === path.id && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{path.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Salary Range:</span>
                        <span className="font-medium text-green-600">{path.salary}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-medium text-blue-600">{path.growth}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Timeline:</span>
                        <span className="font-medium">{path.timeline}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.requirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Courses:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {path.courses.map((course, index) => (
                          <li key={index} className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Set Career Goals</h3>
              <p className="text-gray-600 mb-6">Define specific, measurable goals to track your progress.</p>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Your Career Goals</h4>
              <Button onClick={addCareerGoal} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </div>

            <div className="space-y-4">
              {careerGoals.map((goal, index) => (
                <Card key={goal.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="font-medium text-gray-900">Goal #{index + 1}</h5>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeCareerGoal(goal.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title *</label>
                        <Input
                          value={goal.title}
                          onChange={(e) => updateCareerGoal(goal.id, 'title', e.target.value)}
                          placeholder="e.g., Learn React.js"
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Date</label>
                        <Input
                          type="date"
                          value={goal.targetDate}
                          onChange={(e) => updateCareerGoal(goal.id, 'targetDate', e.target.value)}
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                        <Select value={goal.priority} onValueChange={(value) => updateCareerGoal(goal.id, 'priority', value)}>
                          <SelectTrigger className="bg-white text-black border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <Select value={goal.status} onValueChange={(value) => updateCareerGoal(goal.id, 'status', value)}>
                          <SelectTrigger className="bg-white text-black border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <Textarea
                        value={goal.description}
                        onChange={(e) => updateCareerGoal(goal.id, 'description', e.target.value)}
                        placeholder="Describe your goal in detail..."
                        rows={3}
                        className="bg-white text-black border-gray-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {careerGoals.length === 0 && (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No career goals set yet. Click "Add Goal" to get started.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Gap Analysis</h3>
              <p className="text-gray-600 mb-6">Identify the skills you need to develop for your chosen career path.</p>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-900">Skill Gaps</h4>
              <Button onClick={addSkillGap} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill Gap
              </Button>
            </div>

            <div className="space-y-4">
              {skillGaps.map((gap, index) => (
                <Card key={gap.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="font-medium text-gray-900">Skill Gap #{index + 1}</h5>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkillGap(gap.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name *</label>
                        <Input
                          value={gap.skill}
                          onChange={(e) => updateSkillGap(gap.id, 'skill', e.target.value)}
                          placeholder="e.g., JavaScript, Leadership, Data Analysis"
                          className="bg-white text-black border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Importance</label>
                        <Select value={gap.importance} onValueChange={(value) => updateSkillGap(gap.id, 'importance', value)}>
                          <SelectTrigger className="bg-white text-black border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Level (1-5)</label>
                        <Select value={gap.currentLevel.toString()} onValueChange={(value) => updateSkillGap(gap.id, 'currentLevel', parseInt(value))}>
                          <SelectTrigger className="bg-white text-black border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map(level => (
                              <SelectItem key={level} value={level.toString()}>
                                {level} - {level === 1 ? 'Beginner' : level === 2 ? 'Basic' : level === 3 ? 'Intermediate' : level === 4 ? 'Advanced' : 'Expert'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Level (1-5)</label>
                        <Select value={gap.targetLevel.toString()} onValueChange={(value) => updateSkillGap(gap.id, 'targetLevel', parseInt(value))}>
                          <SelectTrigger className="bg-white text-black border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map(level => (
                              <SelectItem key={level} value={level.toString()}>
                                {level} - {level === 1 ? 'Beginner' : level === 2 ? 'Basic' : level === 3 ? 'Intermediate' : level === 4 ? 'Advanced' : 'Expert'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span>{gap.currentLevel}/5</span>
                      </div>
                      <Progress value={(gap.currentLevel / 5) * 100} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Target Level</span>
                        <span>{gap.targetLevel}/5</span>
                      </div>
                      <Progress value={(gap.targetLevel / 5) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {skillGaps.length === 0 && (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No skill gaps identified yet. Click "Add Skill Gap" to get started.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const steps = [
    { id: 1, name: 'Assessment', icon: Brain },
    { id: 2, name: 'Career Path', icon: Target },
    { id: 3, name: 'Goals', icon: TrendingUp },
    { id: 4, name: 'Skills', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Ready Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create a personalized career roadmap to achieve your professional goals. Get a step-by-step plan tailored to your skills, interests, and aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={getProgress()} className="h-2 mb-2" />
                <p className="text-sm text-gray-600">{Math.round(getProgress())}% complete</p>
              </CardContent>
            </Card>

            {/* Step Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Plan Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map(step => {
                  const Icon = step.icon;
                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(step.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        currentStep === step.id
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{step.name}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Plan
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Plan
                </Button>
                <Button variant="outline" className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    {steps.find(s => s.id === currentStep)?.name}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Step {currentStep} of {steps.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {renderStep()}
                
                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                    className="bg-white text-black border-gray-300"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < steps.length ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button className="bg-green-600 hover:bg-green-700">
                      Generate Plan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerReadyPlan;
