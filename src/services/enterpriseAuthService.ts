export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  role: string
  organizationId?: string
  department?: string
  groups: string[]
  permissions: string[]
  lastLogin: Date
  ssoProvider?: string
}

export interface SSOProvider {
  id: string
  name: string
  type: 'azure' | 'okta' | 'google' | 'saml' | 'ldap'
  enabled: boolean
  configuration: Record<string, any>
}

export interface Organization {
  id: string
  name: string
  domain: string
  ssoProviders: SSOProvider[]
  settings: {
    autoProvisioning: boolean
    defaultRole: string
    allowedDomains: string[]
    sessionTimeout: number
  }
}

export interface SSOConfig {
  clientId: string
  tenantId?: string
  authority?: string
  redirectUri: string
  scopes: string[]
  responseType: string
  additionalParameters?: Record<string, string>
}

export class EnterpriseAuthService {
  private static instance: EnterpriseAuthService
  private msalInstance: any = null
  private currentUser: User | null = null

  static getInstance(): EnterpriseAuthService {
    if (!EnterpriseAuthService.instance) {
      EnterpriseAuthService.instance = new EnterpriseAuthService()
    }
    return EnterpriseAuthService.instance
  }

  async initialize(): Promise<void> {
    await this.initializeMSAL()
    this.setupEventListeners()
  }

  private async initializeMSAL(): Promise<void> {
    try {
      // Dynamic import of MSAL
      const { PublicClientApplication } = await import('@azure/msal-browser')
      
      const msalConfig = {
        auth: {
          clientId: import.meta.env.VITE_AZURE_CLIENT_ID!,
          authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
          redirectUri: window.location.origin + '/auth/callback'
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: true
        }
      }

      this.msalInstance = new PublicClientApplication(msalConfig)
      await this.msalInstance.initialize()
    } catch (error) {
      console.error('Failed to initialize MSAL:', error)
    }
  }

  async authenticateWithSSO(provider: 'azure' | 'okta' | 'google' | 'saml'): Promise<User> {
    switch (provider) {
      case 'azure':
        return await this.authenticateAzureAD()
      case 'okta':
        return await this.authenticateOkta()
      case 'google':
        return await this.authenticateGoogle()
      case 'saml':
        return await this.authenticateSAML()
      default:
        throw new Error(`Unsupported SSO provider: ${provider}`)
    }
  }

  private async authenticateAzureAD(): Promise<User> {
    if (!this.msalInstance) {
      throw new Error('MSAL not initialized')
    }

    try {
      const loginRequest = {
        scopes: ['User.Read', 'Group.Read.All', 'Directory.Read.All'],
        prompt: 'select_account'
      }

      const response = await this.msalInstance.loginPopup(loginRequest)
      const user = await this.createUserFromAzureProfile(response.account)
      
      this.currentUser = user
      await this.storeUserSession(user)
      
      return user
    } catch (error) {
      console.error('Azure AD authentication failed:', error)
      throw error
    }
  }

  private async authenticateOkta(): Promise<User> {
    try {
      const oktaConfig = {
        clientId: import.meta.env.VITE_OKTA_CLIENT_ID!,
        issuer: import.meta.env.VITE_OKTA_ISSUER!,
        redirectUri: window.location.origin + '/auth/callback',
        scopes: ['openid', 'profile', 'email', 'groups']
      }

      // Initialize Okta Sign-In Widget
      const { OktaAuth } = await import('@okta/okta-auth-js')
      const oktaAuth = new OktaAuth(oktaConfig)

      const tokens = await oktaAuth.signInWithRedirect()
      const userInfo = await oktaAuth.getUser()

      const user = await this.createUserFromOktaProfile(userInfo)
      this.currentUser = user
      await this.storeUserSession(user)

      return user
    } catch (error) {
      console.error('Okta authentication failed:', error)
      throw error
    }
  }

  private async authenticateGoogle(): Promise<User> {
    try {
      const { GoogleAuth } = await import('google-auth-library')
      
      const auth = new GoogleAuth({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID!,
        scopes: ['profile', 'email']
      })

      const authClient = await auth.getClient()
      const accessToken = await authClient.getAccessToken()

      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken.token}`
        }
      })

      const userInfo = await response.json()
      const user = await this.createUserFromGoogleProfile(userInfo)
      
      this.currentUser = user
      await this.storeUserSession(user)

      return user
    } catch (error) {
      console.error('Google authentication failed:', error)
      throw error
    }
  }

  private async authenticateSAML(): Promise<User> {
    try {
      // Redirect to SAML IdP
      const samlUrl = `${import.meta.env.VITE_SAML_SSO_URL}?SAMLRequest=${encodeURIComponent(this.generateSAMLRequest())}`
      window.location.href = samlUrl
      
      // This will redirect back to the callback URL
      return new Promise((resolve, reject) => {
        // Handle SAML response in callback
        this.handleSAMLCallback = (user: User) => {
          this.currentUser = user
          this.storeUserSession(user)
          resolve(user)
        }
      })
    } catch (error) {
      console.error('SAML authentication failed:', error)
      throw error
    }
  }

  private async createUserFromAzureProfile(account: any): Promise<User> {
    try {
      // Get additional user info from Microsoft Graph
      const graphResponse = await this.msalInstance.acquireTokenSilent({
        scopes: ['User.Read', 'Group.Read.All']
      })

      const userResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
          'Authorization': `Bearer ${graphResponse.accessToken}`
        }
      })

      const userData = await userResponse.json()

      // Get user groups
      const groupsResponse = await fetch('https://graph.microsoft.com/v1.0/me/memberOf', {
        headers: {
          'Authorization': `Bearer ${graphResponse.accessToken}`
        }
      })

      const groupsData = await groupsResponse.json()

      return {
        id: account.localAccountId,
        email: account.username,
        firstName: userData.givenName,
        lastName: userData.surname,
        avatar: userData.photo,
        role: this.determineUserRole(groupsData.value),
        organizationId: this.extractOrganizationId(userData),
        department: userData.department,
        groups: groupsData.value.map((group: any) => group.displayName),
        permissions: this.mapGroupsToPermissions(groupsData.value),
        lastLogin: new Date(),
        ssoProvider: 'azure'
      }
    } catch (error) {
      console.error('Failed to create user from Azure profile:', error)
      throw error
    }
  }

  private async createUserFromOktaProfile(userInfo: any): Promise<User> {
    return {
      id: userInfo.sub,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      avatar: userInfo.picture,
      role: this.determineUserRole(userInfo.groups),
      organizationId: this.extractOrganizationId(userInfo),
      department: userInfo.department,
      groups: userInfo.groups || [],
      permissions: this.mapGroupsToPermissions(userInfo.groups || []),
      lastLogin: new Date(),
      ssoProvider: 'okta'
    }
  }

  private async createUserFromGoogleProfile(userInfo: any): Promise<User> {
    return {
      id: userInfo.id,
      email: userInfo.email,
      firstName: userInfo.given_name,
      lastName: userInfo.family_name,
      avatar: userInfo.picture,
      role: 'student', // Default role for Google SSO
      groups: [],
      permissions: ['read'],
      lastLogin: new Date(),
      ssoProvider: 'google'
    }
  }

  private determineUserRole(groups: any[]): string {
    // Map groups to roles based on your organization's structure
    const groupRoleMap: Record<string, string> = {
      'Administrators': 'admin',
      'Instructors': 'instructor',
      'Students': 'student',
      'Managers': 'manager'
    }

    for (const group of groups) {
      const groupName = group.displayName || group
      if (groupRoleMap[groupName]) {
        return groupRoleMap[groupName]
      }
    }

    return 'student' // Default role
  }

  private extractOrganizationId(userData: any): string | undefined {
    // Extract organization ID from user data
    return userData.companyName || userData.organization || undefined
  }

  private mapGroupsToPermissions(groups: any[]): string[] {
    const permissions: string[] = []
    
    for (const group of groups) {
      const groupName = group.displayName || group
      switch (groupName) {
        case 'Administrators':
          permissions.push('admin', 'instructor', 'student')
          break
        case 'Instructors':
          permissions.push('instructor', 'student')
          break
        case 'Students':
          permissions.push('student')
          break
        case 'Managers':
          permissions.push('manager', 'student')
          break
      }
    }

    return [...new Set(permissions)] // Remove duplicates
  }

  private generateSAMLRequest(): string {
    // Generate SAML authentication request
    const samlRequest = {
      id: `_${Date.now()}`,
      issueInstant: new Date().toISOString(),
      destination: import.meta.env.VITE_SAML_SSO_URL,
      assertionConsumerServiceURL: window.location.origin + '/auth/saml/callback'
    }

    return btoa(JSON.stringify(samlRequest))
  }

  private handleSAMLCallback: ((user: User) => void) | null = null

  async handleSAMLCallback(samlResponse: string): Promise<User> {
    try {
      // Parse SAML response
      const response = JSON.parse(atob(samlResponse))
      
      // Validate SAML response
      if (!this.validateSAMLResponse(response)) {
        throw new Error('Invalid SAML response')
      }

      // Extract user information
      const user = await this.createUserFromSAMLResponse(response)
      
      if (this.handleSAMLCallback) {
        this.handleSAMLCallback(user)
      }

      return user
    } catch (error) {
      console.error('SAML callback handling failed:', error)
      throw error
    }
  }

  private validateSAMLResponse(response: any): boolean {
    // Implement SAML response validation
    return response && response.status === 'success'
  }

  private async createUserFromSAMLResponse(response: any): Promise<User> {
    return {
      id: response.userId,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role || 'student',
      organizationId: response.organizationId,
      groups: response.groups || [],
      permissions: response.permissions || ['read'],
      lastLogin: new Date(),
      ssoProvider: 'saml'
    }
  }

  private async storeUserSession(user: User): Promise<void> {
    try {
      localStorage.setItem('oponm-user', JSON.stringify(user))
      localStorage.setItem('oponm-auth-token', this.generateSessionToken())
      
      // Store in Supabase
      await this.syncUserToSupabase(user)
    } catch (error) {
      console.error('Failed to store user session:', error)
    }
  }

  private generateSessionToken(): string {
    return `sso_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private async syncUserToSupabase(user: User): Promise<void> {
    try {
      const { supabase } = await import('../lib/supabase')
      
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          avatar_url: user.avatar,
          role: user.role,
          organization_id: user.organizationId,
          department: user.department,
          groups: user.groups,
          permissions: user.permissions,
          sso_provider: user.ssoProvider,
          last_login: user.lastLogin.toISOString()
        })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Failed to sync user to Supabase:', error)
    }
  }

  private setupEventListeners(): void {
    // Listen for storage changes (multi-tab sync)
    window.addEventListener('storage', (event) => {
      if (event.key === 'oponm-user') {
        this.currentUser = event.newValue ? JSON.parse(event.newValue) : null
      }
    })

    // Listen for beforeunload to clean up
    window.addEventListener('beforeunload', () => {
      this.cleanup()
    })
  }

  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) {
      return this.currentUser
    }

    try {
      const storedUser = localStorage.getItem('oponm-user')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser)
        return this.currentUser
      }
    } catch (error) {
      console.error('Failed to get current user:', error)
    }

    return null
  }

  async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('oponm-user')
      localStorage.removeItem('oponm-auth-token')

      // Logout from SSO provider
      if (this.currentUser?.ssoProvider === 'azure' && this.msalInstance) {
        await this.msalInstance.logout()
      }

      this.currentUser = null
      
      // Redirect to login
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      if (this.currentUser?.ssoProvider === 'azure' && this.msalInstance) {
        const response = await this.msalInstance.acquireTokenSilent({
          scopes: ['User.Read']
        })
        
        if (response.accessToken) {
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error('Token refresh failed:', error)
      return false
    }
  }

  hasPermission(permission: string): boolean {
    return this.currentUser?.permissions.includes(permission) || false
  }

  isInGroup(groupName: string): boolean {
    return this.currentUser?.groups.includes(groupName) || false
  }

  private cleanup(): void {
    // Cleanup resources
    this.msalInstance = null
    this.currentUser = null
  }

  // Organization management
  async getOrganization(organizationId: string): Promise<Organization | null> {
    try {
      const response = await fetch(`/api/organizations/${organizationId}`)
      if (!response.ok) {
        return null
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get organization:', error)
      return null
    }
  }

  async getSSOProviders(organizationId: string): Promise<SSOProvider[]> {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/sso-providers`)
      if (!response.ok) {
        return []
      }
      return response.json()
    } catch (error) {
      console.error('Failed to get SSO providers:', error)
      return []
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    handleSAMLCallback?: (user: User) => void
  }
}

export const enterpriseAuthService = EnterpriseAuthService.getInstance()
