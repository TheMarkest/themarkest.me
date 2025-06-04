// src/components/sections/SkillsSection.tsx
"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { skillsData, skillCategoryColors } from '@/data/skills';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { CheckCircle } from 'lucide-react';

const SkillsSection = () => {
  const { t } = useLanguage();

  // Group skills by category for display
  const groupedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    // Sort by importance within category
    acc[skill.category].sort((a, b) => b.importance - a.importance);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  return (
    <section id="skills" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-4 text-center">
          <GlitchText text={t('skills.title')} className="text-primary" />
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t('skills.intro')}
        </p>
      </ScrollAppear>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, skillsInCategory], index) => (
          <ScrollAppear key={category} delay={`delay-${index * 100}`}>
            <Card className="h-full bg-card/80 backdrop-blur-sm flicker-border-accent">
              <CardHeader>
                <CardTitle 
                  className="font-code text-xl" 
                  style={{ color: skillCategoryColors[category as keyof typeof skillCategoryColors] || 'hsl(var(--accent))' }}
                >
                  {`// ${category}_MODULE`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {skillsInCategory.slice(0, 7).map((skill) => ( // Show top 7 skills per category
                    <li key={skill.name} className="flex items-center font-body text-muted-foreground">
                      <CheckCircle 
                        className="h-4 w-4 mr-2 shrink-0" 
                        style={{ color: skillCategoryColors[category as keyof typeof skillCategoryColors] || 'hsl(var(--accent))' }}
                      />
                      {skill.name}
                      <span className="ml-auto text-xs opacity-70 font-code">
                        {`lvl: ${skill.importance}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollAppear>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
