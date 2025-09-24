import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { offlineService } from '../services/offlineService'
import { notificationService } from '../services/notificationService'
import { performanceService } from '../services/performanceService'
import { useBackgroundSync } from '../hooks/useBackgroundSync'
import { usePerformanceOptimization } from '../hooks/usePerformanceOptimization'

interface PWAInitializerProps {
  children: React.ReactNode
}

export const PWAInitializer: React.FC<PWAInitializerProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const { isOnline, syncNow } = useBackgroundSync()
  const { deviceCapabilities, preloadCriticalResources } = usePerformanceOptimization()

  // PWA update registration
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  useEffect(() => {
    const initializePWA = async () => {
      try {
        // Initialize offline service
        try {
          await offlineService.init()
          console.log('Offline service initialized')
        } catch (error) {
          console.warn('Offline service failed to initialize, continuing without offline features:', error)
        }

        // Initialize notification service (disabled to prevent IndexedDB errors)
        // try {
        //   await notificationService.initialize()
        //   console.log('Notification service initialized')
        // } catch (error) {
        //   console.warn('Notification service failed to initialize, continuing without notifications:', error)
        // }
        console.log('Notification service disabled to prevent IndexedDB errors')

        // Initialize performance monitoring
        performanceService.initializeMonitoring()
        console.log('Performance monitoring initialized')

        // Preload critical resources for high-end devices
        if (deviceCapabilities.shouldPreload) {
          preloadCriticalResources()
        }

        // Check for PWA updates
        if (needRefresh) {
          setUpdateAvailable(true)
        }

        setIsInitialized(true)
        console.log('PWA initialization completed')

      } catch (error) {
        console.error('PWA initialization failed:', error)
        setIsInitialized(true) // Still render the app even if PWA features fail
      }
    }

    initializePWA()
  }, [needRefresh, deviceCapabilities.shouldPreload, preloadCriticalResources])

  const handleUpdate = () => {
    updateServiceWorker(true)
    setUpdateAvailable(false)
  }

  const handleDismissUpdate = () => {
    setUpdateAvailable(false)
    setNeedRefresh(false)
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing PWA...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      
      {/* PWA Update Prompt */}
      {updateAvailable && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                Update Available
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                A new version of the app is available. Update now to get the latest features and improvements.
              </p>
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Update Now
                </button>
                <button
                  onClick={handleDismissUpdate}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offline Indicator */}
      {!isOnline && (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3 z-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-yellow-800">
                You're offline
              </p>
              <p className="text-xs text-yellow-700">
                Some features may be limited. Your progress will sync when you're back online.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sync Status Indicator */}
      {isOnline && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={syncNow}
            className="bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition-colors"
            title="Sync offline data"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
