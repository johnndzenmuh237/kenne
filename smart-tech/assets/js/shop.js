/* ============================================================
   KENNE SMART TECHNOLOGY — SHOP RENDER HELPERS
   assets/js/shop.js
   ============================================================ */
function formatCFA(n) {
  return 'CFA ' + Math.round(n).toLocaleString('en-US');
}

function renderProductCard(p) {
  const badge = p.condition ? p.condition.split(' ')[0] : (p.stock < 8 ? 'Low Stock' : 'In Stock');
  return `
    <div class="product-card">
      <a href="product-detail.html?id=${p.id}" class="product-card__image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-card__badge">${badge}</span>
      </a>
      <div class="product-card__body">
        <span class="product-card__cat">${p.brand}</span>
        <a href="product-detail.html?id=${p.id}" style="text-decoration:none;">
          <h3 class="product-card__title">${p.name}</h3>
        </a>
        <div class="product-card__meta">
          ${p.storage ? `<span>💾 ${p.storage}</span>` : ''}
          ${p.color ? `<span>🎨 ${p.color}</span>` : ''}
        </div>
        <div class="product-card__price">${formatCFA(p.price)}</div>
      </div>
      <div class="product-card__actions">
        <button class="btn btn--primary btn--sm" style="width:100%;" onclick='quickAdd(${JSON.stringify(p.id)})'>Add to Cart</button>
      </div>
    </div>`;
}

function allProducts() {
  return [...PRODUCTS_DATA, ...ACCESSORIES_DATA];
}

function quickAdd(id) {
  const p = allProducts().find(x => x.id === id);
  if (!p) return;
  window.KenneCart.addItem({ id: p.id, name: p.name, price: p.price, image: p.image }, 1);
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
