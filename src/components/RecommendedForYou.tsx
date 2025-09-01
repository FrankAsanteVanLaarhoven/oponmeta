import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, Play, Heart, Bookmark, ThumbsUp as ThumbsUpIcon, Sparkles } from 'lucide-react';
import { Course } from '@/data/coursesData';
import { coursesData } from '@/data/coursesData';
import { multilingualContentService } from '@/utils/multilingualContent';
import { 
  getRecentlyViewed, 
  getFavorites, 
  getWishlist, 
  getLikes,
  toggleFavorite, 
  isFavorite, 
  toggleWishlist, 
  isWishlisted, 
  toggleLike, 
  isLiked,
  addRecentlyViewed 
} from '@/utils/userContentActions';

interface RecommendedForYouProps {
  title?: string;
  maxItems?: number;
  showActions?: boolean;
}

const RecommendedForYou: React.FC<RecommendedForYouProps> = ({ 
  title = "Recommended for You", 
  maxItems = 6,
  showActions = true 
}) => {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user's activity data
  const userActivity = useMemo(() => {
    const recentlyViewed = getRecentlyViewed();
    const favorites = getFavorites();
    const wishlist = getWishlist();
    const likes = getLikes();
    
    return {
      recentlyViewed,
      favorites,
      wishlist,
      likes,
      allActivity: [...recentlyViewed, ...favorites, ...wishlist, ...likes]
    };
  }, []);

  // Generate recommendations based on user activity
  useEffect(() => {
    const generateRecommendations = () => {
      let recommendedCourses: Course[] = [];
      
      // If user has activity, use it to generate recommendations
      if (userActivity.allActivity.length > 0) {
        // Get courses that match user's interests
        const userInterests = new Set(userActivity.allActivity);
        
        // Score courses based on user activity
        const scoredCourses = coursesData.map(course => {
          let score = 0;
          
          // Base score for being in user's activity
          if (userInterests.has(course.id)) {
            score += 10;
          }
          
          // Bonus for being in multiple lists
          if (userActivity.favorites.includes(course.id)) score += 5;
          if (userActivity.wishlist.includes(course.id)) score += 3;
          if (userActivity.likes.includes(course.id)) score += 2;
          
          // Score for similar categories (if user has activity)
          const userCategories = new Set();
          userActivity.allActivity.forEach(id => {
            const course = coursesData.find(c => c.id === id);
            if (course) userCategories.add(course.category);
          });
          
          if (userCategories.has(course.category)) {
            score += 3;
          }
          
          // Score for high ratings
          if (course.rating >= 4.5) score += 2;
          if (course.rating >= 4.0) score += 1;
          
          // Score for popular courses
          if (course.students > 10000) score += 1;
          if (course.isBestseller) score += 2;
          
          return { course, score };
        });
        
        // Sort by score and take top recommendations
        recommendedCourses = scoredCourses
          .filter(item => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, maxItems)
          .map(item => item.course);
      }
      
      // If no recommendations from user activity, show popular courses
      if (recommendedCourses.length === 0) {
        recommendedCourses = coursesData
          .filter(course => course.isBestseller || course.rating >= 4.5)
          .sort((a, b) => b.students - a.students)
          .slice(0, maxItems);
      }
      
      setRecommendations(recommendedCourses);
      setLoading(false);
    };

    generateRecommendations();
  }, [userActivity, maxItems]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(maxItems)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">{title}</h2>
        {userActivity.allActivity.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            Personalised
          </Badge>
        )}
      </div>
      
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((course) => (
            <RecommendedCourseCard 
              key={course.id} 
              course={course} 
              showActions={showActions}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">
            Start exploring courses to get personalised recommendations.
          </p>
        </div>
      )}
    </div>
  );
};

// Recommended Course Card Component
interface RecommendedCourseCardProps {
  course: Course;
  showActions: boolean;
}

const RecommendedCourseCard: React.FC<RecommendedCourseCardProps> = ({ course, showActions }) => {
  const [favorited, setFavorited] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(course.id));
    setWishlisted(isWishlisted(course.id));
    setLiked(isLiked(course.id));
  }, [course.id]);

  useEffect(() => {
    addRecentlyViewed(course.id);
  }, [course.id]);

  const handleFavorite = () => {
    toggleFavorite(course.id);
    setFavorited(!favorited);
  };

  const handleWishlist = () => {
    toggleWishlist(course.id);
    setWishlisted(!wishlisted);
  };

  const handleLike = () => {
    toggleLike(course.id);
    setLiked(!liked);
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {showActions && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 w-7 p-0 rounded-full backdrop-blur-md ${
                favorited ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite();
              }}
            >
              <Heart className={`h-3 w-3 ${favorited ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 w-7 p-0 rounded-full backdrop-blur-md ${
                wishlisted ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleWishlist();
              }}
            >
              <Bookmark className={`h-3 w-3 ${wishlisted ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className={`h-7 w-7 p-0 rounded-full backdrop-blur-md ${
                liked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
                              <ThumbsUpIcon className={`h-3 w-3 ${liked ? 'fill-current' : ''}`} />
            </Button>
          </div>
        )}

        <div className="absolute top-2 left-2">
          <Badge className="bg-primary text-primary-foreground text-xs">
            {course.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">by {course.instructor}</p>
          </div>

          {/* Course Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{course.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${course.price}</span>
              {course.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${course.originalPrice}</span>
              )}
            </div>
            <Button size="sm" className="text-xs">
              {course.progress !== undefined ? 'Resume' : 'View'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedForYou; 