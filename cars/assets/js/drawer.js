/* ============================================================
   KENNE — MOBILE DRAWER CONTROLLER
   assets/js/drawer.js
   Generic slide-in drawer behavior, reused by every KENNE site.
   Each site provides its own drawer HTML content (built in
   main.js's buildDrawerContent()); this file only wires up the
   open/close/accordion/search interactions.
   ============================================================ */
(function () {
  'use strict';

  function initDrawer() {
    const toggle = document.getElementById('nav-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close');
    if (!toggle || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-locked');
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-locked');
    }

    toggle.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDrawer(); });

    // Accordion groups (KENNE SMART TECHNOLOGY / KENNE CARGO / KENNE CARS submenus)
    drawer.querySelectorAll('.drawer-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.drawer-group');
        const wasOpen = group.classList.contains('open');
        drawer.querySelectorAll('.drawer-group.open').forEach(g => { if (g !== group) g.classList.remove('open'); });
        group.classList.toggle('open', !wasOpen);
      });
    });

    // Simple in-drawer search: filters visible links by text match
    const searchInput = document.getElementById('drawer-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        const allLinks = drawer.querySelectorAll('.drawer-link, .drawer-submenu a');
        if (!q) {
          allLinks.forEach(a => { a.style.display = ''; });
          drawer.querySelectorAll('.drawer-section, .drawer-group').forEach(s => { s.style.display = ''; });
          return;
        }
        allLinks.forEach(a => {
          a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
        // Auto-expand groups that have a visible match, hide sections with none
        drawer.querySelectorAll('.drawer-group').forEach(group => {
          const hasMatch = [...group.querySelectorAll('.drawer-submenu a')].some(a => a.style.display !== 'none');
          group.classList.toggle('open', hasMatch);
          group.style.display = hasMatch ? '' : 'none';
        });
        drawer.querySelectorAll('.drawer-section').forEach(section => {
          const hasMatch = [...section.querySelectorAll('.drawer-link')].some(a => a.style.display !== 'none');
          section.style.display = hasMatch ? '' : 'none';
        });
      });
    }

    // Close drawer automatically when a link is tapped (better UX than staying open)
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeDrawer());
    });
  }

  window.addEventListener('kenne:header-ready', initDrawer);
})();
