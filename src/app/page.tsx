// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection';
import HistorySection from '@/components/sections/AboutSection'; // Renamed AboutSection to HistorySection
import ServicesSection from '@/components/sections/SkillsSection'; // Renamed SkillsSection to ServicesSection
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HistorySection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
