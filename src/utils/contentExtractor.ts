import { 
  MultilingualContent, 
  BlogPost, 
  RTOQualification, 
  Page, 
  Language, 
  ContentType,
  ContentStatus,
  RTOUnit,
  RTOCriteria,
  Resource,
  ContentMetadata,
  SEOData
} from '../types/content';

export class ContentExtractor {
  private static cleanHtml(html: string): string {
    return html
      .replace(/<script[^>]*>.*?<\/script>/gs, '')
      .replace(/<style[^>]*>.*?<\/style>/gs, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private static extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
    return titleMatch ? this.cleanHtml(titleMatch[1]) : '';
  }

  private static extractDescription(html: string): string {
    const descMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
    return descMatch ? descMatch[1] : '';
  }

  private static extractContent(html: string): string {
    // Extract main content from body
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is);
    if (!bodyMatch) return '';

    let content = bodyMatch[1];
    
    // Remove navigation, header, footer
    content = content.replace(/<nav[^>]*>.*?<\/nav>/gis, '');
    content = content.replace(/<header[^>]*>.*?<\/header>/gis, '');
    content = content.replace(/<footer[^>]*>.*?<\/footer>/gis, '');
    
    return this.cleanHtml(content);
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private static rebrandContent(content: string): string {
    return content
      .replace(/Coursebox/g, 'OponMeta')
      .replace(/coursebox/g, 'OponMeta')
      .replace(/COURSEBOX/g, 'OPONMETA');
  }

  public static extractBlogPost(html: string, language: Language, filePath: string): BlogPost {
    const title = this.extractTitle(html);
    const description = this.extractDescription(html);
    const content = this.extractContent(html);
    
    return {
      id: `blog-${language}-${Date.now()}`,
      type: 'blog',
      language,
      slug: this.generateSlug(title),
      title: this.rebrandContent(title),
      description: this.rebrandContent(description),
      content: this.rebrandContent(content),
      excerpt: this.rebrandContent(content.substring(0, 200)) + '...',
      readTime: Math.ceil(content.length / 200), // Rough estimate
      featured: false,
      metadata: {
        keywords: ['OponMeta', 'AI', 'education', 'learning'],
        author: 'OponMeta Team',
        source: filePath,
        originalUrl: filePath
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      status: 'published',
      tags: ['AI', 'Education', 'Technology'],
      category: 'blog',
      author: 'OponMeta Team',
      featuredImage: '/images/blog-default.jpg',
      seo: {
        title: this.rebrandContent(title),
        description: this.rebrandContent(description),
        keywords: ['OponMeta', 'AI', 'education'],
        canonicalUrl: `/blog/${this.generateSlug(title)}`
      }
    };
  }

  public static extractRTOQualification(html: string, language: Language, filePath: string): RTOQualification {
    const title = this.extractTitle(html);
    const description = this.extractDescription(html);
    const content = this.extractContent(html);
    
    // Extract RTO code from filename or content
    const codeMatch = filePath.match(/([A-Z]{3}\d{5})/);
    const code = codeMatch ? codeMatch[1] : 'UNKNOWN';
    
    // Extract level from title
    const levelMatch = title.match(/(Certificate|Diploma|Advanced Diploma)/i);
    const level = levelMatch ? levelMatch[1] : 'Qualification';
    
    // Extract training package
    const packageMatch = title.match(/(UEG|UEE|UEP|UET)/);
    const trainingPackage = packageMatch ? `${packageMatch[1]} Industry` : 'General Industry';
    
    return {
      id: `rto-${language}-${code}`,
      type: 'rto-qualification',
      language,
      slug: this.generateSlug(title),
      title: this.rebrandContent(title),
      description: this.rebrandContent(description),
      content: this.rebrandContent(content),
      code,
      level,
      trainingPackage,
      units: this.extractRTOUnits(content),
      duration: 120, // Default 120 hours
      prerequisites: [],
      careerOutcomes: [
        'Industry professional',
        'Technical specialist',
        'Operations manager'
      ],
      industryStandards: [
        'National Training Framework',
        'Industry best practices',
        'Safety standards'
      ],
      assessmentMethods: [
        'Written assessments',
        'Practical demonstrations',
        'Portfolio of evidence'
      ],
      deliveryMode: [
        'Online learning',
        'Blended delivery',
        'Face-to-face training'
      ],
      price: 999,
      demoUrl: 'https://example.com',
      metadata: {
        keywords: ['RTO', 'qualification', 'training', 'OponMeta'],
        author: 'OponMeta Team',
        source: filePath,
        originalUrl: filePath
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      status: 'published',
      tags: ['RTO', 'Qualification', 'Training'],
      category: 'rto-qualifications',
      author: 'OponMeta Team',
      featuredImage: '/images/rto-default.jpg',
      seo: {
        title: this.rebrandContent(title),
        description: this.rebrandContent(description),
        keywords: ['RTO', 'qualification', 'OponMeta'],
        canonicalUrl: `/rto/${this.generateSlug(title)}`
      }
    };
  }

  private static extractRTOUnits(content: string): RTOUnit[] {
    // This is a simplified extraction - in practice, you'd parse the actual unit structure
    return [
      {
        id: 'unit-1',
        code: 'UNIT001',
        title: 'Core Unit 1',
        description: 'Fundamental industry knowledge and skills',
        elements: [
          {
            id: 'element-1',
            code: 'E1',
            description: 'Element 1 description',
            evidence: ['Written assessment', 'Practical demonstration']
          }
        ],
        performanceCriteria: [
          {
            id: 'pc-1',
            code: 'PC1',
            description: 'Performance criteria 1',
            evidence: ['Assessment task', 'Observation']
          }
        ],
        assessmentRequirements: [
          'Complete all assessment tasks',
          'Demonstrate practical skills',
          'Submit portfolio of evidence'
        ],
        resources: [
          {
            id: 'resource-1',
            name: 'Unit Guide',
            type: 'document',
            url: '/resources/unit-guide.pdf',
            description: 'Comprehensive unit guide'
          }
        ]
      }
    ];
  }

  public static extractPage(html: string, language: Language, filePath: string): Page {
    const title = this.extractTitle(html);
    const description = this.extractDescription(html);
    const content = this.extractContent(html);
    
    // Determine page template based on filename
    let template: 'default' | 'landing' | 'about' | 'contact' | 'pricing' | 'blog' | 'course' | 'rto' = 'default';
    if (filePath.includes('about') || filePath.includes('um')) template = 'about';
    else if (filePath.includes('contact') || filePath.includes('kontakt')) template = 'contact';
    else if (filePath.includes('pricing') || filePath.includes('preise')) template = 'pricing';
    else if (filePath.includes('blog')) template = 'blog';
    
    return {
      id: `page-${language}-${Date.now()}`,
      type: 'page',
      language,
      slug: this.generateSlug(title),
      title: this.rebrandContent(title),
      description: this.rebrandContent(description),
      content: this.rebrandContent(content),
      template,
      sections: [
        {
          id: 'section-1',
          type: 'content',
          title: this.rebrandContent(title),
          content: this.rebrandContent(content.substring(0, 500)),
          components: [],
          order: 1,
          visible: true
        }
      ],
      metadata: {
        keywords: ['OponMeta', 'page'],
        author: 'OponMeta Team',
        source: filePath,
        originalUrl: filePath
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      status: 'published',
      tags: ['page'],
      category: 'pages',
      author: 'OponMeta Team',
      seo: {
        title: this.rebrandContent(title),
        description: this.rebrandContent(description),
        keywords: ['OponMeta'],
        canonicalUrl: `/${this.generateSlug(title)}`
      }
    };
  }

  public static processFile(filePath: string, html: string): MultilingualContent {
    const language = this.detectLanguage(filePath);
    const contentType = this.detectContentType(filePath);
    
    switch (contentType) {
      case 'blog':
        return this.extractBlogPost(html, language, filePath);
      case 'rto-qualification':
        return this.extractRTOQualification(html, language, filePath);
      case 'page':
        return this.extractPage(html, language, filePath);
      default:
        return this.extractPage(html, language, filePath);
    }
  }

  private static detectLanguage(filePath: string): Language {
    const pathParts = filePath.split('/');
    const languageDir = pathParts.find(part => 
      ['de', 'fr', 'es', 'it', 'pt', 'zh', 'ja', 'ko', 'nl', 'ar'].includes(part)
    );
    
    if (languageDir && languageDir in ['de', 'fr', 'es', 'it', 'pt', 'zh', 'ja', 'ko', 'nl', 'ar']) {
      return languageDir as Language;
    }
    
    return 'en';
  }

  private static detectContentType(filePath: string): ContentType {
    if (filePath.includes('rto-materials')) return 'rto-qualification';
    if (filePath.includes('blog')) return 'blog';
    return 'page';
  }
} 