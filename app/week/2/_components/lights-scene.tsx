"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js"
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js"

export function LightsScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x111111)

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight
    )
    camera.position.set(0, 0, 6)
    scene.add(camera)

    const geometry = new THREE.SphereGeometry(1, 64, 32)
    const material = new THREE.MeshStandardMaterial({
      color: "white",
      roughness: 0.8,
      metalness: 0.2,
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    const floorGeometry = new THREE.PlaneGeometry(10, 10)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "gray",
      roughness: 0.8,
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1
    scene.add(floor)

    const ambientLight = new THREE.AmbientLight("white", 0.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight("blue", 3)
    directionalLight.position.set(3, 3, 3)
    scene.add(directionalLight)

    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      1
    )
    scene.add(directionalLightHelper)

    const pointLight = new THREE.PointLight("red", 5, 10, 1)
    pointLight.position.set(-3, 2, 0)
    scene.add(pointLight)

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3)
    scene.add(pointLightHelper)

    RectAreaLightUniformsLib.init()

    const rectLight = new THREE.RectAreaLight("white", 5, 1, 1.618)
    rectLight.position.set(0, -0.191, -3)
    rectLight.lookAt(0, 0, 0)
    scene.add(rectLight)

    const rectLightHelper = new RectAreaLightHelper(rectLight)
    scene.add(rectLightHelper)

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
      floorGeometry.dispose()
      floorMaterial.dispose()
      directionalLightHelper.dispose()
      pointLightHelper.dispose()
      rectLightHelper.dispose()
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
