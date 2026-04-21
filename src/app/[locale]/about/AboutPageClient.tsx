"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AboutPageClient() {
  const t = useTranslations("about");

  // Since next-intl might need a list for items, we can use `t.raw`
  const timelineItems = t.raw("timeline.items") as {
    year: string;
    title: string;
    body: string;
  }[];

  const skillGroups = t.raw("skills.groups") as Record<
    string,
    { title: string; items: string[] }
  >;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl px-6 pt-32 pb-20"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="mb-24">
        <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
          {t("hero.eyebrow")}
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          {t("hero.title")}
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-[var(--color-text-secondary)]">
          {t("hero.lead")}
        </p>
      </motion.section>

      {/* Bio Section */}
      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="mb-6 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          {t("bio.title")}
        </h2>
        <div className="prose prose-invert max-w-none text-lg leading-relaxed text-[var(--color-text-secondary)]">
          <p>{t("bio.body")}</p>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section variants={itemVariants} className="mb-24">
        <h2 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          {t("timeline.title")}
        </h2>
        <div className="space-y-12">
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="relative pl-8 md:pl-0"
            >
              <div className="flex flex-col md:flex-row md:gap-12">
                <div className="md:w-1/4">
                  <div className="font-[family-name:var(--font-mono)] text-xl font-medium text-[var(--color-accent)]">
                    {item.year}
                  </div>
                </div>
                <div className="mt-2 md:mt-0 md:w-3/4">
                  <h3 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-10 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight">
          {t("skills.title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skillGroups).map(([key, group]) => (
            <motion.div
              key={key}
              variants={itemVariants}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-colors hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-surface)]"
            >
              <h3 className="mb-6 font-[family-name:var(--font-mono)] text-[var(--color-accent)]">
                // {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill, index) => (
                  <li
                    key={index}
                    className="rounded-full bg-[var(--color-bg)] px-3 py-1 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}