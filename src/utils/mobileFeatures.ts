// Mobile App Features and Push Notifications System

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  icon?: string;
  badge?: number;
  tag?: string;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
  timestamp: number;
  read: boolean;
  category: 'recommendation' | 'achievement' | 'reminder' | 'social' | 'update';
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationPreferences {
  recommendations: boolean;
  achievements: boolean;
  reminders: boolean;
  social: boolean;
  updates: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface OfflineData {
  courses: any[];
  userData: any;
  lastSync: number;
  pendingActions: OfflineAction[];
}

export interface OfflineAction {
  id: string;
  type: 'favorite' | 'wishlist' | 'like' | 'review' | 'completion';
  data: any;
  timestamp: number;
  retryCount: number;
}

export interface MobileAppConfig {
  enablePushNotifications: boolean;
  enableOfflineMode: boolean;
  enableBackgroundSync: boolean;
  enableGeolocation: boolean;
  enableBiometrics: boolean;
  cacheSize: number; // in MB
  syncInterval: number; // in minutes
}

class MobileFeaturesService {
  private notifications: PushNotification[] = [];
  private preferences: NotificationPreferences;
  private offlineData: OfflineData;
  private config: MobileAppConfig;
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
  private pushSubscription: PushSubscription | null = null;

  constructor() {
    this.preferences = this.loadNotificationPreferences();
    this.offlineData = this.loadOfflineData();
    this.config = this.loadMobileConfig();
    this.notifications = this.loadNotifications();
    this.initializeServiceWorker();
  }

  private loadNotificationPreferences(): NotificationPreferences {
    try {
      const stored = localStorage.getItem('oponmeta_notification_preferences');
      return stored ? JSON.parse(stored) : this.getDefaultPreferences();
    } catch (error) {
      console.warn('Failed to load notification preferences:', error);
      return this.getDefaultPreferences();
    }
  }

  private getDefaultPreferences(): NotificationPreferences {
    return {
      recommendations: true,
      achievements: true,
      reminders: true,
      social: false,
      updates: true,
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      },
      frequency: 'daily'
    };
  }

  private loadOfflineData(): OfflineData {
    try {
      const stored = localStorage.getItem('oponmeta_offline_data');
      return stored ? JSON.parse(stored) : this.getDefaultOfflineData();
    } catch (error) {
      console.warn('Failed to load offline data:', error);
      return this.getDefaultOfflineData();
    }
  }

  private getDefaultOfflineData(): OfflineData {
    return {
      courses: [],
      userData: {},
      lastSync: Date.now(),
      pendingActions: []
    };
  }

  private loadMobileConfig(): MobileAppConfig {
    try {
      const stored = localStorage.getItem('oponmeta_mobile_config');
      return stored ? JSON.parse(stored) : this.getDefaultMobileConfig();
    } catch (error) {
      console.warn('Failed to load mobile config:', error);
      return this.getDefaultMobileConfig();
    }
  }

  private getDefaultMobileConfig(): MobileAppConfig {
    return {
      enablePushNotifications: true,
      enableOfflineMode: true,
      enableBackgroundSync: true,
      enableGeolocation: false,
      enableBiometrics: false,
      cacheSize: 50, // 50MB
      syncInterval: 30 // 30 minutes
    };
  }

  private loadNotifications(): PushNotification[] {
    try {
      const stored = localStorage.getItem('oponmeta_notifications');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Failed to load notifications:', error);
      return [];
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem('oponmeta_notification_preferences', JSON.stringify(this.preferences));
      localStorage.setItem('oponmeta_offline_data', JSON.stringify(this.offlineData));
      localStorage.setItem('oponmeta_mobile_config', JSON.stringify(this.config));
      localStorage.setItem('oponmeta_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.warn('Failed to save mobile data:', error);
    }
  }

  // Service Worker Management
  private async initializeServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator && this.config.enablePushNotifications) {
      try {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');

        // Request notification permission
        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            await this.subscribeToPushNotifications();
          }
        } else if (Notification.permission === 'granted') {
          await this.subscribeToPushNotifications();
        }

        // Set up background sync
        if (this.config.enableBackgroundSync && 'sync' in this.serviceWorkerRegistration) {
          this.serviceWorkerRegistration.sync.register('background-sync');
        }
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  private async subscribeToPushNotifications(): Promise<void> {
    if (!this.serviceWorkerRegistration) return;

    try {
      this.pushSubscription = await this.serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY || '')
      });

      // Send subscription to backend
      await this.sendSubscriptionToBackend(this.pushSubscription);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async sendSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          preferences: this.preferences
        })
      });
    } catch (error) {
      console.error('Failed to send subscription to backend:', error);
    }
  }

  // Push Notification Management
  async sendNotification(notification: Omit<PushNotification, 'id' | 'timestamp' | 'read'>): Promise<void> {
    if (!this.shouldSendNotification(notification.category)) {
      return;
    }

    const newNotification: PushNotification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      read: false
    };

    this.notifications.unshift(newNotification);
    this.saveData();

    // Show browser notification if app is not focused
    if (document.hidden && Notification.permission === 'granted') {
      await this.showBrowserNotification(newNotification);
    }

    // Trigger in-app notification
    this.triggerInAppNotification(newNotification);
  }

  private shouldSendNotification(category: PushNotification['category']): boolean {
    if (!this.preferences[category]) return false;

    // Check quiet hours
    if (this.preferences.quietHours.enabled) {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      if (this.isTimeInRange(currentTime, this.preferences.quietHours.start, this.preferences.quietHours.end)) {
        return false;
      }
    }

    return true;
  }

  private isTimeInRange(current: string, start: string, end: string): boolean {
    const currentMinutes = this.timeToMinutes(current);
    const startMinutes = this.timeToMinutes(start);
    const endMinutes = this.timeToMinutes(end);

    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    } else {
      // Handles overnight ranges (e.g., 22:00 to 08:00)
      return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
    }
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private async showBrowserNotification(notification: PushNotification): Promise<void> {
    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon || '/logo.png',
        badge: notification.badge,
        tag: notification.tag,
        requireInteraction: notification.requireInteraction,
        data: notification.data,
        actions: notification.actions
      });

      // Handle notification click
      browserNotification.onclick = () => {
        this.handleNotificationClick(notification);
        browserNotification.close();
      };

      // Auto-close after 5 seconds
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    } catch (error) {
      console.error('Failed to show browser notification:', error);
    }
  }

  private triggerInAppNotification(notification: PushNotification): void {
    // Dispatch custom event for in-app notification
    const event = new CustomEvent('oponmeta-notification', {
      detail: notification
    });
    window.dispatchEvent(event);
  }

  private handleNotificationClick(notification: PushNotification): void {
    // Mark as read
    this.markNotificationAsRead(notification.id);

    // Navigate based on notification data
    if (notification.data?.url) {
      window.location.href = notification.data.url;
    } else if (notification.data?.route) {
      // Use your router to navigate
      window.history.pushState(null, '', notification.data.route);
    }
  }

  // Notification Management
  getNotifications(limit: number = 20): PushNotification[] {
    return this.notifications.slice(0, limit);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markNotificationAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.saveData();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.saveData();
  }

  deleteNotification(notificationId: string): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.saveData();
  }

  clearAllNotifications(): void {
    this.notifications = [];
    this.saveData();
  }

  // Preferences Management
  updateNotificationPreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.saveData();

    // Update backend preferences
    if (this.pushSubscription) {
      this.sendSubscriptionToBackend(this.pushSubscription);
    }
  }

  getNotificationPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  // Offline Mode Management
  enableOfflineMode(): void {
    this.config.enableOfflineMode = true;
    this.saveData();
    this.cacheEssentialData();
  }

  disableOfflineMode(): void {
    this.config.enableOfflineMode = false;
    this.saveData();
  }

  private async cacheEssentialData(): Promise<void> {
    if (!this.config.enableOfflineMode) return;

    try {
      // Cache courses data
      const coursesResponse = await fetch('/api/courses');
      const courses = await coursesResponse.json();
      this.offlineData.courses = courses;

      // Cache user data
      const userResponse = await fetch('/api/user/profile');
      const userData = await userResponse.json();
      this.offlineData.userData = userData;

      this.offlineData.lastSync = Date.now();
      this.saveData();
    } catch (error) {
      console.error('Failed to cache essential data:', error);
    }
  }

  getOfflineData(): OfflineData {
    return { ...this.offlineData };
  }

  addOfflineAction(action: Omit<OfflineAction, 'id' | 'timestamp' | 'retryCount'>): void {
    const offlineAction: OfflineAction = {
      ...action,
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      retryCount: 0
    };

    this.offlineData.pendingActions.push(offlineAction);
    this.saveData();
  }

  async syncOfflineActions(): Promise<void> {
    if (this.offlineData.pendingActions.length === 0) return;

    const actionsToSync = [...this.offlineData.pendingActions];
    const successfulActions: string[] = [];

    for (const action of actionsToSync) {
      try {
        await this.syncAction(action);
        successfulActions.push(action.id);
      } catch (error) {
        console.error(`Failed to sync action ${action.id}:`, error);
        action.retryCount++;
        
        // Remove action if it has been retried too many times
        if (action.retryCount >= 3) {
          successfulActions.push(action.id);
        }
      }
    }

    // Remove successful actions
    this.offlineData.pendingActions = this.offlineData.pendingActions.filter(
      action => !successfulActions.includes(action.id)
    );
    this.saveData();
  }

  private async syncAction(action: OfflineAction): Promise<void> {
    switch (action.type) {
      case 'favorite':
        await fetch('/api/user/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        break;
      case 'wishlist':
        await fetch('/api/user/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        break;
      case 'like':
        await fetch('/api/user/likes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        break;
      case 'review':
        await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        break;
      case 'completion':
        await fetch('/api/user/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(action.data)
        });
        break;
    }
  }

  // Mobile-specific features
  enableGeolocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.config.enableGeolocation = true;
          this.saveData();
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  async enableBiometrics(): Promise<boolean> {
    if (!window.PublicKeyCredential) {
      throw new Error('WebAuthn is not supported');
    }

    try {
      // Check if biometric authentication is available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      if (available) {
        this.config.enableBiometrics = true;
        this.saveData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to enable biometrics:', error);
      return false;
    }
  }

  // Utility functions
  isMobileDevice(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  getNetworkInfo(): { type: string; effectiveType: string; downlink: number } {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        type: connection.type || 'unknown',
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink || 0
      };
    }
    return { type: 'unknown', effectiveType: 'unknown', downlink: 0 };
  }

  // Auto-sync when coming back online
  setupOnlineSync(): void {
    window.addEventListener('online', () => {
      this.syncOfflineActions();
      this.cacheEssentialData();
    });
  }

  // Periodic sync
  setupPeriodicSync(): void {
    if (this.config.enableBackgroundSync) {
      setInterval(() => {
        if (this.isOnline()) {
          this.syncOfflineActions();
        }
      }, this.config.syncInterval * 60 * 1000);
    }
  }

  // Get mobile configuration
  getMobileConfig(): MobileAppConfig {
    return { ...this.config };
  }

  updateMobileConfig(config: Partial<MobileAppConfig>): void {
    this.config = { ...this.config, ...config };
    this.saveData();
  }
}

// Create singleton instance
export const mobileFeaturesService = new MobileFeaturesService();

// Convenience functions
export const sendNotification = (notification: Omit<PushNotification, 'id' | 'timestamp' | 'read'>) => {
  return mobileFeaturesService.sendNotification(notification);
};

export const getNotifications = (limit?: number) => {
  return mobileFeaturesService.getNotifications(limit);
};

export const getUnreadCount = () => {
  return mobileFeaturesService.getUnreadCount();
};

export const updateNotificationPreferences = (preferences: Partial<NotificationPreferences>) => {
  mobileFeaturesService.updateNotificationPreferences(preferences);
};

export const addOfflineAction = (action: Omit<OfflineAction, 'id' | 'timestamp' | 'retryCount'>) => {
  mobileFeaturesService.addOfflineAction(action);
};

export const isMobileDevice = () => {
  return mobileFeaturesService.isMobileDevice();
};

export const isOnline = () => {
  return mobileFeaturesService.isOnline();
}; 