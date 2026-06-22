import type { Metadata } from "next"
import { Link } from "@/components/site/link"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2, H3 } from "@/components/site/heading"
import { Button } from "@/components/ui/button"
import { AnimationLoopScene } from "./_components/animation-loop-scene"
import { GsapScene } from "./_components/gsap-scene"
import { ModelScene } from "./_components/model-scene"

export const metadata: Metadata = {
  title: "Week 3",
}

export default function Week3Page() {
  return (
    <Section>
      <Content size="lg">
        <Article>
          <H1>Week 3: Motion / Assets</H1>

          <H2>Animation loop</H2>
          <p>
            Three.js scenes are static by default. To animate, you need a
            function that moves your objects and renders the scene on every
            frame.
          </p>
          <p>
            Frame rate is how many frames are drawn per second, typically 60,
            though it varies by screen and hardware. We want our function to run
            on every frame.
          </p>
          <p>
            The native JavaScript way to do this is{" "}
            <code>window.requestAnimationFrame()</code>. Three.js wraps it in{" "}
            <code>renderer.setAnimationLoop()</code>: pass it a function and it
            gets called on every frame automatically.
          </p>

          <H3>Example</H3>
          <p>
            The pattern is simple: update your objects, then render, and repeat.
            The torus knot rotates on its own axis. The sphere sits inside a{" "}
            <code>Group</code> offset from center, so rotating the group makes
            it orbit.
          </p>
          <p>
            The callback receives a <code>time</code> argument: milliseconds
            elapsed since the page loaded. Dividing by 1000 converts it to
            seconds, giving a smooth, ever-increasing value you can use.
          </p>
          <CodeBlock
            code={`const orbitGroup = new THREE.Group()
scene.add(orbitGroup)

const sphere = new THREE.Mesh(sphereGeo, material)
sphere.position.x = 5
orbitGroup.add(sphere)

renderer.setAnimationLoop((time) => {
  const t = time * 0.001 // ms → seconds

  knot.rotation.y -= 0.005

  orbitGroup.rotation.y += 0.01
  sphere.position.y = Math.cos(t) * 1

  renderer.render(scene, camera)
})`}
            lang="js"
          />

          <AnimationLoopScene className="mt-8" />

          <H2>GSAP</H2>
          <p>
            <Link href="https://gsap.com/">GSAP</Link> (GreenSock Animation
            Platform) is a JavaScript animation library for animating objects in
            a scene. It gives you precise control over tweens, the transitions
            an object makes between two states, through a clean API so you never
            have to update values by hand inside a loop.
          </p>

          <H3>gsap.to()</H3>
          <p>
            <Link href="https://gsap.com/docs/v3/GSAP/gsap.to()/">
              <code>gsap.to()</code>
            </Link>{" "}
            animates an object from its current state to a target. Pass the
            object, then an options object with the target values and a{" "}
            <code>duration</code>.
          </p>
          <CodeBlock
            code={`import gsap from "gsap"

// Tween x back and forth
gsap.to(sphere.position, {
  x: 10,
  duration: 2,
  ease: "power4.inOut",
  yoyo: true,
  repeat: -1,
})

// Move to a new random position each repeat
gsap.to(wanderer.position, {
  x: "random(-15, 15)",
  y: "random(-15, 15)",
  z: "random(-15, 15)",
  duration: 3,
  ease: "power4.inOut",
  repeat: -1,
  repeatRefresh: true,
})`}
            lang="js"
          />

          <GsapScene className="mt-8" />

          <H2>Models</H2>
          <p>
            Three.js can load external 3D model files using loaders from{" "}
            <code>three/addons</code>. The most common format is{" "}
            <Link href="https://en.wikipedia.org/wiki/GlTF">glTF</Link> (
            <code>.gltf</code> / <code>.glb</code>), an open standard designed
            for efficient transmission of 3D scenes. <code>GLTFLoader</code>{" "}
            parses the file and returns a <code>gltf</code> object. The scene
            graph lives at <code>gltf.scene</code>, which you can add directly
            to your Three.js scene.
          </p>

          <H3>Example</H3>
          <p>
            Place your <code>.glb</code> file in the <code>/public</code> folder
            so it's served as a static asset, then load it with{" "}
            <code>GLTFLoader</code>. The callback fires once the file is ready.
          </p>
          <CodeBlock
            code={`import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const loader = new GLTFLoader()

loader.load("/LeePerrySmith.glb", (gltf) => {
  const model = gltf.scene
  scene.add(model)
})`}
            lang="js"
          />

          <ModelScene className="mt-8" />

          <hr />

          <H2>Assignment</H2>
          <ul>
            <li>
              Animate at least one object using the animation loop and at least
              one using GSAP.
            </li>
            <li>Try grouping objects and animating the group as a whole.</li>
          </ul>

          <Button
            render={
              <Link href="https://github.com/jooohyunpark/canvas-for-coders/discussions/categories/assignments">
                Submit here
              </Link>
            }
            nativeButton={false}
            className="no-underline"
          />
        </Article>
      </Content>
    </Section>
  )
}
