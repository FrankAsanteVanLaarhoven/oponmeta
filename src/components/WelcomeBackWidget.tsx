import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';

interface WelcomeBackWidgetProps {
  userName?: string;
  className?: string;
}

const WelcomeBackWidget: React.FC<WelcomeBackWidgetProps> = ({ 
  userName = "Alex", 
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    navigate('/student-dashboard');
  };

  const handleBrowseCourses = () => {
    navigate('/course-browsing');
  };

  return (
    <div className={`bg-blue-900 rounded-lg p-6 text-white ${className}`}>
      <h2 className="text-2xl font-bold mb-2">
        Welcome back, {userName}!
      </h2>
      <p className="text-lg mb-6 text-blue-100">
        Ready to continue your learning journey?
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={handleContinueLearning}
          className="bg-white text-blue-900 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Continue Learning
        </Button>
        
        <Button 
          onClick={handleBrowseCourses}
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Browse Courses
        </Button>
      </div>
    </div>
  );
};

export default WelcomeBackWidget;
