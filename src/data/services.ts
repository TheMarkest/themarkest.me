// src/data/services.ts
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  titleKey: string;
  descriptionKey: string;
  iconName: string; // Key for lucide-react icons, or custom SVG path
}

export const servicesData: Service[] = [
  {
    id: 'itDevelopment',
    titleKey: 'services.itDevelopment.title',
    descriptionKey: 'services.itDevelopment.description',
    iconName: 'Laptop', 
  },
  {
    id: 'speaker',
    titleKey: 'services.speaker.title',
    descriptionKey: 'services.speaker.description',
    iconName: 'Mic',
  },
  {
    id: 'startupConsulting',
    titleKey: 'services.startupConsulting.title',
    descriptionKey: 'services.startupConsulting.description',
    iconName: 'Lightbulb',
  },
  {
    id: 'mentor',
    titleKey: 'services.mentor.title',
    descriptionKey: 'services.mentor.description',
    iconName: 'Users',
  },
  {
    id: 'eventOrganization',
    titleKey: 'services.eventOrganization.title',
    descriptionKey: 'services.eventOrganization.description',
    iconName: 'CalendarDays',
  },
  {
    id: 'rapidPrototyping',
    titleKey: 'services.rapidPrototyping.title',
    descriptionKey: 'services.rapidPrototyping.description',
    iconName: 'DraftingCompass',
  },
];
