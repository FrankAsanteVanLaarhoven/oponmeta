export interface SubscriptionTier {
  id: string
  name: 'Basic' | 'Professional' | 'Enterprise' | 'White-Label'
  monthlyPrice: number
  yearlyPrice: number
  currency: string
  features: {
    courseCreation: number // -1 for unlimited
    aiAssistance: boolean
    customBranding: boolean
    analytics: 'basic' | 'advanced' | 'enterprise'
    apiAccess: boolean
    prioritySupport: boolean
    whiteLabel: boolean
    ssoIntegration: boolean
    customDomain: boolean
    advancedReporting: boolean
    teamCollaboration: boolean
    videoStorage: number // GB
    studentLimit: number // -1 for unlimited
  }
  popular?: boolean
  description: string
  benefits: string[]
}

export interface RevenueProjection {
  tier: string
  userCount: number
  monthlyRevenue: number
  yearlyRevenue: number
  churnRate: number
  ltv: number
}

export class SubscriptionTierService {
  private static instance: SubscriptionTierService
  private tiers: SubscriptionTier[] = []

  static getInstance(): SubscriptionTierService {
    if (!SubscriptionTierService.instance) {
      SubscriptionTierService.instance = new SubscriptionTierService()
    }
    return SubscriptionTierService.instance
  }

  constructor() {
    this.initializeTiers()
  }

  private initializeTiers(): void {
    this.tiers = [
      {
        id: 'basic',
        name: 'Basic',
        monthlyPrice: 29,
        yearlyPrice: 290, // 2 months free
        currency: 'GBP',
        features: {
          courseCreation: 5,
          aiAssistance: false,
          customBranding: false,
          analytics: 'basic',
          apiAccess: false,
          prioritySupport: false,
          whiteLabel: false,
          ssoIntegration: false,
          customDomain: false,
          advancedReporting: false,
          teamCollaboration: false,
          videoStorage: 10,
          studentLimit: 100
        },
        description: 'Perfect for individual instructors and small teams starting their online education journey.',
        benefits: [
          'Create up to 5 courses',
          'Basic analytics dashboard',
          'Email support',
          '10GB video storage',
          'Up to 100 students',
          'Mobile app access'
        ]
      },
      {
        id: 'professional',
        name: 'Professional',
        monthlyPrice: 99,
        yearlyPrice: 990, // 2 months free
        currency: 'GBP',
        popular: true,
        features: {
          courseCreation: 50,
          aiAssistance: true,
          customBranding: true,
          analytics: 'advanced',
          apiAccess: true,
          prioritySupport: false,
          whiteLabel: false,
          ssoIntegration: true,
          customDomain: true,
          advancedReporting: true,
          teamCollaboration: true,
          videoStorage: 100,
          studentLimit: 1000
        },
        description: 'Ideal for growing education businesses and training organizations.',
        benefits: [
          'Create up to 50 courses',
          'AI-powered course creation',
          'Custom branding & domain',
          'Advanced analytics',
          'API access',
          'SSO integration',
          'Team collaboration tools',
          '100GB video storage',
          'Up to 1,000 students',
          'Priority email support'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        monthlyPrice: 299,
        yearlyPrice: 2990, // 2 months free
        currency: 'GBP',
        features: {
          courseCreation: -1,
          aiAssistance: true,
          customBranding: true,
          analytics: 'enterprise',
          apiAccess: true,
          prioritySupport: true,
          whiteLabel: false,
          ssoIntegration: true,
          customDomain: true,
          advancedReporting: true,
          teamCollaboration: true,
          videoStorage: 500,
          studentLimit: -1
        },
        description: 'Comprehensive solution for large organizations and educational institutions.',
        benefits: [
          'Unlimited course creation',
          'Advanced AI assistance',
          'Full custom branding',
          'Enterprise analytics',
          'Full API access',
          '24/7 phone support',
          'SSO & LDAP integration',
          'Custom domain',
          'Advanced reporting',
          'Unlimited team members',
          '500GB video storage',
          'Unlimited students',
          'Dedicated account manager'
        ]
      },
      {
        id: 'white-label',
        name: 'White-Label',
        monthlyPrice: 999,
        yearlyPrice: 9990, // 2 months free
        currency: 'GBP',
        features: {
          courseCreation: -1,
          aiAssistance: true,
          customBranding: true,
          analytics: 'enterprise',
          apiAccess: true,
          prioritySupport: true,
          whiteLabel: true,
          ssoIntegration: true,
          customDomain: true,
          advancedReporting: true,
          teamCollaboration: true,
          videoStorage: 1000,
          studentLimit: -1
        },
        description: 'Complete white-label solution for resellers and large enterprises.',
        benefits: [
          'Complete white-label platform',
          'Your own branded mobile apps',
          'Unlimited everything',
          'Custom development support',
          'Revenue sharing options',
          'Multi-tenant architecture',
          'Custom integrations',
          '1TB video storage',
          'Dedicated infrastructure',
          '24/7 premium support',
          'Custom SLA agreements'
        ]
      }
    ]
  }

  getAllTiers(): SubscriptionTier[] {
    return this.tiers
  }

  getTierById(id: string): SubscriptionTier | undefined {
    return this.tiers.find(tier => tier.id === id)
  }

  getPopularTier(): SubscriptionTier | undefined {
    return this.tiers.find(tier => tier.popular)
  }

  calculateYearlySavings(tier: SubscriptionTier): number {
    const monthlyTotal = tier.monthlyPrice * 12
    return monthlyTotal - tier.yearlyPrice
  }

  getRevenueProjections(): RevenueProjection[] {
    return [
      {
        tier: 'basic',
        userCount: 1000,
        monthlyRevenue: 29000,
        yearlyRevenue: 290000,
        churnRate: 0.08,
        ltv: 362.5
      },
      {
        tier: 'professional',
        userCount: 500,
        monthlyRevenue: 49500,
        yearlyRevenue: 495000,
        churnRate: 0.05,
        ltv: 1980
      },
      {
        tier: 'enterprise',
        userCount: 100,
        monthlyRevenue: 29900,
        yearlyRevenue: 299000,
        churnRate: 0.03,
        ltv: 9966.67
      },
      {
        tier: 'white-label',
        userCount: 20,
        monthlyRevenue: 19980,
        yearlyRevenue: 199800,
        churnRate: 0.02,
        ltv: 49950
      }
    ]
  }

  getTotalProjectedRevenue(): { monthly: number; yearly: number } {
    const projections = this.getRevenueProjections()
    const monthly = projections.reduce((sum, proj) => sum + proj.monthlyRevenue, 0)
    const yearly = projections.reduce((sum, proj) => sum + proj.yearlyRevenue, 0)
    
    return { monthly, yearly }
  }

  calculateUserLTV(tierId: string, churnRate?: number): number {
    const tier = this.getTierById(tierId)
    if (!tier) return 0

    const rate = churnRate || this.getRevenueProjections().find(p => p.tier === tierId)?.churnRate || 0.05
    return tier.monthlyPrice / rate
  }

  getFeatureComparison(): Record<string, any[]> {
    const features = [
      'courseCreation',
      'aiAssistance',
      'customBranding',
      'analytics',
      'apiAccess',
      'prioritySupport',
      'ssoIntegration',
      'customDomain',
      'advancedReporting',
      'teamCollaboration',
      'videoStorage',
      'studentLimit'
    ]

    const comparison: Record<string, any[]> = {}
    
    features.forEach(feature => {
      comparison[feature] = this.tiers.map(tier => ({
        tier: tier.name,
        value: tier.features[feature as keyof typeof tier.features]
      }))
    })

    return comparison
  }

  async upgradeTier(currentTierId: string, newTierId: string, userId: string): Promise<boolean> {
    try {
      const currentTier = this.getTierById(currentTierId)
      const newTier = this.getTierById(newTierId)
      
      if (!currentTier || !newTier) {
        throw new Error('Invalid tier selection')
      }

      // Calculate prorated amount
      const proratedAmount = this.calculateProratedUpgrade(currentTier, newTier)
      
      // Process payment
      const paymentResult = await this.processUpgradePayment(userId, proratedAmount)
      
      if (paymentResult.success) {
        // Update user subscription
        await this.updateUserSubscription(userId, newTierId)
        
        // Track analytics
        this.trackUpgradeEvent(userId, currentTierId, newTierId, proratedAmount)
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Tier upgrade failed:', error)
      return false
    }
  }

  private calculateProratedUpgrade(currentTier: SubscriptionTier, newTier: SubscriptionTier): number {
    // Simplified proration calculation
    const priceDifference = newTier.monthlyPrice - currentTier.monthlyPrice
    return Math.max(0, priceDifference)
  }

  private async processUpgradePayment(userId: string, amount: number): Promise<{ success: boolean; transactionId?: string }> {
    // Integration with payment service
    try {
      // This would integrate with your payment processor
      return { success: true, transactionId: `upgrade_${Date.now()}` }
    } catch (error) {
      return { success: false }
    }
  }

  private async updateUserSubscription(userId: string, tierId: string): Promise<void> {
    // Update user subscription in database
    console.log(`Updating user ${userId} to tier ${tierId}`)
  }

  private trackUpgradeEvent(userId: string, fromTier: string, toTier: string, amount: number): void {
    // Track upgrade analytics
    if (window.gtag) {
      window.gtag('event', 'subscription_upgrade', {
        user_id: userId,
        from_tier: fromTier,
        to_tier: toTier,
        upgrade_amount: amount
      })
    }
  }

  getRecommendedTier(userProfile: {
    courseCount: number
    studentCount: number
    needsAI: boolean
    needsBranding: boolean
    needsSSO: boolean
  }): SubscriptionTier {
    const { courseCount, studentCount, needsAI, needsBranding, needsSSO } = userProfile

    // Logic to recommend appropriate tier
    if (needsSSO || studentCount > 1000 || courseCount > 50) {
      return this.getTierById('enterprise') || this.tiers[2]
    }
    
    if (needsAI || needsBranding || courseCount > 5 || studentCount > 100) {
      return this.getTierById('professional') || this.tiers[1]
    }
    
    return this.getTierById('basic') || this.tiers[0]
  }
}

export const subscriptionTierService = SubscriptionTierService.getInstance()
