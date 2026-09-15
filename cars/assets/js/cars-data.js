/* ============================================================
   KENNE CAR BUSINESS — INVENTORY DATA
   assets/js/cars-data.js
   Demo catalog. Replace with your real inventory (edit this array
   directly, or wire to a real backend/admin panel later).
   ============================================================ */
const CARS_DATA = [
  {
    id: 'kc-car-1001', name: '2021 Toyota Land Cruiser Prado', category: 'retail', bodyType: 'SUV',
    make: 'Toyota', year: 2021, price: 18500000, mileage: '42,000 km', fuel: 'Diesel', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1580537782693-31d4dd6f2a3d?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580537782693-31d4dd6f2a3d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1498887960847-2a5e46312788?auto=format&fit=crop&w=900&q=80',
    ],
    description: 'A well-maintained Prado imported directly from China, full service history, ready for immediate delivery in Douala.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1002', name: '2019 Toyota Corolla', category: 'retail', bodyType: 'Sedan',
    make: 'Toyota', year: 2019, price: 7200000, mileage: '68,000 km', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1600191762849-bf8fd13e9dc0?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1600191762849-bf8fd13e9dc0?auto=format&fit=crop&w=900&q=80'],
    description: 'Reliable, fuel-efficient sedan, ideal for daily commuting or ride-hailing business. Clean title, no accidents.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1003', name: '2020 Honda CR-V', category: 'retail', bodyType: 'SUV',
    make: 'Honda', year: 2020, price: 12800000, mileage: '51,000 km', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1570761511122-dd6342842496?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1570761511122-dd6342842496?auto=format&fit=crop&w=900&q=80'],
    description: 'Spacious family SUV with excellent safety ratings. Sourced and inspected in China before shipping.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1004', name: '2018 BMW 3 Series', category: 'retail', bodyType: 'Sedan',
    make: 'BMW', year: 2018, price: 11500000, mileage: '73,000 km', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1596157783429-027a9773431a?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1596157783429-027a9773431a?auto=format&fit=crop&w=900&q=80'],
    description: 'Executive sedan with a well-appointed interior, great condition, priced for quick sale.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1005', name: '2017 Mercedes-Benz C-Class', category: 'wholesale', bodyType: 'Sedan',
    make: 'Mercedes-Benz', year: 2017, price: 9800000, mileage: '89,000 km', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=900&q=80'],
    description: 'Wholesale lot pricing available for bulk buyers/dealers — ask about volume discounts.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1006', name: '2016 Hyundai Elantra', category: 'wholesale', bodyType: 'Sedan',
    make: 'Hyundai', year: 2016, price: 4900000, mileage: '102,000 km', fuel: 'Petrol', transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1652717053531-d4ff99d8f60e?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1652717053531-d4ff99d8f60e?auto=format&fit=crop&w=900&q=80'],
    description: 'Budget-friendly wholesale unit, great for resellers and dealership stock.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1007', name: '2015 Kia Sportage', category: 'wholesale', bodyType: 'SUV',
    make: 'Kia', year: 2015, price: 5600000, mileage: '95,000 km', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1665059613973-3e0eef25ac0b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1665059613973-3e0eef25ac0b?auto=format&fit=crop&w=900&q=80'],
    description: 'Compact SUV, wholesale pricing, sold as-is with import documents included.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1008', name: '2022 Toyota Hilux', category: 'retail', bodyType: 'Pickup',
    make: 'Toyota', year: 2022, price: 21500000, mileage: '18,000 km', fuel: 'Diesel', transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1675310534327-1bdab1c9ae0f?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1675310534327-1bdab1c9ae0f?auto=format&fit=crop&w=900&q=80'],
    description: 'Nearly new double-cab pickup — a favorite for businesses and rural use across Cameroon.',
    availability: 'In Stock',
  },
  {
    id: 'kc-rent-2001', name: 'Toyota Camry — Self Drive / With Driver', category: 'rental', bodyType: 'Sedan',
    make: 'Toyota', year: 2020, price: 35000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1733145800960-f3601731a85b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1733145800960-f3601731a85b?auto=format&fit=crop&w=900&q=80'],
    description: 'Comfortable sedan available for daily or weekly rental, self-drive or with a driver.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2002', name: 'Toyota Land Cruiser — Airport & Events', category: 'rental', bodyType: 'SUV',
    make: 'Toyota', year: 2021, price: 65000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Automatic',
    image: 'https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=900&q=80'],
    description: 'Premium SUV rental — ideal for weddings, airport transfers, and executive travel.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2003', name: 'Hyundai Accent — City Rental', category: 'rental', bodyType: 'Sedan',
    make: 'Hyundai', year: 2019, price: 22000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1658591644952-435da4b3c124?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1658591644952-435da4b3c124?auto=format&fit=crop&w=900&q=80'],
    description: 'Economical daily rental for getting around Douala or Yaoundé.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2004', name: 'Toyota Hiace — Group & Event Transport', category: 'rental', bodyType: 'Van',
    make: 'Toyota', year: 2018, price: 55000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80'],
    description: '14-seat van rental, perfect for group travel, church events, and staff transport.',
    availability: 'Available',
  },
];

const CAR_PARTS_DATA = [
  { id: 'kc-part-01', name: 'Brake Pad Set (Front)', category: 'Brakes', price: 28000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80', description: 'Universal fit brake pad set, fits most Toyota/Honda sedans.' },
  { id: 'kc-part-02', name: 'Car Battery 12V 65Ah', category: 'Electrical', price: 65000, image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=80', description: 'Maintenance-free 12V battery, 2-year warranty.' },
  { id: 'kc-part-03', name: 'Alloy Wheel Rim 17"', category: 'Body & Exterior', price: 95000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'Set of 1, lightweight alloy rim, multiple bolt patterns available.' },
  { id: 'kc-part-04', name: 'Full Synthetic Engine Oil (5L)', category: 'Engine', price: 32000, image: 'https://images.unsplash.com/photo-1635784063388-1ff609e4faed?auto=format&fit=crop&w=600&q=80', description: '5W-30 full synthetic, suitable for most petrol engines.' },
  { id: 'kc-part-05', name: 'LED Headlight Set', category: 'Electrical', price: 48000, image: 'https://images.unsplash.com/photo-1592805723040-8e37d5b90311?auto=format&fit=crop&w=600&q=80', description: 'Bright white LED conversion kit, plug-and-play install.' },
  { id: 'kc-part-06', name: 'Car Seat Cover Set (Leather)', category: 'Interior & Accessories', price: 55000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', description: 'Universal fit premium leatherette seat covers, full set.' },
  { id: 'kc-part-07', name: 'Shock Absorber (Pair)', category: 'Suspension', price: 78000, image: 'https://images.unsplash.com/photo-1486684228984-a4149ea56ee4?auto=format&fit=crop&w=600&q=80', description: 'Front pair, OEM-equivalent quality, most sedan models.' },
  { id: 'kc-part-08', name: 'Radiator Coolant (5L)', category: 'Engine', price: 18000, image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7692?auto=format&fit=crop&w=600&q=80', description: 'Long-life coolant concentrate, mixes 1:1 with water.' },
];
