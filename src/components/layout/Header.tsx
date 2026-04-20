"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const navKeys = [
  "about",
  "projects",
  "collaboration",
  "lab",
  "shop",
  "contact",
] as const;

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--color-text)]"
        >
          THE<span className="text-[var(--color-accent)]">MARKEST</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navKeys.map((key) => (
            <Link
              key={key}
              href={key === "about" ? "/about" : `/${key}`}
              className="text-sm text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-text)]"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
