import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Share, 
  Download, 
  Edit3, 
  Eye,
  Users,
  Clock,
  Star,
  FolderPlus,
  MoreVertical
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Documents = () => {
  const recentDocuments = [
    {
      id: 1,
      title: "Machine Learning Course Syllabus",
      type: "Syllabus",
      lastModified: "2 hours ago",
      collaborators: 3,
      status: "active",
      owner: "You"
    },
    {
      id: 2,
      title: "JavaScript Assignment Instructions",
      type: "Assignment",
      lastModified: "1 day ago",
      collaborators: 1,
      status: "shared",
      owner: "Sarah Chen"
    },
    {
      id: 3,
      title: "React Development Notes",
      type: "Notes",
      lastModified: "3 days ago",
      collaborators: 5,
      status: "collaborative",
      owner: "You"
    },
    {
      id: 4,
      title: "Database Design Workshop Materials",
      type: "Materials",
      lastModified: "1 week ago",
      collaborators: 2,
      status: "published",
      owner: "Mike Johnson"
    }
  ];

  const sharedDocuments = [
    {
      id: 1,
      title: "Course Feedback Collection",
      sharedBy: "Dr. Smith",
      sharedDate: "Today",
      permission: "Edit"
    },
    {
      id: 2,
      title: "Student Progress Tracker",
      sharedBy: "Admin Team",
      sharedDate: "Yesterday",
      permission: "View"
    }
  ];

  const templates = [
    {
      id: 1,
      name: "Course Syllabus",
      description: "Structured template for course planning",
      category: "Academic"
    },
    {
      id: 2,
      name: "Assignment Brief",
      description: "Template for creating student assignments",
      category: "Academic"
    },
    {
      id: 3,
      name: "Meeting Notes",
      description: "Template for collaborative meeting documentation",
      category: "Collaboration"
    },
    {
      id: 4,
      name: "Project Proposal",
      description: "Template for student project proposals",
      category: "Projects"
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-600">Document Editor</h1>
          <p className="text-gray-600 mt-2">
            Create, edit, and collaborate on documents in real-time with your students and peers.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#16203a] rounded-lg">
                <FileText className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-semibold">Blank Document</h3>
                <p className="text-sm text-gray-600">Start with a clean slate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Edit3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">From Template</h3>
                <p className="text-sm text-gray-600">Use predefined templates</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Collaborative Doc</h3>
                <p className="text-sm text-gray-600">Invite others to edit</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search documents..." 
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4">
            {recentDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doc.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {doc.lastModified}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {doc.collaborators} collaborators
                          </span>
                          <span>By {doc.owner}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={doc.status === "active" ? "default" : "secondary"}
                        className={
                          doc.status === "active" ? "bg-green-100 text-green-700" :
                          doc.status === "shared" ? "bg-[#16203a] text-cyan-300" :
                          doc.status === "collaborative" ? "bg-purple-100 text-purple-700" :
                          "bg-gray-100 text-gray-700"
                        }
                      >
                        {doc.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="grid gap-4">
            {sharedDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-[#16203a] rounded-lg">
                        <Share className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{doc.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>Shared by {doc.sharedBy}</span>
                          <span>{doc.sharedDate}</span>
                          <Badge variant="outline" className="text-xs">
                            {doc.permission}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                      {doc.permission === "Edit" && (
                        <Button size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <FileText className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{template.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FolderPlus className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Course Materials</h4>
                    <p className="text-sm text-gray-600">12 documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FolderPlus className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Assignments</h4>
                    <p className="text-sm text-gray-600">8 documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FolderPlus className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Shared Resources</h4>
                    <p className="text-sm text-gray-600">15 documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Active Editing Session */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Currently Editing</span>
              </div>
              <span className="text-gray-600">Machine Learning Course Syllabus</span>
              <span className="text-sm text-gray-500">3 collaborators online</span>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              <Button size="sm">
                <Edit3 className="h-4 w-4 mr-1" />
                Continue Editing
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;