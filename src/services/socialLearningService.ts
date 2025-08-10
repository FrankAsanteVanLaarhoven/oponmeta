export interface CommunityPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: 'discussion' | 'question' | 'resource' | 'achievement' | 'announcement';
  category: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  isLocked: boolean;
  viewCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  likes: number;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
}

export interface Discussion {
  id: string;
  title: string;
  description: string;
  category: string;
  posts: CommunityPost[];
  participants: string[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Mentorship {
  id: string;
  mentorId: string;
  menteeId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  subject: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  sessions: MentorshipSession[];
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorshipSession {
  id: string;
  mentorshipId: string;
  title: string;
  description: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  feedback?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  courseId?: string;
  members: StudyGroupMember[];
  maxMembers: number;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudyGroupMember {
  userId: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  lastActive: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  type: 'course_completion' | 'discussion_participation' | 'mentorship' | 'helpful_member' | 'streak';
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt: Date;
  metadata?: Record<string, any>;
}

class SocialLearningService {
  private posts: CommunityPost[] = [];
  private discussions: Discussion[] = [];
  private mentorships: Mentorship[] = [];
  private studyGroups: StudyGroup[] = [];
  private achievements: Achievement[] = [];

  constructor() {
    this.loadData();
  }

  // Community Posts
  async createPost(post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'createdAt' | 'updatedAt' | 'isPinned' | 'isLocked' | 'viewCount'>): Promise<CommunityPost> {
    const newPost: CommunityPost = {
      ...post,
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      likes: 0,
      comments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      isLocked: false,
      viewCount: 0,
    };

    this.posts.push(newPost);
    this.savePosts();
    return newPost;
  }

  async getPosts(options?: {
    category?: string;
    type?: CommunityPost['type'];
    userId?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'newest' | 'popular' | 'most_commented';
  }): Promise<CommunityPost[]> {
    let filtered = this.posts;

    if (options?.category) {
      filtered = filtered.filter(post => post.category === options.category);
    }

    if (options?.type) {
      filtered = filtered.filter(post => post.type === options.type);
    }

    if (options?.userId) {
      filtered = filtered.filter(post => post.userId === options.userId);
    }

    // Sort posts
    if (options?.sortBy) {
      switch (options.sortBy) {
        case 'newest':
          filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case 'popular':
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        case 'most_commented':
          filtered.sort((a, b) => b.comments.length - a.comments.length);
          break;
      }
    } else {
      filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    if (options?.offset) {
      filtered = filtered.slice(options.offset);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  async getPostById(postId: string): Promise<CommunityPost | null> {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.viewCount++;
      this.savePosts();
    }
    return post || null;
  }

  async updatePost(postId: string, updates: Partial<CommunityPost>): Promise<CommunityPost | null> {
    const index = this.posts.findIndex(p => p.id === postId);
    if (index === -1) return null;

    this.posts[index] = {
      ...this.posts[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.savePosts();
    return this.posts[index];
  }

  async deletePost(postId: string): Promise<boolean> {
    const index = this.posts.findIndex(p => p.id === postId);
    if (index === -1) return false;

    this.posts.splice(index, 1);
    this.savePosts();
    return true;
  }

  async likePost(postId: string, userId: string): Promise<CommunityPost | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    // Simple like implementation - in a real app, you'd track who liked what
    post.likes++;
    this.savePosts();
    return post;
  }

  async addComment(postId: string, comment: Omit<Comment, 'id' | 'likes' | 'replies' | 'createdAt' | 'updatedAt' | 'isEdited'>): Promise<Comment | null> {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return null;

    const newComment: Comment = {
      ...comment,
      id: `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      likes: 0,
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isEdited: false,
    };

    post.comments.push(newComment);
    this.savePosts();
    return newComment;
  }

  // Discussions
  async createDiscussion(discussion: Omit<Discussion, 'id' | 'posts' | 'participants' | 'createdAt' | 'updatedAt' | 'isActive'>): Promise<Discussion> {
    const newDiscussion: Discussion = {
      ...discussion,
      id: `discussion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      posts: [],
      participants: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    this.discussions.push(newDiscussion);
    this.saveDiscussions();
    return newDiscussion;
  }

  async getDiscussions(options?: {
    category?: string;
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Discussion[]> {
    let filtered = this.discussions;

    if (options?.category) {
      filtered = filtered.filter(d => d.category === options.category);
    }

    if (options?.isActive !== undefined) {
      filtered = filtered.filter(d => d.isActive === options.isActive);
    }

    filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    if (options?.offset) {
      filtered = filtered.slice(options.offset);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  // Mentorship
  async createMentorship(mentorship: Omit<Mentorship, 'id' | 'sessions' | 'createdAt' | 'updatedAt'>): Promise<Mentorship> {
    const newMentorship: Mentorship = {
      ...mentorship,
      id: `mentorship_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.mentorships.push(newMentorship);
    this.saveMentorships();
    return newMentorship;
  }

  async getMentorships(userId: string, role: 'mentor' | 'mentee'): Promise<Mentorship[]> {
    if (role === 'mentor') {
      return this.mentorships.filter(m => m.mentorId === userId);
    } else {
      return this.mentorships.filter(m => m.menteeId === userId);
    }
  }

  async updateMentorshipStatus(mentorshipId: string, status: Mentorship['status']): Promise<Mentorship | null> {
    const mentorship = this.mentorships.find(m => m.id === mentorshipId);
    if (!mentorship) return null;

    mentorship.status = status;
    mentorship.updatedAt = new Date();
    this.saveMentorships();
    return mentorship;
  }

  async addMentorshipSession(mentorshipId: string, session: Omit<MentorshipSession, 'id'>): Promise<MentorshipSession | null> {
    const mentorship = this.mentorships.find(m => m.id === mentorshipId);
    if (!mentorship) return null;

    const newSession: MentorshipSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    mentorship.sessions.push(newSession);
    this.saveMentorships();
    return newSession;
  }

  // Study Groups
  async createStudyGroup(group: Omit<StudyGroup, 'id' | 'members' | 'createdAt' | 'updatedAt'>): Promise<StudyGroup> {
    const newGroup: StudyGroup = {
      ...group,
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.studyGroups.push(newGroup);
    this.saveStudyGroups();
    return newGroup;
  }

  async joinStudyGroup(groupId: string, userId: string): Promise<StudyGroup | null> {
    const group = this.studyGroups.find(g => g.id === groupId);
    if (!group || group.members.length >= group.maxMembers) return null;

    const existingMember = group.members.find(m => m.userId === userId);
    if (existingMember) return group;

    const newMember: StudyGroupMember = {
      userId,
      role: 'member',
      joinedAt: new Date(),
      lastActive: new Date(),
    };

    group.members.push(newMember);
    group.updatedAt = new Date();
    this.saveStudyGroups();
    return group;
  }

  async leaveStudyGroup(groupId: string, userId: string): Promise<boolean> {
    const group = this.studyGroups.find(g => g.id === groupId);
    if (!group) return false;

    const memberIndex = group.members.findIndex(m => m.userId === userId);
    if (memberIndex === -1) return false;

    group.members.splice(memberIndex, 1);
    group.updatedAt = new Date();
    this.saveStudyGroups();
    return true;
  }

  async getStudyGroups(options?: {
    courseId?: string;
    isPrivate?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<StudyGroup[]> {
    let filtered = this.studyGroups;

    if (options?.courseId) {
      filtered = filtered.filter(g => g.courseId === options.courseId);
    }

    if (options?.isPrivate !== undefined) {
      filtered = filtered.filter(g => g.isPrivate === options.isPrivate);
    }

    filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    if (options?.offset) {
      filtered = filtered.slice(options.offset);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  // Achievements
  async unlockAchievement(achievement: Omit<Achievement, 'id' | 'unlockedAt'>): Promise<Achievement> {
    const newAchievement: Achievement = {
      ...achievement,
      id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      unlockedAt: new Date(),
    };

    this.achievements.push(newAchievement);
    this.saveAchievements();
    return newAchievement;
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.achievements.filter(a => a.userId === userId);
  }

  async getAchievementStats(userId: string): Promise<{
    totalAchievements: number;
    totalPoints: number;
    recentAchievements: Achievement[];
    achievementTypes: Record<string, number>;
  }> {
    const userAchievements = this.achievements.filter(a => a.userId === userId);
    const totalPoints = userAchievements.reduce((sum, a) => sum + a.points, 0);
    const recentAchievements = userAchievements
      .sort((a, b) => b.unlockedAt.getTime() - a.unlockedAt.getTime())
      .slice(0, 5);

    const achievementTypes = userAchievements.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAchievements: userAchievements.length,
      totalPoints,
      recentAchievements,
      achievementTypes,
    };
  }

  // Analytics
  async getCommunityAnalytics(): Promise<{
    totalPosts: number;
    totalDiscussions: number;
    totalMentorships: number;
    totalStudyGroups: number;
    activeUsers: number;
    popularCategories: Array<{ category: string; count: number }>;
  }> {
    const totalPosts = this.posts.length;
    const totalDiscussions = this.discussions.length;
    const totalMentorships = this.mentorships.length;
    const totalStudyGroups = this.studyGroups.length;

    const activeUsers = new Set([
      ...this.posts.map(p => p.userId),
      ...this.mentorships.map(m => m.mentorId),
      ...this.mentorships.map(m => m.menteeId),
      ...this.studyGroups.flatMap(g => g.members.map(m => m.userId)),
    ]).size;

    const categoryCounts = this.posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const popularCategories = Object.entries(categoryCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalPosts,
      totalDiscussions,
      totalMentorships,
      totalStudyGroups,
      activeUsers,
      popularCategories,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedPosts = localStorage.getItem('oponmeta_social_posts');
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
          comments: p.comments.map((c: any) => ({
            ...c,
            createdAt: new Date(c.createdAt),
            updatedAt: new Date(c.updatedAt),
            replies: c.replies.map((r: any) => ({
              ...r,
              createdAt: new Date(r.createdAt),
              updatedAt: new Date(r.updatedAt),
            })),
          })),
        }));
      }

      const storedDiscussions = localStorage.getItem('oponmeta_social_discussions');
      if (storedDiscussions) {
        this.discussions = JSON.parse(storedDiscussions).map((d: any) => ({
          ...d,
          createdAt: new Date(d.createdAt),
          updatedAt: new Date(d.updatedAt),
        }));
      }

      const storedMentorships = localStorage.getItem('oponmeta_social_mentorships');
      if (storedMentorships) {
        this.mentorships = JSON.parse(storedMentorships).map((m: any) => ({
          ...m,
          startDate: new Date(m.startDate),
          endDate: m.endDate ? new Date(m.endDate) : undefined,
          createdAt: new Date(m.createdAt),
          updatedAt: new Date(m.updatedAt),
          sessions: m.sessions.map((s: any) => ({
            ...s,
            scheduledAt: new Date(s.scheduledAt),
          })),
        }));
      }

      const storedStudyGroups = localStorage.getItem('oponmeta_social_study_groups');
      if (storedStudyGroups) {
        this.studyGroups = JSON.parse(storedStudyGroups).map((g: any) => ({
          ...g,
          createdAt: new Date(g.createdAt),
          updatedAt: new Date(g.updatedAt),
          members: g.members.map((m: any) => ({
            ...m,
            joinedAt: new Date(m.joinedAt),
            lastActive: new Date(m.lastActive),
          })),
        }));
      }

      const storedAchievements = localStorage.getItem('oponmeta_social_achievements');
      if (storedAchievements) {
        this.achievements = JSON.parse(storedAchievements).map((a: any) => ({
          ...a,
          unlockedAt: new Date(a.unlockedAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load social learning data:', error);
    }
  }

  private savePosts(): void {
    try {
      localStorage.setItem('oponmeta_social_posts', JSON.stringify(this.posts));
    } catch (error) {
      console.error('Failed to save posts:', error);
    }
  }

  private saveDiscussions(): void {
    try {
      localStorage.setItem('oponmeta_social_discussions', JSON.stringify(this.discussions));
    } catch (error) {
      console.error('Failed to save discussions:', error);
    }
  }

  private saveMentorships(): void {
    try {
      localStorage.setItem('oponmeta_social_mentorships', JSON.stringify(this.mentorships));
    } catch (error) {
      console.error('Failed to save mentorships:', error);
    }
  }

  private saveStudyGroups(): void {
    try {
      localStorage.setItem('oponmeta_social_study_groups', JSON.stringify(this.studyGroups));
    } catch (error) {
      console.error('Failed to save study groups:', error);
    }
  }

  private saveAchievements(): void {
    try {
      localStorage.setItem('oponmeta_social_achievements', JSON.stringify(this.achievements));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }
}

// Create singleton instance
const socialLearningService = new SocialLearningService();

export { socialLearningService };
export default socialLearningService;
