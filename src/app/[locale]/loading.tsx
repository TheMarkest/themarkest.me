import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <span
          aria-hidden="true"
          className="h-3 w-3 animate-pulse rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-glow-accent)]"
        />
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
          {t("loadingPage")}
        </span>
      </div>
    </div>
  );
}
