// Advanced Gamification System with Leaderboards

export interface UserGamification {
  userId: string;
  userName: string;
  userAvatar?: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
  badges: Badge[];
  leaderboardRank: number;
  weeklyPoints: number;
  monthlyPoints: number;
  yearlyPoints: number;
  stats: {
    coursesCompleted: number;
    lessonsWatched: number;
    quizzesPassed: number;
    assignmentsSubmitted: number;
    reviewsWritten: number;
    questionsAnswered: number;
    mentoringHours: number;
    socialInteractions: number;
    perfectScores: number;
    firstPlaceFinishes: number;
  };
  challenges: UserChallenge[];
  rewards: Reward[];
  lastActivity: number;
  createdAt: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'social' | 'engagement' | 'mastery' | 'special';
  icon: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  criteria: AchievementCriteria[];
  earnedAt: number;
  progress: number; // 0-100
  isSecret: boolean;
  globalEarnedCount: number;
}

export interface AchievementCriteria {
  type: 'courses_completed' | 'lessons_watched' | 'perfect_scores' | 'streak_days' | 'social_interactions' | 'mentoring_hours' | 'reviews_written' | 'questions_answered' | 'time_spent' | 'level_reached';
  target: number;
  current: number;
  description: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'skill' | 'participation' | 'excellence' | 'leadership' | 'innovation';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  earnedAt: number;
  displayOrder: number;
  isAnimated: boolean;
}

export interface Leaderboard {
  id: string;
  name: string;
  description: string;
  type: 'global' | 'course' | 'category' | 'weekly' | 'monthly' | 'yearly';
  category?: string;
  courseId?: string;
  timeFrame: 'all-time' | 'weekly' | 'monthly' | 'yearly';
  startDate: number;
  endDate?: number;
  participants: LeaderboardEntry[];
  rewards: LeaderboardReward[];
  isActive: boolean;
  lastUpdated: number;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  rank: number;
  points: number;
  level: number;
  achievements: number;
  badges: number;
  streak: number;
  lastActivity: number;
  change: 'up' | 'down' | 'stable'; // rank change
  changeAmount: number;
}

export interface LeaderboardReward {
  rank: number;
  type: 'badge' | 'points' | 'achievement' | 'special';
  value: string | number;
  description: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special' | 'seasonal';
  category: 'learning' | 'social' | 'engagement' | 'mastery';
  startDate: number;
  endDate: number;
  criteria: ChallengeCriteria[];
  rewards: ChallengeReward[];
  participants: number;
  maxParticipants?: number;
  isActive: boolean;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
}

export interface ChallengeCriteria {
  type: string;
  target: number;
  description: string;
  progress: number;
}

export interface ChallengeReward {
  type: 'points' | 'badge' | 'achievement' | 'special';
  value: string | number;
  description: string;
}

export interface UserChallenge {
  challengeId: string;
  title: string;
  progress: number; // 0-100
  criteria: ChallengeCriteria[];
  startDate: number;
  endDate: number;
  status: 'active' | 'completed' | 'failed' | 'expired';
  completedAt?: number;
  rewards: ChallengeReward[];
}

export interface Reward {
  id: string;
  type: 'points' | 'badge' | 'achievement' | 'special' | 'virtual_item';
  value: string | number;
  description: string;
  earnedAt: number;
  isClaimed: boolean;
  claimedAt?: number;
}

export interface GamificationEvent {
  id: string;
  userId: string;
  type: 'achievement_earned' | 'badge_earned' | 'level_up' | 'points_earned' | 'streak_milestone' | 'leaderboard_rank_change' | 'challenge_completed';
  data: any;
  timestamp: number;
  points: number;
}

class GamificationService {
  private users: Map<string, UserGamification> = new Map();
  private achievements: Achievement[] = [];
  private badges: Badge[] = [];
  private leaderboards: Leaderboard[] = [];
  private challenges: Challenge[] = [];
  private events: GamificationEvent[] = [];

  constructor() {
    this.initializeAchievements();
    this.initializeBadges();
    this.initializeLeaderboards();
    this.initializeChallenges();
    this.loadData();
  }

  private initializeAchievements(): void {
    this.achievements = [
      {
        id: 'first_course',
        title: 'First Steps',
        description: 'Complete your first course',
        category: 'learning',
        icon: '🎓',
        points: 100,
        rarity: 'common',
        criteria: [{ type: 'courses_completed', target: 1, current: 0, description: 'Complete 1 course' }],
        earnedAt: 0,
        progress: 0,
        isSecret: false,
        globalEarnedCount: 0
      },
      {
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Get a perfect score on any quiz',
        category: 'mastery',
        icon: '⭐',
        points: 200,
        rarity: 'rare',
        criteria: [{ type: 'perfect_scores', target: 1, current: 0, description: 'Get 1 perfect score' }],
        earnedAt: 0,
        progress: 0,
        isSecret: false,
        globalEarnedCount: 0
      },
      {
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        category: 'engagement',
        icon: '🔥',
        points: 300,
        rarity: 'rare',
        criteria: [{ type: 'streak_days', target: 7, current: 0, description: 'Maintain a 7-day streak' }],
        earnedAt: 0,
        progress: 0,
        isSecret: false,
        globalEarnedCount: 0
      },
      {
        id: 'social_butterfly',
        title: 'Social Butterfly',
        description: 'Interact with 50 other learners',
        category: 'social',
        icon: '🦋',
        points: 400,
        rarity: 'epic',
        criteria: [{ type: 'social_interactions', target: 50, current: 0, description: 'Interact with 50 learners' }],
        earnedAt: 0,
        progress: 0,
        isSecret: false,
        globalEarnedCount: 0
      },
      {
        id: 'mentor',
        title: 'Mentor',
        description: 'Complete 10 hours of mentoring',
        category: 'leadership',
        icon: '👨‍🏫',
        points: 500,
        rarity: 'legendary',
        criteria: [{ type: 'mentoring_hours', target: 10, current: 0, description: 'Complete 10 mentoring hours' }],
        earnedAt: 0,
        progress: 0,
        isSecret: false,
        globalEarnedCount: 0
      }
    ];
  }

  private initializeBadges(): void {
    this.badges = [
      {
        id: 'beginner',
        title: 'Beginner',
        description: 'Complete your first lesson',
        icon: '🌱',
        category: 'skill',
        tier: 'bronze',
        points: 50,
        earnedAt: 0,
        displayOrder: 1,
        isAnimated: false
      },
      {
        id: 'intermediate',
        title: 'Intermediate',
        description: 'Complete 10 courses',
        icon: '🌿',
        category: 'skill',
        tier: 'silver',
        points: 150,
        earnedAt: 0,
        displayOrder: 2,
        isAnimated: false
      },
      {
        id: 'advanced',
        title: 'Advanced',
        description: 'Complete 25 courses',
        icon: '🌳',
        category: 'skill',
        tier: 'gold',
        points: 300,
        earnedAt: 0,
        displayOrder: 3,
        isAnimated: true
      },
      {
        id: 'expert',
        title: 'Expert',
        description: 'Complete 50 courses',
        icon: '🏆',
        category: 'skill',
        tier: 'platinum',
        points: 500,
        earnedAt: 0,
        displayOrder: 4,
        isAnimated: true
      },
      {
        id: 'master',
        title: 'Master',
        description: 'Complete 100 courses',
        icon: '👑',
        category: 'skill',
        tier: 'diamond',
        points: 1000,
        earnedAt: 0,
        displayOrder: 5,
        isAnimated: true
      }
    ];
  }

  private initializeLeaderboards(): void {
    this.leaderboards = [
      {
        id: 'global_all_time',
        name: 'Global All-Time',
        description: 'Top learners of all time',
        type: 'global',
        timeFrame: 'all-time',
        startDate: 0,
        participants: [],
        rewards: [
          { rank: 1, type: 'badge', value: 'champion', description: 'Champion Badge' },
          { rank: 2, type: 'badge', value: 'runner_up', description: 'Runner-up Badge' },
          { rank: 3, type: 'badge', value: 'third_place', description: 'Third Place Badge' }
        ],
        isActive: true,
        lastUpdated: Date.now()
      },
      {
        id: 'weekly_global',
        name: 'Weekly Champions',
        description: 'This week\'s top performers',
        type: 'global',
        timeFrame: 'weekly',
        startDate: this.getWeekStart(),
        endDate: this.getWeekEnd(),
        participants: [],
        rewards: [
          { rank: 1, type: 'points', value: 1000, description: '1000 Bonus Points' },
          { rank: 2, type: 'points', value: 500, description: '500 Bonus Points' },
          { rank: 3, type: 'points', value: 250, description: '250 Bonus Points' }
        ],
        isActive: true,
        lastUpdated: Date.now()
      }
    ];
  }

  private initializeChallenges(): void {
    this.challenges = [
      {
        id: 'daily_learning',
        title: 'Daily Learning',
        description: 'Complete at least one lesson today',
        type: 'daily',
        category: 'learning',
        startDate: this.getDayStart(),
        endDate: this.getDayEnd(),
        criteria: [{ type: 'lessons_watched', target: 1, description: 'Watch 1 lesson', progress: 0 }],
        rewards: [{ type: 'points', value: 50, description: '50 Points' }],
        participants: 0,
        isActive: true,
        difficulty: 'easy',
        tags: ['daily', 'learning']
      },
      {
        id: 'weekly_streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        type: 'weekly',
        category: 'engagement',
        startDate: this.getWeekStart(),
        endDate: this.getWeekEnd(),
        criteria: [{ type: 'streak_days', target: 7, description: '7-day streak', progress: 0 }],
        rewards: [{ type: 'badge', value: 'week_warrior', description: 'Week Warrior Badge' }],
        participants: 0,
        isActive: true,
        difficulty: 'medium',
        tags: ['weekly', 'streak']
      }
    ];
  }

  private getDayStart(): number {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  }

  private getDayEnd(): number {
    return this.getDayStart() + (24 * 60 * 60 * 1000) - 1;
  }

  private getWeekStart(): number {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysToSubtract).getTime();
  }

  private getWeekEnd(): number {
    return this.getWeekStart() + (7 * 24 * 60 * 60 * 1000) - 1;
  }

  private loadData(): void {
    try {
      const usersData = localStorage.getItem('oponmeta_gamification_users');
      const eventsData = localStorage.getItem('oponmeta_gamification_events');

      if (usersData) {
        const users = JSON.parse(usersData);
        this.users = new Map(Object.entries(users));
      }
      if (eventsData) this.events = JSON.parse(eventsData);
    } catch (error) {
      console.warn('Failed to load gamification data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('oponmeta_gamification_users', JSON.stringify(Object.fromEntries(this.users)));
      localStorage.setItem('oponmeta_gamification_events', JSON.stringify(this.events));
    } catch (error) {
      console.warn('Failed to save gamification data:', error);
    }
  }

  // User Management
  initializeUser(userId: string, userName: string, userAvatar?: string): UserGamification {
    const user: UserGamification = {
      userId,
      userName,
      userAvatar,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      achievements: [],
      badges: [],
      leaderboardRank: 0,
      weeklyPoints: 0,
      monthlyPoints: 0,
      yearlyPoints: 0,
      stats: {
        coursesCompleted: 0,
        lessonsWatched: 0,
        quizzesPassed: 0,
        assignmentsSubmitted: 0,
        reviewsWritten: 0,
        questionsAnswered: 0,
        mentoringHours: 0,
        socialInteractions: 0,
        perfectScores: 0,
        firstPlaceFinishes: 0
      },
      challenges: [],
      rewards: [],
      lastActivity: Date.now(),
      createdAt: Date.now()
    };

    this.users.set(userId, user);
    this.updateLeaderboards();
    this.saveData();
    return user;
  }

  getUser(userId: string): UserGamification | null {
    return this.users.get(userId) || null;
  }

  // Points and Experience
  awardPoints(userId: string, points: number, reason: string): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    user.totalPoints += points;
    user.weeklyPoints += points;
    user.monthlyPoints += points;
    user.yearlyPoints += points;
    user.lastActivity = Date.now();

    // Add experience (1 point = 1 experience)
    this.addExperience(userId, points);

    // Record event
    this.recordEvent(userId, 'points_earned', { points, reason }, points);

    this.updateLeaderboards();
    this.checkAchievements(userId);
    this.saveData();
    return true;
  }

  private addExperience(userId: string, experience: number): void {
    const user = this.users.get(userId);
    if (!user) return;

    user.experience += experience;

    // Check for level up
    while (user.experience >= user.experienceToNextLevel) {
      user.experience -= user.experienceToNextLevel;
      user.level++;
      user.experienceToNextLevel = Math.floor(user.experienceToNextLevel * 1.2); // 20% increase per level

      this.recordEvent(userId, 'level_up', { newLevel: user.level }, 100);
      this.checkLevelBasedAchievements(userId);
    }
  }

  // Streak Management
  updateStreak(userId: string, hasActivity: boolean): void {
    const user = this.users.get(userId);
    if (!user) return;

    if (hasActivity) {
      user.currentStreak++;
      user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
      
      // Check streak milestones
      this.checkStreakMilestones(userId, user.currentStreak);
    } else {
      user.currentStreak = 0;
    }

    user.lastActivity = Date.now();
    this.saveData();
  }

  private checkStreakMilestones(userId: string, streak: number): void {
    const milestones = [7, 14, 30, 60, 100];
    if (milestones.includes(streak)) {
      this.recordEvent(userId, 'streak_milestone', { streak }, streak * 10);
    }
  }

  // Achievement System
  private checkAchievements(userId: string): void {
    const user = this.users.get(userId);
    if (!user) return;

    this.achievements.forEach(achievement => {
      if (user.achievements.some(a => a.id === achievement.id)) return; // Already earned

      const progress = this.calculateAchievementProgress(user, achievement);
      achievement.progress = progress;

      if (progress >= 100) {
        this.awardAchievement(userId, achievement);
      }
    });
  }

  private calculateAchievementProgress(user: UserGamification, achievement: Achievement): number {
    let totalProgress = 0;
    let totalCriteria = achievement.criteria.length;

    achievement.criteria.forEach(criteria => {
      let current = 0;
      switch (criteria.type) {
        case 'courses_completed':
          current = user.stats.coursesCompleted;
          break;
        case 'lessons_watched':
          current = user.stats.lessonsWatched;
          break;
        case 'perfect_scores':
          current = user.stats.perfectScores;
          break;
        case 'streak_days':
          current = user.currentStreak;
          break;
        case 'social_interactions':
          current = user.stats.socialInteractions;
          break;
        case 'mentoring_hours':
          current = user.stats.mentoringHours;
          break;
        case 'reviews_written':
          current = user.stats.reviewsWritten;
          break;
        case 'questions_answered':
          current = user.stats.questionsAnswered;
          break;
        case 'level_reached':
          current = user.level;
          break;
      }

      criteria.current = current;
      const criteriaProgress = Math.min((current / criteria.target) * 100, 100);
      totalProgress += criteriaProgress;
    });

    return totalProgress / totalCriteria;
  }

  private awardAchievement(userId: string, achievement: Achievement): void {
    const user = this.users.get(userId);
    if (!user) return;

    const earnedAchievement = { ...achievement, earnedAt: Date.now() };
    user.achievements.push(earnedAchievement);
    user.totalPoints += achievement.points;
    achievement.globalEarnedCount++;

    this.recordEvent(userId, 'achievement_earned', { achievement: earnedAchievement }, achievement.points);
    this.checkBadgeEligibility(userId);
  }

  private checkLevelBasedAchievements(userId: string): void {
    const user = this.users.get(userId);
    if (!user) return;

    // Check for level-based badges
    this.badges.forEach(badge => {
      if (user.badges.some(b => b.id === badge.id)) return; // Already earned

      let shouldAward = false;
      switch (badge.id) {
        case 'beginner':
          shouldAward = user.stats.lessonsWatched >= 1;
          break;
        case 'intermediate':
          shouldAward = user.stats.coursesCompleted >= 10;
          break;
        case 'advanced':
          shouldAward = user.stats.coursesCompleted >= 25;
          break;
        case 'expert':
          shouldAward = user.stats.coursesCompleted >= 50;
          break;
        case 'master':
          shouldAward = user.stats.coursesCompleted >= 100;
          break;
      }

      if (shouldAward) {
        this.awardBadge(userId, badge);
      }
    });
  }

  private awardBadge(userId: string, badge: Badge): void {
    const user = this.users.get(userId);
    if (!user) return;

    const earnedBadge = { ...badge, earnedAt: Date.now() };
    user.badges.push(earnedBadge);
    user.totalPoints += badge.points;

    this.recordEvent(userId, 'badge_earned', { badge: earnedBadge }, badge.points);
  }

  private checkBadgeEligibility(userId: string): void {
    // Additional badge checks can be implemented here
  }

  // Leaderboard Management
  private updateLeaderboards(): void {
    this.leaderboards.forEach(leaderboard => {
      const participants: LeaderboardEntry[] = [];

      this.users.forEach(user => {
        participants.push({
          userId: user.userId,
          userName: user.userName,
          userAvatar: user.userAvatar,
          rank: 0,
          points: this.getLeaderboardPoints(user, leaderboard),
          level: user.level,
          achievements: user.achievements.length,
          badges: user.badges.length,
          streak: user.currentStreak,
          lastActivity: user.lastActivity,
          change: 'stable',
          changeAmount: 0
        });
      });

      // Sort by points (descending)
      participants.sort((a, b) => b.points - a.points);

      // Assign ranks
      participants.forEach((participant, index) => {
        participant.rank = index + 1;
      });

      leaderboard.participants = participants;
      leaderboard.lastUpdated = Date.now();
    });
  }

  private getLeaderboardPoints(user: UserGamification, leaderboard: Leaderboard): number {
    switch (leaderboard.timeFrame) {
      case 'weekly':
        return user.weeklyPoints;
      case 'monthly':
        return user.monthlyPoints;
      case 'yearly':
        return user.yearlyPoints;
      default:
        return user.totalPoints;
    }
  }

  getLeaderboard(leaderboardId: string): Leaderboard | null {
    return this.leaderboards.find(l => l.id === leaderboardId) || null;
  }

  getUserRank(userId: string, leaderboardId: string): number {
    const leaderboard = this.getLeaderboard(leaderboardId);
    if (!leaderboard) return 0;

    const entry = leaderboard.participants.find(p => p.userId === userId);
    return entry?.rank || 0;
  }

  // Challenge System
  joinChallenge(userId: string, challengeId: string): boolean {
    const user = this.users.get(userId);
    const challenge = this.challenges.find(c => c.id === challengeId);
    
    if (!user || !challenge || !challenge.isActive) return false;

    const userChallenge: UserChallenge = {
      challengeId,
      title: challenge.title,
      progress: 0,
      criteria: challenge.criteria.map(c => ({ ...c })),
      startDate: challenge.startDate,
      endDate: challenge.endDate,
      status: 'active',
      rewards: challenge.rewards
    };

    user.challenges.push(userChallenge);
    challenge.participants++;
    this.saveData();
    return true;
  }

  updateChallengeProgress(userId: string, challengeId: string, progress: number): boolean {
    const user = this.users.get(userId);
    if (!user) return false;

    const userChallenge = user.challenges.find(c => c.challengeId === challengeId);
    if (!userChallenge || userChallenge.status !== 'active') return false;

    userChallenge.progress = progress;

    if (progress >= 100) {
      userChallenge.status = 'completed';
      userChallenge.completedAt = Date.now();
      
      // Award rewards
      userChallenge.rewards.forEach(reward => {
        if (reward.type === 'points') {
          this.awardPoints(userId, reward.value as number, `Challenge: ${userChallenge.title}`);
        }
      });
    }

    this.saveData();
    return true;
  }

  // Event Recording
  private recordEvent(userId: string, type: GamificationEvent['type'], data: any, points: number): void {
    const event: GamificationEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      data,
      timestamp: Date.now(),
      points
    };

    this.events.push(event);
  }

  getUserEvents(userId: string, limit: number = 20): GamificationEvent[] {
    return this.events
      .filter(e => e.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // Analytics
  getGamificationStats(): {
    totalUsers: number;
    totalPoints: number;
    totalAchievements: number;
    totalBadges: number;
    activeChallenges: number;
    topAchievement: Achievement;
    topBadge: Badge;
  } {
    const totalUsers = this.users.size;
    const totalPoints = Array.from(this.users.values()).reduce((sum, user) => sum + user.totalPoints, 0);
    const totalAchievements = Array.from(this.users.values()).reduce((sum, user) => sum + user.achievements.length, 0);
    const totalBadges = Array.from(this.users.values()).reduce((sum, user) => sum + user.badges.length, 0);
    const activeChallenges = this.challenges.filter(c => c.isActive).length;

    const topAchievement = this.achievements.reduce((top, current) => 
      current.globalEarnedCount > top.globalEarnedCount ? current : top
    );

    const badgeCounts = new Map<string, number>();
    this.users.forEach(user => {
      user.badges.forEach(badge => {
        badgeCounts.set(badge.id, (badgeCounts.get(badge.id) || 0) + 1);
      });
    });

    const topBadge = this.badges.reduce((top, current) => {
      const topCount = badgeCounts.get(top.id) || 0;
      const currentCount = badgeCounts.get(current.id) || 0;
      return currentCount > topCount ? current : top;
    });

    return {
      totalUsers,
      totalPoints,
      totalAchievements,
      totalBadges,
      activeChallenges,
      topAchievement,
      topBadge
    };
  }

  // Export data
  exportGamificationData(): string {
    return JSON.stringify({
      users: Object.fromEntries(this.users),
      achievements: this.achievements,
      badges: this.badges,
      leaderboards: this.leaderboards,
      challenges: this.challenges,
      events: this.events,
      stats: this.getGamificationStats(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }
}

// Create singleton instance
export const gamificationService = new GamificationService();

// Convenience functions
export const initializeUser = (userId: string, userName: string, userAvatar?: string) => {
  return gamificationService.initializeUser(userId, userName, userAvatar);
};

export const awardPoints = (userId: string, points: number, reason: string) => {
  return gamificationService.awardPoints(userId, points, reason);
};

export const getUser = (userId: string) => {
  return gamificationService.getUser(userId);
};

export const getLeaderboard = (leaderboardId: string) => {
  return gamificationService.getLeaderboard(leaderboardId);
};

export const joinChallenge = (userId: string, challengeId: string) => {
  return gamificationService.joinChallenge(userId, challengeId);
}; 