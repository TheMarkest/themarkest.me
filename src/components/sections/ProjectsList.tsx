"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/lib/data/projects";

export type ProjectListItem = Pick<
  Project,
  "slug" | "title" | "year" | "role" | "category" | "tags"
>;

type Filter = "all" | ProjectCategory;

const FILTERS: Filter[] = ["all", "startup", "hardware", "show", "rnd"];

export default function ProjectsList({
  projects,
}: {
  projects: ProjectListItem[];
}) {
  const t = useTranslations("projectsPage");
  const [active, setActive] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div
        role="tablist"
        aria-label={t("hero.eyebrow")}
        className="flex flex-wrap gap-3"
      >
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <motion.button
              key={f}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className={cn(
                "rounded-full border px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest transition-colors",
                isActive
                  ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
              )}
            >
              {t(`filters.${f}`)}
            </motion.button>
          );
        })}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-20 text-center text-[var(--color-text-secondary)]">
          {t("empty")}
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: reduceMotion ? 0 : i * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/projects/${p.slug}`}
                className="group block h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_0_1px_var(--color-accent-dim)]"
              >
                <span className="inline-block rounded-full border border-[var(--color-accent-dim)] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--color-accent)]">
                  {t(`filters.${p.category}`)}
                </span>

                <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)]">
                  {p.title}
                </h2>

                <dl className="mt-5 space-y-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-secondary)]">
                  <div className="flex gap-2">
                    <dt className="uppercase tracking-widest text-[var(--color-text-muted)]">
                      {t("card.year")}
                    </dt>
                    <dd>{p.year}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="uppercase tracking-widest text-[var(--color-text-muted)]">
                      {t("card.role")}
                    </dt>
                    <dd>{p.role}</dd>
                  </div>
                </dl>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-md border border-[var(--color-border)] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-text-secondary)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
