import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Video, 
  Plus, 
  Users, 
  Mic, 
  Camera, 
  Share, 
  Settings,
  Play,
  UserPlus,
  Copy
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Meetings = () => {
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    date: "",
    description: "",
    duration: "",
    participants: ""
  });
  
  const upcomingMeetings = [
    {
      id: 1,
      title: "Machine Learning Course Q&A",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      participants: 15,
      status: "starting-soon"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals Review",
      time: "4:30 PM - 5:30 PM",
      date: "Today",
      participants: 8,
      status: "scheduled"
    },
    {
      id: 3,
      title: "React Development Workshop",
      time: "10:00 AM - 12:00 PM",
      date: "Tomorrow",
      participants: 12,
      status: "scheduled"
    }
  ];

  const recentMeetings = [
    {
      id: 1,
      title: "Database Design Session",
      duration: "1h 15m",
      date: "Yesterday",
      participants: 6,
      recording: true
    },
    {
      id: 2,
      title: "Python Study Group",
      duration: "45m",
      date: "2 days ago",
      participants: 9,
      recording: true
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-cyan-300">Video Meetings</h1>
          <p className="text-gray-600 mt-2">
            Host live classes, Q&A sessions, and collaborate with students in real-time.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Start Meeting */}
      <Card className="bg-[#16203a] border-[#11204a]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-cyan-300 rounded-full">
                <Video className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cyan-300">Start Instant Meeting</h3>
                <p className="text-cyan-300">Begin a meeting right now with your students</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]">
                <Play className="mr-2 h-4 w-4" />
                Start Now
              </Button>
              <Button variant="outline" className="border-[#11204a] text-[#11204a] hover:bg-[#11204a]/10">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Others
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="schedule">Schedule New</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4">
            {upcomingMeetings.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Play className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <Mic className="h-4 w-4 mr-1" />
                            {meeting.time}
                          </span>
                          <span>{meeting.date}</span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {meeting.participants} participants
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.status === "starting-soon" && (
                        <Badge className="bg-orange-100 text-orange-700">Starting Soon</Badge>
                      )}
                      {meeting.status === "scheduled" && (
                        <Badge variant="outline">Scheduled</Badge>
                      )}
                      <Button 
                        size="sm" 
                        className={meeting.status === "starting-soon" ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {meeting.status === "starting-soon" ? "Join Now" : "Join"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentMeetings.map((meeting) => (
              <Card key={meeting.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Video className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{meeting.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{meeting.duration}</span>
                          <span>{meeting.date}</span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {meeting.participants} participants
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {meeting.recording && (
                        <Badge variant="secondary">Recorded</Badge>
                      )}
                      <Button size="sm" variant="outline">
                        View Recording
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meetingTitle">Meeting Title</Label>
                  <Input 
                    id="meetingTitle" 
                    placeholder="Enter meeting title" 
                    value={meetingForm.title}
                    onChange={(e) => setMeetingForm({...meetingForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="meetingDate">Date & Time</Label>
                  <Input id="meetingDate" type="datetime-local" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="meetingDescription">Description</Label>
                <Textarea 
                  id="meetingDescription" 
                  placeholder="Meeting agenda and details..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" placeholder="60" />
                </div>
                <div>
                  <Label htmlFor="participants">Invite Participants</Label>
                  <Input id="participants" placeholder="Enter email addresses" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Invite Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Play className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Database Design Session - Recording</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>1h 15m</span>
                        <span>Yesterday</span>
                        <span>HD Quality</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Play className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Python Study Group - Recording</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>45m</span>
                        <span>2 days ago</span>
                        <span>HD Quality</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Meeting Controls (when in a meeting) */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Meeting in Progress</span>
              </div>
              <span className="text-gray-600">15 participants</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Camera className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive">
                End Meeting
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meetings;