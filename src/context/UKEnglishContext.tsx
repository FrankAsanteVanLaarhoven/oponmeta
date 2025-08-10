import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useUKEnglish } from '../hooks/useUKEnglish';

interface UKEnglishContextType {
  // Language state
  currentLanguage: string;
  isUKEnglish: boolean;
  
  // Language switching functions
  switchToUKEnglish: () => void;
  switchToUSEnglish: () => void;
  switchLanguage: (language: string) => void;
  
  // Language information
  getAvailableLanguages: () => Array<{
    code: string;
    name: string;
    flag: string;
    isUK: boolean;
  }>;
  getCurrentLanguageInfo: () => {
    code: string;
    name: string;
    flag: string;
    isUK: boolean;
  };
  isLanguageUKEnglish: (language: string) => boolean;
  
  // Text formatting
  getUKText: (ukText: string, usText: string) => string;
  formatText: (text: string) => string;
  
  // Format information
  getDateFormat: () => string;
  getTimeFormat: () => string;
  getCurrencySymbol: () => string;
  getCurrencyCode: () => string;
  getNumberFormat: () => string;
  getPhoneFormat: () => string;
  getAddressFormat: () => string;
  getPostalCodeFormat: () => string;
  
  // Measurement units
  getMeasurementUnits: () => string;
  getTemperatureUnit: () => string;
  getWeightUnit: () => string;
  getDistanceUnit: () => string;
  getVolumeUnit: () => string;
  getAreaUnit: () => string;
  getSpeedUnit: () => string;
  getPressureUnit: () => string;
  getEnergyUnit: () => string;
  getPowerUnit: () => string;
  
  // UK formatting utilities
  formatUKDate: (date: Date | string | number, options?: Intl.DateTimeFormatOptions) => string;
  formatUKShortDate: (date: Date | string | number) => string;
  formatUKLongDate: (date: Date | string | number) => string;
  formatUKDateTime: (date: Date | string | number) => string;
  formatUKCurrency: (amount: number, options?: Intl.NumberFormatOptions) => string;
  formatUKNumber: (number: number, options?: Intl.NumberFormatOptions) => string;
  formatUKPercentage: (value: number, options?: Intl.NumberFormatOptions) => string;
  getUKRelativeTime: (date: Date | string | number) => string;
  formatUKFileSize: (bytes: number) => string;
  formatUKPhoneNumber: (phoneNumber: string) => string;
  
  // Constants
  UK_LOCALE: string;
  
  // UI state
  showLanguageIndicator: boolean;
  toggleLanguageIndicator: () => void;
  
  // Preferences
  autoDetectLanguage: boolean;
  setAutoDetectLanguage: (enabled: boolean) => void;
  rememberLanguagePreference: boolean;
  setRememberLanguagePreference: (enabled: boolean) => void;
  
  // Notifications
  showLanguageChangeNotification: boolean;
  setShowLanguageChangeNotification: (show: boolean) => void;
  languageChangeMessage: string;
}

const UKEnglishContext = createContext<UKEnglishContextType | undefined>(undefined);

interface UKEnglishProviderProps {
  children: ReactNode;
  defaultLanguage?: string;
  autoDetectLanguage?: boolean;
  rememberLanguagePreference?: boolean;
  showLanguageIndicator?: boolean;
}

/**
 * Provider component for UK English language context
 * Manages language state and preferences across the entire LMS platform
 */
export const UKEnglishProvider: React.FC<UKEnglishProviderProps> = ({
  children,
  defaultLanguage = 'en-GB',
  autoDetectLanguage = true,
  rememberLanguagePreference = true,
  showLanguageIndicator = true
}) => {
  const ukEnglishHook = useUKEnglish();
  const { i18n } = useTranslation();
  
  // Local state for UI preferences
  const [showLanguageIndicatorState, setShowLanguageIndicatorState] = useState(showLanguageIndicator);
  const [autoDetectLanguageState, setAutoDetectLanguageState] = useState(autoDetectLanguage);
  const [rememberLanguagePreferenceState, setRememberLanguagePreferenceState] = useState(rememberLanguagePreference);
  const [showLanguageChangeNotification, setShowLanguageChangeNotification] = useState(false);
  const [languageChangeMessage, setLanguageChangeMessage] = useState('');

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = () => {
      // Check if we should remember user preference
      if (rememberLanguagePreferenceState) {
        const savedLanguage = localStorage.getItem('i18nextLng');
        if (savedLanguage) {
          ukEnglishHook.switchLanguage(savedLanguage);
          return;
        }
      }

      // Check if we should auto-detect language
      if (autoDetectLanguageState) {
        const browserLanguage = navigator.language;
        const supportedLanguages = ukEnglishHook.getAvailableLanguages().map(lang => lang.code);
        
        // Check for exact match
        if (supportedLanguages.includes(browserLanguage)) {
          ukEnglishHook.switchLanguage(browserLanguage);
          return;
        }
        
        // Check for language family match (e.g., 'en' for 'en-GB', 'en-US')
        const languageFamily = browserLanguage.split('-')[0];
        const familyMatch = supportedLanguages.find(lang => lang.startsWith(languageFamily));
        if (familyMatch) {
          ukEnglishHook.switchLanguage(familyMatch);
          return;
        }
      }

      // Fall back to default language
      ukEnglishHook.switchLanguage(defaultLanguage);
    };

    initializeLanguage();
  }, [defaultLanguage, autoDetectLanguageState, rememberLanguagePreferenceState]);

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = ukEnglishHook.currentLanguage;
    }
  }, [ukEnglishHook.currentLanguage]);

  // Show notification when language changes
  useEffect(() => {
    if (ukEnglishHook.currentLanguage !== defaultLanguage) {
      const currentLangInfo = ukEnglishHook.getCurrentLanguageInfo();
      const message = `Language changed to ${currentLangInfo.name} ${currentLangInfo.flag}`;
      setLanguageChangeMessage(message);
      setShowLanguageChangeNotification(true);
      
      // Auto-hide notification after 3 seconds
      const timer = setTimeout(() => {
        setShowLanguageChangeNotification(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [ukEnglishHook.currentLanguage, defaultLanguage]);

  // Enhanced language switching with notifications
  const enhancedSwitchLanguage = (language: string) => {
    const previousLanguage = ukEnglishHook.currentLanguage;
    ukEnglishHook.switchLanguage(language);
    
    // Show success notification
    const newLangInfo = ukEnglishHook.getAvailableLanguages().find(lang => lang.code === language);
    if (newLangInfo) {
      const message = `Successfully switched to ${newLangInfo.name} ${newLangInfo.flag}`;
      setLanguageChangeMessage(message);
      setShowLanguageChangeNotification(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowLanguageChangeNotification(false);
      }, 3000);
    }
    
    // Log language change for analytics
    console.log(`Language changed from ${previousLanguage} to ${language}`);
  };

  // Enhanced UK English switching
  const enhancedSwitchToUKEnglish = () => {
    ukEnglishHook.switchToUKEnglish();
    
    const message = 'Switched to British English 🇬🇧';
    setLanguageChangeMessage(message);
    setShowLanguageChangeNotification(true);
    
    setTimeout(() => {
      setShowLanguageChangeNotification(false);
    }, 3000);
  };

  // Enhanced US English switching
  const enhancedSwitchToUSEnglish = () => {
    ukEnglishHook.switchToUSEnglish();
    
    const message = 'Switched to American English 🇺🇸';
    setLanguageChangeMessage(message);
    setShowLanguageChangeNotification(true);
    
    setTimeout(() => {
      setShowLanguageChangeNotification(false);
    }, 3000);
  };

  // Toggle language indicator visibility
  const toggleLanguageIndicator = () => {
    setShowLanguageIndicatorState(prev => !prev);
  };

  // Set auto-detect language preference
  const setAutoDetectLanguage = (enabled: boolean) => {
    setAutoDetectLanguageState(enabled);
    localStorage.setItem('ukEnglish_autoDetectLanguage', enabled.toString());
  };

  // Set remember language preference
  const setRememberLanguagePreference = (enabled: boolean) => {
    setRememberLanguagePreferenceState(enabled);
    localStorage.setItem('ukEnglish_rememberLanguagePreference', enabled.toString());
  };

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedAutoDetect = localStorage.getItem('ukEnglish_autoDetectLanguage');
    const savedRemember = localStorage.getItem('ukEnglish_rememberLanguagePreference');
    const savedShowIndicator = localStorage.getItem('ukEnglish_showLanguageIndicator');
    
    if (savedAutoDetect !== null) {
      setAutoDetectLanguageState(savedAutoDetect === 'true');
    }
    
    if (savedRemember !== null) {
      setRememberLanguagePreferenceState(savedRemember === 'true');
    }
    
    if (savedShowIndicator !== null) {
      setShowLanguageIndicatorState(savedShowIndicator === 'true');
    }
  }, []);

  // Save preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('ukEnglish_autoDetectLanguage', autoDetectLanguageState.toString());
  }, [autoDetectLanguageState]);

  useEffect(() => {
    localStorage.setItem('ukEnglish_rememberLanguagePreference', rememberLanguagePreferenceState.toString());
  }, [rememberLanguagePreferenceState]);

  useEffect(() => {
    localStorage.setItem('ukEnglish_showLanguageIndicator', showLanguageIndicatorState.toString());
  }, [showLanguageIndicatorState]);

  const contextValue: UKEnglishContextType = {
    // Language state
    currentLanguage: ukEnglishHook.currentLanguage,
    isUKEnglish: ukEnglishHook.isUKEnglish,
    
    // Language switching functions
    switchToUKEnglish: enhancedSwitchToUKEnglish,
    switchToUSEnglish: enhancedSwitchToUSEnglish,
    switchLanguage: enhancedSwitchLanguage,
    
    // Language information
    getAvailableLanguages: ukEnglishHook.getAvailableLanguages,
    getCurrentLanguageInfo: ukEnglishHook.getCurrentLanguageInfo,
    isLanguageUKEnglish: ukEnglishHook.isLanguageUKEnglish,
    
    // Text formatting
    getUKText: ukEnglishHook.getUKText,
    formatText: ukEnglishHook.formatText,
    
    // Format information
    getDateFormat: ukEnglishHook.getDateFormat,
    getTimeFormat: ukEnglishHook.getTimeFormat,
    getCurrencySymbol: ukEnglishHook.getCurrencySymbol,
    getCurrencyCode: ukEnglishHook.getCurrencyCode,
    getNumberFormat: ukEnglishHook.getNumberFormat,
    getPhoneFormat: ukEnglishHook.getPhoneFormat,
    getAddressFormat: ukEnglishHook.getAddressFormat,
    getPostalCodeFormat: ukEnglishHook.getPostalCodeFormat,
    
    // Measurement units
    getMeasurementUnits: ukEnglishHook.getMeasurementUnits,
    getTemperatureUnit: ukEnglishHook.getTemperatureUnit,
    getWeightUnit: ukEnglishHook.getWeightUnit,
    getDistanceUnit: ukEnglishHook.getDistanceUnit,
    getVolumeUnit: ukEnglishHook.getVolumeUnit,
    getAreaUnit: ukEnglishHook.getAreaUnit,
    getSpeedUnit: ukEnglishHook.getSpeedUnit,
    getPressureUnit: ukEnglishHook.getPressureUnit,
    getEnergyUnit: ukEnglishHook.getEnergyUnit,
    getPowerUnit: ukEnglishHook.getPowerUnit,
    
    // UK formatting utilities
    formatUKDate: ukEnglishHook.formatUKDate,
    formatUKShortDate: ukEnglishHook.formatUKShortDate,
    formatUKLongDate: ukEnglishHook.formatUKLongDate,
    formatUKDateTime: ukEnglishHook.formatUKDateTime,
    formatUKCurrency: ukEnglishHook.formatUKCurrency,
    formatUKNumber: ukEnglishHook.formatUKNumber,
    formatUKPercentage: ukEnglishHook.formatUKPercentage,
    getUKRelativeTime: ukEnglishHook.getUKRelativeTime,
    formatUKFileSize: ukEnglishHook.formatUKFileSize,
    formatUKPhoneNumber: ukEnglishHook.formatUKPhoneNumber,
    
    // Constants
    UK_LOCALE: ukEnglishHook.UK_LOCALE,
    
    // UI state
    showLanguageIndicator: showLanguageIndicatorState,
    toggleLanguageIndicator,
    
    // Preferences
    autoDetectLanguage: autoDetectLanguageState,
    setAutoDetectLanguage,
    rememberLanguagePreference: rememberLanguagePreferenceState,
    setRememberLanguagePreference,
    
    // Notifications
    showLanguageChangeNotification,
    setShowLanguageChangeNotification,
    languageChangeMessage
  };

  return (
    <UKEnglishContext.Provider value={contextValue}>
      {children}
      
      {/* Language change notification */}
      {showLanguageChangeNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{languageChangeMessage}</span>
            <button
              onClick={() => setShowLanguageChangeNotification(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </UKEnglishContext.Provider>
  );
};

/**
 * Hook to use the UK English context
 * Must be used within a UKEnglishProvider
 */
export const useUKEnglishContext = (): UKEnglishContextType => {
  const context = useContext(UKEnglishContext);
  if (context === undefined) {
    throw new Error('useUKEnglishContext must be used within a UKEnglishProvider');
  }
  return context;
};

export default UKEnglishProvider;
