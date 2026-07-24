"use client"

import { cn } from "@/lib/utils"
import { Html, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { useState } from "react"

const COUNT = 6

// The boxes read `open` and animate between a tight cluster and a spread ring.
// Nothing here knows about the DOM: it is the same UI = f(state) loop, only
// the "UI" is a group of meshes.
function Cluster({ open }: { open: boolean }) {
  const { spread } = useSpring({
    spread: open ? 1 : 0,
    config: { tension: 120, friction: 14 },
  })

  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2
        return (
          <animated.mesh
            key={i}
            position={spread.to(
              (s): [number, number, number] => [
                Math.cos(angle) * s * 2.2,
                Math.sin(angle) * s * 2.2,
                0,
              ]
            )}
            scale={spread.to((s) => 1 - s * 0.25)}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color={`hsl(${(i / COUNT) * 360}, 70%, 60%)`} />
          </animated.mesh>
        )
      })}
    </>
  )
}

export function HtmlButtonScene({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 7] }}>
        <color attach="background" args={["#111111"]} />

        <Cluster open={open} />

        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 4]} intensity={2} />

        {/* A real <button>, positioned at a point in the scene. Its onClick is
            an ordinary React handler that flips state, and the boxes follow. */}
        <Html center position={[0, -3, 0]}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-black shadow transition-transform hover:scale-105 active:scale-95"
          >
            {open ? "Gather" : "Explode"}
          </button>
        </Html>

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
