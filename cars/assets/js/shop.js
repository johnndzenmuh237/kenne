/* ============================================================
   KENNE CAR BUSINESS — SHOP RENDER HELPERS
   assets/js/shop.js
   ============================================================ */
function formatCFA(n) {
  return 'CFA ' + Math.round(n).toLocaleString('en-US');
}

function carBadge(car) {
  if (car.category === 'rental') return 'For Rent';
  if (car.category === 'wholesale') return 'Wholesale';
  if (car.availability === 'In Stock') return 'In Stock';
  return car.availability || '';
}

function whatsappBookingLink(car) {
  const msg = car.category === 'rental'
    ? `Hi, I'd like to book the "${car.name}" rental (${formatCFA(car.price)}${car.priceUnit || ''}) listed on Kenne Cars. Please confirm availability and dates.`
    : `Hi, I'm interested in the "${car.name}" (${formatCFA(car.price)}) listed on Kenne Cars.`;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function renderCarCard(car) {
  const priceLabel = car.priceUnit ? `${formatCFA(car.price)} <small>${car.priceUnit}</small>` : formatCFA(car.price);
  const isRental = car.category === 'rental';

  const primaryBtn = isRental
    ? `<a href="${whatsappBookingLink(car)}" target="_blank" rel="noopener" class="btn btn--primary btn--sm" style="width:100%;">📱 Book on WhatsApp</a>`
    : `<button class="btn btn--primary btn--sm" style="width:100%;" onclick='quickAddCarToCart(${JSON.stringify(car.id)})'>🛒 Add to Cart</button>`;

  return `
    <div class="product-card">
      <a href="car-detail.html?id=${car.id}" class="product-card__image-wrap">
        <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=80';">
        <span class="product-card__badge">${carBadge(car)}</span>
      </a>
      <div class="product-card__body">
        <span class="product-card__cat">${car.make} · ${car.year}${car.bodyType ? ' · ' + car.bodyType : ''}</span>
        <a href="car-detail.html?id=${car.id}" style="text-decoration:none;">
          <h3 class="product-card__title">${car.name}</h3>
        </a>
        <div class="product-card__meta">
          <span>🛣️ ${car.mileage}</span>
          <span>⛽ ${car.fuel}</span>
          <span>⚙️ ${car.transmission}</span>
          ${car.seats ? `<span>💺 ${car.seats} seats</span>` : ''}
        </div>
        <div class="product-card__price">${priceLabel}</div>
      </div>
      <div class="product-card__actions" style="display:flex;flex-direction:column;gap:8px;">
        <a href="car-detail.html?id=${car.id}" class="btn btn--outline btn--sm" style="width:100%;">🔍 View Details</a>
        ${primaryBtn}
      </div>
    </div>`;
}

// Quick "Add to Cart" straight from a listing card (no need to open the detail page)
function quickAddCarToCart(carId) {
  const car = CARS_DATA.find(c => c.id === carId);
  if (!car) return;
  window.KenneCart.addItem({ id: car.id, name: car.name, price: car.price, image: car.image }, 1);
}

function renderPartCard(part) {
  return `
    <div class="product-card">
      <div class="product-card__image-wrap">
        <img src="${part.image}" alt="${part.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80';">
        <span class="product-card__badge">${part.category}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${part.category}</span>
        <h3 class="product-card__title">${part.name}</h3>
        <p style="font-size:12px;color:var(--color-text-light);">${part.description}</p>
        <div class="product-card__price">${formatCFA(part.price)}</div>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--sm" style="width:100%;" onclick='addPartToCart(${JSON.stringify(part.id)})'>🛒 Add to Cart</button>
      </div>
    </div>`;
}

function addPartToCart(partId) {
  const part = CAR_PARTS_DATA.find(p => p.id === partId);
  if (!part) return;
  window.KenneCart.addItem({ id: part.id, name: part.name, price: part.price, image: part.image }, 1);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
