import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Play, Pause, Volume2, VolumeX, Settings, Maximize, Minimize, SkipBack, SkipForward, Bookmark, MessageSquare } from 'lucide-react'
import { videoStreamingService } from '../services/videoStreamingService'

interface VideoPlayerProps {
  lessonId: string
  videoUrl: string
  studentId: string
  onProgressUpdate?: (currentTime: number, duration: number) => void
  interactiveElements?: InteractiveElement[]
  autoPlay?: boolean
  showControls?: boolean
  className?: string
}

interface InteractiveElement {
  id: string
  type: 'quiz' | 'note' | 'bookmark' | 'chapter' | 'poll'
  startTime: number
  endTime: number
  title: string
  content: any
  createdAt: string
}

interface VideoAnalytics {
  watchTime: number
  completionPercentage: number
  interactionEvents: any[]
  qualityChanges: any[]
  pausePoints: any[]
  replaySegments: any[]
}

export const AdvancedVideoPlayer: React.FC<VideoPlayerProps> = ({
  lessonId,
  videoUrl,
  studentId,
  onProgressUpdate,
  interactiveElements = [],
  autoPlay = false,
  showControls = true,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [quality, setQuality] = useState('auto')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInteractive, setShowInteractive] = useState<InteractiveElement | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showChapters, setShowChapters] = useState(false)
  const [analytics, setAnalytics] = useState<VideoAnalytics>({
    watchTime: 0,
    completionPercentage: 0,
    interactionEvents: [],
    qualityChanges: [],
    pausePoints: [],
    replaySegments: []
  })

  // Initialize HLS streaming
  useEffect(() => {
    if (videoRef.current && videoUrl.includes('.m3u8')) {
      // Load HLS.js dynamically
      import('hls.js').then((Hls) => {
        if (Hls.default.isSupported()) {
          const hls = new Hls.default({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
          })

          hls.loadSource(videoUrl)
          hls.attachMedia(videoRef.current!)

          hls.on(Hls.default.Events.MANIFEST_PARSED, () => {
            console.log('HLS manifest parsed, quality levels:', hls.levels)
          })

          return () => {
            hls.destroy()
          }
        }
      })
    }
  }, [videoUrl])

  // Track video progress and analytics
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      const total = video.duration
      
      setCurrentTime(current)
      setDuration(total)

      // Check for interactive elements at current time
      const activeElement = interactiveElements.find(
        element => current >= element.startTime && current <= element.endTime
      )

      if (activeElement && !showInteractive) {
        setShowInteractive(activeElement)
        video.pause()
      }

      // Update progress in database
      onProgressUpdate?.(current, total)

      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        watchTime: current,
        completionPercentage: total > 0 ? (current / total) * 100 : 0
      }))
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleVolumeChange = () => {
      setIsMuted(video.muted)
      setVolume(video.volume)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('volumechange', handleVolumeChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [interactiveElements, showInteractive, onProgressUpdate])

  // Track analytics periodically
  useEffect(() => {
    const interval = setInterval(async () => {
      if (analytics.watchTime > 0) {
        await videoStreamingService.trackVideoEngagement(lessonId, studentId, analytics)
      }
    }, 30000) // Track every 30 seconds

    return () => clearInterval(interval)
  }, [lessonId, studentId, analytics])

  const handleInteractiveComplete = useCallback((response: any) => {
    setShowInteractive(null)
    videoRef.current?.play()
    
    // Track interaction completion
    setAnalytics(prev => ({
      ...prev,
      interactionEvents: [...prev.interactionEvents, {
        type: 'interaction_completed',
        timestamp: Date.now(),
        data: { elementId: showInteractive?.id, response }
      }]
    }))
  }, [showInteractive])

  const handleQualityChange = useCallback((newQuality: string) => {
    setQuality(newQuality)
    // Implement quality switching logic for HLS
    setAnalytics(prev => ({
      ...prev,
      qualityChanges: [...prev.qualityChanges, {
        from: quality,
        to: newQuality,
        timestamp: Date.now(),
        reason: 'user_selection'
      }]
    }))
  }, [quality])

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setPlaybackSpeed(newSpeed)
    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed
    }
  }, [])

  const handleSeek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }, [])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    handleSeek(newTime)
  }, [duration, handleSeek])

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setAnalytics(prev => ({
          ...prev,
          pausePoints: [...prev.pausePoints, {
            timestamp: currentTime,
            duration: 0,
            reason: 'user_pause'
          }]
        }))
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying, currentTime])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }, [isMuted])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      videoRef.current.muted = newVolume === 0
    }
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const skipTime = useCallback((seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
    }
  }, [currentTime, duration])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    return duration > 0 ? (currentTime / duration) * 100 : 0
  }

  return (
    <div ref={containerRef} className={`relative w-full bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-auto"
        controls={false}
        preload="metadata"
        crossOrigin="anonymous"
        autoPlay={autoPlay}
      >
        <source src={videoUrl} type="application/x-mpegURL" />
        <track
          kind="subtitles"
          src={`${videoUrl.replace('.m3u8', '')}/subtitles/en.vtt`}
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>

      {/* Custom Video Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div 
            ref={progressRef}
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-4"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-200"
              style={{ width: `${getProgressPercentage()}%` }}
            />
            
            {/* Chapter Markers */}
            {interactiveElements
              .filter(el => el.type === 'chapter')
              .map(chapter => (
                <div
                  key={chapter.id}
                  className="absolute top-0 w-1 h-1 bg-white rounded-full transform -translate-y-1/2 cursor-pointer"
                  style={{ left: `${(chapter.startTime / duration) * 100}%` }}
                  onClick={() => handleSeek(chapter.startTime)}
                  title={chapter.title}
                />
              ))}
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              {/* Skip Buttons */}
              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipBack size={20} />
              </button>
              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                <SkipForward size={20} />
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Chapters */}
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="text-white hover:text-blue-400 transition-colors"
                title="Chapters"
              >
                <Bookmark size={20} />
              </button>

              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  <Settings size={20} />
                </button>

                {/* Settings Dropdown */}
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-gray-800 rounded-lg p-4 min-w-48">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-white text-sm mb-1">Playback Speed</label>
                        <select
                          value={playbackSpeed}
                          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                          className="w-full bg-gray-700 text-white rounded px-2 py-1"
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-sm mb-1">Quality</label>
                        <select
                          value={quality}
                          onChange={(e) => handleQualityChange(e.target.value)}
                          className="w-full bg-gray-700 text-white rounded px-2 py-1"
                        >
                          <option value="auto">Auto</option>
                          <option value="1080p">1080p</option>
                          <option value="720p">720p</option>
                          <option value="480p">480p</option>
                          <option value="360p">360p</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Elements Overlay */}
      {showInteractive && (
        <InteractiveElementOverlay
          element={showInteractive}
          onComplete={handleInteractiveComplete}
          onSkip={() => {
            setShowInteractive(null)
            videoRef.current?.play()
          }}
        />
      )}

      {/* Chapter Navigation */}
      {showChapters && (
        <ChapterNavigation
          chapters={interactiveElements.filter(el => el.type === 'chapter')}
          currentTime={currentTime}
          onChapterClick={handleSeek}
          onClose={() => setShowChapters(false)}
        />
      )}
    </div>
  )
}

// Interactive Element Overlay Component
const InteractiveElementOverlay: React.FC<{
  element: InteractiveElement
  onComplete: (response: any) => void
  onSkip: () => void
}> = ({ element, onComplete, onSkip }) => {
  const [response, setResponse] = useState('')

  const handleSubmit = () => {
    onComplete(response)
  }

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">{element.title}</h3>
        
        {element.type === 'quiz' && (
          <div className="space-y-3">
            <p className="text-gray-600">{element.content.question}</p>
            {element.content.options?.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => setResponse(option)}
                className={`w-full text-left p-3 rounded border ${
                  response === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {element.type === 'note' && (
          <div className="space-y-3">
            <p className="text-gray-600">{element.content.prompt}</p>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Add your note..."
              className="w-full p-3 border border-gray-200 rounded"
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

// Chapter Navigation Component
const ChapterNavigation: React.FC<{
  chapters: InteractiveElement[]
  currentTime: number
  onChapterClick: (time: number) => void
  onClose: () => void
}> = ({ chapters, currentTime, onChapterClick, onClose }) => {
  return (
    <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-4 max-w-xs w-full z-40">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-semibold">Chapters</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onChapterClick(chapter.startTime)}
            className={`w-full text-left p-2 rounded text-sm transition-colors ${
              currentTime >= chapter.startTime && currentTime <= chapter.endTime
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="font-medium">{chapter.title}</div>
            <div className="text-xs opacity-75">
              {Math.floor(chapter.startTime / 60)}:{(chapter.startTime % 60).toString().padStart(2, '0')}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdvancedVideoPlayer
