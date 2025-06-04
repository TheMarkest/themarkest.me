// src/components/sections/AboutSection.tsx
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import Image from 'next/image';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-12 text-center">
          <GlitchText text={t('about.title')} className="text-primary" />
        </h2>
      </ScrollAppear>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <ScrollAppear delay="delay-200">
          <Card className="bg-card/80 backdrop-blur-sm flicker-border-primary">
            <CardHeader>
              <CardTitle className="font-code text-2xl text-accent">{'>'} WhoWeAre.init</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed font-body">
                {t('about.content')}
              </p>
              <div className="mt-6 font-code text-sm text-primary/80">
                <p>// STATUS: OPERATIONAL</p>
                <p>// ETHOS: HIGH_TECH_LOW_LIFE</p>
                <p>// OBJECTIVE: CHALLENGE_STATUS_QUO</p>
              </div>
            </CardContent>
          </Card>
        </ScrollAppear>
        <ScrollAppear className="flex justify-center" delay="delay-400">
          <Image 
            src="https://placehold.co/500x500.png" 
            alt="CyberMarks Team Abstract Visual" 
            width={500} 
            height={500} 
            className="rounded-lg shadow-xl flicker-border-accent object-cover"
            data-ai-hint="abstract cyberpunk team" 
          />
        </ScrollAppear>
      </div>
    </section>
  );
};

export default AboutSection;
