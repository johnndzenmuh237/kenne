/* ============================================================
   KENNE CARGO — QUOTE ⇄ TRACKING BRIDGE (real-time engine)
   ------------------------------------------------------------
   - Geocodes origin/destination (OpenStreetMap Nominatim)
   - Builds a real route (OSRM road routing for trucks, a curved
     shipping-lane path for ocean/air/other modes)
   - Progress is driven by REAL elapsed wall-clock time compared
     against the estimated transit duration — not a fake looping
     animation. Reloading the page or checking a week later still
     shows the correct position.
   - Playback (play/pause) is stored with the shipment record in
     localStorage, so pausing on the "Get a Quote" page is
     reflected on the Tracking page (and vice-versa) for anyone
     checking that reference in the same browser.
   NOTE: this is a front-end-only demo. Data lives in this
   browser's localStorage — it will not sync across different
   devices/browsers, since there is no backend/database.
============================================================ */
(function (global) {
  const PREFIX = 'kennecargo_quote_';
  const GEOCODE_CACHE_KEY = 'kennecargo_geocode_cache_v1';
  const REVGEO_MIN_INTERVAL_MS = 1100; // respect Nominatim's ~1 req/sec usage policy

  /* ---------------- small utils ---------------- */
  function nowMs() { return Date.now(); }

  function haversineKm(a, b) {
    const R = 6371, toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(b[0] - a[0]), dLng = toRad(b[1] - a[1]);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  function readJSON(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  function refKey(ref) { return PREFIX + String(ref).toUpperCase().trim(); }

  function generateReference() {
    const year = new Date().getFullYear();
    const num = Math.floor(100000 + Math.random() * 900000);
    return `KC-${year}-${num}`;
  }

  /* ---------------- fallback country centroids (used only if geocoding fails) ---------------- */
  const COUNTRY_FALLBACK = {
    'china': [35.86, 104.19], 'usa': [39.83, -98.58], 'united states': [39.83, -98.58],
    'germany': [51.16, 10.45], 'uae': [23.42, 53.85], 'united arab emirates': [23.42, 53.85],
    'india': [20.59, 78.96], 'united kingdom': [55.38, -3.44], 'uk': [55.38, -3.44],
    'france': [46.23, 2.21], 'japan': [36.20, 138.25], 'brazil': [-14.24, -51.93],
    'south africa': [-30.56, 22.94], 'australia': [-25.27, 133.78], 'canada': [56.13, -106.35],
    'netherlands': [52.13, 5.29], 'singapore': [1.35, 103.82], 'mexico': [23.63, -102.55],
    'italy': [41.87, 12.57], 'spain': [40.46, -3.75], 'south korea': [35.91, 127.77],
    'cameroon': [7.37, 12.35], 'nigeria': [9.08, 8.68], 'kenya': [-0.02, 37.91],
    'egypt': [26.82, 30.80], 'turkey': [38.96, 35.24],
  };
  function fallbackCoord(country) {
    const key = (country || '').toLowerCase().trim();
    return COUNTRY_FALLBACK[key] || [20, 10]; // mid-Atlantic-ish default, better than nothing
  }

  /* ---------------- forward geocoding (Nominatim) ---------------- */
  async function geocodeCity(city, country) {
    const cache = readJSON(GEOCODE_CACHE_KEY, {});
    const key = `${city || ''},${country || ''}`.toLowerCase().trim();
    if (cache[key]) return cache[key];
    try {
      const q = encodeURIComponent(`${city || ''}, ${country || ''}`.trim());
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`, {
        headers: { 'Accept-Language': 'en' },
      });
      const json = await res.json();
      if (json && json[0]) {
        const coords = [parseFloat(json[0].lat), parseFloat(json[0].lon)];
        cache[key] = coords;
        writeJSON(GEOCODE_CACHE_KEY, cache);
        return coords;
      }
    } catch (e) { /* network/geocoding unavailable — fall through */ }
    return fallbackCoord(country);
  }

  /* ---------------- reverse geocoding (throttled + cached) ---------------- */
  const revGeoMemCache = {};
  let lastRevGeoCallAt = 0;
  async function reverseGeocode(lat, lng) {
    const key = lat.toFixed(2) + ',' + lng.toFixed(2);
    if (revGeoMemCache[key]) return revGeoMemCache[key];
    const wait = REVGEO_MIN_INTERVAL_MS - (nowMs() - lastRevGeoCallAt);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastRevGeoCallAt = nowMs();
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=8`, {
        headers: { 'Accept-Language': 'en' },
      });
      const json = await res.json();
      const addr = json.address || {};
      const place = addr.city || addr.town || addr.village || addr.municipality || addr.county || addr.state;
      const water = addr.sea || addr.ocean || addr.bay || addr.strait;
      let label;
      if (place) label = addr.country ? `${place}, ${addr.country}` : place;
      else if (water) label = water;
      else label = 'Open Water — En Route';
      revGeoMemCache[key] = label;
      return label;
    } catch (e) {
      return null; // caller keeps previous label
    }
  }

  /* ---------------- route building ---------------- */
  function curvedLanePath(origin, dest, bulgeFactor) {
    const n = 10;
    const pts = [];
    const dx = dest[1] - origin[1], dy = dest[0] - origin[0];
    const perpLat = -dx, perpLng = dy;
    const norm = Math.sqrt(perpLat * perpLat + perpLng * perpLng) || 1;
    const distDeg = Math.sqrt(dx * dx + dy * dy);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const lat = origin[0] + dy * t;
      const lng = origin[1] + dx * t;
      const arc = Math.sin(t * Math.PI) * bulgeFactor * distDeg;
      pts.push([lat + (perpLat / norm) * arc, lng + (perpLng / norm) * arc]);
    }
    return pts;
  }

  async function computeRoute(origin, dest, serviceType) {
    const straightKm = haversineKm(origin, dest);
    if (serviceType === 'road') {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origin[1]},${origin[0]};${dest[1]},${dest[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.routes && json.routes[0]) {
          const waypoints = json.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);
          return { waypoints, distanceKm: json.routes[0].distance / 1000 };
        }
      } catch (e) { /* OSRM unavailable — fall back to a curved path below */ }
      return { waypoints: curvedLanePath(origin, dest, 0.04), distanceKm: straightKm };
    }
    if (serviceType === 'air') {
      return { waypoints: curvedLanePath(origin, dest, 0.06), distanceKm: straightKm };
    }
    // ocean / warehouse / supply-chain / multimodal — wider shipping-lane style curve
    return { waypoints: curvedLanePath(origin, dest, 0.16), distanceKm: straightKm };
  }

  function estimateTransitDays(serviceType, distanceKm, readyDate, deliveryDate) {
    if (readyDate && deliveryDate) {
      const diff = (new Date(deliveryDate) - new Date(readyDate)) / 86400000;
      if (diff > 0.5) return Math.max(1, Math.round(diff));
    }
    switch (serviceType) {
      case 'air': return Math.max(1, Math.round(1 + distanceKm / 6000));
      case 'road': return Math.max(1, Math.round(distanceKm / 550));
      case 'ocean': return Math.max(4, Math.round(3 + distanceKm / 750));
      case 'warehouse': return 0;
      case 'supply-chain': return Math.max(6, Math.round(4 + distanceKm / 700));
      case 'multimodal': return Math.max(4, Math.round(2 + distanceKm / 900));
      default: return Math.max(3, Math.round(distanceKm / 700));
    }
  }

  function pickVessel(serviceType) {
    const pools = {
      ocean: ['MV Kenne Pacific', 'MV Kenne Horizon', 'MV Douala Voyager', 'MV Cargo Guangzhou'],
      air: ['Cargo Charter A330', 'Cargo Charter B747F', 'Kenne Air Freighter 12'],
      road: ['Kenne Road Unit 118', 'Kenne Road Unit 212', 'Kenne Road Unit 344'],
      warehouse: ['Kenne Cargo Distribution Center'],
      'supply-chain': ['Kenne Chain Network Node'],
      multimodal: ['Kenne Link Multimodal Convoy'],
    };
    const list = pools[serviceType] || ['Kenne Cargo Shipment'];
    return list[Math.floor(Math.random() * list.length)];
  }

  /* ---------------- timeline templates ---------------- */
  const STEP_TEMPLATES = {
    ocean: [
      [0, 'Shipment Booked'], [0.04, 'Cargo Received at Origin Terminal'],
      [0.10, 'Vessel Departed Origin Port'], [0.5, 'In Transit — Ocean Crossing'],
      [0.85, 'Arrival at Destination Port'], [0.93, 'Customs Clearance'],
      [1, 'Delivered to Consignee'],
    ],
    air: [
      [0, 'Shipment Booked'], [0.08, 'Cargo Picked Up'], [0.18, 'Departed Origin Airport'],
      [0.55, 'In Transit — Flight'], [0.82, 'Arrived Destination Airport'],
      [0.92, 'Customs Cleared'], [1, 'Delivered to Consignee'],
    ],
    road: [
      [0, 'Booking Confirmed'], [0.05, 'Awaiting Pickup'], [0.15, 'Cargo Picked Up'],
      [0.5, 'In Transit'], [0.9, 'Arriving at Destination'], [1, 'Delivered'],
    ],
    'supply-chain': [
      [0, 'Order Booked'], [0.1, 'Cargo Consolidated'], [0.2, 'Departed Origin Hub'],
      [0.55, 'In Transit'], [0.85, 'Arrived Destination Hub'], [0.95, 'Final Mile Dispatch'],
      [1, 'Delivered'],
    ],
    multimodal: [
      [0, 'Shipment Booked'], [0.1, 'Departed Origin'], [0.35, 'Transferred — Leg 2'],
      [0.65, 'In Transit'], [0.88, 'Arrived Destination Region'], [1, 'Delivered'],
    ],
    warehouse: [
      [0, 'Cargo Received at Warehouse'], [1, 'In Storage — Available for Fulfillment'],
    ],
  };

  function buildEvents(quote, progress, currentLabel) {
    const steps = STEP_TEMPLATES[quote.service_type] || STEP_TEMPLATES.road;
    const originLabel = `${quote.origin_city || ''}, ${quote.origin_country || ''}`;
    const destLabel = `${quote.destination_city || ''}, ${quote.destination_country || ''}`;
    let activeAssigned = false;
    return steps.map(([frac, label], i) => {
      const isLast = i === steps.length - 1;
      let status;
      if (progress >= frac + 0.001 || (isLast && progress >= 1)) status = 'done';
      else if (!activeAssigned) { status = 'active'; activeAssigned = true; }
      else status = 'pending';
      const t = new Date(quote.submittedAt + frac * quote.transitDurationMs);
      let location = originLabel;
      if (frac >= 0.999) location = destLabel;
      else if (status === 'active' && currentLabel) location = currentLabel;
      else if (frac > 0.02 && status !== 'pending') location = 'En Route';
      return {
        status,
        date: status === 'pending'
          ? `Est. ${t.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`
          : t.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        event: label,
        location,
      };
    });
  }

  /* ---------------- path interpolation ---------------- */
  function getPathUpTo(waypoints, progress) {
    const n = waypoints.length - 1;
    if (n <= 0) return [waypoints[0]];
    const raw = Math.max(0, Math.min(1, progress)) * n;
    const seg = Math.min(Math.floor(raw), n - 1);
    const frac = raw - seg;
    const path = waypoints.slice(0, seg + 1);
    const a = waypoints[seg], b = waypoints[seg + 1];
    path.push([a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac]);
    return path;
  }
  function getPositionAtProgress(waypoints, progress) {
    return getPathUpTo(waypoints, progress).at(-1);
  }

  /* ---------------- create / read / control ---------------- */
  async function saveQuote(formData, ref) {
    const origin = await geocodeCity(formData.origin_city, formData.origin_country);
    const dest = await geocodeCity(formData.destination_city, formData.destination_country);
    const route = await computeRoute(origin, dest, formData.service_type);
    const transitDays = estimateTransitDays(formData.service_type, route.distanceKm, formData.ready_date, formData.delivery_date);
    const submittedAt = nowMs();
    const isStationary = formData.service_type === 'warehouse';

    const quote = {
      ...formData,
      ref,
      submittedAt,
      originCoords: origin,
      destCoords: dest,
      waypoints: route.waypoints,
      distanceKm: Math.round(route.distanceKm),
      transitDays,
      transitDurationMs: Math.max(transitDays, isStationary ? 1 : transitDays) * 86400000,
      vessel: pickVessel(formData.service_type),
      playback: {
        status: isStationary ? 'stored' : 'playing',
        segmentStart: submittedAt,
        accumulatedMs: isStationary ? 86400000 : 0,
      },
    };
    writeJSON(refKey(ref), quote);
    return quote;
  }

  function loadQuote(ref) {
    return readJSON(refKey(ref), null);
  }

  function setPlayback(ref, action) {
    const q = loadQuote(ref);
    if (!q) return null;
    const t = nowMs();
    if (action === 'pause' && q.playback.status === 'playing') {
      q.playback.accumulatedMs += t - q.playback.segmentStart;
      q.playback.segmentStart = t;
      q.playback.status = 'paused';
    } else if (action === 'play' && q.playback.status === 'paused') {
      q.playback.segmentStart = t;
      q.playback.status = 'playing';
    }
    writeJSON(refKey(ref), q);
    return q;
  }

  function computeProgress(quote) {
    if (!quote || !quote.playback) return 0;
    if (quote.playback.status === 'stored') return quote.transitDays === 0 ? 1 : 0;
    let elapsed = quote.playback.accumulatedMs;
    if (quote.playback.status === 'playing') elapsed += nowMs() - quote.playback.segmentStart;
    if (!quote.transitDurationMs) return 1;
    return Math.max(0, Math.min(1, elapsed / quote.transitDurationMs));
  }

  /* ---------------- public API ---------------- */
  global.QuoteTrackingBridge = {
    generateReference,
    saveQuote,
    loadQuote,
    setPlayback,
    computeProgress,
    getPositionAtProgress,
    getPathUpTo,
    buildEvents,
    reverseGeocode,
    haversineKm,
  };
})(window);