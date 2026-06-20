"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import gsap from "gsap"

export function GsapScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)

    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight
    )
    camera.position.set(0, 10, 30)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    const grid = new THREE.GridHelper(30, 30, 0x444444, 0x444444)
    grid.position.y = -0.01
    scene.add(grid)

    const sphereGeo = new THREE.SphereGeometry(1, 64, 32)
    const sphereMat = new THREE.MeshNormalMaterial()
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    sphere.position.x = -10
    scene.add(sphere)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const tween = gsap.to(sphere.position, {
      x: 10,
      duration: 2,
      ease: "power4.inOut",
      yoyo: true,
      repeat: -1,
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
      tween.kill()
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)
      controls.dispose()
      renderer.dispose()
      sphereGeo.dispose()
      sphereMat.dispose()
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
