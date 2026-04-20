"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import HeroSceneClient from "@/components/three/HeroSceneClient";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="noise-overlay relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D background scene */}
      <HeroSceneClient />

      {/* Grid background */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />

      {/* Gradient orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[var(--color-signal)] opacity-[0.04] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent)]" />
          <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-secondary)]">
            {t("status")}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient-accent">{t("headline")}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg text-[var(--color-text-secondary)] md:text-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group relative inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-8 py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-bg)] transition-all duration-[var(--duration-normal)] hover:shadow-[0_0_30px_var(--color-glow-accent)]"
          >
            {t("cta.projects")}
            <span className="transition-transform duration-[var(--duration-normal)] group-hover:translate-x-1">
              →
            </span>
          </Link>
          <Link
            href="/collaboration"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-8 py-3.5 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-text)] transition-all duration-[var(--duration-normal)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            {t("cta.collaborate")}
          </Link>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
    </section>
  );
}
