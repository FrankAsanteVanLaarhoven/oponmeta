// For development, use mock service instead of actual VAPI
// import Vapi from "@vapi-ai/web";
import { mockVapiService } from './mockVapiService';

export interface VapiConfig {
  token: string;
  assistantId?: string;
  assistantName?: string;
  assistantInstructions?: string;
  assistantModel?: string;
  assistantVoice?: string;
  assistantFirstMessage?: string;
  assistantContext?: string;
}

export interface VapiSession {
  id: string;
  status: 'idle' | 'connecting' | 'connected' | 'disconnected' | 'error';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  transcript?: string;
  errors?: string[];
}

export interface VapiMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  duration?: number;
}

class VapiService {
  private config: VapiConfig;
  private currentSession: VapiSession | null = null;
  private messageHistory: VapiMessage[] = [];
  private isInitialized = false;

  constructor(config: VapiConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize() {
    // For development, always initialize successfully
    this.isInitialized = true;
    console.log('VAPI service initialized successfully (using mock service)');
  }

  public async startSession(assistantConfig?: Partial<VapiConfig>): Promise<VapiSession> {
    if (!this.isInitialized) {
      throw new Error('VAPI service not initialized');
    }

    try {
      const sessionConfig = {
        ...this.config,
        ...assistantConfig,
      };

      const session: VapiSession = {
        id: `session_${Date.now()}`,
        status: 'connecting',
        startTime: new Date(),
      };

      this.currentSession = session;
      this.messageHistory = [];

      // Use mock service for development
      const mockSession = await mockVapiService.startSession(sessionConfig);
      
      session.status = mockSession.status;
      session.id = mockSession.id;
      console.log('VAPI session started:', session.id);

      return session;
    } catch (error) {
      console.error('Failed to start VAPI session:', error);
      if (this.currentSession) {
        this.currentSession.status = 'error';
        this.currentSession.errors = [error instanceof Error ? error.message : 'Unknown error'];
      }
      throw error;
    }
  }

  public async stopSession(): Promise<void> {
    if (!this.currentSession || this.currentSession.status === 'disconnected') {
      return;
    }

    try {
      await mockVapiService.stopSession();
      this.currentSession.status = 'disconnected';
      this.currentSession.endTime = new Date();
      this.currentSession.duration = this.currentSession.endTime.getTime() - (this.currentSession.startTime?.getTime() || 0);
      console.log('VAPI session stopped:', this.currentSession.id);
    } catch (error) {
      console.error('Failed to stop VAPI session:', error);
      throw error;
    }
  }

  public async sendMessage(content: string): Promise<VapiMessage> {
    if (!this.currentSession || this.currentSession.status !== 'connected') {
      throw new Error('No active VAPI session');
    }

    try {
      const message = await mockVapiService.sendMessage(content);
      this.messageHistory.push(message);
      return message;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  public getCurrentSession(): VapiSession | null {
    return this.currentSession;
  }

  public getMessageHistory(): VapiMessage[] {
    return [...this.messageHistory];
  }

  public getSessionDuration(): number {
    if (!this.currentSession || !this.currentSession.startTime) {
      return 0;
    }

    const endTime = this.currentSession.endTime || new Date();
    return endTime.getTime() - this.currentSession.startTime.getTime();
  }

  public isConnected(): boolean {
    return this.currentSession?.status === 'connected';
  }

  public async reconnect(): Promise<void> {
    if (this.currentSession && this.currentSession.status === 'disconnected') {
      await this.startSession();
    }
  }

  public clearHistory(): void {
    this.messageHistory = [];
  }

  public getTranscript(): string {
    return this.messageHistory
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n');
  }

  public setMuted(muted: boolean): void {
    mockVapiService.setMuted(muted);
  }

  public isMuted(): boolean {
    return mockVapiService.isMuted();
  }
}

// Create singleton instance
const vapiService = new VapiService({
  token: import.meta.env.VITE_VAPI_WEB_TOKEN || '',
  assistantName: 'OponMeta AI Companion',
  assistantInstructions: 'You are an AI learning companion for the OponMeta platform. Help users with their learning journey, answer questions about courses, provide guidance on skill development, and engage in educational conversations.',
  assistantModel: 'gpt-4',
  assistantVoice: 'shimmer',
  assistantFirstMessage: 'Hello! I\'m your AI learning companion on OponMeta. I\'m here to help you with your learning journey, answer questions about courses, and provide guidance on skill development. How can I assist you today?',
  assistantContext: 'Educational companion for the OponMeta learning platform',
});

export { vapiService };
export default vapiService;