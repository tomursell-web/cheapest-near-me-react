"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl
Icon.Default.mergeOptions({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

type ShopLocation = {
  id: string
  name: string
  lat: number
  lng: number
  subtotal: number
  address: string
}

type RouteMapProps = {
  userLocation: { lat: number; lng: number }
  shops: ShopLocation[]
}

// Custom marker icons
const userIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#3B82F6" stroke="white" stroke-width="3"/>
      <circle cx="16" cy="16" r="8" fill="white"/>
      <circle cx="16" cy="16" r="4" fill="#3B82F6"/>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

const shopIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#16A34A" stroke="white" stroke-width="3"/>
      <text x="16" y="21" text-anchor="middle" fill="white" font-size="16" font-weight="bold">S</text>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
})

// Component to fit map bounds
function FitBounds({ userLocation, shops }: { userLocation: { lat: number; lng: number }, shops: ShopLocation[] }) {
  const map = useMap()

  useEffect(() => {
    if (shops.length === 0) return

    const points = [
      [userLocation.lat, userLocation.lng],
      ...shops.map(shop => [shop.lat, shop.lng])
    ]

    const bounds = points.map(point => [point[0], point[1]] as [number, number])
    map.fitBounds(bounds, { padding: [20, 20] })
  }, [map, userLocation, shops])

  return null
}

export function RouteMap({ userLocation, shops }: RouteMapProps) {
  // Create route coordinates for polyline
  const routeCoordinates: [number, number][] = [
    [userLocation.lat, userLocation.lng],
    ...shops.map(shop => [shop.lat, shop.lng] as [number, number])
  ]

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
              <br />
              <span className="text-sm">Starting point</span>
            </div>
          </Popup>
        </Marker>

        {/* Shop markers */}
        {shops.map((shop, index) => (
          <Marker
            key={shop.id}
            position={[shop.lat, shop.lng]}
            icon={shopIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-lg mb-2">{shop.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{shop.address}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Stop #{index + 1}</span>
                  <span className="font-bold">£{shop.subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">
                  {shop.subtotal.toFixed(2)} to spend here
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route polyline */}
        {shops.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            pathOptions={{
              color: '#3B82F6',
              weight: 4,
              opacity: 0.8,
            }}
          />
        )}

        <FitBounds userLocation={userLocation} shops={shops} />
      </MapContainer>
    </div>
  )
}