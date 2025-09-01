export interface Enterprise {
  id: string;
  name: string;
  description: string;
  industry: string;
  size: 'small' | 'medium' | 'large' | 'enterprise';
  subscriptionPlan: 'basic' | 'professional' | 'enterprise';
  settings: EnterpriseSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnterpriseSettings {
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    customDomain?: string;
  };
  features: {
    teamManagement: boolean;
    advancedAnalytics: boolean;
    whiteLabel: boolean;
    customIntegrations: boolean;
    sso: boolean;
  };
  limits: {
    maxUsers: number;
    maxCourses: number;
    maxStorage: number;
    maxApiCalls: number;
  };
}

export interface Team {
  id: string;
  enterpriseId: string;
  name: string;
  description: string;
  members: TeamMember[];
  permissions: TeamPermissions;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  userId: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  joinedAt: Date;
  lastActive: Date;
  permissions: string[];
}

export interface TeamPermissions {
  canCreateCourses: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canManageBilling: boolean;
  canInviteUsers: boolean;
}

export interface CorporateLearningPath {
  id: string;
  enterpriseId: string;
  name: string;
  description: string;
  targetRoles: string[];
  courses: CorporateCourse[];
  requirements: LearningRequirement[];
  estimatedDuration: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CorporateCourse {
  courseId: string;
  order: number;
  isRequired: boolean;
  estimatedDuration: number;
  prerequisites: string[];
}

export interface LearningRequirement {
  type: 'completion' | 'score' | 'time' | 'certification';
  target: number;
  description: string;
}

export interface EnterpriseAnalytics {
  id: string;
  enterpriseId: string;
  type: 'user_engagement' | 'course_completion' | 'skill_gaps' | 'roi' | 'compliance';
  data: Record<string, any>;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  createdAt: Date;
}

export interface ComplianceReport {
  id: string;
  enterpriseId: string;
  title: string;
  description: string;
  requirements: ComplianceRequirement[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface ComplianceRequirement {
  id: string;
  title: string;
  description: string;
  type: 'course_completion' | 'assessment' | 'certification' | 'documentation';
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface WhiteLabelConfig {
  id: string;
  enterpriseId: string;
  domain: string;
  branding: {
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
    customCss?: string;
  };
  features: {
    customDomain: boolean;
    customEmail: boolean;
    customSupport: boolean;
    removeBranding: boolean;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class EnterpriseService {
  private enterprises: Enterprise[] = [];
  private teams: Team[] = [];
  private corporateLearningPaths: CorporateLearningPath[] = [];
  private enterpriseAnalytics: EnterpriseAnalytics[] = [];
  private complianceReports: ComplianceReport[] = [];
  private whiteLabelConfigs: WhiteLabelConfig[] = [];

  constructor() {
    this.loadData();
  }

  // Enterprise Management
  async createEnterprise(enterprise: Omit<Enterprise, 'id' | 'createdAt' | 'updatedAt'>): Promise<Enterprise> {
    const newEnterprise: Enterprise = {
      ...enterprise,
      id: `enterprise_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.enterprises.push(newEnterprise);
    this.saveEnterprises();
    return newEnterprise;
  }

  async getEnterprise(enterpriseId: string): Promise<Enterprise | null> {
    return this.enterprises.find(e => e.id === enterpriseId) || null;
  }

  async updateEnterprise(enterpriseId: string, updates: Partial<Enterprise>): Promise<Enterprise | null> {
    const index = this.enterprises.findIndex(e => e.id === enterpriseId);
    if (index === -1) return null;

    this.enterprises[index] = {
      ...this.enterprises[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveEnterprises();
    return this.enterprises[index];
  }

  async getEnterprises(options?: {
    size?: Enterprise['size'];
    subscriptionPlan?: Enterprise['subscriptionPlan'];
    limit?: number;
  }): Promise<Enterprise[]> {
    let filtered = this.enterprises;

    if (options?.size) {
      filtered = filtered.filter(e => e.size === options.size);
    }

    if (options?.subscriptionPlan) {
      filtered = filtered.filter(e => e.subscriptionPlan === options.subscriptionPlan);
    }

    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  // Team Management
  async createTeam(team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    const newTeam: Team = {
      ...team,
      id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.teams.push(newTeam);
    this.saveTeams();
    return newTeam;
  }

  async getTeams(enterpriseId: string): Promise<Team[]> {
    return this.teams.filter(t => t.enterpriseId === enterpriseId);
  }

  async addTeamMember(teamId: string, member: Omit<TeamMember, 'joinedAt' | 'lastActive'>): Promise<Team | null> {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return null;

    const existingMember = team.members.find(m => m.userId === member.userId);
    if (existingMember) return team;

    const newMember: TeamMember = {
      ...member,
      joinedAt: new Date(),
      lastActive: new Date(),
    };

    team.members.push(newMember);
    team.updatedAt = new Date();
    this.saveTeams();
    return team;
  }

  async removeTeamMember(teamId: string, userId: string): Promise<Team | null> {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return null;

    const memberIndex = team.members.findIndex(m => m.userId === userId);
    if (memberIndex === -1) return null;

    team.members.splice(memberIndex, 1);
    team.updatedAt = new Date();
    this.saveTeams();
    return team;
  }

  async updateTeamMemberRole(teamId: string, userId: string, role: TeamMember['role']): Promise<Team | null> {
    const team = this.teams.find(t => t.id === teamId);
    if (!team) return null;

    const member = team.members.find(m => m.userId === userId);
    if (!member) return null;

    member.role = role;
    team.updatedAt = new Date();
    this.saveTeams();
    return team;
  }

  // Corporate Learning Paths
  async createCorporateLearningPath(path: Omit<CorporateLearningPath, 'id' | 'createdAt' | 'updatedAt'>): Promise<CorporateLearningPath> {
    const newPath: CorporateLearningPath = {
      ...path,
      id: `path_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.corporateLearningPaths.push(newPath);
    this.saveCorporateLearningPaths();
    return newPath;
  }

  async getCorporateLearningPaths(enterpriseId: string): Promise<CorporateLearningPath[]> {
    return this.corporateLearningPaths.filter(p => p.enterpriseId === enterpriseId);
  }

  async updateCorporateLearningPath(pathId: string, updates: Partial<CorporateLearningPath>): Promise<CorporateLearningPath | null> {
    const index = this.corporateLearningPaths.findIndex(p => p.id === pathId);
    if (index === -1) return null;

    this.corporateLearningPaths[index] = {
      ...this.corporateLearningPaths[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveCorporateLearningPaths();
    return this.corporateLearningPaths[index];
  }

  async assignLearningPathToTeam(pathId: string, teamId: string): Promise<boolean> {
    const path = this.corporateLearningPaths.find(p => p.id === pathId);
    const team = this.teams.find(t => t.id === teamId);
    
    if (!path || !team) return false;

    // This would typically involve creating assignments for team members
    // For now, we'll just return success
    return true;
  }

  // Enterprise Analytics
  async createEnterpriseAnalytics(analytics: Omit<EnterpriseAnalytics, 'id' | 'createdAt'>): Promise<EnterpriseAnalytics> {
    const newAnalytics: EnterpriseAnalytics = {
      ...analytics,
      id: `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    this.enterpriseAnalytics.push(newAnalytics);
    this.saveEnterpriseAnalytics();
    return newAnalytics;
  }

  async getEnterpriseAnalytics(enterpriseId: string, options?: {
    type?: EnterpriseAnalytics['type'];
    period?: EnterpriseAnalytics['period'];
    limit?: number;
  }): Promise<EnterpriseAnalytics[]> {
    let analytics = this.enterpriseAnalytics.filter(a => a.enterpriseId === enterpriseId);

    if (options?.type) {
      analytics = analytics.filter(a => a.type === options.type);
    }

    if (options?.period) {
      analytics = analytics.filter(a => a.period === options.period);
    }

    analytics.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options?.limit) {
      analytics = analytics.slice(0, options.limit);
    }

    return analytics;
  }

  // Compliance Reports
  async createComplianceReport(report: Omit<ComplianceReport, 'id' | 'createdAt'>): Promise<ComplianceReport> {
    const newReport: ComplianceReport = {
      ...report,
      id: `compliance_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    this.complianceReports.push(newReport);
    this.saveComplianceReports();
    return newReport;
  }

  async getComplianceReports(enterpriseId: string): Promise<ComplianceReport[]> {
    return this.complianceReports.filter(r => r.enterpriseId === enterpriseId);
  }

  async updateComplianceReport(reportId: string, updates: Partial<ComplianceReport>): Promise<ComplianceReport | null> {
    const index = this.complianceReports.findIndex(r => r.id === reportId);
    if (index === -1) return null;

    this.complianceReports[index] = {
      ...this.complianceReports[index],
      ...updates,
    };

    this.saveComplianceReports();
    return this.complianceReports[index];
  }

  async completeComplianceRequirement(reportId: string, requirementId: string): Promise<ComplianceReport | null> {
    const report = this.complianceReports.find(r => r.id === reportId);
    if (!report) return null;

    const requirement = report.requirements.find(req => req.id === requirementId);
    if (!requirement) return null;

    requirement.isCompleted = true;
    requirement.completedAt = new Date();

    // Check if all requirements are completed
    const allCompleted = report.requirements.every(req => req.isCompleted);
    if (allCompleted) {
      report.status = 'completed';
      report.completedAt = new Date();
    }

    this.saveComplianceReports();
    return report;
  }

  // White Label Configuration
  async createWhiteLabelConfig(config: Omit<WhiteLabelConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<WhiteLabelConfig> {
    const newConfig: WhiteLabelConfig = {
      ...config,
      id: `whitelabel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.whiteLabelConfigs.push(newConfig);
    this.saveWhiteLabelConfigs();
    return newConfig;
  }

  async getWhiteLabelConfig(enterpriseId: string): Promise<WhiteLabelConfig | null> {
    return this.whiteLabelConfigs.find(c => c.enterpriseId === enterpriseId) || null;
  }

  async updateWhiteLabelConfig(enterpriseId: string, updates: Partial<WhiteLabelConfig>): Promise<WhiteLabelConfig | null> {
    const index = this.whiteLabelConfigs.findIndex(c => c.enterpriseId === enterpriseId);
    if (index === -1) return null;

    this.whiteLabelConfigs[index] = {
      ...this.whiteLabelConfigs[index],
      ...updates,
      updatedAt: new Date(),
    };

    this.saveWhiteLabelConfigs();
    return this.whiteLabelConfigs[index];
  }

  // Advanced Analytics
  async generateEnterpriseReport(enterpriseId: string, reportType: string): Promise<{
    enterprise: Enterprise;
    teams: Team[];
    learningPaths: CorporateLearningPath[];
    analytics: EnterpriseAnalytics[];
    compliance: ComplianceReport[];
    summary: Record<string, any>;
  }> {
    const enterprise = await this.getEnterprise(enterpriseId);
    if (!enterprise) throw new Error('Enterprise not found');

    const teams = await this.getTeams(enterpriseId);
    const learningPaths = await this.getCorporateLearningPaths(enterpriseId);
    const analytics = await this.getEnterpriseAnalytics(enterpriseId);
    const compliance = await this.getComplianceReports(enterpriseId);

    const summary = {
      totalTeams: teams.length,
      totalMembers: teams.reduce((sum, team) => sum + team.members.length, 0),
      totalLearningPaths: learningPaths.length,
      activeLearningPaths: learningPaths.filter(p => p.isActive).length,
      totalAnalytics: analytics.length,
      complianceReports: compliance.length,
      completedCompliance: compliance.filter(r => r.status === 'completed').length,
    };

    return {
      enterprise,
      teams,
      learningPaths,
      analytics,
      compliance,
      summary,
    };
  }

  async getEnterpriseMetrics(enterpriseId: string): Promise<{
    userEngagement: number;
    courseCompletion: number;
    skillGaps: string[];
    roi: number;
    complianceRate: number;
  }> {
    // Simulate enterprise metrics calculation
    const analytics = await this.getEnterpriseAnalytics(enterpriseId);
    const compliance = await this.getComplianceReports(enterpriseId);

    const userEngagement = analytics.length > 0 ? 85 : 0;
    const courseCompletion = analytics.length > 0 ? 78 : 0;
    const skillGaps = ['Leadership', 'Technical Skills', 'Communication'];
    const roi = analytics.length > 0 ? 245 : 0;
    const complianceRate = compliance.length > 0 
      ? (compliance.filter(r => r.status === 'completed').length / compliance.length) * 100 
      : 0;

    return {
      userEngagement,
      courseCompletion,
      skillGaps,
      roi,
      complianceRate,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedEnterprises = localStorage.getItem('oponmeta_enterprise_enterprises');
      if (storedEnterprises) {
        this.enterprises = JSON.parse(storedEnterprises).map((e: any) => ({
          ...e,
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
        }));
      }

      const storedTeams = localStorage.getItem('oponmeta_enterprise_teams');
      if (storedTeams) {
        this.teams = JSON.parse(storedTeams).map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt),
          updatedAt: new Date(t.updatedAt),
          members: t.members.map((m: any) => ({
            ...m,
            joinedAt: new Date(m.joinedAt),
            lastActive: new Date(m.lastActive),
          })),
        }));
      }

      const storedCorporateLearningPaths = localStorage.getItem('oponmeta_enterprise_corporate_learning_paths');
      if (storedCorporateLearningPaths) {
        this.corporateLearningPaths = JSON.parse(storedCorporateLearningPaths).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));
      }

      const storedEnterpriseAnalytics = localStorage.getItem('oponmeta_enterprise_analytics');
      if (storedEnterpriseAnalytics) {
        this.enterpriseAnalytics = JSON.parse(storedEnterpriseAnalytics).map((a: any) => ({
          ...a,
          createdAt: new Date(a.createdAt),
        }));
      }

      const storedComplianceReports = localStorage.getItem('oponmeta_enterprise_compliance_reports');
      if (storedComplianceReports) {
        this.complianceReports = JSON.parse(storedComplianceReports).map((r: any) => ({
          ...r,
          dueDate: new Date(r.dueDate),
          completedAt: r.completedAt ? new Date(r.completedAt) : undefined,
          createdAt: new Date(r.createdAt),
          requirements: r.requirements.map((req: any) => ({
            ...req,
            completedAt: req.completedAt ? new Date(req.completedAt) : undefined,
          })),
        }));
      }

      const storedWhiteLabelConfigs = localStorage.getItem('oponmeta_enterprise_whitelabel_configs');
      if (storedWhiteLabelConfigs) {
        this.whiteLabelConfigs = JSON.parse(storedWhiteLabelConfigs).map((c: any) => ({
          ...c,
          createdAt: new Date(c.createdAt),
          updatedAt: new Date(c.updatedAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load enterprise data:', error);
    }
  }

  private saveEnterprises(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_enterprises', JSON.stringify(this.enterprises));
    } catch (error) {
      console.error('Failed to save enterprises:', error);
    }
  }

  private saveTeams(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_teams', JSON.stringify(this.teams));
    } catch (error) {
      console.error('Failed to save teams:', error);
    }
  }

  private saveCorporateLearningPaths(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_corporate_learning_paths', JSON.stringify(this.corporateLearningPaths));
    } catch (error) {
      console.error('Failed to save corporate learning paths:', error);
    }
  }

  private saveEnterpriseAnalytics(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_analytics', JSON.stringify(this.enterpriseAnalytics));
    } catch (error) {
      console.error('Failed to save enterprise analytics:', error);
    }
  }

  private saveComplianceReports(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_compliance_reports', JSON.stringify(this.complianceReports));
    } catch (error) {
      console.error('Failed to save compliance reports:', error);
    }
  }

  private saveWhiteLabelConfigs(): void {
    try {
      localStorage.setItem('oponmeta_enterprise_whitelabel_configs', JSON.stringify(this.whiteLabelConfigs));
    } catch (error) {
      console.error('Failed to save white label configs:', error);
    }
  }
}

// Create singleton instance
const enterpriseService = new EnterpriseService();

export { enterpriseService };
export default enterpriseService;
