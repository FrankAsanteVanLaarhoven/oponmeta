// User content actions utilities
// These functions handle user interactions with courses like favorites, wishlist, likes, etc.

const STORAGE_KEYS = {
  FAVORITES: 'user_favorites',
  WISHLIST: 'user_wishlist',
  LIKES: 'user_likes',
  RECENTLY_VIEWED: 'user_recently_viewed'
};

// Helper function to get stored data
const getStoredData = (key: string): string[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return [];
  }
};

// Helper function to save data
const saveStoredData = (key: string, data: string[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Favorites functionality
export const toggleFavorite = (courseId: string): void => {
  const favorites = getStoredData(STORAGE_KEYS.FAVORITES);
  const index = favorites.indexOf(courseId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(courseId);
  }
  
  saveStoredData(STORAGE_KEYS.FAVORITES, favorites);
};

export const isFavorite = (courseId: string): boolean => {
  const favorites = getStoredData(STORAGE_KEYS.FAVORITES);
  return favorites.includes(courseId);
};

export const getFavorites = (): string[] => {
  return getStoredData(STORAGE_KEYS.FAVORITES);
};

// Wishlist functionality
export const toggleWishlist = (courseId: string): void => {
  const wishlist = getStoredData(STORAGE_KEYS.WISHLIST);
  const index = wishlist.indexOf(courseId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(courseId);
  }
  
  saveStoredData(STORAGE_KEYS.WISHLIST, wishlist);
};

export const isWishlisted = (courseId: string): boolean => {
  const wishlist = getStoredData(STORAGE_KEYS.WISHLIST);
  return wishlist.includes(courseId);
};

export const getWishlist = (): string[] => {
  return getStoredData(STORAGE_KEYS.WISHLIST);
};

// Likes functionality
export const toggleLike = (courseId: string): void => {
  const likes = getStoredData(STORAGE_KEYS.LIKES);
  const index = likes.indexOf(courseId);
  
  if (index > -1) {
    likes.splice(index, 1);
  } else {
    likes.push(courseId);
  }
  
  saveStoredData(STORAGE_KEYS.LIKES, likes);
};

export const isLiked = (courseId: string): boolean => {
  const likes = getStoredData(STORAGE_KEYS.LIKES);
  return likes.includes(courseId);
};

export const getLikes = (): string[] => {
  return getStoredData(STORAGE_KEYS.LIKES);
};

// Recently viewed functionality
export const addRecentlyViewed = (courseId: string): void => {
  const recentlyViewed = getStoredData(STORAGE_KEYS.RECENTLY_VIEWED);
  const index = recentlyViewed.indexOf(courseId);
  
  // Remove if already exists (to move to front)
  if (index > -1) {
    recentlyViewed.splice(index, 1);
  }
  
  // Add to front
  recentlyViewed.unshift(courseId);
  
  // Keep only last 20 items
  const limitedList = recentlyViewed.slice(0, 20);
  
  saveStoredData(STORAGE_KEYS.RECENTLY_VIEWED, limitedList);
};

export const getRecentlyViewed = (): string[] => {
  return getStoredData(STORAGE_KEYS.RECENTLY_VIEWED);
};

export const clearRecentlyViewed = (): void => {
  localStorage.removeItem(STORAGE_KEYS.RECENTLY_VIEWED);
};

// Course enrollment functionality
export const enrollInCourse = (courseId: string): void => {
  const enrollments = getStoredData('user_enrollments');
  if (!enrollments.includes(courseId)) {
    enrollments.push(courseId);
    saveStoredData('user_enrollments', enrollments);
  }
};

export const isEnrolled = (courseId: string): boolean => {
  const enrollments = getStoredData('user_enrollments');
  return enrollments.includes(courseId);
};

export const getEnrollments = (): string[] => {
  return getStoredData('user_enrollments');
};

// Course progress functionality
export const updateCourseProgress = (courseId: string, progress: number): void => {
  try {
    const progressData = localStorage.getItem('course_progress');
    const progressMap = progressData ? JSON.parse(progressData) : {};
    progressMap[courseId] = progress;
    localStorage.setItem('course_progress', JSON.stringify(progressMap));
  } catch (error) {
    console.error('Error updating course progress:', error);
  }
};

export const getCourseProgress = (courseId: string): number => {
  try {
    const progressData = localStorage.getItem('course_progress');
    const progressMap = progressData ? JSON.parse(progressData) : {};
    return progressMap[courseId] || 0;
  } catch (error) {
    console.error('Error getting course progress:', error);
    return 0;
  }
};

// Analytics tracking
export const trackCourseView = (courseId: string): void => {
  // In a real app, this would send analytics data to a service
  console.log(`Course viewed: ${courseId}`);
};

export const trackCoursePurchase = (courseId: string, price: number): void => {
  // In a real app, this would send purchase analytics
  console.log(`Course purchased: ${courseId} for $${price}`);
};

// Export all storage keys for external use
export { STORAGE_KEYS }; 