import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const CAPABILITY_KEYS = [
  "hardware",
  "software",
  "prototyping",
  "rnd",
  "product",
  "show",
] as const;

const PROCESS_KEYS = ["discover", "design", "build", "ship"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pagesMeta.lab" });
  return { title: t("title"), description: t("description") };
}

export default async function LabPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "labPage" });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-32 px-6 pt-32 pb-32 md:space-y-40 md:pt-40">
        <section>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            {t("hero.title")}
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-[var(--color-text-secondary)] md:text-xl">
            {t("hero.lead")}
          </p>
        </section>

        <section className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
              {t("intro.title")}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {t("intro.body")}
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            {t("capabilities.title")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITY_KEYS.map((key) => (
              <article
                key={key}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-colors duration-[var(--duration-normal)] hover:border-[var(--color-border-strong)]"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
                  {t(`capabilities.items.${key}.title`)}
                </h3>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  {t(`capabilities.items.${key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            {t("process.title")}
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
              >
                <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-accent)]">
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="mt-3 text-[var(--color-text-secondary)]">
                  {t(`process.steps.${key}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-10 text-center md:p-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-text-secondary)]">
            {t("cta.body")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)]"
          >
            {t("cta.button")} <span aria-hidden>→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
