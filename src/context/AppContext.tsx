import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Companion {
  id: string;
  name: string;
  topic: string;
  subject: string;
  description: string;
  duration: number;
  style: string;
  voice: string;
  languages: string[];
  avatar: string;
  expertise: string;
  rating: number;
  sessions: number;
  isPro: boolean;
}

interface AppContextType {
  language: string;
  setLanguage: (language: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  user: any;
  setUser: (user: any) => void;
  companions: Companion[];
  addCompanion: (companion: Companion) => void;
  removeCompanion: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState(null);
  const [companions, setCompanions] = useState<Companion[]>([]);

  const addCompanion = (companion: Companion) => {
    setCompanions(prev => [...prev, companion]);
  };

  const removeCompanion = (id: string) => {
    setCompanions(prev => prev.filter(comp => comp.id !== id));
  };

  const value = {
    language,
    setLanguage,
    theme,
    setTheme,
    user,
    setUser,
    companions,
    addCompanion,
    removeCompanion,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
