import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ProjectsClient } from "./ProjectsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projectsPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsClient />;
}
