export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  dateOfBirth?: Date;
  phone?: string;
  country?: string;
  timezone?: string;
  language?: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  preferences: UserPreferences;
  profile: UserProfile;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReader: boolean;
  };
}

export interface UserProfile {
  bio?: string;
  skills: string[];
  interests: string[];
  education: Education[];
  experience: Experience[];
  socialLinks: SocialLink[];
  achievements: Achievement[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  skills: string[];
}

export interface SocialLink {
  id: string;
  platform: 'linkedin' | 'github' | 'twitter' | 'website' | 'other';
  url: string;
  label?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'course' | 'companion' | 'social' | 'system';
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
}

class UserService {
  private users: User[] = [];
  private sessions: UserSession[] = [];

  constructor() {
    this.loadData();
  }

  // User Management
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isActive' | 'isVerified' | 'preferences' | 'profile'>): Promise<User> {
    const user: User = {
      ...userData,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isActive: true,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'system',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          inApp: true,
          marketing: false,
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          allowMessages: true,
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          screenReader: false,
        },
      },
      profile: {
        skills: [],
        interests: [],
        education: [],
        experience: [],
        socialLinks: [],
        achievements: [],
      },
    };

    this.users.push(user);
    this.saveUsers();
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveUsers();
    return this.users[index];
  }

  async deleteUser(userId: string): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) return false;

    this.users.splice(index, 1);
    this.saveUsers();
    return true;
  }

  async deactivateUser(userId: string): Promise<User | null> {
    return await this.updateUser(userId, { isActive: false });
  }

  async activateUser(userId: string): Promise<User | null> {
    return await this.updateUser(userId, { isActive: true });
  }

  // Session Management
  async createSession(userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<UserSession> {
    const session: UserSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      ipAddress,
      userAgent,
      isActive: true,
    };

    this.sessions.push(session);
    this.saveSessions();
    return session;
  }

  async getSessionByToken(token: string): Promise<UserSession | null> {
    return this.sessions.find(s => s.token === token && s.isActive && s.expiresAt > new Date()) || null;
  }

  async invalidateSession(sessionId: string): Promise<boolean> {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return false;

    session.isActive = false;
    this.saveSessions();
    return true;
  }

  async invalidateAllUserSessions(userId: string): Promise<void> {
    this.sessions.forEach(session => {
      if (session.userId === userId) {
        session.isActive = false;
      }
    });
    this.saveSessions();
  }

  // Profile Management
  async updateProfile(userId: string, profileUpdates: Partial<UserProfile>): Promise<UserProfile | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    user.profile = {
      ...user.profile,
      ...profileUpdates,
    };

    await this.updateUser(userId, { profile: user.profile });
    return user.profile;
  }

  async addEducation(userId: string, education: Omit<Education, 'id'>): Promise<Education | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    const newEducation: Education = {
      ...education,
      id: `education_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    user.profile.education.push(newEducation);
    await this.updateUser(userId, { profile: user.profile });
    return newEducation;
  }

  async addExperience(userId: string, experience: Omit<Experience, 'id'>): Promise<Experience | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    const newExperience: Experience = {
      ...experience,
      id: `experience_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    user.profile.experience.push(newExperience);
    await this.updateUser(userId, { profile: user.profile });
    return newExperience;
  }

  async addAchievement(userId: string, achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<Achievement | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      unlockedAt: new Date(),
    };

    user.profile.achievements.push(newAchievement);
    await this.updateUser(userId, { profile: user.profile });
    return newAchievement;
  }

  // Preferences Management
  async updatePreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserPreferences | null> {
    const user = await this.getUserById(userId);
    if (!user) return null;

    user.preferences = {
      ...user.preferences,
      ...preferences,
    };

    await this.updateUser(userId, { preferences: user.preferences });
    return user.preferences;
  }

  // Search and Filter
  async searchUsers(query: string, options?: {
    limit?: number;
    offset?: number;
    skills?: string[];
    interests?: string[];
  }): Promise<User[]> {
    let filtered = this.users.filter(user => user.isActive);

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(lowercaseQuery) ||
        user.lastName.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery) ||
        user.profile.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
      );
    }

    if (options?.skills) {
      filtered = filtered.filter(user =>
        options.skills!.some(skill => user.profile.skills.includes(skill))
      );
    }

    if (options?.interests) {
      filtered = filtered.filter(user =>
        options.interests!.some(interest => user.profile.interests.includes(interest))
      );
    }

    if (options?.offset) {
      filtered = filtered.slice(options.offset);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  // Analytics
  async getUserStats(userId: string): Promise<{
    totalSessions: number;
    totalTimeSpent: number;
    coursesEnrolled: number;
    coursesCompleted: number;
    certificatesEarned: number;
    achievementsUnlocked: number;
    lastActive: Date;
  }> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const userSessions = this.sessions.filter(s => s.userId === userId);
    const totalSessions = userSessions.length;
    const lastActive = user.lastLoginAt || user.createdAt;

    return {
      totalSessions,
      totalTimeSpent: 0, // This would come from analytics service
      coursesEnrolled: 0, // This would come from course service
      coursesCompleted: 0, // This would come from course service
      certificatesEarned: 0, // This would come from course service
      achievementsUnlocked: user.profile.achievements.length,
      lastActive,
    };
  }

  async getPlatformStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    verifiedUsers: number;
    newUsersThisMonth: number;
    averageUserAge: number;
  }> {
    const totalUsers = this.users.length;
    const activeUsers = this.users.filter(u => u.isActive).length;
    const verifiedUsers = this.users.filter(u => u.isVerified).length;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newUsersThisMonth = this.users.filter(u => u.createdAt >= startOfMonth).length;

    const usersWithAge = this.users.filter(u => u.dateOfBirth);
    const averageUserAge = usersWithAge.length > 0
      ? usersWithAge.reduce((sum, u) => {
          const age = now.getFullYear() - u.dateOfBirth!.getFullYear();
          return sum + age;
        }, 0) / usersWithAge.length
      : 0;

    return {
      totalUsers,
      activeUsers,
      verifiedUsers,
      newUsersThisMonth,
      averageUserAge: Math.round(averageUserAge),
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedUsers = localStorage.getItem('oponmeta_users');
      if (storedUsers) {
        this.users = JSON.parse(storedUsers).map((u: any) => ({
          ...u,
          createdAt: new Date(u.createdAt),
          updatedAt: new Date(u.updatedAt),
          lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt) : undefined,
          dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth) : undefined,
          profile: {
            ...u.profile,
            education: u.profile.education.map((e: any) => ({
              ...e,
              startDate: new Date(e.startDate),
              endDate: e.endDate ? new Date(e.endDate) : undefined,
            })),
            experience: u.profile.experience.map((e: any) => ({
              ...e,
              startDate: new Date(e.startDate),
              endDate: e.endDate ? new Date(e.endDate) : undefined,
            })),
            achievements: u.profile.achievements.map((a: any) => ({
              ...a,
              unlockedAt: new Date(a.unlockedAt),
            })),
          },
        }));
      }

      const storedSessions = localStorage.getItem('oponmeta_user_sessions');
      if (storedSessions) {
        this.sessions = JSON.parse(storedSessions).map((s: any) => ({
          ...s,
          expiresAt: new Date(s.expiresAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  }

  private saveUsers(): void {
    try {
      localStorage.setItem('oponmeta_users', JSON.stringify(this.users));
    } catch (error) {
      console.error('Failed to save users:', error);
    }
  }

  private saveSessions(): void {
    try {
      localStorage.setItem('oponmeta_user_sessions', JSON.stringify(this.sessions));
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  // Cleanup expired sessions
  async cleanupExpiredSessions(): Promise<void> {
    const now = new Date();
    this.sessions = this.sessions.filter(session => session.expiresAt > now);
    this.saveSessions();
  }
}

// Create singleton instance
const userService = new UserService();

export { userService };
export default userService;
