export interface Companion {
  id: string;
  name: string;
  subject: string;
  topic: string;
  description?: string;
  avatar?: string;
  voice?: string;
  style?: string;
  personality?: string;
  expertise?: string[];
  languages?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  usageCount?: number;
  rating?: number;
  tags?: string[];
}

export interface CompanionComponentProps {
  companionId: string;
  subject: string;
  topic: string;
  name: string;
  userName?: string;
  userImage?: string;
  style?: string;
  voice?: string;
  description?: string;
  avatar?: string;
  personality?: string;
  expertise?: string[];
}

export interface SavedMessage {
  id?: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp?: Date;
  sessionId?: string;
  companionId?: string;
}

export interface Message {
  type: string;
  transcriptType?: string;
  role?: 'assistant' | 'user';
  transcript?: string;
  timestamp?: Date;
}

export interface CompanionSession {
  id: string;
  companionId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  messages: SavedMessage[];
  status: 'active' | 'ended' | 'paused';
  transcript?: string;
  notes?: string;
  rating?: number;
}

export interface CompanionStats {
  totalSessions: number;
  totalDuration: number;
  averageSessionLength: number;
  favoriteCompanions: string[];
  mostUsedSubjects: string[];
  recentSessions: CompanionSession[];
}

export interface CompanionPreferences {
  voice: string;
  style: string;
  language: string;
  notificationSettings: {
    sessionReminders: boolean;
    newCompanions: boolean;
    achievements: boolean;
  };
  privacySettings: {
    saveTranscripts: boolean;
    shareAnalytics: boolean;
    publicProfile: boolean;
  };
}
