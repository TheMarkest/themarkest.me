import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="text-sm text-[var(--color-text-muted)]">
          &copy; {year} TheMarkest. {t("rights")}
        </p>
        <div className="flex items-center gap-6 text-sm text-[var(--color-text-muted)]">
          <Link
            href="/privacy"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-[var(--color-text-secondary)]"
          >
            {t("terms")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
