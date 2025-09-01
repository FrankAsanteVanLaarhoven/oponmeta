import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Download,
  Sparkles,
  FileText,
  Layers,
  MessageSquare,
  BookOpen,
  Zap
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

interface InteractiveElement {
  id: string;
  type: 'flashcard' | 'tab' | 'accordion' | 'scorm' | 'discussion' | 'quiz';
  title: string;
  content: string;
  metadata?: any;
}

const InteractiveContentDesigner: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [contentType, setContentType] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [elements, setElements] = useState<InteractiveElement[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const contentTypes = [
    { value: 'flashcard', label: 'Flashcards', icon: <FileText className="w-4 h-4" /> },
    { value: 'tab', label: 'Interactive Tabs', icon: <Layers className="w-4 h-4" /> },
    { value: 'accordion', label: 'Accordion', icon: <BookOpen className="w-4 h-4" /> },
    { value: 'scorm', label: 'SCORM Package', icon: <Download className="w-4 h-4" /> },
    { value: 'discussion', label: 'Social Discussion', icon: <MessageSquare className="w-4 h-4" /> },
    { value: 'quiz', label: 'Interactive Quiz', icon: <Zap className="w-4 h-4" /> },
  ];

  const steps = [
    { id: 1, title: 'Content Type', description: 'Choose interactive content type' },
    { id: 2, title: 'AI Training', description: 'Train AI with your content' },
    { id: 3, title: 'Design & Structure', description: 'Design your interactive elements' },
    { id: 4, title: 'Generate & Review', description: 'Generate and review content' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addElement = () => {
    const newElement: InteractiveElement = {
      id: Date.now().toString(),
      type: contentType as any,
      title: '',
      content: '',
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
  };

  const updateElement = (id: string, field: keyof InteractiveElement, value: string) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, [field]: value } : el
    ));
  };

  const generateWithAI = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiGeneratedElements: InteractiveElement[] = [
      {
        id: 'ai-1',
        type: contentType as any,
        title: 'AI Generated Element 1',
        content: 'This is AI-generated content based on your description.',
      },
      {
        id: 'ai-2',
        type: contentType as any,
        title: 'AI Generated Element 2',
        content: 'Another AI-generated element with relevant content.',
      },
    ];
    
    setElements([...elements, ...aiGeneratedElements]);
    setIsGenerating(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium">
                {t('contentTitle')}
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('enterContentTitle')}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-base font-medium">
                {t('description')}
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('describeYourInteractiveContent')}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">
                {t('selectContentType')}
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {contentTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      contentType === type.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setContentType(type.value)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        {type.icon}
                        <div>
                          <p className="font-medium">{type.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>{t('aiTraining')}</span>
                </CardTitle>
                <CardDescription>
                  {t('trainAIWithYourContent')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="training-content" className="text-base font-medium">
                    {t('trainingContent')}
                  </Label>
                  <Textarea
                    id="training-content"
                    placeholder={t('pasteOrUploadContentForAI')}
                    className="mt-2"
                    rows={6}
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    {t('uploadFile')}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {t('pasteFromWebsite')}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button onClick={generateWithAI} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        {t('generateWithAI')}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{t('designElements')}</h3>
              <Button onClick={addElement} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {t('addElement')}
              </Button>
            </div>

            <div className="space-y-4">
              {elements.map((element, index) => (
                <Card key={element.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="secondary">
                        {t(element.type)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeElement(element.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">
                          {t('title')}
                        </Label>
                        <Input
                          value={element.title}
                          onChange={(e) => updateElement(element.id, 'title', e.target.value)}
                          placeholder={t('enterElementTitle')}
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium">
                          {t('content')}
                        </Label>
                        <Textarea
                          value={element.content}
                          onChange={(e) => updateElement(element.id, 'content', e.target.value)}
                          placeholder={t('enterElementContent')}
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {elements.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('noElementsYet')}</p>
                <p className="text-sm">{t('addYourFirstElement')}</p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">{t('reviewAndExport')}</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {previewMode ? t('editMode') : t('previewMode')}
                </Button>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  {t('saveContent')}
                </Button>
              </div>
            </div>

            {previewMode ? (
              <div className="border rounded-lg p-6 bg-gray-50">
                <h4 className="text-xl font-semibold mb-4">{title}</h4>
                <p className="text-gray-600 mb-6">{description}</p>
                
                <div className="space-y-4">
                  {elements.map((element) => (
                    <div key={element.id} className="border rounded p-4 bg-white">
                      <h5 className="font-medium mb-2">{element.title}</h5>
                      <p className="text-gray-600">{element.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contentSummary')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">{t('title')}:</span> {title}
                      </div>
                      <div>
                        <span className="font-medium">{t('type')}:</span> {contentType}
                      </div>
                      <div>
                        <span className="font-medium">{t('elements')}:</span> {elements.length}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    {t('exportSCORM')}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {t('exportHTML')}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    {t('exportJSON')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <DashboardBackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('interactiveContentDesigner')}</h1>
        <p className="text-gray-600">
          {t('createEngagingInteractiveContent')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          {steps.map((step) => (
            <div key={step.id} className="text-center flex-1">
              <div className={`font-medium ${
                currentStep === step.id ? 'text-blue-600' : ''
              }`}>
                {step.title}
              </div>
              <div className="text-xs">{step.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {t('previous')}
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length}
        >
          {currentStep === steps.length ? t('finish') : (
            <>
              {t('next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default InteractiveContentDesigner; 