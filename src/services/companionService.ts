import { Companion, CompanionSession, CompanionStats, CompanionPreferences } from '@/types/companion';

class CompanionService {
  private companions: Companion[] = [];
  private sessions: CompanionSession[] = [];
  private preferences: CompanionPreferences | null = null;

  constructor() {
    this.loadCompanions();
    this.loadSessions();
    this.loadPreferences();
  }

  // Companion Management
  async getCompanions(): Promise<Companion[]> {
    return this.companions;
  }

  async getCompanionById(id: string): Promise<Companion | null> {
    return this.companions.find(companion => companion.id === id) || null;
  }

  async getCompanionsBySubject(subject: string): Promise<Companion[]> {
    return this.companions.filter(companion => companion.subject.toLowerCase() === subject.toLowerCase());
  }

  async getCompanionsByTopic(topic: string): Promise<Companion[]> {
    return this.companions.filter(companion => companion.topic.toLowerCase().includes(topic.toLowerCase()));
  }

  async createCompanion(companion: Omit<Companion, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'rating'>): Promise<Companion> {
    const newCompanion: Companion = {
      ...companion,
      id: `companion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0,
      rating: 0,
      isActive: true,
    };

    this.companions.push(newCompanion);
    this.saveCompanions();
    return newCompanion;
  }

  async updateCompanion(id: string, updates: Partial<Companion>): Promise<Companion | null> {
    const index = this.companions.findIndex(companion => companion.id === id);
    if (index === -1) return null;

    this.companions[index] = {
      ...this.companions[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveCompanions();
    return this.companions[index];
  }

  async deleteCompanion(id: string): Promise<boolean> {
    const index = this.companions.findIndex(companion => companion.id === id);
    if (index === -1) return false;

    this.companions.splice(index, 1);
    this.saveCompanions();
    return true;
  }

  // Session Management
  async getSessions(userId?: string): Promise<CompanionSession[]> {
    if (userId) {
      return this.sessions.filter(session => session.userId === userId);
    }
    return this.sessions;
  }

  async getSessionById(id: string): Promise<CompanionSession | null> {
    return this.sessions.find(session => session.id === id) || null;
  }

  async createSession(session: Omit<CompanionSession, 'id' | 'startTime' | 'status'>): Promise<CompanionSession> {
    const newSession: CompanionSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: new Date(),
      status: 'active',
      messages: [],
    };

    this.sessions.push(newSession);
    this.saveSessions();
    return newSession;
  }

  async updateSession(id: string, updates: Partial<CompanionSession>): Promise<CompanionSession | null> {
    const index = this.sessions.findIndex(session => session.id === id);
    if (index === -1) return null;

    this.sessions[index] = {
      ...this.sessions[index],
      ...updates,
    };

    this.saveSessions();
    return this.sessions[index];
  }

  async endSession(id: string): Promise<CompanionSession | null> {
    const session = await this.getSessionById(id);
    if (!session) return null;

    const endTime = new Date();
    const duration = endTime.getTime() - session.startTime.getTime();

    return await this.updateSession(id, {
      endTime,
      duration,
      status: 'ended',
    });
  }

  async addMessageToSession(sessionId: string, message: Omit<CompanionSession['messages'][0], 'id'>): Promise<boolean> {
    const session = await this.getSessionById(sessionId);
    if (!session) return false;

    const newMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    session.messages.push(newMessage);
    this.saveSessions();
    return true;
  }

  // Statistics
  async getCompanionStats(userId?: string): Promise<CompanionStats> {
    const userSessions = userId ? await this.getSessions(userId) : this.sessions;
    const totalSessions = userSessions.length;
    const totalDuration = userSessions.reduce((sum, session) => sum + (session.duration || 0), 0);
    const averageSessionLength = totalSessions > 0 ? totalDuration / totalSessions : 0;

    // Get favorite companions
    const companionUsage = userSessions.reduce((acc, session) => {
      acc[session.companionId] = (acc[session.companionId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const favoriteCompanions = Object.entries(companionUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id]) => id);

    // Get most used subjects
    const subjectUsage = userSessions.reduce((acc, session) => {
      const companion = this.companions.find(c => c.id === session.companionId);
      if (companion) {
        acc[companion.subject] = (acc[companion.subject] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const mostUsedSubjects = Object.entries(subjectUsage)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([subject]) => subject);

    const recentSessions = userSessions
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, 10);

    return {
      totalSessions,
      totalDuration,
      averageSessionLength,
      favoriteCompanions,
      mostUsedSubjects,
      recentSessions,
    };
  }

  // Preferences
  async getPreferences(): Promise<CompanionPreferences | null> {
    return this.preferences;
  }

  async updatePreferences(preferences: Partial<CompanionPreferences>): Promise<CompanionPreferences> {
    this.preferences = {
      ...this.preferences,
      ...preferences,
    } as CompanionPreferences;

    this.savePreferences();
    return this.preferences;
  }

  // Search and Filter
  async searchCompanions(query: string): Promise<Companion[]> {
    const lowercaseQuery = query.toLowerCase();
    return this.companions.filter(companion => 
      companion.name.toLowerCase().includes(lowercaseQuery) ||
      companion.subject.toLowerCase().includes(lowercaseQuery) ||
      companion.topic.toLowerCase().includes(lowercaseQuery) ||
      companion.description?.toLowerCase().includes(lowercaseQuery) ||
      companion.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  async getPopularCompanions(limit: number = 10): Promise<Companion[]> {
    return this.companions
      .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
      .slice(0, limit);
  }

  async getRecommendedCompanions(userId: string, limit: number = 5): Promise<Companion[]> {
    const userSessions = await this.getSessions(userId);
    const userSubjects = new Set(
      userSessions.map(session => {
        const companion = this.companions.find(c => c.id === session.companionId);
        return companion?.subject;
      }).filter(Boolean)
    );

    return this.companions
      .filter(companion => userSubjects.has(companion.subject))
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  // Data Persistence
  private loadCompanions(): void {
    try {
      const stored = localStorage.getItem('oponmeta_companions');
      if (stored) {
        this.companions = JSON.parse(stored).map((companion: any) => ({
          ...companion,
          createdAt: new Date(companion.createdAt),
          updatedAt: new Date(companion.updatedAt),
        }));
      } else {
        // Load default companions
        this.loadDefaultCompanions();
      }
    } catch (error) {
      console.error('Failed to load companions:', error);
      this.loadDefaultCompanions();
    }
  }

  private loadSessions(): void {
    try {
      const stored = localStorage.getItem('oponmeta_companion_sessions');
      if (stored) {
        this.sessions = JSON.parse(stored).map((session: any) => ({
          ...session,
          startTime: new Date(session.startTime),
          endTime: session.endTime ? new Date(session.endTime) : undefined,
          messages: session.messages.map((msg: any) => ({
            ...msg,
            timestamp: msg.timestamp ? new Date(msg.timestamp) : undefined,
          })),
        }));
      }
    } catch (error) {
      console.error('Failed to load sessions:', error);
      this.sessions = [];
    }
  }

  private loadPreferences(): void {
    try {
      const stored = localStorage.getItem('oponmeta_companion_preferences');
      if (stored) {
        this.preferences = JSON.parse(stored);
      } else {
        this.preferences = {
          voice: 'shimmer',
          style: 'friendly',
          language: 'en',
          notificationSettings: {
            sessionReminders: true,
            newCompanions: true,
            achievements: true,
          },
          privacySettings: {
            saveTranscripts: true,
            shareAnalytics: false,
            publicProfile: false,
          },
        };
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  }

  private saveCompanions(): void {
    try {
      localStorage.setItem('oponmeta_companions', JSON.stringify(this.companions));
    } catch (error) {
      console.error('Failed to save companions:', error);
    }
  }

  private saveSessions(): void {
    try {
      localStorage.setItem('oponmeta_companion_sessions', JSON.stringify(this.sessions));
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  private savePreferences(): void {
    try {
      localStorage.setItem('oponmeta_companion_preferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  private loadDefaultCompanions(): void {
    this.companions = [
      {
        id: 'companion_math_tutor',
        name: 'Math Mentor',
        subject: 'Mathematics',
        topic: 'Algebra and Calculus',
        description: 'A friendly math tutor specializing in algebra and calculus concepts.',
        voice: 'shimmer',
        style: 'educational',
        personality: 'Patient and encouraging',
        expertise: ['Algebra', 'Calculus', 'Geometry', 'Statistics'],
        languages: ['English'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0,
        rating: 4.8,
        tags: ['math', 'tutor', 'algebra', 'calculus'],
      },
      {
        id: 'companion_science_guide',
        name: 'Science Sage',
        subject: 'Science',
        topic: 'Physics and Chemistry',
        description: 'An enthusiastic science guide helping students understand complex scientific concepts.',
        voice: 'nova',
        style: 'enthusiastic',
        personality: 'Curious and engaging',
        expertise: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
        languages: ['English'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0,
        rating: 4.7,
        tags: ['science', 'physics', 'chemistry', 'biology'],
      },
      {
        id: 'companion_language_coach',
        name: 'Language Coach',
        subject: 'Languages',
        topic: 'English and Spanish',
        description: 'A multilingual language coach helping students improve their language skills.',
        voice: 'echo',
        style: 'conversational',
        personality: 'Friendly and supportive',
        expertise: ['English', 'Spanish', 'Grammar', 'Conversation'],
        languages: ['English', 'Spanish'],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0,
        rating: 4.9,
        tags: ['language', 'english', 'spanish', 'grammar'],
      },
    ];
    this.saveCompanions();
  }
}

// Create singleton instance
const companionService = new CompanionService();

export { companionService };
export default companionService;
