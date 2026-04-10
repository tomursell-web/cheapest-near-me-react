"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect, useMemo } from "react"
import { SearchIcon, Package, Map, Grid, Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { SearchBox } from "@/components/search-box"
import { ProductCard } from "@/components/product-card"
import { ShopsMap } from "@/components/shops-map"
import { categories as categoriesMeta, getProductsByCategory } from "@/lib/data"

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

type ProductCardData = {
  id: string
  name: string
  brand: string
  image: string | null
  category: string
  prices: { shopId: string; price: number; inStock?: boolean }[]
}

type CategorySection = {
  id: string
  name: string
  products: ProductCardData[]
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>(categoriesMeta[0]?.id || "")

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

  const structuredProducts = useMemo(() => {
    const products = results.reduce((acc: ProductCardData[], result) => {
      const existingProduct = acc.find(p => p.name === result.name && p.brand === result.brand)
      if (existingProduct) {
        existingProduct.prices.push({
          shopId: result.shop.toLowerCase().replace(/'/g, '').replace(/\s+/g, ''),
          price: result.price,
          inStock: true
        })
      } else {
        acc.push({
          id: result.id.split('-')[0],
          name: result.name,
          brand: result.brand,
          image: result.image,
          category: result.category,
          prices: [{
            shopId: result.shop.toLowerCase().replace(/'/g, '').replace(/\s+/g, ''),
            price: result.price,
            inStock: true
          }]
        })
      }
      return acc
    }, [])

    products.forEach(product => {
      product.prices.sort((a, b) => a.price - b.price)
    })
    products.sort((a, b) => a.prices[0].price - b.prices[0].price)
    return products
  }, [results])

  const categorySections = useMemo<CategorySection[]>(() => {
    if (!query) {
      return categoriesMeta
        .map(category => ({
          id: category.id,
          name: category.name,
          products: getProductsByCategory(category.id).map(product => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.image ?? null,
            category: product.category,
            prices: product.prices
          }))
        }))
        .filter(section => section.products.length > 0)
    }

    return categoriesMeta
      .map(category => ({
        id: category.id,
        name: category.name,
        products: structuredProducts.filter(product => product.category === category.id)
      }))
      .filter(section => section.products.length > 0)
  }, [query, structuredProducts])

  const totalProducts = categorySections.reduce((sum, section) => sum + section.products.length, 0)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBox initialValue={query} size="small" />
        </div>

        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categorySections.map(section => (
              <a
                key={section.id}
                href={`#category-${section.id}`}
                onClick={() => setActiveCategory(section.id)}
                className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {section.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {query ? `Results for “${query}”` : 'Shop by category'}
            </h1>
            <p className="text-muted-foreground">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} across {categorySections.length} {categorySections.length === 1 ? 'category' : 'categories'}
            </p>
          </div>
          {query && categorySections.length > 0 && (
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground">
              Showing matches across all categories
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Searching for products...</p>
          </div>
        )}

        {!isLoading && categorySections.length > 0 ? (
          <div className="space-y-12">
            {categorySections.map(section => (
              <section key={section.id} id={`category-${section.id}`} className="scroll-mt-24">
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{section.name}</h2>
                    <p className="text-sm text-muted-foreground">{section.products.length} items</p>
                  </div>
                  <a href={`#category-${section.id}`} className="text-sm font-medium text-primary hover:underline">
                    Jump to section
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {section.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : !isLoading && query ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try a different search.
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
