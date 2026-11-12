"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

/**
 * A destructive control armed by holding rather than clicking. An overlay copy
 * of the label wipes in from the left across the hold (CSS clip-path), and only
 * a completed hold fires `onReset`. Releasing early cancels both the wipe and
 * the pending reset.
 */
export function HoldToReset({
  onReset,
  holdMs = 2000,
}: {
  onReset: () => void
  /** How long the button must be held before it fires, in ms. The wipe is
   *  timed off the same value so the two can't drift. Defaults to 2s. */
  holdMs?: number
}) {
  const [holding, setHolding] = useState(false)
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelHold = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current)
      holdTimer.current = null
    }
    setHolding(false)
  }

  const startHold = () => {
    if (holdTimer.current) return
    setHolding(true)
    holdTimer.current = setTimeout(() => {
      holdTimer.current = null
      setHolding(false)
      onReset()
    }, holdMs)
  }

  // A hold in flight when this unmounts must not fire a reset afterwards.
  useEffect(
    () => () => {
      if (holdTimer.current) clearTimeout(holdTimer.current)
    },
    []
  )

  return (
    <Button
      variant="outline"
      size="xs"
      className="relative overflow-hidden select-none"
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      onContextMenu={(e) => e.preventDefault()}
    >
      Hold to reset
      {/* A high-contrast copy of the label, hidden off the right edge and wiped
          in from the left while held. clip-path insets read like margin
          shorthand; the two durations differ so the return snaps but the
          reveal is even. */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center rounded-[inherit] bg-foreground text-background"
        style={{
          clipPath: holding ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: holding
            ? `clip-path ${holdMs}ms linear`
            : "clip-path 200ms ease-out",
        }}
      >
        Hold to reset
      </span>
    </Button>
  )
}
