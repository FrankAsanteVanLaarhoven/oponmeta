import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Pin, 
  ThumbsUp, 
  Reply, 
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Star,
  Eye
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Forums = () => {
  const discussions = [
    {
      id: 1,
      title: "How to optimize learning efficiency with machine learning?",
      author: "Sarah Chen",
      avatar: "/uploads/avatar1.jpg",
      category: "Study Tips",
      replies: 15,
      views: 142,
      lastReply: "30 min ago",
      isPinned: true,
      isAnswered: false,
      upvotes: 8
    },
    {
      id: 2,
      title: "Group project coordination for React development",
      author: "Mike Johnson",
      avatar: "/uploads/avatar2.jpg",
      category: "Projects",
      replies: 8,
      views: 89,
      lastReply: "1 hour ago",
      isPinned: false,
      isAnswered: true,
      upvotes: 12
    },
    {
      id: 3,
      title: "Database design best practices - discussion",
      author: "Dr. Emily Smith",
      avatar: "/uploads/avatar3.jpg",
      category: "Technical",
      replies: 23,
      views: 234,
      lastReply: "2 hours ago",
      isPinned: false,
      isAnswered: false,
      upvotes: 19
    },
    {
      id: 4,
      title: "JavaScript fundamentals - common mistakes to avoid",
      author: "Alex Rodriguez",
      avatar: "/uploads/avatar4.jpg",
      category: "Learning",
      replies: 31,
      views: 456,
      lastReply: "3 hours ago",
      isPinned: false,
      isAnswered: true,
      upvotes: 25
    }
  ];

  const categories = [
    { name: "General Discussion", count: 156, color: "bg-[#16203a] text-cyan-300" },
    { name: "Study Tips", count: 89, color: "bg-green-100 text-green-700" },
    { name: "Projects", count: 67, color: "bg-purple-100 text-purple-700" },
    { name: "Technical", count: 134, color: "bg-red-100 text-red-700" },
    { name: "Learning", count: 98, color: "bg-yellow-100 text-yellow-700" },
    { name: "Q&A Support", count: 203, color: "bg-orange-100 text-orange-700" }
  ];

  const trendingTopics = [
    { topic: "Machine Learning", discussions: 45 },
    { topic: "React Hooks", discussions: 32 },
    { topic: "Database Design", discussions: 28 },
    { topic: "JavaScript ES6", discussions: 24 },
    { topic: "CSS Grid", discussions: 19 }
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-300">Discussion Forums</h1>
          <p className="text-gray-600 mt-2">
            Engage with your learning community, share knowledge, and get support from peers and instructors.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            New Discussion
          </Button>
          <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Forum Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#16203a] rounded-lg">
                <MessageSquare className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">147</p>
                <p className="text-sm text-gray-600">Active Discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-sm text-gray-600">Community Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Reply className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2,891</p>
                <p className="text-sm text-gray-600">Total Replies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-gray-600">Resolution Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="border-cyan-600 text-cyan-600 hover:bg-cyan-50">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="my-posts">My Posts</TabsTrigger>
              <TabsTrigger value="create">Create</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            {discussion.isPinned && (
                              <Pin className="h-4 w-4 text-cyan-500" />
                            )}
                            <h3 className="font-semibold text-lg hover:text-cyan-600 cursor-pointer">
                              {discussion.title}
                            </h3>
                            {discussion.isAnswered && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={discussion.avatar} />
                                <AvatarFallback>
                                  {discussion.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">{discussion.author}</span>
                            </div>
                            
                            <Badge variant="outline" className="text-xs">
                              {discussion.category}
                            </Badge>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Reply className="h-3 w-3 mr-1" />
                                {discussion.replies} replies
                              </span>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {discussion.views} views
                              </span>
                              <span className="flex items-center">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {discussion.upvotes}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {discussion.lastReply}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                            <Reply className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Start a New Discussion</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="discussionTitle">Discussion Title</Label>
                    <Input 
                      id="discussionTitle" 
                      placeholder="What would you like to discuss?" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input 
                      id="category" 
                      placeholder="Select or type a category" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content" 
                      placeholder="Share your thoughts, questions, or insights..."
                      rows={6}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Pin this discussion</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Mark as question</span>
                    </label>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Post Discussion
                    </Button>
                    <Button variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">{category.name}</span>
                  <Badge variant="secondary" className={`text-xs ${category.color}`}>
                    {category.count}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <div key={topic.topic} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-cyan-600">#{index + 1}</span>
                    <span className="text-sm">{topic.topic}</span>
                  </div>
                  <span className="text-xs text-gray-500">{topic.discussions}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start border-cyan-600 text-cyan-600 hover:bg-cyan-50" variant="outline">
                <AlertCircle className="mr-2 h-4 w-4" />
                Report an Issue
              </Button>
              <Button className="w-full justify-start bg-cyan-600 hover:bg-cyan-700 text-white" variant="outline">
                <Star className="mr-2 h-4 w-4" />
                My Favorites
              </Button>
              <Button className="w-full justify-start bg-cyan-600 hover:bg-cyan-700 text-white" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Find Study Partners
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forums;