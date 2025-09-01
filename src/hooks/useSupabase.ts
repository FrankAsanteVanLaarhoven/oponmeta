import { useState, useEffect } from 'react';
import { supabase, auth, db, storage, realtime, utils } from '../lib/supabase';
import type { User, Course, Category, Coupon, Order, Payment } from '../lib/database.types';

// Authentication hook
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          const { data: userData, error: userError } = await db.users.getById(session.user.id);
          if (userError) throw userError;
          setUser(userData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            const { data: userData, error } = await db.users.getById(session.user.id);
            if (error) throw error;
            setUser(userData);
            setError(null);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to get user data');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setError(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, metadata?: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await auth.signUp(email, password, metadata);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign out failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut
  };
};

// Courses hook
export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.courses.getAll(filters);
      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const createCourse = async (courseData: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.courses.create(courseData);
      if (error) throw error;
      setCourses(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCourse = async (id: string, updates: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.courses.update(id, updates);
      if (error) throw error;
      setCourses(prev => prev.map(course => course.id === id ? data : course));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await db.courses.delete(id);
      if (error) throw error;
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse
  };
};

// Categories hook
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.categories.getAll();
      if (error) throw error;
      setCategories(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories
  };
};

// Coupons hook
export const useCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoupons = async (filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.coupons.getAll(filters);
      if (error) throw error;
      setCoupons(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch coupons');
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async (couponData: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.coupons.create(couponData);
      if (error) throw error;
      setCoupons(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create coupon');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCoupon = async (id: string, updates: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.coupons.update(id, updates);
      if (error) throw error;
      setCoupons(prev => prev.map(coupon => coupon.id === id ? data : coupon));
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update coupon');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCoupon = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await db.coupons.delete(id);
      if (error) throw error;
      setCoupons(prev => prev.filter(coupon => coupon.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete coupon');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    coupons,
    loading,
    error,
    fetchCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
  };
};

// Orders hook
export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async (filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.orders.getAll(filters);
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: any) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await db.orders.create(orderData);
      if (error) throw error;
      setOrders(prev => [...prev, data]);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder
  };
};

// File upload hook
export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, bucket: string, path: string) => {
    setUploading(true);
    setError(null);
    try {
      const { data, error } = await storage.upload(bucket, path, file);
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const getPublicUrl = (bucket: string, path: string) => {
    return storage.getPublicUrl(bucket, path);
  };

  return {
    uploading,
    error,
    uploadFile,
    getPublicUrl
  };
};

// Real-time subscription hook
export const useRealtime = (table: string, filter?: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const subscription = realtime.subscribe(table, filter, (payload) => {
      if (payload.eventType === 'INSERT') {
        setData(prev => [...prev, payload.new]);
      } else if (payload.eventType === 'UPDATE') {
        setData(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
      } else if (payload.eventType === 'DELETE') {
        setData(prev => prev.filter(item => item.id !== payload.old.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [table, filter]);

  return { data, loading, error };
};

// Analytics hook
export const useAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackEvent = async (eventType: string, metadata?: any) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await db.analytics.create({
        event_type: eventType,
        metadata
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track event');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    trackEvent
  };
};
