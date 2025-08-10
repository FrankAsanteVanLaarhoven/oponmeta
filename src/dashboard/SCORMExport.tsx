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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  Upload, 
  Settings, 
  FileText, 
  Package, 
  CheckCircle, 
  AlertCircle,
  Users,
  BookOpen,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Save,
  Trash2,
  Plus,
  Eye,
  ExternalLink,
  Info,
  HelpCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  lessons: number;
  duration: string;
  lastModified: Date;
  status: 'draft' | 'published' | 'archived';
}

interface SCORMSettings {
  version: string;
  title: string;
  description: string;
  identifier: string;
  masteryScore: number;
  timeLimitAction: string;
  launchData: string;
  completionThreshold: number;
  includeNavigation: boolean;
  includeProgress: boolean;
  includeBookmarks: boolean;
  includeNotes: boolean;
  includeGlossary: boolean;
  includeResources: boolean;
  includeAssessments: boolean;
  includeCertificates: boolean;
  customCSS: string;
  customJavaScript: string;
}

const SCORMExport: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [exportSettings, setExportSettings] = useState<SCORMSettings>({
    version: '1.2',
    title: '',
    description: '',
    identifier: '',
    masteryScore: 80,
    timeLimitAction: 'continue',
    launchData: '',
    completionThreshold: 100,
    includeNavigation: true,
    includeProgress: true,
    includeBookmarks: true,
    includeNotes: true,
    includeGlossary: true,
    includeResources: true,
    includeAssessments: true,
    includeCertificates: true,
    customCSS: '',
    customJavaScript: '',
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportHistory, setExportHistory] = useState<any[]>([]);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to AI',
      description: 'Learn the fundamentals of artificial intelligence',
      modules: 5,
      lessons: 25,
      duration: '8 hours',
      lastModified: new Date('2024-01-15'),
      status: 'published',
    },
    {
      id: '2',
      title: 'Business Management',
      description: 'Essential business management principles',
      modules: 8,
      lessons: 40,
      duration: '12 hours',
      lastModified: new Date('2024-01-20'),
      status: 'published',
    },
    {
      id: '3',
      title: 'Web Development',
      description: 'Modern web development techniques',
      modules: 6,
      lessons: 30,
      duration: '10 hours',
      lastModified: new Date('2024-01-18'),
      status: 'published',
    },
    {
      id: '4',
      title: 'Data Science',
      description: 'Data analysis and visualization',
      modules: 7,
      lessons: 35,
      duration: '15 hours',
      lastModified: new Date('2024-01-22'),
      status: 'draft',
    },
  ];

  const scormVersions = [
    { value: '1.2', label: 'SCORM 1.2' },
    { value: '2004', label: 'SCORM 2004 (4th Edition)' },
    { value: '1.3', label: 'SCORM 1.3' },
  ];

  const timeLimitActions = [
    { value: 'continue', label: 'Continue' },
    { value: 'exit', label: 'Exit' },
    { value: 'restart', label: 'Restart' },
  ];

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSettingChange = (key: keyof SCORMSettings, value: any) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  const startExport = async () => {
    if (selectedCourses.length === 0) return;

    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          
          // Add to export history
          const exportRecord = {
            id: Date.now().toString(),
            courses: selectedCourses,
            settings: exportSettings,
            timestamp: new Date(),
            status: 'completed',
            fileSize: '15.2 MB',
          };
          setExportHistory(prev => [exportRecord, ...prev]);
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const downloadSCORM = (exportId: string) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `scorm-package-${exportId}.zip`;
    link.click();
  };

  const renderCoursesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{t('selectCourses')}</h3>
          <p className="text-sm text-gray-600">
            {selectedCourses.length} {t('coursesSelected')}
          </p>
        </div>
        <Button
          onClick={startExport}
          disabled={selectedCourses.length === 0 || isExporting}
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              {t('exporting')}
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              {t('exportSCORM')}
            </>
          )}
        </Button>
      </div>

      {isExporting && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('exportProgress')}</span>
                <span>{exportProgress}%</span>
              </div>
              <Progress value={exportProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCourses.includes(course.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleCourseSelection(course.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                </div>
                <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.modules} {t('modules')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{course.lessons} {t('lessons')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Info className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{t('published')}</span>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                {t('lastModified')}: {course.lastModified.toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('basicSettings')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scorm-version">{t('scormVersion')}</Label>
              <Select value={exportSettings.version} onValueChange={(value) => handleSettingChange('version', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scormVersions.map((version) => (
                    <SelectItem key={version.value} value={version.value}>
                      {version.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="mastery-score">{t('masteryScore')} (%)</Label>
              <Input
                id="mastery-score"
                type="number"
                min="0"
                max="100"
                value={exportSettings.masteryScore}
                onChange={(e) => handleSettingChange('masteryScore', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="scorm-title">{t('packageTitle')}</Label>
            <Input
              id="scorm-title"
              value={exportSettings.title}
              onChange={(e) => handleSettingChange('title', e.target.value)}
              placeholder={t('enterPackageTitle')}
            />
          </div>

          <div>
            <Label htmlFor="scorm-description">{t('packageDescription')}</Label>
            <Textarea
              id="scorm-description"
              value={exportSettings.description}
              onChange={(e) => handleSettingChange('description', e.target.value)}
              placeholder={t('enterPackageDescription')}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="identifier">{t('identifier')}</Label>
            <Input
              id="identifier"
              value={exportSettings.identifier}
              onChange={(e) => handleSettingChange('identifier', e.target.value)}
              placeholder={t('enterIdentifier')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('advancedSettings')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time-limit-action">{t('timeLimitAction')}</Label>
              <Select value={exportSettings.timeLimitAction} onValueChange={(value) => handleSettingChange('timeLimitAction', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeLimitActions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="completion-threshold">{t('completionThreshold')} (%)</Label>
              <Input
                id="completion-threshold"
                type="number"
                min="0"
                max="100"
                value={exportSettings.completionThreshold}
                onChange={(e) => handleSettingChange('completionThreshold', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="launch-data">{t('launchData')}</Label>
            <Textarea
              id="launch-data"
              value={exportSettings.launchData}
              onChange={(e) => handleSettingChange('launchData', e.target.value)}
              placeholder={t('enterLaunchData')}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Content Options */}
      <Card>
        <CardHeader>
          <CardTitle>{t('contentOptions')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeNavigation')}</Label>
                <p className="text-sm text-gray-600">{t('includeNavigationDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeNavigation}
                onCheckedChange={(checked) => handleSettingChange('includeNavigation', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeProgress')}</Label>
                <p className="text-sm text-gray-600">{t('includeProgressDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeProgress}
                onCheckedChange={(checked) => handleSettingChange('includeProgress', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeBookmarks')}</Label>
                <p className="text-sm text-gray-600">{t('includeBookmarksDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeBookmarks}
                onCheckedChange={(checked) => handleSettingChange('includeBookmarks', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeNotes')}</Label>
                <p className="text-sm text-gray-600">{t('includeNotesDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeNotes}
                onCheckedChange={(checked) => handleSettingChange('includeNotes', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeGlossary')}</Label>
                <p className="text-sm text-gray-600">{t('includeGlossaryDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeGlossary}
                onCheckedChange={(checked) => handleSettingChange('includeGlossary', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeResources')}</Label>
                <p className="text-sm text-gray-600">{t('includeResourcesDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeResources}
                onCheckedChange={(checked) => handleSettingChange('includeResources', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeAssessments')}</Label>
                <p className="text-sm text-gray-600">{t('includeAssessmentsDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeAssessments}
                onCheckedChange={(checked) => handleSettingChange('includeAssessments', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">{t('includeCertificates')}</Label>
                <p className="text-sm text-gray-600">{t('includeCertificatesDescription')}</p>
              </div>
              <Switch
                checked={exportSettings.includeCertificates}
                onCheckedChange={(checked) => handleSettingChange('includeCertificates', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Code */}
      <Card>
        <CardHeader>
          <CardTitle>{t('customCode')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="custom-css">{t('customCSS')}</Label>
            <Textarea
              id="custom-css"
              value={exportSettings.customCSS}
              onChange={(e) => handleSettingChange('customCSS', e.target.value)}
              placeholder="/* Your custom CSS here */"
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          <div>
            <Label htmlFor="custom-javascript">{t('customJavaScript')}</Label>
            <Textarea
              id="custom-javascript"
              value={exportSettings.customJavaScript}
              onChange={(e) => handleSettingChange('customJavaScript', e.target.value)}
              placeholder="// Your custom JavaScript here"
              rows={4}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t('exportHistory')}</h3>
        <Button variant="outline" size="sm">
          <Trash2 className="w-4 h-4 mr-2" />
          {t('clearHistory')}
        </Button>
      </div>

      <div className="space-y-4">
        {exportHistory.map((exportRecord) => (
          <Card key={exportRecord.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium">SCORM Package {exportRecord.id}</h4>
                    <Badge variant="outline" className="text-xs">
                      {exportRecord.fileSize}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>{t('courses')}:</strong> {exportRecord.courses.length}</p>
                    <p><strong>{t('version')}:</strong> SCORM {exportRecord.settings.version}</p>
                    <p><strong>{t('exported')}:</strong> {exportRecord.timestamp.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => downloadSCORM(exportRecord.id)}>
                    <Download className="w-4 h-4 mr-2" />
                    {t('download')}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {t('preview')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {exportHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>{t('noExportHistory')}</p>
            <p className="text-sm">{t('exportHistoryDescription')}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <DashboardBackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('scormExport')}</h1>
        <p className="text-gray-600">
          {t('exportCoursesAsSCORMPackages')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>{t('courses')}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>{t('settings')}</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>{t('history')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          {renderCoursesTab()}
        </TabsContent>

        <TabsContent value="settings">
          {renderSettingsTab()}
        </TabsContent>

        <TabsContent value="history">
          {renderHistoryTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SCORMExport; 