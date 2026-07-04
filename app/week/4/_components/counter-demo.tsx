"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CounterDemo({ className }: { className?: string }) {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount(count + 1)

  return (
    <div
      className={cn(
        "flex justify-center rounded-lg border border-border bg-muted/30 p-6",
        className
      )}
    >
      <Button onClick={handleClick}>{count}</Button>
    </div>
  )
}
