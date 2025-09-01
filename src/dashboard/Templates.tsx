import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Play, 
  Star,
  Users,
  Eye,
  BookOpen,
  Video,
  Target,
  Globe,
  Palette,
  Tag,
  } from "lucide-react";
import DashboardBackButton from "@/components/ui/DashboardBackButton";

const Templates = () => {
  const templateCategories = [
    {
      title: "Brand Standards Training Template",
      description: "Onboard new employees with company brand guidelines",
      image: "/api/placeholder/300/200",
      duration: "2 hours",
      lessons: 12,
      type: "Professional"
    },
    {
      title: "Onboarding & Company Introduction Template", 
      description: "Welcome new team members with comprehensive orientation",
      image: "/api/placeholder/300/200",
      duration: "4 hours",
      lessons: 18,
      type: "HR Training"
    },
    {
      title: "Employee Benefits Information Template",
      description: "Educate employees about their benefits and perks",
      image: "/api/placeholder/300/200", 
      duration: "1.5 hours",
      lessons: 8,
      type: "Benefits"
    }
  ];

  const readyToUseCourses = [
    {
      title: "Talent Development Training Course",
      instructor: "ProProfs Expert",
      duration: "15 min",
      image: "/api/placeholder/200/150",
      rating: 4.8,
      enrollments: 2450
    },
    {
      title: "Introduction to Hazard Control Training", 
      instructor: "Safety Expert",
      duration: "20 min",
      image: "/api/placeholder/200/150",
      rating: 4.9,
      enrollments: 1890
    },
    {
      title: "Anger Management Training Course",
      instructor: "Psychology Expert", 
      duration: "30 min",
      image: "/api/placeholder/200/150",
      rating: 4.7,
      enrollments: 1560
    },
    {
      title: "Medication Awareness in Care & Education",
      instructor: "Healthcare Expert",
      duration: "20 min", 
      image: "/api/placeholder/200/150",
      rating: 4.8,
      enrollments: 1200
    },
    {
      title: "Happy Customers Make Repeat Customers",
      instructor: "Customer Service Expert",
      duration: "20 min",
      image: "/api/placeholder/200/150", 
      rating: 4.6,
      enrollments: 980
    },
    {
      title: "Fire Protection Training Course",
      instructor: "Safety Expert",
      duration: "1 hour",
      image: "/api/placeholder/200/150",
      rating: 4.9,
      enrollments: 1780
    }
  ];

  const features = [
    {
      icon: Globe,
      title: "Create Courses With AI",
      description: "Simplify & accelerate course creation by using AI. Generate course content in minutes."
    },
    {
      icon: BookOpen,
      title: "500+ Expert-Taught Courses", 
      description: "Access a premium library of fully customizable & ready-to-use courses taught by experts."
    },
    {
      icon: Target,
      title: "Assessments & Surveys",
      description: "Built-in quiz and survey tools help you assess knowledge retention and collect course feedback."
    },
    {
      icon: Users,
      title: "Multiple Instructors",
      description: "Simplify task management & leverage wider expertise by setting up multiple instructor accounts."
    },
    {
      icon: Globe,
      title: "70+ Languages Supported", 
      description: "Remove language barriers & easily train learners in English, Spanish & 70+ other languages."
    },
    {
      icon: Target,
      title: "Scenario Builder",
      description: "Add scenario blocks to your courses using stock characters, dialogue, responses, and feedback."
    },
    {
      icon: Play,
      title: "Scheduling",
      description: "Schedule training sessions with the training calendar to inform learners about upcoming events."
    },
    {
      icon: Tag,
      title: "White-Labeling", 
      description: "Remove any references to ProProfs and add logo, fonts, and custom designs to your own brand."
    },
    {
      icon: Search,
      title: "Reports & Analytics",
      description: "AI-powered LMS reporting & analytics to track each learner's or group's progress."
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardBackButton />
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Training Templates & Examples</h1>
        <p className="text-xl text-gray-600 mb-6">
          Build professional training courses using beautifully designed templates
        </p>
        <p className="text-gray-600 mb-8">
          Choose from a vast library of beautifully crafted online training templates to create highly engaging courses. 
          These templates are built using the latest trends in aesthetic design and typography. Give your course a 
          personalised touch by adding your brand logos and images. Share your courses, and track your learners' performance on the go.
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Play className="h-5 w-5 text-blue-600" />
          <span className="text-blue-600 font-medium">Watch: How to create a course in less than 5 minutes</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8">
            <Plus className="mr-2 h-4 w-4" />
            Create from Scratch
          </Button>
          <Button variant="outline" className="px-8">
            <Globe className="mr-2 h-4 w-4" />
            Create with AI
          </Button>
        </div>
      </div>

      {/* Template/Course Tabs */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Create from Scratch Card */}
          <Card className="border-dashed border-2 border-gray-300 hover:border-blue-400 transition-colors">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Create from Scratch</h3>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Create
              </Button>
            </CardContent>
          </Card>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateCategories.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {template.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {template.duration}
                    </span>
                    <span>{template.lessons} lessons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.type}</Badge>
                    <Button size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {/* Ready-to-Use Courses Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">500+ Ready-to-Use, Expert-Taught Courses</h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                Save time & costs, and launch fast — with 100% customizable courses
              </p>
              <p className="text-gray-600 max-w-4xl mx-auto">
                Jumpstart with ProProfs' massive library of 500+ professionally designed and fully customizable courses 
                covering compliance, HR, safety, and more. Add your logo, update content, such as your policies, or insert 
                quizzes and videos in just a few clicks. Go live in minutes, not months. Plus, these courses are built with 
                real human expertise, ensuring top-notch content and an engaging learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readyToUseCourses.map((course, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative">
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {course.duration}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-blue-600">ProProfs</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{course.rating}</span>
                        <span className="text-xs text-gray-500">({course.enrollments})</span>
                      </div>
                      <Button size="sm">Preview</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover LMS Software Features Your Team Will Love</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Templates;