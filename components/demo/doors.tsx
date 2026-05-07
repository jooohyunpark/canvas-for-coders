"use client"

import { GradientTexture, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { useMemo, useState } from "react"
import * as THREE from "three"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5

// Distance from a door's pivot to the far corner of its shadow plane —
// used as a bounding radius so two doors+shadows can never overlap.
const SHADOW_RADIUS = Math.hypot(WIDTH / 2, LIGHT_HEIGHT)
const MIN_DISTANCE = SHADOW_RADIUS * 2
const X_RANGE = MIN_DISTANCE
const DOOR_COLORS = ["#ffff00", "#ff5cf3", "#5cfff0"]

type DoorConfig = {
  position: [number, number, number]
  rotation: [number, number, number]
  color: string
}

function generateDoors(count: number): DoorConfig[] {
  const doors: DoorConfig[] = []
  let attempts = 0
  while (doors.length < count && attempts < 500) {
    attempts++
    const x = (Math.random() * 2 - 1) * X_RANGE
    const z = (Math.random() * 2 - 1) * X_RANGE
    const overlaps = doors.some(({ position }) => {
      const dx = position[0] - x
      const dz = position[2] - z
      return Math.hypot(dx, dz) < MIN_DISTANCE
    })
    if (overlaps) continue
    doors.push({
      position: [x, 0, z],
      rotation: [0, Math.floor(Math.random() * 4) * (Math.PI / 2), 0],
      color: DOOR_COLORS[doors.length % DOOR_COLORS.length],
    })
  }
  return doors
}

function DoorComponent({ position, rotation, color }: DoorConfig) {
  const [hovered, setHovered] = useState(false)
  const { scale, opacity } = useSpring({
    scale: (hovered ? [1.2, 1, 1] : [1, 1, 1]) as [number, number, number],
    opacity: hovered ? 1 : 0.5,
    config: { duration: 200 },
  })

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, -HEIGHT * 0.5, 0]}>
        <animated.mesh
          scale={scale}
          position={[0, HEIGHT * 0.5, 0]}
          rotation={[0, Math.PI, 0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </animated.mesh>

        <animated.mesh
          scale={scale}
          position={[0, 0, -LIGHT_HEIGHT * 0.5]}
          rotation={[Math.PI * 0.5, Math.PI, 0]}
        >
          <planeGeometry args={[WIDTH, LIGHT_HEIGHT]} />
          <animated.meshBasicMaterial
            color={color}
            transparent
            opacity={opacity}
          >
            {/* alphaMap, not map: drei's GradientTexture parses colors through THREE.Color, which strips alpha */}
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

function Scene() {
  const doors = useMemo(() => generateDoors(3), [])

  return (
    <>
      {doors.map((door, i) => (
        <DoorComponent key={i} {...door} />
      ))}
    </>
  )
}

export function Doors() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      <Canvas
        flat
        orthographic
        camera={{
          position: [-10, 5, -10],
          zoom: 20,
          near: 0,
          far: 1000,
        }}
      >
        <OrbitControls
          minPolarAngle={Math.PI * 0.5 * 0.75}
          maxPolarAngle={Math.PI * 0.5 * 0.75}
          enablePan={false}
          enableZoom={false}
        />

        <Scene />
      </Canvas>
    </div>
  )
}
