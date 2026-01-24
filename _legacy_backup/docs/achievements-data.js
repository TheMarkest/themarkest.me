// Achievements data file. Extend by pushing new objects into window.ACHIEVEMENTS.
// Each achievement: { id, icon, title: {en, ru}, description: {en, ru} }
// Icons can be emoji or short text / single char; keep it small for timeline layout.

window.ACHIEVEMENTS = [
  {
    id: 'lecturerSPbSUE',
    icon: '🎓',
    title: {
      en: 'Lecturer at SPbSUE',
      ru: 'Лектор в СПБГЭУ'
    },
    description: {
      en: 'Since September 2022, together with my team, I have been teaching a course on mobile application development.',
      ru: 'С сентября 2022 года вместе со своей командой преподаю курс разработки мобильных приложений.'
    }
  },
  {
    id: 'goVanlife',
    icon: '🚐',
    title: {
      en: 'GO VANLIFE',
      ru: 'GO VANLIFE'
    },
    description: {
      en: 'In the summer of 2022, the such.digital team developed the GO VANLIFE application for road travelers.',
      ru: 'Летом 2022 года команда such.digital разработала приложение для автопутешественников GO VANLIFE.'
    }
  },
  {
    id: 'suchDigital',
    icon: '💼',
    title: {
      en: 'SUCH.DIGITAL',
      ru: 'SUCH.DIGITAL'
    },
    description: {
      en: 'In early 2022, together with partners from itis.team and aizntech, I founded such.digital focused on high‑tech products.',
      ru: 'В начале 2022 года совместно с ребятами из itis.team и aizntech основал such.digital, ориентированную на разработку высокотехнологичных продуктов.'
    }
  },
  {
    id: 'arHunter',
    icon: '🕶️',
    title: {
      en: 'AR Hunter',
      ru: 'AR Hunter'
    },
    description: {
      en: 'In 2021 I joined the AR Hunter project team as CTO.',
      ru: 'В 2021 году присоединился к команде проекта AR Hunter в роли CTO.'
    }
  },
  {
    id: 'hackathons',
    icon: '🏆',
    title: {
      en: 'More Hackathons',
      ru: 'Ещё хакатоны'
    },
    description: {
      en: '2016–2020: participated, won, mentored and organized 16+ hackathons (Local Hack Day to Digital Breakthrough).',
      ru: '2016–2020: участвовал, выигрывал, был экспертом и организовывал 16+ хакатонов (от Local Hack Day до Цифрового Прорыва).'
    }
  },
  {
    id: 'dataSuite',
    icon: '🛰️',
    title: {
      en: 'DataSuite',
      ru: 'DataSuite'
    },
    description: {
      en: 'Founded in 2019: wearable motion tracking system, ANA Avatar XPRIZE finalist.',
      ru: 'Основан в 2019: носимая система трекинга движений, финалист ANA Avatar XPRIZE.'
    }
  },
  {
    id: 'itisTeam',
    icon: '👥',
    title: {
      en: 'ITIS.TEAM',
      ru: 'ITIS.TEAM'
    },
    description: {
      en: 'Since 2018 created 40+ IT products with the BaBashNik team members.',
      ru: 'С 2018 года создали 40+ IT‑продуктов совместно с участниками команды BaBashNik.'
    }
  },
  {
    id: 'events',
    icon: '🎤',
    title: {
      en: 'GEEKPICNIC, Starcon, VK Fest, SPIEF',
      ru: 'GEEKPICNIC, Starcon, VK Fest, ПМЭФ'
    },
    description: {
      en: 'Organizer & speaker at leading city events (2017–2020) within OLIMP Union.',
      ru: 'Организатор и спикер ведущих городских мероприятий (2017–2020) в составе объединения ОЛИМП.'
    }
  },
  {
    id: 'junction2016',
    icon: '🌐',
    title: {
      en: 'Junction 2016',
      ru: 'Junction 2016'
    },
    description: {
      en: 'Led BaBashNik team to 1st place in VR track of Europe’s largest hackathon; continued prize wins for two more years.',
      ru: 'Команда BaBashNik под моим руководством заняла 1 место в VR треке крупнейшего хакатона Европы; затем ещё два года призовые места.'
    }
  },
  {
    id: 'itSchools',
    icon: '📱',
    title: {
      en: 'Samsung IT School & VK IT School',
      ru: 'Samsung IT School и IT школа VK'
    },
    description: {
      en: '2015–16 mobile development studies launched my IT journey.',
      ru: 'Обучение мобильной разработке в 2015–16 положило начало моему пути в IT.'
    }
  }
];

// To add a new achievement push another object with same structure:
// window.ACHIEVEMENTS.push({ id: 'newId', icon: '✨', title: { en: 'English Title', ru: 'Русский заголовок' }, description: { en: 'English description', ru: 'Русское описание' } });
