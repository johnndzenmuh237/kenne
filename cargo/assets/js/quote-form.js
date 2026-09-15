/* ============================================================
   KENNE CARGO — QUOTE REQUEST FORM JAVASCRIPT
   quote-form.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   MULTI-STEP FORM
   ---------------------------------------------------------- */
let currentStep = 1;
const TOTAL_STEPS = 4;

function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  updateStepDisplay();

  // Next button
  form.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        goToStep(currentStep + 1);
      }
    });
  });

  // Back button
  form.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      submitQuoteForm(form);
    }
  });

  // Service type toggles (show/hide fields)
  const serviceSelect = form.querySelector('[name="service_type"]');
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => toggleServiceFields(serviceSelect.value));
  }

  // Cargo type weight helper
  const cargoInput = form.querySelector('[name="cargo_weight"]');
  if (cargoInput) {
    cargoInput.addEventListener('input', updateVolumeWeight);
  }
}

function goToStep(step) {
  if (step < 1 || step > TOTAL_STEPS) return;
  currentStep = step;
  updateStepDisplay();
  window.scrollTo({ top: document.getElementById('quote-form').getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
}

function updateStepDisplay() {
  // Hide all panels
  document.querySelectorAll('[data-step-panel]').forEach(panel => {
    panel.classList.add('hidden');
  });

  // Show current
  const current = document.querySelector(`[data-step-panel="${currentStep}"]`);
  if (current) current.classList.remove('hidden');

  // Update step indicators
  document.querySelectorAll('[data-step-indicator]').forEach(ind => {
    const n = parseInt(ind.dataset.stepIndicator);
    ind.classList.remove('active', 'done');
    if (n === currentStep) ind.classList.add('active');
    if (n < currentStep)  ind.classList.add('done');
  });

  // Update progress bar
  const bar = document.getElementById('quote-progress-bar');
  if (bar) bar.style.width = `${(currentStep / TOTAL_STEPS) * 100}%`;

  // Update step counter text
  const counter = document.getElementById('step-counter');
  if (counter) counter.textContent = `Step ${currentStep} of ${TOTAL_STEPS}`;
}

function validateStep(step) {
  const panel = document.querySelector(`[data-step-panel="${step}"]`);
  if (!panel) return true;

  const required = panel.querySelectorAll('[required]');
  let valid = true;

  required.forEach(field => {
    clearError(field);
    if (!field.value.trim()) {
      showError(field, 'This field is required');
      valid = false;
    } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      showError(field, 'Please enter a valid email address');
      valid = false;
    } else if (field.type === 'tel' && field.value.trim().length < 7) {
      showError(field, 'Please enter a valid phone number');
      valid = false;
    }
  });

  return valid;
}

function showError(field, message) {
  field.style.borderColor = 'var(--color-danger)';
  field.style.boxShadow   = '0 0 0 3px rgba(232,64,64,0.1)';

  const existing = field.nextElementSibling;
  if (existing && existing.classList.contains('field-error')) return;

  const err = document.createElement('div');
  err.className = 'field-error';
  err.style.cssText = 'color:var(--color-danger);font-size:.75rem;margin-top:.25rem;';
  err.textContent = message;
  field.insertAdjacentElement('afterend', err);
}

function clearError(field) {
  field.style.borderColor = '';
  field.style.boxShadow   = '';
  const err = field.nextElementSibling;
  if (err && err.classList.contains('field-error')) err.remove();
}

function toggleServiceFields(serviceType) {
  const oceanFields = document.querySelectorAll('[data-service="ocean"]');
  const airFields   = document.querySelectorAll('[data-service="air"]');
  const roadFields  = document.querySelectorAll('[data-service="road"]');

  [oceanFields, airFields, roadFields].forEach(set => {
    set.forEach(el => {
      el.closest('.form-group')?.classList.add('hidden');
    });
  });

  const show = serviceType === 'ocean' ? oceanFields :
               serviceType === 'air'   ? airFields   :
               serviceType === 'road'  ? roadFields  : [];

  show.forEach(el => el.closest('.form-group')?.classList.remove('hidden'));
}

function updateVolumeWeight() {
  // Placeholder for volumetric weight calculation
  const wInput  = document.querySelector('[name="cargo_weight"]');
  const lInput  = document.querySelector('[name="cargo_length"]');
  const wdInput = document.querySelector('[name="cargo_width"]');
  const hInput  = document.querySelector('[name="cargo_height"]');
  const volOut  = document.getElementById('volumetric-weight');

  if (!lInput || !wdInput || !hInput || !volOut) return;

  const l = parseFloat(lInput.value) || 0;
  const w = parseFloat(wdInput.value) || 0;
  const h = parseFloat(hInput.value) || 0;

  if (l && w && h) {
    const volWeight = (l * w * h) / 5000; // standard air freight divisor
    volOut.textContent = `Volumetric Weight: ${volWeight.toFixed(2)} kg`;
    volOut.style.display = 'block';
  }
}

function submitQuoteForm(form) {
  const submitBtn = form.querySelector('[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Submitting…';
  }

  // Gather form data
  const data = Object.fromEntries(new FormData(form));
  console.log('Quote Request Data:', data); // Replace with your API call

  // Simulate submission
  setTimeout(() => {
    showSuccessMessage();
  }, 1200);
}

function showSuccessMessage() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.innerHTML = `
    <div style="text-align:center;padding:var(--space-16) var(--space-8);">
      <div style="font-size:4rem;margin-bottom:var(--space-6);">✅</div>
      <h3 style="font-size:var(--text-2xl);font-weight:800;color:var(--color-navy);margin-bottom:var(--space-4);">Quote Request Received!</h3>
      <p style="color:var(--color-text-light);font-size:var(--text-md);line-height:1.7;max-width:500px;margin:0 auto var(--space-8);">
        Thank you! Our logistics team will review your request and send you a 
        personalized quote within <strong>2–4 business hours</strong>.
      </p>
      <div style="background:var(--color-off-white);border-radius:var(--radius-lg);padding:var(--space-5) var(--space-6);display:inline-block;margin-bottom:var(--space-8);">
        <div style="font-size:var(--text-xs);color:var(--color-gray);text-transform:uppercase;letter-spacing:.08em;margin-bottom:var(--space-2);">Reference Number</div>
        <div style="font-family:var(--font-mono, monospace);font-size:var(--text-lg);font-weight:700;color:var(--color-navy);">QR-${Date.now().toString().slice(-8)}</div>
      </div>
      <div>
        <a href="index.html" class="btn btn--primary btn--lg">Back to Home</a>
      </div>
    </div>
  `;
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initQuoteForm();
});