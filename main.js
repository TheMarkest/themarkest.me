// Basic i18n using embedded locale objects (from original JSON)
const locales = {
  en: /* en */ {
    "nav.home": "Top",
    "nav.history": "History",
    "nav.services": "Competencies",
    "nav.projects": "Projects",
    "nav.contact": "Contacts",
    "hero.name": "Mark Bogdanov",
    "hero.role1": "Cyber-Master of All Trades",
    "hero.role2": "IT Project Manager",
    "hero.role3": "Co-founder of itis.team",
    "hero.role4": "Co-founder of Such.Digital",
    "hero.role5": "Founder and CTO of DataSuite",
    "hero.role6": "Lecturer at SPbSUE",
    "hero.cta": "Explore My Work",
    "skills.intro": "My core competencies visualized. Interact with the skill matrix.",
    "history.title": "History of Achievements",
    "history.intro": "Key milestones and projects in my career.",
    "history.learnMore": "Learn More",
    "achievements.lecturerSPbSUE.title": "Lecturer at SPbSUE",
    "achievements.lecturerSPbSUE.description": "Since September 2022, together with my team, I have been teaching a course on mobile application development.",
    "achievements.goVanlife.title": "GO VANLIFE",
    "achievements.goVanlife.description": "In the summer of 2022, the such.digital team developed the GO VANLIFE application for road travelers.",
    "achievements.suchDigital.title": "SUCH.DIGITAL",
    "achievements.suchDigital.description": "In early 2022, together with the guys from itis.team and aizntech, I founded such.digital, a company focused on developing its own high-tech products.",
    "achievements.arHunter.title": "AR Hunter",
    "achievements.arHunter.description": "In 2021, I joined the AR Hunter project team as CTO.",
    "achievements.hackathons.title": "More Hackathons",
    "achievements.hackathons.description": "Between 2016 and 2020, I participated, won, acted as an expert, and organized over 16 hackathons, from Local Hack Day to Digital Breakthrough.",
    "achievements.dataSuite.title": "DataSuite",
    "achievements.dataSuite.description": "In 2019, I founded a project to develop a wearable motion tracking system. The project is a finalist in the international ANA Avatar XPRIZE competition.",
    "achievements.itisTeam.title": "ITIS.TEAM",
    "achievements.itisTeam.description": "Together with the BaBashNik team members, I founded ITIS.TEAM. Since 2018, we have created over 40 IT products.",
    "achievements.events.title": "GEEKPICNIC, Starcon, VK Fest, SPIEF",
    "achievements.events.description": "Organizer and speaker at leading city events in 2017-2020 as part of the OLIMP Union.",
    "achievements.junction2016.title": "Junction 2016",
    "achievements.junction2016.description": "The BaBashNik team, under my leadership, took first place in the VR track of Europe's largest hackathon (and subsequently won prizes for another two years).",
    "achievements.itSchools.title": "Samsung IT School and VK IT School",
    "achievements.itSchools.description": "Studying mobile application development in 2015-16 marked the start of my journey in IT.",
    "services.title": "What I Can Do",
    "services.intro": "Feel free to contact me regarding the following areas and anything related to them.",
    "services.itDevelopment.title": "IT Product Development",
    "services.itDevelopment.description": "My team can develop a project of any complexity and focus, and support it throughout its entire lifecycle.",
    "services.speaker.title": "Speaker",
    "services.speaker.description": "I have extensive experience speaking at events and conducting educational programs.",
    "services.startupConsulting.title": "Startup Consulting",
    "services.startupConsulting.description": "I love interesting and unconventional projects at the intersection of various technological fields. I can help develop a product concept at the initial stages or act as CTO.",
    "services.mentor.title": "Mentor",
    "services.mentor.description": "I can help aspiring specialists and teams define their path in the IT sphere and take their first steps.",
    "services.eventOrganization.title": "IT Event Organization",
    "services.eventOrganization.description": "For 7 years, I have participated in organizing numerous hackathons, festivals, and conferences.",
    "services.rapidPrototyping.title": "Rapid Prototyping",
    "services.rapidPrototyping.description": "The experience gained at hackathons and in creating my own projects allows me to find the simplest and most accessible ways to prototype complex systems, devices, and other projects.",
    "projects.title": "My Projects",
    "projectAlpha.title": "Project Alpha: Sentient Core",
    "projectAlpha.description": "Development of a next-generation AI core interface with real-time data synthesis and predictive analysis capabilities for a leading tech conglomerate.",
    "projectGoVanlife.title": "GO VANLIFE App",
    "projectGoVanlife.description": "Mobile application for van life enthusiasts and road travelers, featuring maps, community spots, and travel logs.",
    "projectArHunter.title": "AR Hunter Platform",
    "projectArHunter.description": "Augmented Reality platform for interactive games and experiences, where I contributed as CTO.",
    "projectDataSuite.title": "DataSuite Motion Tracking",
    "projectDataSuite.description": "Wearable system for detailed human motion tracking, finalist of the ANA Avatar XPRIZE.",
    "contact.title": "Contacts",
    "contact.intro": "Contact me in any way convenient for you. I respond fastest on Telegram.",
    "contact.form.name": "Your Name / Handle",
    "contact.form.email": "Secure Comms Channel (Email)",
    "contact.form.message": "Transmission (Your Message)",
    "contact.form.send": "Send Transmission",
    "contact.emergencyButton": "Write to me (Emergency)",
    "footer.rights": "All rights reserved."
  },
  ru: /* ru */ {
    "nav.home": "Наверх",
    "nav.history": "История",
    "nav.services": "Компетенции",
    "nav.projects": "Проекты",
    "nav.contact": "Контакты",
    "hero.name": "Марк Богданов",
    "hero.role1": "кибер-мастер на все руки",
    "hero.role2": "руководитель IT-проектов",
    "hero.role3": "сооснователь itis.team",
    "hero.role4": "сооснователь Such.Digital",
    "hero.role5": "основатель и CTO DataSuite",
    "hero.role6": "Лектор в СПБГЭУ",
    "hero.cta": "Посмотреть Работы",
    "skills.intro": "Мои ключевые компетенции визуализированы. Взаимодействуйте с матрицей навыков.",
    "history.title": "История достижений",
    "history.intro": "Ключевые этапы и проекты в моей карьере.",
    "history.learnMore": "Узнать больше",
    "achievements.lecturerSPbSUE.title": "Лектор в СПБГЭУ",
    "achievements.lecturerSPbSUE.description": "С сентября 2022 года вместе со своей командой преподаю курс разработки мобильных приложений.",
    "achievements.goVanlife.title": "GO VANLIFE",
    "achievements.goVanlife.description": "Летом 2022 года команда such.digital разработала приложение для автопутешественников GO VANLIFE.",
    "achievements.suchDigital.title": "SUCH.DIGITAL",
    "achievements.suchDigital.description": "В начале 2022 года совместно с ребятами из itis.team и aizntech основал компанию such.digital, ориентированную на разработку собственных высокотехнологичных продуктов.",
    "achievements.arHunter.title": "AR Hunter",
    "achievements.arHunter.description": "в 2021 году присоединился к команде проекта AR Hunter в роли CTO.",
    "achievements.hackathons.title": "Ещё хакатоны",
    "achievements.hackathons.description": "В период с 2016 по 2020 участвовал, выигрывал, выступал в роли эксперта а также организовывал в более чем 16 хакатонах от Local Hack Day, до Цифрового Прорыва.",
    "achievements.dataSuite.title": "DataSuite",
    "achievements.dataSuite.description": "В 2019 году основал проект по разработке носимой системы трекинга движений, проект является финалистом международного конкурса ANA Avatar XPRIZE.",
    "achievements.itisTeam.title": "ITIS.TEAM",
    "achievements.itisTeam.description": "Совместно с участниками команды BaBashNik основал компанию ITIS.TEAM, с 2018 года мы создали более 40 IT-продуктов.",
    "achievements.events.title": "GEEKPICNIC, Starcon, VK Fest, ПМЭФ",
    "achievements.events.description": "Организатор и спикер на ведущих городских мероприятиях в 2017-20 годах в составе Объединения ОЛИМП.",
    "achievements.junction2016.title": "Junction 2016",
    "achievements.junction2016.description": "Команда BaBashNik под моим руководством заняла первое место в треке VR крупнейшего хакатона Европы (в последствии занимали призовые места еще в течении двух лет).",
    "achievements.itSchools.title": "Samsung IT School и IT школа VK",
    "achievements.itSchools.description": "изучение разработки мобильных приложений в 2015-16 году положило старт моему пути в IT.",
    "services.title": "Что я умею",
    "services.intro": "Смело можете обращаться ко мне по следующим направлениям, и всему, что с ними связано.",
    "services.itDevelopment.title": "Разработка IT-продуктов",
    "services.itDevelopment.description": "Моя команда может разработать проект любой сложности и направленности и сопровождать его на всём протяжении жизненного цикла.",
    "services.speaker.title": "Спикер",
    "services.speaker.description": "Имею широкий опыт выступления на мероприятиях и ведения образовательных программ.",
    "services.startupConsulting.title": "Консультирование стартапов",
    "services.startupConsulting.description": "Люблю интересные и нестандартные проекты на стыке различных технологических сфер. Могу как помочь в разработке концепции продукта на базовых этапах, так и выступить в роли CTO.",
    "services.mentor.title": "Ментор",
    "services.mentor.description": "Могу помочь начинающим специалистам и командам определить свой путь в IT сфере и сделать первые шаги.",
    "services.eventOrganization.title": "Организация IT мероприятий",
    "services.eventOrganization.description": "В течении 7 лет участвовал в организации множества хакатонов, фестивалей и конференций.",
    "services.rapidPrototyping.title": "Быстрое прототипирование",
    "services.rapidPrototyping.description": "Опыт приобретенный на хакатонах и при создании собственных проектов позволяет мне находить самые простые и доступные способы прототипирования комплексных систем, устройств и иных проектов.",
    "projects.title": "Мои Проекты",
    "projectAlpha.title": "Проект Альфа: Разумное Ядро",
    "projectAlpha.description": "Разработка интерфейса ИИ-ядра нового поколения с синтезом данных в реальном времени и возможностями предиктивного анализа для ведущего технологического конгломерата.",
    "projectGoVanlife.title": "Приложение GO VANLIFE",
    "projectGoVanlife.description": "Мобильное приложение для автопутешественников и любителей фургонной жизни, с картами, точками интереса и путевыми журналами.",
    "projectArHunter.title": "Платформа AR Hunter",
    "projectArHunter.description": "Платформа дополненной реальности для интерактивных игр и впечатлений, где я выступил в роли CTO.",
    "projectDataSuite.title": "DataSuite Motion Tracking",
    "projectDataSuite.description": "Носимая система для детального отслеживания движений человека, финалист конкурса ANA Avatar XPRIZE.",
    "contact.title": "Контакты",
    "contact.intro": "Свяжитесь со мной любым удобным для вас путём, быстрее всего отвечаю в Telegram.",
    "contact.form.name": "Ваше Имя / Ник",
    "contact.form.email": "Защищенный Канал Связи (Email)",
    "contact.form.message": "Трансмиссия (Ваше Сообщение)",
    "contact.form.send": "Отправить Трансмиссию",
    "contact.emergencyButton": "Напиши мне (Срочно)",
    "footer.rights": "Все права защищены."
  }
};

// Core data converted from TS modules (trimmed for brevity where sensible)
const skills = [
  { name: 'Python', importance: 5, category: 'Software' },
  { name: 'iOS Development', importance: 4, category: 'Software' },
  { name: 'Android Development', importance: 4, category: 'Software' },
  { name: 'JavaScript', importance: 5, category: 'Software' },
  { name: 'Three.js', importance: 3, category: 'CreativeTech' },
  { name: 'Unity3D', importance: 5, category: 'CreativeTech' },
  { name: 'Raspberry Pi', importance: 3, category: 'HardwareIoT' },
  { name: 'Agile', importance: 5, category: 'Methodologies' },
  { name: 'Git', importance: 5, category: 'ProductivityTools' },
  { name: 'SEO', importance: 3, category: 'BusinessSystems' },
  { name: 'Timemanagement', importance: 4, category: 'SoftSkills' },
];

const achievements = [
  'lecturerSPbSUE','goVanlife','suchDigital','arHunter','hackathons','dataSuite','itisTeam','events','junction2016','itSchools'
];

const services = [
  'itDevelopment','speaker','startupConsulting','mentor','eventOrganization','rapidPrototyping'
];

const projects = [
  { id: 'go-vanlife', titleKey: 'projectGoVanlife.title', descriptionKey: 'projectGoVanlife.description', tags:['Mobile App','Firebase'], link:'https://go-vanlife.ru/' },
  { id: 'ar-hunter', titleKey: 'projectArHunter.title', descriptionKey: 'projectArHunter.description', tags:['AR','Unity'], link:'http://arhunter.org/' },
  { id: 'data-suite', titleKey: 'projectDataSuite.title', descriptionKey: 'projectDataSuite.description', tags:['Wearables','IoT'], link:'https://www.xprize.org/prizes/avatar' },
  { id: 'project-alpha', titleKey: 'projectAlpha.title', descriptionKey: 'projectAlpha.description', tags:['AI','Interface'], link:'#' },
];

let currentLang = localStorage.getItem('lang') || 'en';

function applyI18n() {
  const dict = locales[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

document.getElementById('lang-en').addEventListener('click', () => {currentLang='en';localStorage.setItem('lang','en');applyI18n();});
document.getElementById('lang-ru').addEventListener('click', () => {currentLang='ru';localStorage.setItem('lang','ru');applyI18n();});

// Rotate roles
const roles = ['hero.role1','hero.role2','hero.role3','hero.role4','hero.role5','hero.role6'];
let roleIdx = 0;
function rotateRole(){
  const el = document.getElementById('role-rotator');
  const key = roles[roleIdx % roles.length];
  el.textContent = locales[currentLang][key];
  roleIdx++;
}
setInterval(rotateRole, 2500);

// Build achievements timeline
function buildTimeline(){
  const list = document.getElementById('achievements-timeline');
  list.innerHTML = '';
  achievements.forEach(id => {
    const li = document.createElement('li');
    const titleKey = `achievements.${id}.title`;
    const descKey = `achievements.${id}.description`;
    const title = locales[currentLang][titleKey] || titleKey;
    const desc = locales[currentLang][descKey] || descKey;
    li.innerHTML = `<strong>${title}</strong><br><span class="small">${desc}</span>`;
    list.appendChild(li);
  });
}

// Services grid
function buildServices(){
  const grid = document.getElementById('services-grid');
  grid.innerHTML = '';
  services.forEach(id => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3 data-i18n="services.${id}.title"></h3><p data-i18n="services.${id}.description"></p>`;
    grid.appendChild(card);
  });
}

// Projects
function buildProjects(){
  const grid = document.getElementById('projects-grid');
  grid.innerHTML='';
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML = `<h3 data-i18n="${p.titleKey}"></h3><p data-i18n="${p.descriptionKey}"></p><div class='tag-row'>${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>`;
    grid.appendChild(card);
  });
}

// Contact form (static demo)
const form = document.getElementById('contact-form');
form.addEventListener('submit', () => {
  const status = document.getElementById('form-status');
  status.textContent = locales[currentLang]['contact.success'];
  form.reset();
});

// Three.js skill cloud (simple particles sized by importance)
function initThree(){
  const canvas = document.getElementById('skills-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width/height, 0.1, 1000);
  camera.position.set(0,0,60);

  const group = new THREE.Group();
  scene.add(group);

  const colorByCat = {
    Software: 0x66e4ff,
    CreativeTech: 0xbf7bff,
    HardwareIoT: 0xff8c2b,
    Methodologies: 0x5fff81,
    ProductivityTools: 0xfff04d,
    BusinessSystems: 0x5aa8ff,
    SoftSkills: 0xb0b2b5,
    Other: 0xffffff
  };

  const sphereRadius = 25;
  skills.forEach((s, i) => {
    const phi = Math.acos(2*Math.random()-1);
    const theta = Math.random()*Math.PI*2;
    const r = sphereRadius * (0.6 + Math.random()*0.4);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    const size = 1 + s.importance * 0.6;
    const geometry = new THREE.SphereGeometry(size, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: colorByCat[s.category] || 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x,y,z);
    mesh.userData = { skill: s };
    group.add(mesh);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tooltip = document.createElement('div');
  tooltip.style.position='absolute';
  tooltip.style.pointerEvents='none';
  tooltip.style.fontSize='10px';
  tooltip.style.background='rgba(10,15,20,.8)';
  tooltip.style.padding='4px 6px';
  tooltip.style.border='1px solid #18212b';
  tooltip.style.borderRadius='4px';
  tooltip.style.opacity='0';
  tooltip.style.transition='opacity .2s';
  canvas.parentElement.appendChild(tooltip);

  function onMove(e){
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = - ((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(group.children);
    if(intersects.length){
      const s = intersects[0].object.userData.skill;
      tooltip.textContent = s.name;
      tooltip.style.left = (e.clientX - rect.left + 12) + 'px';
      tooltip.style.top = (e.clientY - rect.top + 12) + 'px';
      tooltip.style.opacity='1';
    } else {
      tooltip.style.opacity='0';
    }
  }
  canvas.addEventListener('mousemove', onMove);

  function animate(){
    requestAnimationFrame(animate);
    group.rotation.y += 0.0015;
    group.rotation.x += 0.0009;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w,h,false);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  });
}

// init all
window.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  rotateRole();
  buildTimeline();
  buildServices();
  buildProjects();
  initThree();
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Re-translate dynamic lists when language changes
function refreshDynamic(){
  buildTimeline();
  buildServices();
  buildProjects();
  applyI18n();
}
['lang-en','lang-ru'].forEach(id=>document.getElementById(id).addEventListener('click', refreshDynamic));
