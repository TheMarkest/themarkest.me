import { useTranslations } from "next-intl";

export default function EcosystemSection() {
  const t = useTranslations("sections.ecosystem");

  const channels = ["youtube", "telegram", "instagram", "tiktok"] as const;

  return (
    <section className="py-24 border-t border-[var(--color-border,#ffffff12)] bg-[var(--color-bg,#0a0a0f)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-handjet font-bold text-[var(--color-text,#f0f0f5)] tracking-wider uppercase mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-[var(--color-secondary,#8888a0)] font-sans">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel) => (
            <div 
              key={channel} 
              className="group flex flex-col p-6 rounded-xl border border-[var(--color-border,#ffffff12)] bg-[var(--color-elevated,#12121a)] hover:border-[var(--color-accent,#00e5ff)] transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-handjet font-bold text-[var(--color-text,#f0f0f5)] tracking-wide">
                  {t(`channels.${channel}.name`)}
                </span>
              </div>
              
              <div className="mt-auto">
                <div className="text-[var(--color-accent,#00e5ff)] font-mono text-sm mb-2">
                  {t(`channels.${channel}.handle`)}
                </div>
                <p className="text-sm text-[var(--color-secondary,#8888a0)] font-sans">
                  {t(`channels.${channel}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
