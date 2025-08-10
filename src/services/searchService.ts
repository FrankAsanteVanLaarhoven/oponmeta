import { multilingualContentService, ExtractedContent } from '../utils/multilingualContent';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  content: string;
  language: string;
  type: 'page' | 'blog' | 'rto-qualification' | 'course' | 'career';
  slug: string;
  url: string;
  relevance: number;
  excerpt: string;
  metadata?: {
    readingTime?: string;
    category?: string;
    tags?: string[];
  };
}

export interface SearchOptions {
  query: string;
  language?: string;
  type?: 'page' | 'blog' | 'rto-qualification' | 'course' | 'career';
  limit?: number;
  includeContent?: boolean;
}

class SearchService {
  private multilingualContent: ExtractedContent[] | null = null;

  constructor() {
    // Lazy initialization - don't load content until needed
  }

  /**
   * Get multilingual content with lazy loading
   */
  private getMultilingualContent(): ExtractedContent[] {
    if (this.multilingualContent === null) {
      try {
        console.log('Loading multilingual content...');
        
        // Check if the service exists
        if (!multilingualContentService) {
          console.error('multilingualContentService is not available');
          this.multilingualContent = [];
          return this.multilingualContent;
        }
        
        console.log('multilingualContentService:', multilingualContentService);
        console.log('getAllContent method:', typeof multilingualContentService.getAllContent);
        
        // Check if the method exists
        if (typeof multilingualContentService.getAllContent !== 'function') {
          console.error('getAllContent is not a function on multilingualContentService');
          this.multilingualContent = [];
          return this.multilingualContent;
        }
        
        // Try to call the method
        this.multilingualContent = multilingualContentService.getAllContent();
        console.log('Loaded content:', this.multilingualContent.length, 'items');
      } catch (error) {
        console.error('Failed to load multilingual content in search service:', error);
        this.multilingualContent = [];
      }
    }
    return this.multilingualContent;
  }

  /**
   * Simple search method for backward compatibility
   */
  async searchContent(query: string, limit: number = 10): Promise<SearchResult[]> {
    return this.search({ query, limit });
  }

  /**
   * Search across all content types
   */
  async search(options: SearchOptions): Promise<SearchResult[]> {
    const { query, language, type, limit = 20, includeContent = false } = options;
    
    if (!query.trim()) {
      return [];
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    const results: SearchResult[] = [];

    // Search multilingual content
    const multilingualResults = this.searchMultilingualContent(searchTerms, language, type);
    results.push(...multilingualResults);

    // TODO: Add search for courses, careers, and other content types
    // const courseResults = await this.searchCourses(searchTerms, language, type);
    // const careerResults = await this.searchCareers(searchTerms, language, type);
    // results.push(...courseResults, ...careerResults);

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  /**
   * Search multilingual content
   */
  private searchMultilingualContent(
    searchTerms: string[], 
    language?: string, 
    type?: string
  ): SearchResult[] {
    const results: SearchResult[] = [];
    
    let content = this.getMultilingualContent();
    
    // Filter by language if specified
    if (language) {
      content = content.filter(item => item.language === language);
    }
    
    // Filter by type if specified
    if (type) {
      content = content.filter(item => item.type === type);
    }

    for (const item of content) {
      let relevance = 0;
      const titleLower = item.title.toLowerCase();
      const descriptionLower = (item.description || '').toLowerCase();
      const contentLower = item.content.toLowerCase();

      // Calculate relevance score
      for (const term of searchTerms) {
        // Title matches get highest weight
        if (titleLower.includes(term)) {
          relevance += 10;
        }
        
        // Description matches get medium weight
        if (descriptionLower.includes(term)) {
          relevance += 5;
        }
        
        // Content matches get lower weight
        if (contentLower.includes(term)) {
          relevance += 1;
        }
      }

      if (relevance > 0) {
        // Generate excerpt
        const excerpt = this.generateExcerpt(item.content, searchTerms);
        
        results.push({
          id: item.id,
          title: item.title,
          description: item.description || '',
          content: item.content,
          language: item.language,
          type: item.type,
          slug: item.slug,
          url: `/content/${item.language}/${item.type}/${item.slug}`,
          relevance,
          excerpt,
          metadata: {
            readingTime: this.calculateReadingTime(item.content),
            category: item.type.replace('-', ' '),
            tags: this.extractTags(item.content)
          }
        });
      }
    }

    return results;
  }

  /**
   * Generate a relevant excerpt from content
   */
  private generateExcerpt(content: string, searchTerms: string[]): string {
    const maxLength = 200;
    let excerpt = content.replace(/\s+/g, ' ').trim();
    
    // Try to find a sentence containing search terms
    const sentences = excerpt.split(/[.!?]+/);
    for (const sentence of sentences) {
      const sentenceLower = sentence.toLowerCase();
      if (searchTerms.some(term => sentenceLower.includes(term))) {
        excerpt = sentence.trim();
        break;
      }
    }
    
    // Truncate if too long
    if (excerpt.length > maxLength) {
      excerpt = excerpt.substring(0, maxLength) + '...';
    }
    
    return excerpt;
  }

  /**
   * Calculate reading time
   */
  private calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }

  /**
   * Extract tags from content
   */
  private extractTags(content: string): string[] {
    // Simple tag extraction - look for capitalized words and common terms
    const words = content.split(/\s+/);
    const tags = new Set<string>();
    
    for (const word of words) {
      const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
      if (cleanWord.length > 3 && /^[A-Z]/.test(word)) {
        tags.add(cleanWord);
      }
    }
    
    return Array.from(tags).slice(0, 5); // Limit to 5 tags
  }

  /**
   * Get search suggestions based on query
   */
  async getSuggestions(query: string, limit: number = 5): Promise<string[]> {
    if (!query.trim()) return [];
    
    const suggestions = new Set<string>();
    const queryLower = query.toLowerCase();
    
    // Get suggestions from titles
    for (const item of this.getMultilingualContent()) {
      const titleWords = item.title.toLowerCase().split(/\s+/);
      for (const word of titleWords) {
        if (word.startsWith(queryLower) && word.length > query.length) {
          suggestions.add(word);
        }
      }
    }
    
    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * Get search suggestions (alias for getSuggestions)
   */
  async getSearchSuggestions(query: string, limit: number = 5): Promise<string[]> {
    return this.getSuggestions(query, limit);
  }

  /**
   * Get recent searches from localStorage
   */
  async getRecentSearches(limit: number = 5): Promise<string[]> {
    try {
      const recent = localStorage.getItem('recentSearches');
      if (recent) {
        const searches = JSON.parse(recent);
        return searches.slice(0, limit);
      }
    } catch (error) {
      console.warn('Failed to load recent searches:', error);
    }
    return [];
  }

  /**
   * Save a search query to recent searches
   */
  async saveSearch(query: string): Promise<void> {
    try {
      const recent = await this.getRecentSearches(10);
      const updated = [query, ...recent.filter(q => q !== query)];
      localStorage.setItem('recentSearches', JSON.stringify(updated.slice(0, 10)));
    } catch (error) {
      console.warn('Failed to save search:', error);
    }
  }

  /**
   * Get popular search terms
   */
  async getPopularSearches(limit: number = 10): Promise<string[]> {
    // This could be enhanced with analytics data
    return [
      'AI course creator',
      'LMS platform',
      'online learning',
      'certificate programs',
      'training resources',
      'educational technology',
      'virtual classroom',
      'course management',
      'student portal',
      'instructor tools'
    ].slice(0, limit);
  }

  /**
   * Get search statistics
   */
  async getSearchStats(): Promise<{
    totalContent: number;
    languages: string[];
    types: string[];
    totalWords: number;
  }> {
    const languages = [...new Set(this.getMultilingualContent().map(item => item.language))];
    const types = [...new Set(this.getMultilingualContent().map(item => item.type))];
    const totalWords = this.getMultilingualContent().reduce((sum, item) => 
      sum + item.content.split(/\s+/).length, 0
    );

    return {
      totalContent: this.getMultilingualContent().length,
      languages,
      types,
      totalWords
    };
  }
}

export const searchService = new SearchService(); 