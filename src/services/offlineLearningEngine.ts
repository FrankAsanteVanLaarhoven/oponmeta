import { offlineService } from './offlineService'

export interface CourseProgress {
  courseId: string
  userId: string
  currentLesson: string
  completedLessons: string[]
  progress: number
  timeSpent: number
  lastPosition: number
  notes: string[]
  bookmarks: string[]
  lastUpdate: number
}

export interface OfflineCourse {
  id: string
  title: string
  description: string
  instructor: {
    id: string
    name: string
    avatar?: string
  }
  lessons: OfflineLesson[]
  documents: OfflineDocument[]
  videos: OfflineVideo[]
  quizzes: OfflineQuiz[]
  downloadedAt: number
  lastAccessed: number
  size: number
  version: string
}

export interface OfflineLesson {
  id: string
  title: string
  content: string
  type: 'text' | 'video' | 'interactive' | 'quiz'
  duration: number
  order: number
  prerequisites: string[]
}

export interface OfflineDocument {
  id: string
  title: string
  type: 'pdf' | 'doc' | 'ppt' | 'image'
  url: string
  size: number
  downloaded: boolean
}

export interface OfflineVideo {
  id: string
  title: string
  url: string
  thumbnail: string
  duration: number
  quality: 'low' | 'medium' | 'high'
  downloaded: boolean
  size: number
}

export interface OfflineQuiz {
  id: string
  title: string
  questions: OfflineQuestion[]
  passingScore: number
  attempts: number
  timeLimit?: number
}

export interface OfflineQuestion {
  id: string
  type: 'multiple_choice' | 'true_false' | 'text' | 'essay'
  question: string
  options?: string[]
  correctAnswer?: string | string[]
  explanation?: string
}

export interface DownloadProgress {
  courseId: string
  totalSize: number
  downloadedSize: number
  progress: number
  status: 'downloading' | 'completed' | 'failed' | 'paused'
  error?: string
}

export class OfflineLearningEngine {
  private static instance: OfflineLearningEngine
  private downloadProgress: Map<string, DownloadProgress> = new Map()
  private db: IDBDatabase | null = null

  static getInstance(): OfflineLearningEngine {
    if (!OfflineLearningEngine.instance) {
      OfflineLearningEngine.instance = new OfflineLearningEngine()
    }
    return OfflineLearningEngine.instance
  }

  async initialize(): Promise<void> {
    await offlineService.init()
    this.setupDownloadListeners()
  }

  async downloadCourseForOffline(courseId: string, userId: string): Promise<boolean> {
    try {
      // Initialize download progress
      this.downloadProgress.set(courseId, {
        courseId,
        totalSize: 0,
        downloadedSize: 0,
        progress: 0,
        status: 'downloading'
      })

      // Fetch course data
      const course = await this.fetchCourseData(courseId)
      if (!course) {
        throw new Error('Course not found')
      }

      // Calculate total size
      const totalSize = await this.calculateCourseSize(course)
      this.updateDownloadProgress(courseId, { totalSize })

      // Download course materials
      const [videos, documents] = await Promise.all([
        this.downloadVideos(course.videos, courseId),
        this.downloadDocuments(course.documents, courseId)
      ])

      // Create offline course object
      const offlineCourse: OfflineCourse = {
        id: courseId,
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        lessons: course.lessons,
        documents: documents,
        videos: videos,
        quizzes: course.quizzes,
        downloadedAt: Date.now(),
        lastAccessed: Date.now(),
        size: totalSize,
        version: course.version
      }

      // Store in IndexedDB
      await this.storeCourseOffline(offlineCourse)

      // Register for background sync
      await this.registerBackgroundSync(courseId)

      // Update progress
      this.updateDownloadProgress(courseId, {
        status: 'completed',
        progress: 100,
        downloadedSize: totalSize
      })

      // Track analytics
      this.trackDownloadEvent(courseId, 'success', totalSize)

      return true

    } catch (error) {
      console.error('Offline download failed:', error)
      this.updateDownloadProgress(courseId, {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      this.trackDownloadEvent(courseId, 'failed', 0, error)
      return false
    }
  }

  async trackOfflineProgress(courseId: string, progress: CourseProgress): Promise<void> {
    try {
      // Store progress locally
      await offlineService.saveProgressOffline(progress)

      // Update last accessed time
      await this.updateLastAccessed(courseId)

      // Track analytics
      this.trackProgressEvent(courseId, progress)

      // Schedule sync when online
      if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
        const registration = await navigator.serviceWorker.ready
        await registration.sync.register(`course-progress-${courseId}`)
      }

    } catch (error) {
      console.error('Failed to track offline progress:', error)
    }
  }

  async getOfflineCourses(userId: string): Promise<OfflineCourse[]> {
    try {
      const courses = await offlineService.getAllCachedCourses()
      return courses.filter(course => course.userId === userId)
    } catch (error) {
      console.error('Failed to get offline courses:', error)
      return []
    }
  }

  async getOfflineProgress(courseId: string, userId: string): Promise<CourseProgress | null> {
    try {
      return await offlineService.getProgress(courseId, userId)
    } catch (error) {
      console.error('Failed to get offline progress:', error)
      return null
    }
  }

  async deleteOfflineCourse(courseId: string): Promise<boolean> {
    try {
      // Remove from IndexedDB
      await offlineService.removeCachedCourse(courseId)

      // Clear download progress
      this.downloadProgress.delete(courseId)

      // Track analytics
      this.trackDownloadEvent(courseId, 'deleted', 0)

      return true
    } catch (error) {
      console.error('Failed to delete offline course:', error)
      return false
    }
  }

  async pauseDownload(courseId: string): Promise<void> {
    const progress = this.downloadProgress.get(courseId)
    if (progress && progress.status === 'downloading') {
      this.updateDownloadProgress(courseId, { status: 'paused' })
    }
  }

  async resumeDownload(courseId: string): Promise<void> {
    const progress = this.downloadProgress.get(courseId)
    if (progress && progress.status === 'paused') {
      this.updateDownloadProgress(courseId, { status: 'downloading' })
      // Resume download logic would go here
    }
  }

  getDownloadProgress(courseId: string): DownloadProgress | null {
    return this.downloadProgress.get(courseId) || null
  }

  getAllDownloadProgress(): DownloadProgress[] {
    return Array.from(this.downloadProgress.values())
  }

  // Private methods
  private async fetchCourseData(courseId: string): Promise<any> {
    const response = await fetch(`/api/courses/${courseId}/offline`)
    if (!response.ok) {
      throw new Error('Failed to fetch course data')
    }
    return response.json()
  }

  private async calculateCourseSize(course: any): Promise<number> {
    let totalSize = 0

    // Calculate video sizes
    for (const video of course.videos) {
      totalSize += video.size || 0
    }

    // Calculate document sizes
    for (const document of course.documents) {
      totalSize += document.size || 0
    }

    // Add estimated size for lessons and quizzes
    totalSize += course.lessons.length * 1000 // 1KB per lesson
    totalSize += course.quizzes.length * 2000 // 2KB per quiz

    return totalSize
  }

  private async downloadVideos(videos: any[], courseId: string): Promise<OfflineVideo[]> {
    const downloadedVideos: OfflineVideo[] = []

    for (const video of videos) {
      try {
        const response = await fetch(video.url)
        if (!response.ok) continue

        const blob = await response.blob()
        const videoUrl = URL.createObjectURL(blob)

        downloadedVideos.push({
          id: video.id,
          title: video.title,
          url: videoUrl,
          thumbnail: video.thumbnail,
          duration: video.duration,
          quality: 'medium',
          downloaded: true,
          size: blob.size
        })

        // Update download progress
        this.updateDownloadProgress(courseId, {
          downloadedSize: this.downloadProgress.get(courseId)?.downloadedSize + blob.size
        })

      } catch (error) {
        console.error(`Failed to download video ${video.id}:`, error)
        downloadedVideos.push({
          ...video,
          downloaded: false,
          size: 0
        })
      }
    }

    return downloadedVideos
  }

  private async downloadDocuments(documents: any[], courseId: string): Promise<OfflineDocument[]> {
    const downloadedDocuments: OfflineDocument[] = []

    for (const document of documents) {
      try {
        const response = await fetch(document.url)
        if (!response.ok) continue

        const blob = await response.blob()
        const documentUrl = URL.createObjectURL(blob)

        downloadedDocuments.push({
          id: document.id,
          title: document.title,
          type: document.type,
          url: documentUrl,
          size: blob.size,
          downloaded: true
        })

        // Update download progress
        this.updateDownloadProgress(courseId, {
          downloadedSize: this.downloadProgress.get(courseId)?.downloadedSize + blob.size
        })

      } catch (error) {
        console.error(`Failed to download document ${document.id}:`, error)
        downloadedDocuments.push({
          ...document,
          downloaded: false,
          size: 0
        })
      }
    }

    return downloadedDocuments
  }

  private async storeCourseOffline(course: OfflineCourse): Promise<void> {
    await offlineService.cacheCourse(course)
  }

  private async registerBackgroundSync(courseId: string): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register(`course-download-${courseId}`)
    }
  }

  private updateDownloadProgress(courseId: string, updates: Partial<DownloadProgress>): void {
    const current = this.downloadProgress.get(courseId)
    if (current) {
      const updated = { ...current, ...updates }
      if (updated.totalSize > 0) {
        updated.progress = Math.round((updated.downloadedSize / updated.totalSize) * 100)
      }
      this.downloadProgress.set(courseId, updated)
      
      // Emit progress event
      this.emitProgressEvent(courseId, updated)
    }
  }

  private async updateLastAccessed(courseId: string): Promise<void> {
    try {
      const course = await offlineService.getCachedCourse(courseId)
      if (course) {
        course.lastAccessed = Date.now()
        await offlineService.cacheCourse(course)
      }
    } catch (error) {
      console.error('Failed to update last accessed:', error)
    }
  }

  private setupDownloadListeners(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.handleOnlineEvent()
    })

    window.addEventListener('offline', () => {
      this.handleOfflineEvent()
    })
  }

  private async handleOnlineEvent(): Promise<void> {
    // Resume any paused downloads
    for (const [courseId, progress] of this.downloadProgress) {
      if (progress.status === 'paused') {
        await this.resumeDownload(courseId)
      }
    }

    // Sync offline progress
    await this.syncOfflineProgress()
  }

  private async handleOfflineEvent(): Promise<void> {
    // Pause any active downloads
    for (const [courseId, progress] of this.downloadProgress) {
      if (progress.status === 'downloading') {
        await this.pauseDownload(courseId)
      }
    }
  }

  private async syncOfflineProgress(): Promise<void> {
    try {
      const pendingProgress = await offlineService.getAllPendingProgress()
      
      for (const progress of pendingProgress) {
        // Sync with backend
        const response = await fetch('/api/course-progress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(progress)
        })

        if (response.ok) {
          await offlineService.removePendingProgress(progress.id)
        }
      }
    } catch (error) {
      console.error('Failed to sync offline progress:', error)
    }
  }

  private emitProgressEvent(courseId: string, progress: DownloadProgress): void {
    const event = new CustomEvent('downloadProgress', {
      detail: { courseId, progress }
    })
    window.dispatchEvent(event)
  }

  private trackDownloadEvent(courseId: string, status: string, size: number, error?: any): void {
    if (window.gtag) {
      window.gtag('event', 'offline_download', {
        course_id: courseId,
        status: status,
        size: size,
        error: error?.message
      })
    }
  }

  private trackProgressEvent(courseId: string, progress: CourseProgress): void {
    if (window.gtag) {
      window.gtag('event', 'offline_progress', {
        course_id: courseId,
        progress_percentage: progress.progress,
        time_spent: progress.timeSpent,
        completed_lessons: progress.completedLessons.length
      })
    }
  }

  // Utility methods
  async getStorageUsage(): Promise<{ used: number; available: number; courses: number }> {
    const storage = await offlineService.getStorageUsage()
    const courses = await offlineService.getAllCachedCourses()
    
    return {
      used: storage.used,
      available: storage.available,
      courses: courses.length
    }
  }

  async clearAllOfflineData(): Promise<void> {
    await offlineService.clearAllData()
    this.downloadProgress.clear()
  }

  isOfflineCourseAvailable(courseId: string): boolean {
    return this.downloadProgress.has(courseId) && 
           this.downloadProgress.get(courseId)?.status === 'completed'
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const offlineLearningEngine = OfflineLearningEngine.getInstance()
