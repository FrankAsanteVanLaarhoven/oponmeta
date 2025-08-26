import { 
  UserAuth, 
  Session, 
  AuditLog, 
  UserRole, 
  Permission, 
  ROLE_PERMISSIONS,
  SECURITY_CONFIG,
  ComplianceRecord 
} from '../types/auth';
import { User } from './userService';

// Crypto utilities for secure password handling
// Note: In a browser environment, we'll use Web Crypto API instead of Node.js crypto
const getRandomValues = (arr: Uint8Array) => {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto.getRandomValues(arr);
  }
  // Fallback for environments without crypto support
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
};

export interface LoginCredentials {
  email: string;
  password: string;
  twoFactorCode?: string;
  deviceId?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: Session;
  error?: string;
  requiresTwoFactor?: boolean;
  lockedUntil?: Date;
}

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export class AuthService {
  private users: Map<string, UserAuth> = new Map();
  private sessions: Map<string, Session> = new Map();
  private auditLogs: AuditLog[] = [];
  private complianceRecords: ComplianceRecord[] = [];
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();

  // Password security
  async hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = this.generateSalt();
    const hash = await this.hashWithSalt(password, salt);
    return { hash, salt };
  }

  async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const testHash = await this.hashWithSalt(password, salt);
    return hash === testHash;
  }

  private generateSalt(): string {
    const salt = new Uint8Array(32);
    getRandomValues(salt);
    return Array.from(salt, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  private async hashWithSalt(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt);
    
    if (typeof window !== 'undefined' && window.crypto) {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for environments without Web Crypto API
    return this.simpleHash(password + salt);
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  }

  // Password validation with PCI DSS compliance
  validatePassword(password: string): PasswordValidationResult {
    const errors: string[] = [];
    const config = SECURITY_CONFIG.password;

    if (password.length < config.minLength) {
      errors.push(`Password must be at least ${config.minLength} characters long`);
    }
    if (config.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (config.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (config.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (config.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Rate limiting
  private checkRateLimit(key: string, limit: { window: number; max: number }): boolean {
    const now = Date.now();
    const record = this.rateLimitStore.get(key);

    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + limit.window });
      return true;
    }

    if (record.count >= limit.max) {
      return false;
    }

    record.count++;
    return true;
  }

  // Authentication with comprehensive security
  async login(credentials: LoginCredentials, ipAddress: string, userAgent: string): Promise<AuthResult> {
    const rateLimitKey = `login:${credentials.email}`;
    
    // Check rate limiting
    if (!this.checkRateLimit(rateLimitKey, SECURITY_CONFIG.rateLimit.login)) {
      this.logAudit('LOGIN_RATE_LIMITED', 'auth', undefined, { email: credentials.email }, ipAddress, userAgent, false);
      return {
        success: false,
        error: 'Too many login attempts. Please try again later.'
      };
    }

    const userAuth = this.findUserByEmail(credentials.email);
    if (!userAuth) {
      this.logAudit('LOGIN_FAILED', 'auth', undefined, { email: credentials.email, reason: 'user_not_found' }, ipAddress, userAgent, false);
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    // Check if account is locked
    if (userAuth.lockedUntil && userAuth.lockedUntil > new Date()) {
      this.logAudit('LOGIN_FAILED', 'auth', userAuth.id, { reason: 'account_locked' }, ipAddress, userAgent, false);
      return {
        success: false,
        error: 'Account is temporarily locked',
        lockedUntil: userAuth.lockedUntil
      };
    }

    // Check if account is active
    if (!userAuth.isActive) {
      this.logAudit('LOGIN_FAILED', 'auth', userAuth.id, { reason: 'account_inactive' }, ipAddress, userAgent, false);
      return {
        success: false,
        error: 'Account is deactivated'
      };
    }

    // Verify password
    const passwordValid = await this.verifyPassword(credentials.password, userAuth.passwordHash, userAuth.salt);
    
    if (!passwordValid) {
      userAuth.failedLoginAttempts++;
      
      // Lock account after 5 failed attempts
      if (userAuth.failedLoginAttempts >= 5) {
        userAuth.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      }
      
      this.logAudit('LOGIN_FAILED', 'auth', userAuth.id, { reason: 'invalid_password', attempts: userAuth.failedLoginAttempts }, ipAddress, userAgent, false);
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    // Check two-factor authentication
    if (userAuth.twoFactorEnabled) {
      if (!credentials.twoFactorCode) {
        this.logAudit('LOGIN_2FA_REQUIRED', 'auth', userAuth.id, {}, ipAddress, userAgent, true);
        return {
          success: false,
          requiresTwoFactor: true,
          error: 'Two-factor authentication required'
        };
      }

      // Verify 2FA code (simplified - in production use proper TOTP library)
      if (!this.verifyTwoFactorCode(userAuth.twoFactorSecret!, credentials.twoFactorCode)) {
        this.logAudit('LOGIN_FAILED', 'auth', userAuth.id, { reason: 'invalid_2fa' }, ipAddress, userAgent, false);
        return {
          success: false,
          error: 'Invalid two-factor authentication code'
        };
      }
    }

    // Reset failed login attempts
    userAuth.failedLoginAttempts = 0;
    userAuth.lockedUntil = undefined;
    userAuth.lastLoginAt = new Date();

    // Create session
    const session = await this.createSession(userAuth.id, ipAddress, userAgent, credentials.deviceId);

    // Check concurrent sessions limit
    const activeSessions = this.getActiveSessions(userAuth.id);
    if (activeSessions.length >= SECURITY_CONFIG.session.maxConcurrentSessions) {
      // Remove oldest session
      const oldestSession = activeSessions.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())[0];
      this.revokeSession(oldestSession.id);
    }

    this.logAudit('LOGIN_SUCCESS', 'auth', userAuth.id, { sessionId: session.id }, ipAddress, userAgent, true);

    return {
      success: true,
      session,
      user: this.getUserById(userAuth.id)
    };
  }

  // Session management
  async createSession(userId: string, ipAddress: string, userAgent: string, deviceId?: string): Promise<Session> {
    const session: Session = {
      id: crypto.randomUUID(),
      userId,
      token: crypto.randomBytes(32).toString('hex'),
      refreshToken: crypto.randomBytes(32).toString('hex'),
      expiresAt: new Date(Date.now() + SECURITY_CONFIG.session.maxDuration),
      refreshExpiresAt: new Date(Date.now() + SECURITY_CONFIG.session.refreshDuration),
      ipAddress,
      userAgent,
      deviceId,
      isActive: true,
      createdAt: new Date(),
      lastActivityAt: new Date()
    };

    this.sessions.set(session.id, session);
    return session;
  }

  async validateSession(sessionId: string, token: string): Promise<{ valid: boolean; user?: User; session?: Session }> {
    const session = this.sessions.get(sessionId);
    
    if (!session || !session.isActive) {
      return { valid: false };
    }

    if (session.token !== token) {
      return { valid: false };
    }

    if (session.expiresAt < new Date()) {
      session.isActive = false;
      return { valid: false };
    }

    // Update last activity
    session.lastActivityAt = new Date();

    const user = this.getUserById(session.userId);
    return { valid: true, user, session };
  }

  async refreshSession(refreshToken: string): Promise<{ success: boolean; session?: Session; error?: string }> {
    const session = Array.from(this.sessions.values()).find(s => s.refreshToken === refreshToken);
    
    if (!session || !session.isActive) {
      return { success: false, error: 'Invalid refresh token' };
    }

    if (session.refreshExpiresAt < new Date()) {
      session.isActive = false;
      return { success: false, error: 'Refresh token expired' };
    }

    // Generate new tokens
    session.token = crypto.randomBytes(32).toString('hex');
    session.refreshToken = crypto.randomBytes(32).toString('hex');
    session.expiresAt = new Date(Date.now() + SECURITY_CONFIG.session.maxDuration);
    session.refreshExpiresAt = new Date(Date.now() + SECURITY_CONFIG.session.refreshDuration);
    session.lastActivityAt = new Date();

    return { success: true, session };
  }

  async revokeSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
    }
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    for (const session of this.sessions.values()) {
      if (session.userId === userId && session.isActive) {
        session.isActive = false;
      }
    }
  }

  // Permission checking
  hasPermission(userId: string, permission: Permission): boolean {
    const userAuth = this.users.get(userId);
    if (!userAuth || !userAuth.isActive) {
      return false;
    }

    return userAuth.permissions.includes(permission);
  }

  hasRole(userId: string, role: UserRole): boolean {
    const userAuth = this.users.get(userId);
    if (!userAuth || !userAuth.isActive) {
      return false;
    }

    return userAuth.roles.includes(role);
  }

  getUserPermissions(userId: string): Permission[] {
    const userAuth = this.users.get(userId);
    if (!userAuth || !userAuth.isActive) {
      return [];
    }

    return userAuth.permissions;
  }

  getUserRoles(userId: string): UserRole[] {
    const userAuth = this.users.get(userId);
    if (!userAuth || !userAuth.isActive) {
      return [];
    }

    return userAuth.roles;
  }

  // Role management
  async assignRole(userId: string, role: UserRole): Promise<boolean> {
    const userAuth = this.users.get(userId);
    if (!userAuth) {
      return false;
    }

    if (!userAuth.roles.includes(role)) {
      userAuth.roles.push(role);
      userAuth.permissions = this.calculateUserPermissions(userAuth.roles);
      userAuth.updatedAt = new Date();
    }

    return true;
  }

  async removeRole(userId: string, role: UserRole): Promise<boolean> {
    const userAuth = this.users.get(userId);
    if (!userAuth) {
      return false;
    }

    userAuth.roles = userAuth.roles.filter(r => r !== role);
    userAuth.permissions = this.calculateUserPermissions(userAuth.roles);
    userAuth.updatedAt = new Date();

    return true;
  }

  private calculateUserPermissions(roles: UserRole[]): Permission[] {
    const permissions = new Set<Permission>();
    
    for (const role of roles) {
      const rolePermissions = ROLE_PERMISSIONS[role] || [];
      rolePermissions.forEach(permission => permissions.add(permission));
    }

    return Array.from(permissions);
  }

  // Audit logging
  logAudit(
    action: string,
    resource: string,
    userId?: string,
    details: Record<string, any> = {},
    ipAddress: string,
    userAgent: string,
    success: boolean,
    errorMessage?: string
  ): void {
    const auditLog: AuditLog = {
      id: crypto.randomUUID(),
      userId: userId || 'anonymous',
      action,
      resource,
      details,
      ipAddress,
      userAgent,
      timestamp: new Date(),
      success,
      errorMessage
    };

    this.auditLogs.push(auditLog);
  }

  getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    startDate?: Date;
    endDate?: Date;
    success?: boolean;
  }): AuditLog[] {
    let logs = [...this.auditLogs];

    if (filters?.userId) {
      logs = logs.filter(log => log.userId === filters.userId);
    }
    if (filters?.action) {
      logs = logs.filter(log => log.action === filters.action);
    }
    if (filters?.resource) {
      logs = logs.filter(log => log.resource === filters.resource);
    }
    if (filters?.startDate) {
      logs = logs.filter(log => log.timestamp >= filters.startDate!);
    }
    if (filters?.endDate) {
      logs = logs.filter(log => log.timestamp <= filters.endDate!);
    }
    if (filters?.success !== undefined) {
      logs = logs.filter(log => log.success === filters.success);
    }

    return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // GDPR Compliance
  async createComplianceRecord(
    userId: string,
    type: ComplianceRecord['type'],
    requestData: Record<string, any>
  ): Promise<ComplianceRecord> {
    const record: ComplianceRecord = {
      id: crypto.randomUUID(),
      userId,
      type,
      status: 'pending',
      requestData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.complianceRecords.push(record);
    return record;
  }

  async processDataExport(userId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const userAuth = this.users.get(userId);
      if (!userAuth) {
        return { success: false, error: 'User not found' };
      }

      // Collect all user data
      const userData = {
        profile: this.getUserById(userId),
        sessions: this.getActiveSessions(userId),
        auditLogs: this.getAuditLogs({ userId }),
        complianceRecords: this.complianceRecords.filter(r => r.userId === userId)
      };

      // Create compliance record
      await this.createComplianceRecord(userId, 'data_export', { exportedAt: new Date() });

      return { success: true, data: userData };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async processDataDeletion(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Revoke all sessions
      await this.revokeAllUserSessions(userId);

      // Mark user as deleted (soft delete for compliance)
      const userAuth = this.users.get(userId);
      if (userAuth) {
        userAuth.isActive = false;
        userAuth.updatedAt = new Date();
      }

      // Create compliance record
      await this.createComplianceRecord(userId, 'data_deletion', { deletedAt: new Date() });

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Two-factor authentication
  private verifyTwoFactorCode(secret: string, code: string): boolean {
    // Simplified TOTP verification - in production use proper library
    // This is a placeholder implementation
    return code.length === 6 && /^\d{6}$/.test(code);
  }

  // Helper methods
  private findUserByEmail(email: string): UserAuth | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  private getUserById(userId: string): User | undefined {
    // This would integrate with your existing UserService
    // For now, returning a mock user
    return {
      id: userId,
      email: 'user@example.com',
      firstName: 'User',
      lastName: 'Example',
      isActive: true,
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          inApp: true,
          marketing: false
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: false,
          showPhone: false,
          allowMessages: true
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          screenReader: false
        }
      },
      profile: {
        skills: [],
        interests: [],
        education: [],
        experience: [],
        socialLinks: [],
        achievements: []
      }
    };
  }

  private getActiveSessions(userId: string): Session[] {
    return Array.from(this.sessions.values()).filter(
      session => session.userId === userId && session.isActive
    );
  }
}

// Export singleton instance
export const authService = new AuthService();
