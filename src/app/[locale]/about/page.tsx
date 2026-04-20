import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

type SkillGroupKey = "engineering" | "software" | "product";

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const timelineItems = t.raw("timeline.items") as TimelineItem[];
  const skillGroups: SkillGroupKey[] = ["engineering", "software", "product"];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-32 px-6 pt-32 pb-32 md:space-y-48 md:pt-40">
        {/* Hero */}
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

        {/* Bio */}
        <section className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="md:sticky md:top-32 md:self-start">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
              {t("bio.title")}
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {t("bio.body")}
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            {t("timeline.title")}
          </h2>
          <ol className="relative mt-12 border-l border-[var(--color-border)] pl-8 md:pl-12">
            {timelineItems.map((item, index) => (
              <li
                key={`${item.year}-${index}`}
                className="relative pb-12 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(0.5rem+1px)] top-2 h-3 w-3 rounded-full bg-[var(--color-accent)] md:-left-[calc(0.75rem+1px)] md:h-4 md:w-4"
                />
                <div className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-accent)]">
                  {item.year}
                </div>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base text-[var(--color-text-secondary)] md:text-lg">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
            {t("skills.title")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {skillGroups.map((group) => {
              const items = t.raw(`skills.groups.${group}.items`) as string[];
              return (
                <article
                  key={group}
                  className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
                    {t(`skills.groups.${group}.title`)}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-secondary)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
