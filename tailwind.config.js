/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    // Mobile-first responsive breakpoints
    screens: {
      'xs': '375px',    // Small phones
      'sm': '640px',    // Large phones
      'md': '768px',    // Tablets
      'lg': '1024px',   // Small laptops
      'xl': '1280px',   // Desktops
      '2xl': '1536px',  // Large desktops
      '3xl': '1920px',  // Ultra-wide screens
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
        '2xl': '1400px',
      },
    },
    extend: {
      // Fluid typography system
      fontSize: {
        'xs': ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.25' }],
        'sm': ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.6' }],
        'lg': ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(1.875rem, 6vw, 2.5rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 7vw, 3rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 8vw, 4rem)', { lineHeight: '1' }],
        '6xl': ['clamp(3.75rem, 10vw, 5rem)', { lineHeight: '1' }],
      },
      // Fluid spacing system
      spacing: {
        'xs': 'clamp(0.25rem, 1vw, 0.5rem)',
        'sm': 'clamp(0.5rem, 2vw, 1rem)',
        'md': 'clamp(1rem, 4vw, 2rem)',
        'lg': 'clamp(1.5rem, 6vw, 3rem)',
        'xl': 'clamp(2rem, 8vw, 4rem)',
        '2xl': 'clamp(3rem, 10vw, 6rem)',
      },
      // Touch-friendly sizing
      minHeight: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-lg': '48px',
      },
      // Safe area insets for mobile
      padding: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      margin: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Custom colors for OPONM brand
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // OPONM brand colors
        oponm: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7ff',
          300: '#a4bfff',
          400: '#819dff',
          500: '#6b7aff',
          600: '#5b5af6',
          700: '#4c4ae8',
          800: '#3f3dc4',
          900: '#36369e',
          950: '#1a1a4a',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Mobile-specific animations
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      // Mobile-first shadows
      boxShadow: {
        'mobile': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'mobile-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'mobile-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
