export interface UserProfile {
  userId: string;
  interests: string[];
  skills: string[];
  learningGoals: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  difficultyPreference: 'beginner' | 'intermediate' | 'advanced';
  timeAvailability: 'low' | 'medium' | 'high';
  completionRate: number;
  averageScore: number;
  totalStudyTime: number;
  lastActive: Date;
}

export interface CourseRecommendation {
  courseId: string;
  score: number;
  reason: string;
  confidence: number;
  tags: string[];
  estimatedCompletionTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  courses: LearningPathCourse[];
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPathCourse {
  courseId: string;
  order: number;
  isCompleted: boolean;
  estimatedDuration: number;
  prerequisites: string[];
}

export interface ContentRecommendation {
  id: string;
  userId: string;
  type: 'course' | 'article' | 'video' | 'companion' | 'discussion';
  contentId: string;
  score: number;
  reason: string;
  confidence: number;
  tags: string[];
  createdAt: Date;
}

export interface UserBehavior {
  userId: string;
  action: 'view' | 'enroll' | 'complete' | 'drop' | 'rate' | 'share';
  contentId: string;
  contentType: 'course' | 'article' | 'video' | 'companion';
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface RecommendationEngine {
  name: string;
  type: 'collaborative' | 'content-based' | 'hybrid' | 'ai-powered';
  weight: number;
  isActive: boolean;
}

class AIRecommendationService {
  private userProfiles: UserProfile[] = [];
  private learningPaths: LearningPath[] = [];
  private contentRecommendations: ContentRecommendation[] = [];
  private userBehaviors: UserBehavior[] = [];
  private recommendationEngines: RecommendationEngine[] = [];

  constructor() {
    this.loadData();
    this.initializeEngines();
  }

  // User Profile Management
  async createUserProfile(profile: Omit<UserProfile, 'completionRate' | 'averageScore' | 'totalStudyTime' | 'lastActive'>): Promise<UserProfile> {
    const newProfile: UserProfile = {
      ...profile,
      completionRate: 0,
      averageScore: 0,
      totalStudyTime: 0,
      lastActive: new Date(),
    };

    this.userProfiles.push(newProfile);
    this.saveUserProfiles();
    return newProfile;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    return this.userProfiles.find(p => p.userId === userId) || null;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const index = this.userProfiles.findIndex(p => p.userId === userId);
    if (index === -1) return null;

    this.userProfiles[index] = {
      ...this.userProfiles[index],
      ...updates,
      lastActive: new Date(),
    };

    this.saveUserProfiles();
    return this.userProfiles[index];
  }

  // Learning Path Management
  async createLearningPath(path: Omit<LearningPath, 'id' | 'progress' | 'createdAt' | 'updatedAt'>): Promise<LearningPath> {
    const newPath: LearningPath = {
      ...path,
      id: `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.learningPaths.push(newPath);
    this.saveLearningPaths();
    return newPath;
  }

  async getUserLearningPaths(userId: string): Promise<LearningPath[]> {
    return this.learningPaths.filter(p => p.userId === userId);
  }

  async updateLearningPathProgress(pathId: string, progress: number): Promise<LearningPath | null> {
    const path = this.learningPaths.find(p => p.id === pathId);
    if (!path) return null;

    path.progress = Math.min(100, Math.max(0, progress));
    path.updatedAt = new Date();
    this.saveLearningPaths();
    return path;
  }

  // Course Recommendations
  async getCourseRecommendations(userId: string, limit: number = 10): Promise<CourseRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    // Simulate AI-powered recommendations based on user profile
    const recommendations: CourseRecommendation[] = [];
    
    // Content-based filtering
    const contentBasedRecs = this.getContentBasedRecommendations(userProfile);
    recommendations.push(...contentBasedRecs);

    // Collaborative filtering
    const collaborativeRecs = this.getCollaborativeRecommendations(userId);
    recommendations.push(...collaborativeRecs);

    // Hybrid approach - combine and rank
    const combinedRecs = this.combineRecommendations(recommendations);
    
    // Sort by score and return top recommendations
    return combinedRecs
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private getContentBasedRecommendations(userProfile: UserProfile): CourseRecommendation[] {
    const recommendations: CourseRecommendation[] = [];
    
    // Match interests with course tags
    userProfile.interests.forEach(interest => {
      // Simulate finding courses that match interests
      const matchingCourses = this.findCoursesByInterest(interest);
      matchingCourses.forEach(course => {
        recommendations.push({
          courseId: course.id,
          score: this.calculateInterestScore(interest, course.tags),
          reason: `Matches your interest in ${interest}`,
          confidence: 0.8,
          tags: course.tags,
          estimatedCompletionTime: course.duration,
          difficulty: course.difficulty,
        });
      });
    });

    // Match skills with course requirements
    userProfile.skills.forEach(skill => {
      const skillBasedCourses = this.findCoursesBySkill(skill);
      skillBasedCourses.forEach(course => {
        recommendations.push({
          courseId: course.id,
          score: this.calculateSkillScore(skill, course.requirements),
          reason: `Builds on your ${skill} skills`,
          confidence: 0.7,
          tags: course.tags,
          estimatedCompletionTime: course.duration,
          difficulty: course.difficulty,
        });
      });
    });

    return recommendations;
  }

  private getCollaborativeRecommendations(userId: string): CourseRecommendation[] {
    const recommendations: CourseRecommendation[] = [];
    
    // Find similar users based on behavior patterns
    const similarUsers = this.findSimilarUsers(userId);
    
    similarUsers.forEach(similarUser => {
      const userCourses = this.getUserCompletedCourses(similarUser.userId);
      userCourses.forEach(course => {
        recommendations.push({
          courseId: course.id,
          score: similarUser.similarity * course.rating,
          reason: `Popular among users like you`,
          confidence: similarUser.similarity,
          tags: course.tags,
          estimatedCompletionTime: course.duration,
          difficulty: course.difficulty,
        });
      });
    });

    return recommendations;
  }

  private combineRecommendations(recommendations: CourseRecommendation[]): CourseRecommendation[] {
    const combined: Record<string, CourseRecommendation> = {};

    recommendations.forEach(rec => {
      if (combined[rec.courseId]) {
        // Combine scores using weighted average
        const existing = combined[rec.courseId];
        const totalWeight = existing.confidence + rec.confidence;
        existing.score = (existing.score * existing.confidence + rec.score * rec.confidence) / totalWeight;
        existing.confidence = Math.min(1, existing.confidence + rec.confidence * 0.1);
        existing.reason = `${existing.reason}; ${rec.reason}`;
      } else {
        combined[rec.courseId] = { ...rec };
      }
    });

    return Object.values(combined);
  }

  // Content Recommendations
  async getContentRecommendations(userId: string, type?: ContentRecommendation['type'], limit: number = 10): Promise<ContentRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    let recommendations = this.contentRecommendations.filter(r => r.userId === userId);
    
    if (type) {
      recommendations = recommendations.filter(r => r.type === type);
    }

    // Sort by score and recency
    return recommendations
      .sort((a, b) => {
        const scoreDiff = b.score - a.score;
        if (Math.abs(scoreDiff) < 0.1) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }
        return scoreDiff;
      })
      .slice(0, limit);
  }

  async addContentRecommendation(recommendation: Omit<ContentRecommendation, 'id' | 'createdAt'>): Promise<ContentRecommendation> {
    const newRecommendation: ContentRecommendation = {
      ...recommendation,
      id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    this.contentRecommendations.push(newRecommendation);
    this.saveContentRecommendations();
    return newRecommendation;
  }

  // User Behavior Tracking
  async trackUserBehavior(behavior: Omit<UserBehavior, 'timestamp'>): Promise<UserBehavior> {
    const newBehavior: UserBehavior = {
      ...behavior,
      timestamp: new Date(),
    };

    this.userBehaviors.push(newBehavior);
    this.saveUserBehaviors();
    
    // Update user profile based on behavior
    await this.updateUserProfileFromBehavior(behavior.userId, behavior);
    
    return newBehavior;
  }

  private async updateUserProfileFromBehavior(userId: string, behavior: UserBehavior): Promise<void> {
    const profile = await this.getUserProfile(userId);
    if (!profile) return;

    const updates: Partial<UserProfile> = {
      lastActive: new Date(),
    };

    switch (behavior.action) {
      case 'complete':
        updates.completionRate = Math.min(100, profile.completionRate + 5);
        updates.totalStudyTime = profile.totalStudyTime + (behavior.metadata?.duration || 0);
        break;
      case 'rate':
        if (behavior.metadata?.score) {
          const newAverage = (profile.averageScore + behavior.metadata.score) / 2;
          updates.averageScore = newAverage;
        }
        break;
    }

    await this.updateUserProfile(userId, updates);
  }

  // AI-Powered Features
  async generatePersonalizedLearningPath(userId: string, goal: string): Promise<LearningPath | null> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return null;

    // Simulate AI-generated learning path
    const courses = await this.getCourseRecommendations(userId, 5);
    const learningPathCourses: LearningPathCourse[] = courses.map((rec, index) => ({
      courseId: rec.courseId,
      order: index + 1,
      isCompleted: false,
      estimatedDuration: rec.estimatedCompletionTime,
      prerequisites: [],
    }));

    const totalDuration = learningPathCourses.reduce((sum, course) => sum + course.estimatedDuration, 0);

    return await this.createLearningPath({
      userId,
      title: `Personalized Path: ${goal}`,
      description: `AI-generated learning path tailored to your goals and preferences`,
      courses: learningPathCourses,
      estimatedDuration: totalDuration,
      difficulty: userProfile.difficultyPreference,
    });
  }

  async getAdaptiveRecommendations(userId: string, context?: Record<string, any>): Promise<CourseRecommendation[]> {
    const userProfile = await this.getUserProfile(userId);
    if (!userProfile) return [];

    // Consider current context (time of day, device, previous activity)
    const contextWeight = context ? this.calculateContextWeight(context) : 1;
    
    const baseRecommendations = await this.getCourseRecommendations(userId, 20);
    
    // Apply context-based adjustments
    return baseRecommendations.map(rec => ({
      ...rec,
      score: rec.score * contextWeight,
      reason: `${rec.reason} (context-aware)`,
    }));
  }

  private calculateContextWeight(context: Record<string, any>): number {
    let weight = 1;

    // Time-based adjustments
    const hour = new Date().getHours();
    if (hour >= 6 && hour <= 12) {
      weight *= 1.2; // Morning boost
    } else if (hour >= 18 && hour <= 22) {
      weight *= 1.1; // Evening boost
    }

    // Device-based adjustments
    if (context.device === 'mobile') {
      weight *= 0.9; // Slightly lower for mobile
    }

    // Previous activity adjustments
    if (context.lastActivity === 'completion') {
      weight *= 1.3; // Higher after completing something
    }

    return weight;
  }

  // Utility Methods
  private findCoursesByInterest(interest: string): Array<{ id: string; tags: string[]; duration: number; difficulty: string }> {
    // Simulate course database query
    return [
      { id: `course_${interest}_1`, tags: [interest, 'beginner'], duration: 120, difficulty: 'beginner' },
      { id: `course_${interest}_2`, tags: [interest, 'intermediate'], duration: 180, difficulty: 'intermediate' },
    ];
  }

  private findCoursesBySkill(skill: string): Array<{ id: string; requirements: string[]; tags: string[]; duration: number; difficulty: string }> {
    // Simulate course database query
    return [
      { id: `course_${skill}_1`, requirements: [skill], tags: [skill, 'advanced'], duration: 240, difficulty: 'advanced' },
    ];
  }

  private calculateInterestScore(interest: string, tags: string[]): number {
    const matchCount = tags.filter(tag => tag.toLowerCase().includes(interest.toLowerCase())).length;
    return Math.min(1, matchCount * 0.3);
  }

  private calculateSkillScore(skill: string, requirements: string[]): number {
    const matchCount = requirements.filter(req => req.toLowerCase().includes(skill.toLowerCase())).length;
    return Math.min(1, matchCount * 0.4);
  }

  private findSimilarUsers(userId: string): Array<{ userId: string; similarity: number }> {
    // Simulate finding similar users based on behavior patterns
    return [
      { userId: 'user_2', similarity: 0.8 },
      { userId: 'user_3', similarity: 0.6 },
    ];
  }

  private getUserCompletedCourses(userId: string): Array<{ id: string; rating: number; tags: string[]; duration: number; difficulty: string }> {
    // Simulate user course history
    return [
      { id: 'course_1', rating: 4.5, tags: ['programming', 'javascript'], duration: 120, difficulty: 'intermediate' },
      { id: 'course_2', rating: 4.2, tags: ['design', 'ui'], duration: 180, difficulty: 'beginner' },
    ];
  }

  private initializeEngines(): void {
    this.recommendationEngines = [
      { name: 'Content-Based', type: 'content-based', weight: 0.4, isActive: true },
      { name: 'Collaborative', type: 'collaborative', weight: 0.3, isActive: true },
      { name: 'AI-Powered', type: 'ai-powered', weight: 0.3, isActive: true },
    ];
  }

  // Analytics
  async getRecommendationAnalytics(): Promise<{
    totalUsers: number;
    totalRecommendations: number;
    averageRecommendationScore: number;
    topRecommendationTypes: Array<{ type: string; count: number }>;
    userEngagementRate: number;
  }> {
    const totalUsers = this.userProfiles.length;
    const totalRecommendations = this.contentRecommendations.length;
    const averageScore = totalRecommendations > 0 
      ? this.contentRecommendations.reduce((sum, r) => sum + r.score, 0) / totalRecommendations 
      : 0;

    const typeCounts = this.contentRecommendations.reduce((acc, rec) => {
      acc[rec.type] = (acc[rec.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTypes = Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const engagementRate = totalUsers > 0 
      ? this.userBehaviors.filter(b => b.action === 'enroll' || b.action === 'complete').length / totalUsers 
      : 0;

    return {
      totalUsers,
      totalRecommendations,
      averageRecommendationScore: Math.round(averageScore * 100) / 100,
      topRecommendationTypes: topTypes,
      userEngagementRate: Math.round(engagementRate * 100) / 100,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedUserProfiles = localStorage.getItem('oponmeta_ai_user_profiles');
      if (storedUserProfiles) {
        this.userProfiles = JSON.parse(storedUserProfiles).map((p: any) => ({
          ...p,
          lastActive: new Date(p.lastActive),
        }));
      }

      const storedLearningPaths = localStorage.getItem('oponmeta_ai_learning_paths');
      if (storedLearningPaths) {
        this.learningPaths = JSON.parse(storedLearningPaths).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
      }

      const storedContentRecommendations = localStorage.getItem('oponmeta_ai_content_recommendations');
      if (storedContentRecommendations) {
        this.contentRecommendations = JSON.parse(storedContentRecommendations).map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
        }));
      }

      const storedUserBehaviors = localStorage.getItem('oponmeta_ai_user_behaviors');
      if (storedUserBehaviors) {
        this.userBehaviors = JSON.parse(storedUserBehaviors).map((b: any) => ({
          ...b,
          timestamp: new Date(b.timestamp),
        }));
      }
    } catch (error) {
      console.error('Failed to load AI recommendation data:', error);
    }
  }

  private saveUserProfiles(): void {
    try {
      localStorage.setItem('oponmeta_ai_user_profiles', JSON.stringify(this.userProfiles));
    } catch (error) {
      console.error('Failed to save user profiles:', error);
    }
  }

  private saveLearningPaths(): void {
    try {
      localStorage.setItem('oponmeta_ai_learning_paths', JSON.stringify(this.learningPaths));
    } catch (error) {
      console.error('Failed to save learning paths:', error);
    }
  }

  private saveContentRecommendations(): void {
    try {
      localStorage.setItem('oponmeta_ai_content_recommendations', JSON.stringify(this.contentRecommendations));
    } catch (error) {
      console.error('Failed to save content recommendations:', error);
    }
  }

  private saveUserBehaviors(): void {
    try {
      localStorage.setItem('oponmeta_ai_user_behaviors', JSON.stringify(this.userBehaviors));
    } catch (error) {
      console.error('Failed to save user behaviors:', error);
    }
  }
}

// Create singleton instance
const aiRecommendationService = new AIRecommendationService();

export { aiRecommendationService };
export default aiRecommendationService;
