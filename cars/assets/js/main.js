/* ============================================================
   KENNE SMART TECHNOLOGY — MAIN JAVASCRIPT
   main.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   INJECT SHARED HEADER & FOOTER
   ---------------------------------------------------------- */
const SITE = {
  name: 'Kenne Smart Technology',
  tagline: 'Phones • Electronics • Accessories',
  phone: '+237 670 735 947',
  phoneHref: '+237670735947',
  whatsapp: '237670735947',
  email: 'tech@kennegroup.com',
  address: 'Douala, Cameroon',
  hours: 'Mon–Sat: 8am–6pm',
};

/* Chip/circuit "K" mark, in the navy/electric-blue Smart Tech palette */
const KENNE_LOGO_SVG = `
  <svg class="logo-icon" width="42" height="42" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="44" height="44" rx="10" fill="var(--color-navy)"/>
    <rect x="14" y="14" width="16" height="16" rx="3" stroke="var(--color-accent)" stroke-width="1.4" opacity="0.6"/>
    <path d="M22 8v4M22 32v4M8 22h4M32 22h4M12 12l2.5 2.5M31.5 31.5L34 34M34 12l-2.5 2.5M12 34l2.5-2.5" stroke="var(--color-accent)" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
    <path d="M15 30V16h3.2v5.9L23.4 16h4l-5.6 6.6 5.9 7.4h-4.2l-4.2-5.7-1.5 1.7V30H15z" fill="white"/>
  </svg>`;

/* ----------------------------------------------------------
   REAL ICON SET — plain inline SVG (no emoji, no external image
   requests). Reused across the ticker, top bar, header and
   footer so every "icon" on the site renders identically on
   every device and platform. Each icon carries its own
   width/height so it drops straight into any inline span.
   ---------------------------------------------------------- */
function icon(path, size) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:${size}px;height:${size}px;vertical-align:-${Math.round(size * 0.2)}px;flex:none;">${path}</svg>`;
}

const ICONS = {
  smartphone: (s = 16) => icon(`<rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/>`, s),
  plug:       (s = 16) => icon(`<path d="M9 2v6M15 2v6M6 8h12l-1 5a5 5 0 01-10 0L6 8z"/><path d="M12 19v3"/>`, s),
  checkCircle:(s = 16) => icon(`<circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/>`, s),
  box:        (s = 16) => icon(`<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`, s),
  creditCard: (s = 16) => icon(`<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>`, s),
  receipt:    (s = 16) => icon(`<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>`, s),
  pin:        (s = 16) => icon(`<path d="M12 22s7-7.58 7-13a7 7 0 10-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/>`, s),
  phone:      (s = 16) => icon(`<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>`, s),
  mail:       (s = 16) => icon(`<path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`, s),
  clock:      (s = 16) => icon(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`, s),
  star:       (s = 16) => icon(`<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`, s),
  cart:       (s = 18) => icon(`<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>`, s),
  bell:       (s = 20) => icon(`<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>`, s),
};

/* Header ticker — real icons instead of emoji */
const TICKER_ITEMS = [
  { icon: ICONS.smartphone(15), text: 'Latest Phones — iPhone, Samsung, Tecno, Infinix & More' },
  { icon: ICONS.plug(15), text: 'Genuine Chargers, Earbuds & Accessories' },
  { icon: ICONS.checkCircle(15), text: 'Every Phone Tested & Verified Before Sale' },
  { icon: ICONS.box(15), text: 'Sourced Direct from China, Sold in Cameroon' },
  { icon: ICONS.creditCard(15), text: 'Pay Now or Pay on Delivery — Your Choice' },
  { icon: ICONS.receipt(15), text: 'Every Order Gets an Instant Order Number' },
  { icon: ICONS.pin(15), text: 'Douala, Cameroon' },
  { icon: ICONS.phone(15), text: `${SITE.phone}` },
  { icon: ICONS.mail(15), text: SITE.email },
  { icon: ICONS.star(15), text: 'Kenne Smart Technology — Stay Connected' },
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
            <span aria-hidden="true">${ICONS.pin(16)}</span>
            <span>${SITE.address}</span>
          </div>
          <div class="top-bar-item">
            ${ICONS.phone(16)}
            <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
          </div>
          <div class="top-bar-item top-bar-item--email">
            ${ICONS.mail(16)}
            <a href="mailto:${SITE.email}">${SITE.email}</a>
          </div>
        </div>
        <div class="top-bar-right">
          <div class="top-bar-item">
            ${ICONS.clock(16)}
            <span>${SITE.hours}</span>
          </div>
          <div class="top-bar-item">
            <a href="../index.html" style="color:var(--color-accent);font-weight:600;">🔀 Kenne Group ›</a>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header header--transparent" id="site-header">
      <div class="header-ticker" aria-label="Kenne Smart Technology highlights">
        ${buildTickerTrack()}
      </div>
      <div class="container">
        <div class="header-inner">
          <a href="index.html" class="header-logo">
            ${KENNE_LOGO_SVG}
            <div class="logo-text">
              <strong>KENNE <span style="color:var(--color-accent);">TECH</span></strong>
              <span>Phones • Electronics • Accessories</span>
            </div>
          </a>

          <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
            <ul class="nav-list">
              <li class="nav-item">
                <a href="index.html" class="nav-link ${isActive('index.html')}">Home</a>
              </li>
              <li class="nav-item">
                <a href="shop.html" class="nav-link ${isActive('shop.html')}">
                  Shop Phones
                  <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </a>
                <div class="nav-dropdown">
                  <a href="shop.html?brand=Apple">${ICONS.smartphone(15)} Apple / iPhone</a>
                  <a href="shop.html?brand=Samsung">${ICONS.smartphone(15)} Samsung</a>
                  <a href="shop.html"><span>→</span> View All Phones</a>
                </div>
              </li>
              <li class="nav-item">
                <a href="accessories.html" class="nav-link ${isActive('accessories.html')}">Accessories</a>
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
              <a href="shop.html" class="btn btn--primary btn--full">Shop Phones</a>
              <a href="cart.html" class="btn btn--outline-white btn--full" style="position:relative;display:flex;align-items:center;justify-content:center;gap:8px;">
                ${ICONS.cart(18)} View Cart
                <span data-cart-badge class="notif-badge" style="position:static;margin-left:2px;display:inline-flex;align-items:center;justify-content:center;" hidden>0</span>
              </a>
            </div>
          </nav>

          <div class="header-cta">
            <div class="notif-wrap" id="notif-wrap">
              <button class="notif-bell" id="notif-bell-btn" aria-label="Notifications" aria-expanded="false">
                ${ICONS.bell(20)}
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
            <a href="cart.html" class="btn btn--outline-white btn--sm" style="position:relative;display:inline-flex;align-items:center;gap:6px;" aria-label="View cart">
              ${ICONS.cart(16)} Cart
              <span id="cart-badge" data-cart-badge class="notif-badge" style="position:static;margin-left:2px;display:inline-flex;align-items:center;justify-content:center;" hidden>0</span>
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
          <div class="logo-text"><strong>KENNE <span style="color:var(--color-accent);">TECH</span></strong></div>
        </a>
        <button class="drawer-close" id="drawer-close" aria-label="Close menu">✕</button>
      </div>
      <div class="drawer-search">
        <input type="search" id="drawer-search-input" placeholder="Search phones, accessories...">
      </div>
      <nav class="drawer-nav">
        <div class="drawer-section-title">Main</div>
        <a href="index.html" class="drawer-link">Home</a>
        <a href="about.html" class="drawer-link">About</a>
        <a href="contact.html" class="drawer-link">Contact</a>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Phones <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="shop.html">All Phones</a>
            <a href="shop.html?brand=Apple">Apple / iPhone</a>
            <a href="shop.html?brand=Samsung">Samsung</a>
          </div>
        </div>

        <div class="drawer-group">
          <button class="drawer-group-toggle">Accessories <span class="chevron">▾</span></button>
          <div class="drawer-submenu">
            <a href="accessories.html">All Accessories</a>
            <a href="accessories.html">Chargers &amp; Power Banks</a>
            <a href="accessories.html">Earbuds &amp; Speakers</a>
          </div>
        </div>

        <div class="drawer-section-title">Customer</div>
        <a href="cart.html" class="drawer-link" style="display:flex;align-items:center;justify-content:space-between;">
          <span style="display:flex;align-items:center;gap:8px;">${ICONS.cart(18)} My Cart</span>
          <span data-cart-badge class="notif-badge" style="position:static;" hidden>0</span>
        </a>
        <a href="contact.html" class="drawer-link">Contact Support</a>

        <div class="drawer-section-title">Business</div>
        <a href="../index.html" class="drawer-link">🔀 Kenne Group</a>
      </nav>
      <div class="drawer-cta">
        <a href="shop.html" class="btn btn--primary btn--full">Shop Phones</a>
        <a href="cart.html" class="btn btn--outline-white btn--full">View Cart</a>
      </div>
    </aside>
  `;

  // Activate header scroll behavior
  initHeader();
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
                <strong>KENNE <span style="color:var(--color-accent);">TECH</span></strong>
                <span>Phones • Electronics • Accessories</span>
              </div>
            </a>
            <p class="footer-about">
              Genuine phones and electronics, sourced from China and sold across Cameroon —
              every device tested before it reaches you.
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
              <a href="shop.html?brand=Apple">Apple / iPhone</a>
              <a href="shop.html?brand=Samsung">Samsung</a>
              <a href="shop.html">All Phones</a>
              <a href="accessories.html">Accessories</a>
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
              <a href="../cars/index.html">Kenne Car Business</a>
            </nav>
          </div>

          <!-- Contact + Newsletter -->
          <div class="footer-col">
            <h4 class="footer-col-title">Get in Touch</h4>
            <div class="footer-contact">
              <div class="footer-contact-item">
                <div class="footer-contact-icon" style="display:flex;align-items:center;justify-content:center;">${ICONS.pin(20)}</div>
                <div>
                  <strong>Shop</strong><br>
                  ${SITE.address}
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon" style="display:flex;align-items:center;justify-content:center;">${ICONS.phone(20)}</div>
                <div>
                  <strong>Phone / WhatsApp</strong><br>
                  <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
                </div>
              </div>
              <div class="footer-contact-item">
                <div class="footer-contact-icon" style="display:flex;align-items:center;justify-content:center;">${ICONS.mail(20)}</div>
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
   HERO BACKGROUND
   ------------------------------------------------------------
   The Smart Tech homepage uses a CSS gradient + inline SVG
   graphic instead of a stock photo (see index.html), so this
   intentionally does not fetch/swap in an external image
   anymore. Kept as a safe no-op so any page still calling it
   doesn't break.
   ---------------------------------------------------------- */
function initHeroBackground() {
  return;
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

// Keep every cart badge (desktop header + mobile drawer + mobile CTA) in sync
// whenever the cart changes anywhere on the site.
window.addEventListener('kenne:cart-updated', () => {
  if (window.KenneCart) window.KenneCart.updateCartBadge();
});
