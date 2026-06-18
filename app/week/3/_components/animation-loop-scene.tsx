"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

export function AnimationLoopScene({ className }: { className?: string }) {
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
    camera.position.set(0, 5, 15)
    camera.lookAt(0, 0, 0)
    scene.add(camera)

    // Floor
    const floorGeo = new THREE.PlaneGeometry(15, 15)
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x999999,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.5
    scene.add(floor)

    const material = new THREE.MeshNormalMaterial()

    const knotGeo = new THREE.TorusKnotGeometry(0.7, 0.25, 120, 16)
    const knot = new THREE.Mesh(knotGeo, material)
    scene.add(knot)

    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)

    const sphereGeo = new THREE.SphereGeometry(0.3, 64, 32)
    const sphere = new THREE.Mesh(sphereGeo, material)
    sphere.position.x = 5
    orbitGroup.add(sphere)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    renderer.setAnimationLoop((time) => {
      const t = time * 0.001

      knot.rotation.y -= 0.005

      orbitGroup.rotation.y += 0.01
      sphere.position.y = Math.cos(t) * 1

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
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)
      controls.dispose()
      renderer.dispose()
      knotGeo.dispose()
      sphereGeo.dispose()
      floorGeo.dispose()
      floorMat.dispose()
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
