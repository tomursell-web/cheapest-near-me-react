"use client"

import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import { ArrowLeft, Fuel, MapPin, Clock, TrendingDown, Car, Loader2, AlertCircle, RefreshCw, Map, List, Navigation } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { LocationPicker } from "@/components/location-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { useLocation, calculateDistance, formatDistance } from "@/lib/location-context"
import { petrolStations as mockStations } from "@/lib/data"

// Dynamic import for fuel map to avoid SSR issues
const FuelMap = dynamic(() => import('@/components/fuel-map').then(mod => ({ default: mod.FuelMap })), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading map...</div>
})

type FuelType = "E10" | "B7" | "E5"

const fuelTypes: { id: FuelType; label: string }[] = [
  { id: "E10", label: "Unleaded (E10)" },
  { id: "B7", label: "Diesel (B7)" },
  { id: "E5", label: "Super (E5)" },
]

type LiveStation = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  distance: number
  price: number
  lastUpdated: string
}

// Actual API response structure from checkfuelprices.co.uk
type ApiStation = {
  id: string
  brand: string
  address: string
  postcode: string
  lat: number
  lng: number
  price: number
  distance: number
  price_updated: string
}

type ApiResponse = {
  success: boolean
  count: number
  fuel: string
  area_stats: {
    avg: number
    min: number
    max: number
    count: number
  }
  stations: ApiStation[]
  fallback?: boolean
  error?: string
}

export default function PetrolPage() {
  const [selectedFuel, setSelectedFuel] = useState<FuelType>("E10")
  const [liveStations, setLiveStations] = useState<LiveStation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "map">("map")
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null)
  const [searchRadius, setSearchRadius] = useState([5]) // Default 5 miles
  const { coordinates, status } = useLocation()

  // Fetch live petrol prices when location changes
  useEffect(() => {
    if (!coordinates) {
      setLiveStations([])
      return
    }

    const fetchPrices = async () => {
      setIsLoading(true)
      setApiError(null)

      try {
        const response = await fetch(
          `/api/petrol?lat=${coordinates.lat}&lng=${coordinates.lng}&fuel=${selectedFuel}&radius=${searchRadius[0]}`
        )

        if (!response.ok) {
          throw new Error("API request failed")
        }

        const data: ApiResponse = await response.json()

        if (data.fallback || data.error) {
          throw new Error(data.error || "API fallback triggered")
        }

        if (data.stations && Array.isArray(data.stations) && data.stations.length > 0) {
          const stations: LiveStation[] = data.stations.map((station) => ({
            id: station.id,
            name: station.brand,
            address: `${station.address}, ${station.postcode}`,
            lat: station.lat,
            lng: station.lng,
            distance: station.distance, // API provides distance in miles
            price: station.price,
            lastUpdated: formatPriceDate(station.price_updated),
          }))

          setLiveStations(stations.filter((s) => s.price > 0))
          setUsingMockData(false)
        } else {
          throw new Error("No stations found")
        }
      } catch {
        // Fall back to mock data with real distances
        setApiError("Unable to fetch live prices. Showing example data with your location.")
        const mockStations = [
          { name: 'Shell', address: '123 High Street', unleadedPrice: 1.65, dieselPrice: 1.75, superPrice: 1.85, lastUpdated: '2 hours ago' },
          { name: 'BP', address: '456 Main Road', unleadedPrice: 1.62, dieselPrice: 1.72, superPrice: 1.82, lastUpdated: '1 hour ago' },
          { name: 'Esso', address: '789 Station Road', unleadedPrice: 1.68, dieselPrice: 1.78, superPrice: 1.88, lastUpdated: '3 hours ago' },
        ]
        
        const stationsWithDistance = mockStations.map((station, index) => {
          // Spread mock stations around user location
          const offsetLat = (Math.random() - 0.5) * 0.04
          const offsetLng = (Math.random() - 0.5) * 0.04
          const lat = coordinates.lat + offsetLat
          const lng = coordinates.lng + offsetLng
          
          return {
            id: `mock-${index}`,
            name: station.name,
            address: station.address,
            lat,
            lng,
            distance: calculateDistance(coordinates.lat, coordinates.lng, lat, lng),
            price: selectedFuel === "E10" 
              ? station.unleadedPrice 
              : selectedFuel === "B7" 
                ? station.dieselPrice 
                : station.superPrice,
            lastUpdated: station.lastUpdated,
          }
        })

        setLiveStations(stationsWithDistance)
        setUsingMockData(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrices()
  }, [coordinates, selectedFuel, searchRadius])

  // Format price update date
  function formatPriceDate(dateStr: string): string {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffHours / 24)

      if (diffHours < 1) return "Just now"
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    } catch {
      return "Recently"
    }
  }

  // Sort stations by price
  const sortedStations = useMemo(() => {
    return [...liveStations].sort((a, b) => a.price - b.price)
  }, [liveStations])

  const cheapestPrice = sortedStations[0]?.price ?? 0
  const averagePrice =
    sortedStations.length > 0
      ? sortedStations.reduce((sum, s) => sum + s.price, 0) / sortedStations.length
      : 0

  // Map markers
  const mapMarkers = useMemo(() => {
    return sortedStations.map((station, index) => ({
      id: station.id,
      lat: station.lat,
      lng: station.lng,
      name: station.name,
      details: station.address,
      price: station.price,
      isCheapest: index === 0,
    }))
  }, [sortedStations])

  const handleRefresh = () => {
    if (coordinates) {
      setIsLoading(true)
      setLiveStations([])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Fuel className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Fuel Prices</h1>
              <p className="text-muted-foreground">Find the cheapest fuel near you</p>
            </div>
          </div>
        </div>

        {/* Location Picker - Show if no location set */}
        {status !== "granted" && (
          <div className="mb-8">
            <LocationPicker />
          </div>
        )}

        {/* Location Display - Show if location is set */}
        {status === "granted" && coordinates && (
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Your Location</p>
                <p className="text-xs text-muted-foreground">
                  {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
              <LocationPicker compact />
            </div>
          </div>
        )}

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Locating you...</p>
          </div>
        )}

        {/* Results Section - Only show when we have location */}
        {status === "granted" && coordinates && (
          <>
            {/* API Status Notice */}
            {apiError && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">{apiError}</p>
                  {usingMockData && (
                    <p className="text-xs text-amber-600 mt-1">
                      Distances are calculated from your real location.
                    </p>
                  )}
                </div>
              </div>
            )}

            {!apiError && !isLoading && sortedStations.length > 0 && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
                <Fuel className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-primary font-medium">Live prices loaded</p>
                  <p className="text-xs text-primary/70 mt-0.5">
                    Showing {sortedStations.length} stations near you with real-time pricing.
                  </p>
                </div>
              </div>
            )}

            {/* Loading Prices */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Fetching fuel prices...</p>
              </div>
            )}

            {/* Results */}
            {!isLoading && sortedStations.length > 0 && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingDown className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold text-primary">{cheapestPrice.toFixed(1)}p</p>
                      <p className="text-xs text-muted-foreground">Cheapest Price</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Car className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                      <p className="text-2xl font-bold text-foreground">{averagePrice.toFixed(1)}p</p>
                      <p className="text-xs text-muted-foreground">Average Price</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Fuel Type Selector */}
                <div className="flex gap-2 mb-6 p-1 bg-secondary rounded-lg">
                  {fuelTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedFuel(type.id)}
                      className={`
                        flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all
                        ${
                          selectedFuel === type.id
                            ? "bg-card text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }
                      `}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Search Radius Slider */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">Search Radius</label>
                    <span className="text-sm text-muted-foreground">{searchRadius[0]} miles</span>
                  </div>
                  <Slider
                    value={searchRadius}
                    onValueChange={setSearchRadius}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex justify-end mb-4">
                  <div className="flex p-1 bg-secondary rounded-lg">
                    <button
                      onClick={() => setViewMode("list")}
                      className={`
                        flex items-center gap-2 py-1.5 px-3 rounded-md text-sm font-medium transition-all
                        ${viewMode === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                      `}
                    >
                      <List className="w-4 h-4" />
                      List
                    </button>
                    <button
                      onClick={() => setViewMode("map")}
                      className={`
                        flex items-center gap-2 py-1.5 px-3 rounded-md text-sm font-medium transition-all
                        ${viewMode === "map" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}
                      `}
                    >
                      <Map className="w-4 h-4" />
                      Map
                    </button>
                  </div>
                </div>

                {/* Map View */}
                {viewMode === "map" && (
                  <div className="mb-6 h-[500px] md:h-[500px] w-full">
                    <FuelMap
                      stations={sortedStations}
                      userLocation={coordinates}
                      searchRadius={searchRadius[0]}
                    />
                  </div>
                )}

                {/* Stations List */}
                <div className="space-y-3">
                  {sortedStations.map((station, index) => {
                    const isCheapest = index === 0
                    const savingsPerLitre = station.price - cheapestPrice
                    const isSelected = station.id === selectedStationId

                    return (
                      <Card 
                        key={station.id} 
                        className={`
                          cursor-pointer transition-all
                          ${isCheapest ? "ring-2 ring-primary" : ""}
                          ${isSelected && viewMode === "map" ? "ring-2 ring-blue-500 bg-blue-50/50" : ""}
                        `}
                        onClick={() => setSelectedStationId(station.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Rank */}
                            <div
                              className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                                ${isCheapest ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}
                              `}
                            >
                              {index + 1}
                            </div>

                            {/* Station Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-foreground">{station.name}</h3>
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                                    <MapPin className="w-3 h-3 flex-shrink-0" />
                                    <span className="truncate">{station.address}</span>
                                  </div>
                                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Car className="w-3 h-3" />
                                      {formatDistance(station.distance)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      {station.lastUpdated}
                                    </span>
                                  </div>
                                </div>

                                {/* Price */}
                                <div className="text-right flex-shrink-0">
                                  <p className={`text-2xl font-bold ${isCheapest ? "text-primary" : "text-foreground"}`}>
                                    {station.price.toFixed(1)}p
                                  </p>
                                  <p className="text-xs text-muted-foreground">per litre</p>
                                  {!isCheapest && savingsPerLitre > 0 && (
                                    <p className="text-xs text-destructive mt-1">
                                      +{savingsPerLitre.toFixed(1)}p vs cheapest
                                    </p>
                                  )}
                                  {isCheapest && (
                                    <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                                      Best Price
                                    </span>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="mt-2 w-full"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=driving`, '_blank')
                                    }}
                                  >
                                    <Navigation className="w-3 h-3 mr-1" />
                                    Directions
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}

            {/* No Results */}
            {!isLoading && sortedStations.length === 0 && (
              <div className="text-center py-16">
                <Fuel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No petrol stations found in your area.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try changing your location or expanding the search radius.
                </p>
              </div>
            )}
          </>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-8">
          Prices are fetched from available sources but may not reflect real-time changes. Always
          confirm at the pump.
        </p>
      </main>
    </div>
  )
}
