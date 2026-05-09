import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

// vector
const myVector = new THREE.Vector3(1, 2, 3)
console.log("myVector:", myVector)

// color
const myColor = new THREE.Color("blue")
console.log("myColor:", myColor)

// app
const app = document.querySelector("#app")

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)

// scene
const scene = new THREE.Scene()

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(100, 50, 200)

// controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.autoRotate = true

// object
const geometry = new THREE.TorusKnotGeometry(10, 3, 256, 32)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// floor
const floorGeometry = new THREE.PlaneGeometry(30, 30)
const floorMesh = new THREE.Mesh(floorGeometry, material)
floorMesh.rotation.x = -Math.PI * 0.5
floorMesh.position.y = -30
scene.add(floorMesh)

// resize
const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener("resize", onResize)

// animate
const animate = () => {
  renderer.render(scene, camera)
  controls.update()
}
renderer.setAnimationLoop(animate)
