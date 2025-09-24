-- Enhanced OPONM Database Schema for Complete CRUD Operations
-- This schema provides comprehensive support for creators, students, and marketplace functionality

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Users table with role-based access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'student' 
        CHECK (role IN ('student', 'creator', 'admin', 'super_admin')),
    subscription_tier VARCHAR(50) DEFAULT 'free' 
        CHECK (subscription_tier IN ('free', 'basic', 'professional', 'enterprise')),
    profile_data JSONB DEFAULT '{}',
    preferences JSONB DEFAULT '{}',
    timezone VARCHAR(100) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    is_verified BOOLEAN DEFAULT false,
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Creator profiles with comprehensive information
CREATE TABLE creator_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    expertise_areas TEXT[],
    certifications JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '{}',
    teaching_experience INTEGER DEFAULT 0,
    total_students INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    payout_details JSONB DEFAULT '{}',
    is_verified BOOLEAN DEFAULT false,
    verification_documents JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student profiles with learning preferences
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    learning_goals TEXT[],
    skill_level VARCHAR(50) DEFAULT 'beginner' 
        CHECK (skill_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    interests TEXT[],
    study_hours_per_week INTEGER DEFAULT 5,
    preferred_learning_style VARCHAR(50) DEFAULT 'visual'
        CHECK (preferred_learning_style IN ('visual', 'auditory', 'kinesthetic', 'reading')),
    accessibility_needs JSONB DEFAULT '{}',
    progress_analytics JSONB DEFAULT '{}',
    achievements JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course categories
CREATE TABLE course_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_url TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course subcategories
CREATE TABLE course_subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES course_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

-- Comprehensive course management
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    detailed_description TEXT,
    thumbnail_url TEXT,
    preview_video_url TEXT,
    category_id UUID REFERENCES course_categories(id),
    subcategory_id UUID REFERENCES course_subcategories(id),
    difficulty_level VARCHAR(50) NOT NULL 
        CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'all_levels')),
    duration_hours INTEGER NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    subtitles TEXT[] DEFAULT '{}',
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'GBP',
    discount_percentage INTEGER DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    is_free BOOLEAN DEFAULT false,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' 
        CHECK (status IN ('draft', 'review', 'published', 'archived', 'suspended')),
    learning_objectives TEXT[],
    prerequisites TEXT[],
    target_audience TEXT[],
    course_materials JSONB DEFAULT '[]',
    completion_certificate BOOLEAN DEFAULT false,
    total_enrollments INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0.00,
    seo_metadata JSONB DEFAULT '{}',
    ai_generated_content JSONB DEFAULT '{}',
    last_updated_content TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course structure and content
CREATE TABLE course_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL,
    is_locked BOOLEAN DEFAULT false,
    unlock_conditions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE course_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES course_sections(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    lesson_type VARCHAR(50) NOT NULL 
        CHECK (lesson_type IN ('video', 'text', 'quiz', 'assignment', 'live_session', 'interactive', 'scorm')),
    content_data JSONB NOT NULL DEFAULT '{}',
    video_url TEXT,
    video_duration INTEGER DEFAULT 0,
    transcript TEXT,
    resources JSONB DEFAULT '[]',
    sort_order INTEGER NOT NULL,
    is_preview BOOLEAN DEFAULT false,
    is_mandatory BOOLEAN DEFAULT true,
    estimated_duration INTEGER DEFAULT 0,
    completion_criteria JSONB DEFAULT '{}',
    interactive_elements JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student enrollment and progress tracking
CREATE TABLE course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_type VARCHAR(50) NOT NULL DEFAULT 'paid' 
        CHECK (enrollment_type IN ('free', 'paid', 'scholarship', 'corporate')),
    payment_id UUID REFERENCES payments(id),
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    certificate_issued_at TIMESTAMP WITH TIME ZONE,
    certificate_url TEXT,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    time_spent_minutes INTEGER DEFAULT 0,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completion_status VARCHAR(50) DEFAULT 'not_started' 
        CHECK (completion_status IN ('not_started', 'in_progress', 'completed', 'dropped')),
    final_score DECIMAL(5,2),
    achievements JSONB DEFAULT '[]',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);

-- Detailed lesson progress tracking
CREATE TABLE lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES course_enrollments(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'not_started' 
        CHECK (status IN ('not_started', 'in_progress', 'completed', 'skipped')),
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    time_spent_seconds INTEGER DEFAULT 0,
    last_position_seconds INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    score DECIMAL(5,2),
    completion_data JSONB DEFAULT '{}',
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(enrollment_id, lesson_id)
);

-- Course marketplace and purchasing
CREATE TABLE shopping_cart (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

CREATE TABLE wishlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Payment and transaction management
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id),
    payment_intent_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'GBP',
    status VARCHAR(50) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled', 'refunded')),
    payment_method VARCHAR(50),
    stripe_metadata JSONB DEFAULT '{}',
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    refund_reason TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Course reviews and ratings
CREATE TABLE course_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, student_id)
);

-- Coupons and discounts
CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2) DEFAULT 0.00,
    maximum_discount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    applicable_courses UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES course_enrollments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    certificate_number VARCHAR(100) UNIQUE NOT NULL,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    verification_code VARCHAR(50) UNIQUE NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Video analytics
CREATE TABLE video_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES course_lessons(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE,
    watch_time INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    interaction_events JSONB DEFAULT '[]',
    quality_changes JSONB DEFAULT '[]',
    pause_points JSONB DEFAULT '[]',
    replay_segments JSONB DEFAULT '[]',
    session_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_courses_creator_id ON courses(creator_id);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_category_id ON courses(category_id);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_course_enrollments_student_id ON course_enrollments(student_id);
CREATE INDEX idx_course_enrollments_course_id ON course_enrollments(course_id);
CREATE INDEX idx_lesson_progress_student_id ON lesson_progress(student_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_course_reviews_course_id ON course_reviews(course_id);
CREATE INDEX idx_course_reviews_student_id ON course_reviews(student_id);

-- Create full-text search indexes
CREATE INDEX idx_courses_search ON courses USING gin(to_tsvector('english', title || ' ' || short_description));
CREATE INDEX idx_users_search ON users USING gin(to_tsvector('english', full_name));

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_creator_profiles_updated_at BEFORE UPDATE ON creator_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_profiles_updated_at BEFORE UPDATE ON student_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_sections_updated_at BEFORE UPDATE ON course_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_lessons_updated_at BEFORE UPDATE ON course_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_enrollments_updated_at BEFORE UPDATE ON course_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_course_reviews_updated_at BEFORE UPDATE ON course_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own data and public user data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can view public profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Creator profiles
CREATE POLICY "Users can view creator profiles" ON creator_profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own creator profile" ON creator_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own creator profile" ON creator_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Student profiles
CREATE POLICY "Users can view own student profile" ON student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own student profile" ON student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own student profile" ON student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Courses
CREATE POLICY "Anyone can view published courses" ON courses FOR SELECT USING (status = 'published');
CREATE POLICY "Creators can view own courses" ON courses FOR SELECT USING (auth.uid() = creator_id);
CREATE POLICY "Creators can insert courses" ON courses FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Creators can update own courses" ON courses FOR UPDATE USING (auth.uid() = creator_id);

-- Course sections and lessons
CREATE POLICY "Anyone can view published course sections" ON course_sections FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses WHERE id = course_id AND status = 'published')
);
CREATE POLICY "Creators can manage own course sections" ON course_sections FOR ALL USING (
    EXISTS (SELECT 1 FROM courses WHERE id = course_id AND creator_id = auth.uid())
);

CREATE POLICY "Anyone can view published course lessons" ON course_lessons FOR SELECT USING (
    EXISTS (SELECT 1 FROM courses WHERE id = course_id AND status = 'published')
);
CREATE POLICY "Creators can manage own course lessons" ON course_lessons FOR ALL USING (
    EXISTS (SELECT 1 FROM courses WHERE id = course_id AND creator_id = auth.uid())
);

-- Enrollments
CREATE POLICY "Users can view own enrollments" ON course_enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can enroll in courses" ON course_enrollments FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Users can update own enrollment progress" ON course_enrollments FOR UPDATE USING (auth.uid() = student_id);

-- Lesson progress
CREATE POLICY "Users can view own lesson progress" ON lesson_progress FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can update own lesson progress" ON lesson_progress FOR ALL USING (auth.uid() = student_id);

-- Payments
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create payments" ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews
CREATE POLICY "Anyone can view course reviews" ON course_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews for enrolled courses" ON course_reviews FOR INSERT WITH CHECK (
    auth.uid() = student_id AND 
    EXISTS (SELECT 1 FROM course_enrollments WHERE student_id = auth.uid() AND course_id = course_reviews.course_id)
);
CREATE POLICY "Users can update own reviews" ON course_reviews FOR UPDATE USING (auth.uid() = student_id);

-- Shopping cart and wishlist
CREATE POLICY "Users can manage own cart" ON shopping_cart FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own wishlist" ON wishlists FOR ALL USING (auth.uid() = user_id);

-- Certificates
CREATE POLICY "Users can view own certificates" ON certificates FOR SELECT USING (auth.uid() = student_id);

-- Video analytics
CREATE POLICY "Users can view own video analytics" ON video_analytics FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Users can create own video analytics" ON video_analytics FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO course_categories (name, slug, description, icon_url, color, sort_order) VALUES
('Technology', 'technology', 'Programming, software development, and tech skills', '💻', '#3B82F6', 1),
('Business', 'business', 'Entrepreneurship, management, and business skills', '💼', '#10B981', 2),
('Design', 'design', 'UI/UX, graphic design, and creative skills', '🎨', '#F59E0B', 3),
('Marketing', 'marketing', 'Digital marketing, SEO, and growth strategies', '📈', '#EF4444', 4),
('Data Science', 'data-science', 'Analytics, machine learning, and data visualization', '📊', '#8B5CF6', 5),
('Personal Development', 'personal-development', 'Soft skills, productivity, and self-improvement', '🧠', '#06B6D4', 6),
('Photography', 'photography', 'Camera skills, editing, and visual storytelling', '📸', '#84CC16', 7),
('Music', 'music', 'Instruments, production, and audio engineering', '🎵', '#F97316', 8),
('Health & Fitness', 'health-fitness', 'Exercise, nutrition, and wellness', '💪', '#EC4899', 9),
('Language', 'language', 'Learning new languages and communication', '🗣️', '#14B8A6', 10);

-- Insert default subcategories for Technology
INSERT INTO course_subcategories (category_id, name, slug, description, sort_order) VALUES
((SELECT id FROM course_categories WHERE slug = 'technology'), 'Web Development', 'web-development', 'HTML, CSS, JavaScript, and frameworks', 1),
((SELECT id FROM course_categories WHERE slug = 'technology'), 'Mobile Development', 'mobile-development', 'iOS, Android, and cross-platform apps', 2),
((SELECT id FROM course_categories WHERE slug = 'technology'), 'Data Science', 'data-science', 'Python, R, machine learning, and analytics', 3),
((SELECT id FROM course_categories WHERE slug = 'technology'), 'DevOps', 'devops', 'CI/CD, cloud platforms, and infrastructure', 4),
((SELECT id FROM course_categories WHERE slug = 'technology'), 'Cybersecurity', 'cybersecurity', 'Security, ethical hacking, and compliance', 5);

-- Insert default subcategories for Business
INSERT INTO course_subcategories (category_id, name, slug, description, sort_order) VALUES
((SELECT id FROM course_categories WHERE slug = 'business'), 'Entrepreneurship', 'entrepreneurship', 'Starting and growing businesses', 1),
((SELECT id FROM course_categories WHERE slug = 'business'), 'Project Management', 'project-management', 'Agile, Scrum, and team leadership', 2),
((SELECT id FROM course_categories WHERE slug = 'business'), 'Finance', 'finance', 'Accounting, investing, and financial planning', 3),
((SELECT id FROM course_categories WHERE slug = 'business'), 'Sales', 'sales', 'Sales techniques and customer relationship management', 4),
((SELECT id FROM course_categories WHERE slug = 'business'), 'Operations', 'operations', 'Supply chain, logistics, and process optimization', 5);
