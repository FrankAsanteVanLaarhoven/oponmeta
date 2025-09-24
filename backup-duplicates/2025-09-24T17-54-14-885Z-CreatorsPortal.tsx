import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Eye, 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Video,
  Settings,
  Target,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import { Course } from '@/data/coursesData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const CreatorsPortal = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    averageRating: 0,
    thisMonthRevenue: 0
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const creatorId = 'current-user-id'; // This should come from user context
      const userCourses = await courseService.getCoursesByCreator(creatorId);
      setCourses(userCourses);
      
      // Calculate stats
      const publishedCourses = userCourses.filter(c => c.isPublished);
      const totalStudents = userCourses.reduce((sum, c) => sum + (c.currentEnrollments || 0), 0);
      const totalRevenue = userCourses.reduce((sum, c) => sum + (c.revenue || 0), 0);
      const averageRating = userCourses.length > 0 
        ? userCourses.reduce((sum, c) => sum + (c.rating || 0), 0) / userCourses.length 
        : 0;
      
      setStats({
        totalCourses: userCourses.length,
        publishedCourses: publishedCourses.length,
        totalStudents,
        totalRevenue,
        averageRating: Math.round(averageRating * 10) / 10,
        thisMonthRevenue: Math.round(totalRevenue * 0.3) // Simulated monthly revenue
      });
    } catch (error) {
      console.error('Error loading courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (course: Course) => {
    if (course.status === 'archived') {
      return <Badge variant="secondary" className="bg-gray-600 text-white">Archived</Badge>;
    }
    if (course.isPublished) {
      return <Badge variant="default" className="bg-green-600 text-white">Published</Badge>;
    }
    return <Badge variant="outline" className="border-gray-400 text-gray-300">Draft</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1834] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center text-white">Loading your creator portal...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <DashboardBackButton />
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white">Creators Portal</h1>
              <p className="text-gray-300 mt-2">Manage your courses, track performance, and grow your teaching business</p>
            </div>
            <Button onClick={() => navigate('/dashboard/ai-course-creator')} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Course
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Total Courses</p>
                    <p className="text-2xl font-bold text-white">{stats.totalCourses}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Published</p>
                    <p className="text-2xl font-bold text-white">{stats.publishedCourses}</p>
                  </div>
                  <Award className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Total Students</p>
                    <p className="text-2xl font-bold text-white">{stats.totalStudents.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Total Revenue</p>
                    <p className="text-2xl font-bold text-white">£{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Average Rating</p>
                    <div className="flex items-center">
                      <p className="text-2xl font-bold text-white">{stats.averageRating}</p>
                      <Star className="w-5 h-5 text-yellow-400 ml-1" />
                    </div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">This Month</p>
                    <p className="text-2xl font-bold text-white">£{stats.thisMonthRevenue.toLocaleString()}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-700 border-gray-600">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-300">Success Rate</p>
                    <p className="text-2xl font-bold text-white">94%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={() => navigate('/dashboard/ai-course-creator')}
                className="h-20 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white border-2 border-blue-500"
              >
                <Plus className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Create Course</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/dashboard/course-management')}
                className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white border-2 border-green-500"
              >
                <Settings className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Manage Courses</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/instructor-portal')}
                className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white border-2 border-purple-500"
              >
                <BarChart3 className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Analytics</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/courses')}
                className="h-20 flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-500"
              >
                <Eye className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">View Catalog</span>
              </Button>
            </div>
          </div>

          {/* Recent Courses */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Your Courses</h2>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/course-management')}
                className="flex items-center border-gray-400 text-gray-300 hover:bg-gray-700"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 6).map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow bg-gray-700 border-gray-600">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-white line-clamp-2">
                            {course.title}
                          </CardTitle>
                          <p className="text-sm text-gray-300 mt-1">{course.category}</p>
                        </div>
                        {getStatusBadge(course)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                        {course.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Price:</span>
                          <span className="font-medium text-white">£{course.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Students:</span>
                          <span className="font-medium text-white">{course.currentEnrollments || 0}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Revenue:</span>
                          <span className="font-medium text-white">£{course.revenue || 0}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/courses/${course.slug}`, '_blank')}
                          className="flex-1 border-gray-400 text-gray-300 hover:bg-gray-600"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/dashboard/course-management`)}
                          className="flex-1 border-gray-400 text-gray-300 hover:bg-gray-600"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gray-700 rounded-lg p-8">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Courses Yet</h3>
                  <p className="text-gray-300 mb-4">Start your teaching journey by creating your first course.</p>
                  <Button onClick={() => navigate('/dashboard/ai-course-creator')} className="bg-purple-600 hover:bg-purple-700">
                    Create Your First Course
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Creator Resources */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Creator Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Video className="w-8 h-8 text-blue-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Course Creation Guide</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Learn best practices for creating engaging and successful courses.</p>
                  <Button variant="outline" size="sm" className="border-gray-400 text-gray-300 hover:bg-gray-600">Read Guide</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="w-8 h-8 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Marketing Tips</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Strategies to promote your courses and reach more students.</p>
                  <Button variant="outline" size="sm" className="border-gray-400 text-gray-300 hover:bg-gray-600">Learn More</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gray-700 border-gray-600">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Community</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Connect with other creators and share experiences.</p>
                  <Button variant="outline" size="sm" className="border-gray-400 text-gray-300 hover:bg-gray-600">Join Community</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorsPortal; 