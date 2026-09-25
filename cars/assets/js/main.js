/* ============================================================
   KENNE CAR BUSINESS — MAIN JAVASCRIPT
   main.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   INJECT SHARED HEADER & FOOTER
   ---------------------------------------------------------- */
const SITE = {
  name: 'Kenne Car Business',
  tagline: 'Wholesale • Retail • Rentals • Parts',
  phone: '+237 670 735 947',
  phoneHref: '+237670735947',
  whatsapp: '237670735947',
  email: 'cars@kennegroup.com',
  address: 'Douala, Cameroon',
  hours: 'Mon–Sat: 8am–6pm',
};

/* Steering-wheel + "K" mark, in the navy/crimson Kenne Car Business palette */
const KENNE_LOGO_SVG = `
  <svg class="logo-icon" width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="10" fill="var(--color-navy)"/>
    <circle cx="22" cy="22" r="10.5" stroke="var(--color-accent)" stroke-width="1.6" opacity="0.6"/>
    <circle cx="22" cy="22" r="2.6" fill="var(--color-accent)"/>
    <path d="M22 11.5v6M22 26.5v6M12 22h6M26 22h6" stroke="var(--color-accent)" stroke-width="1.6" opacity="0.55" stroke-linecap="round"/>
    <path d="M14 30V15h3.4v6.1L22.6 15h4L20.8 22l6 8h-4.1l-4.1-5.9-1.6 1.9V30H14z" fill="white"/>
  </svg>`;

const TICKER_ITEMS = [
  { icon: '🚗', text: 'Wholesale & Retail Cars — Every Make, Every Budget' },
  { icon: '🔑', text: 'Car Rentals — Self Drive or With Driver' },
  { icon: '🛠️', text: 'Genuine Car Parts & Accessories' },
  { icon: '📦', text: 'Sourced Direct from China, Delivered in Cameroon' },
  { icon: '💳', text: 'Pay Now or Pay on Delivery — Your Choice' },
  { icon: '🧾', text: 'Every Order Gets an Instant Order Number' },
  { icon: '📍', text: 'Douala, Cameroon' },
  { icon: '☎', text: `${SITE.phone}` },
  { icon: '✉', text: SITE.email },
  { icon: '⭐', text: 'Kenne Car Business — Drive Away Happy' },
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
          <div class="top-bar-item">
            <a href="../index.html" style="color:var(--color-accent);font-weight:600;">🔀 Kenne Group ›</a>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header header--transparent" id="site-header">
      <div class="header-ticker" aria-label="Kenne Car Business highlights">
        ${buildTickerTrack()}
      </div>
      <div class="container">
        <div class="header-inner">
          <a href="index.html" class="header-logo">
            ${KENNE_LOGO_SVG}
            <div class="logo-text">
              <strong>KENNE <span style="color:var(--color-accent);">CARS</span></strong>
              <span>Wholesale • Retail • Rentals • Parts</span>
            </div>
          </a>

          <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="index.html" class="nav-link ${isActive('index.html')}">Home</a>
              </li>
              <li class="nav-item">
                <a href="inventory.html" class="nav-link ${isActive('inventory.html')}">
                  Buy a Car
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="nav-dropdown">
                  <a href="inventory.html?category=retail"><span>🚗</span> Retail Cars</a>
                  <a href="inventory.html?category=wholesale"><span>📦</span> Wholesale Lot</a>
                  <a href="inventory.html"><span>→</span> View All Inventory</a>
                </div>
              </li>
              <li class="nav-item">
                <a href="rentals.html" class="nav-link ${isActive('rentals.html')}">Rentals</a>
              </li>
              <li class="nav-item">
                <a href="parts.html" class="nav-link ${isActive('parts.html')}">Parts &amp; Accessories</a>
              </li>
              <li class="nav-item">
                <a href="about.html" class="nav-link ${isActive('about.html')}">About</a>
              </li>
              <li class="nav-item">
                <a href="contact.html" class="nav-link ${isActive('contact.html')}">Contact</a>
              </li>
            </ul>

            <!-- Mobile-only CTA -->
            <div class="nav-mobile-cta" aria-hidden="true">
              <a href="inventory.html" class="btn btn--primary btn--full">Browse Cars</a>
              <a href="cart.html" class="btn btn--outline-white btn--full" style="position:relative;">
                🛒 View Cart <span data-cart-badge class="notif-badge" style="position:static;margin-left:6px;display:inline-flex;align-items:center;justify-content:center;" hidden>0</span>
              </a>
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
            <a href="cart.html" class="btn btn--outline-white btn--sm" style="position:relative;" aria-label="View cart">
              🛒 Cart <span id="cart-badge" data-cart-badge class="notif-badge" style="position:static;margin-left:4px;display:inline-flex;align-items:center;justify-content:center;" hidden>0</span>
            </a>
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
          <div class="logo-text"><strong>KENNE <span style="color:var(--color-accent);">CARS</span></strong></div>
        </a>
        <button class="drawer-close" id="drawer-close" aria-label="Close menu">✕</button>
      </div>
      <div class="drawer-search">
        <input type="search" id="drawer-search-input" placeholder="Search cars, parts, rentals...">
      </div>
      <nav class="drawer-nav">
        <div class="drawer-section-title">Main</div>
        <a href="index.html" class="drawer-link">Home</a>
        <a href="about.html" class="drawer-link">About</a>
        <a href="contact.html" class="drawer-link">Contact</a>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Cars <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="inventory.html">All Cars</a>
            <a href="inventory.html?category=retail">Retail Cars</a>
            <a href="inventory.html?category=wholesale">Wholesale Lot</a>
          </div>
        </div>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Rentals <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="rentals.html">Car Rentals</a>
            <a href="rentals.html">Available Cars</a>
          </div>
        </div>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Parts &amp; Accessories <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="parts.html">Car Parts</a>
            <a href="parts.html">Car Accessories</a>
          </div>
        </div>

        <div class="drawer-section-title">Customer</div>
        <a href="cart.html" class="drawer-link" style="display:flex;align-items:center;justify-content:space-between;">
          <span>🛒 My Cart</span>
          <span data-cart-badge class="notif-badge" style="position:static;" hidden>0</span>
        </a>
        <a href="contact.html" class="drawer-link">Contact Support</a>

        <div class="drawer-section-title">Business</div>
        <a href="../index.html" class="drawer-link">🔀 Kenne Group</a>
      </nav>
      <div class="drawer-cta">
        <a href="inventory.html" class="btn btn--primary btn--full">Browse Cars</a>
        <a href="cart.html" class="btn btn--outline-white btn--full">View Cart</a>
      </div>
    </aside>
  `;

  // Activate header scroll behavior
  initHeader();
  // Cart badges live inside the header/drawer we just injected — refresh them now.
  if (window.KenneCart) window.KenneCart.updateCartBadge();
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
                <strong>KENNE <span style="color:var(--color-accent);">CARS</span></strong>
                <span>Wholesale • Retail • Rentals • Parts</span>
              </div>
            </a>
            <p class="footer-about">
              Quality cars sourced from China and sold across Cameroon — wholesale, retail, rentals,
              and genuine parts, all backed by real customer support.
            </p>
            <div class="footer-socials">
              <a href="#" class="footer-social" aria-label="LinkedIn">in</a>
              <a href="#" class="footer-social" aria-label="WhatsApp">✆</a>
              <a href="#" class="footer-social" aria-label="Facebook">f</a>
              <a href="#" class="footer-social" aria-label="YouTube">▶</a>
              <a href="#" class="footer-social" aria-label="Instagram">◎</a>
            </div>
          </div>

          <!-- Shop -->
          <div class="footer-col">
            <h4 class="footer-col-title">Shop</h4>
            <nav class="footer-links">
              <a href="inventory.html?category=retail">Retail Cars</a>
              <a href="inventory.html?category=wholesale">Wholesale Lot</a>
              <a href="rentals.html">Car Rentals</a>
              <a href="parts.html">Parts &amp; Accessories</a>
              <a href="cart.html">My Cart</a>
            </nav>
          </div>

          <!-- Company -->
          <div class="footer-col">
            <h4 class="footer-col-title">Company</h4>
            <nav class="footer-links">
              <a href="about.html">About Us</a>
              <a href="contact.html">Contact</a>
              <a href="../index.html">Kenne Group</a>
              <a href="../cargo/index.html">Kenne Cargo</a>
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
                  <strong>Showroom</strong><br>
                  ${SITE.address}
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon">📞</div>
                <div>
                  <strong>Phone / WhatsApp</strong><br>
                  <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
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
  if (window.KenneCart) window.KenneCart.updateCartBadge();
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

// Keep the cart badge (desktop + mobile) in sync whenever the cart changes anywhere on the site.
window.addEventListener('kenne:cart-updated', () => {
  if (window.KenneCart) window.KenneCart.updateCartBadge();
});
