// src/components/sections/HeroSection.tsx
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import SkillCloud from '@/components/ui/SkillCloud';
import GlitchText from '@/components/ui/GlitchText';
import ScrollAppear from '@/components/ui/ScrollAppear';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-12 md:py-24 bg-gradient-to-b from-background to-background/80">
      {/* Background visuals (subtle if skill cloud is complex) */}
      <div className="absolute inset-0 opacity-10 flicker-border-primary">
        {/* Could be a static SVG pattern or a very subtle animated background */}
      </div>
      
      <div className="container z-10">
        <ScrollAppear>
          <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl mb-6">
            <GlitchText text={t('hero.title')} className="text-primary" />
          </h1>
        </ScrollAppear>
        <ScrollAppear delay="delay-200">
          <p className="font-body text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
        </ScrollAppear>
        
        <ScrollAppear className="w-full max-w-2xl mx-auto mb-12" delay="delay-400">
           <SkillCloud width={600} height={400} />
        </ScrollAppear>

        <ScrollAppear delay="delay-600">
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
