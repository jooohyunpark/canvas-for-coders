"use client"

import { cn } from "@/lib/utils"
import { motion, useSpring } from "motion/react"

const SPRING = {
  mass: 0.1,
}

export function CursorBall({ className }: { className?: string }) {
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - bounds.left - bounds.width / 2)
    y.set(e.clientY - bounds.top - bounds.height / 2)
  }

  return (
    <div
      onPointerMove={moveTo}
      onPointerDown={moveTo}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 size-8 -translate-1/2 rounded-full bg-indigo-500 sm:size-12"
        style={{ x, y }}
      />
    </div>
  )
}
