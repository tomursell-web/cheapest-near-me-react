"use client"

import { useState } from "react"
import { MapPin, Navigation, Loader2, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useLocation } from "@/lib/location-context"

type LocationPickerProps = {
  compact?: boolean
}

export function LocationPicker({ compact = false }: LocationPickerProps) {
  const { 
    coordinates, 
    status, 
    error, 
    postcode, 
    requestLocation, 
    setLocationFromPostcode, 
    clearLocation 
  } = useLocation()
  const [postcodeInput, setPostcodeInput] = useState("")
  const [showPostcodeInput, setShowPostcodeInput] = useState(false)

  const handlePostcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postcodeInput.trim()) return
    const success = await setLocationFromPostcode(postcodeInput)
    if (success) {
      setPostcodeInput("")
      setShowPostcodeInput(false)
    }
  }

  // Compact version for header/inline use
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {status === "loading" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Locating...</span>
          </div>
        )}
        
        {status === "granted" && coordinates && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm text-foreground bg-secondary px-3 py-1.5 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{postcode || `${coordinates.lat.toFixed(3)}, ${coordinates.lng.toFixed(3)}`}</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={clearLocation}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {(status === "idle" || status === "denied" || status === "error") && (
          <Button variant="outline" size="sm" onClick={requestLocation} className="gap-2">
            <Navigation className="w-4 h-4" />
            Set Location
          </Button>
        )}
      </div>
    )
  }

  // Full version for dedicated location setup
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Set Your Location</h3>
          <p className="text-sm text-muted-foreground">
            Find the cheapest prices and nearest shops to you
          </p>
        </div>

        {/* Current Location Display */}
        {status === "granted" && coordinates && (
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {postcode || "GPS Location"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={clearLocation}>
                Change
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Locating you...</p>
          </div>
        )}

        {/* Location Options */}
        {(status === "idle" || status === "denied" || status === "error") && (
          <div className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* GPS Button */}
            <Button
              onClick={requestLocation}
              className="w-full gap-2"
              size="lg"
            >
              <Navigation className="w-5 h-5" />
              Use My Current Location
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Postcode Input */}
            {!showPostcodeInput ? (
              <Button
                variant="outline"
                onClick={() => setShowPostcodeInput(true)}
                className="w-full gap-2"
                size="lg"
              >
                <Search className="w-5 h-5" />
                Enter a Postcode
              </Button>
            ) : (
              <form onSubmit={handlePostcodeSubmit} className="space-y-3">
                <Input
                  type="text"
                  placeholder="e.g. SW1A 1AA"
                  value={postcodeInput}
                  onChange={(e) => setPostcodeInput(e.target.value)}
                  className="text-center text-lg tracking-wider"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowPostcodeInput(false)
                      setPostcodeInput("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={!postcodeInput.trim()}>
                    Find
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
