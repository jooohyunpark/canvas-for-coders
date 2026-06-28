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
const STORAGE_KEY = "cfc-week3-exercise"

function buildDefaultFiles(modelUrl: string) {
  return {
    "index.html": `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app">
      <div id="ui">
        <button data-point="overview">Overview</button>
        <button data-point="antenna">Antenna</button>
        <button data-point="body">Body</button>
      </div>
    </div>
    <script src="./index.js" type="module"></script>
  </body>
</html>`,
    "styles.css": `body {
  margin: 0;
  overflow: hidden;
}

#ui {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

#ui button {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  white-space: nowrap;
}`,
    "index.js": `import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import gsap from 'gsap';

const app = document.querySelector('#app');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment()).texture;
pmrem.dispose();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 5, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);
controls.update();

const loader = new GLTFLoader();
loader.load('${modelUrl}', (gltf) => {
  scene.add(gltf.scene);
});

// Three points to navigate to
const points = {
  overview: { position: { x: -10, y: 5, z: 10 }, target: { x: 0, y: 1, z: 0 } },
  antenna:  { position: { x: 2,   y: 7, z: 3  }, target: { x: 0, y: 4, z: 0 } },
  body:     { position: { x: -3,  y: 2, z: 6  }, target: { x: 0, y: 1, z: 0 } },
};

document.querySelectorAll('#ui button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const { position, target } = points[btn.dataset.point];

    // TODO: use gsap.to() to animate camera.position to position
    // and controls.target to target
    // Hint: add onUpdate: () => controls.update() to each tween
  });
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});`,
  }
}

export function Exercise({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  const { resolvedTheme } = useTheme()
  const [resetKey, setResetKey] = useState(0)

  const [defaultFiles] = useState(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000"
    return buildDefaultFiles(`${origin}/Voyager.glb`)
  })

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
        template="vanilla"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        files={loadSandpackFiles(STORAGE_KEY, defaultFiles)}
        customSetup={{
          dependencies: { three: "0.163.0", gsap: "3.12.5" },
        }}
      >
        <SandpackPersistence
          storageKey={STORAGE_KEY}
          defaultFiles={defaultFiles}
        />
        <SandpackLayout className="rounded-lg!">
          <SandpackCodeEditor showLineNumbers style={{ height: 700 }} />
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
