/* ============================================================
   KENNE CARGO — AI SUPPORT / WHATSAPP CRM WIDGET
   assets/js/ai-support.js
   ------------------------------------------------------------
   A floating chat assistant that answers common questions
   (tracking, pricing, services, cars, customs) using a simple
   keyword-matching "AI", and hands off to WhatsApp for anything
   it can't confidently answer — the classic AI-first,
   human-in-WhatsApp-CRM support pattern.

   NOTE: This is a front-end demo with no live model behind it.
   To upgrade this into a real AI assistant, replace answerFor()
   with a call to your LLM API (e.g. the Claude API — see the
   comment inside answerFor()). To make the WhatsApp handoff land
   in an actual CRM inbox (shared team inbox, auto-tagging,
   conversation history), connect a WhatsApp Business Platform
   provider such as Twilio, 360dialog, or Respond.io — the wa.me
   deep link below already carries the visitor's question as
   pre-filled context, so agents see it the moment the chat opens.
   ============================================================ */
(function () {
  'use strict';

  const WHATSAPP_NUMBER = '237670735947'; // Cameroon contact, digits only w/ country code
  const HISTORY_KEY = 'kenne_tech_ai_chat';
  const LEAD_KEY = 'kenne_tech_ai_lead_logged';

  const KB = [
    { keys: ['iphone', 'apple'],
      reply: "We stock iPhones both brand new (sealed, full warranty) and UK used (tested, battery health verified) — check current stock and prices in the shop.",
      cta: { label: '🍎 Shop Apple', href: 'shop.html?brand=Apple' } },
    { keys: ['samsung', 'galaxy'],
      reply: "We carry Samsung Galaxy S, A, and Note series — brand new, sealed, full warranty.",
      cta: { label: '📱 Shop Samsung', href: 'shop.html?brand=Samsung' } },
    { keys: ['cheap', 'budget', 'affordable', 'tecno', 'infinix'],
      reply: "For budget-friendly options, check out our Tecno and Infinix range — great specs for the price, all brand new.",
      cta: { label: '💰 Browse Phones', href: 'shop.html' } },
    { keys: ['price', 'cost', 'how much'],
      reply: "Prices vary by model, storage, and condition — browse the shop to see live prices, or tell me a model and I'll point you in the right direction.",
      cta: { label: '📱 Shop Phones', href: 'shop.html' } },
    { keys: ['accessory', 'accessories', 'charger', 'earbud', 'case', 'power bank', 'speaker'],
      reply: "We stock chargers, earbuds, power banks, cases and speakers — all genuine, tested items.",
      cta: { label: '🎧 Shop Accessories', href: 'accessories.html' } },
    { keys: ['warranty', 'genuine', 'fake', 'original', 'used', 'condition'],
      reply: "Every device we sell is tested and verified before sale. Brand new items come sealed with full manufacturer warranty; UK used items are checked and battery-health rated.",
      cta: { label: '📱 Shop Phones', href: 'shop.html' } },
    { keys: ['pay', 'payment', 'mobile money', 'momo', 'delivery payment'],
      reply: "At checkout you can choose Pay Now (Mobile Money/bank transfer, full or partial) or Pay on Delivery — whichever works best for you.",
      cta: { label: 'View Cart', href: 'cart.html' } },
    { keys: ['cart', 'checkout', 'buy', 'purchase', 'order'],
      reply: "You can add any device to your cart and check out directly on the site — you'll get an order number instantly.",
      cta: { label: '🛒 View Cart', href: 'cart.html' } },
    { keys: ['contact', 'phone', 'call', 'human', 'agent', 'speak to someone', 'real person'],
      reply: "Of course — I'll connect you with our team directly on WhatsApp so a real person can help.",
      cta: { label: '💬 Chat on WhatsApp', whatsapp: true } },
    { keys: ['hi', 'hello', 'hey', 'good morning', 'good afternoon'],
      reply: "Hello! 👋 I'm the Kenne Tech Assistant. Ask me about phones, accessories, or orders — or tap a quick option below." },
    { keys: ['thank', 'thanks'],
      reply: "You're very welcome! Stay connected. 😊 Anything else I can help with?" },
  ];

  function answerFor(text) {
    const t = text.toLowerCase();
    for (const item of KB) {
      if (item.keys.some(k => t.includes(k))) return item;
    }
    // ---- Real AI hook ----
    // No confident keyword match — this is where you'd call a real
    // model instead of falling back to a WhatsApp handoff, e.g.:
    //
    //   const res = await fetch('https://api.anthropic.com/v1/messages', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       model: 'claude-sonnet-4-6', max_tokens: 400,
    //       messages: [{ role: 'user', content: text }],
    //       system: 'You are the Kenne Cargo support assistant...'
    //     })
    //   });
    //
    return {
      reply: "I'm not 100% sure on that one — but our team can help right away on WhatsApp.",
      cta: { label: '💬 Chat on WhatsApp', whatsapp: true },
    };
  }

  function waLink(prefill) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
  }

  function loadHistory() {
    try {
      const v = JSON.parse(sessionStorage.getItem(HISTORY_KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function saveHistory(list) {
    try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-40))); } catch (e) {}
  }

  function logLeadOnce(firstMessage) {
    if (sessionStorage.getItem(LEAD_KEY)) return;
    sessionStorage.setItem(LEAD_KEY, '1');
    if (window.KenneNotifications) {
      window.KenneNotifications.push({
        icon: '💬',
        title: 'New AI chat started',
        message: `A visitor started a chat: "${firstMessage.slice(0, 80)}${firstMessage.length > 80 ? '…' : ''}"`,
      });
    }
  }

  function buildWidget() {
    const wrap = document.createElement('div');
    wrap.id = 'kc-ai-widget';
    wrap.innerHTML = `
      <div class="kc-ai-launcher" id="kc-ai-launcher">
        <button class="kc-ai-btn kc-ai-btn--wa" id="kc-wa-btn" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
          <svg viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.6.7 5 2 7.1L3 29l6.4-2.2c2 1.1 4.2 1.7 6.6 1.7 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.1c-2.1 0-4.1-.6-5.9-1.6l-.4-.3-4 1.4 1.3-3.9-.3-.4a10.4 10.4 0 01-1.6-5.6C5.1 9.9 9.9 5.1 16 5.1S26.9 9.9 26.9 16 22.1 26.1 16 26.1zm5.9-7.7c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 01-2.6-1.6 9.6 9.6 0 01-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5s-.7-1.7-1-2.3-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4a3.6 3.6 0 00-1.1 2.7c0 1.6 1.2 3.1 1.3 3.3.2.2 2.4 3.7 5.9 5.1.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.3-.3-.6-.4z"/></svg>
        </button>
        <button class="kc-ai-btn kc-ai-btn--main" id="kc-ai-toggle" aria-label="Open Kenne Tech Assistant" title="Chat with Kenne Tech Assistant">
          <svg class="kc-ai-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
          <svg class="kc-ai-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="kc-ai-panel" id="kc-ai-panel" hidden>
        <div class="kc-ai-header">
          <div class="kc-ai-header-avatar">🅺</div>
          <div class="kc-ai-header-text">
            <strong>Kenne Tech Assistant</strong>
            <span><span class="kc-ai-dot"></span> AI Assistant · Online</span>
          </div>
        </div>
        <div class="kc-ai-messages" id="kc-ai-messages"></div>
        <div class="kc-ai-quick" id="kc-ai-quick">
          <button type="button" data-q="Shop iPhones">Shop iPhones</button>
          <button type="button" data-q="Shop Samsung">Shop Samsung</button>
          <button type="button" data-q="Accessories">Accessories</button>
          <button type="button" data-q="Talk to a human">Talk to a human</button>
        </div>
        <form class="kc-ai-input-row" id="kc-ai-form">
          <input type="text" id="kc-ai-input" placeholder="Type your question…" autocomplete="off">
          <button type="submit" aria-label="Send">➤</button>
        </form>
        <a class="kc-ai-wa-footer" id="kc-ai-wa-footer" href="${waLink('Hello Kenne Cargo, I have a question.')}" target="_blank" rel="noopener">
          💬 Prefer WhatsApp? Chat with our team directly →
        </a>
      </div>
    `;
    document.body.appendChild(wrap);
    wireWidget();
  }

  function addBubble(role, text, cta) {
    const host = document.getElementById('kc-ai-messages');
    const bubble = document.createElement('div');
    bubble.className = `kc-ai-bubble kc-ai-bubble--${role}`;
    bubble.innerHTML = `<div class="kc-ai-bubble-text"></div>`;
    bubble.querySelector('.kc-ai-bubble-text').textContent = text;
    if (cta) {
      const a = document.createElement('a');
      a.className = 'kc-ai-cta';
      a.textContent = cta.label;
      if (cta.whatsapp) {
        a.href = waLink(`Hello Kenne Cargo, I need help. My question: "${cta.context || ''}"`);
        a.target = '_blank'; a.rel = 'noopener';
      } else {
        a.href = cta.href;
      }
      bubble.appendChild(a);
    }
    host.appendChild(bubble);
    host.scrollTop = host.scrollHeight;
  }

  function respond(userText) {
    const item = answerFor(userText);
    if (item.cta && item.cta.whatsapp) item.cta.context = userText;
    setTimeout(() => addBubble('bot', item.reply, item.cta), 450);
  }

  function sendMessage(text) {
    text = text.trim();
    if (!text) return;
    addBubble('user', text);
    const hist = loadHistory();
    hist.push({ role: 'user', text });
    saveHistory(hist);
    logLeadOnce(text);
    respond(text);
  }

  function wireWidget() {
    const toggle = document.getElementById('kc-ai-toggle');
    const panel = document.getElementById('kc-ai-panel');
    const form = document.getElementById('kc-ai-form');
    const input = document.getElementById('kc-ai-input');
    const quick = document.getElementById('kc-ai-quick');

    toggle.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      toggle.classList.toggle('kc-ai-open', willOpen);
      if (willOpen && !document.getElementById('kc-ai-messages').children.length) {
        addBubble('bot', "Hi there! 👋 I'm the Kenne Tech Assistant. Ask me about phones, accessories, or orders — or tap a quick option below.");
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage(input.value);
      input.value = '';
    });

    quick.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-q]');
      if (!btn) return;
      sendMessage(btn.dataset.q);
    });
  }

  document.addEventListener('DOMContentLoaded', buildWidget);
})();
