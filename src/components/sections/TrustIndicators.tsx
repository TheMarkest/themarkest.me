import { useTranslations } from "next-intl";

export default function TrustIndicators() {
  const t = useTranslations("sections.trust");

  return (
    <section className="py-16 md:py-24 border-y border-[var(--color-border,#ffffff12)] bg-[var(--color-elevated,#12121a)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-handjet text-[var(--color-text,#f0f0f5)] font-bold tracking-wider uppercase">
            {t("title")}
          </h2>
          <p className="mt-2 text-[var(--color-secondary,#8888a0)] font-sans">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {["years", "projects", "startups", "audience"].map((key) => (
            <div key={key} className="flex flex-col items-center justify-center p-6 border border-[var(--color-border,#ffffff12)] bg-[var(--color-surface,#1a1a26)] rounded-lg">
              <span className="text-4xl md:text-5xl font-handjet font-bold text-[var(--color-accent,#00e5ff)] mb-2">
                {t(`metrics.${key}.value`)}
              </span>
              <span className="text-sm md:text-base text-[var(--color-secondary,#8888a0)] font-sans text-center">
                {t(`metrics.${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
