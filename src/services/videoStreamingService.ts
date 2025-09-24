import { supabase } from '../lib/supabase'

export interface VideoProcessingResult {
  success: boolean
  videoUrl: string
  processingJobId: string
  thumbnail: string
  duration: number
  error?: string
}

export interface StreamingManifest {
  type: 'hls' | 'dash'
  masterPlaylist: string
  qualityLevels: QualityLevel[]
  subtitles: SubtitleTrack[]
  thumbnails: string
}

export interface QualityLevel {
  resolution: string
  bitrate: string
  label: string
  playlistUrl: string
}

export interface SubtitleTrack {
  language: string
  label: string
  url: string
  default?: boolean
}

export interface InteractiveElement {
  id: string
  type: 'quiz' | 'note' | 'bookmark' | 'chapter' | 'poll'
  startTime: number
  endTime: number
  title: string
  content: any
  createdAt: string
}

export interface VideoAnalytics {
  watchTime: number
  completionPercentage: number
  interactionEvents: InteractionEvent[]
  qualityChanges: QualityChange[]
  pausePoints: PausePoint[]
  replaySegments: ReplaySegment[]
}

export interface InteractionEvent {
  type: string
  timestamp: number
  data: any
}

export interface QualityChange {
  from: string
  to: string
  timestamp: number
  reason: string
}

export interface PausePoint {
  timestamp: number
  duration: number
  reason?: string
}

export interface ReplaySegment {
  startTime: number
  endTime: number
  count: number
}

export class VideoStreamingService {
  private static instance: VideoStreamingService
  private cdnBaseUrl = import.meta.env.VITE_CDN_BASE_URL || 'https://cdn.oponm.com'
  private streamingApiKey = import.meta.env.VITE_STREAMING_API_KEY

  static getInstance(): VideoStreamingService {
    if (!VideoStreamingService.instance) {
      VideoStreamingService.instance = new VideoStreamingService()
    }
    return VideoStreamingService.instance
  }

  // Upload and process videos with multiple quality levels
  async uploadAndProcessVideo(file: File, courseId: string, lessonId: string): Promise<VideoProcessingResult> {
    try {
      // 1. Upload original video to Supabase Storage
      const fileName = `courses/${courseId}/lessons/${lessonId}/${Date.now()}-${file.name}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('course-videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // 2. Trigger video processing for multiple qualities
      const processingJob = await this.processVideoQualities(uploadData.path)

      // 3. Generate video thumbnail
      const thumbnail = await this.generateVideoThumbnail(uploadData.path)

      // 4. Extract video metadata
      const metadata = await this.extractVideoMetadata(file)

      // 5. Update lesson with video information
      await supabase
        .from('course_lessons')
        .update({
          video_url: `${this.cdnBaseUrl}/${uploadData.path}`,
          video_duration: metadata.duration,
          content_data: {
            ...metadata,
            processing_job_id: processingJob.id,
            thumbnail_url: thumbnail.url,
            quality_levels: processingJob.qualityLevels
          }
        })
        .eq('id', lessonId)

      return {
        success: true,
        videoUrl: `${this.cdnBaseUrl}/${uploadData.path}`,
        processingJobId: processingJob.id,
        thumbnail: thumbnail.url,
        duration: metadata.duration
      }

    } catch (error) {
      console.error('Video upload failed:', error)
      return {
        success: false,
        videoUrl: '',
        processingJobId: '',
        thumbnail: '',
        duration: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  // Adaptive bitrate streaming setup
  async setupAdaptiveStreaming(videoPath: string): Promise<StreamingManifest> {
    const qualityLevels = [
      { resolution: '1920x1080', bitrate: '5000k', label: '1080p' },
      { resolution: '1280x720', bitrate: '2500k', label: '720p' },
      { resolution: '854x480', bitrate: '1000k', label: '480p' },
      { resolution: '640x360', bitrate: '500k', label: '360p' }
    ]

    const manifest = {
      type: 'hls' as const,
      masterPlaylist: `${this.cdnBaseUrl}/streaming/${videoPath}/master.m3u8`,
      qualityLevels: qualityLevels.map(level => ({
        ...level,
        playlistUrl: `${this.cdnBaseUrl}/streaming/${videoPath}/${level.label}/index.m3u8`
      })),
      subtitles: await this.getAvailableSubtitles(videoPath),
      thumbnails: `${this.cdnBaseUrl}/thumbnails/${videoPath}/thumbnails.vtt`
    }

    return manifest
  }

  // Interactive video features
  async addInteractiveElements(lessonId: string, elements: InteractiveElement[]): Promise<void> {
    const processedElements = elements.map(element => ({
      ...element,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }))

    await supabase
      .from('course_lessons')
      .update({
        interactive_elements: processedElements
      })
      .eq('id', lessonId)
  }

  // Video analytics and engagement tracking
  async trackVideoEngagement(lessonId: string, studentId: string, analyticsData: VideoAnalytics): Promise<void> {
    await supabase
      .from('video_analytics')
      .upsert({
        lesson_id: lessonId,
        student_id: studentId,
        watch_time: analyticsData.watchTime,
        completion_percentage: analyticsData.completionPercentage,
        interaction_events: analyticsData.interactionEvents,
        quality_changes: analyticsData.qualityChanges,
        pause_points: analyticsData.pausePoints,
        replay_segments: analyticsData.replaySegments,
        session_date: new Date().toISOString()
      })
  }

  // Get video streaming URL with adaptive quality
  async getStreamingUrl(lessonId: string, quality: string = 'auto'): Promise<string> {
    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .select('video_url, content_data')
      .eq('id', lessonId)
      .single()

    if (error || !lesson) {
      throw new Error('Lesson not found')
    }

    if (quality === 'auto') {
      return lesson.video_url
    }

    // Return specific quality URL if available
    const qualityLevels = lesson.content_data?.quality_levels || []
    const selectedQuality = qualityLevels.find((q: any) => q.label === quality)
    
    return selectedQuality?.playlistUrl || lesson.video_url
  }

  // Generate video transcript using AI
  async generateTranscript(videoUrl: string): Promise<string> {
    try {
      // This would integrate with your AI transcription service
      const response = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl })
      })

      if (!response.ok) {
        throw new Error('Transcription failed')
      }

      const { transcript } = await response.json()
      return transcript
    } catch (error) {
      console.error('Transcript generation failed:', error)
      return ''
    }
  }

  // Create video chapters automatically
  async generateVideoChapters(videoUrl: string, duration: number): Promise<InteractiveElement[]> {
    try {
      // This would integrate with your AI service to detect scene changes
      const response = await fetch('/api/ai/generate-chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ videoUrl, duration })
      })

      if (!response.ok) {
        throw new Error('Chapter generation failed')
      }

      const { chapters } = await response.json()
      
      return chapters.map((chapter: any, index: number) => ({
        id: crypto.randomUUID(),
        type: 'chapter' as const,
        startTime: chapter.startTime,
        endTime: chapter.endTime,
        title: chapter.title,
        content: { description: chapter.description },
        createdAt: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Chapter generation failed:', error)
      return []
    }
  }

  // Private helper methods
  private async processVideoQualities(videoPath: string): Promise<{ id: string; qualityLevels: QualityLevel[] }> {
    try {
      // This would integrate with your video processing service (e.g., AWS MediaConvert, Cloudinary)
      const response = await fetch('/api/video/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.streamingApiKey}`
        },
        body: JSON.stringify({
          inputPath: videoPath,
          qualities: [
            { resolution: '1920x1080', bitrate: '5000k' },
            { resolution: '1280x720', bitrate: '2500k' },
            { resolution: '854x480', bitrate: '1000k' },
            { resolution: '640x360', bitrate: '500k' }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Video processing failed')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Video processing failed:', error)
      // Return mock data for development
      return {
        id: `job_${Date.now()}`,
        qualityLevels: [
          { resolution: '1920x1080', bitrate: '5000k', label: '1080p', playlistUrl: '' },
          { resolution: '1280x720', bitrate: '2500k', label: '720p', playlistUrl: '' },
          { resolution: '854x480', bitrate: '1000k', label: '480p', playlistUrl: '' },
          { resolution: '640x360', bitrate: '500k', label: '360p', playlistUrl: '' }
        ]
      }
    }
  }

  private async generateVideoThumbnail(videoPath: string): Promise<{ url: string }> {
    try {
      // This would integrate with your thumbnail generation service
      const response = await fetch('/api/video/thumbnail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.streamingApiKey}`
        },
        body: JSON.stringify({ videoPath })
      })

      if (!response.ok) {
        throw new Error('Thumbnail generation failed')
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Thumbnail generation failed:', error)
      // Return placeholder thumbnail
      return { url: '/placeholder-thumbnail.jpg' }
    }
  }

  private async extractVideoMetadata(file: File): Promise<{ duration: number; width: number; height: number; format: string }> {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'metadata'
      
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          format: file.type
        })
      }
      
      video.onerror = () => {
        resolve({
          duration: 0,
          width: 0,
          height: 0,
          format: file.type
        })
      }
      
      video.src = URL.createObjectURL(file)
    })
  }

  private async getAvailableSubtitles(videoPath: string): Promise<SubtitleTrack[]> {
    try {
      // This would check for available subtitle files
      const languages = ['en', 'es', 'fr', 'de']
      
      return languages.map(lang => ({
        language: lang,
        label: this.getLanguageLabel(lang),
        url: `${this.cdnBaseUrl}/subtitles/${videoPath}/${lang}.vtt`,
        default: lang === 'en'
      }))
    } catch (error) {
      console.error('Failed to get subtitles:', error)
      return []
    }
  }

  private getLanguageLabel(language: string): string {
    const labels: Record<string, string> = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'zh': '中文',
      'ja': '日本語',
      'ko': '한국어'
    }
    return labels[language] || language
  }

  // Public utility methods
  async getVideoAnalytics(lessonId: string, studentId?: string): Promise<VideoAnalytics[]> {
    let query = supabase
      .from('video_analytics')
      .select('*')
      .eq('lesson_id', lessonId)

    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    const { data: analytics, error } = await query.order('session_date', { ascending: false })

    if (error) throw error
    return analytics || []
  }

  async getPopularVideoSegments(lessonId: string): Promise<{ startTime: number; endTime: number; watchCount: number }[]> {
    try {
      const response = await fetch(`/api/analytics/video-segments/${lessonId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch video segments')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get popular video segments:', error)
      return []
    }
  }

  async getVideoEngagementMetrics(lessonId: string): Promise<{
    averageWatchTime: number
    completionRate: number
    dropoffPoints: number[]
    engagementScore: number
  }> {
    try {
      const response = await fetch(`/api/analytics/video-engagement/${lessonId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch engagement metrics')
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get video engagement metrics:', error)
      return {
        averageWatchTime: 0,
        completionRate: 0,
        dropoffPoints: [],
        engagementScore: 0
      }
    }
  }

  // Video optimization methods
  async optimizeVideoForDevice(videoUrl: string, deviceInfo: {
    connectionType: string
    screenSize: string
    deviceType: string
  }): Promise<string> {
    // Return optimized video URL based on device capabilities
    if (deviceInfo.connectionType === 'slow-2g' || deviceInfo.connectionType === '2g') {
      return videoUrl.replace('/1080p/', '/360p/')
    } else if (deviceInfo.connectionType === '3g') {
      return videoUrl.replace('/1080p/', '/480p/')
    } else if (deviceInfo.screenSize === 'mobile') {
      return videoUrl.replace('/1080p/', '/720p/')
    }
    
    return videoUrl
  }

  async preloadVideo(videoUrl: string): Promise<void> {
    // Preload video for better user experience
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = videoUrl
    document.head.appendChild(link)
  }

  async getVideoBufferStatus(videoElement: HTMLVideoElement): Promise<{
    buffered: TimeRanges
    readyState: number
    networkState: number
  }> {
    return {
      buffered: videoElement.buffered,
      readyState: videoElement.readyState,
      networkState: videoElement.networkState
    }
  }
}

export const videoStreamingService = VideoStreamingService.getInstance()
