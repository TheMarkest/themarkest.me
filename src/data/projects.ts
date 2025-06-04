// src/data/projects.ts
export interface Project {
  id: string;
  titleKey: string; // For localization
  descriptionKey: string; // For localization
  image: string; // URL to project image
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  year: number;
  client?: string; // Optional client name
  dataAiHint?: string; // for placeholder images
}

export const projectsData: Project[] = [
  {
    id: 'go-vanlife',
    titleKey: 'projectGoVanlife.title',
    descriptionKey: 'projectGoVanlife.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'van travel app',
    tags: ['Mobile App', 'React Native', 'Firebase', 'Community'],
    liveLink: 'https://go-vanlife.ru/',
    year: 2022,
    client: 'Such.Digital',
  },
  {
    id: 'ar-hunter',
    titleKey: 'projectArHunter.title',
    descriptionKey: 'projectArHunter.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'augmented reality game',
    tags: ['AR', 'Unity', 'Mobile Game', 'CTO'],
    liveLink: 'http://arhunter.org/',
    year: 2021,
  },
  {
    id: 'data-suite',
    titleKey: 'projectDataSuite.title',
    descriptionKey: 'projectDataSuite.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'motion capture suit',
    tags: ['Wearables', 'IoT', 'Motion Tracking', 'XPRIZE'],
    liveLink: 'https://www.xprize.org/prizes/avatar',
    year: 2019,
  },
  {
    id: 'project-alpha', // Kept from original for variety, can be replaced
    titleKey: 'projectAlpha.title',
    descriptionKey: 'projectAlpha.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'futuristic interface',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'AI Integration'],
    liveLink: '#',
    sourceLink: '#',
    year: 2024,
    client: 'Stark Industries (Demo)',
  },
];
