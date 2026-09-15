/* ============================================================
   KENNE CARGO — MAIN JAVASCRIPT
   main.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   INJECT SHARED HEADER & FOOTER
   ---------------------------------------------------------- */
const SITE = {
  name: 'Kenne Cargo',
  tagline: 'China to Cameroon',
  phone: '+237 670 735 947',
  phoneHref: '+237670735947',
  phoneChina: '+86 130 1307 4270',
  phoneChinaHref: '+8613013074270',
  email: 'info@kennecargo.com',
  address: 'Douala, Cameroon',
  hours: 'Mon–Sat: 8am–6pm',
};

/* K + globe + wing mark, in the navy/gold Kenne Cargo palette */
const KENNE_LOGO_SVG = `
  <svg class="logo-icon" width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="10" fill="var(--color-navy)"/>
    <circle cx="22" cy="23" r="9.5" stroke="var(--color-accent)" stroke-width="1.4" opacity="0.55"/>
    <path d="M22 13.5v19M13 19.5c3 2 15 2 18 0M13 26.5c3-2 15-2 18 0" stroke="var(--color-accent)" stroke-width="1" opacity="0.4" fill="none"/>
    <path d="M13 30V15h3.4v6.1L21.6 15h4L19.8 22l6 8h-4.1l-4.1-5.9-1.6 1.9V30H13z" fill="white"/>
    <path d="M27 12c3.2 1 6.6 3.4 8.6 6.4-2.9-.6-6-.4-8.6.9V12z" fill="var(--color-accent)"/>
  </svg>`;

const TICKER_ITEMS = [
  { icon: '🚢', text: 'Shipment from China to Cameroon — Fast. Safe. Reliable.' },
  { icon: '🔔', text: 'Every shipment gets a tracking number the moment it\'s registered' },
  { icon: '🚗', text: 'We Buy Cars' },
  { icon: '🔍', text: 'We Source Suppliers' },
  { icon: '📦', text: 'Door to Door Delivery' },
  { icon: '🛃', text: 'Import & Export Handled for You' },
  { icon: '💱', text: 'Money Exchange — CFA ⇄ RMB' },
  { icon: '📍', text: 'Guangzhou, China → Douala, Cameroon' },
  { icon: '☎', text: `Cameroon: ${SITE.phone}` },
  { icon: '☎', text: `China: ${SITE.phoneChina}` },
  { icon: '✉', text: SITE.email },
  { icon: '⭐', text: 'Let Us Handle It — You Relax!' },
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
            <span aria-hidden="true">🇨🇲</span>
            <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
          </div>
          <div class="top-bar-item">
            <span aria-hidden="true">🇨🇳</span>
            <a href="tel:${SITE.phoneChinaHref}">${SITE.phoneChina}</a>
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
          <div class="top-bar-item">
            <a href="tracking.html" style="color:var(--color-accent);font-weight:600;">Track Shipment ›</a>
          </div>
          <div class="top-bar-item">
            <a href="../index.html" style="color:rgba(255,255,255,0.7);font-weight:600;">🔀 Kenne Group ›</a>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header header--transparent" id="site-header">
      <div class="header-ticker" aria-label="Kenne Cargo highlights">
        ${buildTickerTrack()}
      </div>
      <div class="container">
        <div class="header-inner">
          <a href="index.html" class="header-logo">
            ${KENNE_LOGO_SVG}
            <div class="logo-text">
              <strong>KENNE <span style="color:var(--color-accent);">CARGO</span></strong>
              <span>Fast. Safe. Reliable.</span>
            </div>
          </a>

          <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="index.html" class="nav-link ${isActive('index.html')}">Home</a>
              </li>
              <li class="nav-item">
                <a href="about.html" class="nav-link ${isActive('about.html')}">About</a>
              </li>
              <li class="nav-item">
                <a href="services.html" class="nav-link ${isActive('services.html')}">
                  Services
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="nav-dropdown">
                  <a href="services.html#shipping"><span>🚢</span> Shipping Services</a>
                  <a href="air-freight.html"><span>✈️</span> Air Freight</a>
                  <a href="sea-freight.html"><span>🚢</span> Sea Freight</a>
                  <a href="get-quote.html"><span>📋</span> Get a Quote</a>
                  <a href="track-shipment.html"><span>📍</span> Track Shipment</a>
                  <a href="services.html#buy-cars"><span>🚗</span> We Buy Cars</a>
                  <a href="services.html#sourcing"><span>🔍</span> We Source Suppliers</a>
                  <a href="services.html#door-to-door"><span>📦</span> Door to Door Delivery</a>
                  <a href="services.html#import-export"><span>🛃</span> Import &amp; Export</a>
                  <a href="services.html#money-exchange"><span>💱</span> Money Exchange</a>
                  <a href="prohibited-goods.html"><span>🚫</span> Prohibited Goods</a>
                  <a href="shipping-process.html"><span>🗺️</span> Shipping Process</a>
                  <a href="services.html"><span>→</span> View All Services</a>
                </div>
              </li>
              <li class="nav-item">
                <a href="tracking.html" class="nav-link ${isActive('tracking.html')}">Tracking</a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  Company
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="nav-dropdown">
                  <a href="fleet.html"><span>🚂</span> Our Fleet</a>
                  <a href="destinations.html"><span>🌍</span> Destinations</a>
                  <a href="careers.html"><span>💼</span> Careers</a>
                  <a href="blog.html"><span>📰</span> Blog</a>
                </div>
              </li>
              <li class="nav-item">
                <a href="pricing.html" class="nav-link ${isActive('pricing.html')}">Pricing</a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="nav-link ${isActive('contact.html')}">Contact</a>
              </li>
            </ul>

            <!-- Mobile-only CTA -->
            <div class="nav-mobile-cta" aria-hidden="true">
              <a href="quote-request.html" class="btn btn--primary btn--full">Ship With Us</a>
              <a href="tracking.html" class="btn btn--outline-white btn--full">Track Shipment</a>
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
            <a href="tracking.html" class="btn btn--outline-white btn--sm">Track</a>
            <a href="contact.html" class="btn btn--primary btn--sm">Talk</a>
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
          <div class="logo-text"><strong>KENNE <span style="color:var(--color-accent);">CARGO</span></strong></div>
        </a>
        <button class="drawer-close" id="drawer-close" aria-label="Close menu">✕</button>
      </div>
      <div class="drawer-search">
        <input type="search" id="drawer-search-input" placeholder="Search Kenne Cargo...">
      </div>
      <nav class="drawer-nav">
        <div class="drawer-section-title">Main</div>
        <a href="index.html" class="drawer-link">Cargo Home</a>
        <a href="about.html" class="drawer-link">About</a>
        <a href="services.html" class="drawer-link">Shipping Services</a>
        <a href="blog.html" class="drawer-link">Blog</a>
        <a href="faq.html" class="drawer-link">FAQ</a>
        <a href="contact.html" class="drawer-link">Contact KENNE Cargo</a>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Shipping &amp; Sourcing <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="air-freight.html">Air Freight</a>
            <a href="sea-freight.html">Sea Freight</a>
            <a href="services.html#sourcing">Product Sourcing</a>
            <a href="services.html#sourcing">China Sourcing</a>
            <a href="services.html#sourcing">Supplier Sourcing</a>
            <a href="services.html#import-export">Importation</a>
            <a href="services.html#money-exchange">Money Exchange</a>
            <a href="get-quote.html">Request a Quote / Cargo Quote</a>
            <a href="track-shipment.html">Track Shipment</a>
            <a href="prohibited-goods.html">Prohibited Goods</a>
            <a href="shipping-process.html">Shipping Process</a>
          </div>
        </div>

        <div class="drawer-section-title">Customer</div>
        <a href="track-shipment.html" class="drawer-link">My Shipments</a>
        <a href="contact.html" class="drawer-link">Contact Support</a>

        <div class="drawer-section-title">Business</div>
        <a href="../index.html" class="drawer-link">🔀 Kenne Group</a>
        <a href="register-shipment.html" class="drawer-link" style="opacity:.65;">Staff: Register Shipment</a>
        <a href="shipment-center.html" class="drawer-link" style="opacity:.65;">Staff: Shipment Update Center</a>
        <a href="shipping-rates.html" class="drawer-link" style="opacity:.65;">Staff: Shipping Rates</a>
      </nav>
      <div class="drawer-cta">
        <a href="get-quote.html" class="btn btn--primary btn--full">Get a Quote</a>
        <a href="contact.html" class="btn btn--outline-white btn--full">Contact Us</a>
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
                <strong>KENNE <span style="color:var(--color-accent);">CARGO</span></strong>
                <span>Fast. Safe. Reliable.</span>
              </div>
            </a>
            <p class="footer-about">
              Your trusted cargo partner from China to Cameroon. We buy cars, source suppliers,
              ship by sea and air, and deliver door to door — so you can let us handle it and relax.
            </p>
            <div class="footer-socials">
              <a href="#" class="footer-social" aria-label="LinkedIn">in</a>
              <a href="#" class="footer-social" aria-label="WhatsApp">✆</a>
              <a href="#" class="footer-social" aria-label="Facebook">f</a>
              <a href="#" class="footer-social" aria-label="YouTube">▶</a>
              <a href="#" class="footer-social" aria-label="Instagram">◎</a>
            </div>
          </div>

          <!-- Services -->
          <div class="footer-col">
            <h4 class="footer-col-title">Services</h4>
            <nav class="footer-links">
              <a href="services.html#buy-cars">We Buy Cars</a>
              <a href="services.html#sourcing">We Source Suppliers</a>
              <a href="services.html#shipping">Shipping Services</a>
              <a href="services.html#door-to-door">Door to Door Delivery</a>
              <a href="services.html#import-export">Import &amp; Export</a>
              <a href="services.html#money-exchange">Money Exchange</a>
            </nav>
          </div>

          <!-- Company -->
          <div class="footer-col">
            <h4 class="footer-col-title">Company</h4>
            <nav class="footer-links">
              <a href="about.html">About Us</a>
              <a href="destinations.html">Destinations</a>
              <a href="tracking.html">Track Shipment</a>
              <a href="careers.html">Careers</a>
              <a href="blog.html">Blog & News</a>
              <a href="faq.html">FAQ</a>
              <a href="contact.html">Contact</a>
              <a href="../index.html">Kenne Group</a>
              <a href="../cars/index.html">Kenne Car Business</a>
              <a href="../smart-tech/index.html">Kenne Smart Technology</a>
            </nav>
          </div>

          <!-- Contact + Newsletter -->
          <div class="footer-col">
            <h4 class="footer-col-title">Get in Touch</h4>
            <div class="footer-contact">
              <div class="footer-contact-item">
                <div class="footer-contact-icon">📍</div>
                <div>
                  <strong>Cameroon Office</strong><br>
                  ${SITE.address}
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon">🇨🇲</div>
                <div>
                  <strong>Cameroon Contact</strong><br>
                  <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon">🇨🇳</div>
                <div>
                  <strong>China Contact</strong><br>
                  <a href="tel:${SITE.phoneChinaHref}">${SITE.phoneChina}</a>
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon">✉️</div>
                <div>
                  <strong>Email</strong><br>
                  <a href="mailto:${SITE.email}">${SITE.email}</a>
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
            <a href="../privacy-policy.html">Privacy Policy</a>
            <a href="../terms-conditions.html">Terms &amp; Conditions</a>
            <a href="../refund-policy.html">Refund Policy</a>
            <a href="../cookies-policy.html">Cookies Policy</a>
            <a href="register-shipment.html" style="opacity:.6;">Staff: Register Shipment</a>
            <a href="shipment-center.html" style="opacity:.6;">Staff: Shipment Update Center</a>
            <a href="shipping-rates.html" style="opacity:.6;">Staff: Shipping Rates</a>
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
  // Kept as a no-op so any existing initMobileNav() call site doesn't error.
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