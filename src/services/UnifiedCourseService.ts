import { supabase } from '../lib/supabase';

// Unified Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  detailedDescription?: string;
  instructor: string;
  instructorId?: string;
  image: string;
  thumbnail?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  category: string;
  categoryId?: string;
  subcategoryId?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  duration: string;
  durationHours?: number;
  lessonsCount: number;
  students: number;
  rating: number;
  lastUpdated: string;
  createdAt?: string;
  updatedAt?: string;
  certificate: boolean;
  accessType: 'free' | 'paid' | 'subscription';
  status: 'draft' | 'published' | 'archived';
  isPublished?: boolean;
  isBestseller?: boolean;
  progress?: number;
  tags?: string[];
  language: string;
  subtitles?: string[];
  requirements?: string[];
  prerequisites?: string[];
  whatYouWillLearn?: string[];
  learningObjectives?: string[];
  targetAudience?: string[];
  reviews?: CourseReview[];
  content?: CourseContent;
  enrollmentLimit?: number;
  currentEnrollments?: number;
  salesCount?: number;
  revenue?: number;
  creatorId?: string;
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface CourseContent {
  lessons: Lesson[];
  quizzes: Quiz[];
  assignments: Assignment[];
  sections?: CourseSection[];
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  sortOrder: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  sortOrder?: number;
  lessonType?: 'video' | 'text' | 'quiz' | 'assignment' | 'live_session' | 'interactive' | 'scorm';
  isPreview?: boolean;
  estimatedDuration?: number;
  resources?: Resource[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number;
  passingScore?: number;
  attempts?: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  dueDate?: string;
  points: number;
  submissionType: 'file' | 'text' | 'url';
  resources?: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'document' | 'video' | 'audio' | 'image' | 'link';
  url: string;
  description?: string;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status: 'active' | 'completed' | 'dropped' | 'expired';
  progress: number;
  lastAccessedAt?: Date;
  completedAt?: Date;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  moduleId?: string;
  contentId?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  timeSpent: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

export interface CourseFilters {
  searchTerm?: string;
  category?: string;
  level?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
  status?: string;
  instructorId?: string;
  isPublished?: boolean;
  sortBy?: 'title' | 'price' | 'rating' | 'students' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  shortDescription?: string;
  detailedDescription?: string;
  objectives: string[];
  learningObjectives?: string[];
  tags: string[];
  category: string;
  categoryId?: string;
  subcategoryId?: string;
  level: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'all_levels';
  price: number;
  currency?: string;
  language: string;
  image: string;
  thumbnail?: string;
  duration: string;
  durationHours?: number;
  lessonsCount: number;
  certificate: boolean;
  accessType: 'free' | 'paid' | 'subscription';
  enrollmentLimit?: number;
  prerequisites?: string[];
  targetAudience?: string[];
  content?: CourseContent;
  sections?: CourseSection[];
  materials?: CourseMaterial[];
}

export interface CourseMaterial {
  name: string;
  type: 'document' | 'video' | 'audio' | 'image' | 'link';
  file?: File;
  url?: string;
  description: string;
}

export interface CourseSale {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  transactionId: string;
  purchaseDate: string;
  status: 'completed' | 'pending' | 'refunded';
}

// Local storage keys for offline functionality
const COURSES_STORAGE_KEY = 'oponmeta_courses';
const DRAFTS_STORAGE_KEY = 'oponmeta_course_drafts';
const SALES_STORAGE_KEY = 'oponmeta_course_sales';

/**
 * Unified Course Service - World-class course management
 * Handles all course operations with offline support and real-time sync
 */
class UnifiedCourseService {
  private isOnline = navigator.onLine;

  constructor() {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncOfflineData();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // ==================== COURSE CRUD OPERATIONS ====================

  /**
   * Get all courses with advanced filtering and pagination
   */
  async getCourses(filters: CourseFilters = {}): Promise<{ data: Course[]; total: number; error?: string }> {
    try {
      if (this.isOnline) {
        return await this.getCoursesFromAPI(filters);
      } else {
        return await this.getCoursesFromStorage(filters);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      return { data: [], total: 0, error: 'Failed to fetch courses' };
    }
  }

  /**
   * Get a single course by ID
   */
  async getCourseById(id: string): Promise<{ data: Course | null; error?: string }> {
    try {
      if (this.isOnline) {
        const { data, error } = await supabase
          .from('courses')
          .select(`
            *,
            categories (*),
            users!courses_instructor_id_fkey (
              id,
              first_name,
              last_name,
              avatar_url,
              bio
            ),
            course_content (*),
            reviews (
              *,
              users (id, first_name, last_name, avatar_url)
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        return { data: this.transformCourseData(data), error: undefined };
      } else {
        const courses = this.getCoursesFromStorage();
        const course = courses.data.find(c => c.id === id);
        return { data: course || null, error: undefined };
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      return { data: null, error: 'Failed to fetch course' };
    }
  }

  /**
   * Create a new course
   */
  async createCourse(courseData: CourseFormData): Promise<{ data: Course | null; error?: string }> {
    try {
      const course: Course = {
        id: this.generateId(),
        title: courseData.title,
        description: courseData.description,
        shortDescription: courseData.shortDescription,
        detailedDescription: courseData.detailedDescription,
        instructor: 'Current User', // This should come from auth context
        instructorId: 'current-user-id',
        image: courseData.image,
        thumbnail: courseData.thumbnail,
        price: courseData.price,
        currency: courseData.currency || 'USD',
        category: courseData.category,
        categoryId: courseData.categoryId,
        subcategoryId: courseData.subcategoryId,
        level: courseData.level as any,
        difficultyLevel: courseData.difficultyLevel,
        duration: courseData.duration,
        durationHours: courseData.durationHours,
        lessonsCount: courseData.lessonsCount,
        students: 0,
        rating: 0,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        certificate: courseData.certificate,
        accessType: courseData.accessType,
        status: 'draft',
        isPublished: false,
        tags: courseData.tags,
        language: courseData.language,
        prerequisites: courseData.prerequisites,
        targetAudience: courseData.targetAudience,
        learningObjectives: courseData.learningObjectives,
        content: courseData.content,
        enrollmentLimit: courseData.enrollmentLimit,
        currentEnrollments: 0,
        salesCount: 0,
        revenue: 0,
        creatorId: 'current-user-id'
      };

      if (this.isOnline) {
        const { data, error } = await supabase
          .from('courses')
          .insert(this.transformCourseForAPI(course))
          .select()
          .single();

        if (error) throw error;
        return { data: this.transformCourseData(data), error: undefined };
      } else {
        // Store locally for offline mode
        this.saveCourseToStorage(course);
        return { data: course, error: undefined };
      }
    } catch (error) {
      console.error('Error creating course:', error);
      return { data: null, error: 'Failed to create course' };
    }
  }

  /**
   * Update an existing course
   */
  async updateCourse(id: string, updates: Partial<CourseFormData>): Promise<{ data: Course | null; error?: string }> {
    try {
      if (this.isOnline) {
        const { data, error } = await supabase
          .from('courses')
          .update({
            ...updates,
            updatedAt: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return { data: this.transformCourseData(data), error: undefined };
      } else {
        // Update locally
        const courses = this.getCoursesFromStorage();
        const courseIndex = courses.data.findIndex(c => c.id === id);
        if (courseIndex !== -1) {
          courses.data[courseIndex] = {
            ...courses.data[courseIndex],
            ...updates,
            updatedAt: new Date().toISOString()
          };
          this.saveCoursesToStorage(courses.data);
          return { data: courses.data[courseIndex], error: undefined };
        }
        return { data: null, error: 'Course not found' };
      }
    } catch (error) {
      console.error('Error updating course:', error);
      return { data: null, error: 'Failed to update course' };
    }
  }

  /**
   * Delete a course
   */
  async deleteCourse(id: string): Promise<{ error?: string }> {
    try {
      if (this.isOnline) {
        const { error } = await supabase
          .from('courses')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { error: undefined };
      } else {
        // Remove locally
        const courses = this.getCoursesFromStorage();
        const filteredCourses = courses.data.filter(c => c.id !== id);
        this.saveCoursesToStorage(filteredCourses);
        return { error: undefined };
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      return { error: 'Failed to delete course' };
    }
  }

  // ==================== COURSE MANAGEMENT ====================

  /**
   * Get courses by creator/instructor
   */
  async getCoursesByCreator(creatorId: string): Promise<{ data: Course[]; error?: string }> {
    try {
      const { data, error } = await this.getCourses({ instructorId: creatorId });
      return { data: data.data, error: data.error };
    } catch (error) {
      console.error('Error fetching creator courses:', error);
      return { data: [], error: 'Failed to fetch creator courses' };
    }
  }

  /**
   * Publish a course
   */
  async publishCourse(id: string): Promise<{ data: Course | null; error?: string }> {
    return this.updateCourse(id, { 
      status: 'published', 
      isPublished: true,
      updatedAt: new Date().toISOString()
    });
  }

  /**
   * Unpublish a course
   */
  async unpublishCourse(id: string): Promise<{ data: Course | null; error?: string }> {
    return this.updateCourse(id, { 
      status: 'draft', 
      isPublished: false,
      updatedAt: new Date().toISOString()
    });
  }

  /**
   * Archive a course
   */
  async archiveCourse(id: string): Promise<{ data: Course | null; error?: string }> {
    return this.updateCourse(id, { 
      status: 'archived',
      updatedAt: new Date().toISOString()
    });
  }

  // ==================== ENROLLMENT MANAGEMENT ====================

  /**
   * Enroll user in a course
   */
  async enrollInCourse(courseId: string, userId: string): Promise<{ data: CourseEnrollment | null; error?: string }> {
    try {
      const enrollment: CourseEnrollment = {
        id: this.generateId(),
        userId,
        courseId,
        enrolledAt: new Date(),
        status: 'active',
        progress: 0,
        lastAccessedAt: new Date()
      };

      if (this.isOnline) {
        const { data, error } = await supabase
          .from('enrollments')
          .insert(enrollment)
          .select()
          .single();

        if (error) throw error;
        return { data, error: undefined };
      } else {
        // Store locally for offline mode
        this.saveEnrollmentToStorage(enrollment);
        return { data: enrollment, error: undefined };
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      return { data: null, error: 'Failed to enroll in course' };
    }
  }

  /**
   * Get user's enrolled courses
   */
  async getUserEnrollments(userId: string): Promise<{ data: CourseEnrollment[]; error?: string }> {
    try {
      if (this.isOnline) {
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            *,
            courses (*)
          `)
          .eq('user_id', userId);

        if (error) throw error;
        return { data: data || [], error: undefined };
      } else {
        const enrollments = this.getEnrollmentsFromStorage();
        const userEnrollments = enrollments.filter(e => e.userId === userId);
        return { data: userEnrollments, error: undefined };
      }
    } catch (error) {
      console.error('Error fetching user enrollments:', error);
      return { data: [], error: 'Failed to fetch enrollments' };
    }
  }

  // ==================== ANALYTICS & STATISTICS ====================

  /**
   * Get course statistics
   */
  async getCourseStats(creatorId?: string): Promise<{
    totalCourses: number;
    publishedCourses: number;
    totalStudents: number;
    totalRevenue: number;
    averageRating: number;
    thisMonthRevenue: number;
  }> {
    try {
      const filters: CourseFilters = creatorId ? { instructorId: creatorId } : {};
      const { data: courses } = await this.getCourses(filters);
      
      const stats = {
        totalCourses: courses.length,
        publishedCourses: courses.filter(c => c.status === 'published').length,
        totalStudents: courses.reduce((sum, c) => sum + c.students, 0),
        totalRevenue: courses.reduce((sum, c) => sum + (c.revenue || 0), 0),
        averageRating: courses.length > 0 ? courses.reduce((sum, c) => sum + c.rating, 0) / courses.length : 0,
        thisMonthRevenue: this.calculateThisMonthRevenue(courses)
      };

      return stats;
    } catch (error) {
      console.error('Error fetching course stats:', error);
      return {
        totalCourses: 0,
        publishedCourses: 0,
        totalStudents: 0,
        totalRevenue: 0,
        averageRating: 0,
        thisMonthRevenue: 0
      };
    }
  }

  // ==================== OFFLINE SUPPORT ====================

  /**
   * Get courses from local storage
   */
  private getCoursesFromStorage(filters: CourseFilters = {}): { data: Course[]; total: number } {
    try {
      const courses = localStorage.getItem(COURSES_STORAGE_KEY);
      const storedCourses: Course[] = courses ? JSON.parse(courses) : [];
      
      let filteredCourses = [...storedCourses];

      // Apply filters
      if (filters.searchTerm) {
        filteredCourses = filteredCourses.filter(course =>
          course.title.toLowerCase().includes(filters.searchTerm!.toLowerCase()) ||
          course.description.toLowerCase().includes(filters.searchTerm!.toLowerCase())
        );
      }

      if (filters.category) {
        filteredCourses = filteredCourses.filter(course => course.category === filters.category);
      }

      if (filters.level) {
        filteredCourses = filteredCourses.filter(course => course.level === filters.level);
      }

      if (filters.status) {
        filteredCourses = filteredCourses.filter(course => course.status === filters.status);
      }

      if (filters.instructorId) {
        filteredCourses = filteredCourses.filter(course => course.instructorId === filters.instructorId);
      }

      // Apply sorting
      if (filters.sortBy) {
        filteredCourses.sort((a, b) => {
          const aValue = a[filters.sortBy as keyof Course];
          const bValue = b[filters.sortBy as keyof Course];
          
          if (filters.sortOrder === 'desc') {
            return bValue > aValue ? 1 : -1;
          } else {
            return aValue > bValue ? 1 : -1;
          }
        });
      }

      // Apply pagination
      const total = filteredCourses.length;
      if (filters.limit) {
        const offset = filters.offset || 0;
        filteredCourses = filteredCourses.slice(offset, offset + filters.limit);
      }

      return { data: filteredCourses, total };
    } catch (error) {
      console.error('Error reading from storage:', error);
      return { data: [], total: 0 };
    }
  }

  /**
   * Save course to local storage
   */
  private saveCourseToStorage(course: Course): void {
    try {
      const courses = this.getCoursesFromStorage();
      const existingIndex = courses.data.findIndex(c => c.id === course.id);
      
      if (existingIndex !== -1) {
        courses.data[existingIndex] = course;
      } else {
        courses.data.push(course);
      }
      
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses.data));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  /**
   * Save courses to local storage
   */
  private saveCoursesToStorage(courses: Course[]): void {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch (error) {
      console.error('Error saving courses to storage:', error);
    }
  }

  /**
   * Save enrollment to local storage
   */
  private saveEnrollmentToStorage(enrollment: CourseEnrollment): void {
    try {
      const enrollments = this.getEnrollmentsFromStorage();
      enrollments.push(enrollment);
      localStorage.setItem('oponmeta_enrollments', JSON.stringify(enrollments));
    } catch (error) {
      console.error('Error saving enrollment to storage:', error);
    }
  }

  /**
   * Get enrollments from local storage
   */
  private getEnrollmentsFromStorage(): CourseEnrollment[] {
    try {
      const enrollments = localStorage.getItem('oponmeta_enrollments');
      return enrollments ? JSON.parse(enrollments) : [];
    } catch (error) {
      console.error('Error reading enrollments from storage:', error);
      return [];
    }
  }

  /**
   * Sync offline data when coming back online
   */
  private async syncOfflineData(): Promise<void> {
    try {
      // This would implement sync logic to upload offline changes
      console.log('Syncing offline data...');
    } catch (error) {
      console.error('Error syncing offline data:', error);
    }
  }

  // ==================== API METHODS ====================

  /**
   * Get courses from API
   */
  private async getCoursesFromAPI(filters: CourseFilters): Promise<{ data: Course[]; total: number; error?: string }> {
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          categories (*),
          users!courses_instructor_id_fkey (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `, { count: 'exact' });

      // Apply filters
      if (filters.searchTerm) {
        query = query.or(`title.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%`);
      }

      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }

      if (filters.level) {
        query = query.eq('level', filters.level);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.instructorId) {
        query = query.eq('instructor_id', filters.instructorId);
      }

      if (filters.isPublished !== undefined) {
        query = query.eq('is_published', filters.isPublished);
      }

      // Apply sorting
      if (filters.sortBy) {
        const ascending = filters.sortOrder !== 'desc';
        query = query.order(filters.sortBy, { ascending });
      }

      // Apply pagination
      if (filters.limit) {
        const offset = filters.offset || 0;
        query = query.range(offset, offset + filters.limit - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      const transformedData = data?.map(course => this.transformCourseData(course)) || [];
      return { data: transformedData, total: count || 0, error: undefined };
    } catch (error) {
      console.error('Error fetching courses from API:', error);
      return { data: [], total: 0, error: 'Failed to fetch courses from API' };
    }
  }

  // ==================== UTILITY METHODS ====================

  /**
   * Transform course data from API format
   */
  private transformCourseData(apiCourse: any): Course {
    return {
      id: apiCourse.id,
      title: apiCourse.title,
      description: apiCourse.description,
      shortDescription: apiCourse.short_description,
      detailedDescription: apiCourse.detailed_description,
      instructor: apiCourse.users ? `${apiCourse.users.first_name} ${apiCourse.users.last_name}` : 'Unknown',
      instructorId: apiCourse.instructor_id,
      image: apiCourse.image_url || apiCourse.thumbnail_url,
      thumbnail: apiCourse.thumbnail_url,
      price: apiCourse.price,
      originalPrice: apiCourse.original_price,
      currency: apiCourse.currency || 'USD',
      category: apiCourse.categories?.name || apiCourse.category,
      categoryId: apiCourse.category_id,
      subcategoryId: apiCourse.subcategory_id,
      level: apiCourse.level || apiCourse.difficulty_level,
      difficultyLevel: apiCourse.difficulty_level,
      duration: apiCourse.duration,
      durationHours: apiCourse.duration_hours,
      lessonsCount: apiCourse.lessons_count || 0,
      students: apiCourse.students_count || 0,
      rating: apiCourse.average_rating || 0,
      lastUpdated: apiCourse.updated_at,
      createdAt: apiCourse.created_at,
      updatedAt: apiCourse.updated_at,
      certificate: apiCourse.certificate || false,
      accessType: apiCourse.access_type || 'paid',
      status: apiCourse.status || 'draft',
      isPublished: apiCourse.is_published || false,
      isBestseller: apiCourse.is_bestseller || false,
      tags: apiCourse.tags || [],
      language: apiCourse.language || 'en',
      prerequisites: apiCourse.prerequisites || [],
      targetAudience: apiCourse.target_audience || [],
      learningObjectives: apiCourse.learning_objectives || [],
      enrollmentLimit: apiCourse.enrollment_limit,
      currentEnrollments: apiCourse.current_enrollments || 0,
      salesCount: apiCourse.sales_count || 0,
      revenue: apiCourse.revenue || 0,
      creatorId: apiCourse.creator_id || apiCourse.instructor_id
    };
  }

  /**
   * Transform course data for API format
   */
  private transformCourseForAPI(course: Course): any {
    return {
      title: course.title,
      description: course.description,
      short_description: course.shortDescription,
      detailed_description: course.detailedDescription,
      instructor_id: course.instructorId,
      image_url: course.image,
      thumbnail_url: course.thumbnail,
      price: course.price,
      original_price: course.originalPrice,
      currency: course.currency,
      category_id: course.categoryId,
      subcategory_id: course.subcategoryId,
      level: course.level,
      difficulty_level: course.difficultyLevel,
      duration: course.duration,
      duration_hours: course.durationHours,
      lessons_count: course.lessonsCount,
      certificate: course.certificate,
      access_type: course.accessType,
      status: course.status,
      is_published: course.isPublished,
      is_bestseller: course.isBestseller,
      tags: course.tags,
      language: course.language,
      prerequisites: course.prerequisites,
      target_audience: course.targetAudience,
      learning_objectives: course.learningObjectives,
      enrollment_limit: course.enrollmentLimit,
      creator_id: course.creatorId
    };
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Calculate this month's revenue
   */
  private calculateThisMonthRevenue(courses: Course[]): number {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return courses.reduce((sum, course) => {
      if (course.createdAt) {
        const courseDate = new Date(course.createdAt);
        if (courseDate.getMonth() === thisMonth && courseDate.getFullYear() === thisYear) {
          return sum + (course.revenue || 0);
        }
      }
      return sum;
    }, 0);
  }
}

// Export singleton instance
export const unifiedCourseService = new UnifiedCourseService();
export default unifiedCourseService;
