import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
let supabaseClient: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. Using mock client for development.');
  // For development, we'll create a mock client that doesn't throw errors
  supabaseClient = createClient<Database>(
    'https://mock.supabase.co',
    'mock-anon-key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      },
      realtime: {
        params: {
          eventsPerSecond: 0
        }
      }
    }
  );
} else {
  // Create the real Supabase client
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  });
}

export const supabase = supabaseClient;

// Auth helpers
export const auth = {
  // Sign up
  signUp: async (email: string, password: string, metadata?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  // Sign in with OAuth
  signInWithOAuth: async (provider: 'google' | 'github' | 'facebook') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  // Get session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
    return { data, error };
  },

  // Update password
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    });
    return { data, error };
  },

  // Update user profile
  updateProfile: async (updates: any) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    return { data, error };
  }
};

// Database helpers
export const db = {
  // Users
  users: {
    get: async (id?: string) => {
      if (id) {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', id)
          .single();
        return { data, error };
      } else {
        const { data, error } = await supabase
          .from('users')
          .select('*');
        return { data, error };
      }
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      return { error };
    }
  },

  // Courses
  courses: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('courses')
        .select(`
          *,
          categories (*),
          users!courses_instructor_id_fkey (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `);

      if (filters) {
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.visibility) query = query.eq('visibility', filters.visibility);
        if (filters.category_id) query = query.eq('category_id', filters.category_id);
        if (filters.instructor_id) query = query.eq('instructor_id', filters.instructor_id);
        if (filters.is_featured) query = query.eq('is_featured', filters.is_featured);
        if (filters.search) query = query.ilike('title', `%${filters.search}%`);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (*),
          users!courses_instructor_id_fkey (
            id,
            first_name,
            last_name,
            avatar_url,
            bio
          ),
          course_content (*),
          reviews (
            *,
            users (id, first_name, last_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (courseData: any) => {
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      return { error };
    },

    getByInstructor: async (instructorId: string) => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          categories (*),
          enrollments (count)
        `)
        .eq('instructor_id', instructorId);
      return { data, error };
    }
  },

  // Categories
  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (categoryData: any) => {
      const { data, error } = await supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      return { error };
    }
  },

  // Coupons
  coupons: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('coupons')
        .select(`
          *,
          coupon_courses (
            course_id,
            courses (id, title)
          )
        `);

      if (filters) {
        if (filters.is_active !== undefined) query = query.eq('is_active', filters.is_active);
        if (filters.code) query = query.eq('code', filters.code);
        if (filters.type) query = query.eq('type', filters.type);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('coupons')
        .select(`
          *,
          coupon_courses (
            course_id,
            courses (id, title)
          )
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    getByCode: async (code: string) => {
      const { data, error } = await supabase
        .from('coupons')
        .select(`
          *,
          coupon_courses (
            course_id,
            courses (id, title)
          )
        `)
        .eq('code', code)
        .eq('is_active', true)
        .single();
      return { data, error };
    },

    create: async (couponData: any) => {
      const { data, error } = await supabase
        .from('coupons')
        .insert(couponData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('coupons')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('coupons')
        .delete()
        .eq('id', id);
      return { error };
    },

    incrementUsage: async (id: string) => {
      const { data, error } = await supabase
        .from('coupons')
        .update({ used_count: supabase.rpc('increment') })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    }
  },

  // Enrollments
  enrollments: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('enrollments')
        .select(`
          *,
          courses (*),
          users (id, first_name, last_name, avatar_url)
        `);

      if (filters) {
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.course_id) query = query.eq('course_id', filters.course_id);
        if (filters.status) query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (*),
          users (id, first_name, last_name, avatar_url)
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (enrollmentData: any) => {
      const { data, error } = await supabase
        .from('enrollments')
        .insert(enrollmentData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('enrollments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('enrollments')
        .delete()
        .eq('id', id);
      return { error };
    },

    checkEnrollment: async (userId: string, courseId: string) => {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();
      return { data, error };
    }
  },

  // Orders
  orders: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          users (id, first_name, last_name, email),
          coupons (code)
        `);

      if (filters) {
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.status) query = query.eq('status', filters.status);
        if (filters.order_number) query = query.eq('order_number', filters.order_number);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          users (id, first_name, last_name, email),
          coupons (code)
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (orderData: any) => {
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);
      return { error };
    }
  },

  // Payments
  payments: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('payments')
        .select(`
          *,
          orders (*),
          users (id, first_name, last_name, email)
        `);

      if (filters) {
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.order_id) query = query.eq('order_id', filters.order_id);
        if (filters.status) query = query.eq('status', filters.status);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          orders (*),
          users (id, first_name, last_name, email)
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (paymentData: any) => {
      const { data, error } = await supabase
        .from('payments')
        .insert(paymentData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('payments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    }
  },

  // Reviews
  reviews: {
    getAll: async (filters?: any) => {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          courses (id, title),
          users (id, first_name, last_name, avatar_url)
        `);

      if (filters) {
        if (filters.course_id) query = query.eq('course_id', filters.course_id);
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.is_approved !== undefined) query = query.eq('is_approved', filters.is_approved);
      }

      const { data, error } = await query;
      return { data, error };
    },

    get: async (id: string) => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          courses (id, title),
          users (id, first_name, last_name, avatar_url)
        `)
        .eq('id', id)
        .single();
      return { data, error };
    },

    create: async (reviewData: any) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select()
        .single();
      return { data, error };
    },

    update: async (id: string, updates: any) => {
      const { data, error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    delete: async (id: string) => {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
      return { error };
    }
  },

  // Notifications
  notifications: {
    getAll: async (userId: string) => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      return { data, error };
    },

    getUnread: async (userId: string) => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .eq('is_read', false)
        .order('created_at', { ascending: false });
      return { data, error };
    },

    create: async (notificationData: any) => {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notificationData)
        .select()
        .single();
      return { data, error };
    },

    markAsRead: async (id: string) => {
      const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    markAllAsRead: async (userId: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('is_read', false);
      return { error };
    }
  },

  // Analytics
  analytics: {
    track: async (eventData: any) => {
      const { data, error } = await supabase
        .from('analytics')
        .insert(eventData)
        .select()
        .single();
      return { data, error };
    },

    getEvents: async (filters?: any) => {
      let query = supabase
        .from('analytics')
        .select('*');

      if (filters) {
        if (filters.event_type) query = query.eq('event_type', filters.event_type);
        if (filters.user_id) query = query.eq('user_id', filters.user_id);
        if (filters.course_id) query = query.eq('course_id', filters.course_id);
      }

      const { data, error } = await query;
      return { data, error };
    }
  },

  // Settings
  settings: {
    get: async (key: string) => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', key)
        .single();
      return { data, error };
    },

    getAll: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      return { data, error };
    },

    update: async (key: string, value: any) => {
      const { data, error } = await supabase
        .from('settings')
        .update({ value })
        .eq('key', key)
        .select()
        .single();
      return { data, error };
    }
  }
};

// Storage helpers
export const storage = {
  uploadFile: async (bucket: string, path: string, file: File) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    return { data, error };
  },

  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },

  deleteFile: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    return { data, error };
  },

  listFiles: async (bucket: string, path?: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);
    return { data, error };
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToTable: (table: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, callback)
      .subscribe();
  },

  subscribeToUser: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel(`user_${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      }, callback)
      .subscribe();
  }
};

// Utility functions
export const utils = {
  generateOrderNumber: () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  },

  generateCertificateNumber: () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 8).toUpperCase();
    return `CERT-${timestamp}-${random}`;
  },

  formatCurrency: (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },

  slugify: (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
};

export default supabase;
