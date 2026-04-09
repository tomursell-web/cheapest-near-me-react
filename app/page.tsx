"use client"

import { MapPin, TrendingDown, Store, Clock, Navigation } from "lucide-react"
import { Header } from "@/components/header"
import { SearchBox } from "@/components/search-box"
import { CategoryButtons } from "@/components/category-buttons"
import { OnboardingModal } from "@/components/onboarding-modal"
import { LocationPicker } from "@/components/location-picker"
import { Button } from "@/components/ui/button"
import { shops, getShopsSortedByDistance } from "@/lib/data"
import { useLocation, calculateDistance, formatDistance } from "@/lib/location-context"

export default function HomePage() {
  const { coordinates, status, requestLocation } = useLocation()

  // Get shops sorted by distance if we have user coordinates
  const shopsWithDistance = coordinates
    ? getShopsSortedByDistance(coordinates.lat, coordinates.lng, calculateDistance)
    : null

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OnboardingModal />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto text-center max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              Cheapest Near Me
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 text-pretty">
              Compare prices across UK shops instantly. Find the best deals on groceries, pharmacy,
              hardware, and more.
            </p>
            <SearchBox autoFocus />

            {/* Location Prompt */}
            {status !== "granted" && status !== "loading" && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={requestLocation}
                  className="gap-2 text-muted-foreground"
                >
                  <Navigation className="w-4 h-4" />
                  Enable location to see distances
                </Button>
              </div>
            )}

            {/* Location Status */}
            {status === "loading" && (
              <div className="mt-6 text-sm text-muted-foreground">Locating you...</div>
            )}

            {status === "granted" && coordinates && (
              <div className="mt-6">
                <LocationPicker compact />
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 px-4 bg-card border-y border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
              Browse by Category
            </h2>
            <CategoryButtons />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingDown className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Find the Cheapest</h3>
                <p className="text-muted-foreground text-sm">
                  Instantly see which shop has the lowest price for any product.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Store className="w-7 h-7 text-blue-700" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">All Major Shops</h3>
                <p className="text-muted-foreground text-sm">
                  Compare prices from Tesco, Asda, Sainsbury&apos;s, Lidl, Boots, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-amber-700" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Updated Regularly</h3>
                <p className="text-muted-foreground text-sm">
                  Prices are checked daily to ensure you get the most accurate information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shops Section */}
        <section className="py-12 px-4 bg-card border-t border-border">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center">
              {shopsWithDistance ? "Shops Near You" : "Shops We Compare"}
            </h2>

            {/* With distance - show as list sorted by proximity */}
            {shopsWithDistance && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {shopsWithDistance.map(({ shop, nearestLocation, distance }) => (
                  <div
                    key={shop.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    style={{ borderLeft: `3px solid ${shop.color}` }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{shop.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {nearestLocation.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium flex-shrink-0">
                      <MapPin className="w-3 h-3" />
                      {formatDistance(distance)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Without distance - simple list */}
            {!shopsWithDistance && (
              <div className="flex flex-wrap items-center justify-center gap-6">
                {shops.map((shop) => (
                  <div
                    key={shop.id}
                    className="flex items-center justify-center px-4 py-2 rounded-lg bg-secondary/50 text-secondary-foreground font-medium text-sm"
                    style={{ borderLeft: `3px solid ${shop.color}` }}
                  >
                    {shop.name}
                  </div>
                ))}
              </div>
            )}

            {/* Location prompt */}
            {!shopsWithDistance && status !== "granted" && (
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm" onClick={requestLocation} className="gap-2">
                  <Navigation className="w-4 h-4" />
                  Enable location to see nearest shops
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground">Cheapest Near Me - UK Price Comparison</p>
            <p className="text-xs text-muted-foreground mt-1">
              Prices are for reference only and may vary by location.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
