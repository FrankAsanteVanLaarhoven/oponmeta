import { useState, useMemo } from 'react';
import { multilingualContentService, ExtractedContent } from '../utils/multilingualContent';

export interface UseMultilingualContentOptions {
  language?: string;
  type?: 'page' | 'blog' | 'rto-qualification';
  search?: string;
  limit?: number;
}

export function useMultilingualContent(options: UseMultilingualContentOptions = {}) {
  const { language, type, search, limit } = options;

  // Get content based on options
  const content = useMemo(() => {
    let filteredContent: ExtractedContent[] = [];

    if (search) {
      filteredContent = multilingualContentService.searchContent(search, language);
    } else if (type && language) {
      filteredContent = multilingualContentService.getContentByTypeAndLanguage(type, language);
    } else if (language) {
      filteredContent = multilingualContentService.getContentByLanguage(language);
    } else if (type) {
      filteredContent = multilingualContentService.getContentByTypeAndLanguage(type, 'en');
    } else {
      // Get all content if no filters
      filteredContent = multilingualContentService.getContentByLanguage('en');
    }

    // Apply limit if specified
    if (limit) {
      filteredContent = filteredContent.slice(0, limit);
    }

    return filteredContent;
  }, [language, type, search, limit]);

  // Get content by slug
  const getContentBySlug = (slug: string, lang?: string) => {
    return multilingualContentService.getContentBySlug(slug, lang || language || 'en');
  };

  // Get blog posts
  const getBlogPosts = (lang?: string) => {
    return multilingualContentService.getBlogPosts(lang || language || 'en');
  };

  // Get pages
  const getPages = (lang?: string) => {
    return multilingualContentService.getPages(lang || language || 'en');
  };

  // Get RTO qualifications
  const getRTOQualifications = () => {
    return multilingualContentService.getRTOQualifications();
  };

  // Get statistics
  const getStats = () => {
    return multilingualContentService.getStats();
  };

  // Get available languages
  const getAvailableLanguages = () => {
    return multilingualContentService.getAvailableLanguages();
  };

  return {
    content,
    getContentBySlug,
    getBlogPosts,
    getPages,
    getRTOQualifications,
    getStats,
    getAvailableLanguages,
    totalCount: content.length
  };
}

// Hook for a specific piece of content
export function useContentBySlug(slug: string, language?: string) {
  const [content, setContent] = useState<ExtractedContent | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    setLoading(true);
    const foundContent = multilingualContentService.getContentBySlug(slug, language || 'en');
    setContent(foundContent);
    setLoading(false);
  }, [slug, language]);

  return { content, loading };
}

// Hook for content statistics
export function useContentStats() {
  const stats = useMemo(() => {
    return multilingualContentService.getStats();
  }, []);

  return stats;
} 