import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  Save, 
  Eye, 
  Share, 
  X, 
  Type, 
  Image, 
  Video, 
  Mic, 
  FileText, 
  MousePointer, 
  Square, 
  Grid,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Copy,
  Download,
  Settings,
  Play,
  Pause,
  Volume2,
  Upload,
  Palette,
  Move,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Layers,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Star,
  Globe,
  Target,
  BookOpen,
  GraduationCap,
  Briefcase,
  Shield,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CourseElement {
  id: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'quiz' | 'button' | 'shape' | 'layout';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  style: any;
}

interface CourseSlide {
  id: string;
  elements: CourseElement[];
  background: string;
  animation: string;
}

interface CourseTemplate {
  id: string;
  name: string;
  category: string;
  slides: number;
  interactive: boolean;
  image: string;
  description: string;
  elements: CourseElement[];
}

const CourseAuthoringTool = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<CourseSlide[]>([
    {
      id: '1',
      elements: [],
      background: '#ffffff',
      animation: 'fade-in'
    }
  ]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showTemplates, setShowTemplates] = useState(false);
  const [courseTitle, setCourseTitle] = useState('Untitled Course');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('education');
  const [coursePrice, setCoursePrice] = useState(0);
  const [isPublished, setIsPublished] = useState(false);

  const templates: CourseTemplate[] = [
    {
      id: 'corporate-training',
      name: 'Corporate Training',
      category: 'Business',
      slides: 12,
      interactive: true,
      image: '/images/corporate-training.jpg',
      description: 'Professional training template for corporate environments',
      elements: [
        {
          id: 'title-1',
          type: 'text',
          content: { text: 'Corporate Training Course', fontSize: 32, fontWeight: 'bold' },
          position: { x: 100, y: 50 },
          size: { width: 400, height: 50 },
          style: { color: '#1e40af', textAlign: 'center' }
        },
        {
          id: 'subtitle-1',
          type: 'text',
          content: { text: 'Professional Development & Skills Enhancement', fontSize: 18 },
          position: { x: 100, y: 120 },
          size: { width: 400, height: 30 },
          style: { color: '#6b7280', textAlign: 'center' }
        }
      ]
    },
    {
      id: 'product-demo',
      name: 'Product Demo',
      category: 'Marketing',
      slides: 8,
      interactive: true,
      image: '/images/product-demo.jpg',
      description: 'Showcase your products with interactive demonstrations',
      elements: [
        {
          id: 'title-2',
          type: 'text',
          content: { text: 'Product Demonstration', fontSize: 32, fontWeight: 'bold' },
          position: { x: 100, y: 50 },
          size: { width: 400, height: 50 },
          style: { color: '#dc2626', textAlign: 'center' }
        }
      ]
    },
    {
      id: 'technical-tutorial',
      name: 'Technical Tutorial',
      category: 'Education',
      slides: 15,
      interactive: true,
      image: '/images/technical-tutorial.jpg',
      description: 'Step-by-step technical learning with code examples',
      elements: [
        {
          id: 'title-3',
          type: 'text',
          content: { text: 'Technical Tutorial', fontSize: 32, fontWeight: 'bold' },
          position: { x: 100, y: 50 },
          size: { width: 400, height: 50 },
          style: { color: '#059669', textAlign: 'center' }
        }
      ]
    },
    {
      id: 'safety-training',
      name: 'Safety Training',
      category: 'Compliance',
      slides: 10,
      interactive: true,
      image: '/images/safety-training.jpg',
      description: 'Comprehensive safety and compliance training',
      elements: [
        {
          id: 'title-4',
          type: 'text',
          content: { text: 'Safety Training Course', fontSize: 32, fontWeight: 'bold' },
          position: { x: 100, y: 50 },
          size: { width: 400, height: 50 },
          style: { color: '#ea580c', textAlign: 'center' }
        }
      ]
    }
  ];

  const courseElements = [
    {
      type: 'text',
      icon: <Type className="w-6 h-6" />,
      label: 'Text',
      description: 'Add text blocks and headings'
    },
    {
      type: 'image',
      icon: <Image className="w-6 h-6" />,
      label: 'Image',
      description: 'Insert images and graphics'
    },
    {
      type: 'video',
      icon: <Video className="w-6 h-6" />,
      label: 'Video',
      description: 'Embed video content'
    },
    {
      type: 'audio',
      icon: <Mic className="w-6 h-6" />,
      label: 'Audio',
      description: 'Add audio narration'
    },
    {
      type: 'quiz',
      icon: <FileText className="w-6 h-6" />,
      label: 'Quiz',
      description: 'Interactive assessments'
    },
    {
      type: 'button',
      icon: <MousePointer className="w-6 h-6" />,
      label: 'Button',
      description: 'Navigation buttons'
    },
    {
      type: 'shape',
      icon: <Square className="w-6 h-6" />,
      label: 'Shape',
      description: 'Geometric shapes'
    },
    {
      type: 'layout',
      icon: <Grid className="w-6 h-6" />,
      label: 'Layout',
      description: 'Layout containers'
    }
  ];

  const addElement = (type: string) => {
    const newElement: CourseElement = {
      id: `${type}-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
      position: { x: 100, y: 100 },
      size: { width: 200, height: 100 },
      style: getDefaultStyle(type)
    };

    const updatedSlides = [...slides];
    updatedSlides[currentSlide].elements.push(newElement);
    setSlides(updatedSlides);
    setSelectedElement(newElement.id);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} element added`);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'Enter your text here', fontSize: 16, fontWeight: 'normal' };
      case 'image':
        return { src: '/placeholder.svg', alt: 'Image' };
      case 'video':
        return { src: '', controls: true, autoplay: false };
      case 'audio':
        return { src: '', controls: true, autoplay: false };
      case 'quiz':
        return { question: 'Enter your question', options: ['Option 1', 'Option 2', 'Option 3'], correctAnswer: 0 };
      case 'button':
        return { text: 'Click Me', action: 'next' };
      case 'shape':
        return { shape: 'rectangle', color: '#3b82f6' };
      case 'layout':
        return { columns: 2, rows: 2 };
      default:
        return {};
    }
  };

  const getDefaultStyle = (type: string) => {
    switch (type) {
      case 'text':
        return { color: '#000000', textAlign: 'left', fontFamily: 'Arial' };
      case 'image':
        return { borderRadius: '8px', objectFit: 'cover' };
      case 'video':
        return { borderRadius: '8px' };
      case 'audio':
        return { borderRadius: '8px' };
      case 'quiz':
        return { backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '8px' };
      case 'button':
        return { backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px', borderRadius: '6px' };
      case 'shape':
        return { backgroundColor: '#3b82f6', borderRadius: '4px' };
      case 'layout':
        return { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' };
      default:
        return {};
    }
  };

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId);
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const element = slides[currentSlide].elements.find(el => el.id === elementId);
    if (!element) return;

    setDragOffset({
      x: e.clientX - rect.left - element.position.x,
      y: e.clientY - rect.top - element.position.y
    });
    setIsDragging(true);
    setSelectedElement(elementId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    const updatedSlides = [...slides];
    const elementIndex = updatedSlides[currentSlide].elements.findIndex(el => el.id === selectedElement);
    if (elementIndex !== -1) {
      updatedSlides[currentSlide].elements[elementIndex].position = { x: newX, y: newY };
      setSlides(updatedSlides);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const deleteElement = () => {
    if (!selectedElement) return;

    const updatedSlides = [...slides];
    updatedSlides[currentSlide].elements = updatedSlides[currentSlide].elements.filter(el => el.id !== selectedElement);
    setSlides(updatedSlides);
    setSelectedElement(null);
    toast.success('Element deleted');
  };

  const addSlide = () => {
    const newSlide: CourseSlide = {
      id: (slides.length + 1).toString(),
      elements: [],
      background: '#ffffff',
      animation: 'fade-in'
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
    toast.success('New slide added');
  };

  const useTemplate = (template: CourseTemplate) => {
    setSlides([{
      id: '1',
      elements: template.elements,
      background: '#ffffff',
      animation: 'fade-in'
    }]);
    setCourseTitle(template.name + ' Course');
    setCourseDescription(template.description);
    setShowTemplates(false);
    toast.success(`Template "${template.name}" applied`);
  };

  const saveCourse = () => {
    const courseData = {
      id: Date.now().toString(),
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      price: coursePrice,
      slides,
      createdAt: new Date().toISOString(),
      isPublished: false
    };

    const existingCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    existingCourses.push(courseData);
    localStorage.setItem('courses', JSON.stringify(existingCourses));
    
    toast.success('Course saved successfully');
  };

  const publishCourse = () => {
    if (!courseTitle || !courseDescription) {
      toast.error('Please fill in course title and description');
      return;
    }

    const courseData = {
      id: Date.now().toString(),
      title: courseTitle,
      description: courseDescription,
      category: courseCategory,
      price: coursePrice,
      slides,
      createdAt: new Date().toISOString(),
      isPublished: true,
      publishedAt: new Date().toISOString()
    };

    const existingCourses = JSON.parse(localStorage.getItem('publishedCourses') || '[]');
    existingCourses.push(courseData);
    localStorage.setItem('publishedCourses', JSON.stringify(existingCourses));
    
    setIsPublished(true);
    toast.success('Course published successfully! Students can now view and purchase it.');
  };

  const renderElement = (element: CourseElement) => {
    const isSelected = selectedElement === element.id;
    const elementStyle = {
      position: 'absolute' as const,
      left: element.position.x,
      top: element.position.y,
      width: element.size.width,
      height: element.size.height,
      cursor: isDragging ? 'grabbing' : 'grab',
      border: isSelected ? '2px solid #3b82f6' : '1px solid transparent',
      ...element.style
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="bg-white p-2 rounded"
          >
            <div style={{ fontSize: element.content.fontSize, fontWeight: element.content.fontWeight }}>
              {element.content.text}
            </div>
          </div>
        );
      case 'image':
        return (
          <img
            key={element.id}
            src={element.content.src}
            alt={element.content.alt}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="rounded"
          />
        );
      case 'video':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="rounded bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center cursor-pointer"
          >
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-medium">Video Element</p>
              <p className="text-xs opacity-75">Click to edit</p>
            </div>
          </div>
        );
      case 'button':
        return (
          <button
            key={element.id}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="rounded"
          >
            {element.content.text}
          </button>
        );
      case 'shape':
        return (
          <div
            key={element.id}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="rounded"
          />
        );
      default:
        return (
          <div
            key={element.id}
            style={elementStyle}
            onClick={() => handleElementClick(element.id)}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            className="bg-gray-200 rounded flex items-center justify-center"
          >
            {element.type}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/course-authoring')}
              className="text-white hover:bg-blue-600/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Landing
            </Button>
            <div className="h-6 w-px bg-gray-600" />
            <h1 className="text-2xl font-bold">Course Authoring Tool</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={saveCourse}
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              onClick={() => setShowTemplates(true)}
              className="bg-white text-green-700 hover:bg-gray-100"
            >
              <Eye className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button
              onClick={publishCourse}
              disabled={isPublished}
              className="bg-white text-purple-700 hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500"
            >
              <Share className="w-4 h-4 mr-2" />
              {isPublished ? 'Published' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>

      {/* Course Info Bar */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Course Title"
            className="max-w-xs text-black"
          />
          <Select value={courseCategory} onValueChange={setCourseCategory}>
            <SelectTrigger className="w-48 text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="creative">Creative Arts</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(Number(e.target.value))}
            placeholder="Price (£)"
            className="w-24 text-black"
          />
          {isPublished && (
            <Badge className="bg-green-600 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Published
            </Badge>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Left Panel - Course Elements */}
        <div className="w-64 bg-white border-r p-4 overflow-y-auto">
          <h3 className="font-semibold text-black mb-4">Course Elements</h3>
          <div className="space-y-2">
            {courseElements.map((element) => (
              <div
                key={element.type}
                onClick={() => addElement(element.type)}
                className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="text-gray-600">{element.icon}</div>
                <div>
                  <div className="font-medium text-black">{element.label}</div>
                  <div className="text-sm text-gray-600">{element.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Course Canvas */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Header */}
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-black">Course Editor</h3>
              <Badge variant="secondary" className="text-black">
                Slide {currentSlide + 1} of {slides.length}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-black border-gray-300 hover:bg-gray-50">
                <RotateCw className="w-4 h-4 mr-2" />
                Undo
              </Button>
              <Button variant="outline" size="sm" className="text-black border-gray-300 hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="text-black border-gray-300 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-gray-100 p-8 overflow-auto">
            <div
              ref={canvasRef}
              className="bg-white mx-auto shadow-lg rounded-lg relative"
              style={{
                width: '800px',
                height: '600px',
                background: slides[currentSlide].background
              }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {slides[currentSlide].elements.map(renderElement)}
              
              {slides[currentSlide].elements.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <Layers className="w-16 h-16 mb-4" />
                  <div className="text-lg font-medium mb-2 text-black">Course Canvas</div>
                  <div className="text-sm text-center max-w-xs text-gray-600">
                    Drag and drop elements from the left to design your course slide
                  </div>
                  <Button
                    onClick={() => setShowTemplates(true)}
                    className="mt-4"
                    variant="outline"
                  >
                    Select a Template
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Slide Navigation */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-10 h-10 rounded border flex items-center justify-center text-sm font-medium ${
                      currentSlide === index
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={addSlide}
                  className="w-10 h-10 rounded border border-gray-300 flex items-center justify-center text-black hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-64 bg-white border-l p-4 overflow-y-auto">
          <h3 className="font-semibold text-black mb-4">Properties</h3>
          
          {selectedElement ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black">Selected Element</span>
                <Button
                  onClick={deleteElement}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 border-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <label className="text-sm font-medium text-black">Position</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="number"
                    placeholder="X"
                    value={slides[currentSlide].elements.find(el => el.id === selectedElement)?.position.x || 0}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      const elementIndex = updatedSlides[currentSlide].elements.findIndex(el => el.id === selectedElement);
                      if (elementIndex !== -1) {
                        updatedSlides[currentSlide].elements[elementIndex].position.x = Number(e.target.value);
                        setSlides(updatedSlides);
                      }
                    }}
                    className="text-black"
                  />
                  <Input
                    type="number"
                    placeholder="Y"
                    value={slides[currentSlide].elements.find(el => el.id === selectedElement)?.position.y || 0}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      const elementIndex = updatedSlides[currentSlide].elements.findIndex(el => el.id === selectedElement);
                      if (elementIndex !== -1) {
                        updatedSlides[currentSlide].elements[elementIndex].position.y = Number(e.target.value);
                        setSlides(updatedSlides);
                      }
                    }}
                    className="text-black"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-black">Size</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input
                    type="number"
                    placeholder="Width"
                    value={slides[currentSlide].elements.find(el => el.id === selectedElement)?.size.width || 0}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      const elementIndex = updatedSlides[currentSlide].elements.findIndex(el => el.id === selectedElement);
                      if (elementIndex !== -1) {
                        updatedSlides[currentSlide].elements[elementIndex].size.width = Number(e.target.value);
                        setSlides(updatedSlides);
                      }
                    }}
                    className="text-black"
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    value={slides[currentSlide].elements.find(el => el.id === selectedElement)?.size.height || 0}
                    onChange={(e) => {
                      const updatedSlides = [...slides];
                      const elementIndex = updatedSlides[currentSlide].elements.findIndex(el => el.id === selectedElement);
                      if (elementIndex !== -1) {
                        updatedSlides[currentSlide].elements[elementIndex].size.height = Number(e.target.value);
                        setSlides(updatedSlides);
                      }
                    }}
                    className="text-black"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-black">Background</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {['#ffffff', '#3b82f6', '#10b981', '#f59e0b'].map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        const updatedSlides = [...slides];
                        updatedSlides[currentSlide].background = color;
                        setSlides(updatedSlides);
                      }}
                      className={`w-8 h-8 rounded border-2 ${
                        slides[currentSlide].background === color ? 'border-blue-600' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-black">Animation</label>
                <Select
                  value={slides[currentSlide].animation}
                  onValueChange={(value) => {
                    const updatedSlides = [...slides];
                    updatedSlides[currentSlide].animation = value;
                    setSlides(updatedSlides);
                  }}
                >
                  <SelectTrigger className="mt-1 text-black">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fade-in">Fade In</SelectItem>
                    <SelectItem value="slide-in">Slide In</SelectItem>
                    <SelectItem value="zoom-in">Zoom In</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-black">100+ Professional Templates</h2>
                <Button
                  onClick={() => setShowTemplates(false)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-gray-600 mt-2">
                Jump-start your course creation with templates for every industry and audience
              </p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <BookOpen className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-sm text-gray-600">{template.name}</div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-black">{template.category}</Badge>
                        <span className="text-sm text-gray-500">{template.slides} slides</span>
                      </div>
                      <h3 className="font-semibold text-black mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                      <Button
                        onClick={() => useTemplate(template)}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        Use This Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAuthoringTool;
