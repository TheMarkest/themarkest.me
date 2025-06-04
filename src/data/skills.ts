
// src/data/skills.ts
export interface Skill {
  name: string;
  importance: number; // e.g., 1-5, affects size
  category: 'Software' | 'CreativeTech' | 'HardwareIoT' | 'Methodologies' | 'ProductivityTools' | 'BusinessSystems' | 'SoftSkills' | 'Other';
}

export const skillsData: Skill[] = [
  // Software
  { name: 'Python', importance: 5, category: 'Software' },
  { name: 'iOS Development', importance: 4, category: 'Software' }, // Renamed from IOS for clarity
  { name: 'Android Development', importance: 4, category: 'Software' }, // Renamed from Android
  { name: 'JavaScript', importance: 5, category: 'Software' },
  { name: 'Node.js', importance: 4, category: 'Software' },
  { name: 'React', importance: 5, category: 'Software' },
  { name: 'Next.js', importance: 5, category: 'Software' },
  { name: 'TypeScript', importance: 5, category: 'Software' },
  { name: 'HTML5', importance: 4, category: 'Software' },
  { name: 'CSS3', importance: 4, category: 'Software' },
  { name: 'Tailwind CSS', importance: 4, category: 'Software' },
  { name: 'Flutter', importance: 4, category: 'Software' },
  { name: 'FlutterFlow', importance: 3, category: 'Software' },
  { name: 'Firebase', importance: 4, category: 'Software' },
  { name: 'PostgreSQL', importance: 3, category: 'Software' },
  { name: 'MongoDB', importance: 3, category: 'Software' },
  { name: 'REST APIs', importance: 4, category: 'Software' },
  { name: 'GraphQL', importance: 3, category: 'Software' },
  { name: 'C', importance: 3, category: 'Software' },
  { name: 'C#', importance: 4, category: 'Software' },
  { name: 'C++', importance: 3, category: 'Software' },
  { name: 'Vue.js', importance: 3, category: 'Software' },
  { name: 'Node-RED', importance: 3, category: 'Software' },
  { name: 'VBA', importance: 2, category: 'Software' },
  { name: 'Data Analysis', importance: 3, category: 'Software' },

  // CreativeTech
  { name: 'Unity3D', importance: 5, category: 'CreativeTech' },
  { name: 'Unreal Engine', importance: 4, category: 'CreativeTech' },
  { name: 'VR', importance: 4, category: 'CreativeTech' },
  { name: 'AR', importance: 4, category: 'CreativeTech' },
  { name: 'MetaHuman', importance: 3, category: 'CreativeTech' },
  { name: 'Spark AR', importance: 3, category: 'CreativeTech' },
  { name: 'Three.js', importance: 3, category: 'CreativeTech' },
  { name: 'Figma', importance: 5, category: 'CreativeTech' },
  { name: 'UI/UX Principles', importance: 4, category: 'CreativeTech' },
  { name: 'Virtual Production', importance: 3, category: 'CreativeTech' },
  { name: 'After Effects', importance: 3, category: 'CreativeTech' },
  { name: 'Premiere Pro', importance: 3, category: 'CreativeTech' },
  { name: 'OBS', importance: 3, category: 'CreativeTech' },
  { name: 'SolidWorks', importance: 3, category: 'CreativeTech' },
  { name: 'Blender', importance: 4, category: 'CreativeTech' },
  { name: 'EasyEDA', importance: 3, category: 'CreativeTech' },
  { name: 'OpenSCAD', importance: 2, category: 'CreativeTech' },
  { name: 'PhotoShop', importance: 4, category: 'CreativeTech' },
  { name: 'Fusion360', importance: 3, category: 'CreativeTech' },
  { name: 'Meshmixer', importance: 2, category: 'CreativeTech' },
  { name: 'Resolume', importance: 2, category: 'CreativeTech' }, // Corrected spelling

  // HardwareIoT
  { name: 'Arduino', importance: 4, category: 'HardwareIoT' },
  { name: 'Raspberry Pi', importance: 3, category: 'HardwareIoT' },
  { name: '3D Printing', importance: 3, category: 'HardwareIoT' },
  { name: 'Additive Tech', importance: 2, category: 'HardwareIoT' },
  { name: 'ESP32', importance: 3, category: 'HardwareIoT' },
  { name: 'STM32', importance: 3, category: 'HardwareIoT' },
  { name: 'NRF', importance: 2, category: 'HardwareIoT' },
  { name: 'Optics', importance: 2, category: 'HardwareIoT' },
  { name: 'Sewing', importance: 1, category: 'HardwareIoT' },
  { name: 'PCB Design', importance: 3, category: 'HardwareIoT' }, // Renamed from PCB
  { name: 'Soldering', importance: 2, category: 'HardwareIoT' },
  { name: 'IoT', importance: 3, category: 'HardwareIoT' },
  { name: 'Robotics', importance: 3, category: 'HardwareIoT' },
  { name: 'Smart Wearables', importance: 3, category: 'HardwareIoT' }, // Renamed from SmartWear

  // Methodologies
  { name: 'Agile', importance: 5, category: 'Methodologies' },
  { name: 'Scrum', importance: 4, category: 'Methodologies' },
  { name: 'Kanban', importance: 4, category: 'Methodologies' }, // Corrected spelling
  { name: 'Project Management', importance: 4, category: 'Methodologies' },
  { name: 'CustDev', importance: 4, category: 'Methodologies' },
  { name: 'CJM', importance: 4, category: 'Methodologies' },
  { name: 'PMBOK', importance: 3, category: 'Methodologies' }, // Corrected to PMBOK
  { name: 'Lean Canvas', importance: 3, category: 'Methodologies' },
  { name: 'Waterfall', importance: 2, category: 'Methodologies' }, // Corrected spelling
  { name: 'MACODE', importance: 2, category: 'Methodologies' }, // Corrected spelling
  { name: 'SMART', importance: 3, category: 'Methodologies' },


  // ProductivityTools
  { name: 'Git', importance: 5, category: 'ProductivityTools' },
  { name: 'Docker', importance: 3, category: 'ProductivityTools' },
  { name: 'AWS', importance: 2, category: 'ProductivityTools' },
  { name: 'Google Cloud', importance: 3, category: 'ProductivityTools' },
  { name: 'CI/CD', importance: 3, category: 'ProductivityTools' },
  { name: 'Linux', importance: 4, category: 'ProductivityTools' },
  { name: 'Excel', importance: 3, category: 'ProductivityTools' },
  { name: 'Google Sheets', importance: 4, category: 'ProductivityTools' },
  { name: 'Google Docs', importance: 4, category: 'ProductivityTools' },
  { name: 'Jira', importance: 4, category: 'ProductivityTools' },
  { name: 'Tilda', importance: 3, category: 'ProductivityTools' },
  { name: 'MatLab', importance: 2, category: 'ProductivityTools' },
  { name: 'ChatGPT', importance: 4, category: 'ProductivityTools' },
  { name: 'WolframAlpha', importance: 3, category: 'ProductivityTools' },
  { name: 'Google Classroom', importance: 2, category: 'ProductivityTools' },
  
  // BusinessSystems
  { name: 'POS', importance: 2, category: 'BusinessSystems' },
  { name: 'CRM', importance: 3, category: 'BusinessSystems' },
  { name: 'Geoinformatics', importance: 2, category: 'BusinessSystems' },
  { name: 'E-commerce', importance: 3, category: 'BusinessSystems' },
  { name: 'Payment Processing', importance: 3, category: 'BusinessSystems' },
  { name: 'SEO', importance: 3, category: 'BusinessSystems' },

  // SoftSkills
  { name: 'Timemanagement', importance: 4, category: 'SoftSkills' },
  { name: 'Team Building', importance: 4, category: 'SoftSkills' },
  { name: 'Procrastination Mgt.', importance: 2, category: 'SoftSkills' }, // Clarified "Procrastination"
  { name: 'Presentation Skills', importance: 4, category: 'SoftSkills' }, // Clarified "Presentation"
];

export const skillCategoryColors: Record<Skill['category'], string> = {
  Software: 'hsl(180 100% 50%)', // Cyan (Accent)
  CreativeTech: 'hsl(270 100% 65%)', // Neon Purple
  HardwareIoT: 'hsl(30 100% 50%)',   // Neon Orange
  Methodologies: 'hsl(120 100% 50%)', // Neon Green
  ProductivityTools: 'hsl(60 100% 50%)',    // Neon Yellow
  BusinessSystems: 'hsl(210 100% 60%)', // Neon Blue
  SoftSkills: 'hsl(0 0% 70%)',      // Light Gray
  Other: 'hsl(0 0% 85%)', // Fallback, not currently used with new categories
};
