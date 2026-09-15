/* ============================================================
   KENNE CARGO — NOTIFICATION CENTER
   assets/js/notifications.js
   ------------------------------------------------------------
   Front-end notification system. When a shipment is registered
   (via the Quote / Ship With Us form, or the staff Register
   Shipment page), the system:
     1. Generates a tracking number (see quote-tracking-bridge.js)
     2. Logs an in-app notification (bell icon, all pages)
     3. Builds a ready-to-send client message (email + WhatsApp)
        containing the tracking number and tracking link

   NOTE: This is a front-end demo. There is no backend/database,
   so "sending" the notification opens a pre-filled email/WhatsApp
   message for staff to deliver, and logs it to the on-site
   notification bell. To auto-send real emails/SMS with no
   staff click, wire sendClientEmail() below to a service such
   as EmailJS, Formspree, Twilio, or your own API — see the
   comments inside sendClientEmail() for exactly where.
   ============================================================ */
(function (global) {
  'use strict';

  /* ----------------------------------------------------------
     EMAILJS CONFIG — fill these in to make client emails send
     automatically, with zero staff clicks.

     1. Create a free account at https://www.emailjs.com
     2. Add an Email Service (Gmail, Outlook, etc.) → copy its ID
     3. Create an Email Template with these variables in the body:
          {{to_email}}  {{to_name}}  {{tracking_number}}
          {{origin}}    {{destination}}  {{service}}
          {{tracking_url}}  {{message}}
        → copy the Template ID
     4. Copy your Public Key from Account → General
     5. Paste all three below and set ENABLED to true.

     Until this is configured, the site falls back to preparing a
     ready-to-send email (mailto:) / WhatsApp link for staff to
     send with one click — nothing breaks, it just isn't automatic.
     ---------------------------------------------------------- */
  const EMAILJS_CONFIG = {
    ENABLED: false,               // set to true once the 3 fields below are filled in
    SERVICE_ID: 'YOUR_SERVICE_ID',
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',
  };

  function emailjsReady() {
    return EMAILJS_CONFIG.ENABLED
      && typeof window.emailjs !== 'undefined'
      && EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
      && EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID'
      && EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
  }

  const STORE_KEY = 'kennecargo_notifications';
  const MAX_STORED = 60;

  function readAll() {
    try {
      const v = JSON.parse(localStorage.getItem(STORE_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }

  function writeAll(list) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, MAX_STORED))); }
    catch (e) { /* storage unavailable — fail silently */ }
  }

  function push(notif) {
    const list = readAll();
    list.unshift({
      id: 'N' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      read: false,
      timestamp: Date.now(),
      ...notif,
    });
    writeAll(list);
    renderBell();
    window.dispatchEvent(new CustomEvent('kenne:notification', { detail: notif }));
    return list[0];
  }

  function list() { return readAll(); }

  function markAllRead() {
    const list = readAll().map(n => ({ ...n, read: true }));
    writeAll(list);
    renderBell();
  }

  function clearAll() {
    writeAll([]);
    renderBell();
  }

  function timeAgo(ts) {
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
  }

  /* ----------------------------------------------------------
     BELL UI — injected wherever #notif-bell-btn exists (header)
     ---------------------------------------------------------- */
  function renderBell() {
    const badge = document.getElementById('notif-badge');
    const listEl = document.getElementById('notif-list');
    if (!badge || !listEl) return;

    const items = readAll();
    const unread = items.filter(n => !n.read).length;

    if (unread > 0) {
      badge.hidden = false;
      badge.textContent = unread > 9 ? '9+' : String(unread);
    } else {
      badge.hidden = true;
    }

    if (items.length === 0) {
      listEl.innerHTML = `<div class="notif-empty">No notifications yet. New shipment registrations will appear here.</div>`;
      return;
    }

    listEl.innerHTML = items.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}">
        <div class="notif-item-icon">${n.icon || '📦'}</div>
        <div class="notif-item-body">
          <div class="notif-item-title">${n.title}</div>
          <div class="notif-item-message">${n.message}</div>
          <div class="notif-item-time">${timeAgo(n.timestamp)}</div>
        </div>
      </div>
    `).join('');
  }

  function initBell() {
    const btn = document.getElementById('notif-bell-btn');
    const panel = document.getElementById('notif-panel');
    const clearBtn = document.getElementById('notif-clear-btn');
    if (!btn || !panel) return;

    renderBell();

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      btn.setAttribute('aria-expanded', String(isHidden));
      if (isHidden) markAllRead();
    });

    document.addEventListener('click', (e) => {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== btn) {
        panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearAll();
      });
    }

    window.addEventListener('kenne:notification', renderBell);
    window.addEventListener('storage', (e) => { if (e.key === STORE_KEY) renderBell(); });
  }

  /* ----------------------------------------------------------
     CLIENT NOTIFICATION — called when a shipment is registered
     ---------------------------------------------------------- */
  function buildClientMessage({ ref, clientName, origin, destination, service, itemDescription }) {
    const trackUrl = `${location.origin}${location.pathname.replace(/[^/]+$/, '')}tracking.html?id=${ref}`;
    const subject = `Your Kenne Cargo tracking number: ${ref}`;
    const body =
`Hello ${clientName || 'there'},

Your shipment has been registered with Kenne Cargo.

Tracking Number: ${ref}
Route: ${origin || 'China'} → ${destination || 'Cameroon'}
Service: ${service || 'Shipping'}
${itemDescription ? 'Item(s): ' + itemDescription + '\n' : ''}
Track your shipment any time at:
${trackUrl}

Fast. Safe. Reliable. Let us handle it — you relax!

— Kenne Cargo Team`;
    return { subject, body, trackUrl };
  }

  function notifyClient(details) {
    const { ref, clientName, clientEmail, clientPhone } = details;
    const msg = buildClientMessage(details);

    const mailto = clientEmail
      ? `mailto:${encodeURIComponent(clientEmail)}?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(msg.body)}`
      : null;

    const waPhone = clientPhone ? clientPhone.replace(/[^\d]/g, '') : null;
    const whatsapp = waPhone
      ? `https://wa.me/${waPhone}?text=${encodeURIComponent(msg.body)}`
      : null;

    const result = { ...msg, mailto, whatsapp, autoSent: false, sending: emailjsReady() };

    if (emailjsReady()) {
      // Real automatic send — no staff click required.
      sendClientEmail(details, msg).then((ok) => {
        result.autoSent = ok;
        push({
          icon: ok ? '✅' : '⚠️',
          title: ok ? `Email auto-sent — ${ref}` : `Email send failed — ${ref}`,
          message: ok
            ? `Tracking number and details were automatically emailed to ${clientEmail}.`
            : `Automatic email to ${clientEmail} failed — use the manual send link instead.`,
          ref,
        });
        window.dispatchEvent(new CustomEvent('kenne:notify-sent', { detail: { ref, ok } }));
      });
      push({
        icon: '📤',
        title: `Shipment registered — ${ref}`,
        message: `Tracking number generated. Sending automatic email to ${clientEmail || 'client'}…`,
        ref,
      });
    } else {
      // No email provider configured yet — log it and hand staff a
      // one-click link instead so nothing is ever silently lost.
      push({
        icon: '✅',
        title: `Shipment registered — ${ref}`,
        message: `Tracking number generated. Notification ready to send to ${clientName || 'client'}${clientEmail ? ' (' + clientEmail + ')' : ''}.`,
        ref,
      });
    }

    return result;
  }

  function sendClientEmail(details, msg) {
    if (!emailjsReady()) {
      console.info('[Kenne Cargo] EmailJS not configured — email prepared but not auto-sent:', details.clientEmail, msg.subject);
      return Promise.resolve(false);
    }
    try {
      window.emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    } catch (e) { /* already initialized */ }

    return window.emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
      to_email: details.clientEmail,
      to_name: details.clientName || 'Customer',
      tracking_number: details.ref,
      origin: details.origin || 'China',
      destination: details.destination || 'Cameroon',
      service: details.service || 'Shipping',
      tracking_url: msg.trackUrl,
      message: msg.body,
    }).then(() => true).catch((err) => {
      console.error('[Kenne Cargo] EmailJS send failed:', err);
      return false;
    });
  }

  global.KenneNotifications = {
    push, list, markAllRead, clearAll, initBell, renderBell,
    notifyClient, buildClientMessage, emailjsReady,
  };
})(window);
