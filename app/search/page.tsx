"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { SearchIcon, Package, Map, Grid } from "lucide-react"
import { Header } from "@/components/header"
import { SearchBox } from "@/components/search-box"
import { ProductCard } from "@/components/product-card"
import { ShopsMap } from "@/components/shops-map"
import { searchProducts } from "@/lib/data"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = searchProducts(query)
  const [showMap, setShowMap] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBox initialValue={query} size="small" />
        </div>

        {/* Results Info & View Toggle */}
        {query && (
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
            <ShopsMap products={results} height="400px" />
          </div>
        )}

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn&apos;t find any products matching &ldquo;{query}&rdquo;. Try searching for something else.
            </p>
          </div>
        ) : (
          <div className="text-center py-16">
            <SearchIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Search for products
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a product name, brand, or category to find the best value.
            </p>
          </div>
        )}
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
