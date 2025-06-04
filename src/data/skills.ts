// src/data/skills.ts
export interface Skill {
  name: string;
  importance: number; // e.g., 1-5, affects size
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Design' | 'Data' | 'Mobile' | 'Other';
}

export const skillsData: Skill[] = [
  // Frontend
  { name: 'React', importance: 5, category: 'Frontend' },
  { name: 'Next.js', importance: 5, category: 'Frontend' },
  { name: 'TypeScript', importance: 5, category: 'Frontend' },
  { name: 'JavaScript', importance: 4, category: 'Frontend' },
  { name: 'HTML5', importance: 4, category: 'Frontend' },
  { name: 'CSS3', importance: 4, category: 'Frontend' },
  { name: 'Tailwind CSS', importance: 4, category: 'Frontend' },
  { name: 'Three.js', importance: 3, category: 'Frontend' },
  { name: 'Vue.js', importance: 3, category: 'Frontend' },

  // Backend
  { name: 'Node.js', importance: 4, category: 'Backend' },
  { name: 'Python', importance: 3, category: 'Backend' },
  { name: 'Firebase', importance: 4, category: 'Backend' },
  { name: 'PostgreSQL', importance: 3, category: 'Backend' },
  { name: 'MongoDB', importance: 3, category: 'Backend' },
  { name: 'REST APIs', importance: 4, category: 'Backend' },
  { name: 'GraphQL', importance: 3, category: 'Backend' },

  // DevOps & Cloud
  { name: 'Docker', importance: 3, category: 'DevOps' },
  { name: 'AWS', importance: 2, category: 'DevOps' },
  { name: 'Google Cloud', importance: 3, category: 'DevOps' },
  { name: 'CI/CD', importance: 3, category: 'DevOps' },
  { name: 'Git', importance: 5, category: 'DevOps' },

  // Design
  { name: 'Figma', importance: 4, category: 'Design' },
  { name: 'UI/UX Principles', importance: 4, category: 'Design' },

  // Data
  { name: 'Data Analysis', importance: 2, category: 'Data' },
  
  // Other
  { name: 'SEO', importance: 3, category: 'Other' },
  { name: 'Agile', importance: 4, category: 'Other' },
  { name: 'Project Management', importance: 3, category: 'Other' },
];

export const skillCategoryColors: Record<Skill['category'], string> = {
  Frontend: 'hsl(180 100% 50%)', // Cyan (Accent)
  Backend: 'hsl(120 100% 50%)', // Neon Green
  DevOps: 'hsl(30 100% 50%)',   // Neon Orange
  Design: 'hsl(270 100% 65%)', // Neon Purple
  Data: 'hsl(60 100% 50%)',    // Neon Yellow
  Mobile: 'hsl(210 100% 60%)', // Neon Blue
  Other: 'hsl(0 0% 70%)',      // Light Gray
};
