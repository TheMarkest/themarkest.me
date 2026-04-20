"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "objects" | "merch" | "prints";
type Status = "available" | "soldOut" | "preorder";
type Filter = "all" | Category;

type Product = {
  id: string;
  title: string;
  price: number;
  currency: "USD";
  category: Category;
  status: Status;
  image: string;
};

const MOCK_PRODUCTS: Product[] = [
  { id: "aura-lamp", title: "AURA Lamp", price: 420, currency: "USD", category: "objects", status: "available", image: "" },
  { id: "bureau-hoodie", title: "Bureau Hoodie", price: 95, currency: "USD", category: "merch", status: "available", image: "" },
  { id: "schematic-print-1", title: "Schematic Print Vol.1", price: 60, currency: "USD", category: "prints", status: "soldOut", image: "" },
  { id: "themarkest-tee", title: "TheMarkest Tee", price: 45, currency: "USD", category: "merch", status: "available", image: "" },
  { id: "helix-object", title: "Helix Object", price: 680, currency: "USD", category: "objects", status: "preorder", image: "" },
  { id: "rd-notebook", title: "R&D Notebook", price: 28, currency: "USD", category: "merch", status: "available", image: "" },
  { id: "workshop-cap", title: "Workshop Cap", price: 38, currency: "USD", category: "merch", status: "soldOut", image: "" },
  { id: "blueprint-print-2", title: "Blueprint Print Vol.2", price: 70, currency: "USD", category: "prints", status: "preorder", image: "" },
];

const FILTERS: Filter[] = ["all", "objects", "merch", "prints"];

export default function ShopPage() {
  const t = useTranslations("shopPage");
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const products = useMemo(
    () => (filter === "all" ? MOCK_PRODUCTS : MOCK_PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-16">
        {/* Hero */}
        <section className="pt-32 md:pt-40">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            {t("hero.lead")}
          </p>
        </section>

        {/* Notice */}
        <aside
          role="note"
          className="rounded-[var(--radius-md)] border-l-2 border-[var(--color-accent)] bg-[var(--color-signal-dim)] px-5 py-4"
        >
          <p className="font-[family-name:var(--font-mono)] text-xs md:text-sm uppercase tracking-[0.18em] text-[var(--color-text)]">
            {t("notice")}
          </p>
        </aside>

        {/* Filters */}
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Categories">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-[var(--radius-sm)] border font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] transition-colors duration-[var(--duration-fast)]",
                  active
                    ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-dim)]"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]",
                )}
              >
                {t(`categories.${f}`)}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {products.length === 0 ? (
          <p className="py-24 text-center text-[var(--color-text-secondary)]">
            {t("empty")}
          </p>
        ) : (
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => {
              const showBadge = p.status !== "available";
              const badgeText = p.status === "soldOut" ? t("card.soldOut") : t("card.preorder");
              const isPreorder = p.status === "preorder";

              return (
                <motion.li
                  key={p.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: reduceMotion ? 0 : i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <a
                    href={`#${p.id}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-[var(--radius-lg)]"
                    aria-label={p.title}
                  >
                    <div className="aspect-square bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-lg)] grid-pattern relative overflow-hidden transition-all duration-[var(--duration-normal)] group-hover:scale-[1.02] group-hover:border-[var(--color-border-strong)]">
                      {showBadge && (
                        <span
                          className={cn(
                            "absolute top-3 right-3 px-2 py-1 rounded-[var(--radius-sm)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em]",
                            p.status === "soldOut"
                              ? "bg-[var(--color-signal-dim)] text-[var(--color-signal)]"
                              : "bg-[var(--color-accent-dim)] text-[var(--color-accent)]",
                          )}
                        >
                          {badgeText}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 space-y-1">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)]">
                        {isPreorder ? `${t("card.from")} $${p.price}` : `$${p.price}`}
                      </p>
                      <p className="pt-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--color-accent)] group-hover:text-[var(--color-accent-hover)]">
                        {t("card.view")} <span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
