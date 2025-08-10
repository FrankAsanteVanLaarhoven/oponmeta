export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: string;
  eventData: Record<string, any>;
  timestamp: Date;
  sessionId?: string;
  pageUrl?: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface UserBehavior {
  userId: string;
  sessionId: string;
  pageViews: PageView[];
  interactions: UserInteraction[];
  timeSpent: number;
  startTime: Date;
  endTime?: Date;
}

export interface PageView {
  id: string;
  url: string;
  title: string;
  timestamp: Date;
  duration: number;
  referrer?: string;
}

export interface UserInteraction {
  id: string;
  type: 'click' | 'scroll' | 'form_submit' | 'video_play' | 'video_pause' | 'course_enroll' | 'companion_interaction';
  elementId?: string;
  elementType?: string;
  data?: Record<string, any>;
  timestamp: Date;
}

export interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
}

export interface CourseAnalytics {
  courseId: string;
  totalEnrollments: number;
  activeEnrollments: number;
  completedEnrollments: number;
  averageProgress: number;
  averageCompletionTime: number;
  dropRate: number;
  revenue: number;
}

export interface UserAnalytics {
  userId: string;
  totalSessions: number;
  totalTimeSpent: number;
  coursesEnrolled: number;
  coursesCompleted: number;
  certificatesEarned: number;
  averageSessionDuration: number;
  lastActive: Date;
  engagementScore: number;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private userBehaviors: UserBehavior[] = [];
  private platformMetrics: PlatformMetrics | null = null;

  constructor() {
    this.loadData();
    this.initializeTracking();
  }

  // Event Tracking
  async trackEvent(eventType: string, eventData: Record<string, any>, userId?: string): Promise<void> {
    const event: AnalyticsEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      eventType,
      eventData,
      timestamp: new Date(),
      sessionId: this.getCurrentSessionId(),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.events.push(event);
    this.saveEvents();
    await this.updatePlatformMetrics();
  }

  async trackPageView(url: string, title: string, duration: number = 0): Promise<void> {
    const sessionId = this.getCurrentSessionId();
    let userBehavior = this.userBehaviors.find(b => b.sessionId === sessionId);

    if (!userBehavior) {
      userBehavior = {
        userId: this.getCurrentUserId(),
        sessionId,
        pageViews: [],
        interactions: [],
        timeSpent: 0,
        startTime: new Date(),
      };
      this.userBehaviors.push(userBehavior);
    }

    const pageView: PageView = {
      id: `pageview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      url,
      title,
      timestamp: new Date(),
      duration,
      referrer: document.referrer,
    };

    userBehavior.pageViews.push(pageView);
    userBehavior.timeSpent += duration;
    this.saveUserBehaviors();
  }

  async trackInteraction(type: UserInteraction['type'], elementId?: string, elementType?: string, data?: Record<string, any>): Promise<void> {
    const sessionId = this.getCurrentSessionId();
    let userBehavior = this.userBehaviors.find(b => b.sessionId === sessionId);

    if (!userBehavior) {
      userBehavior = {
        userId: this.getCurrentUserId(),
        sessionId,
        pageViews: [],
        interactions: [],
        timeSpent: 0,
        startTime: new Date(),
      };
      this.userBehaviors.push(userBehavior);
    }

    const interaction: UserInteraction = {
      id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      elementId,
      elementType,
      data,
      timestamp: new Date(),
    };

    userBehavior.interactions.push(interaction);
    this.saveUserBehaviors();
  }

  // Session Management
  private getCurrentSessionId(): string {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private getCurrentUserId(): string {
    // This would typically come from your authentication system
    return localStorage.getItem('user_id') || 'anonymous';
  }

  // Analytics Queries
  async getPlatformMetrics(): Promise<PlatformMetrics> {
    if (!this.platformMetrics) {
      await this.updatePlatformMetrics();
    }
    return this.platformMetrics!;
  }

  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const userBehaviors = this.userBehaviors.filter(b => b.userId === userId);
    const totalSessions = userBehaviors.length;
    const totalTimeSpent = userBehaviors.reduce((sum, b) => sum + b.timeSpent, 0);
    const averageSessionDuration = totalSessions > 0 ? totalTimeSpent / totalSessions : 0;
    const lastActive = userBehaviors.length > 0 
      ? new Date(Math.max(...userBehaviors.map(b => b.endTime?.getTime() || b.startTime.getTime())))
      : new Date();

    // Calculate engagement score based on various factors
    const engagementScore = this.calculateEngagementScore(userId);

    return {
      userId,
      totalSessions,
      totalTimeSpent,
      coursesEnrolled: 0, // This would come from course service
      coursesCompleted: 0, // This would come from course service
      certificatesEarned: 0, // This would come from course service
      averageSessionDuration,
      lastActive,
      engagementScore,
    };
  }

  async getCourseAnalytics(courseId: string): Promise<CourseAnalytics> {
    // This would integrate with the course management service
    const courseEvents = this.events.filter(e => e.eventData.courseId === courseId);
    const enrollments = courseEvents.filter(e => e.eventType === 'course_enroll').length;
    const completions = courseEvents.filter(e => e.eventType === 'course_complete').length;
    const dropRate = enrollments > 0 ? ((enrollments - completions) / enrollments) * 100 : 0;

    return {
      courseId,
      totalEnrollments: enrollments,
      activeEnrollments: enrollments - completions,
      completedEnrollments: completions,
      averageProgress: 0, // This would come from course service
      averageCompletionTime: 0, // This would come from course service
      dropRate,
      revenue: 0, // This would come from subscription service
    };
  }

  async getPopularCourses(limit: number = 10): Promise<Array<{ courseId: string; enrollments: number }>> {
    const courseEnrollments = this.events
      .filter(e => e.eventType === 'course_enroll')
      .reduce((acc, event) => {
        const courseId = event.eventData.courseId;
        acc[courseId] = (acc[courseId] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(courseEnrollments)
      .map(([courseId, enrollments]) => ({ courseId, enrollments }))
      .sort((a, b) => b.enrollments - a.enrollments)
      .slice(0, limit);
  }

  async getActiveUsers(days: number = 7): Promise<number> {
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const activeUsers = new Set(
      this.userBehaviors
        .filter(b => b.startTime > cutoffDate)
        .map(b => b.userId)
    );
    return activeUsers.size;
  }

  async getBounceRate(): Promise<number> {
    const sessions = this.userBehaviors.filter(b => b.pageViews.length > 0);
    const bouncedSessions = sessions.filter(b => b.pageViews.length === 1);
    return sessions.length > 0 ? (bouncedSessions.length / sessions.length) * 100 : 0;
  }

  async getConversionRate(): Promise<number> {
    const totalSessions = this.userBehaviors.length;
    const conversionEvents = this.events.filter(e => 
      ['course_enroll', 'subscription_created', 'payment_completed'].includes(e.eventType)
    );
    return totalSessions > 0 ? (conversionEvents.length / totalSessions) * 100 : 0;
  }

  // Engagement Scoring
  private calculateEngagementScore(userId: string): number {
    const userBehaviors = this.userBehaviors.filter(b => b.userId === userId);
    if (userBehaviors.length === 0) return 0;

    let score = 0;

    // Session frequency
    const daysSinceFirstSession = (Date.now() - userBehaviors[0].startTime.getTime()) / (1000 * 60 * 60 * 24);
    const sessionFrequency = userBehaviors.length / Math.max(daysSinceFirstSession, 1);
    score += Math.min(sessionFrequency * 10, 30);

    // Time spent
    const totalTimeSpent = userBehaviors.reduce((sum, b) => sum + b.timeSpent, 0);
    score += Math.min(totalTimeSpent / 3600, 25); // Max 25 points for time spent

    // Interactions
    const totalInteractions = userBehaviors.reduce((sum, b) => sum + b.interactions.length, 0);
    score += Math.min(totalInteractions * 2, 25); // Max 25 points for interactions

    // Page views
    const totalPageViews = userBehaviors.reduce((sum, b) => sum + b.pageViews.length, 0);
    score += Math.min(totalPageViews, 20); // Max 20 points for page views

    return Math.min(score, 100);
  }

  // Platform Metrics Update
  private async updatePlatformMetrics(): Promise<void> {
    const totalUsers = new Set(this.userBehaviors.map(b => b.userId)).size;
    const activeUsers = await this.getActiveUsers(7);
    const totalSessions = this.userBehaviors.length;
    const averageSessionDuration = totalSessions > 0 
      ? this.userBehaviors.reduce((sum, b) => sum + b.timeSpent, 0) / totalSessions 
      : 0;
    const bounceRate = await this.getBounceRate();
    const conversionRate = await this.getConversionRate();

    this.platformMetrics = {
      totalUsers,
      activeUsers,
      totalCourses: 0, // This would come from course service
      totalEnrollments: 0, // This would come from course service
      totalRevenue: 0, // This would come from subscription service
      averageSessionDuration,
      bounceRate,
      conversionRate,
    };

    this.savePlatformMetrics();
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedEvents = localStorage.getItem('oponmeta_analytics_events');
      if (storedEvents) {
        this.events = JSON.parse(storedEvents).map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp),
        }));
      }

      const storedBehaviors = localStorage.getItem('oponmeta_analytics_behaviors');
      if (storedBehaviors) {
        this.userBehaviors = JSON.parse(storedBehaviors).map((b: any) => ({
          ...b,
          startTime: new Date(b.startTime),
          endTime: b.endTime ? new Date(b.endTime) : undefined,
          pageViews: b.pageViews.map((pv: any) => ({
            ...pv,
            timestamp: new Date(pv.timestamp),
          })),
          interactions: b.interactions.map((i: any) => ({
            ...i,
            timestamp: new Date(i.timestamp),
          })),
        }));
      }

      const storedMetrics = localStorage.getItem('oponmeta_analytics_metrics');
      if (storedMetrics) {
        this.platformMetrics = JSON.parse(storedMetrics);
      }
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
  }

  private saveEvents(): void {
    try {
      localStorage.setItem('oponmeta_analytics_events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to save events:', error);
    }
  }

  private saveUserBehaviors(): void {
    try {
      localStorage.setItem('oponmeta_analytics_behaviors', JSON.stringify(this.userBehaviors));
    } catch (error) {
      console.error('Failed to save user behaviors:', error);
    }
  }

  private savePlatformMetrics(): void {
    try {
      localStorage.setItem('oponmeta_analytics_metrics', JSON.stringify(this.platformMetrics));
    } catch (error) {
      console.error('Failed to save platform metrics:', error);
    }
  }

  // Initialization
  private initializeTracking(): void {
    // Track page views
    this.trackPageView(window.location.href, document.title);

    // Track user interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      this.trackInteraction('click', target.id, target.tagName.toLowerCase());
    });

    // Track scroll events
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackInteraction('scroll', undefined, undefined, {
          scrollY: window.scrollY,
          scrollX: window.scrollX,
        });
      }, 1000);
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target as HTMLFormElement;
      this.trackInteraction('form_submit', form.id, 'form');
    });

    // Track video interactions
    document.addEventListener('play', (e) => {
      const video = e.target as HTMLVideoElement;
      this.trackInteraction('video_play', video.id, 'video');
    });

    document.addEventListener('pause', (e) => {
      const video = e.target as HTMLVideoElement;
      this.trackInteraction('video_pause', video.id, 'video');
    });
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

export { analyticsService };
export default analyticsService;
