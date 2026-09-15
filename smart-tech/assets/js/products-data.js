/* ============================================================
   KENNE SMART TECHNOLOGY — PRODUCT DATA
   assets/js/products-data.js
   Demo catalog. Replace with your real stock (edit this array
   directly, or wire to a real backend/admin panel later).
   ============================================================ */
const PRODUCTS_DATA = [
  {
    id: 'kt-ph-001', name: 'iPhone 15 Pro Max — 256GB', brand: 'Apple', category: 'phones',
    price: 895000, condition: 'Brand New', storage: '256GB', color: 'Titanium Blue',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80'],
    description: 'Sealed, brand new, full manufacturer warranty. A17 Pro chip, titanium frame, 48MP camera system.',
    stock: 6,
  },
  {
    id: 'kt-ph-002', name: 'Samsung Galaxy S23 Ultra — 256GB', brand: 'Samsung', category: 'phones',
    price: 720000, condition: 'Brand New', storage: '256GB', color: 'Phantom Black',
    image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1592890288564-76628a30a657?auto=format&fit=crop&w=900&q=80'],
    description: 'S-Pen included, 200MP camera, 5000mAh battery. Sealed box, full warranty.',
    stock: 8,
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
    id: 'kt-ph-004', name: 'Samsung Galaxy A54', brand: 'Samsung', category: 'phones',
    price: 210000, condition: 'Brand New', storage: '128GB', color: 'Awesome Lime',
    image: 'https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1634403665481-74948d815f03?auto=format&fit=crop&w=900&q=80'],
    description: 'Mid-range powerhouse with a 50MP camera and all-day battery. Sealed, brand new.',
    stock: 15,
  },
  {
    id: 'kt-ph-005', name: 'iPhone 11 — 64GB', brand: 'Apple', category: 'phones',
    price: 195000, condition: 'UK Used — Good', storage: '64GB', color: 'Black',
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80'],
    description: 'Reliable and affordable, tested and unlocked for any network. Minor cosmetic wear.',
    stock: 20,
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
    id: 'kt-ph-007', name: 'Infinix Note 30', brand: 'Infinix', category: 'phones',
    price: 130000, condition: 'Brand New', storage: '128GB', color: 'Interstellar Blue',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=80'],
    description: '108MP camera, 68W fast charging, sealed box, full local warranty.',
    stock: 18,
  },
  {
    id: 'kt-ph-008', name: 'iPhone 14 Pro — 256GB', brand: 'Apple', category: 'phones',
    price: 650000, condition: 'Brand New', storage: '256GB', color: 'Deep Purple',
    image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=900&q=80'],
    description: 'Dynamic Island, A16 Bionic, 48MP Pro camera system. Sealed, full warranty.',
    stock: 5,
  },
];

const ACCESSORIES_DATA = [
  { id: 'kt-acc-01', name: 'Fast Charger 65W (USB-C)', brand: 'Generic', category: 'accessories', price: 12000, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80', description: 'Universal 65W GaN fast charger, USB-C, works with most phones and laptops.', stock: 40 },
  { id: 'kt-acc-02', name: 'Wireless Earbuds Pro', brand: 'Generic', category: 'accessories', price: 25000, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80', description: 'Active noise cancellation, 30hr battery with case, touch controls.', stock: 30 },
  { id: 'kt-acc-03', name: 'Tempered Glass Screen Protector', brand: 'Generic', category: 'accessories', price: 3500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: '9H hardness, fits most phone models — specify model at checkout.', stock: 100 },
  { id: 'kt-acc-04', name: '20000mAh Power Bank', brand: 'Generic', category: 'accessories', price: 22000, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=600&q=80', description: 'Dual USB output, fast charging, digital battery display.', stock: 35 },
  { id: 'kt-acc-05', name: 'Silicone Phone Case', brand: 'Generic', category: 'accessories', price: 6500, image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80', description: 'Shockproof silicone case, multiple colors — specify model at checkout.', stock: 60 },
  { id: 'kt-acc-06', name: 'Bluetooth Speaker (Portable)', brand: 'Generic', category: 'accessories', price: 32000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80', description: 'Waterproof, 12hr playtime, deep bass. Great for outdoor use.', stock: 20 },
];
