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


function Scene() {
  return (
    <>
      <Door position={[-2, 0, 0]} />
      <Door position={[0, 0, 0]} />
      <Door position={[2, 0, 0]} />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
      <OrbitControls />
    </>
  )
}

export default function App() {
  return (
    <div id="app">
      <Canvas flat>
        <OrthographicCamera makeDefault position={[-20, 10, -10]} zoom={20} />
        <color attach="background" args={["black"]} />
        <Scene />
      </Canvas>
    </div>
  )
}
`,
  "/Door.js": `export function Door({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial color="grey" />
    </mesh>
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
