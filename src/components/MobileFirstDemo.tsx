import React, { useState } from 'react';
import { 
  Container, 
  PageContainer, 
  MobileContainer, 
  ContentContainer 
} from '@/components/ui/Container';
import { 
  AdaptiveGrid, 
  CourseGrid, 
  CardGrid, 
  FeatureGrid 
} from '@/components/ui/AdaptiveGrid';
import { 
  TouchButton, 
  MobileButton, 
  MobileSecondaryButton, 
  TouchButtonLarge 
} from '@/components/ui/TouchButton';
import { 
  ResponsiveImage, 
  CourseImage, 
  ProfileImage, 
  HeroImage 
} from '@/components/ui/ResponsiveImage';
import { 
  MobileSheet, 
  BottomSheet, 
  TopSheet, 
  SideSheet 
} from '@/components/ui/MobileSheet';
import { 
  useMobileState, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useIsPortrait,
  useIsOnline,
  useIsTouchDevice,
  useConnectionType
} from '@/context/MobileContext';
import { useTouch, useSwipe } from '@/hooks/useTouch';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Wifi, 
  WifiOff, 
  RotateCcw,
  MousePointer,
  Zap,
  Users,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const MobileFirstDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSheet, setShowSheet] = useState(false);
  
  // Mobile context hooks
  const mobileState = useMobileState();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const isPortrait = useIsPortrait();
  const isOnline = useIsOnline();
  const isTouchDevice = useIsTouchDevice();
  const connectionType = useConnectionType();

  // Touch handling
  const { touchHandlers, swipeState } = useTouch({
    onSwipe: (direction, distance) => {
      console.log(`Swiped ${direction} with distance ${distance}px`);
    },
    onTap: (position) => {
      console.log(`Tapped at position ${position.x}, ${position.y}`);
    }
  });

  const demoCards = [
    {
      id: 1,
      title: 'Responsive Design',
      description: 'Mobile-first approach with fluid typography and spacing',
      icon: <Smartphone className="w-8 h-8 text-oponm-600" />,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
    },
    {
      id: 2,
                      title: 'Touch Optimised',
      description: '44px minimum touch targets with advanced gesture support',
      icon: <MousePointer className="w-8 h-8 text-oponm-600" />,
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Performance Focused',
                      description: 'Lazy loading, code splitting, and optimised images',
      icon: <Zap className="w-8 h-8 text-oponm-600" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Accessibility First',
      description: 'WCAG compliant with keyboard and screen reader support',
      icon: <Users className="w-8 h-8 text-oponm-600" />,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    }
  ];

  const courseCards = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.8,
      students: 1247,
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop'
    },
    {
      id: 2,
      title: 'Mobile App Design Principles',
      instructor: 'Mike Chen',
      rating: 4.9,
      students: 892,
      price: 69.99,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Rodriguez',
      rating: 4.7,
      students: 2156,
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
    }
  ];

  return (
    <PageContainer className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
          Mobile-First Design Demo
        </h1>
        <p className="text-lg md:text-xl text-black font-medium max-w-3xl mx-auto">
          Experience our world-class responsive design system built for modern devices
        </p>
      </div>

      {/* Device Status Bar */}
      <div className="bg-white rounded-lg shadow-mobile p-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="flex items-center space-x-2">
            {isMobile ? <Smartphone className="w-5 h-5 text-green-600" /> : 
             isTablet ? <Tablet className="w-5 h-5 text-blue-600" /> : 
             <Monitor className="w-5 h-5 text-purple-600" />}
            <span className="text-sm font-medium text-black">
              {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <RotateCcw className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-black">
              {isPortrait ? 'Portrait' : 'Landscape'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOnline ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-red-600" />}
            <span className="text-sm font-medium text-black">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <MousePointer className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-black">
              {isTouchDevice ? 'Touch' : 'Mouse'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-black">
              {connectionType}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-black">
              {mobileState.viewport.width} × {mobileState.viewport.height}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['overview', 'components', 'grids', 'images', 'sheets'].map((tab) => (
          <TouchButton
            key={tab}
            variant={activeTab === tab ? 'mobile' : 'mobile-secondary'}
            size="mobile"
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab}
          </TouchButton>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-oponm-600 to-oponm-800 rounded-lg p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  World-Class Mobile Experience
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Built with performance, accessibility, and user experience in mind. 
                  Every component is optimised for touch interactions and responsive design.
                </p>
                <div className="flex flex-wrap gap-4">
                  <TouchButtonLarge variant="mobile-secondary">
                    Get Started
                  </TouchButtonLarge>
                  <TouchButtonLarge variant="mobile-ghost">
                    Learn More
                  </TouchButtonLarge>
                </div>
              </div>
              <div className="hidden md:block">
                <HeroImage
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
                  alt="Mobile-first design"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <FeatureGrid>
            {demoCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg shadow-mobile p-6 hover:shadow-mobile-md transition-shadow"
                {...touchHandlers}
              >
                <div className="flex items-center mb-4">
                  {card.icon}
                  <h3 className="text-xl font-bold text-black ml-3">{card.title}</h3>
                </div>
                <p className="text-black font-medium mb-4">{card.description}</p>
                <ResponsiveImage
                  src={card.image}
                  alt={card.title}
                  aspectRatio="wide"
                  className="rounded-lg mb-4"
                />
                <TouchButton variant="mobile" size="mobile" fullWidth>
                  Learn More
                </TouchButton>
              </div>
            ))}
          </FeatureGrid>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="space-y-8">
                          <h2 className="text-3xl font-bold text-black mb-6">Touch-Optimised Components</h2>
          
          {/* Button Showcase */}
          <div className="bg-white rounded-lg shadow-mobile p-6">
            <h3 className="text-xl font-bold text-black mb-4">Button Variants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MobileButton>Primary</MobileButton>
              <MobileSecondaryButton>Secondary</MobileSecondaryButton>
              <TouchButton variant="outline" size="mobile">Outline</TouchButton>
              <TouchButton variant="ghost" size="mobile">Ghost</TouchButton>
            </div>
          </div>

          {/* Container Showcase */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-black">Container System</h3>
            <div className="bg-white rounded-lg shadow-mobile p-6">
              <ContentContainer>
                <p className="text-black font-medium">Content Container - Medium width with responsive padding</p>
              </ContentContainer>
            </div>
            <div className="bg-white rounded-lg shadow-mobile p-6">
              <MobileContainer>
                <p className="text-black font-medium">Mobile Container - Optimised for small screens</p>
              </MobileContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'grids' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-black mb-6">Adaptive Grid System</h2>
          
          {/* Course Grid */}
          <div>
            <h3 className="text-xl font-bold text-black mb-4">Course Grid (1-2-3-4 columns)</h3>
            <CourseGrid>
              {courseCards.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-mobile overflow-hidden">
                  <CourseImage
                    src={course.image}
                    alt={course.title}
                    className="w-full"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold text-black mb-2">{course.title}</h4>
                    <p className="text-black font-medium mb-2">by {course.instructor}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-black font-medium">{course.rating}</span>
                        <span className="text-gray-600">({course.students})</span>
                      </div>
                      <span className="text-lg font-bold text-oponm-600">${course.price}</span>
                    </div>
                    <TouchButton variant="mobile" size="mobile" fullWidth>
                      Enroll Now
                    </TouchButton>
                  </div>
                </div>
              ))}
            </CourseGrid>
          </div>

          {/* Auto Grid */}
          <div>
            <h3 className="text-xl font-bold text-black mb-4">Auto-Fit Grid</h3>
            <AdaptiveGrid autoFit gap="lg">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-mobile p-6">
                  <div className="w-12 h-12 bg-oponm-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-oponm-600">{i + 1}</span>
                  </div>
                  <h4 className="text-lg font-bold text-black mb-2">Auto Grid Item {i + 1}</h4>
                  <p className="text-black font-medium">Responsive auto-fitting grid item</p>
                </div>
              ))}
            </AdaptiveGrid>
          </div>
        </div>
      )}

      {activeTab === 'images' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-black mb-6">Responsive Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Course Image (16:9)</h3>
              <CourseImage
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop"
                alt="Course thumbnail"
                className="rounded-lg"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Profile Image (1:1)</h3>
              <ProfileImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
                alt="Profile picture"
                className="rounded-full"
              />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Hero Image (21:9)</h3>
              <HeroImage
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=257&fit=crop"
                alt="Hero banner"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sheets' && (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-black mb-6">Mobile Sheets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Bottom Sheet</h3>
              <BottomSheet
                trigger={
                  <TouchButton variant="mobile" size="mobile" fullWidth>
                    Open Bottom Sheet
                  </TouchButton>
                }
                title="Bottom Sheet"
              >
                <div className="p-6">
                  <h4 className="text-lg font-bold text-black mb-4">Bottom Sheet Content</h4>
                  <p className="text-black font-medium mb-4">
                    This is a mobile-optimised bottom sheet with touch interactions.
                  </p>
                  <TouchButton variant="mobile" size="mobile" fullWidth>
                    Action Button
                  </TouchButton>
                </div>
              </BottomSheet>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Top Sheet</h3>
              <TopSheet
                trigger={
                  <TouchButton variant="mobile-secondary" size="mobile" fullWidth>
                    Open Top Sheet
                  </TouchButton>
                }
                title="Top Sheet"
              >
                <div className="p-6">
                  <h4 className="text-lg font-bold text-black mb-4">Top Sheet Content</h4>
                  <p className="text-black font-medium mb-4">
                    This sheet slides down from the top of the screen.
                  </p>
                  <TouchButton variant="mobile-secondary" size="mobile" fullWidth>
                    Action Button
                  </TouchButton>
                </div>
              </TopSheet>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-black mb-3">Side Sheet</h3>
              <SideSheet
                side="right"
                trigger={
                  <TouchButton variant="outline" size="mobile" fullWidth>
                    Open Side Sheet
                  </TouchButton>
                }
                title="Side Sheet"
              >
                <div className="p-6">
                  <h4 className="text-lg font-bold text-black mb-4">Side Sheet Content</h4>
                  <p className="text-black font-medium mb-4">
                    This sheet slides in from the side of the screen.
                  </p>
                  <TouchButton variant="outline" size="mobile" fullWidth>
                    Action Button
                  </TouchButton>
                </div>
              </SideSheet>
            </div>
          </div>
        </div>
      )}

      {/* Swipe Demo */}
      <div className="bg-white rounded-lg shadow-mobile p-6 mt-8">
        <h3 className="text-xl font-bold text-black mb-4">Touch Interactions Demo</h3>
        <div 
          className="bg-gray-100 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center"
          {...touchHandlers}
        >
          <div>
            <p className="text-black font-medium mb-2">
              {swipeState.isSwiping 
                ? `Swiping ${swipeState.direction} (${swipeState.distance}px)`
                : 'Touch, tap, or swipe this area to see interactions'
              }
            </p>
            <p className="text-sm text-gray-600">
              Try swiping in different directions or tapping
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MobileFirstDemo;
