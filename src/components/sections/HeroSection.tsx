
// src/components/sections/HeroSection.tsx
"use client";

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import SkillCloud from '@/components/ui/SkillCloud';
import GlitchText from '@/components/ui/GlitchText';
import ScrollAppear from '@/components/ui/ScrollAppear';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  const roles = [
    t('hero.role1'),
    t('hero.role2'),
    t('hero.role3'),
    t('hero.role4'),
    t('hero.role5'),
    t('hero.role6'),
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-24">
      {/* SkillCloud as background */}
      <SkillCloud />
      
      {/* Overlay to ensure text readability over the skill cloud */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm z-0"></div>

      <div className="container z-10 relative"> {/* Ensure content is above the background and overlay */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12 md:mb-16">
          <ScrollAppear className="text-center md:text-left">
            <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl mb-4">
              <GlitchText text={t('hero.name')} className="text-primary" />
            </h1>
            <div className="font-code text-md md:text-lg text-muted-foreground space-y-1">
              {roles.map((role, index) => (
                <p key={index}>{`// ${role}`}</p>
              ))}
            </div>
             <p className="font-body text-lg md:text-xl text-foreground mt-6 mb-6">{t('skills.intro')}</p>
          </ScrollAppear>
          <ScrollAppear className="flex justify-center md:justify-end" delay="delay-200">
            <Image
              src="https://optim.tildacdn.pub/tild6463-3331-4732-a266-336365336462/-/format/webp/144-DSC07979.jpg"
              alt={t('hero.name')}
              width={400}
              height={400}
              className="rounded-lg shadow-xl flicker-border-accent object-cover aspect-square"
              data-ai-hint="portrait man"
              priority
            />
          </ScrollAppear>
        </div>
        
        {/* CTA Button - SkillCloud intro text is now part of the main text block */}
        <ScrollAppear delay="delay-600" className="text-center">
          <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground group font-code text-lg px-8 py-6 flicker-border-accent" asChild>
            <a href="#projects">
              {t('hero.cta')} <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </ScrollAppear>
      </div>
    </section>
  );
};

export default HeroSection;
