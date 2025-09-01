import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enGBTranslations from './locales/en-GB.json';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import zhTranslations from './locales/zh.json';
import jaTranslations from './locales/ja.json';
import arTranslations from './locales/ar.json';
import ruTranslations from './locales/ru.json';
import ptTranslations from './locales/pt.json';
import itTranslations from './locales/it.json';

const resources = {
  'en-GB': { translation: enGBTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  zh: { translation: zhTranslations },
  ja: { translation: jaTranslations },
  ar: { translation: arTranslations },
  ru: { translation: ruTranslations },
  pt: { translation: ptTranslations },
  it: { translation: itTranslations }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-GB', // Set UK English as default
    fallbackLng: 'en-GB', // Fallback to UK English
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
      lookupCookie: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['localStorage', 'sessionStorage', 'cookie']
    }
  });

export default i18n; 