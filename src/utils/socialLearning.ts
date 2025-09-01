// Social Learning System - Group Learning & Collaboration Tools

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  courseId?: string;
  category: string;
  maxMembers: number;
  currentMembers: number;
  members: GroupMember[];
  admins: string[];
  isPublic: boolean;
  isActive: boolean;
  createdAt: number;
  lastActivity: number;
  settings: {
    allowInvites: boolean;
    requireApproval: boolean;
    maxGroupSize: number;
    meetingFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
    meetingDuration: number; // in minutes
    timezone: string;
  };
  tags: string[];
  achievements: GroupAchievement[];
}

export interface GroupMember {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'admin' | 'moderator' | 'member' | 'mentor';
  joinedAt: number;
  lastActive: number;
  contributionScore: number;
  expertise: string[];
  availability: {
    timezone: string;
    preferredTimes: string[];
    maxHoursPerWeek: number;
  };
  stats: {
    sessionsAttended: number;
    resourcesShared: number;
    questionsAnswered: number;
    mentoringHours: number;
  };
}

export interface GroupSession {
  id: string;
  groupId: string;
  title: string;
  description: string;
  type: 'study' | 'discussion' | 'review' | 'project' | 'mentoring';
  startTime: number;
  endTime: number;
  duration: number; // in minutes
  maxParticipants: number;
  participants: SessionParticipant[];
  materials: SessionMaterial[];
  agenda: SessionAgendaItem[];
  recording?: string;
  notes: SessionNote[];
  status: 'scheduled' | 'active' | 'completed' | 'cancelled';
  meetingLink?: string;
  platform: 'zoom' | 'teams' | 'discord' | 'custom';
}

export interface SessionParticipant {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'host' | 'participant' | 'observer';
  joinedAt?: number;
  leftAt?: number;
  participationScore: number;
  contributions: string[];
}

export interface SessionMaterial {
  id: string;
  title: string;
  type: 'document' | 'video' | 'presentation' | 'link' | 'quiz';
  url: string;
  uploadedBy: string;
  uploadedAt: number;
  description?: string;
}

export interface SessionAgendaItem {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  assignedTo?: string;
  status: 'pending' | 'in-progress' | 'completed';
  notes?: string;
}

export interface SessionNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: number;
  isPublic: boolean;
  tags: string[];
}

export interface PeerMentoring {
  id: string;
  mentorId: string;
  menteeId: string;
  courseId?: string;
  topic: string;
  status: 'requested' | 'accepted' | 'active' | 'completed' | 'cancelled';
  startDate: number;
  endDate?: number;
  sessions: MentoringSession[];
  goals: MentoringGoal[];
  feedback: MentoringFeedback[];
  rating?: number;
}

export interface MentoringSession {
  id: string;
  title: string;
  description: string;
  startTime: number;
  endTime: number;
  duration: number;
  notes: string;
  materials: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface MentoringGoal {
  id: string;
  title: string;
  description: string;
  targetDate: number;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number; // 0-100
  notes: string[];
}

export interface MentoringFeedback {
  id: string;
  fromId: string;
  toId: string;
  sessionId?: string;
  rating: number;
  comment: string;
  timestamp: number;
  category: 'communication' | 'knowledge' | 'patience' | 'effectiveness';
}

export interface CollaborativeProject {
  id: string;
  title: string;
  description: string;
  groupId: string;
  courseId?: string;
  members: ProjectMember[];
  tasks: ProjectTask[];
  milestones: ProjectMilestone[];
  files: ProjectFile[];
  discussions: ProjectDiscussion[];
  status: 'planning' | 'active' | 'review' | 'completed';
  startDate: number;
  dueDate: number;
  progress: number; // 0-100
}

export interface ProjectMember {
  userId: string;
  userName: string;
  role: 'lead' | 'member' | 'reviewer';
  responsibilities: string[];
  timeAllocation: number; // hours per week
  skills: string[];
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  assignedTo: string[];
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: number;
  dueDate: number;
  completedAt?: number;
  dependencies: string[]; // task IDs
  timeEstimate: number; // hours
  actualTime?: number;
  tags: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: number;
  status: 'pending' | 'completed';
  tasks: string[]; // task IDs
  deliverables: string[];
}

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: number;
  version: number;
  description?: string;
}

export interface ProjectDiscussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  replies: DiscussionReply[];
  tags: string[];
  isResolved: boolean;
}

export interface DiscussionReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  isSolution: boolean;
  upvotes: number;
}

export interface GroupAchievement {
  id: string;
  title: string;
  description: string;
  category: 'collaboration' | 'learning' | 'mentoring' | 'leadership';
  earnedAt: number;
  criteria: string[];
  icon: string;
  points: number;
}

class SocialLearningService {
  private studyGroups: StudyGroup[] = [];
  private groupSessions: GroupSession[] = [];
  private peerMentoring: PeerMentoring[] = [];
  private collaborativeProjects: CollaborativeProject[] = [];
  private userGroups: Map<string, string[]> = new Map(); // userId -> groupIds

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const groupsData = localStorage.getItem('platform_study_groups');
      const sessionsData = localStorage.getItem('platform_group_sessions');
      const mentoringData = localStorage.getItem('platform_peer_mentoring');
      const projectsData = localStorage.getItem('platform_collaborative_projects');
      const userGroupsData = localStorage.getItem('platform_user_groups');

      if (groupsData) this.studyGroups = JSON.parse(groupsData);
      if (sessionsData) this.groupSessions = JSON.parse(sessionsData);
      if (mentoringData) this.peerMentoring = JSON.parse(mentoringData);
      if (projectsData) this.collaborativeProjects = JSON.parse(projectsData);
      if (userGroupsData) this.userGroups = new Map(Object.entries(JSON.parse(userGroupsData)));
    } catch (error) {
      console.warn('Failed to load social learning data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('platform_study_groups', JSON.stringify(this.studyGroups));
      localStorage.setItem('platform_group_sessions', JSON.stringify(this.groupSessions));
      localStorage.setItem('platform_peer_mentoring', JSON.stringify(this.peerMentoring));
      localStorage.setItem('platform_collaborative_projects', JSON.stringify(this.collaborativeProjects));
      localStorage.setItem('platform_user_groups', JSON.stringify(Object.fromEntries(this.userGroups)));
    } catch (error) {
      console.warn('Failed to save social learning data:', error);
    }
  }

  // Study Group Management
  createStudyGroup(group: Omit<StudyGroup, 'id' | 'currentMembers' | 'members' | 'createdAt' | 'lastActivity' | 'achievements'>): StudyGroup {
    const newGroup: StudyGroup = {
      ...group,
      id: `group_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      currentMembers: 1,
      members: [{
        userId: group.admins[0],
        userName: 'Group Creator',
        role: 'admin',
        joinedAt: Date.now(),
        lastActive: Date.now(),
        contributionScore: 0,
        expertise: [],
        availability: {
          timezone: 'UTC',
          preferredTimes: [],
          maxHoursPerWeek: 10
        },
        stats: {
          sessionsAttended: 0,
          resourcesShared: 0,
          questionsAnswered: 0,
          mentoringHours: 0
        }
      }],
      createdAt: Date.now(),
      lastActivity: Date.now(),
      achievements: []
    };

    this.studyGroups.push(newGroup);
    this.addUserToGroup(group.admins[0], newGroup.id);
    this.saveData();
    return newGroup;
  }

  joinStudyGroup(userId: string, groupId: string, userInfo: { userName: string; userAvatar?: string; expertise: string[] }): boolean {
    const group = this.studyGroups.find(g => g.id === groupId);
    if (!group || group.currentMembers >= group.maxMembers) return false;

    const member: GroupMember = {
      userId,
      userName: userInfo.userName,
      userAvatar: userInfo.userAvatar,
      role: 'member',
      joinedAt: Date.now(),
      lastActive: Date.now(),
      contributionScore: 0,
      expertise: userInfo.expertise,
      availability: {
        timezone: 'UTC',
        preferredTimes: [],
        maxHoursPerWeek: 5
      },
      stats: {
        sessionsAttended: 0,
        resourcesShared: 0,
        questionsAnswered: 0,
        mentoringHours: 0
      }
    };

    group.members.push(member);
    group.currentMembers++;
    group.lastActivity = Date.now();
    this.addUserToGroup(userId, groupId);
    this.saveData();
    return true;
  }

  leaveStudyGroup(userId: string, groupId: string): boolean {
    const group = this.studyGroups.find(g => g.id === groupId);
    if (!group) return false;

    const memberIndex = group.members.findIndex(m => m.userId === userId);
    if (memberIndex === -1) return false;

    group.members.splice(memberIndex, 1);
    group.currentMembers--;
    group.lastActivity = Date.now();
    this.removeUserFromGroup(userId, groupId);
    this.saveData();
    return true;
  }

  private addUserToGroup(userId: string, groupId: string): void {
    const userGroups = this.userGroups.get(userId) || [];
    if (!userGroups.includes(groupId)) {
      userGroups.push(groupId);
      this.userGroups.set(userId, userGroups);
    }
  }

  private removeUserFromGroup(userId: string, groupId: string): void {
    const userGroups = this.userGroups.get(userId) || [];
    const index = userGroups.indexOf(groupId);
    if (index > -1) {
      userGroups.splice(index, 1);
      this.userGroups.set(userId, userGroups);
    }
  }

  // Group Session Management
  createGroupSession(session: Omit<GroupSession, 'id' | 'participants' | 'notes' | 'status'>): GroupSession {
    const newSession: GroupSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participants: [],
      notes: [],
      status: 'scheduled'
    };

    this.groupSessions.push(newSession);
    this.saveData();
    return newSession;
  }

  joinSession(userId: string, sessionId: string, userInfo: { userName: string; userAvatar?: string; role?: 'host' | 'participant' | 'observer' }): boolean {
    const session = this.groupSessions.find(s => s.id === sessionId);
    if (!session || session.participants.length >= session.maxParticipants) return false;

    const participant: SessionParticipant = {
      userId,
      userName: userInfo.userName,
      userAvatar: userInfo.userAvatar,
      role: userInfo.role || 'participant',
      joinedAt: Date.now(),
      participationScore: 0,
      contributions: []
    };

    session.participants.push(participant);
    this.saveData();
    return true;
  }

  addSessionNote(sessionId: string, note: Omit<SessionNote, 'id' | 'timestamp'>): SessionNote {
    const session = this.groupSessions.find(s => s.id === sessionId);
    if (!session) throw new Error('Session not found');

    const newNote: SessionNote = {
      ...note,
      id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now()
    };

    session.notes.push(newNote);
    this.saveData();
    return newNote;
  }

  // Peer Mentoring
  requestMentoring(request: Omit<PeerMentoring, 'id' | 'status' | 'sessions' | 'goals' | 'feedback'>): PeerMentoring {
    const newMentoring: PeerMentoring = {
      ...request,
      id: `mentoring_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'requested',
      sessions: [],
      goals: [],
      feedback: []
    };

    this.peerMentoring.push(newMentoring);
    this.saveData();
    return newMentoring;
  }

  acceptMentoringRequest(mentoringId: string): boolean {
    const mentoring = this.peerMentoring.find(m => m.id === mentoringId);
    if (!mentoring || mentoring.status !== 'requested') return false;

    mentoring.status = 'accepted';
    this.saveData();
    return true;
  }

  scheduleMentoringSession(mentoringId: string, session: Omit<MentoringSession, 'id' | 'status'>): MentoringSession {
    const mentoring = this.peerMentoring.find(m => m.id === mentoringId);
    if (!mentoring) throw new Error('Mentoring relationship not found');

    const newSession: MentoringSession = {
      ...session,
      id: `mentor_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'scheduled'
    };

    mentoring.sessions.push(newSession);
    this.saveData();
    return newSession;
  }

  addMentoringGoal(mentoringId: string, goal: Omit<MentoringGoal, 'id' | 'status' | 'progress' | 'notes'>): MentoringGoal {
    const mentoring = this.peerMentoring.find(m => m.id === mentoringId);
    if (!mentoring) throw new Error('Mentoring relationship not found');

    const newGoal: MentoringGoal = {
      ...goal,
      id: `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      progress: 0,
      notes: []
    };

    mentoring.goals.push(newGoal);
    this.saveData();
    return newGoal;
  }

  // Collaborative Projects
  createCollaborativeProject(project: Omit<CollaborativeProject, 'id' | 'progress' | 'files' | 'discussions'>): CollaborativeProject {
    const newProject: CollaborativeProject = {
      ...project,
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      progress: 0,
      files: [],
      discussions: []
    };

    this.collaborativeProjects.push(newProject);
    this.saveData();
    return newProject;
  }

  addProjectTask(projectId: string, task: Omit<ProjectTask, 'id' | 'status' | 'completedAt' | 'actualTime'>): ProjectTask {
    const project = this.collaborativeProjects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const newTask: ProjectTask = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'todo'
    };

    project.tasks.push(newTask);
    this.updateProjectProgress(projectId);
    this.saveData();
    return newTask;
  }

  updateTaskStatus(projectId: string, taskId: string, status: ProjectTask['status'], actualTime?: number): boolean {
    const project = this.collaborativeProjects.find(p => p.id === projectId);
    if (!project) return false;

    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return false;

    task.status = status;
    if (status === 'completed') {
      task.completedAt = Date.now();
    }
    if (actualTime) {
      task.actualTime = actualTime;
    }

    this.updateProjectProgress(projectId);
    this.saveData();
    return true;
  }

  private updateProjectProgress(projectId: string): void {
    const project = this.collaborativeProjects.find(p => p.id === projectId);
    if (!project) return;

    const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
    const totalTasks = project.tasks.length;
    
    project.progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  }

  addProjectDiscussion(projectId: string, discussion: Omit<ProjectDiscussion, 'id' | 'createdAt' | 'replies' | 'isResolved'>): ProjectDiscussion {
    const project = this.collaborativeProjects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const newDiscussion: ProjectDiscussion = {
      ...discussion,
      id: `discussion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      replies: [],
      isResolved: false
    };

    project.discussions.push(newDiscussion);
    this.saveData();
    return newDiscussion;
  }

  addDiscussionReply(projectId: string, discussionId: string, reply: Omit<DiscussionReply, 'id' | 'createdAt' | 'upvotes'>): DiscussionReply {
    const project = this.collaborativeProjects.find(p => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const discussion = project.discussions.find(d => d.id === discussionId);
    if (!discussion) throw new Error('Discussion not found');

    const newReply: DiscussionReply = {
      ...reply,
      id: `reply_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      upvotes: 0
    };

    discussion.replies.push(newReply);
    this.saveData();
    return newReply;
  }

  // Analytics and Insights
  getUserGroups(userId: string): StudyGroup[] {
    const userGroupIds = this.userGroups.get(userId) || [];
    return this.studyGroups.filter(g => userGroupIds.includes(g.id));
  }

  getUserMentoring(userId: string): PeerMentoring[] {
    return this.peerMentoring.filter(m => m.mentorId === userId || m.menteeId === userId);
  }

  getUserProjects(userId: string): CollaborativeProject[] {
    return this.collaborativeProjects.filter(p => 
      p.members.some(m => m.userId === userId)
    );
  }

  getGroupSessions(groupId: string): GroupSession[] {
    return this.groupSessions.filter(s => s.groupId === groupId);
  }

  getUpcomingSessions(userId: string): GroupSession[] {
    const userGroupIds = this.userGroups.get(userId) || [];
    const now = Date.now();
    
    return this.groupSessions.filter(s => 
      userGroupIds.includes(s.groupId) && 
      s.startTime > now && 
      s.status === 'scheduled'
    );
  }

  getRecommendedGroups(userId: string, userInterests: string[]): StudyGroup[] {
    const userGroupIds = this.userGroups.get(userId) || [];
    
    return this.studyGroups
      .filter(g => !userGroupIds.includes(g.id) && g.isPublic && g.isActive)
      .map(group => ({
        ...group,
        matchScore: this.calculateGroupMatchScore(group, userInterests)
      }))
      .sort((a, b) => (b as any).matchScore - (a as any).matchScore)
      .slice(0, 5)
      .map(group => {
        const { matchScore, ...groupData } = group as any;
        return groupData;
      });
  }

  private calculateGroupMatchScore(group: StudyGroup, userInterests: string[]): number {
    let score = 0;
    
    // Category match
    if (userInterests.includes(group.category)) score += 0.3;
    
    // Tag matches
    const tagMatches = group.tags.filter(tag => userInterests.includes(tag)).length;
    score += (tagMatches / Math.max(group.tags.length, 1)) * 0.4;
    
    // Activity level
    const daysSinceActivity = (Date.now() - group.lastActivity) / (24 * 60 * 60 * 1000);
    if (daysSinceActivity < 7) score += 0.2;
    else if (daysSinceActivity < 30) score += 0.1;
    
    // Group size preference
    if (group.currentMembers < group.maxMembers * 0.8) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  // Achievement System
  awardGroupAchievement(groupId: string, achievement: Omit<GroupAchievement, 'id' | 'earnedAt'>): GroupAchievement {
    const group = this.studyGroups.find(g => g.id === groupId);
    if (!group) throw new Error('Group not found');

    const newAchievement: GroupAchievement = {
      ...achievement,
      id: `achievement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      earnedAt: Date.now()
    };

    group.achievements.push(newAchievement);
    this.saveData();
    return newAchievement;
  }

  // Export data
  exportSocialLearningData(): string {
    return JSON.stringify({
      studyGroups: this.studyGroups,
      groupSessions: this.groupSessions,
      peerMentoring: this.peerMentoring,
      collaborativeProjects: this.collaborativeProjects,
      userGroups: Object.fromEntries(this.userGroups),
      exportDate: new Date().toISOString()
    }, null, 2);
  }
}

// Create singleton instance
export const socialLearningService = new SocialLearningService();

// Convenience functions
export const createStudyGroup = (group: Omit<StudyGroup, 'id' | 'currentMembers' | 'members' | 'createdAt' | 'lastActivity' | 'achievements'>) => {
  return socialLearningService.createStudyGroup(group);
};

export const joinStudyGroup = (userId: string, groupId: string, userInfo: { userName: string; userAvatar?: string; expertise: string[] }) => {
  return socialLearningService.joinStudyGroup(userId, groupId, userInfo);
};

export const getUserGroups = (userId: string) => {
  return socialLearningService.getUserGroups(userId);
};

export const getRecommendedGroups = (userId: string, userInterests: string[]) => {
  return socialLearningService.getRecommendedGroups(userId, userInterests);
};

export const createGroupSession = (session: Omit<GroupSession, 'id' | 'participants' | 'notes' | 'status'>) => {
  return socialLearningService.createGroupSession(session);
};

export const requestMentoring = (request: Omit<PeerMentoring, 'id' | 'status' | 'sessions' | 'goals' | 'feedback'>) => {
  return socialLearningService.requestMentoring(request);
}; 