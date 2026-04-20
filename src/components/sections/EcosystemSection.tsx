import { useTranslations } from "next-intl";
import { Youtube, Send, Instagram, Music2 } from "lucide-react";

const channels = [
  { key: "youtube", icon: Youtube },
  { key: "telegram", icon: Send },
  { key: "instagram", icon: Instagram },
  { key: "tiktok", icon: Music2 },
] as const;

export default function EcosystemSection() {
  const t = useTranslations("sections.ecosystem");

  return (
    <section className="border-t border-[var(--color-border)] py-24 md:py-32">
      <div className="mx-auto max-w-7xl space-y-12 px-6">
        <div>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            ECOSYSTEM
          </span>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6 transition hover:border-[var(--color-border-strong)]"
            >
              <Icon className="mb-4 h-6 w-6 text-[var(--color-accent)]" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {t(`channels.${key}.name`)}
              </h3>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-[var(--color-accent)]">
                {t(`channels.${key}.handle`)}
              </p>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                {t(`channels.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
