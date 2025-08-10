export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'course' | 'companion' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  createdAt: Date;
  readAt?: Date;
  expiresAt?: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'course' | 'companion' | 'payment' | 'system' | 'achievement' | 'social';
  actionUrl?: string;
  actionText?: string;
}

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    course: boolean;
    companion: boolean;
    payment: boolean;
    system: boolean;
    achievement: boolean;
    social: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: Notification['type'];
  category: Notification['category'];
  title: string;
  message: string;
  variables: string[];
  priority: Notification['priority'];
}

class NotificationService {
  private notifications: Notification[] = [];
  private preferences: NotificationPreferences[] = [];
  private templates: NotificationTemplate[] = [];

  constructor() {
    this.loadData();
    this.initializeTemplates();
  }

  // Notification Management
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt' | 'read'>): Promise<Notification> {
    const newNotification: Notification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      read: false,
    };

    this.notifications.push(newNotification);
    this.saveNotifications();

    // Check if user wants immediate notifications
    const userPrefs = await this.getUserPreferences(notification.userId);
    if (userPrefs?.inApp) {
      this.showInAppNotification(newNotification);
    }

    return newNotification;
  }

  async getNotifications(userId: string, options?: {
    unreadOnly?: boolean;
    category?: Notification['category'];
    limit?: number;
    offset?: number;
  }): Promise<Notification[]> {
    let filtered = this.notifications.filter(n => n.userId === userId);

    if (options?.unreadOnly) {
      filtered = filtered.filter(n => !n.read);
    }

    if (options?.category) {
      filtered = filtered.filter(n => n.category === options.category);
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options?.offset) {
      filtered = filtered.slice(options.offset);
    }

    if (options?.limit) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }

  async markAsRead(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (!notification) return null;

    notification.read = true;
    notification.readAt = new Date();
    this.saveNotifications();
    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    const userNotifications = this.notifications.filter(n => n.userId === userId && !n.read);
    userNotifications.forEach(n => {
      n.read = true;
      n.readAt = new Date();
    });
    this.saveNotifications();
  }

  async deleteNotification(notificationId: string): Promise<boolean> {
    const index = this.notifications.findIndex(n => n.id === notificationId);
    if (index === -1) return false;

    this.notifications.splice(index, 1);
    this.saveNotifications();
    return true;
  }

  async deleteAllNotifications(userId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n.userId !== userId);
    this.saveNotifications();
  }

  // Template-based Notifications
  async sendTemplateNotification(
    userId: string,
    templateId: string,
    variables: Record<string, any>
  ): Promise<Notification | null> {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return null;

    const title = this.replaceVariables(template.title, variables);
    const message = this.replaceVariables(template.message, variables);

    return await this.createNotification({
      userId,
      type: template.type,
      category: template.category,
      title,
      message,
      priority: template.priority,
      data: variables,
    });
  }

  // Predefined Notifications
  async sendCourseEnrollmentNotification(userId: string, courseName: string): Promise<Notification> {
    return await this.sendTemplateNotification(userId, 'course_enrollment', { courseName });
  }

  async sendCourseCompletionNotification(userId: string, courseName: string): Promise<Notification> {
    return await this.sendTemplateNotification(userId, 'course_completion', { courseName });
  }

  async sendCompanionInteractionNotification(userId: string, companionName: string): Promise<Notification> {
    return await this.sendTemplateNotification(userId, 'companion_interaction', { companionName });
  }

  async sendPaymentSuccessNotification(userId: string, amount: number, planName: string): Promise<Notification> {
    return await this.sendTemplateNotification(userId, 'payment_success', { amount, planName });
  }

  async sendAchievementNotification(userId: string, achievementName: string): Promise<Notification> {
    return await this.sendTemplateNotification(userId, 'achievement_unlocked', { achievementName });
  }

  // Preferences Management
  async getUserPreferences(userId: string): Promise<NotificationPreferences | null> {
    return this.preferences.find(p => p.userId === userId) || null;
  }

  async updatePreferences(userId: string, updates: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    let prefs = this.preferences.find(p => p.userId === userId);
    
    if (!prefs) {
      prefs = {
        userId,
        email: true,
        push: true,
        inApp: true,
        categories: {
          course: true,
          companion: true,
          payment: true,
          system: true,
          achievement: true,
          social: true,
        },
        frequency: 'immediate',
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
        },
      };
      this.preferences.push(prefs);
    }

    Object.assign(prefs, updates);
    this.savePreferences();
    return prefs;
  }

  // Analytics
  async getNotificationStats(userId: string): Promise<{
    total: number;
    unread: number;
    byCategory: Record<string, number>;
    byType: Record<string, number>;
  }> {
    const userNotifications = this.notifications.filter(n => n.userId === userId);
    const unread = userNotifications.filter(n => !n.read).length;

    const byCategory = userNotifications.reduce((acc, n) => {
      acc[n.category] = (acc[n.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byType = userNotifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: userNotifications.length,
      unread,
      byCategory,
      byType,
    };
  }

  // Utility Methods
  private replaceVariables(text: string, variables: Record<string, any>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] || match;
    });
  }

  private showInAppNotification(notification: Notification): void {
    // This would integrate with the notification context to show in-app notifications
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const event = new CustomEvent('showNotification', {
        detail: notification,
      });
      window.dispatchEvent(event);
    }
  }

  private initializeTemplates(): void {
    this.templates = [
      {
        id: 'course_enrollment',
        name: 'Course Enrollment',
        type: 'success',
        category: 'course',
        title: 'Welcome to {{courseName}}!',
        message: 'You have successfully enrolled in {{courseName}}. Start your learning journey now!',
        variables: ['courseName'],
        priority: 'medium',
      },
      {
        id: 'course_completion',
        name: 'Course Completion',
        type: 'success',
        category: 'course',
        title: 'Congratulations! You completed {{courseName}}',
        message: 'Great job! You have successfully completed {{courseName}}. Your certificate is ready for download.',
        variables: ['courseName'],
        priority: 'high',
      },
      {
        id: 'companion_interaction',
        name: 'Companion Interaction',
        type: 'info',
        category: 'companion',
        title: 'New message from {{companionName}}',
        message: '{{companionName}} has sent you a new message. Continue your conversation!',
        variables: ['companionName'],
        priority: 'medium',
      },
      {
        id: 'payment_success',
        name: 'Payment Success',
        type: 'success',
        category: 'payment',
        title: 'Payment Successful',
        message: 'Your payment of ${{amount}} for {{planName}} has been processed successfully.',
        variables: ['amount', 'planName'],
        priority: 'high',
      },
      {
        id: 'achievement_unlocked',
        name: 'Achievement Unlocked',
        type: 'success',
        category: 'achievement',
        title: 'Achievement Unlocked: {{achievementName}}',
        message: 'Congratulations! You have unlocked the {{achievementName}} achievement.',
        variables: ['achievementName'],
        priority: 'medium',
      },
      {
        id: 'system_maintenance',
        name: 'System Maintenance',
        type: 'warning',
        category: 'system',
        title: 'Scheduled Maintenance',
        message: 'We will be performing scheduled maintenance on {{date}} from {{startTime}} to {{endTime}}.',
        variables: ['date', 'startTime', 'endTime'],
        priority: 'medium',
      },
    ];
  }

  // Data Persistence
  private loadData(): void {
    try {
      const storedNotifications = localStorage.getItem('oponmeta_notifications');
      if (storedNotifications) {
        this.notifications = JSON.parse(storedNotifications).map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          readAt: n.readAt ? new Date(n.readAt) : undefined,
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : undefined,
        }));
      }

      const storedPreferences = localStorage.getItem('oponmeta_notification_preferences');
      if (storedPreferences) {
        this.preferences = JSON.parse(storedPreferences);
      }
    } catch (error) {
      console.error('Failed to load notification data:', error);
    }
  }

  private saveNotifications(): void {
    try {
      localStorage.setItem('oponmeta_notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  private savePreferences(): void {
    try {
      localStorage.setItem('oponmeta_notification_preferences', JSON.stringify(this.preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  // Cleanup expired notifications
  async cleanupExpiredNotifications(): Promise<void> {
    const now = new Date();
    this.notifications = this.notifications.filter(n => {
      if (n.expiresAt && n.expiresAt < now) {
        return false;
      }
      return true;
    });
    this.saveNotifications();
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export { notificationService };
export default notificationService;
