import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSubjectColor(subject: string): string {
  const colors: { [key: string]: string } = {
    'math': '#3B82F6',
    'science': '#10B981',
    'history': '#F59E0B',
    'english': '#8B5CF6',
    'geography': '#EF4444',
    'art': '#EC4899',
    'music': '#06B6D4',
    'physical-education': '#84CC16',
    'computer-science': '#6366F1',
    'literature': '#F97316',
    'philosophy': '#8B5CF6',
    'psychology': '#EC4899',
    'economics': '#10B981',
    'politics': '#EF4444',
    'sociology': '#F59E0B',
    'anthropology': '#8B5CF6',
    'archaeology': '#84CC16',
    'astronomy': '#6366F1',
    'biology': '#10B981',
    'chemistry': '#3B82F6',
    'physics': '#8B5CF6',
    'default': '#6B7280'
  };
  
  return colors[subject.toLowerCase()] || colors.default;
}

export function configureAssistant(voice: string, style: string) {
  return {
    voice,
    style,
    // Add more configuration options as needed
  };
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format date
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Validate email
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate password strength
export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Capitalize first letter
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

// Convert to slug
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Check if device is mobile
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

// Check if device is tablet
export function isTablet(): boolean {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

// Check if device is desktop
export function isDesktop(): boolean {
  return window.innerWidth >= 1024;
}

// Get screen size
export function getScreenSize(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}

// Local storage helpers
export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle error
    }
  },
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Handle error
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch {
      // Handle error
    }
  },
};

// Session storage helpers
export const sessionStorage = {
  get: (key: string) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle error
    }
  },
  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Handle error
    }
  },
  clear: () => {
    try {
      sessionStorage.clear();
    } catch {
      // Handle error
    }
  },
};
