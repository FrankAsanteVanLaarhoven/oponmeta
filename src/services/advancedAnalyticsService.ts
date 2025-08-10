export interface PredictiveAnalytics {
  id: string;
  userId?: string;
  enterpriseId?: string;
  type: 'course_completion' | 'dropout_risk' | 'skill_gaps' | 'career_progression' | 'engagement_prediction';
  prediction: number;
  confidence: number;
  factors: PredictionFactor[];
  recommendations: string[];
  createdAt: Date;
  expiresAt: Date;
}

export interface PredictionFactor {
  name: string;
  weight: number;
  value: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface LearningOutcome {
  id: string;
  userId: string;
  courseId: string;
  outcomeType: 'knowledge_retention' | 'skill_application' | 'behavior_change' | 'performance_improvement';
  score: number;
  assessmentDate: Date;
  nextAssessmentDate: Date;
  metrics: LearningMetric[];
  createdAt: Date;
}

export interface LearningMetric {
  name: string;
  value: number;
  unit: string;
  target: number;
  achieved: boolean;
}

export interface ROITracking {
  id: string;
  enterpriseId: string;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  endDate: Date;
  investment: number;
  returns: number;
  roi: number;
  breakdown: ROIBreakdown;
  createdAt: Date;
}

export interface ROIBreakdown {
  courseDevelopment: number;
  platformCosts: number;
  trainingTime: number;
  productivityGains: number;
  retentionImprovement: number;
  complianceSavings: number;
}

export interface DataVisualization {
  id: string;
  title: string;
  type: 'chart' | 'dashboard' | 'report';
  data: any;
  config: VisualizationConfig;
  filters: VisualizationFilter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VisualizationConfig {
  chartType: 'line' | 'bar' | 'pie' | 'scatter' | 'heatmap';
  colors: string[];
  dimensions: string[];
  metrics: string[];
  timeRange?: {
    start: Date;
    end: Date;
  };
}

export interface VisualizationFilter {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between';
  value: any;
}

export interface AdvancedReport {
  id: string;
  title: string;
  description: string;
  type: 'executive' | 'operational' | 'compliance' | 'custom';
  sections: ReportSection[];
  schedule?: ReportSchedule;
  recipients: string[];
  createdAt: Date;
  lastGenerated?: Date;
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'metric' | 'text';
  data: any;
  config?: any;
}

export interface ReportSchedule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dayOfWeek?: number;
  dayOfMonth?: number;
  time: string;
  timezone: string;
}

export interface UserBehaviorAnalysis {
  id: string;
  userId: string;
  sessionId: string;
  behaviors: UserBehavior[];
  patterns: BehaviorPattern[];
  insights: BehaviorInsight[];
  createdAt: Date;
}

export interface UserBehavior {
  action: string;
  timestamp: Date;
  context: Record<string, any>;
  duration?: number;
  outcome?: string;
}

export interface BehaviorPattern {
  pattern: string;
  frequency: number;
  confidence: number;
  description: string;
}

export interface BehaviorInsight {
  type: 'engagement' | 'learning_style' | 'preference' | 'challenge';
  insight: string;
  confidence: number;
  recommendations: string[];
}

class AdvancedAnalyticsService {
  private predictiveAnalytics: PredictiveAnalytics[] = [];
  private learningOutcomes: LearningOutcome[] = [];
  private roiTracking: ROITracking[] = [];
  private dataVisualizations: DataVisualization[] = [];
  private advancedReports: AdvancedReport[] = [];
  private userBehaviorAnalysis: UserBehaviorAnalysis[] = [];

  constructor() {
    this.loadData();
  }

  // Predictive Analytics
  async generatePrediction(userId: string, type: PredictiveAnalytics['type']): Promise<PredictiveAnalytics> {
    // Simulate predictive analytics generation
    const prediction = Math.random() * 100;
    const confidence = 0.7 + Math.random() * 0.3;
    
    const factors: PredictionFactor[] = [
      {
        name: 'Course Engagement',
        weight: 0.3,
        value: Math.random() * 100,
        impact: 'positive',
      },
      {
        name: 'Previous Performance',
        weight: 0.25,
        value: Math.random() * 100,
        impact: 'positive',
      },
      {
        name: 'Time Spent',
        weight: 0.2,
        value: Math.random() * 100,
        impact: 'positive',
      },
      {
        name: 'Social Interaction',
        weight: 0.15,
        value: Math.random() * 100,
        impact: 'positive',
      },
      {
        name: 'Technical Difficulty',
        weight: 0.1,
        value: Math.random() * 100,
        impact: 'negative',
      },
    ];

    const recommendations = this.generateRecommendations(type, prediction, factors);

    const newPrediction: PredictiveAnalytics = {
      id: `prediction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      prediction,
      confidence,
      factors,
      recommendations,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };

    this.predictiveAnalytics.push(newPrediction);
    this.savePredictiveAnalytics();
    return newPrediction;
  }

  async getPredictions(userId: string, type?: PredictiveAnalytics['type']): Promise<PredictiveAnalytics[]> {
    let predictions = this.predictiveAnalytics.filter(p => p.userId === userId && p.expiresAt > new Date());

    if (type) {
      predictions = predictions.filter(p => p.type === type);
    }

    return predictions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  private generateRecommendations(type: PredictiveAnalytics['type'], prediction: number, factors: PredictionFactor[]): string[] {
    const recommendations: string[] = [];

    switch (type) {
      case 'course_completion':
        if (prediction < 50) {
          recommendations.push('Consider additional study time');
          recommendations.push('Seek help from instructors or peers');
          recommendations.push('Review prerequisite materials');
        } else if (prediction < 75) {
          recommendations.push('Maintain current study pace');
          recommendations.push('Focus on weak areas');
        } else {
          recommendations.push('Excellent progress! Consider advanced topics');
        }
        break;
      case 'dropout_risk':
        if (prediction > 70) {
          recommendations.push('Schedule regular check-ins');
          recommendations.push('Provide additional support resources');
          recommendations.push('Consider course difficulty adjustment');
        }
        break;
      case 'skill_gaps':
        recommendations.push('Focus on identified skill gaps');
        recommendations.push('Consider targeted training programs');
        break;
    }

    return recommendations;
  }

  // Learning Outcomes
  async trackLearningOutcome(outcome: Omit<LearningOutcome, 'id' | 'createdAt'>): Promise<LearningOutcome> {
    const newOutcome: LearningOutcome = {
      ...outcome,
      id: `outcome_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    this.learningOutcomes.push(newOutcome);
    this.saveLearningOutcomes();
    return newOutcome;
  }

  async getLearningOutcomes(userId: string, courseId?: string): Promise<LearningOutcome[]> {
    let outcomes = this.learningOutcomes.filter(o => o.userId === userId);

    if (courseId) {
      outcomes = outcomes.filter(o => o.courseId === courseId);
    }

    return outcomes.sort((a, b) => b.assessmentDate.getTime() - a.assessmentDate.getTime());
  }

  async analyzeLearningTrends(userId: string): Promise<{
    overallProgress: number;
    improvementRate: number;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  }> {
    const outcomes = await this.getLearningOutcomes(userId);
    
    if (outcomes.length === 0) {
      return {
        overallProgress: 0,
        improvementRate: 0,
        strengths: [],
        weaknesses: [],
        recommendations: ['Start tracking learning outcomes'],
      };
    }

    const overallProgress = outcomes.reduce((sum, o) => sum + o.score, 0) / outcomes.length;
    const improvementRate = this.calculateImprovementRate(outcomes);
    const strengths = this.identifyStrengths(outcomes);
    const weaknesses = this.identifyWeaknesses(outcomes);
    const recommendations = this.generateLearningRecommendations(outcomes);

    return {
      overallProgress,
      improvementRate,
      strengths,
      weaknesses,
      recommendations,
    };
  }

  private calculateImprovementRate(outcomes: LearningOutcome[]): number {
    if (outcomes.length < 2) return 0;

    const sorted = outcomes.sort((a, b) => a.assessmentDate.getTime() - b.assessmentDate.getTime());
    const first = sorted[0].score;
    const last = sorted[sorted.length - 1].score;

    return ((last - first) / first) * 100;
  }

  private identifyStrengths(outcomes: LearningOutcome[]): string[] {
    const strengths: string[] = [];
    const highScores = outcomes.filter(o => o.score >= 80);

    if (highScores.length > 0) {
      strengths.push('Consistent high performance');
    }

    const recentImprovements = outcomes.slice(-3).filter((o, i, arr) => {
      if (i === 0) return true;
      return o.score > arr[i - 1].score;
    });

    if (recentImprovements.length >= 2) {
      strengths.push('Recent improvement trend');
    }

    return strengths;
  }

  private identifyWeaknesses(outcomes: LearningOutcome[]): string[] {
    const weaknesses: string[] = [];
    const lowScores = outcomes.filter(o => o.score < 60);

    if (lowScores.length > 0) {
      weaknesses.push('Areas need improvement');
    }

    const decliningScores = outcomes.slice(-3).filter((o, i, arr) => {
      if (i === 0) return true;
      return o.score < arr[i - 1].score;
    });

    if (decliningScores.length >= 2) {
      weaknesses.push('Declining performance trend');
    }

    return weaknesses;
  }

  private generateLearningRecommendations(outcomes: LearningOutcome[]): string[] {
    const recommendations: string[] = [];
    const averageScore = outcomes.reduce((sum, o) => sum + o.score, 0) / outcomes.length;

    if (averageScore < 70) {
      recommendations.push('Focus on foundational concepts');
      recommendations.push('Seek additional support resources');
    }

    if (outcomes.length < 3) {
      recommendations.push('Continue tracking learning outcomes');
    }

    return recommendations;
  }

  // ROI Tracking
  async trackROI(roi: Omit<ROITracking, 'id' | 'roi' | 'createdAt'>): Promise<ROITracking> {
    const roiValue = ((roi.returns - roi.investment) / roi.investment) * 100;

    const newROI: ROITracking = {
      ...roi,
      id: `roi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      roi: roiValue,
      createdAt: new Date(),
    };

    this.roiTracking.push(newROI);
    this.saveROITracking();
    return newROI;
  }

  async getROITracking(enterpriseId: string, period?: ROITracking['period']): Promise<ROITracking[]> {
    let tracking = this.roiTracking.filter(r => r.enterpriseId === enterpriseId);

    if (period) {
      tracking = tracking.filter(r => r.period === period);
    }

    return tracking.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
  }

  async calculateROITrends(enterpriseId: string): Promise<{
    averageROI: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    projections: number[];
  }> {
    const tracking = await this.getROITracking(enterpriseId);
    
    if (tracking.length === 0) {
      return {
        averageROI: 0,
        trend: 'stable',
        projections: [],
      };
    }

    const averageROI = tracking.reduce((sum, r) => sum + r.roi, 0) / tracking.length;
    const trend = this.calculateROITrend(tracking);
    const projections = this.projectROI(tracking);

    return {
      averageROI,
      trend,
      projections,
    };
  }

  private calculateROITrend(tracking: ROITracking[]): 'increasing' | 'decreasing' | 'stable' {
    if (tracking.length < 2) return 'stable';

    const sorted = tracking.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    const recent = sorted.slice(-3);
    const older = sorted.slice(-6, -3);

    if (recent.length === 0 || older.length === 0) return 'stable';

    const recentAvg = recent.reduce((sum, r) => sum + r.roi, 0) / recent.length;
    const olderAvg = older.reduce((sum, r) => sum + r.roi, 0) / older.length;

    if (recentAvg > olderAvg * 1.1) return 'increasing';
    if (recentAvg < olderAvg * 0.9) return 'decreasing';
    return 'stable';
  }

  private projectROI(tracking: ROITracking[]): number[] {
    // Simple linear projection based on recent trends
    const recent = tracking.slice(-3);
    if (recent.length < 2) return [];

    const trend = recent.reduce((sum, r, i, arr) => {
      if (i === 0) return 0;
      return sum + (r.roi - arr[i - 1].roi);
    }, 0) / (recent.length - 1);

    const lastROI = recent[recent.length - 1].roi;
    const projections: number[] = [];

    for (let i = 1; i <= 3; i++) {
      projections.push(lastROI + (trend * i));
    }

    return projections;
  }

  // Data Visualization
  async createVisualization(visualization: Omit<DataVisualization, 'id' | 'createdAt' | 'updatedAt'>): Promise<DataVisualization> {
    const newVisualization: DataVisualization = {
      ...visualization,
      id: `viz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.dataVisualizations.push(newVisualization);
    this.saveDataVisualizations();
    return newVisualization;
  }

  async getVisualizations(options?: {
    type?: DataVisualization['type'];
    limit?: number;
  }): Promise<DataVisualization[]> {
    let visualizations = this.dataVisualizations;

    if (options?.type) {
      visualizations = visualizations.filter(v => v.type === options.type);
    }

    visualizations.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

    if (options?.limit) {
      visualizations = visualizations.slice(0, options.limit);
    }

    return visualizations;
  }

  // Advanced Reports
  async createAdvancedReport(report: Omit<AdvancedReport, 'id' | 'createdAt'>): Promise<AdvancedReport> {
    const newReport: AdvancedReport = {
      ...report,
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    this.advancedReports.push(newReport);
    this.saveAdvancedReports();
    return newReport;
  }

  async getAdvancedReports(type?: AdvancedReport['type']): Promise<AdvancedReport[]> {
    let reports = this.advancedReports;

    if (type) {
      reports = reports.filter(r => r.type === type);
    }

    return reports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async generateReport(reportId: string): Promise<AdvancedReport | null> {
    const report = this.advancedReports.find(r => r.id === reportId);
    if (!report) return null;

    // Simulate report generation
    report.lastGenerated = new Date();
    this.saveAdvancedReports();
    return report;
  }

  // User Behavior Analysis
  async analyzeUserBehavior(userId: string, sessionId: string, behaviors: UserBehavior[]): Promise<UserBehaviorAnalysis> {
    const patterns = this.identifyBehaviorPatterns(behaviors);
    const insights = this.generateBehaviorInsights(behaviors, patterns);

    const analysis: UserBehaviorAnalysis = {
      id: `behavior_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      sessionId,
      behaviors,
      patterns,
      insights,
      createdAt: new Date(),
    };

    this.userBehaviorAnalysis.push(analysis);
    this.saveUserBehaviorAnalysis();
    return analysis;
  }

  private identifyBehaviorPatterns(behaviors: UserBehavior[]): BehaviorPattern[] {
    const patterns: BehaviorPattern[] = [];

    // Analyze session duration patterns
    const sessionDurations = behaviors
      .filter(b => b.duration)
      .map(b => b.duration!);

    if (sessionDurations.length > 0) {
      const avgDuration = sessionDurations.reduce((sum, d) => sum + d, 0) / sessionDurations.length;
      patterns.push({
        pattern: 'Session Duration',
        frequency: sessionDurations.length,
        confidence: 0.8,
        description: `Average session duration: ${Math.round(avgDuration)} minutes`,
      });
    }

    // Analyze action patterns
    const actionCounts = behaviors.reduce((acc, b) => {
      acc[b.action] = (acc[b.action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(actionCounts).forEach(([action, count]) => {
      patterns.push({
        pattern: action,
        frequency: count,
        confidence: 0.7,
        description: `Performed ${action} ${count} times`,
      });
    });

    return patterns;
  }

  private generateBehaviorInsights(behaviors: UserBehavior[], patterns: BehaviorPattern[]): BehaviorInsight[] {
    const insights: BehaviorInsight[] = [];

    // Engagement insight
    const totalActions = behaviors.length;
    if (totalActions > 10) {
      insights.push({
        type: 'engagement',
        insight: 'High engagement level detected',
        confidence: 0.8,
        recommendations: ['Continue current learning pace', 'Consider advanced topics'],
      });
    } else if (totalActions < 5) {
      insights.push({
        type: 'engagement',
        insight: 'Low engagement level detected',
        confidence: 0.7,
        recommendations: ['Increase study time', 'Seek interactive content'],
      });
    }

    // Learning style insight
    const videoActions = behaviors.filter(b => b.action.includes('video')).length;
    const textActions = behaviors.filter(b => b.action.includes('read')).length;

    if (videoActions > textActions) {
      insights.push({
        type: 'learning_style',
        insight: 'Visual learning preference detected',
        confidence: 0.6,
        recommendations: ['Focus on video content', 'Use visual aids'],
      });
    } else {
      insights.push({
        type: 'learning_style',
        insight: 'Text-based learning preference detected',
        confidence: 0.6,
        recommendations: ['Focus on reading materials', 'Use text-based resources'],
      });
    }

    return insights;
  }

  // Analytics Dashboard
  async getAnalyticsDashboard(enterpriseId?: string): Promise<{
    predictions: PredictiveAnalytics[];
    outcomes: LearningOutcome[];
    roi: ROITracking[];
    visualizations: DataVisualization[];
    reports: AdvancedReport[];
    summary: Record<string, any>;
  }> {
    const predictions = enterpriseId 
      ? this.predictiveAnalytics.filter(p => p.enterpriseId === enterpriseId)
      : this.predictiveAnalytics.slice(0, 10);

    const outcomes = enterpriseId 
      ? this.learningOutcomes.filter(o => true) // Would filter by enterprise users
      : this.learningOutcomes.slice(0, 10);

    const roi = enterpriseId 
      ? await this.getROITracking(enterpriseId)
      : this.roiTracking.slice(0, 5);

    const visualizations = await this.getVisualizations({ limit: 5 });
    const reports = await this.getAdvancedReports();

    const summary = {
      totalPredictions: predictions.length,
      averagePredictionConfidence: predictions.length > 0 
        ? predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length 
        : 0,
      totalOutcomes: outcomes.length,
      averageOutcomeScore: outcomes.length > 0 
        ? outcomes.reduce((sum, o) => sum + o.score, 0) / outcomes.length 
        : 0,
      totalROI: roi.length,
      averageROI: roi.length > 0 
        ? roi.reduce((sum, r) => sum + r.roi, 0) / roi.length 
        : 0,
    };

    return {
      predictions,
      outcomes,
      roi,
      visualizations,
      reports,
      summary,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedPredictiveAnalytics = localStorage.getItem('oponmeta_advanced_analytics_predictions');
      if (storedPredictiveAnalytics) {
        this.predictiveAnalytics = JSON.parse(storedPredictiveAnalytics).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
          expiresAt: new Date(p.expiresAt),
        }));
      }

      const storedLearningOutcomes = localStorage.getItem('oponmeta_advanced_analytics_outcomes');
      if (storedLearningOutcomes) {
        this.learningOutcomes = JSON.parse(storedLearningOutcomes).map((o: any) => ({
          ...o,
          assessmentDate: new Date(o.assessmentDate),
          nextAssessmentDate: new Date(o.nextAssessmentDate),
          createdAt: new Date(o.createdAt),
        }));
      }

      const storedROITracking = localStorage.getItem('oponmeta_advanced_analytics_roi');
      if (storedROITracking) {
        this.roiTracking = JSON.parse(storedROITracking).map((r: any) => ({
          ...r,
          startDate: new Date(r.startDate),
          endDate: new Date(r.endDate),
          createdAt: new Date(r.createdAt),
        }));
      }

      const storedDataVisualizations = localStorage.getItem('oponmeta_advanced_analytics_visualizations');
      if (storedDataVisualizations) {
        this.dataVisualizations = JSON.parse(storedDataVisualizations).map((v: any) => ({
          ...v,
          createdAt: new Date(v.createdAt),
          updatedAt: new Date(v.updatedAt),
        }));
      }

      const storedAdvancedReports = localStorage.getItem('oponmeta_advanced_analytics_reports');
      if (storedAdvancedReports) {
        this.advancedReports = JSON.parse(storedAdvancedReports).map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
          lastGenerated: r.lastGenerated ? new Date(r.lastGenerated) : undefined,
        }));
      }

      const storedUserBehaviorAnalysis = localStorage.getItem('oponmeta_advanced_analytics_behavior');
      if (storedUserBehaviorAnalysis) {
        this.userBehaviorAnalysis = JSON.parse(storedUserBehaviorAnalysis).map((b: any) => ({
          ...b,
          behaviors: b.behaviors.map((behavior: any) => ({
            ...behavior,
            timestamp: new Date(behavior.timestamp),
          })),
          createdAt: new Date(b.createdAt),
        }));
      }
    } catch (error) {
      console.error('Failed to load advanced analytics data:', error);
    }
  }

  private savePredictiveAnalytics(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_predictions', JSON.stringify(this.predictiveAnalytics));
    } catch (error) {
      console.error('Failed to save predictive analytics:', error);
    }
  }

  private saveLearningOutcomes(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_outcomes', JSON.stringify(this.learningOutcomes));
    } catch (error) {
      console.error('Failed to save learning outcomes:', error);
    }
  }

  private saveROITracking(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_roi', JSON.stringify(this.roiTracking));
    } catch (error) {
      console.error('Failed to save ROI tracking:', error);
    }
  }

  private saveDataVisualizations(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_visualizations', JSON.stringify(this.dataVisualizations));
    } catch (error) {
      console.error('Failed to save data visualizations:', error);
    }
  }

  private saveAdvancedReports(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_reports', JSON.stringify(this.advancedReports));
    } catch (error) {
      console.error('Failed to save advanced reports:', error);
    }
  }

  private saveUserBehaviorAnalysis(): void {
    try {
      localStorage.setItem('oponmeta_advanced_analytics_behavior', JSON.stringify(this.userBehaviorAnalysis));
    } catch (error) {
      console.error('Failed to save user behavior analysis:', error);
    }
  }
}

// Create singleton instance
const advancedAnalyticsService = new AdvancedAnalyticsService();

export { advancedAnalyticsService };
export default advancedAnalyticsService;
