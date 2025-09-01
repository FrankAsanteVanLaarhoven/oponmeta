import { User } from './userService';
import { Course } from '../types/course';

// Enhanced AI/ML Recommendation Engine for Enterprise LMS

export interface UserBehavior {
  userId: string;
  action: 'view' | 'enroll' | 'complete' | 'pause' | 'drop' | 'rate' | 'review' | 'share';
  resourceType: 'course' | 'lesson' | 'quiz' | 'video' | 'document' | 'companion';
  resourceId: string;
  timestamp: Date;
  duration?: number; // Time spent in seconds
  score?: number; // For quizzes/assessments
  rating?: number; // For ratings
  context?: Record<string, any>; // Additional context
}

export interface UserProfile {
  userId: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  preferredPace: 'slow' | 'moderate' | 'fast';
  expertiseLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  skills: string[];
  goals: string[];
  timeAvailability: number; // Hours per week
  preferredLanguage: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
  lastUpdated: Date;
}

export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  courses: string[]; // Course IDs in order
  estimatedDuration: number; // Hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number; // 0-100
  currentCourseIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentRecommendation {
  id: string;
  userId: string;
  resourceType: 'course' | 'lesson' | 'video' | 'document' | 'companion';
  resourceId: string;
  score: number; // 0-1 confidence score
  reason: string;
  category: 'personalized' | 'trending' | 'completion' | 'skill_gap' | 'collaborative';
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface SkillGapAnalysis {
  userId: string;
  targetRole: string;
  currentSkills: { skill: string; level: number; }[];
  requiredSkills: { skill: string; level: number; }[];
  gaps: { skill: string; currentLevel: number; requiredLevel: number; gap: number; }[];
  recommendedCourses: string[];
  estimatedTimeToClose: number; // Hours
  priority: 'high' | 'medium' | 'low';
}

export interface AdaptiveLearningConfig {
  userId: string;
  difficultyAdjustment: 'auto' | 'manual';
  paceAdjustment: 'auto' | 'manual';
  contentAdaptation: 'auto' | 'manual';
  assessmentFrequency: 'low' | 'medium' | 'high';
  feedbackStyle: 'detailed' | 'summary' | 'minimal';
  learningObjectives: string[];
  constraints: {
    maxTimePerSession: number;
    preferredSessionLength: number;
    breakFrequency: number;
  };
}

export class EnhancedAIRecommendationService {
  private userProfiles: Map<string, UserProfile> = new Map();
  private userBehaviors: UserBehavior[] = [];
  private learningPaths: Map<string, LearningPath[]> = new Map();
  private recommendations: Map<string, ContentRecommendation[]> = new Map();
  private skillGaps: Map<string, SkillGapAnalysis[]> = new Map();
  private adaptiveConfigs: Map<string, AdaptiveLearningConfig> = new Map();

  // User Profile Management
  async createUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    const defaultProfile: UserProfile = {
      userId,
      learningStyle: 'visual',
      preferredPace: 'moderate',
      expertiseLevel: 'beginner',
      interests: [],
      skills: [],
      goals: [],
      timeAvailability: 5,
      preferredLanguage: 'en',
      deviceType: 'desktop',
      lastUpdated: new Date(),
      ...profile
    };

    this.userProfiles.set(userId, defaultProfile);
    return defaultProfile;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    const updatedProfile = { ...profile, ...updates, lastUpdated: new Date() };
    this.userProfiles.set(userId, updatedProfile);
    return updatedProfile;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    return this.userProfiles.get(userId) || null;
  }

  // Behavior Tracking
  async trackUserBehavior(behavior: UserBehavior): Promise<void> {
    this.userBehaviors.push(behavior);
    
    // Update user profile based on behavior
    await this.updateProfileFromBehavior(behavior);
    
    // Generate new recommendations
    await this.generateRecommendations(behavior.userId);
  }

  private async updateProfileFromBehavior(behavior: UserBehavior): Promise<void> {
    const profile = await this.getUserProfile(behavior.userId);
    if (!profile) return;

    const updates: Partial<UserProfile> = {};

    // Update learning style based on content interaction
    if (behavior.resourceType === 'video' && behavior.duration && behavior.duration > 300) {
      updates.learningStyle = 'visual';
    } else if (behavior.resourceType === 'document' && behavior.duration && behavior.duration > 600) {
      updates.learningStyle = 'reading';
    }

    // Update pace based on completion speed
    if (behavior.action === 'complete' && behavior.duration) {
      const avgDuration = this.getAverageCompletionTime(behavior.resourceType);
      if (behavior.duration < avgDuration * 0.7) {
        updates.preferredPace = 'fast';
      } else if (behavior.duration > avgDuration * 1.3) {
        updates.preferredPace = 'slow';
      }
    }

    // Update interests based on interactions
    if (behavior.action === 'enroll' || behavior.action === 'view') {
      const course = await this.getCourseById(behavior.resourceId);
      if (course && !profile.interests.includes(course.category)) {
        updates.interests = [...profile.interests, course.category];
      }
    }

    if (Object.keys(updates).length > 0) {
      await this.updateUserProfile(behavior.userId, updates);
    }
  }

  // Recommendation Generation
  async generateRecommendations(userId: string): Promise<ContentRecommendation[]> {
    const profile = await this.getUserProfile(userId);
    if (!profile) return [];

    const recommendations: ContentRecommendation[] = [];

    // 1. Personalized recommendations based on user profile
    const personalizedRecs = await this.generatePersonalizedRecommendations(userId, profile);
    recommendations.push(...personalizedRecs);

    // 2. Skill gap-based recommendations
    const skillGapRecs = await this.generateSkillGapRecommendations(userId);
    recommendations.push(...skillGapRecs);

    // 3. Collaborative filtering recommendations
    const collaborativeRecs = await this.generateCollaborativeRecommendations(userId);
    recommendations.push(...collaborativeRecs);

    // 4. Trending content recommendations
    const trendingRecs = await this.generateTrendingRecommendations(userId);
    recommendations.push(...trendingRecs);

    // Sort by score and remove duplicates
    const uniqueRecs = this.deduplicateRecommendations(recommendations);
    const sortedRecs = uniqueRecs.sort((a, b) => b.score - a.score);

    // Store recommendations
    this.recommendations.set(userId, sortedRecs);

    return sortedRecs;
  }

  private async generatePersonalizedRecommendations(userId: string, profile: UserProfile): Promise<ContentRecommendation[]> {
    const recommendations: ContentRecommendation[] = [];
    const userBehaviors = this.getUserBehaviors(userId);

    // Get courses matching user interests and learning style
    const courses = await this.getAllCourses();
    const matchingCourses = courses.filter(course => {
      const matchesInterest = profile.interests.includes(course.category);
      const matchesLevel = this.matchesExpertiseLevel(course.level, profile.expertiseLevel);
      const matchesPace = this.matchesPace(course.duration, profile.preferredPace);
      
      return matchesInterest && matchesLevel && matchesPace;
    });

    // Score courses based on user preferences
    for (const course of matchingCourses.slice(0, 10)) {
      const score = this.calculatePersonalizedScore(course, profile, userBehaviors);
      recommendations.push({
        id: this.generateId(),
        userId,
        resourceType: 'course',
        resourceId: course.id.toString(),
        score,
        reason: `Matches your interests in ${course.category} and learning style`,
        category: 'personalized',
        metadata: { course },
        createdAt: new Date()
      });
    }

    return recommendations;
  }

  private async generateSkillGapRecommendations(userId: string): Promise<ContentRecommendation[]> {
    const skillGaps = await this.analyzeSkillGaps(userId);
    const recommendations: ContentRecommendation[] = [];

    for (const gap of skillGaps) {
      for (const courseId of gap.recommendedCourses.slice(0, 3)) {
        const course = await this.getCourseById(courseId);
        if (course) {
          recommendations.push({
            id: this.generateId(),
            userId,
            resourceType: 'course',
            resourceId: courseId,
            score: 0.8,
            reason: `Helps close skill gap in ${gap.targetRole}`,
            category: 'skill_gap',
            metadata: { skillGap: gap },
            createdAt: new Date()
          });
        }
      }
    }

    return recommendations;
  }

  private async generateCollaborativeRecommendations(userId: string): Promise<ContentRecommendation[]> {
    const recommendations: ContentRecommendation[] = [];
    
    // Find similar users
    const similarUsers = this.findSimilarUsers(userId);
    
    // Get courses that similar users enjoyed
    for (const similarUserId of similarUsers.slice(0, 5)) {
      const similarUserBehaviors = this.getUserBehaviors(similarUserId);
      const positiveInteractions = similarUserBehaviors.filter(
        b => b.action === 'complete' || b.action === 'rate' && b.rating && b.rating >= 4
      );

      for (const interaction of positiveInteractions.slice(0, 3)) {
        const course = await this.getCourseById(interaction.resourceId);
        if (course) {
          recommendations.push({
            id: this.generateId(),
            userId,
            resourceType: 'course',
            resourceId: interaction.resourceId,
            score: 0.7,
            reason: `Similar learners enjoyed this course`,
            category: 'collaborative',
            metadata: { similarUser: similarUserId, interaction },
            createdAt: new Date()
          });
        }
      }
    }

    return recommendations;
  }

  private async generateTrendingRecommendations(userId: string): Promise<ContentRecommendation[]> {
    const recommendations: ContentRecommendation[] = [];
    
    // Get trending courses (most enrolled in last 30 days)
    const trendingCourses = await this.getTrendingCourses();
    
    for (const course of trendingCourses.slice(0, 5)) {
      recommendations.push({
        id: this.generateId(),
        userId,
        resourceType: 'course',
        resourceId: course.id.toString(),
        score: 0.6,
        reason: 'Trending course with high enrollment',
        category: 'trending',
        metadata: { course },
        createdAt: new Date()
      });
    }

    return recommendations;
  }

  // Learning Path Generation
  async generateLearningPath(userId: string, goal: string): Promise<LearningPath> {
    const profile = await this.getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    // Analyze skill gaps for the goal
    const skillGaps = await this.analyzeSkillGaps(userId, goal);
    
    // Generate course sequence
    const courseSequence = await this.generateCourseSequence(skillGaps, profile);
    
    const learningPath: LearningPath = {
      id: this.generateId(),
      userId,
      title: `Path to ${goal}`,
      description: `Personalized learning path to achieve ${goal}`,
      courses: courseSequence,
      estimatedDuration: this.calculatePathDuration(courseSequence),
      difficulty: this.calculatePathDifficulty(courseSequence),
      progress: 0,
      currentCourseIndex: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store learning path
    const userPaths = this.learningPaths.get(userId) || [];
    userPaths.push(learningPath);
    this.learningPaths.set(userId, userPaths);

    return learningPath;
  }

  // Skill Gap Analysis
  async analyzeSkillGaps(userId: string, targetRole?: string): Promise<SkillGapAnalysis[]> {
    const profile = await this.getUserProfile(userId);
    if (!profile) return [];

    const analyses: SkillGapAnalysis[] = [];

    // Define target roles and their required skills
    const roleSkills = this.getRoleSkills();
    
    for (const [role, requiredSkills] of Object.entries(roleSkills)) {
      if (targetRole && role !== targetRole) continue;

      const currentSkills = profile.skills.map(skill => ({
        skill,
        level: this.assessSkillLevel(userId, skill)
      }));

      const gaps = requiredSkills.map(required => {
        const current = currentSkills.find(cs => cs.skill === required.skill);
        const currentLevel = current ? current.level : 0;
        const gap = Math.max(0, required.level - currentLevel);

        return {
          skill: required.skill,
          currentLevel,
          requiredLevel: required.level,
          gap
        };
      }).filter(gap => gap.gap > 0);

      if (gaps.length > 0) {
        const recommendedCourses = await this.findCoursesForSkills(gaps.map(g => g.skill));
        
        analyses.push({
          userId,
          targetRole: role,
          currentSkills,
          requiredSkills,
          gaps,
          recommendedCourses,
          estimatedTimeToClose: this.estimateTimeToCloseGaps(gaps),
          priority: this.calculatePriority(gaps)
        });
      }
    }

    this.skillGaps.set(userId, analyses);
    return analyses;
  }

  // Adaptive Learning Configuration
  async configureAdaptiveLearning(userId: string, config: Partial<AdaptiveLearningConfig>): Promise<AdaptiveLearningConfig> {
    const defaultConfig: AdaptiveLearningConfig = {
      userId,
      difficultyAdjustment: 'auto',
      paceAdjustment: 'auto',
      contentAdaptation: 'auto',
      assessmentFrequency: 'medium',
      feedbackStyle: 'detailed',
      learningObjectives: [],
      constraints: {
        maxTimePerSession: 60,
        preferredSessionLength: 30,
        breakFrequency: 15
      },
      ...config
    };

    this.adaptiveConfigs.set(userId, defaultConfig);
    return defaultConfig;
  }

  // Helper Methods
  private getUserBehaviors(userId: string): UserBehavior[] {
    return this.userBehaviors.filter(b => b.userId === userId);
  }

  private findSimilarUsers(userId: string): string[] {
    const userBehaviors = this.getUserBehaviors(userId);
    const userInterests = this.extractUserInterests(userBehaviors);
    
    const similarUsers: { userId: string; similarity: number }[] = [];
    
    for (const behavior of this.userBehaviors) {
      if (behavior.userId === userId) continue;
      
      const otherUserBehaviors = this.getUserBehaviors(behavior.userId);
      const otherUserInterests = this.extractUserInterests(otherUserBehaviors);
      
      const similarity = this.calculateSimilarity(userInterests, otherUserInterests);
      similarUsers.push({ userId: behavior.userId, similarity });
    }

    return similarUsers
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 10)
      .map(u => u.userId);
  }

  private extractUserInterests(behaviors: UserBehavior[]): string[] {
    const interests = new Set<string>();
    for (const behavior of behaviors) {
      if (behavior.action === 'enroll' || behavior.action === 'view') {
        // Extract category from course
        interests.add(behavior.resourceType);
      }
    }
    return Array.from(interests);
  }

  private calculateSimilarity(interests1: string[], interests2: string[]): number {
    const intersection = interests1.filter(i => interests2.includes(i)).length;
    const union = new Set([...interests1, ...interests2]).size;
    return union > 0 ? intersection / union : 0;
  }

  private calculatePersonalizedScore(course: Course, profile: UserProfile, behaviors: UserBehavior[]): number {
    let score = 0.5; // Base score

    // Interest match
    if (profile.interests.includes(course.category)) {
      score += 0.2;
    }

    // Level match
    if (this.matchesExpertiseLevel(course.level, profile.expertiseLevel)) {
      score += 0.15;
    }

    // Pace match
    if (this.matchesPace(course.duration, profile.preferredPace)) {
      score += 0.1;
    }

    // Previous interaction
    const hasInteracted = behaviors.some(b => b.resourceId === course.id.toString());
    if (hasInteracted) {
      score += 0.05;
    }

    return Math.min(score, 1.0);
  }

  private matchesExpertiseLevel(courseLevel: string, userLevel: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const courseIndex = levels.indexOf(courseLevel);
    const userIndex = levels.indexOf(userLevel);
    
    return Math.abs(courseIndex - userIndex) <= 1;
  }

  private matchesPace(courseDuration: string, userPace: string): boolean {
    const durationHours = this.parseDuration(courseDuration);
    
    switch (userPace) {
      case 'slow':
        return durationHours <= 2;
      case 'moderate':
        return durationHours <= 5;
      case 'fast':
        return durationHours <= 10;
      default:
        return true;
    }
  }

  private parseDuration(duration: string): number {
    // Parse duration string like "2h 30m" to hours
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    
    const hoursNum = hours ? parseInt(hours[1]) : 0;
    const minutesNum = minutes ? parseInt(minutes[1]) : 0;
    
    return hoursNum + minutesNum / 60;
  }

  private deduplicateRecommendations(recommendations: ContentRecommendation[]): ContentRecommendation[] {
    const seen = new Set<string>();
    return recommendations.filter(rec => {
      const key = `${rec.resourceType}-${rec.resourceId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Mock data methods (replace with actual database calls)
  private async getAllCourses(): Promise<Course[]> {
    // Mock implementation - replace with actual course service
    return [];
  }

  private async getCourseById(id: string): Promise<Course | null> {
    // Mock implementation - replace with actual course service
    return null;
  }

  private async getTrendingCourses(): Promise<Course[]> {
    // Mock implementation - replace with actual trending logic
    return [];
  }

  private getAverageCompletionTime(resourceType: string): number {
    // Mock implementation - replace with actual analytics
    return 1800; // 30 minutes
  }

  private getRoleSkills(): Record<string, { skill: string; level: number }[]> {
    return {
      'Software Developer': [
        { skill: 'JavaScript', level: 3 },
        { skill: 'React', level: 2 },
        { skill: 'Node.js', level: 2 },
        { skill: 'Database Design', level: 2 }
      ],
      'Data Scientist': [
        { skill: 'Python', level: 3 },
        { skill: 'Machine Learning', level: 3 },
        { skill: 'Statistics', level: 3 },
        { skill: 'Data Visualization', level: 2 }
      ]
    };
  }

  private assessSkillLevel(userId: string, skill: string): number {
    // Mock implementation - replace with actual skill assessment
    return Math.floor(Math.random() * 4);
  }

  private async findCoursesForSkills(skills: string[]): Promise<string[]> {
    // Mock implementation - replace with actual course search
    return [];
  }

  private estimateTimeToCloseGaps(gaps: any[]): number {
    // Mock implementation - replace with actual estimation logic
    return gaps.length * 20; // 20 hours per skill gap
  }

  private calculatePriority(gaps: any[]): 'high' | 'medium' | 'low' {
    const totalGap = gaps.reduce((sum, gap) => sum + gap.gap, 0);
    if (totalGap > 6) return 'high';
    if (totalGap > 3) return 'medium';
    return 'low';
  }

  private async generateCourseSequence(skillGaps: SkillGapAnalysis[], profile: UserProfile): Promise<string[]> {
    // Mock implementation - replace with actual course sequencing logic
    return [];
  }

  private calculatePathDuration(courseSequence: string[]): number {
    // Mock implementation - replace with actual duration calculation
    return courseSequence.length * 5; // 5 hours per course
  }

  private calculatePathDifficulty(courseSequence: string[]): 'beginner' | 'intermediate' | 'advanced' {
    // Mock implementation - replace with actual difficulty calculation
    return 'intermediate';
  }
}

// Export singleton instance
export const enhancedAIRecommendationService = new EnhancedAIRecommendationService();
