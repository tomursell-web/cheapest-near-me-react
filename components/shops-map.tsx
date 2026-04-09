"use client"

import { useMemo } from "react"
import { LocationMap } from "@/components/location-map"
import { useLocation } from "@/lib/location-context"
import { shops, type Product, type Shop } from "@/lib/data"
import { MapPin, Loader2 } from "lucide-react"
import { LocationPicker } from "./location-picker"

type ShopsMapProps = {
  products?: Product[]
  height?: string
}

function getShopColor(shop: Shop): string {
  return shop.color || "#6B7280"
}

export function ShopsMap({ products, height = "350px" }: ShopsMapProps) {
  const { coordinates, status } = useLocation()

  // Get unique shops that have products (if products provided) or all shops
  const relevantShops = useMemo(() => {
    if (!products || products.length === 0) {
      return shops
    }

    const shopIds = new Set<string>()
    products.forEach((product) => {
      product.prices.forEach((price) => {
        if (price.inStock) {
          shopIds.add(price.shopId)
        }
      })
    })

    return shops.filter((shop) => shopIds.has(shop.id))
  }, [products])

  // Create markers for all shop locations
  const mapMarkers = useMemo(() => {
    if (!coordinates) return []

    const markers: Array<{
      id: string
      lat: number
      lng: number
      name: string
      details?: string
      color?: string
    }> = []

    relevantShops.forEach((shop) => {
      shop.locations.forEach((location, index) => {
        markers.push({
          id: `${shop.id}-${index}`,
          lat: location.lat,
          lng: location.lng,
          name: shop.name,
          details: location.address,
          color: getShopColor(shop),
        })
      })
    })

    return markers
  }, [relevantShops, coordinates])

  if (status !== "granted" || !coordinates) {
    return (
      <div
        style={{ height }}
        className="bg-secondary/50 rounded-lg border border-border flex flex-col items-center justify-center p-6"
      >
        <MapPin className="w-8 h-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground text-center mb-4">
          Enable location to see shops on the map
        </p>
        <LocationPicker compact />
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div
        style={{ height }}
        className="bg-secondary/50 rounded-lg border border-border flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <LocationMap
        center={coordinates}
        markers={mapMarkers}
        zoom={12}
        height={height}
      />
      {relevantShops.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {relevantShops.slice(0, 6).map((shop) => (
            <div
              key={shop.id}
              className="flex items-center gap-1.5 px-2 py-1 bg-secondary rounded-full text-xs"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: getShopColor(shop) }}
              />
              <span className="text-foreground">{shop.name}</span>
            </div>
          ))}
          {relevantShops.length > 6 && (
            <div className="px-2 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
              +{relevantShops.length - 6} more
            </div>
          )}
        </div>
      )}
    </div>
  )
}
