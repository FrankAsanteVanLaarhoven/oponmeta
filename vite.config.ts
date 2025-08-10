import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-vendor': ['react', 'react-dom'],
          
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
          
          // Utilities
          'utils': ['sonner'],
          
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
