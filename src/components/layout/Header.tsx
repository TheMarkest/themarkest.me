"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navKeys = [
  "about",
  "projects",
  "collaboration",
  "lab",
  "content",
  "shop",
  "contact",
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          THE<span className="text-[var(--color-accent)]">MARKEST</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              className="text-sm text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text)]"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? t("close") : t("menu")}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-16 w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col px-6 py-6 space-y-4">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text)] active:text-[var(--color-accent)]"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
