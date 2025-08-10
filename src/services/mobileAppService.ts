export interface MobileDevice {
  id: string;
  userId: string;
  deviceId: string;
  deviceType: 'ios' | 'android' | 'web';
  deviceModel: string;
  osVersion: string;
  appVersion: string;
  pushToken?: string;
  isActive: boolean;
  lastSeen: Date;
  createdAt: Date;
}

export interface PushNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  type: 'course' | 'achievement' | 'reminder' | 'social' | 'system';
  isRead: boolean;
  isSent: boolean;
  scheduledAt?: Date;
  sentAt?: Date;
  createdAt: Date;
}

export interface OfflineContent {
  id: string;
  userId: string;
  contentId: string;
  contentType: 'course' | 'article' | 'video' | 'companion';
  title: string;
  data: any;
  size: number;
  downloadedAt: Date;
  lastAccessed: Date;
  expiresAt?: Date;
}

export interface MobileAnalytics {
  id: string;
  userId: string;
  event: string;
  data: Record<string, any>;
  deviceInfo: {
    deviceType: string;
    osVersion: string;
    appVersion: string;
  };
  timestamp: Date;
  sessionId: string;
}

export interface MobileSettings {
  userId: string;
  pushNotifications: {
    enabled: boolean;
    courseUpdates: boolean;
    achievements: boolean;
    social: boolean;
    reminders: boolean;
  };
  offlineMode: {
    enabled: boolean;
    autoDownload: boolean;
    maxStorage: number;
  };
  performance: {
    lowDataMode: boolean;
    autoPlayVideos: boolean;
    imageQuality: 'low' | 'medium' | 'high';
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReader: boolean;
  };
}

export interface MobileSession {
  id: string;
  userId: string;
  deviceId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  activities: MobileActivity[];
  networkType: 'wifi' | 'cellular' | 'offline';
  batteryLevel: number;
}

export interface MobileActivity {
  type: 'course_view' | 'video_play' | 'quiz_taken' | 'companion_interaction' | 'social_interaction';
  contentId?: string;
  duration: number;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class MobileAppService {
  private devices: MobileDevice[] = [];
  private pushNotifications: PushNotification[] = [];
  private offlineContent: OfflineContent[] = [];
  private mobileAnalytics: MobileAnalytics[] = [];
  private mobileSettings: MobileSettings[] = [];
  private mobileSessions: MobileSession[] = [];

  constructor() {
    this.loadData();
  }

  // Device Management
  async registerDevice(device: Omit<MobileDevice, 'id' | 'isActive' | 'lastSeen' | 'createdAt'>): Promise<MobileDevice> {
    const existingDevice = this.devices.find(d => d.deviceId === device.deviceId && d.userId === device.userId);
    
    if (existingDevice) {
      existingDevice.isActive = true;
      existingDevice.lastSeen = new Date();
      existingDevice.osVersion = device.osVersion;
      existingDevice.appVersion = device.appVersion;
      existingDevice.pushToken = device.pushToken;
      this.saveDevices();
      return existingDevice;
    }

    const newDevice: MobileDevice = {
      ...device,
      id: `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isActive: true,
      lastSeen: new Date(),
      createdAt: new Date(),
    };

    this.devices.push(newDevice);
    this.saveDevices();
    return newDevice;
  }

  async getDevices(userId: string): Promise<MobileDevice[]> {
    return this.devices.filter(d => d.userId === userId && d.isActive);
  }

  async updateDeviceStatus(deviceId: string, isActive: boolean): Promise<MobileDevice | null> {
    const device = this.devices.find(d => d.deviceId === deviceId);
    if (!device) return null;

    device.isActive = isActive;
    device.lastSeen = new Date();
    this.saveDevices();
    return device;
  }

  // Push Notifications
  async createPushNotification(notification: Omit<PushNotification, 'id' | 'isRead' | 'isSent' | 'createdAt'>): Promise<PushNotification> {
    const newNotification: PushNotification = {
      ...notification,
      id: `push_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isRead: false,
      isSent: false,
      createdAt: new Date(),
    };

    this.pushNotifications.push(newNotification);
    this.savePushNotifications();
    return newNotification;
  }

  async getPushNotifications(userId: string, options?: {
    unreadOnly?: boolean;
    type?: PushNotification['type'];
    limit?: number;
  }): Promise<PushNotification[]> {
    let notifications = this.pushNotifications.filter(n => n.userId === userId);

    if (options?.unreadOnly) {
      notifications = notifications.filter(n => !n.isRead);
    }

    if (options?.type) {
      notifications = notifications.filter(n => n.type === options.type);
    }

    notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options?.limit) {
      notifications = notifications.slice(0, options.limit);
    }

    return notifications;
  }

  async markNotificationAsRead(notificationId: string): Promise<PushNotification | null> {
    const notification = this.pushNotifications.find(n => n.id === notificationId);
    if (!notification) return null;

    notification.isRead = true;
    this.savePushNotifications();
    return notification;
  }

  async sendPushNotification(userId: string, notification: Omit<PushNotification, 'id' | 'userId' | 'isRead' | 'isSent' | 'createdAt'>): Promise<PushNotification> {
    const newNotification = await this.createPushNotification({
      ...notification,
      userId,
    });

    // Simulate sending push notification
    newNotification.isSent = true;
    newNotification.sentAt = new Date();
    this.savePushNotifications();

    return newNotification;
  }

  // Offline Content Management
  async downloadContent(content: Omit<OfflineContent, 'id' | 'downloadedAt' | 'lastAccessed'>): Promise<OfflineContent> {
    const existingContent = this.offlineContent.find(c => c.contentId === content.contentId && c.userId === content.userId);
    
    if (existingContent) {
      existingContent.lastAccessed = new Date();
      existingContent.data = content.data;
      existingContent.size = content.size;
      this.saveOfflineContent();
      return existingContent;
    }

    const newContent: OfflineContent = {
      ...content,
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      downloadedAt: new Date(),
      lastAccessed: new Date(),
    };

    this.offlineContent.push(newContent);
    this.saveOfflineContent();
    return newContent;
  }

  async getOfflineContent(userId: string, contentType?: OfflineContent['contentType']): Promise<OfflineContent[]> {
    let content = this.offlineContent.filter(c => c.userId === userId);

    if (contentType) {
      content = content.filter(c => c.contentType === contentType);
    }

    return content.sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime());
  }

  async removeOfflineContent(contentId: string): Promise<boolean> {
    const index = this.offlineContent.findIndex(c => c.id === contentId);
    if (index === -1) return false;

    this.offlineContent.splice(index, 1);
    this.saveOfflineContent();
    return true;
  }

  async getOfflineStorageUsage(userId: string): Promise<{
    totalSize: number;
    contentCount: number;
    availableSpace: number;
  }> {
    const userContent = this.offlineContent.filter(c => c.userId === userId);
    const totalSize = userContent.reduce((sum, content) => sum + content.size, 0);
    const contentCount = userContent.length;
    const availableSpace = 1024 * 1024 * 1024; // 1GB default

    return {
      totalSize,
      contentCount,
      availableSpace,
    };
  }

  // Mobile Analytics
  async trackMobileEvent(event: Omit<MobileAnalytics, 'id' | 'timestamp' | 'sessionId'>): Promise<MobileAnalytics> {
    const newEvent: MobileAnalytics = {
      ...event,
      id: `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      sessionId: this.getCurrentSessionId(event.userId),
    };

    this.mobileAnalytics.push(newEvent);
    this.saveMobileAnalytics();
    return newEvent;
  }

  async getMobileAnalytics(userId: string, options?: {
    startDate?: Date;
    endDate?: Date;
    event?: string;
    limit?: number;
  }): Promise<MobileAnalytics[]> {
    let analytics = this.mobileAnalytics.filter(a => a.userId === userId);

    if (options?.startDate) {
      analytics = analytics.filter(a => a.timestamp >= options.startDate!);
    }

    if (options?.endDate) {
      analytics = analytics.filter(a => a.timestamp <= options.endDate!);
    }

    if (options?.event) {
      analytics = analytics.filter(a => a.event === options.event);
    }

    analytics.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    if (options?.limit) {
      analytics = analytics.slice(0, options.limit);
    }

    return analytics;
  }

  // Mobile Settings
  async getMobileSettings(userId: string): Promise<MobileSettings | null> {
    return this.mobileSettings.find(s => s.userId === userId) || null;
  }

  async updateMobileSettings(userId: string, updates: Partial<MobileSettings>): Promise<MobileSettings> {
    let settings = this.mobileSettings.find(s => s.userId === userId);
    
    if (!settings) {
      settings = {
        userId,
        pushNotifications: {
          enabled: true,
          courseUpdates: true,
          achievements: true,
          social: true,
          reminders: true,
        },
        offlineMode: {
          enabled: false,
          autoDownload: false,
          maxStorage: 1024 * 1024 * 1024, // 1GB
        },
        performance: {
          lowDataMode: false,
          autoPlayVideos: true,
          imageQuality: 'medium',
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          screenReader: false,
        },
      };
      this.mobileSettings.push(settings);
    }

    Object.assign(settings, updates);
    this.saveMobileSettings();
    return settings;
  }

  // Mobile Sessions
  async startMobileSession(session: Omit<MobileSession, 'id' | 'startTime' | 'duration' | 'activities'>): Promise<MobileSession> {
    const newSession: MobileSession = {
      ...session,
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: new Date(),
      duration: 0,
      activities: [],
    };

    this.mobileSessions.push(newSession);
    this.saveMobileSessions();
    return newSession;
  }

  async endMobileSession(sessionId: string): Promise<MobileSession | null> {
    const session = this.mobileSessions.find(s => s.id === sessionId);
    if (!session) return null;

    session.endTime = new Date();
    session.duration = session.endTime.getTime() - session.startTime.getTime();
    this.saveMobileSessions();
    return session;
  }

  async addMobileActivity(sessionId: string, activity: Omit<MobileActivity, 'timestamp'>): Promise<MobileActivity | null> {
    const session = this.mobileSessions.find(s => s.id === sessionId);
    if (!session) return null;

    const newActivity: MobileActivity = {
      ...activity,
      timestamp: new Date(),
    };

    session.activities.push(newActivity);
    this.saveMobileSessions();
    return newActivity;
  }

  async getMobileSessions(userId: string, options?: {
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<MobileSession[]> {
    let sessions = this.mobileSessions.filter(s => s.userId === userId);

    if (options?.startDate) {
      sessions = sessions.filter(s => s.startTime >= options.startDate!);
    }

    if (options?.endDate) {
      sessions = sessions.filter(s => s.startTime <= options.endDate!);
    }

    sessions.sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    if (options?.limit) {
      sessions = sessions.slice(0, options.limit);
    }

    return sessions;
  }

  // Utility Methods
  private getCurrentSessionId(userId: string): string {
    const activeSession = this.mobileSessions.find(s => s.userId === userId && !s.endTime);
    return activeSession?.id || 'no-session';
  }

  // Mobile-Specific Features
  async checkNetworkStatus(): Promise<{
    isOnline: boolean;
    networkType: 'wifi' | 'cellular' | 'offline';
    connectionSpeed: 'slow' | 'medium' | 'fast';
  }> {
    // Simulate network status check
    return {
      isOnline: navigator.onLine,
      networkType: 'wifi', // This would be determined by actual device APIs
      connectionSpeed: 'medium',
    };
  }

  async getBatteryStatus(): Promise<{
    level: number;
    isCharging: boolean;
  }> {
    // Simulate battery status check
    return {
      level: 0.75, // This would be determined by actual device APIs
      isCharging: false,
    };
  }

  async requestNotificationPermission(): Promise<{
    granted: boolean;
    permission: 'granted' | 'denied' | 'default';
  }> {
    // Simulate notification permission request
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return {
        granted: permission === 'granted',
        permission,
      };
    }

    return {
      granted: false,
      permission: 'denied',
    };
  }

  async syncOfflineData(userId: string): Promise<{
    synced: boolean;
    itemsSynced: number;
    errors: string[];
  }> {
    const offlineContent = this.offlineContent.filter(c => c.userId === userId);
    const errors: string[] = [];

    // Simulate syncing offline data
    try {
      // This would actually sync data with the server
      const itemsSynced = offlineContent.length;
      return {
        synced: true,
        itemsSynced,
        errors,
      };
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error');
      return {
        synced: false,
        itemsSynced: 0,
        errors,
      };
    }
  }

  // Analytics
  async getMobileAnalyticsSummary(userId: string): Promise<{
    totalSessions: number;
    totalDuration: number;
    averageSessionDuration: number;
    mostUsedFeatures: Array<{ feature: string; count: number }>;
    deviceTypes: Array<{ type: string; count: number }>;
  }> {
    const userSessions = this.mobileSessions.filter(s => s.userId === userId);
    const totalSessions = userSessions.length;
    const totalDuration = userSessions.reduce((sum, s) => sum + s.duration, 0);
    const averageSessionDuration = totalSessions > 0 ? totalDuration / totalSessions : 0;

    const featureCounts = userSessions.reduce((acc, session) => {
      session.activities.forEach(activity => {
        acc[activity.type] = (acc[activity.type] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const mostUsedFeatures = Object.entries(featureCounts)
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const deviceCounts = this.devices
      .filter(d => d.userId === userId)
      .reduce((acc, device) => {
        acc[device.deviceType] = (acc[device.deviceType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const deviceTypes = Object.entries(deviceCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSessions,
      totalDuration,
      averageSessionDuration: Math.round(averageSessionDuration / 1000 / 60), // Convert to minutes
      mostUsedFeatures,
      deviceTypes,
    };
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedDevices = localStorage.getItem('oponmeta_mobile_devices');
      if (storedDevices) {
        this.devices = JSON.parse(storedDevices).map((d: any) => ({
          ...d,
          lastSeen: new Date(d.lastSeen),
          createdAt: new Date(d.createdAt),
        }));
      }

      const storedPushNotifications = localStorage.getItem('oponmeta_mobile_push_notifications');
      if (storedPushNotifications) {
        this.pushNotifications = JSON.parse(storedPushNotifications).map((n: any) => ({
          ...n,
          scheduledAt: n.scheduledAt ? new Date(n.scheduledAt) : undefined,
          sentAt: n.sentAt ? new Date(n.sentAt) : undefined,
          createdAt: new Date(n.createdAt),
        }));
      }

      const storedOfflineContent = localStorage.getItem('oponmeta_mobile_offline_content');
      if (storedOfflineContent) {
        this.offlineContent = JSON.parse(storedOfflineContent).map((c: any) => ({
          ...c,
          downloadedAt: new Date(c.downloadedAt),
          lastAccessed: new Date(c.lastAccessed),
          expiresAt: c.expiresAt ? new Date(c.expiresAt) : undefined,
        }));
      }

      const storedMobileAnalytics = localStorage.getItem('oponmeta_mobile_analytics');
      if (storedMobileAnalytics) {
        this.mobileAnalytics = JSON.parse(storedMobileAnalytics).map((a: any) => ({
          ...a,
          timestamp: new Date(a.timestamp),
        }));
      }

      const storedMobileSettings = localStorage.getItem('oponmeta_mobile_settings');
      if (storedMobileSettings) {
        this.mobileSettings = JSON.parse(storedMobileSettings);
      }

      const storedMobileSessions = localStorage.getItem('oponmeta_mobile_sessions');
      if (storedMobileSessions) {
        this.mobileSessions = JSON.parse(storedMobileSessions).map((s: any) => ({
          ...s,
          startTime: new Date(s.startTime),
          endTime: s.endTime ? new Date(s.endTime) : undefined,
          activities: s.activities.map((a: any) => ({
            ...a,
            timestamp: new Date(a.timestamp),
          })),
        }));
      }
    } catch (error) {
      console.error('Failed to load mobile app data:', error);
    }
  }

  private saveDevices(): void {
    try {
      localStorage.setItem('oponmeta_mobile_devices', JSON.stringify(this.devices));
    } catch (error) {
      console.error('Failed to save devices:', error);
    }
  }

  private savePushNotifications(): void {
    try {
      localStorage.setItem('oponmeta_mobile_push_notifications', JSON.stringify(this.pushNotifications));
    } catch (error) {
      console.error('Failed to save push notifications:', error);
    }
  }

  private saveOfflineContent(): void {
    try {
      localStorage.setItem('oponmeta_mobile_offline_content', JSON.stringify(this.offlineContent));
    } catch (error) {
      console.error('Failed to save offline content:', error);
    }
  }

  private saveMobileAnalytics(): void {
    try {
      localStorage.setItem('oponmeta_mobile_analytics', JSON.stringify(this.mobileAnalytics));
    } catch (error) {
      console.error('Failed to save mobile analytics:', error);
    }
  }

  private saveMobileSettings(): void {
    try {
      localStorage.setItem('oponmeta_mobile_settings', JSON.stringify(this.mobileSettings));
    } catch (error) {
      console.error('Failed to save mobile settings:', error);
    }
  }

  private saveMobileSessions(): void {
    try {
      localStorage.setItem('oponmeta_mobile_sessions', JSON.stringify(this.mobileSessions));
    } catch (error) {
      console.error('Failed to save mobile sessions:', error);
    }
  }
}

// Create singleton instance
const mobileAppService = new MobileAppService();

export { mobileAppService };
export default mobileAppService;
