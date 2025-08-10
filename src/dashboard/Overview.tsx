import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Users, Plus, ArrowRight, Star, TrendingUp, Download,
  ChevronDown, Search, Bell, Folders, Route, Library, Settings, 
  Gamepad2, CalendarDays, Trash, MoreHorizontal
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import DashboardBackButton from "@/components/ui/DashboardBackButton";
import RecommendedForYou from "@/components/RecommendedForYou";

const Overview = () => {
  const [coursePending] = useState(0);
  const [courseCompleted] = useState(0);
  const [activeUsers] = useState(1);
  const [totalUsers] = useState(10);

  // Vendor/Instructor Stats
  const courseStats = {
    totalCourses: 12,
    totalStudents: 1847,
    totalRevenue: 24500,
    completionRate: 78
  };

  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      students: 324,
      revenue: 4800,
      status: "published",
      completion: 85,
      thumbnail: ""
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      students: 567,
      revenue: 8200,
      status: "published", 
      completion: 92,
      thumbnail: ""
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      students: 234,
      revenue: 3600,
      status: "draft",
      completion: 45,
      thumbnail: ""
    }
  ];

  const quickActions = [
    { icon: Bell, label: "Announcements", description: "Manage announcements" },
    { icon: Users, label: "Instructors", description: "Instructor management" },
    { icon: Folders, label: "Folders", description: "Organize content" },
    { icon: Route, label: "Learning Path", description: "Create learning paths" },
    { icon: Library, label: "Library", description: "Course library" },
    { icon: BookOpen, label: "Ready to Use Courses", description: "Pre-built courses" },
    { icon: Settings, label: "Automation", description: "Automated workflows" },
    { icon: Gamepad2, label: "Gamification", description: "Engagement features" },
    { icon: CalendarDays, label: "Training ", description: "Schedule training" },
    { icon: Trash, label: "Trash", description: "Deleted items" },
  ];


  const chartData = [
    { name: "Mon", enrollments: 20, revenue: 1200 },
    { name: "Tue", enrollments: 35, revenue: 1850 },
    { name: "Wed", enrollments: 25, revenue: 1400 },
    { name: "Thu", enrollments: 45, revenue: 2300 },
    { name: "Fri", enrollments: 38, revenue: 2100 },
    { name: "Sat", enrollments: 30, revenue: 1650 },
    { name: "Sun", enrollments: 22, revenue: 1200 },
  ];

  const recentActivity = [
    { text: 'New enrollment in "Advanced JavaScript"', time: "2 min ago", type: "enrollment" },
    { text: 'Course "Intro to Python" updated', time: "1 hour ago", type: "update" },
    { text: '5 new enrollments in "Web Design Fundamentals"', time: "3 hours ago", type: "enrollment" },
    { text: 'Payment received: $299.99', time: "4 hours ago", type: "payment" },
    { text: 'New review: 5 stars for "Data Science"', time: "6 hours ago", type: "review" },
  ];

  const topCourses = [
    { 
      title: "Advanced JavaScript", 
      enrollments: "250 enrollments",
      rating: 4.8,
      revenue: "$12,500",
      growth: "+25%"
    },
    { 
      title: "Data Science Bootcamp", 
      enrollments: "180 enrollments",
      rating: 4.9,
      revenue: "$9,800",
      growth: "+18%"
    },
    { 
      title: "Web Design Fundamentals", 
      enrollments: "165 enrollments",
      rating: 4.6,
      revenue: "$7,200",
      growth: "+12%"
    },
  ];

  return (
    <div className="space-y-6 bg-white text-[#0a1834] dark:bg-[#0a1834] dark:text-white min-h-screen">
      <DashboardBackButton />
      {/* Header with Search and More Menu */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center space-x-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0a1834] dark:text-cyan-300">Dashboard</h1>
            <p className="text-[#22305a] dark:text-cyan-200 mt-1">Monitor your training platform performance</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#22305a] dark:text-cyan-300 h-4 w-4" />
            <Input 
              placeholder="Search Groups" 
              className="pl-10 w-64 bg-[#f5f7fa] dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] text-[#0a1834] dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#22305a] dark:text-cyan-200">{activeUsers} of {totalUsers} Active Users</span>
            <div className="flex items-center space-x-1">
              <div className="w-16 h-2 bg-[#e5e7eb] dark:bg-[#22305a] rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white dark:bg-[#16203a] text-[#0a1834] dark:text-white border-[#e5e7eb] dark:border-[#22305a]">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                More
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white dark:bg-[#16203a] text-[#0a1834] dark:text-white border-[#e5e7eb] dark:border-[#22305a]">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <DropdownMenuItem key={index} className="flex items-center space-x-3 p-3 hover:bg-[#f0f4fa] dark:hover:bg-[#22305a]">
                    <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-[#22305a] dark:text-cyan-200">{action.description}</div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Vendor Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#22305a] dark:text-cyan-200">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0a1834] dark:text-white">{courseStats.totalCourses}</div>
            <p className="text-xs text-green-600 mt-1">+2 this month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#22305a] dark:text-cyan-200">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0a1834] dark:text-white">{courseStats.totalStudents.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+127 this week</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#22305a] dark:text-cyan-200">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0a1834] dark:text-white">${courseStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+12% vs last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#22305a] dark:text-cyan-200">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#0a1834] dark:text-white">{courseStats.completionRate}%</div>
            <p className="text-xs text-green-600 mt-1">+5% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended For You */}
      <Card className="bg-white dark:bg-[#16203a] border-[#e5e7eb] dark:border-[#22305a] hover:bg-[#f0f4fa] dark:hover:bg-[#22305a] transition-all duration-300">
        <CardContent className="p-6">
          <RecommendedForYou title="Recommended for You" maxItems={3} showActions={true} />
        </CardContent>
      </Card>

      {/* Course Status Overview */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending</h3>
              <div className="text-4xl font-bold text-gray-800">{coursePending}</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed</h3>
              <div className="text-4xl font-bold text-gray-800">{courseCompleted}</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Progress</h3>
              <div className="text-4xl font-bold text-gray-800 mb-3">0%</div>
              <Progress value={0} className="w-full" />
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <Button variant="outline" size="sm" disabled>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
            <span className="text-sm text-gray-600 mx-4">1</span>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Performance Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <p className="text-sm text-gray-600">Enrollments and revenue over the past week</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              enrollments: { label: "Enrollments", color: "#3b82f6" },
              revenue: { label: "Revenue", color: "#10b981" }
            }} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="enrollments" 
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="2"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity with Interactive Features */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Live Activity Feed</CardTitle>
              <Button variant="outline" size="sm">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600">Real-time updates from your courses</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between items-start p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'enrollment' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-blue-500' :
                    activity.type === 'review' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                  <p className="text-sm">{activity.text}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card className="bg-card/95 backdrop-blur-md border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div key={course.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{course.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">{course.students} students</span>
                    <span className="text-sm text-green-600">${course.revenue}</span>
                    <Badge 
                      variant={course.status === "published" ? "default" : "secondary"}
                      className={course.status === "published" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}
                    >
                      {course.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Progress:</span>
                      <Progress value={course.completion} className="flex-1 h-2" />
                      <span className="text-xs text-foreground">{course.completion}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-foreground hover:bg-muted">
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Top Performing Courses */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Top Performing Courses</CardTitle>
            <Button variant="outline" size="sm">
              View All Courses
            </Button>
          </div>
          <p className="text-sm text-gray-600">Courses with highest enrollment and engagement</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {topCourses.map((course, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:border-blue-300 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{course.enrollments}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">{course.revenue}</div>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  {course.growth}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommended For You */}
      <RecommendedForYou />
    </div>
  );
};

export default Overview;