"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"

const REF_DISTANCE = 10

export function SpatialAudioScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight
    )
    camera.position.set(0, 10, 30)
    scene.add(camera)

    const listener = new THREE.AudioListener()
    camera.add(listener)

    const sound = new THREE.PositionalAudio(listener)

    // The mp3 outlives a quick visit to this page. Without this the load
    // finishes after cleanup and starts a loop nothing is left to stop.
    let cancelled = false

    const audioLoader = new THREE.AudioLoader()
    audioLoader.load("/underwater.mp3", (buffer) => {
      if (cancelled) return
      sound.setBuffer(buffer)
      sound.setRefDistance(REF_DISTANCE)
      sound.setVolume(0.5)
      sound.setRolloffFactor(3)
      sound.setLoop(true)
      sound.play()
    })

    const resumeContext = () => {
      listener.context.resume()
      container.removeEventListener("pointerdown", resumeContext)
    }
    container.addEventListener("pointerdown", resumeContext)

    // Audio source
    const sourceGeo = new THREE.SphereGeometry(1, 64, 32)
    const sourceMat = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      roughness: 0.8,
      metalness: 0.2,
    })
    const sourceMesh = new THREE.Mesh(sourceGeo, sourceMat)
    sourceMesh.position.y = 3
    sourceMesh.add(sound)
    scene.add(sourceMesh)

    const thresholdGeo = new THREE.SphereGeometry(REF_DISTANCE, 64, 32)
    const thresholdMat = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      transparent: true,
      opacity: 0.1,
      wireframe: false,
      side: THREE.DoubleSide,
    })
    const threshold = new THREE.Mesh(thresholdGeo, thresholdMat)
    threshold.position.y = sourceMesh.position.y
    scene.add(threshold)

    const grid = new THREE.GridHelper(40, 40, 0x333333, 0x333333)
    scene.add(grid)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment()).texture
    pmrem.dispose()

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 3, 0)

    renderer.setAnimationLoop((time) => {
      const t = time * 0.001
      sourceMesh.scale.setScalar(1 + Math.sin(t * 3) * 0.1)
      controls.update()
      renderer.render(scene, camera)
    })

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    return () => {
      cancelled = true
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)
      controls.dispose()
      if (sound.isPlaying) sound.stop()
      renderer.dispose()
      sourceGeo.dispose()
      sourceMat.dispose()
      thresholdGeo.dispose()
      thresholdMat.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-lg border",
        className
      )}
    />
  )
}
