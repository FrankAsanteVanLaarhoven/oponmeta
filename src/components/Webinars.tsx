import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, Users, Video as VideoIcon, Play, Download, Share2, Bookmark, Star, Filter, Search, CalendarDays as CalendarDaysIcon, MapPin, User as UserIcon, Tag as TagIcon } from 'lucide-react';

interface Webinar {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    title: string;
    rating: number;
  };
  date: string;
  time: string;
  duration: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  maxAttendees: number;
  registeredAttendees: number;
  price: number;
  isFree: boolean;
  tags: string[];
  thumbnail: string;
  status: 'upcoming' | 'live' | 'completed';
  recordingUrl?: string;
  materials?: string[];
}

const MOCK_WEBINARS: Webinar[] = [
  {
    id: '1',
    title: 'Advanced React Patterns and Best Practices',
    description: 'Learn advanced React patterns including custom hooks, context optimization, and performance techniques.',
    instructor: {
      name: 'Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      title: 'Senior React Developer',
      rating: 4.8
    },
    date: '2024-02-15',
    time: '14:00',
    duration: 90,
    category: 'Programming',
    level: 'Advanced',
    maxAttendees: 200,
    registeredAttendees: 156,
    price: 0,
    isFree: true,
    tags: ['React', 'JavaScript', 'Frontend'],
    thumbnail: '/webinars/react-patterns.jpg',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'AI in Education: Transforming Learning Experiences',
                    description: 'Explore how artificial intelligence is revolutionising education and creating personalised learning paths.',
    instructor: {
      name: 'Dr. Michael Chen',
      avatar: '/avatars/michael.jpg',
      title: 'AI Research Director',
      rating: 4.9
    },
    date: '2024-02-10',
    time: '10:00',
    duration: 120,
    category: 'Education',
    level: 'Intermediate',
    maxAttendees: 150,
    registeredAttendees: 150,
    price: 29.99,
    isFree: false,
    tags: ['AI', 'Education', 'Technology'],
    thumbnail: '/webinars/ai-education.jpg',
    status: 'completed',
    recordingUrl: 'https://example.com/recording1',
    materials: ['Slides.pdf', 'Resources.zip', 'Q&A.pdf']
  },
  {
    id: '3',
    title: 'Digital Marketing Strategies for 2024',
    description: 'Master the latest digital marketing trends and strategies to grow your business online.',
    instructor: {
      name: 'Emma Rodriguez',
      avatar: '/avatars/emma.jpg',
      title: 'Marketing Consultant',
      rating: 4.7
    },
    date: '2024-02-20',
    time: '16:00',
    duration: 75,
    category: 'Marketing',
    level: 'Beginner',
    maxAttendees: 300,
    registeredAttendees: 89,
    price: 0,
    isFree: true,
    tags: ['Marketing', 'Digital', 'Business'],
    thumbnail: '/webinars/digital-marketing.jpg',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Data Science Fundamentals',
    description: 'Introduction to data science concepts, tools, and methodologies for beginners.',
    instructor: {
      name: 'David Kim',
      avatar: '/avatars/david.jpg',
      title: 'Data Scientist',
      rating: 4.6
    },
    date: '2024-02-08',
    time: '13:00',
    duration: 90,
    category: 'Data Science',
    level: 'Beginner',
    maxAttendees: 250,
    registeredAttendees: 250,
    price: 19.99,
    isFree: false,
    tags: ['Data Science', 'Python', 'Analytics'],
    thumbnail: '/webinars/data-science.jpg',
    status: 'completed',
    recordingUrl: 'https://example.com/recording2',
    materials: ['Notebook.ipynb', 'Dataset.csv', 'Slides.pdf']
  },
  {
    id: '5',
    title: 'Cybersecurity Essentials for Small Businesses',
    description: 'Learn essential cybersecurity practices to protect your business from digital threats.',
    instructor: {
      name: 'Lisa Thompson',
      avatar: '/avatars/lisa.jpg',
      title: 'Cybersecurity Expert',
      rating: 4.8
    },
    date: '2024-02-25',
    time: '11:00',
    duration: 60,
    category: 'Security',
    level: 'Beginner',
    maxAttendees: 200,
    registeredAttendees: 45,
    price: 0,
    isFree: true,
    tags: ['Cybersecurity', 'Business', 'Security'],
    thumbnail: '/webinars/cybersecurity.jpg',
    status: 'upcoming'
  }
];

const Webinars: React.FC = () => {
  const [webinars, setWebinars] = useState<Webinar[]>(MOCK_WEBINARS);
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    company: '',
    questions: ''
  });

  const categories = ['all', ...Array.from(new Set(webinars.map(w => w.category)))];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesTab = selectedTab === 'upcoming' ? webinar.status === 'upcoming' : webinar.status === 'completed';
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.instructor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || webinar.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || webinar.level === selectedLevel;

    return matchesTab && matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRegister = (webinar: Webinar) => {
    setSelectedWebinar(webinar);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the registration data to your backend
    console.log('Registration submitted:', { webinar: selectedWebinar, form: registrationForm });
    setShowRegistrationModal(false);
    setRegistrationForm({ name: '', email: '', company: '', questions: '' });
    setSelectedWebinar(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRegistrationProgress = (webinar: Webinar) => {
    return (webinar.registeredAttendees / webinar.maxAttendees) * 100;
  };

  return (
    <div className="min-h-screen bg-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Webinars</h1>
          <p className="text-white/80 text-lg">Join live educational sessions with industry experts</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Webinars</p>
                  <p className="text-2xl font-bold text-black">{webinars.length}</p>
                </div>
                <VideoIcon className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-black">{webinars.filter(w => w.status === 'upcoming').length}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Free Webinars</p>
                  <p className="text-2xl font-bold text-black">{webinars.filter(w => w.isFree).length}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Attendees</p>
                  <p className="text-2xl font-bold text-black">{webinars.reduce((sum, w) => sum + w.registeredAttendees, 0)}</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex gap-2">
              <Button
                variant={selectedTab === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('upcoming')}
                className="text-black"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Upcoming
              </Button>
              <Button
                variant={selectedTab === 'past' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('past')}
                className="text-black"
              >
                <Play className="w-4 h-4 mr-2" />
                Past Webinars
              </Button>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search webinars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-black border-gray-300"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40 bg-white text-black border-gray-300">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-black">
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-40 bg-white text-black border-gray-300">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map(level => (
                  <SelectItem key={level} value={level} className="text-black">
                    {level === 'all' ? 'All Levels' : level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Webinars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar) => (
            <Card key={webinar.id} className="bg-white hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <VideoIcon className="w-16 h-16 text-white" />
                </div>
                {webinar.isFree && (
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    Free
                  </Badge>
                )}
                <Badge className={`absolute top-4 right-4 ${
                  webinar.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  webinar.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {webinar.level}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-black text-lg">{webinar.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {webinar.description.substring(0, 100)}...
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Instructor */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={webinar.instructor.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-800">
                        {webinar.instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-black">{webinar.instructor.name}</p>
                      <p className="text-sm text-gray-600">{webinar.instructor.title}</p>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{webinar.instructor.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="w-4 h-4 mr-1" />
                      {formatDate(webinar.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {webinar.time} ({webinar.duration} min)
                    </div>
                  </div>

                  {/* Category and Tags */}
                  <div className="flex items-center space-x-2">
                    <TagIcon className="w-4 h-4 text-gray-400" />
                    <Badge variant="outline" className="text-black border-gray-300">
                      {webinar.category}
                    </Badge>
                    {webinar.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-black bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Registration Progress */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{webinar.registeredAttendees} / {webinar.maxAttendees} registered</span>
                      <span>{Math.round(getRegistrationProgress(webinar))}%</span>
                    </div>
                    <Progress value={getRegistrationProgress(webinar)} className="h-2" />
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {webinar.status === 'upcoming' ? (
                      <Button 
                        onClick={() => handleRegister(webinar)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={webinar.registeredAttendees >= webinar.maxAttendees}
                      >
                        {webinar.registeredAttendees >= webinar.maxAttendees ? 'Full' : 'Register'}
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="flex-1 text-black border-gray-300"
                        onClick={() => toast.info('Recording would open here')}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                    )}
                    
                    <Button variant="outline" size="icon" className="text-black border-gray-300">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="text-black border-gray-300">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
                            <VideoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No webinars found</h3>
            <p className="text-white/80">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && selectedWebinar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-black mb-4">Register for Webinar</h2>
            <h3 className="text-lg font-semibold text-black mb-4">{selectedWebinar.title}</h3>
            
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-black">Full Name *</Label>
                <Input
                  id="name"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="bg-white text-black border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-black">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="bg-white text-black border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="company" className="text-black">Company/Organisation</Label>
                <Input
                  id="company"
                  value={registrationForm.company}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, company: e.target.value }))}
                  className="bg-white text-black border-gray-300"
                />
              </div>
              
              <div>
                <Label htmlFor="questions" className="text-black">Questions for the Instructor</Label>
                <Textarea
                  id="questions"
                  value={registrationForm.questions}
                  onChange={(e) => setRegistrationForm(prev => ({ ...prev, questions: e.target.value }))}
                  placeholder="Any specific questions you'd like to ask during the webinar..."
                  className="bg-white text-black border-gray-300"
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRegistrationModal(false)}
                  className="text-black border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinars;
