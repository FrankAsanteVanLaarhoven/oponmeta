import { Course, CourseEnrollment, CourseProgress, CourseAssessment, CourseCertificate } from '@/types/course';

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: CourseContent[];
  assessments: CourseAssessment[];
}

export interface CourseContent {
  id: string;
  moduleId: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'interactive';
  title: string;
  description: string;
  duration?: number;
  url?: string;
  content?: string;
  order: number;
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
  moduleId: string;
  contentId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  timeSpent: number;
  lastAccessedAt: Date;
  completedAt?: Date;
}

export interface CourseAssessment {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description: string;
  type: 'quiz' | 'assignment' | 'exam';
  questions: AssessmentQuestion[];
  passingScore: number;
  timeLimit?: number;
  attempts: number;
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  type: 'multiple_choice' | 'true_false' | 'essay' | 'file_upload';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  order: number;
}

export interface CourseCertificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  certificateNumber: string;
  grade?: string;
  downloadUrl?: string;
}

class CourseManagementService {
  private enrollments: CourseEnrollment[] = [];
  private progress: CourseProgress[] = [];
  private assessments: CourseAssessment[] = [];
  private certificates: CourseCertificate[] = [];

  constructor() {
    this.loadData();
  }

  // Enrollment Management
  async enrollUser(userId: string, courseId: string): Promise<CourseEnrollment> {
    // Check if user is already enrolled
    const existingEnrollment = this.enrollments.find(
      e => e.userId === userId && e.courseId === courseId
    );

    if (existingEnrollment) {
      if (existingEnrollment.status === 'dropped') {
        // Reactivate enrollment
        existingEnrollment.status = 'active';
        existingEnrollment.enrolledAt = new Date();
        this.saveEnrollments();
        return existingEnrollment;
      }
      throw new Error('User is already enrolled in this course');
    }

    const enrollment: CourseEnrollment = {
      id: `enrollment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      courseId,
      enrolledAt: new Date(),
      status: 'active',
      progress: 0,
      lastAccessedAt: new Date(),
    };

    this.enrollments.push(enrollment);
    this.saveEnrollments();
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
    return this.enrollments.filter(e => e.userId === userId);
  }

  async getEnrollment(userId: string, courseId: string): Promise<CourseEnrollment | null> {
    return this.enrollments.find(e => e.userId === userId && e.courseId === courseId) || null;
  }

  async updateEnrollment(enrollmentId: string, updates: Partial<CourseEnrollment>): Promise<CourseEnrollment | null> {
    const index = this.enrollments.findIndex(e => e.id === enrollmentId);
    if (index === -1) return null;

    this.enrollments[index] = {
      ...this.enrollments[index],
      ...updates,
    };

    this.saveEnrollments();
    return this.enrollments[index];
  }

  async dropCourse(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.getEnrollment(userId, courseId);
    if (!enrollment) return false;

    enrollment.status = 'dropped';
    this.saveEnrollments();
    return true;
  }

  // Progress Tracking
  async updateProgress(userId: string, courseId: string, moduleId: string, contentId: string, progress: number): Promise<CourseProgress> {
    let courseProgress = this.progress.find(
      p => p.userId === userId && p.courseId === courseId && p.moduleId === moduleId && p.contentId === contentId
    );

    if (!courseProgress) {
      courseProgress = {
        id: `progress_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        courseId,
        moduleId,
        contentId,
        status: progress === 100 ? 'completed' : 'in_progress',
        progress,
        timeSpent: 0,
        lastAccessedAt: new Date(),
      };
      this.progress.push(courseProgress);
    } else {
      courseProgress.progress = progress;
      courseProgress.status = progress === 100 ? 'completed' : 'in_progress';
      courseProgress.lastAccessedAt = new Date();
      if (progress === 100) {
        courseProgress.completedAt = new Date();
      }
    }

    this.saveProgress();
    await this.updateCourseProgress(userId, courseId);
    return courseProgress;
  }

  async getProgress(userId: string, courseId: string): Promise<CourseProgress[]> {
    return this.progress.filter(p => p.userId === userId && p.courseId === courseId);
  }

  async getOverallProgress(userId: string, courseId: string): Promise<number> {
    const progress = await this.getProgress(userId, courseId);
    if (progress.length === 0) return 0;

    const totalProgress = progress.reduce((sum, p) => sum + p.progress, 0);
    return Math.round(totalProgress / progress.length);
  }

  private async updateCourseProgress(userId: string, courseId: string): Promise<void> {
    const overallProgress = await this.getOverallProgress(userId, courseId);
    const enrollment = await this.getEnrollment(userId, courseId);
    
    if (enrollment) {
      enrollment.progress = overallProgress;
      enrollment.lastAccessedAt = new Date();
      
      if (overallProgress === 100) {
        enrollment.status = 'completed';
        enrollment.completedAt = new Date();
        await this.generateCertificate(userId, courseId);
      }
      
      this.saveEnrollments();
    }
  }

  // Assessment Management
  async createAssessment(assessment: Omit<CourseAssessment, 'id'>): Promise<CourseAssessment> {
    const newAssessment: CourseAssessment = {
      ...assessment,
      id: `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.assessments.push(newAssessment);
    this.saveAssessments();
    return newAssessment;
  }

  async getAssessments(courseId: string): Promise<CourseAssessment[]> {
    return this.assessments.filter(a => a.courseId === courseId);
  }

  async submitAssessment(userId: string, assessmentId: string, answers: any[]): Promise<{
    score: number;
    passed: boolean;
    feedback: string[];
  }> {
    const assessment = this.assessments.find(a => a.id === assessmentId);
    if (!assessment) {
      throw new Error('Assessment not found');
    }

    let totalScore = 0;
    let maxScore = 0;
    const feedback: string[] = [];

    assessment.questions.forEach((question, index) => {
      maxScore += question.points;
      const answer = answers[index];
      
      if (answer) {
        if (question.type === 'multiple_choice' || question.type === 'true_false') {
          if (answer === question.correctAnswer) {
            totalScore += question.points;
            feedback.push(`Question ${index + 1}: Correct`);
          } else {
            feedback.push(`Question ${index + 1}: Incorrect`);
          }
        } else if (question.type === 'essay') {
          // For essay questions, we'll give partial credit for now
          totalScore += question.points * 0.8;
          feedback.push(`Question ${index + 1}: Essay submitted`);
        }
      } else {
        feedback.push(`Question ${index + 1}: Not answered`);
      }
    });

    const score = Math.round((totalScore / maxScore) * 100);
    const passed = score >= assessment.passingScore;

    return {
      score,
      passed,
      feedback,
    };
  }

  // Certificate Management
  async generateCertificate(userId: string, courseId: string): Promise<CourseCertificate> {
    const existingCertificate = this.certificates.find(
      c => c.userId === userId && c.courseId === courseId
    );

    if (existingCertificate) {
      return existingCertificate;
    }

    const certificate: CourseCertificate = {
      id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      courseId,
      issuedAt: new Date(),
      certificateNumber: `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      downloadUrl: `/certificates/${userId}/${courseId}.pdf`,
    };

    this.certificates.push(certificate);
    this.saveCertificates();
    return certificate;
  }

  async getUserCertificates(userId: string): Promise<CourseCertificate[]> {
    return this.certificates.filter(c => c.userId === userId);
  }

  async getCertificate(userId: string, courseId: string): Promise<CourseCertificate | null> {
    return this.certificates.find(c => c.userId === userId && c.courseId === courseId) || null;
  }

  // Analytics
  async getCourseAnalytics(courseId: string): Promise<{
    totalEnrollments: number;
    activeEnrollments: number;
    completedEnrollments: number;
    averageProgress: number;
    averageCompletionTime: number;
  }> {
    const courseEnrollments = this.enrollments.filter(e => e.courseId === courseId);
    const totalEnrollments = courseEnrollments.length;
    const activeEnrollments = courseEnrollments.filter(e => e.status === 'active').length;
    const completedEnrollments = courseEnrollments.filter(e => e.status === 'completed').length;

    const averageProgress = courseEnrollments.length > 0
      ? courseEnrollments.reduce((sum, e) => sum + e.progress, 0) / courseEnrollments.length
      : 0;

    const completedEnrollmentsWithTime = courseEnrollments.filter(e => e.completedAt && e.enrolledAt);
    const averageCompletionTime = completedEnrollmentsWithTime.length > 0
      ? completedEnrollmentsWithTime.reduce((sum, e) => {
          const timeDiff = e.completedAt!.getTime() - e.enrolledAt.getTime();
          return sum + timeDiff;
        }, 0) / completedEnrollmentsWithTime.length
      : 0;

    return {
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      averageProgress: Math.round(averageProgress),
      averageCompletionTime: Math.round(averageCompletionTime / (1000 * 60 * 60 * 24)), // Convert to days
    };
  }

  async getUserAnalytics(userId: string): Promise<{
    totalEnrollments: number;
    completedCourses: number;
    averageProgress: number;
    certificatesEarned: number;
    timeSpent: number;
  }> {
    const userEnrollments = this.enrollments.filter(e => e.userId === userId);
    const totalEnrollments = userEnrollments.length;
    const completedCourses = userEnrollments.filter(e => e.status === 'completed').length;
    const averageProgress = userEnrollments.length > 0
      ? userEnrollments.reduce((sum, e) => sum + e.progress, 0) / userEnrollments.length
      : 0;
    const certificatesEarned = this.certificates.filter(c => c.userId === userId).length;
    const timeSpent = this.progress
      .filter(p => p.userId === userId)
      .reduce((sum, p) => sum + p.timeSpent, 0);

    return {
      totalEnrollments,
      completedCourses,
      averageProgress: Math.round(averageProgress),
      certificatesEarned,
      timeSpent,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedEnrollments = localStorage.getItem('oponmeta_course_enrollments');
      if (storedEnrollments) {
        this.enrollments = JSON.parse(storedEnrollments).map((e: any) => ({
          ...e,
          enrolledAt: new Date(e.enrolledAt),
          lastAccessedAt: e.lastAccessedAt ? new Date(e.lastAccessedAt) : undefined,
          completedAt: e.completedAt ? new Date(e.completedAt) : undefined,
        }));
      }

      const storedProgress = localStorage.getItem('oponmeta_course_progress');
      if (storedProgress) {
        this.progress = JSON.parse(storedProgress).map((p: any) => ({
          ...p,
          lastAccessedAt: new Date(p.lastAccessedAt),
          completedAt: p.completedAt ? new Date(p.completedAt) : undefined,
        }));
      }

      const storedAssessments = localStorage.getItem('oponmeta_course_assessments');
      if (storedAssessments) {
        this.assessments = JSON.parse(storedAssessments);
      }

      const storedCertificates = localStorage.getItem('oponmeta_course_certificates');
      if (storedCertificates) {
        this.certificates = JSON.parse(storedCertificates).map((c: any) => ({
          ...c,
          issuedAt: new Date(c.issuedAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load course management data:', error);
    }
  }

  private saveEnrollments(): void {
    try {
      localStorage.setItem('oponmeta_course_enrollments', JSON.stringify(this.enrollments));
    } catch (error) {
      console.error('Failed to save enrollments:', error);
    }
  }

  private saveProgress(): void {
    try {
      localStorage.setItem('oponmeta_course_progress', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  private saveAssessments(): void {
    try {
      localStorage.setItem('oponmeta_course_assessments', JSON.stringify(this.assessments));
    } catch (error) {
      console.error('Failed to save assessments:', error);
    }
  }

  private saveCertificates(): void {
    try {
      localStorage.setItem('oponmeta_course_certificates', JSON.stringify(this.certificates));
    } catch (error) {
      console.error('Failed to save certificates:', error);
    }
  }
}

// Create singleton instance
const courseManagementService = new CourseManagementService();

export { courseManagementService };
export default courseManagementService;
