import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription?: {
    plan: 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'inactive' | 'cancelled';
    expiresAt?: string;
  };
  preferences?: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: boolean;
  };
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
  updateProfile: (profileData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual authentication
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        avatar: 'https://via.placeholder.com/40',
        subscription: {
          plan: 'pro',
          status: 'active',
          expiresAt: '2024-12-31'
        },
        preferences: {
          theme: 'system',
          language: 'en',
          notifications: true
        },
        role: 'student',
        createdAt: '2024-01-01',
        lastLogin: new Date().toISOString()
      };
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Mock registration - replace with actual registration
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email || '',
        role: 'student',
        createdAt: new Date().toISOString(),
        ...userData
      };
      setUser(newUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (preferences: Partial<User['preferences']>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });
    }
  };

  const updateProfile = async (profileData: Partial<User>) => {
    if (user) {
      setUser({
        ...user,
        ...profileData
      });
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updatePreferences,
    updateProfile,
    isLoading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
