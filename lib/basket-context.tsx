"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Product, shops } from "./data"

export type BasketItem = { product: Product; shopId: string; quantity: number }

type BasketContextType = {
  items: BasketItem[];
  addItem: (product: Product, shopId: string) => void;
  removeItem: (productId: string, shopId: string) => void;
  getTotalsByShop: () => Record<string, number>;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([])

  const addItem = (product: Product, shopId: string) => {
    setItems(prev => [...prev, { product, shopId, quantity: 1 }])
  }

  const removeItem = (productId: string, shopId: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.shopId === shopId)))
  }

  const getTotalsByShop = () => {
    return items.reduce((acc, item) => {
      const shop = shops.find(s => s.id === item.shopId)
      const shopName = shop ? shop.name : "Unknown Shop"
      const priceObj = item.product.prices.find(p => p.shopId === item.shopId)
      const price = priceObj ? priceObj.price : 0
      acc[shopName] = (acc[shopName] || 0) + price
      return acc
    }, {} as Record<string, number>)
  }

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, getTotalsByShop }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const context = useContext(BasketContext)
  if (!context) throw new Error("useBasket must be used within a BasketProvider")
  return context
}
