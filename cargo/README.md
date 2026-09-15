# Kenne Cargo — Professional Shipping & Logistics Website Template

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Pages](https://img.shields.io/badge/pages-14-brightgreen)
![License](https://img.shields.io/badge/license-Commercial-orange)

A complete, production-ready website template designed for:

- ✅ Freight Forwarding Companies
- ✅ Cargo & Shipping Agencies
- ✅ Logistics Providers
- ✅ Air Freight Services
- ✅ Sea Freight Services
- ✅ Courier Companies
- ✅ Warehousing Companies
- ✅ Supply Chain Businesses
- ✅ International Transport Services

---

## 🚀 Quick Start

```bash
# 1. Unzip the template files
unzip shipping-agency-pro.zip -d shipping-agency-pro

# 2. Open in VS Code
code shipping-agency-pro/

# 3. Right-click index.html → "Open with Live Server"
# View at http://127.0.0.1:5500
```

> ⚠️ **Always use a local server** — don't open HTML files directly via `file://`

---

## 📁 File Structure

```
shipping-agency-pro/
│
├── index.html              Homepage with hero, services, stats, testimonials
├── about.html              Company story, timeline, team
├── services.html           All services overview
├── service-single.html     Individual service detail page
├── tracking.html           Real-time shipment tracking
├── pricing.html            Pricing plans + comparison table
├── fleet.html              Fleet & warehouse facilities
├── destinations.html       Global shipping destinations
├── careers.html            Job listings + application modal
├── blog.html               Blog listing with sidebar
├── blog-single.html        Full article page
├── contact.html            Contact form + office map
├── faq.html                FAQ accordion with categories
├── quote-request.html      Multi-step quote request form
│
├── assets/
│   ├── css/
│   │   ├── style.css        Core design system & components
│   │   ├── responsive.css   Mobile & tablet breakpoints
│   │   ├── animations.css   Scroll-reveal & keyframes
│   │   ├── themes.css       5 colour theme variants
│   │   └── dark-mode.css    Dark mode support
│   │
│   ├── js/
│   │   ├── main.js          Header/footer, nav, dark mode, FAQ, scroll
│   │   ├── tracking.js      Shipment tracking (mock → replace with API)
│   │   ├── quote-form.js    Multi-step form logic & validation
│   │   ├── counters.js      Animated number counters
│   │   └── slider.js        Lightweight carousel (no dependencies)
│   │
│   ├── images/              ← Add your images here
│   └── fonts/               ← Optional self-hosted fonts
│
├── documentation/
│   ├── installation.html
│   ├── customization.html
│   └── deployment.html
│
└── README.md
```

---

## ⚡ Features

| Feature | Details |
|---|---|
| **Pages** | 14 fully designed pages |
| **Responsive** | Mobile-first, tested at 320px–2560px |
| **Dark Mode** | System preference + manual toggle |
| **Color Themes** | 5 pre-built themes (Amber, Ocean, Forest, Crimson, Slate) |
| **Tracking** | Working mock tracker — connect to any API |
| **Quote Form** | 4-step multi-page form with validation |
| **Animations** | Scroll-reveal, counter animation, hero transitions |
| **Slider** | Zero-dependency carousel with touch/drag support |
| **FAQ** | Accordion component with category navigation |
| **SEO Ready** | Semantic HTML, meta tags, Open Graph ready |
| **Performance** | Lazy-loaded images, minimal dependencies |
| **Accessibility** | ARIA labels, keyboard navigation, reduced-motion support |
| **Dependencies** | Zero — pure HTML, CSS, JavaScript |
| **Google Fonts** | Barlow Condensed + Inter + JetBrains Mono |

---

## 🎨 Customization

### 1. Brand Color
Open `assets/css/style.css` and update `:root`:
```css
:root {
  --color-accent:       #E8931A;  /* Your brand color */
  --color-accent-dark:  #C67A10;
  --color-accent-light: #F5B04A;
}
```

### 2. Company Name & Contact
Open `assets/js/main.js` and update the `SITE` object:
```js
const SITE = {
  name:    'YourCompany',
  tagline: 'Global Logistics',
  phone:   '+1 (800) 000-0000',
  email:   'info@yourcompany.com',
  address: '123 Your Street, City, Country',
  hours:   'Mon–Fri: 9am–5pm',
};
```

### 3. Pre-built Themes
Add a class to `<html>` for instant theme switching:
```html
<html lang="en" class="theme-ocean">  <!-- ocean, forest, crimson, slate, amber -->
```

### 4. Dark Mode
- Auto-detects `prefers-color-scheme: dark`
- Toggle button in header persists to localStorage
- Force dark: `<html class="dark">`
- Disable: remove `dark-mode.css` link

---

## 📸 Images

Replace placeholder images in `assets/images/`:

| Folder | Purpose | Recommended Size |
|---|---|---|
| `hero/` | Page backgrounds, blog thumbnails | 1920×1080px |
| `services/` | Service page images | 800×600px |
| `fleet/` | Vessel & vehicle photos | 800×500px |
| `destinations/` | City/port cards | 400×500px |
| `team/` | Staff headshots | 400×400px (square) |
| `testimonials/` | Client avatars | 150×150px (square) |
| `logo/` | Company logo | SVG preferred |

> **Tip:** Convert to WebP and compress to <200KB for best performance.

---

## 🔌 Connecting Forms

### Quote Form → Formspree
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
```

### Quote Form → Custom API
In `assets/js/quote-form.js`, replace `submitQuoteForm()`:
```js
const response = await fetch('https://your-api.com/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

---

## 📡 Tracking Integration

The tracking system uses mock data in `assets/js/tracking.js`.  
Replace `MOCK_SHIPMENTS` with real API calls:

```js
function lookupShipment(id) {
  // Replace with your carrier API
  const res = await fetch(`https://your-tms.com/api/track/${id}`);
  const data = await res.json();
  renderTrackingResult(data);
}
```

---

## 🚀 Deployment

| Platform | Method | Cost |
|---|---|---|
| **Netlify** | Drag & drop / Git | Free tier |
| **Vercel** | Git-connected | Free tier |
| **GitHub Pages** | Push to repo | Free |
| **cPanel** | FTP upload | Shared hosting |
| **VPS** | Apache / Nginx | Self-managed |

See [documentation/deployment.html](documentation/deployment.html) for full guides.

---

## 🗂️ Documentation

Full documentation is included in the `documentation/` folder:

- [Installation Guide](documentation/installation.html) — Setup, file structure, JS reference
- [Customization Guide](documentation/customization.html) — Colors, fonts, logo, images, forms
- [Deployment Guide](documentation/deployment.html) — Netlify, Vercel, cPanel, Apache, SEO

---

## ✅ Pre-Launch Checklist

- [ ] Update `SITE` object in `main.js` with real contact info
- [ ] Replace all placeholder images
- [ ] Update `<title>` and `<meta description>` on every page
- [ ] Connect form submission (Formspree / EmailJS / custom API)
- [ ] Update pricing numbers and service descriptions
- [ ] Add your team photos and bios
- [ ] Set up SSL / HTTPS
- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile and in dark mode
- [ ] Run PageSpeed Insights and fix any issues

---

## 📋 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| IE 11 | ❌ Not supported |

---

## 📄 License

This template is licensed for commercial use. You may use it for one live website per license. You may not redistribute or resell the template files.

---

## 🙏 Credits

- **Fonts:** [Google Fonts](https://fonts.google.com) — Barlow Condensed, Inter, JetBrains Mono
- **Placeholder Images:** [Unsplash](https://unsplash.com) (replace with your own)
- **Avatar Fallbacks:** [UI Avatars](https://ui-avatars.com)

---

*Kenne Cargo Template v1.0.0 — Built with ❤️ for the logistics industry*