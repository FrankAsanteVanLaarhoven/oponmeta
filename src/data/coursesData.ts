export interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  duration: string;
  level: string;
  lessonsCount: number;
  description: string;
  progress?: number;
  isBestseller?: boolean;
  lastUpdated: string;
  language: string;
  hasSubtitles: boolean;
  slug?: string;
  // New fields for course creation and management
  objectives?: string[];
  tags?: string[];
  content?: {
    lessons: Lesson[];
    quizzes: Quiz[];
    assignments: Assignment[];
  };
  status?: 'draft' | 'published' | 'archived';
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  creatorId?: string;
  salesCount?: number;
  revenue?: number;
  certificate?: boolean;
  accessType?: 'free' | 'paid' | 'subscription';
  enrollmentLimit?: number;
  currentEnrollments?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  resources?: Resource[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passGrade: number;
  order: number;
}

export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  wordCount: number;
  passGrade: number;
  dueDate?: string;
  order: number;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'video' | 'link' | 'file';
  url: string;
  description?: string;
}

export const coursesData: Course[] = [
  {
    id: 1,
    title: "Digital Marketing Fundamentals",
    instructor: "Sarah Johnson",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    students: 1234,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Marketing",
    duration: "3-10 hours",
    level: "Beginner",
    lessonsCount: 18,
    description: "Master the fundamentals of digital marketing and grow your online presence",
    progress: 45,
    isBestseller: true,
    lastUpdated: "2024-02-20",
    language: "English",
    hasSubtitles: true,
    tags: ["Marketing", "SEO", "Social Media", "Beginner Friendly"]
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    instructor: "Mike Chen",
    price: 499,
    originalPrice: 699,
    rating: 4.9,
    students: 2156,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Technology",
    duration: "20+ hours",
    level: "Intermediate",
    lessonsCount: 45,
    description: "Complete bootcamp covering HTML, CSS, JavaScript, React, and Node.js",
    isBestseller: true,
    lastUpdated: "2024-03-05",
    language: "English",
    hasSubtitles: true,
    tags: ["Web Development", "JavaScript", "React", "Node.js", "In-Demand Skills"]
  },
  {
    id: 3,
    title: "Business Strategy and Leadership",
    instructor: "Dr. Amara Okafor",
    price: 399,
    rating: 4.7,
    students: 892,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Business",
    duration: "11-20 hours",
    level: "Advanced",
    lessonsCount: 32,
    description: "Advanced strategies for business leadership and organisational development",
    lastUpdated: "2024-02-28",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 4,
    title: "UI/UX Design Masterclass",
    instructor: "James Wilson",
    price: 349,
    originalPrice: 449,
    rating: 4.8,
    students: 1567,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "Design",
    duration: "11-20 hours",
    level: "Intermediate",
    lessonsCount: 38,
    description: "Master modern UI/UX design principles and create stunning user experiences",
    isBestseller: false,
    lastUpdated: "2024-02-15",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 5,
    title: "Data Science with Python",
    instructor: "Dr. Fatima Al-Rashid",
    price: 449,
    originalPrice: 599,
    rating: 4.9,
    students: 2034,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Technology",
    duration: "20+ hours",
    level: "Advanced",
    lessonsCount: 52,
    description: "Comprehensive data science course covering Python, machine learning, and analytics",
    isBestseller: true,
    lastUpdated: "2024-03-10",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 6,
    title: "Public Health Management",
    instructor: "Dr. Kwame Asante",
    price: 279,
    rating: 4.6,
    students: 756,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Health",
    duration: "3-10 hours",
    level: "Beginner",
    lessonsCount: 22,
    description: "Essential principles of public health management and disease prevention",
    lastUpdated: "2024-01-25",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 7,
    title: "Introduction to AI",
    instructor: "Prof. Alice Kimani",
    price: 199,
    rating: 4.5,
    students: 543,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Technology",
    duration: "0-2 hours",
    level: "Beginner",
    lessonsCount: 8,
    description: "Get started with artificial intelligence concepts and applications",
    lastUpdated: "2024-02-05",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 8,
    title: "Advanced Photography",
    instructor: "John Smith",
    price: 159,
    rating: 4.7,
    students: 321,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "Design",
    duration: "3-10 hours",
    level: "Advanced",
    lessonsCount: 15,
    description: "Advanced photography techniques for professional results",
    lastUpdated: "2024-01-30",
    language: "English",
    hasSubtitles: true
  },
  {
    id: 9,
    title: "AI and Machine Learning Course",
    instructor: "Dr. Elena Rodriguez",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    students: 3421,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    category: "Technology",
    duration: "30+ hours",
    level: "Advanced",
    lessonsCount: 65,
    description: "Dive into the future with comprehensive AI and machine learning training. Learn neural networks, deep learning, and real-world applications.",
    isBestseller: true,
    lastUpdated: "2024-03-15",
    language: "English",
    hasSubtitles: true,
    slug: "ai-machine-learning"
  },
  {
    id: 10,
    title: "Film Production Masterclass",
    instructor: "Marcus Thompson",
    price: 449,
    originalPrice: 599,
    rating: 4.8,
    students: 2156,
    image: "https://images.unsplash.com/photo-1489599435384-2330488477d8",
    category: "Opontainment",
    duration: "25+ hours",
    level: "Intermediate",
    lessonsCount: 42,
    description: "Learn professional film-making techniques from script to screen. Master cinematography, editing, and storytelling.",
    isBestseller: true,
    lastUpdated: "2024-03-20",
    language: "English",
    hasSubtitles: true,
    slug: "film-production-masterclass"
  },
  {
    id: 11,
    title: "Music Production and Sound Design",
    instructor: "Sophie Williams",
    price: 399,
    originalPrice: 549,
    rating: 4.7,
    students: 1892,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    category: "Opontainment",
    duration: "20+ hours",
    level: "Intermediate",
    lessonsCount: 38,
    description: "Create professional music and sound effects. Learn digital audio workstations, mixing, and mastering techniques.",
    isBestseller: false,
    lastUpdated: "2024-03-18",
    language: "English",
    hasSubtitles: true,
    slug: "music-production-sound-design"
  },
  {
    id: 12,
    title: "Screenwriting for Film and Television",
    instructor: "David Mitchell",
    price: 349,
    originalPrice: 449,
    rating: 4.6,
    students: 1247,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    category: "Opontainment",
    duration: "15+ hours",
    level: "Beginner",
    lessonsCount: 28,
    description: "Master the art of screenwriting. Learn story structure, character development, and dialogue writing for film and TV.",
    isBestseller: false,
    lastUpdated: "2024-03-12",
    language: "English",
    hasSubtitles: true,
    slug: "screenwriting-film-television"
  }
];