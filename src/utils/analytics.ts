// Advanced Analytics System for User Behavior Tracking

export interface UserEvent {
  id: string;
  userId?: string;
  eventType: 'view' | 'favorite' | 'wishlist' | 'like' | 'search' | 'click' | 'scroll' | 'time_spent' | 'completion' | 'rating';
  eventData: {
    contentId?: string;
    contentType?: 'course' | 'rto' | 'page' | 'blog';
    searchQuery?: string;
    timeSpent?: number;
    scrollDepth?: number;
    rating?: number;
    category?: string;
    language?: string;
    sessionId?: string;
    timestamp: number;
    userAgent?: string;
    referrer?: string;
    pageUrl?: string;
  };
  metadata?: {
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    browser?: string;
    os?: string;
    country?: string;
    timezone?: string;
  };
}

export interface AnalyticsSummary {
  totalEvents: number;
  uniqueUsers: number;
  topContent: Array<{ id: string; title: string; views: number; engagement: number }>;
  popularCategories: Array<{ category: string; count: number }>;
  userEngagement: {
    averageSessionTime: number;
    averageScrollDepth: number;
    completionRate: number;
    returnRate: number;
  };
  trends: {
    dailyActiveUsers: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
  };
}

class AnalyticsService {
  private events: UserEvent[] = [];
  private sessionId: string;
  private isTracking = false;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.loadEvents();
    this.startTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadEvents(): void {
    try {
      const stored = localStorage.getItem('oponmeta_analytics');
      if (stored) {
        this.events = JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load analytics data:', error);
    }
  }

  private saveEvents(): void {
    try {
      localStorage.setItem('oponmeta_analytics', JSON.stringify(this.events));
    } catch (error) {
      console.warn('Failed to save analytics data:', error);
    }
  }

  private getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent) ? 'tablet' : 'mobile';
    }

    return {
      deviceType,
      browser: this.getBrowserInfo(userAgent),
      os: this.getOSInfo(userAgent),
      userAgent
    };
  }

  private getBrowserInfo(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private getOSInfo(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  // Track user events
  trackEvent(eventType: UserEvent['eventType'], eventData: Partial<UserEvent['eventData']>): void {
    if (!this.isTracking) return;

    const deviceInfo = this.getDeviceInfo();
    
    const event: UserEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      eventType,
      eventData: {
        ...eventData,
        sessionId: this.sessionId,
        timestamp: Date.now(),
        userAgent: deviceInfo.userAgent,
        pageUrl: window.location.href,
        referrer: document.referrer
      },
      metadata: {
        deviceType: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os
      }
    };

    this.events.push(event);
    this.saveEvents();
    
    // Send to backend in production
    this.sendToBackend(event);
  }

  // Track content views
  trackContentView(contentId: string, contentType: string, title?: string): void {
    this.trackEvent('view', {
      contentId,
      contentType: contentType as any,
      category: this.getCategoryFromContent(contentId)
    });
  }

  // Track user interactions
  trackInteraction(interactionType: 'favorite' | 'wishlist' | 'like', contentId: string, contentType: string): void {
    this.trackEvent(interactionType, {
      contentId,
      contentType: contentType as any
    });
  }

  // Track search behavior
  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent('search', {
      searchQuery: query
    });
  }

  // Track time spent on content
  trackTimeSpent(contentId: string, timeSpent: number): void {
    this.trackEvent('time_spent', {
      contentId,
      timeSpent
    });
  }

  // Track scroll depth
  trackScrollDepth(contentId: string, scrollDepth: number): void {
    this.trackEvent('scroll', {
      contentId,
      scrollDepth
    });
  }

  // Track content completion
  trackCompletion(contentId: string, completionPercentage: number): void {
    this.trackEvent('completion', {
      contentId,
      timeSpent: completionPercentage
    });
  }

  // Track ratings
  trackRating(contentId: string, rating: number): void {
    this.trackEvent('rating', {
      contentId,
      rating
    });
  }

  // Get analytics summary
  getAnalyticsSummary(): AnalyticsSummary {
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000);

    const recentEvents = this.events.filter(e => e.eventData.timestamp > oneDayAgo);
    const weeklyEvents = this.events.filter(e => e.eventData.timestamp > oneWeekAgo);
    const monthlyEvents = this.events.filter(e => e.eventData.timestamp > oneMonthAgo);

    // Calculate top content
    const contentViews = new Map<string, { id: string; title: string; views: number; engagement: number }>();
    
    this.events.forEach(event => {
      if (event.eventData.contentId) {
        const contentId = event.eventData.contentId;
        const current = contentViews.get(contentId) || { id: contentId, title: contentId, views: 0, engagement: 0 };
        
        if (event.eventType === 'view') {
          current.views++;
        } else if (['favorite', 'wishlist', 'like'].includes(event.eventType)) {
          current.engagement++;
        }
        
        contentViews.set(contentId, current);
      }
    });

    const topContent = Array.from(contentViews.values())
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Calculate popular categories
    const categoryCounts = new Map<string, number>();
    this.events.forEach(event => {
      if (event.eventData.category) {
        const count = categoryCounts.get(event.eventData.category) || 0;
        categoryCounts.set(event.eventData.category, count + 1);
      }
    });

    const popularCategories = Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate engagement metrics
    const viewEvents = this.events.filter(e => e.eventType === 'view');
    const interactionEvents = this.events.filter(e => ['favorite', 'wishlist', 'like'].includes(e.eventType));
    const timeSpentEvents = this.events.filter(e => e.eventType === 'time_spent');

    const averageSessionTime = timeSpentEvents.length > 0 
      ? timeSpentEvents.reduce((sum, e) => sum + (e.eventData.timeSpent || 0), 0) / timeSpentEvents.length 
      : 0;

    const completionRate = viewEvents.length > 0 
      ? (this.events.filter(e => e.eventType === 'completion').length / viewEvents.length) * 100 
      : 0;

    return {
      totalEvents: this.events.length,
      uniqueUsers: new Set(this.events.map(e => e.eventData.sessionId)).size,
      topContent,
      popularCategories,
      userEngagement: {
        averageSessionTime,
        averageScrollDepth: 0, // Would need scroll tracking implementation
        completionRate,
        returnRate: 0 // Would need user identification
      },
      trends: {
        dailyActiveUsers: new Set(recentEvents.map(e => e.eventData.sessionId)).size,
        weeklyGrowth: weeklyEvents.length,
        monthlyGrowth: monthlyEvents.length
      }
    };
  }

  // Get user behavior insights
  getUserInsights(sessionId: string) {
    const userEvents = this.events.filter(e => e.eventData.sessionId === sessionId);
    
    return {
      totalSessions: userEvents.length,
      favoriteCategories: this.getTopCategories(userEvents),
      averageSessionTime: this.calculateAverageSessionTime(userEvents),
      contentPreferences: this.getContentPreferences(userEvents),
      engagementLevel: this.calculateEngagementLevel(userEvents)
    };
  }

  private getTopCategories(events: UserEvent[]) {
    const categoryCounts = new Map<string, number>();
    events.forEach(event => {
      if (event.eventData.category) {
        const count = categoryCounts.get(event.eventData.category) || 0;
        categoryCounts.set(event.eventData.category, count + 1);
      }
    });
    
    return Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category, count]) => ({ category, count }));
  }

  private calculateAverageSessionTime(events: UserEvent[]) {
    const timeSpentEvents = events.filter(e => e.eventType === 'time_spent');
    if (timeSpentEvents.length === 0) return 0;
    
    return timeSpentEvents.reduce((sum, e) => sum + (e.eventData.timeSpent || 0), 0) / timeSpentEvents.length;
  }

  private getContentPreferences(events: UserEvent[]) {
    const contentTypeCounts = new Map<string, number>();
    events.forEach(event => {
      if (event.eventData.contentType) {
        const count = contentTypeCounts.get(event.eventData.contentType) || 0;
        contentTypeCounts.set(event.eventData.contentType, count + 1);
      }
    });
    
    return Array.from(contentTypeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({ type, count }));
  }

  private calculateEngagementLevel(events: UserEvent[]) {
    const interactions = events.filter(e => ['favorite', 'wishlist', 'like'].includes(e.eventType));
    const views = events.filter(e => e.eventType === 'view');
    
    return {
      interactionRate: views.length > 0 ? (interactions.length / views.length) * 100 : 0,
      totalInteractions: interactions.length,
      totalViews: views.length
    };
  }

  private getCategoryFromContent(contentId: string): string {
    // This would be enhanced with actual content metadata
    if (contentId.includes('rto')) return 'RTO Qualifications';
    if (contentId.includes('course')) return 'Courses';
    if (contentId.includes('blog')) return 'Blog';
    return 'General';
  }

  private sendToBackend(event: UserEvent): void {
    // In production, this would send to your backend API
    // For now, we'll just log it
    if (import.meta.env.MODE === 'development') {
      console.log('Analytics Event:', event);
    }
    
    // Example backend call:
    // fetch('/api/analytics/events', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event)
    // });
  }

  private startTracking(): void {
    this.isTracking = true;
    
    // Track page views
    this.trackEvent('view', {
      pageUrl: window.location.href
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.trackEvent('scroll', {
          scrollDepth: maxScrollDepth
        });
      }
    });

    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Date.now() - startTime;
      this.trackEvent('time_spent', {
        timeSpent
      });
    });
  }

  // Export analytics data
  exportAnalytics(): string {
    return JSON.stringify({
      events: this.events,
      summary: this.getAnalyticsSummary(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  // Clear analytics data
  clearAnalytics(): void {
    this.events = [];
    this.saveEvents();
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();

// Convenience functions
export const trackEvent = (eventType: UserEvent['eventType'], eventData: Partial<UserEvent['eventData']>) => {
  analyticsService.trackEvent(eventType, eventData);
};

export const trackContentView = (contentId: string, contentType: string, title?: string) => {
  analyticsService.trackContentView(contentId, contentType, title);
};

export const trackInteraction = (interactionType: 'favorite' | 'wishlist' | 'like', contentId: string, contentType: string) => {
  analyticsService.trackInteraction(interactionType, contentId, contentType);
};

export const trackSearch = (query: string, resultsCount: number) => {
  analyticsService.trackSearch(query, resultsCount);
};

export const getAnalyticsSummary = () => {
  return analyticsService.getAnalyticsSummary();
};

export const getUserInsights = (sessionId: string) => {
  return analyticsService.getUserInsights(sessionId);
}; 