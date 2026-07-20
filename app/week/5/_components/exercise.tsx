"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import { useSyncExternalStore, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  loadSandpackFiles,
  SandpackPersistence,
} from "@/components/site/sandpack-persistence"

const noopSubscribe = () => () => {}
const STORAGE_KEY = "cfc-week5-exercise"

const defaultFiles = {
  "/App.js": `import { Canvas } from "@react-three/fiber"
import { OrbitControls, OrthographicCamera } from "@react-three/drei"
import "./styles.css"
import { Door } from "./Door"
import { Background } from "./Background"

function Scene() {
  return (
    <>
      <Background />
      <Door />
    </>
  )
}

export default function App() {
  return (
    <div id="app">
      <Canvas flat>
        <OrthographicCamera
          makeDefault
          position={[-10, 5, 10]}
          zoom={30}
          near={-100}
          far={100}
        />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
        />
        <Scene />
      </Canvas>
    </div>
  )
}
`,
  "/Background.js": `export function Background({ color = "black" }) {
  return <color attach="background" args={[color]} />
}
`,
  "/Door.js": `import { GradientTexture } from "@react-three/drei"
import * as THREE from "three"
// import { animated, useSpring } from "@react-spring/three"

const WIDTH = 1
const HEIGHT = WIDTH * 1.618
const SPILL_LENGTH = HEIGHT * 2.5

export function Door() {
  return (
    <group>
      <mesh position={[0, HEIGHT / 2, 0]}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, SPILL_LENGTH / 2]}>
        <planeGeometry args={[WIDTH, SPILL_LENGTH]} />
        <meshBasicMaterial color="white" side={THREE.DoubleSide} transparent opacity={0.5}>
          {/* alphaMap: GradientTexture runs colors through
              THREE.Color, which strips alpha */}
          <GradientTexture
            attach="alphaMap"
            stops={[0, 1]}
            colors={["white", "black"]}
          />
        </meshBasicMaterial>
      </mesh>
    </group>
  )
}
`,
  "/styles.css": `* {
  margin: 0;
  padding:0;
}

#app {
  width: 100vw;
  height: 100vh;
}
`,
}

export function Exercise({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  const { resolvedTheme } = useTheme()
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setResetKey((k) => k + 1)
  }

  if (!mounted) {
    return (
      <div
        className={cn("w-full rounded-lg bg-muted", className)}
        style={{ height: 700 }}
      />
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-end">
        <Button variant="outline" size="xs" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <SandpackProvider
        key={resetKey}
        template="react"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        files={loadSandpackFiles(STORAGE_KEY, defaultFiles)}
        customSetup={{
          dependencies: {
            three: "0.184.0",
            "@react-three/fiber": "9.6.1",
            "@react-three/drei": "10.7.7",
            "@react-spring/three": "10.0.3",
          },
        }}
        options={{ activeFile: "/App.js" }}
      >
        <SandpackPersistence
          storageKey={STORAGE_KEY}
          defaultFiles={defaultFiles}
        />
        <SandpackLayout className="rounded-lg!">
          <SandpackCodeEditor style={{ height: 700 }} />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            style={{ height: 700 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
