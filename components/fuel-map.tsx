"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet"
import { Icon, LatLngBounds } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

type FuelStation = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  distance: number
  price: number
  lastUpdated: string
}

type FuelMapProps = {
  stations: FuelStation[]
  userLocation: { lat: number; lng: number }
  searchRadius: number // in miles
  onGetDirections?: (station: FuelStation) => void
}

// Custom marker icons
const createCustomIcon = (color: string, isUser = false) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="3"/>
        ${isUser ? '<circle cx="16" cy="16" r="8" fill="white"/><circle cx="16" cy="16" r="4" fill="#3B82F6"/>' : ''}
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

const userIcon = createCustomIcon("#3B82F6", true)
const cheapestIcon = createCustomIcon("#16A34A")
const within3pIcon = createCustomIcon("#F59E0B")
const expensiveIcon = createCustomIcon("#EF4444")

// Component to fit map bounds
function FitBounds({ stations, userLocation }: { stations: FuelStation[], userLocation: { lat: number; lng: number } }) {
  const map = useMap()

  useEffect(() => {
    if (stations.length === 0) return

    const bounds = new LatLngBounds(
      stations.map(s => [s.lat, s.lng] as [number, number])
    )
    bounds.extend([userLocation.lat, userLocation.lng])

    map.fitBounds(bounds, { padding: [20, 20] })
  }, [map, stations, userLocation])

  return null
}

export function FuelMap({ stations, userLocation, searchRadius, onGetDirections }: FuelMapProps) {
  const [selectedStation, setSelectedStation] = useState<FuelStation | null>(null)

  const cheapestPrice = Math.min(...stations.map(s => s.price))
  const radiusInMeters = searchRadius * 1609.34 // Convert miles to meters

  const getMarkerIcon = (station: FuelStation) => {
    if (station.price === cheapestPrice) return cheapestIcon
    if (station.price <= cheapestPrice + 3) return within3pIcon
    return expensiveIcon
  }

  const getDirectionsUrl = (station: FuelStation) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}&travelmode=driving`
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution='© Stadia Maps, © OpenStreetMap contributors'
        />

        {/* User location marker */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <strong>Your Location</strong>
            </div>
          </Popup>
        </Marker>

        {/* Search radius circle */}
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={radiusInMeters}
          pathOptions={{
            color: "#3B82F6",
            fillColor: "#3B82F6",
            fillOpacity: 0.1,
            weight: 2,
          }}
        />

        {/* Station markers */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={getMarkerIcon(station)}
            eventHandlers={{
              click: () => setSelectedStation(station),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-lg mb-2">{station.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{station.address}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Price per litre:</span>
                  <span className="font-bold text-lg">{station.price.toFixed(1)}p</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Distance:</span>
                  <span className="text-sm">{station.distance.toFixed(1)} miles</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm">Last updated:</span>
                  <span className="text-sm">{station.lastUpdated}</span>
                </div>
                <button
                  onClick={() => window.open(getDirectionsUrl(station), '_blank')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
                >
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <FitBounds stations={stations} userLocation={userLocation} />
      </MapContainer>
    </div>
  )
}