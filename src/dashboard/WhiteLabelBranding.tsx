import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Upload, 
  Download, 
  Save, 
  Eye, 
  Settings,
  Globe,
  Image,
  Type,
  Layout,
  Shield,
  Users,
  Building,
  Check,
  X,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

interface BrandingSettings {
  companyName: string;
  tagline: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  customDomain: string;
  emailDomain: string;
  supportEmail: string;
  privacyPolicy: string;
  termsOfService: string;
  customCSS: string;
  enableWhiteLabel: boolean;
  removePlatformBranding: boolean;
  customFooter: string;
}

const WhiteLabelBranding: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('branding');
  const [settings, setSettings] = useState<BrandingSettings>({
    companyName: 'Your Company',
    tagline: 'Your Learning Platform',
    logo: '',
    favicon: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#F59E0B',
    fontFamily: 'Inter',
    customDomain: '',
    emailDomain: '',
    supportEmail: '',
    privacyPolicy: '',
    termsOfService: '',
    customCSS: '',
    enableWhiteLabel: false,
    removePlatformBranding: false,
    customFooter: '',
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fontOptions = [
    { value: 'Inter', label: 'Inter' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Lato', label: 'Lato' },
  ];

  const colorPresets = [
    { name: 'Blue', primary: '#3B82F6', secondary: '#1E40AF', accent: '#F59E0B' },
    { name: 'Green', primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
    { name: 'Purple', primary: '#8B5CF6', secondary: '#7C3AED', accent: '#F59E0B' },
    { name: 'Red', primary: '#EF4444', secondary: '#DC2626', accent: '#F59E0B' },
    { name: 'Orange', primary: '#F97316', secondary: '#EA580C', accent: '#F59E0B' },
  ];

  const handleSettingChange = (key: keyof BrandingSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSettingChange('logo', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleSettingChange('favicon', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    handleSettingChange('primaryColor', preset.primary);
    handleSettingChange('secondaryColor', preset.secondary);
    handleSettingChange('accentColor', preset.accent);
  };

  const saveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
  };

  const exportBranding = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'branding-settings.json';
    link.click();
  };

  const renderBrandingTab = () => (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>{t('companyInformation')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="company-name">{t('companyName')}</Label>
              <Input
                id="company-name"
                value={settings.companyName}
                onChange={(e) => handleSettingChange('companyName', e.target.value)}
                placeholder={t('enterCompanyName')}
              />
            </div>
            <div>
              <Label htmlFor="tagline">{t('tagline')}</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(e) => handleSettingChange('tagline', e.target.value)}
                placeholder={t('enterTagline')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logo & Favicon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>{t('logoAndFavicon')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>{t('companyLogo')}</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {settings.logo ? (
                  <div className="space-y-2">
                    <img src={settings.logo} alt="Logo" className="max-h-20 mx-auto" />
                    <Button variant="outline" size="sm" onClick={() => handleSettingChange('logo', '')}>
                      <X className="w-4 h-4 mr-2" />
                      {t('remove')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">{t('uploadLogo')}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('logo-upload')?.click()}>
                      {t('chooseFile')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>{t('favicon')}</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {settings.favicon ? (
                  <div className="space-y-2">
                    <img src={settings.favicon} alt="Favicon" className="w-8 h-8 mx-auto" />
                    <Button variant="outline" size="sm" onClick={() => handleSettingChange('favicon', '')}>
                      <X className="w-4 h-4 mr-2" />
                      {t('remove')}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Image className="w-8 h-8 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">{t('uploadFavicon')}</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFaviconUpload}
                      className="hidden"
                      id="favicon-upload"
                    />
                    <Button variant="outline" size="sm" onClick={() => document.getElementById('favicon-upload')?.click()}>
                      {t('chooseFile')}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
                            <span>{t('colourScheme')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Presets */}
          <div>
                            <Label className="text-sm font-medium mb-3 block">{t('colourPresets')}</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {colorPresets.map((preset) => (
                <div
                  key={preset.name}
                  className="border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => applyColorPreset(preset)}
                >
                  <div className="flex space-x-1 mb-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.primary }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.secondary }} />
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: preset.accent }} />
                  </div>
                  <p className="text-xs font-medium">{preset.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                              <Label htmlFor="primary-color">{t('primaryColour')}</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="primary-color"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
                              <Label htmlFor="secondary-color">{t('secondaryColour')}</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="secondary-color"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  placeholder="#1E40AF"
                />
              </div>
            </div>

            <div>
                              <Label htmlFor="accent-color">{t('accentColour')}</Label>
              <div className="flex space-x-2 mt-1">
                <Input
                  id="accent-color"
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="w-12 h-10 p-1"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  placeholder="#F59E0B"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Type className="w-5 h-5" />
            <span>{t('typography')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="font-family">{t('fontFamily')}</Label>
            <Select value={settings.fontFamily} onValueChange={(value) => handleSettingChange('fontFamily', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDomainTab = () => (
    <div className="space-y-6">
      {/* Custom Domain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>{t('customDomain')}</span>
          </CardTitle>
          <CardDescription>
            {t('customDomainDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-domain">{t('domainName')}</Label>
            <div className="flex space-x-2 mt-1">
              <Input
                id="custom-domain"
                value={settings.customDomain}
                onChange={(e) => handleSettingChange('customDomain', e.target.value)}
                placeholder="app.yourcompany.com"
              />
              <Button variant="outline">
                <Check className="w-4 h-4 mr-2" />
                {t('verify')}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="email-domain">{t('emailDomain')}</Label>
            <Input
              id="email-domain"
              value={settings.emailDomain}
              onChange={(e) => handleSettingChange('emailDomain', e.target.value)}
              placeholder="yourcompany.com"
            />
          </div>

          <div>
            <Label htmlFor="support-email">{t('supportEmail')}</Label>
            <Input
              id="support-email"
              value={settings.supportEmail}
              onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
              placeholder="support@yourcompany.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Legal Pages */}
      <Card>
        <CardHeader>
          <CardTitle>{t('legalPages')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="privacy-policy">{t('privacyPolicy')}</Label>
            <Textarea
              id="privacy-policy"
              value={settings.privacyPolicy}
              onChange={(e) => handleSettingChange('privacyPolicy', e.target.value)}
              placeholder={t('enterPrivacyPolicy')}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="terms-of-service">{t('termsOfService')}</Label>
            <Textarea
              id="terms-of-service"
              value={settings.termsOfService}
              onChange={(e) => handleSettingChange('termsOfService', e.target.value)}
              placeholder={t('enterTermsOfService')}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="space-y-6">
      {/* White Label Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>{t('whiteLabelSettings')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">{t('enableWhiteLabel')}</Label>
              <p className="text-sm text-gray-600">{t('enableWhiteLabelDescription')}</p>
            </div>
            <Switch
              checked={settings.enableWhiteLabel}
              onCheckedChange={(checked) => handleSettingChange('enableWhiteLabel', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">{t('removePlatformBranding')}</Label>
              <p className="text-sm text-gray-600">{t('removePlatformBrandingDescription')}</p>
            </div>
            <Switch
              checked={settings.removePlatformBranding}
              onCheckedChange={(checked) => handleSettingChange('removePlatformBranding', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Custom CSS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layout className="w-5 h-5" />
            <span>{t('customCSS')}</span>
          </CardTitle>
          <CardDescription>
            {t('customCSSDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.customCSS}
            onChange={(e) => handleSettingChange('customCSS', e.target.value)}
            placeholder="/* Your custom CSS here */"
            rows={8}
            className="font-mono text-sm"
          />
        </CardContent>
      </Card>

      {/* Custom Footer */}
      <Card>
        <CardHeader>
          <CardTitle>{t('customFooter')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={settings.customFooter}
            onChange={(e) => handleSettingChange('customFooter', e.target.value)}
            placeholder={t('enterCustomFooter')}
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderPreviewTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('preview')}</h3>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportBranding}>
            <Download className="w-4 h-4 mr-2" />
            {t('exportSettings')}
          </Button>
          <Button onClick={saveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                {t('saving')}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {t('saveSettings')}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Preview Header */}
      <div 
        className="border rounded-lg p-6"
        style={{ 
          backgroundColor: settings.primaryColor,
          color: 'white',
          fontFamily: settings.fontFamily
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="h-8 w-auto" />
            )}
            <div>
              <h1 className="text-xl font-bold">{settings.companyName}</h1>
              <p className="text-sm opacity-90">{settings.tagline}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Home</span>
            <span>Courses</span>
            <span>About</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: settings.primaryColor }}>
          {t('welcomeTo')} {settings.companyName}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('previewContentDescription')}
        </p>
        <Button style={{ backgroundColor: settings.accentColor }}>
          {t('getStarted')}
        </Button>
      </div>

      {/* Preview Footer */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <div className="text-center">
          {settings.customFooter ? (
            <div dangerouslySetInnerHTML={{ __html: settings.customFooter }} />
          ) : (
            <p className="text-gray-600">
              © 2024 {settings.companyName}. {t('allRightsReserved')}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <DashboardBackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('whiteLabelBranding')}</h1>
        <p className="text-gray-600">
                          {t('customiseYourPlatformBranding')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>{t('branding')}</span>
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>{t('domain')}</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>{t('advanced')}</span>
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>{t('preview')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          {renderBrandingTab()}
        </TabsContent>

        <TabsContent value="domain">
          {renderDomainTab()}
        </TabsContent>

        <TabsContent value="advanced">
          {renderAdvancedTab()}
        </TabsContent>

        <TabsContent value="preview">
          {renderPreviewTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhiteLabelBranding; 