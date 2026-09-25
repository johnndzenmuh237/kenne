/* ============================================================
   KENNE — SHARED CART / CHECKOUT ENGINE
   assets/js/cart.js
   ------------------------------------------------------------
   A front-end cart system reused by Kenne Car Business and Kenne
   Smart Technology. No backend — the cart is stored in
   localStorage so it survives page navigation and reloads.
   Ordering is completed on WhatsApp: the "Order Now" action
   builds a pre-filled WhatsApp message with the full cart
   summary and total, and opens a chat with the Kenne team so a
   human confirms payment, delivery and details.

   Each site sets window.CART_NAMESPACE (e.g. 'kenne_cars' or
   'kenne_tech') before this file runs, so their carts never
   collide even though the code is shared.
   ============================================================ */
(function (global) {
  'use strict';

  const NS = global.CART_NAMESPACE || 'kenne_store';
  const CART_KEY = `${NS}_cart`;
  const ORDERS_KEY = `${NS}_orders`;

  function readCart() {
    try {
      const v = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCartBadge();
    window.dispatchEvent(new CustomEvent('kenne:cart-updated', { detail: { items } }));
  }

  function addItem(product, qty = 1, options = {}) {
    const items = readCart();
    const lineId = product.id + (options.variant ? ':' + options.variant : '');
    const existing = items.find(i => i.lineId === lineId);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({
        lineId,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: options.variant || null,
        qty,
      });
    }
    writeCart(items);
    if (typeof window.showToast === 'function') {
      window.showToast(`✓ Added "${product.name}" to cart`);
    }
  }

  function removeItem(lineId) {
    writeCart(readCart().filter(i => i.lineId !== lineId));
  }

  function setQty(lineId, qty) {
    const items = readCart();
    const item = items.find(i => i.lineId === lineId);
    if (!item) return;
    if (qty <= 0) { removeItem(lineId); return; }
    item.qty = qty;
    writeCart(items);
  }

  function clearCart() { writeCart([]); }

  function getItems() { return readCart(); }

  function getTotal() {
    return readCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCount() {
    return readCart().reduce((sum, i) => sum + i.qty, 0);
  }

  function formatMoney(n) {
    return 'CFA ' + Math.round(n).toLocaleString('en-US');
  }

  function updateCartBadge() {
    const badges = document.querySelectorAll('#cart-badge, [data-cart-badge]');
    if (!badges.length) return;
    const count = getCount();
    badges.forEach(badge => {
      badge.textContent = count;
      badge.hidden = count === 0;
    });
  }

  /* ----------------------------------------------------------
     ORDER NUMBER — shown to the customer as a friendly reference
     even though the actual order is confirmed on WhatsApp.
     ---------------------------------------------------------- */
  function generateOrderNumber(prefix) {
    const year = new Date().getFullYear();
    const num = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}-${year}-${num}`;
  }

  /* ----------------------------------------------------------
     WHATSAPP ORDERING
     Builds a readable order summary and opens WhatsApp so the
     customer can confirm the order and delivery/payment details
     with a real person on the Kenne team.
     ---------------------------------------------------------- */
  function buildWhatsAppOrderMessage(prefix) {
    const items = readCart();
    if (items.length === 0) return null;
    const ref = generateOrderNumber(prefix || 'KC-ORD');
    const lines = items.map(i => `• ${i.qty}× ${i.name} — ${formatMoney(i.price * i.qty)}`);
    const total = getTotal();
    const message =
`Hello Kenne Cars, I'd like to place an order.

Order Ref: ${ref}
${lines.join('\n')}

Total: ${formatMoney(total)}

Please confirm availability, delivery and payment options.`;
    return { ref, message, total, items };
  }

  function getWhatsAppOrderLink(prefix) {
    const built = buildWhatsAppOrderMessage(prefix);
    if (!built) return null;
    const phone = (global.SITE && global.SITE.whatsapp) || '237670735947';
    return { ...built, url: `https://wa.me/${phone}?text=${encodeURIComponent(built.message)}` };
  }

  // Opens WhatsApp with the full cart summary pre-filled, ready to send.
  // Used by the "Order Now via WhatsApp" button on the cart page.
  function orderViaWhatsApp(prefix) {
    const built = getWhatsAppOrderLink(prefix);
    if (!built) {
      if (typeof window.showToast === 'function') window.showToast('Your cart is empty.', 'error');
      return null;
    }
    window.open(built.url, '_blank', 'noopener');
    return built;
  }

  global.KenneCart = {
    addItem, removeItem, setQty, clearCart, getItems, getTotal, getCount,
    formatMoney, updateCartBadge, generateOrderNumber,
    buildWhatsAppOrderMessage, getWhatsAppOrderLink, orderViaWhatsApp,
  };

  document.addEventListener('DOMContentLoaded', updateCartBadge);
})(window);
