"use client"
import { useBasket } from '@/lib/basket-context';
import { Button } from '@/components/ui/button';
import { Navigation, MapPin } from 'lucide-react';

export default function RoutePage() {
  const { getTotalsByShop } = useBasket();
  const shopTotals = getTotalsByShop();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Optimized Route</h1>
      
      {Object.keys(shopTotals).length === 0 ? (
        <div className="text-center p-10 border rounded-xl bg-slate-50">
          <p>Add items to your basket to plan a route!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(shopTotals).map(([shopName, total], i) => (
            <div key={shopName} className="flex gap-4 items-start relative">
              {/* Timeline Line */}
              {i !== Object.keys(shopTotals).length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-green-200" />
              )}
              
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10 shrink-0">
                {i + 1}
              </div>
              
              <div className="flex-1 bg-white p-5 rounded-xl border shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{shopName}</h3>
                  <span className="font-mono font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                    £{total.toFixed(2)}
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2 border-slate-200 text-slate-600"
                  onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(shopName)}`, '_blank')}
                >
                  <Navigation className="w-3 h-3" /> Get Directions
                </Button>
              </div>
            </div>
          ))}
          
          <div className="pt-6 border-t mt-10">
            <p className="text-sm text-center text-slate-500 mb-4">Total shops to visit: {Object.keys(shopTotals).length}</p>
            <Button className="w-full py-6 text-lg" onClick={() => window.print()}>Save Route as PDF</Button>
          </div>
        </div>
      )}
    </div>
  );
}
