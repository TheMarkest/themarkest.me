// src/data/achievements.ts
export interface Achievement {
  id: string;
  titleKey: string;
  descriptionKey: string;
  year?: string;
  link?: string;
  linkTextKey?: string;
  iconName: string; // Added for timeline icons
}

export const achievementsData: Achievement[] = [
  {
    id: 'lecturerSPbSUE',
    titleKey: 'achievements.lecturerSPbSUE.title',
    descriptionKey: 'achievements.lecturerSPbSUE.description',
    year: '2022 - Present',
    iconName: 'Presentation',
  },
  {
    id: 'goVanlife',
    titleKey: 'achievements.goVanlife.title',
    descriptionKey: 'achievements.goVanlife.description',
    year: '2022',
    link: 'https://go-vanlife.ru/',
    iconName: 'Car',
  },
  {
    id: 'suchDigital',
    titleKey: 'achievements.suchDigital.title',
    descriptionKey: 'achievements.suchDigital.description',
    year: '2022',
    iconName: 'Rocket',
  },
  {
    id: 'arHunter',
    titleKey: 'achievements.arHunter.title',
    descriptionKey: 'achievements.arHunter.description',
    year: '2021',
    link: 'http://arhunter.org/',
    iconName: 'ScanSearch',
  },
  {
    id: 'hackathons',
    titleKey: 'achievements.hackathons.title',
    descriptionKey: 'achievements.hackathons.description',
    year: '2016-2020',
    iconName: 'Trophy',
  },
  {
    id: 'dataSuite',
    titleKey: 'achievements.dataSuite.title',
    descriptionKey: 'achievements.dataSuite.description',
    year: '2019',
    link: 'https://www.xprize.org/prizes/avatar',
    iconName: 'Accessibility', // Representing human augmentation/avatars for XPRIZE
  },
  {
    id: 'itisTeam',
    titleKey: 'achievements.itisTeam.title',
    descriptionKey: 'achievements.itisTeam.description',
    year: '2018 - Present',
    iconName: 'Briefcase',
  },
  {
    id: 'events',
    titleKey: 'achievements.events.title',
    descriptionKey: 'achievements.events.description',
    year: '2017-2020',
    iconName: 'CalendarDays',
  },
  {
    id: 'junction2016',
    titleKey: 'achievements.junction2016.title',
    descriptionKey: 'achievements.junction2016.description',
    year: '2016',
    iconName: 'Award',
  },
  {
    id: 'itSchools',
    titleKey: 'achievements.itSchools.title',
    descriptionKey: 'achievements.itSchools.description',
    year: '2015-2016',
    iconName: 'GraduationCap',
  },
];
