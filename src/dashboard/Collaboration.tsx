import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Monitor, FileText, MessageSquare, Users, Calendar, Plus, Settings, Mic, Camera, Share, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Collaboration = () => {
  const navigate = useNavigate();
  
  const [channelForm, setChannelForm] = useState({
    name: "",
    description: ""
  });
  
  const [discussionForm, setDiscussionForm] = useState({
    title: "",
    category: ""
  });

  const handleStartMeeting = () => {
    // Navigate to internal meeting page instead of external service
    navigate('/dashboard/meetings');
  };

  const handleOpenWhiteboard = () => {
    // Navigate to internal whiteboard instead of opening new tab
    navigate('/dashboard/whiteboard');
  };

  const handleCreateDocument = () => {
    // Navigate to internal document editor instead of external service
    navigate('/dashboard/documents');
  };

  const handleAccessForums = () => {
    // Navigate to internal forums instead of external service
    navigate('/dashboard/forums');
  };

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-300">Collaboration Hub</h1>
          <p className="text-gray-600 mt-2">
            Facilitate seamless interactions with students and peers using our integrated collaboration tools.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Badge variant="secondary" className="text-green-600 bg-green-50">
            3 Active Sessions
          </Badge>
        </div>
      </div>

      {/* Main Collaboration Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#16203a] rounded-lg">
                  <Video className="h-6 w-6 text-cyan-300" />
                </div>
                <CardTitle className="text-lg">Video Conferencing</CardTitle>
              </div>
              <Badge variant="outline">Pro</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Host live classes, Q&A sessions, or one-on-one meetings.
            </p>
            <div className="relative w-full h-32 bg-[#16203a] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-8 w-8 text-cyan-300 mx-auto mb-2" />
                <span className="text-sm text-cyan-300 font-medium">Ready to start</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]"
                onClick={handleStartMeeting}
              >
                <Plus className="mr-2 h-4 w-4" />
                Start a New Meeting
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>Last meeting: 2 hours ago</span>
              <span className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Online
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Monitor className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Interactive Whiteboards</CardTitle>
              </div>
              <Badge variant="outline">New</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Brainstorm ideas, explain concepts visually, and collaborate in real-time.
            </p>
            <div className="relative w-full h-32 bg-[#16203a] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Edit3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <span className="text-sm text-purple-600 font-medium">5 templates available</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={handleOpenWhiteboard}
              >
                <Share className="mr-2 h-4 w-4" />
                Open a Whiteboard
              </Button>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>3 active boards</span>
              <span>2 collaborators online</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Real-time Document Editing</CardTitle>
              </div>
              <Badge variant="outline">Popular</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Co-author documents, share notes, and provide feedback instantly.
            </p>
            <div className="relative w-full h-32 bg-[#16203a] rounded-lg flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <span className="text-sm text-green-600 font-medium">12 documents shared</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleCreateDocument}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Shared Document
              </Button>
              <Button variant="outline" size="icon">
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-gray-500 flex items-center justify-between">
              <span>Last edit: 15 min ago</span>
              <span>Auto-saved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Group Chats & Forums */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Group Chats & Forums</CardTitle>
                <p className="text-gray-600 text-sm">Foster community and discussion around your courses.</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary">42 Active discussions</Badge>
              <Badge variant="outline" className="text-green-600">127 Online</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="channels">Channels</TabsTrigger>
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">General Discussion</h4>
                      <Badge variant="secondary">Live</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Main course discussions and announcements</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>234 members • 15 online</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Study Groups</h4>
                      <Badge variant="outline">5 groups</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Collaborative learning spaces</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>89 members • 8 online</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Q&A Support</h4>
                      <Badge variant="secondary">Help</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Get help from instructors and peers</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      <span>156 members • 12 online</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="channels" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
                    <div>
                      <h4 className="font-medium"># general</h4>
                      <p className="text-sm text-gray-500">Course announcements and general chat</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">42 new</Badge>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
                    <div>
                      <h4 className="font-medium"># assignments</h4>
                      <p className="text-sm text-gray-500">Assignment discussions and submissions</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">12 new</Badge>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-300 rounded-full"></div>
                    <div>
                      <h4 className="font-medium"># project-collaboration</h4>
                      <p className="text-sm text-gray-500">Team projects and group work</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">8 new</Badge>
                    <Button size="sm" variant="outline">Join</Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forums" className="space-y-4">
              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">How to optimize learning efficiency?</h4>
                        <p className="text-sm text-gray-500">Posted by Sarah Chen • 2 hours ago</p>
                      </div>
                      <Badge variant="outline">Discussion</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Looking for tips on how to better manage study time and retain information more effectively...</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>15 replies</span>
                      <span>42 views</span>
                      <span>Last reply: 30 min ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">Group project coordination</h4>
                        <p className="text-sm text-gray-500">Posted by Mike Johnson • 5 hours ago</p>
                      </div>
                      <Badge variant="secondary">Project</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Anyone interested in forming a study group for the upcoming machine learning project?</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>8 replies</span>
                      <span>23 views</span>
                      <span>Last reply: 1 hour ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-3">Create New Channel</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="channelName">Channel Name</Label>
                        <Input 
                          id="channelName" 
                          placeholder="e.g., study-group-1" 
                          value={channelForm.name}
                          onChange={(e) => setChannelForm({...channelForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="channelDesc">Description</Label>
                        <Input 
                          id="channelDesc" 
                          placeholder="What's this channel about?" 
                          value={channelForm.description}
                          onChange={(e) => setChannelForm({...channelForm, description: e.target.value})}
                        />
                      </div>
                      <Button className="w-full">Create Channel</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-3">Start New Discussion</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="topicTitle">Topic Title</Label>
                        <Input 
                          id="topicTitle" 
                          placeholder="What do you want to discuss?" 
                          value={discussionForm.title}
                          onChange={(e) => setDiscussionForm({...discussionForm, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="topicCategory">Category</Label>
                        <Input 
                          id="topicCategory" 
                          placeholder="General, Assignment, Project..." 
                          value={discussionForm.category}
                          onChange={(e) => setDiscussionForm({...discussionForm, category: e.target.value})}
                        />
                      </div>
                      <Button className="w-full">Start Discussion</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-center">
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleAccessForums}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Access Discussion Forums
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Collaboration;