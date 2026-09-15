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

function renderCarCard(car) {
  const priceLabel = car.priceUnit ? `${formatCFA(car.price)} <small>${car.priceUnit}</small>` : formatCFA(car.price);
  const ctaLabel = car.category === 'rental' ? 'Book Now' : 'View Details';
  return `
    <div class="product-card">
      <a href="car-detail.html?id=${car.id}" class="product-card__image-wrap">
        <img src="${car.image}" alt="${car.name}" loading="lazy">
        <span class="product-card__badge">${carBadge(car)}</span>
      </a>
      <div class="product-card__body">
        <span class="product-card__cat">${car.make} · ${car.year}</span>
        <a href="car-detail.html?id=${car.id}" style="text-decoration:none;">
          <h3 class="product-card__title">${car.name}</h3>
        </a>
        <div class="product-card__meta">
          <span>🛣️ ${car.mileage}</span>
          <span>⛽ ${car.fuel}</span>
          <span>⚙️ ${car.transmission}</span>
        </div>
        <div class="product-card__price">${priceLabel}</div>
      </div>
      <div class="product-card__actions">
        <a href="car-detail.html?id=${car.id}" class="btn btn--primary btn--sm" style="width:100%;">${ctaLabel}</a>
      </div>
    </div>`;
}

function renderPartCard(part) {
  return `
    <div class="product-card">
      <div class="product-card__image-wrap">
        <img src="${part.image}" alt="${part.name}" loading="lazy">
        <span class="product-card__badge">${part.category}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${part.category}</span>
        <h3 class="product-card__title">${part.name}</h3>
        <p style="font-size:12px;color:var(--color-text-light);">${part.description}</p>
        <div class="product-card__price">${formatCFA(part.price)}</div>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--sm" style="width:100%;" onclick='addPartToCart(${JSON.stringify(part.id)})'>Add to Cart</button>
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
