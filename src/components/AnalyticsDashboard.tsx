import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Users, 
  Eye, 
  Heart, 
  Clock, 
  TrendingUp, 
  Download, 
  RefreshCw,
  Activity,
  Target,
  Award,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock analytics data and services
interface AnalyticsSummary {
  totalEvents: number;
  uniqueUsers: number;
  userEngagement: {
    averageSessionTime: number;
    averageScrollDepth: number;
    completionRate: number;
    returnRate: number;
  };
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
  popularCategories: Array<{
    category: string;
    count: number;
  }>;
  trends: {
    dailyActiveUsers: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
  };
}

const getAnalyticsSummary = (): AnalyticsSummary => {
  return {
    totalEvents: 15420,
    uniqueUsers: 3247,
    userEngagement: {
      averageSessionTime: 1800000, // 30 minutes in milliseconds
      averageScrollDepth: 68.5,
      completionRate: 74.2,
      returnRate: 82.1
    },
    topContent: [
      { id: '1', title: 'Introduction to Healthcare', views: 1247, engagement: 892 },
      { id: '2', title: 'Data Analytics Fundamentals', views: 1156, engagement: 756 },
      { id: '3', title: 'Digital Marketing Strategy', views: 987, engagement: 634 },
      { id: '4', title: 'Web Development Basics', views: 876, engagement: 543 },
      { id: '5', title: 'Business Management', views: 765, engagement: 432 }
    ],
    popularCategories: [
      { category: 'Technology', count: 45 },
      { category: 'Healthcare', count: 32 },
      { category: 'Business', count: 28 },
      { category: 'Marketing', count: 24 },
      { category: 'Design', count: 18 }
    ],
    trends: {
      dailyActiveUsers: 1247,
      weeklyGrowth: 15.3,
      monthlyGrowth: 28.7
    }
  };
};

const analyticsService = {
  exportAnalytics: () => {
    const data = getAnalyticsSummary();
    return JSON.stringify(data, null, 2);
  }
};

const AnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadAnalytics();
  }, [refreshKey]);

  const loadAnalytics = () => {
    setLoading(true);
    try {
      const data = getAnalyticsSummary();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleExport = () => {
    const data = analyticsService.exportAnalytics();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data available</h3>
        <p className="text-gray-600">Start tracking user behavior to see analytics insights.</p>
      </div>
    );
  }

  // Prepare chart data
  const topContentData = analyticsData.topContent.slice(0, 5).map(item => ({
    name: item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title,
    views: item.views,
    engagement: item.engagement
  }));

  const categoryData = analyticsData.popularCategories.slice(0, 5).map(item => ({
    name: item.category,
    value: item.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track user behavior and platform performance</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              All tracked user interactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.uniqueUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Active sessions today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(analyticsData.userEngagement.averageSessionTime / 1000 / 60)}m
            </div>
            <p className="text-xs text-muted-foreground">
              Time spent per session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.userEngagement.completionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Content completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Content */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Most viewed content by users</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={topContentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="views" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Categories</CardTitle>
                <CardDescription>Content categories by popularity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Details</CardTitle>
              <CardDescription>Detailed view of content engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topContent.map((content, index) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{content.title}</h4>
                        <p className="text-sm text-gray-600">ID: {content.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{content.views}</div>
                        <div className="text-xs text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{content.engagement}</div>
                        <div className="text-xs text-gray-600">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">
                          {content.views > 0 ? ((content.engagement / content.views) * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-xs text-gray-600">Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>User interaction patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Session Time</span>
                  <span className="text-sm text-gray-600">
                    {Math.round(analyticsData.userEngagement.averageSessionTime / 1000 / 60)} minutes
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Scroll Depth</span>
                  <span className="text-sm text-gray-600">
                    {analyticsData.userEngagement.averageScrollDepth.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Completion Rate</span>
                  <span className="text-sm text-gray-600">
                    {analyticsData.userEngagement.completionRate.toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Return Rate</span>
                  <span className="text-sm text-gray-600">
                    {analyticsData.userEngagement.returnRate.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Device Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>User access patterns by device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <Badge variant="secondary">65%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <Badge variant="secondary">30%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tablet className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <Badge variant="secondary">5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Platform growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.trends.dailyActiveUsers}
                  </div>
                  <div className="text-sm text-gray-600">Daily Active Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.trends.weeklyGrowth}
                  </div>
                  <div className="text-sm text-gray-600">Weekly Events</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">
                    {analyticsData.trends.monthlyGrowth}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Events</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
