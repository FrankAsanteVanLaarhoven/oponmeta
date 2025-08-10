import { Course, Enrollment, Review } from '@/data';

// Course actions
export interface CourseActions {
  createCourse: (courseData: Partial<Course>) => Promise<Course>;
  updateCourse: (id: string, courseData: Partial<Course>) => Promise<Course>;
  deleteCourse: (id: string) => Promise<void>;
  getCourse: (id: string) => Promise<Course>;
  getCourses: (filters?: CourseFilters) => Promise<Course[]>;
  enrollInCourse: (courseId: string, userId: string) => Promise<Enrollment>;
  unenrollFromCourse: (courseId: string, userId: string) => Promise<void>;
  updateProgress: (courseId: string, userId: string, progress: number) => Promise<void>;
  addReview: (courseId: string, review: Partial<Review>) => Promise<Review>;
  getReviews: (courseId: string) => Promise<Review[]>;
}

export interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  instructor?: string;
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}

// Mock implementation of course actions
export const courseActions: CourseActions = {
  async createCourse(courseData: Partial<Course>): Promise<Course> {
    // Mock implementation
    const newCourse: Course = {
      id: Math.random().toString(36).substr(2, 9),
      title: courseData.title || 'New Course',
      instructor: courseData.instructor || 'Unknown Instructor',
      price: courseData.price || 0,
      rating: courseData.rating || 0,
      students: courseData.students || 0,
      image: courseData.image || '',
      category: courseData.category || 'General',
      duration: courseData.duration || '0 hours',
      level: courseData.level || 'Beginner',
      lessonsCount: courseData.lessonsCount || 0,
      description: courseData.description || '',
      lastUpdated: new Date().toISOString(),
      language: courseData.language || 'en',
      hasSubtitles: courseData.hasSubtitles || false,
      status: courseData.status || 'draft',
      isPublished: courseData.isPublished || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId: courseData.creatorId || '',
      salesCount: courseData.salesCount || 0,
      revenue: courseData.revenue || 0,
      certificate: courseData.certificate || false,
      accessType: courseData.accessType || 'paid',
      enrollmentLimit: courseData.enrollmentLimit || 1000,
      currentEnrollments: courseData.currentEnrollments || 0,
    };

    // Store in localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    return newCourse;
  },

  async updateCourse(id: string, courseData: Partial<Course>): Promise<Course> {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const courseIndex = courses.findIndex((c: Course) => c.id === id);
    
    if (courseIndex === -1) {
      throw new Error('Course not found');
    }

    const updatedCourse = {
      ...courses[courseIndex],
      ...courseData,
      updatedAt: new Date().toISOString(),
    };

    courses[courseIndex] = updatedCourse;
    localStorage.setItem('courses', JSON.stringify(courses));

    return updatedCourse;
  },

  async deleteCourse(id: string): Promise<void> {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const filteredCourses = courses.filter((c: Course) => c.id !== id);
    localStorage.setItem('courses', JSON.stringify(filteredCourses));
  },

  async getCourse(id: string): Promise<Course> {
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const course = courses.find((c: Course) => c.id === id);
    
    if (!course) {
      throw new Error('Course not found');
    }

    return course;
  },

  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    let courses = JSON.parse(localStorage.getItem('courses') || '[]');

    if (filters) {
      if (filters.category) {
        courses = courses.filter((c: Course) => c.category === filters.category);
      }
      if (filters.level) {
        courses = courses.filter((c: Course) => c.level === filters.level);
      }
      if (filters.priceRange) {
        courses = courses.filter((c: Course) => 
          c.price >= filters.priceRange![0] && c.price <= filters.priceRange![1]
        );
      }
      if (filters.rating) {
        courses = courses.filter((c: Course) => c.rating >= filters.rating!);
      }
      if (filters.instructor) {
        courses = courses.filter((c: Course) => 
          c.instructor.toLowerCase().includes(filters.instructor!.toLowerCase())
        );
      }
      if (filters.search) {
        courses = courses.filter((c: Course) => 
          c.title.toLowerCase().includes(filters.search!.toLowerCase()) ||
          c.description.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      if (filters.status) {
        courses = courses.filter((c: Course) => c.status === filters.status);
      }
      if (filters.limit) {
        courses = courses.slice(0, filters.limit);
      }
    }

    return courses;
  },

  async enrollInCourse(courseId: string, userId: string): Promise<Enrollment> {
    const enrollment: Enrollment = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      courseId,
      status: 'active',
      progress: 0,
      completedLessons: [],
      startDate: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    enrollments.push(enrollment);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));

    return enrollment;
  },

  async unenrollFromCourse(courseId: string, userId: string): Promise<void> {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const filteredEnrollments = enrollments.filter(
      (e: Enrollment) => !(e.courseId === courseId && e.userId === userId)
    );
    localStorage.setItem('enrollments', JSON.stringify(filteredEnrollments));
  },

  async updateProgress(courseId: string, userId: string, progress: number): Promise<void> {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollmentIndex = enrollments.findIndex(
      (e: Enrollment) => e.courseId === courseId && e.userId === userId
    );

    if (enrollmentIndex !== -1) {
      enrollments[enrollmentIndex].progress = progress;
      enrollments[enrollmentIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('enrollments', JSON.stringify(enrollments));
    }
  },

  async addReview(courseId: string, reviewData: Partial<Review>): Promise<Review> {
    const review: Review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: reviewData.userId || '',
      courseId,
      rating: reviewData.rating || 0,
      title: reviewData.title || '',
      content: reviewData.content || '',
      helpful: reviewData.helpful || 0,
      reported: reviewData.reported || false,
      status: reviewData.status || 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    return review;
  },

  async getReviews(courseId: string): Promise<Review[]> {
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    return reviews.filter((r: Review) => r.courseId === courseId);
  },
};
