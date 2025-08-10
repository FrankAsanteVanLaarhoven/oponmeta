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

class MockVapiService {
  private config: VapiConfig;
  private currentSession: VapiSession | null = null;
  private messageHistory: VapiMessage[] = [];
  private isInitialized = false;
  private sessionStartTime: number = 0;
  private muted = false;

  constructor(config: VapiConfig) {
    this.config = config;
    this.initialize();
  }

  private initialize() {
    console.log('Mock VAPI service initialized for development');
    this.isInitialized = true;
  }

  public async startSession(assistantConfig?: Partial<VapiConfig>): Promise<VapiSession> {
    if (!this.isInitialized) {
      throw new Error('Mock VAPI service not initialized');
    }

    const sessionConfig = {
      ...this.config,
      ...assistantConfig,
    };

    const session: VapiSession = {
      id: `mock_session_${Date.now()}`,
      status: 'connecting',
      startTime: new Date(),
    };

    this.currentSession = session;
    this.messageHistory = [];
    this.sessionStartTime = Date.now();

    // Simulate connection delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    session.status = 'connected';
    console.log('Mock VAPI session started:', session.id);

    // Add initial message
    const initialMessage: VapiMessage = {
      id: `msg_${Date.now()}`,
      type: 'assistant',
      content: sessionConfig.assistantFirstMessage || 'Hello! I\'m your AI learning companion. How can I help you today?',
      timestamp: new Date(),
    };
    this.messageHistory.push(initialMessage);

    return session;
  }

  public async stopSession(): Promise<void> {
    if (this.currentSession) {
      this.currentSession.status = 'disconnected';
      this.currentSession.endTime = new Date();
      this.currentSession.duration = this.getSessionDuration();
      this.currentSession.transcript = this.getTranscript();
      console.log('Mock VAPI session stopped');
    }
  }

  public async sendMessage(content: string): Promise<VapiMessage> {
    if (!this.currentSession || this.currentSession.status !== 'connected') {
      throw new Error('No active session');
    }

    // Add user message
    const userMessage: VapiMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    this.messageHistory.push(userMessage);

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Generate mock AI response
    const responses = [
      "That's a great question! Let me help you understand that better.",
      "I can see you're making good progress. Here's what you should know...",
      "Excellent point! This relates to what we discussed earlier.",
      "Let me break this down for you in a simple way.",
      "You're on the right track! Here's some additional information...",
      "That's an interesting perspective. Let me add some context...",
      "I'm glad you asked that. Here's what you need to know...",
      "Perfect! Let me explain this concept further...",
      "You've got it! Here's how this connects to the bigger picture...",
      "Great observation! This is exactly what we're learning about."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const assistantMessage: VapiMessage = {
      id: `msg_${Date.now()}`,
      type: 'assistant',
      content: randomResponse,
      timestamp: new Date(),
    };
    this.messageHistory.push(assistantMessage);

    return assistantMessage;
  }

  public getCurrentSession(): VapiSession | null {
    return this.currentSession;
  }

  public getMessageHistory(): VapiMessage[] {
    return this.messageHistory;
  }

  public getSessionDuration(): number {
    if (!this.sessionStartTime) return 0;
    return Math.floor((Date.now() - this.sessionStartTime) / 1000);
  }

  public isConnected(): boolean {
    return this.currentSession?.status === 'connected';
  }

  public async reconnect(): Promise<void> {
    console.log('Mock VAPI reconnecting...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (this.currentSession) {
      this.currentSession.status = 'connected';
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
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }
}

// Create and export a mock instance
export const mockVapiService = new MockVapiService({
  token: 'mock_token_for_development',
  assistantName: 'Mock AI Companion',
  assistantInstructions: 'You are a helpful AI companion for learning and education.',
  assistantModel: 'gpt-4',
  assistantVoice: 'shimmer',
  assistantFirstMessage: 'Hello! I\'m your AI learning companion. How can I help you today?',
  assistantContext: 'Educational companion for learning and skill development',
});

export default mockVapiService;
