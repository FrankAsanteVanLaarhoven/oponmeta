import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { translationManager } from '../utils/translationAPIs';

// Supported languages configuration
export const supportedLanguages = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳', direction: 'ltr' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', direction: 'ltr' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷', direction: 'ltr' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  pt: { name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  nl: { name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', direction: 'ltr' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', direction: 'ltr' },
  da: { name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', direction: 'ltr' },
  no: { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', direction: 'ltr' },
  fi: { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', direction: 'ltr' },
  pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', direction: 'ltr' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', direction: 'ltr' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', direction: 'rtl' },
  fa: { name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', direction: 'rtl' },
  th: { name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', direction: 'ltr' },
  vi: { name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', direction: 'ltr' },
  ms: { name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', direction: 'ltr' },
  fil: { name: 'Filipino', nativeName: 'Filipino', flag: '🇵🇭', direction: 'ltr' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', direction: 'ltr' },
  hu: { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', direction: 'ltr' },
  cs: { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', direction: 'ltr' },
  sk: { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', direction: 'ltr' },
  hr: { name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', direction: 'ltr' },
  sr: { name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', direction: 'ltr' },
  sl: { name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮', direction: 'ltr' },
  et: { name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', direction: 'ltr' },
  lv: { name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', direction: 'ltr' },
  lt: { name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', direction: 'ltr' },
  bg: { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', direction: 'ltr' },
  ro: { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', direction: 'ltr' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', direction: 'ltr' },
  be: { name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾', direction: 'ltr' },
  kk: { name: 'Kazakh', nativeName: 'Қазақ', flag: '🇰🇿', direction: 'ltr' },
  uz: { name: 'Uzbek', nativeName: 'O\'zbek', flag: '🇺🇿', direction: 'ltr' },
  ky: { name: 'Kyrgyz', nativeName: 'Кыргызча', flag: '🇰🇬', direction: 'ltr' },
  tg: { name: 'Tajik', nativeName: 'Тоҷикӣ', flag: '🇹🇯', direction: 'ltr' },
  mn: { name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', direction: 'ltr' },
  ka: { name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', direction: 'ltr' },
  hy: { name: 'Armenian', nativeName: 'Հայերեն', flag: '🇦🇲', direction: 'ltr' },
  az: { name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', direction: 'ltr' },
  mk: { name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', direction: 'ltr' },
  sq: { name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', direction: 'ltr' },
  mt: { name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹', direction: 'ltr' },
  is: { name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', direction: 'ltr' },
  ga: { name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪', direction: 'ltr' },
  cy: { name: 'Welsh', nativeName: 'Cymraeg', flag: '🇬🇧', direction: 'ltr' },
  gd: { name: 'Scottish Gaelic', nativeName: 'Gàidhlig', flag: '🇬🇧', direction: 'ltr' },
  eu: { name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸', direction: 'ltr' },
  ca: { name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', direction: 'ltr' },
  gl: { name: 'Galician', nativeName: 'Galego', flag: '🇪🇸', direction: 'ltr' },
  ast: { name: 'Asturian', nativeName: 'Asturianu', flag: '🇪🇸', direction: 'ltr' },
  oc: { name: 'Occitan', nativeName: 'Occitan', flag: '🇫🇷', direction: 'ltr' },
  br: { name: 'Breton', nativeName: 'Brezhoneg', flag: '🇫🇷', direction: 'ltr' },
  co: { name: 'Corsican', nativeName: 'Corsu', flag: '🇫🇷', direction: 'ltr' },
  lb: { name: 'Luxembourgish', nativeName: 'Lëtzebuergesch', flag: '🇱🇺', direction: 'ltr' },
  rm: { name: 'Romansh', nativeName: 'Rumantsch', flag: '🇨🇭', direction: 'ltr' },
  fur: { name: 'Friulian', nativeName: 'Furlan', flag: '🇮🇹', direction: 'ltr' },
  sc: { name: 'Sardinian', nativeName: 'Sardu', flag: '🇮🇹', direction: 'ltr' },
  vec: { name: 'Venetian', nativeName: 'Vèneto', flag: '🇮🇹', direction: 'ltr' },
  lmo: { name: 'Lombard', nativeName: 'Lombard', flag: '🇮🇹', direction: 'ltr' },
  pms: { name: 'Piedmontese', nativeName: 'Piemontèis', flag: '🇮🇹', direction: 'ltr' },
  lij: { name: 'Ligurian', nativeName: 'Lìgure', flag: '🇮🇹', direction: 'ltr' },
  nap: { name: 'Neapolitan', nativeName: 'Nnapulitano', flag: '🇮🇹', direction: 'ltr' },
  scn: { name: 'Sicilian', nativeName: 'Sicilianu', flag: '🇮🇹', direction: 'ltr' },
  roa: { name: 'Aromanian', nativeName: 'Armãneashti', flag: '🇷🇴', direction: 'ltr' },
  ruq: { name: 'Megleno-Romanian', nativeName: 'Vlăheşte', flag: '🇷🇴', direction: 'ltr' },
  ist: { name: 'Istriot', nativeName: 'Bumbaro', flag: '🇭🇷', direction: 'ltr' },
  dlm: { name: 'Dalmatian', nativeName: 'Dalmato', flag: '🇭🇷', direction: 'ltr' },
  lad: { name: 'Ladino', nativeName: 'Ladino', flag: '🇪🇸', direction: 'ltr' },
  an: { name: 'Aragonese', nativeName: 'Aragonés', flag: '🇪🇸', direction: 'ltr' },
  ext: { name: 'Extremaduran', nativeName: 'Estremeñu', flag: '🇪🇸', direction: 'ltr' },
  mwl: { name: 'Mirandese', nativeName: 'Mirandés', flag: '🇵🇹', direction: 'ltr' },
  bar: { name: 'Bavarian', nativeName: 'Boarisch', flag: '🇩🇪', direction: 'ltr' },
  cim: { name: 'Cimbrian', nativeName: 'Tzimbrisch', flag: '🇮🇹', direction: 'ltr' },
  pfl: { name: 'Palatinate German', nativeName: 'Pälzisch', flag: '🇩🇪', direction: 'ltr' },
  ksh: { name: 'Colognian', nativeName: 'Kölsch', flag: '🇩🇪', direction: 'ltr' },
  swg: { name: 'Swabian', nativeName: 'Schwäbisch', flag: '🇩🇪', direction: 'ltr' },
  gsw: { name: 'Swiss German', nativeName: 'Schwiizertüütsch', flag: '🇨🇭', direction: 'ltr' },
  als: { name: 'Alemannic', nativeName: 'Alemannisch', flag: '🇨🇭', direction: 'ltr' },
  pdc: { name: 'Pennsylvania German', nativeName: 'Pennsilfaanisch', flag: '🇺🇸', direction: 'ltr' },
  yid: { name: 'Yiddish', nativeName: 'יידיש', flag: '🇮🇱', direction: 'rtl' },
  ldn: { name: 'Láadan', nativeName: 'Láadan', flag: '🌍', direction: 'ltr' },
  tlh: { name: 'Klingon', nativeName: 'tlhIngan Hol', flag: '🖖', direction: 'ltr' },
  qya: { name: 'Quenya', nativeName: 'Quenya', flag: '🧝', direction: 'ltr' },
  art: { name: 'Artificial', nativeName: 'Artificial', flag: '🤖', direction: 'ltr' },
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

// RTL language detection
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'yid'];

// Advanced language detection configuration
const languageDetectorOptions = {
  order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  caches: ['localStorage', 'sessionStorage'],
  excludeCacheFor: ['cimode'],
  convertDetectedLanguage: (lng: string) => {
    // Convert regional codes to base language codes
    const baseLanguage = lng.split('-')[0];
    return Object.keys(supportedLanguages).includes(baseLanguage) ? baseLanguage : 'en';
  }
};

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    
    detection: languageDetectorOptions,
    
    supportedLngs: Object.keys(supportedLanguages),
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      addPath: '/locales/add/{{lng}}/{{ns}}',
      allowMultiLoading: false,
      crossDomain: false,
      withCredentials: false,
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default'
      }
    },
    
    react: {
      useSuspense: false, // Prevents SSR issues
    },
    
    // Custom missing key handler with API fallback
    saveMissing: true,
    missingKeyHandler: async (lng, ns, key, fallbackValue) => {
      if (import.meta.env.DEV) {
        console.warn(`Missing translation: ${key} for language: ${lng}`);
        
        // Attempt to translate missing keys using APIs
        try {
          const translatedText = await translationManager.translate(fallbackValue || key, 'en', lng);
          
          if (translatedText && translatedText !== fallbackValue) {
            // Store the translation locally
            i18n.addResource(lng, ns, key, translatedText);
            console.log(`Auto-translated: ${key} -> ${translatedText}`);
          }
        } catch (error) {
          console.error('Auto-translation failed:', error);
        }
      }
    },

    // Namespace configuration
    ns: ['common', 'navigation', 'courses', 'user', 'payment', 'community', 'assessment', 'errors', 'success', 'forms', 'dashboard', 'notifications'],
    defaultNS: 'common',

    // Load namespaces in parallel
    load: 'languageOnly',
    
    // Cache configuration
    cache: {
      enabled: true,
      expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
      versions: {}
    },

    // Performance optimization
    keySeparator: '.',
    nsSeparator: ':',
    
    // Plural rules
    pluralSeparator: '_',
    contextSeparator: '_',
    
    // Missing key handling
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
    
    // Resource loading
    partialBundledLanguages: true,
    resources: {},
    
    // Additional detection methods
    lookupQuerystring: 'lng',
    lookupCookie: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
    
    // Cache configuration
    caches: ['localStorage', 'sessionStorage'],
    excludeCacheFor: ['cimode'],
    
    // Cookie configuration
    cookieExpirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    cookieDomain: undefined,
    cookieSecure: false,
    cookieSameSite: 'strict',
    
    // HTML tag configuration
    htmlTag: document.documentElement,
    
    // Navigator configuration
    checkWhitelist: true,
  });

// Export utility functions
export const getLanguageDirection = (lng?: string): 'ltr' | 'rtl' => {
  const language = lng || i18n.language;
  return RTL_LANGUAGES.includes(language) ? 'rtl' : 'ltr';
};

export const isRTL = (lng?: string): boolean => {
  return getLanguageDirection(lng) === 'rtl';
};

export const getNativeLanguageName = (lng: SupportedLanguage): string => {
  return supportedLanguages[lng]?.nativeName || lng;
};

export const getLanguageFlag = (lng: SupportedLanguage): string => {
  return supportedLanguages[lng]?.flag || '🌍';
};

export default i18n;
