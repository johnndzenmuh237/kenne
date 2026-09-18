/* ============================================================
   KENNE CARGO — MAIN JAVASCRIPT
   main.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   INJECT SHARED HEADER & FOOTER
   ---------------------------------------------------------- */
const SITE = {
  name: 'KENNE',
  tagline: 'Smart Solutions. Global Sourcing. Reliable Mobility.',
  phone: '+237 670 735 947',
  phoneHref: '+237670735947',
  whatsapp: '237670735947',
  email: 'info@kennegroup.com',
  address: 'Douala, Cameroon',
  hours: 'Mon–Sat: 8am–6pm',
};

/* Tri-color "K" mark — gold (Cargo), crimson (Cars), blue (Tech) */
const KENNE_LOGO_SVG = `
  <svg class="logo-icon" width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="kenneGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#F2B90C"/>
        <stop offset="50%" stop-color="#E94560"/>
        <stop offset="100%" stop-color="#2F8FFF"/>
      </linearGradient>
    </defs>
    <rect width="44" height="44" rx="10" fill="var(--color-navy)"/>
    <rect x="2" y="2" width="40" height="40" rx="8" stroke="url(#kenneGrad)" stroke-width="1.4" opacity="0.5"/>
    <path d="M14 30V14h3.4v6.9L23.6 14h4.2L21 22l7 8h-4.3l-5-5.9-1.3 1.4V30H14z" fill="white"/>
  </svg>`;


const TICKER_ITEMS = [
  {
    icon: '<i class="fa-solid fa-mobile-screen-button"></i>',
    text: 'KENNE Smart Technology — Phones, Electronics & Accessories'
  },
  {
    icon: '<i class="fa-solid fa-ship"></i>',
    text: 'KENNE Cargo — China Sourcing, Importation & Cargo Services'
  },
  {
    icon: '<i class="fa-solid fa-car"></i>',
    text: 'KENNE Car Business — Vehicle Sales, Rentals, Parts & Accessories'
  },
  {
    icon: '<i class="fa-solid fa-money-bill-transfer"></i>',
    text: 'Money Exchange Solutions Available'
  },
  {
    icon: '<i class="fa-solid fa-globe"></i>',
    text: 'Connecting Cameroon, China & International Markets'
  },
  {
    icon: '<i class="fa-solid fa-circle-check"></i>',
    text: 'One Business. Multiple Solutions.'
  },
  {
    icon: '<i class="fa-solid fa-location-dot"></i>',
    text: 'Douala, Cameroon'
  },
  {
    icon: '<i class="fa-solid fa-phone"></i>',
    text: `${SITE.phone}`
  },
  {
    icon: '<i class="fa-solid fa-envelope"></i>',
    text: SITE.email
  },
  {
    icon: '<i class="fa-solid fa-arrow-right"></i>',
    text: 'Connect. Source. Import. Drive.'
  },
];



function buildTickerTrack() {
  const renderItems = (items) => items.map(item =>
    `<span class="header-ticker-item"><span class="ticker-icon">${item.icon}</span>${item.text}</span><span class="header-ticker-sep">•</span>`
  ).join('');
  // Item list is duplicated so the -50% translateX loop is seamless.
  return `<div class="header-ticker-track">${renderItems(TICKER_ITEMS)}${renderItems(TICKER_ITEMS)}</div>`;
}

function injectHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (page) => currentPage === page ? 'active' : '';

  placeholder.outerHTML = `
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-left">
          <div class="top-bar-item">
            <span aria-hidden="true">📍</span>
            <span>${SITE.address}</span>
          </div>
          <div class="top-bar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
          </div>
          <div class="top-bar-item top-bar-item--email">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
        <div class="top-bar-right">
          <div class="top-bar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${SITE.hours}</span>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header header--transparent" id="site-header">
      <div class="header-ticker" aria-label="KENNE Group highlights">
        ${buildTickerTrack()}
      </div>
      <div class="container">
        <div class="header-inner">
          <a href="index.html" class="header-logo">
            ${KENNE_LOGO_SVG}
            <div class="logo-text">
              <strong>KENNE</strong>
              <span>Smart Solutions. Global Sourcing. Reliable Mobility.</span>
            </div>
          </a>

          <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="index.html" class="nav-link">Home</a>
              </li>
              <li class="nav-item">
                <a href="#about" class="nav-link">About</a>
              </li>
              <li class="nav-item">
                <a href="#divisions" class="nav-link">
                  Our Divisions
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="nav-dropdown">
                  <a href="cargo/index.html"><span>🚢</span> Kenne Cargo</a>
                  <a href="cars/index.html"><span>🚗</span> Kenne Car Business</a>
                  <a href="smart-tech/index.html"><span>📱</span> Kenne Smart Technology</a>
                </div>
              </li>
              <li class="nav-item">
                <a href="#services" class="nav-link">Services</a>
              </li>
              <li class="nav-item">
                <a href="#how-it-works" class="nav-link">How It Works</a>
              </li>
              <li class="nav-item">
                <a href="#faq" class="nav-link">FAQ</a>
              </li>
              <li class="nav-item">
                <a href="#contact" class="nav-link">Contact</a>
              </li>
            </ul>

            <!-- Mobile-only CTA -->
            <div class="nav-mobile-cta" aria-hidden="true">
              <a href="#divisions" class="btn btn--primary btn--full">Explore Divisions</a>
              <a href="#contact" class="btn btn--outline-white btn--full">Contact Us</a>
            </div>
          </nav>

          <div class="header-cta">
            <div class="notif-wrap" id="notif-wrap">
              <button class="notif-bell" id="notif-bell-btn" aria-label="Notifications" aria-expanded="false">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                <span class="notif-badge" id="notif-badge" hidden>0</span>
              </button>
              <div class="notif-panel" id="notif-panel" hidden>
                <div class="notif-panel-head">
                  <strong>Notifications</strong>
                  <button type="button" id="notif-clear-btn">Clear all</button>
                </div>
                <div class="notif-list" id="notif-list"></div>
              </div>
            </div>
            <button class="dark-mode-toggle" id="dark-toggle" aria-label="Toggle dark mode"></button>
            <a href="#contact" class="btn btn--outline-white btn--sm">Enquire</a>
            <a href="#divisions" class="btn btn--primary btn--sm">Explore</a>
          </div>

          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <div class="drawer-backdrop" id="drawer-backdrop"></div>
    <aside class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
      <div class="drawer-header">
        <a href="index.html" class="header-logo">
          ${KENNE_LOGO_SVG}
          <div class="logo-text"><strong>KENNE</strong></div>
        </a>
        <button class="drawer-close" id="drawer-close" aria-label="Close menu">✕</button>
      </div>
      <div class="drawer-search">
        <input type="search" id="drawer-search-input" placeholder="Search KENNE...">
      </div>
      <nav class="drawer-nav">
        <div class="drawer-section-title">Main</div>
        <a href="index.html" class="drawer-link">Home</a>
        <a href="#about" class="drawer-link">About KENNE</a>
        <a href="#services" class="drawer-link">Services</a>
        <a href="#how-it-works" class="drawer-link">How It Works</a>
        <a href="#faq" class="drawer-link">FAQ</a>
        <a href="#contact" class="drawer-link">Contact</a>

        <div class="drawer-group open">
          <button class="drawer-group-toggle">Our Divisions <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="smart-tech/index.html">📱 Kenne Smart Technology</a>
            <a href="cargo/index.html">🚢 Kenne Cargo</a>
            <a href="cars/index.html">🚗 Kenne Car Business</a>
          </div>
        </div>
      </nav>
      <div class="drawer-cta">
        <a href="#divisions" class="btn btn--primary btn--full">Explore Divisions</a>
        <a href="#contact" class="btn btn--outline-white btn--full">Contact Us</a>
      </div>
    </aside>
  `;

  // Activate header scroll behavior
  initHeader();
  window.dispatchEvent(new CustomEvent('kenne:header-ready'));
}

function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  placeholder.outerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-top">

          <!-- Brand -->
          <div class="footer-brand">
            <a href="index.html" class="header-logo footer-logo">
              ${KENNE_LOGO_SVG}
              <div class="logo-text">
                <strong>KENNE</strong>
                <span>Smart Solutions. Global Sourcing. Reliable Mobility.</span>
              </div>
            </a>
            <p class="footer-about">
              A diversified business group providing mobile phones and electronics, China sourcing and
              importation, cargo services, money exchange, and automobile sales and rentals — connecting
              Cameroon, China, and international markets.
            </p>
            <div class="footer-socials">
              <a href="#" class="footer-social" aria-label="LinkedIn">in</a>
              <a href="#" class="footer-social" aria-label="WhatsApp">✆</a>
              <a href="#" class="footer-social" aria-label="Facebook">f</a>
              <a href="#" class="footer-social" aria-label="YouTube">▶</a>
              <a href="#" class="footer-social" aria-label="Instagram">◎</a>
            </div>
          </div>

          <!-- Divisions -->
          <div class="footer-col">
            <h4 class="footer-col-title">Our Divisions</h4>
            <nav class="footer-links">
              <a href="smart-tech/index.html">Kenne Smart Technology</a>
              <a href="cargo/index.html">Kenne Cargo</a>
              <a href="cars/index.html">Kenne Car Business</a>
            </nav>
          </div>

          <!-- Company -->
          <div class="footer-col">
            <h4 class="footer-col-title">Company</h4>
            <nav class="footer-links">
              <a href="#about">About Us</a>
              <a href="#services">Our Services</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

      
<!-- Contact + Newsletter -->
<div class="footer-col">
  <h4 class="footer-col-title">Get in Touch</h4>

  <div class="footer-contact">

    <div class="footer-contact-item">
      <div class="footer-contact-icon">
        <i class="fa-solid fa-location-dot"></i>
      </div>

      <div>
        <strong>Location</strong><br>
        ${SITE.address}
      </div>
    </div>


    <div class="footer-contact-item">
      <div class="footer-contact-icon">
        <i class="fa-solid fa-phone"></i>
      </div>

      <div>
        <strong>Phone / WhatsApp</strong><br>
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
      </div>
    </div>


    <div class="footer-contact-item">
      <div class="footer-contact-icon">
        <i class="fa-solid fa-envelope"></i>
      </div>

      <div>
        <strong>Email</strong><br>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>

  </div>
</div>


            <div style="margin-top: var(--space-6);">
              <p style="font-size:var(--text-sm);margin-bottom:var(--space-3);">Subscribe to our newsletter:</p>
              <form class="footer-newsletter-form" onsubmit="handleNewsletterSubmit(event)">
                <input type="email" class="footer-newsletter-input" placeholder="Your email" required>
                <button type="submit" class="btn btn--primary btn--sm">→</button>
              </form>
            </div>
          </div>

        </div><!-- /footer-top -->
      </div>

      <div class="container">
        <div class="footer-bottom">
          <div>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</div>
          <nav class="footer-bottom-links">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="terms-conditions.html">Terms &amp; Conditions</a>
            <a href="refund-policy.html">Refund Policy</a>
            <a href="cookies-policy.html">Cookies Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  `;
}

/* ----------------------------------------------------------
   HEADER SCROLL BEHAVIOR
   ---------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  // If header--solid, no scroll behavior needed
  if (header.classList.contains('header--solid')) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('header--scrolled');
      header.classList.remove('header--transparent');
    } else {
      header.classList.remove('header--scrolled');
      header.classList.add('header--transparent');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once immediately
}

/* ----------------------------------------------------------
   MOBILE NAV TOGGLE
   ---------------------------------------------------------- */
function initMobileNav() {
  // Superseded by assets/js/drawer.js, which owns #nav-toggle now.
}

/* ----------------------------------------------------------
   DARK MODE TOGGLE
   ---------------------------------------------------------- */
function initDarkMode() {
  const toggle = document.getElementById('dark-toggle');
  const html   = document.documentElement;
  const stored = localStorage.getItem('kennecargo-dark');

  if (stored === 'true') html.classList.add('dark');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('kennecargo-dark', isDark);
    });
  }
}

/* ----------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ---------------------------------------------------------- */
function initScrollReveal() {
  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale', '.stagger-children'];
  const els = document.querySelectorAll(revealClasses.join(','));
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ----------------------------------------------------------
   BACK TO TOP
   ---------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ----------------------------------------------------------
   FAQ ACCORDION
   ---------------------------------------------------------- */
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      // Open clicked (if was closed)
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ----------------------------------------------------------
   HERO TRACKING FORM
   ---------------------------------------------------------- */
/* ----------------------------------------------------------
   HERO BACKGROUND — tries a chain of images, falls back gracefully
   ---------------------------------------------------------- */
function initHeroBackground() {
  const el = document.querySelector('.hero-bg');
  if (!el) return;
  const candidates = [
    'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1600&q=80',
  ];
  (function tryNext(i) {
    if (i >= candidates.length) return;
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url('${candidates[i]}')`; };
    img.onerror = () => tryNext(i + 1);
    img.src = candidates[i];
  })(0);
}

function initHeroTracking() {
  const form = document.getElementById('hero-track-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[name="tracking_id"]');
    const val   = input?.value.trim();
    if (val) {
      window.location.href = `tracking.html?id=${encodeURIComponent(val)}`;
    }
  });
}

/* ----------------------------------------------------------
   TABS (generic)
   ---------------------------------------------------------- */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(container => {
    const tabs    = container.querySelectorAll('[data-tab]');
    const panels  = container.querySelectorAll('[data-panel]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.add('hidden'));

        tab.classList.add('active');
        container.querySelector(`[data-panel="${target}"]`)?.classList.remove('hidden');
      });
    });
  });
}

/* ----------------------------------------------------------
   SMOOTH ANCHOR SCROLLING
   ---------------------------------------------------------- */
function initAnchorScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '80');
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 16, behavior: 'smooth' });
    });
  });
}

/* ----------------------------------------------------------
   NEWSLETTER SUBMIT
   ---------------------------------------------------------- */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (!input) return;
  input.value = '';
  showToast('✓ You\'re subscribed! Thank you.');
}

/* ----------------------------------------------------------
   TOAST NOTIFICATION
   ---------------------------------------------------------- */
function showToast(message, type = 'success', duration = 3500) {
  const existing = document.querySelector('.sc-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'sc-toast';
  toast.style.cssText = `
    position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(20px);
    background:${type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'};
    color:white; padding:.75rem 1.5rem; border-radius:8px;
    font-size:.875rem; font-weight:600; z-index:9999;
    box-shadow:0 4px 20px rgba(0,0,0,0.25);
    transition:transform .3s ease, opacity .3s ease; opacity:0;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ----------------------------------------------------------
   RIPPLE EFFECT ON BUTTONS
   ---------------------------------------------------------- */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect   = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size   = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.cssText = `
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
      `;
      this.appendChild(circle);
      this.classList.add('btn-ripple');
      circle.addEventListener('animationend', () => circle.remove());
    });
  });
}

/* ----------------------------------------------------------
   ACTIVE NAV LINK HIGHLIGHT (for inner pages)
   ---------------------------------------------------------- */
function highlightActiveNav() {
  const path    = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
}

/* ----------------------------------------------------------
   INIT ALL
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
  if (window.KenneNotifications) window.KenneNotifications.initBell();
  initMobileNav();
  initDarkMode();
  initScrollReveal();
  initBackToTop();
  initFAQ();
  initHeroTracking();
  initHeroBackground();
  initTabs();
  initAnchorScrolling();
  initButtonRipple();
  highlightActiveNav();
});
