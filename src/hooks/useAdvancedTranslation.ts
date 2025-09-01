import { useTranslation, TFunction } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

interface TranslationOptions {
  count?: number;
  context?: string;
  defaultValue?: string;
  returnObjects?: boolean;
  interpolation?: Record<string, any>;
}

interface AdvancedTranslationOptions extends TranslationOptions {
  fallback?: string;
  html?: boolean;
  escapeValue?: boolean;
  postProcess?: string | string[];
  skipInterpolation?: boolean;
}

export const useAdvancedTranslation = (ns?: string | string[]) => {
  const { t, i18n } = useTranslation(ns);
  const { currentLanguage, isRTL } = useLanguage();

  const advancedT = (
    key: string,
    options?: AdvancedTranslationOptions
  ): string => {
    const {
      fallback,
      html = false,
      escapeValue = false,
      postProcess,
      skipInterpolation = false,
      ...translationOptions
    } = options || {};

    let result = t(key, {
      ...translationOptions,
      returnObjects: false,
      defaultValue: fallback || key,
    });

    // Handle HTML content
    if (html && typeof result === 'string') {
      // Sanitize HTML content (basic implementation)
      result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }

    // Handle interpolation
    if (!skipInterpolation && translationOptions.interpolation) {
      Object.entries(translationOptions.interpolation).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        result = result.replace(regex, String(value));
      });
    }

    return result;
  };

  const tWithContext = (
    key: string,
    context: string,
    options?: TranslationOptions
  ): string => {
    return advancedT(`${key}_${context}`, {
      ...options,
      fallback: advancedT(key, options),
    });
  };

  const tWithCount = (
    key: string,
    count: number,
    options?: TranslationOptions
  ): string => {
    return advancedT(key, {
      ...options,
      count,
    });
  };

  const tWithInterpolation = (
    key: string,
    interpolation: Record<string, any>,
    options?: TranslationOptions
  ): string => {
    return advancedT(key, {
      ...options,
      interpolation,
    });
  };

  const tArray = (key: string, options?: TranslationOptions): string[] => {
    const result = t(key, {
      ...options,
      returnObjects: true,
    });

    if (Array.isArray(result)) {
      return result;
    }

    // Fallback: split by newlines if it's a string
    if (typeof result === 'string') {
      return result.split('\n').filter(Boolean);
    }

    return [];
  };

  const tObject = (key: string, options?: TranslationOptions): Record<string, any> => {
    const result = t(key, {
      ...options,
      returnObjects: true,
    });

    if (typeof result === 'object' && result !== null && !Array.isArray(result)) {
      return result;
    }

    return {};
  };

  const hasTranslation = (key: string, ns?: string): boolean => {
    return i18n.exists(key, { ns });
  };

  const getTranslationKeys = (prefix?: string): string[] => {
    const resources = i18n.store.data[currentLanguage] || {};
    const keys: string[] = [];

    const extractKeys = (obj: any, currentPrefix = '') => {
      Object.entries(obj).forEach(([key, value]) => {
        const fullKey = currentPrefix ? `${currentPrefix}.${key}` : key;
        
        if (typeof value === 'object' && value !== null) {
          extractKeys(value, fullKey);
        } else {
          if (!prefix || fullKey.startsWith(prefix)) {
            keys.push(fullKey);
          }
        }
      });
    };

    Object.values(resources).forEach(extractKeys);
    return keys;
  };

  return {
    t: advancedT,
    tWithContext,
    tWithCount,
    tWithInterpolation,
    tArray,
    tObject,
    hasTranslation,
    getTranslationKeys,
    currentLanguage,
    isRTL,
    i18n,
  };
};

export const useDynamicTranslation = (namespace: string) => {
  const { t, i18n } = useTranslation(namespace);
  const { currentLanguage } = useLanguage();

  const loadNamespace = async (ns: string): Promise<void> => {
    if (!i18n.hasResourceBundle(currentLanguage, ns)) {
      try {
        await i18n.loadNamespaces(ns);
      } catch (error) {
        console.warn(`Failed to load namespace: ${ns}`, error);
      }
    }
  };

  const tDynamic = async (
    key: string,
    ns: string,
    options?: TranslationOptions
  ): Promise<string> => {
    await loadNamespace(ns);
    return t(key, { ns, ...options });
  };

  const preloadNamespaces = async (namespaces: string[]): Promise<void> => {
    await Promise.all(namespaces.map(loadNamespace));
  };

  return {
    tDynamic,
    preloadNamespaces,
    loadNamespace,
  };
};

export const useTranslationUtils = () => {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguage();

  const formatNumber = (
    value: number,
    options?: Intl.NumberFormatOptions
  ): string => {
    return new Intl.NumberFormat(currentLanguage, options).format(value);
  };

  const formatCurrency = (
    value: number,
    currency: string = 'USD',
    options?: Intl.NumberFormatOptions
  ): string => {
    return new Intl.NumberFormat(currentLanguage, {
      style: 'currency',
      currency,
      ...options,
    }).format(value);
  };

  const formatDate = (
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
  ): string => {
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date;
    
    return new Intl.DateTimeFormat(currentLanguage, options).format(dateObj);
  };

  const formatRelativeTime = (
    value: number,
    unit: Intl.RelativeTimeFormatUnit,
    options?: Intl.RelativeTimeFormatOptions
  ): string => {
    const rtf = new Intl.RelativeTimeFormat(currentLanguage, options);
    return rtf.format(value, unit);
  };

  const formatList = (
    list: string[],
    options?: Intl.ListFormatOptions
  ): string => {
    const lf = new Intl.ListFormat(currentLanguage, options);
    return lf.format(list);
  };

  const formatPlural = (
    count: number,
    forms: Record<string, string>
  ): string => {
    const pluralRules = new Intl.PluralRules(currentLanguage);
    const rule = pluralRules.select(count);
    return forms[rule] || forms.other || '';
  };

  return {
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    formatList,
    formatPlural,
  };
};

// Hook for RTL-aware translations
export const useRTLTranslation = (ns?: string | string[]) => {
  const { t, i18n } = useTranslation(ns);
  const { isRTL, currentLanguage } = useLanguage();

  const tRTL = (
    key: string,
    options?: TranslationOptions & { rtlKey?: string }
  ): string => {
    const { rtlKey, ...translationOptions } = options || {};
    
    if (isRTL && rtlKey) {
      return t(rtlKey, translationOptions) || t(key, translationOptions);
    }
    
    return t(key, translationOptions);
  };

  const getDirectionalText = (
    ltrText: string,
    rtlText: string
  ): string => {
    return isRTL ? rtlText : ltrText;
  };

  const getDirectionalClass = (baseClass: string): string => {
    return isRTL ? `${baseClass}-rtl` : baseClass;
  };

  return {
    t: tRTL,
    getDirectionalText,
    getDirectionalClass,
    isRTL,
    currentLanguage,
  };
};

// Hook for context-aware translations
export const useContextualTranslation = (context: string, ns?: string | string[]) => {
  const { t } = useTranslation(ns);

  const tContext = (
    key: string,
    options?: TranslationOptions
  ): string => {
    const contextualKey = `${context}.${key}`;
    return t(contextualKey, {
      ...options,
      defaultValue: t(key, options),
    });
  };

  const tContextWithCount = (
    key: string,
    count: number,
    options?: TranslationOptions
  ): string => {
    return tContext(key, { ...options, count });
  };

  const tContextWithInterpolation = (
    key: string,
    interpolation: Record<string, any>,
    options?: TranslationOptions
  ): string => {
    return tContext(key, { ...options, interpolation });
  };

  return {
    t: tContext,
    tWithCount: tContextWithCount,
    tWithInterpolation: tContextWithInterpolation,
  };
};
