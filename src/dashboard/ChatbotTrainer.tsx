import React, { useState, useRef, useEffect } from 'react';
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
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Upload, 
  Download, 
  Settings, 
  MessageSquare,
  BookOpen,
  Brain,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Save,
  Trash2,
  Plus,
  FileText,
  Mic,
  MicOff
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DashboardBackButton from "@/components/ui/DashboardBackButton";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  confidence?: number;
}

interface TrainingData {
  id: string;
  title: string;
  content: string;
  category: string;
  lastUpdated: Date;
}

const ChatbotTrainer: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const courses = [
    { id: '1', title: 'Introduction to AI', category: 'Technology' },
    { id: '2', title: 'Business Management', category: 'Business' },
    { id: '3', title: 'Web Development', category: 'Programming' },
    { id: '4', title: 'Data Science', category: 'Analytics' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `I understand you're asking about "${inputMessage}". Based on the training data, here's what I can tell you...`,
        timestamp: new Date(),
        confidence: 0.85,
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startTraining = async () => {
    if (!selectedCourse) return;

    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const addTrainingData = () => {
    const newData: TrainingData = {
      id: Date.now().toString(),
      title: 'New Training Data',
      content: 'Enter your training content here...',
      category: 'General',
      lastUpdated: new Date(),
    };
    setTrainingData(prev => [...prev, newData]);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Here you would integrate with Web Speech API
  };

  const renderChatInterface = () => (
    <div className="flex flex-col h-[600px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && (
                  <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.content}</p>
                  {message.confidence && (
                    <p className="text-xs opacity-70 mt-1">
                      Confidence: {Math.round(message.confidence * 100)}%
                    </p>
                  )}
                </div>
                {message.type === 'user' && (
                  <User className="w-4 h-4 mt-1 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleVoiceInput}
            className={isListening ? 'bg-red-100 text-red-600' : ''}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('typeYourMessage')}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTrainingInterface = () => (
    <div className="space-y-6">
      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>{t('selectCourse')}</span>
          </CardTitle>
          <CardDescription>
            {t('chooseCourseToTrainChatbot')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder={t('selectACourse')} />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{course.title}</span>
                    <span className="text-xs text-gray-500">{course.category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Training Progress */}
      {isTraining && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>{t('trainingInProgress')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={trainingProgress} className="w-full" />
              <p className="text-sm text-gray-600">
                {t('trainingProgress')}: {trainingProgress}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Training Controls */}
      <Card>
        <CardHeader>
          <CardTitle>{t('trainingControls')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={startTraining}
              disabled={!selectedCourse || isTraining}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              {t('startTraining')}
            </Button>
            <Button variant="outline" className="flex-1">
              <Pause className="w-4 h-4 mr-2" />
              {t('pauseTraining')}
            </Button>
            <Button variant="outline" className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('resetTraining')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Training Data */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t('trainingData')}</CardTitle>
            <Button onClick={addTrainingData} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {t('addData')}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingData.map((data) => (
              <div key={data.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{data.title}</h4>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mb-2">{data.content}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">{data.category}</Badge>
                  <span className="text-xs text-gray-500">
                    {data.lastUpdated.toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            
            {trainingData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('noTrainingData')}</p>
                <p className="text-sm">{t('addTrainingDataToImproveChatbot')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettingsInterface = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>{t('chatbotSettings')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bot-name">{t('botName')}</Label>
            <Input id="bot-name" defaultValue="AI Assistant" />
          </div>
          
          <div>
            <Label htmlFor="personality">{t('personality')}</Label>
            <Select defaultValue="professional">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">{t('professional')}</SelectItem>
                <SelectItem value="friendly">{t('friendly')}</SelectItem>
                <SelectItem value="casual">{t('casual')}</SelectItem>
                <SelectItem value="formal">{t('formal')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="response-length">{t('responseLength')}</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">{t('short')}</SelectItem>
                <SelectItem value="medium">{t('medium')}</SelectItem>
                <SelectItem value="long">{t('long')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('exportOptions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              {t('exportModel')}
            </Button>
            <Button variant="outline" className="flex-1">
              <Upload className="w-4 h-4 mr-2" />
              {t('importModel')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <DashboardBackButton />
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('chatbotTrainer')}</h1>
        <p className="text-gray-600">
          {t('trainYourChatbotWithCourseContent')}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>{t('chat')}</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>{t('training')}</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>{t('settings')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bot className="w-5 h-5" />
                    <span>{t('chatInterface')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('testYourTrainedChatbot')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderChatInterface()}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('chatbotStats')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t('totalMessages')}</span>
                    <span className="font-medium">{messages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('trainingData')}</span>
                    <span className="font-medium">{trainingData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('accuracy')}</span>
                    <span className="font-medium">85%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="training">
          {renderTrainingInterface()}
        </TabsContent>

        <TabsContent value="settings">
          {renderSettingsInterface()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotTrainer; 