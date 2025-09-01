// AI-Powered Recommendation System

export interface UserProfile {
  userId: string;
  preferences: {
    categories: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    timeCommitment: 'low' | 'medium' | 'high';
    goals: string[];
  };
  behavior: {
    viewedContent: Array<{ contentId: string; timestamp: number; timeSpent: number }>;
    completedContent: Array<{ contentId: string; timestamp: number; rating: number }>;
    favoritedContent: Array<{ contentId: string; timestamp: number }>;
    searchHistory: Array<{ query: string; timestamp: number; clickedResults: string[] }>;
    interactions: Array<{ contentId: string; type: 'like' | 'share' | 'comment'; timestamp: number }>;
  };
  demographics: {
    age?: number;
    location?: string;
    education?: string;
    profession?: string;
    experience?: number;
  };
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  type: 'course' | 'rto' | 'blog' | 'video' | 'article';
  language: string;
  rating: number;
  reviewCount: number;
  popularity: number; // based on views, likes, shares
  features: {
    hasVideo: boolean;
    hasAudio: boolean;
    hasInteractive: boolean;
    hasCertificate: boolean;
    isFree: boolean;
  };
  metadata: {
    instructor?: string;
    lastUpdated: number;
    prerequisites?: string[];
    learningOutcomes?: string[];
  };
}

export interface Recommendation {
  contentId: string;
  score: number;
  reason: string;
  confidence: number;
  category: 'collaborative' | 'content-based' | 'hybrid' | 'popular' | 'trending';
}

export interface RecommendationEngine {
  collaborativeFiltering(userId: string, limit: number): Recommendation[];
  contentBasedFiltering(userId: string, limit: number): Recommendation[];
  hybridRecommendation(userId: string, limit: number): Recommendation[];
  getPopularContent(limit: number): Recommendation[];
  getTrendingContent(limit: number): Recommendation[];
  updateUserProfile(userId: string, profile: Partial<UserProfile>): void;
  getPersonalizedRecommendations(userId: string, limit: number): Recommendation[];
}

class AIRecommendationEngine implements RecommendationEngine {
  private userProfiles: Map<string, UserProfile> = new Map();
  private contentItems: Map<string, ContentItem> = new Map();
  private userSimilarityMatrix: Map<string, Map<string, number>> = new Map();
  private contentSimilarityMatrix: Map<string, Map<string, number>> = new Map();

  constructor() {
    this.loadData();
    this.initializeSimilarityMatrices();
  }

  private loadData(): void {
    try {
      const profilesData = localStorage.getItem('platform_user_profiles');
      const contentData = localStorage.getItem('platform_content_items');

      if (profilesData) {
        const profiles = JSON.parse(profilesData);
        this.userProfiles = new Map(Object.entries(profiles));
      }

      if (contentData) {
        const content = JSON.parse(contentData);
        this.contentItems = new Map(Object.entries(content));
      }
    } catch (error) {
      console.warn('Failed to load recommendation data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('platform_user_profiles', JSON.stringify(Object.fromEntries(this.userProfiles)));
      localStorage.setItem('platform_content_items', JSON.stringify(Object.fromEntries(this.contentItems)));
    } catch (error) {
      console.warn('Failed to save recommendation data:', error);
    }
  }

  private initializeSimilarityMatrices(): void {
    // Initialize user similarity matrix
    const userIds = Array.from(this.userProfiles.keys());
    for (const userId1 of userIds) {
      this.userSimilarityMatrix.set(userId1, new Map());
      for (const userId2 of userIds) {
        if (userId1 !== userId2) {
          const similarity = this.calculateUserSimilarity(userId1, userId2);
          this.userSimilarityMatrix.get(userId1)!.set(userId2, similarity);
        }
      }
    }

    // Initialize content similarity matrix
    const contentIds = Array.from(this.contentItems.keys());
    for (const contentId1 of contentIds) {
      this.contentSimilarityMatrix.set(contentId1, new Map());
      for (const contentId2 of contentIds) {
        if (contentId1 !== contentId2) {
          const similarity = this.calculateContentSimilarity(contentId1, contentId2);
          this.contentSimilarityMatrix.get(contentId1)!.set(contentId2, similarity);
        }
      }
    }
  }

  private calculateUserSimilarity(userId1: string, userId2: string): number {
    const profile1 = this.userProfiles.get(userId1);
    const profile2 = this.userProfiles.get(userId2);

    if (!profile1 || !profile2) return 0;

    let similarity = 0;
    let totalWeight = 0;

    // Preference similarity (30% weight)
    const preferenceSimilarity = this.calculatePreferenceSimilarity(profile1.preferences, profile2.preferences);
    similarity += preferenceSimilarity * 0.3;
    totalWeight += 0.3;

    // Behavior similarity (40% weight)
    const behaviorSimilarity = this.calculateBehaviorSimilarity(profile1.behavior, profile2.behavior);
    similarity += behaviorSimilarity * 0.4;
    totalWeight += 0.4;

    // Demographic similarity (30% weight)
    const demographicSimilarity = this.calculateDemographicSimilarity(profile1.demographics, profile2.demographics);
    similarity += demographicSimilarity * 0.3;
    totalWeight += 0.3;

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  private calculatePreferenceSimilarity(pref1: UserProfile['preferences'], pref2: UserProfile['preferences']): number {
    let similarity = 0;
    let totalWeight = 0;

    // Category similarity
    const categoryOverlap = pref1.categories.filter(cat => pref2.categories.includes(cat)).length;
    const categorySimilarity = categoryOverlap / Math.max(pref1.categories.length, pref2.categories.length, 1);
    similarity += categorySimilarity * 0.4;
    totalWeight += 0.4;

    // Difficulty similarity
    const difficultySimilarity = pref1.difficulty === pref2.difficulty ? 1 : 0;
    similarity += difficultySimilarity * 0.2;
    totalWeight += 0.2;

    // Learning style similarity
    const styleSimilarity = pref1.learningStyle === pref2.learningStyle ? 1 : 0;
    similarity += styleSimilarity * 0.2;
    totalWeight += 0.2;

    // Goals similarity
    const goalOverlap = pref1.goals.filter(goal => pref2.goals.includes(goal)).length;
    const goalSimilarity = goalOverlap / Math.max(pref1.goals.length, pref2.goals.length, 1);
    similarity += goalSimilarity * 0.2;
    totalWeight += 0.2;

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  private calculateBehaviorSimilarity(behavior1: UserProfile['behavior'], behavior2: UserProfile['behavior']): number {
    let similarity = 0;
    let totalWeight = 0;

    // Viewed content similarity
    const viewed1 = new Set(behavior1.viewedContent.map(v => v.contentId));
    const viewed2 = new Set(behavior2.viewedContent.map(v => v.contentId));
    const viewedOverlap = [...viewed1].filter(id => viewed2.has(id)).length;
    const viewedSimilarity = viewedOverlap / Math.max(viewed1.size, viewed2.size, 1);
    similarity += viewedSimilarity * 0.3;
    totalWeight += 0.3;

    // Completed content similarity
    const completed1 = new Set(behavior1.completedContent.map(c => c.contentId));
    const completed2 = new Set(behavior2.completedContent.map(c => c.contentId));
    const completedOverlap = [...completed1].filter(id => completed2.has(id)).length;
    const completedSimilarity = completedOverlap / Math.max(completed1.size, completed2.size, 1);
    similarity += completedSimilarity * 0.4;
    totalWeight += 0.4;

    // Search history similarity
    const search1 = behavior1.searchHistory.map(s => s.query.toLowerCase());
    const search2 = behavior2.searchHistory.map(s => s.query.toLowerCase());
    const searchOverlap = search1.filter(query => search2.includes(query)).length;
    const searchSimilarity = searchOverlap / Math.max(search1.length, search2.length, 1);
    similarity += searchSimilarity * 0.3;
    totalWeight += 0.3;

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  private calculateDemographicSimilarity(demo1: UserProfile['demographics'], demo2: UserProfile['demographics']): number {
    let similarity = 0;
    let totalWeight = 0;

    // Age similarity
    if (demo1.age && demo2.age) {
      const ageDiff = Math.abs(demo1.age - demo2.age);
      const ageSimilarity = Math.max(0, 1 - ageDiff / 50); // Normalize to 0-1
      similarity += ageSimilarity * 0.3;
      totalWeight += 0.3;
    }

    // Location similarity
    if (demo1.location && demo2.location) {
      const locationSimilarity = demo1.location === demo2.location ? 1 : 0;
      similarity += locationSimilarity * 0.3;
      totalWeight += 0.3;
    }

    // Education similarity
    if (demo1.education && demo2.education) {
      const educationSimilarity = demo1.education === demo2.education ? 1 : 0;
      similarity += educationSimilarity * 0.2;
      totalWeight += 0.2;
    }

    // Experience similarity
    if (demo1.experience && demo2.experience) {
      const expDiff = Math.abs(demo1.experience - demo2.experience);
      const expSimilarity = Math.max(0, 1 - expDiff / 10); // Normalize to 0-1
      similarity += expSimilarity * 0.2;
      totalWeight += 0.2;
    }

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  private calculateContentSimilarity(contentId1: string, contentId2: string): number {
    const content1 = this.contentItems.get(contentId1);
    const content2 = this.contentItems.get(contentId2);

    if (!content1 || !content2) return 0;

    let similarity = 0;
    let totalWeight = 0;

    // Category similarity
    const categorySimilarity = content1.category === content2.category ? 1 : 0;
    similarity += categorySimilarity * 0.3;
    totalWeight += 0.3;

    // Tag similarity
    const tagOverlap = content1.tags.filter(tag => content2.tags.includes(tag)).length;
    const tagSimilarity = tagOverlap / Math.max(content1.tags.length, content2.tags.length, 1);
    similarity += tagSimilarity * 0.3;
    totalWeight += 0.3;

    // Difficulty similarity
    const difficultySimilarity = content1.difficulty === content2.difficulty ? 1 : 0;
    similarity += difficultySimilarity * 0.2;
    totalWeight += 0.2;

    // Type similarity
    const typeSimilarity = content1.type === content2.type ? 1 : 0;
    similarity += typeSimilarity * 0.2;
    totalWeight += 0.2;

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  collaborativeFiltering(userId: string, limit: number): Recommendation[] {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];

    const recommendations: Map<string, { score: number; reasons: string[] }> = new Map();

    // Find similar users
    const similarUsers = Array.from(this.userSimilarityMatrix.get(userId)?.entries() || [])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Get content from similar users
    for (const [similarUserId, similarity] of similarUsers) {
      const similarUserProfile = this.userProfiles.get(similarUserId);
      if (!similarUserProfile) continue;

      // Get content that similar user liked but current user hasn't seen
      const userViewed = new Set(userProfile.behavior.viewedContent.map(v => v.contentId));
      const userCompleted = new Set(userProfile.behavior.completedContent.map(c => c.contentId));

      // Check completed content with high ratings
      for (const completed of similarUserProfile.behavior.completedContent) {
        if (completed.rating >= 4 && !userViewed.has(completed.contentId) && !userCompleted.has(completed.contentId)) {
          const current = recommendations.get(completed.contentId) || { score: 0, reasons: [] };
          current.score += similarity * completed.rating;
          current.reasons.push(`Similar user rated this ${completed.rating}/5`);
          recommendations.set(completed.contentId, current);
        }
      }

      // Check favorited content
      for (const favorited of similarUserProfile.behavior.favoritedContent) {
        if (!userViewed.has(favorited.contentId) && !userCompleted.has(favorited.contentId)) {
          const current = recommendations.get(favorited.contentId) || { score: 0, reasons: [] };
          current.score += similarity * 0.8;
          current.reasons.push('Similar user favorited this');
          recommendations.set(favorited.contentId, current);
        }
      }
    }

    return Array.from(recommendations.entries())
      .map(([contentId, data]) => ({
        contentId,
        score: data.score,
        reason: data.reasons[0] || 'Recommended by similar users',
        confidence: Math.min(data.score / 10, 1),
        category: 'collaborative' as const
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  contentBasedFiltering(userId: string, limit: number): Recommendation[] {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) return [];

    const recommendations: Map<string, { score: number; reasons: string[] }> = new Map();

    // Get user's preferred content
    const userLikedContent = userProfile.behavior.completedContent
      .filter(c => c.rating >= 4)
      .map(c => c.contentId);

    // Find similar content
    for (const likedContentId of userLikedContent) {
      const similarContent = this.contentSimilarityMatrix.get(likedContentId);
      if (!similarContent) continue;

      for (const [similarContentId, similarity] of similarContent) {
        if (similarity > 0.5 && !userLikedContent.includes(similarContentId)) {
          const current = recommendations.get(similarContentId) || { score: 0, reasons: [] };
          current.score += similarity;
          current.reasons.push(`Similar to content you rated highly`);
          recommendations.set(similarContentId, current);
        }
      }
    }

    // Match user preferences
    for (const [contentId, content] of this.contentItems) {
      if (userLikedContent.includes(contentId)) continue;

      let preferenceScore = 0;
      const reasons: string[] = [];

      // Category preference
      if (userProfile.preferences.categories.includes(content.category)) {
        preferenceScore += 0.3;
        reasons.push('Matches your preferred category');
      }

      // Difficulty preference
      if (userProfile.preferences.difficulty === content.difficulty) {
        preferenceScore += 0.2;
        reasons.push('Matches your preferred difficulty level');
      }

      // Learning style preference
      if (this.matchesLearningStyle(userProfile.preferences.learningStyle, content)) {
        preferenceScore += 0.2;
        reasons.push('Matches your learning style');
      }

      // Tag preferences
      const tagOverlap = content.tags.filter(tag => 
        userProfile.preferences.goals.some(goal => 
          goal.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(goal.toLowerCase())
        )
      ).length;
      if (tagOverlap > 0) {
        preferenceScore += 0.3 * (tagOverlap / content.tags.length);
        reasons.push('Matches your learning goals');
      }

      if (preferenceScore > 0) {
        const current = recommendations.get(contentId) || { score: 0, reasons: [] };
        current.score += preferenceScore;
        current.reasons.push(...reasons);
        recommendations.set(contentId, current);
      }
    }

    return Array.from(recommendations.entries())
      .map(([contentId, data]) => ({
        contentId,
        score: data.score,
        reason: data.reasons[0] || 'Based on your preferences',
        confidence: Math.min(data.score, 1),
        category: 'content-based' as const
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private matchesLearningStyle(learningStyle: string, content: ContentItem): boolean {
    switch (learningStyle) {
      case 'visual':
        return content.features.hasVideo || content.type === 'video';
      case 'auditory':
        return content.features.hasAudio;
      case 'kinesthetic':
        return content.features.hasInteractive;
      case 'reading':
        return content.type === 'article' || content.type === 'blog';
      default:
        return true;
    }
  }

  hybridRecommendation(userId: string, limit: number): Recommendation[] {
    const collaborative = this.collaborativeFiltering(userId, limit * 2);
    const contentBased = this.contentBasedFiltering(userId, limit * 2);

    const hybridScores: Map<string, { collaborativeScore: number; contentScore: number; totalScore: number }> = new Map();

    // Combine collaborative filtering scores
    for (const rec of collaborative) {
      hybridScores.set(rec.contentId, {
        collaborativeScore: rec.score,
        contentScore: 0,
        totalScore: rec.score * 0.6 // Collaborative gets 60% weight
      });
    }

    // Combine content-based filtering scores
    for (const rec of contentBased) {
      const current = hybridScores.get(rec.contentId) || {
        collaborativeScore: 0,
        contentScore: 0,
        totalScore: 0
      };
      current.contentScore = rec.score;
      current.totalScore += rec.score * 0.4; // Content-based gets 40% weight
      hybridScores.set(rec.contentId, current);
    }

    return Array.from(hybridScores.entries())
      .map(([contentId, scores]) => ({
        contentId,
        score: scores.totalScore,
        reason: scores.collaborativeScore > scores.contentScore 
          ? 'Recommended by similar users and matches your preferences'
          : 'Matches your preferences and similar to content you liked',
        confidence: Math.min(scores.totalScore / 10, 1),
        category: 'hybrid' as const
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  getPopularContent(limit: number): Recommendation[] {
    return Array.from(this.contentItems.values())
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit)
      .map(content => ({
        contentId: content.id,
        score: content.popularity,
        reason: 'Popular among all users',
        confidence: Math.min(content.popularity / 100, 1),
        category: 'popular' as const
      }));
  }

  getTrendingContent(limit: number): Recommendation[] {
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

    // Calculate trending score based on recent activity
    const trendingScores = Array.from(this.contentItems.values()).map(content => {
      // This would be enhanced with actual recent activity data
      const trendingScore = content.popularity * (content.metadata.lastUpdated > oneWeekAgo ? 1.5 : 1);
      return { content, trendingScore };
    });

    return trendingScores
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit)
      .map(({ content, trendingScore }) => ({
        contentId: content.id,
        score: trendingScore,
        reason: 'Trending now',
        confidence: Math.min(trendingScore / 100, 1),
        category: 'trending' as const
      }));
  }

  updateUserProfile(userId: string, profile: Partial<UserProfile>): void {
    const existingProfile = this.userProfiles.get(userId);
    if (existingProfile) {
      this.userProfiles.set(userId, { ...existingProfile, ...profile });
    } else {
      // Create new profile with defaults
      const newProfile: UserProfile = {
        userId,
        preferences: {
          categories: [],
          difficulty: 'beginner',
          learningStyle: 'visual',
          timeCommitment: 'medium',
          goals: []
        },
        behavior: {
          viewedContent: [],
          completedContent: [],
          favoritedContent: [],
          searchHistory: [],
          interactions: []
        },
        demographics: {},
        ...profile
      };
      this.userProfiles.set(userId, newProfile);
    }

    this.saveData();
    this.updateSimilarityMatrices(userId);
  }

  private updateSimilarityMatrices(userId: string): void {
    // Update user similarity matrix for this user
    this.userSimilarityMatrix.set(userId, new Map());
    for (const [otherUserId] of this.userProfiles) {
      if (userId !== otherUserId) {
        const similarity = this.calculateUserSimilarity(userId, otherUserId);
        this.userSimilarityMatrix.get(userId)!.set(otherUserId, similarity);
        
        // Update the other user's similarity to this user
        if (!this.userSimilarityMatrix.has(otherUserId)) {
          this.userSimilarityMatrix.set(otherUserId, new Map());
        }
        this.userSimilarityMatrix.get(otherUserId)!.set(userId, similarity);
      }
    }
  }

  getPersonalizedRecommendations(userId: string, limit: number): Recommendation[] {
    const hybrid = this.hybridRecommendation(userId, Math.floor(limit * 0.6));
    const popular = this.getPopularContent(Math.floor(limit * 0.2));
    const trending = this.getTrendingContent(Math.floor(limit * 0.2));

    // Combine and deduplicate
    const allRecommendations = [...hybrid, ...popular, ...trending];
    const seen = new Set<string>();
    const uniqueRecommendations: Recommendation[] = [];

    for (const rec of allRecommendations) {
      if (!seen.has(rec.contentId)) {
        seen.add(rec.contentId);
        uniqueRecommendations.push(rec);
      }
    }

    return uniqueRecommendations.slice(0, limit);
  }

  // Add content to the system
  addContent(content: ContentItem): void {
    this.contentItems.set(content.id, content);
    this.updateContentSimilarityMatrix(content.id);
    this.saveData();
  }

  private updateContentSimilarityMatrix(contentId: string): void {
    this.contentSimilarityMatrix.set(contentId, new Map());
    for (const [otherContentId] of this.contentItems) {
      if (contentId !== otherContentId) {
        const similarity = this.calculateContentSimilarity(contentId, otherContentId);
        this.contentSimilarityMatrix.get(contentId)!.set(otherContentId, similarity);
        
        // Update the other content's similarity to this content
        if (!this.contentSimilarityMatrix.has(otherContentId)) {
          this.contentSimilarityMatrix.set(otherContentId, new Map());
        }
        this.contentSimilarityMatrix.get(otherContentId)!.set(contentId, similarity);
      }
    }
  }

  // Get recommendation insights
  getRecommendationInsights(userId: string): {
    topCategories: string[];
    preferredDifficulty: string;
    learningStyle: string;
    averageRating: number;
    completionRate: number;
    recommendationAccuracy: number;
  } {
    const userProfile = this.userProfiles.get(userId);
    if (!userProfile) {
      return {
        topCategories: [],
        preferredDifficulty: 'beginner',
        learningStyle: 'visual',
        averageRating: 0,
        completionRate: 0,
        recommendationAccuracy: 0
      };
    }

    // Calculate insights from user behavior
    const completedContent = userProfile.behavior.completedContent;
    const viewedContent = userProfile.behavior.viewedContent;

    // Top categories from completed content
    const categoryCounts = new Map<string, number>();
    for (const completed of completedContent) {
      const content = this.contentItems.get(completed.contentId);
      if (content) {
        const count = categoryCounts.get(content.category) || 0;
        categoryCounts.set(content.category, count + 1);
      }
    }

    const topCategories = Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    // Preferred difficulty
    const difficultyCounts = new Map<string, number>();
    for (const completed of completedContent) {
      const content = this.contentItems.get(completed.contentId);
      if (content) {
        const count = difficultyCounts.get(content.difficulty) || 0;
        difficultyCounts.set(content.difficulty, count + 1);
      }
    }

    const preferredDifficulty = Array.from(difficultyCounts.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'beginner';

    // Average rating
    const averageRating = completedContent.length > 0
      ? completedContent.reduce((sum, c) => sum + c.rating, 0) / completedContent.length
      : 0;

    // Completion rate
    const completionRate = viewedContent.length > 0
      ? (completedContent.length / viewedContent.length) * 100
      : 0;

    return {
      topCategories,
      preferredDifficulty,
      learningStyle: userProfile.preferences.learningStyle,
      averageRating,
      completionRate,
      recommendationAccuracy: 0.85 // This would be calculated based on user feedback
    };
  }
}

// Create singleton instance
export const aiRecommendationEngine = new AIRecommendationEngine();

// Convenience functions
export const getPersonalizedRecommendations = (userId: string, limit: number = 10) => {
  return aiRecommendationEngine.getPersonalizedRecommendations(userId, limit);
};

export const updateUserProfile = (userId: string, profile: Partial<UserProfile>) => {
  aiRecommendationEngine.updateUserProfile(userId, profile);
};

export const getRecommendationInsights = (userId: string) => {
  return aiRecommendationEngine.getRecommendationInsights(userId);
}; 