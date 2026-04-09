"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Package, Plus, Check, MapPin, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { type Product, getCheapestPrice, getShopById, getNearestShopLocation } from "@/lib/data"
import { useBasket } from "@/lib/basket-context"
import { useLocation, calculateDistance, formatDistance } from "@/lib/location-context"

export function ProductCard({ product }: { product: Product }) {
  const { addItem, items } = useBasket()
  const { coordinates } = useLocation()
  const cheapest = getCheapestPrice(product)
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const sortedPrices = [...product.prices]
    .filter(p => p.inStock)
    .sort((a, b) => a.price - b.price)

  // Calculate distances for all shops with prices
  const pricesWithDistance = useMemo(() => {
    return sortedPrices.map((price) => {
      const shop = getShopById(price.shopId)
      let distance: number | null = null
      
      if (coordinates && shop) {
        const nearest = getNearestShopLocation(shop, coordinates.lat, coordinates.lng, calculateDistance)
        if (nearest) {
          distance = nearest.distance
        }
      }
      
      return { ...price, shop, distance }
    })
  }, [sortedPrices, coordinates])

  const handleAddToBasket = (shopId: string) => {
    addItem(product, shopId)
    setJustAdded(shopId)
    setTimeout(() => setJustAdded(null), 1500)
  }

  const displayedPrices = expanded ? pricesWithDistance : pricesWithDistance.slice(0, 3)
  const hasMorePrices = pricesWithDistance.length > 3

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="aspect-square bg-secondary/30 flex items-center justify-center relative overflow-hidden">
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <Package className="w-16 h-16 text-muted-foreground/40" />
          )}
          {cheapest && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              Best Price
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
          <h3 className="font-medium text-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price Comparison - All shops clickable */}
          <div className="space-y-2 mb-3">
            {displayedPrices.map((priceData, index) => {
              const isCheapest = index === 0
              const isAdded = justAdded === priceData.shopId
              const inBasket = items.some(
                i => i.product.id === product.id && i.shopId === priceData.shopId
              )
              
              return (
                <button 
                  key={priceData.shopId}
                  onClick={() => handleAddToBasket(priceData.shopId)}
                  className={`
                    w-full flex items-center justify-between text-sm px-3 py-2 rounded-lg
                    transition-all duration-200 text-left
                    ${isCheapest 
                      ? 'bg-accent hover:bg-accent/80 ring-2 ring-primary/20' 
                      : 'bg-secondary/50 hover:bg-secondary'
                    }
                    ${isAdded ? 'ring-2 ring-primary' : ''}
                  `}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: priceData.shop?.color }}
                    />
                    <span className="truncate font-medium">{priceData.shop?.name}</span>
                    {priceData.distance !== null && (
                      <span className="flex items-center gap-0.5 text-xs text-muted-foreground flex-shrink-0">
                        <MapPin className="w-2.5 h-2.5" />
                        {formatDistance(priceData.distance)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`font-semibold ${isCheapest ? 'text-primary' : ''}`}>
                      £{priceData.price.toFixed(2)}
                    </span>
                    {isAdded ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : inBasket ? (
                      <span className="text-xs text-muted-foreground">In basket</span>
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Show more/less toggle */}
          {hasMorePrices && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  +{pricesWithDistance.length - 3} more shops
                </>
              )}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
