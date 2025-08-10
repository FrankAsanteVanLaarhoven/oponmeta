'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, getSubjectColor } from "@/lib/utils";
import { CompanionComponentProps, SavedMessage, Message } from '@/types/companion';
import { vapiService, VapiSession, VapiMessage } from './vapi.sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageSquare, 
  Volume2, 
  VolumeX,
  Loader2,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

const CompanionComponent = ({ 
  companionId, 
  subject, 
  topic, 
  name, 
  userName, 
  userImage, 
  style, 
  voice 
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [currentSession, setCurrentSession] = useState<VapiSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const { showNotification } = useNotification();

  const lottieRef = useRef<any>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (lottieRef.current) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking]);

  useEffect(() => {
    // Update session duration
    if (currentSession && currentSession.status === 'connected') {
      durationInterval.current = setInterval(() => {
        setSessionDuration(vapiService.getSessionDuration());
      }, 1000);
    }

    return () => {
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [currentSession]);

  const handleCall = async () => {
    if (callStatus === CallStatus.ACTIVE) {
      await handleDisconnect();
      return;
    }

    setIsLoading(true);
    setCallStatus(CallStatus.CONNECTING);

    try {
      const session = await vapiService.startSession({
        assistantName: name,
        assistantInstructions: `You are ${name}, an AI learning companion specializing in ${subject}. Help the user with ${topic} and provide educational guidance.`,
        assistantVoice: voice || 'shimmer',
        assistantFirstMessage: `Hello! I'm ${name}, your ${subject} learning companion. I'm here to help you with ${topic}. How can I assist you today?`,
      });

      setCurrentSession(session);
      setCallStatus(CallStatus.ACTIVE);
      setSessionDuration(0);
      setMessages([]);

      showNotification({
        type: 'success',
        title: 'Session Started',
        message: `Connected to ${name}`,
      });

    } catch (error) {
      console.error('Failed to start session:', error);
      setCallStatus(CallStatus.ERROR);
      showNotification({
        type: 'error',
        title: 'Connection Failed',
        message: 'Failed to connect to AI companion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await vapiService.stopSession();
      setCallStatus(CallStatus.FINISHED);
      setCurrentSession(null);
      setIsSpeaking(false);
      setIsMuted(false);

      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }

      showNotification({
        type: 'info',
        title: 'Session Ended',
        message: `Session with ${name} has ended.`,
      });

    } catch (error) {
      console.error('Failed to stop session:', error);
      showNotification({
        type: 'error',
        title: 'Disconnect Error',
        message: 'Failed to disconnect properly.',
      });
    }
  };

  const toggleMicrophone = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    vapiService.setMuted(newMutedState);
    
    showNotification({
      type: 'info',
      title: newMutedState ? 'Microphone Disabled' : 'Microphone Enabled',
      message: newMutedState ? 'Your microphone is now muted' : 'Your microphone is now active',
    });
  };

  const sendTextMessage = async (content: string) => {
    if (!vapiService.isConnected()) {
      showNotification({
        type: 'error',
        title: 'Not Connected',
        message: 'Please start a session first.',
      });
      return;
    }

    try {
      const message = await vapiService.sendMessage(content);
      const newMessage: SavedMessage = {
        role: 'user',
        content: message.content,
        timestamp: message.timestamp,
      };
      setMessages(prev => [newMessage, ...prev]);
    } catch (error) {
      console.error('Failed to send message:', error);
      showNotification({
        type: 'error',
        title: 'Message Failed',
        message: 'Failed to send message. Please try again.',
      });
    }
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case CallStatus.ACTIVE:
        return 'bg-green-500';
      case CallStatus.CONNECTING:
        return 'bg-yellow-500';
      case CallStatus.ERROR:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: getSubjectColor(subject) }}
            >
              {name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{subject} • {topic}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={callStatus === CallStatus.ACTIVE ? 'default' : 'secondary'}>
              {callStatus}
            </Badge>
            {callStatus === CallStatus.ACTIVE && (
              <span className="text-sm text-gray-600">
                {formatDuration(sessionDuration)}
              </span>
            )}
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Status Indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
          <span className="text-sm text-gray-600">
            {callStatus === CallStatus.CONNECTING && 'Connecting...'}
            {callStatus === CallStatus.ACTIVE && 'Connected'}
            {callStatus === CallStatus.FINISHED && 'Session ended'}
            {callStatus === CallStatus.ERROR && 'Connection failed'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            onClick={handleCall}
            disabled={isLoading}
            variant={callStatus === CallStatus.ACTIVE ? 'destructive' : 'default'}
            size="lg"
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : callStatus === CallStatus.ACTIVE ? (
              <PhoneOff className="h-4 w-4" />
            ) : (
              <Phone className="h-4 w-4" />
            )}
            {callStatus === CallStatus.ACTIVE ? 'End Call' : 'Start Call'}
          </Button>

          {callStatus === CallStatus.ACTIVE && (
            <Button
              onClick={toggleMicrophone}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          )}
        </div>

        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <h4 className="font-semibold text-gray-800">Conversation History</h4>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp?.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Session Info */}
        {currentSession && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Session Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Session ID:</span>
                <p className="font-mono">{currentSession.id}</p>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <p>{formatDuration(sessionDuration)}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="capitalize">{currentSession.status}</p>
              </div>
              <div>
                <span className="text-gray-600">Messages:</span>
                <p>{messages.length}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanionComponent;
