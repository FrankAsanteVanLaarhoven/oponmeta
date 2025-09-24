export interface BusinessMetrics {
  revenue: RevenueMetrics
  users: UserMetrics
  engagement: EngagementMetrics
  conversion: ConversionMetrics
  performance: PerformanceMetrics
}

export interface RevenueMetrics {
  totalRevenue: number
  monthlyRecurringRevenue: number
  averageRevenuePerUser: number
  revenueGrowth: number
  subscriptionRevenue: number
  courseRevenue: number
  churnRate: number
  lifetimeValue: number
}

export interface UserMetrics {
  totalUsers: number
  activeUsers: number
  newUsers: number
  userGrowth: number
  userRetention: number
  userAcquisitionCost: number
  userEngagementScore: number
  userSegments: UserSegment[]
}

export interface UserSegment {
  name: string
  count: number
  percentage: number
  characteristics: string[]
}

export interface EngagementMetrics {
  averageSessionTime: number
  courseCompletionRate: number
  dailyActiveUsers: number
  weeklyActiveUsers: number
  monthlyActiveUsers: number
  contentEngagement: ContentEngagement[]
  featureUsage: FeatureUsage[]
}

export interface ContentEngagement {
  contentType: string
  views: number
  completions: number
  averageTime: number
  engagementScore: number
}

export interface FeatureUsage {
  feature: string
  usageCount: number
  uniqueUsers: number
  adoptionRate: number
}

export interface ConversionMetrics {
  signupToTrial: number
  trialToPaid: number
  freeToPaid: number
  coursePurchaseRate: number
  subscriptionUpgradeRate: number
  conversionFunnel: ConversionStep[]
}

export interface ConversionStep {
  step: string
  users: number
  conversionRate: number
  dropoffRate: number
}

export interface PerformanceMetrics {
  pageLoadTime: number
  apiResponseTime: number
  errorRate: number
  uptime: number
  coreWebVitals: CoreWebVitals
  pwaMetrics: PWAMetrics
}

export interface CoreWebVitals {
  lcp: number
  fid: number
  cls: number
  ttfb: number
}

export interface PWAMetrics {
  installRate: number
  offlineUsage: number
  pushNotificationEngagement: number
  backgroundSyncSuccess: number
}

export interface BusinessReport {
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  generatedAt: Date
  metrics: BusinessMetrics
  insights: BusinessInsight[]
  recommendations: BusinessRecommendation[]
  trends: BusinessTrend[]
}

export interface BusinessInsight {
  type: 'positive' | 'negative' | 'neutral'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  metrics: string[]
}

export interface BusinessRecommendation {
  category: 'revenue' | 'users' | 'engagement' | 'conversion' | 'performance'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  expectedImpact: string
  effort: 'low' | 'medium' | 'high'
  timeline: string
}

export interface BusinessTrend {
  metric: string
  direction: 'up' | 'down' | 'stable'
  change: number
  period: string
  significance: 'high' | 'medium' | 'low'
}

export interface AnalyticsEvent {
  name: string
  properties: Record<string, any>
  timestamp: number
  userId?: string
  sessionId: string
  platform: string
  offline: boolean
}

export class BusinessIntelligenceEngine {
  private static instance: BusinessIntelligenceEngine
  private websocket: WebSocket | null = null
  private metrics: BusinessMetrics | null = null
  private eventQueue: AnalyticsEvent[] = []
  private isOnline: boolean = navigator.onLine

  static getInstance(): BusinessIntelligenceEngine {
    if (!BusinessIntelligenceEngine.instance) {
      BusinessIntelligenceEngine.instance = new BusinessIntelligenceEngine()
    }
    return BusinessIntelligenceEngine.instance
  }

  async initialize(): Promise<void> {
    await this.initializeRealTimeTracking()
    this.setupEventListeners()
    this.startMetricsCollection()
  }

  private async initializeRealTimeTracking(): Promise<void> {
    try {
      this.websocket = new WebSocket(`wss://analytics.oponm.com/realtime`)
      
      this.websocket.onopen = () => {
        console.log('Real-time analytics connected')
        this.flushEventQueue()
      }

      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.updateDashboard(data)
      }

      this.websocket.onclose = () => {
        console.log('Real-time analytics disconnected')
        setTimeout(() => this.initializeRealTimeTracking(), 5000)
      }

      this.websocket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to initialize real-time tracking:', error)
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.flushEventQueue()
    })

    window.addEventListener('offline', () => {
      this.isOnline = false
    })

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility_change', {
        visible: !document.hidden,
        timestamp: Date.now()
      })
    })
  }

  private startMetricsCollection(): void {
    // Collect metrics every 5 minutes
    setInterval(() => {
      this.collectMetrics()
    }, 5 * 60 * 1000)

    // Initial collection
    this.collectMetrics()
  }

  async trackBusinessMetrics(event: AnalyticsEvent): Promise<void> {
    try {
      // Add to queue if offline
      if (!this.isOnline) {
        this.eventQueue.push(event)
        return
      }

      // Send to multiple analytics providers
      await Promise.all([
        this.sendToMixpanel(event),
        this.sendToAmplitude(event),
        this.sendToCustomAnalytics(event),
        this.sendToGoogleAnalytics(event)
      ])

      // Send via WebSocket if connected
      if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify(event))
      }

    } catch (error) {
      console.error('Failed to track business metrics:', error)
      // Add to queue for retry
      this.eventQueue.push(event)
    }
  }

  async generateBusinessReport(period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'): Promise<BusinessReport> {
    try {
      const [revenue, users, engagement, conversion, performance] = await Promise.all([
        this.getRevenueMetrics(period),
        this.getUserMetrics(period),
        this.getEngagementMetrics(period),
        this.getConversionMetrics(period),
        this.getPerformanceMetrics(period)
      ])

      const metrics: BusinessMetrics = {
        revenue,
        users,
        engagement,
        conversion,
        performance
      }

      const insights = this.generateInsights(metrics)
      const recommendations = this.generateRecommendations(metrics)
      const trends = await this.analyzeTrends(period)

      const report: BusinessReport = {
        period,
        generatedAt: new Date(),
        metrics,
        insights,
        recommendations,
        trends
      }

      // Store report for historical analysis
      await this.storeReport(report)

      return report
    } catch (error) {
      console.error('Failed to generate business report:', error)
      throw error
    }
  }

  private async getRevenueMetrics(period: string): Promise<RevenueMetrics> {
    try {
      const response = await fetch(`/api/analytics/revenue?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch revenue metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get revenue metrics:', error)
      return this.getDefaultRevenueMetrics()
    }
  }

  private async getUserMetrics(period: string): Promise<UserMetrics> {
    try {
      const response = await fetch(`/api/analytics/users?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get user metrics:', error)
      return this.getDefaultUserMetrics()
    }
  }

  private async getEngagementMetrics(period: string): Promise<EngagementMetrics> {
    try {
      const response = await fetch(`/api/analytics/engagement?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch engagement metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get engagement metrics:', error)
      return this.getDefaultEngagementMetrics()
    }
  }

  private async getConversionMetrics(period: string): Promise<ConversionMetrics> {
    try {
      const response = await fetch(`/api/analytics/conversion?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch conversion metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get conversion metrics:', error)
      return this.getDefaultConversionMetrics()
    }
  }

  private async getPerformanceMetrics(period: string): Promise<PerformanceMetrics> {
    try {
      const response = await fetch(`/api/analytics/performance?period=${period}`)
      if (!response.ok) {
        throw new Error('Failed to fetch performance metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get performance metrics:', error)
      return this.getDefaultPerformanceMetrics()
    }
  }

  private generateInsights(metrics: BusinessMetrics): BusinessInsight[] {
    const insights: BusinessInsight[] = []

    // Revenue insights
    if (metrics.revenue.revenueGrowth > 0.1) {
      insights.push({
        type: 'positive',
        title: 'Strong Revenue Growth',
        description: `Revenue grew by ${(metrics.revenue.revenueGrowth * 100).toFixed(1)}% this period`,
        impact: 'high',
        metrics: ['revenueGrowth', 'monthlyRecurringRevenue']
      })
    }

    if (metrics.revenue.churnRate > 0.05) {
      insights.push({
        type: 'negative',
        title: 'High Churn Rate',
        description: `Churn rate of ${(metrics.revenue.churnRate * 100).toFixed(1)}% is above target`,
        impact: 'high',
        metrics: ['churnRate', 'userRetention']
      })
    }

    // User insights
    if (metrics.users.userGrowth > 0.2) {
      insights.push({
        type: 'positive',
        title: 'Rapid User Growth',
        description: `User base grew by ${(metrics.users.userGrowth * 100).toFixed(1)}%`,
        impact: 'high',
        metrics: ['userGrowth', 'newUsers']
      })
    }

    // Engagement insights
    if (metrics.engagement.courseCompletionRate < 0.7) {
      insights.push({
        type: 'negative',
        title: 'Low Course Completion',
        description: `Only ${(metrics.engagement.courseCompletionRate * 100).toFixed(1)}% of users complete courses`,
        impact: 'medium',
        metrics: ['courseCompletionRate', 'averageSessionTime']
      })
    }

    return insights
  }

  private generateRecommendations(metrics: BusinessMetrics): BusinessRecommendation[] {
    const recommendations: BusinessRecommendation[] = []

    // Revenue recommendations
    if (metrics.revenue.churnRate > 0.05) {
      recommendations.push({
        category: 'revenue',
        priority: 'high',
        title: 'Implement Churn Reduction Strategy',
        description: 'Focus on user engagement and satisfaction to reduce churn rate',
        expectedImpact: 'Reduce churn by 20-30%',
        effort: 'medium',
        timeline: '2-3 months'
      })
    }

    // User recommendations
    if (metrics.users.userAcquisitionCost > 15) {
      recommendations.push({
        category: 'users',
        priority: 'medium',
        title: 'Optimize User Acquisition',
        description: 'Improve marketing efficiency and referral programs',
        expectedImpact: 'Reduce CAC by 25%',
        effort: 'high',
        timeline: '3-4 months'
      })
    }

    // Engagement recommendations
    if (metrics.engagement.courseCompletionRate < 0.7) {
      recommendations.push({
        category: 'engagement',
        priority: 'high',
        title: 'Improve Course Completion',
        description: 'Add gamification, progress tracking, and personalized recommendations',
        expectedImpact: 'Increase completion rate by 15-20%',
        effort: 'medium',
        timeline: '1-2 months'
      })
    }

    return recommendations
  }

  private async analyzeTrends(period: string): Promise<BusinessTrend[]> {
    try {
      const response = await fetch(`/api/analytics/trends?period=${period}`)
      if (!response.ok) {
        return []
      }
      return response.json()
    } catch (error) {
      console.error('Failed to analyze trends:', error)
      return []
    }
  }

  private async collectMetrics(): Promise<void> {
    try {
      const metrics = await this.generateBusinessReport('daily')
      this.metrics = metrics.metrics
      this.updateDashboard(metrics)
    } catch (error) {
      console.error('Failed to collect metrics:', error)
    }
  }

  private updateDashboard(data: any): void {
    // Emit custom event for dashboard components
    const event = new CustomEvent('businessMetricsUpdate', {
      detail: data
    })
    window.dispatchEvent(event)
  }

  private async flushEventQueue(): Promise<void> {
    if (this.eventQueue.length === 0) return

    const events = [...this.eventQueue]
    this.eventQueue = []

    for (const event of events) {
      try {
        await this.trackBusinessMetrics(event)
      } catch (error) {
        console.error('Failed to flush event:', error)
        // Re-add to queue if failed
        this.eventQueue.push(event)
      }
    }
  }

  // Analytics provider integrations
  private async sendToMixpanel(event: AnalyticsEvent): Promise<void> {
    if (window.mixpanel) {
      window.mixpanel.track(event.name, event.properties)
    }
  }

  private async sendToAmplitude(event: AnalyticsEvent): Promise<void> {
    if (window.amplitude) {
      window.amplitude.getInstance().logEvent(event.name, event.properties)
    }
  }

  private async sendToCustomAnalytics(event: AnalyticsEvent): Promise<void> {
    try {
      await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      })
    } catch (error) {
      console.warn('Failed to send to custom analytics:', error)
    }
  }

  private async sendToGoogleAnalytics(event: AnalyticsEvent): Promise<void> {
    if (window.gtag) {
      window.gtag('event', event.name, event.properties)
    }
  }

  // Utility methods
  trackEvent(name: string, properties: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: Date.now(),
      sessionId: this.getSessionId(),
      platform: 'pwa',
      offline: !navigator.onLine
    }

    this.trackBusinessMetrics(event)
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('oponm-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('oponm-session-id', sessionId)
    }
    return sessionId
  }

  private async storeReport(report: BusinessReport): Promise<void> {
    try {
      await fetch('/api/analytics/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(report)
      })
    } catch (error) {
      console.error('Failed to store report:', error)
    }
  }

  // Default metrics for fallback
  private getDefaultRevenueMetrics(): RevenueMetrics {
    return {
      totalRevenue: 0,
      monthlyRecurringRevenue: 0,
      averageRevenuePerUser: 0,
      revenueGrowth: 0,
      subscriptionRevenue: 0,
      courseRevenue: 0,
      churnRate: 0,
      lifetimeValue: 0
    }
  }

  private getDefaultUserMetrics(): UserMetrics {
    return {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      userGrowth: 0,
      userRetention: 0,
      userAcquisitionCost: 0,
      userEngagementScore: 0,
      userSegments: []
    }
  }

  private getDefaultEngagementMetrics(): EngagementMetrics {
    return {
      averageSessionTime: 0,
      courseCompletionRate: 0,
      dailyActiveUsers: 0,
      weeklyActiveUsers: 0,
      monthlyActiveUsers: 0,
      contentEngagement: [],
      featureUsage: []
    }
  }

  private getDefaultConversionMetrics(): ConversionMetrics {
    return {
      signupToTrial: 0,
      trialToPaid: 0,
      freeToPaid: 0,
      coursePurchaseRate: 0,
      subscriptionUpgradeRate: 0,
      conversionFunnel: []
    }
  }

  private getDefaultPerformanceMetrics(): PerformanceMetrics {
    return {
      pageLoadTime: 0,
      apiResponseTime: 0,
      errorRate: 0,
      uptime: 0,
      coreWebVitals: {
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0
      },
      pwaMetrics: {
        installRate: 0,
        offlineUsage: 0,
        pushNotificationEngagement: 0,
        backgroundSyncSuccess: 0
      }
    }
  }

  // Public getters
  getCurrentMetrics(): BusinessMetrics | null {
    return this.metrics
  }

  isConnected(): boolean {
    return this.websocket?.readyState === WebSocket.OPEN
  }

  getQueueSize(): number {
    return this.eventQueue.length
  }
}

// Global type declarations
declare global {
  interface Window {
    mixpanel?: any
    amplitude?: any
    gtag?: (...args: any[]) => void
  }
}

export const businessIntelligenceEngine = BusinessIntelligenceEngine.getInstance()
