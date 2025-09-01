import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Users, 
  FolderOpen, 
  BookOpen, 
  Target, 
  Zap, 
  Award, 
  Calendar, 
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Delete,
  Eye,
  Clock,
  Star,
  CheckCircle,
  X,
  ArrowRight,
  MessageSquare,
  Bell,
  Settings,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Wallet,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Bookmark,
  Share,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  Volume2,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw,
  Settings as SettingsIcon,
  HelpCircle,
  MessageCircle,
  Star as StarIcon,
  Award as AwardIcon,
  Trophy,
  Medal,
  Crown,
  Target as TargetIcon,
  Brain,
  Palette,
  Layers,
  Wifi,
  Shield,
  Zap as ZapIcon,
  Globe as GlobeIcon,
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon,
  LineChart,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  BookOpen as BookOpenIcon,
  FolderOpen as FolderOpenIcon,
  Target as TargetIcon2,
  Zap as ZapIcon2,
  Award as AwardIcon2,
  Calendar as CalendarIcon2,
  Trash2 as Trash2Icon,
  FileText,
  Video,
  Image,
  Power
} from 'lucide-react';

// Announcements Widget
export const AnnouncementsWidget = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "New Course Available: Advanced JavaScript",
      content: "Learn advanced JavaScript concepts including ES6+, async/await, and modern frameworks.",
      priority: "high",
      date: "2024-01-15",
      read: false
    },
    {
      id: 2,
      title: "System Maintenance Notice",
      content: "Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM. Some features may be temporarily unavailable.",
      priority: "medium",
      date: "2024-01-14",
      read: false
    },
    {
      id: 3,
      title: "Holiday Schedule Update",
      content: "Platform will be closed for New Year's Day. All courses and features will be available on January 2nd.",
      priority: "low",
      date: "2024-01-10",
      read: true
    }
  ]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  const markAsRead = (id: number) => {
    setAnnouncements(prev => 
      prev.map(announcement => 
        announcement.id === id 
          ? { ...announcement, read: true }
          : announcement
      )
    );
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(prev => prev.filter(announcement => announcement.id !== id));
    setShowDeleteConfirm(null);
    toast.success('Announcement deleted successfully');
  };

  const handleViewAll = () => {
    navigate('/announcements');
  };

  const handleAnnouncementClick = (announcement: any) => {
    navigate(`/announcements/${announcement.id}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-white">Announcements</h3>
          {unreadCount > 0 && (
            <Badge className="bg-blue-600 text-white text-xs">{unreadCount}</Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={handleViewAll}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <Card 
            key={announcement.id} 
            className={`bg-gray-800 border-gray-700 ${!announcement.read ? 'border-l-4 border-l-blue-500' : ''} cursor-pointer hover:bg-gray-750 transition-colors`}
            onClick={() => handleAnnouncementClick(announcement)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={`${getPriorityColor(announcement.priority)} text-white text-xs`}>
                      {announcement.priority}
                    </Badge>
                    {!announcement.read && (
                      <Badge className="bg-blue-600 text-white text-xs">New</Badge>
                    )}
                  </div>
                  <h4 className="font-medium text-white text-sm mb-1">{announcement.title}</h4>
                  <p className="text-xs text-gray-300 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-400">{announcement.date}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {!announcement.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-400 hover:bg-blue-600/20"
                      onClick={() => markAsRead(announcement.id)}
                      title="Mark as read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:bg-red-600/20"
                    onClick={() => setShowDeleteConfirm(announcement.id)}
                    title="Delete announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">Delete Announcement?</h4>
            <p className="text-gray-300 text-sm mb-4">
              This action cannot be undone.
            </p>
            <div className="flex space-x-3 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteAnnouncement(showDeleteConfirm)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Instructors Widget
export const InstructorsWidget = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Web Development",
      rating: 4.9,
      students: 12500,
      courses: 8,
      avatar: "/avatars/sarah.jpg",
      status: "online",
      lastSeen: "2 minutes ago"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      specialty: "Data Science",
      rating: 4.8,
      students: 8900,
      courses: 6,
      avatar: "/avatars/mike.jpg",
      status: "offline",
      lastSeen: "1 hour ago"
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Digital Marketing",
      rating: 4.7,
      students: 6700,
      courses: 5,
      avatar: "/avatars/emma.jpg",
      status: "online",
      lastSeen: "5 minutes ago"
    }
  ]);

  const [showMessageModal, setShowMessageModal] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  const sendMessage = async (instructorId: number) => {
    if (!messageText.trim()) return;
    
    setSendingMessage(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Message sent to instructor ${instructorId}: ${messageText}`);
    setMessageText('');
    setShowMessageModal(null);
    setSendingMessage(false);
    toast.success('Message sent successfully!');
  };

  const handleViewAllInstructors = () => {
    navigate('/instructors');
  };

  const handleInstructorProfile = (instructorId: number) => {
    navigate(`/instructors/${instructorId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Top Instructors</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={handleViewAllInstructors}
        >
          View All
        </Button>
      </div>
      
      <div className="space-y-3">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(instructor.status)}`}></div>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{instructor.name}</h4>
                  <p className="text-sm text-gray-300">{instructor.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-300 ml-1">{instructor.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-300">{instructor.students} students</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {instructor.status === 'online' ? 'Online now' : `Last seen ${instructor.lastSeen}`}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-400 hover:bg-blue-600/20"
                    onClick={() => setShowMessageModal(instructor.id)}
                    disabled={instructor.status === 'offline'}
                    title={instructor.status === 'offline' ? 'Instructor is offline' : 'Send message'}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-400 hover:bg-green-600/20"
                    title="View profile"
                    onClick={() => handleInstructorProfile(instructor.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Send Message</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowMessageModal(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Textarea
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="mb-4 bg-gray-700 border-gray-600 text-white"
              rows={4}
            />
            <div className="flex space-x-3 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowMessageModal(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => sendMessage(showMessageModal)}
                disabled={sendingMessage || !messageText.trim()}
              >
                {sendingMessage ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Folders Widget
export const FoldersWidget = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Course Materials",
      files: 24,
      lastModified: "2 hours ago",
      type: "folder"
    },
    {
      id: 2,
      name: "Assignments",
      files: 8,
      lastModified: "1 day ago",
      type: "folder"
    },
    {
      id: 3,
      name: "Study Notes",
      files: 15,
      lastModified: "3 days ago",
      type: "folder"
    },
    {
      id: 4,
      name: "Certificates",
      files: 3,
      lastModified: "1 week ago",
      type: "folder"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showRenameModal, setShowRenameModal] = useState<number | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [renameFolderName, setRenameFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    
    setCreatingFolder(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFolder = {
      id: Date.now(),
      name: newFolderName.trim(),
      files: 0,
      lastModified: "Just now",
      type: "folder"
    };
    
    setFolders(prev => [newFolder, ...prev]);
    setNewFolderName('');
    setShowCreateModal(false);
    setCreatingFolder(false);
    console.log('Folder created:', newFolder);
  };

  const deleteFolder = (id: number) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
    setShowDeleteConfirm(null);
    console.log('Folder deleted:', id);
  };

  const renameFolder = async (id: number) => {
    if (!renameFolderName.trim()) return;
    
    setFolders(prev => 
      prev.map(folder => 
        folder.id === id 
          ? { ...folder, name: renameFolderName.trim(), lastModified: "Just now" }
          : folder
      )
    );
    
    setRenameFolderName('');
    setShowRenameModal(null);
    console.log('Folder renamed:', id, 'to', renameFolderName);
  };

  const openFolder = (folder: any) => {
    console.log('Opening folder:', folder.name);
    // In a real app, this would navigate to the folder contents
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">My Folders</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {folders.map((folder) => (
          <Card key={folder.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer group">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <FolderOpen className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{folder.name}</h4>
                  <p className="text-xs text-gray-300">{folder.files} files</p>
                  <p className="text-xs text-gray-400">{folder.lastModified}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white p-1 h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameFolderName(folder.name);
                      setShowRenameModal(folder.id);
                    }}
                    title="Rename folder"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300 p-1 h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(folder.id);
                    }}
                    title="Delete folder"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Folder Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Create New Folder</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCreateModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Enter folder name..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="mb-4 bg-gray-700 border-gray-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && createFolder()}
            />
            <div className="flex space-x-3 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={createFolder}
                disabled={creatingFolder || !newFolderName.trim()}
              >
                {creatingFolder ? 'Creating...' : 'Create Folder'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">Delete Folder?</h4>
            <p className="text-gray-300 text-sm mb-4">
              This action cannot be undone. All files in the folder will be permanently deleted.
            </p>
            <div className="flex space-x-3 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteFolder(showDeleteConfirm)}
              >
                Delete Folder
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rename Folder Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Rename Folder</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowRenameModal(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Enter new folder name..."
              value={renameFolderName}
              onChange={(e) => setRenameFolderName(e.target.value)}
              className="mb-4 bg-gray-700 border-gray-600 text-white"
              onKeyPress={(e) => e.key === 'Enter' && renameFolder(showRenameModal)}
            />
            <div className="flex space-x-3 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowRenameModal(null)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => renameFolder(showRenameModal)}
                disabled={!renameFolderName.trim()}
              >
                Rename Folder
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Learning Path Widget
export const LearningPathWidget = () => {
  const [learningPath] = useState([
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 100,
      completed: true,
      nextStep: "Advanced JavaScript"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 65,
      completed: false,
      nextStep: "React Framework"
    },
    {
      id: 3,
      title: "React Framework",
      progress: 0,
      completed: false,
      nextStep: "Full Stack Development"
    },
    {
      id: 4,
      title: "Full Stack Development",
      progress: 0,
      completed: false,
      nextStep: "Deployment & DevOps"
    }
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Learning Path</h3>
        <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
          View Full Path
        </Button>
      </div>
      
      <div className="space-y-3">
        {learningPath.map((step, index) => (
          <div key={step.id} className="relative">
            <Card className={`bg-gray-800 border-gray-700 ${step.completed ? 'border-l-4 border-l-green-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{step.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${step.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-300">{step.progress}%</span>
                    </div>
                    {step.progress > 0 && step.progress < 100 && (
                      <p className="text-xs text-gray-400 mt-1">Next: {step.nextStep}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            {index < learningPath.length - 1 && (
              <div className="absolute left-4 top-12 w-0.5 h-6 bg-gray-600"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Library Widget
export const LibraryWidget = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "JavaScript ES6+ Guide",
      type: "pdf",
      size: "2.3 MB",
      downloads: 1250,
      rating: 4.8,
      category: "Programming",
      tags: ["JavaScript", "ES6", "Guide"]
    },
    {
      id: 2,
      title: "React Best Practices",
      type: "video",
      size: "45.2 MB",
      downloads: 890,
      rating: 4.9,
      category: "Frontend",
      tags: ["React", "Best Practices", "Frontend"]
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      type: "pdf",
      size: "1.8 MB",
      downloads: 670,
      rating: 4.7,
      category: "Design",
      tags: ["CSS", "Grid", "Layout"]
    },
    {
      id: 4,
      title: "Node.js Fundamentals",
      type: "video",
      size: "67.1 MB",
      downloads: 445,
      rating: 4.6,
      category: "Backend",
      tags: ["Node.js", "Backend", "JavaScript"]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloading, setDownloading] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'Programming', 'Frontend', 'Backend', 'Design', 'Database'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const downloadResource = async (resourceId: number) => {
    setDownloading(resourceId);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update download count
    setResources(prev => 
      prev.map(resource => 
        resource.id === resourceId 
          ? { ...resource, downloads: resource.downloads + 1 }
          : resource
      )
    );
    
    setDownloading(null);
    console.log(`Downloaded resource: ${resourceId}`);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-400" />;
      case 'video': return <Video className="w-5 h-5 text-blue-400" />;
      case 'audio': return <Volume2 className="w-5 h-5 text-green-400" />;
      case 'image': return <Image className="w-5 h-5 text-purple-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Resource Library</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-700">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <Input
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white"
        />
        
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category ? "bg-blue-600" : "text-white border-gray-600 hover:bg-gray-700"}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {filteredResources.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">No resources found</p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <Card key={resource.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                      {getFileIcon(resource.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{resource.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-300">{resource.size}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <div className="flex items-center">
                          <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-300 ml-1">{resource.rating}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-300">{resource.downloads} downloads</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className="bg-gray-600 text-gray-300 text-xs">{resource.category}</Badge>
                        {resource.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} className="bg-blue-600 text-white text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-400 hover:bg-blue-600/20"
                      onClick={() => downloadResource(resource.id)}
                      disabled={downloading === resource.id}
                    >
                      {downloading === resource.id ? (
                        <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:bg-gray-700"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Ready to Use Courses Widget
export const ReadyToUseCoursesWidget = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Complete React Course",
      instructor: "Max Johnson",
      duration: "12 hours",
      students: 8500,
      rating: 4.9,
      price: 89.99,
      originalPrice: 129.99,
      image: "/courses/react.jpg",
      enrolled: false,
      category: "Frontend",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Dr. Lisa Wang",
      duration: "18 hours",
      students: 6200,
      rating: 4.8,
      price: 79.99,
      originalPrice: 99.99,
      image: "/courses/python.jpg",
      enrolled: false,
      category: "Data Science",
      level: "Beginner"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Alex Chen",
      duration: "15 hours",
      students: 4300,
      rating: 4.7,
      price: 69.99,
      originalPrice: 89.99,
      image: "/courses/design.jpg",
      enrolled: false,
      category: "Design",
      level: "Advanced"
    }
  ]);

  const [enrolling, setEnrolling] = useState<number | null>(null);
  const [showCoursePreview, setShowCoursePreview] = useState<number | null>(null);

  const enrollInCourse = async (courseId: number) => {
    setEnrolling(courseId);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update enrollment status
    setCourses(prev => 
      prev.map(course => 
        course.id === courseId 
          ? { ...course, enrolled: true, students: course.students + 1 }
          : course
      )
    );
    
    setEnrolling(courseId);
    console.log(`Enrolled in course: ${courseId}`);
    toast.success('Successfully enrolled in course!');
    navigate(`/course/${courseId}`);
  };

  const handleViewAllCourses = () => {
    navigate('/course-browsing');
  };

  const handleCoursePreview = (courseId: number) => {
    navigate(`/course/${courseId}/preview`);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-600';
      case 'Intermediate': return 'bg-yellow-600';
      case 'Advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'bg-blue-600';
      case 'Data Science': return 'bg-purple-600';
      case 'Design': return 'bg-pink-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Ready to Use Courses</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={handleViewAllCourses}
        >
          Browse All
        </Button>
      </div>
      
      <div className="space-y-3">
        {courses.map((course) => (
          <Card key={course.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center">
                  <Play className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm">{course.title}</h4>
                  <p className="text-xs text-gray-300">by {course.instructor}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-300">{course.duration}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <div className="flex items-center">
                      <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-300 ml-1">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-300">{course.students} students</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getCategoryColor(course.category)} text-white text-xs`}>
                      {course.category}
                    </Badge>
                    <Badge className={`${getLevelColor(course.level)} text-white text-xs`}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-white">${course.price}</span>
                    <span className="text-xs text-gray-400 line-through">${course.originalPrice}</span>
                  </div>
                  {course.enrolled ? (
                    <Badge className="bg-green-600 text-white text-xs mt-1">Enrolled</Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      className="mt-1 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => enrollInCourse(course.id)}
                      disabled={enrolling === course.id}
                    >
                      {enrolling === course.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Enroll'
                      )}
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-1 text-gray-400 hover:text-white"
                    onClick={() => setShowCoursePreview(course.id)}
                    title="Preview course"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Preview Modal */}
      {showCoursePreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Course Preview</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCoursePreview(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {(() => {
              const course = courses.find(c => c.id === showCoursePreview);
              if (!course) return null;
              
              return (
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gray-700 rounded flex items-center justify-center">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium text-lg">{course.title}</h5>
                    <p className="text-gray-300 text-sm">by {course.instructor}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Duration</p>
                      <p className="text-white text-sm">{course.duration}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Level</p>
                      <p className="text-white text-sm">{course.level}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Category</p>
                      <p className="text-white text-sm">{course.category}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Students</p>
                      <p className="text-white text-sm">{course.students}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm ml-1">{course.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-300 text-sm">{course.students} students enrolled</span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-white">${course.price}</span>
                        <span className="text-gray-400 line-through">${course.originalPrice}</span>
                      </div>
                      {!course.enrolled && (
                        <Button 
                          size="sm" 
                          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            enrollInCourse(course.id);
                            setShowCoursePreview(null);
                          }}
                          disabled={enrolling === course.id}
                        >
                          {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

// Learning Automations Widget
export const AutomationWidget = () => {
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: "Daily Study Reminder",
      description: "Sends daily notifications to continue learning",
      schedule: "Daily at 9:00 AM",
      status: "active",
      type: "reminder",
      lastTriggered: "2024-01-15 9:00 AM",
      nextTrigger: "2024-01-16 9:00 AM"
    },
    {
      id: 2,
      name: "Progress Report",
      description: "Weekly progress summary sent to email",
      schedule: "Every Sunday",
      status: "active",
      type: "report",
      lastTriggered: "2024-01-14 6:00 PM",
      nextTrigger: "2024-01-21 6:00 PM"
    },
    {
      id: 3,
      name: "Course Completion Certificate",
      description: "Automatically generates certificates upon completion",
      schedule: "On completion",
      status: "inactive",
      type: "certificate",
      lastTriggered: "2024-01-10 2:30 PM",
      nextTrigger: "When course is completed"
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<number | null>(null);
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    description: '',
    schedule: '',
    type: 'reminder'
  });

  const toggleAutomation = (id: number) => {
    setAutomations(prev => 
      prev.map(automation => 
        automation.id === id 
          ? { ...automation, status: automation.status === 'active' ? 'inactive' : 'active' }
          : automation
      )
    );
  };

  const deleteAutomation = (id: number) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  const createAutomation = async () => {
    if (!newAutomation.name.trim() || !newAutomation.description.trim() || !newAutomation.schedule.trim()) return;
    
    const automation = {
      id: Date.now(),
      name: newAutomation.name.trim(),
      description: newAutomation.description.trim(),
      schedule: newAutomation.schedule.trim(),
      status: 'active' as const,
      type: newAutomation.type as 'reminder' | 'report' | 'certificate',
      lastTriggered: 'Never',
      nextTrigger: newAutomation.schedule
    };
    
    setAutomations(prev => [automation, ...prev]);
    setNewAutomation({ name: '', description: '', schedule: '', type: 'reminder' });
    setShowCreateModal(false);
    console.log('Automation created:', automation);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Bell className="w-4 h-4 text-blue-400" />;
      case 'report': return <BarChart3 className="w-4 h-4 text-green-400" />;
      case 'certificate': return <Award className="w-4 h-4 text-yellow-400" />;
      default: return <Settings className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'reminder': return 'bg-blue-600';
      case 'report': return 'bg-green-600';
      case 'certificate': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Learning Automations</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Automation
        </Button>
      </div>
      
      <div className="space-y-3">
        {automations.map((automation) => (
          <Card key={automation.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    {getTypeIcon(automation.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">{automation.name}</h4>
                      <Badge className={`${getTypeColor(automation.type)} text-white text-xs`}>
                        {automation.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-300 mb-1">{automation.description}</p>
                    <p className="text-xs text-gray-400">{automation.schedule}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-400">Last: {automation.lastTriggered}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">Next: {automation.nextTrigger}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={automation.status === 'active'}
                    onCheckedChange={() => toggleAutomation(automation.id)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowEditModal(automation.id)}
                    title="Edit automation"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-400 hover:text-red-300"
                    onClick={() => deleteAutomation(automation.id)}
                    title="Delete automation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Automation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Create New Automation</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCreateModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Input
                placeholder="Automation name..."
                value={newAutomation.name}
                onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Textarea
                placeholder="Description..."
                value={newAutomation.description}
                onChange={(e) => setNewAutomation(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                rows={2}
              />
              <Input
                placeholder="Schedule (e.g., Daily at 9:00 AM)"
                value={newAutomation.schedule}
                onChange={(e) => setNewAutomation(prev => ({ ...prev, schedule: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <select
                value={newAutomation.type}
                onChange={(e) => setNewAutomation(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm"
              >
                <option value="reminder">Reminder</option>
                <option value="report">Report</option>
                <option value="certificate">Certificate</option>
              </select>
            </div>
            
            <div className="flex space-x-3 justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={createAutomation}
                disabled={!newAutomation.name.trim() || !newAutomation.description.trim() || !newAutomation.schedule.trim()}
              >
                Create Automation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Gamification Widget
export const GamificationWidget = () => {
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      name: "Quick Learner",
      description: "Complete 5 lessons in one day",
      icon: "⚡",
      status: "earned",
      date: "2024-01-15",
      progress: 5,
      target: 5,
      points: 100
    },
    {
      id: 2,
      name: "Consistent Student",
      description: "Study for 7 consecutive days",
      icon: "🔥",
      status: "in_progress",
      date: null,
      progress: 5,
      target: 7,
      points: 150
    },
    {
      id: 3,
      name: "Course Master",
      description: "Complete your first course",
      icon: "🎓",
      status: "earned",
      date: "2024-01-10",
      progress: 1,
      target: 1,
      points: 200
    }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: "Sarah Chen", points: 2840, rank: 1, avatar: "/avatars/sarah.jpg" },
    { id: 2, name: "Mike Rodriguez", points: 2650, rank: 2, avatar: "/avatars/mike.jpg" },
    { id: 3, name: "Emma Thompson", points: 2420, rank: 3, avatar: "/avatars/emma.jpg" },
    { id: 4, name: "You", points: 2180, rank: 4, avatar: "/avatars/you.jpg", isCurrentUser: true },
    { id: 5, name: "Alex Johnson", points: 1950, rank: 5, avatar: "/avatars/alex.jpg" }
  ]);

  const [showAchievementDetails, setShowAchievementDetails] = useState<number | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const getAchievementStatus = (achievement: any) => {
    if (achievement.status === 'earned') return 'bg-green-600';
    if (achievement.progress > 0) return 'bg-yellow-600';
    return 'bg-gray-600';
  };

  const getProgressPercentage = (achievement: any) => {
    return Math.min((achievement.progress / achievement.target) * 100, 100);
  };

  const claimReward = (achievementId: number) => {
    setAchievements(prev => 
      prev.map(achievement => 
        achievement.id === achievementId 
          ? { ...achievement, status: 'earned', date: new Date().toISOString().split('T')[0] }
          : achievement
      )
    );
    console.log(`Reward claimed for achievement: ${achievementId}`);
  };

  const totalPoints = achievements.reduce((sum, achievement) => 
    achievement.status === 'earned' ? sum + achievement.points : sum, 0
  );

  const earnedAchievements = achievements.filter(a => a.status === 'earned').length;
  const totalAchievements = achievements.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Gamification</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-700 p-3 rounded text-center">
          <div className="text-2xl font-bold text-white">{totalPoints}</div>
          <div className="text-xs text-gray-300">Total Points</div>
        </div>
        <div className="bg-gray-700 p-3 rounded text-center">
          <div className="text-2xl font-bold text-white">{earnedAchievements}</div>
          <div className="text-xs text-gray-300">Achievements</div>
        </div>
        <div className="bg-gray-700 p-3 rounded text-center">
          <div className="text-2xl font-bold text-white">{Math.round((earnedAchievements / totalAchievements) * 100)}%</div>
          <div className="text-xs text-gray-300">Completion</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h4 className="text-white font-medium text-sm mb-3">Recent Achievements</h4>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${getAchievementStatus(achievement)}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-white text-sm">{achievement.name}</h5>
                      <p className="text-xs text-gray-300">{achievement.description}</p>
                      {achievement.status === 'in_progress' && (
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress}/{achievement.target}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getAchievementStatus(achievement)}`}
                              style={{ width: `${getProgressPercentage(achievement)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      {achievement.status === 'earned' && (
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className="bg-green-600 text-white text-xs">
                            Earned {achievement.date}
                          </Badge>
                          <span className="text-xs text-yellow-400">+{achievement.points} pts</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {achievement.status === 'in_progress' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-blue-400 hover:bg-blue-600/20"
                        onClick={() => setShowAchievementDetails(achievement.id)}
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    {achievement.status === 'earned' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-green-400 hover:bg-green-600/20"
                        title="Reward claimed"
                        disabled
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium text-sm mb-3">Leaderboard</h4>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div key={user.id} className={`flex items-center justify-between p-2 rounded ${user.isCurrentUser ? 'bg-blue-600/20 border border-blue-600' : ''}`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white text-sm font-medium">{user.name}</span>
                    {user.isCurrentUser && (
                      <Badge className="bg-blue-600 text-white text-xs">You</Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">{user.points} pts</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1 ? 'bg-yellow-500 text-black' :
                    user.rank === 2 ? 'bg-gray-400 text-black' :
                    user.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {user.rank}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievement Details Modal */}
      {showAchievementDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Achievement Details</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowAchievementDetails(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {(() => {
              const achievement = achievements.find(a => a.id === showAchievementDetails);
              if (!achievement) return null;
              
              return (
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto ${getAchievementStatus(achievement)}`}>
                    {achievement.icon}
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium text-lg">{achievement.name}</h5>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </div>
                  
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="text-2xl font-bold text-white">{achievement.points}</div>
                    <div className="text-xs text-gray-300">Points Reward</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Progress:</span>
                      <span className="text-white">{achievement.progress}/{achievement.target}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getAchievementStatus(achievement)}`}
                        style={{ width: `${getProgressPercentage(achievement)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => {
                      claimReward(achievement.id);
                      setShowAchievementDetails(null);
                    }}
                  >
                    Claim Reward
                  </Button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

// Training Calendar Widget
export const TrainingCalendarWidget = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Web Development Workshop",
      instructor: "Dr. Sarah Chen",
      date: "2024-01-20",
      time: "10:00 AM - 12:00 PM",
      attendees: 45,
      maxAttendees: 50,
      status: "upcoming",
      type: "workshop",
      description: "Learn advanced web development techniques and best practices",
      location: "Virtual",
      enrolled: false
    },
    {
      id: 2,
      title: "Data Science Q&A Session",
      instructor: "Mike Rodriguez",
      date: "2024-01-22",
      time: "2:00 PM - 3:00 PM",
      attendees: 32,
      maxAttendees: 40,
      status: "upcoming",
      type: "qa",
      description: "Get your data science questions answered by experts",
      location: "Virtual",
      enrolled: true
    },
    {
      id: 3,
      title: "Project Review Meeting",
      instructor: "Emma Thompson",
      date: "2024-01-25",
      time: "11:00 AM - 12:00 PM",
      attendees: 8,
      maxAttendees: 15,
      status: "upcoming",
      type: "meeting",
      description: "Review and discuss project progress with team members",
      location: "Virtual",
      enrolled: false
    }
  ]);

  const [showEventDetails, setShowEventDetails] = useState<number | null>(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [joining, setJoining] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<number | null>(null);

  const joinEvent = async (eventId: number) => {
    setJoining(eventId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, enrolled: true, attendees: event.attendees + 1 }
          : event
      )
    );
    
    setJoining(null);
    console.log(`Joined event: ${eventId}`);
  };

  const leaveEvent = async (eventId: number) => {
    setLeaving(eventId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, enrolled: false, attendees: event.attendees - 1 }
          : event
      )
    );
    
    setLeaving(null);
    console.log(`Left event: ${eventId}`);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return <Users className="w-4 h-4 text-blue-400" />;
      case 'qa': return <MessageCircle className="w-4 h-4 text-green-400" />;
      case 'meeting': return <Calendar className="w-4 h-4 text-purple-400" />;
      default: return <Calendar className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-600';
      case 'qa': return 'bg-green-600';
      case 'meeting': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getEventStatus = (event: any) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'past';
    if (diffDays === 0) return 'today';
    if (diffDays <= 7) return 'upcoming';
    return 'future';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Training Calendar</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-gray-600 hover:bg-gray-700"
            onClick={() => setShowCreateEvent(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        {events.map((event) => (
          <Card key={event.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-white text-sm">{event.title}</h4>
                      <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-300">by {event.instructor}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-300">{formatDate(event.date)}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-300">{event.time}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-300">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-300">{event.attendees}/{event.maxAttendees} attending</span>
                      {event.enrolled && (
                        <Badge className="bg-green-600 text-white text-xs">Enrolled</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-blue-400 hover:bg-blue-600/20"
                    onClick={() => setShowEventDetails(event.id)}
                    title="View details"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {event.enrolled ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-400 border-red-400 hover:bg-red-600/20"
                      onClick={() => leaveEvent(event.id)}
                      disabled={leaving === event.id}
                    >
                      {leaving === event.id ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Leave'
                      )}
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => joinEvent(event.id)}
                      disabled={joining === event.id || event.attendees >= event.maxAttendees}
                    >
                      {joining === event.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : event.attendees >= event.maxAttendees ? (
                        'Full'
                      ) : (
                        'Join'
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Event Details Modal */}
      {showEventDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Event Details</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowEventDetails(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {(() => {
              const event = events.find(e => e.id === showEventDetails);
              if (!event) return null;
              
              return (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded flex items-center justify-center">
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-lg">{event.title}</h5>
                      <p className="text-gray-300 text-sm">by {event.instructor}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="text-white text-sm">{formatDate(event.date)}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Time</p>
                      <p className="text-white text-sm">{event.time}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Location</p>
                      <p className="text-white text-sm">{event.location}</p>
                    </div>
                    <div className="bg-gray-700 p-3 rounded">
                      <p className="text-gray-400 text-xs">Attendees</p>
                      <p className="text-white text-sm">{event.attendees}/{event.maxAttendees}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 text-xs mb-2">Description</p>
                    <p className="text-white text-sm">{event.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getEventTypeColor(event.type)} text-white text-xs`}>
                        {event.type}
                      </Badge>
                      {event.enrolled && (
                        <Badge className="bg-green-600 text-white text-xs">Enrolled</Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {event.enrolled ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-400 border-red-400 hover:bg-red-600/20"
                          onClick={() => {
                            leaveEvent(event.id);
                            setShowEventDetails(null);
                          }}
                          disabled={leaving === event.id}
                        >
                          {leaving === event.id ? 'Leaving...' : 'Leave Event'}
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => {
                            joinEvent(event.id);
                            setShowEventDetails(null);
                          }}
                          disabled={joining === event.id || event.attendees >= event.maxAttendees}
                        >
                          {joining === event.id ? 'Joining...' : 
                           event.attendees >= event.maxAttendees ? 'Event Full' : 'Join Event'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      {showCreateEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Create New Event</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowCreateEvent(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Input
                placeholder="Event title..."
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Textarea
                placeholder="Event description..."
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="date"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <Input
                placeholder="Location..."
                className="bg-gray-700 border-gray-600 text-white"
              />
              <select className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-2 text-sm">
                <option value="workshop">Workshop</option>
                <option value="qa">Q&A Session</option>
                <option value="meeting">Meeting</option>
              </select>
            </div>
            
            <div className="flex space-x-3 justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowCreateEvent(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Trash Widget
export const TrashWidget = () => {
  const [deletedItems, setDeletedItems] = useState([
    {
      id: 1,
      name: "Old Course Notes.pdf",
      type: "file",
      deletedDate: "2024-01-10",
      size: "2.3 MB"
    },
    {
      id: 2,
      name: "Draft Assignment",
      type: "document",
      deletedDate: "2024-01-08",
      size: "1.1 MB"
    },
    {
      id: 3,
      name: "Temporary Folder",
      type: "folder",
      deletedDate: "2024-01-05",
      size: "15.7 MB"
    }
  ]);

  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);

  const restoreItem = (itemId: number) => {
    setDeletedItems(prev => prev.filter(item => item.id !== itemId));
    // In a real app, you would also restore the item to its original location
    console.log(`Restored item ${itemId}`);
  };

  const deletePermanently = (itemId: number) => {
    setDeletedItems(prev => prev.filter(item => item.id !== itemId));
    // In a real app, you would also remove the item from storage
    console.log(`Permanently deleted item ${itemId}`);
  };

  const emptyTrash = () => {
    setDeletedItems([]);
    setShowEmptyConfirm(false);
    // In a real app, you would also remove all items from storage
    console.log('Trash emptied');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Trash</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-white border-gray-600 hover:bg-gray-700"
          onClick={() => setShowEmptyConfirm(true)}
          disabled={deletedItems.length === 0}
        >
          Empty Trash
        </Button>
      </div>
      
      {showEmptyConfirm && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <div className="text-center">
            <h4 className="text-white font-medium mb-2">Empty Trash?</h4>
            <p className="text-gray-300 text-sm mb-4">
              This action cannot be undone. All items will be permanently deleted.
            </p>
            <div className="flex space-x-3 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-white border-gray-600 hover:bg-gray-700"
                onClick={() => setShowEmptyConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={emptyTrash}
              >
                Empty Trash
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {deletedItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-400 text-sm">Trash is empty</p>
          </div>
        ) : (
          deletedItems.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                      {item.type === 'folder' ? (
                        <FolderOpen className="w-4 h-4 text-gray-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-300">Deleted {item.deletedDate}</p>
                      <p className="text-xs text-gray-400">{item.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-green-400 hover:bg-green-600/20"
                      onClick={() => restoreItem(item.id)}
                      title="Restore item"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-400 hover:bg-red-600/20"
                      onClick={() => deletePermanently(item.id)}
                      title="Delete permanently"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

// Default export for the main component
const StudentPortalWidgets = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0a174e] mb-4">Student Portal Widgets</h1>
        <p className="text-gray-600 text-lg">Manage your learning experience with these powerful widgets</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnnouncementsWidget />
        <InstructorsWidget />
        <FoldersWidget />
        <LearningPathWidget />
        <LibraryWidget />
        <ReadyToUseCoursesWidget />
        <AutomationWidget />
        <GamificationWidget />
        <TrainingCalendarWidget />
        <TrashWidget />
      </div>
    </div>
  );
};

export default StudentPortalWidgets;