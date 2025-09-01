import { 
  MultilingualContent, 
  BlogPost, 
  RTOQualification, 
  Page, 
  Language, 
  ContentType,
  ContentFilter,
  ContentSort,
  ContentStats,
  LANGUAGES
} from '../types/content';
import { ContentExtractor } from '../utils/contentExtractor';

// In-memory storage for development (replace with database in production)
class ContentStore {
  private content: Map<string, MultilingualContent> = new Map();
  private translations: Map<string, Record<Language, string>> = new Map();

  add(content: MultilingualContent): void {
    this.content.set(content.id, content);
  }

  get(id: string): MultilingualContent | undefined {
    return this.content.get(id);
  }

  getAll(): MultilingualContent[] {
    return Array.from(this.content.values());
  }

  update(id: string, content: Partial<MultilingualContent>): void {
    const existing = this.content.get(id);
    if (existing) {
      this.content.set(id, { ...existing, ...content, updatedAt: new Date().toISOString() });
    }
  }

  delete(id: string): void {
    this.content.delete(id);
  }

  setTranslation(contentId: string, language: Language, translatedId: string): void {
    const translations = this.translations.get(contentId) || {};
    translations[language] = translatedId;
    this.translations.set(contentId, translations);
  }

  getTranslations(contentId: string): Record<Language, string> | undefined {
    return this.translations.get(contentId);
  }
}

class ContentService {
  private store = new ContentStore();

  // Initialize with extracted content
  async initialize(): Promise<void> {
    console.log('Initializing content service...');
    // This would load content from files/database
    // For now, we'll add some sample content
  }

  // Content CRUD operations
  async create(content: Omit<MultilingualContent, 'id' | 'createdAt' | 'updatedAt'>): Promise<MultilingualContent> {
    const newContent: MultilingualContent = {
      ...content,
      id: `${content.type}-${content.language}-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.store.add(newContent);
    return newContent;
  }

  async get(id: string): Promise<MultilingualContent | null> {
    return this.store.get(id) || null;
  }

  async update(id: string, updates: Partial<MultilingualContent>): Promise<MultilingualContent | null> {
    const existing = this.store.get(id);
    if (!existing) return null;

    this.store.update(id, updates);
    return this.store.get(id) || null;
  }

  async delete(id: string): Promise<boolean> {
    const existing = this.store.get(id);
    if (!existing) return false;

    this.store.delete(id);
    return true;
  }

  // Query operations
  async find(filter: ContentFilter = {}, sort: ContentSort = { field: 'createdAt', direction: 'desc' }): Promise<MultilingualContent[]> {
    let content = this.store.getAll();

    // Apply filters
    if (filter.type) {
      content = content.filter(item => item.type === filter.type);
    }

    if (filter.language) {
      content = content.filter(item => item.language === filter.language);
    }

    if (filter.status) {
      content = content.filter(item => item.status === filter.status);
    }

    if (filter.category) {
      content = content.filter(item => item.category === filter.category);
    }

    if (filter.tags && filter.tags.length > 0) {
      content = content.filter(item => 
        filter.tags!.some(tag => item.tags.includes(tag))
      );
    }

    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      content = content.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm)
      );
    }

    if (filter.author) {
      content = content.filter(item => item.author === filter.author);
    }

    if (filter.dateFrom) {
      content = content.filter(item => item.createdAt >= filter.dateFrom!);
    }

    if (filter.dateTo) {
      content = content.filter(item => item.createdAt <= filter.dateTo!);
    }

    // Apply sorting
    content.sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];
      
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return content;
  }

  // Type-specific queries
  async getBlogPosts(language?: Language): Promise<BlogPost[]> {
    const filter: ContentFilter = { type: 'blog' };
    if (language) filter.language = language;
    
    const posts = await this.find(filter);
    return posts as BlogPost[];
  }

  async getRTOQualifications(language?: Language): Promise<RTOQualification[]> {
    const filter: ContentFilter = { type: 'rto-qualification' };
    if (language) filter.language = language;
    
    const qualifications = await this.find(filter);
    return qualifications as RTOQualification[];
  }

  async getPages(language?: Language): Promise<Page[]> {
    const filter: ContentFilter = { type: 'page' };
    if (language) filter.language = language;
    
    const pages = await this.find(filter);
    return pages as Page[];
  }

  // Translation management
  async getTranslations(contentId: string): Promise<Record<Language, string> | null> {
    return this.store.getTranslations(contentId) || null;
  }

  async setTranslation(contentId: string, language: Language, translatedId: string): Promise<void> {
    this.store.setTranslation(contentId, language, translatedId);
  }

  async getTranslatedContent(contentId: string, language: Language): Promise<MultilingualContent | null> {
    const translations = this.store.getTranslations(contentId);
    if (!translations || !translations[language]) return null;

    return this.store.get(translations[language]) || null;
  }

  // Statistics
  async getStats(): Promise<ContentStats> {
    const allContent = this.store.getAll();
    
    const byType: Record<ContentType, number> = {
      'blog': 0,
      'course': 0,
      'mini-course': 0,
      'rto-qualification': 0,
      'page': 0,
      'lesson': 0,
      'quiz': 0,
      'resource': 0
    };

    const byLanguage: Record<Language, number> = Object.fromEntries(
      Object.keys(LANGUAGES).map(lang => [lang, 0])
    ) as Record<Language, number>;

    const byStatus: Record<string, number> = {};
    const byCategory: Record<string, number> = {};

    allContent.forEach(content => {
      byType[content.type]++;
      byLanguage[content.language]++;
      byStatus[content.status] = (byStatus[content.status] || 0) + 1;
      if (content.category) {
        byCategory[content.category] = (byCategory[content.category] || 0) + 1;
      }
    });

    const recent = allContent
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    const popular = allContent
      .filter(content => content.type === 'blog' || content.type === 'course')
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 10);

    return {
      total: allContent.length,
      byType,
      byLanguage,
      byStatus,
      byCategory,
      recent,
      popular
    };
  }

  // Content processing
  async processHtmlFile(filePath: string, html: string): Promise<MultilingualContent> {
    const content = ContentExtractor.processFile(filePath, html);
    this.store.add(content);
    return content;
  }

  async processMultipleFiles(files: Array<{ path: string; content: string }>): Promise<MultilingualContent[]> {
    const processed: MultilingualContent[] = [];
    
    for (const file of files) {
      try {
        const content = await this.processHtmlFile(file.path, file.content);
        processed.push(content);
      } catch (error) {
        console.error(`Error processing file ${file.path}:`, error);
      }
    }

    return processed;
  }

  // Search functionality
  async search(query: string, language?: Language): Promise<MultilingualContent[]> {
    const filter: ContentFilter = { search: query };
    if (language) filter.language = language;
    
    return this.find(filter);
  }

  // Featured content
  async getFeaturedContent(language?: Language): Promise<MultilingualContent[]> {
    const filter: ContentFilter = { status: 'published' };
    if (language) filter.language = language;
    
    const content = await this.find(filter);
    return content.filter(item => 
      item.featuredImage || 
      (item.type === 'blog' && (item as BlogPost).featured)
    );
  }

  // Related content
  async getRelatedContent(contentId: string, limit: number = 5): Promise<MultilingualContent[]> {
    const content = this.store.get(contentId);
    if (!content) return [];

    const filter: ContentFilter = { 
      type: content.type,
      language: content.language,
      status: 'published'
    };

    const related = await this.find(filter);
    return related
      .filter(item => item.id !== contentId)
      .slice(0, limit);
  }
}

// Export singleton instance
export const contentService = new ContentService(); 