import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// PWA Icons configuration
const manifestIcons = [
  {
    src: 'icons/pwa-64x64.png',
    sizes: '64x64',
    type: 'image/png'
  },
  {
    src: 'icons/pwa-192x192.png',
    sizes: '192x192',
    type: 'image/png'
  },
  {
    src: 'icons/pwa-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any'
  },
  {
    src: 'icons/maskable-icon-512x512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'maskable'
  }
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'OPONM Learning Platform',
        short_name: 'OPONM',
        description: 'World-class Learning Management System with AI-powered course creation',
        theme_color: '#0066CC',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: manifestIcons,
        categories: ['education', 'productivity', 'learning'],
        screenshots: [
          {
            src: 'screenshots/desktop-1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide'
          },
          {
            src: 'screenshots/mobile-1.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.supabase\.io\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'course-assets',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'lucide-react',
      '@radix-ui/react-slot',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-accordion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-switch',
      '@radix-ui/react-progress',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'framer-motion',
      'react-router-dom',
      'sonner'
    ],
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
          // Supabase and database
          'supabase': ['@supabase/supabase-js'],
          
          // UI component libraries
          'ui-components': [
            'lucide-react',
            '@radix-ui/react-slot',
            '@radix-ui/react-label',
            '@radix-ui/react-select',
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-switch',
            '@radix-ui/react-progress',
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ],
          
          // Animation and routing
          'animations': ['framer-motion'],
          'routing': ['react-router-dom'],
          
          // Payment processing
          'payments': ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          
          // Utilities
          'utils': ['sonner', 'date-fns', 'zod'],
          
          // PWA and offline functionality
          'pwa': ['workbox-window', 'idb'],
          
          // Separate large components
          'companions': [
            './src/components/CompanionsLibrary.tsx',
            './src/components/CreateCompanion.tsx',
            './src/components/CompanionPage.tsx'
          ],
          
          'dashboard': [
            './src/components/StudentDashboard.tsx',
            './src/components/InstructorPortal.tsx',
            './src/components/VendorDashboard.tsx'
          ],
          
          'courses': [
            './src/components/CourseLibrary.tsx',
            './src/components/CourseBrowsing.tsx',
            './src/components/CourseCard.tsx'
          ],
          
          'assessments': [
            './src/components/PlagiarismChecker.tsx',
            './src/components/GrammarChecker.tsx',
            './src/components/AptitudeTest.tsx',
            './src/components/MentalHealthAssessment.tsx'
          ]
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
