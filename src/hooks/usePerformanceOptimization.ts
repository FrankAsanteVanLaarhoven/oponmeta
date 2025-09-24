import { useEffect, useState, useCallback, useMemo } from 'react'

interface DeviceCapabilities {
  hardwareConcurrency: number
  deviceMemory: number
  connectionType: string
  isLowEndDevice: boolean
  shouldPreload: boolean
  reducedAnimations: boolean
  limitedConcurrency: boolean
}

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  networkLatency: number
}

export const usePerformanceOptimization = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState<DeviceCapabilities>({
    hardwareConcurrency: 4,
    deviceMemory: 4,
    connectionType: '4g',
    isLowEndDevice: false,
    shouldPreload: true,
    reducedAnimations: false,
    limitedConcurrency: false
  })

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkLatency: 0
  })

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Detect device capabilities
    const detectDeviceCapabilities = () => {
      const navigator = window.navigator as any
      
      // Check for low-end device indicators
      const hardwareConcurrency = navigator.hardwareConcurrency || 2
      const deviceMemory = navigator.deviceMemory || 2
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      const connectionType = connection?.effectiveType || '4g'
      
      const isLowEndDevice = hardwareConcurrency <= 2 && deviceMemory <= 2
      const shouldPreload = connectionType === '4g' && !isLowEndDevice
      const reducedAnimations = isLowEndDevice || connectionType === 'slow-2g' || connectionType === '2g'
      const limitedConcurrency = isLowEndDevice

      setDeviceCapabilities({
        hardwareConcurrency,
        deviceMemory,
        connectionType,
        isLowEndDevice,
        shouldPreload,
        reducedAnimations,
        limitedConcurrency
      })
    }

    detectDeviceCapabilities()

    // Monitor connection changes
    const handleConnectionChange = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        setDeviceCapabilities(prev => ({
          ...prev,
          connectionType: connection.effectiveType,
          shouldPreload: connection.effectiveType === '4g' && !prev.isLowEndDevice,
          reducedAnimations: prev.isLowEndDevice || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g'
        }))
      }
    }

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    // Add event listeners
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      connection?.addEventListener('change', handleConnectionChange)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        connection?.removeEventListener('change', handleConnectionChange)
      }
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Measure performance metrics
  const measurePerformance = useCallback(() => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart
      
      // Measure render time
      const renderStart = performance.now()
      requestAnimationFrame(() => {
        const renderTime = performance.now() - renderStart
        setPerformanceMetrics(prev => ({
          ...prev,
          loadTime,
          renderTime
        }))
      })

      // Measure memory usage if available
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setPerformanceMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / 1024 / 1024 // Convert to MB
        }))
      }
    }
  }, [])

  // Optimize component based on device capabilities
  const optimizeForDevice = useCallback((component: any) => {
    const optimized = { ...component }

    if (deviceCapabilities.isLowEndDevice) {
      optimized.shouldLazyLoad = true
      optimized.reducedAnimations = true
      optimized.limitedConcurrency = true
      optimized.preloadImages = false
      optimized.batchUpdates = true
    }

    if (deviceCapabilities.connectionType === 'slow-2g' || deviceCapabilities.connectionType === '2g') {
      optimized.reducedAnimations = true
      optimized.preloadImages = false
      optimized.lazyLoadImages = true
      optimized.compressImages = true
    }

    return optimized
  }, [deviceCapabilities])

  // Memoized optimization settings
  const optimizationSettings = useMemo(() => ({
    // Image optimization
    imageQuality: deviceCapabilities.isLowEndDevice ? 0.7 : 0.9,
    imageFormat: deviceCapabilities.connectionType === 'slow-2g' ? 'webp' : 'auto',
    
    // Animation settings
    animationDuration: deviceCapabilities.reducedAnimations ? 150 : 300,
    animationEasing: deviceCapabilities.reducedAnimations ? 'ease-out' : 'ease-in-out',
    
    // Loading settings
    preloadCriticalResources: deviceCapabilities.shouldPreload,
    lazyLoadThreshold: deviceCapabilities.isLowEndDevice ? 0.1 : 0.2,
    
    // Concurrency settings
    maxConcurrentRequests: deviceCapabilities.limitedConcurrency ? 2 : 6,
    requestTimeout: deviceCapabilities.connectionType === 'slow-2g' ? 10000 : 5000,
    
    // Caching settings
    cacheStrategy: deviceCapabilities.isLowEndDevice ? 'cache-first' : 'stale-while-revalidate',
    cacheSize: deviceCapabilities.isLowEndDevice ? 50 : 100
  }), [deviceCapabilities])

  // Performance monitoring
  useEffect(() => {
    measurePerformance()
    
    // Monitor performance periodically
    const interval = setInterval(measurePerformance, 30000) // Every 30 seconds
    
    return () => clearInterval(interval)
  }, [measurePerformance])

  // Network latency measurement
  const measureNetworkLatency = useCallback(async () => {
    const start = performance.now()
    try {
      await fetch('/api/ping', { method: 'HEAD' })
      const latency = performance.now() - start
      setPerformanceMetrics(prev => ({
        ...prev,
        networkLatency: latency
      }))
    } catch (error) {
      console.warn('Network latency measurement failed:', error)
    }
  }, [])

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    if (!deviceCapabilities.shouldPreload) return

    const criticalResources = [
      '/api/courses/featured',
      '/api/user/profile',
      '/api/categories'
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = resource
      document.head.appendChild(link)
    })
  }, [deviceCapabilities.shouldPreload])

  // Lazy load images
  const lazyLoadImages = useCallback(() => {
    if (!deviceCapabilities.isLowEndDevice) return

    const images = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src || ''
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px'
    })

    images.forEach(img => imageObserver.observe(img))
  }, [deviceCapabilities.isLowEndDevice])

  // Batch DOM updates
  const batchUpdates = useCallback((updates: (() => void)[]) => {
    if (deviceCapabilities.limitedConcurrency) {
      // Use requestIdleCallback for low-end devices
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          updates.forEach(update => update())
        })
      } else {
        // Fallback to setTimeout
        setTimeout(() => {
          updates.forEach(update => update())
        }, 0)
      }
    } else {
      // Execute immediately for high-end devices
      updates.forEach(update => update())
    }
  }, [deviceCapabilities.limitedConcurrency])

  return {
    deviceCapabilities,
    performanceMetrics,
    isOnline,
    optimizationSettings,
    optimizeForDevice,
    measurePerformance,
    measureNetworkLatency,
    preloadCriticalResources,
    lazyLoadImages,
    batchUpdates
  }
}
