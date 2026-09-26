/* ============================================================
   KENNE SMART TECHNOLOGY — PRODUCT DATA
   assets/js/products-data.js
   Demo catalog. Replace with your real stock (edit this array
   directly, or wire to a real backend/admin panel later).
   ============================================================ */
const PRODUCTS_DATA = [
  // ---------------------------------------------------------------
  // SAMSUNG GALAXY
  // ---------------------------------------------------------------
  {
    id: 'kt-ph-101', name: 'Samsung Galaxy A12', brand: 'Samsung', category: 'phones',
    price: 95000, condition: 'Brand New', storage: '64GB', color: 'Black',
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=900&q=80'],
    description: 'Entry-level Galaxy with a big screen and all-day battery. Sealed, brand new, full warranty.',
    stock: 22,
  },
  {
    id: 'kt-ph-102', name: 'Samsung Galaxy A14', brand: 'Samsung', category: 'phones',
    price: 120000, condition: 'Brand New', storage: '128GB', color: 'Dark Red',
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=900&q=80'],
    description: '50MP camera, 5000mAh battery, smooth everyday performance. Sealed box.',
    stock: 20,
  },
  {
    id: 'kt-ph-103', name: 'Samsung Galaxy A32', brand: 'Samsung', category: 'phones',
    price: 155000, condition: 'Brand New', storage: '128GB', color: 'Awesome Blue',
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=900&q=80'],
    description: 'AMOLED display, quad camera setup, great mid-range value. Sealed, full warranty.',
    stock: 16,
  },
  {
    id: 'kt-ph-004', name: 'Samsung Galaxy A54', brand: 'Samsung', category: 'phones',
    price: 210000, condition: 'Brand New', storage: '128GB', color: 'Awesome Lime',
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=900&q=80'],
    description: 'Mid-range powerhouse with a 50MP camera and all-day battery. Sealed, brand new.',
    stock: 15,
  },
  {
    id: 'kt-ph-002', name: 'Samsung Galaxy S23 Ultra — 256GB', brand: 'Samsung', category: 'phones',
    price: 720000, condition: 'Brand New', storage: '256GB', color: 'Phantom Black',
    image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=900&q=80'],
    description: 'S-Pen included, 200MP camera, 5000mAh battery. Sealed box, full warranty.',
    stock: 8,
  },

  // ---------------------------------------------------------------
  // iPHONE
  // ---------------------------------------------------------------
  {
    id: 'kt-ph-005', name: 'iPhone 11 — 64GB', brand: 'Apple', category: 'phones',
    price: 195000, condition: 'UK Used — Good', storage: '64GB', color: 'Black',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80'],
    description: 'Reliable and affordable, tested and unlocked for any network. Minor cosmetic wear.',
    stock: 20,
  },
  {
    id: 'kt-ph-104', name: 'iPhone 12 — 128GB', brand: 'Apple', category: 'phones',
    price: 320000, condition: 'UK Used — Excellent', storage: '128GB', color: 'Blue',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'],
    description: '5G ready, A14 Bionic chip, tested and verified 100% functional, battery health 85%+.',
    stock: 14,
  },
  {
    id: 'kt-ph-003', name: 'iPhone 13 — 128GB', brand: 'Apple', category: 'phones',
    price: 385000, condition: 'UK Used — Excellent', storage: '128GB', color: 'Midnight',
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80'],
    description: 'UK used, tested and verified 100% functional, battery health 88%+. Great value flagship.',
    stock: 12,
  },
  {
    id: 'kt-ph-008', name: 'iPhone 14 Pro Max — 256GB', brand: 'Apple', category: 'phones',
    price: 680000, condition: 'Brand New', storage: '256GB', color: 'Deep Purple',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80'],
    description: 'Dynamic Island, A16 Bionic, 48MP Pro camera system. Sealed, full warranty.',
    stock: 5,
  },
  {
    id: 'kt-ph-001', name: 'iPhone 15 — 256GB', brand: 'Apple', category: 'phones',
    price: 750000, condition: 'Brand New', storage: '256GB', color: 'Titanium Blue',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80'],
    description: 'Sealed, brand new, full manufacturer warranty. USB-C, A16 chip, 48MP camera system.',
    stock: 6,
  },

  // ---------------------------------------------------------------
  // TECNO
  // ---------------------------------------------------------------
  {
    id: 'kt-ph-105', name: 'Tecno Spark 10', brand: 'Tecno', category: 'phones',
    price: 98000, condition: 'Brand New', storage: '128GB', color: 'Meta Black',
    image: 'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=900&q=80'],
    description: 'Budget-friendly everyday phone with a 50MP AI camera. Sealed, brand new.',
    stock: 28,
  },
  {
    id: 'kt-ph-006', name: 'Tecno Camon 20', brand: 'Tecno', category: 'phones',
    price: 145000, condition: 'Brand New', storage: '128GB', color: 'Serenity Blue',
    image: 'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=900&q=80'],
    description: 'Popular local favorite — great camera for the price, big battery. Sealed, brand new.',
    stock: 25,
  },
  {
    id: 'kt-ph-106', name: 'Tecno Phantom X2', brand: 'Tecno', category: 'phones',
    price: 385000, condition: 'Brand New', storage: '256GB', color: 'Stardust Grey',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80'],
    description: "Tecno's flagship — curved AMOLED display, 64MP periscope zoom camera. Sealed, full warranty.",
    stock: 7,
  },

  // ---------------------------------------------------------------
  // INFINIX
  // ---------------------------------------------------------------
  {
    id: 'kt-ph-107', name: 'Infinix Hot 30', brand: 'Infinix', category: 'phones',
    price: 105000, condition: 'Brand New', storage: '128GB', color: 'Racing Black',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80'],
    description: 'AMOLED display at a budget price, 50MP camera. Sealed box, full local warranty.',
    stock: 24,
  },
  {
    id: 'kt-ph-007', name: 'Infinix Note 30', brand: 'Infinix', category: 'phones',
    price: 130000, condition: 'Brand New', storage: '128GB', color: 'Interstellar Blue',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80'],
    description: '108MP camera, 68W fast charging, sealed box, full local warranty.',
    stock: 18,
  },
  {
    id: 'kt-ph-108', name: 'Infinix Zero 30', brand: 'Infinix', category: 'phones',
    price: 245000, condition: 'Brand New', storage: '256GB', color: 'Rome Green',
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=900&q=80'],
    description: 'Curved display, 108MP OIS camera with 4K video — Infinix\'s top-tier device. Sealed.',
    stock: 9,
  },

  // ---------------------------------------------------------------
  // ITEL
  // ---------------------------------------------------------------
  {
    id: 'kt-ph-109', name: 'Itel A70', brand: 'Itel', category: 'phones',
    price: 52000, condition: 'Brand New', storage: '64GB', color: 'Glacier Blue',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80'],
    description: 'Our most affordable smartphone — simple, reliable, great for calls, messaging and social apps.',
    stock: 30,
  },
  {
    id: 'kt-ph-110', name: 'Itel S23', brand: 'Itel', category: 'phones',
    price: 78000, condition: 'Brand New', storage: '128GB', color: 'Sunrise Orange',
    image: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=900&q=80'],
    description: 'Large HD+ display and dual camera at an unbeatable price. Sealed, brand new.',
    stock: 26,
  },
];

/* ============================================================
   UNIVERSAL ACCESSORIES — compatible with every phone brand
   listed above (Samsung, iPhone, Tecno, Infinix, Itel).
   ============================================================ */
const ACCESSORIES_DATA = [
  // Screen Protection
  { id: 'kt-acc-01', name: 'Tempered Glass Screen Protector', category: 'Screen Protection', brand: 'Universal', price: 3500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: '9H hardness, fits most phone models — specify model at checkout.', stock: 100 },
  { id: 'kt-acc-02', name: 'Privacy Screen Protector', category: 'Screen Protection', brand: 'Universal', price: 5500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Anti-spy tempered glass — only visible straight-on. Specify model.', stock: 60 },
  { id: 'kt-acc-03', name: 'Camera Lens Protector', category: 'Screen Protection', brand: 'Universal', price: 3000, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Tempered glass ring set that protects your rear camera lenses.', stock: 80 },

  // Cases & Covers
  { id: 'kt-acc-04', name: 'Silicone Back Cover', category: 'Cases & Covers', brand: 'Universal', price: 6500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Shockproof silicone case, multiple colors — specify model at checkout.', stock: 60 },
  { id: 'kt-acc-05', name: 'Clear Transparent Case', category: 'Cases & Covers', brand: 'Universal', price: 5000, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Slim, yellowing-resistant clear case that shows off your phone\'s design.', stock: 70 },
  { id: 'kt-acc-06', name: 'Leather Flip Cover', category: 'Cases & Covers', brand: 'Universal', price: 9500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'PU leather flip case with card slots and stand function. Specify model.', stock: 45 },
  { id: 'kt-acc-07', name: '360° Full Body Case', category: 'Cases & Covers', brand: 'Universal', price: 8500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Front and back coverage with built-in screen protector. Specify model.', stock: 40 },
  { id: 'kt-acc-08', name: 'MagSafe Case', category: 'Cases & Covers', brand: 'Universal', price: 11000, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Magnetic case compatible with MagSafe chargers and mounts (iPhone 12+).', stock: 30 },

  // Charging & Cables
  { id: 'kt-acc-09', name: 'Fast Charger (18W–65W)', category: 'Charging & Cables', brand: 'Universal', price: 12000, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Universal fast charger, USB-C and USB-A options, works with most phones and laptops.', stock: 40 },
  { id: 'kt-acc-10', name: 'Type-C Cable', category: 'Charging & Cables', brand: 'Universal', price: 3500, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Durable braided USB-C cable, 1m, fast charge + data transfer.', stock: 90 },
  { id: 'kt-acc-11', name: 'Lightning Cable', category: 'Charging & Cables', brand: 'Universal', price: 4000, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'MFi-style Lightning cable for iPhone charging and syncing, 1m.', stock: 75 },
  { id: 'kt-acc-12', name: 'Micro USB Cable', category: 'Charging & Cables', brand: 'Universal', price: 2500, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Reliable Micro USB cable for older Android devices and accessories.', stock: 65 },

  // Power
  { id: 'kt-acc-13', name: 'Powerbank 20,000mAh', category: 'Power', brand: 'Universal', price: 22000, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80', description: 'Dual USB output, fast charging, digital battery display.', stock: 35 },
  { id: 'kt-acc-14', name: 'MagSafe Powerbank', category: 'Power', brand: 'Universal', price: 28000, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80', description: 'Magnetic wireless powerbank, snaps to the back of MagSafe-compatible phones.', stock: 20 },

  // Audio
  { id: 'kt-acc-15', name: 'Bluetooth Earbuds', category: 'Audio', brand: 'Universal', price: 18000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80', description: 'Compact true-wireless earbuds with charging case, up to 20hr battery.', stock: 40 },
  { id: 'kt-acc-16', name: 'Wireless Earbuds Pro', category: 'Audio', brand: 'Universal', price: 25000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80', description: 'Active noise cancellation, 30hr battery with case, touch controls.', stock: 30 },
  { id: 'kt-acc-17', name: 'Wired Earphones', category: 'Audio', brand: 'Universal', price: 4500, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80', description: 'In-ear wired earphones with mic, 3.5mm or Type-C — specify on order.', stock: 55 },
  { id: 'kt-acc-18', name: 'Bluetooth Speaker (Portable)', category: 'Audio', brand: 'Universal', price: 32000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80', description: 'Waterproof, 12hr playtime, deep bass. Great for outdoor use.', stock: 20 },
  { id: 'kt-acc-19', name: 'AirPods Case', category: 'Audio', brand: 'Universal', price: 5000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80', description: 'Protective silicone case with carabiner clip for AirPods charging case.', stock: 45 },

  // Mounts & Holders
  { id: 'kt-acc-20', name: 'Phone Stand', category: 'Mounts & Holders', brand: 'Universal', price: 6000, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Adjustable desktop stand, foldable, fits all phone sizes.', stock: 40 },
  { id: 'kt-acc-21', name: 'Phone Holder (Adjustable Arm)', category: 'Mounts & Holders', brand: 'Universal', price: 8500, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Flexible arm holder for bed, desk or tripod mounting.', stock: 25 },
  { id: 'kt-acc-22', name: 'Car Phone Holder', category: 'Mounts & Holders', brand: 'Universal', price: 7500, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Dashboard/vent mount with 360° rotation and one-hand release.', stock: 35 },
  { id: 'kt-acc-23', name: 'Pop Socket', category: 'Mounts & Holders', brand: 'Universal', price: 3000, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Collapsible grip and stand that sticks to the back of your case.', stock: 60 },
  { id: 'kt-acc-24', name: 'Ring Holder', category: 'Mounts & Holders', brand: 'Universal', price: 2500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: '360° rotating finger ring — secure one-hand grip, doubles as a stand.', stock: 70 },

  // Wearables
  { id: 'kt-acc-25', name: 'Smartwatch', category: 'Wearables', brand: 'Universal', price: 35000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', description: 'Fitness tracking, notifications and calls — pairs with Android and iPhone.', stock: 22 },
  { id: 'kt-acc-26', name: 'Smartwatch Straps', category: 'Wearables', brand: 'Universal', price: 5500, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', description: 'Silicone replacement straps, multiple colors and sizes.', stock: 40 },

  // Connectivity & Storage
  { id: 'kt-acc-27', name: 'OTG Adapter', category: 'Connectivity & Storage', brand: 'Universal', price: 2500, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'USB-C or Micro USB to USB-A adapter for flash drives, keyboards & mice.', stock: 50 },
  { id: 'kt-acc-28', name: 'Memory Card (64GB–256GB)', category: 'Connectivity & Storage', brand: 'Universal', price: 9000, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'High-speed microSD card, multiple capacities available.', stock: 45 },

  // Gaming
  { id: 'kt-acc-29', name: 'Gaming Finger Gloves', category: 'Gaming', brand: 'Universal', price: 3000, image: 'https://images.unsplash.com/photo-1522125670776-3c7abb882bc2?auto=format&fit=crop&w=600&q=80', description: 'Anti-sweat, sensitive-touch gaming sleeves — set of 2 for competitive mobile gaming.', stock: 50 },
];
