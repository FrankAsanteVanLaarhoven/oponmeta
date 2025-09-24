import { useEffect, useState, useCallback } from 'react'
import { offlineService } from '../services/offlineService'
import { supabase } from '../lib/supabase'

interface SyncStatus {
  isSyncing: boolean
  lastSyncTime: Date | null
  pendingItems: number
  failedItems: number
  syncProgress: number
}

interface SyncResult {
  success: boolean
  syncedItems: number
  failedItems: number
  errors: string[]
}

export const useBackgroundSync = () => {
  // Disable background sync to prevent IndexedDB errors
  const DISABLE_BACKGROUND_SYNC = true
  
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isSyncing: false,
    lastSyncTime: null,
    pendingItems: 0,
    failedItems: 0,
    syncProgress: 0
  })

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true)
      if (navigator.onLine) {
        setSyncStatus(prev => ({ ...prev, isSyncing: true }))
        try {
          await syncPendingProgress()
          await syncOfflineActions()
          setSyncStatus(prev => ({
            ...prev,
            lastSyncTime: new Date(),
            isSyncing: false,
            pendingItems: 0,
            failedItems: 0
          }))
        } catch (error) {
          console.error('Background sync failed:', error)
          setSyncStatus(prev => ({
            ...prev,
            isSyncing: false,
            failedItems: prev.failedItems + 1
          }))
        }
      }
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Initial sync check
    if (navigator.onLine) {
      handleOnline()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const syncPendingProgress = async (): Promise<SyncResult> => {
    if (DISABLE_BACKGROUND_SYNC) {
      return {
        success: true,
        syncedItems: 0,
        failedItems: 0,
        errors: []
      }
    }

    const result: SyncResult = {
      success: true,
      syncedItems: 0,
      failedItems: 0,
      errors: []
    }

    try {
      const pendingProgress = await offlineService.getAllPendingProgress()
      
      for (let i = 0; i < pendingProgress.length; i++) {
        const progress = pendingProgress[i]
        
        try {
          const { error } = await supabase
            .from('course_progress')
            .upsert({
              course_id: progress.courseId,
              user_id: progress.userId,
              progress: progress.progress,
              completed_lessons: progress.completedLessons,
              last_position: progress.lastPosition,
              updated_at: new Date().toISOString()
            })

          if (error) {
            throw error
          }

          // Remove from offline storage after successful sync
          await offlineService.removePendingProgress(progress.id)
          result.syncedItems++
          
          // Update progress
          setSyncStatus(prev => ({
            ...prev,
            syncProgress: Math.round(((i + 1) / pendingProgress.length) * 100)
          }))

        } catch (error) {
          console.error(`Failed to sync progress for course ${progress.courseId}:`, error)
          result.failedItems++
          result.errors.push(`Course ${progress.courseId}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }

      if (result.failedItems > 0) {
        result.success = false
      }

    } catch (error) {
      result.success = false
      result.errors.push(error instanceof Error ? error.message : 'Unknown error')
    }

    return result
  }

  const syncOfflineActions = async (): Promise<SyncResult> => {
    const result: SyncResult = {
      success: true,
      syncedItems: 0,
      failedItems: 0,
      errors: []
    }

    try {
      const pendingActions = await offlineService.getPendingActions()
      
      for (let i = 0; i < pendingActions.length; i++) {
        const action = pendingActions[i]
        
        try {
          const response = await fetch(action.url, {
            method: action.method,
            headers: {
              'Content-Type': 'application/json',
              ...action.headers
            },
            body: action.body
          })

          if (response.ok) {
            await offlineService.removePendingAction(action.id)
            result.syncedItems++
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          // Update progress
          setSyncStatus(prev => ({
            ...prev,
            syncProgress: Math.round(((i + 1) / pendingActions.length) * 100)
          }))

        } catch (error) {
          console.error(`Failed to sync action ${action.id}:`, error)
          
          // Increment retry count
          await offlineService.incrementRetryCount(action.id)
          
          result.failedItems++
          result.errors.push(`Action ${action.id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }

      if (result.failedItems > 0) {
        result.success = false
      }

    } catch (error) {
      result.success = false
      result.errors.push(error instanceof Error ? error.message : 'Unknown error')
    }

    return result
  }

  const syncNow = useCallback(async (): Promise<SyncResult> => {
    if (!navigator.onLine) {
      throw new Error('Cannot sync while offline')
    }

    setSyncStatus(prev => ({ ...prev, isSyncing: true, syncProgress: 0 }))

    try {
      const progressResult = await syncPendingProgress()
      const actionsResult = await syncOfflineActions()

      const combinedResult: SyncResult = {
        success: progressResult.success && actionsResult.success,
        syncedItems: progressResult.syncedItems + actionsResult.syncedItems,
        failedItems: progressResult.failedItems + actionsResult.failedItems,
        errors: [...progressResult.errors, ...actionsResult.errors]
      }

      setSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        lastSyncTime: new Date(),
        pendingItems: 0,
        failedItems: combinedResult.failedItems,
        syncProgress: 100
      }))

      return combinedResult

    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        isSyncing: false,
        failedItems: prev.failedItems + 1
      }))
      throw error
    }
  }, [])

  const queueOfflineAction = useCallback(async (action: {
    type: 'enrollment' | 'progress' | 'review' | 'payment'
    url: string
    method: string
    headers: Record<string, string>
    body: string
  }): Promise<void> => {
    await offlineService.queueOfflineAction(action)
    
    setSyncStatus(prev => ({
      ...prev,
      pendingItems: prev.pendingItems + 1
    }))

    // Trigger background sync if online
    if (navigator.onLine && 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('offline-actions')
    }
  }, [])

  const saveProgressOffline = useCallback(async (progressData: {
    courseId: string
    userId: string
    progress: number
    completedLessons: string[]
    lastPosition: number
  }): Promise<void> => {
    if (DISABLE_BACKGROUND_SYNC) {
      return
    }
    
    await offlineService.saveProgressOffline(progressData)
    
    setSyncStatus(prev => ({
      ...prev,
      pendingItems: prev.pendingItems + 1
    }))

    // Trigger background sync if online
    if (navigator.onLine && 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('course-progress-sync')
    }
  }, [])

  const getPendingCount = useCallback(async (): Promise<number> => {
    if (DISABLE_BACKGROUND_SYNC) {
      return 0
    }
    
    try {
      const pendingProgress = await offlineService.getAllPendingProgress()
      const pendingActions = await offlineService.getPendingActions()
      return pendingProgress.length + pendingActions.length
    } catch (error) {
      console.warn('Error getting pending count:', error)
      return 0
    }
  }, [])

  const clearFailedItems = useCallback(async (): Promise<void> => {
    // This would clear failed items from IndexedDB
    // Implementation depends on your offline service
    setSyncStatus(prev => ({
      ...prev,
      failedItems: 0
    }))
  }, [])

  const retryFailedItems = useCallback(async (): Promise<SyncResult> => {
    if (!navigator.onLine) {
      throw new Error('Cannot retry while offline')
    }

    setSyncStatus(prev => ({ ...prev, isSyncing: true }))
    
    try {
      const result = await syncNow()
      return result
    } finally {
      setSyncStatus(prev => ({ ...prev, isSyncing: false }))
    }
  }, [syncNow])

  // Periodic sync check
  useEffect(() => {
    if (!navigator.onLine) return

    const interval = setInterval(async () => {
      try {
        const pendingCount = await getPendingCount()
        if (pendingCount > 0) {
          setSyncStatus(prev => ({ ...prev, pendingItems: pendingCount }))
        }
      } catch (error) {
        console.warn('Error in sync interval:', error)
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [getPendingCount])

  return {
    syncStatus,
    isOnline,
    syncNow,
    queueOfflineAction,
    saveProgressOffline,
    getPendingCount,
    clearFailedItems,
    retryFailedItems
  }
}
