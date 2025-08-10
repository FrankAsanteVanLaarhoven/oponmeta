import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  BookOpen, 
  Video, 
  Users, 
  DollarSign, 
  Star,
  ArrowRight,
  Play,
  Settings,
  BarChart3,
  FileText,
  Camera,
  Mic,
  Lightbulb,
  Target,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const InstructorOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      id: 1,
      title: "Welcome to OponMeta!",
      description: "Complete your instructor profile and get started",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Congratulations!</h3>
            <p className="text-gray-600 mb-6">
              Your instructor application has been approved! You're now part of our global teaching community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center p-4">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Global Reach</h4>
              <p className="text-sm text-gray-600">Access learners worldwide</p>
            </Card>
            <Card className="text-center p-4">
              <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Earn Revenue</h4>
              <p className="text-sm text-gray-600">Keep up to 70% of sales</p>
            </Card>
            <Card className="text-center p-4">
              <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Build Your Brand</h4>
              <p className="text-sm text-gray-600">Become a recognized expert</p>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Complete Your Profile",
      description: "Set up your instructor profile and preferences",
      icon: <Settings className="w-8 h-8 text-blue-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Profile Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Profile Picture</label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Upload a professional photo</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Bio</label>
                  <textarea 
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                    rows={4}
                    placeholder="Tell learners about your expertise and teaching style..."
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Teaching Specialties</label>
                  <input 
                    type="text"
                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g., Web Development, Data Science, Business Strategy"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Preferences</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Preferred Language</label>
                  <select className="mt-2 w-full p-3 border border-gray-300 rounded-lg">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Time Zone</label>
                  <select className="mt-2 w-full p-3 border border-gray-300 rounded-lg">
                    <option>UTC (Coordinated Universal Time)</option>
                    <option>EST (Eastern Standard Time)</option>
                    <option>PST (Pacific Standard Time)</option>
                    <option>GMT (Greenwich Mean Time)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Communication Preferences</label>
                  <div className="mt-2 space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Email notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">SMS notifications</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Platform notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Course Creation Tools",
      description: "Learn about our AI-powered course creation tools",
      icon: <BookOpen className="w-8 h-8 text-green-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                <h4 className="font-semibold text-gray-900">AI Course Creator</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Use our AI-powered tool to create comprehensive courses with lessons, quizzes, and assignments.
              </p>
              <Button 
                onClick={() => navigate('/dashboard/ai-course-creator')}
                className="w-full"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Start Creating
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Video className="w-6 h-6 text-blue-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Video Production</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Access our professional recording studios and video editing tools.
              </p>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-purple-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Assessment Tools</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Create quizzes, assignments, and assessments to test learner knowledge.
              </p>
              <Button variant="outline" className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Explore Tools
              </Button>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Analytics Dashboard</h4>
              </div>
              <p className="text-gray-600 mb-4">
                Track your course performance, student engagement, and revenue.
              </p>
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Best Practices & Guidelines",
      description: "Learn how to create successful courses",
      icon: <Award className="w-8 h-8 text-purple-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Course Creation Tips</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Start with a clear learning objective</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Break content into digestible modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Include practical exercises and projects</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Provide downloadable resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Engage with student questions and feedback</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quality Standards</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">High-quality video and audio</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Accurate and up-to-date content</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Clear and professional presentation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Regular content updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Responsive to student needs</span>
                </li>
              </ul>
            </div>
          </div>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-800">
                Start with a free course to build your audience and gather feedback before creating premium content.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 5,
      title: "You're Ready to Start!",
      description: "Begin your teaching journey on OponMeta",
      icon: <Play className="w-8 h-8 text-green-500" />,
      content: (
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Welcome to Your Teaching Journey!</h3>
            <p className="text-gray-600 mb-6">
              You're all set up and ready to start creating amazing courses. Your knowledge can now reach learners worldwide!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="text-center p-4">
              <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Create Your First Course</h4>
              <p className="text-sm text-gray-600">Use our AI-powered tools</p>
            </Card>
            <Card className="text-center p-4">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Connect with Learners</h4>
              <p className="text-sm text-gray-600">Build your community</p>
            </Card>
            <Card className="text-center p-4">
              <DollarSign className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900">Start Earning</h4>
              <p className="text-sm text-gray-600">Grow your revenue</p>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/dashboard/ai-course-creator')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Create Your First Course
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard/course-management')}
              variant="outline"
              size="lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Course Management
            </Button>
          </div>
        </div>
      )
    }
  ];

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleSkipStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Onboarding</h1>
            <p className="text-gray-600">Complete your setup and start creating amazing courses</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      completedSteps.includes(step.id) 
                        ? 'bg-green-500 text-white' 
                        : step.id === currentStep 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {completedSteps.includes(step.id) ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 ${
                      completedSteps.includes(step.id + 1) ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center space-x-3">
                {currentStepData?.icon}
                <div>
                  <CardTitle className="text-xl">{currentStepData?.title}</CardTitle>
                  <p className="text-gray-600">{currentStepData?.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {currentStepData?.content}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="space-x-2">
              {currentStep < steps.length && (
                <Button
                  variant="outline"
                  onClick={handleSkipStep}
                >
                  Skip
                </Button>
              )}
              
              {currentStep < steps.length ? (
                <Button
                  onClick={() => handleStepComplete(currentStep)}
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/dashboard/ai-course-creator')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Creating Courses
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorOnboarding; 