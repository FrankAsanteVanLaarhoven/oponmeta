export interface UserLearningProfile {
  userId: string
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  pace: 'slow' | 'medium' | 'fast'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  interests: string[]
  goals: string[]
  timeConstraints: {
    availableHours: number
    preferredTimes: string[]
    timezone: string
  }
  skills: {
    current: string[]
    target: string[]
    gaps: string[]
  }
  preferences: {
    videoLength: number
    interactiveContent: boolean
    groupLearning: boolean
    certification: boolean
  }
  behavior: {
    completionRate: number
    averageSessionTime: number
    preferredContentTypes: string[]
    engagementScore: number
  }
}

export interface LearningPath {
  id: string
  userId: string
  title: string
  description: string
  courses: RecommendedCourse[]
  estimatedCompletionTime: number
  skillsToAcquire: string[]
  difficulty: string
  prerequisites: string[]
  milestones: LearningMilestone[]
  personalizedFor: UserLearningProfile
}

export interface RecommendedCourse {
  id: string
  title: string
  description: string
  instructor: string
  rating: number
  duration: number
  difficulty: string
  relevanceScore: number
  reason: string
  prerequisites: string[]
  skills: string[]
  contentType: string[]
}

export interface LearningMilestone {
  id: string
  title: string
  description: string
  courses: string[]
  skills: string[]
  estimatedTime: number
  completed: boolean
  completionDate?: Date
}

export interface ContentRecommendation {
  type: 'course' | 'lesson' | 'resource' | 'quiz' | 'project'
  id: string
  title: string
  relevanceScore: number
  reason: string
  difficulty: string
  estimatedTime: number
}

export interface AdaptiveContent {
  courseId: string
  lessonId: string
  originalContent: any
  adaptedContent: any
  adaptations: {
    difficulty: 'increased' | 'decreased' | 'maintained'
    format: 'video' | 'text' | 'interactive' | 'audio'
    length: 'shortened' | 'extended' | 'maintained'
    examples: 'added' | 'removed' | 'modified'
  }
  reasoning: string
}

export class AILearningEngine {
  private static instance: AILearningEngine
  private userProfiles: Map<string, UserLearningProfile> = new Map()
  private learningPaths: Map<string, LearningPath[]> = new Map()

  static getInstance(): AILearningEngine {
    if (!AILearningEngine.instance) {
      AILearningEngine.instance = new AILearningEngine()
    }
    return AILearningEngine.instance
  }

  async initialize(): Promise<void> {
    await this.loadUserProfiles()
    this.setupBehaviorTracking()
  }

  async generatePersonalizedPath(userId: string): Promise<LearningPath> {
    try {
      const userProfile = await this.getUserLearningProfile(userId)
      const skillsGap = await this.analyzeSkillsGap(userProfile)
      const availableCourses = await this.getAvailableCourses()
      
      // Use AI to recommend optimal learning sequence
      const recommendations = await this.callAIService('/api/ai/recommend-path', {
        profile: userProfile,
        skillsGap,
        availableCourses,
        preferences: userProfile.preferences,
        timeConstraints: userProfile.timeConstraints
      })

      const learningPath: LearningPath = {
        id: `path_${userId}_${Date.now()}`,
        userId,
        title: `Personalized Learning Path for ${userProfile.skills.target.join(', ')}`,
        description: `A customized learning journey designed for your goals and learning style`,
        courses: recommendations.courses,
        estimatedCompletionTime: recommendations.timeToComplete,
        skillsToAcquire: recommendations.targetSkills,
        difficulty: recommendations.difficultyProgression,
        prerequisites: recommendations.prerequisites,
        milestones: this.generateMilestones(recommendations.courses),
        personalizedFor: userProfile
      }

      // Store learning path
      await this.storeLearningPath(learningPath)
      
      // Track analytics
      this.trackLearningPathGenerated(userId, learningPath)

      return learningPath
    } catch (error) {
      console.error('Failed to generate personalized path:', error)
      throw error
    }
  }

  async adaptContentDifficulty(
    courseId: string, 
    lessonId: string, 
    userProgress: any
  ): Promise<AdaptiveContent> {
    try {
      const userProfile = await this.getUserLearningProfile(userProgress.userId)
      const performanceMetrics = this.analyzeUserPerformance(userProgress)
      const originalContent = await this.getCourseContent(courseId, lessonId)

      // Determine adaptation strategy
      const adaptationStrategy = this.determineAdaptationStrategy(
        performanceMetrics, 
        userProfile
      )

      // Generate adapted content
      const adaptedContent = await this.generateAdaptedContent(
        originalContent, 
        adaptationStrategy
      )

      const adaptiveContent: AdaptiveContent = {
        courseId,
        lessonId,
        originalContent,
        adaptedContent,
        adaptations: adaptationStrategy.adaptations,
        reasoning: adaptationStrategy.reasoning
      }

      // Store adaptation for future reference
      await this.storeContentAdaptation(adaptiveContent)

      return adaptiveContent
    } catch (error) {
      console.error('Failed to adapt content difficulty:', error)
      throw error
    }
  }

  async getContentRecommendations(userId: string, context?: any): Promise<ContentRecommendation[]> {
    try {
      const userProfile = await this.getUserLearningProfile(userId)
      const currentProgress = await this.getUserProgress(userId)
      const availableContent = await this.getAvailableContent()

      // Use AI to generate recommendations
      const recommendations = await this.callAIService('/api/ai/recommend-content', {
        profile: userProfile,
        progress: currentProgress,
        availableContent,
        context
      })

      return recommendations.map((rec: any) => ({
        type: rec.type,
        id: rec.id,
        title: rec.title,
        relevanceScore: rec.relevanceScore,
        reason: rec.reason,
        difficulty: rec.difficulty,
        estimatedTime: rec.estimatedTime
      }))
    } catch (error) {
      console.error('Failed to get content recommendations:', error)
      return []
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserLearningProfile>): Promise<void> {
    try {
      const currentProfile = await this.getUserLearningProfile(userId)
      const updatedProfile = { ...currentProfile, ...updates }
      
      this.userProfiles.set(userId, updatedProfile)
      await this.storeUserProfile(updatedProfile)

      // Regenerate learning path if significant changes
      if (this.shouldRegeneratePath(updates)) {
        await this.generatePersonalizedPath(userId)
      }
    } catch (error) {
      console.error('Failed to update user profile:', error)
    }
  }

  async trackLearningBehavior(userId: string, behavior: any): Promise<void> {
    try {
      const profile = await this.getUserLearningProfile(userId)
      
      // Update behavior metrics
      profile.behavior = {
        ...profile.behavior,
        ...behavior
      }

      // Update learning style based on behavior
      profile.learningStyle = this.inferLearningStyle(behavior)
      
      await this.updateUserProfile(userId, profile)
    } catch (error) {
      console.error('Failed to track learning behavior:', error)
    }
  }

  async predictLearningOutcome(userId: string, courseId: string): Promise<{
    completionProbability: number
    estimatedTime: number
    successFactors: string[]
    riskFactors: string[]
  }> {
    try {
      const userProfile = await this.getUserLearningProfile(userId)
      const course = await this.getCourseDetails(courseId)
      const historicalData = await this.getHistoricalData(userId)

      const prediction = await this.callAIService('/api/ai/predict-outcome', {
        profile: userProfile,
        course,
        historicalData
      })

      return {
        completionProbability: prediction.completionProbability,
        estimatedTime: prediction.estimatedTime,
        successFactors: prediction.successFactors,
        riskFactors: prediction.riskFactors
      }
    } catch (error) {
      console.error('Failed to predict learning outcome:', error)
      return {
        completionProbability: 0.5,
        estimatedTime: 0,
        successFactors: [],
        riskFactors: ['Unable to generate prediction']
      }
    }
  }

  // Private methods
  private async getUserLearningProfile(userId: string): Promise<UserLearningProfile> {
    if (this.userProfiles.has(userId)) {
      return this.userProfiles.get(userId)!
    }

    try {
      const response = await fetch(`/api/users/${userId}/learning-profile`)
      if (response.ok) {
        const profile = await response.json()
        this.userProfiles.set(userId, profile)
        return profile
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }

    // Return default profile
    return this.createDefaultProfile(userId)
  }

  private createDefaultProfile(userId: string): UserLearningProfile {
    return {
      userId,
      learningStyle: 'visual',
      pace: 'medium',
      difficulty: 'beginner',
      interests: [],
      goals: [],
      timeConstraints: {
        availableHours: 5,
        preferredTimes: ['morning', 'evening'],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      skills: {
        current: [],
        target: [],
        gaps: []
      },
      preferences: {
        videoLength: 10,
        interactiveContent: true,
        groupLearning: false,
        certification: true
      },
      behavior: {
        completionRate: 0,
        averageSessionTime: 0,
        preferredContentTypes: [],
        engagementScore: 0
      }
    }
  }

  private async analyzeSkillsGap(profile: UserLearningProfile): Promise<string[]> {
    const currentSkills = new Set(profile.skills.current)
    const targetSkills = new Set(profile.skills.target)
    
    return Array.from(targetSkills).filter(skill => !currentSkills.has(skill))
  }

  private async getAvailableCourses(): Promise<any[]> {
    try {
      const response = await fetch('/api/courses')
      if (response.ok) {
        return response.json()
      }
    } catch (error) {
      console.error('Failed to fetch available courses:', error)
    }
    return []
  }

  private async callAIService(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        throw new Error(`AI service error: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('AI service call failed:', error)
      // Return fallback recommendations
      return this.getFallbackRecommendations(data)
    }
  }

  private getFallbackRecommendations(data: any): any {
    // Simple fallback logic when AI service is unavailable
    return {
      courses: [],
      timeToComplete: 0,
      targetSkills: data.profile?.skills?.target || [],
      difficultyProgression: 'beginner',
      prerequisites: []
    }
  }

  private generateMilestones(courses: RecommendedCourse[]): LearningMilestone[] {
    const milestones: LearningMilestone[] = []
    const coursesPerMilestone = Math.ceil(courses.length / 4)

    for (let i = 0; i < courses.length; i += coursesPerMilestone) {
      const milestoneCourses = courses.slice(i, i + coursesPerMilestone)
      milestones.push({
        id: `milestone_${i / coursesPerMilestone + 1}`,
        title: `Milestone ${Math.floor(i / coursesPerMilestone) + 1}`,
        description: `Complete ${milestoneCourses.length} courses`,
        courses: milestoneCourses.map(c => c.id),
        skills: milestoneCourses.flatMap(c => c.skills),
        estimatedTime: milestoneCourses.reduce((sum, c) => sum + c.duration, 0),
        completed: false
      })
    }

    return milestones
  }

  private analyzeUserPerformance(userProgress: any): any {
    return {
      averageScore: userProgress.averageScore || 0,
      completionRate: userProgress.completionRate || 0,
      timeSpent: userProgress.timeSpent || 0,
      strugglingAreas: userProgress.strugglingAreas || [],
      strongAreas: userProgress.strongAreas || []
    }
  }

  private determineAdaptationStrategy(performanceMetrics: any, userProfile: UserLearningProfile): any {
    const { averageScore, strugglingAreas } = performanceMetrics

    if (averageScore < 0.6 || strugglingAreas.length > 0) {
      return {
        adaptations: {
          difficulty: 'decreased',
          format: 'interactive',
          length: 'shortened',
          examples: 'added'
        },
        reasoning: 'User is struggling with current content, providing easier alternatives'
      }
    } else if (averageScore > 0.85) {
      return {
        adaptations: {
          difficulty: 'increased',
          format: 'text',
          length: 'extended',
          examples: 'removed'
        },
        reasoning: 'User is excelling, providing more challenging content'
      }
    }

    return {
      adaptations: {
        difficulty: 'maintained',
        format: 'video',
        length: 'maintained',
        examples: 'modified'
      },
      reasoning: 'Content is appropriately challenging'
    }
  }

  private async generateAdaptedContent(originalContent: any, strategy: any): Promise<any> {
    // This would integrate with your content generation AI
    return {
      ...originalContent,
      adapted: true,
      strategy: strategy.adaptations
    }
  }

  private inferLearningStyle(behavior: any): 'visual' | 'auditory' | 'kinesthetic' | 'reading' {
    // Simple heuristic based on behavior
    if (behavior.preferredContentTypes?.includes('video')) return 'visual'
    if (behavior.preferredContentTypes?.includes('audio')) return 'auditory'
    if (behavior.preferredContentTypes?.includes('interactive')) return 'kinesthetic'
    return 'reading'
  }

  private shouldRegeneratePath(updates: Partial<UserLearningProfile>): boolean {
    const significantFields = ['goals', 'skills', 'preferences', 'timeConstraints']
    return significantFields.some(field => updates[field as keyof UserLearningProfile] !== undefined)
  }

  private setupBehaviorTracking(): void {
    // Track user interactions for learning behavior analysis
    document.addEventListener('click', (event) => {
      this.trackInteraction('click', event.target)
    })

    document.addEventListener('scroll', (event) => {
      this.trackInteraction('scroll', event.target)
    })

    // Track time spent on different content types
    this.trackTimeSpent()
  }

  private trackInteraction(type: string, target: any): void {
    // Send interaction data to analytics
    if (window.gtag) {
      window.gtag('event', 'learning_interaction', {
        interaction_type: type,
        content_type: this.getContentType(target),
        timestamp: Date.now()
      })
    }
  }

  private getContentType(target: any): string {
    // Determine content type from DOM element
    if (target?.closest('.video-player')) return 'video'
    if (target?.closest('.quiz-container')) return 'quiz'
    if (target?.closest('.text-content')) return 'text'
    if (target?.closest('.interactive-content')) return 'interactive'
    return 'unknown'
  }

  private trackTimeSpent(): void {
    let startTime = Date.now()
    let currentContentType = 'unknown'

    setInterval(() => {
      const timeSpent = Date.now() - startTime
      if (timeSpent > 5000) { // Track after 5 seconds
        this.trackTimeSpentOnContent(currentContentType, timeSpent)
        startTime = Date.now()
      }
    }, 5000)
  }

  private trackTimeSpentOnContent(contentType: string, timeSpent: number): void {
    // Track time spent for learning behavior analysis
    console.log(`Time spent on ${contentType}: ${timeSpent}ms`)
  }

  // Storage methods
  private async storeLearningPath(path: LearningPath): Promise<void> {
    try {
      await fetch('/api/learning-paths', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(path)
      })
    } catch (error) {
      console.error('Failed to store learning path:', error)
    }
  }

  private async storeUserProfile(profile: UserLearningProfile): Promise<void> {
    try {
      await fetch(`/api/users/${profile.userId}/learning-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      })
    } catch (error) {
      console.error('Failed to store user profile:', error)
    }
  }

  private async storeContentAdaptation(adaptation: AdaptiveContent): Promise<void> {
    try {
      await fetch('/api/content-adaptations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adaptation)
      })
    } catch (error) {
      console.error('Failed to store content adaptation:', error)
    }
  }

  private async loadUserProfiles(): Promise<void> {
    // Load cached user profiles
    try {
      const profiles = localStorage.getItem('oponm-user-profiles')
      if (profiles) {
        const parsedProfiles = JSON.parse(profiles)
        Object.entries(parsedProfiles).forEach(([userId, profile]) => {
          this.userProfiles.set(userId, profile as UserLearningProfile)
        })
      }
    } catch (error) {
      console.error('Failed to load user profiles:', error)
    }
  }

  private getAuthToken(): string {
    return localStorage.getItem('auth-token') || ''
  }

  private trackLearningPathGenerated(userId: string, path: LearningPath): void {
    if (window.gtag) {
      window.gtag('event', 'learning_path_generated', {
        user_id: userId,
        path_id: path.id,
        courses_count: path.courses.length,
        estimated_time: path.estimatedCompletionTime
      })
    }
  }

  // Utility methods
  async getCourseDetails(courseId: string): Promise<any> {
    const response = await fetch(`/api/courses/${courseId}`)
    return response.json()
  }

  async getUserProgress(userId: string): Promise<any> {
    const response = await fetch(`/api/users/${userId}/progress`)
    return response.json()
  }

  async getAvailableContent(): Promise<any[]> {
    const response = await fetch('/api/content')
    return response.json()
  }

  async getHistoricalData(userId: string): Promise<any> {
    const response = await fetch(`/api/users/${userId}/history`)
    return response.json()
  }

  async getCourseContent(courseId: string, lessonId: string): Promise<any> {
    const response = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`)
    return response.json()
  }
}

// Global type declarations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const aiLearningEngine = AILearningEngine.getInstance()
