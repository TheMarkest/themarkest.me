import { setRequestLocale, getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/data/projects";
import ProjectsList, {
  type ProjectListItem,
} from "@/components/sections/ProjectsList";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projectsPage");
  const projects = await getAllProjects();
  const items: ProjectListItem[] = projects.map(
    ({ slug, title, year, role, category, tags }) => ({
      slug,
      title,
      year,
      role,
      category,
      tags,
    }),
  );

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 space-y-16 md:pt-40">
        <header className="space-y-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-secondary)]">
            {t("hero.lead")}
          </p>
        </header>
        <ProjectsList projects={items} />
      </div>
    </main>
  );
}
