import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage.meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactLayout({ params, children }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return children;
}
