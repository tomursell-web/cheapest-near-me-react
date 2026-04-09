"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type Coordinates = {
  lat: number
  lng: number
}

type LocationStatus = "idle" | "loading" | "granted" | "denied" | "error"

type LocationContextType = {
  coordinates: Coordinates | null
  status: LocationStatus
  error: string | null
  postcode: string | null
  requestLocation: () => void
  setLocationFromPostcode: (postcode: string) => Promise<boolean>
  clearLocation: () => void
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

const STORAGE_KEY = "cheapest-near-me-location"

export function LocationProvider({ children }: { children: ReactNode }) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [status, setStatus] = useState<LocationStatus>("idle")
  const [error, setError] = useState<string | null>(null)
  const [postcode, setPostcode] = useState<string | null>(null)

  // Load saved location from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { coordinates: savedCoords, postcode: savedPostcode } = JSON.parse(saved)
        if (savedCoords?.lat && savedCoords?.lng) {
          setCoordinates(savedCoords)
          setPostcode(savedPostcode || null)
          setStatus("granted")
        }
      }
    } catch {
      // Ignore parsing errors
    }
  }, [])

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (coordinates) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ coordinates, postcode }))
      } catch {
        // Ignore storage errors
      }
    }
  }, [coordinates, postcode])

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus("error")
      setError("Geolocation is not supported by your browser")
      return
    }

    setStatus("loading")
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCoordinates(coords)
        setPostcode(null) // Clear postcode when using GPS
        setStatus("granted")
        setError(null)
      },
      (err) => {
        setStatus("denied")
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied. Please enter a postcode instead.")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable. Please enter a postcode instead.")
            break
          case err.TIMEOUT:
            setError("Location request timed out. Please try again or enter a postcode.")
            break
          default:
            setError("Unable to get location. Please enter a postcode instead.")
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    )
  }, [])

  const setLocationFromPostcode = useCallback(async (postcodeInput: string): Promise<boolean> => {
    setStatus("loading")
    setError(null)

    const cleanPostcode = postcodeInput.trim().toUpperCase().replace(/\s+/g, " ")

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(cleanPostcode)}`
      )

      if (!response.ok) {
        if (response.status === 404) {
          setStatus("error")
          setError("Invalid postcode. Please check and try again.")
          return false
        }
        throw new Error("API error")
      }

      const data = await response.json()

      if (data.status === 200 && data.result) {
        const coords = {
          lat: data.result.latitude,
          lng: data.result.longitude,
        }
        setCoordinates(coords)
        setPostcode(cleanPostcode)
        setStatus("granted")
        setError(null)
        return true
      } else {
        setStatus("error")
        setError("Invalid postcode. Please check and try again.")
        return false
      }
    } catch {
      setStatus("error")
      setError("Failed to look up postcode. Please try again.")
      return false
    }
  }, [])

  const clearLocation = useCallback(() => {
    setCoordinates(null)
    setPostcode(null)
    setStatus("idle")
    setError(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore storage errors
    }
  }, [])

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        status,
        error,
        postcode,
        requestLocation,
        setLocationFromPostcode,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider")
  }
  return context
}

/**
 * Haversine formula to calculate distance between two coordinates in miles
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959 // Earth's radius in miles
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Format distance for display
 */
export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    return "< 0.1 mi"
  }
  return `${miles.toFixed(1)} mi`
}
