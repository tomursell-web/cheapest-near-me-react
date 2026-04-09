"use client"

import Link from "next/link"
import { ShoppingCart, Pill, Wrench, Dog, Home, Car } from "lucide-react"
import { categories } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Pill,
  Wrench,
  Dog,
  Home,
  Car,
}

export function CategoryButtons() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || ShoppingCart
        return (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className={`
              flex flex-col items-center justify-center gap-2 p-4 rounded-xl
              ${category.color}
              hover:scale-105 transition-all duration-200
              border border-transparent hover:border-primary/20
              min-h-[100px]
            `}
          >
            <Icon className="w-7 h-7" />
            <span className="text-sm font-medium text-center">{category.name}</span>
          </Link>
        )
      })}
    </div>
  )
}
