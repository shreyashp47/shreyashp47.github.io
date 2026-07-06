import { useState, useEffect } from 'react'

const STORAGE_KEY = 'portfolio-theme'

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'default'
    } catch {
      return 'default'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'default' ? '' : theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {}
  }, [theme])

  const setTheme = (id) => setThemeState(id)

  return { theme, setTheme }
}
