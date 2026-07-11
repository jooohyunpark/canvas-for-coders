"use client"

import { cn } from "@/lib/utils"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"

// One Box component, reused three times. Same definition, different props:
// each call gets its own position and color, so what the component renders
// is a function of the props you pass — UI = f(props), returning a mesh.
function Box({
  position,
  color,
}: {
  position: [number, number, number]
  color: string
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export function ComponentsScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#111111"]} />

        <Box position={[-2, 0, 0]} color="#ff0000" />
        <Box position={[0, 0, 0]} color="#0000ff" />
        <Box position={[2, 0, 0]} color="#00ff00" />

        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 4]} intensity={2} />

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
