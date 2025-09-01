import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { 
  Globe, 
  Languages, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Download,
  Settings,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CompactLanguageSelector, SearchableLanguageSelector } from './LanguageSelector';
import { LocalizedAsset, LocalizedVideo, LocalizedAudio, LocalizedDocument } from './ui/LocalizedAsset';
import { languageContentManager } from '../utils/languageContentManager';
import { translationWorkflow } from '../utils/translationWorkflow';

const LocalizationDemo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { currentLanguage, supportedLanguages, changeLanguage, isRTL } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [workflowStatus, setWorkflowStatus] = useState<string>('');
  const [assetStats, setAssetStats] = useState<any>(null);
  const [missingAssets, setMissingAssets] = useState<string[]>([]);

  // Initialize translation workflow
  const workflow = translationWorkflow;

  useEffect(() => {
    // Update asset statistics
    setAssetStats(languageContentManager.getAssetStatistics());
    setMissingAssets(languageContentManager.getMissingAssets(currentLanguage));
  }, [currentLanguage]);

  const handleLanguageChange = async (language: string) => {
    setSelectedLanguage(language);
    await changeLanguage(language);
    
    // Preload assets for the new language
    try {
      await languageContentManager.preloadAssets(language as any);
      setWorkflowStatus(`Assets preloaded for ${language}`);
    } catch (error) {
      setWorkflowStatus(`Failed to preload assets for ${language}`);
    }
  };

  const runTranslationWorkflow = async () => {
    setWorkflowStatus('Starting translation workflow...');
    
    try {
      // Create a batch of translations
      const batchId = await workflow.createBatch('Demo Translation Batch', [
        {
          content: 'Welcome to OPONM Learning Platform',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          context: 'homepage',
          priority: 'high'
        },
        {
          content: 'The world\'s leading platform for professional development',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          context: 'homepage',
          priority: 'high'
        },
        {
          content: 'AI-powered learning, personalized courses, expert instructors',
          sourceLanguage: 'en',
          targetLanguage: 'es',
          context: 'homepage',
          priority: 'high'
        }
      ]);

      setWorkflowStatus(`Created batch: ${batchId}`);

      // Get batch status
      const batchStatus = workflow.getBatchStatus(batchId);
      if (batchStatus) {
        setWorkflowStatus(`Batch status: ${batchStatus.status}, Jobs: ${batchStatus.totalJobs}`);
      }

      // Get workflow statistics
      const stats = workflow.getStatistics();
      setWorkflowStatus(`Workflow stats - Total: ${stats.totalJobs}, Success rate: ${stats.successRate.toFixed(1)}%`);

    } catch (error) {
      setWorkflowStatus(`Workflow error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearWorkflowStatus = () => {
    setWorkflowStatus('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Helmet>
        <title>{t('localization.demo.title', 'Localization Demo - OPONM')}</title>
        <meta name="description" content={t('localization.demo.description', 'Comprehensive demonstration of OPONM\'s localization features')} />
        <meta name="keywords" content={t('localization.demo.keywords', 'localization, internationalization, translation, multilingual')} />
        
        {/* Language-specific meta tags */}
        <meta property="og:locale" content={currentLanguage} />
        <meta property="og:locale:alternate" content={Object.keys(supportedLanguages).join(',')} />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": t('localization.demo.title', 'Localization Demo'),
            "description": t('localization.demo.description', 'Comprehensive demonstration of OPONM\'s localization features'),
            "inLanguage": currentLanguage,
            "availableLanguage": Object.keys(supportedLanguages)
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('localization.demo.title', '🌍 Localization Demo')}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {t('localization.demo.subtitle', 'Comprehensive demonstration of OPONM\'s localization features')}
          </p>
          
          {/* Language Selector */}
          <div className="flex justify-center mb-6">
            <CompactLanguageSelector
              className="bg-white shadow-lg rounded-lg"
              size="lg"
            />
          </div>

          {/* Current Language Info */}
          <div className="bg-white rounded-lg p-4 shadow-md inline-block">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {t('localization.demo.currentLanguage', 'Current Language')}: 
              </span>
              <span className="font-bold text-blue-600">
                {supportedLanguages[currentLanguage]?.name} ({currentLanguage.toUpperCase()})
              </span>
              {isRTL && (
                <span className="text-orange-600 text-sm">RTL</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Language Features */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Languages className="w-6 h-6 mr-2 text-blue-600" />
              {t('localization.demo.languageFeatures', 'Language Features')}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{t('localization.demo.supportedLanguages', 'Supported Languages')}</span>
                <span className="text-blue-600 font-bold">{Object.keys(supportedLanguages).length}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{t('localization.demo.rtlSupport', 'RTL Support')}</span>
                <span className={`font-bold ${isRTL ? 'text-green-600' : 'text-gray-400'}`}>
                  {isRTL ? '✓' : '✗'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{t('localization.demo.autoDetection', 'Auto Detection')}</span>
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </div>

          {/* Translation Workflow */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <RefreshCw className="w-6 h-6 mr-2 text-green-600" />
              {t('localization.demo.translationWorkflow', 'Translation Workflow')}
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={runTranslationWorkflow}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('localization.demo.runWorkflow', 'Run Demo Workflow')}
              </button>
              
              {workflowStatus && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800">{workflowStatus}</span>
                    <button
                      onClick={clearWorkflowStatus}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Asset Management */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Image className="w-6 h-6 mr-2 text-purple-600" />
            {t('localization.demo.assetManagement', 'Asset Management')}
          </h2>
          
          {assetStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{assetStats.totalAssets}</div>
                <div className="text-sm text-gray-600">{t('localization.demo.totalAssets', 'Total Assets')}</div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {assetStats.assetsByLanguage[currentLanguage] || 0}
                </div>
                <div className="text-sm text-gray-600">
                  {t('localization.demo.currentLanguageAssets', 'Current Language Assets')}
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{missingAssets.length}</div>
                <div className="text-sm text-gray-600">{t('localization.demo.missingAssets', 'Missing Assets')}</div>
              </div>
            </div>
          )}

          {/* Asset Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Image className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium">{t('localization.demo.images', 'Images')}</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {assetStats?.assetsByType?.image || 0}
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Video className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium">{t('localization.demo.videos', 'Videos')}</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {assetStats?.assetsByType?.video || 0}
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Music className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium">{t('localization.demo.audio', 'Audio')}</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {assetStats?.assetsByType?.audio || 0}
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium">{t('localization.demo.documents', 'Documents')}</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                {assetStats?.assetsByType?.document || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Localized Assets Demo */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Image className="w-6 h-6 mr-2 text-indigo-600" />
            {t('localization.demo.localizedAssets', 'Localized Assets Demo')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Hero Background */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t('localization.demo.heroBackground', 'Hero Background')}</h3>
              <LocalizedAsset
                assetId="hero-bg"
                className="w-full h-32 object-cover rounded-lg"
                fallbackUrl="/assets/hero/hero-bg-en.jpg"
                showCaption={true}
              />
            </div>
            
            {/* Course Thumbnail */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t('localization.demo.courseThumbnail', 'Course Thumbnail')}</h3>
              <LocalizedAsset
                assetId="course-react"
                className="w-full h-32 object-cover rounded-lg"
                fallbackUrl="/assets/courses/react-course-en.jpg"
                showCaption={true}
              />
            </div>
            
            {/* Testimonial Image */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{t('localization.demo.testimonialImage', 'Testimonial Image')}</h3>
              <LocalizedAsset
                assetId="testimonial-1"
                className="w-full h-32 object-cover rounded-lg"
                fallbackUrl="/assets/testimonials/testimonial-1-en.jpg"
                showCaption={true}
              />
            </div>
          </div>
        </div>

        {/* SEO and Meta Tags */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-teal-600" />
            {t('localization.demo.seoMetaTags', 'SEO & Meta Tags')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t('localization.demo.currentMetaTags', 'Current Meta Tags')}</h3>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-medium">Title:</span> {t('localization.demo.title', 'Localization Demo - OPONM')}
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-medium">Language:</span> {currentLanguage}
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-medium">Direction:</span> {isRTL ? 'RTL' : 'LTR'}
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="font-medium">Alternate Languages:</span> {Object.keys(supportedLanguages).join(', ')}
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">{t('localization.demo.structuredData', 'Structured Data')}</h3>
              <div className="p-3 bg-blue-50 rounded-lg text-sm">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": t('localization.demo.title', 'Localization Demo'),
                    "inLanguage": currentLanguage,
                    "availableLanguage": Object.keys(supportedLanguages)
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Language Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
            {t('localization.demo.languageStatistics', 'Language Statistics')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(supportedLanguages).map(([code, lang]) => (
              <div key={code} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{lang.flag}</span>
                    <div>
                      <div className="font-semibold">{lang.name}</div>
                      <div className="text-sm text-gray-500">{lang.nativeName}</div>
                    </div>
                  </div>
                  {code === currentLanguage && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                
                <div className="text-sm text-gray-600">
                  <div>Direction: {lang.direction.toUpperCase()}</div>
                  <div>Assets: {assetStats?.assetsByLanguage[code] || 0}</div>
                  {code === currentLanguage && missingAssets.length > 0 && (
                    <div className="text-orange-600">
                      Missing: {missingAssets.length}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">
              {t('localization.demo.demoNote', 'This is a demonstration of OPONM\'s localization features')}
            </span>
          </div>
          <p className="text-gray-600">
            {t('localization.demo.demoDescription', 'Switch languages to see how content, assets, and meta tags change dynamically')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocalizationDemo;
