import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Columns3, Grid, Edit, Trash2, Calendar, Clock, Users, MapPin, MoreVertical, X, Check, AlertCircle, Bell, Mail, MessageSquare, Settings, Volume2, VolumeX, Smartphone, Globe } from 'lucide-react';
import { useRef } from 'react';

export type DayType = {
  day: string;
  classNames: string;
  meetingInfo?: BookingInfo[];
};

export type BookingInfo = {
  id: string;
  date: string;
  time: string;
  title: string;
  participants: string[];
  location: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'rescheduled';
  description?: string;
  duration?: number; // in minutes
  reminders?: ReminderSettings;
};

export type ReminderSettings = {
  sound: boolean;
  email: boolean;
  text: boolean;
  reminderTime: number; // minutes before event
  emailAddress?: string;
  phoneNumber?: string;
};

interface DayProps {
  classNames: string;
  day: DayType;
  onHover: (day: string | null) => void;
}

const Day: React.FC<DayProps> = ({ classNames, day, onHover }) => {
  return (
    <div
      className={classNames}
      onMouseEnter={() => onHover(day.day)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="text-white text-sm flex items-center justify-center h-10 w-10 mx-auto">
        {day.day || ''}
      </span>
    </div>
  );
};

const CalendarGrid: React.FC<{ onHover: (day: string | null) => void }> = ({
  onHover,
}) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {DAYS.map((day, idx) => (
        <Day key={idx} classNames={day.classNames} day={day} onHover={onHover} />
      ))}
    </div>
  );
};

const InteractiveCalendar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const [moreView, setMoreView] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [bookings, setBookings] = useState<BookingInfo[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingInfo | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Partial<BookingInfo>>({});
  const [notificationSettings, setNotificationSettings] = useState({
    sound: true,
    email: true,
    text: false,
    globalSound: true,
    globalEmail: true,
    globalText: false
  });
  const [toasts, setToasts] = useState<Array<{id: string, message: string, type: 'success' | 'info' | 'warning' | 'error'}>>([]);
  const [audio] = useState(() => {
    if (typeof Audio !== 'undefined') {
      const audioElement = new Audio('/notification-sound.mp3');
      audioElement.volume = 0.5;
      return audioElement;
    }
    return null;
  });

  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [collapsible, setCollapsible] = useState({
    worldClock: true,
    currency: true,
    language: true,
    weather: true,
    whatToExpect: true,
    chooseExpert: true,
    selectService: true,
  });
  const recognitionRef = useRef<any>(null);

  // Add toast notification
  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  // Create fallback notification sound using Web Audio API
  const createFallbackSound = () => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  // Initialize bookings from demo data
  useEffect(() => {
    const demoBookings: BookingInfo[] = [
      {
        id: '1',
        date: 'Wed, 2 Nov',
        time: '10:00 AM - 11:00 AM',
        title: 'Design Review Meeting',
        participants: ['Alice Johnson', 'Mark Lee'],
        location: 'Zoom',
        status: 'confirmed',
        description: 'Review of new design mockups and user interface improvements',
        duration: 60,
        reminders: {
          sound: true,
          email: true,
          text: false,
          reminderTime: 15,
          emailAddress: 'alice@company.com',
          phoneNumber: '+1234567890'
        }
      },
      {
        id: '2',
        date: 'Wed, 2 Nov',
        time: '1:00 PM - 2:00 PM',
        title: 'Sprint Planning',
        participants: ['Tom Hanks', 'Jessica White'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Planning the next sprint goals and task assignments',
        duration: 60,
        reminders: {
          sound: true,
          email: true,
          text: true,
          reminderTime: 30,
          emailAddress: 'tom@company.com',
          phoneNumber: '+1234567891'
        }
      },
      {
        id: '3',
        date: 'Mon, 6 Nov',
        time: '10:00 AM - 11:00 AM',
        title: 'Brainstorming Session',
        participants: ['Sara Parker', 'Kumail Nanji'],
        location: 'Zoom',
        status: 'pending',
        description: 'Creative session for new product features',
        duration: 60,
        reminders: {
          sound: false,
          email: true,
          text: false,
          reminderTime: 10,
          emailAddress: 'sara@company.com'
        }
      },
      {
        id: '4',
        date: 'Wed, 8 Nov',
        time: '2:00 PM - 3:00 PM',
        title: 'Strategy Meeting',
        participants: ['Robert Green', 'David Lee'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Quarterly strategy review and planning',
        duration: 60,
        reminders: {
          sound: true,
          email: true,
          text: true,
          reminderTime: 60,
          emailAddress: 'robert@company.com',
          phoneNumber: '+1234567892'
        }
      },
      {
        id: '5',
        date: 'Wed, 15 Nov',
        time: '9:00 AM - 10:00 AM',
        title: 'Client Feedback Session',
        participants: ['Sarah Parker', 'Kumail Nanji'],
        location: 'In-person at Office',
        status: 'confirmed',
        description: 'Presenting project updates and gathering client feedback',
        duration: 60,
        reminders: {
          sound: true,
          email: true,
          text: false,
          reminderTime: 45,
          emailAddress: 'sarah@company.com'
        }
      }
    ];
    setBookings(demoBookings);
  }, []);

  // Check for upcoming reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      bookings.forEach(booking => {
        if (booking.reminders) {
          const bookingTime = new Date(booking.date + ' ' + booking.time.split(' - ')[0]);
          const reminderTime = new Date(bookingTime.getTime() - (booking.reminders.reminderTime * 60 * 1000));
          
          // Check if it's time to send reminder (within 1 minute of reminder time)
          const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
          if (timeDiff <= 60000) { // 1 minute window
            sendReminder(booking);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [bookings]);

  const sendReminder = (booking: BookingInfo) => {
    if (!booking.reminders) return;

    // Sound notification
    if (booking.reminders.sound && notificationSettings.globalSound) {
      if (audio) {
        audio.play().catch(() => {
          // Fallback to Web Audio API if MP3 fails
          createFallbackSound();
        });
      } else {
        createFallbackSound();
      }
    }

    // Email notification
    if (booking.reminders.email && notificationSettings.globalEmail && booking.reminders.emailAddress) {
      sendEmailReminder(booking);
    }

    // Text notification
    if (booking.reminders.text && notificationSettings.globalText && booking.reminders.phoneNumber) {
      sendTextReminder(booking);
    }
  };

  const sendEmailReminder = (booking: BookingInfo) => {
    // Simulate email sending
    console.log(`📧 Email reminder sent to ${booking.reminders?.emailAddress} for ${booking.title}`);
    addToast(`📧 Email reminder sent for "${booking.title}"`, 'success');
    // In a real app, you would integrate with an email service like SendGrid, Mailgun, etc.
  };

  const sendTextReminder = (booking: BookingInfo) => {
    // Simulate text sending
    console.log(`📱 Text reminder sent to ${booking.reminders?.phoneNumber} for ${booking.title}`);
    addToast(`📱 Text reminder sent for "${booking.title}"`, 'success');
    // In a real app, you would integrate with SMS services like Twilio, AWS SNS, etc.
  };

  // Test notification function
  const testNotification = (type: 'sound' | 'email' | 'text') => {
    const testBooking: BookingInfo = {
      id: 'test',
      date: 'Test',
      time: 'Now',
      title: 'Test Notification',
      participants: ['Test User'],
      location: 'Test Location',
      status: 'confirmed',
      reminders: {
        sound: type === 'sound',
        email: type === 'email',
        text: type === 'text',
        reminderTime: 0,
        emailAddress: 'test@example.com',
        phoneNumber: '+1234567890'
      }
    };
    
    sendReminder(testBooking);
    
    // Add specific toast for test notifications
    switch (type) {
      case 'sound':
        addToast('🔊 Test sound notification played', 'info');
        break;
      case 'email':
        addToast('📧 Test email notification sent', 'info');
        break;
      case 'text':
        addToast('📱 Test text notification sent', 'info');
        break;
    }
  };

  // Voice booking logic
  const startVoiceBooking = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      addToast('Voice recognition not supported in this browser', 'error');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setVoiceListening(true);
    setVoiceTranscript('');
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);
      setVoiceListening(false);
      parseVoiceBooking(transcript);
    };
    recognition.onerror = (event: any) => {
      setVoiceListening(false);
      addToast('Voice recognition error: ' + event.error, 'error');
    };
    recognition.onend = () => setVoiceListening(false);
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopVoiceBooking = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setVoiceListening(false);
    }
  };

  // Simple parser for demo (expand as needed)
  const parseVoiceBooking = (transcript: string) => {
    // Example: "Book Dr. Sarah Johnson for a 1:1 Consultation on Friday at 2pm"
    // This is a simple demo parser. For production, use NLP or a library.
    let expert = '';
    let service = '';
    let date = '';
    let time = '';
    const expertMatch = transcript.match(/(Dr\.|Prof\.|Lisa) [A-Za-z ]+/i);
    if (expertMatch) expert = expertMatch[0];
    const serviceMatch = transcript.match(/Consultation|Mentoring Session|Portfolio Review|Workshop Session/i);
    if (serviceMatch) service = serviceMatch[0];
    const dateMatch = transcript.match(/on ([A-Za-z]+|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
    if (dateMatch) date = dateMatch[1];
    const timeMatch = transcript.match(/at ([0-9]{1,2}(?::[0-9]{2})? ?(am|pm)?)/i);
    if (timeMatch) time = timeMatch[1];
    setEditingBooking({
      title: service || '1:1 Consultation',
      participants: [expert || ''],
      date: date ? date : '',
      time: time ? time : '',
      location: '',
      status: 'pending',
    });
    setShowBookingModal(true);
  };

  // Generate days for the current month
  const generateDays = () => {
    const days: any[] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ day: '', classNames: 'bg-zinc-700/20' });
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const dayDate = new Date(year, month, day);
      const dayBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.getDate() === day && 
               bookingDate.getMonth() === month && 
               bookingDate.getFullYear() === year;
      });
      
      const hasBookings = dayBookings.length > 0;
      const isToday = dayDate.toDateString() === new Date().toDateString();
      const isSelected = selectedDay === day;
      
      let classNames = 'bg-[#1e1e1e] cursor-pointer hover:bg-[#22305a] transition-colors';
      if (isToday) classNames += ' ring-2 ring-cyan-400';
      if (isSelected) classNames += ' bg-[#22305a]';
      if (hasBookings) classNames += ' relative';
      
      days.push({
        day: day.toString().padStart(2, '0'),
        classNames,
        meetingInfo: dayBookings
      });
    }
    
    // Fill trailing blanks
    while (days.length % 7 !== 0) {
      days.push({ day: '', classNames: 'bg-zinc-700/20' });
    }
    return days;
  };

  const days = generateDays();

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
  };

  // CRUD Operations
  const handleEditBooking = (booking: BookingInfo) => {
    setSelectedBooking(booking);
    setEditingBooking(booking);
    setShowBookingModal(true);
  };

  const handleDeleteBooking = (booking: BookingInfo) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleRescheduleBooking = (booking: BookingInfo) => {
    setSelectedBooking(booking);
    setShowRescheduleModal(true);
  };

  const handleCancelBooking = (booking: BookingInfo) => {
    setBookings(prev => prev.map(b => 
      b.id === booking.id ? { ...b, status: 'cancelled' as const } : b
    ));
  };

  const handleReminderSettings = (booking: BookingInfo) => {
    setSelectedBooking(booking);
    setShowReminderModal(true);
  };

  const handleSaveBooking = () => {
    if (selectedBooking && editingBooking) {
      setBookings(prev => prev.map(b => 
        b.id === selectedBooking.id ? { ...b, ...editingBooking } : b
      ));
      setShowBookingModal(false);
      setSelectedBooking(null);
      setEditingBooking({});
    }
  };

  const handleConfirmDelete = () => {
    if (selectedBooking) {
      setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
      setShowDeleteModal(false);
      setSelectedBooking(null);
    }
  };

  const handleReschedule = (newDate: string, newTime: string) => {
    if (selectedBooking) {
      setBookings(prev => prev.map(b => 
        b.id === selectedBooking.id ? 
        { ...b, date: newDate, time: newTime, status: 'rescheduled' as const } : b
      ));
      setShowRescheduleModal(false);
      setSelectedBooking(null);
    }
  };

  const handleSaveReminderSettings = () => {
    if (selectedBooking && editingBooking.reminders) {
      setBookings(prev => prev.map(b => 
        b.id === selectedBooking.id ? 
        { ...b, reminders: editingBooking.reminders } : b
      ));
      setShowReminderModal(false);
      setSelectedBooking(null);
      setEditingBooking({});
      addToast('Reminder settings saved successfully!', 'success');
    }
  };

  // Manual reminder trigger for testing
  const triggerManualReminder = (booking: BookingInfo) => {
    sendReminder(booking);
    addToast(`Manual reminder triggered for "${booking.title}"`, 'info');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'cancelled': return 'text-red-400';
      case 'rescheduled': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <Check className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <X className="h-4 w-4" />;
      case 'rescheduled': return <Calendar className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getReminderIcon = (booking: BookingInfo) => {
    if (!booking.reminders) return null;
    
    const hasReminders = booking.reminders.sound || booking.reminders.email || booking.reminders.text;
    if (!hasReminders) return null;

    return (
      <div className="flex items-center gap-1">
        {booking.reminders.sound && <Volume2 className="h-3 w-3 text-cyan-300" />}
        {booking.reminders.email && <Mail className="h-3 w-3 text-blue-300" />}
        {booking.reminders.text && <MessageSquare className="h-3 w-3 text-green-300" />}
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        className="relative mx-auto my-10 flex w-full flex-col items-center justify-center gap-8 lg:flex-row"
        {...props}
      >
        <motion.div layout className="w-full max-w-lg">
          <motion.div
            key="calendar-view"
            className="flex w-full flex-col gap-4"
          >
            <div className="flex w-full items-center justify-between">
              <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-[#22305a]">
                <ChevronLeft className="h-5 w-5 text-cyan-300" />
              </button>
              <div className="text-cyan-300 text-lg font-bold">
                {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
              </div>
              <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-[#22305a]">
                <ChevronRight className="h-5 w-5 text-cyan-300" />
              </button>
              <motion.button
                className="relative flex items-center gap-3 rounded-lg border border-[#323232] px-1.5 py-1 text-[#323232] ml-4"
                onClick={() => setMoreView(!moreView)}
              >
                <Columns3 className="z-[2]" />
                <Grid className="z-[2]" />
                <div
                  className="absolute left-0 top-0 h-[85%] w-7 rounded-md bg-white transition-transform duration-300"
                  style={{
                    top: '50%',
                    transform: moreView
                      ? 'translateY(-50%) translateX(40px)'
                      : 'translateY(-50%) translateX(4px)',
                  }}
                ></div>
              </motion.button>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={voiceListening ? stopVoiceBooking : startVoiceBooking}
                className={`px-4 py-2 rounded bg-cyan-700 text-white hover:bg-cyan-600 transition w-fit ${voiceListening ? 'animate-pulse' : ''}`}
              >
                {voiceListening ? 'Listening... (Click to stop)' : '🎤 Voice Booking'}
              </button>
              {voiceTranscript && (
                <div className="text-cyan-300 text-sm">Heard: {voiceTranscript}</div>
              )}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="px-0/5 rounded-xl bg-[#323232] py-1 text-center text-xs text-white"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((d, idx) => (
                <div
                  key={idx}
                  className={d.classNames}
                  onClick={() => d.day && handleDayClick(parseInt(d.day))}
                  style={{ cursor: d.day ? 'pointer' : 'default' }}
                >
                  <span className="text-white text-sm flex items-center justify-center h-10 w-10 mx-auto">
                    {d.day || ''}
                  </span>
                  {d.meetingInfo && d.meetingInfo.length > 0 && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {moreView && (
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              key="more-view"
              className="mt-4 flex w-full flex-col gap-4"
            >
              <div className="flex w-full flex-col items-start justify-between">
                <motion.h2 className="mb-2 text-4xl font-bold tracking-wider text-zinc-300">
                  Bookings & Reminders
                </motion.h2>
                <p className="font-medium text-zinc-300/50">
                  Manage your upcoming events with alerts and notifications.
                </p>
              </div>

              {/* Global Notification Settings */}
              <div className="bg-[#16203a] border border-[#11204a] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-cyan-300" />
                  <h3 className="text-lg font-semibold text-white">Global Notifications</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {notificationSettings.globalSound ? <Volume2 className="h-4 w-4 text-cyan-300" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
                      <span className="text-white text-sm">Sound Alerts</span>
                    </div>
                    <button
                      onClick={() => setNotificationSettings(prev => ({ ...prev, globalSound: !prev.globalSound }))}
                      className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.globalSound ? 'bg-cyan-600' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings.globalSound ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-300" />
                      <span className="text-white text-sm">Email Notifications</span>
                    </div>
                    <button
                      onClick={() => setNotificationSettings(prev => ({ ...prev, globalEmail: !prev.globalEmail }))}
                      className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.globalEmail ? 'bg-blue-600' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings.globalEmail ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-300" />
                      <span className="text-white text-sm">Text Messages</span>
                    </div>
                    <button
                      onClick={() => setNotificationSettings(prev => ({ ...prev, globalText: !prev.globalText }))}
                      className={`w-12 h-6 rounded-full transition-colors ${notificationSettings.globalText ? 'bg-green-600' : 'bg-gray-600'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notificationSettings.globalText ? 'translate-x-6' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                </div>
                
                {/* Test Notification Buttons */}
                <div className="mt-4 pt-4 border-t border-[#11204a]">
                  <h4 className="text-sm font-medium text-white mb-3">Test Notifications</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => testNotification('sound')}
                      className="flex items-center gap-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs rounded-lg transition-colors"
                      disabled={!notificationSettings.globalSound}
                    >
                      <Volume2 className="h-3 w-3" />
                      Test Sound
                    </button>
                    <button
                      onClick={() => testNotification('email')}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                      disabled={!notificationSettings.globalEmail}
                    >
                      <Mail className="h-3 w-3" />
                      Test Email
                    </button>
                    <button
                      onClick={() => testNotification('text')}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors"
                      disabled={!notificationSettings.globalText}
                    >
                      <MessageSquare className="h-3 w-3" />
                      Test Text
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                className="flex h-[500px] flex-col items-start justify-start overflow-hidden overflow-y-scroll rounded-xl border-2 border-[#323232] shadow-md"
                layout
              >
                <AnimatePresence>
                  {bookings.map((booking) => (
                    <motion.div
                      key={booking.id}
                      className="border-b border-[#323232] p-4 last:border-b-0 hover:bg-[#22305a] transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`flex items-center gap-1 text-sm ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          {getReminderIcon(booking)}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReminderSettings(booking)}
                            className="p-1 rounded hover:bg-[#323232] text-purple-300"
                            title="Reminder Settings"
                          >
                            <Bell className="h-4 w-4" />
                          </button>
                          {booking.reminders && (
                            <button
                              onClick={() => triggerManualReminder(booking)}
                              className="p-1 rounded hover:bg-[#323232] text-orange-300"
                              title="Trigger Reminder Now"
                            >
                              <AlertCircle className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleEditBooking(booking)}
                            className="p-1 rounded hover:bg-[#323232] text-cyan-300"
                            title="Edit Booking"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRescheduleBooking(booking)}
                            className="p-1 rounded hover:bg-[#323232] text-blue-300"
                            title="Reschedule"
                          >
                            <Calendar className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking)}
                            className="p-1 rounded hover:bg-[#323232] text-yellow-300"
                            title="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(booking)}
                            className="p-1 rounded hover:bg-[#323232] text-red-300"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-white">
                          {booking.date}
                        </span>
                        <span className="text-sm text-white">
                          {booking.time}
                        </span>
                      </div>
                      
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {booking.title}
                      </h3>
                      
                      {booking.description && (
                        <p className="mb-2 text-sm text-zinc-400">
                          {booking.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-cyan-300">
                          <Users className="mr-1 h-4 w-4" />
                          <span>{booking.participants.join(', ')}</span>
                        </div>
                        <div className="flex items-center text-blue-300">
                          <MapPin className="mr-1 h-4 w-4" />
                          <span>{booking.location}</span>
                        </div>
                        {booking.duration && (
                          <div className="flex items-center text-green-300">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{booking.duration} min</span>
                          </div>
                        )}
                      </div>

                      {booking.reminders && (
                        <div className="mt-3 pt-3 border-t border-[#323232]">
                          <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Bell className="h-3 w-3" />
                            <span>Reminder: {booking.reminders.reminderTime} min before</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Edit Booking Modal */}
        <AnimatePresence>
          {showBookingModal && selectedBooking && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0a1834] border-2 border-[#11204a] rounded-3xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Edit Booking</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Title</label>
                    <input
                      type="text"
                      value={editingBooking.title || ''}
                      onChange={(e) => setEditingBooking(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Description</label>
                    <textarea
                      value={editingBooking.description || ''}
                      onChange={(e) => setEditingBooking(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingBooking.location || ''}
                      onChange={(e) => setEditingBooking(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      value={editingBooking.duration || ''}
                      onChange={(e) => setEditingBooking(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveBooking}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 bg-[#11204a] hover:bg-[#1a2a5a] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedBooking && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0a1834] border-2 border-[#11204a] rounded-3xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Delete Booking</h3>
                </div>
                <p className="text-white mb-6">
                  Are you sure you want to delete "{selectedBooking.title}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-[#11204a] hover:bg-[#1a2a5a] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reschedule Modal */}
        <AnimatePresence>
          {showRescheduleModal && selectedBooking && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0a1834] border-2 border-[#11204a] rounded-3xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Reschedule Booking</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">New Date</label>
                    <input
                      type="date"
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        const formattedDate = date.toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short' 
                        });
                        setEditingBooking(prev => ({ ...prev, date: formattedDate }));
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">New Time</label>
                    <input
                      type="time"
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                      onChange={(e) => {
                        const time = e.target.value;
                        const [hours, minutes] = time.split(':');
                        const formattedTime = `${parseInt(hours) > 12 ? parseInt(hours) - 12 : hours}:${minutes} ${parseInt(hours) >= 12 ? 'PM' : 'AM'}`;
                        setEditingBooking(prev => ({ ...prev, time: formattedTime }));
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      if (editingBooking.date && editingBooking.time) {
                        handleReschedule(editingBooking.date, editingBooking.time);
                      }
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowRescheduleModal(false)}
                    className="flex-1 bg-[#11204a] hover:bg-[#1a2a5a] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reminder Settings Modal */}
        <AnimatePresence>
          {showReminderModal && selectedBooking && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[#0a1834] border-2 border-[#11204a] rounded-3xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Reminder Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-1">Reminder Time (minutes before)</label>
                    <input
                      type="number"
                      value={editingBooking.reminders?.reminderTime || 15}
                      onChange={(e) => setEditingBooking(prev => ({ 
                        ...prev, 
                        reminders: { 
                          ...prev.reminders, 
                          reminderTime: parseInt(e.target.value) 
                        } 
                      }))}
                      className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                      min="1"
                      max="1440"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-cyan-300" />
                        <span className="text-white text-sm">Sound Alert</span>
                      </div>
                      <button
                        onClick={() => setEditingBooking(prev => ({ 
                          ...prev, 
                          reminders: { 
                            ...prev.reminders, 
                            sound: !prev.reminders?.sound 
                          } 
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors ${editingBooking.reminders?.sound ? 'bg-cyan-600' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingBooking.reminders?.sound ? 'translate-x-6' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-300" />
                        <span className="text-white text-sm">Email Notification</span>
                      </div>
                      <button
                        onClick={() => setEditingBooking(prev => ({ 
                          ...prev, 
                          reminders: { 
                            ...prev.reminders, 
                            email: !prev.reminders?.email 
                          } 
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors ${editingBooking.reminders?.email ? 'bg-blue-600' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingBooking.reminders?.email ? 'translate-x-6' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-300" />
                        <span className="text-white text-sm">Text Message</span>
                      </div>
                      <button
                        onClick={() => setEditingBooking(prev => ({ 
                          ...prev, 
                          reminders: { 
                            ...prev.reminders, 
                            text: !prev.reminders?.text 
                          } 
                        }))}
                        className={`w-12 h-6 rounded-full transition-colors ${editingBooking.reminders?.text ? 'bg-green-600' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${editingBooking.reminders?.text ? 'translate-x-6' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                  </div>
                  
                  {editingBooking.reminders?.email && (
                    <div>
                      <label className="block text-sm font-medium text-blue-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editingBooking.reminders?.emailAddress || ''}
                        onChange={(e) => setEditingBooking(prev => ({ 
                          ...prev, 
                          reminders: { 
                            ...prev.reminders, 
                            emailAddress: e.target.value 
                          } 
                        }))}
                        className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                        placeholder="Enter email address"
                      />
                    </div>
                  )}
                  
                  {editingBooking.reminders?.text && (
                    <div>
                      <label className="block text-sm font-medium text-green-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={editingBooking.reminders?.phoneNumber || ''}
                        onChange={(e) => setEditingBooking(prev => ({ 
                          ...prev, 
                          reminders: { 
                            ...prev.reminders, 
                            phoneNumber: e.target.value 
                          } 
                        }))}
                        className="w-full bg-[#16203a] border border-[#11204a] rounded-lg px-3 py-2 text-white"
                        placeholder="+1234567890"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSaveReminderSettings}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Save Settings
                  </button>
                  <button
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 bg-[#11204a] hover:bg-[#1a2a5a] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 300, scale: 0.3 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 300, scale: 0.5 }}
                className={`px-4 py-3 rounded-lg shadow-lg border-l-4 text-white text-sm font-medium max-w-sm ${
                  toast.type === 'success' ? 'bg-green-600 border-green-400' :
                  toast.type === 'error' ? 'bg-red-600 border-red-400' :
                  toast.type === 'warning' ? 'bg-yellow-600 border-yellow-400' :
                  'bg-blue-600 border-blue-400'
                }`}
              >
                {toast.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

InteractiveCalendar.displayName = 'InteractiveCalendar';

export default InteractiveCalendar;

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const DAYS: DayType[] = [
  { day: '-3', classNames: 'bg-zinc-700/20' },
  { day: '-2', classNames: 'bg-zinc-700/20' },
  { day: '-1', classNames: 'bg-zinc-700/20' },
  { day: '01', classNames: 'bg-[#1e1e1e]' },
  {
    day: '02',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '1',
        date: 'Wed, 2 Nov',
        time: '10:00 AM - 11:00 AM',
        title: 'Design Review Meeting',
        participants: ['Alice Johnson', 'Mark Lee'],
        location: 'Zoom',
        status: 'confirmed',
        description: 'Review of new design mockups and user interface improvements',
        duration: 60
      },
      {
        id: '2',
        date: 'Wed, 2 Nov',
        time: '1:00 PM - 2:00 PM',
        title: 'Sprint Planning',
        participants: ['Tom Hanks', 'Jessica White'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Planning the next sprint goals and task assignments',
        duration: 60
      },
    ],
  },
  { day: '03', classNames: 'bg-[#1e1e1e]' },
  {
    day: '04',
    classNames: 'bg-zinc-700/20',
  },
  { day: '05', classNames: 'bg-zinc-700/20' },
  {
    day: '06',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '3',
        date: 'Mon, 6 Nov',
        time: '10:00 AM - 11:00 AM',
        title: 'Brainstorming Session',
        participants: ['Sara Parker', 'Kumail Nanji'],
        location: 'Zoom',
        status: 'pending',
        description: 'Creative session for new product features',
        duration: 60
      },
    ],
  },
  { day: '07', classNames: 'bg-[#1e1e1e]' },
  {
    day: '08',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '4',
        date: 'Wed, 8 Nov',
        time: '2:00 PM - 3:00 PM',
        title: 'Strategy Meeting',
        participants: ['Robert Green', 'David Lee'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Quarterly strategy review and planning',
        duration: 60
      },
      {
        id: '5',
        date: 'Wed, 8 Nov',
        time: '4:00 PM - 5:00 PM',
        title: 'Budget Review',
        participants: ['Jessica White', 'Tom Hanks'],
        location: 'Microsoft Teams',
        status: 'confirmed',
        description: 'Quarterly budget review and allocation',
        duration: 60
      },
      {
        id: '6',
        date: 'Wed, 8 Nov',
        time: '5:30 PM - 6:30 PM',
        title: 'Q&A Session',
        participants: ['Bob Smith', 'Emma Stone'],
        location: 'In-person',
        status: 'confirmed',
        description: 'Q&A session for team members and clients',
        duration: 60
      },
    ],
  },
  { day: '09', classNames: 'bg-[#1e1e1e]' },
  {
    day: '10',
    classNames: 'bg-[#1e1e1e]',
  },
  { day: '11', classNames: 'bg-zinc-700/20' },
  {
    day: '12',
    classNames: 'bg-zinc-700/20',
  },
  { day: '13', classNames: 'bg-[#1e1e1e]' },
  { day: '14', classNames: 'bg-[#1e1e1e]' },
  {
    day: '15',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '5',
        date: 'Wed, 15 Nov',
        time: '9:00 AM - 10:00 AM',
        title: 'Client Feedback Session',
        participants: ['Sarah Parker', 'Kumail Nanji'],
        location: 'In-person at Office',
        status: 'confirmed',
        description: 'Presenting project updates and gathering client feedback',
        duration: 60
      },
    ],
  },
  { day: '16', classNames: 'bg-[#1e1e1e]' },
  {
    day: '17',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '7',
        date: 'Fri, 17 Nov',
        time: '9:00 AM - 10:00 AM',
        title: 'Weekly Standup',
        participants: ['David Lee', 'Sophia Young'],
        location: 'Microsoft Teams',
        status: 'confirmed',
        description: 'Daily standup meeting for team updates and blockers',
        duration: 60
      },
      {
        id: '8',
        date: 'Fri, 17 Nov',
        time: '11:00 AM - 12:00 PM',
        title: 'Client Update',
        participants: ['Sara Parker', 'Kumail Nanji'],
        location: 'In-person',
        status: 'confirmed',
        description: 'Weekly client update meeting',
        duration: 60
      },
      {
        id: '9',
        date: 'Fri, 17 Nov',
        time: '2:00 PM - 3:00 PM',
        title: 'Feature Demo',
        participants: ['Bob Smith', 'Emma Stone'],
        location: 'Zoom',
        status: 'confirmed',
        description: 'Demo of new features and improvements',
        duration: 60
      },
      {
        id: '10',
        date: 'Fri, 17 Nov',
        time: '4:00 PM - 5:00 PM',
        title: 'Feedback Session',
        participants: ['Mark Lee', 'Alice Johnson'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Weekly feedback session for team members',
        duration: 60
      },
    ],
  },
  { day: '18', classNames: 'bg-zinc-700/20' },
  {
    day: '19',
    classNames: 'bg-zinc-700/20',
  },
  { day: '20', classNames: 'bg-[#1e1e1e]' },
  {
    day: '21',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '11',
        date: 'Tue, 21 Nov',
        time: '11:00 AM - 12:00 PM',
        title: 'Product Launch',
        participants: ['Alice Johnson', 'Mark Lee'],
        location: 'Zoom',
        status: 'confirmed',
        description: 'Launch of new product version',
        duration: 60
      },
      {
        id: '12',
        date: 'Tue, 21 Nov',
        time: '1:00 PM - 2:00 PM',
        title: 'Customer Feedback',
        participants: ['Sara Parker', 'Kumail Nanji'],
        location: 'Google Meet',
        status: 'confirmed',
        description: 'Customer feedback review and prioritization',
        duration: 60
      },
      {
        id: '13',
        date: 'Tue, 21 Nov',
        time: '3:00 PM - 4:00 PM',
        title: 'Design Iteration',
        participants: ['David Lee', 'Sophia Young'],
        location: 'In-person',
        status: 'confirmed',
        description: 'Design iteration and refinement',
        duration: 60
      },
      {
        id: '14',
        date: 'Tue, 21 Nov',
        time: '5:00 PM - 6:00 PM',
        title: 'Team Celebration',
        participants: ['Bob Smith', 'Jessica White'],
        location: 'Office Rooftop',
        status: 'confirmed',
        description: 'Team celebration for successful quarter',
        duration: 60
      },
      {
        id: '15',
        date: 'Tue, 21 Nov',
        time: '7:00 PM - 8:00 PM',
        title: 'Happy Hour',
        participants: ['Tom Hanks', 'Emma Stone'],
        location: 'Local Bar',
        status: 'confirmed',
        description: 'End of week social event',
        duration: 60
      },
    ],
  },
  { day: '22', classNames: 'bg-[#1e1e1e]' },
  { day: '23', classNames: 'bg-[#1e1e1e]' },
  {
    day: '24',
    classNames: 'bg-[#1e1e1e]',
  },
  { day: '25', classNames: 'bg-zinc-700/20' },
  { day: '26', classNames: 'bg-zinc-700/20' },
  {
    day: '27',
    classNames: 'bg-[#1e1e1e]',
  },
  { day: '28', classNames: 'bg-[#1e1e1e]' },
  {
    day: '29',
    classNames: 'bg-[#1e1e1e]',
  },
  {
    day: '30',
    classNames: 'bg-[#1e1e1e] cursor-pointer',
    meetingInfo: [
      {
        id: '16',
        date: 'Thu, 30 Nov',
        time: '11:00 AM - 12:00 PM',
        title: 'Brainstorming Session',
        participants: ['David Lee', 'Sophia Young'],
        location: 'Zoom',
        status: 'confirmed',
        description: 'Weekly brainstorming session for new ideas',
        duration: 60
      },
    ],
  },
  { day: '+1', classNames: 'bg-zinc-700/20' },
  { day: '+2', classNames: 'bg-zinc-700/20' },
]; 