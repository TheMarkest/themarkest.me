import { useTranslations } from "next-intl";

const metricKeys = ["years", "projects", "startups", "audience"] as const;

export default function TrustSection() {
  const t = useTranslations("sections.trust");

  return (
    <section className="border-t border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("subtitle")}
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {metricKeys.map((key) => (
            <div key={key} className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight text-[var(--color-accent)] md:text-6xl">
                {t(`metrics.${key}.value`)}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t(`metrics.${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
