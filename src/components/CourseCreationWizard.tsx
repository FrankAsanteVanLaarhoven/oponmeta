import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Plus, 
  BookOpen, 
  Users, 
  DollarSign, 
  Star, 
  Edit, 
  Upload,
  Video,
  FileText,
  Image,
  Settings,
  BarChart3,
  MessageSquare,
  Target,
  Zap,
  Brain,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Lightbulb,
  Rocket,
  Trophy,
  Gift,
  Headphones,
  Mic,
  Camera,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  Tag,
  Award,
  Calendar,
  MapPin,
  Languages,
  Target as TargetIcon,
  BookMarked,
  GraduationCap,
  Users2,
  TrendingUp,
  Eye,
  Share2,
  Download,
  Copy,
  Link,
  ExternalLink,
  Save,
  Send,
  X,
  PlusCircle,
  MinusCircle,
  Move,
  GripVertical,
  FileVideo,
  FileAudio,
  FileImage,
  FilePdf,
  FileCode,
  FileArchive,
  Pause
} from 'lucide-react';

interface CourseData {
  basicInfo: {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    language: string;
    tags: string[];
  };
  pricing: {
    price: number;
    originalPrice?: number;
    currency: string;
    hasDiscount: boolean;
    discountEndDate?: Date;
  };
  content: {
    sections: CourseSection[];
    totalDuration: number;
    totalLessons: number;
  };
  requirements: {
    prerequisites: string[];
    targetAudience: string[];
    learningOutcomes: string[];
  };
  media: {
    thumbnail: string;
    promotionalVideo?: string;
    courseImage: string;
  };
  settings: {
    certificate: boolean;
    downloadable: boolean;
    lifetimeAccess: boolean;
    mobileCompatible: boolean;
    allowReviews: boolean;
    privateCourse: boolean;
  };
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  lessons: CourseLesson[];
  order: number;
}

interface CourseLesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'download';
  duration: number; // in minutes
  content: string;
  resources: string[];
  isFree: boolean;
  order: number;
}

const CourseCreationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState<CourseData>({
    basicInfo: {
      title: '',
      subtitle: '',
      description: '',
      category: '',
      level: 'beginner',
      language: 'English',
      tags: []
    },
    pricing: {
      price: 0,
      currency: 'USD',
      hasDiscount: false
    },
    content: {
      sections: [],
      totalDuration: 0,
      totalLessons: 0
    },
    requirements: {
      prerequisites: [],
      targetAudience: [],
      learningOutcomes: []
    },
    media: {
      thumbnail: '',
      courseImage: ''
    },
    settings: {
      certificate: true,
      downloadable: true,
      lifetimeAccess: true,
      mobileCompatible: true,
      allowReviews: true,
      privateCourse: false
    }
  });

  const [aiPrompt, setAIPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newPrerequisite, setNewPrerequisite] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  
  // Course management states
  const [courseStatus, setCourseStatus] = useState<'draft' | 'published' | 'unpublished' | 'paused'>('draft');
  const [courseId, setCourseId] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCourseManager, setShowCourseManager] = useState(false);
  const [myCourses, setMyCourses] = useState<any[]>([]);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState<any>(null);

  const steps = [
    { id: 1, title: 'Basic Information', icon: BookOpen },
    { id: 2, title: 'Pricing & Sales', icon: DollarSign },
    { id: 3, title: 'Course Content', icon: Video },
    { id: 4, title: 'Requirements', icon: Target },
    { id: 5, title: 'Media & Assets', icon: Image },
    { id: 6, title: 'Settings', icon: Settings },
    { id: 7, title: 'Review & Publish', icon: Send }
  ];

  const categories = [
    'Programming', 'Business', 'Marketing', 'Design', 'Music', 'Photography',
    'Health & Fitness', 'Language', 'Personal Development', 'Technology',
    'Finance', 'Cooking', 'Travel', 'Art', 'Science', 'Education'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi'
  ];

  // Course management functions
  const saveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const draftData = {
        id: courseId || `draft_${Date.now()}`,
        ...courseData,
        status: 'draft',
        lastModified: new Date(),
        progress: Math.round((currentStep / steps.length) * 100)
      };
      
      // Save to localStorage for demo (in real app, save to backend)
      const existingDrafts = JSON.parse(localStorage.getItem('courseDrafts') || '[]');
      const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== draftData.id);
      updatedDrafts.push(draftData);
      localStorage.setItem('courseDrafts', JSON.stringify(updatedDrafts));
      
      setCourseId(draftData.id);
      setLastSaved(new Date());
      setCourseStatus('draft');
      
      toast.success('Draft saved successfully!');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const loadDraft = (draftId: string) => {
    try {
      const existingDrafts = JSON.parse(localStorage.getItem('courseDrafts') || '[]');
      const draft = existingDrafts.find((d: any) => d.id === draftId);
      
      if (draft) {
        setCourseData(draft);
        setCourseId(draft.id);
        setCourseStatus(draft.status);
        setLastSaved(draft.lastModified);
        setCurrentStep(Math.ceil((draft.progress / 100) * steps.length));
        toast.success('Draft loaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to load draft');
    }
  };

  const publishCourse = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const publishedCourse = {
        id: courseId || `course_${Date.now()}`,
        ...courseData,
        status: 'published',
        publishedAt: new Date(),
        lastModified: new Date()
      };
      
      // Save to localStorage for demo (in real app, save to backend)
      const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      const updatedCourses = existingCourses.filter((course: any) => course.id !== publishedCourse.id);
      updatedCourses.push(publishedCourse);
      localStorage.setItem('publishedCourses', JSON.stringify(updatedCourses));
      
      // Remove from drafts
      const existingDrafts = JSON.parse(localStorage.getItem('courseDrafts') || '[]');
      const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== publishedCourse.id);
      localStorage.setItem('courseDrafts', JSON.stringify(updatedDrafts));
      
      setCourseId(publishedCourse.id);
      setCourseStatus('published');
      setLastSaved(new Date());
      
      toast.success('Course published successfully!');
    } catch (error) {
      toast.error('Failed to publish course');
    } finally {
      setIsSaving(false);
    }
  };

  const unpublishCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      const course = existingCourses.find((c: any) => c.id === courseId);
      
      if (course) {
        course.status = 'unpublished';
        course.unpublishedAt = new Date();
        course.lastModified = new Date();
        
        const updatedCourses = existingCourses.map((c: any) => 
          c.id === courseId ? course : c
        );
        localStorage.setItem('publishedCourses', JSON.stringify(updatedCourses));
        
        toast.success('Course unpublished successfully!');
      }
    } catch (error) {
      toast.error('Failed to unpublish course');
    }
  };

  const pauseCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      const course = existingCourses.find((c: any) => c.id === courseId);
      
      if (course) {
        course.status = 'paused';
        course.pausedAt = new Date();
        course.lastModified = new Date();
        
        const updatedCourses = existingCourses.map((c: any) => 
          c.id === courseId ? course : c
        );
        localStorage.setItem('publishedCourses', JSON.stringify(updatedCourses));
        
        toast.success('Course paused successfully!');
      }
    } catch (error) {
      toast.error('Failed to pause course');
    }
  };

  const resumeCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      const course = existingCourses.find((c: any) => c.id === courseId);
      
      if (course) {
        course.status = 'published';
        course.resumedAt = new Date();
        course.lastModified = new Date();
        
        const updatedCourses = existingCourses.map((c: any) => 
          c.id === courseId ? course : c
        );
        localStorage.setItem('publishedCourses', JSON.stringify(updatedCourses));
        
        toast.success('Course resumed successfully!');
      }
    } catch (error) {
      toast.error('Failed to resume course');
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from published courses
      const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      const updatedCourses = existingCourses.filter((course: any) => course.id !== courseId);
      localStorage.setItem('publishedCourses', JSON.stringify(updatedCourses));
      
      // Remove from drafts
      const existingDrafts = JSON.parse(localStorage.getItem('courseDrafts') || '[]');
      const updatedDrafts = existingDrafts.filter((draft: any) => draft.id !== courseId);
      localStorage.setItem('courseDrafts', JSON.stringify(updatedDrafts));
      
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const loadMyCourses = () => {
    try {
      const drafts = JSON.parse(localStorage.getItem('courseDrafts') || '[]');
      const published = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
      setMyCourses([...drafts, ...published]);
    } catch (error) {
      console.error('Failed to load courses');
    }
  };

  const editCourse = (course: any) => {
    setSelectedCourseForEdit(course);
    setCourseData(course);
    setCourseId(course.id);
    setCourseStatus(course.status);
    setLastSaved(course.lastModified);
    setCurrentStep(1); // Start from beginning for editing
    setShowCourseManager(false);
    toast.success(`Editing: ${course.basicInfo.title}`);
  };

  // Load courses on component mount
  useEffect(() => {
    loadMyCourses();
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (courseData.basicInfo.title && courseStatus === 'draft') {
        saveDraft();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [courseData, courseStatus]);

  // AI Course Generation
  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const generatedData = {
        ...courseData,
        basicInfo: {
          ...courseData.basicInfo,
          title: `${aiPrompt} - Complete Course`,
          subtitle: `Master ${aiPrompt} from beginner to advanced`,
          description: `A comprehensive course on ${aiPrompt.toLowerCase()}. This AI-generated course covers all essential topics and provides hands-on experience with real-world projects.`,
          category: 'Technology',
          tags: [aiPrompt, 'AI Generated', 'Technology', 'Hands-on']
        },
        requirements: {
          prerequisites: ['No prerequisites required', 'Basic computer skills helpful'],
          targetAudience: ['Beginners interested in learning', 'Professionals looking to upskill'],
          learningOutcomes: [
            `Master ${aiPrompt} fundamentals`,
            'Build real-world projects',
            'Apply practical skills',
            'Understand best practices'
          ]
        }
      };
      
      setCourseData(generatedData);
      setAIPrompt('');
      setIsGenerating(false);
    }, 3000);
  };

  // Helper functions
  const addTag = () => {
    if (newTag.trim() && !courseData.basicInfo.tags.includes(newTag.trim())) {
      setCourseData({
        ...courseData,
        basicInfo: {
          ...courseData.basicInfo,
          tags: [...courseData.basicInfo.tags, newTag.trim()]
        }
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData({
      ...courseData,
      basicInfo: {
        ...courseData.basicInfo,
        tags: courseData.basicInfo.tags.filter(tag => tag !== tagToRemove)
      }
    });
  };

  const addPrerequisite = () => {
    if (newPrerequisite.trim()) {
      setCourseData({
        ...courseData,
        requirements: {
          ...courseData.requirements,
          prerequisites: [...courseData.requirements.prerequisites, newPrerequisite.trim()]
        }
      });
      setNewPrerequisite('');
    }
  };

  const addOutcome = () => {
    if (newOutcome.trim()) {
      setCourseData({
        ...courseData,
        requirements: {
          ...courseData.requirements,
          learningOutcomes: [...courseData.requirements.learningOutcomes, newOutcome.trim()]
        }
      });
      setNewOutcome('');
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 course-creation-wizard">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2" style={{color: 'black !important'}}>Create Your Course</h1>
              <p className="text-black font-medium" style={{color: 'black !important'}}>Build a world-class course with our step-by-step wizard</p>
              
              {/* Course Status and Save Info */}
              {courseId && (
                <div className="flex items-center gap-4 mt-2">
                  <Badge 
                    variant={courseStatus === 'published' ? 'default' : courseStatus === 'draft' ? 'secondary' : 'outline'}
                    className={`${
                      courseStatus === 'published' ? 'bg-green-100 text-green-800' :
                      courseStatus === 'draft' ? 'bg-blue-100 text-blue-800' :
                      courseStatus === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {courseStatus.charAt(0).toUpperCase() + courseStatus.slice(1)}
                  </Badge>
                  {lastSaved && (
                    <span className="text-sm text-gray-500">
                      Last saved: {lastSaved.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setShowCourseManager(true)}
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                My Courses ({myCourses.length})
              </Button>
              
              {courseData.basicInfo.title && (
                <Button
                  onClick={saveDraft}
                  disabled={isSaving}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Save className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Draft
                    </>
                  )}
                </Button>
              )}
              
              {currentStep === steps.length && courseData.basicInfo.title && (
                <Button
                  onClick={publishCourse}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Send className="h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Publish Course
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-black" style={{color: 'black !important'}}>
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-black" style={{color: 'black !important'}}>
              {Math.round(getProgress())}% Complete
            </span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentStep === step.id
                    ? 'bg-blue-100 text-blue-700'
                    : currentStep > step.id
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <step.icon className="h-4 w-4" />
                <span className="text-sm font-bold text-black whitespace-nowrap" style={{color: 'black !important'}}>{step.title}</span>
                {currentStep > step.id && <CheckCircle className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-black">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="text-black font-bold" style={{color: 'black !important'}}>AI Course Assistant</span>
              </CardTitle>
              <CardDescription className="text-black font-medium" style={{color: 'black !important'}}>
                Let AI help you create your course structure and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                    Describe your course idea
                  </label>
                  <Textarea
                    placeholder="e.g., A comprehensive course on machine learning for beginners covering Python, algorithms, and real-world applications..."
                    value={aiPrompt}
                    onChange={(e) => setAIPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt.trim() || isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Generating Course...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step Content */}
        <Card>
          <CardHeader>
                          <CardTitle className="flex items-center space-x-2 text-black">
                {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
                <span className="text-black font-bold" style={{color: 'black !important'}}>{steps[currentStep - 1].title}</span>
              </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Course Title *
                    </label>
                    <Input
                      placeholder="Enter your course title"
                      value={courseData.basicInfo.title}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, title: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Subtitle
                    </label>
                    <Input
                      placeholder="Brief description of your course"
                      value={courseData.basicInfo.subtitle}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, subtitle: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                    Description *
                  </label>
                  <Textarea
                    placeholder="Detailed description of what students will learn..."
                    value={courseData.basicInfo.description}
                    onChange={(e) => setCourseData({
                      ...courseData,
                      basicInfo: { ...courseData.basicInfo, description: e.target.value }
                    })}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Category *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={courseData.basicInfo.category}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, category: e.target.value }
                      })}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Level *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={courseData.basicInfo.level}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, level: e.target.value as any }
                      })}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Language *
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={courseData.basicInfo.language}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, language: e.target.value }
                      })}
                    >
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {courseData.basicInfo.tags.map((tag, index) => (
                      <Badge key={index} className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button onClick={addTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pricing */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Price ($) *
                    </label>
                    <Input
                      type="number"
                      placeholder="99.99"
                      value={courseData.pricing.price}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        pricing: { ...courseData.pricing, price: parseFloat(e.target.value) || 0 }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2" style={{color: 'black !important'}}>
                      Original Price ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="149.99"
                      value={courseData.pricing.originalPrice || ''}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        pricing: { 
                          ...courseData.pricing, 
                          originalPrice: parseFloat(e.target.value) || undefined 
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasDiscount"
                    checked={courseData.pricing.hasDiscount}
                    onChange={(e) => setCourseData({
                      ...courseData,
                      pricing: { ...courseData.pricing, hasDiscount: e.target.checked }
                    })}
                  />
                  <label htmlFor="hasDiscount" className="text-sm font-bold text-black" style={{color: 'black !important'}}>
                    Offer limited-time discount
                  </label>
                </div>

                {courseData.pricing.hasDiscount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount End Date
                    </label>
                    <Input
                      type="date"
                      onChange={(e) => setCourseData({
                        ...courseData,
                        pricing: { 
                          ...courseData.pricing, 
                          discountEndDate: new Date(e.target.value) 
                        }
                      })}
                    />
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Pricing Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Research competitor prices in your category</li>
                    <li>• Consider your course value and content quality</li>
                    <li>• Start with a competitive price and adjust based on demand</li>
                    <li>• Offer discounts to attract early students</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Course Content */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Course Content Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Add sections and lessons to structure your course content
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Section
                  </Button>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Content Tips</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Start with an introduction section</li>
                    <li>• Break content into digestible lessons</li>
                    <li>• Include practical exercises and projects</li>
                    <li>• End with a conclusion and next steps</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Requirements */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prerequisites
                  </label>
                  <div className="space-y-2 mb-4">
                    {courseData.requirements.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{prereq}</span>
                        <X
                          className="h-4 w-4 text-red-500 cursor-pointer"
                          onClick={() => {
                            const newPrereqs = courseData.requirements.prerequisites.filter((_, i) => i !== index);
                            setCourseData({
                              ...courseData,
                              requirements: { ...courseData.requirements, prerequisites: newPrereqs }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a prerequisite"
                      value={newPrerequisite}
                      onChange={(e) => setNewPrerequisite(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addPrerequisite()}
                    />
                    <Button onClick={addPrerequisite} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Outcomes
                  </label>
                  <div className="space-y-2 mb-4">
                    {courseData.requirements.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <TargetIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{outcome}</span>
                        <X
                          className="h-4 w-4 text-red-500 cursor-pointer"
                          onClick={() => {
                            const newOutcomes = courseData.requirements.learningOutcomes.filter((_, i) => i !== index);
                            setCourseData({
                              ...courseData,
                              requirements: { ...courseData.requirements, learningOutcomes: newOutcomes }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a learning outcome"
                      value={newOutcome}
                      onChange={(e) => setNewOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addOutcome()}
                    />
                    <Button onClick={addOutcome} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Media */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Thumbnail *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your course thumbnail</p>
                    <p className="text-sm text-gray-500 mb-4">Recommended: 1280x720px, JPG or PNG</p>
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promotional Video (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload a promotional video</p>
                    <p className="text-sm text-gray-500 mb-4">Max 2 minutes, MP4 format</p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Video
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Settings */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Course Features</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="certificate"
                          checked={courseData.settings.certificate}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, certificate: e.target.checked }
                          })}
                        />
                        <label htmlFor="certificate" className="text-sm font-medium text-gray-700">
                          Certificate of completion
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="downloadable"
                          checked={courseData.settings.downloadable}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, downloadable: e.target.checked }
                          })}
                        />
                        <label htmlFor="downloadable" className="text-sm font-medium text-gray-700">
                          Downloadable content
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="lifetimeAccess"
                          checked={courseData.settings.lifetimeAccess}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, lifetimeAccess: e.target.checked }
                          })}
                        />
                        <label htmlFor="lifetimeAccess" className="text-sm font-medium text-gray-700">
                          Lifetime access
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Course Visibility</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="mobileCompatible"
                          checked={courseData.settings.mobileCompatible}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, mobileCompatible: e.target.checked }
                          })}
                        />
                        <label htmlFor="mobileCompatible" className="text-sm font-medium text-gray-700">
                          Mobile compatible
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="allowReviews"
                          checked={courseData.settings.allowReviews}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, allowReviews: e.target.checked }
                          })}
                        />
                        <label htmlFor="allowReviews" className="text-sm font-medium text-gray-700">
                          Allow student reviews
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="privateCourse"
                          checked={courseData.settings.privateCourse}
                          onChange={(e) => setCourseData({
                            ...courseData,
                            settings: { ...courseData.settings, privateCourse: e.target.checked }
                          })}
                        />
                        <label htmlFor="privateCourse" className="text-sm font-medium text-gray-700">
                          Private course
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Review & Publish */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Ready to Publish!</h4>
                  <p className="text-sm text-green-800">
                    Your course looks great! Review the details below and publish when ready.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Course Information</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Title:</strong> {courseData.basicInfo.title}</div>
                      <div><strong>Category:</strong> {courseData.basicInfo.category}</div>
                      <div><strong>Level:</strong> {courseData.basicInfo.level}</div>
                      <div><strong>Language:</strong> {courseData.basicInfo.language}</div>
                      <div><strong>Price:</strong> ${courseData.pricing.price}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Course Features</h4>
                    <div className="space-y-2 text-sm">
                      <div>✅ Certificate: {courseData.settings.certificate ? 'Yes' : 'No'}</div>
                      <div>✅ Lifetime Access: {courseData.settings.lifetimeAccess ? 'Yes' : 'No'}</div>
                      <div>✅ Mobile Compatible: {courseData.settings.mobileCompatible ? 'Yes' : 'No'}</div>
                      <div>✅ Student Reviews: {courseData.settings.allowReviews ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Publish Course
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length}
          >
            {currentStep === steps.length ? (
              <>
                <Send className="h-4 w-4 mr-2" />
                Publish Course
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Course Manager Modal */}
      {showCourseManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">My Courses</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCourseManager(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      {course.media?.courseImage ? (
                        <img 
                          src={course.media.courseImage} 
                          alt={course.basicInfo.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge 
                          variant={course.status === 'published' ? 'default' : course.status === 'draft' ? 'secondary' : 'outline'}
                          className={`${
                            course.status === 'published' ? 'bg-green-100 text-green-800' :
                            course.status === 'draft' ? 'bg-blue-100 text-blue-800' :
                            course.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {course.progress ? `${course.progress}%` : '100%'}
                        </span>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{course.basicInfo.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.basicInfo.description}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <span>${course.pricing.price}</span>
                        <span>•</span>
                        <span>{course.content?.totalLessons || 0} lessons</span>
                        <span>•</span>
                        <span>{course.lastModified ? new Date(course.lastModified).toLocaleDateString() : 'N/A'}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => editCourse(course)}
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        
                        {course.status === 'published' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => pauseCourse(course.id)}
                              className="flex-1"
                            >
                              <Pause className="h-3 w-3 mr-1" />
                              Pause
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => unpublishCourse(course.id)}
                              className="flex-1"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Unpublish
                            </Button>
                          </>
                        )}
                        
                        {course.status === 'paused' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resumeCourse(course.id)}
                            className="flex-1"
                          >
                            <Play className="h-3 w-3 mr-1" />
                            Resume
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteCourse(course.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {myCourses.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h4>
                    <p className="text-gray-600 mb-4">Start creating your first course to get started!</p>
                    <Button onClick={() => setShowCourseManager(false)}>
                      Create New Course
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Draft Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Save Draft</h3>
              <p className="text-gray-600 mb-6">
                Your course progress will be saved as a draft. You can continue editing later.
              </p>
              <div className="flex gap-2">
                <Button onClick={saveDraft} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" onClick={() => setShowSaveModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCreationWizard;
