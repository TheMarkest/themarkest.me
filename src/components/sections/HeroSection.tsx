"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight, Github, Code, Send } from "lucide-react";
import HeroSceneClient from "@/components/three/HeroSceneClient";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 3D Scene Background instead of grid/noise */}
      <HeroSceneClient />

      {/* Grid background - very subtle, not nerdy, just structural */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.03]" />

      {/* Ambient gradient orbs - premium blurred look */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)] opacity-[0.06] blur-[200px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-[var(--color-signal)] opacity-[0.06] blur-[200px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-[#12121a]/80 backdrop-blur-md px-5 py-2.5 shadow-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-signal)] opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-signal)]"></span>
          </span>
          <span className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
            {t("status", { fallback: "CURRENT FOCUS: OLYMP SYSTEM" })}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
            {t("headline")}
          </span>
        </motion.h1>

        {/* Subheadline - sleeker, cleaner font */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-body)] text-lg font-light leading-relaxed text-[var(--color-text-secondary)] md:text-xl"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row"
        >
          <Link
            href="/projects"
            className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[#00b3cc] px-8 py-4 font-[family-name:var(--font-display)] text-[15px] font-semibold text-[#0a0a0f] shadow-[0_0_40px_var(--color-glow-accent)] transition-all duration-[var(--duration-normal)] hover:scale-[1.02] hover:shadow-[0_0_60px_var(--color-glow-accent)] sm:w-auto"
          >
            {t("cta.projects")}
            <ArrowRight className="h-4 w-4 transition-transform duration-[var(--duration-normal)] group-hover:translate-x-1" />
          </Link>
          <Link
            href="/collaboration"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]/50 backdrop-blur-sm px-8 py-4 font-[family-name:var(--font-display)] text-[15px] font-medium text-[var(--color-text)] transition-all duration-[var(--duration-normal)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] sm:w-auto"
          >
            {t("cta.collaborate")}
          </Link>
        </motion.div>

        {/* Socials / Trust signals bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 text-[var(--color-text-muted)]"
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--color-text)]">
            <Github className="h-5 w-5" />
            <span className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider">GitHub</span>
          </a>
          <a href="https://t.me" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--color-text)]">
            <Send className="h-5 w-5" />
            <span className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider">Telegram</span>
          </a>
          <a href="https://go-vanlife.ru" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-[var(--color-text)]">
            <Code className="h-5 w-5" />
            <span className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider">Go Vanlife</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent" />
    </section>
  );
}
