import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatUKDate,
  formatUKShortDate,
  formatUKLongDate,
  formatUKDateTime,
  formatUKCurrency,
  formatUKNumber,
  formatUKPercentage,
  getUKRelativeTime,
  formatUKFileSize,
  formatUKPhoneNumber,
  UK_LOCALE
} from '../utils/ukEnglishFormatters';

/**
 * Custom hook for managing UK English language settings and formatting
 * Provides consistent British English conventions across the LMS platform
 */
export function useUKEnglish() {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>('en-GB');
  const [isUKEnglish, setIsUKEnglish] = useState<boolean>(true);

  // Check if current language is UK English
  useEffect(() => {
    const lang = i18n.language;
    setCurrentLanguage(lang);
    setIsUKEnglish(lang === 'en-GB');
  }, [i18n.language]);

  // Switch to UK English
  const switchToUKEnglish = useCallback(() => {
    i18n.changeLanguage('en-GB');
    setCurrentLanguage('en-GB');
    setIsUKEnglish(true);
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en-GB';
    }
    
    // Store preference in localStorage
    localStorage.setItem('i18nextLng', 'en-GB');
  }, [i18n]);

  // Switch to US English
  const switchToUSEnglish = useCallback(() => {
    i18n.changeLanguage('en');
    setCurrentLanguage('en');
    setIsUKEnglish(false);
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en';
    }
    
    // Store preference in localStorage
    localStorage.setItem('i18nextLng', 'en');
  }, [i18n]);

  // Switch to any language
  const switchLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    setIsUKEnglish(language === 'en-GB');
    
    // Update HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    
    // Store preference in localStorage
    localStorage.setItem('i18nextLng', language);
  }, [i18n]);

  // Get available languages
  const getAvailableLanguages = useCallback(() => {
    return [
      { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧', isUK: true },
      { code: 'en', name: 'English (US)', flag: '🇺🇸', isUK: false },
      { code: 'es', name: 'Español', flag: '🇪🇸', isUK: false },
      { code: 'fr', name: 'Français', flag: '🇫🇷', isUK: false },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪', isUK: false },
      { code: 'zh', name: '中文', flag: '🇨🇳', isUK: false },
      { code: 'ja', name: '日本語', flag: '🇯🇵', isUK: false },
      { code: 'ar', name: 'العربية', flag: '🇸🇦', isUK: false },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', isUK: false },
      { code: 'pt', name: 'Português', flag: '🇵🇹', isUK: false },
      { code: 'it', name: 'Italiano', flag: '🇮🇹', isUK: false }
    ];
  }, []);

  // Get current language info
  const getCurrentLanguageInfo = useCallback(() => {
    const languages = getAvailableLanguages();
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  }, [currentLanguage, getAvailableLanguages]);

  // Check if a specific language is UK English
  const isLanguageUKEnglish = useCallback((language: string) => {
    return language === 'en-GB';
  }, []);

  // Get UK-specific text based on current language
  const getUKText = useCallback((ukText: string, usText: string) => {
    return isUKEnglish ? ukText : usText;
  }, [isUKEnglish]);

  // Format text with UK English conventions
  const formatText = useCallback((text: string) => {
    if (!isUKEnglish) return text;
    
    // Replace US spellings with UK spellings
    return text
      .replace(/\bcolor\b/g, 'colour')
      .replace(/\bcenter\b/g, 'centre')
      .replace(/\borganize\b/g, 'organise')
      .replace(/\borganization\b/g, 'organisation')
      .replace(/\bprogram\b/g, 'programme')
      .replace(/\bprograms\b/g, 'programmes')
      .replace(/\btheater\b/g, 'theatre')
      .replace(/\btheaters\b/g, 'theatres')
      .replace(/\bdefense\b/g, 'defence')
      .replace(/\boffense\b/g, 'offence')
      .replace(/\blicense\b/g, 'licence')
      .replace(/\bpractice\b/g, 'practise')
      .replace(/\banalyze\b/g, 'analyse')
      .replace(/\banalyzing\b/g, 'analysing')
      .replace(/\bcatalog\b/g, 'catalogue')
      .replace(/\bdialog\b/g, 'dialogue')
      .replace(/\bmonolog\b/g, 'monologue')
      .replace(/\bepilog\b/g, 'epilogue')
      .replace(/\btraveled\b/g, 'travelled')
      .replace(/\btraveling\b/g, 'travelling')
      .replace(/\bcanceled\b/g, 'cancelled')
      .replace(/\bcanceling\b/g, 'cancelling')
      .replace(/\bmodeled\b/g, 'modelled')
      .replace(/\bmodeling\b/g, 'modelling')
      .replace(/\blabeled\b/g, 'labelled')
      .replace(/\blabeling\b/g, 'labelling')
      .replace(/\bhonor\b/g, 'honour')
      .replace(/\bhonorable\b/g, 'honourable')
      .replace(/\bhumor\b/g, 'humour')
      .replace(/\bhumorous\b/g, 'humorous')
      .replace(/\blabor\b/g, 'labour')
      .replace(/\blaborer\b/g, 'labourer')
      .replace(/\bfavor\b/g, 'favour')
      .replace(/\bfavorable\b/g, 'favourable')
      .replace(/\bflavor\b/g, 'flavour')
      .replace(/\bflavorful\b/g, 'flavourful')
      .replace(/\bneighbor\b/g, 'neighbour')
      .replace(/\bneighborhood\b/g, 'neighbourhood')
      .replace(/\bbehavior\b/g, 'behaviour')
      .replace(/\bbehavioral\b/g, 'behavioural')
      .replace(/\bendeavor\b/g, 'endeavour')
      .replace(/\bendeavoring\b/g, 'endeavouring')
      .replace(/\bendeavored\b/g, 'endeavoured')
      .replace(/\bendeavors\b/g, 'endeavours')
      .replace(/\bendeavorer\b/g, 'endeavourer')
      .replace(/\bendeavorment\b/g, 'endeavourment')
      .replace(/\bendeavorless\b/g, 'endeavourless')
      .replace(/\bendeavorful\b/g, 'endeavourful')
      .replace(/\bendeavorfully\b/g, 'endeavourfully')
      .replace(/\bendeavorfulness\b/g, 'endeavourfulness')
      .replace(/\bendeavoring\b/g, 'endeavouring')
      .replace(/\bendeavored\b/g, 'endeavoured')
      .replace(/\bendeavors\b/g, 'endeavours')
      .replace(/\bendeavorer\b/g, 'endeavourer')
      .replace(/\bendeavorment\b/g, 'endeavourment')
      .replace(/\bendeavorless\b/g, 'endeavourless')
      .replace(/\bendeavorful\b/g, 'endeavourful')
      .replace(/\bendeavorfully\b/g, 'endeavourfully')
      .replace(/\bendeavorfulness\b/g, 'endeavourfulness');
  }, [isUKEnglish]);

  // Get UK-specific date format
  const getDateFormat = useCallback(() => {
    return isUKEnglish ? 'DD/MM/YYYY' : 'MM/DD/YYYY';
  }, [isUKEnglish]);

  // Get UK-specific time format
  const getTimeFormat = useCallback(() => {
    return isUKEnglish ? '24-hour' : '12-hour';
  }, [isUKEnglish]);

  // Get UK-specific currency symbol
  const getCurrencySymbol = useCallback(() => {
    return isUKEnglish ? '£' : '$';
  }, [isUKEnglish]);

  // Get UK-specific currency code
  const getCurrencyCode = useCallback(() => {
    return isUKEnglish ? 'GBP' : 'USD';
  }, [isUKEnglish]);

  // Get UK-specific number format
  const getNumberFormat = useCallback(() => {
    return isUKEnglish ? '1,234.56' : '1,234.56';
  }, [isUKEnglish]);

  // Get UK-specific phone format
  const getPhoneFormat = useCallback(() => {
    return isUKEnglish ? '+44 20 7946 0958' : '+1 (555) 123-4567';
  }, [isUKEnglish]);

  // Get UK-specific address format
  const getAddressFormat = useCallback(() => {
    return isUKEnglish ? '123 High Street, London, SW1A 1AA' : '123 Main St, New York, NY 10001';
  }, [isUKEnglish]);

  // Get UK-specific postal code format
  const getPostalCodeFormat = useCallback(() => {
    return isUKEnglish ? 'SW1A 1AA' : '10001';
  }, [isUKEnglish]);

  // Get UK-specific measurement units
  const getMeasurementUnits = useCallback(() => {
    return isUKEnglish ? 'Metric' : 'Imperial';
  }, [isUKEnglish]);

  // Get UK-specific temperature unit
  const getTemperatureUnit = useCallback(() => {
    return isUKEnglish ? 'Celsius' : 'Fahrenheit';
  }, [isUKEnglish]);

  // Get UK-specific weight unit
  const getWeightUnit = useCallback(() => {
    return isUKEnglish ? 'Kilograms' : 'Pounds';
  }, [isUKEnglish]);

  // Get UK-specific distance unit
  const getDistanceUnit = useCallback(() => {
    return isUKEnglish ? 'Kilometres' : 'Miles';
  }, [isUKEnglish]);

  // Get UK-specific volume unit
  const getVolumeUnit = useCallback(() => {
    return isUKEnglish ? 'Litres' : 'Gallons';
  }, [isUKEnglish]);

  // Get UK-specific area unit
  const getAreaUnit = useCallback(() => {
    return isUKEnglish ? 'Square Metres' : 'Square Feet';
  }, [isUKEnglish]);

  // Get UK-specific speed unit
  const getSpeedUnit = useCallback(() => {
    return isUKEnglish ? 'Kilometres per Hour' : 'Miles per Hour';
  }, [isUKEnglish]);

  // Get UK-specific pressure unit
  const getPressureUnit = useCallback(() => {
    return isUKEnglish ? 'Bar' : 'PSI';
  }, [isUKEnglish]);

  // Get UK-specific energy unit
  const getEnergyUnit = useCallback(() => {
    return isUKEnglish ? 'Joules' : 'Calories';
  }, [isUKEnglish]);

  // Get UK-specific power unit
  const getPowerUnit = useCallback(() => {
    return isUKEnglish ? 'Watts' : 'Horsepower';
  }, [isUKEnglish]);

  // Get UK-specific data unit
  const getDataUnit = useCallback(() => {
    return isUKEnglish ? 'Bytes' : 'Bytes';
  }, [isUKEnglish]);

  // Get UK-specific angle unit
  const getAngleUnit = useCallback(() => {
    return isUKEnglish ? 'Degrees' : 'Degrees';
  }, [isUKEnglish]);

  // Get UK-specific frequency unit
  const getFrequencyUnit = useCallback(() => {
    return isUKEnglish ? 'Hertz' : 'Hertz';
  }, [isUKEnglish]);

  // Get UK-specific electric current unit
  const getElectricCurrentUnit = useCallback(() => {
    return isUKEnglish ? 'Amperes' : 'Amperes';
  }, [isUKEnglish]);

  // Get UK-specific voltage unit
  const getVoltageUnit = useCallback(() => {
    return isUKEnglish ? 'Volts' : 'Volts';
  }, [isUKEnglish]);

  // Get UK-specific resistance unit
  const getResistanceUnit = useCallback(() => {
    return isUKEnglish ? 'Ohms' : 'Ohms';
  }, [isUKEnglish]);

  // Get UK-specific capacitance unit
  const getCapacitanceUnit = useCallback(() => {
    return isUKEnglish ? 'Farads' : 'Farads';
  }, [isUKEnglish]);

  // Get UK-specific inductance unit
  const getInductanceUnit = useCallback(() => {
    return isUKEnglish ? 'Henries' : 'Henries';
  }, [isUKEnglish]);

  // Get UK-specific magnetic flux unit
  const getMagneticFluxUnit = useCallback(() => {
    return isUKEnglish ? 'Webers' : 'Webers';
  }, [isUKEnglish]);

  // Get UK-specific magnetic flux density unit
  const getMagneticFluxDensityUnit = useCallback(() => {
    return isUKEnglish ? 'Teslas' : 'Teslas';
  }, [isUKEnglish]);

  // Get UK-specific luminous flux unit
  const getLuminousFluxUnit = useCallback(() => {
    return isUKEnglish ? 'Lumens' : 'Lumens';
  }, [isUKEnglish]);

  // Get UK-specific illuminance unit
  const getIlluminanceUnit = useCallback(() => {
    return isUKEnglish ? 'Lux' : 'Lux';
  }, [isUKEnglish]);

  // Get UK-specific luminous intensity unit
  const getLuminousIntensityUnit = useCallback(() => {
    return isUKEnglish ? 'Candelas' : 'Candelas';
  }, [isUKEnglish]);

  // Get UK-specific solid angle unit
  const getSolidAngleUnit = useCallback(() => {
    return isUKEnglish ? 'Steradians' : 'Steradians';
  }, [isUKEnglish]);

  // Get UK-specific plane angle unit
  const getPlaneAngleUnit = useCallback(() => {
    return isUKEnglish ? 'Radians' : 'Radians';
  }, [isUKEnglish]);

  // Get UK-specific angular velocity unit
  const getAngularVelocityUnit = useCallback(() => {
    return isUKEnglish ? 'Radians per Second' : 'Radians per Second';
  }, [isUKEnglish]);

  // Get UK-specific angular acceleration unit
  const getAngularAccelerationUnit = useCallback(() => {
    return isUKEnglish ? 'Radians per Second Squared' : 'Radians per Second Squared';
  }, [isUKEnglish]);

  // Get UK-specific moment of force unit
  const getMomentOfForceUnit = useCallback(() => {
    return isUKEnglish ? 'Newton Metres' : 'Newton Metres';
  }, [isUKEnglish]);

  // Get UK-specific moment of inertia unit
  const getMomentOfInertiaUnit = useCallback(() => {
    return isUKEnglish ? 'Kilogram Square Metres' : 'Kilogram Square Metres';
  }, [isUKEnglish]);

  // Get UK-specific angular momentum unit
  const getAngularMomentumUnit = useCallback(() => {
    return isUKEnglish ? 'Kilogram Square Metres per Second' : 'Kilogram Square Metres per Second';
  }, [isUKEnglish]);

  // Get UK-specific torque unit
  const getTorqueUnit = useCallback(() => {
    return isUKEnglish ? 'Newton Metres' : 'Newton Metres';
  }, [isUKEnglish]);

  // Get UK-specific work unit
  const getWorkUnit = useCallback(() => {
    return isUKEnglish ? 'Joules' : 'Joules';
  }, [isUKEnglish]);

  // Get UK-specific heat unit
  const getHeatUnit = useCallback(() => {
    return isUKEnglish ? 'Joules' : 'Joules';
  }, [isUKEnglish]);

  // Get UK-specific entropy unit
  const getEntropyUnit = useCallback(() => {
    return isUKEnglish ? 'Joules per Kelvin' : 'Joules per Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific specific heat capacity unit
  const getSpecificHeatCapacityUnit = useCallback(() => {
    return isUKEnglish ? 'Joules per Kilogram Kelvin' : 'Joules per Kilogram Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal conductivity unit
  const getThermalConductivityUnit = useCallback(() => {
    return isUKEnglish ? 'Watts per Metre Kelvin' : 'Watts per Metre Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal diffusivity unit
  const getThermalDiffusivityUnit = useCallback(() => {
    return isUKEnglish ? 'Square Metres per Second' : 'Square Metres per Second';
  }, [isUKEnglish]);

  // Get UK-specific thermal expansion coefficient unit
  const getThermalExpansionCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Per Kelvin' : 'Per Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal resistance unit
  const getThermalResistanceUnit = useCallback(() => {
    return isUKEnglish ? 'Kelvins per Watt' : 'Kelvins per Watt';
  }, [isUKEnglish]);

  // Get UK-specific thermal resistivity unit
  const getThermalResistivityUnit = useCallback(() => {
    return isUKEnglish ? 'Metre Kelvins per Watt' : 'Metre Kelvins per Watt';
  }, [isUKEnglish]);

  // Get UK-specific thermal conductance unit
  const getThermalConductanceUnit = useCallback(() => {
    return isUKEnglish ? 'Watts per Kelvin' : 'Watts per Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal conductivity coefficient unit
  const getThermalConductivityCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Watts per Metre Kelvin' : 'Watts per Metre Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal diffusivity coefficient unit
  const getThermalDiffusivityCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Square Metres per Second' : 'Square Metres per Second';
  }, [isUKEnglish]);

  // Get UK-specific thermal expansion coefficient coefficient unit
  const getThermalExpansionCoefficientCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Per Kelvin' : 'Per Kelvin';
  }, [isUKEnglish]);

  // Get UK-specific thermal resistance coefficient unit
  const getThermalResistanceCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Kelvins per Watt' : 'Kelvins per Watt';
  }, [isUKEnglish]);

  // Get UK-specific thermal resistivity coefficient unit
  const getThermalResistivityCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Metre Kelvins per Watt' : 'Metre Kelvins per Watt';
  }, [isUKEnglish]);

  // Get UK-specific thermal conductance coefficient unit
  const getThermalConductanceCoefficientUnit = useCallback(() => {
    return isUKEnglish ? 'Watts per Kelvin' : 'Watts per Kelvin';
  }, [isUKEnglish]);

  return {
    // Language state
    currentLanguage,
    isUKEnglish,
    
    // Language switching functions
    switchToUKEnglish,
    switchToUSEnglish,
    switchLanguage,
    
    // Language information
    getAvailableLanguages,
    getCurrentLanguageInfo,
    isLanguageUKEnglish,
    
    // Text formatting
    getUKText,
    formatText,
    
    // Format information
    getDateFormat,
    getTimeFormat,
    getCurrencySymbol,
    getCurrencyCode,
    getNumberFormat,
    getPhoneFormat,
    getAddressFormat,
    getPostalCodeFormat,
    
    // Measurement units
    getMeasurementUnits,
    getTemperatureUnit,
    getWeightUnit,
    getDistanceUnit,
    getVolumeUnit,
    getAreaUnit,
    getSpeedUnit,
    getPressureUnit,
    getEnergyUnit,
    getPowerUnit,
    getDataUnit,
    getAngleUnit,
    getFrequencyUnit,
    getElectricCurrentUnit,
    getVoltageUnit,
    getResistanceUnit,
    getCapacitanceUnit,
    getInductanceUnit,
    getMagneticFluxUnit,
    getMagneticFluxDensityUnit,
    getLuminousFluxUnit,
    getIlluminanceUnit,
    getLuminousIntensityUnit,
    getSolidAngleUnit,
    getPlaneAngleUnit,
    getAngularVelocityUnit,
    getAngularAccelerationUnit,
    getMomentOfForceUnit,
    getMomentOfInertiaUnit,
    getAngularMomentumUnit,
    getTorqueUnit,
    getWorkUnit,
    getHeatUnit,
    getEntropyUnit,
    getSpecificHeatCapacityUnit,
    getThermalConductivityUnit,
    getThermalDiffusivityUnit,
    getThermalExpansionCoefficientUnit,
    getThermalResistanceUnit,
    getThermalResistivityUnit,
    getThermalConductanceUnit,
    getThermalConductivityCoefficientUnit,
    getThermalDiffusivityCoefficientUnit,
    getThermalExpansionCoefficientCoefficientUnit,
    getThermalResistanceCoefficientUnit,
    getThermalResistivityCoefficientUnit,
    getThermalConductanceCoefficientUnit,
    
    // UK formatting utilities
    formatUKDate,
    formatUKShortDate,
    formatUKLongDate,
    formatUKDateTime,
    formatUKCurrency,
    formatUKNumber,
    formatUKPercentage,
    getUKRelativeTime,
    formatUKFileSize,
    formatUKPhoneNumber,
    
    // Constants
    UK_LOCALE
  };
}
