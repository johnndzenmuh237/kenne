/* ============================================================
   KENNE CARGO — TRACKING JAVASCRIPT
   tracking.js
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   MOCK DATA — Replace with your real API calls
   ---------------------------------------------------------- */
const MOCK_SHIPMENTS = {
  'SC-2024-001847': {
    id: 'SC-2024-001847',
    status: 'in-transit',
    statusLabel: 'In Transit',
    service: 'Ocean Freight',
    origin: { city: 'Shanghai', country: 'China', code: 'SHA' },
    destination: { city: 'Los Angeles', country: 'USA', code: 'LAX' },
    shipper: 'Acme Electronics Ltd.',
    consignee: 'Pacific Traders Inc.',
    weight: '2,450 kg',
    volume: '12.5 CBM',
    containers: '1 × 20ft',
    estimatedDelivery: 'December 28, 2024',
    lastUpdate: 'December 18, 2024, 14:32 UTC',
    events: [
      { status: 'done',    icon: '✓', date: 'Dec 10, 2024 — 09:15', event: 'Shipment Booked',          location: 'Shanghai, China',         active: false },
      { status: 'done',    icon: '✓', date: 'Dec 12, 2024 — 11:45', event: 'Cargo Received at Terminal', location: 'Port of Shanghai, China', active: false },
      { status: 'done',    icon: '✓', date: 'Dec 14, 2024 — 08:00', event: 'Vessel Departed',           location: 'Port of Shanghai, China', active: false },
      { status: 'active',  icon: '▸', date: 'Dec 18, 2024 — 14:32', event: 'In Transit — Pacific Ocean', location: 'Pacific Ocean',          active: true  },
      { status: 'pending', icon: '○', date: 'Est. Dec 22, 2024',    event: 'Arrival at Port',           location: 'Port of Los Angeles, USA', active: false },
      { status: 'pending', icon: '○', date: 'Est. Dec 24, 2024',    event: 'Customs Clearance',         location: 'Los Angeles, USA',        active: false },
      { status: 'pending', icon: '○', date: 'Est. Dec 28, 2024',    event: 'Delivered',                 location: 'Los Angeles, USA',        active: false },
    ],
  },
  'SC-2024-003291': {
    id: 'SC-2024-003291',
    status: 'delivered',
    statusLabel: 'Delivered',
    service: 'Air Freight',
    origin: { city: 'Dubai', country: 'UAE', code: 'DXB' },
    destination: { city: 'Frankfurt', country: 'Germany', code: 'FRA' },
    shipper: 'Gulf Logistics Co.',
    consignee: 'Euro Commerce GmbH',
    weight: '380 kg',
    volume: '2.1 CBM',
    containers: '—',
    estimatedDelivery: 'December 15, 2024',
    lastUpdate: 'December 15, 2024, 11:20 UTC',
    events: [
      { status: 'done', icon: '✓', date: 'Dec 13, 2024 — 07:00', event: 'Shipment Picked Up',          location: 'Dubai, UAE', active: false },
      { status: 'done', icon: '✓', date: 'Dec 13, 2024 — 14:30', event: 'Departed DXB',                location: 'Dubai International Airport', active: false },
      { status: 'done', icon: '✓', date: 'Dec 14, 2024 — 06:15', event: 'Arrived FRA',                 location: 'Frankfurt Airport, Germany', active: false },
      { status: 'done', icon: '✓', date: 'Dec 14, 2024 — 10:00', event: 'Customs Cleared',             location: 'Frankfurt, Germany', active: false },
      { status: 'done', icon: '✓', date: 'Dec 15, 2024 — 11:20', event: 'Delivered to Recipient',      location: 'Frankfurt, Germany', active: false },
    ],
  },
  'SC-2024-007712': {
    id: 'SC-2024-007712',
    status: 'pending',
    statusLabel: 'Awaiting Pickup',
    service: 'Road Transport',
    origin: { city: 'Chicago', country: 'USA', code: 'ORD' },
    destination: { city: 'New York', country: 'USA', code: 'NYC' },
    shipper: 'Midwest Supplies LLC',
    consignee: 'NYC Distribution Corp',
    weight: '1,800 kg',
    volume: '8.4 CBM',
    containers: '1 × LTL',
    estimatedDelivery: 'December 22, 2024',
    lastUpdate: 'December 17, 2024, 09:00 UTC',
    events: [
      { status: 'done',    icon: '✓', date: 'Dec 17, 2024 — 09:00', event: 'Booking Confirmed',       location: 'Chicago, IL, USA', active: false },
      { status: 'active',  icon: '▸', date: 'Est. Dec 19, 2024',    event: 'Awaiting Pickup',          location: 'Chicago, IL, USA', active: true  },
      { status: 'pending', icon: '○', date: 'Est. Dec 20, 2024',    event: 'In Transit',               location: 'En Route, USA', active: false },
      { status: 'pending', icon: '○', date: 'Est. Dec 22, 2024',    event: 'Delivered',                location: 'New York, NY, USA', active: false },
    ],
  },
};

/* ----------------------------------------------------------
   RENDER TRACKING RESULT
   ---------------------------------------------------------- */
function renderTrackingResult(shipment) {
  const container = document.getElementById('tracking-result-container');
  if (!container) return;

  const statusClass = {
    'in-transit': 'status--in-transit',
    'delivered':  'status--delivered',
    'pending':    'status--pending',
  }[shipment.status] || 'status--pending';

  const timeline = shipment.events.map(ev => `
    <div class="timeline-step">
      <div class="timeline-dot timeline-dot--${ev.status}">${ev.icon}</div>
      <div class="timeline-content">
        <div class="timeline-date">${ev.date}</div>
        <div class="timeline-event">${ev.event}</div>
        <div class="timeline-location">📍 ${ev.location}</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="tracking-result reveal">
      <div class="tracking-result-header">
        <div>
          <div style="font-size:var(--text-xs);color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px;">Tracking Number</div>
          <div class="tracking-id">${shipment.id}</div>
        </div>
        <div class="tracking-status-badge ${statusClass}">${shipment.statusLabel}</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-8);padding:var(--space-8);">

        <!-- Route Info -->
        <div>
          <h4 style="font-size:var(--text-sm);font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-gray);margin-bottom:var(--space-5);">Route Information</h4>
          <div style="display:flex;gap:var(--space-4);align-items:center;margin-bottom:var(--space-6);">
            <div style="text-align:center;">
              <div style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:900;color:var(--color-navy);">${shipment.origin.code}</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-light);">${shipment.origin.city}</div>
              <div style="font-size:var(--text-xs);color:var(--color-gray);">${shipment.origin.country}</div>
            </div>
            <div style="flex:1;height:2px;background:linear-gradient(90deg,var(--color-accent),var(--color-sky));position:relative;border-radius:2px;">
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:var(--color-white);padding:2px 8px;border-radius:var(--radius-full);border:1px solid var(--color-light-gray);font-size:10px;font-weight:700;color:var(--color-text-light);white-space:nowrap;">${shipment.service}</div>
            </div>
            <div style="text-align:center;">
              <div style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:900;color:var(--color-navy);">${shipment.destination.code}</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-light);">${shipment.destination.city}</div>
              <div style="font-size:var(--text-xs);color:var(--color-gray);">${shipment.destination.country}</div>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            ${[
              ['Shipper', shipment.shipper],
              ['Consignee', shipment.consignee],
              ['Weight', shipment.weight],
              ['Volume', shipment.volume],
              ['Container', shipment.containers],
              ['Est. Delivery', shipment.estimatedDelivery],
            ].map(([k,v]) => `
              <div>
                <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--color-gray);margin-bottom:2px;">${k}</div>
                <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-text);">${v}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Timeline -->
        <div>
          <h4 style="font-size:var(--text-sm);font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--color-gray);margin-bottom:var(--space-5);">Shipment Timeline</h4>
          <div class="tracking-timeline" style="padding:0;">
            ${timeline}
          </div>
        </div>

      </div>

      <div style="padding:var(--space-5) var(--space-8);background:var(--color-off-white);border-top:var(--border-light);font-size:var(--text-xs);color:var(--color-gray);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-3);">
        <span>Last updated: ${shipment.lastUpdate}</span>
        <button onclick="window.print()" class="btn btn--outline btn--sm">🖨 Print Details</button>
      </div>
    </div>
  `;

  container.querySelector('.tracking-result')?.classList.add('revealed');
}

function renderNoResult(id) {
  const container = document.getElementById('tracking-result-container');
  if (!container) return;
  container.innerHTML = `
    <div class="alert alert--warning" style="border-radius:var(--radius-lg);padding:var(--space-8);text-align:center;flex-direction:column;gap:var(--space-4);">
      <div style="font-size:2rem;">🔍</div>
      <div>
        <strong style="display:block;font-size:var(--text-lg);margin-bottom:var(--space-2);">Shipment Not Found</strong>
        No records found for tracking ID <strong>${id}</strong>. 
        Please double-check the number or 
        <a href="contact.html" style="color:var(--color-accent);font-weight:600;">contact our support team</a>.
      </div>
    </div>
  `;
}

/* ----------------------------------------------------------
   TRACKING FORM HANDLER
   ---------------------------------------------------------- */
function initTrackingForm() {
  const form = document.getElementById('main-tracking-form');
  if (!form) return;

  // Pre-fill from URL query string
  const urlId = new URLSearchParams(window.location.search).get('id');
  if (urlId) {
    const input = form.querySelector('input[name="tracking_id"]');
    if (input) {
      input.value = urlId;
      lookupShipment(urlId);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[name="tracking_id"]');
    const val   = input?.value.trim();
    if (val) lookupShipment(val);
  });
}

function lookupShipment(id) {
  const container = document.getElementById('tracking-result-container');
  if (!container) return;

  // Show loading state
  container.innerHTML = `
    <div style="text-align:center;padding:var(--space-12);">
      <div style="display:inline-block;width:40px;height:40px;border:3px solid var(--color-light-gray);border-top-color:var(--color-accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
      <p style="margin-top:var(--space-4);color:var(--color-text-light);">Looking up shipment…</p>
    </div>
  `;

  // Simulate network delay
  setTimeout(() => {
    const shipment = MOCK_SHIPMENTS[id.toUpperCase()];
    if (shipment) {
      renderTrackingResult(shipment);
    } else {
      renderNoResult(id);
    }
  }, 900);
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initTrackingForm();
});