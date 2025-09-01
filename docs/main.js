// Self-contained functional script
// Inline locale dictionaries (duplicated from original root script to remove dependency)
const locales = {
	en: {
		"nav.home": "Home","nav.services": "Services","nav.bio": "Bio","nav.news": "News","nav.art": "Art","nav.market": "MARKet","nav.contacts": "Contacts","hero.name": "Mark Bogdanov","hero.role1": "Cyber-Master of All Trades","hero.role2": "IT Project Manager","hero.role3": "Co-founder of itis.team","hero.role4": "Co-founder of Such.Digital","hero.role5": "Founder and CTO of DataSuite","hero.role6": "Lecturer at SPbSUE","hero.cta": "Explore","skills.intro": "Core competencies visualized.","history.title": "History of Achievements","history.intro": "Key milestones and projects in my career.","services.title": "What I Can Do","services.intro": "Feel free to contact me regarding the following areas.","services.itDevelopment.title": "IT Product Development","services.itDevelopment.description": "Full-cycle development and lifecycle support.","services.speaker.title": "Speaker","services.speaker.description": "Talks and educational sessions.","services.startupConsulting.title": "Startup Consulting","services.startupConsulting.description": "Early concept, strategy & CTO advisory.","services.mentor.title": "Mentor","services.mentor.description": "Helping newcomers and teams define their path.","services.eventOrganization.title": "IT Event Organization","services.eventOrganization.description": "Hackathons, festivals, conferences organization.","services.rapidPrototyping.title": "Rapid Prototyping","services.rapidPrototyping.description": "Fast pragmatic prototyping of complex systems.","contact.title": "Contacts","contact.intro": "Fastest reply on Telegram.","contact.form.name": "Your Name / Handle","contact.form.email": "Secure Comms Channel (Email)","contact.form.message": "Transmission (Your Message)","contact.form.send": "Send","contact.success": "Message sent!","contact.error": "Transmission failed.","contact.emergencyButton": "Emergency Contact","footer.rights": "All rights reserved.","news.title":"News","market.title":"MARKet" },
	ru: {
		"nav.home": "Главная","nav.services": "Услуги","nav.bio": "Био","nav.news": "Новости","nav.art": "Арт","nav.market": "МАРКет","nav.contacts": "Контакты","hero.name": "Марк Богданов","hero.role1": "кибер-мастер на все руки","hero.role2": "руководитель IT-проектов","hero.role3": "сооснователь itis.team","hero.role4": "сооснователь Such.Digital","hero.role5": "основатель и CTO DataSuite","hero.role6": "Лектор в СПБГЭУ","hero.cta": "Смотреть","skills.intro": "Ключевые компетенции.","history.title": "История достижений","history.intro": "Ключевые этапы и проекты.","services.title": "Что я умею","services.intro": "Можно обращаться по следующим направлениям.","services.itDevelopment.title": "Разработка IT-продуктов","services.itDevelopment.description": "Разработка и сопровождение полного цикла.","services.speaker.title": "Спикер","services.speaker.description": "Выступления и образовательные программы.","services.startupConsulting.title": "Консультации стартапов","services.startupConsulting.description": "Концепция, стратегия и CTO сопровождение.","services.mentor.title": "Ментор","services.mentor.description": "Помощь начинающим и командам.","services.eventOrganization.title": "Организация IT мероприятий","services.eventOrganization.description": "Хакатоны, фестивали, конференции.","services.rapidPrototyping.title": "Быстрое прототипирование","services.rapidPrototyping.description": "Практичный быстрый прототип сложных систем.","contact.title": "Контакты","contact.intro": "Быстрее всего отвечаю в Telegram.","contact.form.name": "Имя / Ник","contact.form.email": "Email","contact.form.message": "Сообщение","contact.form.send": "Отправить","contact.success": "Отправлено!","contact.error": "Ошибка.","contact.emergencyButton": "Срочно","footer.rights": "Все права защищены.","news.title":"Новости","market.title":"МАРКет" }
};

// Skills moved to standalone file (skills-data.js) exposed via window.SKILLS_DATA

// Achievements moved to achievements-data.js (window.ACHIEVEMENTS)
const services = ['itDevelopment','speaker','startupConsulting','mentor','eventOrganization','rapidPrototyping'];
// Projects section removed

let currentLang = (localStorage.getItem('lang')||'en');

function applyI18n(){
	const dict = locales[currentLang];
	document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n'); if(dict[k]) el.textContent=dict[k];});
	document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const k=el.getAttribute('data-i18n-placeholder'); if(dict[k]) el.setAttribute('placeholder',dict[k]);});
	document.querySelectorAll('.lang-switch button').forEach(btn=>btn.classList.toggle('active',btn.dataset.lang===currentLang));
}

['lang-en','lang-ru'].forEach(id=>{
	const btn=document.getElementById(id); if(btn){btn.addEventListener('click',()=>{currentLang=id==='lang-en'?'en':'ru';localStorage.setItem('lang',currentLang);refreshDynamic();});}
});

const roles=['hero.role1','hero.role2','hero.role3','hero.role4','hero.role5','hero.role6'];
let roleIdx=0; function rotateRole(){const el=document.getElementById('role-rotator'); if(!el) return; el.textContent=locales[currentLang][roles[roleIdx%roles.length]]; roleIdx++;}
setInterval(rotateRole,2500);

function buildTimeline(){
	const list=document.getElementById('achievements-timeline'); if(!list) return;
	if(!window.ACHIEVEMENTS){console.warn('[achievements] data missing'); return;}
	list.innerHTML='';
	window.ACHIEVEMENTS.forEach(item=>{
		const li=document.createElement('li');
		li.className='achievement-item';
		const title=item.title?.[currentLang]||item.title?.en||item.id;
		const desc=item.description?.[currentLang]||item.description?.en||'';
		const icon=item.icon||'•';
		li.innerHTML=`<div class="ach-icon" aria-hidden="true">${icon}</div><div class="ach-text"><strong>${title}</strong><br><span class='small'>${desc}</span></div>`;
		list.appendChild(li);
	});
}
function buildServices(){const grid=document.getElementById('services-grid'); if(!grid) return; grid.innerHTML=''; services.forEach(id=>{const card=document.createElement('div'); card.className='card'; card.innerHTML=`<h3 data-i18n="services.${id}.title"></h3><p data-i18n="services.${id}.description"></p>`; grid.appendChild(card);});}
// buildProjects removed

// Three.js init moved to skills-sphere.js (initSkillsSphere)

function buildNews(){const wrap=document.getElementById('news-list'); if(!wrap||!window.NEWS_POSTS) return; wrap.innerHTML=''; window.NEWS_POSTS.forEach(p=>{const d=document.createElement('article'); const title=p.title?.[currentLang]||p.title?.en||p.id; const body=p.body?.[currentLang]||p.body?.en||''; d.className='news-post card'; d.innerHTML=`<h3>${title}</h3><p class="date">${p.date}</p><p>${body}</p>`; wrap.appendChild(d);});}
function buildMarket(){const wrap=document.getElementById('market-grid'); if(!wrap||!window.MARKET_ITEMS) return; wrap.innerHTML=''; window.MARKET_ITEMS.forEach(item=>{const title=item.title?.[currentLang]||item.title?.en||item.id; const desc=item.desc?.[currentLang]||item.desc?.en||''; const card=document.createElement('div'); card.className='card market-item'; card.innerHTML=`<h3>${title}</h3><p>${desc}</p><div class='price'>${item.price} ${item.currency}</div>`; wrap.appendChild(card);});}
function refreshDynamic(){buildTimeline(); buildServices(); buildNews(); buildMarket(); applyI18n(); highlightActiveNav();}
function highlightActiveNav(){const nav=document.getElementById('main-nav'); if(!nav) return; const path=location.pathname.split('/').pop(); nav.querySelectorAll('a').forEach(a=>{const active = a.getAttribute('href')===path || (a.getAttribute('href').endsWith('index.html') && (path===''||path==='index.html')); a.classList.toggle('active',active);});}

window.addEventListener('DOMContentLoaded',()=>{applyI18n(); rotateRole(); refreshDynamic(); const canvas=document.getElementById('skills-canvas'); if(window.initSkillsSphere) window.initSkillsSphere(canvas); const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear(); const form=document.getElementById('contact-form'); if(form){form.addEventListener('submit',e=>{e.preventDefault(); const status=document.getElementById('form-status'); if(status){status.textContent=locales[currentLang]['contact.success']||'Sent'; status.style.opacity='1'; setTimeout(()=>status.style.opacity='0',3000);} form.reset();});}});

// Mobile nav toggle (runs after partial injection too)
function setupNavToggle(){
	const btn=document.getElementById('nav-toggle');
	const nav=document.getElementById('main-nav');
	if(!btn||!nav) return;
	btn.addEventListener('click',()=>{
		const open=nav.classList.toggle('open');
		btn.setAttribute('aria-expanded',open?'true':'false');
		document.body.classList.toggle('nav-open',open);
	});
	// Close on link click (mobile)
	nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
		if(window.matchMedia('(max-width:819px)').matches){
			nav.classList.remove('open');
			btn.setAttribute('aria-expanded','false');
			document.body.classList.remove('nav-open');
		}
	}));
}

// Expose to refreshDynamic after partial load
window.setupNavToggle=setupNavToggle;

// Call after dynamic injection
const observer=new MutationObserver(()=>{setupNavToggle();});
observer.observe(document.getElementById('site-header')||document.body,{childList:true,subtree:true});

window.__SITE_READY__=true;
