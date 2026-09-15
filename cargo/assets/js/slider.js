/* ============================================================
   KENNE CARGO — SLIDER / CAROUSEL JAVASCRIPT
   slider.js   |  Lightweight, no-dependency carousel
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   USAGE
   HTML structure expected:
   <div class="slider" data-slider data-autoplay="4000" data-loop="true">
     <div class="slider-track">
       <div class="slider-slide">…</div>
       <div class="slider-slide">…</div>
     </div>
     <button class="slider-btn slider-btn--prev" data-prev>‹</button>
     <button class="slider-btn slider-btn--next" data-next>›</button>
     <div class="slider-dots" data-dots></div>
   </div>

   Options (data attributes on [data-slider]):
     data-autoplay="4000"  — autoplay interval in ms (0 = off)
     data-loop="true"      — loop infinitely
     data-per-view="1"     — visible slides (use 1 for full-width)
   ---------------------------------------------------------- */

class Slider {
  constructor(el) {
    this.el         = el;
    this.track      = el.querySelector('.slider-track');
    this.slides     = Array.from(el.querySelectorAll('.slider-slide'));
    this.dotsEl     = el.querySelector('[data-dots]');
    this.prevBtn    = el.querySelector('[data-prev]');
    this.nextBtn    = el.querySelector('[data-next]');
    this.autoplay   = parseInt(el.dataset.autoplay) || 0;
    this.loop       = el.dataset.loop !== 'false';
    this.perView    = parseInt(el.dataset.perView) || 1;
    this.current    = 0;
    this.total      = this.slides.length;
    this.timer      = null;
    this.startX     = 0;
    this.isDragging = false;

    if (!this.total || !this.track) return;

    this.init();
  }

  init() {
    this.buildDots();
    this.update(0);
    this.bindEvents();
    if (this.autoplay > 0) this.startAutoplay();
  }

  buildDots() {
    if (!this.dotsEl) return;
    this.dotsEl.innerHTML = '';
    this.slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className    = 'slider-dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsEl.appendChild(dot);
    });
  }

  goTo(index) {
    if (!this.loop) {
      if (index < 0)           index = 0;
      if (index >= this.total) index = this.total - 1;
    } else {
      if (index < 0)           index = this.total - 1;
      if (index >= this.total) index = 0;
    }

    this.current = index;
    this.update(index);
  }

  update(index) {
    const offset = -(index * (100 / this.perView));
    this.track.style.transform = `translateX(${offset}%)`;

    // Update active slide
    this.slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.setAttribute('aria-hidden', String(i !== index));
    });

    // Update dots
    if (this.dotsEl) {
      this.dotsEl.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
    }

    // Update buttons
    if (!this.loop) {
      if (this.prevBtn) this.prevBtn.disabled = index === 0;
      if (this.nextBtn) this.nextBtn.disabled = index === this.total - 1;
    }
  }

  prev() { this.goTo(this.current - 1); }
  next() { this.goTo(this.current + 1); }

  startAutoplay() {
    this.timer = setInterval(() => this.next(), this.autoplay);
  }

  stopAutoplay() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }

  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => { this.stopAutoplay(); this.prev(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => { this.stopAutoplay(); this.next(); });

    // Keyboard
    this.el.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { this.stopAutoplay(); this.prev(); }
      if (e.key === 'ArrowRight') { this.stopAutoplay(); this.next(); }
    });

    // Touch / drag
    this.el.addEventListener('touchstart', (e) => {
      this.startX = e.touches[0].clientX;
      this.isDragging = true;
    }, { passive: true });

    this.el.addEventListener('touchend', (e) => {
      if (!this.isDragging) return;
      const dx = e.changedTouches[0].clientX - this.startX;
      if (Math.abs(dx) > 40) {
        this.stopAutoplay();
        dx < 0 ? this.next() : this.prev();
      }
      this.isDragging = false;
    });

    // Mouse drag
    this.el.addEventListener('mousedown', (e) => {
      this.startX = e.clientX;
      this.isDragging = true;
    });
    window.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.startX;
      if (Math.abs(dx) > 60) {
        this.stopAutoplay();
        dx < 0 ? this.next() : this.prev();
      }
      this.isDragging = false;
    });

    // Pause on hover
    this.el.addEventListener('mouseenter', () => this.stopAutoplay());
    this.el.addEventListener('mouseleave', () => {
      if (this.autoplay > 0) this.startAutoplay();
    });

    // Focus
    this.el.addEventListener('focusin', () => this.stopAutoplay());
  }
}

/* ----------------------------------------------------------
   INIT ALL SLIDERS
   ---------------------------------------------------------- */
function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(el => {
    el._slider = new Slider(el);
  });
}

/* ----------------------------------------------------------
   SLIDER DEFAULT STYLES (injected to avoid separate CSS)
   ---------------------------------------------------------- */
function injectSliderStyles() {
  if (document.getElementById('slider-styles')) return;
  const style = document.createElement('style');
  style.id = 'slider-styles';
  style.textContent = `
    .slider { position: relative; overflow: hidden; }
    .slider-track {
      display: flex;
      transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: transform;
    }
    .slider-slide {
      flex-shrink: 0;
      width: 100%;
      user-select: none;
    }
    .slider-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: 44px; height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      font-size: 1.4rem;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      backdrop-filter: blur(8px);
    }
    .slider-btn:hover:not(:disabled) {
      background: var(--color-accent, #E8931A);
      border-color: transparent;
    }
    .slider-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .slider-btn--prev { left: 1rem; }
    .slider-btn--next { right: 1rem; }
    .slider-dots {
      position: absolute;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex; gap: 6px;
      z-index: 10;
    }
    .slider-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: rgba(255,255,255,0.4);
      border: none; cursor: pointer;
      transition: all 0.25s;
      padding: 0;
    }
    .slider-dot.active {
      background: var(--color-accent, #E8931A);
      width: 24px;
      border-radius: 4px;
    }
  `;
  document.head.appendChild(style);
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  injectSliderStyles();
  initSliders();
});