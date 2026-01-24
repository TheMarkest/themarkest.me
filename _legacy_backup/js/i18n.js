/**
 * Internationalization Module
 * Handles language switching and translations
 */

import { storage } from './utils.js';

// Default language
const DEFAULT_LANG = 'ru';

// Current language state
let currentLang = storage.get('lang', DEFAULT_LANG);

// Loaded locales cache
const localesCache = {};

/**
 * Load locale data from JSON file
 */
async function loadLocale(lang) {
  if (localesCache[lang]) {
    return localesCache[lang];
  }
  
  try {
    const response = await fetch(`/data/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load locale: ${lang}`);
    }
    const data = await response.json();
    localesCache[lang] = data;
    return data;
  } catch (error) {
    console.error('Error loading locale:', error);
    // Return empty object as fallback
    return {};
  }
}

/**
 * Get translation by key
 */
function translate(key, lang = currentLang) {
  const locale = localesCache[lang];
  if (!locale) return key;
  
  // Support nested keys like "nav.home"
  const keys = key.split('.');
  let value = locale;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  return value;
}

/**
 * Apply translations to DOM elements
 */
function applyTranslations(lang = currentLang) {
  const locale = localesCache[lang];
  if (!locale) return;
  
  // Translate elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translate(key, lang);
    
    if (translation && translation !== key) {
      // Check if element is an input/textarea/button
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        // Don't change value, only placeholder if specified
        if (element.hasAttribute('data-i18n-placeholder')) {
          const placeholderKey = element.getAttribute('data-i18n-placeholder');
          element.placeholder = translate(placeholderKey, lang);
        }
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Translate placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = translate(key, lang);
    
    if (translation && translation !== key) {
      element.placeholder = translation;
    }
  });
  
  // Translate title attributes
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    const key = element.getAttribute('data-i18n-title');
    const translation = translate(key, lang);
    
    if (translation && translation !== key) {
      element.title = translation;
    }
  });
  
  // Translate aria-label attributes
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    const translation = translate(key, lang);
    
    if (translation && translation !== key) {
      element.setAttribute('aria-label', translation);
    }
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

/**
 * Change language
 */
async function changeLanguage(lang) {
  if (lang === currentLang) return;
  
  // Load locale if not cached
  if (!localesCache[lang]) {
    await loadLocale(lang);
  }
  
  currentLang = lang;
  storage.set('lang', lang);
  
  // Apply translations
  applyTranslations(lang);
  
  // Update active state on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Dispatch custom event for other modules
  window.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { lang } 
  }));
  
  // Update page meta tags if needed
  updateMetaTags(lang);
}

/**
 * Update meta tags for SEO
 */
function updateMetaTags(lang) {
  const locale = localesCache[lang];
  if (!locale || !locale.meta) return;
  
  // Update title
  if (locale.meta.title) {
    document.title = locale.meta.title;
  }
  
  // Update description
  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta && locale.meta.description) {
    descMeta.content = locale.meta.description;
  }
  
  // Update OG tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && locale.meta.title) {
    ogTitle.content = locale.meta.title;
  }
  
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc && locale.meta.description) {
    ogDesc.content = locale.meta.description;
  }
}

/**
 * Initialize i18n system
 */
async function initI18n() {
  // Get saved language or default
  const savedLang = storage.get('lang', DEFAULT_LANG);
  
  // Load both locales for fast switching
  await Promise.all([
    loadLocale('ru'),
    loadLocale('en')
  ]);
  
  // Apply current language
  currentLang = savedLang;
  applyTranslations(currentLang);
  
  // Set up language switchers
  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      if (lang) {
        changeLanguage(lang);
      }
    });
    
    // Set active state
    button.classList.toggle('active', button.dataset.lang === currentLang);
  });
  
  console.log('i18n initialized with language:', currentLang);
}

/**
 * Get current language
 */
function getCurrentLanguage() {
  return currentLang;
}

/**
 * Role rotator for hero section
 */
function initRoleRotator() {
  const rotator = document.getElementById('role-rotator');
  if (!rotator) return;
  
  const roles = [
    'hero.role1',
    'hero.role2',
    'hero.role3',
    'hero.role4',
    'hero.role5',
    'hero.role6'
  ];
  
  let currentIndex = 0;
  
  function updateRole() {
    const translation = translate(roles[currentIndex]);
    if (rotator && translation) {
      rotator.textContent = translation;
    }
    currentIndex = (currentIndex + 1) % roles.length;
  }
  
  // Initial update
  updateRole();
  
  // Rotate every 3 seconds
  setInterval(updateRole, 3000);
  
  // Update on language change
  window.addEventListener('languageChanged', updateRole);
}

// Export functions
export {
  initI18n,
  changeLanguage,
  translate,
  getCurrentLanguage,
  applyTranslations,
  initRoleRotator
};
