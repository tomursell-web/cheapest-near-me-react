"use client"

import { ArrowLeft, ShoppingBasket, Trash2, Minus, Plus, Package } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useBasket } from "@/lib/basket-context"
import { getShopById } from "@/lib/data"

export default function BasketPage() {
  const { items, removeItem, updateQuantity, clearBasket, getTotalPrice } = useBasket()
  
  // Group items by shop
  const itemsByShop = items.reduce((acc, item) => {
    const shopId = item.shopId
    if (!acc[shopId]) {
      acc[shopId] = []
    }
    acc[shopId].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const totalPrice = getTotalPrice()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Your Basket</h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          {items.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearBasket} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {items.length > 0 ? (
          <>
            {/* Items grouped by shop */}
            <div className="space-y-6 mb-8">
              {Object.entries(itemsByShop).map(([shopId, shopItems]) => {
                const shop = getShopById(shopId)
                const shopTotal = shopItems.reduce((sum, item) => {
                  const price = item.product.prices.find(p => p.shopId === shopId)?.price ?? 0
                  return sum + price * item.quantity
                }, 0)

                return (
                  <Card key={shopId}>
                    <CardContent className="p-0">
                      {/* Shop Header */}
                      <div 
                        className="px-4 py-3 border-b border-border flex items-center justify-between"
                        style={{ borderLeftColor: shop?.color, borderLeftWidth: '4px' }}
                      >
                        <span className="font-semibold text-foreground">{shop?.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Subtotal: £{shopTotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-border">
                        {shopItems.map((item) => {
                          const price = item.product.prices.find(p => p.shopId === shopId)?.price ?? 0
                          return (
                            <div key={`${item.product.id}-${shopId}`} className="p-4 flex gap-4">
                              {/* Product Image Placeholder */}
                              <div className="w-16 h-16 bg-secondary/50 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-8 h-8 text-muted-foreground/40" />
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                                <h3 className="font-medium text-foreground truncate">
                                  {item.product.name}
                                </h3>
                                <p className="text-primary font-semibold mt-1">
                                  £{price.toFixed(2)}
                                </p>
                              </div>

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8"
                                  onClick={() => updateQuantity(item.product.id, shopId, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8"
                                  onClick={() => updateQuantity(item.product.id, shopId, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>

                              {/* Remove Button */}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.product.id, shopId)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Summary */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">£{totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Shopping at {Object.keys(itemsByShop).length} {Object.keys(itemsByShop).length === 1 ? 'shop' : 'shops'}
                </p>
                <Button className="w-full h-12 text-base" disabled>
                  Checkout Coming Soon
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-16 text-center">
              <ShoppingBasket className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Your basket is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Start adding products to compare and save money.
              </p>
              <Link href="/">
                <Button>Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
