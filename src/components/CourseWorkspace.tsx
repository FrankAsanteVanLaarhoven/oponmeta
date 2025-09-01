import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Bookmark, 
  BookmarkCheck,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  X,
  CheckCircle,
  Star,
  Download,
  Share2,
  Settings,
  VolumeX,
  Volume1
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import { Course } from '@/data/coursesData';

interface CourseContent {
  id: string;
  title: string;
  content: string;
  duration: number; // in minutes
  type: 'text' | 'video' | 'quiz' | 'assignment';
}

interface Module {
  id: string;
  title: string;
  chapters: CourseContent[];
}

const CourseWorkspace: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [comments, setComments] = useState<Array<{id: string, text: string, timestamp: string}>>([]);
  const [newComment, setNewComment] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  // Mock course content structure
  const courseModules: Module[] = [
    {
      id: '1',
      title: 'Introduction to Healthcare',
      chapters: [
        {
          id: '1.1',
          title: 'What is Healthcare?',
          content: `Healthcare is a fundamental human right and a critical component of any society. It encompasses the prevention, diagnosis, treatment, and management of illness, injury, and other physical and mental impairments in people.

Healthcare professionals work in various settings including hospitals, clinics, nursing homes, schools, and community health centers. The field is constantly evolving with new technologies, treatments, and approaches to patient care.

Key aspects of healthcare include:
• Patient-centered care
• Evidence-based practice
• Continuous learning and professional development
• Ethical practice and patient confidentiality
• Interdisciplinary collaboration

As a healthcare professional, you'll be part of a team dedicated to improving people's lives and well-being. This is both a privilege and a responsibility that requires dedication, compassion, and ongoing commitment to excellence.`,
          duration: 15,
          type: 'text'
        },
        {
          id: '1.2',
          title: 'Roles in Healthcare',
          content: `The healthcare industry offers diverse career opportunities, each with unique responsibilities and requirements. Understanding these roles helps you choose the right path for your career goals.

Nursing Roles:
• Registered Nurse (RN): Provides direct patient care, administers medications, and coordinates care plans
• Licensed Practical Nurse (LPN): Assists RNs and provides basic patient care under supervision
• Nurse Practitioner (NP): Advanced practice nurse with prescribing authority and specialized training

Healthcare Assistant Roles:
• Certified Nursing Assistant (CNA): Provides basic patient care and support
• Medical Assistant: Assists physicians with clinical and administrative tasks
• Patient Care Technician: Specialized in specific areas like dialysis or phlebotomy

Other Healthcare Roles:
• Physician: Diagnoses and treats patients
• Physician Assistant: Practices medicine under physician supervision
• Physical Therapist: Helps patients recover movement and function
• Occupational Therapist: Assists patients with daily living activities

Each role requires different levels of education, certification, and training. Consider your interests, strengths, and career goals when choosing your path.`,
          duration: 20,
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      title: 'Educational Requirements',
      chapters: [
        {
          id: '2.1',
          title: 'Academic Prerequisites',
          content: `Educational requirements vary by role and location, but there are common prerequisites for most healthcare positions.

High School Requirements:
• High school diploma or GED
• Strong foundation in science (biology, chemistry, anatomy)
• Mathematics proficiency
• English communication skills
• Computer literacy

College/University Requirements:
• Associate's degree for LPN and some CNA programs
• Bachelor's degree for RN programs
• Master's degree for advanced practice roles
• Specific prerequisite courses (varies by program)

Common Prerequisite Courses:
• Anatomy and Physiology
• Microbiology
• Chemistry
• Psychology
• Statistics
• English Composition

Certification Requirements:
• State-specific licensing exams
• Continuing education requirements
• Background checks and drug screenings
• Immunization records

Research the specific requirements for your desired role and location, as they can vary significantly.`,
          duration: 18,
          type: 'text'
        }
      ]
    }
  ];

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }
  }, []);

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      if (courseId) {
        const courseData = await courseService.getCourseById(parseInt(courseId));
        setCourse(courseData);
      }
    };
    loadCourse();
  }, [courseId]);

  // Speech synthesis functions
  const startSpeaking = () => {
    if (!speechSynthesis) return;
    
    const currentContent = courseModules[currentModule]?.chapters[currentChapter];
    if (!currentContent) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentContent.content);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.lang = 'en-GB'; // UK accent
    utterance.volume = isMuted ? 0 : 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  // Navigation functions
  const goToPreviousChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentChapter(courseModules[currentModule - 1].chapters.length - 1);
    }
  };

  const goToNextChapter = () => {
    const currentModuleData = courseModules[currentModule];
    if (currentChapter < currentModuleData.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else if (currentModule < courseModules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentChapter(0);
    }
  };

  // Bookmark functions
  const toggleBookmark = () => {
    const currentContent = courseModules[currentModule]?.chapters[currentChapter];
    if (!currentContent) return;

    const bookmarkId = `${currentModule}-${currentChapter}`;
    if (bookmarks.includes(bookmarkId)) {
      setBookmarks(bookmarks.filter(id => id !== bookmarkId));
    } else {
      setBookmarks([...bookmarks, bookmarkId]);
    }
  };

  // Comment functions
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now().toString(),
      text: newComment,
      timestamp: new Date().toLocaleString()
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const currentContent = courseModules[currentModule]?.chapters[currentChapter];
  const isBookmarked = bookmarks.includes(`${currentModule}-${currentChapter}`);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a1834] flex items-center justify-center">
        <div className="text-white">Loading course...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1834] flex">
      {/* Collapsible Sidebar */}
      <div className={`bg-[#11204a] text-white transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-80'}`}>
        <div className="p-4 border-b border-[#16203a]">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold">{course.title}</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-white hover:bg-[#16203a]"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {!sidebarCollapsed && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Modules</h3>
            <div className="space-y-2">
              {courseModules.map((module, moduleIndex) => (
                <div key={module.id} className="space-y-1">
                  <button
                    onClick={() => setCurrentModule(moduleIndex)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      currentModule === moduleIndex 
                        ? 'bg-[#16203a] text-white' 
                        : 'text-gray-300 hover:bg-[#16203a]'
                    }`}
                  >
                    {module.title}
                  </button>
                  
                  {currentModule === moduleIndex && (
                    <div className="ml-4 space-y-1">
                      {module.chapters.map((chapter, chapterIndex) => (
                        <button
                          key={chapter.id}
                          onClick={() => setCurrentChapter(chapterIndex)}
                          className={`w-full text-left p-2 rounded text-xs transition-colors ${
                            currentChapter === chapterIndex 
                              ? 'bg-[#0a1834] text-white' 
                              : 'text-gray-400 hover:bg-[#16203a]'
                          }`}
                        >
                          {chapter.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#11204a] border-b border-[#16203a] p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">{course.title}</h1>
              <p className="text-sm text-gray-300">
                Module {currentModule + 1}: {courseModules[currentModule]?.title} - 
                Chapter {currentChapter + 1}: {currentContent?.title}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/student-portal')}
                className="border-[#16203a] text-white hover:bg-[#16203a]"
              >
                <Home className="h-4 w-4 mr-2" />
                Portal
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/courses')}
                className="border-[#16203a] text-white hover:bg-[#16203a]"
              >
                <Menu className="h-4 w-4 mr-2" />
                Courses
              </Button>
            </div>
          </div>
        </div>

        {/* Content and Tools */}
        <div className="flex-1 flex">
          {/* Media Screen */}
          <div className="flex-1 p-6">
            <Card className="bg-[#11204a] border-[#16203a] h-full">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{currentContent?.title}</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleBookmark}
                      className={`text-white hover:bg-[#16203a] ${
                        isBookmarked ? 'text-yellow-400' : ''
                      }`}
                    >
                      {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotes(!showNotes)}
                      className="text-white hover:bg-[#16203a]"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments(!showComments)}
                      className="text-white hover:bg-[#16203a]"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Media Controls */}
                <div className="flex items-center justify-center space-x-4 bg-[#16203a] p-4 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToPreviousChapter}
                    disabled={currentModule === 0 && currentChapter === 0}
                    className="text-white hover:bg-[#0a1834] disabled:opacity-50"
                  >
                    <SkipBack className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isSpeaking ? stopSpeaking : startSpeaking}
                    className="text-white hover:bg-[#0a1834]"
                  >
                    {isSpeaking ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToNextChapter}
                    disabled={currentModule === courseModules.length - 1 && 
                             currentChapter === courseModules[currentModule].chapters.length - 1}
                    className="text-white hover:bg-[#0a1834] disabled:opacity-50"
                  >
                    <SkipForward className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:bg-[#0a1834]"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume1 className="h-4 w-4" />}
                  </Button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg p-6 text-gray-800 leading-relaxed">
                  <div className="prose max-w-none">
                    {currentContent?.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>
                    Chapter {currentChapter + 1} of {courseModules[currentModule]?.chapters.length}
                  </span>
                  <span>
                    Module {currentModule + 1} of {courseModules.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learner Tools Sidebar */}
          {(showNotes || showComments) && (
            <div className="w-80 bg-[#11204a] border-l border-[#16203a] p-4">
              {showNotes && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Notes</h3>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Take notes here..."
                    className="bg-[#16203a] border-[#0a1834] text-white placeholder-gray-400 min-h-[200px]"
                  />
                  <Button className="w-full bg-[#0a1834] hover:bg-[#16203a] text-white">
                    Save Notes
                  </Button>
                </div>
              )}

              {showComments && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Comments & Questions</h3>
                  
                  <div className="space-y-2">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment or question..."
                      className="bg-[#16203a] border-[#0a1834] text-white placeholder-gray-400"
                    />
                    <Button 
                      onClick={addComment}
                      className="w-full bg-[#0a1834] hover:bg-[#16203a] text-white"
                    >
                      Add Comment
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-[#16203a] p-3 rounded-lg">
                        <p className="text-white text-sm">{comment.text}</p>
                        <p className="text-gray-400 text-xs mt-1">{comment.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseWorkspace; 