"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import GUI from "three/addons/libs/lil-gui.module.min.js"

// The same scene as before, with a lil-gui panel wired to the mesh and
// material — drag the sliders to nudge values live.
export function BasicSceneWithDebugUI({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight
    )
    camera.position.z = 5
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // Debug UI — kept inside the demo container instead of floating on the page
    const gui = new GUI({ container })
    gui.domElement.style.position = "absolute"
    gui.domElement.style.top = "0"
    gui.domElement.style.right = "0"
    gui.add(mesh.position, "y", -3, 3, 0.01)
    gui.add(material, "wireframe")
    gui.addColor(material, "color")

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
      gui.destroy()
      controls.dispose()
      renderer.dispose()
      geometry.dispose()
      material.dispose()
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
