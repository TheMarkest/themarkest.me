import { useTranslations } from "next-intl";

export default function PositioningSection() {
  const t = useTranslations("sections.positioning");

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,var(--color-dim,#00e5ff33)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-handjet font-bold text-[var(--color-text,#f0f0f5)] mb-6 tracking-wider uppercase max-w-4xl">
          {t("title")}
        </h2>
        
        <p className="text-lg md:text-xl xl:text-2xl text-[var(--color-secondary,#8888a0)] font-sans max-w-3xl leading-relaxed">
          {t("description")}
        </p>
      </div>
    </section>
  );
}
