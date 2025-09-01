// Gamification 2.0 System
// World-Class LMS Feature Implementation

export interface GamificationProfile {
  userId: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  achievements: Achievement[];
  badges: Badge[];
  points: PointsSystem;
  quests: Quest[];
  storylines: Storyline[];
  socialRanking: SocialRanking;
  rewards: Reward[];
  statistics: GamificationStats;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'learning' | 'social' | 'skill' | 'streak' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  icon: string;
  unlockedAt?: Date;
  progress: number; // 0-100
  requirements: AchievementRequirement[];
  rewards: Reward[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementRequirement {
  type: 'course_completion' | 'streak' | 'points' | 'social' | 'skill' | 'time';
  target: number;
  current: number;
  description: string;
  metadata?: Record<string, any>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'expertise' | 'participation' | 'leadership' | 'innovation' | 'mentorship';
  icon: string;
  earnedAt?: Date;
  displayOrder: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: BadgeRequirement[];
}

export interface BadgeRequirement {
  type: 'skill_mastery' | 'course_count' | 'help_others' | 'content_creation' | 'consistency';
  target: number;
  current: number;
  description: string;
}

export interface PointsSystem {
  total: number;
  learning: number;
  social: number;
  skill: number;
  streak: number;
  bonus: number;
  multiplier: number;
  history: PointsTransaction[];
}

export interface PointsTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent' | 'bonus' | 'multiplier';
  source: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'story' | 'challenge';
  status: 'available' | 'active' | 'completed' | 'expired';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  rewards: QuestReward[];
  requirements: QuestRequirement[];
  timeLimit?: number; // minutes
  startedAt?: Date;
  completedAt?: Date;
  progress: number; // 0-100
  storylineId?: string;
}

export interface QuestRequirement {
  type: 'course_completion' | 'points_earned' | 'social_interaction' | 'skill_assessment' | 'time_spent';
  target: number;
  current: number;
  description: string;
}

export interface QuestReward {
  type: 'points' | 'badge' | 'achievement' | 'item' | 'experience';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Storyline {
  id: string;
  title: string;
  description: string;
  chapters: StorylineChapter[];
  currentChapter: number;
  status: 'locked' | 'active' | 'completed';
  requirements: StorylineRequirement[];
  rewards: StorylineReward[];
  theme: 'adventure' | 'mystery' | 'hero' | 'exploration' | 'mastery';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface StorylineChapter {
  id: string;
  title: string;
  description: string;
  quests: string[]; // Quest IDs
  requirements: ChapterRequirement[];
  rewards: ChapterReward[];
  narrative: string;
  choices: StorylineChoice[];
  status: 'locked' | 'active' | 'completed';
}

export interface StorylineChoice {
  id: string;
  text: string;
  consequences: ChoiceConsequence[];
  requirements: ChoiceRequirement[];
}

export interface ChoiceConsequence {
  type: 'points' | 'skill' | 'relationship' | 'story_progression';
  value: number | string;
  description: string;
}

export interface ChoiceRequirement {
  type: 'level' | 'skill' | 'achievement' | 'relationship';
  value: number | string;
}

export interface StorylineRequirement {
  type: 'level' | 'achievement' | 'skill' | 'quest_completion';
  target: number | string;
  description: string;
}

export interface StorylineReward {
  type: 'title' | 'badge' | 'points' | 'special_item' | 'story_progression';
  value: string | number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ChapterRequirement {
  type: 'quest_completion' | 'skill_level' | 'story_progression';
  target: number | string;
  description: string;
}

export interface ChapterReward {
  type: 'points' | 'badge' | 'story_progression' | 'special_item';
  value: number | string;
}

export interface SocialRanking {
  globalRank: number;
  categoryRank: number;
  category: 'learning' | 'social' | 'skill' | 'overall';
  points: number;
  level: number;
  achievements: number;
  badges: number;
  streak: number;
  lastUpdated: Date;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'points' | 'badge' | 'achievement' | 'item' | 'title' | 'special';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: Date;
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

export interface GamificationStats {
  totalCoursesCompleted: number;
  totalTimeSpent: number; // minutes
  currentStreak: number;
  longestStreak: number;
  totalPointsEarned: number;
  achievementsUnlocked: number;
  badgesEarned: number;
  questsCompleted: number;
  storylinesCompleted: number;
  socialInteractions: number;
  helpProvided: number;
  contentCreated: number;
  averageSessionDuration: number;
  consistencyScore: number; // 0-100
}

export interface TeamChallenge {
  id: string;
  title: string;
  description: string;
  type: 'course_completion' | 'skill_mastery' | 'content_creation' | 'social_engagement';
  teams: Team[];
  status: 'upcoming' | 'active' | 'completed';
  startDate: Date;
  endDate: Date;
  rewards: TeamReward[];
  leaderboard: TeamLeaderboardEntry[];
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  score: number;
  achievements: string[];
  rank: number;
  captain: string;
  created: Date;
}

export interface TeamMember {
  userId: string;
  username: string;
  avatar: string;
  contribution: number;
  role: 'captain' | 'member' | 'mentor';
  joinedAt: Date;
}

export interface TeamReward {
  type: 'points' | 'badge' | 'achievement' | 'special_item';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  distribution: 'equal' | 'proportional' | 'top_performers';
}

export interface TeamLeaderboardEntry {
  teamId: string;
  teamName: string;
  score: number;
  rank: number;
  achievements: number;
  members: number;
  lastActivity: Date;
}

export interface AchievementMarketplace {
  items: MarketplaceItem[];
  userInventory: InventoryItem[];
  transactions: MarketplaceTransaction[];
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'title' | 'special_item' | 'boost' | 'cosmetic';
  price: number;
  currency: 'points' | 'real_money' | 'achievement_tokens';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  seller: string;
  quantity: number;
  expiresAt?: Date;
  requirements: MarketplaceRequirement[];
}

export interface InventoryItem {
  id: string;
  itemId: string;
  name: string;
  type: 'badge' | 'title' | 'special_item' | 'boost' | 'cosmetic';
  quantity: number;
  acquiredAt: Date;
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

export interface MarketplaceTransaction {
  id: string;
  buyer: string;
  seller: string;
  itemId: string;
  price: number;
  currency: 'points' | 'real_money' | 'achievement_tokens';
  timestamp: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface MarketplaceRequirement {
  type: 'level' | 'achievement' | 'skill' | 'reputation';
  target: number | string;
  description: string;
}

export interface InteractiveJourneyMap {
  userId: string;
  currentLocation: JourneyLocation;
  visitedLocations: JourneyLocation[];
  unlockedPaths: JourneyPath[];
  milestones: JourneyMilestone[];
  companions: JourneyCompanion[];
  resources: JourneyResource[];
  discoveries: JourneyDiscovery[];
}

export interface JourneyLocation {
  id: string;
  name: string;
  description: string;
  type: 'starting_point' | 'skill_hub' | 'achievement_peak' | 'social_valley' | 'mastery_summit';
  coordinates: { x: number; y: number };
  requirements: LocationRequirement[];
  rewards: LocationReward[];
  connections: string[]; // Location IDs
  status: 'locked' | 'available' | 'visited' | 'mastered';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
}

export interface JourneyPath {
  id: string;
  fromLocation: string;
  toLocation: string;
  type: 'direct' | 'challenge' | 'social' | 'skill';
  requirements: PathRequirement[];
  rewards: PathReward[];
  status: 'locked' | 'available' | 'completed';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
}

export interface JourneyMilestone {
  id: string;
  name: string;
  description: string;
  type: 'skill_mastery' | 'achievement' | 'social' | 'story';
  location: string;
  requirements: MilestoneRequirement[];
  rewards: MilestoneReward[];
  status: 'locked' | 'available' | 'completed';
  completedAt?: Date;
}

export interface JourneyCompanion {
  id: string;
  name: string;
  type: 'mentor' | 'peer' | 'expert' | 'ai_assistant';
  avatar: string;
  skills: string[];
  personality: 'encouraging' | 'challenging' | 'supportive' | 'analytical';
  status: 'available' | 'active' | 'unlocked';
  relationship: number; // 0-100
  lastInteraction: Date;
}

export interface JourneyResource {
  id: string;
  name: string;
  type: 'tool' | 'guide' | 'boost' | 'special_item';
  description: string;
  location: string;
  requirements: ResourceRequirement[];
  effects: ResourceEffect[];
  status: 'locked' | 'available' | 'acquired';
}

export interface JourneyDiscovery {
  id: string;
  name: string;
  description: string;
  type: 'secret_achievement' | 'hidden_path' | 'rare_item' | 'special_encounter';
  location: string;
  discoveredAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  rewards: DiscoveryReward[];
}

export interface LocationRequirement {
  type: 'level' | 'achievement' | 'skill' | 'quest_completion';
  target: number | string;
  description: string;
}

export interface LocationReward {
  type: 'points' | 'badge' | 'achievement' | 'special_item';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface PathRequirement {
  type: 'skill_level' | 'achievement' | 'social_interaction' | 'time_investment';
  target: number;
  description: string;
}

export interface PathReward {
  type: 'points' | 'experience' | 'special_item' | 'story_progression';
  value: number | string;
}

export interface MilestoneRequirement {
  type: 'skill_mastery' | 'achievement' | 'social' | 'time';
  target: number | string;
  description: string;
}

export interface MilestoneReward {
  type: 'title' | 'badge' | 'points' | 'special_item';
  value: string | number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ResourceRequirement {
  type: 'level' | 'achievement' | 'skill' | 'discovery';
  target: number | string;
  description: string;
}

export interface ResourceEffect {
  type: 'boost' | 'multiplier' | 'unlock' | 'special';
  value: number | string;
  duration?: number; // minutes
  description: string;
}

export interface DiscoveryReward {
  type: 'points' | 'badge' | 'achievement' | 'special_item';
  value: number | string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export class AdvancedGamificationSystem {
  private profiles: Map<string, GamificationProfile> = new Map();
  private storylines: Map<string, Storyline> = new Map();
  private teamChallenges: Map<string, TeamChallenge> = new Map();
  private marketplace: AchievementMarketplace;
  private journeyMaps: Map<string, InteractiveJourneyMap> = new Map();

  constructor() {
    this.marketplace = {
      items: [],
      userInventory: [],
      transactions: [],
    };
    this.initializeDefaultContent();
  }

  private initializeDefaultContent() {
    // Initialize default storylines, achievements, and other content
    this.createDefaultStorylines();
    this.createDefaultAchievements();
    this.createDefaultBadges();
  }

  private createDefaultStorylines() {
    const adventureStoryline: Storyline = {
      id: 'adventure_beginner',
      title: 'The Learning Adventure',
      description: 'Embark on an epic journey of knowledge and discovery',
      chapters: [
        {
          id: 'chapter_1',
          title: 'The First Steps',
          description: 'Begin your learning journey',
          quests: ['quest_first_course', 'quest_first_achievement'],
          requirements: [],
          rewards: [{ type: 'points', value: 100 }],
          narrative: 'Welcome, young learner! Your adventure begins here...',
          choices: [
            {
              id: 'choice_1',
              text: 'Choose your learning path',
              consequences: [
                { type: 'points', value: 50, description: 'You gain 50 points for making a choice' }
              ],
              requirements: []
            }
          ],
          status: 'active'
        }
      ],
      currentChapter: 0,
      status: 'active',
      requirements: [],
      rewards: [{ type: 'title', value: 'Adventure Seeker' }],
      theme: 'adventure',
      difficulty: 'beginner'
    };

    this.storylines.set(adventureStoryline.id, adventureStoryline);
  }

  private createDefaultAchievements() {
    // This would be populated with default achievements
  }

  private createDefaultBadges() {
    // This would be populated with default badges
  }

  // Create or get gamification profile
  async createGamificationProfile(userId: string): Promise<GamificationProfile> {
    if (this.profiles.has(userId)) {
      return this.profiles.get(userId)!;
    }

    const profile: GamificationProfile = {
      userId,
      level: 1,
      experience: 0,
      experienceToNextLevel: 100,
      achievements: [],
      badges: [],
      points: {
        total: 0,
        learning: 0,
        social: 0,
        skill: 0,
        streak: 0,
        bonus: 0,
        multiplier: 1.0,
        history: []
      },
      quests: [],
      storylines: [],
      socialRanking: {
        globalRank: 0,
        categoryRank: 0,
        category: 'overall',
        points: 0,
        level: 1,
        achievements: 0,
        badges: 0,
        streak: 0,
        lastUpdated: new Date()
      },
      rewards: [],
      statistics: {
        totalCoursesCompleted: 0,
        totalTimeSpent: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalPointsEarned: 0,
        achievementsUnlocked: 0,
        badgesEarned: 0,
        questsCompleted: 0,
        storylinesCompleted: 0,
        socialInteractions: 0,
        helpProvided: 0,
        contentCreated: 0,
        averageSessionDuration: 0,
        consistencyScore: 0
      }
    };

    this.profiles.set(userId, profile);
    return profile;
  }

  // Award points for various activities
  async awardPoints(
    userId: string,
    amount: number,
    type: 'learning' | 'social' | 'skill' | 'streak' | 'bonus',
    source: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) {
      throw new Error('Gamification profile not found');
    }

    const transaction: PointsTransaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount * profile.points.multiplier,
      type: 'earned',
      source,
      timestamp: new Date(),
      metadata
    };

    profile.points.history.push(transaction);
    profile.points.total += transaction.amount;
    profile.points[type] += transaction.amount;

    // Check for level up
    await this.checkLevelUp(userId);

    // Check for achievements
    await this.checkAchievements(userId, type, amount);

    // Update social ranking
    await this.updateSocialRanking(userId);
  }

  private async checkLevelUp(userId: string): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    if (profile.experience >= profile.experienceToNextLevel) {
      profile.level++;
      profile.experience -= profile.experienceToNextLevel;
      profile.experienceToNextLevel = Math.floor(profile.experienceToNextLevel * 1.2);

      // Award level up rewards
      await this.awardLevelUpRewards(userId, profile.level);
    }
  }

  private async awardLevelUpRewards(userId: string, level: number): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    // Award points for level up
    const levelUpPoints = level * 100;
    await this.awardPoints(userId, levelUpPoints, 'bonus', 'level_up');

    // Check for level-based achievements
    await this.checkLevelBasedAchievements(userId, level);
  }

  private async checkLevelBasedAchievements(userId: string, level: number): Promise<void> {
    // Check for level-based achievements
    const levelAchievements = [
      { level: 5, id: 'level_5_master', name: 'Level 5 Master', points: 500 },
      { level: 10, id: 'level_10_expert', name: 'Level 10 Expert', points: 1000 },
      { level: 25, id: 'level_25_legend', name: 'Level 25 Legend', points: 2500 },
    ];

    for (const achievement of levelAchievements) {
      if (level >= achievement.level) {
        await this.unlockAchievement(userId, achievement.id, achievement.name, achievement.points);
      }
    }
  }

  // Unlock achievement
  async unlockAchievement(
    userId: string,
    achievementId: string,
    name: string,
    points: number
  ): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    // Check if already unlocked
    if (profile.achievements.some(a => a.id === achievementId)) {
      return;
    }

    const achievement: Achievement = {
      id: achievementId,
      name,
      description: `Achievement unlocked: ${name}`,
      category: 'learning',
      tier: 'bronze',
      points,
      icon: `achievement_${achievementId}`,
      unlockedAt: new Date(),
      progress: 100,
      requirements: [],
      rewards: [{ type: 'points', value: points, rarity: 'common' }],
      rarity: 'common'
    };

    profile.achievements.push(achievement);
    profile.statistics.achievementsUnlocked++;

    // Award points
    await this.awardPoints(userId, points, 'bonus', 'achievement_unlock');

    // Check for achievement-based achievements
    await this.checkAchievementBasedAchievements(userId);
  }

  private async checkAchievementBasedAchievements(userId: string): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    const achievementCount = profile.achievements.length;
    const achievementMilestones = [
      { count: 5, id: 'achievement_collector', name: 'Achievement Collector', points: 200 },
      { count: 10, id: 'achievement_hunter', name: 'Achievement Hunter', points: 500 },
      { count: 25, id: 'achievement_master', name: 'Achievement Master', points: 1000 },
    ];

    for (const milestone of achievementMilestones) {
      if (achievementCount >= milestone.count) {
        await this.unlockAchievement(userId, milestone.id, milestone.name, milestone.points);
      }
    }
  }

  // Create team challenge
  async createTeamChallenge(challenge: Omit<TeamChallenge, 'id'>): Promise<TeamChallenge> {
    const newChallenge: TeamChallenge = {
      ...challenge,
      id: `challenge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.teamChallenges.set(newChallenge.id, newChallenge);
    return newChallenge;
  }

  // Join team challenge
  async joinTeamChallenge(
    challengeId: string,
    userId: string,
    teamId: string
  ): Promise<void> {
    const challenge = this.teamChallenges.get(challengeId);
    if (!challenge) {
      throw new Error('Team challenge not found');
    }

    const team = challenge.teams.find(t => t.id === teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    // Add user to team
    const member: TeamMember = {
      userId,
      username: `User_${userId}`, // This would come from user profile
      avatar: `avatar_${userId}`,
      contribution: 0,
      role: 'member',
      joinedAt: new Date()
    };

    team.members.push(member);
  }

  // Update team challenge progress
  async updateTeamChallengeProgress(
    challengeId: string,
    teamId: string,
    userId: string,
    contribution: number
  ): Promise<void> {
    const challenge = this.teamChallenges.get(challengeId);
    if (!challenge) return;

    const team = challenge.teams.find(t => t.id === teamId);
    if (!team) return;

    const member = team.members.find(m => m.userId === userId);
    if (!member) return;

    member.contribution += contribution;
    team.score += contribution;

    // Update leaderboard
    this.updateTeamLeaderboard(challengeId);
  }

  private updateTeamLeaderboard(challengeId: string): void {
    const challenge = this.teamChallenges.get(challengeId);
    if (!challenge) return;

    challenge.leaderboard = challenge.teams
      .map(team => ({
        teamId: team.id,
        teamName: team.name,
        score: team.score,
        rank: 0,
        achievements: team.achievements.length,
        members: team.members.length,
        lastActivity: new Date()
      }))
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    // Update team ranks
    challenge.teams.forEach(team => {
      const leaderboardEntry = challenge.leaderboard.find(entry => entry.teamId === team.id);
      if (leaderboardEntry) {
        team.rank = leaderboardEntry.rank;
      }
    });
  }

  // Create interactive journey map
  async createJourneyMap(userId: string): Promise<InteractiveJourneyMap> {
    if (this.journeyMaps.has(userId)) {
      return this.journeyMaps.get(userId)!;
    }

    const journeyMap: InteractiveJourneyMap = {
      userId,
      currentLocation: {
        id: 'starting_point',
        name: 'Learning Base Camp',
        description: 'Your starting point in the learning journey',
        type: 'starting_point',
        coordinates: { x: 0, y: 0 },
        requirements: [],
        rewards: [],
        connections: ['skill_hub_1'],
        status: 'visited',
        difficulty: 'easy'
      },
      visitedLocations: [],
      unlockedPaths: [],
      milestones: [],
      companions: [],
      resources: [],
      discoveries: []
    };

    this.journeyMaps.set(userId, journeyMap);
    return journeyMap;
  }

  // Unlock new location in journey map
  async unlockLocation(userId: string, locationId: string): Promise<void> {
    const journeyMap = this.journeyMaps.get(userId);
    if (!journeyMap) return;

    // This would check requirements and unlock the location
    const location: JourneyLocation = {
      id: locationId,
      name: `Location ${locationId}`,
      description: `A new location in your journey`,
      type: 'skill_hub',
      coordinates: { x: Math.random() * 100, y: Math.random() * 100 },
      requirements: [],
      rewards: [],
      connections: [],
      status: 'available',
      difficulty: 'medium'
    };

    journeyMap.visitedLocations.push(location);
  }

  // Get gamification analytics
  async getGamificationAnalytics(userId: string): Promise<{
    profile: GamificationProfile;
    recentActivity: PointsTransaction[];
    upcomingQuests: Quest[];
    teamChallenges: TeamChallenge[];
    journeyProgress: InteractiveJourneyMap;
    recommendations: string[];
  }> {
    const profile = this.profiles.get(userId);
    if (!profile) {
      throw new Error('Gamification profile not found');
    }

    const journeyMap = this.journeyMaps.get(userId);
    if (!journeyMap) {
      throw new Error('Journey map not found');
    }

    const analytics = {
      profile,
      recentActivity: profile.points.history.slice(-10),
      upcomingQuests: profile.quests.filter(q => q.status === 'available'),
      teamChallenges: Array.from(this.teamChallenges.values()).filter(c => 
        c.status === 'active' && c.teams.some(t => t.members.some(m => m.userId === userId))
      ),
      journeyProgress: journeyMap,
      recommendations: await this.generateGamificationRecommendations(profile)
    };

    return analytics;
  }

  private async generateGamificationRecommendations(profile: GamificationProfile): Promise<string[]> {
    const recommendations: string[] = [];

    // Generate recommendations based on profile
    if (profile.level < 5) {
      recommendations.push('Complete more courses to level up faster');
    }

    if (profile.statistics.currentStreak < 3) {
      recommendations.push('Build a learning streak by studying daily');
    }

    if (profile.achievements.length < 5) {
      recommendations.push('Unlock more achievements to earn bonus points');
    }

    if (profile.statistics.socialInteractions < 10) {
      recommendations.push('Engage with other learners to earn social points');
    }

    return recommendations;
  }

  // Check for achievements based on activity
  private async checkAchievements(
    userId: string,
    activityType: string,
    amount: number
  ): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    // Check for points-based achievements
    if (profile.points.total >= 1000) {
      await this.unlockAchievement(userId, 'points_1000', 'Point Collector', 200);
    }

    if (profile.points.total >= 5000) {
      await this.unlockAchievement(userId, 'points_5000', 'Point Master', 500);
    }

    // Check for streak-based achievements
    if (profile.statistics.currentStreak >= 7) {
      await this.unlockAchievement(userId, 'streak_7', 'Week Warrior', 300);
    }

    if (profile.statistics.currentStreak >= 30) {
      await this.unlockAchievement(userId, 'streak_30', 'Monthly Master', 1000);
    }
  }

  // Update social ranking
  private async updateSocialRanking(userId: string): Promise<void> {
    const profile = this.profiles.get(userId);
    if (!profile) return;

    // This would integrate with a global ranking system
    profile.socialRanking.points = profile.points.total;
    profile.socialRanking.level = profile.level;
    profile.socialRanking.achievements = profile.achievements.length;
    profile.socialRanking.badges = profile.badges.length;
    profile.socialRanking.streak = profile.statistics.currentStreak;
    profile.socialRanking.lastUpdated = new Date();
  }
}

// Export singleton instance
export const advancedGamificationSystem = new AdvancedGamificationSystem();
