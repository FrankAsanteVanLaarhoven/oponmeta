import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/context/AppContext';
import { useNotification } from '@/context/NotificationContext';
import { ArrowLeft, Plus, Sparkles, Mic as MicIcon, Globe, BookOpen, Users } from 'lucide-react';

interface CompanionFormData {
  name: string;
  topic: string;
  subject: string;
  style: string;
  voice: string;
  description: string;
  languages: string[];
  avatar: string;
  expertise: string;
  isPro: boolean;
}

const CreateCompanion: React.FC = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { addCompanion } = useAppContext();

  const [formData, setFormData] = useState<CompanionFormData>({
    name: '',
    topic: '',
    subject: '',
    style: '',
    voice: '',
    description: '',
    languages: [],
    avatar: '🧑‍💼',
    expertise: '',
    isPro: false
  });

  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SUBJECT_OPTIONS = [
    { value: "business", label: "Business", icon: "💼", color: "#FFB3BA" },
    { value: "sports", label: "Sports", icon: "⚽", color: "#FFD700" },
    { value: "language", label: "Language", icon: "🗣️", color: "#BDE7FF" },
    { value: "science", label: "Science", icon: "🔬", color: "#E5D0FF" },
    { value: "coding", label: "Coding", icon: "💻", color: "#FFC8E4" },
    { value: "health", label: "Health", icon: "🏥", color: "#98FB98" },
    { value: "mathematics", label: "Mathematics", icon: "📐", color: "#FFDA6E" },
    { value: "history", label: "History", icon: "📚", color: "#FFECC8" },
    { value: "economics", label: "Economics", icon: "💰", color: "#C8FFDF" },
    { value: "technology", label: "Technology", icon: "🚀", color: "#B8E6B8" },
    { value: "arts", label: "Arts", icon: "🎨", color: "#DDA0DD" }
  ];

  const STYLE_OPTIONS = [
    { value: "formal", label: "Formal", description: "Professional and structured" },
    { value: "casual", label: "Casual", description: "Friendly and relaxed" },
    { value: "academic", label: "Academic", description: "Educational and detailed" },
    { value: "friendly", label: "Friendly", description: "Warm and approachable" },
    { value: "professional", label: "Professional", description: "Business-oriented" }
  ];

  const VOICE_OPTIONS = [
    { value: "male", label: "Male", description: "Deep and authoritative" },
    { value: "female", label: "Female", description: "Clear and engaging" },
    { value: "neutral", label: "Neutral", description: "Balanced and versatile" }
  ];

  const LANGUAGE_OPTIONS = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" }
  ];

  const AVATAR_OPTIONS = [
    // Professional avatars
    "🧑‍💼", "👩‍💼", "👨‍💼", "👩‍💼",
    // Teacher avatars  
    "👨‍🏫", "👩‍🏫", "🧑‍🏫", "👨‍🏫",
    // Scientist avatars
    "🧑‍🔬", "👩‍🔬", "👨‍🔬", "👩‍🔬",
    // Tech avatars
    "👨‍💻", "👩‍💻", "🧑‍💻", "👨‍💻",
    // Medical avatars
    "🧑‍⚕️", "👩‍⚕️", "👨‍⚕️", "👩‍⚕️",
    // Creative avatars
    "👨‍🎨", "👩‍🎨", "🧑‍🎨", "👨‍🎨",
    // Fitness avatars
    "🧑‍🏋️", "👩‍🏋️", "👨‍🏋️", "👩‍🏋️",
    // Performance avatars
    "🧑‍🎭", "👩‍🎭", "👨‍🎭", "👩‍🎭",
    // Black/diverse avatars
    "👨🏿‍💼", "👩🏿‍💼", "👨🏿‍🏫", "👩🏿‍🏫", "👨🏿‍🔬", "👩🏿‍🔬", "👨🏿‍💻", "👩🏿‍💻",
    "👨🏿‍⚕️", "👩🏿‍⚕️", "👨🏿‍🎨", "👩🏿‍🎨", "👨🏿‍🏋️", "👩🏿‍🏋️", "👨🏿‍🎭", "👩🏿‍🎭"
  ];

  const handleInputChange = (field: keyof CompanionFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addLanguage = () => {
    if (currentLanguage && !formData.languages.includes(currentLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage]
      }));
      setCurrentLanguage('');
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    if (!formData.languages.includes(languageCode)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, languageCode]
      }));
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== language)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.name.trim()) {
      showNotification({
        type: 'error',
        title: 'Name Required',
        message: 'Please enter a companion name.'
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.topic.trim()) {
      showNotification({
        type: 'error',
        title: 'Topic Required',
        message: 'Please enter a topic.'
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.subject) {
      showNotification({
        type: 'error',
        title: 'Subject Required',
        message: 'Please select a subject.'
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.style) {
      showNotification({
        type: 'error',
        title: 'Style Required',
        message: 'Please select a style.'
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.voice) {
      showNotification({
        type: 'error',
        title: 'Voice Required',
        message: 'Please select a voice.'
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.description.trim()) {
      showNotification({
        type: 'error',
        title: 'Description Required',
        message: 'Please enter a description.'
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.languages.length === 0) {
      showNotification({
        type: 'error',
        title: 'Languages Required',
        message: 'Please add at least one language.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new companion object
      const newCompanion = {
        id: `comp_${Date.now()}`,
        name: formData.name,
        topic: formData.topic,
        subject: formData.subject,
        description: formData.description,
        duration: 45, // Default duration
        style: formData.style,
        voice: formData.voice,
        languages: formData.languages,
        avatar: formData.avatar,
        expertise: formData.expertise || formData.topic,
        rating: 0,
        sessions: 0,
        isPro: formData.isPro
      };

      // Save to context
      addCompanion(newCompanion);

      showNotification({
        type: 'success',
        title: 'Companion Created!',
        message: `${formData.name} has been successfully created and is ready to use.`
      });

      // Redirect to companions library
      navigate('/companions-library');
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Creation Failed',
        message: 'Failed to create companion. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubjectColor = (subject: string) => {
    const subjectOption = SUBJECT_OPTIONS.find(option => option.value === subject);
    return subjectOption?.color || '#E5E5E5';
  };

  return (
    <div className="min-h-screen bg-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/companions-library')}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Create New Companion</h1>
          <p className="text-white/80 text-lg">Design your perfect AI learning companion</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/95 backdrop-blur-sm text-black">
              <CardHeader>
                                 <CardTitle className="flex items-center gap-2 text-black">
                   <Sparkles className="w-5 h-5 text-blue-600" />
                   Companion Details
                 </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 text-black">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                             <Label htmlFor="name" className="text-sm font-medium text-black">Companion Name *</Label>
                                             <Input
                         id="name"
                         value={formData.name}
                         onChange={(e) => handleInputChange('name', e.target.value)}
                         placeholder="e.g., Alex the Project Manager"
                         className="mt-1 bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                         required
                       />
                    </div>
                    <div>
                                             <Label htmlFor="topic" className="text-sm font-medium text-black">Topic *</Label>
                                             <Input
                         id="topic"
                         value={formData.topic}
                         onChange={(e) => handleInputChange('topic', e.target.value)}
                         placeholder="e.g., Project Management Fundamentals"
                         className="mt-1 bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                         required
                       />
                    </div>
                  </div>

                  {/* Subject and Style */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                             <Label className="text-sm font-medium text-black">Subject *</Label>
                                             <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                         <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                           <SelectValue placeholder="Select a subject" />
                         </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {SUBJECT_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <span>{option.icon}</span>
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                                             <Label className="text-sm font-medium text-black">Style *</Label>
                                             <Select value={formData.style} onValueChange={(value) => handleInputChange('style', value)}>
                         <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                           <SelectValue placeholder="Select a style" />
                         </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {STYLE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-gray-500">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Voice and Avatar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                                             <Label className="text-sm font-medium text-black">Voice *</Label>
                                             <Select value={formData.voice} onValueChange={(value) => handleInputChange('voice', value)}>
                         <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                           <SelectValue placeholder="Select a voice" />
                         </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          {VOICE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-xs text-gray-500">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                                             <Label className="text-sm font-medium text-black">Avatar</Label>
                                             <Select value={formData.avatar} onValueChange={(value) => handleInputChange('avatar', value)}>
                         <SelectTrigger className="mt-1 bg-white text-gray-900 border-gray-300">
                           <SelectValue>
                             <span className="text-2xl">{formData.avatar}</span>
                           </SelectValue>
                         </SelectTrigger>
                        <SelectContent className="bg-white text-black">
                          <div className="grid grid-cols-8 gap-2 p-2">
                            {AVATAR_OPTIONS.map(avatar => (
                              <SelectItem key={avatar} value={avatar} className="text-center">
                                <span className="text-2xl">{avatar}</span>
                              </SelectItem>
                            ))}
                          </div>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                                         <Label htmlFor="description" className="text-sm font-medium text-black">Description *</Label>
                                         <Textarea
                       id="description"
                       value={formData.description}
                       onChange={(e) => handleInputChange('description', e.target.value)}
                       placeholder="Describe what this companion specializes in and how they can help learners..."
                       className="mt-1 bg-white text-gray-900 border-gray-300 placeholder-gray-600"
                       rows={4}
                       required
                     />
                  </div>

                  {/* Languages */}
                  <div>
                    <Label className="text-sm font-medium text-black">Languages *</Label>
                    <div className="mt-1 space-y-2">
                      <div className="flex gap-2">
                        <Select onValueChange={handleLanguageSelect}>
                          <SelectTrigger className="flex-1 bg-white text-gray-900 border-gray-300">
                            <SelectValue placeholder="Select languages" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-black">
                            {LANGUAGE_OPTIONS.map(lang => (
                              <SelectItem key={lang.code} value={lang.code}>
                                <div className="flex items-center gap-2">
                                  <span>{lang.flag}</span>
                                  <span>{lang.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={() => setCurrentLanguage('')}
                          size="sm"
                          variant="outline"
                        >
                          <Globe className="w-4 h-4" />
                        </Button>
                      </div>
                      {formData.languages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {formData.languages.map(lang => {
                            const langInfo = LANGUAGE_OPTIONS.find(l => l.code === lang);
                            return (
                              <Badge
                                key={lang}
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <span>{langInfo?.flag}</span>
                                <span>{langInfo?.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeLanguage(lang)}
                                  className="ml-1 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pro Toggle */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPro"
                      checked={formData.isPro}
                      onCheckedChange={(checked) => handleInputChange('isPro', checked)}
                    />
                    <Label htmlFor="isPro" className="text-sm font-medium text-black">
                      Make this a Pro companion (premium features)
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Companion...
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Companion
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white/95 backdrop-blur-sm sticky top-8 text-black">
              <CardHeader>
                                 <CardTitle className="flex items-center gap-2 text-black">
                   <BookOpen className="w-5 h-5 text-blue-600" />
                   Preview
                 </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-black">
                  {/* Companion Card Preview */}
                  <div className="border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{formData.avatar}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            {formData.subject && (
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: getSubjectColor(formData.subject) }}
                              >
                                {formData.subject}
                              </Badge>
                            )}
                            {formData.isPro && (
                              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                                Pro
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {formData.name || 'Companion Name'}
                      </h3>
                      <p className="text-gray-600 text-sm mb-1">
                        {formData.topic || 'Topic'}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {formData.description || 'Description will appear here...'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MicIcon className="w-4 h-4" />
                        <span>{formData.voice || 'Voice'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{formData.languages.length} languages</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        style={{ backgroundColor: getSubjectColor(formData.subject) }}
                        disabled
                      >
                        Start Session
                      </Button>
                      <Button variant="outline" size="sm" disabled>
                        🎤 Voice
                      </Button>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-xs text-blue-600">Sessions</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-600">0.0</div>
                      <div className="text-xs text-green-600">Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanion;
