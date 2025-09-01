import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  EyeOff,
  Target,
  Calendar,
  BarChart3,
  DollarSign,
  Users,
  Globe,
  Clock,
  Star,
  ExternalLink,
  X,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  link: string;
  cta: string;
  status: 'active' | 'paused' | 'draft' | 'scheduled';
  type: 'banner' | 'video' | 'carousel' | 'interactive';
  targetAudience: string[];
  schedule: {
    startDate: string;
    endDate: string;
    daysOfWeek: number[];
    timeSlots: string[];
  };
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    spend: number;
  };
  budget: {
    daily: number;
    total: number;
    spent: number;
  };
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface AdPanelProps {
  userRole?: 'student' | 'instructor' | 'admin' | 'advertiser';
  isVisible?: boolean;
  onToggle?: () => void;
}

const MOCK_ADS: Ad[] = [
  {
    id: '1',
    title: 'Master Python Programming',
    description: 'Learn Python from scratch with our comprehensive course. Perfect for beginners!',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop',
    link: '/courses/python-bootcamp',
    cta: 'Start Learning',
    status: 'active',
    type: 'banner',
    targetAudience: ['technology', 'beginners'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      timeSlots: ['09:00', '12:00', '15:00', '18:00']
    },
    metrics: {
      impressions: 15420,
      clicks: 1234,
      ctr: 8.0,
      spend: 456.78
    },
    budget: {
      daily: 50,
      total: 1000,
      spent: 456.78
    },
    priority: 'high',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Advanced JavaScript Development',
    description: 'Master modern JavaScript frameworks and build scalable web applications.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop',
    link: '/courses/javascript-advanced',
    cta: 'Enroll Now',
    status: 'active',
    type: 'banner',
    targetAudience: ['technology', 'intermediate'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      timeSlots: ['09:00', '12:00', '15:00', '18:00']
    },
    metrics: {
      impressions: 12340,
      clicks: 987,
      ctr: 8.0,
      spend: 345.67
    },
    budget: {
      daily: 40,
      total: 800,
      spent: 345.67
    },
    priority: 'medium',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Learn data analysis, machine learning, and statistical modeling.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    link: '/courses/data-science',
    cta: 'Get Started',
    status: 'active',
    type: 'banner',
    targetAudience: ['technology', 'data-science'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      timeSlots: ['09:00', '12:00', '15:00', '18:00']
    },
    metrics: {
      impressions: 9876,
      clicks: 654,
      ctr: 6.6,
      spend: 234.56
    },
    budget: {
      daily: 30,
      total: 600,
      spent: 234.56
    },
    priority: 'high',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Digital Marketing Mastery',
    description: 'Master SEO, social media marketing, and digital advertising strategies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
    link: '/courses/digital-marketing',
    cta: 'Learn More',
    status: 'active',
    type: 'banner',
    targetAudience: ['marketing', 'business'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      timeSlots: ['09:00', '12:00', '15:00', '18:00']
    },
    metrics: {
      impressions: 8765,
      clicks: 543,
      ctr: 6.2,
      spend: 198.45
    },
    budget: {
      daily: 25,
      total: 500,
      spent: 198.45
    },
    priority: 'medium',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'UI/UX Design Principles',
    description: 'Create beautiful and intuitive user interfaces with modern design principles.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
    link: '/courses/ui-ux-design',
    cta: 'Start Designing',
    status: 'active',
    type: 'banner',
    targetAudience: ['design', 'creative'],
    schedule: {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
      timeSlots: ['09:00', '12:00', '15:00', '18:00']
    },
    metrics: {
      impressions: 7654,
      clicks: 432,
      ctr: 5.6,
      spend: 167.89
    },
    budget: {
      daily: 20,
      total: 400,
      spent: 167.89
    },
    priority: 'low',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

const RightAdPanel: React.FC<AdPanelProps> = ({ 
  userRole = 'student', 
  isVisible = false, // Changed to false by default
  onToggle 
}) => {
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isCreatingAd, setIsCreatingAd] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isAdminOrAdvertiser = userRole === 'admin' || userRole === 'advertiser';

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && ads.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ads.length);
      }, 5000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isPlaying, ads.length]);

  // Click outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        if (isMobileExpanded) {
          setIsMobileExpanded(false);
        }
      }
    };

    if (isMobileExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileExpanded]);

  const handlePrevious = () => {
    setCurrentAdIndex((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleNext = () => {
    setCurrentAdIndex((prev) => (prev + 1) % ads.length);
  };

  const handleAdClick = (ad: Ad) => {
    // Track click analytics here
    console.log('Ad clicked:', ad.title);
            // window.open(ad.link, '_blank');
        toast.info('Ad link would open here');
  };

  const getStatusColor = (status: Ad['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: Ad['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Mobile collapsed state - show only a small toggle button
  if (!isVisible) {
    return (
      <div className="fixed right-4 top-20 z-40">
        <Button
          onClick={onToggle}
          variant="outline"
          size="sm"
          className="bg-white dark:bg-[#16203a] shadow-lg hover:bg-gray-50 dark:hover:bg-[#11204a] transition-all duration-300"
        >
          <Eye className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Show Ads</span>
          <span className="sm:hidden">Ads</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" />
      )}

      {/* Main Panel */}
      <div 
        ref={panelRef}
        className={`
          fixed z-50 transition-all duration-300 ease-in-out
          ${isMobileExpanded 
            ? 'inset-4 lg:inset-auto lg:right-4 lg:top-20 lg:w-80' 
            : 'right-4 top-20 w-80'
          }
          ${isCollapsed ? 'w-16' : 'w-80'}
          ${isMobileExpanded ? 'lg:w-80' : 'lg:w-80'}
        `}
        style={{ zIndex: 1000 }}
      >
        <Card className={`
          shadow-xl border-2 border-[#11204a] bg-[#16203a] transition-all duration-300
          ${isCollapsed ? 'min-h-[200px]' : 'min-h-[600px]'}
          ${isMobileExpanded ? 'h-[calc(100vh-2rem)] lg:h-auto' : 'h-auto'}
        `}>
          <CardHeader className={`
            mb-4 transition-all duration-300
            ${isCollapsed ? 'p-2' : 'p-6'}
          `}>
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <CardTitle className="text-lg font-bold text-cyan-300">Sponsored</CardTitle>
              )}
              
              <div className="flex items-center space-x-2">
                {/* Mobile Expand/Collapse */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                  className="lg:hidden p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  {isMobileExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>

                {/* Desktop Collapse/Expand */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden lg:flex p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggle}
                  className="p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Collapsed State - Show only carousel controls */}
          {isCollapsed ? (
            <div className="flex flex-col items-center space-y-4 p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-300 mb-2">
                  {currentAdIndex + 1}
                </div>
                <div className="text-xs text-gray-400">
                  / {ads.length}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  <ChevronUp className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="p-1 text-cyan-300 hover:bg-[#0a1834]"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <CardContent className={`
              flex-1 flex flex-col gap-6 overflow-y-auto text-white transition-all duration-300
              ${isMobileExpanded ? 'p-4' : 'p-6'}
            `}>
              {/* Carousel Controls */}
              {ads.length > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-[#11204a] rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    className="p-1 text-cyan-300 hover:bg-[#0a1834] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 text-cyan-300 hover:bg-[#0a1834] transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <span className="text-xs text-cyan-300 font-medium">
                      {currentAdIndex + 1} / {ads.length}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    className="p-1 text-cyan-300 hover:bg-[#0a1834] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Current Ad Display */}
              {ads.length > 0 && (
                <div className="p-4 bg-[#11204a] rounded-lg">
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => handleAdClick(ads[currentAdIndex])}
                  >
                    {/* Ad Image */}
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={ads[currentAdIndex].image}
                        alt={ads[currentAdIndex].title}
                        className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                      />
                      
                      {/* Video Play Button */}
                      {ads[currentAdIndex].videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-white/90 rounded-full p-3">
                            <Play className="w-6 h-6 text-gray-800 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(ads[currentAdIndex].status)}`}
                        >
                          {ads[currentAdIndex].status}
                        </Badge>
                      </div>
                    </div>

                    {/* Ad Content */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-fluid-base">
                        {ads[currentAdIndex].title}
                      </h3>
                      <p className="text-sm text-gray-300 line-clamp-2">
                        {ads[currentAdIndex].description}
                      </p>
                      
                      {/* Metrics (Admin/Advertiser only) */}
                      {isAdminOrAdvertiser && (
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 pt-2 border-t border-gray-600">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {formatNumber(ads[currentAdIndex].metrics.impressions)}
                          </div>
                          <div className="flex items-center">
                            <BarChart3 className="w-3 h-3 mr-1" />
                            {ads[currentAdIndex].metrics.ctr.toFixed(1)}% CTR
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button 
                        className="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-3 px-4 text-sm font-medium transition-colors"
                        size="default"
                      >
                        {ads[currentAdIndex].cta}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Panel */}
              {showAdminPanel && isAdminOrAdvertiser && (
                <div className="border-t border-gray-600 p-4 bg-[#11204a] rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Ad Management</h4>
                    <Button
                      size="sm"
                      onClick={() => setIsCreatingAd(true)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      New Ad
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {ads.map((ad) => (
                      <div key={ad.id} className="flex items-center space-x-3 p-2 bg-[#16203a] rounded border border-gray-600">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-12 h-8 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-medium text-white truncate">
                            {ad.title}
                          </h5>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getStatusColor(ad.status)}`}
                            >
                              {ad.status}
                            </Badge>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getPriorityColor(ad.priority)}`}
                            >
                              {ad.priority}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingAd(ad)}
                            className="p-1 text-cyan-300 hover:bg-[#0a1834]"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAds(ads.filter(a => a.id !== ad.id));
                            }}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Toggle */}
              {isAdminOrAdvertiser && (
                <Button
                  variant="ghost"
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="text-cyan-300 hover:bg-[#0a1834]"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {showAdminPanel ? 'Hide Admin Panel' : 'Show Admin Panel'}
                </Button>
              )}
            </CardContent>
          )}

          {/* Admin Modal */}
          {(isCreatingAd || editingAd) && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md bg-white dark:bg-[#16203a]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                    {isCreatingAd ? 'Create New Ad' : 'Edit Ad'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <Input 
                      placeholder="Ad title"
                      defaultValue={editingAd?.title}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <Textarea 
                      placeholder="Ad description"
                      defaultValue={editingAd?.description}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Image URL</label>
                    <Input 
                      placeholder="https://example.com/image.jpg"
                      defaultValue={editingAd?.image}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Link</label>
                    <Input 
                      placeholder="https://example.com"
                      defaultValue={editingAd?.link}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Call to Action</label>
                    <Input 
                      placeholder="Learn More"
                      defaultValue={editingAd?.cta}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <Select defaultValue={editingAd?.status || 'draft'}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Priority</label>
                    <Select defaultValue={editingAd?.priority || 'medium'}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rotate" defaultChecked />
                    <label htmlFor="auto-rotate" className="text-sm text-gray-700 dark:text-gray-300">
                      Auto-rotate in carousel
                    </label>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsCreatingAd(false);
                        setEditingAd(null);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1">
                      {isCreatingAd ? 'Create Ad' : 'Save Changes'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default RightAdPanel; 