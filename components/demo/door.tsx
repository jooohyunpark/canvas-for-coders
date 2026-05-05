"use client"

import { GradientTexture, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { animated, useSpring } from "@react-spring/three"
import { useState } from "react"
import * as THREE from "three"

const WIDTH = 1.6
const HEIGHT = WIDTH * 1.618
const LIGHT_HEIGHT = HEIGHT * 2.5
const COLOR = "#ffff00"

function DoorComponent() {
  const [hovered, setHovered] = useState(false)
  const { scale, opacity } = useSpring({
    scale: (hovered ? [1.2, 1, 1] : [1, 1, 1]) as [number, number, number],
    opacity: hovered ? 1 : 0.5,
    config: { duration: 200 },
  })

  return (
    <group position={[0, -HEIGHT * 0.5, 0]}>
      <animated.mesh
        scale={scale}
        position={[0, HEIGHT * 0.5, 0]}
        rotation={[0, Math.PI, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial color={COLOR} side={THREE.DoubleSide} />
      </animated.mesh>

      <animated.mesh
        scale={scale}
        position={[0, 0, -LIGHT_HEIGHT * 0.5]}
        rotation={[Math.PI * 0.5, Math.PI, 0]}
      >
        <planeGeometry args={[WIDTH, LIGHT_HEIGHT]} />
        <animated.meshBasicMaterial color={COLOR} transparent opacity={opacity}>
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
  )
}

function Scene() {
  return (
    <>
      <DoorComponent />
    </>
  )
}

export function Door() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
      <Canvas
        flat
        orthographic
        camera={{
          position: [-10, 5, -10],
          zoom: 30,
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
