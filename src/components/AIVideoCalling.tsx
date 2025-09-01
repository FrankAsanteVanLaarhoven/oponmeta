import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Settings, 
  Users, 
  Clock, 
  Star, 
  BookOpen,
  MessageCircle,
  Send,
  MoreVertical,
  Volume2,
  VolumeX,
  ScreenShare,
  Monitor,
  Smartphone,
  Tablet,
  Filter
} from 'lucide-react';

interface AITutor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  languages: string[];
  availability: 'online' | 'offline' | 'busy';
  experience: number;
  subjects: string[];
  hourlyRate: number;
  isOnline: boolean;
}

interface VideoSession {
  id: string;
  tutorId: string;
  startTime: Date;
  duration: number;
  status: 'active' | 'ended' | 'scheduled';
  subject: string;
  notes: string;
}

const AI_TUTORS: AITutor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    avatar: '',
    specialty: 'Mathematics & Physics',
    rating: 4.9,
    languages: ['English', 'Mandarin'],
    availability: 'online',
    experience: 8,
    subjects: ['Calculus', 'Linear Algebra', 'Quantum Physics'],
    hourlyRate: 45,
    isOnline: true
  },
  {
    id: '2',
    name: 'Prof. Marcus Rodriguez',
    avatar: '',
    specialty: 'Computer Science',
    rating: 4.8,
    languages: ['English', 'Spanish'],
    availability: 'online',
    experience: 12,
    subjects: ['Python', 'Machine Learning', 'Data Structures'],
    hourlyRate: 55,
    isOnline: true
  },
  {
    id: '3',
    name: 'Dr. Aisha Patel',
    avatar: '',
    specialty: 'Biology & Chemistry',
    rating: 4.9,
    languages: ['English', 'Hindi'],
    availability: 'online',
    experience: 6,
    subjects: ['Organic Chemistry', 'Cell Biology', 'Genetics'],
    hourlyRate: 40,
    isOnline: true
  },
  {
    id: '4',
    name: 'Prof. James Wilson',
    avatar: '',
    specialty: 'Literature & Writing',
    rating: 4.7,
    languages: ['English'],
    availability: 'busy',
    experience: 15,
    subjects: ['Creative Writing', 'Shakespeare', 'Modern Literature'],
    hourlyRate: 50,
    isOnline: true
  },
  {
    id: '5',
    name: 'Dr. Elena Petrov',
    avatar: '',
    specialty: 'History & Political Science',
    rating: 4.8,
    languages: ['English', 'Russian'],
    availability: 'online',
    experience: 10,
    subjects: ['World History', 'Political Theory', 'International Relations'],
    hourlyRate: 48,
    isOnline: true
  },
  {
    id: '6',
    name: 'Prof. David Kim',
    avatar: '',
    specialty: 'Economics & Finance',
    rating: 4.9,
    languages: ['English', 'Korean'],
    availability: 'online',
    experience: 14,
    subjects: ['Microeconomics', 'Macroeconomics', 'Financial Markets'],
    hourlyRate: 60,
    isOnline: true
  },
  {
    id: '7',
    name: 'Dr. Maria Garcia',
    avatar: '',
    specialty: 'Psychology & Neuroscience',
    rating: 4.7,
    languages: ['English', 'Spanish'],
    availability: 'offline',
    experience: 9,
    subjects: ['Cognitive Psychology', 'Neuroscience', 'Behavioral Science'],
    hourlyRate: 52,
    isOnline: false
  },
  {
    id: '8',
    name: 'Prof. Ahmed Hassan',
    avatar: '',
    specialty: 'Engineering & Technology',
    rating: 4.8,
    languages: ['English', 'Arabic'],
    availability: 'online',
    experience: 11,
    subjects: ['Mechanical Engineering', 'Robotics', 'AI Systems'],
    hourlyRate: 58,
    isOnline: true
  }
];

const AIVideoCalling = () => {
  const navigate = useNavigate();
  const [selectedTutor, setSelectedTutor] = useState<AITutor | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'tutor', timestamp: Date}>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sessions, setSessions] = useState<VideoSession[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isInCall) {
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInCall]);

  const startCall = (tutor: AITutor) => {
    setSelectedTutor(tutor);
    setIsInCall(true);
    setCallDuration(0);
    
    // Mock video call setup
    if (localVideoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Error accessing camera:', err));
    }
  };

  const endCall = () => {
    setIsInCall(false);
    setSelectedTutor(null);
    setCallDuration(0);
    
    // Stop local stream
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleVolume = () => {
    setIsVolumeOn(!isVolumeOn);
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedTutor) {
      const message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user' as const,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, message]);
      
      // Simulate AI tutor response
      setTimeout(() => {
        const tutorResponse = {
          id: (Date.now() + 1).toString(),
          text: `Thank you for your message: "${newMessage}". I'm here to help you with ${selectedTutor.specialty.toLowerCase()}.`,
          sender: 'tutor' as const,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, tutorResponse]);
      }, 1000);
      
      setNewMessage('');
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTutors = AI_TUTORS.filter(tutor => {
    if (filterSubject && filterSubject !== 'all' && !tutor.subjects.some(subject => 
      subject.toLowerCase().includes(filterSubject.toLowerCase())
    )) return false;
    if (filterLanguage && filterLanguage !== 'all' && !tutor.languages.includes(filterLanguage)) return false;
    return true;
  });

  if (isInCall && selectedTutor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="flex h-screen">
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedTutor.avatar} />
                  <AvatarFallback>{selectedTutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                                  <h2 className="text-lg font-semibold text-yellow-400">{selectedTutor.name}</h2>
                <p className="text-sm text-yellow-400">{selectedTutor.specialty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-green-600">
                  {formatDuration(callDuration)}
                </Badge>
                <Button variant="ghost" size="sm" onClick={endCall}>
                  <PhoneOff className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Video Display */}
            <div className="flex-1 relative bg-black">
              {/* Remote Video (AI Tutor) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={selectedTutor.avatar} />
                    <AvatarFallback className="text-4xl">
                      {selectedTutor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                                  <h3 className="text-xl font-semibold text-yellow-400">{selectedTutor.name}</h3>
                <p className="text-yellow-400">{selectedTutor.specialty}</p>
                  <Badge variant="secondary" className="mt-2 bg-green-600">
                    AI Tutor
                  </Badge>
                </div>
              </div>

              {/* Local Video */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                    <CameraOff className="w-8 h-8 text-yellow-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-gray-800 p-4">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="lg"
                  onClick={toggleMute}
                  className="rounded-full w-12 h-12"
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endCall}
                  className="rounded-full w-14 h-14"
                >
                  <PhoneOff className="w-6 h-6" />
                </Button>
                
                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="lg"
                  onClick={toggleVideo}
                  className="rounded-full w-12 h-12"
                >
                  {isVideoOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant={isScreenSharing ? "secondary" : "outline"}
                  size="lg"
                  onClick={toggleScreenShare}
                  className="rounded-full w-12 h-12"
                >
                  <ScreenShare className="w-5 h-5" />
                </Button>
                
                <Button
                  variant={isVolumeOn ? "secondary" : "outline"}
                  size="lg"
                  onClick={toggleVolume}
                  className="rounded-full w-12 h-12"
                >
                  {isVolumeOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
                              <h3 className="text-lg font-semibold text-yellow-400">Chat with {selectedTutor.name}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                                            <p className="text-sm text-white">{message.text}</p>
                                            <p className="text-xs opacity-70 mt-1 text-white">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            AI Video Calling
          </h1>
          <p className="text-xl text-yellow-400 max-w-2xl mx-auto">
            Connect with AI tutors and experts for personalized learning experiences. 
            Get real-time help, ask questions, and receive instant feedback.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
                              <Filter className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-400">Filters:</span>
            </div>
            
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="literature">Literature</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="economics">Economics</SelectItem>
                <SelectItem value="psychology">Psychology</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterLanguage} onValueChange={setFilterLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="Mandarin">Mandarin</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Russian">Russian</SelectItem>
                <SelectItem value="Korean">Korean</SelectItem>
                <SelectItem value="Arabic">Arabic</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Tutors Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredTutors.map(tutor => (
            <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                                                                      <CardTitle className="text-lg text-yellow-400">{tutor.name}</CardTitle>
                        <p className="text-sm text-yellow-400">{tutor.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-yellow-400">{tutor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.slice(0, 3).map(subject => (
                                            <Badge key={subject} variant="secondary" className="text-xs text-yellow-400">
                      {subject}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 3 && (
                                            <Badge variant="outline" className="text-xs text-yellow-400">
                      +{tutor.subjects.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-white">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tutor.experience} years</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tutor.languages.join(', ')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                                                                  <div className="text-lg font-semibold text-yellow-400">
                          ${tutor.hourlyRate}/hr
                        </div>
                  <Badge 
                    variant={tutor.availability === 'online' ? 'default' : 'secondary'}
                    className={tutor.availability === 'online' ? 'bg-green-600' : 'bg-gray-500'}
                  >
                    {tutor.availability === 'online' ? 'Online' : tutor.availability}
                  </Badge>
                </div>
                
                <Button 
                  onClick={() => startCall(tutor)}
                  disabled={tutor.availability !== 'online'}
                  className="w-full"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Start Video Call
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
                            <Video className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-yellow-400 mb-2">No tutors found</h3>
                <p className="text-yellow-400">Try adjusting your filters to find available tutors.</p>
          </div>
        )}

        {/* Features Section */}
                  <div className="mt-16 bg-gray-800 rounded-lg shadow-sm p-8 border border-gray-700">
                          <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">Why Choose AI Video Calling?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Clock className="w-8 h-8 text-yellow-400" />
              </div>
                                              <h3 className="text-xl font-semibold mb-2 text-yellow-400">24/7 Availability</h3>
                <p className="text-yellow-400">Get help anytime, anywhere with our AI tutors that never sleep.</p>
            </div>
            
            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Star className="w-8 h-8 text-yellow-400" />
              </div>
                                              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Expert Knowledge</h3>
                <p className="text-yellow-400">Access to specialized knowledge across all subjects and skill levels.</p>
            </div>
            
            <div className="text-center">
                              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageSquare className="w-8 h-8 text-yellow-400" />
              </div>
                                              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Personalized Learning</h3>
                <p className="text-yellow-400">Tailored explanations and adaptive learning based on your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVideoCalling;
