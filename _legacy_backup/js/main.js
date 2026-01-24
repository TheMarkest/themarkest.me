/**
 * Main Application Entry Point
 * Initializes all modules and handles page-specific functionality
 */

import { $, $$, getCurrentYear, observeElements, trackEvent, initLazyLoading } from './utils.js';
import { initI18n, translate, getCurrentLanguage, initRoleRotator } from './i18n.js';
import { initNavigation } from './navigation.js';
import { initSkillsSphere } from './skills-sphere.js';

/**
 * Initialize Back to Top button
 */
function initBackToTop() {
  // Create button if it doesn't exist
  let backToTopBtn = $('#back-to-top');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Наверх');
    backToTopBtn.setAttribute('title', 'Наверх');
    document.body.appendChild(backToTopBtn);
  }
  
  // Show/hide button on scroll
  const toggleButton = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };
  
  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    trackEvent('Navigation', 'Back to Top Click');
  });
  
  // Listen to scroll events
  window.addEventListener('scroll', toggleButton, { passive: true });
  
  // Initial check
  toggleButton();
}

/**
 * Load and render achievements
 */
async function loadAchievements() {
  try {
    const response = await fetch('/data/achievements.json');
    const data = await response.json();
    
    const timelineEl = $('#achievements-timeline');
    const previewEl = $('#achievements-preview');
    
    if (!data || !data.achievements) return;
    
    const lang = getCurrentLanguage();
    const achievements = data.achievements;
    
    // Render full timeline
    if (timelineEl) {
      timelineEl.innerHTML = '';
      achievements.forEach((achievement, index) => {
        const item = createTimelineItem(achievement, lang);
        item.classList.add('scroll-animate');
        item.style.animationDelay = `${index * 0.1}s`;
        timelineEl.appendChild(item);
      });
    }
    
    // Render preview (all achievements on home page)
    if (previewEl) {
      previewEl.innerHTML = '';
      achievements.forEach((achievement, index) => {
        const card = createAchievementCard(achievement, lang);
        card.classList.add('scroll-animate');
        card.style.animationDelay = `${index * 0.05}s`;
        previewEl.appendChild(card);
      });
    }
  } catch (error) {
    console.error('Failed to load achievements:', error);
  }
}

/**
 * Create timeline item element
 */
function createTimelineItem(achievement, lang) {
  const item = document.createElement('div');
  item.className = 'timeline-item';
  item.setAttribute('role', 'listitem');
  
  const title = achievement.title?.[lang] || achievement.title?.en || achievement.id;
  const description = achievement.description?.[lang] || achievement.description?.en || '';
  const icon = achievement.icon || '•';
  const link = achievement.link || null;
  
  item.innerHTML = `
    <div class="timeline-icon" aria-hidden="true">${icon}</div>
    <div class="timeline-content">
      <h3 class="timeline-title">${title}</h3>
      <p class="timeline-text">${description}</p>
      ${link ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="btn btn-small" style="margin-top: var(--space-sm);">${translate('common.learnMore', lang)}</a>` : ''}
    </div>
  `;
  
  return item;
}

/**
 * Create achievement card element
 */
function createAchievementCard(achievement, lang) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const title = achievement.title?.[lang] || achievement.title?.en || achievement.id;
  const description = achievement.description?.[lang] || achievement.description?.en || '';
  const icon = achievement.icon || '🎯';
  
  card.innerHTML = `
    <div style="font-size: 2rem; margin-bottom: var(--space-sm);">${icon}</div>
    <h3 class="card-title">${title}</h3>
    <p class="card-text">${description}</p>
  `;
  
  return card;
}

/**
 * Load and render services
 */
async function loadServices() {
  try {
    const response = await fetch('/data/services.json');
    const data = await response.json();
    
    const servicesGrid = $('#services-grid');
    if (!servicesGrid || !data || !data.services) return;
    
    const lang = getCurrentLanguage();
    const services = data.services;
    
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
      const card = createServiceCard(service, lang);
      servicesGrid.appendChild(card);
    });
  } catch (error) {
    console.error('Failed to load services:', error);
  }
}

/**
 * Create service card element
 */
function createServiceCard(service, lang) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const title = service.title?.[lang] || service.title?.en || service.id;
  const description = service.description?.[lang] || service.description?.en || '';
  const icon = service.icon || '⚡';
  
  card.innerHTML = `
    <div style="font-size: 2rem; margin-bottom: var(--space-sm);">${icon}</div>
    <h3 class="card-title">${title}</h3>
    <p class="card-text">${description}</p>
  `;
  
  return card;
}

/**
 * Initialize contact form
 */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    const statusEl = $('#form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Disable form during submission
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
      // Check if EmailJS is available
      if (typeof emailjs !== 'undefined') {
        // Send via EmailJS
        // Замените 'YOUR_SERVICE_ID' и 'YOUR_TEMPLATE_ID' на реальные значения из emailjs.com
        const response = await emailjs.sendForm(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          form
        );
        
        console.log('EmailJS response:', response);
        
        if (response.status === 200) {
          // Show success message
          if (statusEl) {
            statusEl.textContent = translate('contact.success');
            statusEl.className = 'form-status success visible';
          }
          
          // Track event
          trackEvent('contact_form_submit', {
            method: 'emailjs',
            status: 'success'
          });
          
          // Reset form
          form.reset();
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            if (statusEl) {
              statusEl.classList.remove('visible');
            }
          }, 5000);
        } else {
          throw new Error('EmailJS returned non-200 status');
        }
      } else {
        // Fallback: simulate success (для тестирования без EmailJS)
        console.warn('EmailJS not loaded, using fallback');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (statusEl) {
          statusEl.textContent = translate('contact.success') + ' (Demo mode)';
          statusEl.className = 'form-status success visible';
        }
        
        trackEvent('contact_form_submit', {
          method: 'demo'
        });
        
        form.reset();
        
        setTimeout(() => {
          if (statusEl) {
            statusEl.classList.remove('visible');
          }
        }, 5000);
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      
      if (statusEl) {
        statusEl.textContent = translate('contact.error');
        statusEl.className = 'form-status error visible';
      }
      
      trackEvent('contact_form_submit', {
        method: 'error',
        error: error.message
      });
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Animate various element types
  const animationTypes = [
    '.scroll-animate',
    '.scroll-animate-left',
    '.scroll-animate-right',
    '.scroll-animate-scale',
    '.scroll-animate-fade',
    '.scroll-animate-stagger'
  ];
  
  animationTypes.forEach(selector => {
    observeElements(selector, (element) => {
      element.classList.add('visible');
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    });
  });
  
  // Add reveal classes to sections
  const sections = $$('.section');
  sections.forEach((section, index) => {
    if (index > 0) { // Skip first section (hero)
      section.classList.add('scroll-animate-fade');
    }
  });
  
  // Add reveal to cards
  $$('.card').forEach((card, index) => {
    if (!card.classList.contains('scroll-animate')) {
      card.classList.add('scroll-animate');
      card.style.animationDelay = `${(index % 3) * 0.1}s`;
    }
  });
}

/**
 * Update current year in footer
 */
function updateYear() {
  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = getCurrentYear();
  }
}

/**
 * Initialize page based on current location
 */
async function initPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  // Common initialization
  updateYear();
  initScrollAnimations();
  
  // Page-specific initialization
  if (page === 'index.html' || page === '' || page === '/') {
    // Home page
    initRoleRotator();
    await loadAchievements();
    await loadServices();
  } else if (page === 'bio.html') {
    // Bio page
    await loadAchievements();
  } else if (page === 'services.html') {
    // Services page
    await loadServices();
  } else if (page === 'contacts.html') {
    // Contacts page
    initContactForm();
  }
  
  console.log(`Page initialized: ${page}`);
}

/**
 * Register Service Worker for PWA
 */
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('[SW] Service Worker registered:', registration.scope);
      
      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[SW] New Service Worker found');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            console.log('[SW] New version available, please refresh');
            // Можно показать уведомление пользователю
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('[SW] Registration failed:', error);
    }
  } else {
    console.log('[SW] Service Workers not supported');
  }
}

/**
 * Main initialization function
 */
async function init() {
  console.log('Initializing application...');
  
  try {
    // Initialize core modules
    await initI18n();
    initNavigation();
    initBackToTop();
    
    // Register Service Worker for PWA
    registerServiceWorker();
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize 3D background
    const canvas = $('#skills-canvas');
    if (canvas) {
      initSkillsSphere(canvas).catch(err => {
        console.warn('Skills sphere initialization failed:', err);
      });
    }
    
    // Initialize page-specific features
    await initPage();
    
    // Listen for language changes to reload content
    window.addEventListener('languageChanged', async () => {
      await initPage();
    });
    
    console.log('Application initialized successfully');
    
    // Track page view
    trackEvent('page_view', {
      page_path: window.location.pathname
    });
    
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for debugging
window.app = {
  init,
  loadAchievements,
  loadServices
};
