import extractedContent from '../data/extracted-content.json';

export interface ExtractedContent {
  id: string;
  language: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  type: 'page' | 'blog' | 'rto-qualification';
  filePath: string;
  tags?: string[];
  topics?: string[];
}

export interface MultilingualContentData {
  metadata: {
    extractedAt: string;
    totalFiles: number;
    languages: string[];
    types: string[];
  };
  content: ExtractedContent[];
}

class MultilingualContentService {
  private data: MultilingualContentData = extractedContent as MultilingualContentData;

  constructor() {
    console.log('MultilingualContentService initialized');
    console.log('Data loaded:', this.data ? 'yes' : 'no');
    console.log('Content length:', this.data?.content?.length || 0);
  }

  // Get all content for a specific language
  getContentByLanguage(language: string): ExtractedContent[] {
    return this.data.content.filter(item => item.language === language);
  }

  // Get content by type and language
  getContentByTypeAndLanguage(type: string, language: string): ExtractedContent[] {
    return this.data.content.filter(item => 
      item.type === type && item.language === language
    );
  }

  // Get content by slug and language
  getContentBySlug(slug: string, language: string): ExtractedContent | undefined {
    return this.data.content.find(item => 
      item.slug === slug && item.language === language
    );
  }

  // Get all blog posts for a language
  getBlogPosts(language: string): ExtractedContent[] {
    return this.getContentByTypeAndLanguage('blog', language);
  }

  // Get all pages for a language
  getPages(language: string): ExtractedContent[] {
    return this.getContentByTypeAndLanguage('page', language);
  }

  // Get all RTO qualifications
  getRTOQualifications(): ExtractedContent[] {
    return this.data.content.filter(item => item.type === 'rto-qualification');
  }

  // Search content across all languages
  searchContent(query: string, language?: string): ExtractedContent[] {
    const searchTerm = query.toLowerCase();
    let content = this.data.content;

    if (language) {
      content = content.filter(item => item.language === language);
    }

    return content.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.content.toLowerCase().includes(searchTerm)
    );
  }

  // Get content statistics
  getStats() {
    const stats = {
      total: this.data.content.length,
      byLanguage: {} as Record<string, number>,
      byType: {} as Record<string, number>,
      languages: this.data.metadata.languages,
      types: this.data.metadata.types
    };

    // Count by language
    this.data.content.forEach(item => {
      stats.byLanguage[item.language] = (stats.byLanguage[item.language] || 0) + 1;
    });

    // Count by type
    this.data.content.forEach(item => {
      stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
    });

    return stats;
  }

  // Get available languages
  getAvailableLanguages(): string[] {
    return this.data.metadata.languages;
  }

  // Get content types
  getContentTypes(): string[] {
    return this.data.metadata.types;
  }

  // Get all content
  getAllContent(): ExtractedContent[] {
    return this.data.content;
  }

  // Get related content with enhanced algorithm using tags, topics, and similarity
  getRelatedContent(content: ExtractedContent, limit: number = 4): ExtractedContent[] {
    const allContent = this.data.content;
    const currentItem = content;
    
    // Score each potential related item
    const scoredItems = allContent
      .filter(item => item.id !== currentItem.id) // Exclude current item
      .map(item => {
        let score = 0;
        
        // Base score for same language and type
        if (item.language === currentItem.language) score += 2;
        if (item.type === currentItem.type) score += 3;
        
        // Score for shared tags (if available)
        if (currentItem.tags && item.tags) {
          const sharedTags = currentItem.tags.filter(tag => 
            item.tags!.includes(tag)
          );
          score += sharedTags.length * 2;
        }
        
        // Score for similar topics (if available)
        if (currentItem.topics && item.topics) {
          const sharedTopics = currentItem.topics.filter(topic => 
            item.topics!.includes(topic)
          );
          score += sharedTopics.length * 1.5;
        }
        
        // Score for similar title/keywords (basic text similarity)
        const currentTitle = currentItem.title.toLowerCase();
        const itemTitle = item.title.toLowerCase();
        const currentWords = currentTitle.split(/\s+/);
        const itemWords = itemTitle.split(/\s+/);
        const sharedWords = currentWords.filter(word => 
          itemWords.includes(word) && word.length > 3
        );
        score += sharedWords.length * 0.5;
        
        // Bonus for RTO qualifications (they're highly related)
        if (currentItem.type === 'rto-qualification' && item.type === 'rto-qualification') {
          score += 1;
        }
        
        return { item, score };
      })
      .filter(scored => scored.score > 0) // Only include items with some relevance
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .slice(0, limit)
      .map(scored => scored.item);
    
    return scoredItems;
  }
}

// Export singleton instance
export const multilingualContentService = new MultilingualContentService();

// Export types
export type { ExtractedContent, MultilingualContentData }; 