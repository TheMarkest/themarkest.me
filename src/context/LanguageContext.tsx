// src/context/LanguageContext.tsx
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useState, useEffect } from 'react';
import enMessages from '@/locales/en.json';
import ruMessages from '@/locales/ru.json';

export type Locale = 'en' | 'ru';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Record<string, string>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const messages: Record<Locale, Record<string, string>> = {
  en: enMessages,
  ru: ruMessages,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && (storedLocale === 'en' || storedLocale === 'ru')) {
      setLocaleState(storedLocale);
    } else {
      // Default to browser language or 'en'
      const browserLang = navigator.language.split('-')[0];
      setLocaleState(browserLang === 'ru' ? 'ru' : 'en');
    }
  }, []);
  
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale, isMounted]);


  // Prevent hydration mismatch by only returning context value after mount
  if (!isMounted) {
    // Return a default context value or null during server render / pre-hydration
     return (
      <LanguageContext.Provider value={{ locale: 'en', setLocale: () => {}, translations: messages.en }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, translations: messages[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};
