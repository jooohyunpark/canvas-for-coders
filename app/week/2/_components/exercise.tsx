"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import { useSyncExternalStore, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  loadSandpackFiles,
  SandpackPersistence,
} from "@/components/site/sandpack-persistence"

const noopSubscribe = () => () => {}
const STORAGE_KEY = "cfc-week2-exercise"

const defaultFiles = {
  "index.html": {
    code: `<!DOCTYPE html><html><body><div id="app"></div><script src="./index.js" type="module"></script></body></html>`,
    hidden: true,
  },
  "index.js": `import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

document.body.style.cssText = 'margin:0;overflow:hidden';

const app = document.querySelector('#app');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(10, 5, 10);

const controls = new OrbitControls(camera, renderer.domElement);

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onResize);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(ambientLight, directionalLight);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, material);
boxMesh.position.set(0, 0.51, 0);
scene.add(boxMesh);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.8,
});
const floorMesh = new THREE.Mesh(boxGeometry, floorMaterial);
floorMesh.scale.set(5, 0.01, 5);
scene.add(floorMesh);

const animate = (timestamp) => {
  renderer.render(scene, camera);
  controls.update();
};
renderer.setAnimationLoop(animate);`,
}

export function Exercise({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

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
        <Button variant="ghost" size="xs" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <SandpackProvider
        key={resetKey}
        template="vanilla"
        theme="dark"
        files={loadSandpackFiles(STORAGE_KEY, defaultFiles)}
        customSetup={{ dependencies: { three: "0.163.0" } }}
      >
        <SandpackPersistence storageKey={STORAGE_KEY} defaultFiles={defaultFiles} />
        <SandpackLayout className="!rounded-lg">
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
