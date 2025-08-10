// Social Features System for User Interactions

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  contentId: string;
  contentType: 'course' | 'rto' | 'blog';
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  createdAt: number;
  updatedAt: number;
  isVerified?: boolean;
  tags?: string[];
}

export interface SocialShare {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  contentType: 'favorite' | 'review' | 'achievement' | 'completion';
  contentId: string;
  contentTitle: string;
  contentImage?: string;
  message?: string;
  platform: 'internal' | 'facebook' | 'twitter' | 'linkedin' | 'email';
  createdAt: number;
  likes: number;
  comments: number;
  isPublic: boolean;
}

export interface UserProfile {
  userId: string;
  userName: string;
  userAvatar?: string;
  bio?: string;
  location?: string;
  interests: string[];
  achievements: Achievement[];
  stats: {
    reviewsCount: number;
    favoritesCount: number;
    followersCount: number;
    followingCount: number;
    coursesCompleted: number;
    totalPoints: number;
  };
  socialLinks?: {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  privacySettings: {
    showProfile: boolean;
    showActivity: boolean;
    showFavorites: boolean;
    allowMessages: boolean;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'engagement' | 'special';
  points: number;
  earnedAt: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface SocialFeedItem {
  id: string;
  type: 'review' | 'favorite' | 'achievement' | 'completion' | 'share';
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: {
    id: string;
    title: string;
    type: string;
    image?: string;
  };
  data: any;
  createdAt: number;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
  isShared: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: number;
  likes: number;
  replies: Comment[];
}

class SocialFeaturesService {
  private reviews: Review[] = [];
  private shares: SocialShare[] = [];
  private profiles: UserProfile[] = [];
  private feed: SocialFeedItem[] = [];
  private comments: Comment[] = [];

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const reviewsData = localStorage.getItem('platform_reviews');
      const sharesData = localStorage.getItem('platform_shares');
      const profilesData = localStorage.getItem('platform_profiles');
      const feedData = localStorage.getItem('platform_feed');
      const commentsData = localStorage.getItem('platform_comments');

      if (reviewsData) this.reviews = JSON.parse(reviewsData);
      if (sharesData) this.shares = JSON.parse(sharesData);
      if (profilesData) this.profiles = JSON.parse(profilesData);
      if (feedData) this.feed = JSON.parse(feedData);
      if (commentsData) this.comments = JSON.parse(commentsData);
    } catch (error) {
      console.warn('Failed to load social data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('platform_reviews', JSON.stringify(this.reviews));
      localStorage.setItem('platform_shares', JSON.stringify(this.shares));
      localStorage.setItem('platform_profiles', JSON.stringify(this.profiles));
      localStorage.setItem('platform_feed', JSON.stringify(this.feed));
      localStorage.setItem('platform_comments', JSON.stringify(this.comments));
    } catch (error) {
      console.warn('Failed to save social data:', error);
    }
  }

  // Review System
  addReview(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful' | 'notHelpful'>): Review {
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      helpful: 0,
      notHelpful: 0
    };

    this.reviews.push(newReview);
    this.saveData();
    this.addToFeed('review', newReview);
    return newReview;
  }

  getReviews(contentId: string): Review[] {
    return this.reviews
      .filter(review => review.contentId === contentId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  getUserReviews(userId: string): Review[] {
    return this.reviews
      .filter(review => review.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  updateReview(reviewId: string, updates: Partial<Review>): Review | null {
    const index = this.reviews.findIndex(review => review.id === reviewId);
    if (index === -1) return null;

    this.reviews[index] = {
      ...this.reviews[index],
      ...updates,
      updatedAt: Date.now()
    };

    this.saveData();
    return this.reviews[index];
  }

  deleteReview(reviewId: string): boolean {
    const index = this.reviews.findIndex(review => review.id === reviewId);
    if (index === -1) return false;

    this.reviews.splice(index, 1);
    this.saveData();
    return true;
  }

  markReviewHelpful(reviewId: string, isHelpful: boolean): void {
    const review = this.reviews.find(r => r.id === reviewId);
    if (review) {
      if (isHelpful) {
        review.helpful++;
      } else {
        review.notHelpful++;
      }
      this.saveData();
    }
  }

  // Social Sharing
  shareContent(share: Omit<SocialShare, 'id' | 'createdAt' | 'likes' | 'comments'>): SocialShare {
    const newShare: SocialShare = {
      ...share,
      id: `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      likes: 0,
      comments: 0
    };

    this.shares.push(newShare);
    this.saveData();
    this.addToFeed('share', newShare);
    return newShare;
  }

  getShares(userId?: string): SocialShare[] {
    let shares = this.shares;
    if (userId) {
      shares = shares.filter(share => share.userId === userId);
    }
    return shares.sort((a, b) => b.createdAt - a.createdAt);
  }

  likeShare(shareId: string): void {
    const share = this.shares.find(s => s.id === shareId);
    if (share) {
      share.likes++;
      this.saveData();
    }
  }

  // User Profiles
  createProfile(profile: Omit<UserProfile, 'stats'>): UserProfile {
    const newProfile: UserProfile = {
      ...profile,
      stats: {
        reviewsCount: 0,
        favoritesCount: 0,
        followersCount: 0,
        followingCount: 0,
        coursesCompleted: 0,
        totalPoints: 0
      }
    };

    this.profiles.push(newProfile);
    this.saveData();
    return newProfile;
  }

  getProfile(userId: string): UserProfile | null {
    return this.profiles.find(profile => profile.userId === userId) || null;
  }

  updateProfile(userId: string, updates: Partial<UserProfile>): UserProfile | null {
    const index = this.profiles.findIndex(profile => profile.userId === userId);
    if (index === -1) return null;

    this.profiles[index] = { ...this.profiles[index], ...updates };
    this.saveData();
    return this.profiles[index];
  }

  // Achievements
  addAchievement(userId: string, achievement: Omit<Achievement, 'id' | 'earnedAt'>): Achievement {
    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      earnedAt: Date.now()
    };

    const profile = this.getProfile(userId);
    if (profile) {
      profile.achievements.push(newAchievement);
      profile.stats.totalPoints += newAchievement.points;
      this.saveData();
      this.addToFeed('achievement', { userId, achievement: newAchievement });
    }

    return newAchievement;
  }

  getUserAchievements(userId: string): Achievement[] {
    const profile = this.getProfile(userId);
    return profile?.achievements || [];
  }

  // Social Feed
  private addToFeed(type: string, data: any): void {
    const feedItem: SocialFeedItem = {
      id: `feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type as any,
      user: {
        id: data.userId || data.user?.id,
        name: data.userName || data.user?.name,
        avatar: data.userAvatar || data.user?.avatar
      },
      content: {
        id: data.contentId || data.content?.id,
        title: data.contentTitle || data.content?.title,
        type: data.contentType || data.content?.type,
        image: data.contentImage || data.content?.image
      },
      data,
      createdAt: Date.now(),
      likes: 0,
      comments: [],
      isLiked: false,
      isShared: false
    };

    this.feed.unshift(feedItem);
    this.saveData();
  }

  getFeed(limit: number = 20): SocialFeedItem[] {
    return this.feed.slice(0, limit);
  }

  getUserFeed(userId: string, limit: number = 20): SocialFeedItem[] {
    return this.feed
      .filter(item => item.user.id === userId)
      .slice(0, limit);
  }

  likeFeedItem(feedId: string): void {
    const item = this.feed.find(f => f.id === feedId);
    if (item) {
      item.likes++;
      item.isLiked = true;
      this.saveData();
    }
  }

  unlikeFeedItem(feedId: string): void {
    const item = this.feed.find(f => f.id === feedId);
    if (item) {
      item.likes = Math.max(0, item.likes - 1);
      item.isLiked = false;
      this.saveData();
    }
  }

  // Comments System
  addComment(feedId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      likes: 0,
      replies: []
    };

    const feedItem = this.feed.find(f => f.id === feedId);
    if (feedItem) {
      feedItem.comments.push(newComment);
      feedItem.commentsCount = (feedItem.commentsCount || 0) + 1;
      this.saveData();
    }

    return newComment;
  }

  replyToComment(commentId: string, reply: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies'>): Comment {
    const newReply: Comment = {
      ...reply,
      id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      likes: 0,
      replies: []
    };

    // Find the comment in any feed item and add the reply
    for (const feedItem of this.feed) {
      const comment = this.findCommentRecursive(feedItem.comments, commentId);
      if (comment) {
        comment.replies.push(newReply);
        this.saveData();
        break;
      }
    }

    return newReply;
  }

  private findCommentRecursive(comments: Comment[], commentId: string): Comment | null {
    for (const comment of comments) {
      if (comment.id === commentId) return comment;
      const found = this.findCommentRecursive(comment.replies, commentId);
      if (found) return found;
    }
    return null;
  }

  // Analytics for Social Features
  getSocialAnalytics(): {
    totalReviews: number;
    totalShares: number;
    totalComments: number;
    averageRating: number;
    topReviewers: Array<{ userId: string; userName: string; reviewsCount: number }>;
    mostSharedContent: Array<{ contentId: string; title: string; sharesCount: number }>;
  } {
    const totalReviews = this.reviews.length;
    const totalShares = this.shares.length;
    const totalComments = this.feed.reduce((sum, item) => sum + item.comments.length, 0);
    const averageRating = this.reviews.length > 0 
      ? this.reviews.reduce((sum, review) => sum + review.rating, 0) / this.reviews.length 
      : 0;

    // Top reviewers
    const reviewerCounts = new Map<string, { userId: string; userName: string; reviewsCount: number }>();
    this.reviews.forEach(review => {
      const current = reviewerCounts.get(review.userId) || { 
        userId: review.userId, 
        userName: review.userName, 
        reviewsCount: 0 
      };
      current.reviewsCount++;
      reviewerCounts.set(review.userId, current);
    });

    const topReviewers = Array.from(reviewerCounts.values())
      .sort((a, b) => b.reviewsCount - a.reviewsCount)
      .slice(0, 5);

    // Most shared content
    const shareCounts = new Map<string, { contentId: string; title: string; sharesCount: number }>();
    this.shares.forEach(share => {
      const current = shareCounts.get(share.contentId) || { 
        contentId: share.contentId, 
        title: share.contentTitle, 
        sharesCount: 0 
      };
      current.sharesCount++;
      shareCounts.set(share.contentId, current);
    });

    const mostSharedContent = Array.from(shareCounts.values())
      .sort((a, b) => b.sharesCount - a.sharesCount)
      .slice(0, 5);

    return {
      totalReviews,
      totalShares,
      totalComments,
      averageRating,
      topReviewers,
      mostSharedContent
    };
  }

  // Export social data
  exportSocialData(): string {
    return JSON.stringify({
      reviews: this.reviews,
      shares: this.shares,
      profiles: this.profiles,
      feed: this.feed,
      comments: this.comments,
      analytics: this.getSocialAnalytics(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  // Clear social data
  clearSocialData(): void {
    this.reviews = [];
    this.shares = [];
    this.profiles = [];
    this.feed = [];
    this.comments = [];
    this.saveData();
  }
}

// Create singleton instance
export const socialFeaturesService = new SocialFeaturesService();

// Convenience functions
export const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful' | 'notHelpful'>) => {
  return socialFeaturesService.addReview(review);
};

export const getReviews = (contentId: string) => {
  return socialFeaturesService.getReviews(contentId);
};

export const shareContent = (share: Omit<SocialShare, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
  return socialFeaturesService.shareContent(share);
};

export const getFeed = (limit?: number) => {
  return socialFeaturesService.getFeed(limit);
};

export const likeFeedItem = (feedId: string) => {
  return socialFeaturesService.likeFeedItem(feedId);
};

export const unlikeFeedItem = (feedId: string) => {
  return socialFeaturesService.unlikeFeedItem(feedId);
};

export const addComment = (feedId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies'>) => {
  return socialFeaturesService.addComment(feedId, comment);
};

export const replyToComment = (commentId: string, reply: Omit<Comment, 'id' | 'createdAt' | 'likes' | 'replies'>) => {
  return socialFeaturesService.replyToComment(commentId, reply);
};

export const getSocialAnalytics = () => {
  return socialFeaturesService.getSocialAnalytics();
}; 