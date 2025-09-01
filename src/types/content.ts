// Multilingual Content Data Models for OponMeta

export interface MultilingualContent {
  id: string;
  type: ContentType;
  language: Language;
  slug: string;
  title: string;
  description?: string;
  content: string;
  metadata: ContentMetadata;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: ContentStatus;
  tags: string[];
  category?: string;
  author?: string;
  featuredImage?: string;
  seo?: SEOData;
  translations?: Record<Language, string>; // IDs of translated versions
}

export interface BlogPost extends MultilingualContent {
  type: 'blog';
  excerpt?: string;
  readTime?: number;
  featured?: boolean;
  comments?: Comment[];
  relatedPosts?: string[];
}

export interface Course extends MultilingualContent {
  type: 'course';
  level: CourseLevel;
  duration: number; // in minutes
  modules: Module[];
  prerequisites?: string[];
  learningObjectives: string[];
  certificate?: boolean;
  price?: number;
  instructor?: string;
  enrollmentCount?: number;
  rating?: number;
  reviews?: Review[];
}

export interface MiniCourse extends MultilingualContent {
  type: 'mini-course';
  duration: number; // in minutes
  lessons: Lesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  certificate?: boolean;
  price?: number;
  instructor?: string;
  enrollmentCount?: number;
  rating?: number;
  reviews?: Review[];
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
  duration: number; // in minutes
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content: string;
  type: LessonType;
  duration: number; // in minutes
  order: number;
  resources?: Resource[];
  quiz?: Quiz;
  completed?: boolean;
  progress?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passingScore: number;
  attempts?: number;
  shuffleQuestions?: boolean;
  showResults?: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  url: string;
  size?: number;
  description?: string;
  downloadable?: boolean;
}

export interface RTOQualification extends MultilingualContent {
  type: 'rto-qualification';
  code: string; // e.g., "UEG20122"
  title: string;
  level: string; // e.g., "Certificate II"
  trainingPackage: string; // e.g., "UEG (Gas Industry)"
  units: RTOUnit[];
  duration: number; // in hours
  prerequisites?: string[];
  careerOutcomes: string[];
  industryStandards: string[];
  assessmentMethods: string[];
  deliveryMode: string[];
  price?: number;
  demoUrl?: string;
}

export interface RTOUnit {
  id: string;
  code: string;
  title: string;
  description: string;
  elements: RTOCriteria[];
  performanceCriteria: RTOCriteria[];
  assessmentRequirements: string[];
  resources: Resource[];
}

export interface RTOCriteria {
  id: string;
  code: string;
  description: string;
  evidence: string[];
}

export interface Page extends MultilingualContent {
  type: 'page';
  template: PageTemplate;
  sections: PageSection[];
  navigation?: NavigationItem[];
}

export interface PageSection {
  id: string;
  type: SectionType;
  title?: string;
  content?: string;
  components: Component[];
  order: number;
  visible: boolean;
}

export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: Component[];
}

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  order: number;
  parentId?: string;
  children?: NavigationItem[];
  external?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  replies?: Comment[];
  approved?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title?: string;
  content: string;
  createdAt: string;
  helpful?: number;
  verified?: boolean;
}

export interface ContentMetadata {
  keywords?: string[];
  author?: string;
  lastModified?: string;
  version?: string;
  license?: string;
  source?: string;
  originalUrl?: string;
  targetAudience?: string;
  duration?: string;
  difficulty?: string;
  estimatedHours?: number;
  modules?: any[];
  prerequisites?: string[];
  learningOutcomes?: string[];
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
}

// Enums and Types
export type ContentType = 
  | 'blog' 
  | 'course' 
  | 'mini-course' 
  | 'rto-qualification' 
  | 'page' 
  | 'lesson' 
  | 'quiz' 
  | 'resource';

export type Language = 
  | 'en' 
  | 'de' 
  | 'fr' 
  | 'es' 
  | 'it' 
  | 'pt' 
  | 'zh' 
  | 'ja' 
  | 'ko' 
  | 'nl';

export const LANGUAGE_CODES: Language[] = ['en', 'es', 'de', 'fr', 'it', 'ja', 'ko', 'nl', 'pt', 'zh'];

export type ContentStatus = 'draft' | 'published' | 'archived' | 'scheduled';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type LessonType = 
  | 'video' 
  | 'text' 
  | 'interactive' 
  | 'quiz' 
  | 'assignment' 
  | 'discussion' 
  | 'resource';

export type QuestionType = 
  | 'multiple-choice' 
  | 'true-false' 
  | 'fill-blank' 
  | 'essay' 
  | 'matching' 
  | 'ordering';

export type ResourceType = 
  | 'document' 
  | 'video' 
  | 'audio' 
  | 'image' 
  | 'link' 
  | 'file';

export type PageTemplate = 
  | 'default' 
  | 'landing' 
  | 'about' 
  | 'contact' 
  | 'pricing' 
  | 'blog' 
  | 'course' 
  | 'rto';

export type SectionType = 
  | 'hero' 
  | 'content' 
  | 'features' 
  | 'testimonials' 
  | 'cta' 
  | 'footer';

export type ComponentType = 
  | 'text' 
  | 'image' 
  | 'video' 
  | 'button' 
  | 'form' 
  | 'gallery' 
  | 'testimonial' 
  | 'pricing-card';

// Language Configuration
export const LANGUAGES: Record<Language, { name: string; nativeName: string; flag: string }> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
};

// Content Categories
export const CONTENT_CATEGORIES = {
  BLOG: 'blog',
  COURSES: 'courses',
  MINI_COURSES: 'mini-courses',
  RTO_QUALIFICATIONS: 'rto-qualifications',
  PAGES: 'pages',
  RESOURCES: 'resources'
} as const;

// RTO Training Packages
export const RTO_TRAINING_PACKAGES = {
  UEG: 'UEG (Gas Industry)',
  UEE: 'UEE (Electrotechnology)',
  UEP: 'UEP (ESI Generation)',
  UET: 'UET (ESI Transmission)',
  OTHER: 'Other'
} as const;

// Utility Types
export type ContentWithLanguage<T extends MultilingualContent> = T & {
  language: Language;
  translations?: Record<Language, string>;
};

export type ContentFilter = {
  type?: ContentType;
  language?: Language;
  status?: ContentStatus;
  category?: string;
  tags?: string[];
  search?: string;
  author?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type ContentSort = {
  field: keyof MultilingualContent;
  direction: 'asc' | 'desc';
};

// Content Statistics
export interface ContentStats {
  total: number;
  byType: Record<ContentType, number>;
  byLanguage: Record<Language, number>;
  byStatus: Record<ContentStatus, number>;
  byCategory: Record<string, number>;
  recent: MultilingualContent[];
  popular: MultilingualContent[];
} 