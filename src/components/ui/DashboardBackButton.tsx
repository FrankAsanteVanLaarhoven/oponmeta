import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React from "react";

const DashboardBackButton: React.FC<{ className?: string }> = ({ className = "" }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-2 ${className}`}
      aria-label="Back"
    >
      <ChevronLeft className="h-5 w-5 mr-1" />
      <span className="font-medium">Back</span>
    </Button>
  );
};

export default DashboardBackButton; 