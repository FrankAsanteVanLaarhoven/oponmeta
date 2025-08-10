import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Library as LibraryIcon, 
  Plus, 
  Search, 
  BookOpen, 
  Video, 
  FileText,
  Star,
  Users,
  ChevronDown
} from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Library = () => {
  const libraryStats = [
    { label: "Total Courses", value: "156", icon: BookOpen },
    { label: "Video Content", value: "89", icon: Video },
    { label: "Documents", value: "234", icon: FileText },
    { label: "Active Learners", value: "1,247", icon: Users },
  ];

  const featuredCourses = [
    {
      title: "Advanced JavaScript Fundamentals",
      category: "Programming",
      duration: "8 hours",
      rating: 4.8,
      enrollments: 1234,
      image: "/api/placeholder/300/200"
    },
    {
      title: "UI/UX Design Principles",
      category: "Design",
      duration: "6 hours",
      rating: 4.9,
      enrollments: 892,
      image: "/api/placeholder/300/200"
    },
    {
      title: "Data Science with Python",
      category: "Data Science",
      duration: "12 hours",
      rating: 4.7,
      enrollments: 756,
      image: "/api/placeholder/300/200"
    },
  ];

  const categories = [
    { name: "Programming", count: 45, color: "bg-blue-100 text-blue-700" },
    { name: "Design", count: 32, color: "bg-purple-100 text-purple-700" },
    { name: "Marketing", count: 28, color: "bg-green-100 text-green-700" },
    { name: "Business", count: 24, color: "bg-orange-100 text-orange-700" },
    { name: "Data Science", count: 18, color: "bg-red-100 text-red-700" },
    { name: "Photography", count: 9, color: "bg-pink-100 text-pink-700" },
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Start Your Library</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Library is a collection of optional courses and curated content such as videos, articles & more that your 
            learners can use. Just like a real world library, learners can use the library to self-assign courses or discover 
            content for learning.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add to Library
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {libraryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search library content..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <LibraryIcon className="mr-2 h-4 w-4" />
              Browse Categories
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="featured" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Featured Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <Badge className="mb-2">{course.category}</Badge>
                    <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{course.enrollments.toLocaleString()} enrolled</span>
                      <Button size="sm">Add to Library</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Browse by Category</h3>
            <p className="text-gray-600 mb-6">Organize your content into categories for quick access.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h4 className="font-medium mb-1">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.count} courses</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Recently Added</h3>
            <p className="text-gray-600 mb-6">Latest additions to your library</p>
            
            <div className="space-y-4">
              {featuredCourses.slice(0, 2).map((course, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                      <div className="flex-1">
                        <Badge className="mb-1">{course.category}</Badge>
                        <h4 className="font-semibold">{course.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {course.duration}
                          </span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                          <span>{course.enrollments.toLocaleString()} enrolled</span>
                        </div>
                      </div>
                      <Button>Add to Library</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Section Info */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Section</h3>
          <p className="text-gray-600 mb-4">Organize your content into categories for quick access.</p>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Section
          </Button>
        </CardContent>
      </Card>

      {/* Courses in Library */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Courses in Library</h3>
          <p className="text-gray-600 mb-4">Organize your content into categories for quick access.</p>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Courses
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Library;