"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/routing";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

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
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const panelId = useId();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const panelInitial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: "100%" };
  const panelAnimate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0 };
  const panelExit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: "100%" };

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

        {/* Desktop Navigation */}
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
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Burger (mobile only) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("menu")}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col border-t border-[var(--color-border)] bg-[var(--color-bg)] md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end px-6 py-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-6">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  onClick={() => setOpen(false)}
                  className="font-[family-name:var(--font-display)] flex min-h-12 items-center border-b border-[var(--color-border)] py-3 text-2xl tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {t(key)}
                </Link>
              ))}
            </nav>

            {/* Footer / Language */}
            <div className="border-t border-[var(--color-border)] px-6 py-6">
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
