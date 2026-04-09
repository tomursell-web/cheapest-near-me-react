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
      <h1 className="text-2xl font-bold mb-6">Basket</h1>
      <div className="space-y-4 mb-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-sm">
            <div>
              <p className="font-bold">{item.product.name}</p>
              <p className="text-sm text-slate-500">at {item.shopId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id, item.shopId)}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
      {items.length > 0 && (
        <div className="bg-slate-50 p-6 rounded-xl border border-dashed text-center">
          <p className="mb-4 font-medium">Ready to shop at {Object.keys(shopTotals).length} stores?</p>
          <Link href="/route">
            <Button className="w-full py-6 text-lg gap-2"><MapPin /> Plan My Route</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
