"use client"

import { cn } from "@/lib/utils"
import { Html, OrbitControls, Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { Group, Mesh, Object3D } from "three"

// A DOM label pinned to a point in the scene. The label sits on a small marker
// that orbits the central shape; when it swings behind, `occlude` hides it, so
// the flat DOM reads as if it lived in 3D space.
function LabeledScene() {
  const center = useRef<Mesh>(null)
  const orbit = useRef<Group>(null)

  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.y += delta * 0.2
  })

  return (
    <>
      <Sphere ref={center} args={[2, 64, 32]}>
        <meshStandardMaterial color="blue" />
      </Sphere>

      <group ref={orbit}>
        <group position={[5, 0, 0]}>
          <Sphere args={[0.2, 64, 32]}>
            <meshStandardMaterial color="yellow" />
          </Sphere>

          <Html
            center
            distanceFactor={8}
            occlude={[center as React.RefObject<Object3D>]}
            position={[0, 0.5, 0]}
          >
            <div className="pointer-events-none rounded bg-white/95 px-2 py-1 text-xs font-medium whitespace-nowrap text-black shadow select-none">
              Hello world!
            </div>
          </Html>
        </group>
      </group>

      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
    </>
  )
}

export function HtmlScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={["#111111"]} />

        <LabeledScene />

        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
