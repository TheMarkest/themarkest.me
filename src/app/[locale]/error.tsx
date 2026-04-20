"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ reset }: Props) {
  const t = useTranslations("errors.generic");

  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-elevated)] p-8 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-[var(--color-text-secondary)]">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-all hover:shadow-[0_0_30px_var(--color-glow-accent)]"
          >
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-6 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface)]"
          >
            {t("home")}
          </Link>
        </div>
      </div>
    </main>
  );
}
