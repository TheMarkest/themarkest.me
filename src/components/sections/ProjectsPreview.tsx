"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const flagshipProjects = [
  {
    slug: "go-vanlife",
    name: "Go Vanlife",
    year: "2023",
    tags: ["Product", "Startup", "Full-Stack"],
  },
  {
    slug: "slimrate",
    name: "Slimrate",
    year: "2024",
    tags: ["SaaS", "Architecture", "CTO"],
  },
  {
    slug: "ar-hunter",
    name: "AR Hunter",
    year: "2022",
    tags: ["AR", "Mobile", "Gaming"],
  },
  {
    slug: "olymp",
    name: "Олимп",
    year: "2023",
    tags: ["Platform", "EdTech"],
  },
  {
    slug: "datasuite",
    name: "DataSuite",
    year: "2024",
    tags: ["Data", "Analytics", "Enterprise"],
  },
  {
    slug: "ana-avatar-xprize",
    name: "ANA Avatar XPRIZE",
    year: "2022",
    tags: ["Robotics", "Hardware", "Competition"],
  },
];

export default function ProjectsPreview() {
  const t = useTranslations("sections.projects");

  return (
    <section className="relative py-[var(--spacing-section)] max-md:py-[var(--spacing-section-mobile)]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
              02
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] md:block"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {/* Projects grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {flagshipProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-[var(--duration-normal)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]"
              >
                {/* Placeholder for project cover */}
                <div className="mb-4 aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-bg-surface)]">
                  <div className="grid-pattern flex h-full items-center justify-center opacity-40">
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                      COVER
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold transition-colors group-hover:text-[var(--color-accent)]">
                    {project.name}
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
                    {project.year}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-bg-overlay)] px-2.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
