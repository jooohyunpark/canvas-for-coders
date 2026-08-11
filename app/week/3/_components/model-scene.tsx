"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"

export function ModelScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight
    )
    camera.position.set(-10, 5, 10)
    camera.lookAt(0, 1, 0)
    scene.add(camera)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    const envTexture = pmrem.fromScene(new RoomEnvironment()).texture
    scene.environment = envTexture
    pmrem.dispose()

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.target.set(0, 1, 0)

    // Voyager.glb outlives a quick visit to this page. Without this the load
    // finishes after cleanup and adds the model to a scene nothing renders.
    let cancelled = false

    const loader = new GLTFLoader()
    loader.load("/Voyager.glb", (gltf) => {
      if (cancelled) return
      scene.add(gltf.scene)
    })

    renderer.setAnimationLoop(() => {
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
      renderer.dispose()
      envTexture.dispose()
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
