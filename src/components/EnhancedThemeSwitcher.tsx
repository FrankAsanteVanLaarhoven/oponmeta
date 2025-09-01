import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';
import { Moon, Sun, Monitor, Palette } from 'lucide-react';
import { SmartText } from './SmartText';

interface EnhancedThemeSwitcherProps {
  variant?: 'buttons' | 'dropdown' | 'toggle';
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
}

export const EnhancedThemeSwitcher: React.FC<EnhancedThemeSwitcherProps> = ({
  variant = 'buttons',
  size = 'md',
  showLabels = true,
  className = ''
}) => {
  const { theme, setTheme, resolvedTheme, toggleTheme, cycleTheme } = useTheme();

  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg'
  };

  const buttonSize = sizeClasses[size];

  if (variant === 'toggle') {
    return (
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className={`${buttonSize} ${className}`}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} theme`}
      >
        <SmartText forceContrast>
          {resolvedTheme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </SmartText>
      </Button>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative inline-block ${className}`}>
        <Button
          onClick={cycleTheme}
          variant="outline"
          size="icon"
          className={buttonSize}
          aria-label="Cycle through themes"
        >
          <SmartText forceContrast>
            <Palette className="h-4 w-4" />
          </SmartText>
        </Button>
      </div>
    );
  }

  // Default: buttons variant
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={() => setTheme('light')}
        variant={theme === 'light' ? 'default' : 'outline'}
        size="sm"
        className="flex items-center gap-2"
        aria-label="Light theme"
      >
        <SmartText forceContrast>
          <Sun className="h-4 w-4" />
        </SmartText>
        {showLabels && (
          <SmartText forceContrast>
            Light
          </SmartText>
        )}
      </Button>

      <Button
        onClick={() => setTheme('dark')}
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="sm"
        className="flex items-center gap-2"
        aria-label="Dark theme"
      >
        <SmartText forceContrast>
          <Moon className="h-4 w-4" />
        </SmartText>
        {showLabels && (
          <SmartText forceContrast>
            Dark
          </SmartText>
        )}
      </Button>

      <Button
        onClick={() => setTheme('system')}
        variant={theme === 'system' ? 'default' : 'outline'}
        size="sm"
        className="flex items-center gap-2"
        aria-label="System theme"
      >
        <SmartText forceContrast>
          <Monitor className="h-4 w-4" />
        </SmartText>
        {showLabels && (
          <SmartText forceContrast>
            System
          </SmartText>
        )}
      </Button>
    </div>
  );
};
