"use client"

import Link from "next/link"
import { Fuel, ShoppingCart, Tv } from "lucide-react"
import { Header } from "@/components/header"
import { SearchBox } from "@/components/search-box"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto text-center max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight">
              Evaluate
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Find the best value near you
            </p>
            <SearchBox autoFocus />
          </div>
        </section>

        {/* Feature Tiles */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Fuel Prices */}
              <Link href="/petrol" className="group block">
                <div className="h-full rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-6">
                    <Fuel className="w-7 h-7 text-amber-700" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Fuel Prices
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Live petrol and diesel prices at stations near you. Find the cheapest fuel in your area.
                  </p>
                </div>
              </Link>

              {/* Big Purchases */}
              <Link href="/big-purchases" className="group block">
                <div className="h-full rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">
                    <Tv className="w-7 h-7 text-blue-700" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Big Purchases
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Compare TVs, laptops, phones, washing machines, sofas and more across Currys, John Lewis, AO, and others.
                  </p>
                </div>
              </Link>

              {/* Everyday Shopping */}
              <Link href="/search" className="group block">
                <div className="h-full rounded-2xl border border-border bg-card p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200">
                  <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
                    <ShoppingCart className="w-7 h-7 text-green-700" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Everyday Shopping
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Groceries, pharmacy, household, pet food and more. Compare prices from Tesco, Asda, Sainsbury&apos;s, and others.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border mt-8">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground font-semibold">Evaluate</p>
            <p className="text-xs text-muted-foreground mt-1">
              Prices are for reference only and may vary by location.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
