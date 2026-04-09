"use client"

import { useState } from "react"
import { Coins, Scale, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { usePreferences, type UserPreference } from "@/lib/preferences-context"

const preferences = [
  {
    id: 'cheapest' as UserPreference,
    title: 'Cheapest Price',
    description: 'Always show me the absolute lowest price, regardless of brand or quality.',
    icon: Coins,
    color: 'bg-green-100 text-green-700 border-green-200',
    selectedColor: 'bg-green-500 text-white border-green-500',
  },
  {
    id: 'best-value' as UserPreference,
    title: 'Best Value',
    description: 'Balance between price and quality. Good deals on trusted brands.',
    icon: Scale,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    selectedColor: 'bg-blue-500 text-white border-blue-500',
  },
  {
    id: 'quality' as UserPreference,
    title: 'Quality First',
    description: 'Prioritise premium brands and products, then find the best price for them.',
    icon: Star,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    selectedColor: 'bg-amber-500 text-white border-amber-500',
  },
]

export function OnboardingModal() {
  const { preference, setPreference, hasCompletedOnboarding, completeOnboarding } = usePreferences()
  const [selected, setSelected] = useState<UserPreference | null>(preference)

  if (hasCompletedOnboarding) return null

  const handleContinue = () => {
    if (selected) {
      setPreference(selected)
      completeOnboarding()
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              What matters most to you?
            </h2>
            <p className="text-muted-foreground">
              Help us personalise your experience by telling us your shopping priorities.
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {preferences.map((pref) => {
              const Icon = pref.icon
              const isSelected = selected === pref.id
              return (
                <button
                  key={pref.id}
                  onClick={() => setSelected(pref.id)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all text-left
                    flex items-start gap-4
                    ${isSelected ? pref.selectedColor : `${pref.color} hover:opacity-80`}
                  `}
                >
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${isSelected ? 'bg-white/20' : 'bg-white/80'}
                  `}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : ''}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{pref.title}</h3>
                    <p className={`text-sm ${isSelected ? 'text-white/80' : 'opacity-80'}`}>
                      {pref.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <Button 
            onClick={handleContinue}
            disabled={!selected}
            className="w-full h-12 text-base"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            You can change this anytime in settings
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
