import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <span className="font-[family-name:var(--font-mono)] text-8xl font-bold text-[var(--color-accent-dim)]">
          404
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold">
          {t("title")}
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t("description")}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] transition-all hover:shadow-[0_0_30px_var(--color-glow-accent)]"
        >
          {t("goHome")}
        </Link>
      </div>
    </div>
  );
}
