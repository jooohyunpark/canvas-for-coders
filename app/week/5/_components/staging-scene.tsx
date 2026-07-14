"use client"

import { cn } from "@/lib/utils"
import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { LevaPanel, useControls, useCreateStore } from "leva"
import { type ComponentProps, Suspense } from "react"

type EnvPreset = NonNullable<ComponentProps<typeof Environment>["preset"]>

// Loads the Voyager model and drops it into the scene. Its materials are
// standard PBR, so what lights and reflects them is whatever environment
// the scene provides — toggle <Environment /> below to see the difference.
function Voyager() {
  const { scene } = useGLTF("/Voyager.glb")
  return <primitive object={scene} />
}

useGLTF.preload("/Voyager.glb")

export function StagingScene({ className }: { className?: string }) {
  // A scoped store keeps the leva panel inside this demo instead of floating
  // fixed on the page.
  const store = useCreateStore()
  const { environment, preset } = useControls(
    {
      environment: true,
      preset: {
        options: ["sunset", "city", "dawn", "night", "warehouse", "forest"],
      },
    },
    { store }
  )

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[-5, 2, 5]} fov={50} />

        <color attach="background" args={["white"]} />

        <ambientLight intensity={0.1} />

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1}>
            <Center>
              <Voyager />
            </Center>
          </Bounds>

          {environment && <Environment preset={preset as EnvPreset} />}
        </Suspense>

        <OrbitControls makeDefault />
      </Canvas>

      <div className="absolute top-3 right-3 w-64">
        <LevaPanel
          store={store}
          fill
          titleBar={{ drag: true, title: "Controls", filter: false }}
        />
      </div>
    </div>
  )
}
