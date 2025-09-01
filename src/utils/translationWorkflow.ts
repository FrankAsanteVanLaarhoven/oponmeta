import { translationManager } from './translationAPIs';

interface TranslationJob {
  id: string;
  sourceLanguage: string;
  targetLanguage: string;
  content: string;
  context?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'reviewed';
  createdAt: Date;
  updatedAt: Date;
  translatedContent?: string;
  qualityScore?: number;
  reviewer?: string;
  notes?: string;
}

interface TranslationBatch {
  id: string;
  name: string;
  jobs: TranslationJob[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  totalJobs: number;
  completedJobs: number;
  failedJobs: number;
}

interface TranslationQualityMetrics {
  accuracy: number;
  fluency: number;
  consistency: number;
  culturalAppropriateness: number;
  overallScore: number;
}

class TranslationWorkflow {
  private jobs: Map<string, TranslationJob> = new Map();
  private batches: Map<string, TranslationBatch> = new Map();
  private processingQueue: string[] = [];
  private isProcessing = false;

  constructor() {
    this.startProcessingLoop();
  }

  // Create a new translation job
  async createJob(
    content: string,
    sourceLanguage: string,
    targetLanguage: string,
    context?: string,
    priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
  ): Promise<string> {
    const jobId = this.generateJobId();
    const job: TranslationJob = {
      id: jobId,
      sourceLanguage,
      targetLanguage,
      content,
      context,
      priority,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.jobs.set(jobId, job);
    this.addToQueue(jobId, priority);
    
    return jobId;
  }

  // Create a batch of translation jobs
  async createBatch(
    name: string,
    translations: Array<{
      content: string;
      sourceLanguage: string;
      targetLanguage: string;
      context?: string;
      priority?: 'low' | 'medium' | 'high' | 'urgent';
    }>
  ): Promise<string> {
    const batchId = this.generateBatchId();
    const jobs: TranslationJob[] = [];

    for (const translation of translations) {
      const jobId = await this.createJob(
        translation.content,
        translation.sourceLanguage,
        translation.targetLanguage,
        translation.context,
        translation.priority || 'medium'
      );
      jobs.push(this.jobs.get(jobId)!);
    }

    const batch: TranslationBatch = {
      id: batchId,
      name,
      jobs,
      status: 'pending',
      createdAt: new Date(),
      totalJobs: jobs.length,
      completedJobs: 0,
      failedJobs: 0
    };

    this.batches.set(batchId, batch);
    return batchId;
  }

  // Get job status
  getJobStatus(jobId: string): TranslationJob | null {
    return this.jobs.get(jobId) || null;
  }

  // Get batch status
  getBatchStatus(batchId: string): TranslationBatch | null {
    return this.batches.get(batchId) || null;
  }

  // Get all jobs for a language pair
  getJobsByLanguagePair(sourceLanguage: string, targetLanguage: string): TranslationJob[] {
    return Array.from(this.jobs.values()).filter(
      job => job.sourceLanguage === sourceLanguage && job.targetLanguage === targetLanguage
    );
  }

  // Get jobs by status
  getJobsByStatus(status: TranslationJob['status']): TranslationJob[] {
    return Array.from(this.jobs.values()).filter(job => job.status === status);
  }

  // Update job with translation result
  async updateJobResult(
    jobId: string,
    translatedContent: string,
    qualityScore?: number
  ): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    job.translatedContent = translatedContent;
    job.status = 'completed';
    job.qualityScore = qualityScore;
    job.updatedAt = new Date();

    this.jobs.set(jobId, job);
    this.updateBatchProgress(job);
  }

  // Mark job for review
  async markJobForReview(jobId: string, reviewer: string, notes?: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    job.status = 'reviewed';
    job.reviewer = reviewer;
    job.notes = notes;
    job.updatedAt = new Date();

    this.jobs.set(jobId, job);
  }

  // Retry failed job
  async retryJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    job.status = 'pending';
    job.updatedAt = new Date();
    this.addToQueue(jobId, job.priority);
  }

  // Process translation jobs
  private async processJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (!job) return;

    try {
      job.status = 'in_progress';
      job.updatedAt = new Date();
      this.jobs.set(jobId, job);

      // Translate content
      const translatedContent = await translationManager.translate(
        job.content,
        job.sourceLanguage,
        job.targetLanguage
      );

      // Calculate quality score
      const qualityScore = await this.calculateQualityScore(
        job.content,
        translatedContent,
        job.sourceLanguage,
        job.targetLanguage
      );

      // Update job with result
      await this.updateJobResult(jobId, translatedContent, qualityScore);

    } catch (error) {
      console.error(`Translation failed for job ${jobId}:`, error);
      job.status = 'failed';
      job.notes = error instanceof Error ? error.message : 'Unknown error';
      job.updatedAt = new Date();
      this.jobs.set(jobId, job);
      this.updateBatchProgress(job);
    }
  }

  // Calculate translation quality score
  private async calculateQualityScore(
    sourceText: string,
    translatedText: string,
    sourceLanguage: string,
    targetLanguage: string
  ): Promise<number> {
    // Basic quality metrics (in a real implementation, you'd use more sophisticated methods)
    const metrics: TranslationQualityMetrics = {
      accuracy: 0.85, // Placeholder - would use semantic similarity
      fluency: 0.90,  // Placeholder - would use language model scoring
      consistency: 0.88, // Placeholder - would check terminology consistency
      culturalAppropriateness: 0.92, // Placeholder - would use cultural validation
      overallScore: 0
    };

    metrics.overallScore = (
      metrics.accuracy * 0.3 +
      metrics.fluency * 0.25 +
      metrics.consistency * 0.25 +
      metrics.culturalAppropriateness * 0.2
    );

    return metrics.overallScore;
  }

  // Add job to processing queue with priority
  private addToQueue(jobId: string, priority: 'low' | 'medium' | 'high' | 'urgent'): void {
    const priorityMap = { urgent: 0, high: 1, medium: 2, low: 3 };
    const insertIndex = this.processingQueue.findIndex(
      id => priorityMap[this.jobs.get(id)?.priority || 'medium'] > priorityMap[priority]
    );

    if (insertIndex === -1) {
      this.processingQueue.push(jobId);
    } else {
      this.processingQueue.splice(insertIndex, 0, jobId);
    }
  }

  // Update batch progress
  private updateBatchProgress(job: TranslationJob): void {
    for (const batch of this.batches.values()) {
      const batchJob = batch.jobs.find(j => j.id === job.id);
      if (batchJob) {
        batch.completedJobs = batch.jobs.filter(j => j.status === 'completed').length;
        batch.failedJobs = batch.jobs.filter(j => j.status === 'failed').length;
        
        if (batch.completedJobs + batch.failedJobs === batch.totalJobs) {
          batch.status = batch.failedJobs === 0 ? 'completed' : 'failed';
          batch.completedAt = new Date();
        } else {
          batch.status = 'processing';
        }
        
        this.batches.set(batch.id, batch);
        break;
      }
    }
  }

  // Processing loop
  private async startProcessingLoop(): Promise<void> {
    setInterval(async () => {
      if (this.isProcessing || this.processingQueue.length === 0) return;

      this.isProcessing = true;
      const jobId = this.processingQueue.shift();
      
      if (jobId) {
        await this.processJob(jobId);
      }
      
      this.isProcessing = false;
    }, 1000); // Process one job per second
  }

  // Generate unique job ID
  private generateJobId(): string {
    return `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Generate unique batch ID
  private generateBatchId(): string {
    return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export translation data
  exportTranslations(languagePair: string): TranslationJob[] {
    const [source, target] = languagePair.split('-');
    return this.getJobsByLanguagePair(source, target);
  }

  // Import translation data
  importTranslations(translations: TranslationJob[]): void {
    for (const translation of translations) {
      this.jobs.set(translation.id, translation);
    }
  }

  // Get workflow statistics
  getStatistics() {
    const totalJobs = this.jobs.size;
    const completedJobs = this.getJobsByStatus('completed').length;
    const failedJobs = this.getJobsByStatus('failed').length;
    const pendingJobs = this.getJobsByStatus('pending').length;
    const inProgressJobs = this.getJobsByStatus('in_progress').length;

    return {
      totalJobs,
      completedJobs,
      failedJobs,
      pendingJobs,
      inProgressJobs,
      successRate: totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0,
      averageQualityScore: this.calculateAverageQualityScore()
    };
  }

  // Calculate average quality score
  private calculateAverageQualityScore(): number {
    const completedJobs = this.getJobsByStatus('completed');
    if (completedJobs.length === 0) return 0;

    const totalScore = completedJobs.reduce((sum, job) => sum + (job.qualityScore || 0), 0);
    return totalScore / completedJobs.length;
  }

  // Clean up old jobs
  cleanupOldJobs(daysOld: number = 30): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    for (const [jobId, job] of this.jobs.entries()) {
      if (job.createdAt < cutoffDate && job.status === 'completed') {
        this.jobs.delete(jobId);
      }
    }
  }
}

// Create singleton instance
export const translationWorkflow = new TranslationWorkflow();

// Export types for external use
export type { TranslationJob, TranslationBatch, TranslationQualityMetrics };
