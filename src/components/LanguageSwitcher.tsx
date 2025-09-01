import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUKEnglish } from '../hooks/useUKEnglish';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons' | 'select';
  showFlags?: boolean;
  showNames?: boolean;
  showCodes?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Language switcher component for the LMS platform
 * Supports multiple display variants and provides easy language switching
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown',
  showFlags = true,
  showNames = true,
  showCodes = true,
  size = 'md',
  placement = 'bottom'
}) => {
  const { t } = useTranslation();
  const {
    currentLanguage,
    isUKEnglish,
    switchLanguage,
    getAvailableLanguages,
    getCurrentLanguageInfo
  } = useUKEnglish();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = getCurrentLanguageInfo();
  const availableLanguages = getAvailableLanguages();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    switchLanguage(languageCode);
    setIsOpen(false);
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-2 py-1';
      case 'lg':
        return 'text-lg px-4 py-2';
      default:
        return 'text-base px-3 py-2';
    }
  };

  const getPlacementClasses = () => {
    switch (placement) {
      case 'top':
        return 'bottom-full mb-2';
      case 'left':
        return 'right-full mr-2';
      case 'right':
        return 'left-full ml-2';
      default:
        return 'top-full mt-2';
    }
  };

  // Button variant
  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200
              ${currentLanguage === lang.code
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }
              ${getSizeClasses()}
              ${lang.isUK ? 'ring-2 ring-blue-200' : ''}
            `}
            title={`Switch to ${lang.name}`}
          >
            {showFlags && <span className="text-lg">{lang.flag}</span>}
            {showNames && <span className="font-medium">{lang.name}</span>}
            {showCodes && <span className="text-xs opacity-75">({lang.code})</span>}
            {lang.isUK && (
              <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                UK
              </span>
            )}
          </button>
        ))}
      </div>
    );
  }

  // Select variant
  if (variant === 'select') {
    return (
      <div className={`relative ${className}`}>
        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className={`
            w-full appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 cursor-pointer
            ${getSizeClasses()}
            ${isUKEnglish ? 'ring-2 ring-blue-200' : ''}
          `}
        >
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {showFlags && lang.flag} {showNames && lang.name} {showCodes && `(${lang.code})`}
              {lang.isUK && ' - UK English'}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg
          hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:border-transparent transition-all duration-200
          ${getSizeClasses()}
          ${isUKEnglish ? 'ring-2 ring-blue-200' : ''}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select language"
      >
        {showFlags && <span className="text-lg">{currentLang.flag}</span>}
        {showNames && <span className="font-medium text-black">{currentLang.name}</span>}
        {showCodes && <span className="text-xs text-gray-700">({currentLang.code})</span>}
        {currentLang.isUK && (
          <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            UK
          </span>
        )}
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`
            absolute z-50 w-56 bg-white border border-gray-200 rounded-lg shadow-lg
            ${getPlacementClasses()}
            animate-in fade-in-0 zoom-in-95 duration-200
          `}
        >
          <div className="py-1">
            {/* UK English section */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Recommended
            </div>
            {availableLanguages
              .filter((lang) => lang.isUK)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-blue-50
                    transition-colors duration-150 cursor-pointer
                    ${currentLanguage === lang.code ? 'bg-blue-100 text-blue-900' : 'text-black'}
                  `}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-black">{lang.name}</div>
                    <div className="text-xs text-gray-500">British English</div>
                  </div>
                  {currentLanguage === lang.code && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}

            {/* Other languages section */}
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Other Languages
            </div>
            {availableLanguages
              .filter((lang) => !lang.isUK)
              .map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50
                    transition-colors duration-150 cursor-pointer
                    ${currentLanguage === lang.code ? 'bg-gray-100 text-gray-900' : 'text-black'}
                  `}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium text-black">{lang.name}</div>
                    <div className="text-xs text-gray-500">{lang.code}</div>
                  </div>
                  {currentLanguage === lang.code && (
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}

            {/* Language settings link */}
            <div className="px-3 py-2 border-t border-gray-100">
              <button
                onClick={() => {
                  // TODO: Navigate to language settings page
                  console.log('Navigate to language settings');
                }}
                className="w-full text-left text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-2 rounded transition-colors duration-150"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Language Settings
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 