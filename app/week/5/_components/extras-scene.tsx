"use client"

import { cn } from "@/lib/utils"
import {
  Cloud,
  Clouds,
  OrbitControls,
  PerspectiveCamera,
  Sparkles,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { type Group, MeshBasicMaterial } from "three"

// Two cloud layers on their own groups, each slowly counter-rotating so the
// puffs drift past each other. useFrame runs here because this component is
// rendered inside <Canvas>.
function DriftingClouds() {
  const ref1 = useRef<Group>(null)
  const ref2 = useRef<Group>(null)

  useFrame((state) => {
    if (ref1.current) ref1.current.rotation.x = state.clock.elapsedTime * 0.07
    if (ref2.current) ref2.current.rotation.x = state.clock.elapsedTime * -0.05
  })

  return (
    <>
      <group ref={ref1}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud segments={40} bounds={[3, 1, 1]} volume={2} color="white" />
        </Clouds>
      </group>
      <group ref={ref2}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud segments={40} bounds={[3, 1, 1]} volume={2} color="white" />
        </Clouds>
      </group>
    </>
  )
}

export function ExtrasScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />

        <color attach="background" args={["#111111"]} />

        <DriftingClouds />

        <Sparkles count={150} scale={14} size={3} speed={0.4} color="white" />

        <OrbitControls />
      </Canvas>
    </div>
  )
}
