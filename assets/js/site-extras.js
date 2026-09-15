/* ============================================================
   KENNE — COMPLIANCE, ANALYTICS & CONVERSION HELPERS
   assets/js/site-extras.js
   ------------------------------------------------------------
   1. Cookie consent banner (analytics only loads after consent)
   2. Google Analytics wiring + conversion event tracking
   3. Sticky mobile contact/CTA bar
   4. Skip-to-content accessibility link

   HONEST NOTE ON ANALYTICS: set GA_MEASUREMENT_ID below to your
   real GA4 ID to switch tracking on. Until you do, no analytics
   script loads and no events are sent — the code does not pretend
   to track anything. Google Search Console is verified separately
   via a DNS record or an HTML file you upload; it cannot be
   enabled from this file.
   ============================================================ */
(function (global) {
  'use strict';

  // ⬇️ Replace with your real GA4 ID (e.g. 'G-XXXXXXXXXX') to enable analytics.
  const GA_MEASUREMENT_ID = '';

  const CONSENT_KEY = 'kenne_cookie_consent';

  function getConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
  }

  /* ---------- 1. ANALYTICS (only after consent) ---------- */
  function loadAnalytics() {
    if (!GA_MEASUREMENT_ID) {
      console.info('[KENNE] Analytics not configured — set GA_MEASUREMENT_ID in assets/js/site-extras.js to enable.');
      return;
    }
    if (document.getElementById('ga-script')) return;
    const s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    global.dataLayer = global.dataLayer || [];
    global.gtag = function () { global.dataLayer.push(arguments); };
    global.gtag('js', new Date());
    // anonymize_ip keeps visitor IPs out of the analytics record
    global.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  // Safe to call anywhere; silently does nothing if analytics is off/declined.
  function trackEvent(name, params) {
    if (typeof global.gtag !== 'function') return;
    global.gtag('event', name, params || {});
  }

  function initConversionTracking() {
    document.addEventListener('click', (e) => {
      const tel = e.target.closest('a[href^="tel:"]');
      if (tel) trackEvent('phone_click', { phone: tel.getAttribute('href').replace('tel:', '') });

      const mail = e.target.closest('a[href^="mailto:"]');
      if (mail) trackEvent('email_click', {});

      const wa = e.target.closest('a[href*="wa.me"]');
      if (wa) trackEvent('whatsapp_click', {});

      const cta = e.target.closest('.btn--primary');
      if (cta) trackEvent('cta_click', { label: (cta.textContent || '').trim().slice(0, 60) });
    });

    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (!form || form.tagName !== 'FORM') return;
      const id = form.id || 'unnamed_form';
      if (id === 'review-form') trackEvent('review_submit', {});
      else if (id === 'quote-form') trackEvent('quote_request', {});
      else if (id === 'checkout-form') trackEvent('purchase_submit', {});
      else if (id === 'register-form') trackEvent('shipment_registered', {});
      else trackEvent('form_submit', { form_id: id });
    }, true);
  }

  /* ---------- 2. COOKIE CONSENT BANNER ---------- */
  function initCookieBanner() {
    const existing = getConsent();
    if (existing === 'accepted') { loadAnalytics(); return; }
    if (existing === 'declined') return;

    const bar = document.createElement('div');
    bar.className = 'cookie-banner';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML = `
      <div class="cookie-banner-inner">
        <p>
          We use your browser's local storage to keep your cart and quotes working, and — only if you agree —
          analytics to improve the site. Read our <a href="/cookies-policy.html">Cookies Policy</a>.
        </p>
        <div class="cookie-banner-actions">
          <button type="button" class="btn btn--outline-white btn--sm" id="cookie-decline">Decline</button>
          <button type="button" class="btn btn--primary btn--sm" id="cookie-accept">Accept</button>
        </div>
      </div>`;
    document.body.appendChild(bar);
    requestAnimationFrame(() => bar.classList.add('show'));

    document.getElementById('cookie-accept').addEventListener('click', () => {
      setConsent('accepted'); loadAnalytics(); bar.remove();
    });
    document.getElementById('cookie-decline').addEventListener('click', () => {
      setConsent('declined'); bar.remove();
    });
  }

  /* ---------- 3. STICKY MOBILE CTA ---------- */
  function initStickyMobileCta() {
    if (document.querySelector('.sticky-mobile-cta')) return;
    const phone = '+237670735947';
    const wa = '237670735947';
    const bar = document.createElement('div');
    bar.className = 'sticky-mobile-cta';
    bar.innerHTML = `
      <a href="tel:${phone}" aria-label="Call KENNE"><span aria-hidden="true">📞</span> Call</a>
      <a href="https://wa.me/${wa}" target="_blank" rel="noopener" aria-label="Chat with KENNE on WhatsApp"><span aria-hidden="true">💬</span> WhatsApp</a>
      <a href="mailto:info@kennegroup.com" aria-label="Email KENNE"><span aria-hidden="true">✉️</span> Email</a>`;
    document.body.appendChild(bar);
  }

  /* ---------- 4. SKIP LINK (accessibility) ---------- */
  function initSkipLink() {
    if (document.querySelector('.skip-link')) return;
    const a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#main-content';
    a.textContent = 'Skip to main content';
    document.body.insertBefore(a, document.body.firstChild);

    // Give the first real section an id/landmark if the page doesn't have one.
    if (!document.getElementById('main-content')) {
      const first = document.querySelector('section');
      if (first) { first.id = 'main-content'; first.setAttribute('role', 'main'); first.setAttribute('tabindex', '-1'); }
    }
  }

  function init() {
    initSkipLink();
    initStickyMobileCta();
    initCookieBanner();
    initConversionTracking();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  global.KenneAnalytics = { trackEvent, getConsent };
})(window);
