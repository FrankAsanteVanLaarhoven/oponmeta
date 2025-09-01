import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Base theme colors using CSS variables
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
        
        // Text contrast colors
        'text-adaptive': 'var(--foreground)',
        'text-contrast-high': 'var(--text-primary)',
        'text-contrast-medium': 'var(--text-secondary)',
        'text-contrast-low': 'var(--text-muted)',
        'text-inverse': 'var(--text-inverse)',
        
        // OPONM brand colors
        oponm: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d3ff',
          300: '#a5b4ff',
          400: '#818cff',
          500: '#6366ff',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      textColor: {
        'on-white': 'var(--text-on-white)',
        'on-light': 'var(--text-on-light)',
        'on-primary': 'var(--text-on-primary)',
        'on-secondary': 'var(--text-on-secondary)',
        'on-accent': 'var(--text-on-accent)',
        'on-dark': 'var(--text-on-dark)',
      },
      backgroundColor: {
        'page-hero': 'var(--page-hero-bg)',
        'page-section': 'var(--page-section-bg)',
        'page-feature': 'var(--page-feature-bg)',
        'page-footer': 'var(--page-footer-bg)',
      },
      fontSize: {
        // Fluid typography with clamp()
        'xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2rem)',
        '3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)',
        '4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)',
        '5xl': 'clamp(3rem, 2.5rem + 2.5vw, 4rem)',
        '6xl': 'clamp(3.75rem, 3rem + 3.75vw, 5rem)',
      },
      spacing: {
        // Fluid spacing with clamp()
        'xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
        'sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 1rem)',
        'md': 'clamp(1rem, 0.8rem + 1vw, 2rem)',
        'lg': 'clamp(1.5rem, 1.2rem + 1.5vw, 3rem)',
        'xl': 'clamp(2rem, 1.6rem + 2vw, 4rem)',
        '2xl': 'clamp(3rem, 2.4rem + 3vw, 6rem)',
        '3xl': 'clamp(4rem, 3.2rem + 4vw, 8rem)',
      },
      minHeight: {
        // Touch target sizes
        'touch': '44px',
        'touch-lg': '48px',
        'touch-xl': '56px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
        'touch-xl': '56px',
      },
      padding: {
        // Safe area padding
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-left': 'max(1rem, env(safe-area-inset-left))',
        'safe-right': 'max(1rem, env(safe-area-inset-right))',
      },
      margin: {
        // Safe area margin
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
        'safe-left': 'max(1rem, env(safe-area-inset-left))',
        'safe-right': 'max(1rem, env(safe-area-inset-right))',
      },
      screens: {
        // Custom breakpoints
        'xs': '475px',
        '3xl': '1600px',
        '4xl': '1920px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
      },
      boxShadow: {
        // Mobile-first shadows
        'mobile': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'mobile-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'mobile-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'mobile-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'mobile-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;
