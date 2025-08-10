// Backend Integration System - Database Storage and API Management

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: number;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
    privacy: {
      profileVisibility: 'public' | 'private' | 'friends';
      activityVisibility: 'public' | 'private' | 'friends';
      allowMessages: boolean;
    };
  };
  profile: {
    bio?: string;
    location?: string;
    website?: string;
    socialLinks?: {
      twitter?: string;
      linkedin?: string;
      github?: string;
    };
    interests: string[];
    skills: string[];
    experience: number;
    education?: string;
  };
  stats: {
    coursesCompleted: number;
    totalPoints: number;
    streakDays: number;
    lastActive: number;
    joinDate: number;
  };
  subscription?: {
    plan: 'free' | 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    startDate: number;
    endDate?: number;
    features: string[];
  };
}

export interface CourseData {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  type: 'course' | 'rto' | 'workshop' | 'webinar';
  language: string;
  instructor: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  content: {
    modules: Array<{
      id: string;
      title: string;
      type: 'video' | 'text' | 'quiz' | 'assignment';
      duration: number;
      completed: boolean;
    }>;
    totalModules: number;
    completedModules: number;
  };
  metadata: {
    rating: number;
    reviewCount: number;
    enrollmentCount: number;
    lastUpdated: number;
    isPublished: boolean;
    isFree: boolean;
    price?: number;
    currency?: string;
  };
  progress?: {
    completed: boolean;
    completionDate?: number;
    score?: number;
    timeSpent: number;
    lastAccessed: number;
  };
}

export interface AnalyticsData {
  userId: string;
  events: Array<{
    id: string;
    type: string;
    data: any;
    timestamp: number;
    sessionId: string;
  }>;
  sessions: Array<{
    id: string;
    startTime: number;
    endTime?: number;
    duration: number;
    pages: string[];
    actions: number;
  }>;
  preferences: {
    categories: string[];
    difficulty: string;
    learningStyle: string;
    timeCommitment: string;
  };
}

export interface SocialData {
  userId: string;
  reviews: Array<{
    id: string;
    contentId: string;
    rating: number;
    title: string;
    comment: string;
    helpful: number;
    createdAt: number;
    updatedAt: number;
  }>;
  favorites: Array<{
    id: string;
    contentId: string;
    contentType: string;
    addedAt: number;
  }>;
  wishlist: Array<{
    id: string;
    contentId: string;
    contentType: string;
    addedAt: number;
  }>;
  likes: Array<{
    id: string;
    contentId: string;
    contentType: string;
    createdAt: number;
  }>;
  shares: Array<{
    id: string;
    contentId: string;
    contentType: string;
    platform: string;
    createdAt: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
    points: number;
    earnedAt: number;
  }>;
}

export interface SyncStatus {
  lastSync: number;
  pendingChanges: number;
  syncErrors: string[];
  isOnline: boolean;
  isSyncing: boolean;
}

class BackendIntegrationService {
  private baseURL: string;
  private apiKey: string | null;
  private authToken: string | null;
  private syncQueue: Array<{ id: string; action: string; data: any; timestamp: number }> = [];
  private syncStatus: SyncStatus;
  private isInitialized = false;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://api.ourplatform.com';
    this.apiKey = localStorage.getItem('platform_api_key');
    this.authToken = localStorage.getItem('platform_auth_token');
    this.syncStatus = this.loadSyncStatus();
    this.initializeService();
  }

  private loadSyncStatus(): SyncStatus {
    try {
      const stored = localStorage.getItem('platform_sync_status');
      return stored ? JSON.parse(stored) : this.getDefaultSyncStatus();
    } catch (error) {
      console.warn('Failed to load sync status:', error);
      return this.getDefaultSyncStatus();
    }
  }

  private getDefaultSyncStatus(): SyncStatus {
    return {
      lastSync: Date.now(),
      pendingChanges: 0,
      syncErrors: [],
      isOnline: navigator.onLine,
      isSyncing: false
    };
  }

  private saveSyncStatus(): void {
    try {
      localStorage.setItem('platform_sync_status', JSON.stringify(this.syncStatus));
    } catch (error) {
      console.warn('Failed to save sync status:', error);
    }
  }

  private async initializeService(): Promise<void> {
    if (this.isInitialized) return;

    // Set up online/offline detection
    window.addEventListener('online', () => {
      this.syncStatus.isOnline = true;
      this.saveSyncStatus();
      this.processSyncQueue();
    });

    window.addEventListener('offline', () => {
      this.syncStatus.isOnline = false;
      this.saveSyncStatus();
    });

    // Set up periodic sync
    setInterval(() => {
      if (this.syncStatus.isOnline && this.syncQueue.length > 0) {
        this.processSyncQueue();
      }
    }, 30000); // Sync every 30 seconds

    this.isInitialized = true;
  }

  // Authentication
  async authenticate(email: string, password: string): Promise<APIResponse<{ token: string; user: UserData }>> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const result: APIResponse<{ token: string; user: UserData }> = await response.json();

      if (result.success && result.data) {
        this.authToken = result.data.token;
        localStorage.setItem('platform_auth_token', result.data.token);
        await this.syncUserData(result.data.user);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Authentication failed',
        timestamp: Date.now()
      };
    }
  }

  async register(userData: { email: string; password: string; name: string }): Promise<APIResponse<{ token: string; user: UserData }>> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const result: APIResponse<{ token: string; user: UserData }> = await response.json();

      if (result.success && result.data) {
        this.authToken = result.data.token;
        localStorage.setItem('platform_auth_token', result.data.token);
        await this.syncUserData(result.data.user);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed',
        timestamp: Date.now()
      };
    }
  }

  logout(): void {
    this.authToken = null;
    this.apiKey = null;
    localStorage.removeItem('platform_auth_token');
    localStorage.removeItem('platform_api_key');
    this.clearLocalData();
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  // User Data Management
  async getUserData(): Promise<APIResponse<UserData>> {
    if (!this.authToken) {
      return {
        success: false,
        error: 'Not authenticated',
        timestamp: Date.now()
      };
    }

    try {
      const response = await this.makeAuthenticatedRequest('/user/profile');
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch user data',
        timestamp: Date.now()
      };
    }
  }

  async updateUserData(updates: Partial<UserData>): Promise<APIResponse<UserData>> {
    if (!this.authToken) {
      return {
        success: false,
        error: 'Not authenticated',
        timestamp: Date.now()
      };
    }

    try {
      const response = await this.makeAuthenticatedRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(updates)
      });

      if (response.success && response.data) {
        await this.syncUserData(response.data);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update user data',
        timestamp: Date.now()
      };
    }
  }

  // Course Data Management
  async getCourses(filters?: { category?: string; difficulty?: string; search?: string }): Promise<APIResponse<CourseData[]>> {
    try {
      const queryParams = new URLSearchParams();
      if (filters?.category) queryParams.append('category', filters.category);
      if (filters?.difficulty) queryParams.append('difficulty', filters.difficulty);
      if (filters?.search) queryParams.append('search', filters.search);

      const response = await this.makeAuthenticatedRequest(`/courses?${queryParams.toString()}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch courses',
        timestamp: Date.now()
      };
    }
  }

  async getCourse(courseId: string): Promise<APIResponse<CourseData>> {
    try {
      const response = await this.makeAuthenticatedRequest(`/courses/${courseId}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch course',
        timestamp: Date.now()
      };
    }
  }

  async updateCourseProgress(courseId: string, progress: Partial<CourseData['progress']>): Promise<APIResponse<CourseData>> {
    try {
      const response = await this.makeAuthenticatedRequest(`/courses/${courseId}/progress`, {
        method: 'PUT',
        body: JSON.stringify(progress)
      });

      if (response.success) {
        this.addToSyncQueue('course_progress', { courseId, progress });
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update course progress',
        timestamp: Date.now()
      };
    }
  }

  // Analytics Data Management
  async sendAnalytics(analyticsData: AnalyticsData): Promise<APIResponse<void>> {
    try {
      const response = await this.makeAuthenticatedRequest('/analytics/events', {
        method: 'POST',
        body: JSON.stringify(analyticsData)
      });

      if (response.success) {
        this.syncStatus.lastSync = Date.now();
        this.saveSyncStatus();
      }

      return response;
    } catch (error) {
      // Queue for later sync if failed
      this.addToSyncQueue('analytics', analyticsData);
      return {
        success: false,
        error: 'Failed to send analytics',
        timestamp: Date.now()
      };
    }
  }

  async getAnalytics(userId: string, dateRange?: { start: number; end: number }): Promise<APIResponse<AnalyticsData>> {
    try {
      const queryParams = new URLSearchParams({ userId });
      if (dateRange) {
        queryParams.append('start', dateRange.start.toString());
        queryParams.append('end', dateRange.end.toString());
      }

      const response = await this.makeAuthenticatedRequest(`/analytics/user?${queryParams.toString()}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch analytics',
        timestamp: Date.now()
      };
    }
  }

  // Social Data Management
  async getSocialData(userId: string): Promise<APIResponse<SocialData>> {
    try {
      const response = await this.makeAuthenticatedRequest(`/social/user/${userId}`);
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch social data',
        timestamp: Date.now()
      };
    }
  }

  async addReview(review: Omit<SocialData['reviews'][0], 'id' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<SocialData['reviews'][0]>> {
    try {
      const response = await this.makeAuthenticatedRequest('/social/reviews', {
        method: 'POST',
        body: JSON.stringify(review)
      });

      if (response.success) {
        this.addToSyncQueue('social_review', review);
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to add review',
        timestamp: Date.now()
      };
    }
  }

  async toggleFavorite(contentId: string, contentType: string): Promise<APIResponse<{ isFavorited: boolean }>> {
    try {
      const response = await this.makeAuthenticatedRequest('/social/favorites', {
        method: 'POST',
        body: JSON.stringify({ contentId, contentType })
      });

      if (response.success) {
        this.addToSyncQueue('social_favorite', { contentId, contentType });
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to toggle favorite',
        timestamp: Date.now()
      };
    }
  }

  async toggleWishlist(contentId: string, contentType: string): Promise<APIResponse<{ isInWishlist: boolean }>> {
    try {
      const response = await this.makeAuthenticatedRequest('/social/wishlist', {
        method: 'POST',
        body: JSON.stringify({ contentId, contentType })
      });

      if (response.success) {
        this.addToSyncQueue('social_wishlist', { contentId, contentType });
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to toggle wishlist',
        timestamp: Date.now()
      };
    }
  }

  async toggleLike(contentId: string, contentType: string): Promise<APIResponse<{ isLiked: boolean }>> {
    try {
      const response = await this.makeAuthenticatedRequest('/social/likes', {
        method: 'POST',
        body: JSON.stringify({ contentId, contentType })
      });

      if (response.success) {
        this.addToSyncQueue('social_like', { contentId, contentType });
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to toggle like',
        timestamp: Date.now()
      };
    }
  }

  // Sync Management
  private addToSyncQueue(action: string, data: any): void {
    const syncItem = {
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action,
      data,
      timestamp: Date.now()
    };

    this.syncQueue.push(syncItem);
    this.syncStatus.pendingChanges = this.syncQueue.length;
    this.saveSyncStatus();
  }

  private async processSyncQueue(): Promise<void> {
    if (this.syncStatus.isSyncing || this.syncQueue.length === 0) return;

    this.syncStatus.isSyncing = true;
    this.saveSyncStatus();

    const itemsToProcess = [...this.syncQueue];
    const successfulItems: string[] = [];

    for (const item of itemsToProcess) {
      try {
        await this.processSyncItem(item);
        successfulItems.push(item.id);
      } catch (error) {
        console.error(`Failed to process sync item ${item.id}:`, error);
        this.syncStatus.syncErrors.push(`Failed to sync ${item.action}: ${error}`);
      }
    }

    // Remove successful items from queue
    this.syncQueue = this.syncQueue.filter(item => !successfulItems.includes(item.id));
    this.syncStatus.pendingChanges = this.syncQueue.length;
    this.syncStatus.lastSync = Date.now();
    this.syncStatus.isSyncing = false;
    this.saveSyncStatus();
  }

  private async processSyncItem(item: any): Promise<void> {
    switch (item.action) {
      case 'analytics':
        await this.sendAnalytics(item.data);
        break;
      case 'course_progress':
        await this.updateCourseProgress(item.data.courseId, item.data.progress);
        break;
      case 'social_review':
        await this.addReview(item.data);
        break;
      case 'social_favorite':
        await this.toggleFavorite(item.data.contentId, item.data.contentType);
        break;
      case 'social_wishlist':
        await this.toggleWishlist(item.data.contentId, item.data.contentType);
        break;
      case 'social_like':
        await this.toggleLike(item.data.contentId, item.data.contentType);
        break;
      default:
        throw new Error(`Unknown sync action: ${item.action}`);
    }
  }

  // Utility Methods
  private async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}): Promise<APIResponse<any>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    const response = await fetch(url, {
      ...options,
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        throw new Error('Authentication expired');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  private async syncUserData(userData: UserData): Promise<void> {
    // Store user data locally for offline access
    localStorage.setItem('platform_user_data', JSON.stringify(userData));
  }

  private clearLocalData(): void {
    // Clear all local data except sync queue
    const keysToKeep = ['platform_sync_status', 'platform_sync_queue'];
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.startsWith('platform_') && !keysToKeep.includes(key)
    );

    keysToRemove.forEach(key => localStorage.removeItem(key));
  }

  // Public API
  getSyncStatus(): SyncStatus {
    return { ...this.syncStatus };
  }

  async forceSync(): Promise<void> {
    await this.processSyncQueue();
  }

  async exportUserData(): Promise<APIResponse<{
    user: UserData;
    courses: CourseData[];
    analytics: AnalyticsData;
    social: SocialData;
  }>> {
    try {
      const response = await this.makeAuthenticatedRequest('/user/export');
      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to export user data',
        timestamp: Date.now()
      };
    }
  }

  async deleteAccount(): Promise<APIResponse<void>> {
    try {
      const response = await this.makeAuthenticatedRequest('/user/account', {
        method: 'DELETE'
      });

      if (response.success) {
        this.logout();
      }

      return response;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete account',
        timestamp: Date.now()
      };
    }
  }
}

// Create singleton instance
export const backendIntegrationService = new BackendIntegrationService();

// Convenience functions
export const authenticate = (email: string, password: string) => {
  return backendIntegrationService.authenticate(email, password);
};

export const register = (userData: { email: string; password: string; name: string }) => {
  return backendIntegrationService.register(userData);
};

export const getUserData = () => {
  return backendIntegrationService.getUserData();
};

export const updateUserData = (updates: Partial<UserData>) => {
  return backendIntegrationService.updateUserData(updates);
};

export const getCourses = (filters?: { category?: string; difficulty?: string; search?: string }) => {
  return backendIntegrationService.getCourses(filters);
};

export const sendAnalytics = (analyticsData: AnalyticsData) => {
  return backendIntegrationService.sendAnalytics(analyticsData);
};

export const getSyncStatus = () => {
  return backendIntegrationService.getSyncStatus();
};

export const forceSync = () => {
  return backendIntegrationService.forceSync();
}; 