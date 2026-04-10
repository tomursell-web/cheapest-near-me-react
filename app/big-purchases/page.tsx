"use client"

import { useState, useMemo } from "react"
import { Search, Tv, Laptop, Smartphone, WashingMachine, Refrigerator, Sofa, BedDouble, Package } from "lucide-react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { getBigPurchaseProducts, bigPurchaseCategories } from "@/lib/data"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  tv: Tv,
  laptop: Laptop,
  phone: Smartphone,
  "washing-machine": WashingMachine,
  fridge: Refrigerator,
  sofa: Sofa,
  bed: BedDouble,
}

export default function BigPurchasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [query, setQuery] = useState("")

  const allProducts = useMemo(() => getBigPurchaseProducts(), [])

  const filtered = useMemo(() => {
    let results = selectedCategory
      ? allProducts.filter(p => p.category === selectedCategory)
      : allProducts

    if (query.trim()) {
      const q = query.toLowerCase()
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      )
    }
    return results
  }, [allProducts, selectedCategory, query])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Big Purchases</h1>
          <p className="text-muted-foreground">
            Compare prices on TVs, laptops, phones, appliances and furniture from the UK&apos;s top retailers.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search TVs, laptops, washing machines..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {bigPurchaseCategories.map(cat => {
            const Icon = categoryIcons[cat.id]
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {filtered.length === 1 ? "product" : "products"} found
        </p>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground">Try a different search or category.</p>
          </div>
        )}
      </main>
    </div>
  )
}
