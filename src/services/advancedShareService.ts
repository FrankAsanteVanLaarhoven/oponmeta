export interface ShareableContent {
  id: string
  type: 'course' | 'lesson' | 'certificate' | 'achievement' | 'profile'
  title: string
  description: string
  shareUrl: string
  imageUrl?: string
  attachments?: File[]
  metadata?: Record<string, any>
}

export interface ShareResult {
  success: boolean
  method: 'web_share' | 'custom_modal' | 'clipboard' | 'email'
  error?: string
}

export interface ShareTarget {
  name: string
  icon: string
  action: (content: ShareableContent) => Promise<boolean>
}

export class AdvancedShareService {
  private static instance: AdvancedShareService
  private shareTargets: ShareTarget[] = []

  static getInstance(): AdvancedShareService {
    if (!AdvancedShareService.instance) {
      AdvancedShareService.instance = new AdvancedShareService()
    }
    return AdvancedShareService.instance
  }

  constructor() {
    this.initializeShareTargets()
  }

  private initializeShareTargets(): void {
    this.shareTargets = [
      {
        name: 'Email',
        icon: '📧',
        action: this.shareViaEmail.bind(this)
      },
      {
        name: 'WhatsApp',
        icon: '💬',
        action: this.shareViaWhatsApp.bind(this)
      },
      {
        name: 'LinkedIn',
        icon: '💼',
        action: this.shareViaLinkedIn.bind(this)
      },
      {
        name: 'Twitter',
        icon: '🐦',
        action: this.shareViaTwitter.bind(this)
      },
      {
        name: 'Facebook',
        icon: '📘',
        action: this.shareViaFacebook.bind(this)
      },
      {
        name: 'Copy Link',
        icon: '📋',
        action: this.shareViaClipboard.bind(this)
      }
    ]
  }

  async shareContent(content: ShareableContent): Promise<ShareResult> {
    try {
      // Try Web Share API first
      if (this.canShare(content)) {
        const result = await this.shareWithWebAPI(content)
        if (result.success) {
          this.trackShareEvent(content, 'web_share')
          return result
        }
      }

      // Fallback to custom share modal
      const result = await this.showCustomShareModal(content)
      this.trackShareEvent(content, result.method)
      return result

    } catch (error) {
      console.error('Sharing failed:', error)
      return {
        success: false,
        method: 'custom_modal',
        error: error instanceof Error ? error.message : 'Sharing failed'
      }
    }
  }

  private canShare(content: ShareableContent): boolean {
    return (
      'navigator' in window && 
      'share' in navigator && 
      navigator.canShare && 
      navigator.canShare({
        title: content.title,
        text: content.description,
        url: content.shareUrl,
        files: content.attachments
      })
    )
  }

  private async shareWithWebAPI(content: ShareableContent): Promise<ShareResult> {
    try {
      const shareData: ShareData = {
        title: content.title,
        text: content.description,
        url: content.shareUrl
      }

      // Add files if supported and available
      if (content.attachments && content.attachments.length > 0 && navigator.canShare({ files: content.attachments })) {
        shareData.files = content.attachments
      }

      await navigator.share(shareData)
      
      return {
        success: true,
        method: 'web_share'
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled sharing
        return {
          success: false,
          method: 'web_share',
          error: 'User cancelled sharing'
        }
      }
      throw error
    }
  }

  private async showCustomShareModal(content: ShareableContent): Promise<ShareResult> {
    return new Promise((resolve) => {
      // Create custom share modal
      const modal = this.createShareModal(content, (method: string, success: boolean) => {
        resolve({
          success,
          method: method as any
        })
        modal.remove()
      })

      document.body.appendChild(modal)
    })
  }

  private createShareModal(
    content: ShareableContent, 
    onShare: (method: string, success: boolean) => void
  ): HTMLElement {
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Share ${content.title}</h3>
          <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <p class="text-gray-600 text-sm">${content.description}</p>
        </div>
        
        <div class="grid grid-cols-3 gap-3">
          ${this.shareTargets.map(target => `
            <button 
              class="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              data-target="${target.name}"
            >
              <span class="text-2xl mb-1">${target.icon}</span>
              <span class="text-xs text-gray-600">${target.name}</span>
            </button>
          `).join('')}
        </div>
        
        <div class="mt-4 flex justify-end space-x-2">
          <button 
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
            onclick="this.closest('.fixed').remove()"
          >
            Cancel
          </button>
        </div>
      </div>
    `

    // Add event listeners
    modal.addEventListener('click', async (e) => {
      const target = (e.target as HTMLElement).closest('[data-target]')
      if (target) {
        const targetName = target.getAttribute('data-target')
        const shareTarget = this.shareTargets.find(t => t.name === targetName)
        
        if (shareTarget) {
          try {
            const success = await shareTarget.action(content)
            onShare(targetName.toLowerCase().replace(' ', '_'), success)
          } catch (error) {
            onShare(targetName.toLowerCase().replace(' ', '_'), false)
          }
        }
      }
    })

    return modal
  }

  // Share target implementations
  private async shareViaEmail(content: ShareableContent): Promise<boolean> {
    const subject = encodeURIComponent(`Check out: ${content.title}`)
    const body = encodeURIComponent(`${content.description}\n\n${content.shareUrl}`)
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    
    window.open(mailtoUrl, '_blank')
    return true
  }

  private async shareViaWhatsApp(content: ShareableContent): Promise<boolean> {
    const text = encodeURIComponent(`${content.title}\n\n${content.description}\n\n${content.shareUrl}`)
    const whatsappUrl = `https://wa.me/?text=${text}`
    
    window.open(whatsappUrl, '_blank')
    return true
  }

  private async shareViaLinkedIn(content: ShareableContent): Promise<boolean> {
    const url = encodeURIComponent(content.shareUrl)
    const title = encodeURIComponent(content.title)
    const summary = encodeURIComponent(content.description)
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`
    
    window.open(linkedinUrl, '_blank')
    return true
  }

  private async shareViaTwitter(content: ShareableContent): Promise<boolean> {
    const text = encodeURIComponent(`${content.title} - ${content.shareUrl}`)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`
    
    window.open(twitterUrl, '_blank')
    return true
  }

  private async shareViaFacebook(content: ShareableContent): Promise<boolean> {
    const url = encodeURIComponent(content.shareUrl)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    
    window.open(facebookUrl, '_blank')
    return true
  }

  private async shareViaClipboard(content: ShareableContent): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(content.shareUrl)
        this.showToast('Link copied to clipboard!')
        return true
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = content.shareUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.showToast('Link copied to clipboard!')
        return true
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
      return false
    }
  }

  // Specialized sharing methods
  async shareCourse(courseId: string, userId: string): Promise<ShareResult> {
    try {
      const course = await this.fetchCourseDetails(courseId)
      
      const content: ShareableContent = {
        id: courseId,
        type: 'course',
        title: course.title,
        description: course.description,
        shareUrl: `${window.location.origin}/course/${courseId}`,
        imageUrl: course.thumbnailUrl,
        metadata: {
          courseId,
          instructorId: course.instructorId,
          price: course.price,
          rating: course.rating
        }
      }

      return await this.shareContent(content)
    } catch (error) {
      return {
        success: false,
        method: 'custom_modal',
        error: 'Failed to fetch course details'
      }
    }
  }

  async shareCertificate(certificateId: string, userId: string): Promise<ShareResult> {
    try {
      const certificate = await this.fetchCertificateDetails(certificateId)
      
      const content: ShareableContent = {
        id: certificateId,
        type: 'certificate',
        title: `Certificate: ${certificate.courseTitle}`,
        description: `I just earned a certificate in ${certificate.courseTitle}! Check out my achievement.`,
        shareUrl: `${window.location.origin}/certificate/${certificateId}`,
        imageUrl: certificate.imageUrl,
        metadata: {
          certificateId,
          courseId: certificate.courseId,
          earnedDate: certificate.earnedDate,
          issuer: certificate.issuer
        }
      }

      return await this.shareContent(content)
    } catch (error) {
      return {
        success: false,
        method: 'custom_modal',
        error: 'Failed to fetch certificate details'
      }
    }
  }

  async shareAchievement(achievementId: string, userId: string): Promise<ShareResult> {
    try {
      const achievement = await this.fetchAchievementDetails(achievementId)
      
      const content: ShareableContent = {
        id: achievementId,
        type: 'achievement',
        title: `Achievement Unlocked: ${achievement.title}`,
        description: achievement.description,
        shareUrl: `${window.location.origin}/achievement/${achievementId}`,
        imageUrl: achievement.badgeUrl,
        metadata: {
          achievementId,
          points: achievement.points,
          category: achievement.category
        }
      }

      return await this.shareContent(content)
    } catch (error) {
      return {
        success: false,
        method: 'custom_modal',
        error: 'Failed to fetch achievement details'
      }
    }
  }

  // API methods
  private async fetchCourseDetails(courseId: string): Promise<any> {
    const response = await fetch(`/api/courses/${courseId}`)
    if (!response.ok) {
      throw new Error('Course not found')
    }
    return response.json()
  }

  private async fetchCertificateDetails(certificateId: string): Promise<any> {
    const response = await fetch(`/api/certificates/${certificateId}`)
    if (!response.ok) {
      throw new Error('Certificate not found')
    }
    return response.json()
  }

  private async fetchAchievementDetails(achievementId: string): Promise<any> {
    const response = await fetch(`/api/achievements/${achievementId}`)
    if (!response.ok) {
      throw new Error('Achievement not found')
    }
    return response.json()
  }

  // Analytics and tracking
  private trackShareEvent(content: ShareableContent, method: string): void {
    if (window.gtag) {
      window.gtag('event', 'share', {
        content_type: content.type,
        content_id: content.id,
        method: method,
        share_url: content.shareUrl
      })
    }

    // Send to custom analytics
    this.sendToAnalytics({
      event: 'content_shared',
      content_type: content.type,
      content_id: content.id,
      method: method,
      timestamp: Date.now()
    })
  }

  private async sendToAnalytics(data: any): Promise<void> {
    try {
      await fetch('/api/analytics/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      console.warn('Failed to send share analytics:', error)
    }
  }

  private showToast(message: string): void {
    // Simple toast notification
    const toast = document.createElement('div')
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.remove()
    }, 3000)
  }

  // Utility methods
  isWebShareSupported(): boolean {
    return 'navigator' in window && 'share' in navigator
  }

  getShareTargets(): ShareTarget[] {
    return this.shareTargets
  }

  async registerShareTarget(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready
        await registration.register('/share-handler.js')
      } catch (error) {
        console.error('Failed to register share target:', error)
      }
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const advancedShareService = AdvancedShareService.getInstance()
