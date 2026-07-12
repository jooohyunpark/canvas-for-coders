"use client"

import { cn } from "@/lib/utils"
import { animated, easings, useSpring } from "@react-spring/three"
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"

// One reusable component, springing scale and color between two states.
// Each <AnimatedBox /> below owns its own state, so clicking one animates
// only that cube — write the behavior once, drop it in as many times as
// you like: scene = f(state), composed.
function AnimatedBox({ position }: { position: [number, number, number] }) {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { scale, color } = useSpring({
    scale: active ? 1.5 : 1,
    color: hovered ? "cyan" : "blue",
    config: { duration: 150, easing: easings.easeOutCubic },
  })

  const { rotation } = useSpring({
    loop: true,
    from: { rotation: [0, 0, 0] as [number, number, number] },
    to: { rotation: [Math.PI * -2, 0, 0] as [number, number, number] },
    config: { duration: 10 * 1000 },
  })

  return (
    <animated.mesh
      position={position}
      scale={scale}
      rotation={rotation as unknown as [number, number, number]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}

export function SpringScene({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={["#111111"]} />

        <AnimatedBox position={[-2, 0, 0]} />
        <AnimatedBox position={[0, 0, 0]} />
        <AnimatedBox position={[2, 0, 0]} />

        <ambientLight intensity={1} />
        <directionalLight position={[2, 3, 4]} intensity={2} />

        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  )
}
