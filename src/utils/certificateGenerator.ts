import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  completionDate: string;
  courseDuration: string;
  grade?: string;
  certificateId: string;
  courseCategory: string;
  isDiploma?: boolean;
}

export interface LearningAnalytics {
  courseId: string;
  studentId: string;
  totalTimeSpent: number; // in minutes
  chaptersCompleted: number;
  totalChapters: number;
  averageTimePerChapter: number;
  fastForwardCount: number;
  skipCount: number;
  unusualBehaviorFlags: string[];
  lastAccessed: string;
  progressPercentage: number;
  assessmentScores: AssessmentScore[];
  learningPattern: 'normal' | 'suspicious' | 'cheating';
}

export interface AssessmentScore {
  assessmentId: string;
  score: number;
  maxScore: number;
  completionTime: number; // in minutes
  attempts: number;
  timestamp: string;
}

export class CertificateGenerator {
  private static generateCertificateId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `CERT-${timestamp}-${random}`.toUpperCase();
  }

  static async generateCertificate(data: CertificateData): Promise<Blob> {
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add background gradient
    const gradient = doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Add decorative border
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Add inner border
    doc.setLineWidth(1);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    // Add logo placeholder
    doc.setFillColor(255, 255, 255);
    doc.circle(pageWidth / 2, 40, 15, 'F');
    doc.setTextColor(41, 128, 185);
    doc.setFontSize(24);
    doc.text('OponMeta', pageWidth / 2, 45, { align: 'center' });

    // Certificate title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(36);
    doc.setFont('helvetica', 'bold');
    doc.text(data.isDiploma ? 'DIPLOMA' : 'CERTIFICATE', pageWidth / 2, 80, { align: 'center' });

    // Certificate subtitle
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('OF COMPLETION', pageWidth / 2, 95, { align: 'center' });

    // Main content
    doc.setFontSize(14);
    doc.text('This is to certify that', pageWidth / 2, 120, { align: 'center' });

    // Student name
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 215, 0);
    doc.text(data.studentName, pageWidth / 2, 140, { align: 'center' });

    // Course completion text
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text('has successfully completed the course', pageWidth / 2, 160, { align: 'center' });

    // Course title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 215, 0);
    doc.text(data.courseTitle, pageWidth / 2, 180, { align: 'center' });

    // Course details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text(`Category: ${data.courseCategory}`, pageWidth / 2, 200, { align: 'center' });
    doc.text(`Duration: ${data.courseDuration}`, pageWidth / 2, 210, { align: 'center' });
    doc.text(`Instructor: ${data.instructorName}`, pageWidth / 2, 220, { align: 'center' });

    // Grade if available
    if (data.grade) {
      doc.text(`Grade: ${data.grade}`, pageWidth / 2, 230, { align: 'center' });
    }

    // Completion date
    doc.text(`Completed on: ${data.completionDate}`, pageWidth / 2, 240, { align: 'center' });

    // Certificate ID
    doc.setFontSize(10);
    doc.setTextColor(200, 200, 200);
    doc.text(`Certificate ID: ${data.certificateId}`, pageWidth / 2, 260, { align: 'center' });

    // Signatures
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text('Course Instructor', pageWidth / 4, 280, { align: 'center' });
    doc.text('Platform Director', (pageWidth / 4) * 3, 280, { align: 'center' });

    // Signature lines
    doc.setDrawColor(255, 255, 255);
    doc.line(pageWidth / 4 - 30, 285, pageWidth / 4 + 30, 285);
    doc.line((pageWidth / 4) * 3 - 30, 285, (pageWidth / 4) * 3 + 30, 285);

    return doc.output('blob');
  }

  static async generateDiploma(data: CertificateData): Promise<Blob> {
    data.isDiploma = true;
    return this.generateCertificate(data);
  }

  static downloadCertificate(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export class LearningAnalyticsTracker {
  private static analytics: Map<string, LearningAnalytics> = new Map();

  static trackChapterProgress(
    courseId: string,
    studentId: string,
    chapterId: string,
    timeSpent: number,
    action: 'start' | 'complete' | 'fastforward' | 'skip'
  ): void {
    const key = `${courseId}-${studentId}`;
    const analytics = this.analytics.get(key) || {
      courseId,
      studentId,
      totalTimeSpent: 0,
      chaptersCompleted: 0,
      totalChapters: 0,
      averageTimePerChapter: 0,
      fastForwardCount: 0,
      skipCount: 0,
      unusualBehaviorFlags: [],
      lastAccessed: new Date().toISOString(),
      progressPercentage: 0,
      assessmentScores: [],
      learningPattern: 'normal'
    };

    analytics.lastAccessed = new Date().toISOString();
    analytics.totalTimeSpent += timeSpent;

    if (action === 'complete') {
      analytics.chaptersCompleted++;
    } else if (action === 'fastforward') {
      analytics.fastForwardCount++;
    } else if (action === 'skip') {
      analytics.skipCount++;
    }

    // Calculate average time per chapter
    if (analytics.chaptersCompleted > 0) {
      analytics.averageTimePerChapter = analytics.totalTimeSpent / analytics.chaptersCompleted;
    }

    // Detect unusual behavior
    this.detectUnusualBehavior(analytics);

    this.analytics.set(key, analytics);
  }

  static trackAssessment(
    courseId: string,
    studentId: string,
    assessmentId: string,
    score: number,
    maxScore: number,
    completionTime: number,
    attempts: number
  ): void {
    const key = `${courseId}-${studentId}`;
    const analytics = this.analytics.get(key);

    if (analytics) {
      analytics.assessmentScores.push({
        assessmentId,
        score,
        maxScore,
        completionTime,
        attempts,
        timestamp: new Date().toISOString()
      });

      this.detectUnusualBehavior(analytics);
      this.analytics.set(key, analytics);
    }
  }

  private static detectUnusualBehavior(analytics: LearningAnalytics): void {
    const flags: string[] = [];

    // Check for excessive fast forwarding
    if (analytics.fastForwardCount > analytics.chaptersCompleted * 0.5) {
      flags.push('excessive_fastforward');
    }

    // Check for excessive skipping
    if (analytics.skipCount > analytics.chaptersCompleted * 0.3) {
      flags.push('excessive_skipping');
    }

    // Check for unusually fast completion
    if (analytics.averageTimePerChapter < 2) { // Less than 2 minutes per chapter
      flags.push('unusually_fast_completion');
    }

    // Check for assessment anomalies
    const recentAssessments = analytics.assessmentScores.slice(-3);
    if (recentAssessments.length > 0) {
      const avgScore = recentAssessments.reduce((sum, a) => sum + a.score, 0) / recentAssessments.length;
      const avgTime = recentAssessments.reduce((sum, a) => sum + a.completionTime, 0) / recentAssessments.length;

      if (avgScore > 95 && avgTime < 5) { // High score with very fast completion
        flags.push('suspicious_assessment_performance');
      }

      if (recentAssessments.some(a => a.attempts > 5)) {
        flags.push('multiple_assessment_attempts');
      }
    }

    analytics.unusualBehaviorFlags = flags;

    // Determine learning pattern
    if (flags.length >= 3) {
      analytics.learningPattern = 'cheating';
    } else if (flags.length >= 1) {
      analytics.learningPattern = 'suspicious';
    } else {
      analytics.learningPattern = 'normal';
    }
  }

  static getAnalytics(courseId: string, studentId: string): LearningAnalytics | undefined {
    return this.analytics.get(`${courseId}-${studentId}`);
  }

  static getAllAnalytics(): LearningAnalytics[] {
    return Array.from(this.analytics.values());
  }

  static exportAnalytics(): string {
    return JSON.stringify(Array.from(this.analytics.values()), null, 2);
  }
} 