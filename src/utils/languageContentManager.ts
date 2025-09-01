import { supportedLanguages, SupportedLanguage } from '../i18n/index';

interface LocalizedAsset {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  altText?: string;
  caption?: string;
  language: SupportedLanguage;
  region?: string;
  fallbackLanguage?: SupportedLanguage;
  metadata?: Record<string, any>;
}

interface LocalizedContent {
  id: string;
  type: 'hero' | 'course' | 'testimonial' | 'feature' | 'banner' | 'gallery';
  language: SupportedLanguage;
  region?: string;
  assets: LocalizedAsset[];
  text: Record<string, string>;
  metadata?: Record<string, any>;
}

class LanguageContentManager {
  private assets: Map<string, LocalizedAsset> = new Map();
  private content: Map<string, LocalizedContent> = new Map();
  private assetCache: Map<string, string> = new Map();

  constructor() {
    this.initializeDefaultAssets();
  }

  // Initialize default assets for all supported languages
  private initializeDefaultAssets(): void {
    const defaultAssets: LocalizedAsset[] = [
      // Hero section assets
      {
        id: 'hero-bg-en',
        type: 'image',
        url: '/assets/hero/hero-bg-en.jpg',
        altText: 'OPONM Learning Platform - English',
        language: 'en',
        fallbackLanguage: 'en'
      },
      {
        id: 'hero-bg-es',
        type: 'image',
        url: '/assets/hero/hero-bg-es.jpg',
        altText: 'Plataforma de Aprendizaje OPONM - Español',
        language: 'es',
        fallbackLanguage: 'en'
      },
      {
        id: 'hero-bg-fr',
        type: 'image',
        url: '/assets/hero/hero-bg-fr.jpg',
        altText: 'Plateforme d\'Apprentissage OPONM - Français',
        language: 'fr',
        fallbackLanguage: 'en'
      },
      {
        id: 'hero-bg-de',
        type: 'image',
        url: '/assets/hero/hero-bg-de.jpg',
        altText: 'OPONM Lernplattform - Deutsch',
        language: 'de',
        fallbackLanguage: 'en'
      },
      {
        id: 'hero-bg-zh',
        type: 'image',
        url: '/assets/hero/hero-bg-zh.jpg',
        altText: 'OPONM 学习平台 - 中文',
        language: 'zh',
        fallbackLanguage: 'en'
      },
      {
        id: 'hero-bg-ar',
        type: 'image',
        url: '/assets/hero/hero-bg-ar.jpg',
        altText: 'منصة التعلم OPONM - العربية',
        language: 'ar',
        fallbackLanguage: 'en'
      },

      // Course thumbnails
      {
        id: 'course-react-en',
        type: 'image',
        url: '/assets/courses/react-course-en.jpg',
        altText: 'React Development Course - English',
        language: 'en',
        fallbackLanguage: 'en'
      },
      {
        id: 'course-react-es',
        type: 'image',
        url: '/assets/courses/react-course-es.jpg',
        altText: 'Curso de Desarrollo React - Español',
        language: 'es',
        fallbackLanguage: 'en'
      },

      // Testimonial images
      {
        id: 'testimonial-1-en',
        type: 'image',
        url: '/assets/testimonials/testimonial-1-en.jpg',
        altText: 'Student testimonial - English',
        language: 'en',
        fallbackLanguage: 'en'
      },
      {
        id: 'testimonial-1-es',
        type: 'image',
        url: '/assets/testimonials/testimonial-1-es.jpg',
        altText: 'Testimonio de estudiante - Español',
        language: 'es',
        fallbackLanguage: 'en'
      },

      // Feature icons
      {
        id: 'feature-ai-en',
        type: 'image',
        url: '/assets/features/ai-feature-en.svg',
        altText: 'AI-Powered Learning - English',
        language: 'en',
        fallbackLanguage: 'en'
      },
      {
        id: 'feature-ai-es',
        type: 'image',
        url: '/assets/features/ai-feature-es.svg',
        altText: 'Aprendizaje con IA - Español',
        language: 'es',
        fallbackLanguage: 'en'
      }
    ];

    defaultAssets.forEach(asset => {
      this.assets.set(asset.id, asset);
    });
  }

  // Get asset for specific language with fallback
  getAsset(assetId: string, language: SupportedLanguage, region?: string): LocalizedAsset | null {
    // Try exact match first
    const exactMatch = this.assets.get(`${assetId}-${language}${region ? `-${region}` : ''}`);
    if (exactMatch) return exactMatch;

    // Try language match without region
    const languageMatch = this.assets.get(`${assetId}-${language}`);
    if (languageMatch) return languageMatch;

    // Try fallback language
    const asset = this.assets.get(`${assetId}-${language}`);
    if (asset?.fallbackLanguage) {
      const fallbackAsset = this.assets.get(`${assetId}-${asset.fallbackLanguage}`);
      if (fallbackAsset) return fallbackAsset;
    }

    // Try English as final fallback
    const englishAsset = this.assets.get(`${assetId}-en`);
    if (englishAsset) return englishAsset;

    return null;
  }

  // Get asset URL with caching
  async getAssetUrl(assetId: string, language: SupportedLanguage, region?: string): Promise<string> {
    const cacheKey = `${assetId}-${language}-${region || 'default'}`;
    
    if (this.assetCache.has(cacheKey)) {
      return this.assetCache.get(cacheKey)!;
    }

    const asset = this.getAsset(assetId, language, region);
    if (!asset) {
      throw new Error(`Asset not found: ${assetId} for language: ${language}`);
    }

    // In a real implementation, you might want to validate the URL exists
    const url = await this.validateAssetUrl(asset.url);
    this.assetCache.set(cacheKey, url);
    
    return url;
  }

  // Validate asset URL exists
  private async validateAssetUrl(url: string): Promise<string> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      console.warn(`Asset URL validation failed for ${url}:`, error);
    }
    
    // Return original URL even if validation fails
    return url;
  }

  // Add new asset
  addAsset(asset: LocalizedAsset): void {
    this.assets.set(asset.id, asset);
    // Clear cache for this asset
    this.clearAssetCache(asset.id);
  }

  // Update existing asset
  updateAsset(assetId: string, updates: Partial<LocalizedAsset>): void {
    const asset = this.assets.get(assetId);
    if (asset) {
      const updatedAsset = { ...asset, ...updates };
      this.assets.set(assetId, updatedAsset);
      this.clearAssetCache(assetId);
    }
  }

  // Remove asset
  removeAsset(assetId: string): void {
    this.assets.delete(assetId);
    this.clearAssetCache(assetId);
  }

  // Clear asset cache
  private clearAssetCache(assetId: string): void {
    for (const key of this.assetCache.keys()) {
      if (key.startsWith(assetId)) {
        this.assetCache.delete(key);
      }
    }
  }

  // Get content for specific language
  getContent(contentId: string, language: SupportedLanguage, region?: string): LocalizedContent | null {
    const exactMatch = this.content.get(`${contentId}-${language}${region ? `-${region}` : ''}`);
    if (exactMatch) return exactMatch;

    const languageMatch = this.content.get(`${contentId}-${language}`);
    if (languageMatch) return languageMatch;

    // Try English fallback
    const englishContent = this.content.get(`${contentId}-en`);
    if (englishContent) return englishContent;

    return null;
  }

  // Add new content
  addContent(content: LocalizedContent): void {
    this.content.set(content.id, content);
  }

  // Update existing content
  updateContent(contentId: string, updates: Partial<LocalizedContent>): void {
    const content = this.content.get(contentId);
    if (content) {
      const updatedContent = { ...content, ...updates };
      this.content.set(contentId, updatedContent);
    }
  }

  // Remove content
  removeContent(contentId: string): void {
    this.content.delete(contentId);
  }

  // Get all assets for a language
  getAssetsByLanguage(language: SupportedLanguage): LocalizedAsset[] {
    return Array.from(this.assets.values()).filter(asset => asset.language === language);
  }

  // Get all content for a language
  getContentByLanguage(language: SupportedLanguage): LocalizedContent[] {
    return Array.from(this.content.values()).filter(content => content.language === language);
  }

  // Get assets by type
  getAssetsByType(type: LocalizedAsset['type']): LocalizedAsset[] {
    return Array.from(this.assets.values()).filter(asset => asset.type === type);
  }

  // Get content by type
  getContentByType(type: LocalizedContent['type']): LocalizedContent[] {
    return Array.from(this.content.values()).filter(content => content.type === type);
  }

  // Export assets for a language
  exportAssets(language: SupportedLanguage): LocalizedAsset[] {
    return this.getAssetsByLanguage(language);
  }

  // Import assets
  importAssets(assets: LocalizedAsset[]): void {
    assets.forEach(asset => {
      this.addAsset(asset);
    });
  }

  // Get asset statistics
  getAssetStatistics() {
    const totalAssets = this.assets.size;
    const assetsByLanguage = new Map<SupportedLanguage, number>();
    const assetsByType = new Map<LocalizedAsset['type'], number>();

    this.assets.forEach(asset => {
      assetsByLanguage.set(asset.language, (assetsByLanguage.get(asset.language) || 0) + 1);
      assetsByType.set(asset.type, (assetsByType.get(asset.type) || 0) + 1);
    });

    return {
      totalAssets,
      assetsByLanguage: Object.fromEntries(assetsByLanguage),
      assetsByType: Object.fromEntries(assetsByType)
    };
  }

  // Preload assets for a language
  async preloadAssets(language: SupportedLanguage): Promise<void> {
    const assets = this.getAssetsByLanguage(language);
    const preloadPromises = assets.map(async asset => {
      try {
        await this.getAssetUrl(asset.id, asset.language, asset.region);
      } catch (error) {
        console.warn(`Failed to preload asset ${asset.id}:`, error);
      }
    });

    await Promise.allSettled(preloadPromises);
  }

  // Clear all caches
  clearAllCaches(): void {
    this.assetCache.clear();
  }

  // Get missing assets for a language
  getMissingAssets(language: SupportedLanguage): string[] {
    const allAssetIds = new Set<string>();
    const languageAssetIds = new Set<string>();

    this.assets.forEach(asset => {
      const baseId = asset.id.split('-')[0];
      allAssetIds.add(baseId);
      
      if (asset.language === language) {
        languageAssetIds.add(baseId);
      }
    });

    return Array.from(allAssetIds).filter(id => !languageAssetIds.has(id));
  }
}

// Create singleton instance
export const languageContentManager = new LanguageContentManager();

// Export types for external use
export type { LocalizedAsset, LocalizedContent };
