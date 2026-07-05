"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function EffectDemo({ className }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={cn("flex justify-center rounded-lg border p-6", className)}>
      <div className="text-2xl font-medium tabular-nums">
        {time?.toLocaleTimeString() ?? "--:--:--"}
      </div>
    </div>
  )
}
