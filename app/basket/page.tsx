"use client"
import { useBasket } from "@/lib/basket-context";
import { Button } from "@/components/ui/button";
import { Trash2, MapPin } from "lucide-react";
import Link from "next/link";

export default function BasketPage() {
  const { items, removeItem, getTotalsByShop } = useBasket();
  const shopTotals = getTotalsByShop();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Basket</h1>
      
      {items.length === 0 ? (
        <p className="text-slate-500">Your basket is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm">
                <div>
                  <p className="font-bold">{item.product.name}</p>
                  <p className="text-sm text-slate-500">{item.product.brand} at {item.shopId}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id, item.shopId)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-dashed">
            <h2 className="font-bold mb-4">Shop Subtotals</h2>
            {Object.entries(shopTotals).map(([name, total]) => (
              <div key={name} className="flex justify-between text-sm mb-2">
                <span>{name}</span>
                <span className="font-bold">£{total.toFixed(2)}</span>
              </div>
            ))}
            <Link href="/route">
              <Button className="w-full mt-6 py-6 text-lg gap-2">
                <MapPin className="w-5 h-5" />
                Plan my shopping route
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
