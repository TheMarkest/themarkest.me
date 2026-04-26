"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale: Locale = locale === "ru" ? "en" : "ru";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-secondary)] transition-all duration-[var(--duration-fast)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      aria-label={`Switch to ${locale === "ru" ? "English" : "Russian"}`}
    >
      {t("switchLang")}
    </button>
  );
}
