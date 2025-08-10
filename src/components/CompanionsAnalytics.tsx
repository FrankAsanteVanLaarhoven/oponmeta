import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Star, 
  MessageSquare, 
  Activity,
  Calendar,
  Target,
  Award,
  Zap
} from 'lucide-react';

const CompanionsAnalytics: React.FC = () => {
  const navigate = useNavigate();
  const { companions } = useAppContext();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock analytics data - in a real app this would come from an API
  const analyticsData = {
    totalCompanions: 12,
    totalSessions: 2847,
    totalDuration: 128430, // minutes
    averageRating: 4.7,
    activeUsers: 892,
    topPerformingCompanion: "Neura the Brainy Explorer",
    mostPopularSubject: "Science",
    sessionGrowth: 23.5,
    userGrowth: 18.2,
    completionRate: 87.3,
    engagementScore: 92.1
  };

  const subjectStats = [
    { subject: "Science", sessions: 456, growth: 15.2, color: "#E5D0FF" },
    { subject: "Business", sessions: 389, growth: 8.7, color: "#FFB3BA" },
    { subject: "Language", sessions: 324, growth: 22.1, color: "#BDE7FF" },
    { subject: "Coding", sessions: 298, growth: 31.5, color: "#FFC8E4" },
    { subject: "Health", sessions: 267, growth: 12.8, color: "#98FB98" },
    { subject: "Sports", sessions: 234, growth: 5.3, color: "#FFD700" }
  ];

  const recentActivity = [
    { companion: "Alex the Project Manager", action: "Session completed", time: "2 min ago", rating: 5 },
    { companion: "Lina the Golf Coach", action: "New session started", time: "5 min ago", rating: null },
    { companion: "Ming the Mandarin Tutor", action: "Session completed", time: "12 min ago", rating: 4 },
    { companion: "Neura the Brainy Explorer", action: "Session completed", time: "18 min ago", rating: 5 },
    { companion: "Codey the Logic Hacker", action: "New session started", time: "25 min ago", rating: null }
  ];

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/companions-library')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Companions Analytics</h1>
          <p className="text-white/80 text-lg">Track performance and insights across all your AI companions</p>
        </div>

        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                onClick={() => setTimeRange(range)}
                className="text-white"
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Sessions</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{formatNumber(analyticsData.totalSessions)}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analyticsData.sessionGrowth}% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{formatNumber(analyticsData.activeUsers)}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{analyticsData.userGrowth}% from last period
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Total Duration</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{formatDuration(analyticsData.totalDuration)}</div>
              <p className="text-xs text-black mt-1">Average 45 min per session</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{analyticsData.averageRating}</div>
              <p className="text-xs text-black mt-1">Out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/95 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Subject Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectStats.map((stat, index) => (
                  <div key={stat.subject} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: stat.color }}
                      />
                      <span className="font-medium text-black">{stat.subject}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-black">{formatNumber(stat.sessions)} sessions</span>
                      <Badge variant="secondary" className="text-xs">
                        +{stat.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Completion Rate</span>
                  <span className="font-bold text-black">{analyticsData.completionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Engagement Score</span>
                  <span className="font-bold text-black">{analyticsData.engagementScore}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Top Companion</span>
                  <span className="font-bold text-black text-xs">{analyticsData.topPerformingCompanion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black">Popular Subject</span>
                  <span className="font-bold text-black">{analyticsData.mostPopularSubject}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div>
                      <p className="font-medium text-black">{activity.companion}</p>
                      <p className="text-sm text-black">{activity.action}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {activity.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-black">{activity.rating}</span>
                      </div>
                    )}
                    <span className="text-sm text-black">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanionsAnalytics;
