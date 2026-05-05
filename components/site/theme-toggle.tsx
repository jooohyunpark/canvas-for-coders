"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const noopSubscribe = () => () => {}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
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
    return <div className="h-8 w-[104px] rounded-lg bg-muted" />
  }

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList>
        <TabsTrigger value="system" aria-label="System theme">
          <Monitor size={14} />
        </TabsTrigger>
        <TabsTrigger value="light" aria-label="Light theme">
          <Sun size={14} />
        </TabsTrigger>
        <TabsTrigger value="dark" aria-label="Dark theme">
          <Moon size={14} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
