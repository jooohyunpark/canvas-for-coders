"use client"

import { cn } from "@/lib/utils"
import { Scroll, ScrollControls } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import type { Mesh } from "three"

// One box per page, each with its own spin so they never sit in the same pose.
const PAGES = [
  {
    title: "<ScrollControls>",
    body: "Wraps the scene and turns the container into a scroll area, pages tall.",
    color: "#00ff00",
    speed: 0.3,
    phase: 0,
  },
  {
    title: "<Scroll>",
    body: "Anything inside travels with the scroll, so the whole scene moves like page content.",
    color: "#0000ff",
    speed: 0.38,
    phase: 0.8,
  },
  {
    title: "<Scroll html>",
    body: "The same ride, for real DOM. This paragraph is an HTML block moving alongside the boxes.",
    color: "#ff00ff",
    speed: 0.46,
    phase: 1.6,
  },
]

const SIZE = 1.2

type BoxProps = {
  color: string
  speed: number
  phase: number
  position: [number, number, number]
}

// Each box spins itself, off its own clock: identical speeds would hold the
// three in the same pose all the way down, and the small differences keep them
// out of step. Driving rotation from elapsed time rather than adding to it each
// frame means a re-render cannot knock a box off its phase.
function Box({ color, speed, phase, position }: BoxProps) {
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime * speed + phase
    mesh.current.rotation.set(t * 0.6, t, t * 0.3)
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[SIZE, SIZE, SIZE]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// The boxes stand in the right half of the frame, clear of the copy, one
// viewport apart so each one holds the middle of the frame while its caption
// does the same on the DOM side. <Scroll> is what carries the whole column.
function Boxes() {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <group position={[width * 0.25, 0, 0]}>
      {PAGES.map((page, i) => (
        <Box key={page.title} {...page} position={[0, -i * height, 0]} />
      ))}
    </group>
  )
}

// The DOM half. Each block is exactly one canvas tall in pixels, so one page of
// copy fills the frame at a time.
function Captions() {
  const height = useThree((state) => state.size.height)

  return (
    <>
      {PAGES.map((page) => (
        <div
          key={page.title}
          style={{ height }}
          className="flex w-1/2 flex-col justify-center gap-2 px-6 sm:px-10"
        >
          <h3 className="font-mono text-sm text-white sm:text-base">
            {page.title}
          </h3>
          <p className="text-xs text-white/60 sm:text-sm">{page.body}</p>
        </div>
      ))}
    </>
  )
}

export function ScrollHtmlScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={["#111111"]} />

        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 4]} intensity={2} />

        <ScrollControls pages={PAGES.length} damping={0.2}>
          <Scroll>
            <Boxes />
          </Scroll>

          <Scroll html style={{ width: "100%" }}>
            <Captions />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}
