"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBox({ 
  initialValue = "", 
  autoFocus = false,
  size = "large" 
}: { 
  initialValue?: string
  autoFocus?: boolean
  size?: "large" | "small" 
}) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const isLarge = size === "large"

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className={`relative flex items-center w-full ${isLarge ? 'max-w-2xl mx-auto' : ''}`}>
        <div className="relative flex-1">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`} />
          <Input
            type="text"
            placeholder="Search for products, brands, or categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={autoFocus}
            className={`
              pl-12 pr-4 
              ${isLarge ? 'h-14 text-lg rounded-full' : 'h-10 text-sm rounded-lg'} 
              bg-card border-border
              focus:ring-2 focus:ring-primary/20 focus:border-primary
              transition-all
            `}
          />
        </div>
        <Button 
          type="submit" 
          className={`
            ml-2 
            ${isLarge ? 'h-14 px-8 rounded-full text-base' : 'h-10 px-4 rounded-lg text-sm'}
          `}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
