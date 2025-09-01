import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  Users, 
  DollarSign, 
  BarChart3,
  Plus,
  Play,
  Settings,
  FileText,
  Camera,
  Target,
  TrendingUp,
  Award,
  Star,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Instructor {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  subjectArea: string;
  approvedAt: string;
  onboardingCompleted: boolean;
  coursesCreated: number;
  totalRevenue: number;
  totalStudents: number;
}

const InstructorDashboard = () => {
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would come from user authentication
    // For demo purposes, we'll get the first approved instructor
    const approvedInstructors = JSON.parse(localStorage.getItem('approved_instructors') || '[]');
    if (approvedInstructors.length > 0) {
      setInstructor(approvedInstructors[0]);
    }
    setLoading(false);
  }, []);

  const quickActions = [
    {
      title: "Create New Course",
      description: "Use AI-powered tools to create comprehensive courses",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      action: () => navigate('/dashboard/ai-course-creator'),
      color: "bg-blue-50 border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Manage Courses",
      description: "View, edit, and manage your existing courses",
      icon: <Settings className="w-8 h-8 text-green-500" />,
      action: () => navigate('/dashboard/course-management'),
      color: "bg-green-50 border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "View Analytics",
      description: "Track performance, engagement, and revenue",
      icon: <BarChart3 className="w-8 h-8 text-purple-500" />,
      action: () => navigate('/dashboard/analytics'),
      color: "bg-purple-50 border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    },
    {
      title: "Student Management",
      description: "Connect with your students and track progress",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      action: () => navigate('/dashboard/students'),
      color: "bg-orange-50 border-orange-200",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    }
  ];

  const tools = [
    {
      title: "AI Course Creator",
      description: "Create comprehensive courses with AI assistance",
      icon: <BookOpen className="w-6 h-6" />,
      link: "/dashboard/ai-course-creator",
      badge: "Popular"
    },
    {
      title: "Video Production",
      description: "Professional recording and editing tools",
      icon: <Camera className="w-6 h-6" />,
      link: "/dashboard/video-production",
      badge: "New"
    },
    {
      title: "Assessment Builder",
      description: "Create quizzes and assignments",
      icon: <Target className="w-6 h-6" />,
      link: "/dashboard/assessment-builder",
      badge: "Free"
    },
    {
      title: "Content Library",
      description: "Access templates and resources",
      icon: <FileText className="w-6 h-6" />,
      link: "/dashboard/content-library",
      badge: "Premium"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1834] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">Loading instructor dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-[#0a1834] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to be an approved instructor to access this dashboard.</p>
            <Button onClick={() => navigate('/instructor-application')}>
              Apply to Become an Instructor
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {instructor.firstName}!</h1>
              <p className="text-gray-600 mt-2">{instructor.professionalTitle} • {instructor.subjectArea}</p>
              <p className="text-sm text-gray-500 mt-1">Instructor since {new Date(instructor.approvedAt).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <Badge variant="default" className="bg-green-600">Approved Instructor</Badge>
              {!instructor.onboardingCompleted && (
                <Badge variant="outline" className="ml-2 text-yellow-600 border-yellow-600">
                  Onboarding Required
                </Badge>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Courses Created</p>
                    <p className="text-2xl font-bold text-gray-900">{instructor.coursesCreated}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">{instructor.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">£{instructor.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Average Rating</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-gray-900 mr-2">4.8</p>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Onboarding Alert */}
          {!instructor.onboardingCompleted && (
            <Card className="mb-8 bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-6 h-6 text-yellow-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-yellow-900">Complete Your Onboarding</h3>
                      <p className="text-yellow-800 text-sm">Set up your profile and learn about our tools to get started</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => navigate('/dashboard/instructor-onboarding')}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    Start Onboarding
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className={`${action.color} hover:shadow-lg transition-shadow cursor-pointer`}>
                  <CardContent className="p-6">
                    <div className="text-center">
                      {action.icon}
                      <h3 className="font-semibold text-gray-900 mt-4 mb-2">{action.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                      <Button 
                        onClick={action.action}
                        className={`${action.buttonColor} w-full`}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Get Started
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Course Creation Tools */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Creation Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {tool.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {tool.badge}
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate(tool.link)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Access Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">Course "Introduction to Web Development" published</span>
                    <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">New student enrolled in "Data Science Fundamentals"</span>
                    <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600">Revenue milestone: £1,000 earned this month</span>
                    <span className="text-sm text-gray-500 ml-auto">3 days ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-600">Course "Business Strategy" updated with new content</span>
                    <span className="text-sm text-gray-500 ml-auto">1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard; 