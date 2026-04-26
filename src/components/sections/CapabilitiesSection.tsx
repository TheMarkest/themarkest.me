"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Cpu,
  FlaskConical,
  CircuitBoard,
  Rocket,
  Sparkles,
  Factory,
} from "lucide-react";

const capabilities = [
  { key: "cto", icon: Cpu },
  { key: "prototyping", icon: FlaskConical },
  { key: "systems", icon: CircuitBoard },
  { key: "consulting", icon: Rocket },
  { key: "creativity", icon: Sparkles },
  { key: "bureau", icon: Factory },
] as const;

export default function CapabilitiesSection() {
  const t = useTranslations("sections.capabilities");

  return (
    <section className="relative border-t border-[var(--color-border)] py-[var(--spacing-section)] max-md:py-[var(--spacing-section-mobile)]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            03
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition-all duration-[var(--duration-normal)] hover:border-[var(--color-accent-dim)] hover:bg-[var(--color-bg-surface)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-dim)]">
                <Icon className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-base font-semibold">
                {t(`items.${key}`)}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
