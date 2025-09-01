import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, Users, BarChart, Download, Calendar, Filter } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [realTimeData, setRealTimeData] = useState({
    views: 125670,
    completionRate: 68,
    learners: 3450,
    engagement: 7.5
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        views: prev.views + Math.floor(Math.random() * 50),
        completionRate: Math.max(65, Math.min(75, prev.completionRate + (Math.random() - 0.5) * 2)),
        learners: prev.learners + Math.floor(Math.random() * 5),
        engagement: Math.max(7, Math.min(8, prev.engagement + (Math.random() - 0.5) * 0.2))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      title: "Total Views",
      value: realTimeData.views.toLocaleString(),
      subtitle: "+8% from last week",
      icon: Eye,
      trend: "+12%",
      isPositive: true
    },
    {
      title: "Completion Rate",
      value: `${realTimeData.completionRate.toFixed(1)}%`,
      subtitle: "Average across all courses",
      icon: TrendingUp,
      trend: "+3.2%",
      isPositive: true
    },
    {
      title: "Unique Learners",
      value: realTimeData.learners.toLocaleString(),
      subtitle: "Active this month",
      icon: Users,
      trend: "+15%",
      isPositive: true
    },
    {
      title: "Engagement Score",
      value: `${realTimeData.engagement.toFixed(1)}/10`,
      subtitle: "Based on interactions",
      icon: BarChart,
      trend: "+0.5",
      isPositive: true
    },
  ];

  const enrollmentData = [
    { month: "Jan", enrollments: 250, revenue: 12500, completion: 65 },
    { month: "Feb", enrollments: 150, revenue: 8750, completion: 72 },
    { month: "Mar", enrollments: 1000, revenue: 45000, completion: 68 },
    { month: "Apr", enrollments: 380, revenue: 19500, completion: 75 },
    { month: "May", enrollments: 480, revenue: 24000, completion: 71 },
    { month: "Jun", enrollments: 350, revenue: 18200, completion: 69 },
  ];

  const coursePerformanceData = [
    { name: "Web Development", students: 1250, completion: 78, rating: 4.8 },
    { name: "Data Science", students: 890, completion: 82, rating: 4.9 },
    { name: "Mobile Apps", students: 750, completion: 71, rating: 4.6 },
    { name: "AI/ML", students: 630, completion: 85, rating: 4.9 },
    { name: "Cloud Computing", students: 420, completion: 69, rating: 4.5 },
  ];

  const trafficSourceData = [
    { name: "Direct", value: 35, color: "#3b82f6" },
    { name: "Social Media", value: 28, color: "#10b981" },
    { name: "Search Engine", value: 22, color: "#f59e0b" },
    { name: "Referrals", value: 15, color: "#ef4444" },
  ];

  const chartConfig = {
    enrollments: {
      label: "Enrollments",
      color: "#3b82f6",
    },
    revenue: {
      label: "Revenue",
      color: "#10b981",
    },
    completion: {
      label: "Completion %",
      color: "#f59e0b",
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardBackButton />
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-blue-600">Real-Time Analytics</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            {timeRange === "7d" ? "Last 7 days" : timeRange === "30d" ? "Last 30 days" : "Last 90 days"}
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={metric.isPositive ? "default" : "destructive"} className="text-xs">
                    {metric.trend}
                  </Badge>
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 animate-pulse">{metric.value}</div>
                <p className="text-xs text-gray-500">{metric.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Enrollment & Revenue Trends</CardTitle>
            <p className="text-gray-600">Monthly performance over the past 6 months</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
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

        {/* Course Performance Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <p className="text-gray-600">Student enrollment and completion rates</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="#3b82f6" />
                  <Bar dataKey="completion" fill="#10b981" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <p className="text-gray-600">Where your students are coming from</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Completion Rate Trends */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Completion Rate Trends</CardTitle>
            <p className="text-gray-600">Course completion rates over time</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Market Intelligence with Interactive Features */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>AI-Powered Market Intelligence</CardTitle>
          <p className="text-gray-600">Real-time insights into demand trends and competitive positioning</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Trending Skills</h4>
              <div className="space-y-2">
                <Badge variant="outline">AI/Machine Learning +25%</Badge>
                <Badge variant="outline">Cloud Computing +18%</Badge>
                <Badge variant="outline">Data Analytics +15%</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">Market Opportunities</h4>
              <div className="space-y-2">
                <Badge variant="outline">Blockchain Development</Badge>
                <Badge variant="outline">Cybersecurity</Badge>
                <Badge variant="outline">Mobile Development</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600">Competitive Analysis</h4>
              <div className="space-y-2">
                <div className="text-sm">Market Position: <span className="font-semibold">Top 15%</span></div>
                <div className="text-sm">Price Competitiveness: <span className="font-semibold">Optimal</span></div>
                <div className="text-sm">Content Quality: <span className="font-semibold">Above Average</span></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;