/**
 * Navigation Module
 * Handles mobile menu, scroll behavior, and navigation state
 */

import { $, $$, throttle } from './utils.js';

let lastScrollY = window.scrollY;
let ticking = false;

/**
 * Initialize mobile navigation
 */
function initMobileNav() {
  const toggle = $('#nav-toggle');
  const nav = $('#main-nav');
  
  if (!toggle || !nav) return;
  
  // Toggle menu
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    
    toggle.setAttribute('aria-expanded', !isOpen);
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });
  
  // Close menu when clicking nav links (mobile)
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 820) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        document.body.classList.remove('nav-open');
      }
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && 
        !nav.contains(e.target) && 
        !toggle.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    }
  });
}

/**
 * Highlight active navigation item
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  
  $$('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    const linkPage = linkHref.split('/').pop();
    
    // Check if link matches current page
    const isActive = 
      linkPage === currentPage || 
      (currentPage === '' && linkPage === 'index.html') ||
      (currentPage === '/' && linkPage === 'index.html') ||
      (linkPage === '/' && (currentPage === 'index.html' || currentPage === ''));
    
    link.classList.toggle('active', isActive);
  });
}

/**
 * Handle header scroll behavior (hide/show on scroll)
 */
function handleHeaderScroll() {
  const header = $('.site-header');
  if (!header) return;
  
  const currentScrollY = window.scrollY;
  
  // Don't hide header if at top of page
  if (currentScrollY < 100) {
    header.classList.remove('hidden');
    lastScrollY = currentScrollY;
    return;
  }
  
  // Hide header when scrolling down, show when scrolling up
  if (currentScrollY > lastScrollY && currentScrollY > 200) {
    header.classList.add('hidden');
  } else if (currentScrollY < lastScrollY) {
    header.classList.remove('hidden');
  }
  
  lastScrollY = currentScrollY;
}

/**
 * Initialize scroll-based header behavior
 */
function initScrollHeader() {
  const throttledScroll = throttle(handleHeaderScroll, 100);
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        throttledScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      const target = $(href);
      if (target) {
        e.preventDefault();
        
        // Get header height for offset
        const header = $('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Back to top button functionality
 */
function initBackToTop() {
  const backToTopBtn = $('.back-to-top');
  if (!backToTopBtn) return;
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Initialize all navigation features
 */
function initNavigation() {
  initMobileNav();
  highlightActiveNav();
  initScrollHeader();
  initSmoothScroll();
  initBackToTop();
  
  console.log('Navigation initialized');
}

export {
  initNavigation,
  highlightActiveNav,
  initMobileNav,
  initScrollHeader,
  initSmoothScroll,
  initBackToTop
};
