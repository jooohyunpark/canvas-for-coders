"use client"

import { cn } from "@/lib/utils"
import { Html, OrbitControls, Text3D } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"
import { Suspense, useRef, useState } from "react"

const FONT = "/fonts/helvetiker_regular.typeface.json"
const SIZE = 1
const DEPTH = 0.25

// Everything is released from the same point, high above the middle. Bodies
// that start inside each other are pushed apart, which is what scatters a word
// into a pile instead of dropping it as a column.
const SPAWN_HEIGHT = 11

// Past this, the oldest letters are taken out from under the pile.
const MAX_LETTERS = 100

// What the camera looks at, which is also the one point that projects to the
// middle of the canvas at any orbit angle. The hint is anchored to it.
const LOOK_AT: [number, number, number] = [0, 3, 0]

const WORDS = [
  "gravity",
  "mass",
  "collider",
  "impulse",
  "friction",
  "velocity",
  "inertia",
  "momentum",
]

// One color for every letter. A pile this deep reads by its light and shadow,
// and anything else would be competing with the one thing worth looking at.
const COLOR = "#ffffff"

type Letter = {
  id: number
  char: string
  rotation: [number, number, number]
}

const randomTumble = (): [number, number, number] => [
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
  Math.random() * Math.PI * 2,
]

// One word becomes one letter per body. Each gets its own tumble, so they land
// facing every direction.
function randomWord(firstId: number): Letter[] {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)]

  return word.split("").map((char, i) => ({
    id: firstId + i,
    char,
    rotation: randomTumble(),
  }))
}

// A collider with nothing to draw: the floor is invisible, and you read it from
// where the letters stop. `fixed` means it takes part in collisions but is
// never moved by them, so a hundred letters landing on it cannot shift it.
function Ground() {
  return (
    <RigidBody type="fixed" colliders={false}>
      {/* Half-extents, so this is 60 x 2 x 60 with its top face at y = 0. Wide,
          because nothing walls the letters in, and thick on purpose: a thin
          floor is something to fall through. */}
      <CuboidCollider args={[30, 1, 30]} position={[0, -1, 0]} />
    </RigidBody>
  )
}

function FallingLetter({ char, rotation }: Letter) {
  return (
    <RigidBody
      position={[0, SPAWN_HEIGHT, 0]}
      rotation={rotation}
      // Extruded text is a solid, so the automatic collider works: it measures
      // the letter's bounding box and hands the engine that. "hull" would wrap
      // the glyph more tightly, at a cost per body.
      colliders="cuboid"
      // Small and moving fast: check the path between frames, not just the
      // frames, so nothing passes through the floor at speed.
      ccd
    >
      <Text3D font={FONT} size={SIZE} height={DEPTH} curveSegments={6}>
        {char}
        <meshStandardMaterial color={COLOR} metalness={0.2} roughness={0.8} />
      </Text3D>
    </RigidBody>
  )
}

export function PhysicsScene({ className }: { className?: string }) {
  const [letters, setLetters] = useState<Letter[]>([])
  const nextId = useRef(0)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  // Orbiting the scene ends in a pointer-up too, so measure how far the pointer
  // travelled and only treat one that stayed put as a click.
  const handlePointerUp = (event: React.PointerEvent) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 4) return

    const word = randomWord(nextId.current)
    nextId.current += word.length
    setLetters((current) => [...current, ...word].slice(-MAX_LETTERS))
  }

  return (
    <div
      className={cn(
        "relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg border bg-[#111111]",
        className
      )}
      onPointerDown={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY }
      }}
      onPointerUp={handlePointerUp}
    >
      {/* Not flat like the other scenes on this page: these letters are solids,
          and an extrusion only reads as one if something lights its sides. */}
      <Canvas camera={{ position: [0, 6, 24], fov: 40 }}>
        <color attach="background" args={["#111111"]} />

        <ambientLight intensity={0.8} />
        <directionalLight position={[-3, 10, 6]} intensity={2.5} />

        {/* Two things load here: the engine, and the typeface <Text3D> extrudes
            from. Both suspend, so catch them and the rest of the page stays. */}
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Ground />

            {/* Keyed by id, not index: when the oldest letters drop off the
                front of the list, every body still in the pile has to stay
                exactly where the simulation left it. */}
            {letters.map((letter) => (
              <FallingLetter key={letter.id} {...letter} />
            ))}
          </Physics>

          {/* pointerEvents has to go on the <Html> itself: drei puts the style
              on the wrapper it renders, and that wrapper sits over the middle
              of the canvas, where it would otherwise swallow the first click
              and any drag that starts on it. */}
          {letters.length === 0 && (
            <Html center position={LOOK_AT} style={{ pointerEvents: "none" }}>
              <p className="text-sm whitespace-nowrap text-white/50">
                Click to drop a word
              </p>
            </Html>
          )}
        </Suspense>

        <OrbitControls
          target={LOOK_AT}
          maxPolarAngle={Math.PI * 0.5}
          enableDamping
          dampingFactor={0.05}
          enablePan={false}
          enableZoom={false}
        />
      </Canvas>
    </div>
  )
}
