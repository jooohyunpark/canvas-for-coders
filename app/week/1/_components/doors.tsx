"use client"

import { GradientTexture, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import {
  animated,
  easings,
  useSpring,
  type SpringValue,
} from "@react-spring/three"
import { RotateCw } from "lucide-react"
import { useState } from "react"
import * as THREE from "three"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5

// Distance from a door's pivot to the far corner of its shadow plane —
// used as a bounding radius so two doors+shadows can never overlap.
const SHADOW_RADIUS = Math.hypot(WIDTH / 2, LIGHT_HEIGHT)
const MIN_DISTANCE = SHADOW_RADIUS * 2
const X_RANGE = MIN_DISTANCE
const DOOR_COLORS = ["#00ff00", "#0000ff", "#ff0000"]

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

// Scale x only, so a door collapses to a vertical sliver and opens back out
// without changing height.
const widthScale = (scale: SpringValue<number>) =>
  scale.to((s): [number, number, number] => [s, 1, 1])

function DoorComponent({
  position,
  rotation,
  color,
  collapse,
}: DoorConfig & { collapse: SpringValue<number> }) {
  const [hovered, setHovered] = useState(false)
  const { scale, opacity } = useSpring({
    scale: (hovered ? [1.2, 1, 1] : [1, 1, 1]) as [number, number, number],
    opacity: hovered ? 1 : 0.5,
    config: { duration: 300, easing: easings.easeOutCubic },
  })

  return (
    <group position={position} rotation={rotation}>
      <animated.group
        scale={widthScale(collapse)}
        position={[0, -HEIGHT * 0.5, 0]}
      >
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
      </animated.group>
    </group>
  )
}

function Scene({
  doors,
  generation,
  collapse,
}: {
  doors: DoorConfig[]
  generation: number
  collapse: SpringValue<number>
}) {
  return (
    <>
      {doors.map((door, i) => (
        <DoorComponent
          key={`${generation}-${i}`}
          {...door}
          collapse={collapse}
        />
      ))}
    </>
  )
}

export function Doors({
  showRefreshButton = false,
  className,
}: {
  showRefreshButton?: boolean
  className?: string
}) {
  // Regenerating swaps in a fresh random layout; `generation` re-keys the doors
  // so their hover springs start clean at the new positions.
  const [{ doors, generation }, setScene] = useState(() => ({
    doors: generateDoors(3),
    generation: 0,
  }))

  const [{ scale: collapse }, api] = useSpring(() => ({ scale: 1 }))

  // Collapse the doors, swap in the fresh layout while they're hidden, then
  // open them back out at their new spots.
  const regenerate = () =>
    api.start({
      config: { duration: 400, easing: easings.easeOutCubic },
      to: async (next) => {
        await next({ scale: 0 })
        setScene(({ generation }) => ({
          doors: generateDoors(3),
          generation: generation + 1,
        }))
        await next({ scale: 1 })
      },
    })

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas
        flat
        orthographic
        camera={{
          position: [-20, 10, -10],
          zoom: 15,
          near: -100,
          far: 100,
        }}
      >
        <OrbitControls
          minPolarAngle={Math.PI * 0.5 * 0.75}
          maxPolarAngle={Math.PI * 0.5 * 0.75}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          enablePan={false}
          enableZoom={false}
        />

        <Scene doors={doors} generation={generation} collapse={collapse} />
      </Canvas>

      {showRefreshButton && (
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Regenerate doors"
          onClick={regenerate}
          className="absolute right-2 bottom-2"
        >
          <RotateCw />
        </Button>
      )}
    </div>
  )
}
