export type Category = 'groceries' | 'household' | 'pharmacy' | 'electronics' | 'appliances' | 'furniture' | 'gaming';

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
  prices: { shopId: string; price: number }[];
};

// Open Food Facts Image Helper
const getFoodImg = (barcode: string) => `https://images.openfoodfacts.org/images/products/${barcode}/front_en.400.jpg`;

export const shops: Shop[] = [
  { id: 'tesco', name: 'Tesco', logo: 'https://www.tesco.com/favicon.ico', color: '#00539f', locations: [{ lat: 51.455, lng: -0.19, address: 'SW18 1TH' }] },
  { id: 'asda', name: 'Asda', logo: 'https://www.asda.com/favicon.ico', color: '#78be20', locations: [{ lat: 51.46, lng: -0.18, address: 'SW18 4AU' }] },
  { id: 'sainsburys', name: "Sainsbury's", logo: 'https://www.sainsburys.co.uk/favicon.ico', color: '#f06c00', locations: [{ lat: 51.45, lng: -0.2, address: 'SW18 2SS' }] },
  { id: 'currys', name: 'Currys', logo: 'https://www.currys.co.uk/favicon.ico', color: '#4c12a1', locations: [{ lat: 51.44, lng: -0.17, address: 'SW17 0BA' }] },
  { id: 'amazon', name: 'Amazon', logo: 'https://www.amazon.co.uk/favicon.ico', color: '#232f3e', locations: [] },
  { id: 'john-lewis', name: 'John Lewis', logo: 'https://www.johnlewis.com/favicon.ico', color: '#333333', locations: [{ lat: 51.49, lng: -0.14, address: 'SW1E 5NN' }] }
];

export const products: Product[] = [
  { id: 'g1', name: 'Baked Beans 415g', brand: 'Heinz', category: 'groceries', image: getFoodImg('5000157004676'), prices: [{ shopId: 'tesco', price: 1.40 }, { shopId: 'asda', price: 1.00 }] },
  { id: 'g2', name: 'Tomato Soup 400g', brand: 'Heinz', category: 'groceries', image: getFoodImg('5000157004225'), prices: [{ shopId: 'tesco', price: 1.20 }, { shopId: 'sainsburys', price: 1.50 }] },
  { id: 'g3', name: 'Mayonnaise 430ml', brand: 'Hellmanns', category: 'groceries', image: getFoodImg('8712566353347'), prices: [{ shopId: 'tesco', price: 2.50 }, { shopId: 'asda', price: 2.00 }] },
  { id: 'e1', name: 'iPhone 16 128GB', brand: 'Apple', category: 'electronics', prices: [{ shopId: 'john-lewis', price: 799 }, { shopId: 'amazon', price: 789 }] },
  { id: 'e2', name: '55" QLED TV', brand: 'Samsung', category: 'electronics', prices: [{ shopId: 'currys', price: 799 }, { shopId: 'amazon', price: 749 }] }
];
