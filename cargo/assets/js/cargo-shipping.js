/* ============================================================
   KENNE CARGO — SHIPPING ENGINE
   assets/js/cargo-shipping.js
   ------------------------------------------------------------
   Configurable shipping rates, quote calculator, prohibited
   goods list, and the 10-stage shipment tracking system.

   HONEST LIMITATION: this is a front-end demo. Rates, quotes,
   and shipment records are stored in the browser's localStorage
   (per-device, per-browser) rather than a shared server database.
   Owners can edit rates from the Shipping Rates admin page and
   they'll apply immediately for that browser — but a colleague
   on a different computer won't see the change. Making this a
   true multi-user shared system requires a real backend/database,
   which this environment can't provide (see chat for details).
   ============================================================ */
(function (global) {
  'use strict';

  const RATES_KEY = 'kennecargo_shipping_rates';
  const PROHIBITED_KEY = 'kennecargo_prohibited_goods';
  const QUOTES_KEY = 'kennecargo_quotes';
  const SHIPMENTS_KEY = 'kennecargo_shipments';

  /* ----------------------------------------------------------
     DEFAULT RATES — matches the initial KENNE Cargo pricing.
     Owners can override every value from Cargo → Shipping Rates;
     overrides are merged on top of these defaults.
     ---------------------------------------------------------- */
  const DEFAULT_RATES = {
    currency: 'CFA',
    air: {
      brackets: [
        { minKg: 1,     maxKg: 10,    pricePerKg: 10000 },
        { minKg: 10.01, maxKg: 20,    pricePerKg: 9500 },
        { minKg: 20.01, maxKg: null,  pricePerKg: 9000 },
      ],
      minBillableKg: 4,
      durationText: '5 – 10 days',
      shipOutText: 'Goods are shipped out approximately 1 – 3 days after reception at the KENNE warehouse in China.',
    },
    sea: {
      // Each CBM tier has its own weight-based price table.
      tiers: [
        {
          minCbm: 0.1, maxCbm: 5,
          weightBrackets: [
            { maxKg: 300, price: 310000 },
            { maxKg: 500, price: 330000 },
            { maxKg: 700, price: 360000 },
            { maxKg: 900, price: 380000 },
            { maxKg: null, price: 430000 },
          ],
        },
        {
          minCbm: 5.1, maxCbm: 10,
          weightBrackets: [
            { maxKg: 300, price: 300000 },
            { maxKg: 500, price: 320000 },
            { maxKg: 700, price: 340000 },
            { maxKg: 900, price: 360000 },
            { maxKg: null, price: 410000 },
          ],
        },
        {
          minCbm: 10.1, maxCbm: 15,
          weightBrackets: [
            { maxKg: 300, price: 290000 },
            { maxKg: 500, price: 300000 },
            { maxKg: 700, price: 320000 },
            { maxKg: 900, price: 340000 },
            { maxKg: null, price: 390000 },
          ],
        },
        {
          minCbm: 15.1, maxCbm: null,
          weightBrackets: [
            { maxKg: 300, price: 285000 },
            { maxKg: 500, price: 290000 },
            { maxKg: 700, price: 300000 },
            { maxKg: 900, price: 320000 },
            { maxKg: null, price: 370000 },
          ],
        },
      ],
      minBillableCbm: 0.1,
      durationText: '10 – 15 days',
      shipOutText: 'Estimated ship-out timeframe after reception at the KENNE warehouse: 10 – 15 days.',
    },
    sensitiveGoods: {
      label: 'Sensitive Goods',
      pricePerCbm: 360000,
      note: 'Applies to goods classified as sensitive by KENNE Cargo. Contact us before shipping to confirm classification.',
    },
    machinery: {
      label: 'Mechanical / Industrial / Agricultural Machines',
      minCbm: 0.5,
      maxCbm: 2,
      pricePerCbm: 360000,
    },
  };

  const DEFAULT_PROHIBITED_GOODS = [
    { category: 'Electronics & Tech', items: ['Drones', 'E-cigarettes'] },
    { category: 'Dangerous / Regulated', items: ['Dangerous goods', 'Gambling products', 'Medical devices', 'Medicines'] },
    { category: 'Building Materials', items: ['Aluminum structures', 'Steel structures', 'Corrugated steel sheets'] },
    { category: 'Beauty & Consumables', items: ['Cosmetics', 'Perfume', 'Beverages', 'Alcohol'] },
    { category: 'Vehicles', items: ['Motorcycles', 'Vehicles'] },
  ];

  /* ----------------------------------------------------------
     STORAGE HELPERS
     ---------------------------------------------------------- */
  function deepMerge(base, override) {
    if (Array.isArray(base)) return override !== undefined ? override : base;
    if (typeof base !== 'object' || base === null) return override !== undefined ? override : base;
    const out = { ...base };
    if (override && typeof override === 'object') {
      for (const k of Object.keys(override)) out[k] = deepMerge(base[k], override[k]);
    }
    return out;
  }

  function getRates() {
    try {
      const stored = JSON.parse(localStorage.getItem(RATES_KEY));
      return stored ? deepMerge(DEFAULT_RATES, stored) : DEFAULT_RATES;
    } catch (e) { return DEFAULT_RATES; }
  }
  function saveRates(rates) {
    try { localStorage.setItem(RATES_KEY, JSON.stringify(rates)); return true; } catch (e) { return false; }
  }
  function resetRates() {
    try { localStorage.removeItem(RATES_KEY); return true; } catch (e) { return false; }
  }

  function getProhibitedGoods() {
    try {
      const stored = JSON.parse(localStorage.getItem(PROHIBITED_KEY));
      return Array.isArray(stored) ? stored : DEFAULT_PROHIBITED_GOODS;
    } catch (e) { return DEFAULT_PROHIBITED_GOODS; }
  }
  function saveProhibitedGoods(list) {
    try { localStorage.setItem(PROHIBITED_KEY, JSON.stringify(list)); return true; } catch (e) { return false; }
  }

  /* ----------------------------------------------------------
     QUOTE CALCULATION
     ---------------------------------------------------------- */
  function calculateAirQuote(weightKg) {
    const rates = getRates().air;
    const billable = Math.max(weightKg, rates.minBillableKg);
    const bracket = rates.brackets.find(b => billable >= b.minKg && (b.maxKg === null || billable <= b.maxKg))
      || rates.brackets[rates.brackets.length - 1];
    const total = billable * bracket.pricePerKg;
    return {
      method: 'air',
      enteredWeight: weightKg,
      billableWeight: billable,
      wasRoundedUp: billable > weightKg,
      minBillableKg: rates.minBillableKg,
      pricePerKg: bracket.pricePerKg,
      total,
      currency: getRates().currency,
      durationText: rates.durationText,
      shipOutText: rates.shipOutText,
    };
  }

  function calculateSeaQuote(cbm, weightKg) {
    const rates = getRates().sea;
    const billableCbm = Math.max(cbm, rates.minBillableCbm);
    const tier = rates.tiers.find(t => billableCbm >= t.minCbm && (t.maxCbm === null || billableCbm <= t.maxCbm))
      || rates.tiers[rates.tiers.length - 1];
    const wBracket = tier.weightBrackets.find(b => b.maxKg === null || weightKg <= b.maxKg)
      || tier.weightBrackets[tier.weightBrackets.length - 1];
    return {
      method: 'sea',
      enteredCbm: cbm,
      billableCbm,
      wasRoundedUp: billableCbm > cbm,
      minBillableCbm: rates.minBillableCbm,
      weightKg,
      tierLabel: `${tier.minCbm} – ${tier.maxCbm ?? '+'} CBM`,
      total: wBracket.price,
      currency: getRates().currency,
      durationText: rates.durationText,
      shipOutText: rates.shipOutText,
    };
  }

  function formatMoney(n) {
    return getRates().currency + ' ' + Math.round(n).toLocaleString('en-US');
  }

  /* ----------------------------------------------------------
     QUOTE RECORDS
     ---------------------------------------------------------- */
  function generateQuoteNumber() {
    const year = new Date().getFullYear();
    const num = String(Math.floor(1 + Math.random() * 999999)).padStart(6, '0');
    return `KENNE-CGO-QUOTE-${year}-${num}`;
  }

  function saveQuoteRecord(record) {
    const quotes = JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]');
    quotes.unshift(record);
    try { localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes)); } catch (e) {}
    return record;
  }

  function loadQuoteRecord(quoteNumber) {
    const quotes = JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]');
    return quotes.find(q => q.quoteNumber === quoteNumber) || null;
  }

  function listQuotes() {
    return JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]');
  }

  /* ----------------------------------------------------------
     SHIPMENT TRACKING — 10-stage system
     ---------------------------------------------------------- */
  const STAGES = [
    { id: 'registered',      label: 'Shipment Registered',              short: 'Registered' },
    { id: 'warehouse',       label: 'Goods Received at China Warehouse', short: 'At Warehouse' },
    { id: 'left_warehouse',  label: 'Goods Departed China Warehouse',    short: 'Left Warehouse' },
    { id: 'airport_seaport', label: 'Arrived at Airport/Seaport',        short: 'At Airport/Seaport' },
    { id: 'loaded',          label: 'Loaded for Cameroon',               short: 'Loaded' },
    { id: 'departed',        label: 'Departed for Cameroon',             short: 'Departed' },
    { id: 'in_transit',      label: 'In Transit to Cameroon',            short: 'In Transit' },
    { id: 'arrived_douala',  label: 'Arrived in Douala, Cameroon',       short: 'Arrived Douala' },
    { id: 'ready_collection',label: 'Ready for Collection',              short: 'Ready for Collection' },
    { id: 'collected',       label: 'Shipment Collected / Completed',    short: 'Collected' },
  ];

  function generateTrackingNumber() {
    const year = new Date().getFullYear();
    const num = String(Math.floor(1 + Math.random() * 999999)).padStart(6, '0');
    return `KENNE-CGO-${year}-${num}`;
  }

  function registerShipment(details) {
    const trackingNumber = generateTrackingNumber();
    const now = Date.now();
    const shipment = {
      trackingNumber,
      customer: details.customer,       // {name, email, phone, whatsapp}
      goods: details.goods,             // {description, category, quantity, weight, cbm, packages, declaredValue, supplier, warehouseRef, notes}
      shipping: details.shipping,       // {method, origin, destination, destinationCity, cost, currency, estimatedDuration}
      quoteNumber: details.quoteNumber || null,
      paymentStatus: details.paymentStatus || 'Pending',
      currentStageIndex: 0,
      history: [
        { stageId: 'registered', date: now, updatedBy: details.updatedBy || 'Staff', notes: 'Shipment registered with KENNE Cargo.', notified: false },
      ],
      createdAt: now,
    };
    const shipments = JSON.parse(localStorage.getItem(SHIPMENTS_KEY) || '[]');
    shipments.unshift(shipment);
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    return shipment;
  }

  function loadShipment(trackingNumber) {
    const shipments = JSON.parse(localStorage.getItem(SHIPMENTS_KEY) || '[]');
    return shipments.find(s => s.trackingNumber === trackingNumber) || null;
  }

  function listShipments() {
    return JSON.parse(localStorage.getItem(SHIPMENTS_KEY) || '[]');
  }

  function advanceStage(trackingNumber, stageId, extra) {
    const shipments = JSON.parse(localStorage.getItem(SHIPMENTS_KEY) || '[]');
    const shipment = shipments.find(s => s.trackingNumber === trackingNumber);
    if (!shipment) return null;
    const idx = STAGES.findIndex(s => s.id === stageId);
    if (idx === -1) return null;
    shipment.currentStageIndex = idx;
    shipment.history.push({
      stageId,
      date: Date.now(),
      updatedBy: (extra && extra.updatedBy) || 'Staff',
      notes: (extra && extra.notes) || '',
      location: (extra && extra.location) || '',
      notified: false,
      ...extra,
    });
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    return shipment;
  }

  function markStageNotified(trackingNumber, stageId) {
    const shipments = JSON.parse(localStorage.getItem(SHIPMENTS_KEY) || '[]');
    const shipment = shipments.find(s => s.trackingNumber === trackingNumber);
    if (!shipment) return null;
    const entry = [...shipment.history].reverse().find(h => h.stageId === stageId);
    if (entry) entry.notified = true;
    localStorage.setItem(SHIPMENTS_KEY, JSON.stringify(shipments));
    return shipment;
  }

  global.KenneCargoShipping = {
    DEFAULT_RATES, DEFAULT_PROHIBITED_GOODS, STAGES,
    getRates, saveRates, resetRates,
    getProhibitedGoods, saveProhibitedGoods,
    calculateAirQuote, calculateSeaQuote, formatMoney,
    generateQuoteNumber, saveQuoteRecord, loadQuoteRecord, listQuotes,
    generateTrackingNumber, registerShipment, loadShipment, listShipments,
    advanceStage, markStageNotified,
  };
})(window);
