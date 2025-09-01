import { User, UserPreferences, NotificationSettings, AccessibilitySettings } from '@/data';

// User actions
export interface UserActions {
  createUser: (userData: Partial<User>) => Promise<User>;
  updateUser: (id: string, userData: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  getUsers: (filters?: UserFilters) => Promise<User[]>;
  updatePreferences: (id: string, preferences: Partial<UserPreferences>) => Promise<User>;
  updateNotificationSettings: (id: string, settings: Partial<NotificationSettings>) => Promise<User>;
  updateAccessibilitySettings: (id: string, settings: Partial<AccessibilitySettings>) => Promise<User>;
  getUserStats: (id: string) => Promise<User['stats']>;
  updateUserStats: (id: string, stats: Partial<User['stats']>) => Promise<void>;
}

export interface UserFilters {
  role?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// Mock implementation of user actions
export const userActions: UserActions = {
  async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      avatar: userData.avatar || '',
      role: userData.role || 'student',
      status: userData.status || 'active',
      preferences: userData.preferences || {
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          push: true,
          sms: false,
          courseUpdates: true,
          newMessages: true,
          achievements: true,
          marketing: false,
        },
        theme: 'light',
        accessibility: {
          highContrast: false,
          largeText: false,
          screenReader: false,
          reducedMotion: false,
        },
      },
      stats: userData.stats || {
        totalCourses: 0,
        completedCourses: 0,
        totalHours: 0,
        certificates: 0,
        achievements: 0,
        streak: 0,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return newUser;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter((u: User) => u.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
  },

  async getUser(id: string): Promise<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.id === id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  },

  async getUsers(filters?: UserFilters): Promise<User[]> {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (filters) {
      if (filters.role) {
        users = users.filter((u: User) => u.role === filters.role);
      }
      if (filters.status) {
        users = users.filter((u: User) => u.status === filters.status);
      }
      if (filters.search) {
        users = users.filter((u: User) => 
          u.firstName.toLowerCase().includes(filters.search!.toLowerCase()) ||
          u.lastName.toLowerCase().includes(filters.search!.toLowerCase()) ||
          u.email.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      if (filters.limit) {
        users = users.slice(0, filters.limit);
      }
    }

    return users;
  },

  async updatePreferences(id: string, preferences: Partial<UserPreferences>): Promise<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      preferences: {
        ...users[userIndex].preferences,
        ...preferences,
      },
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    return updatedUser;
  },

  async updateNotificationSettings(id: string, settings: Partial<NotificationSettings>): Promise<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      preferences: {
        ...users[userIndex].preferences,
        notifications: {
          ...users[userIndex].preferences.notifications,
          ...settings,
        },
      },
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    return updatedUser;
  },

  async updateAccessibilitySettings(id: string, settings: Partial<AccessibilitySettings>): Promise<User> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      preferences: {
        ...users[userIndex].preferences,
        accessibility: {
          ...users[userIndex].preferences.accessibility,
          ...settings,
        },
      },
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));

    return updatedUser;
  },

  async getUserStats(id: string): Promise<User['stats']> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.id === id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user.stats;
  },

  async updateUserStats(id: string, stats: Partial<User['stats']>): Promise<void> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...users[userIndex],
      stats: {
        ...users[userIndex].stats,
        ...stats,
      },
      updatedAt: new Date().toISOString(),
    };

    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  },
};
