import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Users, 
  Star, 
  DollarSign, 
  Calendar,
  BookOpen,
  Target,
  Award,
  Share2,
  Edit,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
  AlertTriangle,
  Activity,
  Shield,
  EyeOff,
  Clock,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LearningAnalyticsTracker, type LearningAnalytics } from "@/utils/certificateGenerator";

interface CoursePerformance {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  enrollments: number;
  revenue: number;
  views: number;
  searchRank: number;
  category: string;
  status: 'published' | 'draft' | 'review';
  lastUpdated: string;
  isBestseller: boolean;
  isTop10: boolean;
  featured: boolean;
}

const CourseCreatorDashboard = () => {
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock data for course creator's courses
  const myCourses: CoursePerformance[] = [
    {
      id: 1,
      title: "Digital Marketing Fundamentals",
      instructor: "Sarah Johnson",
      price: 299,
      rating: 4.8,
      students: 1234,
      enrollments: 156,
      revenue: 46844,
      views: 8920,
      searchRank: 3,
      category: "Marketing",
      status: 'published',
      lastUpdated: "2024-02-20",
      isBestseller: true,
      isTop10: true,
      featured: true
    },
    {
      id: 2,
      title: "Advanced Web Development",
      instructor: "Sarah Johnson",
      price: 499,
      rating: 4.9,
      students: 2156,
      enrollments: 89,
      revenue: 44411,
      views: 6540,
      searchRank: 7,
      category: "Technology",
      status: 'published',
      lastUpdated: "2024-03-05",
      isBestseller: true,
      isTop10: true,
      featured: false
    },
    {
      id: 3,
      title: "Social Media Strategy",
      instructor: "Sarah Johnson",
      price: 199,
      rating: 4.6,
      students: 567,
      enrollments: 34,
      revenue: 6766,
      views: 2340,
      searchRank: 15,
      category: "Marketing",
      status: 'published',
      lastUpdated: "2024-01-15",
      isBestseller: false,
      isTop10: false,
      featured: false
    }
  ];

  const analytics = {
    totalRevenue: 98021,
    totalStudents: 3957,
    totalViews: 17800,
    averageRating: 4.8,
    coursesPublished: 3,
    coursesInTop10: 2,
    featuredCourses: 1
  };

  const recentActivity = [
    {
      type: 'enrollment',
      course: 'Digital Marketing Fundamentals',
      student: 'John Doe',
      time: '2 hours ago',
      amount: 299
    },
    {
      type: 'review',
      course: 'Advanced Web Development',
      student: 'Jane Smith',
      time: '4 hours ago',
      rating: 5
    },
    {
      type: 'featured',
      course: 'Digital Marketing Fundamentals',
      description: 'Course featured on homepage',
      time: '1 day ago'
    },
    {
      type: 'top10',
      course: 'Digital Marketing Fundamentals',
      description: 'Course reached Top 10 in Marketing category',
      time: '2 days ago'
    },
    {
      type: 'milestone',
      course: 'Advanced Web Development',
      description: 'Reached 1000+ students milestone',
      time: '3 days ago'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'featured',
      title: 'Course Featured! 🎉',
      message: 'Your course "Digital Marketing Fundamentals" is now featured on the homepage',
      time: '1 hour ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'top10',
      title: 'Top 10 Achievement! 🏆',
      message: 'Your course "Digital Marketing Fundamentals" reached #3 in Marketing category',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'milestone',
      title: 'Student Milestone Reached! 📈',
      message: 'Your course "Advanced Web Development" now has 1000+ enrolled students',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'review',
      title: 'New 5-Star Review! ⭐',
      message: 'Jane Smith gave your course "Advanced Web Development" a perfect rating',
      time: '2 days ago',
      read: true,
      priority: 'medium'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank <= 3) return <Badge className="bg-gold-500 text-white">Top 3</Badge>;
    if (rank <= 10) return <Badge className="bg-silver-500 text-white">Top 10</Badge>;
    if (rank <= 50) return <Badge className="bg-bronze-500 text-white">Top 50</Badge>;
    return <Badge variant="outline">Rank #{rank}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* <Navigation /> removed to prevent double navbar */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Course Creator Dashboard</h1>
            <p className="text-muted-foreground">Track your course performance and student engagement</p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline" onClick={() => toast({ title: "Analytics exported", description: "Your data has been exported successfully" })}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
            <Button onClick={() => window.open('/create-course', '_self')}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+12.5%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{analytics.totalStudents.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+8.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course Views</p>
                  <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+15.2%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">{analytics.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+0.2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Performance */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="booking">1:1 Booking</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Course Performance Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Course Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              {course.isBestseller && <Badge className="bg-yellow-100 text-yellow-800">Bestseller</Badge>}
                              {course.isTop10 && <Badge className="bg-green-100 text-green-800">Top 10</Badge>}
                              {course.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${course.revenue.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{course.students} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Courses Published</span>
                    <Badge variant="outline">{analytics.coursesPublished}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Top 10 Courses</span>
                    <Badge variant="outline">{analytics.coursesInTop10}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Featured Courses</span>
                    <Badge variant="outline">{analytics.featuredCourses}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Search Rank</span>
                    <Badge variant="outline">#8.3</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>My Courses</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <div className="flex items-center space-x-2">
                              {getRankBadge(course.searchRank)}
                              <Badge className={getStatusColor(course.status)}>
                                {course.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Revenue</p>
                              <p className="font-semibold">${course.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Students</p>
                              <p className="font-semibold">{course.students}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Views</p>
                              <p className="font-semibold">{course.views.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="font-semibold">{course.rating}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Category: {course.category}</span>
                            <span>Price: ${course.price}</span>
                            <span>Updated: {course.lastUpdated}</span>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Course
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              {/* Learning Analytics Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Learning Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2,847</div>
                      <div className="text-sm text-gray-600">Total Learning Hours</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">3.2</div>
                      <div className="text-sm text-gray-600">Avg. Time/Chapter (min)</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">23</div>
                      <div className="text-sm text-gray-600">Suspicious Activities</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">94%</div>
                      <div className="text-sm text-gray-600">Completion Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course-Specific Learning Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Course-Specific Learning Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {myCourses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{course.title}</h3>
                          <Badge className="bg-blue-100 text-blue-800">
                            {course.students} Students
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Avg. Completion Time</p>
                            <p className="font-semibold">4.2 hours</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Avg. Time/Chapter</p>
                            <p className="font-semibold">3.1 min</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Completion Rate</p>
                            <p className="font-semibold">92%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Suspicious Activities</p>
                            <p className="font-semibold text-red-600">7 flagged</p>
                          </div>
                        </div>

                        {/* Learning Pattern Distribution */}
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Learning Pattern Distribution:</p>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded">
                              <div className="text-lg font-bold text-green-600">78%</div>
                              <div className="text-xs text-gray-600">Normal</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 rounded">
                              <div className="text-lg font-bold text-yellow-600">18%</div>
                              <div className="text-xs text-gray-600">Suspicious</div>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded">
                              <div className="text-lg font-bold text-red-600">4%</div>
                              <div className="text-xs text-gray-600">Cheating</div>
                            </div>
                          </div>
                        </div>

                        {/* Recent Suspicious Activities */}
                        <div>
                          <p className="text-sm font-medium mb-2">Recent Suspicious Activities:</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Student ID: 12345 - Excessive fast-forwarding</span>
                              </div>
                              <Badge variant="destructive" className="text-xs">Flagged</Badge>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">Student ID: 67890 - Unusually fast assessment completion</span>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">Review</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Anti-Cheating Monitoring */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-500" />
                    Anti-Cheating Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">23</div>
                        <div className="text-sm text-gray-600">Suspicious Activities</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">156</div>
                        <div className="text-sm text-gray-600">Fast-Forward Events</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">89</div>
                        <div className="text-sm text-gray-600">Multiple Assessment Attempts</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800">High Priority Alert</h4>
                            <p className="text-sm text-red-700 mt-1">
                              Student ID 12345 in "Digital Marketing Fundamentals" has been flagged for 
                              suspicious behavior: 15 fast-forward events in 2 hours.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">Review Details</Button>
                              <Button size="sm" variant="destructive">Flag Student</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-yellow-800">Assessment Anomaly</h4>
                            <p className="text-sm text-yellow-700 mt-1">
                              Student ID 67890 completed assessment in 2 minutes with 95% score. 
                              Average completion time is 15 minutes.
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline">Investigate</Button>
                              <Button size="sm" variant="outline">Require Retake</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Learning Insights & Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Positive Trends</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• 94% of students complete courses successfully</li>
                          <li>• Average engagement time is 3.2 minutes per chapter</li>
                          <li>• 78% of students show normal learning patterns</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">Improvement Areas</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Consider adding more interactive elements</li>
                          <li>• Review chapters with high fast-forward rates</li>
                          <li>• Implement stricter assessment time limits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Notifications</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Mark All Read
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-4 p-4 border rounded-lg transition-colors ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.priority === 'high' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {notification.type === 'featured' && <Award className="h-5 w-5 text-purple-600" />}
                        {notification.type === 'top10' && <Trophy className="h-5 w-5 text-yellow-600" />}
                        {notification.type === 'milestone' && <TrendingUp className="h-5 w-5 text-green-600" />}
                        {notification.type === 'review' && <Star className="h-5 w-5 text-yellow-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-red-500 rounded-full ml-2"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {!notification.read && (
                          <Button size="sm" variant="outline">
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === 'enrollment' && <Users className="h-5 w-5 text-blue-600" />}
                        {activity.type === 'review' && <Star className="h-5 w-5 text-yellow-600" />}
                        {activity.type === 'featured' && <Award className="h-5 w-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {activity.type === 'enrollment' && `${activity.student} enrolled in ${activity.course}`}
                          {activity.type === 'review' && `${activity.student} gave ${activity.course} ${activity.rating} stars`}
                          {activity.type === 'featured' && `${activity.course} was ${activity.description}`}
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <p className="font-semibold">+${activity.amount}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  1:1 Booking Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Booking Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">12</div>
                      <div className="text-sm text-gray-600">Upcoming Sessions</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">$2,450</div>
                      <div className="text-sm text-gray-600">This Month's Revenue</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">4.9</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="flex-1">
                      <a href="/one-to-one-booking">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule New Session
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      View All Bookings
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Booking Analytics
                    </Button>
                  </div>

                  {/* Recent Bookings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recent Bookings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">John Doe</h4>
                            <p className="text-sm text-muted-foreground">Digital Marketing Consultation</p>
                            <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">$150</p>
                          <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Jane Smith</h4>
                            <p className="text-sm text-muted-foreground">Web Development Review</p>
                            <p className="text-xs text-muted-foreground">Friday, 10:00 AM</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">$200</p>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseCreatorDashboard; 