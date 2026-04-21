"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Category = "all" | "startup" | "hardware" | "show" | "rnd";

type MockProject = {
  id: string;
  title: string;
  category: Category;
  year: string;
  description: string;
};

// Mock data until CMS is integrated
const mockProjects: MockProject[] = [
  {
    id: "project-alfa",
    title: "Project Alfa",
    category: "startup",
    year: "2023",
    description: "High-load startup architecture and team built from scratch.",
  },
  {
    id: "project-beta",
    title: "Project Beta",
    category: "hardware",
    year: "2022",
    description: "Custom robotics platform for automated warehousing.",
  },
  {
    id: "project-gamma",
    title: "Project Gamma",
    category: "show",
    year: "2024",
    description: "Interactive engineering show for a large tech conference.",
  },
  {
    id: "project-delta",
    title: "Project Delta",
    category: "rnd",
    year: "2023",
    description: "Research and development on custom 3D printing filaments.",
  },
];

export function ProjectsClient() {
  const t = useTranslations("projectsPage");
  const [filter, setFilter] = useState<Category>("all");

  const filters: Category[] = ["all", "startup", "hardware", "show", "rnd"];

  const filteredProjects = mockProjects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-20">
      {/* Hero Section */}
      <section className="mb-20">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-accent">
          {t("hero.eyebrow")}
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight">
          {t("hero.title")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-text-secondary">
          {t("hero.lead")}
        </p>
      </section>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-wider rounded border border-border transition-colors",
              filter === f
                ? "bg-text text-bg"
                : "bg-transparent text-text-secondary hover:text-text hover:border-text-secondary"
            )}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="min-h-[500px]">
        {filteredProjects.length === 0 ? (
          <p className="text-text-secondary">{t("empty")}</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-bg-surface p-6 transition-colors hover:border-border-strong"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-[family-name:var(--font-mono)] text-xs text-text-secondary uppercase">
                        {t(`categories.${project.category as "startup" | "hardware" | "show" | "rnd"}`)}
                      </span>
                      <span className="font-[family-name:var(--font-mono)] text-xs text-text-secondary">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl font-bold text-text">
                      {project.title}
                    </h3>
                    <p className="text-sm text-text-secondary group-hover:text-text transition-colors">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100 uppercase font-[family-name:var(--font-mono)] text-xs text-accent">
                    <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`}>
                      <span className="sr-only">{t("card.viewCase")}</span>
                    </Link>
                    {t("card.viewCase")} &rarr;
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
