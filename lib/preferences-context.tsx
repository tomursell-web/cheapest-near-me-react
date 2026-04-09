"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserPreference = 'cheapest' | 'best-value' | 'quality'

type PreferencesContextType = {
  preference: UserPreference | null
  setPreference: (pref: UserPreference) => void
  hasCompletedOnboarding: boolean
  completeOnboarding: () => void
  resetOnboarding: () => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<UserPreference | null>(null)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedPref = localStorage.getItem('user-preference') as UserPreference | null
    const savedOnboarding = localStorage.getItem('onboarding-complete')
    if (savedPref) setPreferenceState(savedPref)
    if (savedOnboarding === 'true') setHasCompletedOnboarding(true)
  }, [])

  const setPreference = (pref: UserPreference) => {
    setPreferenceState(pref)
    if (mounted) {
      localStorage.setItem('user-preference', pref)
    }
  }

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true)
    if (mounted) {
      localStorage.setItem('onboarding-complete', 'true')
    }
  }

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false)
    setPreferenceState(null)
    if (mounted) {
      localStorage.removeItem('onboarding-complete')
      localStorage.removeItem('user-preference')
    }
  }

  return (
    <PreferencesContext.Provider value={{ preference, setPreference, hasCompletedOnboarding, completeOnboarding, resetOnboarding }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error("usePreferences must be used within PreferencesProvider")
  return context
}
