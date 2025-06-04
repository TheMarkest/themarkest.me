// src/components/sections/AboutSection.tsx renamed to HistorySection conceptually
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { achievementsData, type Achievement } from '@/data/achievements';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const HistorySection = () => {
  const { t } = useLanguage();

  return (
    <section id="history" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-4 text-center">
          <GlitchText text={t('history.title')} className="text-primary" />
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t('history.intro')}
        </p>
      </ScrollAppear>

      {/* Timeline container */}
      <div className="relative max-w-2xl mx-auto mt-12">
        {/* The vertical timeline bar */}
        <div className="absolute top-0 bottom-0 left-3 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-primary/30 z-0"></div>

        {/* Achievements list */}
        <div className="space-y-16"> {/* Spacing between each timeline item */}
          {achievementsData.map((achievement, index) => (
            <div
              key={achievement.id}
              className="relative pl-10 md:pl-0" // Padding for mobile (dot on left), none for centered desktop
            >
              {/* Dot on the timeline */}
              <div
                className={cn(
                  "absolute top-1 w-6 h-6 rounded-full bg-accent flicker-border-accent border-2 border-background flex items-center justify-center z-10",
                  "left-3 transform -translate-x-1/2", // Mobile: dot centered on the left-side line
                  "md:left-1/2 md:transform md:-translate-x-1/2" // Desktop: dot centered on the middle line
                )}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div> {/* Inner dot */}
              </div>

              {/* Achievement Card content */}
              <div
                className={cn(
                  "ml-8 md:ml-0", // Mobile: card to the right of dot/line. Desktop: margin reset, card centered below dot
                  "md:flex md:justify-center md:mt-0" // Desktop: center card container, mt-0 as spacing is on parent
                )}
              >
                <ScrollAppear delay={`delay-${index * 100}`} className="md:w-full md:max-w-lg">
                  <Card className="bg-card/80 backdrop-blur-sm flicker-border-primary h-full flex flex-col w-full">
                    <CardHeader>
                      <CardTitle className="font-code text-xl text-accent">{achievement.year ? `// ${achievement.year}` : `// ${t('appName')}`}</CardTitle>
                      <p className="font-headline text-2xl text-primary">{t(achievement.titleKey)}</p>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground leading-relaxed font-body mb-4">
                        {t(achievement.descriptionKey)}
                      </p>
                      {achievement.link && (
                        <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-primary">
                          <a href={achievement.link} target="_blank" rel="noopener noreferrer">
                            {achievement.linkTextKey ? t(achievement.linkTextKey) : 'Learn More'} <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </ScrollAppear>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
