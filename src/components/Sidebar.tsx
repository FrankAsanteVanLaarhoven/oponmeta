import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Calendar, Star, Trophy as TrophyIcon, CreditCard, MessageCircle, Settings, Home, Bot as BotIcon, ShoppingBag as ShoppingBagIcon, Plus, Users } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: <Home />, to: '/student-portal' },
  { key: 'my-courses', label: 'My Courses', icon: <BookOpen />, to: '/student-portal' },
  { key: 'marketplace', label: 'Course Marketplace', icon: <ShoppingBagIcon />, to: '/student-portal' },
  { key: 'bookings', label: 'Bookings', icon: <Calendar />, to: '/student-portal' },
  { key: 'progress', label: 'Progress', icon: <Star />, to: '/student-portal' },
  { key: 'achievements', label: 'Achievements', icon: <TrophyIcon />, to: '/student-portal' },
  { key: 'wallet', label: 'Wallet', icon: <CreditCard />, to: '/student-portal' },
  { key: 'social', label: 'Social', icon: <MessageCircle />, to: '/student-portal' },
  { key: 'ai-companions', label: 'AI Companions', icon: <BotIcon />, to: '/student-portal' },
  { key: 'settings', label: 'Settings', icon: <Settings />, to: '/student-portal' },
];

const instructorItems = [
  { key: 'create-course', label: 'Create Course', icon: <Plus />, to: '/dashboard/course-creator' },
  { key: 'ai-course-creator', label: 'AI Course Creator', icon: <BotIcon />, to: '/dashboard/ai-course-creator' },
  { key: 'vendor-dashboard', label: 'Vendor Dashboard', icon: <Users />, to: '/vendor/dashboard' },
  { key: 'become-instructor', label: 'Become Instructor', icon: <Users />, to: '/become-instructor' },
];

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ activeTab = 'dashboard', onTabChange }: SidebarProps) {
  const handleTabClick = (tabKey: string) => {
    if (onTabChange) {
      onTabChange(tabKey);
    }
  };

  return (
    <aside className="bg-gray-900 min-h-screen w-64 flex flex-col shadow-lg border-r border-gray-800">
      <div className="p-6 font-bold text-xl text-white">Student Portal</div>
      
      {/* Main Navigation */}
      <nav className="flex-1 mt-4">
        <div className="px-4 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Learning</h3>
        </div>
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => handleTabClick(item.key)}
            className={`flex items-center gap-3 px-6 py-3 rounded-lg mb-2 transition-colors cursor-pointer text-base font-medium w-full text-left
              ${activeTab === item.key ? 'bg-blue-600 text-white font-bold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
            title={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Instructor Section */}
      <div className="border-t border-gray-800 pt-4">
        <div className="px-4 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Instructor Tools</h3>
        </div>
        {instructorItems.map(item => (
          <NavLink
            key={item.key}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 rounded-lg mb-2 transition-colors cursor-pointer text-base font-medium
              ${isActive ? 'bg-green-600 text-white font-bold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`
            }
            title={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
} 