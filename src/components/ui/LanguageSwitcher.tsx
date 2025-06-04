// src/components/ui/LanguageSwitcher.tsx
"use client";

import { useLanguage, type Locale } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    const newLocale: Locale = locale === 'en' ? 'ru' : 'en';
    setLocale(newLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-foreground hover:text-accent hover:bg-accent/10 font-code"
      aria-label={`Switch to ${locale === 'en' ? 'Russian' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span>{locale === 'en' ? t('language.switch.ru') : t('language.switch.en')}</span>
    </Button>
  );
};

export default LanguageSwitcher;
