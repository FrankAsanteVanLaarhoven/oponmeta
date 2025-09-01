export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          bio: string | null
          role: 'student' | 'instructor' | 'admin' | 'super_admin'
          phone: string | null
          date_of_birth: string | null
          country: string | null
          timezone: string
          language: string
          currency: string
          is_verified: boolean
          is_active: boolean
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'student' | 'instructor' | 'admin' | 'super_admin'
          phone?: string | null
          date_of_birth?: string | null
          country?: string | null
          timezone?: string
          language?: string
          currency?: string
          is_verified?: boolean
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: 'student' | 'instructor' | 'admin' | 'super_admin'
          phone?: string | null
          date_of_birth?: string | null
          country?: string | null
          timezone?: string
          language?: string
          currency?: string
          is_verified?: boolean
          is_active?: boolean
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          address_line1: string | null
          address_line2: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          billing_address_line1: string | null
          billing_address_line2: string | null
          billing_city: string | null
          billing_state: string | null
          billing_postal_code: string | null
          billing_country: string | null
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          billing_address_line1?: string | null
          billing_address_line2?: string | null
          billing_city?: string | null
          billing_state?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          billing_address_line1?: string | null
          billing_address_line2?: string | null
          billing_city?: string | null
          billing_state?: string | null
          billing_postal_code?: string | null
          billing_country?: string | null
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          category_id: string | null
          instructor_id: string | null
          level: 'beginner' | 'intermediate' | 'advanced'
          price: number
          original_price: number | null
          currency: string
          image_url: string | null
          video_url: string | null
          duration: number
          lessons_count: number
          students_count: number
          rating: number
          reviews_count: number
          status: 'draft' | 'published' | 'paused' | 'archived'
          visibility: 'public' | 'private' | 'unlisted'
          is_featured: boolean
          has_certificate: boolean
          language: string
          tags: string[] | null
          requirements: string[] | null
          learning_outcomes: string[] | null
          enrollment_limit: number | null
          current_enrollments: number
          start_date: string | null
          end_date: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          category_id?: string | null
          instructor_id?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          price?: number
          original_price?: number | null
          currency?: string
          image_url?: string | null
          video_url?: string | null
          duration?: number
          lessons_count?: number
          students_count?: number
          rating?: number
          reviews_count?: number
          status?: 'draft' | 'published' | 'paused' | 'archived'
          visibility?: 'public' | 'private' | 'unlisted'
          is_featured?: boolean
          has_certificate?: boolean
          language?: string
          tags?: string[] | null
          requirements?: string[] | null
          learning_outcomes?: string[] | null
          enrollment_limit?: number | null
          current_enrollments?: number
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          category_id?: string | null
          instructor_id?: string | null
          level?: 'beginner' | 'intermediate' | 'advanced'
          price?: number
          original_price?: number | null
          currency?: string
          image_url?: string | null
          video_url?: string | null
          duration?: number
          lessons_count?: number
          students_count?: number
          rating?: number
          reviews_count?: number
          status?: 'draft' | 'published' | 'paused' | 'archived'
          visibility?: 'public' | 'private' | 'unlisted'
          is_featured?: boolean
          has_certificate?: boolean
          language?: string
          tags?: string[] | null
          requirements?: string[] | null
          learning_outcomes?: string[] | null
          enrollment_limit?: number | null
          current_enrollments?: number
          start_date?: string | null
          end_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_content: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          content_type: string
          content_url: string | null
          duration: number
          sort_order: number
          is_free: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          content_type: string
          content_url?: string | null
          duration?: number
          sort_order?: number
          is_free?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          content_type?: string
          content_url?: string | null
          duration?: number
          sort_order?: number
          is_free?: boolean
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      coupons: {
        Row: {
          id: string
          code: string
          type: 'percentage' | 'fixed'
          value: number
          currency: string
          min_purchase: number | null
          max_discount: number | null
          usage_limit: number
          used_count: number
          valid_from: string
          valid_until: string
          is_active: boolean
          description: string | null
          created_by: string | null
          priority: string
          auto_apply: boolean
          first_time_only: boolean
          email_restrictions: string[] | null
          ip_restrictions: string[] | null
          time_restrictions: Json | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          type: 'percentage' | 'fixed'
          value: number
          currency?: string
          min_purchase?: number | null
          max_discount?: number | null
          usage_limit: number
          used_count?: number
          valid_from: string
          valid_until: string
          is_active?: boolean
          description?: string | null
          created_by?: string | null
          priority?: string
          auto_apply?: boolean
          first_time_only?: boolean
          email_restrictions?: string[] | null
          ip_restrictions?: string[] | null
          time_restrictions?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          type?: 'percentage' | 'fixed'
          value?: number
          currency?: string
          min_purchase?: number | null
          max_discount?: number | null
          usage_limit?: number
          used_count?: number
          valid_from?: string
          valid_until?: string
          is_active?: boolean
          description?: string | null
          created_by?: string | null
          priority?: string
          auto_apply?: boolean
          first_time_only?: boolean
          email_restrictions?: string[] | null
          ip_restrictions?: string[] | null
          time_restrictions?: Json | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      coupon_courses: {
        Row: {
          id: string
          coupon_id: string
          course_id: string
          created_at: string
        }
        Insert: {
          id?: string
          coupon_id: string
          course_id: string
          created_at?: string
        }
        Update: {
          id?: string
          coupon_id?: string
          course_id?: string
          created_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          status: 'active' | 'completed' | 'cancelled' | 'expired'
          enrolled_at: string
          completed_at: string | null
          progress_percentage: number
          last_accessed: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          status?: 'active' | 'completed' | 'cancelled' | 'expired'
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
          last_accessed?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          status?: 'active' | 'completed' | 'cancelled' | 'expired'
          enrolled_at?: string
          completed_at?: string | null
          progress_percentage?: number
          last_accessed?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          subtotal: number
          discount_amount: number
          tax_amount: number
          total_amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto' | null
          payment_intent_id: string | null
          coupon_id: string | null
          billing_address: Json | null
          shipping_address: Json | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          order_number: string
          subtotal: number
          discount_amount?: number
          tax_amount?: number
          total_amount: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto' | null
          payment_intent_id?: string | null
          coupon_id?: string | null
          billing_address?: Json | null
          shipping_address?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          order_number?: string
          subtotal?: number
          discount_amount?: number
          tax_amount?: number
          total_amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto' | null
          payment_intent_id?: string | null
          coupon_id?: string | null
          billing_address?: Json | null
          shipping_address?: Json | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          course_id: string | null
          title: string
          price: number
          quantity: number
          total: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          course_id?: string | null
          title: string
          price: number
          quantity?: number
          total: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          course_id?: string | null
          title?: string
          price?: number
          quantity?: number
          total?: number
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          user_id: string
          amount: number
          currency: string
          payment_method: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto'
          payment_intent_id: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          gateway_response: Json | null
          refunded_amount: number
          refunded_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          amount: number
          currency?: string
          payment_method: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto'
          payment_intent_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          gateway_response?: Json | null
          refunded_amount?: number
          refunded_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          amount?: number
          currency?: string
          payment_method?: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto'
          payment_intent_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          gateway_response?: Json | null
          refunded_amount?: number
          refunded_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          user_id: string
          course_id: string
          certificate_number: string
          status: 'pending' | 'issued' | 'expired'
          issued_at: string | null
          expires_at: string | null
          certificate_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          certificate_number: string
          status?: 'pending' | 'issued' | 'expired'
          issued_at?: string | null
          expires_at?: string | null
          certificate_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          certificate_number?: string
          status?: 'pending' | 'issued' | 'expired'
          issued_at?: string | null
          expires_at?: string | null
          certificate_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          user_id: string
          course_id: string
          rating: number
          title: string | null
          comment: string | null
          is_verified: boolean
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          rating: number
          title?: string | null
          comment?: string | null
          is_verified?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          rating?: number
          title?: string | null
          comment?: string | null
          is_verified?: boolean
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          content_id: string
          progress_percentage: number
          time_spent: number
          is_completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          content_id: string
          progress_percentage?: number
          time_spent?: number
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          content_id?: string
          progress_percentage?: number
          time_spent?: number
          is_completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      wishlist: {
        Row: {
          id: string
          user_id: string
          course_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          is_read: boolean
          read_at: string | null
          action_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          is_read?: boolean
          read_at?: string | null
          action_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          is_read?: boolean
          read_at?: string | null
          action_url?: string | null
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          event_type: string
          user_id: string | null
          course_id: string | null
          metadata: Json | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_type: string
          user_id?: string | null
          course_id?: string | null
          metadata?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_type?: string
          user_id?: string | null
          course_id?: string | null
          metadata?: Json | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'student' | 'instructor' | 'admin' | 'super_admin'
      course_status: 'draft' | 'published' | 'paused' | 'archived'
      course_visibility: 'public' | 'private' | 'unlisted'
      course_level: 'beginner' | 'intermediate' | 'advanced'
      coupon_type: 'percentage' | 'fixed'
      payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
      payment_method: 'stripe' | 'apple_pay' | 'google_pay' | 'paypal' | 'bank_transfer' | 'crypto'
      enrollment_status: 'active' | 'completed' | 'cancelled' | 'expired'
      certificate_status: 'pending' | 'issued' | 'expired'
    }
  }
}

// Type aliases for easier use
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Course = Database['public']['Tables']['courses']['Row']
export type CourseInsert = Database['public']['Tables']['courses']['Insert']
export type CourseUpdate = Database['public']['Tables']['courses']['Update']

export type Category = Database['public']['Tables']['categories']['Row']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export type Coupon = Database['public']['Tables']['coupons']['Row']
export type CouponInsert = Database['public']['Tables']['coupons']['Insert']
export type CouponUpdate = Database['public']['Tables']['coupons']['Update']

export type Enrollment = Database['public']['Tables']['enrollments']['Row']
export type EnrollmentInsert = Database['public']['Tables']['enrollments']['Insert']
export type EnrollmentUpdate = Database['public']['Tables']['enrollments']['Update']

export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']

export type Payment = Database['public']['Tables']['payments']['Row']
export type PaymentInsert = Database['public']['Tables']['payments']['Insert']
export type PaymentUpdate = Database['public']['Tables']['payments']['Update']

export type Review = Database['public']['Tables']['reviews']['Row']
export type ReviewInsert = Database['public']['Tables']['reviews']['Insert']
export type ReviewUpdate = Database['public']['Tables']['reviews']['Update']

export type Notification = Database['public']['Tables']['notifications']['Row']
export type NotificationInsert = Database['public']['Tables']['notifications']['Insert']
export type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

export type Certificate = Database['public']['Tables']['certificates']['Row']
export type CertificateInsert = Database['public']['Tables']['certificates']['Insert']
export type CertificateUpdate = Database['public']['Tables']['certificates']['Update']

export type UserProgress = Database['public']['Tables']['user_progress']['Row']
export type UserProgressInsert = Database['public']['Tables']['user_progress']['Insert']
export type UserProgressUpdate = Database['public']['Tables']['user_progress']['Update']

export type WishlistItem = Database['public']['Tables']['wishlist']['Row']
export type WishlistItemInsert = Database['public']['Tables']['wishlist']['Insert']
export type WishlistItemUpdate = Database['public']['Tables']['wishlist']['Update']

export type AnalyticsEvent = Database['public']['Tables']['analytics']['Row']
export type AnalyticsEventInsert = Database['public']['Tables']['analytics']['Insert']
export type AnalyticsEventUpdate = Database['public']['Tables']['analytics']['Update']

export type Setting = Database['public']['Tables']['settings']['Row']
export type SettingInsert = Database['public']['Tables']['settings']['Insert']
export type SettingUpdate = Database['public']['Tables']['settings']['Update']

// Extended types with relationships
export type CourseWithRelations = Course & {
  categories: Category | null
  users: User | null
  course_content: CourseContent[]
  reviews: (Review & { users: User | null })[]
}

export type CourseContent = Database['public']['Tables']['course_content']['Row']

export type OrderWithRelations = Order & {
  order_items: OrderItem[]
  users: User | null
  coupons: Coupon | null
}

export type OrderItem = Database['public']['Tables']['order_items']['Row']

export type CouponWithRelations = Coupon & {
  coupon_courses: (CouponCourse & { courses: Course | null })[]
}

export type CouponCourse = Database['public']['Tables']['coupon_courses']['Row']

export type EnrollmentWithRelations = Enrollment & {
  courses: Course | null
  users: User | null
}

export type PaymentWithRelations = Payment & {
  orders: Order | null
  users: User | null
}

export type ReviewWithRelations = Review & {
  courses: Course | null
  users: User | null
}
