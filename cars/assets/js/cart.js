/* ============================================================
   KENNE — SHARED CART / CHECKOUT ENGINE
   assets/js/cart.js
   ------------------------------------------------------------
   A front-end cart + checkout system reused by Kenne Car Business
   and Kenne Smart Technology. No backend — orders, stock, and
   payments are simulated in localStorage, the same honest pattern
   used by the Cargo site's shipment tracking.

   Each site sets window.CART_NAMESPACE (e.g. 'kenne_cars' or
   'kenne_tech') before this file runs, so their carts/orders never
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
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const count = getCount();
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  /* ----------------------------------------------------------
     ORDERS — created at checkout, mirrors Cargo's shipment
     registration + notification pattern.
     ---------------------------------------------------------- */
  function generateOrderNumber(prefix) {
    const year = new Date().getFullYear();
    const num = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}-${year}-${num}`;
  }

  function placeOrder({ prefix, customer, paymentMethod, notifyDetails }) {
    const items = readCart();
    if (items.length === 0) return null;
    const ref = generateOrderNumber(prefix);
    const total = getTotal();
    const paidNow = paymentMethod === 'pay-now';
    const order = {
      ref,
      items,
      total,
      customer,
      paymentMethod,
      paymentStatus: paidNow ? 'Paid' : 'Pay on Delivery',
      balance: paidNow ? 0 : total,
      createdAt: Date.now(),
    };
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders.unshift(order);
    try { localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); } catch (e) {}
    clearCart();

    // Reuse the same notification system built for Cargo, if present.
    if (global.KenneNotifications) {
      global.KenneNotifications.push({
        icon: '🛒',
        title: `New order — ${ref}`,
        message: `${customer.name || 'A customer'} placed an order for ${formatMoney(total)} (${paidNow ? 'paid' : 'pay on delivery'}).`,
        ref,
      });
      if (notifyDetails) {
        global.KenneNotifications.notifyClient({
          ref,
          clientName: customer.name,
          clientEmail: customer.email,
          clientPhone: customer.phone,
          origin: notifyDetails.origin,
          destination: notifyDetails.destination,
          service: notifyDetails.service,
          itemDescription: items.map(i => `${i.qty}× ${i.name}`).join(', '),
        });
      }
    }
    return order;
  }

  function loadOrder(ref) {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return orders.find(o => o.ref === ref) || null;
  }

  function recordPayment(ref, amount) {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const order = orders.find(o => o.ref === ref);
    if (!order) return null;
    order.balance = Math.max(0, order.balance - amount);
    order.paymentStatus = order.balance === 0 ? 'Paid' : 'Partially Paid';
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return order;
  }

  global.KenneCart = {
    addItem, removeItem, setQty, clearCart, getItems, getTotal, getCount,
    formatMoney, updateCartBadge, placeOrder, loadOrder, recordPayment,
    generateOrderNumber,
  };

  document.addEventListener('DOMContentLoaded', updateCartBadge);
})(window);
