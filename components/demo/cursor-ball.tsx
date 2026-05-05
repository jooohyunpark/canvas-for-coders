"use client"

import { motion, useSpring } from "motion/react"

const SPRING = {
  mass: 0.1,
}

export function CursorBall() {
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - bounds.left - 24)
    y.set(e.clientY - bounds.top - 24)
  }

  return (
    <div
      onPointerMove={moveTo}
      onPointerDown={moveTo}
      className="relative aspect-video w-full overflow-hidden rounded-lg border"
    >
      <motion.div
        className="absolute size-8 rounded-full bg-indigo-500 sm:size-12"
        style={{ x, y }}
      />
    </div>
  )
}
