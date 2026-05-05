"use client"

import { motion, useSpring } from "motion/react"

const SPRING = {
  mass: 0.1,
}

export function CursorBall() {
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        x.set(e.clientX - bounds.left - 24)
        y.set(e.clientY - bounds.top - 24)
      }}
      className="relative aspect-video w-full overflow-hidden rounded-lg border"
    >
      <motion.div
        className="absolute size-12 rounded-full bg-blue-500"
        style={{ x, y }}
      />
    </div>
  )
}
