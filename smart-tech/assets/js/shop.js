/* ============================================================
   KENNE SMART TECHNOLOGY — SHOP RENDER HELPERS
   assets/js/shop.js
   ============================================================ */
function formatCFA(n) {
  return 'CFA ' + Math.round(n).toLocaleString('en-US');
}

function allProducts() {
  return [...PRODUCTS_DATA, ...ACCESSORIES_DATA];
}

function renderProductCard(p) {
  const isAccessory = p.category && p.category !== 'phones';
  const badge = isAccessory
    ? 'Universal Fit'
    : (p.condition ? p.condition.split(' ')[0] : (p.stock < 8 ? 'Low Stock' : 'In Stock'));

  return `
    <div class="product-card">
      <a href="product-detail.html?id=${p.id}" class="product-card__image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80';">
        <span class="product-card__badge">${badge}</span>
      </a>
      <div class="product-card__body">
        <span class="product-card__cat">${isAccessory ? p.category : p.brand}</span>
        <a href="product-detail.html?id=${p.id}" style="text-decoration:none;">
          <h3 class="product-card__title">${p.name}</h3>
        </a>
        <div class="product-card__meta">
          ${p.storage ? `<span>💾 ${p.storage}</span>` : ''}
          ${p.color ? `<span>🎨 ${p.color}</span>` : ''}
          ${isAccessory ? `<span>✅ Fits all brands</span>` : ''}
        </div>
        <div class="product-card__price">${formatCFA(p.price)}</div>
      </div>
      <div class="product-card__actions" style="display:flex;flex-direction:column;gap:8px;">
        <a href="product-detail.html?id=${p.id}" class="btn btn--outline btn--sm" style="width:100%;">🔍 View Details</a>
        <button class="btn btn--primary btn--sm" style="width:100%;" onclick='quickAdd(${JSON.stringify(p.id)})'>🛒 Add to Cart</button>
      </div>
    </div>`;
}

function quickAdd(id) {
  const p = allProducts().find(x => x.id === id);
  if (!p) return;
  window.KenneCart.addItem({ id: p.id, name: p.name, price: p.price, image: p.image }, 1);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
