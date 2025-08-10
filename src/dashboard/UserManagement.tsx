import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2,
  MoreVertical,
  TrendingUp,
  Target
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: "1",
      firstName: "Frank",
      lastName: "Guest",
      email: "frank@lacoupefutur.com",
      phoneNumber: "-",
      coursesEnrolled: "-",
      groups: "Sample Group",
      dateAdded: "Jun 03",
      lastLogin: "-",
      avatar: "G"
    }
  ];

  const tabs = [
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Student Analytics", icon: TrendingUp },
    { id: "groups", label: "Groups", icon: Users },
    { id: "filter", label: "Filter By Course", icon: Filter }
  ];

  const studentActivity = [
    { name: "Sarah Johnson", course: "Advanced React Development", progress: 85, lastActive: "2 hours ago" },
    { name: "Mike Chen", course: "JavaScript Fundamentals", progress: 92, lastActive: "5 hours ago" },
    { name: "Emma Davis", course: "UI/UX Design Principles", progress: 67, lastActive: "1 day ago" },
    { name: "Alex Rodriguez", course: "Advanced React Development", progress: 73, lastActive: "2 days ago" }
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage your classroom users and groups</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-1 mb-4">
            <span className="text-blue-600 text-sm">📚 View help for this section</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">My Classroom › Users</span>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {activeTab === "users" && (
            <>
              {/* Search and Actions */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    ↓
                  </Button>
                </div>
              </div>

              {/* Users Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="w-12">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </TableHead>
                      <TableHead>First Name ↑</TableHead>
                      <TableHead>Last Name ↑</TableHead>
                      <TableHead>Email ↑</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Phone Number</TableHead>
                      <TableHead>Courses Enrolled</TableHead>
                      <TableHead>Groups</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <input type="checkbox" className="rounded border-gray-300" />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {user.avatar}
                            </div>
                            <span>{user.firstName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.lastName}</TableCell>
                        <TableCell className="text-blue-600">{user.email}</TableCell>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.phoneNumber}</TableCell>
                        <TableCell>{user.coursesEnrolled}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            {user.groups}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.dateAdded}</TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Student Analytics Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-card/95 backdrop-blur-md border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Active Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">1,847</div>
                    <p className="text-sm text-green-600">+127 this week</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/95 backdrop-blur-md border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">78%</div>
                    <Progress value={78} className="h-2" />
                    <p className="text-sm text-green-600 mt-2">+5% improvement</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/95 backdrop-blur-md border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Engagement Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">8.4/10</div>
                    <p className="text-sm text-muted-foreground">Based on activity metrics</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Student Activity */}
              <Card className="bg-card/95 backdrop-blur-md border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Student Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentActivity.map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-semibold">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{student.name}</h4>
                            <p className="text-sm text-muted-foreground">{student.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-foreground mb-1">{student.progress}% complete</div>
                          <div className="text-xs text-muted-foreground">{student.lastActive}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {(activeTab === "groups" || activeTab === "filter") && (
            <div className="text-center py-12 text-muted-foreground">
              <p>This section is under development</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;