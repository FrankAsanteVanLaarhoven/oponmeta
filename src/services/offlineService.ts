import { openDB, DBSchema, IDBPDatabase, deleteDB } from 'idb'

interface OfflineDB extends DBSchema {
  courses: {
    key: string
    value: {
      id: string
      title: string
      description: string
      content: string
      videos: string[]
      documents: string[]
      lastSync: number
      instructor: {
        id: string
        name: string
        avatar?: string
      }
      category: {
        id: string
        name: string
      }
    }
  }
  progress: {
    key: string
    value: {
      id: string
      courseId: string
      userId: string
      progress: number
      completedLessons: string[]
      lastPosition: number
      lastUpdate: number
      isPending: boolean
    }
  }
  offlineActions: {
    key: string
    value: {
      id: string
      type: 'enrollment' | 'progress' | 'review' | 'payment'
      url: string
      method: string
      headers: Record<string, string>
      body: string
      timestamp: number
      retryCount: number
    }
  }
  userData: {
    key: string
    value: {
      userId: string
      profile: any
      preferences: any
      lastSync: number
    }
  }
  notifications: {
    key: string
    value: {
      id: string
      title: string
      body: string
      data: any
      timestamp: number
      isRead: boolean
    }
  }
}

class OfflineService {
  private db: IDBPDatabase<OfflineDB> | null = null
  private readonly DB_NAME = 'oponm-offline'
  private readonly DB_VERSION = 1

  async init(): Promise<void> {
    if (this.db) return

    try {
      // Delete existing database to start fresh and avoid version conflicts
      try {
        await deleteDB(this.DB_NAME)
      } catch (deleteError) {
        // Ignore delete errors - database might not exist
        console.log('No existing database to delete')
      }
      
      this.db = await openDB<OfflineDB>(this.DB_NAME, this.DB_VERSION, {
        upgrade(db) {
          // Courses store
          if (!db.objectStoreNames.contains('courses')) {
            const coursesStore = db.createObjectStore('courses', { keyPath: 'id' })
            coursesStore.createIndex('lastSync', 'lastSync')
          }

          // Progress store
          if (!db.objectStoreNames.contains('progress')) {
            const progressStore = db.createObjectStore('progress', { keyPath: 'id' })
            progressStore.createIndex('courseId', 'courseId')
            progressStore.createIndex('userId', 'userId')
            progressStore.createIndex('isPending', 'isPending')
          }

          // Offline actions store
          if (!db.objectStoreNames.contains('offlineActions')) {
            const actionsStore = db.createObjectStore('offlineActions', { keyPath: 'id' })
            actionsStore.createIndex('type', 'type')
            actionsStore.createIndex('timestamp', 'timestamp')
          }

          // User data store
          if (!db.objectStoreNames.contains('userData')) {
            const userStore = db.createObjectStore('userData', { keyPath: 'userId' })
            userStore.createIndex('lastSync', 'lastSync')
          }

          // Notifications store
          if (!db.objectStoreNames.contains('notifications')) {
            const notificationsStore = db.createObjectStore('notifications', { keyPath: 'id' })
            notificationsStore.createIndex('timestamp', 'timestamp')
            notificationsStore.createIndex('isRead', 'isRead')
          }
        }
      })
      
      console.log('Offline database initialized successfully')
    } catch (error) {
      console.warn('Failed to initialize offline database:', error)
      this.db = null
    }
  }

  // Course management
  async cacheCourse(courseData: any): Promise<void> {
    if (!this.db) await this.init()
    
    const course = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      content: courseData.content,
      videos: courseData.videos || [],
      documents: courseData.documents || [],
      lastSync: Date.now(),
      instructor: courseData.instructor,
      category: courseData.category
    }

    await this.db!.put('courses', course)
  }

  async getCachedCourse(courseId: string): Promise<any | null> {
    if (!this.db) await this.init()
    return await this.db!.get('courses', courseId)
  }

  async getAllCachedCourses(): Promise<any[]> {
    if (!this.db) await this.init()
    return await this.db!.getAll('courses')
  }

  async removeCachedCourse(courseId: string): Promise<void> {
    if (!this.db) await this.init()
    await this.db!.delete('courses', courseId)
  }

  // Progress management
  async saveProgressOffline(progressData: any): Promise<void> {
    if (!this.db) await this.init()
    
    const progress = {
      id: `${progressData.courseId}-${progressData.userId}`,
      courseId: progressData.courseId,
      userId: progressData.userId,
      progress: progressData.progress,
      completedLessons: progressData.completedLessons || [],
      lastPosition: progressData.lastPosition || 0,
      lastUpdate: Date.now(),
      isPending: true
    }

    await this.db!.put('progress', progress)
    
    // Trigger background sync when online
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('course-progress-sync')
    }
  }

  async getProgress(courseId: string, userId: string): Promise<any | null> {
    if (!this.db) await this.init()
    const id = `${courseId}-${userId}`
    return await this.db!.get('progress', id)
  }

  async getAllPendingProgress(): Promise<any[]> {
    try {
      if (!this.db) await this.init()
      if (!this.db) return []
      
      // Check if the store and index exist before querying
      if (!this.db.objectStoreNames.contains('progress')) {
        console.warn('Progress store does not exist')
        return []
      }
      
      return await this.db.getAllFromIndex('progress', 'isPending', true)
    } catch (error) {
      console.warn('Error getting pending progress:', error)
      return []
    }
  }

  async markProgressSynced(progressId: string): Promise<void> {
    if (!this.db) await this.init()
    const progress = await this.db!.get('progress', progressId)
    if (progress) {
      progress.isPending = false
      await this.db!.put('progress', progress)
    }
  }

  async removePendingProgress(progressId: string): Promise<void> {
    if (!this.db) await this.init()
    await this.db!.delete('progress', progressId)
  }

  // Offline actions management
  async queueOfflineAction(action: {
    type: 'enrollment' | 'progress' | 'review' | 'payment'
    url: string
    method: string
    headers: Record<string, string>
    body: string
  }): Promise<void> {
    if (!this.db) await this.init()
    
    const offlineAction = {
      id: `${action.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: action.type,
      url: action.url,
      method: action.method,
      headers: action.headers,
      body: action.body,
      timestamp: Date.now(),
      retryCount: 0
    }

    await this.db!.put('offlineActions', offlineAction)
    
    // Trigger background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('offline-actions')
    }
  }

  async getPendingActions(): Promise<any[]> {
    if (!this.db) await this.init()
    return await this.db!.getAll('offlineActions')
  }

  async removePendingAction(actionId: string): Promise<void> {
    if (!this.db) await this.init()
    await this.db!.delete('offlineActions', actionId)
  }

  async incrementRetryCount(actionId: string): Promise<void> {
    if (!this.db) await this.init()
    const action = await this.db!.get('offlineActions', actionId)
    if (action) {
      action.retryCount++
      await this.db!.put('offlineActions', action)
    }
  }

  // User data management
  async cacheUserData(userId: string, profile: any, preferences: any): Promise<void> {
    if (!this.db) await this.init()
    
    const userData = {
      userId,
      profile,
      preferences,
      lastSync: Date.now()
    }

    await this.db!.put('userData', userData)
  }

  async getCachedUserData(userId: string): Promise<any | null> {
    if (!this.db) await this.init()
    return await this.db!.get('userData', userId)
  }

  // Notifications management
  async storeNotification(notification: {
    title: string
    body: string
    data: any
  }): Promise<void> {
    if (!this.db) await this.init()
    
    const notificationData = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: notification.title,
      body: notification.body,
      data: notification.data,
      timestamp: Date.now(),
      isRead: false
    }

    await this.db!.put('notifications', notificationData)
  }

  async getUnreadNotifications(): Promise<any[]> {
    try {
      if (!this.db) await this.init()
      if (!this.db) return []
      
      // Check if the store and index exist before querying
      if (!this.db.objectStoreNames.contains('notifications')) {
        console.warn('Notifications store does not exist')
        return []
      }
      
      return await this.db.getAllFromIndex('notifications', 'isRead', false)
    } catch (error) {
      console.warn('Error getting unread notifications:', error)
      return []
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    if (!this.db) await this.init()
    const notification = await this.db!.get('notifications', notificationId)
    if (notification) {
      notification.isRead = true
      await this.db!.put('notifications', notification)
    }
  }

  // Utility methods
  async clearAllData(): Promise<void> {
    if (!this.db) await this.init()
    
    await Promise.all([
      this.db!.clear('courses'),
      this.db!.clear('progress'),
      this.db!.clear('offlineActions'),
      this.db!.clear('userData'),
      this.db!.clear('notifications')
    ])
  }

  async getStorageUsage(): Promise<{ used: number; available: number }> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0
      }
    }
    return { used: 0, available: 0 }
  }

  async isOnline(): Promise<boolean> {
    return navigator.onLine
  }

  async waitForOnline(): Promise<void> {
    return new Promise((resolve) => {
      if (navigator.onLine) {
        resolve()
      } else {
        const handleOnline = () => {
          window.removeEventListener('online', handleOnline)
          resolve()
        }
        window.addEventListener('online', handleOnline)
      }
    })
  }
}

// Export singleton instance
export const offlineService = new OfflineService()

// Export types for use in other files
export type OfflineActionType = 'enrollment' | 'progress' | 'review' | 'payment'
export type CachedCourse = OfflineDB['courses']['value']
export type CachedProgress = OfflineDB['progress']['value']
export type OfflineAction = OfflineDB['offlineActions']['value']
