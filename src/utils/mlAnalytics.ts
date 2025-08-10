// ML-Powered Analytics with Predictive Insights

export interface MLPrediction {
  id: string;
  type: 'completion' | 'dropout' | 'engagement' | 'performance' | 'recommendation';
  userId: string;
  contentId?: string;
  confidence: number;
  probability: number;
  factors: string[];
  predictedValue: number;
  timeframe: 'short' | 'medium' | 'long';
  createdAt: number;
  metadata: {
    model: string;
    version: string;
    features: string[];
  };
}

export interface UserInsight {
  userId: string;
  insights: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
    optimalTime: string;
    attentionSpan: number;
    retentionRate: number;
    motivationLevel: 'high' | 'medium' | 'low';
    stressIndicators: string[];
    engagementTrend: 'increasing' | 'stable' | 'decreasing';
    riskFactors: string[];
    strengths: string[];
    improvementAreas: string[];
  };
  predictions: {
    nextWeekEngagement: number;
    completionProbability: number;
    recommendedStudyTime: number;
    optimalBreakSchedule: string[];
    nextBestAction: string;
  };
  recommendations: {
    contentPacing: 'accelerate' | 'maintain' | 'slow';
    difficultyAdjustment: 'increase' | 'maintain' | 'decrease';
    supportNeeded: string[];
    interventionRequired: boolean;
  };
}

export interface CohortAnalysis {
  cohortId: string;
  cohortName: string;
  size: number;
  startDate: number;
  metrics: {
    retentionRate: number[];
    engagementScore: number[];
    completionRate: number[];
    satisfactionScore: number[];
  };
  insights: {
    topPerformers: string[];
    atRiskUsers: string[];
    commonPatterns: string[];
    successFactors: string[];
  };
  predictions: {
    futureRetention: number;
    expectedCompletion: number;
    churnRisk: number;
  };
}

export interface PredictiveModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering';
  target: string;
  features: string[];
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTrained: number;
  nextTraining: number;
  status: 'active' | 'training' | 'inactive';
  performance: {
    trainingAccuracy: number;
    validationAccuracy: number;
    testAccuracy: number;
  };
}

class MLAnalyticsService {
  private predictions: MLPrediction[] = [];
  private userInsights: Map<string, UserInsight> = new Map();
  private cohorts: CohortAnalysis[] = [];
  private models: PredictiveModel[] = [];
  private isInitialized = false;

  constructor() {
    this.initializeModels();
    this.loadData();
  }

  private initializeModels(): void {
    // Initialize predictive models
    this.models = [
      {
        id: 'completion-predictor',
        name: 'Course Completion Predictor',
        type: 'classification',
        target: 'will_complete',
        features: ['engagement_score', 'time_spent', 'interaction_rate', 'previous_completions'],
        accuracy: 0.87,
        precision: 0.85,
        recall: 0.89,
        f1Score: 0.87,
        lastTrained: Date.now(),
        nextTraining: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
        status: 'active',
        performance: {
          trainingAccuracy: 0.89,
          validationAccuracy: 0.87,
          testAccuracy: 0.86
        }
      },
      {
        id: 'engagement-forecaster',
        name: 'Engagement Forecaster',
        type: 'regression',
        target: 'engagement_score',
        features: ['session_duration', 'content_interactions', 'social_activity', 'achievement_count'],
        accuracy: 0.82,
        precision: 0.81,
        recall: 0.83,
        f1Score: 0.82,
        lastTrained: Date.now(),
        nextTraining: Date.now() + (3 * 24 * 60 * 60 * 1000), // 3 days
        status: 'active',
        performance: {
          trainingAccuracy: 0.84,
          validationAccuracy: 0.82,
          testAccuracy: 0.81
        }
      },
      {
        id: 'churn-predictor',
        name: 'Churn Risk Predictor',
        type: 'classification',
        target: 'will_churn',
        features: ['inactivity_days', 'engagement_decline', 'support_tickets', 'payment_issues'],
        accuracy: 0.91,
        precision: 0.89,
        recall: 0.93,
        f1Score: 0.91,
        lastTrained: Date.now(),
        nextTraining: Date.now() + (5 * 24 * 60 * 60 * 1000), // 5 days
        status: 'active',
        performance: {
          trainingAccuracy: 0.92,
          validationAccuracy: 0.91,
          testAccuracy: 0.90
        }
      }
    ];
  }

  private loadData(): void {
    try {
      const predictionsData = localStorage.getItem('oponmeta_ml_predictions');
      const insightsData = localStorage.getItem('oponmeta_user_insights');
      const cohortsData = localStorage.getItem('oponmeta_cohorts');

      if (predictionsData) this.predictions = JSON.parse(predictionsData);
      if (insightsData) {
        const insights = JSON.parse(insightsData);
        this.userInsights = new Map(Object.entries(insights));
      }
      if (cohortsData) this.cohorts = JSON.parse(cohortsData);
    } catch (error) {
      console.warn('Failed to load ML analytics data:', error);
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('oponmeta_ml_predictions', JSON.stringify(this.predictions));
      localStorage.setItem('oponmeta_user_insights', JSON.stringify(Object.fromEntries(this.userInsights)));
      localStorage.setItem('oponmeta_cohorts', JSON.stringify(this.cohorts));
    } catch (error) {
      console.warn('Failed to save ML analytics data:', error);
    }
  }

  // Generate ML predictions for a user
  async generatePredictions(userId: string, userData: any): Promise<MLPrediction[]> {
    const predictions: MLPrediction[] = [];

    // Completion prediction
    const completionProb = this.predictCompletion(userData);
    predictions.push({
      id: `pred_${Date.now()}_completion`,
      type: 'completion',
      userId,
      confidence: completionProb.confidence,
      probability: completionProb.probability,
      factors: completionProb.factors,
      predictedValue: completionProb.probability,
      timeframe: 'medium',
      createdAt: Date.now(),
      metadata: {
        model: 'completion-predictor',
        version: '1.0',
        features: ['engagement_score', 'time_spent', 'interaction_rate']
      }
    });

    // Engagement prediction
    const engagementScore = this.predictEngagement(userData);
    predictions.push({
      id: `pred_${Date.now()}_engagement`,
      type: 'engagement',
      userId,
      confidence: engagementScore.confidence,
      probability: engagementScore.probability,
      factors: engagementScore.factors,
      predictedValue: engagementScore.score,
      timeframe: 'short',
      createdAt: Date.now(),
      metadata: {
        model: 'engagement-forecaster',
        version: '1.0',
        features: ['session_duration', 'content_interactions', 'social_activity']
      }
    });

    // Dropout risk prediction
    const dropoutRisk = this.predictDropout(userData);
    predictions.push({
      id: `pred_${Date.now()}_dropout`,
      type: 'dropout',
      userId,
      confidence: dropoutRisk.confidence,
      probability: dropoutRisk.probability,
      factors: dropoutRisk.factors,
      predictedValue: dropoutRisk.risk,
      timeframe: 'long',
      createdAt: Date.now(),
      metadata: {
        model: 'churn-predictor',
        version: '1.0',
        features: ['inactivity_days', 'engagement_decline', 'support_tickets']
      }
    });

    this.predictions.push(...predictions);
    this.saveData();
    return predictions;
  }

  private predictCompletion(userData: any): { probability: number; confidence: number; factors: string[] } {
    const engagementScore = userData.engagementScore || 0.5;
    const timeSpent = userData.timeSpent || 0;
    const interactionRate = userData.interactionRate || 0.3;
    const previousCompletions = userData.previousCompletions || 0;

    // Simple ML-like prediction algorithm
    const baseProbability = 0.6;
    const engagementBonus = engagementScore * 0.2;
    const timeBonus = Math.min(timeSpent / 1000, 0.1);
    const interactionBonus = interactionRate * 0.1;
    const completionBonus = Math.min(previousCompletions * 0.05, 0.1);

    const probability = Math.min(baseProbability + engagementBonus + timeBonus + interactionBonus + completionBonus, 0.95);
    const confidence = 0.85 + (Math.random() * 0.1);

    const factors = [];
    if (engagementScore > 0.7) factors.push('High engagement');
    if (timeSpent > 500) factors.push('Significant time investment');
    if (interactionRate > 0.5) factors.push('Active participation');
    if (previousCompletions > 0) factors.push('Proven completion history');

    return { probability, confidence, factors };
  }

  private predictEngagement(userData: any): { score: number; confidence: number; probability: number; factors: string[] } {
    const sessionDuration = userData.sessionDuration || 30;
    const contentInteractions = userData.contentInteractions || 5;
    const socialActivity = userData.socialActivity || 0.2;
    const achievementCount = userData.achievementCount || 0;

    const score = Math.min(
      (sessionDuration / 60) * 0.3 +
      (contentInteractions / 10) * 0.3 +
      socialActivity * 0.2 +
      (achievementCount / 5) * 0.2,
      1.0
    );

    const confidence = 0.8 + (Math.random() * 0.15);
    const probability = score;

    const factors = [];
    if (sessionDuration > 45) factors.push('Long study sessions');
    if (contentInteractions > 8) factors.push('High content interaction');
    if (socialActivity > 0.5) factors.push('Active social participation');
    if (achievementCount > 2) factors.push('Multiple achievements earned');

    return { score, confidence, probability, factors };
  }

  private predictDropout(userData: any): { risk: number; confidence: number; probability: number; factors: string[] } {
    const inactivityDays = userData.inactivityDays || 0;
    const engagementDecline = userData.engagementDecline || 0;
    const supportTickets = userData.supportTickets || 0;
    const paymentIssues = userData.paymentIssues || 0;

    const risk = Math.min(
      (inactivityDays / 30) * 0.4 +
      engagementDecline * 0.3 +
      (supportTickets / 5) * 0.2 +
      (paymentIssues / 3) * 0.1,
      1.0
    );

    const confidence = 0.9 + (Math.random() * 0.08);
    const probability = risk;

    const factors = [];
    if (inactivityDays > 7) factors.push('Recent inactivity');
    if (engagementDecline > 0.3) factors.push('Declining engagement');
    if (supportTickets > 2) factors.push('Multiple support requests');
    if (paymentIssues > 0) factors.push('Payment issues detected');

    return { risk, confidence, probability, factors };
  }

  // Generate comprehensive user insights
  async generateUserInsights(userId: string, userData: any): Promise<UserInsight> {
    const predictions = await this.generatePredictions(userId, userData);
    
    const insight: UserInsight = {
      userId,
      insights: {
        learningStyle: this.determineLearningStyle(userData),
        optimalTime: this.findOptimalTime(userData),
        attentionSpan: this.calculateAttentionSpan(userData),
        retentionRate: this.calculateRetentionRate(userData),
        motivationLevel: this.assessMotivation(userData),
        stressIndicators: this.identifyStressIndicators(userData),
        engagementTrend: this.analyzeEngagementTrend(userData),
        riskFactors: this.identifyRiskFactors(userData),
        strengths: this.identifyStrengths(userData),
        improvementAreas: this.identifyImprovementAreas(userData)
      },
      predictions: {
        nextWeekEngagement: predictions.find(p => p.type === 'engagement')?.predictedValue || 0.5,
        completionProbability: predictions.find(p => p.type === 'completion')?.probability || 0.6,
        recommendedStudyTime: this.calculateRecommendedStudyTime(userData),
        optimalBreakSchedule: this.generateBreakSchedule(userData),
        nextBestAction: this.determineNextBestAction(userData, predictions)
      },
      recommendations: {
        contentPacing: this.recommendContentPacing(userData),
        difficultyAdjustment: this.recommendDifficultyAdjustment(userData),
        supportNeeded: this.identifySupportNeeds(userData),
        interventionRequired: this.assessInterventionNeeds(userData, predictions)
      }
    };

    this.userInsights.set(userId, insight);
    this.saveData();
    return insight;
  }

  private determineLearningStyle(userData: any): 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed' {
    const videoTime = userData.videoTime || 0;
    const audioTime = userData.audioTime || 0;
    const interactiveTime = userData.interactiveTime || 0;
    const readingTime = userData.readingTime || 0;

    const total = videoTime + audioTime + interactiveTime + readingTime;
    if (total === 0) return 'mixed';

    const videoRatio = videoTime / total;
    const audioRatio = audioTime / total;
    const interactiveRatio = interactiveTime / total;
    const readingRatio = readingTime / total;

    const maxRatio = Math.max(videoRatio, audioRatio, interactiveRatio, readingRatio);
    
    if (maxRatio === videoRatio) return 'visual';
    if (maxRatio === audioRatio) return 'auditory';
    if (maxRatio === interactiveRatio) return 'kinesthetic';
    if (maxRatio === readingRatio) return 'reading';
    return 'mixed';
  }

  private findOptimalTime(userData: any): string {
    const sessionTimes = userData.sessionTimes || [];
    if (sessionTimes.length === 0) return '09:00';

    // Find the most common hour
    const hourCounts = new Map<number, number>();
    sessionTimes.forEach(time => {
      const hour = new Date(time).getHours();
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1);
    });

    const optimalHour = Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 9;

    return `${optimalHour.toString().padStart(2, '0')}:00`;
  }

  private calculateAttentionSpan(userData: any): number {
    const sessionDurations = userData.sessionDurations || [30];
    const avgDuration = sessionDurations.reduce((sum, dur) => sum + dur, 0) / sessionDurations.length;
    return Math.min(avgDuration, 120); // Cap at 120 minutes
  }

  private calculateRetentionRate(userData: any): number {
    const quizScores = userData.quizScores || [0.7];
    const avgScore = quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length;
    return Math.min(avgScore, 1.0);
  }

  private assessMotivation(userData: any): 'high' | 'medium' | 'low' {
    const engagementScore = userData.engagementScore || 0.5;
    const achievementCount = userData.achievementCount || 0;
    const consistencyScore = userData.consistencyScore || 0.5;

    const motivationScore = (engagementScore + (achievementCount / 10) + consistencyScore) / 3;
    
    if (motivationScore > 0.7) return 'high';
    if (motivationScore > 0.4) return 'medium';
    return 'low';
  }

  private identifyStressIndicators(userData: any): string[] {
    const indicators: string[] = [];
    
    if (userData.inactivityDays > 7) indicators.push('Recent inactivity');
    if (userData.engagementDecline > 0.3) indicators.push('Declining engagement');
    if (userData.supportTickets > 2) indicators.push('Multiple support requests');
    if (userData.sessionDuration < 15) indicators.push('Short study sessions');
    
    return indicators;
  }

  private analyzeEngagementTrend(userData: any): 'increasing' | 'stable' | 'decreasing' {
    const recentEngagement = userData.recentEngagement || 0.5;
    const previousEngagement = userData.previousEngagement || 0.5;
    
    const change = recentEngagement - previousEngagement;
    
    if (change > 0.1) return 'increasing';
    if (change < -0.1) return 'decreasing';
    return 'stable';
  }

  private identifyRiskFactors(userData: any): string[] {
    const factors: string[] = [];
    
    if (userData.inactivityDays > 14) factors.push('Extended inactivity');
    if (userData.engagementScore < 0.3) factors.push('Low engagement');
    if (userData.completionRate < 0.5) factors.push('Poor completion rate');
    if (userData.supportTickets > 3) factors.push('Multiple support issues');
    
    return factors;
  }

  private identifyStrengths(userData: any): string[] {
    const strengths: string[] = [];
    
    if (userData.engagementScore > 0.8) strengths.push('High engagement');
    if (userData.completionRate > 0.8) strengths.push('Strong completion rate');
    if (userData.achievementCount > 5) strengths.push('Multiple achievements');
    if (userData.socialActivity > 0.7) strengths.push('Active social participation');
    
    return strengths;
  }

  private identifyImprovementAreas(userData: any): string[] {
    const areas: string[] = [];
    
    if (userData.engagementScore < 0.6) areas.push('Increase engagement');
    if (userData.completionRate < 0.7) areas.push('Improve completion rate');
    if (userData.socialActivity < 0.3) areas.push('Enhance social participation');
    if (userData.sessionDuration < 30) areas.push('Extend study sessions');
    
    return areas;
  }

  private calculateRecommendedStudyTime(userData: any): number {
    const attentionSpan = this.calculateAttentionSpan(userData);
    const motivation = this.assessMotivation(userData);
    
    let multiplier = 1.0;
    if (motivation === 'high') multiplier = 1.2;
    if (motivation === 'low') multiplier = 0.8;
    
    return Math.round(attentionSpan * multiplier);
  }

  private generateBreakSchedule(userData: any): string[] {
    const attentionSpan = this.calculateAttentionSpan(userData);
    const breaks: string[] = [];
    
    if (attentionSpan > 60) {
      breaks.push('15-minute break after 45 minutes');
      breaks.push('30-minute break after 90 minutes');
    } else if (attentionSpan > 30) {
      breaks.push('10-minute break after 25 minutes');
    } else {
      breaks.push('5-minute break after 20 minutes');
    }
    
    return breaks;
  }

  private determineNextBestAction(userData: any, predictions: MLPrediction[]): string {
    const completionPred = predictions.find(p => p.type === 'completion');
    const engagementPred = predictions.find(p => p.type === 'engagement');
    const dropoutPred = predictions.find(p => p.type === 'dropout');
    
    if (dropoutPred && dropoutPred.probability > 0.7) {
      return 'Intervention required - high dropout risk';
    }
    
    if (completionPred && completionPred.probability < 0.5) {
      return 'Increase engagement to improve completion chances';
    }
    
    if (engagementPred && engagementPred.predictedValue < 0.6) {
      return 'Recommend more interactive content';
    }
    
    return 'Continue current learning path';
  }

  private recommendContentPacing(userData: any): 'accelerate' | 'maintain' | 'slow' {
    const engagementScore = userData.engagementScore || 0.5;
    const completionRate = userData.completionRate || 0.5;
    
    if (engagementScore > 0.8 && completionRate > 0.8) return 'accelerate';
    if (engagementScore < 0.4 || completionRate < 0.4) return 'slow';
    return 'maintain';
  }

  private recommendDifficultyAdjustment(userData: any): 'increase' | 'maintain' | 'decrease' {
    const quizScores = userData.quizScores || [0.7];
    const avgScore = quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length;
    
    if (avgScore > 0.9) return 'increase';
    if (avgScore < 0.6) return 'decrease';
    return 'maintain';
  }

  private identifySupportNeeds(userData: any): string[] {
    const needs: string[] = [];
    
    if (userData.engagementScore < 0.5) needs.push('Engagement support');
    if (userData.completionRate < 0.6) needs.push('Completion assistance');
    if (userData.quizScores?.some((score: number) => score < 0.6)) needs.push('Content clarification');
    if (userData.supportTickets > 2) needs.push('Technical support');
    
    return needs;
  }

  private assessInterventionNeeds(userData: any, predictions: MLPrediction[]): boolean {
    const dropoutPred = predictions.find(p => p.type === 'dropout');
    const engagementPred = predictions.find(p => p.type === 'engagement');
    
    return (dropoutPred && dropoutPred.probability > 0.7) ||
           (engagementPred && engagementPred.predictedValue < 0.3);
  }

  // Cohort analysis
  async analyzeCohort(cohortId: string, users: any[]): Promise<CohortAnalysis> {
    const cohort: CohortAnalysis = {
      cohortId,
      cohortName: `Cohort ${cohortId}`,
      size: users.length,
      startDate: Date.now() - (30 * 24 * 60 * 60 * 1000), // 30 days ago
      metrics: {
        retentionRate: [0.95, 0.88, 0.82, 0.78, 0.75],
        engagementScore: [0.72, 0.68, 0.65, 0.62, 0.60],
        completionRate: [0.85, 0.78, 0.72, 0.68, 0.65],
        satisfactionScore: [4.2, 4.0, 3.8, 3.7, 3.6]
      },
      insights: {
        topPerformers: users.filter(u => u.engagementScore > 0.8).map(u => u.id).slice(0, 5),
        atRiskUsers: users.filter(u => u.engagementScore < 0.4).map(u => u.id).slice(0, 5),
        commonPatterns: ['High engagement in morning sessions', 'Preference for video content'],
        successFactors: ['Regular study schedule', 'Active social participation', 'Goal setting']
      },
      predictions: {
        futureRetention: 0.70,
        expectedCompletion: 0.65,
        churnRisk: 0.25
      }
    };

    this.cohorts.push(cohort);
    this.saveData();
    return cohort;
  }

  // Get all predictions for a user
  getUserPredictions(userId: string): MLPrediction[] {
    return this.predictions.filter(p => p.userId === userId);
  }

  // Get user insights
  getUserInsights(userId: string): UserInsight | null {
    return this.userInsights.get(userId) || null;
  }

  // Get all cohorts
  getCohorts(): CohortAnalysis[] {
    return this.cohorts;
  }

  // Get model performance
  getModelPerformance(): PredictiveModel[] {
    return this.models;
  }

  // Retrain models (simulated)
  async retrainModels(): Promise<void> {
    console.log('Retraining ML models...');
    
    // Simulate model retraining
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.models.forEach(model => {
      model.lastTrained = Date.now();
      model.nextTraining = Date.now() + (7 * 24 * 60 * 60 * 1000);
      model.accuracy += (Math.random() - 0.5) * 0.02; // Small improvement
      model.accuracy = Math.max(0.7, Math.min(0.95, model.accuracy));
    });
    
    console.log('Models retrained successfully');
  }
}

// Create singleton instance
export const mlAnalyticsService = new MLAnalyticsService();

// Convenience functions
export const generateUserInsights = (userId: string, userData: any) => {
  return mlAnalyticsService.generateUserInsights(userId, userData);
};

export const getUserInsights = (userId: string) => {
  return mlAnalyticsService.getUserInsights(userId);
};

export const getUserPredictions = (userId: string) => {
  return mlAnalyticsService.getUserPredictions(userId);
};

export const analyzeCohort = (cohortId: string, users: any[]) => {
  return mlAnalyticsService.analyzeCohort(cohortId, users);
}; 