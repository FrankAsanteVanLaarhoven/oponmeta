import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { UKEnglishProvider } from './context/UKEnglishContext';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <UKEnglishProvider>
        <App />
      </UKEnglishProvider>
    </ThemeProvider>
  </StrictMode>
);
