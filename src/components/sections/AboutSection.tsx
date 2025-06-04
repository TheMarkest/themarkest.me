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
  t: (key: string, fallback?: string) => string; // t is kept for potential future use
  className?: string;
  isMobile?: boolean;
}

const IconDisplay: React.FC<IconDisplayProps> = ({ iconName, t, className, isMobile = false }) => {
  const IconComponent = getIcon(iconName);
  if (isMobile) {
    return (
      <div className={cn("flex items-center mt-4 ml-1", className)}>
        <IconComponent className="h-8 w-8 text-accent flex-shrink-0" />
      </div>
    );
  }
  return (
    <ScrollAppear className={cn("flex items-center justify-center", className)}>
      <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-accent" />
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

      <div className="relative max-w-5xl mx-auto mt-12">
        <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 z-0 hidden md:block" style={{height: '100%'}}></div>
        <div className="absolute top-0 bottom-0 left-3 transform -translate-x-1/2 w-1 bg-primary/30 z-0 md:hidden" style={{height: '100%'}}></div>

        <div className="space-y-0">
          {achievementsData.map((achievement, index) => {
            const isCardOnLeftForDesktop = index % 2 === 0;

            return (
              <div key={achievement.id} className="relative py-8 md:py-12">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center w-full">
                  {isCardOnLeftForDesktop ? (
                    // Card on Left, Icon on Right
                    <>
                      <div className="w-6/12 px-4 flex justify-end">
                        <AchievementEntryCard achievement={achievement} t={t} />
                      </div>
                      <div className="w-2/12 px-2 flex-shrink-0 relative">
                        <div className="h-0.5 w-full bg-primary/50"></div>
                      </div>
                      <div className="w-4/12 px-2 flex justify-start">
                        <IconDisplay iconName={achievement.iconName} t={t} />
                      </div>
                    </>
                  ) : (
                    // Icon on Left, Card on Right
                    <>
                      <div className="w-4/12 px-2 flex justify-end">
                        <IconDisplay iconName={achievement.iconName} t={t} />
                      </div>
                      <div className="w-2/12 px-2 flex-shrink-0 relative">
                        <div className="h-0.5 w-full bg-primary/50"></div>
                      </div>
                      <div className="w-6/12 px-4 flex justify-start">
                        <AchievementEntryCard achievement={achievement} t={t} />
                      </div>
                    </>
                  )}
                </div>
                
                {/* Central Dot for Desktop */}
                <div className={cn(
                  "hidden md:block absolute w-6 h-6 rounded-full bg-accent flicker-border-accent border-2 border-background flex items-center justify-center z-10",
                  "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // Adjusted to ensure it's exactly on the vertical line
                )}>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                </div>

                {/* Mobile Dot */}
                <div className={cn(
                  "md:hidden absolute w-6 h-6 rounded-full bg-accent flicker-border-accent border-2 border-background flex items-center justify-center z-10",
                  "top-8 left-3 transform -translate-x-1/2" // Ensure this aligns with the mobile timeline bar
                )}>
                  <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden pl-10 pr-2"> {/* Ensure padding aligns with dot position */}
                  <AchievementEntryCard achievement={achievement} t={t} />
                  <IconDisplay iconName={achievement.iconName} t={t} isMobile={true} />
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
