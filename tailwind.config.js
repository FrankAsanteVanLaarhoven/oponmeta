/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'Arial', 'sans-serif'],
        'open-sans': ['Open Sans', 'Roboto', 'Arial', 'sans-serif'],
        'roboto': ['Roboto', 'Arial', 'sans-serif'],
        'hero': ['Montserrat', 'Arial', 'sans-serif'],
        'body': ['Open Sans', 'Roboto', 'Arial', 'sans-serif'],
        'nav': ['Montserrat', 'Arial', 'sans-serif'],
        'button': ['Montserrat', 'Arial', 'sans-serif'],
        'footer': ['Roboto', 'Verdana', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-2': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-3': ['2rem', { lineHeight: '1.3' }],
        'heading-4': ['1.5rem', { lineHeight: '1.4' }],
        'heading-5': ['1.25rem', { lineHeight: '1.4' }],
        'heading-6': ['1.125rem', { lineHeight: '1.4' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'body-large': ['1.25rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d4ff',
          300: '#a3b8ff',
          400: '#7a91ff',
          500: '#4a6bff',
          600: '#2a4bff',
          700: '#1a3aeb',
          800: '#1a2a6b',
          900: '#0a174e',
        },
        text: {
          'black-on-white': '#000000',
          'dark-on-white': '#1a202c',
          'visible-on-white': '#000000',
        },
        sidebar: {
          'text': '#000000',
          'heading': '#000000',
          'label': '#000000',
          'muted': '#1a202c',
        },
      },
    },
  },
  plugins: [],
};
