import { supabase } from '../lib/supabase'
import { offlineService } from './offlineService'

// Disable offline notifications to prevent IndexedDB errors
const DISABLE_OFFLINE_NOTIFICATIONS = true

export interface NotificationData {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  data?: any
  actions?: NotificationAction[]
  requireInteraction?: boolean
  silent?: boolean
  tag?: string
  timestamp?: number
}

export interface NotificationAction {
  action: string
  title: string
  icon?: string
}

export class NotificationService {
  private static instance: NotificationService
  private permission: NotificationPermission = 'default'
  private subscription: PushSubscription | null = null

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async initialize(): Promise<void> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return
    }

    if (!('serviceWorker' in navigator)) {
      console.warn('This browser does not support service workers')
      return
    }

    this.permission = Notification.permission
    this.setupNotificationClickHandler()
    this.setupServiceWorkerMessageHandler()
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications')
    }

    try {
      this.permission = await Notification.requestPermission()
      return this.permission
    } catch (error) {
      console.error('Failed to request notification permission:', error)
      throw error
    }
  }

  async subscribeToPush(userId: string): Promise<PushSubscription | null> {
    if (this.permission !== 'granted') {
      throw new Error('Notification permission not granted')
    }

    if (!('serviceWorker' in navigator)) {
      throw new Error('Service worker not supported')
    }

    try {
      const registration = await navigator.serviceWorker.ready
      
      if (!registration.pushManager) {
        throw new Error('Push messaging not supported')
      }

      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        throw new Error('VAPID public key not configured')
      }

      this.subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      })

      await this.saveSubscriptionToDatabase(userId, this.subscription)
      await this.storeSubscriptionLocally(userId, this.subscription)

      return this.subscription
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error)
      throw error
    }
  }

  async sendNotification(notification: NotificationData): Promise<void> {
    if (this.permission !== 'granted') {
      throw new Error('Notification permission not granted')
    }

    try {
      const notificationOptions: NotificationOptions = {
        body: notification.body,
        icon: notification.icon || '/icons/pwa-192x192.png',
        badge: notification.badge || '/icons/badge-72x72.png',
        image: notification.image,
        data: notification.data,
        actions: notification.actions,
        requireInteraction: notification.requireInteraction || false,
        silent: notification.silent || false,
        tag: notification.tag,
        timestamp: notification.timestamp || Date.now()
      }

      const notificationInstance = new Notification(notification.title, notificationOptions)
      
      if (!DISABLE_OFFLINE_NOTIFICATIONS) {
        await offlineService.storeNotification(notification)
      }
      
      this.trackNotificationEvent('displayed', notification.title)

      notificationInstance.onclose = () => {
        this.trackNotificationEvent('closed', notification.title)
      }

      notificationInstance.onclick = () => {
        this.trackNotificationEvent('clicked', notification.title)
        notificationInstance.close()
      }

    } catch (error) {
      console.error('Failed to send notification:', error)
      throw error
    }
  }

  private async saveSubscriptionToDatabase(userId: string, subscription: PushSubscription): Promise<void> {
    try {
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: userId,
          subscription: JSON.stringify(subscription),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Failed to save subscription to database:', error)
      throw error
    }
  }

  private async storeSubscriptionLocally(userId: string, subscription: PushSubscription): Promise<void> {
    try {
      const subscriptionData = {
        userId,
        subscription: JSON.stringify(subscription),
        timestamp: Date.now()
      }
      localStorage.setItem('oponm-push-subscription', JSON.stringify(subscriptionData))
    } catch (error) {
      console.error('Failed to store subscription locally:', error)
    }
  }

  private setupNotificationClickHandler(): void {
    if (DISABLE_OFFLINE_NOTIFICATIONS) {
      return
    }
    
    window.addEventListener('focus', () => {
      this.handlePendingNotifications()
    })
  }

  private setupServiceWorkerMessageHandler(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'NOTIFICATION_CLICKED') {
          this.handleNotificationClick(event.data.notification)
        }
      })
    }
  }

  private async handlePendingNotifications(): Promise<void> {
    if (DISABLE_OFFLINE_NOTIFICATIONS) {
      return
    }
    
    try {
      const unreadNotifications = await offlineService.getUnreadNotifications()
      
      for (const notification of unreadNotifications) {
        if (notification.data.type === 'course-reminder') {
          window.location.href = `/course/${notification.data.courseId}`
        } else if (notification.data.type === 'payment-success') {
          window.location.href = '/payment/success'
        }
        
        await offlineService.markNotificationAsRead(notification.id)
      }
    } catch (error) {
      console.error('Failed to handle pending notifications:', error)
    }
  }

  private handleNotificationClick(notification: any): void {
    if (notification.data) {
      if (notification.data.courseId) {
        window.location.href = `/course/${notification.data.courseId}`
      } else if (notification.data.url) {
        window.location.href = notification.data.url
      }
    }
  }

  private trackNotificationEvent(event: string, title: string): void {
    if (window.gtag) {
      window.gtag('event', 'notification', {
        event_type: event,
        notification_title: title
      })
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  getPermission(): NotificationPermission {
    return this.permission
  }

  getSubscription(): PushSubscription | null {
    return this.subscription
  }

  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator
  }
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export const notificationService = NotificationService.getInstance()