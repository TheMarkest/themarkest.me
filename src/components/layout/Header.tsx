// src/components/layout/Header.tsx
"use client";

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code2 } from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';

const Header = () => {
  const { t } = useLanguage();

  const navItems = [
    { href: '#home', labelKey: 'nav.home' },
    { href: '#history', labelKey: 'nav.history' },
    { href: '#services', labelKey: 'nav.services' },
    { href: '#projects', labelKey: 'nav.projects' },
    { href: '#contact', labelKey: 'nav.contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="#home" className="flex items-center gap-2">
          <Code2 className="h-8 w-8 text-primary flicker-text-primary" />
          <GlitchText text={t('appName')} className="font-headline text-2xl font-bold text-primary" />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button key={item.labelKey} variant="ghost" asChild className="text-foreground hover:text-accent hover:bg-accent/10">
              <Link href={item.href}>{t(item.labelKey)}</Link>
            </Button>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-accent text-accent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-primary/50">
              <nav className="flex flex-col gap-4 pt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.labelKey}
                    href={item.href}
                    className="text-xl font-medium text-foreground hover:text-accent"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
                <div className="mt-4">
                 <LanguageSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
