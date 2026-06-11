"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

const noopSubscribe = () => () => {}

const files = {
  "src/index.js": `import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

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
  "src/style.css": `* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
}`,
}

export function Exercise({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  if (!mounted) {
    return (
      <div
        className={cn("w-full rounded-lg bg-muted", className)}
        style={{ height: 700 }}
      />
    )
  }

  return (
    <SandpackProvider
      template="vanilla"
      theme="dark"
      files={files}
      customSetup={{ dependencies: { three: "latest" } }}
    >
      <SandpackLayout className={cn("!rounded-lg", className)}>
        <SandpackCodeEditor showLineNumbers style={{ height: 700 }} />
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton
          style={{ height: 700 }}
        />
      </SandpackLayout>
    </SandpackProvider>
  )
}
