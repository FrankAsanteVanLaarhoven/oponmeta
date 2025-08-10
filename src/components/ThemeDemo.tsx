import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const ThemeDemo: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Theme System Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Current theme: <span className="font-semibold text-blue-600 dark:text-blue-400">{theme}</span>
            {isDark && ' (Dark mode active)'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Light Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Clean, bright interface perfect for daytime use.
              </p>
              <Button 
                onClick={() => setTheme('light')}
                className={`w-full ${
                  theme === 'light' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {theme === 'light' ? 'Active' : 'Switch to Light'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Dark Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Easy on the eyes, great for low-light environments.
              </p>
              <Button 
                onClick={() => setTheme('dark')}
                className={`w-full ${
                  theme === 'dark' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {theme === 'dark' ? 'Active' : 'Switch to Dark'}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Auto Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Automatically follows your system preference.
              </p>
              <Button 
                onClick={() => setTheme('auto')}
                className={`w-full ${
                  theme === 'auto' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {theme === 'auto' ? 'Active' : 'Switch to Auto'}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Color Palette</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#0a174e] rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Primary Blue</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#1a2a6b] rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Secondary Blue</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#FFD700] rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Accent Gold</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Background</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Theme Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p><strong>CSS Variables:</strong> All colors use CSS custom properties</p>
              <p><strong>Tailwind Integration:</strong> Works with dark: variants</p>
              <p><strong>Local Storage:</strong> Theme preference is saved</p>
              <p><strong>System Sync:</strong> Auto theme follows OS preference</p>
              <p><strong>Smooth Transitions:</strong> All theme changes are animated</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo;
