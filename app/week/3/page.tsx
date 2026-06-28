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
import { AnimatedModelScene } from "./_components/animated-model-scene"
import { SpatialAudioScene } from "./_components/spatial-audio-scene"
import { Exercise } from "./_components/exercise"

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
            so it’s served as a static asset, then load it with{" "}
            <code>GLTFLoader</code>. The callback fires once the file is ready.
          </p>
          <CodeBlock
            code={`import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"

const loader = new GLTFLoader()

loader.load("/Voyager.glb", (gltf) => {
  const model = gltf.scene
  scene.add(model)
})`}
            lang="js"
          />

          <ModelScene className="mt-8" />

          <H3>Animated model</H3>
          <p>
            glTF files can bundle animation clips alongside the geometry.{" "}
            <Link href="https://threejs.org/docs/#api/en/animation/AnimationMixer">
              <code>AnimationMixer</code>
            </Link>{" "}
            is the playback engine: bind it to the model, create an action from
            a clip, and call <code>.play()</code>. Then call{" "}
            <code>mixer.update(delta)</code> on every frame with the time
            elapsed since the last frame.
          </p>
          <CodeBlock
            code={`const clock = new THREE.Clock()
let mixer

loader.load("/fish.glb", (gltf) => {
  const model = gltf.scene
  scene.add(model)

  mixer = new THREE.AnimationMixer(model)
  const action = mixer.clipAction(gltf.animations[0])
  action.timeScale = 0.5
  action.play()
})

renderer.setAnimationLoop(() => {
  mixer?.update(clock.getDelta())
  renderer.render(scene, camera)
})`}
            lang="js"
          />

          <AnimatedModelScene className="mt-8" />

          <H2>Environment map</H2>
          <p>
            An environment map is a texture that wraps around the entire scene
            and gets sampled by materials for reflections and ambient lighting.
            Setting <code>scene.environment</code> is enough to make metallic
            and glossy surfaces react to it.
          </p>
          <p>
            Three.js ships with{" "}
            <Link href="https://threejs.org/docs/#examples/en/environments/RoomEnvironment">
              <code>RoomEnvironment</code>
            </Link>
            , a built-in procedural studio light that needs no external files.{" "}
            <Link href="https://threejs.org/docs/#api/en/extras/PMREMGenerator">
              <code>PMREMGenerator</code>
            </Link>{" "}
            converts the source into a format optimized for real-time
            physically-based rendering.
          </p>
          <CodeBlock
            code={`import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js"

const pmrem = new THREE.PMREMGenerator(renderer)
scene.environment = pmrem.fromScene(new RoomEnvironment()).texture
pmrem.dispose() // free GPU resources after conversion
`}
            lang="js"
          />
          <p>
            For a custom HDRI, place your <code>.hdr</code> file in{" "}
            <code>/public</code> and load it with{" "}
            <Link href="https://threejs.org/docs/#examples/en/loaders/RGBELoader">
              <code>RGBELoader</code>
            </Link>
            . The rest of the pipeline is the same: pass the texture through{" "}
            <code>PMREMGenerator</code> and assign it to{" "}
            <code>scene.environment</code>.
          </p>
          <CodeBlock
            code={`import { RGBELoader } from "three/addons/loaders/RGBELoader.js"

const pmrem = new THREE.PMREMGenerator(renderer)

new RGBELoader().load("/studio.hdr", (texture) => {
  scene.environment = pmrem.fromEquirectangular(texture).texture
  texture.dispose()
  pmrem.dispose()
})`}
            lang="js"
          />

          <H2>Spatial audio</H2>
          <p>
            Three.js wraps the Web Audio API so you can place sounds in 3D
            space. The key idea is a listener attached to the camera and sources
            attached to objects in the scene. As the listener moves, volume and
            stereo panning update automatically.
          </p>
          <p>
            <Link href="https://threejs.org/docs/#api/en/audio/AudioListener">
              <code>AudioListener</code>
            </Link>{" "}
            is the listener. Add it to the camera so it moves with you.{" "}
            <Link href="https://threejs.org/docs/#api/en/audio/PositionalAudio">
              <code>PositionalAudio</code>
            </Link>{" "}
            is a sound source that lives at a position in the scene. Attach it
            to a mesh and it travels with the object.{" "}
            <code>setRefDistance()</code> sets the distance at which the volume
            is at full level and starts to roll off beyond.
          </p>
          <CodeBlock
            code={`const listener = new THREE.AudioListener()
camera.add(listener)

const sound = new THREE.PositionalAudio(listener)

const audioLoader = new THREE.AudioLoader()
audioLoader.load('/underwater.mp3', (buffer) => {
  sound.setBuffer(buffer)
  sound.setRefDistance(10) // full volume within 10 units 
  sound.setRolloffFactor(3) // how fast volume drops beyond that
  sound.setVolume(0.5)
  sound.setLoop(true)
  sound.play()
})

// Attaching sound to a mesh gives it a position in 3D space
const mesh = new THREE.Mesh(geo, mat)
mesh.add(sound)
scene.add(mesh)`}
            lang="js"
          />
          <p>
            Pan around the scene to move the listener relative to the source. As
            you drift closer the volume rises; move left or right and you hear
            it shift between ears.
          </p>

          <SpatialAudioScene className="mt-8" />

          <hr />

          <H2>Exercise</H2>
          <p>
            Re-create a scene like the one in the video. Load the Voyager model
            and animate the camera to three specific points on it when each
            button is clicked. Use <code>gsap.to()</code> to tween both{" "}
            <code>camera.position</code> and <code>controls.target</code> to the
            new viewpoint.
          </p>

          <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg bg-muted" />
        </Article>

        <Exercise className="mt-4 mb-12" />

        <Article>
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
