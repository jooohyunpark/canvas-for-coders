"use client"

import { useState } from "react"
import { Minus, Plus, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function Display({ count }: { count: number }) {
  return <div className="text-2xl font-medium tabular-nums">{count}</div>
}

function Controls({
  onIncrement,
  onDecrement,
  onReset,
}: {
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}) {
  return (
    <div className="flex gap-2">
      <Button size="icon" onClick={onIncrement} aria-label="Increment">
        <Plus />
      </Button>
      <Button size="icon" onClick={onDecrement} aria-label="Decrement">
        <Minus />
      </Button>
      <Button size="icon" onClick={onReset} aria-label="Reset">
        <RotateCcw />
      </Button>
    </div>
  )
}

export function LiftStateDemo({ className }: { className?: string }) {
  const [count, setCount] = useState(0)

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-6 rounded-lg border p-6",
        className
      )}
    >
      <Display count={count} />
      <Controls
        onIncrement={() => setCount(count + 1)}
        onDecrement={() => setCount(count - 1)}
        onReset={() => setCount(0)}
      />
    </div>
  )
}
