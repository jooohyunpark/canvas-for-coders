"use client"

import { cn } from "@/lib/utils"
import {
  GradientTexture,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
} from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import type { PerspectiveCamera as PerspectiveCameraImpl } from "three"
import * as THREE from "three"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5

type DoorConfig = {
  color: string
  bearing: number // degrees clockwise from +z
  distance: number // world units from the middle of the field
  facing: number // degrees the door points, which is where its light spills
}

// The camera opens in the middle of the field looking down +z, so a door placed
// at bearing 0 is the one thing in the frame. The rest sit past the edges of
// that opening shot and only turn up once the camera has backed out.
const DOORS: DoorConfig[] = [
  { color: "#00ff00", bearing: 95, distance: 18, facing: 185 },
  { color: "#0000ff", bearing: 150, distance: 16, facing: 150 },
  { color: "#ff0000", bearing: 215, distance: 20, facing: 125 },
  { color: "#ff00ff", bearing: 285, distance: 17, facing: 105 },
  // The one the shot opens on: dead ahead, turned to face the camera.
  { color: "#ffff00", bearing: 0, distance: 14, facing: 0 },
]

// The shot: start in the middle of the field, back out of it, then climb to
// straight overhead, stopping just short of it so `up` stays defined. This is
// the one door scene with a perspective camera, because a dolly out of the
// middle of something is exactly what an orthographic camera cannot show.
const CAMERA_START = 0.05
const CAMERA_END = 50
const START_POLAR = Math.PI * 0.5 // level with the doors
const END_POLAR = 0.02 // all but straight down
const START_ANGLE = Math.PI

// The Week 1 door, minus the hover: a colored plane standing on the ground with
// its light spilling forward. The pivot is the foot of the door, so the light
// lies flat on the floor.
function Door({ color, bearing, distance, facing }: DoorConfig) {
  const angle = THREE.MathUtils.degToRad(bearing)

  return (
    <group
      position={[Math.sin(angle) * distance, 0, Math.cos(angle) * distance]}
      rotation={[0, THREE.MathUtils.degToRad(facing), 0]}
    >
      <group position={[0, -HEIGHT * 0.5, 0]}>
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
      </group>
    </group>
  )
}

// Nothing animates on its own. Every frame reads the scroll position and places
// the camera to match, so the bar scrubs the shot in both directions. It opens
// standing in the middle of the field at y = 0, eye to eye with the one door
// ahead, where the light lying flat on the floor is squashed to a sliver.
// Scrolling backs the camera out, then lifts it to a plan view where the rest
// of the field and its beams open up.
function ScrollCamera() {
  const camera = useRef<PerspectiveCameraImpl>(null)
  const scroll = useScroll()

  useFrame(() => {
    if (!camera.current) return

    // Two beats out of one scrollbar: range() hands each move its own slice,
    // and the slices overlap, so the climb starts before the dolly has landed.
    const out = scroll.range(0, 0.6)
    const up = scroll.range(0.4, 0.6)

    // Spherical placement around the middle of the field: radius grows from
    // nothing, so at the top of the scroll the camera is standing in it, and
    // the polar angle swings from level with the doors to almost straight down.
    const radius = THREE.MathUtils.lerp(CAMERA_START, CAMERA_END, out)
    const polar = THREE.MathUtils.lerp(START_POLAR, END_POLAR, up)
    const azimuth = START_ANGLE + scroll.offset * Math.PI

    camera.current.position.setFromSphericalCoords(radius, polar, azimuth)
    camera.current.lookAt(0, 0, 0)
  })

  // near matters here: the camera starts inside the field and passes close to a
  // door on its way out.
  return <PerspectiveCamera ref={camera} makeDefault fov={50} near={0.1} />
}

export function ScrollScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas flat>
        <color attach="background" args={["#111111"]} />

        <ScrollControls pages={3} damping={0.2}>
          <ScrollCamera />

          {DOORS.map((door) => (
            <Door key={door.color} {...door} />
          ))}
        </ScrollControls>
      </Canvas>
    </div>
  )
}
