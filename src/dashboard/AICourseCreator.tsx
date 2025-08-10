import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Globe, ChevronDown, FileText, Youtube, Link, BookOpen, ListChecks, Video, Award, Users, MessageSquare, Bot, Save, Eye, Settings, CheckCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import DashboardBackButton from "@/components/ui/DashboardBackButton";
import { courseService, CourseFormData } from '@/services/courseService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Stepper UI
const steps = [
  { label: 'Describe', icon: BookOpen },
  { label: 'Train AI', icon: Upload },
  { label: 'Structure', icon: ListChecks },
  { label: 'Generate & Review', icon: Award },
];

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ar', label: 'العربية' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
];

const COURSE_CATEGORIES = [
  'Technology and Digital Skills',
  'Data and Analytics',
  'Health and Healthcare Innovation',
  'Business, Strategy and Innovation',
  'Professional Development and Leadership',
  'Design and Creative Media',
  'Education and Teaching',
  'Opontainment',
  'Engineering and Construction',
  'Agriculture and Food System',
  'Environment and Sustainability',
  'Marketing and Sales',
  'Finance and Accounting',
  'Language and Communication',
  'Personal Development',
  'Sports and Fitness',
  'Hospitality and Tourism',
  'Transport and Logistics',
];

const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Placeholder for multilingual content seed data
const MULTILINGUAL_EXAMPLES = {
  en: {
    title: 'New Mid-level Account Managers',
    description: 'This course is designed for new mid-level account managers to develop essential skills in project management, client relations, and strategic planning.',
    objectives: [
      'Understand the role of a mid-level account manager',
      'Develop project management skills',
      'Enhance client communication and relationship building',
      'Learn strategic planning and execution',
    ],
    tags: ['account management', 'project management', 'client relations'],
  },
  // ...add more languages as needed
};

const AICourseCreator = () => {
  const { language, setLanguage } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CourseFormData>({
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.',
    objectives: [
      'Master HTML5 and CSS3 fundamentals',
      'Learn JavaScript ES6+ and modern programming concepts',
      'Build responsive websites and web applications',
      'Develop full-stack applications with React and Node.js',
      'Deploy applications to production environments'
    ],
    tags: ['web development', 'javascript', 'react', 'node.js', 'full-stack'],
    category: 'Technology and Digital Skills',
    level: 'Beginner',
    price: 149,
    language: language,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    duration: '40-50 hours',
    lessonsCount: 25,
    certificate: true,
    accessType: 'paid',
    enrollmentLimit: 1000,
    files: [],
    website: '',
    youtube: '',
    structure: {
      objectives: 5,
      lessons: 25,
      topicsPerLesson: 3,
      quizzesPerLesson: 1,
      assignmentsPerLesson: 1,
      quizPassGrade: 50,
      assignmentPassGrade: 25,
      assignmentWordCount: 50,
      wordsPerTopic: 50,
      referencesPerLesson: 5,
    },
    outline: [],
    generated: null,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [showCoursePreview, setShowCoursePreview] = useState(false);

  // Stepper UI
  const Stepper = () => (
    <div className="flex items-center justify-center gap-8 my-8">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center border-2 ${i <= step ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-purple-500 border-purple-300'}`}>{i + 1}</div>
          <span className={`font-semibold ${i === step ? 'text-purple-700' : 'text-gray-500'}`}>{s.label}</span>
          {i < steps.length - 1 && <div className="w-8 h-0.5 bg-purple-200 mx-2" />}
        </div>
      ))}
    </div>
  );

  // Save course as draft
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const draftId = await courseService.saveDraft(form);
      toast.success('Course draft saved successfully!');
      console.log('Draft saved with ID:', draftId);
    } catch (error) {
      toast.error('Failed to save draft');
      console.error('Error saving draft:', error);
    } finally {
      setSaving(false);
    }
  };

  // Publish course
  const handlePublishCourse = async () => {
    setPublishing(true);
    try {
      const creatorId = 'current-user-id'; // This should come from user context
      const course = await courseService.createCourse(form, creatorId);
      await courseService.publishCourse(course.id);
      toast.success('Course published successfully!');
      navigate('/dashboard/courses');
    } catch (error) {
      toast.error('Failed to publish course');
      console.error('Error publishing course:', error);
    } finally {
      setPublishing(false);
    }
  };

  // Step 1: Describe (Enhanced)
  const DescribeStep = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Describe Your Course</h2>
          <p className="text-gray-600 mt-2">Tell us about your course and what students will learn</p>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map(l => (
              <SelectItem key={l.code} value={l.code}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
            <Input 
              placeholder="Enter a compelling course title" 
              value={form.title} 
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="text-lg"
            />
            <p className="text-sm text-gray-500 mt-1">Make it clear and engaging</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Description *</label>
            <Textarea 
              placeholder="Describe what students will learn and achieve in this course" 
              value={form.description} 
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
            />
            <p className="text-sm text-gray-500 mt-1">Be detailed and highlight key benefits</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
            <Textarea 
              placeholder="Enter learning objectives (one per line)&#10;Example:&#10;• Master HTML5 and CSS3 fundamentals&#10;• Learn JavaScript ES6+ concepts&#10;• Build responsive websites" 
              value={form.objectives.join('\n')} 
              onChange={e => setForm(f => ({ ...f, objectives: e.target.value.split('\n').filter(obj => obj.trim()) }))}
              rows={6}
            />
            <p className="text-sm text-gray-500 mt-1">What will students be able to do after completing this course?</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Tags</label>
            <Input 
              placeholder="web development, javascript, react, programming" 
              value={form.tags.join(', ')} 
              onChange={e => setForm(f => ({ ...f, tags: e.target.value.split(',').map(t => t.trim()).filter(tag => tag) }))} 
            />
            <p className="text-sm text-gray-500 mt-1">Comma-separated keywords for better discoverability</p>
          </div>
        </div>

        {/* Right Column - Settings */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={form.category} onValueChange={(value) => setForm(f => ({ ...f, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <Select value={form.level} onValueChange={(value) => setForm(f => ({ ...f, level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {COURSE_LEVELS.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (£)</label>
              <Input 
                type="number" 
                placeholder="149" 
                value={form.price} 
                onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <Input 
                placeholder="40-50 hours" 
                value={form.duration} 
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Lessons</label>
              <Input 
                type="number" 
                placeholder="25" 
                value={form.lessonsCount} 
                onChange={e => setForm(f => ({ ...f, lessonsCount: parseInt(e.target.value) || 0 }))} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enrollment Limit</label>
              <Input 
                type="number" 
                placeholder="1000" 
                value={form.enrollmentLimit} 
                onChange={e => setForm(f => ({ ...f, enrollmentLimit: parseInt(e.target.value) || 0 }))} 
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="certificate"
              checked={form.certificate}
              onChange={e => setForm(f => ({ ...f, certificate: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="certificate" className="text-sm font-medium text-gray-700">
              Include completion certificate
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Access Type</label>
            <Select value={form.accessType} onValueChange={(value) => setForm(f => ({ ...f, accessType: value as 'free' | 'paid' | 'subscription' }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select access type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid (One-time purchase)</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 pt-6 border-t">
        <Button variant="outline" onClick={handleSaveDraft} disabled={saving}>
          {saving ? 'Saving...' : 'Save as Draft'}
        </Button>
        <Button 
          onClick={() => setStep(1)} 
          disabled={!form.title || !form.description}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Continue to AI Training →
        </Button>
      </div>
    </div>
  );

  // Step 2: Train AI
  const TrainAIStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Optional: Train AI on existing content</h2>
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1"><FileText className="mr-2" /> Files</Button>
        <Button variant="outline" className="flex-1"><Link className="mr-2" /> Websites</Button>
        <Button variant="outline" className="flex-1"><Youtube className="mr-2" /> Youtube</Button>
      </div>
      <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center bg-purple-50">
        <Upload className="w-12 h-12 text-purple-400 mb-2" />
        <input type="file" multiple className="hidden" id="file-upload" onChange={e => setForm(f => ({ ...f, files: [...f.files, ...Array.from(e.target.files || [])] }))} />
        <label htmlFor="file-upload" className="text-purple-600 cursor-pointer">Drag & Drop to upload<br />or <span className="underline">Browse to upload</span></label>
        <div className="text-xs text-gray-500 mt-2">Supported File Types: .pdf, .txt, .docx, .csv</div>
        {form.files.length > 0 && <div className="mt-4 w-full"><b>Files:</b> {form.files.map((f: any) => f.name).join(', ')}</div>}
      </div>
      <Input placeholder="Paste website URL" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
      <Input placeholder="Paste Youtube URL" value={form.youtube} onChange={e => setForm(f => ({ ...f, youtube: e.target.value }))} />
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
        <Button onClick={() => setStep(2)}>Next</Button>
      </div>
    </div>
  );

  // Step 3: Structure
  const StructureStep = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Course Structure</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input type="number" min={1} max={10} value={form.structure.objectives} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, objectives: +e.target.value } }))} placeholder="Core Learning objectives" />
        <Input type="number" min={1} max={20} value={form.structure.lessons} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, lessons: +e.target.value } }))} placeholder="Lessons" />
        <Input type="number" min={1} max={10} value={form.structure.topicsPerLesson} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, topicsPerLesson: +e.target.value } }))} placeholder="Topics/Lesson" />
        <Input type="number" min={0} max={10} value={form.structure.quizzesPerLesson} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, quizzesPerLesson: +e.target.value } }))} placeholder="Quizzes/Lesson" />
        <Input type="number" min={0} max={10} value={form.structure.assignmentsPerLesson} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, assignmentsPerLesson: +e.target.value } }))} placeholder="Assignments/Lesson" />
        <Input type="number" min={0} max={100} value={form.structure.quizPassGrade} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, quizPassGrade: +e.target.value } }))} placeholder="Quiz pass grade" />
        <Input type="number" min={0} max={100} value={form.structure.assignmentPassGrade} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, assignmentPassGrade: +e.target.value } }))} placeholder="Assignment pass grade" />
        <Input type="number" min={0} max={1000} value={form.structure.assignmentWordCount} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, assignmentWordCount: +e.target.value } }))} placeholder="Assignment word count" />
        <Input type="number" min={0} max={1000} value={form.structure.wordsPerTopic} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, wordsPerTopic: +e.target.value } }))} placeholder="Words/Topic" />
        <Input type="number" min={0} max={20} value={form.structure.referencesPerLesson} onChange={e => setForm(f => ({ ...f, structure: { ...f.structure, referencesPerLesson: +e.target.value } }))} placeholder="References/Lesson" />
      </div>
      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
        <Button onClick={() => setStep(3)}>Next</Button>
      </div>
    </div>
  );

  // Step 4: Generate & Review (Enhanced)
  const GenerateStep = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Generate & Review Your Course</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generation Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">AI Course Generation</h3>
            <div className="space-y-4">
              <Button 
                onClick={async () => {
                  setLoading(true);
                  // Simulate AI generation
                  setTimeout(() => {
                    const generated = {
                      lessons: [
                        {
                          title: "Introduction to " + form.title,
                          content: "This lesson provides an overview of the course and sets expectations for what students will learn.",
                          duration: 15,
                          topics: ["Course Overview", "Learning Objectives", "Prerequisites"]
                        },
                        {
                          title: "Core Concepts",
                          content: "Deep dive into the fundamental concepts and principles covered in this course.",
                          duration: 30,
                          topics: ["Key Principles", "Best Practices", "Common Mistakes"]
                        },
                        {
                          title: "Practical Application",
                          content: "Hands-on exercises and real-world applications of the concepts learned.",
                          duration: 45,
                          topics: ["Case Studies", "Exercises", "Projects"]
                        }
                      ],
                      quizzes: [
                        {
                          title: "Knowledge Check",
                          questions: [
                            "What is the main objective of this course?",
                            "Which concept is most important for beginners?",
                            "How can you apply these skills in real-world scenarios?"
                          ]
                        }
                      ],
                      assignments: [
                        {
                          title: "Final Project",
                          description: "Create a comprehensive project that demonstrates mastery of the course content.",
                          requirements: ["Project proposal", "Implementation", "Documentation", "Presentation"]
                        }
                      ]
                    };
                    setGeneratedContent(generated);
                    setForm(f => ({ ...f, generated: { ...f, ai: true, content: generated } }));
                    setLoading(false);
                    toast.success('Course generated successfully!');
                  }, 3000);
                }} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Course with AI...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    Generate Course with AI
                  </div>
                )}
              </Button>

              {generatedContent && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Generated Content</h4>
                    <div className="text-green-600 text-sm font-medium">✓ Generated</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{generatedContent.lessons?.length || 0}</div>
                      <div className="text-sm text-gray-600">Lessons</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{generatedContent.quizzes?.length || 0}</div>
                      <div className="text-sm text-gray-600">Quizzes</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{generatedContent.assignments?.length || 0}</div>
                      <div className="text-sm text-gray-600">Assignments</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold mb-4">Course Actions</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => setShowCoursePreview(true)}
                className="w-full"
              >
                Preview Course
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSaveDraft} 
                disabled={saving}
                className="w-full"
              >
                {saving ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button 
                onClick={handlePublishCourse} 
                disabled={publishing || !generatedContent}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {publishing ? 'Publishing...' : 'Publish Course'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard/course-management')}
                className="w-full"
              >
                View All Courses
              </Button>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Course Preview</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{form.title}</h4>
                  <p className="text-sm text-gray-600">{form.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{form.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Level:</span>
                    <span className="ml-2 font-medium">{form.level}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Duration:</span>
                    <span className="ml-2 font-medium">{form.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <span className="ml-2 font-medium">£{form.price}</span>
                  </div>
                </div>

                {generatedContent && (
                  <div className="space-y-3">
                    <h5 className="font-semibold">Course Structure</h5>
                    {generatedContent.lessons?.map((lesson: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-sm text-gray-600">{lesson.duration} minutes</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
        <Button onClick={() => navigate('/instructor-portal')}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a1834] py-8">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-8">
        <DashboardBackButton />
        <Stepper />
        {step === 0 && <DescribeStep />}
        {step === 1 && <TrainAIStep />}
        {step === 2 && <StructureStep />}
        {step === 3 && <GenerateStep />}
      </div>

      {/* Course Preview Modal */}
      {showCoursePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Course Preview</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowCoursePreview(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Image */}
                <div>
                  <img 
                    src={form.image} 
                    alt={form.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                
                {/* Course Details */}
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold text-gray-900">{form.title}</h1>
                  <p className="text-gray-600">{form.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{form.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Level:</span>
                      <span className="ml-2 font-medium">{form.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <span className="ml-2 font-medium">{form.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Price:</span>
                      <span className="ml-2 font-medium text-green-600">£{form.price}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Learning Objectives:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {form.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {form.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {generatedContent && (
                    <div>
                      <h3 className="font-semibold mb-2">Course Structure:</h3>
                      <div className="space-y-2">
                        {generatedContent.lessons?.map((lesson: any, index: number) => (
                          <div key={index} className="bg-gray-50 p-3 rounded">
                            <div className="font-medium">Lesson {index + 1}: {lesson.title}</div>
                            <div className="text-sm text-gray-600">{lesson.duration} minutes</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCoursePreview(false)}
                >
                  Close Preview
                </Button>
                <Button 
                  onClick={handlePublishCourse}
                  disabled={publishing || !generatedContent}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {publishing ? 'Publishing...' : 'Publish This Course'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AICourseCreator; 