"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingBasket, Fuel, Tv, ShoppingCart, Menu, MapPin, Navigation, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useBasket } from "@/lib/basket-context"
import { useLocation } from "@/lib/location-context"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/petrol", label: "Fuel", icon: Fuel },
  { href: "/big-purchases", label: "Big Purchases", icon: Tv },
  { href: "/search", label: "Shopping", icon: ShoppingCart },
]

export function Header() {
  const { getTotalItems } = useBasket()
  const { coordinates, status, postcode, requestLocation } = useLocation()
  const pathname = usePathname()
  const totalItems = getTotalItems()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Evaluate</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: location + basket */}
        <div className="flex items-center gap-2">
          {/* Location indicator - desktop only */}
          <div className="hidden md:flex items-center">
            {status === "loading" && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground px-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Locating...</span>
              </div>
            )}
            {status === "granted" && coordinates && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground px-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="max-w-[120px] truncate">
                  {postcode || `${coordinates.lat.toFixed(2)}°`}
                </span>
              </div>
            )}
            {(status === "idle" || status === "denied" || status === "error") && (
              <button
                onClick={requestLocation}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Set Location</span>
              </button>
            )}
          </div>

          {/* Basket */}
          <Link href="/basket">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBasket className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="text-lg font-bold mb-6">Evaluate</SheetTitle>

              {/* Mobile Location */}
              <div className="mb-6 pb-4 border-b border-border">
                {status === "loading" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Locating...</span>
                  </div>
                )}
                {status === "granted" && coordinates && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-foreground">
                      {postcode || `${coordinates.lat.toFixed(3)}, ${coordinates.lng.toFixed(3)}`}
                    </span>
                  </div>
                )}
                {(status === "idle" || status === "denied" || status === "error") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { requestLocation() }}
                    className="gap-2 w-full"
                  >
                    <Navigation className="w-4 h-4" />
                    Set Location
                  </Button>
                )}
              </div>

              <nav className="flex flex-col gap-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      pathname === href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
                <Link
                  href="/basket"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <ShoppingBasket className="w-5 h-5" />
                  Basket {totalItems > 0 ? `(${totalItems})` : ""}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
