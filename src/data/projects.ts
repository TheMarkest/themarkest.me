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
    id: 'project-alpha',
    titleKey: 'projectAlpha.title',
    descriptionKey: 'projectAlpha.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'futuristic interface',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'AI Integration'],
    liveLink: '#',
    sourceLink: '#',
    year: 2024,
    client: 'Stark Industries',
  },
  {
    id: 'project-beta',
    titleKey: 'projectBeta.title',
    descriptionKey: 'projectBeta.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'cybersecurity dashboard',
    tags: ['React', 'Node.js', 'Cybersecurity', 'Data Visualization'],
    liveLink: '#',
    year: 2023,
    client: 'Wayne Enterprises',
  },
  {
    id: 'project-gamma',
    titleKey: 'projectGamma.title',
    descriptionKey: 'projectGamma.description',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract network',
    tags: ['Three.js', 'WebSockets', 'Interactive Art'],
    sourceLink: '#',
    year: 2023,
  },
];

// Add translations for these to en.json and ru.json
/*
en.json:
"projectAlpha.title": "Project Alpha: Sentient Core",
"projectAlpha.description": "Development of a next-generation AI core interface with real-time data synthesis and predictive analysis capabilities for a leading tech conglomerate.",
"projectBeta.title": "Project Beta: Citadel Defense System",
"projectBeta.description": "A comprehensive cybersecurity dashboard providing threat intelligence and network monitoring for a high-profile corporate entity.",
"projectGamma.title": "Project Gamma: Chronos Stream",
"projectGamma.description": "An interactive WebGL art installation visualizing complex data streams through a dynamic, user-influenced particle system."

ru.json:
"projectAlpha.title": "Проект Альфа: Разумное Ядро",
"projectAlpha.description": "Разработка интерфейса ИИ-ядра нового поколения с синтезом данных в реальном времени и возможностями предиктивного анализа для ведущего технологического конгломерата.",
"projectBeta.title": "Проект Бета: Система Защиты Цитадель",
"projectBeta.description": "Комплексная панель кибербезопасности, предоставляющая аналитику угроз и мониторинг сети для крупной корпоративной структуры.",
"projectGamma.title": "Проект Гамма: Поток Хронос",
"projectGamma.description": "Интерактивная WebGL арт-инсталляция, визуализирующая сложные потоки данных через динамическую, управляемую пользователем систему частиц."
*/
