import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: any;
  canonicalUrl?: string;
  alternateLanguages?: Record<string, string>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData,
  canonicalUrl,
  alternateLanguages
}) => {
  const { currentLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  // Default values
  const defaultTitle = t('common.navigation.home');
  const defaultDescription = t('common.meta.description', { defaultValue: 'OPONM - World-Class Learning Platform' });
  const defaultKeywords = t('common.meta.keywords', { defaultValue: 'learning, education, courses, online learning, skills development' });
  const defaultImage = '/oponm-social-share.jpg';
  const defaultUrl = window.location.href;

  // Use provided values or fallback to defaults
  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || defaultImage;
  const seoUrl = url || defaultUrl;

  // Language-specific meta tags
  const languageMeta = {
    'lang': currentLanguage,
    'dir': isRTL ? 'rtl' : 'ltr',
    'hreflang': currentLanguage,
    'content-language': currentLanguage
  };

  // Generate alternate language links
  const generateAlternateLanguages = () => {
    const alternates = alternateLanguages || {};
    const currentPath = window.location.pathname;
    
    return Object.entries(alternates).map(([lang, url]) => ({
      rel: 'alternate',
      hreflang: lang,
      href: url
    }));
  };

  // Generate structured data
  const generateStructuredData = () => {
    const baseStructuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'course' ? 'Course' : 'WebPage',
      name: seoTitle,
      description: seoDescription,
      url: seoUrl,
      inLanguage: currentLanguage,
      isAccessibleForFree: true,
      publisher: {
        '@type': 'Organization',
        name: 'OPONM',
        url: 'https://oponm.com',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png'
        }
      }
    };

    if (type === 'course') {
      return {
        ...baseStructuredData,
        '@type': 'Course',
        courseMode: 'online',
        educationalLevel: 'beginner',
        provider: {
          '@type': 'Organization',
          name: 'OPONM',
          sameAs: 'https://oponm.com'
        }
      };
    }

    if (type === 'article') {
      return {
        ...baseStructuredData,
        '@type': 'Article',
        author: author ? { '@type': 'Person', name: author } : undefined,
        datePublished: publishedTime,
        dateModified: modifiedTime,
        articleSection: section,
        keywords: tags.join(', ')
      };
    }

    return baseStructuredData;
  };

  const finalStructuredData = structuredData || generateStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content={author || 'OPONM'} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Language Meta Tags */}
      <html lang={languageMeta.lang} dir={languageMeta.dir} />
      <meta httpEquiv="content-language" content={languageMeta['content-language']} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Alternate Language Links */}
      {generateAlternateLanguages().map((alternate, index) => (
        <link key={index} {...alternate} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="OPONM" />
      <meta property="og:locale" content={currentLanguage} />
      <meta property="og:locale:alternate" content={Object.keys(alternateLanguages || {}).join(',')} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:site" content="@oponm" />
      <meta name="twitter:creator" content="@oponm" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0a174e" />
      <meta name="msapplication-TileColor" content="#0a174e" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="OPONM" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Language-specific additional meta tags */}
      {currentLanguage === 'ar' && (
        <>
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
        </>
      )}
      
      {/* RTL-specific meta tags */}
      {isRTL && (
        <meta name="text-direction" content="rtl" />
      )}
    </Helmet>
  );
};

// Specialized SEO components for different content types
export const CourseSEO: React.FC<Omit<SEOHeadProps, 'type'> & {
  courseTitle: string;
  instructor: string;
  duration: string;
  level: string;
  category: string;
  rating?: number;
  enrollmentCount?: number;
}> = ({ courseTitle, instructor, duration, level, category, rating, enrollmentCount, ...props }) => {
  const { t } = useTranslation();
  
  const courseDescription = t('courses.meta.description', {
    defaultValue: `Learn ${courseTitle} with expert instructor ${instructor}. ${duration} course for ${level} level.`
  });

  const courseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: courseTitle,
    description: courseDescription,
    provider: {
      '@type': 'Organization',
      name: 'OPONM',
      sameAs: 'https://oponm.com'
    },
    instructor: {
      '@type': 'Person',
      name: instructor
    },
    courseMode: 'online',
    educationalLevel: level,
    timeRequired: duration,
    about: category,
    ...(rating && { aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      ratingCount: enrollmentCount || 0
    }})
  };

  return (
    <SEOHead
      {...props}
      type="course"
      title={courseTitle}
      description={courseDescription}
      structuredData={courseStructuredData}
    />
  );
};

export const ArticleSEO: React.FC<Omit<SEOHeadProps, 'type'> & {
  articleTitle: string;
  excerpt: string;
  author: string;
  publishDate: string;
  updateDate?: string;
  category: string;
  tags: string[];
}> = ({ articleTitle, excerpt, author, publishDate, updateDate, category, tags, ...props }) => {
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleTitle,
    description: excerpt,
    author: {
      '@type': 'Person',
      name: author
    },
    datePublished: publishDate,
    dateModified: updateDate || publishDate,
    articleSection: category,
    keywords: tags.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'OPONM',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    }
  };

  return (
    <SEOHead
      {...props}
      type="article"
      title={articleTitle}
      description={excerpt}
      author={author}
      publishedTime={publishDate}
      modifiedTime={updateDate}
      section={category}
      tags={tags}
      structuredData={articleStructuredData}
    />
  );
};

export const ProfileSEO: React.FC<Omit<SEOHeadProps, 'type'> & {
  profileName: string;
  bio: string;
  expertise: string[];
  location?: string;
  website?: string;
}> = ({ profileName, bio, expertise, location, website, ...props }) => {
  const profileStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileName,
    description: bio,
    knowsAbout: expertise,
    ...(location && { address: { '@type': 'PostalAddress', addressLocality: location } }),
    ...(website && { url: website })
  };

  return (
    <SEOHead
      {...props}
      type="profile"
      title={`${profileName} - OPONM`}
      description={bio}
      structuredData={profileStructuredData}
    />
  );
};
