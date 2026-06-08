"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export function TexturesScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight
    )
    camera.position.z = 5
    scene.add(camera)

    const texture = new THREE.TextureLoader().load(
      "/hubble_telescope_picture.jpg"
    )
    texture.colorSpace = THREE.SRGBColorSpace
    const geometry = new THREE.SphereGeometry(1.5, 64, 32)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
    }
    renderer.setAnimationLoop(animate)

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)
      controls.dispose()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      texture.dispose()
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
