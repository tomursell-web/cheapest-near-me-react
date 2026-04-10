import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { searchProducts } from '@/lib/data'

type OpenFoodFactsProduct = {
  product_name?: string
  brands?: string
  image_url?: string
  categories?: string
  code?: string
}

type OpenFoodFactsResponse = {
  products?: OpenFoodFactsProduct[]
  count?: number
}

type OpenProductsFactsProduct = {
  product_name?: string
  brands?: string
  image_url?: string
  categories?: string
  code?: string
}

type OpenProductsFactsResponse = {
  products?: OpenProductsFactsProduct[]
  count?: number
}

// Cache API responses for 1 hour
const cachedFetch = unstable_cache(
  async (url: string) => {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CheapestNearMe/1.0'
      }
    })
    if (!response.ok) throw new Error(`API request failed: ${response.status}`)
    return response.json()
  },
  ['api-fetch'],
  { revalidate: 3600 } // 1 hour
)

function generateRealisticPrice(productName: string, category: string): number {
  // Base prices by category
  const categoryPrices: Record<string, { min: number; max: number }> = {
    'groceries': { min: 0.50, max: 15.00 },
    'household': { min: 1.00, max: 25.00 },
    'pharmacy': { min: 2.00, max: 20.00 },
    'electronics': { min: 10.00, max: 2000.00 },
    'appliances': { min: 20.00, max: 1500.00 },
    'furniture': { min: 15.00, max: 800.00 },
    'big purchases': { min: 50.00, max: 2000.00 },
  }

  // Get category base price
  const catKey = Object.keys(categoryPrices).find(cat =>
    category.toLowerCase().includes(cat) || productName.toLowerCase().includes(cat)
  ) || 'groceries'

  const { min, max } = categoryPrices[catKey]

  // Add some randomness
  const price = min + Math.random() * (max - min)

  // Round to nearest 0.01 for pence
  return Math.round(price * 100) / 100
}

function determineCategory(query: string, productName: string, categories?: string): string {
  const lowerQuery = query.toLowerCase()
  const lowerName = productName.toLowerCase()
  const lowerCats = categories?.toLowerCase() || ''

  // Food/grocery detection
  if (lowerQuery.includes('soup') || lowerQuery.includes('pasta') || lowerQuery.includes('rice') ||
      lowerQuery.includes('yoghurt') || lowerQuery.includes('juice') || lowerQuery.includes('butter') ||
      lowerName.includes('soup') || lowerName.includes('pasta') || lowerName.includes('rice') ||
      lowerName.includes('yoghurt') || lowerName.includes('juice') || lowerName.includes('butter')) {
    return 'groceries'
  }

  // Household cleaning
  if (lowerQuery.includes('cleaner') || lowerQuery.includes('detergent') || lowerQuery.includes('spray') ||
      lowerQuery.includes('roll') || lowerQuery.includes('tissue') ||
      lowerName.includes('cleaner') || lowerName.includes('detergent') || lowerName.includes('spray') ||
      lowerName.includes('roll') || lowerName.includes('tissue')) {
    return 'household'
  }

  // Pharmacy
  if (lowerQuery.includes('tablet') || lowerQuery.includes('cream') || lowerQuery.includes('drops') ||
      lowerQuery.includes('medicine') || lowerQuery.includes('pain') ||
      lowerName.includes('tablet') || lowerName.includes('cream') || lowerName.includes('drops') ||
      lowerName.includes('medicine') || lowerName.includes('pain')) {
    return 'pharmacy'
  }

  // Electronics/appliances
  if (lowerQuery.includes('tv') || lowerQuery.includes('phone') || lowerQuery.includes('laptop') ||
      lowerQuery.includes('headphone') || lowerQuery.includes('vacuum') || lowerQuery.includes('fridge') ||
      lowerName.includes('tv') || lowerName.includes('phone') || lowerName.includes('laptop') ||
      lowerName.includes('headphone') || lowerName.includes('vacuum') || lowerName.includes('fridge')) {
    return 'electronics'
  }

  // Default to groceries
  return 'groceries'
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
  }

  try {
    const openFoodUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&countries_tags=united-kingdom&page_size=20`
    const data: OpenFoodFactsResponse = await cachedFetch(openFoodUrl)
    console.log('Open Food Facts response:', data)

    const apiProducts = (data.products || [])
      .filter(product => product.product_name || product.brands)
      .map(product => ({
        id: `off-${product.code ?? Math.random().toString(36).slice(2)}`,
        name: product.product_name || 'Unknown Product',
        brand: product.brands || 'Unknown Brand',
        image: product.image_url || null,
        category: determineCategory(query, product.product_name || '', product.categories),
        price: generateRealisticPrice(product.product_name || query, product.categories || ''),
        source: 'openfoodfacts'
      }))

    const localResults = searchProducts(query).map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      category: product.category,
      price: product.prices.length > 0 ? product.prices[0].price : 0,
      source: 'local'
    }))

    const combinedProductsMap = new Map<string, any>()

    for (const product of [...apiProducts, ...localResults]) {
      const key = `${product.name.toLowerCase()}|${product.brand.toLowerCase()}`
      if (!combinedProductsMap.has(key)) {
        combinedProductsMap.set(key, product)
      }
    }

    const combinedProducts = Array.from(combinedProductsMap.values()).slice(0, 20)

    const shops = ['Tesco', "Sainsbury's", 'Asda', 'Morrisons', 'Aldi', 'Lidl']
    const results = []

    for (const product of combinedProducts) {
      for (const shop of shops) {
        const priceVariation = 0.85 + Math.random() * 0.3
        const shopPrice = Math.round((product.price * priceVariation) * 100) / 100

        results.push({
          id: `${product.id}-${shop.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-')}`,
          name: product.name,
          brand: product.brand,
          image: product.image,
          category: product.category,
          price: shopPrice,
          shop,
          source: product.source
        })
      }
    }

    results.sort((a, b) => a.price - b.price)

    return NextResponse.json({
      query,
      results,
      total: results.length,
      source: apiProducts.length > 0 ? 'api' : 'local'
    })
  } catch (error) {
    console.error('Search API error:', error)

    const localResults = searchProducts(query)
    const shops = ['Tesco', "Sainsbury's", 'Asda', 'Morrisons', 'Aldi', 'Lidl']
    const results = []

    for (const product of localResults.slice(0, 12)) {
      for (const shop of shops) {
        const priceVariation = 0.85 + Math.random() * 0.3
        const shopPrice = Math.round(((product.prices.length > 0 ? product.prices[0].price : 0) * priceVariation) * 100) / 100

        results.push({
          id: `${product.id}-${shop.toLowerCase().replace(/'/g, '')}`,
          name: product.name,
          brand: product.brand,
          image: product.image,
          category: product.category,
          price: shopPrice,
          shop: shop,
          source: 'local-fallback'
        })
      }
    }

    results.sort((a, b) => a.price - b.price)

    return NextResponse.json({
      query,
      results,
      total: results.length,
      source: 'local-fallback',
      error: 'API unavailable'
    })
  }
}
