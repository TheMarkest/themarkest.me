// src/components/sections/SkillsSection.tsx (conceptually "ServicesSection")
"use client";

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { servicesData, type Service } from '@/data/services';
import * as LucideIcons from 'lucide-react';

// Helper to get Lucide Icon component by name
const getIcon = (iconName: string): React.ElementType => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.AlertCircle; // Fallback icon
};


const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const { t } = useLanguage();
  const Icon = getIcon(service.iconName);

  return (
    <ScrollAppear delay={`delay-${index * 100}`}>
      <Card className="h-full bg-card/80 backdrop-blur-sm flicker-border-accent flex flex-col">
        <CardHeader className="flex-row items-center space-x-4 pb-2">
          <Icon className="h-10 w-10 text-accent" />
          <CardTitle className="font-headline text-2xl text-primary">
            {t(service.titleKey)}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-2">
          <p className="text-muted-foreground font-body leading-relaxed">
            {t(service.descriptionKey)}
          </p>
        </CardContent>
      </Card>
    </ScrollAppear>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-4 text-center">
          <GlitchText text={t('services.title')} className="text-primary" />
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          {t('services.intro')}
        </p>
      </ScrollAppear>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
