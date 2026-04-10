"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { SearchIcon, Package, Map, Grid, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { SearchBox } from "@/components/search-box"
import { ProductCard } from "@/components/product-card"
import { ShopsMap } from "@/components/shops-map"

type SearchResult = {
  id: string
  name: string
  brand: string
  image: string | null
  category: string
  price: number
  shop: string
  source: string
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        if (!response.ok) throw new Error('Search failed')
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [query])

  // Convert search results to product format for components
  const products = results.reduce((acc: any[], result) => {
    const existingProduct = acc.find(p => p.name === result.name && p.brand === result.brand)
    if (existingProduct) {
      // Add price to existing product
      existingProduct.prices.push({
        shopId: result.shop.toLowerCase().replace(/'/g, '').replace(/\s+/g, ''),
        price: result.price,
        inStock: true
      })
    } else {
      // Create new product
      acc.push({
        id: result.id.split('-')[0], // Use base ID without shop suffix
        name: result.name,
        brand: result.brand,
        image: result.image,
        category: result.category,
        prices: [{
          shopId: result.shop.toLowerCase().replace(/'/g, '').replace(/\s+/g, ''),
          price: result.price,
          inStock: true
        }],
        location: { lat: 51.5074, lng: -0.1278 }, // Default London location
      })
    }
    return acc
  }, [])

  // Sort products by cheapest price
  products.forEach(product => {
    product.prices.sort((a: any, b: any) => a.price - b.price)
  })
  products.sort((a: any, b: any) => a.prices[0].price - b.prices[0].price)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBox initialValue={query} size="small" />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Searching for products...</p>
          </div>
        )}

        {/* Results Info & View Toggle */}
        {!isLoading && query && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Results for &ldquo;{query}&rdquo;
              </h1>
              <p className="text-muted-foreground">
                {results.length} {results.length === 1 ? 'product' : 'products'} found
              </p>
            </div>
            {results.length > 0 && (
              <div className="flex p-1 bg-secondary rounded-lg">
                <button
                  onClick={() => setShowMap(false)}
                  className={`
                    flex items-center gap-2 py-1.5 px-3 rounded-md text-sm font-medium transition-all
                    ${!showMap ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  <Grid className="w-4 h-4" />
                  Products
                </button>
                <button
                  onClick={() => setShowMap(true)}
                  className={`
                    flex items-center gap-2 py-1.5 px-3 rounded-md text-sm font-medium transition-all
                    ${showMap ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                  `}
                >
                  <Map className="w-4 h-4" />
                  Nearby Shops
                </button>
              </div>
            )}
          </div>
        )}

        {/* Map View */}
        {showMap && results.length > 0 && (
          <div className="mb-8">
            <ShopsMap products={products} height="400px" />
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : !isLoading && query ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try searching for something else.
            </p>
          </div>
        ) : !isLoading && !query ? (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Search for products
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a product name, brand, or category to find the best value.
            </p>
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="h-10 bg-secondary rounded-lg animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-secondary rounded-xl animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}
