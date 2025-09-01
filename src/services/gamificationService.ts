export interface Achievement {
  id: string;
  userId: string;
  type: 'course_completion' | 'streak' | 'participation' | 'helpful' | 'social' | 'milestone';
  title: string;
  description: string;
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  metadata?: Record<string, any>;
}

export interface Leaderboard {
  id: string;
  name: string;
  description: string;
  type: 'global' | 'course' | 'weekly' | 'monthly';
  participants: LeaderboardParticipant[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  rewards?: Reward[];
}

export interface LeaderboardParticipant {
  userId: string;
  points: number;
  rank: number;
  joinedAt: Date;
  lastUpdated: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'points' | 'certificate' | 'discount' | 'feature_unlock';
  value: number | string;
  icon?: string;
  isClaimed: boolean;
  claimedAt?: Date;
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  achievements: Achievement[];
  rewards: Reward[];
  streaks: Streak[];
  statistics: UserStatistics;
}

export interface Streak {
  id: string;
  userId: string;
  type: 'daily_login' | 'course_progress' | 'social_participation';
  currentStreak: number;
  longestStreak: number;
  lastActivity: Date;
  startDate: Date;
}

export interface UserStatistics {
  coursesCompleted: number;
  totalStudyTime: number;
  socialInteractions: number;
  helpfulContributions: number;
  daysActive: number;
  averageScore: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  requirements: ChallengeRequirement[];
  rewards: Reward[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  participants: string[];
}

export interface ChallengeRequirement {
  type: 'course_completion' | 'study_time' | 'social_interaction' | 'achievement' | 'streak';
  target: number;
  current: number;
  description: string;
}

class GamificationService {
  private achievements: Achievement[] = [];
  private leaderboards: Leaderboard[] = [];
  private userProgress: UserProgress[] = [];
  private streaks: Streak[] = [];
  private challenges: Challenge[] = [];

  constructor() {
    this.loadData();
  }

  // Achievement System
  async unlockAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<Achievement> {
    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      unlockedAt: new Date(),
    };

    this.achievements.push(newAchievement);
    await this.updateUserProgress(achievement.userId, { points: achievement.points });
    this.saveAchievements();
    return newAchievement;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.achievements.filter(a => a.userId === userId);
  }

  async getAchievementStats(userId: string): Promise<{
    totalAchievements: number;
    totalPoints: number;
    rarityBreakdown: Record<string, number>;
    recentAchievements: Achievement[];
  }> {
    const userAchievements = this.achievements.filter(a => a.userId === userId);
    const totalPoints = userAchievements.reduce((sum, a) => sum + a.points, 0);
    
    const rarityBreakdown = userAchievements.reduce((acc, a) => {
      acc[a.rarity] = (acc[a.rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentAchievements = userAchievements
      .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime())
      .slice(0, 5);

    return {
      totalAchievements: userAchievements.length,
      totalPoints,
      rarityBreakdown,
      recentAchievements,
    };
  }

  // Leaderboard System
  async createLeaderboard(leaderboard: Omit<Leaderboard, 'id' | 'participants' | 'isActive'>): Promise<Leaderboard> {
    const newLeaderboard: Leaderboard = {
      ...leaderboard,
      id: `leaderboard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participants: [],
      isActive: true,
    };

    this.leaderboards.push(newLeaderboard);
    this.saveLeaderboards();
    return newLeaderboard;
  }

  async joinLeaderboard(leaderboardId: string, userId: string): Promise<Leaderboard | null> {
    const leaderboard = this.leaderboards.find(l => l.id === leaderboardId);
    if (!leaderboard || !leaderboard.isActive) return null;

    const existingParticipant = leaderboard.participants.find(p => p.userId === userId);
    if (existingParticipant) return leaderboard;

    const userProgress = await this.getUserProgress(userId);
    const newParticipant: LeaderboardParticipant = {
      userId,
      points: userProgress.totalPoints,
      rank: leaderboard.participants.length + 1,
      joinedAt: new Date(),
      lastUpdated: new Date(),
    };

    leaderboard.participants.push(newParticipant);
    this.updateLeaderboardRanks(leaderboard);
    this.saveLeaderboards();
    return leaderboard;
  }

  async updateLeaderboardScore(leaderboardId: string, userId: string, points: number): Promise<Leaderboard | null> {
    const leaderboard = this.leaderboards.find(l => l.id === leaderboardId);
    if (!leaderboard) return null;

    const participant = leaderboard.participants.find(p => p.userId === userId);
    if (!participant) return null;

    participant.points = points;
    participant.lastUpdated = new Date();
    this.updateLeaderboardRanks(leaderboard);
    this.saveLeaderboards();
    return leaderboard;
  }

  private updateLeaderboardRanks(leaderboard: Leaderboard): void {
    leaderboard.participants.sort((a, b) => b.points - a.points);
    leaderboard.participants.forEach((participant, index) => {
      participant.rank = index + 1;
    });
  }

  async getLeaderboards(options?: {
    type?: Leaderboard['type'];
    isActive?: boolean;
    limit?: number;
  }): Promise<Leaderboard[]> {
    let filtered = this.leaderboards;

    if (options?.type) {
      filtered = filtered.filter(l => l.type === options.type);
    }

    if (options?.isActive !== undefined) {
      filtered = filtered.filter(l => l.isActive === options.isActive);
    }

    filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  // User Progress System
  async getUserProgress(userId: string): Promise<UserProgress> {
    let progress = this.userProgress.find(p => p.userId === userId);
    
    if (!progress) {
      progress = {
        userId,
        totalPoints: 0,
        level: 1,
        experience: 0,
        experienceToNextLevel: 100,
        achievements: [],
        rewards: [],
        streaks: [],
        statistics: {
          coursesCompleted: 0,
          totalStudyTime: 0,
          socialInteractions: 0,
          helpfulContributions: 0,
          daysActive: 0,
          averageScore: 0,
        },
      };
      this.userProgress.push(progress);
    }

    return progress;
  }

  async updateUserProgress(userId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    let progress = await this.getUserProgress(userId);
    
    Object.assign(progress, updates);
    
    // Calculate level based on experience
    const newLevel = Math.floor(progress.experience / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
      progress.experienceToNextLevel = newLevel * 100;
    }

    this.saveUserProgress();
    return progress;
  }

  async addExperience(userId: string, experience: number): Promise<UserProgress> {
    const progress = await this.getUserProgress(userId);
    progress.experience += experience;
    progress.totalPoints += Math.floor(experience / 10);
    
    return await this.updateUserProgress(userId, progress);
  }

  // Streak System
  async updateStreak(userId: string, type: Streak['type']): Promise<Streak> {
    let streak = this.streaks.find(s => s.userId === userId && s.type === type);
    
    if (!streak) {
      streak = {
        id: `streak_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        type,
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: new Date(),
        startDate: new Date(),
      };
      this.streaks.push(streak);
    }

    const now = new Date();
    const lastActivity = new Date(streak.lastActivity);
    const daysDiff = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      // Consecutive day
      streak.currentStreak++;
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
    } else if (daysDiff > 1) {
      // Streak broken
      streak.currentStreak = 1;
    } else {
      // Same day, no change
      return streak;
    }

    streak.lastActivity = now;
    this.saveStreaks();
    return streak;
  }

  async getStreaks(userId: string): Promise<Streak[]> {
    return this.streaks.filter(s => s.userId === userId);
  }

  // Challenge System
  async createChallenge(challenge: Omit<Challenge, 'id' | 'participants' | 'isActive'>): Promise<Challenge> {
    const newChallenge: Challenge = {
      ...challenge,
      id: `challenge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participants: [],
      isActive: true,
    };

    this.challenges.push(newChallenge);
    this.saveChallenges();
    return newChallenge;
  }

  async joinChallenge(challengeId: string, userId: string): Promise<Challenge | null> {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge || !challenge.isActive) return null;

    if (challenge.participants.includes(userId)) return challenge;

    challenge.participants.push(userId);
    this.saveChallenges();
    return challenge;
  }

  async getChallenges(options?: {
    type?: Challenge['type'];
    isActive?: boolean;
    userId?: string;
  }): Promise<Challenge[]> {
    let filtered = this.challenges;

    if (options?.type) {
      filtered = filtered.filter(c => c.type === options.type);
    }

    if (options?.isActive !== undefined) {
      filtered = filtered.filter(c => c.isActive === options.isActive);
    }

    if (options?.userId) {
      filtered = filtered.filter(c => c.participants.includes(options.userId!));
    }

    return filtered.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  // Reward System
  async claimReward(userId: string, rewardId: string): Promise<Reward | null> {
    const userProgress = await this.getUserProgress(userId);
    const reward = userProgress.rewards.find(r => r.id === rewardId);
    
    if (!reward || reward.isClaimed) return null;

    reward.isClaimed = true;
    reward.claimedAt = new Date();
    this.saveUserProgress();
    return reward;
  }

  async addReward(userId: string, reward: Omit<Reward, 'id' | 'isClaimed'>): Promise<Reward> {
    const newReward: Reward = {
      ...reward,
      id: `reward_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isClaimed: false,
    };

    const userProgress = await this.getUserProgress(userId);
    userProgress.rewards.push(newReward);
    this.saveUserProgress();
    return newReward;
  }

  // Analytics
  async getGamificationAnalytics(): Promise<{
    totalUsers: number;
    totalAchievements: number;
    totalPoints: number;
    activeChallenges: number;
    averageLevel: number;
    topAchievements: Achievement[];
  }> {
    const totalUsers = this.userProgress.length;
    const totalAchievements = this.achievements.length;
    const totalPoints = this.userProgress.reduce((sum, p) => sum + p.totalPoints, 0);
    const activeChallenges = this.challenges.filter(c => c.isActive).length;
    const averageLevel = totalUsers > 0 ? this.userProgress.reduce((sum, p) => sum + p.level, 0) / totalUsers : 0;

    const achievementCounts = this.achievements.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topAchievements = Object.entries(achievementCounts)
      .map(([type, count]) => ({
        type,
        count,
        achievements: this.achievements.filter(a => a.type === type).slice(0, 3),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .flatMap(item => item.achievements);

    return {
      totalUsers,
      totalAchievements,
      totalPoints,
      activeChallenges,
      averageLevel: Math.round(averageLevel),
      topAchievements,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedAchievements = localStorage.getItem('oponmeta_gamification_achievements');
      if (storedAchievements) {
        this.achievements = JSON.parse(storedAchievements).map((a: any) => ({
          ...a,
          unlockedAt: new Date(a.unlockedAt),
        }));
      }

      const storedLeaderboards = localStorage.getItem('oponmeta_gamification_leaderboards');
      if (storedLeaderboards) {
        this.leaderboards = JSON.parse(storedLeaderboards).map((l: any) => ({
          ...l,
          startDate: new Date(l.startDate),
          endDate: l.endDate ? new Date(l.endDate) : undefined,
          participants: l.participants.map((p: any) => ({
            ...p,
            joinedAt: new Date(p.joinedAt),
            lastUpdated: new Date(p.lastUpdated),
          })),
        }));
      }

      const storedUserProgress = localStorage.getItem('oponmeta_gamification_user_progress');
      if (storedUserProgress) {
        this.userProgress = JSON.parse(storedUserProgress);
      }

      const storedStreaks = localStorage.getItem('oponmeta_gamification_streaks');
      if (storedStreaks) {
        this.streaks = JSON.parse(storedStreaks).map((s: any) => ({
          ...s,
          lastActivity: new Date(s.lastActivity),
          startDate: new Date(s.startDate),
        }));
      }

      const storedChallenges = localStorage.getItem('oponmeta_gamification_challenges');
      if (storedChallenges) {
        this.challenges = JSON.parse(storedChallenges).map((c: any) => ({
          ...c,
          startDate: new Date(c.startDate),
          endDate: new Date(c.endDate),
        }));
      }
    } catch (error) {
      console.error('Failed to load gamification data:', error);
    }
  }

  private saveAchievements(): void {
    try {
      localStorage.setItem('oponmeta_gamification_achievements', JSON.stringify(this.achievements));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }

  private saveLeaderboards(): void {
    try {
      localStorage.setItem('oponmeta_gamification_leaderboards', JSON.stringify(this.leaderboards));
    } catch (error) {
      console.error('Failed to save leaderboards:', error);
    }
  }

  private saveUserProgress(): void {
    try {
      localStorage.setItem('oponmeta_gamification_user_progress', JSON.stringify(this.userProgress));
    } catch (error) {
      console.error('Failed to save user progress:', error);
    }
  }

  private saveStreaks(): void {
    try {
      localStorage.setItem('oponmeta_gamification_streaks', JSON.stringify(this.streaks));
    } catch (error) {
      console.error('Failed to save streaks:', error);
    }
  }

  private saveChallenges(): void {
    try {
      localStorage.setItem('oponmeta_gamification_challenges', JSON.stringify(this.challenges));
    } catch (error) {
      console.error('Failed to save challenges:', error);
    }
  }
}

// Create singleton instance
const gamificationService = new GamificationService();

export { gamificationService };
export default gamificationService;
