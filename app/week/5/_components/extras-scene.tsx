"use client"

import { cn } from "@/lib/utils"
import {
  Center,
  Cloud,
  Clouds,
  GradientTexture,
  MeshRefractionMaterial,
  OrbitControls,
  OrthographicCamera,
  useEnvironment,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { Suspense, useRef, useState } from "react"
import { DoubleSide, type Group, type Mesh, MeshBasicMaterial } from "three"

const WIDTH = 1.2
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
    <group position={position} rotation={[0, Math.PI, 0]}>
      <group position={[0, -HEIGHT * 0.5, 0]}>
        <animated.mesh
          scale={scale}
          position={[0, HEIGHT * 0.5, 0]}
          rotation={[0, Math.PI, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color="yellow" side={DoubleSide} />
        </animated.mesh>

        <animated.mesh
          scale={scale}
          position={[0, 0, -LIGHT_HEIGHT * 0.5]}
          rotation={[Math.PI * 0.5, Math.PI, 0]}
        >
          <planeGeometry args={[WIDTH, LIGHT_HEIGHT]} />
          <animated.meshBasicMaterial
            color="yellow"
            transparent
            opacity={opacity}
            side={DoubleSide}
          >
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

// A slowly tumbling cloud. useFrame runs here because this component is
// rendered inside <Canvas>.
function DriftingCloud({ position }: { position: [number, number, number] }) {
  const ref = useRef<Group>(null)

  useFrame((state) => {
    if (ref.current) ref.current.rotation.x = state.clock.elapsedTime * 0.07
  })

  return (
    <group position={position}>
      <group ref={ref}>
        <Clouds material={MeshBasicMaterial}>
          <Cloud
            segments={40}
            bounds={[1, 0.2, 0.2]}
            volume={0.3}
            color="white"
          />
        </Clouds>
      </group>
    </group>
  )
}

// A faceted gem with drei's MeshRefractionMaterial: a glassy diamond material
// that ray-marches refraction through the geometry against an environment map.
// useEnvironment loads an HDRI to refract; the material builds its own BVH from
// this mesh's geometry.
function Gem({ position }: { position: [number, number, number] }) {
  const envMap = useEnvironment({ preset: "city" })
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.4
  })

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshRefractionMaterial
        envMap={envMap}
        bounces={3}
        ior={2.4}
        fresnel={1}
        aberrationStrength={0.03}
        toneMapped={false}
      />
    </mesh>
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
      <Canvas flat>
        <OrthographicCamera makeDefault position={[-5, 4, 10]} zoom={30} />

        <color attach="background" args={["#111111"]} />

        <Center>
          <Door position={[-5, 0, 0]} />

          <DriftingCloud position={[0, 0, 0]} />

          <Suspense fallback={null}>
            <Gem position={[5, 0, 0]} />
          </Suspense>
        </Center>

        <OrbitControls />
      </Canvas>
    </div>
  )
}
