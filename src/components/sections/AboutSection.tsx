// src/components/sections/AboutSection.tsx renamed to HistorySection conceptually
"use client";

import type { ReactNode } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { achievementsData, type Achievement } from '@/data/achievements';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

// Helper to get Lucide Icon component by name
const getIcon = (iconName: string): React.ElementType => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.HelpCircle; // Fallback icon
};

interface AchievementEntryCardProps {
  achievement: Achievement;
  t: (key: string, fallback?: string) => string;
}

const AchievementEntryCard: React.FC<AchievementEntryCardProps> = ({ achievement, t }) => (
  <ScrollAppear className="w-full h-full">
    <Card className="bg-card/80 backdrop-blur-sm flicker-border-primary h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-code text-xl text-accent">{achievement.year ? `// ${achievement.year}` : `// ${t('appName')}`}</CardTitle>
        </div>
        <p className="font-headline text-2xl text-primary">{t(achievement.titleKey)}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground leading-relaxed font-body mb-4">
          {t(achievement.descriptionKey)}
        </p>
        {achievement.link && (
          <Button variant="link" asChild className="p-0 h-auto text-accent hover:text-primary">
            <a href={achievement.link} target="_blank" rel="noopener noreferrer">
              {achievement.linkTextKey ? t(achievement.linkTextKey) : t('history.learnMore', 'Learn More')} <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  </ScrollAppear>
);

interface IconDisplayProps {
  iconName: string;
  titleKey: string;
  t: (key: string, fallback?: string) => string;
  className?: string;
  isMobile?: boolean;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconName, titleKey, t, className, isMobile = false }) => {
  const IconComponent = getIcon(iconName);
  if (isMobile) {
    return (
      <div className={cn("flex items-center space-x-3", className)}>
        <IconComponent className="h-8 w-8 text-accent flex-shrink-0" />
        <p className="text-xs text-muted-foreground font-code">{t(titleKey)}</p>
      </div>
    );
  }
  return (
    <ScrollAppear className={cn("w-full h-full flex flex-col items-center justify-center text-center p-4", className)}>
      <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-accent mb-3" />
      <p className="text-xs md:text-sm text-muted-foreground font-code max-w-xs">{t(titleKey)}</p>
    </ScrollAppear>
  );
};


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

      <div className="relative max-w-5xl mx-auto mt-12"> {/* Increased max-width */}
        {/* The vertical timeline bar (Desktop) */}
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 z-0 hidden md:block" style={{height: '100%'}}></div>
        {/* The vertical timeline bar (Mobile) */}
        <div className="absolute top-0 bottom-0 left-3 transform -translate-x-1/2 w-1 bg-primary/30 z-0 md:hidden" style={{height: '100%'}}></div>

        <div className="space-y-0"> {/* No space-y needed, items manage their own padding */}
          {achievementsData.map((achievement, index) => {
            const isCardOnLeftForDesktop = index % 2 === 0;

            return (
              <div key={achievement.id} className="relative py-8 md:py-12"> {/* Padding for each item */}
                {/* Desktop Dot */}
                <div className={cn(
                  "hidden md:block absolute w-6 h-6 rounded-full bg-accent flicker-border-accent border-2 border-background flex items-center justify-center z-10",
                  "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Center dot on the timeline
                )}>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>
                {/* Mobile Dot - positioned relative to its item's top */}
                <div className={cn(
                  "md:hidden absolute w-6 h-6 rounded-full bg-accent flicker-border-accent border-2 border-background flex items-center justify-center z-10",
                  "top-8 left-3 transform -translate-x-1/2" // Align with typical card header start
                )}>
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-stretch justify-center">
                  <div className={cn("w-5/12 px-2 flex", isCardOnLeftForDesktop ? "justify-end" : "justify-start")}>
                    {isCardOnLeftForDesktop ? (
                      <AchievementEntryCard achievement={achievement} t={t} />
                    ) : (
                      <IconDisplay iconName={achievement.iconName} titleKey={achievement.titleKey} t={t} />
                    )}
                  </div>
                  <div className="w-2/12 flex-shrink-0"> {/* Central spacer for timeline */} </div>
                  <div className={cn("w-5/12 px-2 flex", isCardOnLeftForDesktop ? "justify-start" : "justify-end")}>
                    {isCardOnLeftForDesktop ? (
                      <IconDisplay iconName={achievement.iconName} titleKey={achievement.titleKey} t={t} />
                    ) : (
                      <AchievementEntryCard achievement={achievement} t={t} />
                    )}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden pl-10 pr-2"> {/* pl-10 to offset for mobile dot at left-3 (-1.5rem from 0) + padding */}
                  <AchievementEntryCard achievement={achievement} t={t} />
                  <div className="mt-4">
                    <IconDisplay iconName={achievement.iconName} titleKey={achievement.titleKey} t={t} isMobile={true} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
