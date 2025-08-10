import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Upload, ArrowLeft, Star } from "lucide-react";
import { useDropzone } from 'react-dropzone';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const CoursesManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript",
      category: "Programming",
      students: 250,
      status: "Active",
      rating: 4.8,
      price: "$99",
      created: "2024-01-15"
    },
    {
      id: 2,
      title: "Data Science Bootcamp",
      category: "Data Science", 
      students: 180,
      status: "Active",
      rating: 4.9,
      price: "$199",
      created: "2024-02-20"
    },
    {
      id: 3,
      title: "Web Design Fundamentals",
      category: "Design",
      students: 165,
      status: "Draft",
      rating: 4.6,
      price: "$79",
      created: "2024-03-10"
    }
  ]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = {
      id: courses.length + 1,
      title: formData.title,
      category: formData.category,
      students: 0,
      status: "Draft",
      rating: 0,
      price: formData.price,
      created: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, newCourse]);
    setShowCreateForm(false);
    setFormData({ title: "", category: "", description: "", price: "", imageUrl: "" });
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setCourses(courses.map(course => 
      course.id === id 
        ? { ...course, status: course.status === "Active" ? "Draft" : "Active" }
        : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const onDrop = (acceptedFiles: File[]) => {
    setUploadedFiles(prev => [...prev, ...acceptedFiles]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noClick: false,
    noKeyboard: false,
    // Accept all file types and folders
    // Note: folder upload support depends on browser
    // No 'accept' prop means all files are allowed
  });

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setShowCreateForm(false)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </Button>
        </div>

        <h1 className="text-3xl font-bold text-cyan-300">Create New Course</h1>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
            <p className="text-gray-600">Fill in the information for your new course.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Web Development"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Programming, Design, Marketing"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Provide a brief overview of the course content..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Course Price</Label>
                <Input
                  id="price"
                  placeholder="e.g., $99"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input
                  id="imageUrl"
                  placeholder="e.g., https://placehold.co/300x200.png"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
                <p className="text-sm text-gray-500">
                  Enter a direct URL to an image. You can use placeholder services like placehold.co.
                </p>
              </div>

              {/* File Upload Area */}
              <div className="space-y-2">
                <Label>Upload Course Files & Media</Label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#11204a] bg-[#16203a]' : 'border-gray-300 bg-white/30'}`}
                  style={{ minHeight: 120 }}
                >
                  <input {...getInputProps()} webkitdirectory="true" directory="true" />
                  <div className="flex flex-col items-center justify-center h-full">
                    <Upload className="w-10 h-10 text-cyan-300 mb-2" />
                    <p className="text-gray-700">Drag & drop files or folders here, or click to select</p>
                    <p className="text-xs text-gray-500 mt-1">Supports all file types, including video, PDF, CSV, ZIP, images, and folders</p>
                  </div>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3">
                    <Label className="text-sm text-gray-700">Selected Files:</Label>
                    <ul className="text-xs text-gray-800 max-h-32 overflow-y-auto mt-1 bg-white/40 rounded p-2">
                      {uploadedFiles.map((file, idx) => (
                        <li key={idx} className="truncate">{file.webkitRelativePath || file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button type="submit" className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]">
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <DashboardBackButton />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-300">Courses Management</h1>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-[#11204a] hover:bg-[#16203a] text-white border-2 border-[#0a1834]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Programming">Programming</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses ({filteredCourses.length})</CardTitle>
          <p className="text-gray-600">Manage and track your course performance</p>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.category}</Badge>
                    </TableCell>
                    <TableCell>{course.students} students</TableCell>
                    <TableCell>
                      <Badge 
                        variant={course.status === "Active" ? "default" : "secondary"}
                        className={course.status === "Active" ? "bg-green-100 text-green-800" : ""}
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{course.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleToggleStatus(course.id)}
                        >
                          {course.status === "Active" ? "Pause" : "Activate"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteCourse(course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#16203a] border-[#11204a] hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-[#11204a] rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">✨</span>
            </div>
            <CardTitle className="text-lg">AI Personalization</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Get AI-powered course recommendations and identify knowledge gaps for tailored learning.
            </p>
            <Button variant="link" className="text-cyan-300 p-0 hover:underline">
              Find Courses →
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#16203a] border-[#11204a] hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📚</span>
            </div>
            <CardTitle className="text-lg">Rich Content Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Support for diverse media types, AR/VR content, and live streaming capabilities.
            </p>
            <Button variant="link" className="text-cyan-300 p-0 hover:underline">
              Learn More →
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#16203a] border-[#11204a] hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📱</span>
            </div>
            <CardTitle className="text-lg">Mobile Optimised</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Access learning on-the-go with native mobile apps and offline content synchronization.
            </p>
            <Button variant="link" className="text-cyan-300 p-0 hover:underline">
              Download App →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoursesManagement;