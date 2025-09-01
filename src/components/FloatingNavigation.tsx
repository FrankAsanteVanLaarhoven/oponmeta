import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronUp, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight, 
  Home,
  Menu,
  X
} from 'lucide-react';

interface FloatingNavigationProps {
  showHomeButton?: boolean;
  showScrollButtons?: boolean;
  showNavigationButtons?: boolean;
}

const FloatingNavigation: React.FC<FloatingNavigationProps> = ({
  showHomeButton = true,
  showScrollButtons = true,
  showNavigationButtons = true
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Show/hide floating nav based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll functions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ 
      top: document.documentElement.scrollHeight, 
      behavior: 'smooth' 
    });
  };

  const scrollUp = () => {
    window.scrollBy({ top: -300, behavior: 'smooth' });
  };

  const scrollDown = () => {
    window.scrollBy({ top: 300, behavior: 'smooth' });
  };

  // Navigation functions
  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  // Course navigation (if on course pages)
  const isCoursePage = location.pathname.includes('/course') || 
                      location.pathname.includes('/student-portal') ||
                      location.pathname.includes('/dashboard');

  if (!isVisible) return null;

  return (
    <>
      {/* Main Floating Navigation */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {/* Toggle Menu Button */}
        <Button
          onClick={() => setShowMenu(!showMenu)}
          className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
          aria-label="Toggle navigation menu"
        >
          {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Navigation Menu */}
        {showMenu && (
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-300">
            {/* Home Button */}
            {showHomeButton && (
              <Button
                onClick={goHome}
                className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                aria-label="Go to home page"
                title="Home"
              >
                <Home className="h-5 w-5" />
              </Button>
            )}

            {/* Navigation Buttons */}
            {showNavigationButtons && (
              <>
                <Button
                  onClick={goBack}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Go back"
                  title="Back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <Button
                  onClick={goForward}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Go forward"
                  title="Forward"
                >
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Scroll Buttons */}
            {showScrollButtons && (
              <>
                <Button
                  onClick={scrollToTop}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Scroll to top"
                  title="Top"
                >
                  <ChevronUp className="h-5 w-5" />
                </Button>

                <Button
                  onClick={scrollUp}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Scroll up"
                  title="Scroll Up"
                >
                  <ChevronUp className="h-5 w-5" />
                </Button>

                <Button
                  onClick={scrollDown}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Scroll down"
                  title="Scroll Down"
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>

                <Button
                  onClick={scrollToBottom}
                  className="h-12 w-12 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300"
                  aria-label="Scroll to bottom"
                  title="Bottom"
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Course-specific floating navigation (if on course pages) */}
      {isCoursePage && (
        <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
          <Button
            onClick={() => navigate('/student-portal')}
            className="h-12 px-4 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300 text-sm font-medium"
            aria-label="Go to student portal"
            title="Student Portal"
          >
            <Home className="h-4 w-4 mr-2" />
            Portal
          </Button>

          <Button
            onClick={() => navigate('/courses')}
            className="h-12 px-4 rounded-full bg-[#11204a] hover:bg-[#16203a] text-white shadow-lg border-2 border-[#0a1834] transition-all duration-300 text-sm font-medium"
            aria-label="Go to courses"
            title="Courses"
          >
            <Menu className="h-4 w-4 mr-2" />
            Courses
          </Button>
        </div>
      )}
    </>
  );
};

export default FloatingNavigation; 