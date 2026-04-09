"use client"

import { use, useState } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft, Package, Map, Grid } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { SearchBox } from "@/components/search-box"
import { ShopsMap } from "@/components/shops-map"
import { categories, getProductsByCategory } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [showMap, setShowMap] = useState(false)
  const category = categories.find(c => c.id === id)
  
  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(id)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl ${category.color} mb-4`}>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {category.name}
          </h1>
          <p className="text-muted-foreground">
            Compare prices on {category.name.toLowerCase()} from top UK retailers
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="max-w-xl flex-1 w-full">
            <SearchBox size="small" />
          </div>
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
        </div>

        {/* Map View */}
        {showMap && products.length > 0 && (
          <div className="mb-8">
            <ShopsMap products={products} height="400px" />
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {products.length} {products.length === 1 ? 'product' : 'products'} available
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No products in this category
            </h2>
            <p className="text-muted-foreground">
              Check back later for products in {category.name}.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
