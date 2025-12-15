// src/data/projects.ts
export interface Project {
  id: string;
  titleKey: string; // For localization
  descriptionKey: string; // For localization
  tags: string[];
  liveLink?: string;
  sourceLink?: string;
  year: number | string; // Allow string for ranges or multiple dates
  client?: string; // Optional client name
  dataAiHint?: string; // for placeholder images
}

export const projectsData: Project[] = [
  {
    id: 'go-vanlife',
    titleKey: 'project.goVanlife.title',
    descriptionKey: 'project.goVanlife.description',
    tags: ['React Native', 'Firebase', 'Mobile', 'Community'],
    year: 2022,
    client: 'self',
  },
  {
    id: 'ar-hunter',
    titleKey: 'project.arHunter.title',
    descriptionKey: 'project.arHunter.description',
    tags: ['Unity', 'AR', 'Games', 'Mobile AR SDK'],
    year: 2021,
    client: 'AR Hunter',
  },
  {
    id: 'datasuite-mts',
    titleKey: 'project.datasuiteMTS.title',
    descriptionKey: 'project.datasuiteMTS.description',
    tags: ['Wearables', 'Motion Tracking', 'IoT', 'XPRIZE'],
    year: 2019,
    client: 'DataSuite',
  },
  {
    id: 'datasuite-cyber-suit',
    titleKey: 'project.datasuiteCyberSuit.title',
    descriptionKey: 'project.datasuiteCyberSuit.description',
    tags: ['HCI', 'Wearables', 'Experimental Tech', 'Motion Capture'],
    year: 'Exp.',
    client: 'DataSuite',
  },
  {
    id: '3d-printed-dress',
    titleKey: 'project.3dPrintedDress.title',
    descriptionKey: 'project.3dPrintedDress.description',
    tags: ['3D Printing', 'Fashion Tech', 'Digital Art', 'Wearables'],
    year: 2017,
    client: 'Personal Project',
  },
  {
    id: 'xprize-finalist',
    titleKey: 'project.xprizeFinalist.title',
    descriptionKey: 'project.xprizeFinalist.description',
    tags: ['Robotics', 'International Competitions', 'Leadership'],
    year: '2019-2021',
    client: 'ANA Avatar XPRIZE',
  },
  {
    id: 'olimp',
    titleKey: 'project.olimp.title',
    descriptionKey: 'project.olimp.description',
    tags: ['Community', 'EdTech', 'Public Installations'],
    year: '2017-2020',
    client: 'OLIMP',
  },
  {
    id: 'mlh-hackathons',
    titleKey: 'project.mlhHackathons.title',
    descriptionKey: 'project.mlhHackathons.description',
    tags: ['Hackathons', 'Community', 'Education', 'MLH'],
    year: '2016-2020',
    client: 'Major League Hacking',
  },
  {
    id: 'taxi-auction-service',
    titleKey: 'project.taxiAuctionService.title',
    descriptionKey: 'project.taxiAuctionService.description',
    tags: ['Urban Tech', 'Marketplaces', 'Real-time'],
    year: 2022,
    client: 'Moscow Market',
  },
];
