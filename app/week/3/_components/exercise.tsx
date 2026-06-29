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

const CDN =
  "https://cdn.jsdelivr.net/gh/jooohyunpark/canvas-for-coders@main/public"
const MODEL_URL = `${CDN}/Voyager.glb`
const MOON_TEXTURE_URL = `${CDN}/moon-texture.jpg`

const defaultFiles = {
  "index.html": `<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <div id="app">
      <div id="ui">
        <button data-point="overview">Overview</button>
        <button data-point="antenna">Antenna</button>
        <button data-point="golden-record">Golden Record</button>
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
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 1;

  button {
    padding: 6px 12px;
    background: white;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
    transition: background 0.15s ease-out;

    &:hover {
      background: rgba(255, 255, 255, 0.85);
    }
  }
}`,
  "index.js": `import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';

// hosted externally so the preview can fetch them
const MOON_TEXTURE_URL = '${MOON_TEXTURE_URL}';
const MODEL_URL = '${MODEL_URL}';

const app = document.querySelector('#app');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight('white', 10);
light.position.set(1, 1, -1);
scene.add(light);

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 10, 15);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const loader = new GLTFLoader();
loader.load(MODEL_URL, (gltf) => {
  gltf.scene.rotation.y = Math.PI / 2;
  scene.add(gltf.scene);
});

const points = {
  overview: { position: { x: 15, y: 10, z: 15 }, controlTarget: { x: 0, y: 0,   z: 0  } },
  antenna: { position: { x: -3, y: 5,  z: 6  }, controlTarget: { x: 0, y: 1.5, z: 0  } },
  "golden-record": { position: { x: 0,  y: 0,  z: -3 }, controlTarget: { x: 0, y: 0,   z: 0  } },
};

document.querySelectorAll('[data-point]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const { position, controlTarget } = points[btn.dataset.point];
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
