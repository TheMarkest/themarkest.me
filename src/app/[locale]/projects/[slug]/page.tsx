import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getProjectBySlug } from "@/lib/data/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: t("notFound.title") };
  }
  return {
    title: `${project.title}${t("meta.titleSuffix")}`,
    description: project.overview ?? "",
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const tCat = await getTranslations({
    locale,
    namespace: "projectsPage.categories",
  });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24 md:pt-40 space-y-16">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-block font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
        >
          {t("back")}
        </Link>

        {/* Hero */}
        <header className="space-y-6">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("eyebrow")}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight">
            {project.title}
          </h1>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
            <div className="flex gap-2">
              <dt className="text-[var(--color-text-muted)]">{t("info.year")}</dt>
              <dd>{project.year}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[var(--color-text-muted)]">{t("info.role")}</dt>
              <dd>{project.role}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-[var(--color-text-muted)]">
                {t("info.category")}
              </dt>
              <dd>{tCat(project.category)}</dd>
            </div>
          </dl>
        </header>

        {/* Tags */}
        {project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-[var(--color-border)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-text-secondary)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* Overview */}
        {project.overview && (
          <section className="space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              {t("sections.overview")}
            </h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {project.overview}
            </p>
          </section>
        )}

        {/* Tech */}
        {project.tech && project.tech.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              {t("sections.tech")}
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-primary)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Outcome */}
        {project.outcome && (
          <section className="space-y-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              {t("sections.outcome")}
            </h2>
            <p className="text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {project.outcome}
            </p>
          </section>
        )}

        {/* CTA */}
        <section className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 text-center md:p-12">
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-4xl">
            {t("cta.title")}
          </h3>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-[var(--color-accent)] px-8 py-3 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-bg)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            {t("cta.button")}
          </Link>
        </section>
      </div>
    </main>
  );
}
