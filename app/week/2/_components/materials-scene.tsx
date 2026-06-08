"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function MaterialsScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf4f4f5)

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight
    )
    camera.position.z = 5
    scene.add(camera)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(3, 3, 3)
    scene.add(ambientLight, directionalLight)

    const geometry = new THREE.SphereGeometry(1, 64, 32)

    // MeshBasicMaterial — no lighting, flat solid color
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const basicMesh = new THREE.Mesh(geometry, basicMaterial)
    basicMesh.position.x = -1.5
    scene.add(basicMesh)

    // MeshStandardMaterial — physically-based, responds to light
    const standardMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      roughness: 0.8,
      metalness: 0.2,
    })
    const standardMesh = new THREE.Mesh(geometry, standardMaterial)
    standardMesh.position.x = 1.5
    scene.add(standardMesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const animate = () => {
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
      renderer.dispose()
      geometry.dispose()
      basicMaterial.dispose()
      standardMaterial.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg border",
        className
      )}
    >
      <div ref={containerRef} className="aspect-video w-full" />
    </div>
  )
}
