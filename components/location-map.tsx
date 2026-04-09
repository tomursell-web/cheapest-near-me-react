"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

type MapMarker = {
  id: string
  lat: number
  lng: number
  name: string
  details?: string
  price?: number
  isCheapest?: boolean
  color?: string
}

type LocationMapProps = {
  center: { lat: number; lng: number }
  markers: MapMarker[]
  zoom?: number
  height?: string
  onMarkerClick?: (marker: MapMarker) => void
  selectedMarkerId?: string
}

// Declare Leaflet types
declare global {
  interface Window {
    L: typeof import("leaflet")
  }
}

export function LocationMap({
  center,
  markers,
  zoom = 13,
  height = "400px",
  onMarkerClick,
  selectedMarkerId,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null)
  const markersRef = useRef<import("leaflet").Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load Leaflet dynamically
  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if Leaflet is already loaded
    if (window.L) {
      setIsLoaded(true)
      return
    }

    // Load Leaflet CSS
    const linkEl = document.createElement("link")
    linkEl.rel = "stylesheet"
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    linkEl.crossOrigin = ""
    document.head.appendChild(linkEl)

    // Load Leaflet JS
    const scriptEl = document.createElement("script")
    scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    scriptEl.crossOrigin = ""
    scriptEl.onload = () => {
      setIsLoaded(true)
    }
    document.head.appendChild(scriptEl)

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.L) return

    // Don't reinitialize if map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([center.lat, center.lng], zoom)
      return
    }

    const L = window.L

    // Create map
    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom)
    mapInstanceRef.current = map

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add user location marker
    const userIcon = L.divIcon({
      className: "custom-user-marker",
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background: #3B82F6;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    })

    L.marker([center.lat, center.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("Your location")

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isLoaded, center.lat, center.lng, zoom])

  // Update markers
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !window.L) return

    const L = window.L
    const map = mapInstanceRef.current

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Add new markers
    markers.forEach((marker, index) => {
      const isSelected = marker.id === selectedMarkerId
      const markerColor = marker.isCheapest
        ? "#16A34A"
        : marker.color || "#6B7280"

      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: translateY(-50%);
          ">
            <div style="
              width: ${isSelected ? "36px" : "28px"};
              height: ${isSelected ? "36px" : "28px"};
              background: ${markerColor};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: ${isSelected ? "14px" : "12px"};
            ">${index + 1}</div>
            ${
              marker.price
                ? `<div style="
                background: ${markerColor};
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                font-weight: 600;
                margin-top: 2px;
                white-space: nowrap;
              ">${marker.price.toFixed(1)}p</div>`
                : ""
            }
          </div>
        `,
        iconSize: [40, 60],
        iconAnchor: [20, 30],
      })

      const leafletMarker = L.marker([marker.lat, marker.lng], {
        icon: customIcon,
      })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 150px;">
            <strong>${marker.name}</strong>
            ${marker.details ? `<br><small>${marker.details}</small>` : ""}
            ${marker.price ? `<br><strong style="color: ${markerColor};">${marker.price.toFixed(1)}p/litre</strong>` : ""}
            ${marker.isCheapest ? '<br><span style="color: #16A34A; font-size: 11px; font-weight: 600;">Best Price</span>' : ""}
          </div>
        `)

      if (onMarkerClick) {
        leafletMarker.on("click", () => onMarkerClick(marker))
      }

      markersRef.current.push(leafletMarker)
    })
  }, [isLoaded, markers, selectedMarkerId, onMarkerClick])

  // Handle selected marker
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current || !selectedMarkerId) return

    const selectedMarker = markers.find((m) => m.id === selectedMarkerId)
    if (selectedMarker) {
      mapInstanceRef.current.setView([selectedMarker.lat, selectedMarker.lng], 15, {
        animate: true,
      })
    }
  }, [isLoaded, selectedMarkerId, markers])

  if (!isLoaded) {
    return (
      <div
        style={{ height }}
        className="bg-secondary rounded-lg flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading map...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={mapRef}
      style={{ height }}
      className="rounded-lg overflow-hidden border border-border"
    />
  )
}
