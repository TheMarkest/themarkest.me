import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
      <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
        PROJECT
      </span>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
        {locale === "ru"
          ? "Кейс в разработке."
          : "Case study under development."}
      </p>
    </div>
  );
}
