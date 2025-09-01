import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  BookOpen, 
  Mail, 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  Star, 
  Clock,
  TrendingUp,
  Eye,
  Edit,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Enrollments = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  const enrollments = [
    {
      id: 1,
      student: {
        name: "Alice Wonderland",
        email: "alice@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "/placeholder.svg",
        location: "New York, NY",
        joinDate: "2024-01-15",
        totalCourses: 3,
        completedCourses: 1
      },
      course: {
        name: "Advanced JavaScript",
        category: "Programming",
        duration: "12 weeks",
        difficulty: "Advanced",
        instructor: "John Doe",
        price: "$299",
        totalLessons: 45,
        completedLessons: 34
      },
      enrollmentDate: "2024-07-15",
      lastActivity: "2024-12-02",
      status: "Active",
      progress: 75,
      timeSpent: "34 hours",
      certificateEarned: false,
      grade: "A-",
      nextDeadline: "2024-12-10"
    },
    {
      id: 2,
      student: {
        name: "Bob The Builder",
        email: "bob@example.com",
        phone: "+1 (555) 234-5678",
        avatar: "/placeholder.svg",
        location: "Los Angeles, CA",
        joinDate: "2024-02-20",
        totalCourses: 2,
        completedCourses: 0
      },
      course: {
        name: "Intro to Python",
        category: "Programming",
        duration: "8 weeks",
        difficulty: "Beginner",
        instructor: "Jane Smith",
        price: "$199",
        totalLessons: 32,
        completedLessons: 10
      },
      enrollmentDate: "2024-07-10",
      lastActivity: "2024-12-01",
      status: "Active",
      progress: 30,
      timeSpent: "12 hours",
      certificateEarned: false,
      grade: "B+",
      nextDeadline: "2024-12-15"
    },
    {
      id: 3,
      student: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        phone: "+1 (555) 345-6789",
        avatar: "/placeholder.svg",
        location: "Chicago, IL",
        joinDate: "2024-01-10",
        totalCourses: 4,
        completedCourses: 2
      },
      course: {
        name: "Digital Marketing",
        category: "Marketing",
        duration: "10 weeks",
        difficulty: "Intermediate",
        instructor: "Sarah Wilson",
        price: "$249",
        totalLessons: 40,
        completedLessons: 40
      },
      enrollmentDate: "2024-06-20",
      lastActivity: "2024-11-25",
      status: "Completed",
      progress: 100,
      timeSpent: "42 hours",
      certificateEarned: true,
      grade: "A+",
      nextDeadline: null
    },
    {
      id: 4,
      student: {
        name: "Diana Prince",
        email: "diana@example.com",
        phone: "+1 (555) 456-7890",
        avatar: "/placeholder.svg",
        location: "Miami, FL",
        joinDate: "2024-03-05",
        totalCourses: 1,
        completedCourses: 0
      },
      course: {
        name: "Graphic Design Basics",
        category: "Design",
        duration: "6 weeks",
        difficulty: "Beginner",
        instructor: "Mike Johnson",
        price: "$149",
        totalLessons: 24,
        completedLessons: 2
      },
      enrollmentDate: "2024-07-18",
      lastActivity: "2024-11-30",
      status: "At Risk",
      progress: 10,
      timeSpent: "3 hours",
      certificateEarned: false,
      grade: "C",
      nextDeadline: "2024-12-05"
    },
    {
      id: 5,
      student: {
        name: "Eva Martinez",
        email: "eva@example.com",
        phone: "+1 (555) 567-8901",
        avatar: "/placeholder.svg",
        location: "Houston, TX",
        joinDate: "2024-04-12",
        totalCourses: 2,
        completedCourses: 1
      },
      course: {
        name: "Data Science Fundamentals",
        category: "Data Science",
        duration: "14 weeks",
        difficulty: "Intermediate",
        instructor: "Dr. Lisa Chen",
        price: "$399",
        totalLessons: 56,
        completedLessons: 28
      },
      enrollmentDate: "2024-08-01",
      lastActivity: "2024-12-03",
      status: "Active",
      progress: 50,
      timeSpent: "28 hours",
      certificateEarned: false,
      grade: "B",
      nextDeadline: "2024-12-12"
    }
  ];

  const stats = {
    totalEnrollments: enrollments.length,
    activeEnrollments: enrollments.filter(e => e.status === "Active").length,
    completedEnrollments: enrollments.filter(e => e.status === "Completed").length,
    atRiskEnrollments: enrollments.filter(e => e.status === "At Risk").length,
    averageProgress: Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "Completed":
        return <Badge variant="default" className="bg-blue-100 text-blue-800"><Award className="w-3 h-3 mr-1" />Completed</Badge>;
      case "At Risk":
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />At Risk</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = searchTerm === "" || 
      enrollment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || enrollment.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <h1 className="text-3xl font-bold text-blue-600">Enrollment Tracking</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold">{stats.totalEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.activeEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completedEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk</p>
                <p className="text-2xl font-bold text-red-600">{stats.atRiskEnrollments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-purple-600">{stats.averageProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Student Enrollments
          </CardTitle>
          <p className="text-gray-600">Comprehensive view and management of all student enrollments in your courses.</p>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by student name, course, or category..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="at risk">At Risk</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Enhanced Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course Details</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status & Activity</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={enrollment.student.avatar} />
                          <AvatarFallback>{enrollment.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{enrollment.student.name}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {enrollment.student.email}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {enrollment.student.location}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div>
                        <p className="font-medium">{enrollment.course.name}</p>
                        <p className="text-sm text-gray-500">{enrollment.course.category} • {enrollment.course.difficulty}</p>
                        <p className="text-sm text-gray-500">{enrollment.course.duration} • {enrollment.course.instructor}</p>
                        <Badge variant="outline" className="mt-1">{enrollment.course.price}</Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{enrollment.progress}%</span>
                          <span className="text-xs text-gray-500">
                            {enrollment.course.completedLessons}/{enrollment.course.totalLessons} lessons
                          </span>
                        </div>
                        <Progress value={enrollment.progress} className="h-2" />
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {enrollment.timeSpent} spent
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        {getStatusBadge(enrollment.status)}
                        <p className="text-xs text-gray-500">
                          Enrolled: {enrollment.enrollmentDate}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last active: {enrollment.lastActivity}
                        </p>
                        {enrollment.nextDeadline && (
                          <p className="text-xs text-orange-600 font-medium">
                            Next deadline: {enrollment.nextDeadline}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Grade: {enrollment.grade}</span>
                          {enrollment.certificateEarned && (
                            <Award className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {enrollment.student.completedCourses}/{enrollment.student.totalCourses} courses completed
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedEnrollment(enrollment)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Enrollment Details</DialogTitle>
                            </DialogHeader>
                            {selectedEnrollment && (
                              <div className="space-y-6">
                                <Tabs defaultValue="overview" className="w-full">
                                  <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="progress">Progress</TabsTrigger>
                                    <TabsTrigger value="communication">Communication</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="overview" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <h4 className="font-medium">Student Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><strong>Name:</strong> {selectedEnrollment.student.name}</p>
                                          <p><strong>Email:</strong> {selectedEnrollment.student.email}</p>
                                          <p><strong>Phone:</strong> {selectedEnrollment.student.phone}</p>
                                          <p><strong>Location:</strong> {selectedEnrollment.student.location}</p>
                                          <p><strong>Member since:</strong> {selectedEnrollment.student.joinDate}</p>
                                        </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        <h4 className="font-medium">Course Information</h4>
                                        <div className="space-y-1 text-sm">
                                          <p><strong>Course:</strong> {selectedEnrollment.course.name}</p>
                                          <p><strong>Category:</strong> {selectedEnrollment.course.category}</p>
                                          <p><strong>Instructor:</strong> {selectedEnrollment.course.instructor}</p>
                                          <p><strong>Duration:</strong> {selectedEnrollment.course.duration}</p>
                                          <p><strong>Difficulty:</strong> {selectedEnrollment.course.difficulty}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="progress" className="space-y-4">
                                    <div className="space-y-4">
                                      <div>
                                        <div className="flex justify-between items-center mb-2">
                                          <span>Course Progress</span>
                                          <span className="font-medium">{selectedEnrollment.progress}%</span>
                                        </div>
                                        <Progress value={selectedEnrollment.progress} className="h-3" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <p><strong>Lessons Completed:</strong> {selectedEnrollment.course.completedLessons}/{selectedEnrollment.course.totalLessons}</p>
                                          <p><strong>Time Spent:</strong> {selectedEnrollment.timeSpent}</p>
                                          <p><strong>Current Grade:</strong> {selectedEnrollment.grade}</p>
                                        </div>
                                        <div>
                                          <p><strong>Certificate:</strong> {selectedEnrollment.certificateEarned ? "Earned" : "Not earned"}</p>
                                          <p><strong>Last Activity:</strong> {selectedEnrollment.lastActivity}</p>
                                          {selectedEnrollment.nextDeadline && (
                                            <p><strong>Next Deadline:</strong> {selectedEnrollment.nextDeadline}</p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="communication" className="space-y-4">
                                    <div className="space-y-4">
                                      <div className="flex gap-2">
                                        <Button className="flex-1">
                                          <Mail className="h-4 w-4 mr-2" />
                                          Send Email
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                          <MessageSquare className="h-4 w-4 mr-2" />
                                          Send Message
                                        </Button>
                                      </div>
                                      <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-600">
                                          Communication history and options will be displayed here.
                                        </p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredEnrollments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No enrollments found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrollments;