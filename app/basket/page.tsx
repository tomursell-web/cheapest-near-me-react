"use client"
import { useEffect, useState } from 'react';
import { useBasket } from '@/lib/basket-context';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Clock, Car, Footprints } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import the map dynamically to prevent build errors
const LocationMap = dynamic(() => import('@/components/location-map'), { 
  ssr: false,
  loading: () => <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-xl" />
});

export default function RoutePage() {
  const { getTotalsByShop } = useBasket();
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const shopTotals = getTotalsByShop();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Sort shops by distance from user (Nearest Neighbor)
  const calculateOptimizedRoute = () => {
    const stops = Object.entries(shopTotals).map(([name, total]) => ({ name, total }));
    if (!userLoc) return stops;

    // Simple sorting by "as the crow flies" distance for now
    return stops.sort((a, b) => {
      // In a production app, you'd use a real distance matrix API here
      return 0; // Placeholder for sorting logic
    });
  };

  const optimizedRoute = calculateOptimizedRoute();

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Route</h1>

      {/* 1. THE MAP SECTION */}
      <div className="mb-8 h-[300px] rounded-xl overflow-hidden border shadow-inner">
        <LocationMap />
      </div>

      {/* 2. ROUTE STEPS */}
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="bg-blue-500 text-white rounded-full p-2"><MapPin className="w-4 h-4" /></div>
          <div>
            <p className="font-bold">Start: Your Location</p>
            <p className="text-sm text-slate-500">Calculating your best path...</p>
          </div>
        </div>

        {optimizedRoute.map((stop, i) => (
          <div key={stop.name} className="relative flex gap-4 items-start pl-2">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-200" />
            
            <div className="z-10 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            
            <div className="flex-1 bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{stop.name}</h3>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  Spend: £{stop.total.toFixed(2)}
                </span>
              </div>
              
              <div className="flex gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Car className="w-3 h-3" /> ~8 mins</span>
                <span className="flex items-center gap-1"><Footprints className="w-3 h-3" /> ~22 mins</span>
              </div>

              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stop.name)}`, '_blank')}
              >
                <Navigation className="w-4 h-4" /> Open in Google Maps
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. TOTALS BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center shadow-lg max-w-2xl mx-auto">
        <div>
          <p className="text-xs text-slate-500">Total Distance</p>
          <p className="font-bold">~3.2 miles</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Start Navigation</Button>
      </div>
    </div>
  );
}
