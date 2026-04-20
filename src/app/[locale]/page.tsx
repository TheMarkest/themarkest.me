import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ContactCTA from "@/components/sections/ContactCTA";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ProjectsPreview />
      <CapabilitiesSection />
      <ContactCTA />
    </>
  );
}
