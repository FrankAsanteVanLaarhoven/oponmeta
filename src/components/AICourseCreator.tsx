import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { 
  Sparkles, 
  Bot, 
  BookOpen, 
  Users, 
  Clock, 
  Target, 
  Star, 
  Plus,
  Minus,
  Save,
  Play,
  Download,
  Share2,
  Edit,
  Eye,
  Trash2,
  Copy,
  Zap,
  Lightbulb,
  TrendingUp,
  Award,
  Calendar,
  FileText,
  Image,
  Video,
  Music,
  Globe,
  Settings,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Search,
  Filter,
  Grid,
  List,
  RefreshCw,
  Upload,
  FolderOpen,
  Tag,
  Hash,
  Link,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Bookmark,
  Flag,
  MoreHorizontal
} from 'lucide-react';

interface CourseTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  features: string[];
  tags: string[];
  isPopular: boolean;
  rating: number;
  usageCount: number;
}

interface GeneratedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  lessons: number;
  modules: CourseModule[];
  status: 'draft' | 'generating' | 'completed' | 'published';
  createdAt: string;
  updatedAt: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: string;
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'interactive';
  duration: string;
  content: string;
  objectives: string[];
  resources: string[];
}

const COURSE_TEMPLATES: CourseTemplate[] = [
  {
    id: '1',
    name: 'JavaScript Fundamentals',
    description: 'Complete beginner-friendly JavaScript course with hands-on projects',
    category: 'Programming',
    difficulty: 'beginner',
    duration: '8-10 hours',
    lessons: 24,
    features: ['Interactive exercises', 'Real-world projects', 'Certificate', 'Lifetime access'],
    tags: ['JavaScript', 'Web Development', 'Beginner'],
    isPopular: true,
    rating: 4.8,
    usageCount: 1250
  },
  {
    id: '2',
    name: 'Digital Marketing Mastery',
    description: 'Comprehensive digital marketing strategy for modern businesses',
    category: 'Marketing',
    difficulty: 'intermediate',
    duration: '12-15 hours',
    lessons: 36,
    features: ['Case studies', 'Marketing tools', 'Strategy templates', 'Expert insights'],
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Analytics'],
    isPopular: true,
    rating: 4.9,
    usageCount: 890
  },
  {
    id: '3',
    name: 'Data Science Essentials',
    description: 'Introduction to data science and machine learning concepts',
    category: 'Data Science',
    difficulty: 'intermediate',
    duration: '15-20 hours',
    lessons: 42,
    features: ['Python programming', 'Statistical analysis', 'ML algorithms', 'Data visualization'],
    tags: ['Data Science', 'Python', 'Machine Learning', 'Statistics'],
    isPopular: false,
    rating: 4.7,
    usageCount: 650
  },
  {
    id: '4',
    name: 'UI/UX Design Principles',
    description: 'Learn user interface and experience design fundamentals',
    category: 'Design',
    difficulty: 'beginner',
    duration: '10-12 hours',
    lessons: 30,
    features: ['Design tools', 'Prototyping', 'User research', 'Portfolio projects'],
    tags: ['UI/UX', 'Design', 'Figma', 'Prototyping'],
    isPopular: false,
    rating: 4.6,
    usageCount: 420
  },
  {
    id: '5',
    name: 'Leadership Skills',
    description: 'Develop essential leadership skills for the modern workplace',
    category: 'Business',
    difficulty: 'advanced',
    duration: '8-10 hours',
    lessons: 20,
    features: ['Leadership assessment', 'Team management', 'Communication skills', 'Case studies'],
    tags: ['Leadership', 'Management', 'Communication', 'Business'],
    isPopular: true,
    rating: 4.8,
    usageCount: 780
  },
  {
    id: '6',
    name: 'Cybersecurity Basics',
    description: 'Understanding cybersecurity fundamentals and best practices',
    category: 'Technology',
    difficulty: 'beginner',
    duration: '6-8 hours',
    lessons: 18,
    features: ['Security tools', 'Threat analysis', 'Best practices', 'Certification prep'],
    tags: ['Cybersecurity', 'Security', 'IT', 'Best Practices'],
    isPopular: false,
    rating: 4.5,
    usageCount: 320
  }
];

const CATEGORIES = ['All Categories', 'Programming', 'Marketing', 'Data Science', 'Design', 'Business', 'Technology', 'Health', 'Education'];
const DIFFICULTY_LEVELS = ['All Levels', 'beginner', 'intermediate', 'advanced'];

const AICourseCreator = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<CourseTemplate | null>(null);
  const [generatedCourses, setGeneratedCourses] = useState<GeneratedCourse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    targetAudience: '',
    learningObjectives: '',
    prerequisites: '',
    duration: '',
    lessons: 0
  });

  const filteredTemplates = COURSE_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All Levels' || template.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleTemplateSelect = (template: CourseTemplate) => {
    setSelectedTemplate(template);
    setShowCourseForm(true);
  };

  const handleFormChange = (field: string, value: string | number) => {
    setCourseFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateCourse = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI course generation
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          
          // Create generated course
          const newCourse: GeneratedCourse = {
            id: Date.now().toString(),
            title: courseFormData.title || selectedTemplate.name,
            description: courseFormData.description || selectedTemplate.description,
            category: courseFormData.category || selectedTemplate.category,
            difficulty: courseFormData.difficulty,
            duration: courseFormData.duration || selectedTemplate.duration,
            lessons: courseFormData.lessons || selectedTemplate.lessons,
            modules: generateMockModules(),
            status: 'completed',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          setGeneratedCourses(prev => [newCourse, ...prev]);
          setShowCourseForm(false);
          setSelectedTemplate(null);
          setCourseFormData({
            title: '',
            description: '',
            category: '',
            difficulty: 'beginner',
            targetAudience: '',
            learningObjectives: '',
            prerequisites: '',
            duration: '',
            lessons: 0
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const generateMockModules = (): CourseModule[] => {
    return [
      {
        id: '1',
        title: 'Introduction and Setup',
        description: 'Get started with the course and set up your learning environment',
        lessons: [
          {
            id: '1',
            title: 'Welcome to the Course',
            type: 'video',
            duration: '5 min',
            content: 'Introduction to the course objectives and what you will learn',
            objectives: ['Understand course structure', 'Set learning goals'],
            resources: ['Course overview PDF', 'Learning path guide']
          },
          {
            id: '2',
            title: 'Setting Up Your Environment',
            type: 'text',
            duration: '10 min',
            content: 'Step-by-step guide to setting up your development environment',
            objectives: ['Install required software', 'Configure development tools'],
            resources: ['Installation guide', 'Troubleshooting tips']
          }
        ],
        duration: '15 min',
        order: 1
      },
      {
        id: '2',
        title: 'Core Concepts',
        description: 'Learn the fundamental concepts and principles',
        lessons: [
          {
            id: '3',
            title: 'Understanding the Basics',
            type: 'video',
            duration: '20 min',
            content: 'Deep dive into the core concepts and foundational knowledge',
            objectives: ['Master basic concepts', 'Apply fundamental principles'],
            resources: ['Concept cheat sheet', 'Practice exercises']
          },
          {
            id: '4',
            title: 'Practical Application',
            type: 'interactive',
            duration: '30 min',
            content: 'Hands-on practice with real-world examples',
            objectives: ['Apply concepts practically', 'Build confidence'],
            resources: ['Interactive exercises', 'Solution guide']
          }
        ],
        duration: '50 min',
        order: 2
      }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'published': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">AI Course Creator</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
                            Create engaging, personalised courses with AI assistance. Choose from templates or start from scratch.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Templates Available</p>
                  <p className="text-2xl font-bold text-white">{COURSE_TEMPLATES.length}</p>
                </div>
                <Sparkles className="w-8 h-8 text-blue-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Courses Generated</p>
                  <p className="text-2xl font-bold text-white">{generatedCourses.length}</p>
                </div>
                <Bot className="w-8 h-8 text-green-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Success Rate</p>
                  <p className="text-2xl font-bold text-white">98%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-300" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80">Avg. Generation Time</p>
                  <p className="text-2xl font-bold text-white">2.5 min</p>
                </div>
                <Clock className="w-8 h-8 text-purple-300" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Generation Form */}
        {showCourseForm && selectedTemplate && (
          <Card className="mb-8 bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Bot className="w-6 h-6 mr-2 text-blue-300" />
                Customise Your Course
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white font-medium">Course Title</Label>
                  <Input
                    value={courseFormData.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                    placeholder="Enter course title"
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                  />
                </div>
                
                <div>
                  <Label className="text-white font-medium">Category</Label>
                  <Select value={courseFormData.category} onValueChange={(value) => handleFormChange('category', value)}>
                    <SelectTrigger className="mt-2 bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white font-medium">Difficulty Level</Label>
                  <Select value={courseFormData.difficulty} onValueChange={(value) => handleFormChange('difficulty', value)}>
                    <SelectTrigger className="mt-2 bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-white font-medium">Duration (hours)</Label>
                  <Input
                    value={courseFormData.duration}
                    onChange={(e) => handleFormChange('duration', e.target.value)}
                    placeholder="e.g., 8-10 hours"
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label className="text-white font-medium">Course Description</Label>
                  <Textarea
                    value={courseFormData.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                    placeholder="Describe your course content and objectives"
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                    rows={3}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label className="text-white font-medium">Target Audience</Label>
                  <Input
                    value={courseFormData.targetAudience}
                    onChange={(e) => handleFormChange('targetAudience', e.target.value)}
                    placeholder="e.g., Beginners with no prior experience"
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label className="text-white font-medium">Learning Objectives</Label>
                  <Textarea
                    value={courseFormData.learningObjectives}
                    onChange={(e) => handleFormChange('learningObjectives', e.target.value)}
                    placeholder="What will students learn from this course?"
                    className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCourseForm(false)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleGenerateCourse}
                  disabled={isGenerating}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Course
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Generation Progress */}
        {isGenerating && (
          <Card className="mb-8 bg-white/10 border-white/20">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">AI is Creating Your Course</h3>
                <Progress value={generationProgress} className="mb-4" />
                <p className="text-white/80">
                  {generationProgress < 30 && "Analyzing template and requirements..."}
                  {generationProgress >= 30 && generationProgress < 60 && "Generating course structure and content..."}
                  {generationProgress >= 60 && generationProgress < 90 && "Creating lessons and assessments..."}
                  {generationProgress >= 90 && "Finalizing and optimizing course..."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="bg-white/10 rounded-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-white/60" />
              <span className="text-sm font-medium text-white">Filters:</span>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVELS.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Templates */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Course Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="bg-white hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleTemplateSelect(template)}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {template.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{template.name}</CardTitle>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{template.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-medium">{template.lessons}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{template.usageCount} uses</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {template.isPopular && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                      Popular
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Generated Courses */}
        {generatedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Generated Courses</h2>
            <div className="space-y-4">
              {generatedCourses.map(course => (
                <Card key={course.id} className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                          <Badge className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                        <p className="text-white/80 mb-2">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>{course.category}</span>
                          <span>•</span>
                          <span>{course.difficulty}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                          <span>•</span>
                          <span>{course.lessons} lessons</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICourseCreator;
