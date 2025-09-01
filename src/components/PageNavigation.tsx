import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PageNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Define page order for navigation
  const pageOrder = [
    "/",
    "/features",
    "/courses", 
    "/vendors",
    "/course-library",
    "/virtual-classroom",
    "/quiz-builder",
    "/authoring-tool",
    "/meet-ai",
    "/about",
    "/contact",
    "/dashboard",
    "/dashboard/courses",
    "/dashboard/enrollments",
    "/dashboard/revenue",
    "/dashboard/analytics",
    "/dashboard/collaboration",
    "/dashboard/whiteboard",
    "/dashboard/meetings",
    "/dashboard/documents",
    "/dashboard/forums",
    "/dashboard/users",
    "/dashboard/library",
    "/dashboard/templates",
    "/dashboard/recommendations",
    "/dashboard/settings",
    "/student-portal",
    "/course-viewer/1",
    "/advertiser-portal",
    "/vendor-portal",
    "/signin",
    "/signup",
    "/get-demo",
    "/get-quote",
    "/free-trial",
    "/case-studies",
    "/start-learning",
    "/become-instructor",
    "/career-guidance",
    "/create-course"
  ];

  const currentPageIndex = pageOrder.indexOf(location.pathname);
  const hasPrevious = currentPageIndex > 0;
  const hasNext = currentPageIndex >= 0 && currentPageIndex < pageOrder.length - 1;

  // Show scroll buttons when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButtons(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (hasPrevious) {
      navigate(pageOrder[currentPageIndex - 1]);
    }
  };

  const goToNextPage = () => {
    if (hasNext) {
      navigate(pageOrder[currentPageIndex + 1]);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Navigation Buttons */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Go Back Button */}
        <Button
          onClick={goBack}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          title="Return to Previous Page"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Home Button */}
        <Button
          onClick={goHome}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
          title="Go to Homepage"
        >
          <Home className="h-5 w-5" />
        </Button>

        {/* Previous Page Button */}
        {hasPrevious && (
          <Button
            onClick={goToPreviousPage}
            variant="outline"
            className="bg-white border-gray-300 hover:bg-gray-50 rounded-full w-12 h-12 p-0 shadow-lg"
            title="Previous Section"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Next Page Button */}
        {hasNext && (
          <Button
            onClick={goToNextPage}
            variant="outline"
            className="bg-white border-gray-300 hover:bg-gray-50 rounded-full w-12 h-12 p-0 shadow-lg"
            title="Next Section"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Scroll Buttons */}
      {showScrollButtons && (
        <div className="flex flex-col gap-2">
          <Button
            onClick={scrollToTop}
            variant="secondary"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
            title="Scroll Up"
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
          <Button
            onClick={scrollToBottom}
            variant="secondary"
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-full w-12 h-12 p-0 shadow-lg"
            title="Scroll Down"
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageNavigation;