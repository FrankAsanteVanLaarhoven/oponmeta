import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, BookOpen, MapPin, Award } from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  description: string;
  logo: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  location: string;
  specializations: string[];
  verified: boolean;
  joinedDate: string;
}

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img 
                src={vendor.logo} 
                alt={vendor.name}
                className="w-16 h-16 rounded-lg object-cover border-2 border-white/20"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white truncate group-hover:text-blue-200 transition-colors">
                  {vendor.name}
                </h3>
                {vendor.verified && (
                  <Badge className="bg-green-500 text-white px-2 py-1 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Verified Partner
                  </Badge>
                )}
              </div>
              <p className="text-blue-100 text-sm mt-1 line-clamp-2">{vendor.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-white font-medium text-sm">{vendor.rating}</span>
              </div>
              <p className="text-blue-100 text-xs">Rating</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-blue-300 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-white font-medium text-sm">{vendor.totalStudents.toLocaleString()}</span>
              </div>
              <p className="text-blue-100 text-xs">Learners</p>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-purple-300 mb-1">
                <BookOpen className="h-4 w-4" />
                <span className="text-white font-medium text-sm">{vendor.totalCourses}</span>
              </div>
                              <p className="text-blue-100 text-xs">Programmes</p>
            </div>
          </div>

          {/* Location and Specializations */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-blue-100">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{vendor.location}</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {vendor.specializations.map((spec, index) => (
                <Badge 
                  key={index} 
                  className="bg-purple-500/20 text-purple-200 border-purple-400/30 text-xs"
                >
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button className="flex-1 bg-white text-purple-900 hover:bg-gray-100">
              View Organization
            </Button>
            <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              See All Courses
            </Button>
          </div>

          {/* Join Date */}
          <p className="text-blue-100/70 text-xs text-center">
            Partner since {vendor.joinedDate}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;