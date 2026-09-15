/* ============================================================
   KENNE CARGO — ANIMATED COUNTERS
   counters.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   COUNT-UP ANIMATION
   Usage: <span class="counter" data-target="5000" data-suffix="+">0</span>
   Options:
     data-target   — final number
     data-suffix   — text after number (e.g. "+", "%", "K")
     data-prefix   — text before number (e.g. "$")
     data-duration — animation duration in ms (default 2000)
     data-decimals — number of decimal places (default 0)
   ---------------------------------------------------------- */

function animateCounter(el) {
  const target   = parseFloat(el.dataset.target) || 0;
  const suffix   = el.dataset.suffix   || '';
  const prefix   = el.dataset.prefix   || '';
  const duration = parseInt(el.dataset.duration) || 2000;
  const decimals = parseInt(el.dataset.decimals) || 0;
  const start    = 0;
  const startTime = performance.now();

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutQuart(progress);
    const current  = start + (target - start) * eased;

    el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = prefix + target.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    }
  }

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

/* ----------------------------------------------------------
   PROGRESS BARS (data-width="75")
   ---------------------------------------------------------- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  if (!bars.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width || '0';
        entry.target.style.width = width + '%';
        entry.target.classList.add('animated');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => io.observe(bar));
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initProgressBars();
});