"use client"

import { cn } from "@/lib/utils"
import {
  GradientTexture,
  Html,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei"
import { Shuffle } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import {
  animated,
  easings,
  useSpring,
  type SpringValue,
} from "@react-spring/three"
import { useState } from "react"
import * as THREE from "three"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5

// Keep neighbors at least a door + shadow apart, scattered over a wide field.
const SHADOW_RADIUS = Math.hypot(WIDTH / 2, LIGHT_HEIGHT)
const MIN_DISTANCE = SHADOW_RADIUS * 2
const RANGE = MIN_DISTANCE * 1.3
const DOOR_COUNT = 5
const DOOR_COLORS = ["#00ff00", "#0000ff", "#ff0000", "#ffff00", "#ff00ff"]

type Placement = {
  position: [number, number, number]
  rotation: [number, number, number]
}

const randomPlacement = (): Placement => ({
  position: [
    (Math.random() * 2 - 1) * RANGE,
    0,
    (Math.random() * 2 - 1) * RANGE,
  ],
  rotation: [0, Math.floor(Math.random() * 4) * (Math.PI / 2), 0],
})

// Random scatter, but always exactly `count` items: try for spacing, and if a
// slot can't be spaced out in time, fill it anyway so nothing ever goes missing.
function generateLayout(count: number): Placement[] {
  const items: Placement[] = []
  for (let attempts = 0; items.length < count && attempts < 1000; attempts++) {
    const p = randomPlacement()
    const tooClose = items.some(
      ({ position }) =>
        Math.hypot(position[0] - p.position[0], position[2] - p.position[2]) <
        MIN_DISTANCE
    )
    if (!tooClose) items.push(p)
  }
  while (items.length < count) items.push(randomPlacement())
  return items
}

// Scale x only, so a door (or the button) collapses to a vertical sliver and
// opens back out without changing height.
const widthScale = (scale: SpringValue<number>) =>
  scale.to((s): [number, number, number] => [s, 1, 1])

// The door from Week 1, minus the hover.
function Door({
  position,
  rotation,
  color,
  scale,
}: Placement & { color: string; scale: SpringValue<number> }) {
  return (
    <group position={position} rotation={rotation}>
      <animated.group
        scale={widthScale(scale)}
        position={[0, -HEIGHT * 0.5, 0]}
      >
        <mesh position={[0, HEIGHT * 0.5, 0]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[WIDTH, HEIGHT]} />
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        </mesh>

        <mesh
          position={[0, 0, -LIGHT_HEIGHT * 0.5]}
          rotation={[Math.PI * 0.5, Math.PI, 0]}
        >
          <planeGeometry args={[WIDTH, LIGHT_HEIGHT]} />
          <meshBasicMaterial
            color={color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.5}
          >
            {/* alphaMap, not map: GradientTexture parses colors through
                THREE.Color, which strips alpha */}
            <GradientTexture
              attach="alphaMap"
              stops={[0, 1]}
              colors={["white", "black"]}
              size={1024}
            />
          </meshBasicMaterial>
        </mesh>
      </animated.group>
    </group>
  )
}

// The button gets a random slot in the same layout as the doors, so it stands
// among them and hops to a new spot on each shuffle. It's a billboard <Html>,
// so it always faces the camera and stays readable and clickable.
function ButtonDoor({
  position,
  onClick,
}: Placement & { onClick: () => void }) {
  return (
    <Html center position={[position[0], HEIGHT * 0.8, position[2]]} occlude>
      <button
        onClick={onClick}
        aria-label="Shuffle"
        className="grid size-8 place-items-center rounded-full bg-white text-black shadow transition-transform hover:bg-white/80 active:scale-97"
      >
        <Shuffle className="size-4" />
      </button>
    </Html>
  )
}

function Scene() {
  const [layout, setLayout] = useState(() => generateLayout(DOOR_COUNT + 1))
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }))

  // Collapse everything, swap in a fresh layout while it's hidden, then open
  // it back out — the button rides along to a new slot too.
  const randomize = () =>
    api.start({
      config: { duration: 400, easing: easings.easeOutCubic },
      to: async (next) => {
        await next({ scale: 0 })
        setLayout(generateLayout(DOOR_COUNT + 1))
        await next({ scale: 1 })
      },
    })

  // The button takes the first slot (always placed), the rest are doors.
  const [button, ...doors] = layout

  return (
    <>
      {doors.map((placement, i) => (
        <Door
          key={i}
          {...placement}
          color={DOOR_COLORS[i % DOOR_COLORS.length]}
          scale={scale}
        />
      ))}

      <ButtonDoor {...button} onClick={randomize} />
    </>
  )
}

export function HtmlButtonScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas flat>
        <OrthographicCamera
          makeDefault
          position={[-20, 10, -10]}
          zoom={15}
          near={-100}
          far={100}
        />

        <color attach="background" args={["#111111"]} />

        <Scene />

        <OrbitControls
          minPolarAngle={Math.PI * 0.5 * 0.75}
          maxPolarAngle={Math.PI * 0.5 * 0.75}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          enablePan={false}
          enableZoom={false}
        />
      </Canvas>
    </div>
  )
}
