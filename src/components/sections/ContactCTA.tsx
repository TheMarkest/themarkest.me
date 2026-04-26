"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export default function ContactCTA() {
  const t = useTranslations("sections.contact");

  return (
    <section className="relative border-t border-[var(--color-border)] py-[var(--spacing-section)] max-md:py-[var(--spacing-section-mobile)]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 bg-[var(--color-accent)] opacity-[0.03] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            CONTACT
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {t("description")}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {(
              [
                "partnership",
                "founder",
                "bureau",
                "media",
                "product",
                "general",
              ] as const
            ).map((type) => (
              <Link
                key={type}
                href={{ pathname: "/contact", query: { type } }}
                className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-5 py-2.5 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-secondary)] transition-all duration-[var(--duration-normal)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {t(`types.${type}`)}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
