"use client"

import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
})

export const ThemeProvider = ({ children, defaultTheme = "light", storageKey = "theme" }) => {
  const [theme, setTheme] = useState(() => {
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem(storageKey)
    return storedTheme || defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    // Remove previous theme class
    root.classList.remove("light", "dark")

    // Add current theme class
    root.classList.add(theme)

    // Store theme in localStorage
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const value = {
    theme,
    setTheme: (newTheme) => setTheme(newTheme),
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
