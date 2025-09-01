import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, SupportedLanguage, getLanguageDirection, isRTL } from '../i18n/index';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  supportedLanguages: typeof supportedLanguages;
  changeLanguage: (lng: SupportedLanguage) => Promise<void>;
  isRTL: boolean;
  isChanging: boolean;
  autoDetectedLanguage: string | null;
  browserLanguage: string;
  getLanguageDirection: (lng?: string) => 'ltr' | 'rtl';
  getNativeLanguageName: (lng: SupportedLanguage) => string;
  getLanguageFlag: (lng: SupportedLanguage) => string;
  getAvailableLanguages: () => SupportedLanguage[];
  getPopularLanguages: () => SupportedLanguage[];
  getRegionalLanguages: () => SupportedLanguage[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [isChanging, setIsChanging] = useState(false);
  const [autoDetectedLanguage, setAutoDetectedLanguage] = useState<string | null>(null);
  const [browserLanguage] = useState(() => {
    return navigator.language || navigator.languages?.[0] || 'en';
  });

  const currentLanguage = (i18n.resolvedLanguage || 'en') as SupportedLanguage;
  const isRTLMode = isRTL(currentLanguage);

  const getLanguageDirectionUtil = (lng?: string): 'ltr' | 'rtl' => {
    return getLanguageDirection(lng);
  };

  const getNativeLanguageName = (lng: SupportedLanguage): string => {
    return supportedLanguages[lng]?.nativeName || lng;
  };

  const getLanguageFlag = (lng: SupportedLanguage): string => {
    return supportedLanguages[lng]?.flag || '🌍';
  };

  const getAvailableLanguages = (): SupportedLanguage[] => {
    return Object.keys(supportedLanguages) as SupportedLanguage[];
  };

  const getPopularLanguages = (): SupportedLanguage[] => {
    // Most popular languages based on global usage
    return ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ar', 'hi', 'pt', 'ru', 'it'] as SupportedLanguage[];
  };

  const getRegionalLanguages = (): SupportedLanguage[] => {
    // Regional languages for specific markets
    return ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'] as SupportedLanguage[];
  };

  const changeLanguage = async (lng: SupportedLanguage): Promise<void> => {
    if (lng === currentLanguage) return;
    
    setIsChanging(true);
    try {
      await i18n.changeLanguage(lng);
      
      // Update document direction and lang attribute
      const direction = getLanguageDirectionUtil(lng);
      document.documentElement.dir = direction;
      document.documentElement.lang = lng;
      
      // Update body class for RTL styling
      document.body.classList.toggle('rtl', direction === 'rtl');
      document.body.classList.toggle('ltr', direction === 'ltr');
      
      // Store preference
      localStorage.setItem('preferredLanguage', lng);
      sessionStorage.setItem('i18nextLng', lng);
      
      // Dispatch custom event for other components
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { 
          language: lng, 
          direction,
          isRTL: direction === 'rtl'
        } 
      }));
      
      // Update meta tags
      const langMeta = document.querySelector('meta[name="language"]');
      if (langMeta) {
        langMeta.setAttribute('content', lng);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'language';
        meta.content = lng;
        document.head.appendChild(meta);
      }
      
    } catch (error) {
      console.error('Language change failed:', error);
    } finally {
      setIsChanging(false);
    }
  };

  // Listen to orientation and online status changes
  useEffect(() => {
    // Track initial auto-detected language
    setAutoDetectedLanguage(i18n.language);
    
    // Set initial document attributes
    const direction = getLanguageDirectionUtil();
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
    
    // Set initial body classes
    document.body.classList.toggle('rtl', direction === 'rtl');
    document.body.classList.toggle('ltr', direction === 'ltr');
    
    // Listen for i18n language changes
    const handleLanguageChange = (lng: string) => {
      const direction = getLanguageDirectionUtil(lng);
      document.documentElement.dir = direction;
      document.documentElement.lang = lng;
      document.body.classList.toggle('rtl', direction === 'rtl');
      document.body.classList.toggle('ltr', direction === 'ltr');
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    // Listen for storage changes (other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferredLanguage' && e.newValue) {
        const newLang = e.newValue as SupportedLanguage;
        if (newLang !== currentLanguage && supportedLanguages[newLang]) {
          changeLanguage(newLang);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [i18n, currentLanguage]);

  const value: LanguageContextType = {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    isRTL: isRTLMode,
    isChanging,
    autoDetectedLanguage,
    browserLanguage,
    getLanguageDirection: getLanguageDirectionUtil,
    getNativeLanguageName,
    getLanguageFlag,
    getAvailableLanguages,
    getPopularLanguages,
    getRegionalLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hooks to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Convenience hooks for specific language states
export const useCurrentLanguage = (): SupportedLanguage => {
  const { currentLanguage } = useLanguage();
  return currentLanguage;
};

export const useIsRTL = (): boolean => {
  const { isRTL } = useLanguage();
  return isRTL;
};

export const useIsLanguageChanging = (): boolean => {
  const { isChanging } = useLanguage();
  return isChanging;
};

export const useSupportedLanguages = () => {
  const { supportedLanguages } = useLanguage();
  return supportedLanguages;
};

export const usePopularLanguages = () => {
  const { getPopularLanguages } = useLanguage();
  return getPopularLanguages();
};

export const useRegionalLanguages = () => {
  const { getRegionalLanguages } = useLanguage();
  return getRegionalLanguages();
};
