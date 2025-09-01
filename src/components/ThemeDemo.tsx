import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { SmartBackground } from './ui/SmartBackground';
import { SmartText } from './ui/SmartText';
import { useTextContrast } from '../hooks/useTextContrast';

const ThemeDemo: React.FC = () => {
  const { theme, resolvedTheme, systemTheme, calculateContrast, getOptimalTextColor } = useTheme();

  // Test different background colors
  const testBackgrounds = [
    { name: 'White', color: '#ffffff', class: 'bg-white' },
    { name: 'Light Gray', color: '#f3f4f6', class: 'bg-gray-100' },
    { name: 'Blue', color: '#2563eb', class: 'bg-blue-600' },
    { name: 'Green', color: '#059669', class: 'bg-green-600' },
    { name: 'Red', color: '#dc2626', class: 'bg-red-600' },
    { name: 'Purple', color: '#9333ea', class: 'bg-purple-600' },
    { name: 'Yellow', color: '#d97706', class: 'bg-yellow-600' },
    { name: 'Dark Gray', color: '#1f2937', class: 'bg-gray-800' },
    { name: 'Black', color: '#000000', class: 'bg-black' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <SmartText
              as="h1"
              className="text-2xl font-bold"
              forceContrast
            >
              🌟 Enhanced Theme System Demo
            </SmartText>
            
            <div className="flex items-center gap-4">
              <ThemeToggle variant="buttons" size="md" showLabels={false} />
              <ThemeToggle variant="dropdown" size="sm" showLabels={true} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Theme Information */}
        <SmartBackground 
          originalBg="bg-gradient-to-r from-blue-600 to-purple-600"
          className="rounded-lg p-6 mb-8"
          autoTextContrast
          textContrastLevel="AAA"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Smart Contrast Detection
            </h2>
            <p className="text-lg opacity-90 mb-4">
              This background automatically adapts text color for optimal readability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 rounded-lg p-3">
                <strong>Current Theme:</strong> {theme}
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <strong>Resolved Theme:</strong> {resolvedTheme}
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <strong>System Theme:</strong> {systemTheme}
              </div>
            </div>
          </div>
        </SmartBackground>

        {/* Contrast Testing Grid */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-contrast-high">
            Automatic Text Contrast Testing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testBackgrounds.map((bg) => {
              const contrastInfo = getOptimalTextColor(bg.color);
              const whiteContrast = calculateContrast(bg.color, '#ffffff');
              const blackContrast = calculateContrast(bg.color, '#1a1a1a');
              
              return (
                <SmartBackground
                  key={bg.name}
                  originalBg={bg.class}
                  className="rounded-lg p-6 shadow-lg"
                  autoTextContrast
                  textContrastLevel="AA"
                >
                  <div className="space-y-3">
                    <h4 className="font-bold text-lg">{bg.name}</h4>
                    <p className="text-sm opacity-80">
                      This text automatically adapts for optimal contrast.
                    </p>
                    <div className="text-xs space-y-1">
                      <div>White contrast: {whiteContrast.toFixed(2)}:1</div>
                      <div>Black contrast: {blackContrast.toFixed(2)}:1</div>
                      <div>Selected: {contrastInfo.textColor === '#ffffff' ? 'White' : 'Black'}</div>
                      <div className={`font-bold ${contrastInfo.isAccessible ? 'text-green-600' : 'text-red-600'}`}>
                        {contrastInfo.isAccessible ? '✓ WCAG AA Compliant' : '✗ Not WCAG AA Compliant'}
                      </div>
                    </div>
                  </div>
                </SmartBackground>
              );
            })}
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-contrast-high">
            Theme Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SmartBackground
              originalBg="bg-green-600"
              className="rounded-lg p-6 shadow-lg"
              autoTextContrast
            >
              <div className="space-y-3">
                <h4 className="font-bold text-xl">WCAG Compliance</h4>
                <p className="opacity-90">
                  Automatic contrast calculation ensures WCAG AA (4.5:1) and AAA (7:1) compliance.
                </p>
                <div className="text-sm">
                  <div>✓ AA Standard (4.5:1)</div>
                  <div>✓ AAA Standard (7:1)</div>
                  <div>✓ Real-time calculation</div>
                </div>
              </div>
            </SmartBackground>

            <SmartBackground
              originalBg="bg-blue-600"
              className="rounded-lg p-6 shadow-lg"
              autoTextContrast
            >
              <div className="space-y-3">
                <h4 className="font-bold text-xl">Smart Adaptation</h4>
                <p className="opacity-90">
                  Text color automatically adapts based on background luminance and contrast ratios.
                </p>
                <div className="text-sm">
                  <div>✓ Luminance calculation</div>
                  <div>✓ Contrast ratio analysis</div>
                  <div>✓ Optimal color selection</div>
                </div>
              </div>
            </SmartBackground>

            <SmartBackground
              originalBg="bg-purple-600"
              className="rounded-lg p-6 shadow-lg"
              autoTextContrast
            >
              <div className="space-y-3">
                <h4 className="font-bold text-xl">Smooth Transitions</h4>
                <p className="opacity-90">
                  Professional cubic-bezier animations provide smooth theme switching experience.
                </p>
                <div className="text-sm">
                  <div>✓ 300ms transitions</div>
                  <div>✓ Cubic-bezier easing</div>
                  <div>✓ Hardware acceleration</div>
                </div>
              </div>
            </SmartBackground>
          </div>
        </section>

        {/* Light Mode Enforcement */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-contrast-high">
            Light Mode White Background Enforcement
          </h3>
          <SmartBackground
            originalBg="bg-gradient-to-r from-blue-600 to-purple-600"
            className="rounded-lg p-6"
            forceWhiteInLight
            autoTextContrast
          >
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">
                Forced White Background in Light Mode
              </h4>
              <p className="mb-4">
                This section demonstrates how the system forces white backgrounds in light mode
                while preserving original colors in dark and system modes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-100 rounded-lg p-3">
                  <strong>Light Mode:</strong> White background enforced
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <strong>Dark Mode:</strong> Original colors preserved
                </div>
              </div>
            </div>
          </SmartBackground>
        </section>

        {/* System Integration */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-contrast-high">
            System Integration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SmartBackground
              originalBg="bg-gray-800"
              className="rounded-lg p-6"
              autoTextContrast
            >
              <h4 className="font-bold text-xl mb-4">CSS Variables</h4>
              <p className="mb-4">
                Theme colors are managed through CSS custom properties for instant switching
                without JavaScript recalculations.
              </p>
              <div className="text-sm space-y-1">
                <div>✓ CSS Variables</div>
                <div>✓ Instant switching</div>
                <div>✓ No layout shift</div>
              </div>
            </SmartBackground>

            <SmartBackground
              originalBg="bg-gray-800"
              className="rounded-lg p-6"
              autoTextContrast
            >
              <h4 className="font-bold text-xl mb-4">System Detection</h4>
              <p className="mb-4">
                Automatic detection of system theme preference with real-time updates
                when system theme changes.
              </p>
              <div className="text-sm space-y-1">
                <div>✓ Media query detection</div>
                <div>✓ Real-time updates</div>
                <div>✓ Preference persistence</div>
              </div>
            </SmartBackground>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6 text-contrast-high">
            Usage Examples
          </h3>
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="font-bold text-xl mb-4">SmartText Component</h4>
            <div className="space-y-4">
              <SmartText
                backgroundColor="#2563eb"
                forceContrast
                className="block p-4 rounded bg-blue-600"
              >
                This text automatically adapts to blue background
              </SmartText>
              
              <SmartText
                backgroundColor="#059669"
                forceContrast
                className="block p-4 rounded bg-green-600"
              >
                This text automatically adapts to green background
              </SmartText>
              
              <SmartText
                backgroundColor="#dc2626"
                forceContrast
                className="block p-4 rounded bg-red-600"
              >
                This text automatically adapts to red background
              </SmartText>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <SmartText
            as="p"
            className="text-contrast-medium"
          >
            Enhanced Theme System with WCAG Compliance and Automatic Text Contrast
          </SmartText>
        </footer>
      </main>
    </div>
  );
};

export default ThemeDemo;
