import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Clock, 
  Users, 
  Play, 
  BookOpen, 
  Award, 
  Heart, 
  Bookmark, 
  ThumbsUp, 
  ShoppingCart,
  Star as StarIcon
} from 'lucide-react';
import { Course } from '@/types/course';
import { toast } from 'sonner';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: number) => void;
  onFavorite?: (courseId: number) => void;
  variant?: 'default' | 'compact' | 'featured';
  showProgress?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onEnroll,
  onFavorite,
  variant = 'default',
  showProgress = false
}) => {
  const [favorited, setFavorited] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [liked, setLiked] = useState(false);

  // Initialize state from localStorage (mock implementation)
  useEffect(() => {
    // In real app, this would check localStorage or API
    setFavorited(false);
    setWishlisted(false);
    setLiked(false);
  }, [course.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-yellow-500';
    if (rating >= 4.0) return 'text-yellow-400';
    if (rating >= 3.5) return 'text-yellow-300';
    return 'text-gray-400';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Action handlers
  const handleFavorite = () => {
    setFavorited(!favorited);
    toast.success(favorited ? 'Removed from favorites' : 'Added to favorites!');
  };

  const handleWishlist = () => {
    setWishlisted(!wishlisted);
    toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Removed like' : 'Course liked!');
  };

  const handlePurchase = () => {
    toast.success(`Redirecting to purchase ${course.title}`);
  };

  const handlePreview = () => {
    toast.success(`Opening preview for ${course.title}`);
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</h3>
              <p className="text-xs text-gray-600 mb-2">by {course.instructor}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-current text-yellow-400" />
                <span>{course.rating}</span>
                <span>({course.reviews?.length || 0})</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{formatPrice(course.price)}</p>
              {course.originalPrice && course.originalPrice > course.price && (
                <p className="text-xs text-gray-500 line-through">
                  {formatPrice(course.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
        {course.isBestseller && (
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-xs font-bold z-10">
            BESTSELLER
          </div>
        )}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-purple-50">
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Badge className={getDifficultyColor(course.difficulty || 'beginner')}>
              {course.difficulty}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-current text-yellow-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-gray-500">({course.reviews?.length || 0} reviews)</span>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4 mr-2" />
              Start Learning
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant - Enhanced Course Card
  return (
    <Card className="bg-white text-black border border-gray-300 hover:bg-gray-100 transition-all duration-300 group overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-blue-600 text-white text-xs">
            {course.category}
          </Badge>
          {course.isFree && (
            <Badge className="bg-green-500 text-white font-semibold text-xs">
              FREE
            </Badge>
          )}
        </div>
        
        {/* Interactive Icons Overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 rounded-full backdrop-blur-md transition-colors ${
              favorited ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            onClick={handleFavorite}
          >
            <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 rounded-full backdrop-blur-md transition-colors ${
              wishlisted ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            onClick={handleWishlist}
          >
            <Bookmark className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 rounded-full backdrop-blur-md transition-colors ${
              liked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            onClick={handleLike}
          >
            <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Preview Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            size="sm" 
            className="bg-blue-600/90 backdrop-blur-md text-white hover:bg-blue-700"
            onClick={handlePreview}
          >
            <Play className="h-4 w-4 mr-2" />
            Preview Course
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                {course.title}
              </h3>
              {course.isBestseller && (
                <Badge className="bg-yellow-100 text-yellow-800 text-xs ml-2">
                  Top Rated
                </Badge>
              )}
            </div>
            <p className="text-gray-700 text-sm">Instructor: {course.instructor}</p>
            <p className="text-gray-700 text-sm mt-1 line-clamp-2">{course.description}</p>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center space-x-1 text-gray-700">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <Play className="h-3 w-3" />
              <span>{course.lessonsCount} modules</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-700">
              <Users className="h-3 w-3" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="text-gray-700">
              <Badge variant="outline" className="border-gray-300 text-gray-700 text-xs">
                {course.level}
              </Badge>
            </div>
          </div>

          {/* Progress Bar (if user is enrolled) */}
          {showProgress && course.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-700">
                <span>Course Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Rating and Update Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <StarIcon className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-gray-900 font-medium">{course.rating} / 5</span>
              <span className="text-gray-700">({course.students.toLocaleString()} learners)</span>
            </div>
            <div className="text-xs text-gray-700">
              Updated {new Date(course.lastUpdated).toLocaleDateString()}
            </div>
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              {course.isFree ? (
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">FREE</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <span className="text-xs text-green-600">
                      Save ${course.originalPrice - course.price}
                    </span>
                  )}
                </>
              )}
            </div>
            <Button 
              className={course.isFree 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
              onClick={course.isFree ? handlePreview : handlePurchase}
            >
              {course.isFree 
                ? 'Start Learning' 
                : course.progress !== undefined ? 'Resume Learning' : 'Buy Now'
              }
              {!course.isFree && <ShoppingCart className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;