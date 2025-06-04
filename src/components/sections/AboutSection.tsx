// src/components/sections/AboutSection.tsx renamed to HistorySection conceptually
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { achievementsData, type Achievement } from '@/data/achievements';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const AchievementCard: React.FC<{ achievement: Achievement; index: number }> = ({ achievement, index }) => {
  const { t } = useLanguage();
  return (
    <ScrollAppear delay={`delay-${index * 100}`}>
      <Card className="bg-card/80 backdrop-blur-sm flicker-border-primary h-full flex flex-col">
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievementsData.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </div>
    </section>
  );
};

export default HistorySection;
