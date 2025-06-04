// src/components/layout/Footer.tsx
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/30 bg-background/80 py-8 text-center">
      <div className="container">
        <div className="mb-4 flex justify-center space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-accent">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-accent">
            <Linkedin size={24} />
          </a>
          <a href="mailto:contact@themarkest.me" aria-label="Email" className="text-muted-foreground hover:text-accent">
            <Mail size={24} />
          </a>
        </div>
        <p className="text-sm text-muted-foreground font-code">
          &copy; {currentYear} <span className="text-primary">{t('appName')}</span>. {t('footer.rights')}
        </p>
         <p className="mt-2 text-xs text-muted-foreground/70">
          Built with Next.js & Tailwind CSS. Deployed on Firebase.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
