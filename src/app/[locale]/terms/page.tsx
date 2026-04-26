import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pagesMeta.terms" });
  return { title: t("title"), description: t("description") };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 pb-20">
      <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold tracking-tight">
        {locale === "ru" ? "Условия использования" : "Terms of Use"}
      </h1>
      <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
        {locale === "ru"
          ? "Раздел в разработке."
          : "This section is under development."}
      </p>
    </div>
  );
}
