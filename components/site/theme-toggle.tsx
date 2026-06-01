"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // next-themes only knows the real theme on the client, so we must render
  // a neutral placeholder for SSR + first paint to avoid hydration mismatch.
  // useSyncExternalStore is React's built-in "server value vs. client value"
  // primitive: getServerSnapshot runs on SSR + initial hydration, getSnapshot
  // runs after — so `mounted` is false on the server, true thereafter, with
  // no setState-in-effect (which react-hooks/set-state-in-effect flags).
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  )
}
