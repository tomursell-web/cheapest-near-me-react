"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./data"

export type BasketItem = {
  product: Product
  shopId: string
  quantity: number
}

type BasketContextType = {
  items: BasketItem[]
  addItem: (product: Product, shopId: string) => void
  removeItem: (productId: string, shopId: string) => void
  updateQuantity: (productId: string, shopId: string, quantity: number) => void
  clearBasket: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const BasketContext = createContext<BasketContextType | undefined>(undefined)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('basket')
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        // Invalid JSON, ignore
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('basket', JSON.stringify(items))
    }
  }, [items, mounted])

  const addItem = (product: Product, shopId: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.shopId === shopId)
      if (existing) {
        return prev.map(i => 
          i.product.id === product.id && i.shopId === shopId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, shopId, quantity: 1 }]
    })
  }

  const removeItem = (productId: string, shopId: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.shopId === shopId)))
  }

  const updateQuantity = (productId: string, shopId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, shopId)
      return
    }
    setItems(prev => prev.map(i => 
      i.product.id === productId && i.shopId === shopId
        ? { ...i, quantity }
        : i
    ))
  }

  const clearBasket = () => setItems([])

  const getTotalItems = () => items.reduce((sum, i) => sum + i.quantity, 0)

  const getTotalPrice = () => items.reduce((sum, i) => {
    const price = i.product.prices.find(p => p.shopId === i.shopId)?.price ?? 0
    return sum + price * i.quantity
  }, 0)

  return (
    <BasketContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearBasket, getTotalItems, getTotalPrice }}>
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  const context = useContext(BasketContext)
  if (!context) throw new Error("useBasket must be used within BasketProvider")
  return context
}
