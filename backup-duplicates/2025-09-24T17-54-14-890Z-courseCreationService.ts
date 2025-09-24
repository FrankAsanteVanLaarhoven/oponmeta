import { supabase } from '../lib/supabase'

export interface CreateCourseData {
  title: string
  shortDescription: string
  detailedDescription: string
  categoryId: string
  subcategoryId?: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'all_levels'
  durationHours: number
  language: string
  price: number
  currency: string
  learningObjectives: string[]
  prerequisites: string[]
  targetAudience: string[]
  sections?: CourseSectionData[]
  materials?: CourseMaterial[]
  thumbnail?: File
  previewVideo?: File
}

export interface CourseSectionData {
  title: string
  description: string
  sortOrder: number
  lessons: LessonData[]
}

export interface LessonData {
  title: string
  lessonType: 'video' | 'text' | 'quiz' | 'assignment' | 'live_session' | 'interactive' | 'scorm'
  content: any
  sortOrder: number
  isPreview: boolean
  estimatedDuration: number
  videoFile?: File
  resources?: File[]
}

export interface CourseMaterial {
  name: string
  type: 'document' | 'video' | 'audio' | 'image' | 'link'
  file?: File
  url?: string
  description: string
}

export interface CourseFilters {
  category?: string
  subcategory?: string
  difficulty?: string
  priceRange?: { min: number; max: number }
  language?: string
  rating?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

export interface PaginatedCourses {
  courses: Course[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UpdateCourseData {
  title?: string
  shortDescription?: string
  detailedDescription?: string
  categoryId?: string
  subcategoryId?: string
  difficultyLevel?: string
  durationHours?: number
  language?: string
  price?: number
  currency?: string
  learningObjectives?: string[]
  prerequisites?: string[]
  targetAudience?: string[]
  sections?: CourseSectionData[]
  status?: string
}

export interface Course {
  id: string
  creator_id: string
  title: string
  slug: string
  short_description: string
  detailed_description: string
  thumbnail_url: string
  preview_video_url: string
  category_id: string
  subcategory_id: string
  difficulty_level: string
  duration_hours: number
  language: string
  subtitles: string[]
  price: number
  currency: string
  discount_percentage: number
  is_free: boolean
  status: string
  learning_objectives: string[]
  prerequisites: string[]
  target_audience: string[]
  course_materials: any[]
  completion_certificate: boolean
  total_enrollments: number
  average_rating: number
  total_reviews: number
  total_revenue: number
  seo_metadata: any
  ai_generated_content: any
  last_updated_content: string
  published_at: string
  created_at: string
  updated_at: string
  creator?: any
  creator_profile?: any
  category?: any
  subcategory?: any
  sections?: any[]
  enrollments?: any[]
  reviews?: any[]
}

export class CourseCreationService {
  private static instance: CourseCreationService

  static getInstance(): CourseCreationService {
    if (!CourseCreationService.instance) {
      CourseCreationService.instance = new CourseCreationService()
    }
    return CourseCreationService.instance
  }

  // CREATE: Complete course creation workflow
  async createCourse(creatorId: string, courseData: CreateCourseData): Promise<Course> {
    try {
      // 1. Create basic course record
      const { data: course, error: courseError } = await supabase
        .from('courses')
        .insert({
          creator_id: creatorId,
          title: courseData.title,
          slug: this.generateSlug(courseData.title),
          short_description: courseData.shortDescription,
          detailed_description: courseData.detailedDescription,
          category_id: courseData.categoryId,
          subcategory_id: courseData.subcategoryId,
          difficulty_level: courseData.difficultyLevel,
          duration_hours: courseData.durationHours,
          language: courseData.language,
          price: courseData.price,
          currency: courseData.currency,
          learning_objectives: courseData.learningObjectives,
          prerequisites: courseData.prerequisites,
          target_audience: courseData.targetAudience,
          status: 'draft'
        })
        .select()
        .single()

      if (courseError) throw courseError

      // 2. Upload thumbnail if provided
      if (courseData.thumbnail) {
        const thumbnailUrl = await this.uploadThumbnail(course.id, courseData.thumbnail)
        await this.updateCourse(course.id, { thumbnail_url: thumbnailUrl })
      }

      // 3. Upload preview video if provided
      if (courseData.previewVideo) {
        const previewVideoUrl = await this.uploadPreviewVideo(course.id, courseData.previewVideo)
        await this.updateCourse(course.id, { preview_video_url: previewVideoUrl })
      }

      // 4. Create course sections and lessons
      if (courseData.sections?.length > 0) {
        await this.createCourseSections(course.id, courseData.sections)
      }

      // 5. Upload and process course materials
      if (courseData.materials?.length > 0) {
        await this.uploadCourseMaterials(course.id, courseData.materials)
      }

      // 6. Generate AI-powered content enhancements
      await this.enhanceWithAI(course.id, courseData)

      // 7. Fetch the complete course with all relations
      const completeCourse = await this.getCourseById(course.id)

      return completeCourse
    } catch (error) {
      console.error('Course creation failed:', error)
      throw new Error('Failed to create course')
    }
  }

  // READ: Advanced course retrieval with filtering and pagination
  async getCourses(filters: CourseFilters = {}): Promise<PaginatedCourses> {
    let query = supabase
      .from('courses')
      .select(`
        *,
        creator:users!courses_creator_id_fkey(id, full_name, avatar_url),
        creator_profile:creator_profiles!creator_profiles_user_id_fkey(*),
        category:course_categories(*),
        subcategory:course_subcategories(*),
        sections:course_sections(
          *,
          lessons:course_lessons(*)
        ),
        enrollments:course_enrollments(count),
        reviews:course_reviews(rating, comment, created_at, student:users(*))
      `, { count: 'exact' })

    // Apply filters
    if (filters.category) {
      query = query.eq('category_id', filters.category)
    }
    
    if (filters.subcategory) {
      query = query.eq('subcategory_id', filters.subcategory)
    }
    
    if (filters.difficulty) {
      query = query.eq('difficulty_level', filters.difficulty)
    }
    
    if (filters.priceRange) {
      query = query
        .gte('price', filters.priceRange.min)
        .lte('price', filters.priceRange.max)
    }
    
    if (filters.language) {
      query = query.eq('language', filters.language)
    }
    
    if (filters.rating) {
      query = query.gte('average_rating', filters.rating)
    }
    
    if (filters.search) {
      query = query.or(`
        title.ilike.%${filters.search}%,
        short_description.ilike.%${filters.search}%,
        learning_objectives.cs.{${filters.search}}
      `)
    }

    // Only show published courses for public access
    query = query.eq('status', 'published')

    // Apply sorting
    const sortField = filters.sortBy || 'created_at'
    const sortOrder = filters.sortOrder || 'desc'
    query = query.order(sortField, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const page = filters.page || 1
    const limit = filters.limit || 12
    const offset = (page - 1) * limit
    
    query = query.range(offset, offset + limit - 1)

    const { data: courses, error, count } = await query

    if (error) throw error

    return {
      courses: courses || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  }

  // Get course by ID with all relations
  async getCourseById(courseId: string): Promise<Course> {
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        creator:users!courses_creator_id_fkey(id, full_name, avatar_url),
        creator_profile:creator_profiles!creator_profiles_user_id_fkey(*),
        category:course_categories(*),
        subcategory:course_subcategories(*),
        sections:course_sections(
          *,
          lessons:course_lessons(*)
        ),
        enrollments:course_enrollments(count),
        reviews:course_reviews(rating, comment, created_at, student:users(*))
      `)
      .eq('id', courseId)
      .single()

    if (error) throw error
    return course
  }

  // Get courses by creator
  async getCoursesByCreator(creatorId: string, includeDrafts: boolean = false): Promise<Course[]> {
    let query = supabase
      .from('courses')
      .select(`
        *,
        category:course_categories(*),
        subcategory:course_subcategories(*),
        sections:course_sections(
          *,
          lessons:course_lessons(*)
        ),
        enrollments:course_enrollments(count)
      `)
      .eq('creator_id', creatorId)

    if (!includeDrafts) {
      query = query.neq('status', 'draft')
    }

    const { data: courses, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return courses || []
  }

  // UPDATE: Comprehensive course updating
  async updateCourse(courseId: string, updates: UpdateCourseData): Promise<Course> {
    try {
      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString(),
        last_updated_content: new Date().toISOString()
      }

      // Update slug if title changed
      if (updates.title) {
        updateData.slug = this.generateSlug(updates.title)
      }

      const { data: course, error } = await supabase
        .from('courses')
        .update(updateData)
        .eq('id', courseId)
        .select()
        .single()

      if (error) throw error

      // Update sections and lessons if provided
      if (updates.sections) {
        await this.updateCourseSections(courseId, updates.sections)
      }

      // Trigger AI content analysis for improvements
      await this.analyzeContentQuality(courseId)

      return course
    } catch (error) {
      console.error('Course update failed:', error)
      throw new Error('Failed to update course')
    }
  }

  // DELETE: Safe course deletion with dependency management
  async deleteCourse(courseId: string, creatorId: string): Promise<boolean> {
    try {
      // Check if course has active enrollments
      const { count: enrollmentCount } = await supabase
        .from('course_enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', courseId)
        .neq('completion_status', 'dropped')

      if (enrollmentCount && enrollmentCount > 0) {
        throw new Error('Cannot delete course with active enrollments')
      }

      // Soft delete by archiving instead of hard delete
      const { error } = await supabase
        .from('courses')
        .update({ 
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .eq('creator_id', creatorId)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Course deletion failed:', error)
      throw new Error('Failed to delete course')
    }
  }

  // Publish course
  async publishCourse(courseId: string, creatorId: string): Promise<Course> {
    try {
      // Validate course completeness before publishing
      await this.validateCourseCompleteness(courseId)

      const { data: course, error } = await supabase
        .from('courses')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .eq('creator_id', creatorId)
        .select()
        .single()

      if (error) throw error

      // Generate SEO metadata
      await this.generateSEOMetadata(courseId)

      return course
    } catch (error) {
      console.error('Course publishing failed:', error)
      throw new Error('Failed to publish course')
    }
  }

  // Private helper methods
  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  private async createCourseSections(courseId: string, sections: CourseSectionData[]): Promise<void> {
    for (const sectionData of sections) {
      const { data: section, error: sectionError } = await supabase
        .from('course_sections')
        .insert({
          course_id: courseId,
          title: sectionData.title,
          description: sectionData.description,
          sort_order: sectionData.sortOrder
        })
        .select()
        .single()

      if (sectionError) throw sectionError

      // Create lessons for this section
      if (sectionData.lessons?.length > 0) {
        await this.createLessons(section.id, courseId, sectionData.lessons)
      }
    }
  }

  private async createLessons(sectionId: string, courseId: string, lessons: LessonData[]): Promise<void> {
    for (const lessonData of lessons) {
      const { data: lesson, error: lessonError } = await supabase
        .from('course_lessons')
        .insert({
          section_id: sectionId,
          course_id: courseId,
          title: lessonData.title,
          slug: this.generateSlug(lessonData.title),
          lesson_type: lessonData.lessonType,
          content_data: lessonData.content,
          sort_order: lessonData.sortOrder,
          is_preview: lessonData.isPreview,
          estimated_duration: lessonData.estimatedDuration
        })
        .select()
        .single()

      if (lessonError) throw lessonError

      // Upload video file if provided
      if (lessonData.videoFile) {
        const videoUrl = await this.uploadLessonVideo(courseId, sectionId, lesson.id, lessonData.videoFile)
        await supabase
          .from('course_lessons')
          .update({ video_url: videoUrl })
          .eq('id', lesson.id)
      }

      // Upload resources if provided
      if (lessonData.resources?.length > 0) {
        const resourceUrls = await this.uploadLessonResources(courseId, sectionId, lesson.id, lessonData.resources)
        await supabase
          .from('course_lessons')
          .update({ resources: resourceUrls })
          .eq('id', lesson.id)
      }
    }
  }

  private async updateCourseSections(courseId: string, sections: CourseSectionData[]): Promise<void> {
    // Delete existing sections and recreate them
    await supabase
      .from('course_sections')
      .delete()
      .eq('course_id', courseId)

    // Recreate sections
    await this.createCourseSections(courseId, sections)
  }

  private async uploadThumbnail(courseId: string, file: File): Promise<string> {
    const fileName = `courses/${courseId}/thumbnail-${Date.now()}.${file.name.split('.').pop()}`
    
    const { data, error } = await supabase.storage
      .from('course-assets')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('course-assets')
      .getPublicUrl(fileName)

    return publicUrl
  }

  private async uploadPreviewVideo(courseId: string, file: File): Promise<string> {
    const fileName = `courses/${courseId}/preview-${Date.now()}.${file.name.split('.').pop()}`
    
    const { data, error } = await supabase.storage
      .from('course-videos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('course-videos')
      .getPublicUrl(fileName)

    return publicUrl
  }

  private async uploadLessonVideo(courseId: string, sectionId: string, lessonId: string, file: File): Promise<string> {
    const fileName = `courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/video-${Date.now()}.${file.name.split('.').pop()}`
    
    const { data, error } = await supabase.storage
      .from('course-videos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('course-videos')
      .getPublicUrl(fileName)

    return publicUrl
  }

  private async uploadLessonResources(courseId: string, sectionId: string, lessonId: string, files: File[]): Promise<string[]> {
    const uploadPromises = files.map(async (file) => {
      const fileName = `courses/${courseId}/sections/${sectionId}/lessons/${lessonId}/resources/${Date.now()}-${file.name}`
      
      const { data, error } = await supabase.storage
        .from('course-assets')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('course-assets')
        .getPublicUrl(fileName)

      return publicUrl
    })

    return Promise.all(uploadPromises)
  }

  private async uploadCourseMaterials(courseId: string, materials: CourseMaterial[]): Promise<void> {
    const materialUrls = []

    for (const material of materials) {
      if (material.file) {
        const fileName = `courses/${courseId}/materials/${Date.now()}-${material.file.name}`
        
        const { data, error } = await supabase.storage
          .from('course-assets')
          .upload(fileName, material.file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) throw error

        const { data: { publicUrl } } = supabase.storage
          .from('course-assets')
          .getPublicUrl(fileName)

        materialUrls.push({
          name: material.name,
          type: material.type,
          url: publicUrl,
          description: material.description
        })
      } else if (material.url) {
        materialUrls.push({
          name: material.name,
          type: material.type,
          url: material.url,
          description: material.description
        })
      }
    }

    // Update course with material URLs
    await supabase
      .from('courses')
      .update({ course_materials: materialUrls })
      .eq('id', courseId)
  }

  // Advanced AI-powered content enhancement
  private async enhanceWithAI(courseId: string, courseData: CreateCourseData): Promise<void> {
    try {
      // Generate course outline suggestions
      const outlineSuggestions = await this.generateCourseOutline(courseData)
      
      // Create SEO-optimized metadata
      const seoMetadata = await this.generateSEOMetadata(courseId)
      
      // Generate quiz questions based on content
      const quizSuggestions = await this.generateQuizQuestions(courseData)

      // Update course with AI enhancements
      await supabase
        .from('courses')
        .update({
          ai_generated_content: {
            outline_suggestions: outlineSuggestions,
            seo_metadata: seoMetadata,
            quiz_suggestions: quizSuggestions,
            generated_at: new Date().toISOString()
          }
        })
        .eq('id', courseId)

    } catch (error) {
      console.error('AI enhancement failed:', error)
      // Don't throw error to avoid breaking course creation
    }
  }

  private async generateCourseOutline(courseData: CreateCourseData): Promise<any> {
    // This would integrate with your AI service
    return {
      suggested_sections: [
        { title: 'Introduction', description: 'Course overview and objectives' },
        { title: 'Fundamentals', description: 'Core concepts and basics' },
        { title: 'Advanced Topics', description: 'In-depth coverage of complex topics' },
        { title: 'Practical Applications', description: 'Real-world examples and projects' },
        { title: 'Conclusion', description: 'Summary and next steps' }
      ]
    }
  }

  private async generateSEOMetadata(courseId: string): Promise<any> {
    const course = await this.getCourseById(courseId)
    
    return {
      title: `${course.title} - Learn with OPONM`,
      description: course.short_description,
      keywords: course.learning_objectives.join(', '),
      og_title: course.title,
      og_description: course.short_description,
      og_image: course.thumbnail_url
    }
  }

  private async generateQuizQuestions(courseData: CreateCourseData): Promise<any> {
    // This would integrate with your AI service to generate quiz questions
    return {
      questions: [
        {
          type: 'multiple_choice',
          question: 'What is the main objective of this course?',
          options: courseData.learning_objectives.slice(0, 4),
          correct_answer: 0
        }
      ]
    }
  }

  private async validateCourseCompleteness(courseId: string): Promise<void> {
    const course = await this.getCourseById(courseId)
    
    if (!course.thumbnail_url) {
      throw new Error('Course must have a thumbnail before publishing')
    }
    
    if (!course.sections || course.sections.length === 0) {
      throw new Error('Course must have at least one section before publishing')
    }
    
    const totalLessons = course.sections.reduce((sum, section) => sum + (section.lessons?.length || 0), 0)
    if (totalLessons === 0) {
      throw new Error('Course must have at least one lesson before publishing')
    }
  }

  private async analyzeContentQuality(courseId: string): Promise<void> {
    // This would integrate with your AI service to analyze content quality
    console.log(`Analyzing content quality for course ${courseId}`)
  }

  // Public utility methods
  async getCategories(): Promise<any[]> {
    const { data: categories, error } = await supabase
      .from('course_categories')
      .select(`
        *,
        subcategories:course_subcategories(*)
      `)
      .eq('is_active', true)
      .order('sort_order')

    if (error) throw error
    return categories || []
  }

  async getSubcategories(categoryId: string): Promise<any[]> {
    const { data: subcategories, error } = await supabase
      .from('course_subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('sort_order')

    if (error) throw error
    return subcategories || []
  }

  async searchCourses(query: string, filters: CourseFilters = {}): Promise<PaginatedCourses> {
    return this.getCourses({
      ...filters,
      search: query
    })
  }
}

export const courseCreationService = CourseCreationService.getInstance()
