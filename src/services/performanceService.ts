export class PerformanceService {
  private static instance: PerformanceService
  private metrics: Map<string, any> = new Map()
  private observers: PerformanceObserver[] = []

  static getInstance(): PerformanceService {
    if (!PerformanceService.instance) {
      PerformanceService.instance = new PerformanceService()
    }
    return PerformanceService.instance
  }

  initializeMonitoring(): void {
    // Core Web Vitals monitoring
    this.measureCoreWebVitals()
    
    // Custom performance metrics
    this.measureAppSpecificMetrics()
    
    // Error tracking
    this.setupErrorTracking()
    
    // Resource timing
    this.setupResourceTiming()
    
    // User interaction tracking
    this.setupUserInteractionTracking()
  }

  private measureCoreWebVitals(): void {
    if ('web-vitals' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.sendToAnalytics)
        getFID(this.sendToAnalytics)
        getFCP(this.sendToAnalytics)
        getLCP(this.sendToAnalytics)
        getTTFB(this.sendToAnalytics)
      })
    }
  }

  private measureAppSpecificMetrics(): void {
    // Course load time
    this.measureCourseLoadTime()
    
    // PWA installation tracking
    this.trackPWAInstallation()
    
    // Offline functionality tracking
    this.trackOfflineUsage()
    
    // Payment flow tracking
    this.trackPaymentFlow()
  }

  private measureCourseLoadTime(): void {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const startTime = performance.now()
      const url = args[0] as string
      
      try {
        const response = await originalFetch(...args)
        const loadTime = performance.now() - startTime
        
        if (url.includes('/api/courses/') && !url.includes('/api/courses/list')) {
          this.sendToAnalytics({
            name: 'course-load-time',
            value: loadTime,
            id: this.extractCourseId(url)
          })
        }
        
        return response
      } catch (error) {
        const loadTime = performance.now() - startTime
        this.sendToAnalytics({
          name: 'course-load-error',
          value: loadTime,
          id: this.extractCourseId(url),
          error: error instanceof Error ? error.message : 'Unknown error'
        })
        throw error
      }
    }
  }

  private extractCourseId(url: string): string {
    const match = url.match(/\/api\/courses\/([^\/]+)/)
    return match ? match[1] : 'unknown'
  }

  private trackPWAInstallation(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      this.sendToAnalytics({
        name: 'pwa-install-prompt-shown',
        value: 1
      })
    })

    window.addEventListener('appinstalled', () => {
      this.sendToAnalytics({
        name: 'pwa-installed',
        value: 1
      })
    })
  }

  private trackOfflineUsage(): void {
    window.addEventListener('online', () => {
      this.sendToAnalytics({
        name: 'app-came-online',
        value: 1
      })
    })

    window.addEventListener('offline', () => {
      this.sendToAnalytics({
        name: 'app-went-offline',
        value: 1
      })
    })
  }

  private trackPaymentFlow(): void {
    // Track payment initiation
    const trackPaymentStep = (step: string, value?: number) => {
      this.sendToAnalytics({
        name: `payment-${step}`,
        value: value || 1
      })
    }

    // Listen for payment events
    window.addEventListener('payment-initiated', () => trackPaymentStep('initiated'))
    window.addEventListener('payment-completed', () => trackPaymentStep('completed'))
    window.addEventListener('payment-failed', () => trackPaymentStep('failed'))
  }

  private setupErrorTracking(): void {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.sendToAnalytics({
        name: 'javascript-error',
        value: 1,
        error: event.error?.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      })
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.sendToAnalytics({
        name: 'unhandled-promise-rejection',
        value: 1,
        reason: event.reason?.message || 'Unknown rejection'
      })
    })

    // Service worker errors
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('error', (event) => {
        this.sendToAnalytics({
          name: 'service-worker-error',
          value: 1,
          error: event.message
        })
      })
    }
  }

  private setupResourceTiming(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming
            this.analyzeResourceTiming(resourceEntry)
          }
        }
      })

      observer.observe({ entryTypes: ['resource'] })
      this.observers.push(observer)
    }
  }

  private analyzeResourceTiming(entry: PerformanceResourceTiming): void {
    const loadTime = entry.responseEnd - entry.requestStart
    const size = entry.transferSize || 0
    
    // Track slow resources
    if (loadTime > 3000) { // 3 seconds
      this.sendToAnalytics({
        name: 'slow-resource',
        value: loadTime,
        resource: entry.name,
        size: size
      })
    }
    
    // Track large resources
    if (size > 1024 * 1024) { // 1MB
      this.sendToAnalytics({
        name: 'large-resource',
        value: size,
        resource: entry.name,
        loadTime: loadTime
      })
    }
  }

  private setupUserInteractionTracking(): void {
    // Track user engagement
    let lastInteraction = Date.now()
    let sessionDuration = 0

    const trackInteraction = () => {
      const now = Date.now()
      sessionDuration += now - lastInteraction
      lastInteraction = now
    }

    // Track various user interactions
    const events = ['click', 'scroll', 'keydown', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, trackInteraction, { passive: true })
    })

    // Track session duration
    setInterval(() => {
      if (sessionDuration > 0) {
        this.sendToAnalytics({
          name: 'session-duration',
          value: sessionDuration
        })
        sessionDuration = 0
      }
    }, 60000) // Every minute
  }

  private sendToAnalytics(metric: any): void {
    // Store metric locally
    this.metrics.set(metric.name, {
      ...metric,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    })

    // Send to analytics service
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        custom_parameter: metric.error || metric.resource || metric.reason
      })
    }

    // Send to custom analytics endpoint
    this.sendToCustomAnalytics(metric)
  }

  private async sendToCustomAnalytics(metric: any): Promise<void> {
    try {
      await fetch('/api/analytics/metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...metric,
          timestamp: Date.now(),
          sessionId: this.getSessionId(),
          userId: this.getUserId()
        })
      })
    } catch (error) {
      console.warn('Failed to send analytics:', error)
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('oponm-session-id')
    if (!sessionId) {
      sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('oponm-session-id', sessionId)
    }
    return sessionId
  }

  private getUserId(): string | null {
    // Get user ID from your auth system
    return localStorage.getItem('oponm-user-id')
  }

  // Public methods for manual tracking
  trackCustomEvent(name: string, value: number, metadata?: any): void {
    this.sendToAnalytics({
      name,
      value,
      ...metadata
    })
  }

  trackPageView(page: string, loadTime?: number): void {
    this.sendToAnalytics({
      name: 'page-view',
      value: loadTime || 0,
      page
    })
  }

  trackUserAction(action: string, target?: string): void {
    this.sendToAnalytics({
      name: 'user-action',
      value: 1,
      action,
      target
    })
  }

  getMetrics(): Map<string, any> {
    return new Map(this.metrics)
  }

  clearMetrics(): void {
    this.metrics.clear()
  }

  // Cleanup method
  destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.metrics.clear()
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const performanceService = PerformanceService.getInstance()
