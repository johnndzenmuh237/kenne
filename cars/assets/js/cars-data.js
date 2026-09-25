/* ============================================================
   KENNE CAR BUSINESS — INVENTORY DATA
   assets/js/cars-data.js
   Demo catalog. Replace with your real inventory (edit this array
   directly, or wire to a real backend/admin panel later).
   ============================================================ */
const CARS_DATA = [
  // ---------------------------------------------------------------
  // RETAIL — single cars, ready to drive away
  // ---------------------------------------------------------------
  {
    id: 'kc-car-1001', name: '2021 Toyota Land Cruiser Prado', category: 'retail', bodyType: 'SUV',
    make: 'Toyota', year: 2021, price: 18500000, mileage: '42,000 km', fuel: 'Diesel', transmission: 'Automatic',
    seats: 7, drivetrain: '4WD', color: 'Pearl White',
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
    seats: 5, drivetrain: 'FWD', color: 'Silver',
    image: 'https://images.unsplash.com/photo-1600191762849-bf8fd13e9dc0?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1600191762849-bf8fd13e9dc0?auto=format&fit=crop&w=900&q=80'],
    description: 'Reliable, fuel-efficient sedan, ideal for daily commuting or ride-hailing business. Clean title, no accidents.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1003', name: '2020 Honda CR-V', category: 'retail', bodyType: 'SUV',
    make: 'Honda', year: 2020, price: 12800000, mileage: '51,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'AWD', color: 'Graphite Black',
    image: 'https://images.unsplash.com/photo-1570761511122-dd6342842496?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1570761511122-dd6342842496?auto=format&fit=crop&w=900&q=80'],
    description: 'Spacious family SUV with excellent safety ratings. Sourced and inspected in China before shipping.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1004', name: '2018 BMW 3 Series', category: 'retail', bodyType: 'Sedan',
    make: 'BMW', year: 2018, price: 11500000, mileage: '73,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'RWD', color: 'Alpine White',
    image: 'https://images.unsplash.com/photo-1596157783429-027a9773431a?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1596157783429-027a9773431a?auto=format&fit=crop&w=900&q=80'],
    description: 'Executive sedan with a well-appointed interior, great condition, priced for quick sale.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1008', name: '2022 Toyota Hilux', category: 'retail', bodyType: 'Pickup',
    make: 'Toyota', year: 2022, price: 21500000, mileage: '18,000 km', fuel: 'Diesel', transmission: 'Manual',
    seats: 5, drivetrain: '4WD', color: 'Bronze',
    image: 'https://images.unsplash.com/photo-1675310534327-1bdab1c9ae0f?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1675310534327-1bdab1c9ae0f?auto=format&fit=crop&w=900&q=80'],
    description: 'Nearly new double-cab pickup — a favorite for businesses and rural use across Cameroon.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1009', name: '2020 Nissan X-Trail', category: 'retail', bodyType: 'SUV',
    make: 'Nissan', year: 2020, price: 13200000, mileage: '46,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 7, drivetrain: 'AWD', color: 'Gun Metallic',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=900&q=80'],
    description: '3-row family SUV with a roomy cabin and low mileage. Ideal for larger households.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1010', name: '2019 Toyota Vitz', category: 'retail', bodyType: 'Hatchback',
    make: 'Toyota', year: 2019, price: 5400000, mileage: '55,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'FWD', color: 'Red',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80'],
    description: 'Compact, easy to park and very economical on fuel — a great first car or city runabout.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1011', name: '2021 Ford Ranger', category: 'retail', bodyType: 'Pickup',
    make: 'Ford', year: 2021, price: 19800000, mileage: '31,000 km', fuel: 'Diesel', transmission: 'Automatic',
    seats: 5, drivetrain: '4WD', color: 'Grey',
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=900&q=80'],
    description: 'Powerful double-cab pickup with strong towing capacity, well suited for construction and logistics work.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1012', name: '2020 Toyota Sienna', category: 'retail', bodyType: 'Minivan',
    make: 'Toyota', year: 2020, price: 15600000, mileage: '39,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 8, drivetrain: 'FWD', color: 'Champagne',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80'],
    description: 'Spacious 8-seat minivan, perfect for large families or airport shuttle operators.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1013', name: '2019 Lexus RX350', category: 'retail', bodyType: 'SUV',
    make: 'Lexus', year: 2019, price: 22500000, mileage: '44,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'AWD', color: 'Obsidian Black',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80'],
    description: 'Luxury SUV with premium leather interior, panoramic roof, and top-tier reliability.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1019', name: '2020 Honda Accord', category: 'retail', bodyType: 'Sedan',
    make: 'Honda', year: 2020, price: 10900000, mileage: '48,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'FWD', color: 'Modern Steel',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80'],
    description: 'Refined midsize sedan with a comfortable ride, strong resale value, and low running costs.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1020', name: '2017 Chevrolet Camaro', category: 'retail', bodyType: 'Coupe',
    make: 'Chevrolet', year: 2017, price: 16500000, mileage: '37,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 4, drivetrain: 'RWD', color: 'Racing Yellow',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80'],
    description: 'Head-turning sports coupe for buyers who want performance and presence in one package.',
    availability: 'In Stock',
  },
  {
    id: 'kc-car-1021', name: '2021 Toyota RAV4', category: 'retail', bodyType: 'Crossover',
    make: 'Toyota', year: 2021, price: 16200000, mileage: '29,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'AWD', color: 'Blueprint',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80'],
    description: 'One of the most sought-after crossovers — great ground clearance, efficient hybrid-ready platform.',
    availability: 'In Stock',
  },

  // ---------------------------------------------------------------
  // WHOLESALE LOT — bulk pricing for dealers & resellers
  // ---------------------------------------------------------------
  {
    id: 'kc-car-1005', name: '2017 Mercedes-Benz C-Class', category: 'wholesale', bodyType: 'Sedan',
    make: 'Mercedes-Benz', year: 2017, price: 9800000, mileage: '89,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'RWD', color: 'Iridium Silver',
    image: 'https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=900&q=80'],
    description: 'Wholesale lot pricing available for bulk buyers/dealers — ask about volume discounts.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1006', name: '2016 Hyundai Elantra', category: 'wholesale', bodyType: 'Sedan',
    make: 'Hyundai', year: 2016, price: 4900000, mileage: '102,000 km', fuel: 'Petrol', transmission: 'Manual',
    seats: 5, drivetrain: 'FWD', color: 'Phantom Black',
    image: 'https://images.unsplash.com/photo-1652717053531-d4ff99d8f60e?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1652717053531-d4ff99d8f60e?auto=format&fit=crop&w=900&q=80'],
    description: 'Budget-friendly wholesale unit, great for resellers and dealership stock.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1007', name: '2015 Kia Sportage', category: 'wholesale', bodyType: 'SUV',
    make: 'Kia', year: 2015, price: 5600000, mileage: '95,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'FWD', color: 'Sand Beige',
    image: 'https://images.unsplash.com/photo-1665059613973-3e0eef25ac0b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1665059613973-3e0eef25ac0b?auto=format&fit=crop&w=900&q=80'],
    description: 'Compact SUV, wholesale pricing, sold as-is with import documents included.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1014', name: '2015 Peugeot 508', category: 'wholesale', bodyType: 'Sedan',
    make: 'Peugeot', year: 2015, price: 4300000, mileage: '118,000 km', fuel: 'Diesel', transmission: 'Manual',
    seats: 5, drivetrain: 'FWD', color: 'Deep Blue',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80'],
    description: 'Diesel-efficient sedan sold at wholesale rate — good for taxi/transport fleets.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1015', name: '2014 Mitsubishi Pajero', category: 'wholesale', bodyType: 'SUV',
    make: 'Mitsubishi', year: 2014, price: 6800000, mileage: '124,000 km', fuel: 'Diesel', transmission: 'Automatic',
    seats: 7, drivetrain: '4WD', color: 'Forest Green',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80'],
    description: 'Rugged 4WD SUV built for tough terrain, sold wholesale with full import paperwork.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1016', name: '2013 Volkswagen Golf', category: 'wholesale', bodyType: 'Hatchback',
    make: 'Volkswagen', year: 2013, price: 3600000, mileage: '135,000 km', fuel: 'Petrol', transmission: 'Manual',
    seats: 5, drivetrain: 'FWD', color: 'Tornado Red',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80'],
    description: 'Entry-level wholesale hatchback, ideal for resellers targeting first-time car buyers.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1017', name: '2012 Nissan Note', category: 'wholesale', bodyType: 'Hatchback',
    make: 'Nissan', year: 2012, price: 2900000, mileage: '148,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'FWD', color: 'White',
    image: 'https://images.unsplash.com/photo-1519030129379-2b6f2b6f6fb1?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1519030129379-2b6f2b6f6fb1?auto=format&fit=crop&w=900&q=80'],
    description: 'Very affordable wholesale compact — one of our fastest-moving units for dealers.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1018', name: '2014 Toyota Avensis', category: 'wholesale', bodyType: 'Sedan',
    make: 'Toyota', year: 2014, price: 4700000, mileage: '128,000 km', fuel: 'Diesel', transmission: 'Manual',
    seats: 5, drivetrain: 'FWD', color: 'Graphite',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80'],
    description: 'Dependable diesel sedan at wholesale price — a solid option for fleet resale.',
    availability: 'Wholesale Lot',
  },
  {
    id: 'kc-car-1022', name: '2016 Mazda CX-5', category: 'wholesale', bodyType: 'Crossover',
    make: 'Mazda', year: 2016, price: 7400000, mileage: '99,000 km', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'AWD', color: 'Soul Red',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=900&q=80'],
    description: 'Sporty, well-built crossover sold wholesale — strong demand from resellers.',
    availability: 'Wholesale Lot',
  },

  // ---------------------------------------------------------------
  // RENTALS — self-drive or with a driver, priced per day
  // ---------------------------------------------------------------
  {
    id: 'kc-rent-2001', name: 'Toyota Camry — Self Drive / With Driver', category: 'rental', bodyType: 'Sedan',
    make: 'Toyota', year: 2020, price: 35000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'FWD', color: 'Silver',
    image: 'https://images.unsplash.com/photo-1733145800960-f3601731a85b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1733145800960-f3601731a85b?auto=format&fit=crop&w=900&q=80'],
    description: 'Comfortable sedan available for daily or weekly rental, self-drive or with a driver.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2002', name: 'Toyota Land Cruiser — Airport & Events', category: 'rental', bodyType: 'SUV',
    make: 'Toyota', year: 2021, price: 65000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Automatic',
    seats: 7, drivetrain: '4WD', color: 'Black',
    image: 'https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=900&q=80'],
    description: 'Premium SUV rental — ideal for weddings, airport transfers, and executive travel.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2003', name: 'Hyundai Accent — City Rental', category: 'rental', bodyType: 'Sedan',
    make: 'Hyundai', year: 2019, price: 22000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Manual',
    seats: 5, drivetrain: 'FWD', color: 'Red',
    image: 'https://images.unsplash.com/photo-1658591644952-435da4b3c124?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1658591644952-435da4b3c124?auto=format&fit=crop&w=900&q=80'],
    description: 'Economical daily rental for getting around Douala or Yaoundé.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2004', name: 'Toyota Hiace — Group & Event Transport', category: 'rental', bodyType: 'Van',
    make: 'Toyota', year: 2018, price: 55000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Manual',
    seats: 14, drivetrain: 'RWD', color: 'White',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=900&q=80'],
    description: '14-seat van rental, perfect for group travel, church events, and staff transport.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2005', name: 'Kia Picanto — Economy City Rental', category: 'rental', bodyType: 'Hatchback',
    make: 'Kia', year: 2020, price: 18000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Automatic',
    seats: 4, drivetrain: 'FWD', color: 'Yellow',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80'],
    description: 'Our cheapest daily rental — small, easy to park and very economical, self-drive only.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2006', name: 'Toyota Fortuner — SUV Self-Drive / Driver', category: 'rental', bodyType: 'SUV',
    make: 'Toyota', year: 2021, price: 60000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Automatic',
    seats: 7, drivetrain: '4WD', color: 'Grey',
    image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=900&q=80'],
    description: 'Rugged, comfortable SUV rental — good for out-of-town trips and rough roads.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2007', name: 'Mercedes-Benz E-Class — VIP / Executive', category: 'rental', bodyType: 'Sedan',
    make: 'Mercedes-Benz', year: 2020, price: 95000, priceUnit: '/ day', mileage: '—', fuel: 'Petrol', transmission: 'Automatic',
    seats: 5, drivetrain: 'RWD', color: 'Black',
    image: 'https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1589261419091-7e9610a479f8?auto=format&fit=crop&w=900&q=80'],
    description: 'VIP executive sedan with driver — for high-profile guests, dignitaries and conferences.',
    availability: 'Available',
  },
  {
    id: 'kc-rent-2008', name: 'Toyota Coaster — 30-Seat Bus', category: 'rental', bodyType: 'Bus',
    make: 'Toyota', year: 2017, price: 120000, priceUnit: '/ day', mileage: '—', fuel: 'Diesel', transmission: 'Manual',
    seats: 30, drivetrain: 'RWD', color: 'White',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=700&q=80',
    gallery: ['https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80'],
    description: '30-seat bus with driver included — built for weddings, conferences, school and staff transport.',
    availability: 'Available',
  },
];

/* ============================================================
   CAR PARTS & ACCESSORIES DATA
   Every listed part is in stock and available for order.
   ============================================================ */
const CAR_PARTS_DATA = [
  // Brakes
  { id: 'kc-part-01', name: 'Brake Pad Set (Front)', category: 'Brakes', price: 28000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80', description: 'Universal fit brake pad set, fits most Toyota/Honda sedans.' },
  { id: 'kc-part-09', name: 'Brake Disc / Rotor (Pair)', category: 'Brakes', price: 42000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80', description: 'Ventilated front brake discs, OEM-equivalent, most sedan and SUV models.' },
  { id: 'kc-part-10', name: 'Brake Caliper', category: 'Brakes', price: 38000, image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80', description: 'Remanufactured brake caliper, tested and ready to install.' },

  // Electrical
  { id: 'kc-part-02', name: 'Car Battery 12V 65Ah', category: 'Electrical', price: 65000, image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=80', description: 'Maintenance-free 12V battery, 2-year warranty.' },
  { id: 'kc-part-11', name: 'Alternator', category: 'Electrical', price: 72000, image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=80', description: 'Rebuilt alternator, fits most 4-cylinder petrol engines.' },
  { id: 'kc-part-12', name: 'Starter Motor', category: 'Electrical', price: 58000, image: 'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=80', description: 'Reliable starter motor, tested before dispatch, 6-month warranty.' },

  // Body & Exterior
  { id: 'kc-part-03', name: 'Alloy Wheel Rim 17"', category: 'Body & Exterior', price: 95000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'Set of 1, lightweight alloy rim, multiple bolt patterns available.' },
  { id: 'kc-part-13', name: 'Side Mirror Assembly', category: 'Body & Exterior', price: 26000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'Power-fold side mirror with integrated turn signal, driver or passenger side.' },
  { id: 'kc-part-14', name: 'Windshield Wiper Blades (Pair)', category: 'Body & Exterior', price: 9500, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'All-weather wiper blades, multiple sizes in stock.' },
  { id: 'kc-part-15', name: 'Car Wax & Polish Kit', category: 'Body & Exterior', price: 15000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'Full exterior wax, polish and microfiber cloth kit for a showroom finish.' },

  // Engine
  { id: 'kc-part-04', name: 'Full Synthetic Engine Oil (5L)', category: 'Engine', price: 32000, image: 'https://images.unsplash.com/photo-1635784063388-1ff609e4faed?auto=format&fit=crop&w=600&q=80', description: '5W-30 full synthetic, suitable for most petrol engines.' },
  { id: 'kc-part-16', name: 'Engine Air Filter', category: 'Engine', price: 12000, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80', description: 'Direct-fit air filter, improves airflow and fuel efficiency.' },
  { id: 'kc-part-17', name: 'Oil Filter', category: 'Engine', price: 6500, image: 'https://images.unsplash.com/photo-1635784063388-1ff609e4faed?auto=format&fit=crop&w=600&q=80', description: 'Standard spin-on oil filter, fits most Toyota/Honda/Nissan engines.' },
  { id: 'kc-part-18', name: 'Fuel Filter', category: 'Engine', price: 11000, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80', description: 'Keeps fuel injectors clean — recommend replacing every 20,000 km.' },
  { id: 'kc-part-19', name: 'Spark Plug Set (4pc)', category: 'Engine', price: 14000, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80', description: 'Iridium spark plugs, set of 4, improved ignition and fuel economy.' },
  { id: 'kc-part-20', name: 'Timing Belt Kit', category: 'Engine', price: 45000, image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80', description: 'Complete kit with belt, tensioner and idler pulley.' },

  // Interior & Accessories
  { id: 'kc-part-06', name: 'Car Seat Cover Set (Leather)', category: 'Interior & Accessories', price: 55000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', description: 'Universal fit premium leatherette seat covers, full set.' },
  { id: 'kc-part-21', name: 'Floor Mats Set (4pc)', category: 'Interior & Accessories', price: 18000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', description: 'Heavy-duty rubber floor mats, easy to clean, all-weather.' },
  { id: 'kc-part-22', name: 'Steering Wheel Cover', category: 'Interior & Accessories', price: 8000, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', description: 'Non-slip leather-texture steering wheel cover, universal size.' },

  // Suspension
  { id: 'kc-part-07', name: 'Shock Absorber (Pair)', category: 'Suspension', price: 78000, image: 'https://images.unsplash.com/photo-1486684228984-a4149ea56ee4?auto=format&fit=crop&w=600&q=80', description: 'Front pair, OEM-equivalent quality, most sedan models.' },
  { id: 'kc-part-23', name: 'Control Arm', category: 'Suspension', price: 34000, image: 'https://images.unsplash.com/photo-1486684228984-a4149ea56ee4?auto=format&fit=crop&w=600&q=80', description: 'Front lower control arm with bushings pre-installed.' },
  { id: 'kc-part-24', name: 'Strut Mount', category: 'Suspension', price: 21000, image: 'https://images.unsplash.com/photo-1486684228984-a4149ea56ee4?auto=format&fit=crop&w=600&q=80', description: 'Reduces noise and vibration from worn suspension mounts.' },

  // Tires & Wheels
  { id: 'kc-part-25', name: 'All-Season Tire 205/55R16', category: 'Tires & Wheels', price: 48000, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80', description: 'Single tire, good tread life, suited to Cameroon road conditions.' },
  { id: 'kc-part-26', name: 'Full-Size Spare Tire', category: 'Tires & Wheels', price: 52000, image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80', description: 'Full-size spare with rim, ready to mount, several sizes available.' },
  { id: 'kc-part-27', name: 'Wheel Nuts Set (20pc)', category: 'Tires & Wheels', price: 9000, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80', description: 'Chrome-finish wheel nuts, set of 20, standard thread.' },

  // Lighting
  { id: 'kc-part-05', name: 'LED Headlight Set', category: 'Lighting', price: 48000, image: 'https://images.unsplash.com/photo-1592805723040-8e37d5b90311?auto=format&fit=crop&w=600&q=80', description: 'Bright white LED conversion kit, plug-and-play install.' },
  { id: 'kc-part-28', name: 'Fog Light Set', category: 'Lighting', price: 22000, image: 'https://images.unsplash.com/photo-1592805723040-8e37d5b90311?auto=format&fit=crop&w=600&q=80', description: 'Front fog light pair with wiring harness, improves visibility in rain/fog.' },
  { id: 'kc-part-29', name: 'Tail Light Assembly', category: 'Lighting', price: 31000, image: 'https://images.unsplash.com/photo-1592805723040-8e37d5b90311?auto=format&fit=crop&w=600&q=80', description: 'Direct-fit rear tail light, left or right side.' },

  // Cooling & Fluids
  { id: 'kc-part-08', name: 'Radiator Coolant (5L)', category: 'Cooling & Fluids', price: 18000, image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7692?auto=format&fit=crop&w=600&q=80', description: 'Long-life coolant concentrate, mixes 1:1 with water.' },
  { id: 'kc-part-30', name: 'Radiator', category: 'Cooling & Fluids', price: 62000, image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7692?auto=format&fit=crop&w=600&q=80', description: 'Aluminum core radiator, direct fit, prevents overheating.' },
  { id: 'kc-part-31', name: 'Brake Fluid (1L)', category: 'Cooling & Fluids', price: 6000, image: 'https://images.unsplash.com/photo-1632823469850-1b7b1e8b7692?auto=format&fit=crop&w=600&q=80', description: 'DOT 4 brake fluid, suitable for most passenger vehicles.' },
  { id: 'kc-part-32', name: 'Transmission Fluid (4L)', category: 'Cooling & Fluids', price: 26000, image: 'https://images.unsplash.com/photo-1635784063388-1ff609e4faed?auto=format&fit=crop&w=600&q=80', description: 'ATF transmission fluid for automatic gearboxes.' },
];
