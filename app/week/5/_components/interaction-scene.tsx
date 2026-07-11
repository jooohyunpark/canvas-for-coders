"use client"

import { cn } from "@/lib/utils"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"

// A live version of the lesson's Box: click to grow, hover to highlight.
// scale and color are just props driven by state, so the mesh re-renders
// to match — scene = f(state), the same pattern as any React component.
function Box() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "cyan" : "blue"} />
    </mesh>
  )
}

export function InteractionScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#111111"]} />
        <Box />

        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 4]} intensity={2} />

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
