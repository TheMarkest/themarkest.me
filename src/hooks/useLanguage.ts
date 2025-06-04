// src/hooks/useLanguage.ts
"use client";

import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  // Helper function for easy translation
  const t = (key: string, fallback?: string): string => {
    return context.translations[key] || fallback || key;
  };
  return { ...context, t };
};
