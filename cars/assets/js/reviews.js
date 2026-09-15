/* ============================================================
   KENNE — CUSTOMER REVIEW SYSTEM
   assets/js/reviews.js
   ------------------------------------------------------------
   Real review collection with moderation. NOTHING is pre-seeded:
   if no one has reviewed yet, the site honestly says so. Reviews
   never appear publicly until an admin approves them.

   HONEST LIMITATION: reviews are stored in this browser's
   localStorage, so a review submitted on one device won't appear
   on another. A real shared review system needs a backend
   database. Spam prevention here is a honeypot + rate limit +
   basic validation, which stops casual bots but is not a
   substitute for server-side verification (e.g. reCAPTCHA).
   ============================================================ */
(function (global) {
  'use strict';

  const KEY = 'kenne_reviews';
  const LAST_SUBMIT_KEY = 'kenne_review_last_submit';
  const RATE_LIMIT_MS = 60 * 1000; // one review per minute per browser

  function readAll() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function writeAll(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }

  function getApproved(division) {
    return readAll()
      .filter(r => r.status === 'approved' && (!division || r.division === division))
      .sort((a, b) => (b.featured - a.featured) || (b.createdAt - a.createdAt));
  }
  function getPending() { return readAll().filter(r => r.status === 'pending'); }
  function getAll() { return readAll(); }

  function averageRating(division) {
    const approved = getApproved(division);
    if (approved.length === 0) return null;
    const sum = approved.reduce((s, r) => s + r.rating, 0);
    return { avg: (sum / approved.length), count: approved.length };
  }

  function validate(data) {
    const errors = {};
    if (!data.name || data.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
    if (data.name && data.name.length > 60) errors.name = 'Name is too long (max 60 characters).';
    if (!data.rating || data.rating < 1 || data.rating > 5) errors.rating = 'Please select a star rating.';
    if (!data.comment || data.comment.trim().length < 10) errors.comment = 'Please write at least 10 characters.';
    if (data.comment && data.comment.length > 1000) errors.comment = 'Review is too long (max 1000 characters).';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email address, or leave it blank.';
    return errors;
  }

  // Basic XSS-safe escaping for anything rendered back to the page.
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function submit(data) {
    // Spam check 1: honeypot field must stay empty
    if (data.website) return { ok: false, errors: { _spam: 'Submission rejected.' } };

    // Spam check 2: rate limit per browser
    const last = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      return { ok: false, errors: { _spam: 'You just submitted a review. Please wait a moment before submitting another.' } };
    }

    const errors = validate(data);
    if (Object.keys(errors).length) return { ok: false, errors };

    const review = {
      id: 'REV' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: data.name.trim(),
      email: (data.email || '').trim(),
      rating: Number(data.rating),
      comment: data.comment.trim(),
      photo: data.photo || '',
      division: data.division || 'group',
      status: 'pending',      // never public until approved
      featured: false,
      createdAt: Date.now(),
    };
    const list = readAll();
    list.unshift(review);
    writeAll(list);
    localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));

    if (global.KenneNotifications) {
      global.KenneNotifications.push({
        icon: '⭐',
        title: 'New review awaiting moderation',
        message: `${review.name} left a ${review.rating}-star review. Approve or reject it in the review admin.`,
      });
    }
    return { ok: true, review };
  }

  function setStatus(id, status) {
    const list = readAll();
    const r = list.find(x => x.id === id);
    if (r) { r.status = status; writeAll(list); }
    return r;
  }
  function toggleFeatured(id) {
    const list = readAll();
    const r = list.find(x => x.id === id);
    if (r) { r.featured = !r.featured; writeAll(list); }
    return r;
  }
  function remove(id) {
    writeAll(readAll().filter(x => x.id !== id));
  }
  function edit(id, changes) {
    const list = readAll();
    const r = list.find(x => x.id === id);
    if (r) { Object.assign(r, changes); writeAll(list); }
    return r;
  }

  function starsHtml(rating) {
    let out = '';
    for (let i = 1; i <= 5; i++) out += i <= rating ? '★' : '☆';
    return out;
  }

  /* ----------------------------------------------------------
     PUBLIC RENDERING
     ---------------------------------------------------------- */
  function renderPublicSection(hostId, division) {
    const host = document.getElementById(hostId);
    if (!host) return;
    const approved = getApproved(division);
    const stats = averageRating(division);

    const header = stats
      ? `<div style="display:flex;align-items:center;gap:var(--space-4);justify-content:center;margin-bottom:var(--space-6);flex-wrap:wrap;">
           <div style="font-family:var(--font-display);font-size:var(--text-4xl);font-weight:900;color:var(--color-navy);">${stats.avg.toFixed(1)}</div>
           <div>
             <div style="color:var(--color-accent);font-size:1.2rem;letter-spacing:2px;">${starsHtml(Math.round(stats.avg))}</div>
             <div style="font-size:var(--text-sm);color:var(--color-text-light);">Based on ${stats.count} verified review${stats.count !== 1 ? 's' : ''}</div>
           </div>
         </div>`
      : '';

    const list = approved.length
      ? `<div class="grid grid-3 stagger-children">
           ${approved.map(r => `
             <div class="card" style="padding:var(--space-6);">
               <div style="color:var(--color-accent);letter-spacing:2px;margin-bottom:var(--space-3);">${starsHtml(r.rating)}</div>
               <p style="font-size:var(--text-sm);color:var(--color-text);line-height:1.7;margin-bottom:var(--space-4);">${escapeHtml(r.comment)}</p>
               <div style="display:flex;align-items:center;gap:10px;">
                 <div style="width:36px;height:36px;border-radius:50%;background:var(--color-navy);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;">${escapeHtml(r.name.charAt(0).toUpperCase())}</div>
                 <div>
                   <div style="font-weight:700;font-size:var(--text-sm);color:var(--color-navy);">${escapeHtml(r.name)}</div>
                   <div style="font-size:11px;color:var(--color-gray);">${new Date(r.createdAt).toLocaleDateString()}</div>
                 </div>
                 ${r.featured ? '<span style="margin-left:auto;font-size:10px;font-weight:800;color:var(--color-accent-dark);text-transform:uppercase;">★ Featured</span>' : ''}
               </div>
             </div>`).join('')}
         </div>`
      : `<div class="card" style="padding:var(--space-10);text-align:center;">
           <div style="font-size:2.2rem;margin-bottom:var(--space-3);">⭐</div>
           <p style="color:var(--color-text-light);margin-bottom:var(--space-5);">No reviews yet — be the first to leave one.</p>
         </div>`;

    host.innerHTML = header + list +
      `<div class="text-center mt-8"><button class="btn btn--primary btn--lg" onclick="KenneReviews.openForm('${division || 'group'}')">✍️ Write a Review</button></div>
       <div id="review-form-host"></div>`;
  }

  function openForm(division) {
    const host = document.getElementById('review-form-host');
    if (!host) return;
    host.innerHTML = `
      <div class="card" style="padding:var(--space-8);max-width:560px;margin:var(--space-8) auto 0;">
        <h3 style="margin-bottom:var(--space-2);">Write a Review</h3>
        <p style="font-size:var(--text-sm);color:var(--color-text-light);margin-bottom:var(--space-5);">
          Your review will be checked by our team before it appears publicly.
        </p>
        <form id="review-form" novalidate>
          <div class="form-group" style="margin-bottom:var(--space-4);">
            <label class="form-label" for="rv-name">Your Name *</label>
            <input type="text" id="rv-name" class="form-control" required aria-describedby="err-name">
            <p id="err-name" class="rv-error" role="alert" style="color:#b91c1c;font-size:12px;margin-top:4px;"></p>
          </div>
          <div class="form-group" style="margin-bottom:var(--space-4);">
            <label class="form-label" id="rating-label">Your Rating *</label>
            <div id="rv-stars" role="radiogroup" aria-labelledby="rating-label" style="display:flex;gap:6px;font-size:1.8rem;cursor:pointer;">
              ${[1,2,3,4,5].map(i => `<span role="radio" aria-checked="false" aria-label="${i} star${i>1?'s':''}" tabindex="0" data-star="${i}" style="color:var(--color-border);">★</span>`).join('')}
            </div>
            <input type="hidden" id="rv-rating" value="">
            <p id="err-rating" class="rv-error" role="alert" style="color:#b91c1c;font-size:12px;margin-top:4px;"></p>
          </div>
          <div class="form-group" style="margin-bottom:var(--space-4);">
            <label class="form-label" for="rv-comment">Your Review *</label>
            <textarea id="rv-comment" class="form-control" rows="4" required aria-describedby="err-comment"></textarea>
            <p id="err-comment" class="rv-error" role="alert" style="color:#b91c1c;font-size:12px;margin-top:4px;"></p>
          </div>
          <div class="form-group" style="margin-bottom:var(--space-5);">
            <label class="form-label" for="rv-email">Email (optional — never published)</label>
            <input type="email" id="rv-email" class="form-control" aria-describedby="err-email">
            <p id="err-email" class="rv-error" role="alert" style="color:#b91c1c;font-size:12px;margin-top:4px;"></p>
          </div>
          <!-- Honeypot: hidden from humans, bots tend to fill it -->
          <div style="position:absolute;left:-9999px;" aria-hidden="true">
            <label for="rv-website">Website</label>
            <input type="text" id="rv-website" tabindex="-1" autocomplete="off">
          </div>
          <p id="err-spam" role="alert" style="color:#b91c1c;font-size:13px;margin-bottom:var(--space-3);"></p>
          <button type="submit" class="btn btn--primary btn--full">Submit Review</button>
        </form>
        <div id="review-success" hidden style="text-align:center;padding:var(--space-6) 0;">
          <div style="font-size:2.4rem;margin-bottom:var(--space-3);">✅</div>
          <h4 style="color:#0a6e46;margin-bottom:var(--space-2);">Thank you for your review!</h4>
          <p style="font-size:var(--text-sm);color:var(--color-text-light);">
            It's been submitted for moderation and will appear once our team approves it.
          </p>
        </div>
      </div>`;

    // Star rating widget — mouse + keyboard accessible
    const starEls = host.querySelectorAll('#rv-stars [data-star]');
    function paint(val) {
      starEls.forEach(s => {
        const on = Number(s.dataset.star) <= val;
        s.style.color = on ? 'var(--color-accent)' : 'var(--color-border)';
        s.setAttribute('aria-checked', String(Number(s.dataset.star) === val));
      });
    }
    starEls.forEach(s => {
      const val = Number(s.dataset.star);
      s.addEventListener('click', () => { document.getElementById('rv-rating').value = val; paint(val); });
      s.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); document.getElementById('rv-rating').value = val; paint(val); }
      });
      s.addEventListener('mouseenter', () => paint(val));
    });
    host.querySelector('#rv-stars').addEventListener('mouseleave', () => paint(Number(document.getElementById('rv-rating').value || 0)));

    document.getElementById('review-form').addEventListener('submit', (e) => {
      e.preventDefault();
      host.querySelectorAll('.rv-error').forEach(el => el.textContent = '');
      document.getElementById('err-spam').textContent = '';

      const result = submit({
        name: document.getElementById('rv-name').value,
        email: document.getElementById('rv-email').value,
        rating: document.getElementById('rv-rating').value,
        comment: document.getElementById('rv-comment').value,
        website: document.getElementById('rv-website').value,
        division,
      });

      if (!result.ok) {
        for (const [field, msg] of Object.entries(result.errors)) {
          const el = document.getElementById('err-' + field.replace('_', ''));
          if (el) el.textContent = msg;
        }
        const firstErr = host.querySelector('.rv-error:not(:empty), #err-spam:not(:empty)');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      document.getElementById('review-form').hidden = true;
      document.getElementById('review-success').hidden = false;
    });

    host.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  global.KenneReviews = {
    getApproved, getPending, getAll, averageRating, submit, validate,
    setStatus, toggleFeatured, remove, edit, starsHtml, escapeHtml,
    renderPublicSection, openForm,
  };
})(window);
