export type Shop = {
  id: string
  name: string
  logo: string
  color: string
  locations: { lat: number; lng: number; address: string }[]
}

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  image: string
  prices: {
    shopId: string
    price: number
    inStock: boolean
  }[]
}

export type PetrolStation = {
  id: string
  name: string
  address: string
  distance: string
  unleadedPrice: number
  dieselPrice: number
  superPrice: number
  lastUpdated: string
}

export const shops: Shop[] = [
  { 
    id: 'tesco', 
    name: 'Tesco', 
    logo: '/shops/tesco.png', 
    color: '#00539F',
    locations: [
      { lat: 51.5074, lng: -0.1278, address: 'Tesco Metro, Oxford Street, London' },
      { lat: 51.5194, lng: -0.1270, address: 'Tesco Express, Euston Road, London' },
      { lat: 51.4985, lng: -0.1749, address: 'Tesco Extra, Cromwell Road, London' },
      { lat: 51.5285, lng: -0.0847, address: 'Tesco Express, Old Street, London' },
    ]
  },
  { 
    id: 'sainsburys', 
    name: "Sainsbury's", 
    logo: '/shops/sainsburys.png', 
    color: '#F06C00',
    locations: [
      { lat: 51.5033, lng: -0.1195, address: "Sainsbury's Local, Waterloo, London" },
      { lat: 51.5155, lng: -0.1414, address: "Sainsbury's, Tottenham Court Road, London" },
      { lat: 51.4945, lng: -0.1757, address: "Sainsbury's, Fulham Road, London" },
    ]
  },
  { 
    id: 'asda', 
    name: 'Asda', 
    logo: '/shops/asda.png', 
    color: '#78BE20',
    locations: [
      { lat: 51.4652, lng: -0.2139, address: 'Asda, Roehampton, London' },
      { lat: 51.4816, lng: -0.0096, address: 'Asda, Isle of Dogs, London' },
      { lat: 51.5089, lng: -0.0754, address: 'Asda, Whitechapel, London' },
    ]
  },
  { 
    id: 'morrisons', 
    name: 'Morrisons', 
    logo: '/shops/morrisons.png', 
    color: '#FFD100',
    locations: [
      { lat: 51.5272, lng: -0.0889, address: 'Morrisons, Angel, London' },
      { lat: 51.4571, lng: -0.1376, address: 'Morrisons, Brixton, London' },
      { lat: 51.5421, lng: -0.0036, address: 'Morrisons, Stratford, London' },
    ]
  },
  { 
    id: 'lidl', 
    name: 'Lidl', 
    logo: '/shops/lidl.png', 
    color: '#0050AA',
    locations: [
      { lat: 51.5102, lng: -0.0904, address: 'Lidl, Whitechapel, London' },
      { lat: 51.4907, lng: -0.2241, address: 'Lidl, Hammersmith, London' },
      { lat: 51.5521, lng: -0.0532, address: 'Lidl, Hackney, London' },
    ]
  },
  { 
    id: 'aldi', 
    name: 'Aldi', 
    logo: '/shops/aldi.png', 
    color: '#00005B',
    locations: [
      { lat: 51.5407, lng: -0.1438, address: 'Aldi, Camden, London' },
      { lat: 51.4684, lng: -0.1800, address: 'Aldi, Wandsworth, London' },
      { lat: 51.4923, lng: -0.0156, address: 'Aldi, Surrey Quays, London' },
    ]
  },
  { 
    id: 'boots', 
    name: 'Boots', 
    logo: '/shops/boots.png', 
    color: '#1D4289',
    locations: [
      { lat: 51.5109, lng: -0.1301, address: 'Boots, Piccadilly Circus, London' },
      { lat: 51.5142, lng: -0.0755, address: 'Boots, Liverpool Street, London' },
      { lat: 51.5014, lng: -0.1419, address: 'Boots, Victoria, London' },
    ]
  },
  { 
    id: 'superdrug', 
    name: 'Superdrug', 
    logo: '/shops/superdrug.png', 
    color: '#E31937',
    locations: [
      { lat: 51.5084, lng: -0.1255, address: 'Superdrug, Strand, London' },
      { lat: 51.5173, lng: -0.1426, address: 'Superdrug, Oxford Circus, London' },
    ]
  },
  { 
    id: 'halfords', 
    name: 'Halfords', 
    logo: '/shops/halfords.png', 
    color: '#003D7C',
    locations: [
      { lat: 51.4925, lng: -0.2247, address: 'Halfords, Hammersmith, London' },
      { lat: 51.5823, lng: -0.0738, address: 'Halfords, Tottenham, London' },
    ]
  },
  { 
    id: 'screwfix', 
    name: 'Screwfix', 
    logo: '/shops/screwfix.png', 
    color: '#F26722',
    locations: [
      { lat: 51.5001, lng: -0.0186, address: 'Screwfix, Rotherhithe, London' },
      { lat: 51.5368, lng: -0.1058, address: 'Screwfix, Islington, London' },
    ]
  },
  { 
    id: 'bm', 
    name: 'B&M', 
    logo: '/shops/bm.png', 
    color: '#E31937',
    locations: [
      { lat: 51.5645, lng: -0.1053, address: 'B&M, Finsbury Park, London' },
      { lat: 51.4488, lng: -0.1103, address: 'B&M, Brixton Hill, London' },
    ]
  },
  { 
    id: 'petsathome', 
    name: 'Pets at Home', 
    logo: '/shops/petsathome.png', 
    color: '#00A651',
    locations: [
      { lat: 51.4539, lng: -0.1895, address: 'Pets at Home, Wandsworth, London' },
      { lat: 51.5506, lng: -0.0555, address: 'Pets at Home, Hackney, London' },
    ]
  },
  { 
    id: 'iceland', 
    name: 'Iceland', 
    logo: '/shops/iceland.png', 
    color: '#E4002B',
    locations: [
      { lat: 51.5234, lng: -0.0704, address: 'Iceland, Shoreditch, London' },
      { lat: 51.4619, lng: -0.1134, address: 'Iceland, Brixton, London' },
      { lat: 51.5012, lng: -0.1937, address: 'Iceland, Shepherd Bush, London' },
    ]
  },
  { 
    id: 'homebargains', 
    name: 'Home Bargains', 
    logo: '/shops/homebargains.png', 
    color: '#ED1C24',
    locations: [
      { lat: 51.5762, lng: -0.0982, address: 'Home Bargains, Tottenham, London' },
      { lat: 51.4556, lng: -0.0410, address: 'Home Bargains, Lewisham, London' },
    ]
  },
  { 
    id: 'wilko', 
    name: 'Wilko', 
    logo: '/shops/wilko.png', 
    color: '#E30613',
    locations: [
      { lat: 51.5174, lng: -0.1182, address: 'Wilko, Holborn, London' },
      { lat: 51.5032, lng: -0.0247, address: 'Wilko, Canary Wharf, London' },
    ]
  },
  { 
    id: 'costco', 
    name: 'Costco', 
    logo: '/shops/costco.png', 
    color: '#005DAA',
    locations: [
      { lat: 51.4195, lng: -0.0365, address: 'Costco, Croydon' },
      { lat: 51.5631, lng: -0.0556, address: 'Costco, Chingford' },
    ]
  },
  { 
    id: 'waitrose', 
    name: 'Waitrose', 
    logo: '/shops/waitrose.png', 
    color: '#5B8930',
    locations: [
      { lat: 51.5067, lng: -0.1355, address: 'Waitrose, Belgravia, London' },
      { lat: 51.5221, lng: -0.1545, address: 'Waitrose, Marylebone, London' },
      { lat: 51.4715, lng: -0.1678, address: 'Waitrose, Battersea, London' },
    ]
  },
  { 
    id: 'coop', 
    name: 'Co-op', 
    logo: '/shops/coop.png', 
    color: '#00B1EB',
    locations: [
      { lat: 51.5341, lng: -0.1236, address: 'Co-op, Camden, London' },
      { lat: 51.4893, lng: -0.0981, address: 'Co-op, Elephant & Castle, London' },
    ]
  },
  { 
    id: 'poundland', 
    name: 'Poundland', 
    logo: '/shops/poundland.png', 
    color: '#00A651',
    locations: [
      { lat: 51.5231, lng: -0.0767, address: 'Poundland, Shoreditch, London' },
      { lat: 51.4958, lng: -0.1434, address: 'Poundland, Victoria, London' },
    ]
  },
  { 
    id: 'amazon', 
    name: 'Amazon', 
    logo: '/shops/amazon.png', 
    color: '#FF9900',
    locations: [
      { lat: 51.5155, lng: -0.0922, address: 'Amazon Fresh, Spitalfields, London' },
    ]
  },
  { 
    id: 'argos', 
    name: 'Argos', 
    logo: '/shops/argos.png', 
    color: '#D9001B',
    locations: [
      { lat: 51.5115, lng: -0.1197, address: 'Argos, Holborn, London' },
      { lat: 51.5016, lng: -0.1594, address: 'Argos, Kensington, London' },
    ]
  },
  { 
    id: 'currys', 
    name: 'Currys', 
    logo: '/shops/currys.png', 
    color: '#722778',
    locations: [
      { lat: 51.5142, lng: -0.1511, address: 'Currys, Oxford Street, London' },
      { lat: 51.5012, lng: -0.0238, address: 'Currys, Canary Wharf, London' },
    ]
  },
  { 
    id: 'johnsons', 
    name: 'Robert Dyas', 
    logo: '/shops/robertdyas.png', 
    color: '#003087',
    locations: [
      { lat: 51.5091, lng: -0.1371, address: 'Robert Dyas, Piccadilly, London' },
      { lat: 51.5207, lng: -0.1268, address: 'Robert Dyas, Euston, London' },
    ]
  },
]

export const categories = [
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingCart', color: 'bg-green-100 text-green-700' },
  { id: 'pharmacy', name: 'Pharmacy', icon: 'Pill', color: 'bg-blue-100 text-blue-700' },
  { id: 'hardware', name: 'Hardware', icon: 'Wrench', color: 'bg-orange-100 text-orange-700' },
  { id: 'petfood', name: 'Pet Food', icon: 'Dog', color: 'bg-amber-100 text-amber-700' },
  { id: 'household', name: 'Household', icon: 'Home', color: 'bg-purple-100 text-purple-700' },
  { id: 'automotive', name: 'Automotive', icon: 'Car', color: 'bg-slate-100 text-slate-700' },
  { id: 'baby', name: 'Baby & Kids', icon: 'Baby', color: 'bg-pink-100 text-pink-700' },
  { id: 'drinks', name: 'Drinks', icon: 'Wine', color: 'bg-red-100 text-red-700' },
  { id: 'frozen', name: 'Frozen', icon: 'Snowflake', color: 'bg-cyan-100 text-cyan-700' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', color: 'bg-fuchsia-100 text-fuchsia-700' },
]

export const products: Product[] = [
  // === GROCERIES ===
  {
    id: 'heinz-beans-415g',
    name: 'Baked Beans 415g',
    brand: 'Heinz',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
    prices: [
      { shopId: 'tesco', price: 1.40, inStock: true },
      { shopId: 'sainsburys', price: 1.45, inStock: true },
      { shopId: 'asda', price: 1.35, inStock: true },
      { shopId: 'morrisons', price: 1.42, inStock: true },
      { shopId: 'lidl', price: 1.19, inStock: true },
      { shopId: 'aldi', price: 1.15, inStock: true },
      { shopId: 'iceland', price: 1.25, inStock: true },
      { shopId: 'waitrose', price: 1.55, inStock: true },
      { shopId: 'coop', price: 1.50, inStock: true },
    ]
  },
  {
    id: 'warburtons-toastie-800g',
    name: 'Toastie White Bread 800g',
    brand: 'Warburtons',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    prices: [
      { shopId: 'tesco', price: 1.65, inStock: true },
      { shopId: 'sainsburys', price: 1.70, inStock: true },
      { shopId: 'asda', price: 1.60, inStock: true },
      { shopId: 'morrisons', price: 1.68, inStock: true },
      { shopId: 'lidl', price: 1.49, inStock: false },
      { shopId: 'aldi', price: 1.45, inStock: true },
      { shopId: 'iceland', price: 1.55, inStock: true },
      { shopId: 'waitrose', price: 1.85, inStock: true },
    ]
  },
  {
    id: 'lurpak-butter-250g',
    name: 'Slightly Salted Butter 250g',
    brand: 'Lurpak',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400',
    prices: [
      { shopId: 'tesco', price: 4.20, inStock: true },
      { shopId: 'sainsburys', price: 4.25, inStock: true },
      { shopId: 'asda', price: 4.00, inStock: true },
      { shopId: 'morrisons', price: 4.15, inStock: true },
      { shopId: 'lidl', price: 3.89, inStock: true },
      { shopId: 'aldi', price: 3.85, inStock: true },
      { shopId: 'waitrose', price: 4.50, inStock: true },
      { shopId: 'costco', price: 3.49, inStock: true },
    ]
  },
  {
    id: 'cravendale-milk-2l',
    name: 'Filtered Whole Milk 2L',
    brand: 'Cravendale',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    prices: [
      { shopId: 'tesco', price: 2.35, inStock: true },
      { shopId: 'sainsburys', price: 2.40, inStock: true },
      { shopId: 'asda', price: 2.30, inStock: true },
      { shopId: 'morrisons', price: 2.35, inStock: false },
      { shopId: 'waitrose', price: 2.55, inStock: true },
      { shopId: 'coop', price: 2.45, inStock: true },
    ]
  },
  {
    id: 'pg-tips-160',
    name: 'Original Tea Bags 160pk',
    brand: 'PG Tips',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400',
    prices: [
      { shopId: 'tesco', price: 4.50, inStock: true },
      { shopId: 'sainsburys', price: 4.75, inStock: true },
      { shopId: 'asda', price: 4.25, inStock: true },
      { shopId: 'morrisons', price: 4.60, inStock: true },
      { shopId: 'lidl', price: 3.99, inStock: true },
      { shopId: 'aldi', price: 3.89, inStock: true },
      { shopId: 'costco', price: 3.50, inStock: true },
    ]
  },
  {
    id: 'nescafe-original-200g',
    name: 'Original Instant Coffee 200g',
    brand: 'Nescafe',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    prices: [
      { shopId: 'tesco', price: 6.50, inStock: true },
      { shopId: 'sainsburys', price: 6.75, inStock: true },
      { shopId: 'asda', price: 6.25, inStock: true },
      { shopId: 'morrisons', price: 6.60, inStock: true },
      { shopId: 'iceland', price: 6.00, inStock: true },
      { shopId: 'homebargains', price: 5.49, inStock: true },
    ]
  },
  {
    id: 'hovis-wholemeal-800g',
    name: 'Wholemeal Bread 800g',
    brand: 'Hovis',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400',
    prices: [
      { shopId: 'tesco', price: 1.55, inStock: true },
      { shopId: 'sainsburys', price: 1.60, inStock: true },
      { shopId: 'asda', price: 1.50, inStock: true },
      { shopId: 'morrisons', price: 1.55, inStock: true },
      { shopId: 'waitrose', price: 1.75, inStock: true },
    ]
  },
  {
    id: 'kelloggs-cornflakes-500g',
    name: 'Corn Flakes 500g',
    brand: "Kellogg's",
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
    prices: [
      { shopId: 'tesco', price: 3.25, inStock: true },
      { shopId: 'sainsburys', price: 3.30, inStock: true },
      { shopId: 'asda', price: 3.00, inStock: true },
      { shopId: 'morrisons', price: 3.20, inStock: true },
      { shopId: 'aldi', price: 2.79, inStock: true },
      { shopId: 'homebargains', price: 2.69, inStock: true },
    ]
  },
  {
    id: 'cathedral-cheddar-350g',
    name: 'Mature Cheddar 350g',
    brand: 'Cathedral City',
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400',
    prices: [
      { shopId: 'tesco', price: 4.00, inStock: true },
      { shopId: 'sainsburys', price: 4.10, inStock: true },
      { shopId: 'asda', price: 3.75, inStock: true },
      { shopId: 'morrisons', price: 3.95, inStock: true },
      { shopId: 'lidl', price: 3.49, inStock: true },
      { shopId: 'aldi', price: 3.45, inStock: true },
      { shopId: 'costco', price: 2.99, inStock: true },
    ]
  },
  {
    id: 'hellmans-mayo-400g',
    name: 'Real Mayonnaise 400g',
    brand: "Hellmann's",
    category: 'groceries',
    image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=400',
    prices: [
      { shopId: 'tesco', price: 3.20, inStock: true },
      { shopId: 'sainsburys', price: 3.30, inStock: true },
      { shopId: 'asda', price: 2.95, inStock: true },
      { shopId: 'morrisons', price: 3.15, inStock: true },
      { shopId: 'iceland', price: 3.00, inStock: true },
    ]
  },
  {
    id: 'mccain-oven-chips-900g',
    name: 'Oven Chips 900g',
    brand: "McCain",
    category: 'frozen',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400',
    prices: [
      { shopId: 'tesco', price: 2.75, inStock: true },
      { shopId: 'sainsburys', price: 2.85, inStock: true },
      { shopId: 'asda', price: 2.50, inStock: true },
      { shopId: 'iceland', price: 2.25, inStock: true },
      { shopId: 'morrisons', price: 2.70, inStock: true },
    ]
  },
  {
    id: 'birds-eye-peas-900g',
    name: 'Garden Peas 900g',
    brand: "Birds Eye",
    category: 'frozen',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
    prices: [
      { shopId: 'tesco', price: 2.50, inStock: true },
      { shopId: 'sainsburys', price: 2.65, inStock: true },
      { shopId: 'asda', price: 2.35, inStock: true },
      { shopId: 'iceland', price: 2.00, inStock: true },
      { shopId: 'morrisons', price: 2.55, inStock: true },
    ]
  },
  {
    id: 'ben-jerrys-cookie-dough-465ml',
    name: 'Cookie Dough Ice Cream 465ml',
    brand: "Ben & Jerry's",
    category: 'frozen',
    image: 'https://images.unsplash.com/photo-1629385701021-fcd568a743e8?w=400',
    prices: [
      { shopId: 'tesco', price: 5.50, inStock: true },
      { shopId: 'sainsburys', price: 5.75, inStock: true },
      { shopId: 'asda', price: 5.25, inStock: true },
      { shopId: 'morrisons', price: 5.60, inStock: true },
      { shopId: 'iceland', price: 4.99, inStock: true },
      { shopId: 'waitrose', price: 5.95, inStock: true },
    ]
  },
  // === DRINKS ===
  {
    id: 'coca-cola-2l',
    name: 'Coca-Cola Original 2L',
    brand: 'Coca-Cola',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400',
    prices: [
      { shopId: 'tesco', price: 2.35, inStock: true },
      { shopId: 'sainsburys', price: 2.40, inStock: true },
      { shopId: 'asda', price: 2.25, inStock: true },
      { shopId: 'morrisons', price: 2.30, inStock: true },
      { shopId: 'lidl', price: 2.09, inStock: true },
      { shopId: 'aldi', price: 2.05, inStock: true },
      { shopId: 'homebargains', price: 1.99, inStock: true },
    ]
  },
  {
    id: 'pepsi-max-2l',
    name: 'Pepsi Max 2L',
    brand: 'Pepsi',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400',
    prices: [
      { shopId: 'tesco', price: 2.25, inStock: true },
      { shopId: 'sainsburys', price: 2.30, inStock: true },
      { shopId: 'asda', price: 2.15, inStock: true },
      { shopId: 'morrisons', price: 2.20, inStock: true },
      { shopId: 'homebargains', price: 1.89, inStock: true },
    ]
  },
  {
    id: 'robinsons-squash-1l',
    name: 'Orange Squash 1L',
    brand: 'Robinsons',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    prices: [
      { shopId: 'tesco', price: 2.50, inStock: true },
      { shopId: 'sainsburys', price: 2.65, inStock: true },
      { shopId: 'asda', price: 2.35, inStock: true },
      { shopId: 'morrisons', price: 2.55, inStock: true },
      { shopId: 'homebargains', price: 2.19, inStock: true },
      { shopId: 'poundland', price: 2.00, inStock: true },
    ]
  },
  {
    id: 'lucozade-original-1l',
    name: 'Lucozade Original 1L',
    brand: 'Lucozade',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?w=400',
    prices: [
      { shopId: 'tesco', price: 2.15, inStock: true },
      { shopId: 'sainsburys', price: 2.25, inStock: true },
      { shopId: 'asda', price: 2.00, inStock: true },
      { shopId: 'morrisons', price: 2.10, inStock: true },
      { shopId: 'homebargains', price: 1.79, inStock: true },
    ]
  },
  // === SNACKS ===
  {
    id: 'walkers-variety-24pk',
    name: 'Variety Crisps 24pk',
    brand: 'Walkers',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400',
    prices: [
      { shopId: 'tesco', price: 5.00, inStock: true },
      { shopId: 'sainsburys', price: 5.25, inStock: true },
      { shopId: 'asda', price: 4.75, inStock: true },
      { shopId: 'morrisons', price: 5.00, inStock: true },
      { shopId: 'costco', price: 3.99, inStock: true },
    ]
  },
  {
    id: 'mcvities-digestives-400g',
    name: 'Digestive Biscuits 400g',
    brand: "McVitie's",
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    prices: [
      { shopId: 'tesco', price: 1.85, inStock: true },
      { shopId: 'sainsburys', price: 1.95, inStock: true },
      { shopId: 'asda', price: 1.75, inStock: true },
      { shopId: 'morrisons', price: 1.80, inStock: true },
      { shopId: 'aldi', price: 1.49, inStock: true },
      { shopId: 'homebargains', price: 1.39, inStock: true },
    ]
  },
  {
    id: 'cadbury-dairy-milk-200g',
    name: 'Dairy Milk 200g',
    brand: 'Cadbury',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400',
    prices: [
      { shopId: 'tesco', price: 2.85, inStock: true },
      { shopId: 'sainsburys', price: 2.95, inStock: true },
      { shopId: 'asda', price: 2.65, inStock: true },
      { shopId: 'morrisons', price: 2.80, inStock: true },
      { shopId: 'homebargains', price: 2.29, inStock: true },
      { shopId: 'poundland', price: 2.00, inStock: true },
    ]
  },
  {
    id: 'pringles-original-200g',
    name: 'Original Crisps 200g',
    brand: 'Pringles',
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400',
    prices: [
      { shopId: 'tesco', price: 2.75, inStock: true },
      { shopId: 'sainsburys', price: 2.85, inStock: true },
      { shopId: 'asda', price: 2.50, inStock: true },
      { shopId: 'morrisons', price: 2.70, inStock: true },
      { shopId: 'homebargains', price: 2.19, inStock: true },
    ]
  },
  // === PHARMACY ===
  {
    id: 'nurofen-200mg-16',
    name: 'Ibuprofen 200mg Tablets 16pk',
    brand: 'Nurofen',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    prices: [
      { shopId: 'boots', price: 3.19, inStock: true },
      { shopId: 'superdrug', price: 2.99, inStock: true },
      { shopId: 'tesco', price: 3.50, inStock: true },
      { shopId: 'asda', price: 3.25, inStock: true },
      { shopId: 'sainsburys', price: 3.40, inStock: true },
      { shopId: 'amazon', price: 2.85, inStock: true },
    ]
  },
  {
    id: 'panadol-500mg-16',
    name: 'Paracetamol 500mg Tablets 16pk',
    brand: 'Panadol',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400',
    prices: [
      { shopId: 'boots', price: 2.49, inStock: true },
      { shopId: 'superdrug', price: 2.29, inStock: true },
      { shopId: 'tesco', price: 2.75, inStock: true },
      { shopId: 'sainsburys', price: 2.80, inStock: true },
      { shopId: 'poundland', price: 1.50, inStock: true },
    ]
  },
  {
    id: 'calpol-strawberry-100ml',
    name: 'Infant Suspension Strawberry 100ml',
    brand: 'Calpol',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    prices: [
      { shopId: 'boots', price: 5.99, inStock: true },
      { shopId: 'superdrug', price: 5.79, inStock: true },
      { shopId: 'tesco', price: 6.25, inStock: false },
      { shopId: 'asda', price: 5.95, inStock: true },
      { shopId: 'sainsburys', price: 6.10, inStock: true },
    ]
  },
  {
    id: 'sudafed-blocked-nose',
    name: 'Blocked Nose Spray 15ml',
    brand: 'Sudafed',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400',
    prices: [
      { shopId: 'boots', price: 5.49, inStock: true },
      { shopId: 'superdrug', price: 5.29, inStock: true },
      { shopId: 'tesco', price: 5.75, inStock: true },
      { shopId: 'amazon', price: 4.99, inStock: true },
    ]
  },
  {
    id: 'lemsip-max-10pk',
    name: 'Max Cold & Flu Sachets 10pk',
    brand: 'Lemsip',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
    prices: [
      { shopId: 'boots', price: 6.99, inStock: true },
      { shopId: 'superdrug', price: 6.79, inStock: true },
      { shopId: 'tesco', price: 7.25, inStock: true },
      { shopId: 'asda', price: 6.50, inStock: true },
      { shopId: 'homebargains', price: 5.99, inStock: true },
    ]
  },
  {
    id: 'strepsils-honey-lemon-24',
    name: 'Honey & Lemon Lozenges 24pk',
    brand: 'Strepsils',
    category: 'pharmacy',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400',
    prices: [
      { shopId: 'boots', price: 4.29, inStock: true },
      { shopId: 'superdrug', price: 4.09, inStock: true },
      { shopId: 'tesco', price: 4.50, inStock: true },
      { shopId: 'asda', price: 4.25, inStock: true },
    ]
  },
  // === BABY & KIDS ===
  {
    id: 'pampers-baby-dry-size4-84',
    name: 'Baby-Dry Nappies Size 4 (84pk)',
    brand: 'Pampers',
    category: 'baby',
    image: 'https://images.unsplash.com/photo-1584839404042-8bc02d3626b5?w=400',
    prices: [
      { shopId: 'tesco', price: 18.00, inStock: true },
      { shopId: 'sainsburys', price: 18.50, inStock: true },
      { shopId: 'asda', price: 17.00, inStock: true },
      { shopId: 'boots', price: 19.00, inStock: true },
      { shopId: 'amazon', price: 16.50, inStock: true },
      { shopId: 'costco', price: 14.99, inStock: true },
    ]
  },
  {
    id: 'aptamil-stage1-800g',
    name: 'First Infant Milk Stage 1 800g',
    brand: 'Aptamil',
    category: 'baby',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    prices: [
      { shopId: 'tesco', price: 14.50, inStock: true },
      { shopId: 'sainsburys', price: 14.75, inStock: true },
      { shopId: 'asda', price: 14.00, inStock: true },
      { shopId: 'boots', price: 14.99, inStock: true },
      { shopId: 'amazon', price: 13.75, inStock: true },
    ]
  },
  {
    id: 'cow-gate-hungry-baby-800g',
    name: 'Hungry First Infant Milk 800g',
    brand: 'Cow & Gate',
    category: 'baby',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400',
    prices: [
      { shopId: 'tesco', price: 13.00, inStock: true },
      { shopId: 'sainsburys', price: 13.25, inStock: true },
      { shopId: 'asda', price: 12.50, inStock: true },
      { shopId: 'boots', price: 13.50, inStock: true },
    ]
  },
  {
    id: 'huggies-wipes-560',
    name: 'Pure Baby Wipes 560pk',
    brand: 'Huggies',
    category: 'baby',
    image: 'https://images.unsplash.com/photo-1584839404042-8bc02d3626b5?w=400',
    prices: [
      { shopId: 'tesco', price: 8.00, inStock: true },
      { shopId: 'sainsburys', price: 8.25, inStock: true },
      { shopId: 'asda', price: 7.50, inStock: true },
      { shopId: 'costco', price: 6.49, inStock: true },
      { shopId: 'amazon', price: 7.25, inStock: true },
    ]
  },
  // === BEAUTY ===
  {
    id: 'loreal-elvive-shampoo-400ml',
    name: 'Elvive Shampoo 400ml',
    brand: "L'Oreal",
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400',
    prices: [
      { shopId: 'boots', price: 4.50, inStock: true },
      { shopId: 'superdrug', price: 4.25, inStock: true },
      { shopId: 'tesco', price: 4.75, inStock: true },
      { shopId: 'asda', price: 4.00, inStock: true },
      { shopId: 'wilko', price: 3.99, inStock: true },
    ]
  },
  {
    id: 'dove-body-wash-450ml',
    name: 'Deeply Nourishing Body Wash 450ml',
    brand: 'Dove',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
    prices: [
      { shopId: 'boots', price: 4.00, inStock: true },
      { shopId: 'superdrug', price: 3.79, inStock: true },
      { shopId: 'tesco', price: 4.25, inStock: true },
      { shopId: 'asda', price: 3.50, inStock: true },
      { shopId: 'homebargains', price: 2.99, inStock: true },
    ]
  },
  {
    id: 'nivea-moisturiser-200ml',
    name: 'Soft Moisturising Cream 200ml',
    brand: 'NIVEA',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    prices: [
      { shopId: 'boots', price: 4.25, inStock: true },
      { shopId: 'superdrug', price: 3.99, inStock: true },
      { shopId: 'tesco', price: 4.50, inStock: true },
      { shopId: 'asda', price: 3.75, inStock: true },
      { shopId: 'wilko', price: 3.49, inStock: true },
    ]
  },
  // === HARDWARE ===
  {
    id: 'dulux-white-25l',
    name: 'Pure Brilliant White Matt 2.5L',
    brand: 'Dulux',
    category: 'hardware',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400',
    prices: [
      { shopId: 'screwfix', price: 24.99, inStock: true },
      { shopId: 'bm', price: 22.99, inStock: true },
      { shopId: 'wilko', price: 23.49, inStock: true },
      { shopId: 'homebargains', price: 21.99, inStock: true },
    ]
  },
  {
    id: 'stanley-tape-5m',
    name: 'FatMax Tape Measure 5m',
    brand: 'Stanley',
    category: 'hardware',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
    prices: [
      { shopId: 'screwfix', price: 14.99, inStock: true },
      { shopId: 'halfords', price: 16.49, inStock: true },
      { shopId: 'bm', price: 12.99, inStock: true },
      { shopId: 'argos', price: 15.99, inStock: true },
      { shopId: 'wilko', price: 13.49, inStock: true },
    ]
  },
  {
    id: 'dewalt-drill-18v',
    name: 'XR Brushless Combi Drill 18V',
    brand: 'DeWalt',
    category: 'hardware',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400',
    prices: [
      { shopId: 'screwfix', price: 159.99, inStock: true },
      { shopId: 'halfords', price: 169.99, inStock: false },
      { shopId: 'argos', price: 164.99, inStock: true },
      { shopId: 'amazon', price: 155.00, inStock: true },
    ]
  },
  {
    id: 'gorilla-glue-115ml',
    name: 'Original Gorilla Glue 115ml',
    brand: 'Gorilla',
    category: 'hardware',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    prices: [
      { shopId: 'screwfix', price: 8.99, inStock: true },
      { shopId: 'bm', price: 7.49, inStock: true },
      { shopId: 'wilko', price: 7.99, inStock: true },
      { shopId: 'homebargains', price: 6.99, inStock: true },
    ]
  },
  // === ELECTRONICS ===
  {
    id: 'duracell-aa-12',
    name: 'AA Batteries 12pk',
    brand: 'Duracell',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1619641805634-dcc97ffb29ca?w=400',
    prices: [
      { shopId: 'argos', price: 8.99, inStock: true },
      { shopId: 'currys', price: 9.49, inStock: true },
      { shopId: 'tesco', price: 9.00, inStock: true },
      { shopId: 'asda', price: 8.50, inStock: true },
      { shopId: 'costco', price: 6.99, inStock: true },
      { shopId: 'amazon', price: 7.99, inStock: true },
    ]
  },
  {
    id: 'anker-charger-20w',
    name: 'USB-C Charger 20W',
    brand: 'Anker',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400',
    prices: [
      { shopId: 'argos', price: 15.99, inStock: true },
      { shopId: 'currys', price: 16.99, inStock: true },
      { shopId: 'amazon', price: 12.99, inStock: true },
    ]
  },
  {
    id: 'jbl-flip-6',
    name: 'Flip 6 Bluetooth Speaker',
    brand: 'JBL',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    prices: [
      { shopId: 'argos', price: 129.99, inStock: true },
      { shopId: 'currys', price: 129.99, inStock: true },
      { shopId: 'amazon', price: 119.00, inStock: true },
    ]
  },
  // === AUTOMOTIVE ===
  {
    id: 'castrol-edge-5l',
    name: 'Edge 5W-30 Engine Oil 5L',
    brand: 'Castrol',
    category: 'automotive',
    image: 'https://images.unsplash.com/photo-1635784063477-e1f0d4afd886?w=400',
    prices: [
      { shopId: 'halfords', price: 38.99, inStock: true },
      { shopId: 'tesco', price: 42.00, inStock: true },
      { shopId: 'asda', price: 39.99, inStock: true },
      { shopId: 'costco', price: 34.99, inStock: true },
      { shopId: 'amazon', price: 36.50, inStock: true },
    ]
  },
  {
    id: 'halfords-screenwash-5l',
    name: 'All Seasons Screenwash 5L',
    brand: 'Halfords',
    category: 'automotive',
    image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=400',
    prices: [
      { shopId: 'halfords', price: 7.99, inStock: true },
      { shopId: 'tesco', price: 6.50, inStock: true },
      { shopId: 'asda', price: 5.99, inStock: true },
      { shopId: 'morrisons', price: 6.25, inStock: true },
    ]
  },
  {
    id: 'armor-all-wipes-25',
    name: 'Dashboard Wipes 25pk',
    brand: 'Armor All',
    category: 'automotive',
    image: 'https://images.unsplash.com/photo-1600320254374-ce2d293c324e?w=400',
    prices: [
      { shopId: 'halfords', price: 4.99, inStock: true },
      { shopId: 'tesco', price: 5.25, inStock: true },
      { shopId: 'asda', price: 4.75, inStock: true },
      { shopId: 'bm', price: 3.99, inStock: true },
    ]
  },
  // === PET FOOD ===
  {
    id: 'felix-cat-food-40',
    name: 'Mixed Selection Cat Food 40pk',
    brand: 'Felix',
    category: 'petfood',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
    prices: [
      { shopId: 'petsathome', price: 14.50, inStock: true },
      { shopId: 'tesco', price: 15.00, inStock: true },
      { shopId: 'asda', price: 13.99, inStock: true },
      { shopId: 'morrisons', price: 14.75, inStock: true },
      { shopId: 'costco', price: 12.99, inStock: true },
    ]
  },
  {
    id: 'pedigree-dog-food-12',
    name: 'Mixed Meat Selection 12pk',
    brand: 'Pedigree',
    category: 'petfood',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400',
    prices: [
      { shopId: 'petsathome', price: 9.99, inStock: true },
      { shopId: 'tesco', price: 10.50, inStock: true },
      { shopId: 'asda', price: 9.49, inStock: true },
      { shopId: 'sainsburys', price: 10.25, inStock: true },
      { shopId: 'bm', price: 8.99, inStock: true },
    ]
  },
  {
    id: 'whiskas-cat-treats',
    name: 'Temptations Cat Treats 85g',
    brand: 'Whiskas',
    category: 'petfood',
    image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=400',
    prices: [
      { shopId: 'petsathome', price: 2.25, inStock: true },
      { shopId: 'tesco', price: 2.50, inStock: true },
      { shopId: 'asda', price: 2.15, inStock: true },
      { shopId: 'homebargains', price: 1.89, inStock: true },
    ]
  },
  {
    id: 'iams-adult-dog-12kg',
    name: 'ProActive Health Adult Dog 12kg',
    brand: 'IAMS',
    category: 'petfood',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=400',
    prices: [
      { shopId: 'petsathome', price: 42.00, inStock: true },
      { shopId: 'tesco', price: 45.00, inStock: true },
      { shopId: 'amazon', price: 38.99, inStock: true },
      { shopId: 'costco', price: 36.99, inStock: true },
    ]
  },
  // === HOUSEHOLD ===
  {
    id: 'fairy-liquid-900ml',
    name: 'Original Washing Up Liquid 900ml',
    brand: 'Fairy',
    category: 'household',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400',
    prices: [
      { shopId: 'tesco', price: 2.85, inStock: true },
      { shopId: 'sainsburys', price: 2.90, inStock: true },
      { shopId: 'asda', price: 2.75, inStock: true },
      { shopId: 'lidl', price: 2.49, inStock: true },
      { shopId: 'aldi', price: 2.45, inStock: true },
      { shopId: 'homebargains', price: 2.19, inStock: true },
    ]
  },
  {
    id: 'persil-pods-45',
    name: '3-in-1 Washing Capsules 45pk',
    brand: 'Persil',
    category: 'household',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400',
    prices: [
      { shopId: 'tesco', price: 12.00, inStock: true },
      { shopId: 'sainsburys', price: 12.50, inStock: true },
      { shopId: 'asda', price: 11.50, inStock: true },
      { shopId: 'morrisons', price: 11.99, inStock: true },
      { shopId: 'costco', price: 9.99, inStock: true },
    ]
  },
  {
    id: 'andrex-toilet-roll-9',
    name: 'Classic Clean Toilet Rolls 9pk',
    brand: 'Andrex',
    category: 'household',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400',
    prices: [
      { shopId: 'tesco', price: 5.75, inStock: true },
      { shopId: 'sainsburys', price: 5.90, inStock: true },
      { shopId: 'asda', price: 5.50, inStock: true },
      { shopId: 'morrisons', price: 5.65, inStock: true },
      { shopId: 'lidl', price: 4.99, inStock: true },
      { shopId: 'aldi', price: 4.89, inStock: true },
      { shopId: 'costco', price: 4.49, inStock: true },
    ]
  },
  {
    id: 'dettol-spray-750ml',
    name: 'Antibacterial Surface Spray 750ml',
    brand: 'Dettol',
    category: 'household',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400',
    prices: [
      { shopId: 'tesco', price: 3.50, inStock: true },
      { shopId: 'sainsburys', price: 3.65, inStock: true },
      { shopId: 'asda', price: 3.25, inStock: true },
      { shopId: 'homebargains', price: 2.79, inStock: true },
      { shopId: 'poundland', price: 2.00, inStock: true },
    ]
  },
  {
    id: 'flash-floor-cleaner-1l',
    name: 'All Purpose Floor Cleaner 1L',
    brand: 'Flash',
    category: 'household',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?w=400',
    prices: [
      { shopId: 'tesco', price: 2.50, inStock: true },
      { shopId: 'sainsburys', price: 2.65, inStock: true },
      { shopId: 'asda', price: 2.35, inStock: true },
      { shopId: 'homebargains', price: 1.99, inStock: true },
      { shopId: 'wilko', price: 2.29, inStock: true },
    ]
  },
]

export const petrolStations: PetrolStation[] = [
  {
    id: '1',
    name: 'Tesco Petrol',
    address: 'High Street, London',
    distance: '0.3 mi',
    unleadedPrice: 143.9,
    dieselPrice: 152.9,
    superPrice: 157.9,
    lastUpdated: '2 hours ago'
  },
  {
    id: '2',
    name: "Sainsbury's Fuel",
    address: 'Park Road, London',
    distance: '0.5 mi',
    unleadedPrice: 144.9,
    dieselPrice: 153.9,
    superPrice: 158.9,
    lastUpdated: '3 hours ago'
  },
  {
    id: '3',
    name: 'Asda Petrol',
    address: 'Station Road, London',
    distance: '0.8 mi',
    unleadedPrice: 141.9,
    dieselPrice: 150.9,
    superPrice: 155.9,
    lastUpdated: '1 hour ago'
  },
  {
    id: '4',
    name: 'Shell',
    address: 'Main Street, London',
    distance: '1.1 mi',
    unleadedPrice: 149.9,
    dieselPrice: 158.9,
    superPrice: 163.9,
    lastUpdated: '30 mins ago'
  },
  {
    id: '5',
    name: 'BP',
    address: "Queen's Road, London",
    distance: '1.3 mi',
    unleadedPrice: 148.9,
    dieselPrice: 157.9,
    superPrice: 162.9,
    lastUpdated: '1 hour ago'
  },
  {
    id: '6',
    name: 'Morrisons Fuel',
    address: 'Victoria Street, London',
    distance: '1.5 mi',
    unleadedPrice: 142.9,
    dieselPrice: 151.9,
    superPrice: 156.9,
    lastUpdated: '4 hours ago'
  },
  {
    id: '7',
    name: 'Esso',
    address: "King's Cross, London",
    distance: '1.8 mi',
    unleadedPrice: 147.9,
    dieselPrice: 156.9,
    superPrice: 161.9,
    lastUpdated: '2 hours ago'
  },
  {
    id: '8',
    name: 'Costco Petrol',
    address: 'Industrial Estate, London',
    distance: '2.5 mi',
    unleadedPrice: 138.9,
    dieselPrice: 147.9,
    superPrice: 152.9,
    lastUpdated: '5 hours ago'
  },
]

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(p => p.category === categoryId)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery)
  )
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getShopById(id: string): Shop | undefined {
  return shops.find(s => s.id === id)
}

export function getCheapestPrice(product: Product): { shopId: string; price: number } | null {
  const inStockPrices = product.prices.filter(p => p.inStock)
  if (inStockPrices.length === 0) return null
  return inStockPrices.reduce((min, p) => p.price < min.price ? p : min)
}

export function getNearestShopLocation(
  shop: Shop,
  userLat: number,
  userLng: number,
  calculateDistanceFn: (lat1: number, lng1: number, lat2: number, lng2: number) => number
): { location: Shop['locations'][0]; distance: number } | null {
  if (!shop.locations || shop.locations.length === 0) return null

  let nearest = shop.locations[0]
  let minDistance = calculateDistanceFn(userLat, userLng, nearest.lat, nearest.lng)

  for (let i = 1; i < shop.locations.length; i++) {
    const loc = shop.locations[i]
    const dist = calculateDistanceFn(userLat, userLng, loc.lat, loc.lng)
    if (dist < minDistance) {
      minDistance = dist
      nearest = loc
    }
  }

  return { location: nearest, distance: minDistance }
}

export function getShopsSortedByDistance(
  userLat: number,
  userLng: number,
  calculateDistanceFn: (lat1: number, lng1: number, lat2: number, lng2: number) => number
): { shop: Shop; nearestLocation: Shop['locations'][0]; distance: number }[] {
  return shops
    .map((shop) => {
      const nearest = getNearestShopLocation(shop, userLat, userLng, calculateDistanceFn)
      return nearest
        ? { shop, nearestLocation: nearest.location, distance: nearest.distance }
        : null
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .sort((a, b) => a.distance - b.distance)
}
