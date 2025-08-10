import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play, 
  Calendar,
  Target,
  CheckCircle,
  ArrowRight,
  Bell,
  Settings,
  Users,
  Star,
  Download,
  Share2,
  MessageCircle,
  Heart,
  Globe
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import WelcomeBackWidget from './WelcomeBackWidget';

const StudentDashboard = () => {
  const [userName, setUserName] = useState('Alex');
  const [coursesEnrolled, setCoursesEnrolled] = useState(12);
  const [hoursLearned, setHoursLearned] = useState(156);
  const [certificates, setCertificates] = useState(8);
  const [streakDays, setStreakDays] = useState(23);

  // Mock data for courses in progress
  const coursesInProgress = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      progress: 75,
      nextStep: 'State Management with Redux',
      lastAccessed: '2 hours ago',
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Dr. Michael Chen',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      progress: 45,
      nextStep: 'Pandas DataFrames',
      lastAccessed: '1 day ago',
      category: 'Data Science'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      progress: 90,
      nextStep: 'Final Project Submission',
      lastAccessed: '3 hours ago',
      category: 'Design'
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Live Q&A: React Best Practices',
      type: 'Live Session',
      instructor: 'Sarah Johnson',
      date: 'Today, 3:00 PM',
      attendees: 156
    },
    {
      id: 2,
      title: 'Assignment Due: Python Project',
      type: 'Assignment',
      instructor: 'Dr. Michael Chen',
      date: 'Tomorrow, 11:59 PM',
      attendees: 89
    },
    {
      id: 3,
      title: 'Webinar: Future of Web Development',
      type: 'Webinar',
      instructor: 'Tech Industry Panel',
      date: 'Friday, 2:00 PM',
      attendees: 234
    }
  ];

  // Mock data for learning goals
  const learningGoals = [
    {
      id: 1,
      title: 'Complete 3 courses this month',
      current: 2,
      target: 3,
      icon: Target,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Study 20 hours this week',
      current: 15,
      target: 20,
      icon: Clock,
      color: 'text-green-600'
    }
  ];

  // Action handlers
  const handleContinueLearning = () => {
    toast.success('Redirecting to your next lesson...');
  };

  const handleBrowseCourses = () => {
    toast.success('Opening course catalog...');
  };

  const handleCourseContinue = (courseId: number, courseTitle: string) => {
    toast.success(`Continuing with ${courseTitle}`);
  };

  const handleEventJoin = (eventId: number, eventTitle: string) => {
    toast.success(`Joining ${eventTitle}`);
  };

  const handleGoalUpdate = (goalId: number, goalTitle: string) => {
    toast.success(`Updating progress for ${goalTitle}`);
  };

  const handleProfileSettings = () => {
    toast.success('Opening profile settings...');
  };

  const handleNotifications = () => {
    toast.success('Opening notifications...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Welcome Back Widget */}
        <div className="mb-8">
          <WelcomeBackWidget userName={userName} />
        </div>

        {/* Summary Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Courses Enrolled */}
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{coursesEnrolled}</div>
                  <div className="text-gray-600 font-medium">Courses Enrolled</div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hours Learned */}
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{hoursLearned}</div>
                  <div className="text-gray-600 font-medium">Hours Learned</div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates */}
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{certificates}</div>
                  <div className="text-gray-600 font-medium">Certificates</div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streak Days */}
          <Card className="bg-white border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{streakDays}</div>
                  <div className="text-gray-600 font-medium">Streak Days</div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
            </div>
            
            <div className="space-y-4">
              {coursesInProgress.map((course) => (
                <Card key={course.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Course Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Course Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                        
                        {/* Progress Section */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        {/* Next Step */}
                        <p className="text-sm text-gray-600 mb-3">Next: {course.nextStep}</p>
                        
                        {/* Last Accessed */}
                        <p className="text-xs text-gray-500">Last accessed {course.lastAccessed}</p>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex-shrink-0">
                        <Button
                          onClick={() => handleCourseContinue(course.id, course.title)}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Upcoming Events */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={event.id} className="flex items-start gap-3">
                    {/* Event Type Indicator */}
                    <div className="w-1 h-12 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                    
                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-900">{event.title}</h4>
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{event.instructor}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  View All Events
                </Button>
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Learning Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningGoals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <goal.icon className={`w-4 h-4 ${goal.color}`} />
                      <span className="text-sm font-medium text-gray-900">{goal.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">
                        {goal.current}/{goal.target}
                      </span>
                      <span className="text-xs font-semibold text-gray-900">
                        {Math.round((goal.current / goal.target) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(goal.current / goal.target) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 text-green-600 border-green-200 hover:bg-green-50"
                >
                  Update Goals
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                  onClick={handleProfileSettings}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                  onClick={handleNotifications}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Certificates
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 