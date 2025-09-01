import { Course, Lesson, Quiz, Assignment, Question, Resource } from '@/data/coursesData';

// Local storage keys
const COURSES_STORAGE_KEY = 'oponmeta_courses';
const DRAFTS_STORAGE_KEY = 'oponmeta_course_drafts';
const SALES_STORAGE_KEY = 'oponmeta_course_sales';

export interface CourseFormData {
  title: string;
  description: string;
  objectives: string[];
  tags: string[];
  category: string;
  level: string;
  price: number;
  language: string;
  image: string;
  duration: string;
  lessonsCount: number;
  certificate: boolean;
  accessType: 'free' | 'paid' | 'subscription';
  enrollmentLimit?: number;
  content?: {
    lessons: Lesson[];
    quizzes: Quiz[];
    assignments: Assignment[];
  };
}

export interface CourseSale {
  id: string;
  courseId: number;
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

class CourseService {
  // Get all courses from local storage
  private getCourses(): Course[] {
    try {
      const courses = localStorage.getItem(COURSES_STORAGE_KEY);
      const storedCourses = courses ? JSON.parse(courses) : [];
      
      // Add demo courses if none exist
      if (storedCourses.length === 0) {
        const demoCourses = [
          {
            id: 1,
            title: "How to Become a Nurse or Healthcare Assistant",
            description: "Comprehensive guide to starting a career in healthcare. Learn essential skills, requirements, and pathways to become a qualified nurse or healthcare assistant.",
            instructor: "Dr. Sarah Johnson",
            instructorId: "instructor-1",
            price: 0, // Free course
            originalPrice: 0,
            rating: 4.9,
            studentsEnrolled: 2156,
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Health and Healthcare Innovation",
            level: "Beginner",
            duration: "15-20 hours",
            lessonsCount: 12,
            certificate: true,
            isPublished: true,
            status: "published",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            slug: "how-to-become-nurse-healthcare-assistant",
            language: "en",
            tags: ["nursing", "healthcare", "career", "medical", "assistant"],
            objectives: [
              "Understand the role and responsibilities of nurses and healthcare assistants",
              "Learn about educational requirements and certification pathways",
              "Develop essential healthcare skills and patient care techniques",
              "Master communication and interpersonal skills for healthcare settings",
              "Prepare for job applications and interviews in the healthcare industry"
            ],
            currentEnrollments: 2156,
            revenue: 0,
            accessType: "free"
          },
          {
            id: 2,
            title: "How to Use and Benefit from OponMeta",
            description: "Master OponMeta, the comprehensive learning management system. Learn to create courses, manage students, and maximize your teaching potential.",
            instructor: "OponMeta Team",
            instructorId: "instructor-2",
            price: 0, // Free course
            originalPrice: 0,
            rating: 4.8,
            studentsEnrolled: 1892,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            category: "Technology and Digital Skills",
            level: "Beginner",
            duration: "10-15 hours",
            lessonsCount: 8,
            certificate: true,
            isPublished: true,
            status: "published",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            slug: "how-to-use-benefit-oponmeta",
            language: "en",
            tags: ["oponmeta", "lms", "course creation", "teaching", "platform"],
            objectives: [
              "Navigate and understand the OponMeta platform interface",
              "Create and publish engaging online courses",
              "Manage student enrollments and track progress",
              "Utilize AI-powered tools for course creation and assessment",
              "Maximize revenue and reach through effective platform usage"
            ],
            currentEnrollments: 1892,
            revenue: 0,
            accessType: "free"
          },
          {
            id: 3,
            title: "Complete Web Development Bootcamp",
            description: "Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.",
            instructor: "Sarah Johnson",
            instructorId: "instructor-3",
            price: 149,
            originalPrice: 199,
            rating: 4.8,
            studentsEnrolled: 1247,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
            category: "Technology and Digital Skills",
            level: "Beginner",
            duration: "40-50 hours",
            lessonsCount: 25,
            certificate: true,
            isPublished: true,
            status: "published",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            slug: "complete-web-development-bootcamp",
            language: "en",
            tags: ["web development", "javascript", "react", "node.js", "full-stack"],
            objectives: [
              "Master HTML5 and CSS3 fundamentals",
              "Learn JavaScript ES6+ and modern programming concepts",
              "Build responsive websites and web applications",
              "Develop full-stack applications with React and Node.js",
              "Deploy applications to production environments"
            ],
            currentEnrollments: 1247,
            revenue: 185803,
            accessType: "paid"
          }
        ];
        
        localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(demoCourses));
        return demoCourses;
      }
      
      return storedCourses;
    } catch (error) {
      console.error('Error loading courses:', error);
      return [];
    }
  }

  // Save courses to local storage
  private saveCourses(courses: Course[]): void {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch (error) {
      console.error('Error saving courses:', error);
    }
  }

  // Get course drafts
  private getDrafts(): CourseFormData[] {
    try {
      const drafts = localStorage.getItem(DRAFTS_STORAGE_KEY);
      return drafts ? JSON.parse(drafts) : [];
    } catch (error) {
      console.error('Error loading drafts:', error);
      return [];
    }
  }

  // Save course drafts
  private saveDrafts(drafts: CourseFormData[]): void {
    try {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    } catch (error) {
      console.error('Error saving drafts:', error);
    }
  }

  // Get course sales
  private getSales(): CourseSale[] {
    try {
      const sales = localStorage.getItem(SALES_STORAGE_KEY);
      return sales ? JSON.parse(sales) : [];
    } catch (error) {
      console.error('Error loading sales:', error);
      return [];
    }
  }

  // Save course sales
  private saveSales(sales: CourseSale[]): void {
    try {
      localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales));
    } catch (error) {
      console.error('Error saving sales:', error);
    }
  }

  // Create a new course
  async createCourse(courseData: CourseFormData, creatorId: string): Promise<Course> {
    const courses = this.getCourses();
    const newCourse: Course = {
      id: Date.now(), // Simple ID generation
      title: courseData.title,
      instructor: 'Current User', // This should come from user context
      price: courseData.price,
      rating: 0,
      students: 0,
      image: courseData.image || 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      category: courseData.category,
      duration: courseData.duration,
      level: courseData.level,
      lessonsCount: courseData.lessonsCount,
      description: courseData.description,
      lastUpdated: new Date().toISOString(),
      language: courseData.language,
      hasSubtitles: true,
      slug: this.generateSlug(courseData.title),
      objectives: courseData.objectives,
      tags: courseData.tags,
      content: courseData.content,
      status: 'draft',
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creatorId,
      salesCount: 0,
      revenue: 0,
      certificate: courseData.certificate,
      accessType: courseData.accessType,
      enrollmentLimit: courseData.enrollmentLimit,
      currentEnrollments: 0,
    };

    courses.push(newCourse);
    this.saveCourses(courses);
    return newCourse;
  }

  // Update an existing course
  async updateCourse(courseId: number, updates: Partial<Course>): Promise<Course | null> {
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    if (courseIndex === -1) return null;

    courses[courseIndex] = {
      ...courses[courseIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveCourses(courses);
    return courses[courseIndex];
  }

  // Publish a course
  async publishCourse(courseId: number): Promise<Course | null> {
    return this.updateCourse(courseId, {
      status: 'published',
      isPublished: true,
    });
  }

  // Unpublish a course
  async unpublishCourse(courseId: number): Promise<Course | null> {
    return this.updateCourse(courseId, {
      status: 'draft',
      isPublished: false,
    });
  }

  // Delete a course
  async deleteCourse(courseId: number): Promise<boolean> {
    const courses = this.getCourses();
    const filteredCourses = courses.filter(c => c.id !== courseId);
    
    if (filteredCourses.length === courses.length) return false;
    
    this.saveCourses(filteredCourses);
    return true;
  }

  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    return this.getCourses();
  }

  // Get published courses
  async getPublishedCourses(): Promise<Course[]> {
    const courses = this.getCourses();
    return courses.filter(c => c.isPublished);
  }

  // Get courses by creator
  async getCoursesByCreator(creatorId: string): Promise<Course[]> {
    const courses = this.getCourses();
    return courses.filter(c => c.creatorId === creatorId);
  }

  // Get course by ID
  async getCourseById(courseId: number): Promise<Course | null> {
    const courses = this.getCourses();
    return courses.find(c => c.id === courseId) || null;
  }

  // Save course draft
  async saveDraft(draftData: CourseFormData, draftId?: string): Promise<string> {
    const drafts = this.getDrafts();
    const draftIdToUse = draftId || `draft_${Date.now()}`;
    
    const existingDraftIndex = drafts.findIndex(d => d.id === draftIdToUse);
    
    if (existingDraftIndex !== -1) {
      drafts[existingDraftIndex] = { ...draftData, id: draftIdToUse };
    } else {
      drafts.push({ ...draftData, id: draftIdToUse });
    }
    
    this.saveDrafts(drafts);
    return draftIdToUse;
  }

  // Get course draft
  async getDraft(draftId: string): Promise<CourseFormData | null> {
    const drafts = this.getDrafts();
    return drafts.find(d => d.id === draftId) || null;
  }

  // Delete course draft
  async deleteDraft(draftId: string): Promise<boolean> {
    const drafts = this.getDrafts();
    const filteredDrafts = drafts.filter(d => d.id !== draftId);
    
    if (filteredDrafts.length === drafts.length) return false;
    
    this.saveDrafts(filteredDrafts);
    return true;
  }

  // Process course purchase
  async processPurchase(
    courseId: number,
    studentData: {
      id: string;
      name: string;
      email: string;
    },
    paymentData: {
      amount: number;
      currency: string;
      paymentMethod: string;
      transactionId: string;
    }
  ): Promise<CourseSale> {
    const sale: CourseSale = {
      id: `sale_${Date.now()}`,
      courseId,
      studentId: studentData.id,
      studentName: studentData.name,
      studentEmail: studentData.email,
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentMethod: paymentData.paymentMethod,
      transactionId: paymentData.transactionId,
      purchaseDate: new Date().toISOString(),
      status: 'completed',
    };

    // Save the sale
    const sales = this.getSales();
    sales.push(sale);
    this.saveSales(sales);

    // Update course statistics
    const courses = this.getCourses();
    const courseIndex = courses.findIndex(c => c.id === courseId);
    
    if (courseIndex !== -1) {
      courses[courseIndex].salesCount = (courses[courseIndex].salesCount || 0) + 1;
      courses[courseIndex].revenue = (courses[courseIndex].revenue || 0) + paymentData.amount;
      courses[courseIndex].currentEnrollments = (courses[courseIndex].currentEnrollments || 0) + 1;
      this.saveCourses(courses);
    }

    return sale;
  }

  // Get course sales
  async getCourseSales(courseId?: number): Promise<CourseSale[]> {
    const sales = this.getSales();
    if (courseId) {
      return sales.filter(s => s.courseId === courseId);
    }
    return sales;
  }

  // Get course analytics
  async getCourseAnalytics(courseId: number): Promise<{
    totalSales: number;
    totalRevenue: number;
    averageRating: number;
    enrollmentTrend: any[];
  }> {
    const sales = this.getSales().filter(s => s.courseId === courseId);
    const course = await this.getCourseById(courseId);
    
    return {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + sale.amount, 0),
      averageRating: course?.rating || 0,
      enrollmentTrend: [], // This would be calculated based on sales data over time
    };
  }

  // Generate slug from title
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Search courses
  async searchCourses(query: string, filters?: {
    category?: string;
    level?: string;
    priceRange?: { min: number; max: number };
    language?: string;
  }): Promise<Course[]> {
    const courses = this.getPublishedCourses();
    
    return courses.filter(course => {
      // Text search
      const searchText = query.toLowerCase();
      const matchesSearch = 
        course.title.toLowerCase().includes(searchText) ||
        course.description.toLowerCase().includes(searchText) ||
        course.tags?.some(tag => tag.toLowerCase().includes(searchText)) ||
        course.objectives?.some(obj => obj.toLowerCase().includes(searchText));

      if (!matchesSearch) return false;

      // Apply filters
      if (filters?.category && course.category !== filters.category) return false;
      if (filters?.level && course.level !== filters.level) return false;
      if (filters?.language && course.language !== filters.language) return false;
      if (filters?.priceRange) {
        if (course.price < filters.priceRange.min || course.price > filters.priceRange.max) return false;
      }

      return true;
    });
  }
}

export const courseService = new CourseService(); 