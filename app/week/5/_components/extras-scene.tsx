"use client"

import { cn } from "@/lib/utils"
import {
  Cloud,
  Clouds,
  GradientTexture,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { useRef, useState } from "react"
import { DoubleSide, type Group, MeshBasicMaterial } from "three"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5

// A single door, same construction as the Week 1 intro: a colored plane
// standing on the ground with a gradient "light" plane spilling out behind
// it. Hover to grow it and brighten the light.
function Door({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const { scale, opacity } = useSpring({
    scale: (hovered ? [1.2, 1, 1] : [1, 1, 1]) as [number, number, number],
    opacity: hovered ? 1 : 0.5,
    config: { duration: 200 },
  })

  return (
    <group position={position}>
      <group position={[0, -HEIGHT * 0.5, 0]}>
        <animated.mesh
          scale={scale}
          position={[0, HEIGHT * 0.5, 0]}
          rotation={[0, Math.PI, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color="#00ff00" side={DoubleSide} />
        </animated.mesh>

        <animated.mesh
          scale={scale}
          position={[0, 0, -LIGHT_HEIGHT * 0.5]}
          rotation={[Math.PI * 0.5, Math.PI, 0]}
        >
          <planeGeometry args={[WIDTH, LIGHT_HEIGHT]} />
          <animated.meshBasicMaterial color="#00ff00" transparent opacity={opacity}>
            {/* alphaMap, not map: GradientTexture parses colors through THREE.Color, which strips alpha */}
            <GradientTexture
              attach="alphaMap"
              stops={[0, 1]}
              colors={["white", "black"]}
              size={1024}
            />
          </animated.meshBasicMaterial>
        </animated.mesh>
      </group>
    </group>
  )
}

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

        <Door position={[0, 0, 3]} />

        <OrbitControls />
      </Canvas>
    </div>
  )
}
