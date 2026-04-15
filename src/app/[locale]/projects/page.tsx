import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
        PROJECTS
      </span>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight">
        {locale === "ru" ? "Проекты" : "Projects"}
      </h1>
      <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
        {locale === "ru"
          ? "Раздел в разработке."
          : "This section is under development."}
      </p>
    </div>
  );
}
