import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Bookmark, Clock, Users, Star, BarChart3, Settings, Plus } from 'lucide-react';

// Enhanced companion data with multilingual support
const COMPANIONS_DATA = {
  en: [
    {
      id: "1",
      name: "Alex the Project Manager",
      topic: "Project Management Fundamentals",
      subject: "business",
      description: "Master project management principles and methodologies",
      duration: 45,
      style: "formal",
      voice: "male",
      languages: ['en', 'es'],
      avatar: "🧑‍💼",
      expertise: "Project Management",
      rating: 4.8,
      sessions: 1247
    },
    {
      id: "2",
      name: "Lina the Golf Coach",
      topic: "Golf Techniques & Strategy",
      subject: "sports",
      description: "Perfect your golf game with professional coaching",
      duration: 30,
      style: "casual",
      voice: "female",
      languages: ['en', 'fr'],
      avatar: "🏌️‍♀️",
      expertise: "Golf Coaching",
      rating: 4.9,
      sessions: 892
    },
    {
      id: "3",
      name: "Ming the Mandarin Tutor",
      topic: "Chinese Language & Culture",
      subject: "language",
      description: "Learn Mandarin Chinese through interactive conversations",
      duration: 40,
      style: "casual",
      voice: "female",
      languages: ['zh', 'en'],
      avatar: "👩‍🏫",
      expertise: "Mandarin Chinese",
      rating: 4.7,
      sessions: 1563
    },
    {
      id: "4",
      name: "Neura the Brainy Explorer",
      topic: "Neural Networks & AI",
      subject: "science",
      description: "Explore the fascinating world of artificial intelligence",
      duration: 50,
      style: "formal",
      voice: "female",
      languages: ['en', 'de'],
      avatar: "🧠",
      expertise: "Artificial Intelligence",
      rating: 4.9,
      sessions: 2103
    },
    {
      id: "5",
      name: "Codey the Logic Hacker",
      topic: "Programming Fundamentals",
      subject: "coding",
      description: "Master coding concepts with hands-on practice",
      duration: 45,
      style: "casual",
      voice: "male",
      languages: ['en', 'pt'],
      avatar: "💻",
      expertise: "Programming",
      rating: 4.8,
      sessions: 1876
    },
    {
      id: "6",
      name: "Vita the Wellness Coach",
      topic: "Health & Nutrition",
      subject: "health",
      description: "Learn about wellness, nutrition, and healthy living",
      duration: 35,
      style: "casual",
      voice: "female",
      languages: ['en', 'it'],
      avatar: "💪",
      expertise: "Health & Wellness",
      rating: 4.6,
      sessions: 945
    }
  ],
  es: [
    {
      id: "1",
      name: "Alex el Gerente de Proyectos",
      topic: "Fundamentos de Gestión de Proyectos",
      subject: "business",
      description: "Domina los principios y metodologías de gestión de proyectos",
      duration: 45,
      style: "formal",
      voice: "male",
      languages: ['en', 'es'],
      avatar: "🧑‍💼",
      expertise: "Gestión de Proyectos",
      rating: 4.8,
      sessions: 1247
    }
  ],
  fr: [
    {
      id: "2",
      name: "Lina la Coach de Golf",
      topic: "Techniques et Stratégie de Golf",
      subject: "sports",
      description: "Perfectionnez votre jeu de golf avec un coaching professionnel",
      duration: 30,
      style: "casual",
      voice: "female",
      languages: ['en', 'fr'],
      avatar: "🏌️‍♀️",
      expertise: "Coaching de Golf",
      rating: 4.9,
      sessions: 892
    }
  ],
  zh: [
    {
      id: "3",
      name: "明老师 - 中文导师",
      topic: "中文语言与文化",
      subject: "language",
      description: "通过互动对话学习中文普通话",
      duration: 40,
      style: "casual",
      voice: "female",
      languages: ['zh', 'en'],
      avatar: "👩‍🏫",
      expertise: "中文教学",
      rating: 4.7,
      sessions: 1563
    }
  ]
};

const SUBJECTS = [
  { value: 'all', label: 'All Subjects' },
  { value: 'business', label: 'Business' },
  { value: 'sports', label: 'Sports' },
  { value: 'language', label: 'Language' },
  { value: 'science', label: 'Science' },
  { value: 'coding', label: 'Programming' },
  { value: 'health', label: 'Health' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'history', label: 'History' },
  { value: 'economics', label: 'Economics' },
  { value: 'technology', label: 'Technology' },
  { value: 'arts', label: 'Arts' }
];

const SUBJECT_COLORS: { [key: string]: string } = {
  business: "#FFB3BA",
  sports: "#FFD700",
  language: "#BDE7FF",
  science: "#E5D0FF",
  coding: "#FFC8E4",
  health: "#98FB98",
  mathematics: "#FFDA6E",
  history: "#FFECC8",
  economics: "#C8FFDF",
  technology: "#B8E6B8",
  arts: "#DDA0DD"
};

const CompanionsLibrary = () => {
  const { language, setLanguage, companions } = useAppContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [bookmarked, setBookmarked] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  // Add subscription state and upgrade modal
  const [subscriptionTier, setSubscriptionTier] = useState<'free'|'pro'>('free');
  const [showUpgrade, setShowUpgrade] = useState(false);
  // Mock: Mark some companions as Pro-only
  const proCompanionIds = ['2', '4']; // e.g. Lina and Neura are Pro

  // Get companions for current language, fallback to English
  const defaultCompanions = COMPANIONS_DATA[language as keyof typeof COMPANIONS_DATA] || COMPANIONS_DATA.en;
  
  // Combine default companions with user-created companions
  const allCompanions = [...defaultCompanions, ...companions];

  // Filter companions based on search and filters
  const filteredCompanions = allCompanions.filter((companion: any) => {
    const matchesSearch = companion.name.toLowerCase().includes(search.toLowerCase()) ||
                         companion.topic.toLowerCase().includes(search.toLowerCase()) ||
                         companion.expertise.toLowerCase().includes(search.toLowerCase());
    
    const matchesSubject = filterSubject === 'all' || companion.subject === filterSubject;
    const matchesLanguage = filterLanguage === 'all' || companion.languages.includes(filterLanguage);
    
    return matchesSearch && matchesSubject && matchesLanguage;
  });

  // Handle bookmark toggle
  const toggleBookmark = (companionId: string) => {
    setBookmarked(prev => 
      prev.includes(companionId) 
        ? prev.filter(id => id !== companionId)
        : [...prev, companionId]
    );
  };

  // Handle start session
  const startSession = (companionId: string) => {
    if (proCompanionIds.includes(companionId) && subscriptionTier !== 'pro') {
      setShowUpgrade(true);
      return;
    }
    navigate(`/companions/${companionId}`);
  };

  return (
    <div className="min-h-screen bg-blue-900 py-8">
      <div className="bg-white rounded-xl shadow-lg max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Learning Companions</h1>
            <p className="text-lg text-white/80">Discover AI-powered learning companions for personalised education</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/companions/analytics')}>
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" onClick={() => navigate('/companions/settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => navigate('/companions/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Companion
            </Button>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ar">العربية</option>
              <option value="ru">Русский</option>
              <option value="pt">Português</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search companions by name, topic, or expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              value={filterSubject} 
              onChange={(e) => setFilterSubject(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              {SUBJECTS.map(subject => (
                <option key={subject.value} value={subject.value}>{subject.label}</option>
              ))}
            </select>
            
            <select 
              value={filterLanguage} 
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              <option value="all">All Languages</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="zh">中文</option>
            </select>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/80">
            Found {filteredCompanions.length} companion{filteredCompanions.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Companions Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanions.map(companion => (
              <div 
                key={companion.id} 
                className={`bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 relative ${proCompanionIds.includes(companion.id) ? 'ring-2 ring-purple-400' : ''}`}
                style={{ borderLeft: `4px solid ${SUBJECT_COLORS[companion.subject] || '#E5E5E5'}` }}
              >
                {/* Pro lock indicator */}
                {proCompanionIds.includes(companion.id) && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded shadow">Pro</div>
                )}
                {/* Created by user indicator */}
                {companions.some(c => c.id === companion.id) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow z-10">Created by you</div>
                )}
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{companion.avatar}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full text-white font-medium" 
                              style={{ backgroundColor: SUBJECT_COLORS[companion.subject] || '#E5E5E5' }}>
                          {companion.subject}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{companion.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(companion.id)}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    <Bookmark className={`w-5 h-5 ${bookmarked.includes(companion.id) ? 'fill-current text-yellow-500' : ''}`} />
                  </Button>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{companion.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{companion.topic}</p>
                  <p className="text-gray-500 text-sm">{companion.description}</p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{companion.duration} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{companion.sessions.toLocaleString()}</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <div className="flex gap-1">
                    {companion.languages.map((lang: string) => (
                      <span key={lang} className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {lang.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => startSession(companion.id)}
                    className="w-full"
                    style={{ backgroundColor: SUBJECT_COLORS[companion.subject] || '#E5E5E5' }}
                  >
                    Start Session
                  </Button>
                  <Button 
                    onClick={() => startSession(companion.id)}
                    className="w-full"
                    variant="outline"
                  >
                    🎤 Voice
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCompanions.map(companion => (
              <div 
                key={companion.id} 
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                style={{ borderLeft: `4px solid ${SUBJECT_COLORS[companion.subject] || '#E5E5E5'}` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{companion.avatar}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{companion.name}</h3>
                      <p className="text-gray-600">{companion.topic}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {companion.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {companion.sessions.toLocaleString()} sessions
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          {companion.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {companion.languages.map((lang: string) => (
                        <span key={lang} className="text-xs px-2 py-1 bg-gray-100 rounded">
                          {lang.toUpperCase()}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(companion.id)}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      <Bookmark className={`w-5 h-5 ${bookmarked.includes(companion.id) ? 'fill-current text-yellow-500' : ''}`} />
                    </Button>
                    <Button 
                      onClick={() => startSession(companion.id)}
                      style={{ backgroundColor: SUBJECT_COLORS[companion.subject] || '#E5E5E5' }}
                    >
                      Start Session
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCompanions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No companions found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button onClick={() => {
              setSearch('');
              setFilterSubject('all');
              setFilterLanguage('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      {/* Subscription upgrade modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-2">Upgrade to Pro</h2>
            <p className="mb-4">This companion is available for Pro subscribers. Unlock all companions and features!</p>
            <Button className="w-full mb-2" onClick={()=>{setSubscriptionTier('pro');setShowUpgrade(false);}}>Upgrade Now</Button>
            <Button className="w-full" variant="ghost" onClick={()=>setShowUpgrade(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanionsLibrary;
