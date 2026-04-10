"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Clock, Car, Navigation, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBasket } from "@/lib/basket-context"
import { useLocation, calculateDistance } from "@/lib/location-context"
import { getShopById, shops } from "@/lib/data"

// Dynamic import for route map to avoid SSR issues
const RouteMap = dynamic(() => import('@/components/route-map').then(mod => ({ default: mod.RouteMap })), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading map...</div>
})

type ShopLocation = {
  id: string
  name: string
  lat: number
  lng: number
  subtotal: number
  address: string
}

export default function RoutePage() {
  const router = useRouter()
  const { items, getTotalsByShop } = useBasket()
  const { coordinates } = useLocation()
  const [isCalculating, setIsCalculating] = useState(false)

  const shopTotals = getTotalsByShop()

  // Get shop locations from basket items
  const shopLocations: ShopLocation[] = useMemo(() => {
    const locations: ShopLocation[] = []

    Object.entries(shopTotals).forEach(([shopName, subtotal]) => {
      // Find a shop with this name
      const shop = shops.find(s => s.name === shopName)
      if (shop && shop.locations.length > 0) {
        locations.push({
          id: shop.id,
          name: shop.name,
          lat: shop.locations[0].lat,
          lng: shop.locations[0].lng,
          subtotal,
          address: shop.locations[0].address
        })
      }
    })

    return locations
  }, [shopTotals])

  // Calculate optimal route using nearest neighbor algorithm
  const route = useMemo(() => {
    if (!coordinates || shopLocations.length === 0) return []

    setIsCalculating(true)

    const calculateRoute = () => {
      const unvisited = [...shopLocations]
      const route: ShopLocation[] = []
      let currentPos = { lat: coordinates.lat, lng: coordinates.lng }

      while (unvisited.length > 0) {
        // Find nearest unvisited shop
        let nearestIndex = 0
        let nearestDistance = calculateDistance(
          currentPos.lat, currentPos.lng,
          unvisited[0].lat, unvisited[0].lng
        )

        for (let i = 1; i < unvisited.length; i++) {
          const distance = calculateDistance(
            currentPos.lat, currentPos.lng,
            unvisited[i].lat, unvisited[i].lng
          )
          if (distance < nearestDistance) {
            nearestDistance = distance
            nearestIndex = i
          }
        }

        const nearestShop = unvisited[nearestIndex]
        route.push(nearestShop)
        unvisited.splice(nearestIndex, 1)
        currentPos = { lat: nearestShop.lat, lng: nearestShop.lng }
      }

      setIsCalculating(false)
      return route
    }

    return calculateRoute()
  }, [coordinates, shopLocations])

  // Calculate total distance and time
  const routeStats = useMemo(() => {
    if (!coordinates || route.length === 0) return null

    let totalDistance = 0
    let currentPos = { lat: coordinates.lat, lng: coordinates.lng }

    route.forEach(shop => {
      totalDistance += calculateDistance(
        currentPos.lat, currentPos.lng,
        shop.lat, shop.lng
      )
      currentPos = { lat: shop.lat, lng: shop.lng }
    })

    // Estimate times (rough approximations)
    const walkingTime = Math.round(totalDistance * 12) // ~5 km/h walking speed
    const drivingTime = Math.round(totalDistance * 2.5) // ~24 km/h average driving speed

    return {
      totalDistance: Math.round(totalDistance * 10) / 10,
      walkingTime,
      drivingTime
    }
  }, [coordinates, route])

  const getDirectionsUrl = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    return `https://www.google.com/maps/dir/${origin.lat},${origin.lng}/${destination.lat},${destination.lng}/`
  }

  const getAppleMapsUrl = (origin: { lat: number; lng: number }, destination: { lat: number; lng: number }) => {
    return `http://maps.apple.com/?saddr=${origin.lat},${origin.lng}&daddr=${destination.lat},${destination.lng}`
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">No items in basket</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to your basket to plan your shopping route.
            </p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link href="/basket">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2 mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Basket
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Shopping Route</h1>
          <p className="text-muted-foreground">Optimized route for your {shopLocations.length} stop{shopLocations.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Map */}
        <div className="mb-8 h-[400px] w-full">
          {coordinates ? (
            <RouteMap
              userLocation={coordinates}
              shops={route}
            />
          ) : (
            <div className="h-full bg-secondary rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Getting your location...</p>
              </div>
            </div>
          )}
        </div>

        {/* Route Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Your Route
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Start */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Start at your location</p>
                <p className="text-sm text-muted-foreground">Current position</p>
              </div>
            </div>

            {/* Shop stops */}
            {route.map((shop, index) => {
              const stepNumber = index + 2
              const prevLocation = index === 0
                ? { lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }
                : { lat: route[index - 1].lat, lng: route[index - 1].lng }

              const distance = calculateDistance(
                prevLocation.lat, prevLocation.lng,
                shop.lat, shop.lng
              )

              return (
                <div key={shop.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {stepNumber}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Head to {shop.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {shop.address} • £{shop.subtotal.toFixed(2)} to spend
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {distance.toFixed(1)} miles from previous stop
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getDirectionsUrl(prevLocation, shop), '_blank')}
                    >
                      Google Maps
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getAppleMapsUrl(prevLocation, shop), '_blank')}
                    >
                      Apple Maps
                    </Button>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Route Stats */}
        {routeStats && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Route Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{routeStats.totalDistance} miles</p>
                  <p className="text-sm text-muted-foreground">Total distance</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{routeStats.walkingTime} min</p>
                  <p className="text-sm text-muted-foreground">Walking time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{routeStats.drivingTime} min</p>
                  <p className="text-sm text-muted-foreground">Driving time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}