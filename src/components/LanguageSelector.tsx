import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Search, Globe, ChevronDown, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'flags' | 'compact' | 'search' | 'modal';
  showNativeNames?: boolean;
  showPopular?: boolean;
  showRegional?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  maxHeight?: string;
  searchable?: boolean;
  groupBy?: 'popular' | 'region' | 'alphabetical' | 'none';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'dropdown',
  showNativeNames = true,
  showPopular = true,
  showRegional = true,
  className = '',
  size = 'md',
  maxHeight = '400px',
  searchable = true,
  groupBy = 'popular'
}) => {
  const { t } = useTranslation();
  const { 
    currentLanguage, 
    supportedLanguages, 
    changeLanguage, 
    isChanging,
    getNativeLanguageName,
    getLanguageFlag,
    getPopularLanguages,
    getRegionalLanguages
  } = useLanguage();
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable]);

  const handleLanguageSelect = async (lng: keyof typeof supportedLanguages) => {
    await changeLanguage(lng);
    setIsOpen(false);
    setSearchTerm('');
    setSelectedGroup('all');
  };

  // Filter languages based on search term
  const filteredLanguages = Object.entries(supportedLanguages).filter(([code, lang]) => {
    const matchesSearch = searchTerm === '' || 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedGroup === 'all') return matchesSearch;
    if (selectedGroup === 'popular') return getPopularLanguages().includes(code as any) && matchesSearch;
    if (selectedGroup === 'regional') return getRegionalLanguages().includes(code as any) && matchesSearch;
    
    return matchesSearch;
  });

  // Group languages
  const groupedLanguages = () => {
    if (groupBy === 'none') {
      return { all: filteredLanguages };
    }

    const groups: Record<string, [string, any][]> = {
      popular: [],
      regional: [],
      other: []
    };

    filteredLanguages.forEach(([code, lang]) => {
      if (getPopularLanguages().includes(code as any)) {
        groups.popular.push([code, lang]);
      } else if (getRegionalLanguages().includes(code as any)) {
        groups.regional.push([code, lang]);
      } else {
        groups.other.push([code, lang]);
      }
    });

    return groups;
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3'
  };

  const flagSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // OPONM brand colors and styling
  const oponmStyles = {
    primary: 'bg-gradient-to-r from-[#0a174e] via-[#1a2a6b] to-[#0a174e]',
    primaryHover: 'hover:bg-gradient-to-r hover:from-[#11235a] hover:via-[#2a3a7b] hover:to-[#11235a]',
    accent: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    accentHover: 'hover:from-yellow-500 hover:to-yellow-700',
    border: 'border-yellow-400/30',
    borderHover: 'hover:border-yellow-400/50',
    shadow: 'shadow-lg shadow-yellow-400/20',
    textPrimary: 'text-white',
    textAccent: 'text-yellow-400',
    textDark: 'text-[#0a174e]'
  };

  if (variant === 'flags') {
    return (
      <div className={`flex flex-wrap gap-1 ${className}`}>
        {Object.entries(supportedLanguages).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => handleLanguageSelect(code as keyof typeof supportedLanguages)}
            disabled={isChanging}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium',
              'transition-all duration-300 min-h-[44px] min-w-[44px]',
              'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
              currentLanguage === code 
                ? `${oponmStyles.accent} text-white shadow-lg` 
                : 'bg-white/10 text-white hover:bg-white/20',
              isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              flagSizeClasses[size]
            )}
            title={showNativeNames ? lang.nativeName : lang.name}
          >
            <span className="text-lg" role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
            {showNativeNames && (
              <span className="hidden sm:inline">{lang.nativeName}</span>
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isChanging}
          className={cn(
            'relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium',
            'transition-all duration-300 min-h-[44px]',
            'hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400/50',
            'bg-white/10 text-white hover:bg-white/20',
            isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            sizeClasses[size]
          )}
        >
          <span role="img" aria-label={supportedLanguages[currentLanguage].name}>
            {supportedLanguages[currentLanguage].flag}
          </span>
          <span>{currentLanguage.toUpperCase()}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
          
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl z-50 min-w-[200px] border border-gray-200">
              {Object.entries(supportedLanguages)
                .filter(([code]) => code !== currentLanguage)
                .map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageSelect(code as keyof typeof supportedLanguages)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-yellow-50 w-full text-left transition-colors duration-200"
                  >
                    <span role="img" aria-label={lang.name}>{lang.flag}</span>
                    <span>{code.toUpperCase()}</span>
                  </button>
                ))}
            </div>
          )}
        </button>
      </div>
    );
  }

  if (variant === 'search') {
    return (
      <div ref={dropdownRef} className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isChanging}
          className={cn(
            'flex items-center justify-between gap-3 px-4 py-2 min-h-[44px]',
            'border border-gray-300 rounded-lg text-sm font-medium',
            'transition-all duration-300 bg-white hover:bg-gray-50',
            'focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400',
            isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            sizeClasses[size]
          )}
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <span role="img" aria-label={supportedLanguages[currentLanguage].name}>
              {supportedLanguages[currentLanguage].flag}
            </span>
            <span>
              {showNativeNames 
                ? getNativeLanguageName(currentLanguage)
                : supportedLanguages[currentLanguage].name
              }
            </span>
          </div>
          <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder={t('common.language.selectLanguage')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Group Tabs */}
            {(showPopular || showRegional) && (
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setSelectedGroup('all')}
                  className={cn(
                    'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200',
                    selectedGroup === 'all' ? 'border-yellow-400 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  )}
                >
                  All
                </button>
                {showPopular && (
                  <button
                    onClick={() => setSelectedGroup('popular')}
                    className={cn(
                      'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200',
                      selectedGroup === 'popular' ? 'border-yellow-400 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    )}
                  >
                    Popular
                  </button>
                )}
                {showRegional && (
                  <button
                    onClick={() => setSelectedGroup('regional')}
                    className={cn(
                      'flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors duration-200',
                      selectedGroup === 'regional' ? 'border-yellow-400 text-yellow-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                    )}
                  >
                    Regional
                  </button>
                )}
              </div>
            )}

            {/* Language List */}
            <div className="max-h-[300px] overflow-y-auto">
              {groupBy === 'none' ? (
                <div className="py-1">
                  {filteredLanguages.map(([code, lang]) => (
                    <LanguageOption
                      key={code}
                      code={code}
                      lang={lang}
                      isSelected={code === currentLanguage}
                      showNativeNames={showNativeNames}
                      onSelect={handleLanguageSelect}
                      getNativeLanguageName={getNativeLanguageName}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-1">
                  {Object.entries(groupedLanguages()).map(([groupName, languages]) => {
                    if (languages.length === 0) return null;
                    
                    return (
                      <div key={groupName}>
                        {groupBy !== 'none' && (
                          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                            {groupName}
                          </div>
                        )}
                        {languages.map(([code, lang]) => (
                          <LanguageOption
                            key={code}
                            code={code}
                            lang={lang}
                            isSelected={code === currentLanguage}
                            showNativeNames={showNativeNames}
                            onSelect={handleLanguageSelect}
                            getNativeLanguageName={getNativeLanguageName}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Language detection info */}
            <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
              <p className="text-xs text-gray-600">
                {t('common.language.autoDetected')}: {navigator.language}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isChanging}
        className={cn(
          'flex items-center justify-between gap-3 px-4 py-2 min-h-[44px]',
          'border border-gray-300 rounded-lg text-sm font-medium',
          'transition-all duration-300 bg-white hover:bg-gray-50',
          'focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400',
          isChanging ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          sizeClasses[size]
        )}
      >
        <div className="flex items-center gap-2">
          <span role="img" aria-label={supportedLanguages[currentLanguage].name}>
            {supportedLanguages[currentLanguage].flag}
          </span>
          <span>
            {showNativeNames 
              ? getNativeLanguageName(currentLanguage)
              : supportedLanguages[currentLanguage].name
            }
          </span>
        </div>
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto">
          <div className="py-1">
            {Object.entries(supportedLanguages).map(([code, lang]) => (
              <LanguageOption
                key={code}
                code={code}
                lang={lang}
                isSelected={code === currentLanguage}
                showNativeNames={showNativeNames}
                onSelect={handleLanguageSelect}
                getNativeLanguageName={getNativeLanguageName}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Language Option Component with OPONM styling
interface LanguageOptionProps {
  code: string;
  lang: any;
  isSelected: boolean;
  showNativeNames: boolean;
  onSelect: (lng: keyof any) => void;
  getNativeLanguageName: (lng: any) => string;
}

const LanguageOption: React.FC<LanguageOptionProps> = ({
  code,
  lang,
  isSelected,
  showNativeNames,
  onSelect,
  getNativeLanguageName
}) => (
  <button
    onClick={() => onSelect(code as keyof any)}
    disabled={isSelected}
    className={cn(
      'flex items-center gap-3 px-4 py-3 text-sm w-full text-left',
      'transition-all duration-200 min-h-[44px]',
      'hover:bg-yellow-50 focus:outline-none focus:bg-yellow-50',
      isSelected 
        ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-800 cursor-default' 
        : 'text-gray-700 hover:text-gray-900'
    )}
  >
    <span role="img" aria-label={lang.name}>{lang.flag}</span>
    <div className="flex flex-col">
      <span className="font-medium">
        {showNativeNames ? getNativeLanguageName(code) : lang.name}
      </span>
      {showNativeNames && (
        <span className="text-xs text-gray-500">{lang.name}</span>
      )}
    </div>
    {isSelected && (
      <Check className="ml-auto w-4 h-4 text-yellow-600" />
    )}
  </button>
);

// Export specialized variants
export const CompactLanguageSelector: React.FC<Omit<LanguageSelectorProps, 'variant'>> = (props) => (
  <LanguageSelector variant="compact" {...props} />
);

export const FlagLanguageSelector: React.FC<Omit<LanguageSelectorProps, 'variant'>> = (props) => (
  <LanguageSelector variant="flags" {...props} />
);

export const SearchableLanguageSelector: React.FC<Omit<LanguageSelectorProps, 'variant'>> = (props) => (
  <LanguageSelector variant="search" {...props} />
);
