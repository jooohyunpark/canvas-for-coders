"use client"

import { motion } from "motion/react"
import { useLayoutEffect, useRef, useState } from "react"

const SIZE = 48 // size-12 = 48px

export function ClickToMove() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: rect.width / 2, y: rect.height / 2 })
  }, [])

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="relative aspect-video w-full overflow-hidden rounded-lg border"
    >
      {pos && (
        <motion.div
          className="absolute size-12 rounded-full bg-blue-500"
          initial={{ x: pos.x - SIZE / 2, y: pos.y - SIZE / 2 }}
          animate={{ x: pos.x - SIZE / 2, y: pos.y - SIZE / 2 }}
          transition={{ type: "spring", stiffness: 80, damping: 20, bounce: 0 }}
        />
      )}
    </div>
  )
}
