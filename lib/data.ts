export type Category = 'groceries' | 'household' | 'pharmacy' | 'electronics' | 'appliances' | 'furniture' | 'gaming' | 'petrol';

export type Shop = {
  id: string;
  name: string;
  logo: string;
  color: string;
  locations: { lat: number; lng: number; address: string }[];
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  image?: string;
  tags?: string[];
  prices: { shopId: string; price: number; inStock?: boolean }[];
};

const placeholderColors: Record<Category, string> = {
  groceries: '#d1fae5',
  household: '#dbeafe',
  pharmacy: '#fee2e2',
  electronics: '#ede9fe',
  appliances: '#ffedd5',
  furniture: '#fef3c7',
  gaming: '#e0f2fe',
  petrol: '#f5f3ff'
};

const placeholderTextColor: Record<Category, string> = {
  groceries: '#065f46',
  household: '#1e3a8a',
  pharmacy: '#991b1b',
  electronics: '#3730a3',
  appliances: '#c2410c',
  furniture: '#92400e',
  gaming: '#0c4a6e',
  petrol: '#431c5d'
};

const createPlaceholderImage = (brand: string, category: Category) => {
  const bg = placeholderColors[category] ?? '#e5e7eb';
  const fg = placeholderTextColor[category] ?? '#111827';
  const initial = brand.charAt(0).toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="${bg}" />
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="80" font-weight="700" fill="${fg}">${initial}</text>
      <text x="50%" y="80%" dominant-baseline="middle" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="24" fill="${fg}">${brand}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const shops: Shop[] = [
  { id: 'tesco', name: 'Tesco', logo: 'https://www.tesco.com/favicon.ico', color: '#00539f', locations: [{ lat: 51.455, lng: -0.19, address: 'SW18 1TH' }] },
  { id: 'asda', name: 'Asda', logo: 'https://www.asda.com/favicon.ico', color: '#78be20', locations: [{ lat: 51.46, lng: -0.18, address: 'SW18 4AU' }] },
  { id: 'sainsburys', name: "Sainsbury's", logo: 'https://www.sainsburys.co.uk/favicon.ico', color: '#f06c00', locations: [{ lat: 51.45, lng: -0.2, address: 'SW18 2SS' }] },
  { id: 'currys', name: 'Currys', logo: 'https://www.currys.co.uk/favicon.ico', color: '#4c12a1', locations: [{ lat: 51.44, lng: -0.17, address: 'SW17 0BA' }] },
  { id: 'amazon', name: 'Amazon', logo: 'https://www.amazon.co.uk/favicon.ico', color: '#232f3e', locations: [] },
  { id: 'john-lewis', name: 'John Lewis', logo: 'https://www.johnlewis.com/favicon.ico', color: '#333333', locations: [{ lat: 51.49, lng: -0.14, address: 'SW1E 5NN' }] }
];

export const products: Product[] = [
  // Existing products
  { id: 'g1', name: 'Baked Beans 415g', brand: 'Heinz', category: 'groceries', image: createPlaceholderImage('Heinz', 'groceries'), prices: [{ shopId: 'tesco', price: 1.40 }, { shopId: 'asda', price: 1.00 }] },
  { id: 'g2', name: 'Tomato Soup 400g', brand: 'Heinz', category: 'groceries', image: createPlaceholderImage('Heinz', 'groceries'), prices: [{ shopId: 'tesco', price: 1.20 }, { shopId: 'sainsburys', price: 1.50 }] },
  { id: 'g3', name: 'Mayonnaise 430ml', brand: 'Hellmanns', category: 'groceries', image: createPlaceholderImage('Hellmanns', 'groceries'), prices: [{ shopId: 'tesco', price: 2.50 }, { shopId: 'asda', price: 2.00 }] },
  { id: 'e1', name: 'iPhone 16 128GB', brand: 'Apple', category: 'electronics', image: createPlaceholderImage('Apple', 'electronics'), prices: [{ shopId: 'john-lewis', price: 799 }, { shopId: 'amazon', price: 789 }] },
  { id: 'e2', name: '55" QLED TV', brand: 'Samsung', category: 'electronics', image: createPlaceholderImage('Samsung', 'electronics'), prices: [{ shopId: 'currys', price: 799 }, { shopId: 'amazon', price: 749 }] },

  // New groceries
  { id: 'g4', name: 'Tomato Soup 400g', brand: 'Heinz', category: 'groceries', image: createPlaceholderImage('Heinz', 'groceries'), prices: [{ shopId: 'tesco', price: 1.20 }, { shopId: 'asda', price: 1.10 }, { shopId: 'sainsburys', price: 1.15 }] },
  { id: 'g5', name: 'Cup a Soup Chicken 4pk', brand: 'Batchelors', category: 'groceries', image: createPlaceholderImage('Batchelors', 'groceries'), prices: [{ shopId: 'tesco', price: 1.80 }, { shopId: 'asda', price: 1.60 }, { shopId: 'sainsburys', price: 1.75 }] },
  { id: 'g6', name: 'Pot Noodle Chicken 85g', brand: 'Pot Noodle', category: 'groceries', image: createPlaceholderImage('Pot Noodle', 'groceries'), prices: [{ shopId: 'tesco', price: 0.80 }, { shopId: 'asda', price: 0.75 }, { shopId: 'sainsburys', price: 0.85 }] },
  { id: 'g7', name: 'Original Spread 500g', brand: 'Flora', category: 'groceries', image: createPlaceholderImage('Flora', 'groceries'), prices: [{ shopId: 'tesco', price: 2.20 }, { shopId: 'asda', price: 2.00 }, { shopId: 'sainsburys', price: 2.25 }] },
  { id: 'g8', name: 'Spreadable Butter 500g', brand: 'Anchor', category: 'groceries', image: createPlaceholderImage('Anchor', 'groceries'), prices: [{ shopId: 'tesco', price: 2.50 }, { shopId: 'asda', price: 2.30 }, { shopId: 'sainsburys', price: 2.45 }] },
  { id: 'g9', name: 'Apple Juice 1L', brand: 'Tropicana', category: 'groceries', image: createPlaceholderImage('Tropicana', 'groceries'), prices: [{ shopId: 'tesco', price: 1.80 }, { shopId: 'asda', price: 1.60 }, { shopId: 'sainsburys', price: 1.75 }] },
  { id: 'g10', name: 'Orange Mango Smoothie 250ml', brand: 'Innocent', category: 'groceries', image: createPlaceholderImage('Innocent', 'groceries'), prices: [{ shopId: 'tesco', price: 1.50 }, { shopId: 'asda', price: 1.40 }, { shopId: 'sainsburys', price: 1.45 }] },
  { id: 'g11', name: 'Strawberry Yoghurt 150g', brand: 'Muller Corner', category: 'groceries', image: createPlaceholderImage('Muller Corner', 'groceries'), prices: [{ shopId: 'tesco', price: 0.90 }, { shopId: 'asda', price: 0.80 }, { shopId: 'sainsburys', price: 0.85 }] },
  { id: 'g12', name: 'Natural Yoghurt 500g', brand: 'Activia', category: 'groceries', image: createPlaceholderImage('Activia', 'groceries'), prices: [{ shopId: 'tesco', price: 1.60 }, { shopId: 'asda', price: 1.50 }, { shopId: 'sainsburys', price: 1.55 }] },
  { id: 'g13', name: 'Thick Sausages 454g', brand: 'Richmond', category: 'groceries', image: createPlaceholderImage('Richmond', 'groceries'), prices: [{ shopId: 'tesco', price: 3.20 }, { shopId: 'asda', price: 2.80 }, { shopId: 'sainsburys', price: 3.00 }] },
  { id: 'g14', name: 'Mince 500g', brand: 'Quorn', category: 'groceries', image: createPlaceholderImage('Quorn', 'groceries'), prices: [{ shopId: 'tesco', price: 2.50 }, { shopId: 'asda', price: 2.30 }, { shopId: 'sainsburys', price: 2.45 }] },
  { id: 'g15', name: 'Microwave Rice 250g', brand: 'Uncle Bens', category: 'groceries', image: createPlaceholderImage('Uncle Bens', 'groceries'), prices: [{ shopId: 'tesco', price: 1.20 }, { shopId: 'asda', price: 1.10 }, { shopId: 'sainsburys', price: 1.15 }] },
  { id: 'g16', name: 'Tikka Masala Sauce 450g', brand: 'Sharwoods', category: 'groceries', image: createPlaceholderImage('Sharwoods', 'groceries'), prices: [{ shopId: 'tesco', price: 1.80 }, { shopId: 'asda', price: 1.60 }, { shopId: 'sainsburys', price: 1.75 }] },

  // Household cleaning
  { id: 'h1', name: 'Concentrated Disinfectant 500ml', brand: 'Zoflora', category: 'household', image: createPlaceholderImage('Zoflora', 'household'), prices: [{ shopId: 'tesco', price: 2.50 }, { shopId: 'asda', price: 2.20 }, { shopId: 'sainsburys', price: 2.40 }] },
  { id: 'h2', name: 'Power Plus Toilet Cleaner 750ml', brand: 'Harpic', category: 'household', image: createPlaceholderImage('Harpic', 'household'), prices: [{ shopId: 'tesco', price: 1.80 }, { shopId: 'asda', price: 1.60 }, { shopId: 'sainsburys', price: 1.75 }] },
  { id: 'h3', name: 'Spring Awakening Fabric Softener 1.5L', brand: 'Lenor', category: 'household', image: createPlaceholderImage('Lenor', 'household'), prices: [{ shopId: 'tesco', price: 3.50 }, { shopId: 'asda', price: 3.20 }, { shopId: 'sainsburys', price: 3.40 }] },
  { id: 'h4', name: 'Original Kitchen Roll 6 pack', brand: 'Plenty', category: 'household', image: createPlaceholderImage('Plenty', 'household'), prices: [{ shopId: 'tesco', price: 2.80 }, { shopId: 'asda', price: 2.50 }, { shopId: 'sainsburys', price: 2.70 }] },
  { id: 'h5', name: 'Glass Cleaner 500ml', brand: 'Windolene', category: 'household', image: createPlaceholderImage('Windolene', 'household'), prices: [{ shopId: 'tesco', price: 1.50 }, { shopId: 'asda', price: 1.30 }, { shopId: 'sainsburys', price: 1.45 }] },

  // Pharmacy
  { id: 'p1', name: 'All in One Cold Tablets 24pk', brand: 'Beechams', category: 'pharmacy', image: createPlaceholderImage('Beechams', 'pharmacy'), prices: [{ shopId: 'tesco', price: 4.50 }, { shopId: 'asda', price: 4.20 }, { shopId: 'sainsburys', price: 4.40 }] },
  { id: 'p2', name: 'Night Nurse Liquid 160ml', brand: 'Night Nurse', category: 'pharmacy', image: createPlaceholderImage('Night Nurse', 'pharmacy'), prices: [{ shopId: 'tesco', price: 8.50 }, { shopId: 'asda', price: 8.00 }, { shopId: 'sainsburys', price: 8.30 }] },
  { id: 'p3', name: 'Gaviscon Original Liquid 300ml', brand: 'Gaviscon', category: 'pharmacy', image: createPlaceholderImage('Gaviscon', 'pharmacy'), prices: [{ shopId: 'tesco', price: 6.20 }, { shopId: 'asda', price: 5.80 }, { shopId: 'sainsburys', price: 6.00 }] },
  { id: 'p4', name: 'Thrush Cream 20g', brand: 'Canesten', category: 'pharmacy', image: createPlaceholderImage('Canesten', 'pharmacy'), prices: [{ shopId: 'tesco', price: 2.80 }, { shopId: 'asda', price: 2.60 }, { shopId: 'sainsburys', price: 2.70 }] },
  { id: 'p5', name: 'VapoRub 50g', brand: 'Vicks', category: 'pharmacy', image: createPlaceholderImage('Vicks', 'pharmacy'), prices: [{ shopId: 'tesco', price: 4.50 }, { shopId: 'asda', price: 4.20 }, { shopId: 'sainsburys', price: 4.40 }] },
  { id: 'p6', name: 'Refreshing Eye Drops 10ml', brand: 'Optrex', category: 'pharmacy', image: createPlaceholderImage('Optrex', 'pharmacy'), prices: [{ shopId: 'tesco', price: 5.50 }, { shopId: 'asda', price: 5.20 }, { shopId: 'sainsburys', price: 5.40 }] },

  // Big purchases - electronics/appliances
  { id: 'e3', name: '55" QLED TV', brand: 'Samsung', category: 'electronics', image: createPlaceholderImage('Samsung', 'electronics'), prices: [{ shopId: 'currys', price: 799 }, { shopId: 'john-lewis', price: 829 }, { shopId: 'amazon', price: 749 }] },
  { id: 'e4', name: '65" OLED TV', brand: 'LG', category: 'electronics', image: createPlaceholderImage('LG', 'electronics'), prices: [{ shopId: 'currys', price: 1299 }, { shopId: 'john-lewis', price: 1329 }, { shopId: 'amazon', price: 1249 }] },
  { id: 'e5', name: 'iPhone 16 128GB', brand: 'Apple', category: 'electronics', image: createPlaceholderImage('Apple', 'electronics'), prices: [{ shopId: 'currys', price: 799 }, { shopId: 'john-lewis', price: 799 }, { shopId: 'amazon', price: 789 }] },
  { id: 'e6', name: 'Galaxy S25 256GB', brand: 'Samsung', category: 'electronics', image: createPlaceholderImage('Samsung', 'electronics'), prices: [{ shopId: 'currys', price: 799 }, { shopId: 'john-lewis', price: 829 }, { shopId: 'amazon', price: 779 }] },
  { id: 'e7', name: 'MacBook Air M3 13"', brand: 'Apple', category: 'electronics', image: createPlaceholderImage('Apple', 'electronics'), prices: [{ shopId: 'currys', price: 1099 }, { shopId: 'john-lewis', price: 1099 }, { shopId: 'amazon', price: 1079 }] },
  { id: 'e8', name: 'XPS 13 Laptop', brand: 'Dell', category: 'electronics', image: createPlaceholderImage('Dell', 'electronics'), prices: [{ shopId: 'currys', price: 999 }, { shopId: 'john-lewis', price: 1029 }, { shopId: 'amazon', price: 949 }] },
  { id: 'e9', name: 'WH-1000XM5 Headphones', brand: 'Sony', category: 'electronics', image: createPlaceholderImage('Sony', 'electronics'), prices: [{ shopId: 'currys', price: 279 }, { shopId: 'john-lewis', price: 299 }, { shopId: 'amazon', price: 259 }] },
  { id: 'e10', name: 'AirPods Pro', brand: 'Apple', category: 'electronics', image: createPlaceholderImage('Apple', 'electronics'), prices: [{ shopId: 'currys', price: 249 }, { shopId: 'john-lewis', price: 249 }, { shopId: 'amazon', price: 239 }] },
  { id: 'a1', name: 'V15 Detect Vacuum', brand: 'Dyson', category: 'appliances', image: createPlaceholderImage('Dyson', 'appliances'), tags: ['vacuum', 'cleaning', 'home appliance'], prices: [{ shopId: 'currys', price: 649 }, { shopId: 'john-lewis', price: 679 }, { shopId: 'amazon', price: 619 }] },
  { id: 'a2', name: 'Airwrap Complete', brand: 'Dyson', category: 'appliances', image: createPlaceholderImage('Dyson', 'appliances'), tags: ['hair styling', 'beauty', 'appliance'], prices: [{ shopId: 'currys', price: 479 }, { shopId: 'john-lewis', price: 499 }, { shopId: 'amazon', price: 449 }] },
  { id: 'a3', name: 'Air Fryer 5.7L', brand: 'Ninja', category: 'appliances', image: createPlaceholderImage('Ninja', 'appliances'), tags: ['air fryer', 'kitchen appliance', 'cooking'], prices: [{ shopId: 'currys', price: 99 }, { shopId: 'john-lewis', price: 109 }, { shopId: 'amazon', price: 89 }] },
  { id: 'a4', name: 'Vertuo Next Coffee Machine', brand: 'Nespresso', category: 'appliances', image: createPlaceholderImage('Nespresso', 'appliances'), tags: ['coffee machine', 'kitchen appliance', 'hot drink'], prices: [{ shopId: 'currys', price: 99 }, { shopId: 'john-lewis', price: 109 }, { shopId: 'amazon', price: 89 }] },
  { id: 'a5', name: 'Stand Mixer 5KSM125', brand: 'KitchenAid', category: 'appliances', image: createPlaceholderImage('KitchenAid', 'appliances'), tags: ['kitchen appliance', 'baking'], prices: [{ shopId: 'currys', price: 449 }, { shopId: 'john-lewis', price: 469 }, { shopId: 'amazon', price: 419 }] },
  { id: 'a11', name: 'NN-CT56JBBPQ Microwave', brand: 'Panasonic', category: 'appliances', image: createPlaceholderImage('Panasonic', 'appliances'), tags: ['microwave', 'kitchen appliance', 'cooking'], prices: [{ shopId: 'currys', price: 89 }, { shopId: 'argos', price: 95 }, { shopId: 'amazon', price: 79 }] },
  { id: 'a12', name: '23L Microwave', brand: 'Samsung', category: 'appliances', image: createPlaceholderImage('Samsung', 'appliances'), tags: ['microwave', 'kitchen appliance', 'cooking'], prices: [{ shopId: 'currys', price: 79 }, { shopId: 'argos', price: 85 }, { shopId: 'amazon', price: 69 }] },
  { id: 'a13', name: 'Russell Hobbs Microwave', brand: 'Russell Hobbs', category: 'appliances', image: createPlaceholderImage('Russell Hobbs', 'appliances'), tags: ['microwave', 'kitchen appliance', 'cooking'], prices: [{ shopId: 'argos', price: 49 }, { shopId: 'amazon', price: 45 }, { shopId: 'currys', price: 55 }] },
  { id: 'a14', name: 'Breeze Bagless Vacuum', brand: 'Hoover', category: 'appliances', image: createPlaceholderImage('Hoover', 'appliances'), tags: ['hoover', 'vacuum', 'cleaning'], prices: [{ shopId: 'currys', price: 129 }, { shopId: 'argos', price: 139 }, { shopId: 'amazon', price: 119 }] },
  { id: 'a15', name: '1.7L Kettle', brand: 'Russell Hobbs', category: 'appliances', image: createPlaceholderImage('Russell Hobbs', 'appliances'), tags: ['kettle', 'kitchen appliance', 'hot drink'], prices: [{ shopId: 'currys', price: 39 }, { shopId: 'argos', price: 35 }, { shopId: 'amazon', price: 33 }] },
  { id: 'a16', name: '2-Slice Toaster', brand: 'Breville', category: 'appliances', image: createPlaceholderImage('Breville', 'appliances'), tags: ['toaster', 'kitchen appliance', 'cooking'], prices: [{ shopId: 'currys', price: 49 }, { shopId: 'argos', price: 45 }, { shopId: 'amazon', price: 42 }] },
  { id: 'g1_bp', name: 'PlayStation 5 Console', brand: 'Sony', category: 'gaming', image: createPlaceholderImage('Sony', 'gaming'), prices: [{ shopId: 'currys', price: 449 }, { shopId: 'john-lewis', price: 449 }, { shopId: 'amazon', price: 429 }] },
  { id: 'g2_bp', name: 'Xbox Series X', brand: 'Microsoft', category: 'gaming', image: createPlaceholderImage('Microsoft', 'gaming'), prices: [{ shopId: 'currys', price: 449 }, { shopId: 'john-lewis', price: 449 }, { shopId: 'amazon', price: 429 }] },
  { id: 'g3_bp', name: 'Nintendo Switch OLED', brand: 'Nintendo', category: 'gaming', image: createPlaceholderImage('Nintendo', 'gaming'), prices: [{ shopId: 'currys', price: 259 }, { shopId: 'john-lewis', price: 269 }, { shopId: 'amazon', price: 249 }] },
  { id: 'a6', name: '9kg Washing Machine', brand: 'Samsung', category: 'appliances', image: createPlaceholderImage('Samsung', 'appliances'), tags: ['washing machine', 'home appliance'], prices: [{ shopId: 'currys', price: 499 }, { shopId: 'john-lewis', price: 529 }, { shopId: 'amazon', price: 469 }] },
  { id: 'a7', name: '8kg Washing Machine', brand: 'Bosch', category: 'appliances', image: createPlaceholderImage('Bosch', 'appliances'), tags: ['washing machine', 'home appliance'], prices: [{ shopId: 'currys', price: 599 }, { shopId: 'john-lewis', price: 629 }, { shopId: 'amazon', price: 569 }] },
  { id: 'a8', name: 'Tumble Dryer 8kg', brand: 'Hotpoint', category: 'appliances', image: createPlaceholderImage('Hotpoint', 'appliances'), tags: ['dryer', 'home appliance'], prices: [{ shopId: 'currys', price: 349 }, { shopId: 'john-lewis', price: 369 }, { shopId: 'amazon', price: 329 }] },
  { id: 'a9', name: 'American Fridge Freezer', brand: 'Samsung', category: 'appliances', image: createPlaceholderImage('Samsung', 'appliances'), tags: ['fridge freezer', 'home appliance'], prices: [{ shopId: 'currys', price: 899 }, { shopId: 'john-lewis', price: 949 }, { shopId: 'amazon', price: 849 }] },
  { id: 'a10', name: 'Dishwasher 12 Place', brand: 'Bosch', category: 'appliances', image: createPlaceholderImage('Bosch', 'appliances'), tags: ['dishwasher', 'home appliance'], prices: [{ shopId: 'currys', price: 449 }, { shopId: 'john-lewis', price: 479 }, { shopId: 'amazon', price: 419 }] },

  // Furniture
  { id: 'f1', name: 'MALM Double Bed Frame', brand: 'IKEA', category: 'furniture', image: createPlaceholderImage('IKEA', 'furniture'), prices: [{ shopId: 'amazon', price: 229 }, { shopId: 'john-lewis', price: 249 }] },
  { id: 'f2', name: 'KALLAX Shelving Unit', brand: 'IKEA', category: 'furniture', image: createPlaceholderImage('IKEA', 'furniture'), prices: [{ shopId: 'amazon', price: 89 }, { shopId: 'john-lewis', price: 99 }] },
  { id: 'f3', name: 'Pocket 1000 Mattress', brand: 'Dreams', category: 'furniture', image: createPlaceholderImage('Dreams', 'furniture'), prices: [{ shopId: 'amazon', price: 399 }, { shopId: 'john-lewis', price: 429 }] },
  { id: 'f4', name: 'Velvet Sofa 3 Seater', brand: 'Next', category: 'furniture', image: createPlaceholderImage('Next', 'furniture'), prices: [{ shopId: 'amazon', price: 799 }, { shopId: 'john-lewis', price: 849 }] }
];

export const bigPurchaseCategories = [
  { id: 'electronics', name: 'Electronics', icon: 'Tv' },
  { id: 'appliances', name: 'Appliances', icon: 'WashingMachine' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
]

export function getBigPurchaseProducts() {
  return products.filter(product =>
    ['electronics', 'appliances', 'furniture', 'gaming'].includes(product.category)
  )
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return []

  const q = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(q) ||
    product.brand.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q)
  )
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export const categories = [
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingCart', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  { id: 'household', name: 'Household', icon: 'Home', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'Pill', color: 'bg-red-100 text-red-800 hover:bg-red-200' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', color: 'bg-purple-100 text-purple-800 hover:bg-purple-200' },
  { id: 'appliances', name: 'Appliances', icon: 'WashingMachine', color: 'bg-orange-100 text-orange-800 hover:bg-orange-200' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200' },
]

export function getShopById(id: string): Shop | undefined {
  return shops.find(shop => shop.id === id)
}

export const petrolStations: Product[] = [
  { id: 'p1', name: 'Shell', brand: 'Shell', category: 'petrol', prices: [{ shopId: 'shell', price: 1.65 }] },
  { id: 'p2', name: 'BP', brand: 'BP', category: 'petrol', prices: [{ shopId: 'bp', price: 1.62 }] },
  { id: 'p3', name: 'Esso', brand: 'Esso', category: 'petrol', prices: [{ shopId: 'esso', price: 1.68 }] },
]

export function getCheapestPrice(product: Product) {
  const prices = product.prices.filter(p => p.inStock !== false)
  return prices.length > 0 ? Math.min(...prices.map(p => p.price)) : 0
}

export function getNearestShopLocation(shop: Shop, userLat: number, userLng: number, calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number) {
  if (shop.locations.length === 0) return null

  let nearest = shop.locations[0]
  let minDistance = calculateDistance(userLat, userLng, nearest.lat, nearest.lng)

  for (const location of shop.locations.slice(1)) {
    const distance = calculateDistance(userLat, userLng, location.lat, location.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = location
    }
  }

  return { ...nearest, distance: minDistance }
}
