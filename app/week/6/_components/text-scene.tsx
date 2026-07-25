"use client"

import { cn } from "@/lib/utils"
import { OrbitControls, Text } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import type { Group } from "three"

// <Text> builds real geometry that lives in the scene like any mesh. We spin
// it slowly so you can see it is a flat object in space: edge-on it thins to a
// line, and its back face is the same word mirrored.
function SpinningText() {
  const ref = useRef<Group>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.2
  })

  return (
    <group ref={ref}>
      <Text
        fontSize={1.6}
        letterSpacing={-0.03}
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
      >
        Canvas for coders
      </Text>
    </group>
  )
}

export function TextScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
        <color attach="background" args={["#111111"]} />

        <Suspense fallback={null}>
          <SpinningText />
        </Suspense>

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
