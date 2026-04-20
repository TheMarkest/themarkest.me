import { useTranslations } from "next-intl";

export default function PositioningSection() {
  const t = useTranslations("sections.positioning");

  return (
    <section className="border-t border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 md:grid-cols-2 md:gap-24">
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl">
          {t("title")}
        </h2>
        <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
