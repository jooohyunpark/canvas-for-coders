import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentsScene } from "./_components/components-scene"
import { InteractionScene } from "./_components/interaction-scene"
import { SpringScene } from "./_components/spring-scene"
import { StagingScene } from "./_components/staging-scene"
import { ExtrasScene } from "./_components/extras-scene"

export const metadata: Metadata = {
  title: "Week 5",
}

const INSTALL_COMMANDS = [
  {
    name: "pnpm",
    command:
      "pnpm add three @react-three/fiber @react-three/drei @react-spring/three",
  },
  {
    name: "npm",
    command:
      "npm install three @react-three/fiber @react-three/drei @react-spring/three",
  },
  {
    name: "yarn",
    command:
      "yarn add three @react-three/fiber @react-three/drei @react-spring/three",
  },
]

export default function Week5Page() {
  return (
    <Section>
      <Content size="lg">
        <Article>
          <H1>Week 5: Components in Space</H1>

          <H2>Concept</H2>
          <p>
            So far we&apos;ve covered Three.js — geometries, materials, meshes,
            lights, and a manual render loop — and React, where components
            describe the UI for the current state and keep the screen in sync.
            React Three Fiber (R3F) is the bridge: you write a Three.js scene as
            JSX, the way you write any React component.
          </p>
          <p>
            R3F isn&apos;t a new 3D engine. It builds real Three.js objects
            underneath: a <code>&lt;mesh&gt;</code> is a{" "}
            <code>new THREE.Mesh()</code>, a <code>&lt;boxGeometry&gt;</code> is
            a <code>new THREE.BoxGeometry()</code>. Everything from the past
            weeks still applies, and the full Three.js API is there when you
            need it.
          </p>
          <p>
            The payoff is the same principle from React. There,{" "}
            <code>UI = f(state)</code>; here, <code>scene = f(state)</code>:
            describe what the scene should contain, and R3F creates, updates,
            and removes the objects to match. A component still takes props,
            holds state, and composes with others, only now it returns meshes,
            lights, and groups instead of <code>&lt;div&gt;</code>s. That&apos;s
            the idea this week: React components, in space.
          </p>

          <H2>Setting up</H2>
          <p>
            Start from a React project (the Vite setup from Week 4 works), then
            install the four packages for this week:
          </p>
          <Tabs defaultValue="pnpm">
            <TabsList variant="line">
              {INSTALL_COMMANDS.map((c) => (
                <TabsTrigger key={c.name} value={c.name}>
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {INSTALL_COMMANDS.map((c) => (
              <TabsContent key={c.name} value={c.name}>
                <CodeBlock code={c.command} lang="bash" />
              </TabsContent>
            ))}
          </Tabs>
          <p>
            <Link href="https://www.npmjs.com/package/three">three</Link> is the
            engine,{" "}
            <Link href="https://r3f.docs.pmnd.rs/getting-started/your-first-scene">
              @react-three/fiber
            </Link>{" "}
            is its React renderer, and{" "}
            <Link href="https://github.com/pmndrs/drei">@react-three/drei</Link>{" "}
            and{" "}
            <Link href="https://github.com/pmndrs/react-spring">
              @react-spring/three
            </Link>{" "}
            are helpers we&apos;ll reach for later.
          </p>
          <p>
            Everything in R3F starts with one component:{" "}
            <code>&lt;Canvas&gt;</code>. In Week 3, every sketch opened with the
            same ritual: create a <code>WebGLRenderer</code> and a{" "}
            <code>PerspectiveCamera</code>, size them to the window, append the
            canvas, and start an animation loop. <code>&lt;Canvas&gt;</code>{" "}
            does all of that for you.
          </p>
          <CodeBlock
            code={`import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <Canvas>
      {/* your scene goes here */}
    </Canvas>
  )
}`}
            lang="jsx"
          />
          <p>
            It renders a real <code>&lt;canvas&gt;</code> that fills its parent
            and wires up the scene, camera, renderer, and loop behind it.
            Anything you nest inside becomes part of the 3D scene, not the DOM:
            from here on, the tags you write (<code>&lt;mesh&gt;</code>,{" "}
            <code>&lt;ambientLight&gt;</code>, and so on) are Three.js objects,
            not HTML. To size the scene, size that parent container, the way you
            would any other element.
          </p>

          <H2>Your first scene</H2>
          <p>
            An empty <code>&lt;Canvas&gt;</code> renders nothing. The smallest
            thing worth looking at is a <em>mesh</em>: a shape (its geometry)
            wrapped in a surface (its material). In R3F a mesh is a component
            with two children, one for each part.
          </p>
          <CodeBlock
            code={`<mesh>
  <boxGeometry />
  <meshStandardMaterial color="blue" />
</mesh>`}
            lang="jsx"
          />
          <p>
            This is the same <code>new THREE.Mesh(geometry, material)</code>{" "}
            from Week 3, only the geometry and material are passed as nested
            tags instead of constructor arguments. R3F reads the children,
            builds the two Three.js objects, and hands them to the mesh.
          </p>

          <H3>args and props</H3>
          <p>
            The <code>args</code> prop is the list of constructor arguments;
            every other prop sets a property on the instance afterward.
          </p>
          <CodeBlock
            code={`<boxGeometry args={[2, 1, 1]} />
// → new THREE.BoxGeometry(2, 1, 1)`}
            lang="jsx"
          />
          <p>
            So <code>args</code> carries what a constructor needs up front, the
            width, height, and depth of a box. Everything else is a normal prop:{" "}
            <code>position</code>, <code>rotation</code>, and <code>scale</code>{" "}
            on the mesh, <code>color</code> on the material. R3F accepts
            shorthands here, so a plain array stands in for a vector and a CSS
            color name for a <code>THREE.Color</code>.
          </p>
          <CodeBlock
            code={`<mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]}>
  <boxGeometry args={[1, 1, 1]} />
  <meshStandardMaterial color="blue" />
</mesh>`}
            lang="jsx"
          />
          <H3>Same scene, both ways</H3>
          <p>
            Here is a lit blue cube written both ways: same geometry, same
            material, same lights. The Three.js version is what you wrote in
            Week 3; the R3F version is the payoff.
          </p>
          <Tabs defaultValue="r3f">
            <TabsList variant="line">
              <TabsTrigger value="r3f">R3F</TabsTrigger>
              <TabsTrigger value="three">Three.js</TabsTrigger>
            </TabsList>
            <TabsContent value="r3f">
              <CodeBlock
                code={`import { Canvas } from "@react-three/fiber"

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={["#111111"]} />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
    </Canvas>
  )
}`}
                lang="jsx"
              />
            </TabsContent>
            <TabsContent value="three">
              <CodeBlock
                code={`import * as THREE from "three"

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color("#111111")

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)
camera.position.z = 5

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: "blue" })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const ambient = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient)

const directional = new THREE.DirectionalLight(0xffffff, 2)
directional.position.set(2, 3, 4)
scene.add(directional)

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
})`}
                lang="js"
              />
            </TabsContent>
          </Tabs>
          <p>
            Both render the same scene, but the R3F version is dramatically
            cleaner, and it’s now a component you can reuse, compose, and drive
            with props.
          </p>

          <H2>Reusable components</H2>
          <p>
            Because every Three.js object is a component, the cube composes like
            any other. Pull the mesh into a <code>Box</code>, give it props, and
            render it as many times as you want, each configured differently:
            no manual loops or bookkeeping, one component reused.
          </p>
          <CodeBlock
            code={`function Box({ position, color }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <Box position={[-2, 0, 0]} color="#ff0000" />
      <Box position={[0, 0, 0]} color="#0000ff" />
      <Box position={[2, 0, 0]} color="#00ff00" />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
    </>
  )
}`}
            lang="jsx"
          />
          <ComponentsScene className="mt-8" />

          <H2>State &amp; interaction</H2>
          <p>
            You already know this loop: a click updates state, and the UI
            re-renders to match. The only difference here is that what changes
            is a mesh in 3D space. R3F puts the familiar event handlers right on
            the mesh (<code>onClick</code>, <code>onPointerOver</code>,{" "}
            <code>onPointerOut</code>) and handles the raycasting for you.
          </p>
          <p>
            Here&apos;s a counter-style example in 3D, reusing the same{" "}
            <code>Box</code> from before: click a cube to grow it, hover to
            highlight it.
          </p>
          <CodeBlock
            code={`import { useState } from "react"

function Box({ position }) {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      position={position}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "cyan" : "blue"} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <Box position={[-2, 0, 0]} />
      <Box position={[0, 0, 0]} />
      <Box position={[2, 0, 0]} />

      <ambientLight intensity={1} />
      <directionalLight position={[2, 3, 4]} intensity={2} />
    </>
  )
}`}
            lang="jsx"
          />
          <InteractionScene className="mt-8" />
          <p>
            It&apos;s the same pattern you already know. <code>useState</code>{" "}
            holds the values, the handlers update them, and because{" "}
            <code>scale</code> and <code>color</code> are just props, the mesh
            re-renders to match. Each cube keeps its own state, so clicking one
            grows only that cube.
          </p>
          <p>
            The change is instant, though: the cube jumps to its new size in a
            single frame. That snap is fine for a color, but a scale wants to
            ease into place, which is exactly what react-spring does next.
          </p>

          <H2>Animating with react-spring</H2>

          <p>
            <Link href="https://www.react-spring.dev/docs/components/use-spring">
              <code>useSpring</code>
            </Link>{" "}
            takes target values and returns animated ones that travel smoothly
            toward them. To read those moving values, a mesh has to be animated:{" "}
            <code>&lt;animated.mesh&gt;</code> in place of{" "}
            <code>&lt;mesh&gt;</code>, and{" "}
            <code>&lt;animated.meshStandardMaterial&gt;</code> for the material.
            Here&apos;s the box as a reusable <code>AnimatedBox</code> that
            eases its scale and color instead of snapping:
          </p>
          <CodeBlock
            code={`import { useState } from "react"
import { useSpring, animated, easings } from "@react-spring/three"

function AnimatedBox({ position }) {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  const { scale, color } = useSpring({
    scale: active ? 1.5 : 1,
    color: hovered ? "cyan" : "blue",
    config: { duration: 150, easing: easings.easeOutCubic },
  })

  const { rotation } = useSpring({
    loop: true,
    from: { rotation: [0, 0, 0] },
    to: { rotation: [Math.PI * 2, 0, 0] },
    config: { duration: 10 * 1000 },
  })

  return (
    <animated.mesh
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <animated.meshStandardMaterial color={color} />
    </animated.mesh>
  )
}`}
            lang="jsx"
          />
          <SpringScene className="mt-8" />
          <p>
            The same three cubes, now easing instead of snapping. This is the
            declarative idea applied to motion: you set the destination, and a
            duration and easing curve shape how it travels there. The second{" "}
            <code>useSpring</code> is the same hook in a different shape: give it{" "}
            <code>loop</code> with a <code>from</code> and <code>to</code>, and
            it runs a continuous animation, here the slow rotation.
          </p>

          <H2>drei: helpers</H2>
          <p>
            <Link href="https://github.com/pmndrs/drei">@react-three/drei</Link>{" "}
            is a community library of ready-made helpers for R3F, still plain
            R3F underneath, just components and hooks you&apos;d otherwise write
            yourself. It&apos;s less a thing to memorize than a catalog to
            browse. Here are the pieces you&apos;ll reach for first.
          </p>

          <H3>Scene basics</H3>
          <p>
            drei gives you drop-in components for the parts every scene needs.{" "}
            <code>&lt;OrbitControls /&gt;</code> makes a scene explorable: drag
            to orbit, scroll to zoom.{" "}
            <code>&lt;PerspectiveCamera makeDefault /&gt;</code> lets you place
            the camera as a component instead of a <code>&lt;Canvas&gt;</code>{" "}
            prop (<code>makeDefault</code> tells R3F to render through it). And
            shape shortcuts like <code>&lt;Box&gt;</code>,{" "}
            <code>&lt;Sphere&gt;</code>, and <code>&lt;RoundedBox&gt;</code>{" "}
            bundle mesh and geometry into a single tag for quick prototyping.
          </p>
          <CodeBlock
            code={`import { OrbitControls, PerspectiveCamera, Box } from "@react-three/drei"

<Canvas>
  <PerspectiveCamera makeDefault position={[0, 2, 5]} />

  <Box args={[1, 1, 1]}>
    <meshStandardMaterial color="blue" />
  </Box>

  <OrbitControls />
</Canvas>`}
            lang="jsx"
          />

          <H3>Loading models</H3>
          <p>
            Real projects rarely stop at primitives. <code>useGLTF</code> loads
            a <code>.glb</code> or <code>.gltf</code> model and drops it into
            the scene, the fastest way to make things look finished:
          </p>
          <CodeBlock
            code={`import { useGLTF } from "@react-three/drei"

function Model() {
  const { scene } = useGLTF("/robot.glb")
  return <primitive object={scene} />
}`}
            lang="jsx"
          />

          <H3>Centering and framing</H3>
          <p>
            A model you didn&apos;t make rarely arrives ready to show: its
            origin may sit off-center, and its size is unknown up front. Rather
            than guess camera and scale values, drei gives you two helpers.
          </p>
          <p>
            <code>&lt;Center&gt;</code> shifts its children so their
            bounding-box midpoint sits at the origin, fixing off-center models.{" "}
            <code>&lt;Bounds&gt;</code> measures that box and drives the camera
            to frame it: <code>fit</code> zooms to fit on load,{" "}
            <code>clip</code> adjusts the near and far planes so nothing is cut
            off, <code>observe</code> refits on resize, and <code>margin</code>{" "}
            sets the breathing room (1 is snug, higher zooms out).
          </p>
          <CodeBlock
            code={`import { Bounds, Center } from "@react-three/drei"

<Bounds fit clip observe margin={1.2}>
  <Center>
    <Model />
  </Center>
</Bounds>`}
            lang="jsx"
          />
          <p>
            Together, you can drop in almost any model and see it framed without
            tuning a number, exactly how the Voyager below is set up. Pair them
            with <code>&lt;OrbitControls /&gt;</code> and the camera starts from
            that framed view.
          </p>

          <H3>Staging</H3>
          <p>
            <code>&lt;Environment /&gt;</code> lights the whole scene from a
            preset HDRI: realistic lighting and reflections in one line.
            It&apos;s often all the lighting a scene needs, and what makes
            reflective materials actually reflect something.
          </p>
          <CodeBlock
            code={`import { Environment } from "@react-three/drei"

<Environment preset="sunset" />`}
            lang="jsx"
          />
          <StagingScene className="mt-8" />
          <p>
            The Voyager model has standard PBR materials, so it only looks right
            when something lights and reflects off it. Toggle{" "}
            <code>environment</code> in the panel: off, a faint fill leaves it
            flat; on, the HDRI lights it and shows up in its reflections. That
            panel is <Link href="https://github.com/pmndrs/leva">leva</Link>,
            the R3F ecosystem&apos;s take on lil-gui.
          </p>

          <H3>Worth a browse</H3>
          <p>
            drei ships plenty of creative utilities too. The scene below, for
            example, is built from three of them:{" "}
            <Link href="https://drei.docs.pmnd.rs/staging/cloud">
              <code>&lt;Cloud&gt;</code>
            </Link>{" "}
            for the puffs,{" "}
            <Link href="https://drei.docs.pmnd.rs/abstractions/gradient-texture">
              <code>&lt;GradientTexture&gt;</code>
            </Link>{" "}
            for the light spilling from the door, and{" "}
            <Link href="https://drei.docs.pmnd.rs/shaders/mesh-refraction-material">
              <code>MeshRefractionMaterial</code>
            </Link>{" "}
            for the glass gem.
          </p>
          <ExtrasScene className="mt-8" />
          <p>
            <strong>Materials with character:</strong>
          </p>
          <ul>
            <li>
              <Link href="https://drei.docs.pmnd.rs/shaders/mesh-wobble-material">
                <code>MeshWobbleMaterial</code>
              </Link>{" "}
              and{" "}
              <Link href="https://drei.docs.pmnd.rs/shaders/mesh-distort-material">
                <code>MeshDistortMaterial</code>
              </Link>{" "}
              deform the surface over time.
            </li>
            <li>
              <Link href="https://drei.docs.pmnd.rs/shaders/mesh-transmission-material">
                <code>MeshTransmissionMaterial</code>
              </Link>{" "}
              gives you convincing glass.
            </li>
          </ul>
          <p>
            <strong>Expressive extras:</strong>
          </p>
          <ul>
            <li>
              <Link href="https://drei.docs.pmnd.rs/abstractions/trail">
                <code>&lt;Trail&gt;</code>
              </Link>{" "}
              leaves a ribbon behind moving objects.
            </li>
            <li>
              <Link href="https://drei.docs.pmnd.rs/staging/sparkles">
                <code>&lt;Sparkles&gt;</code>
              </Link>{" "}
              scatters points of light.
            </li>
            <li>
              <Link href="https://drei.docs.pmnd.rs/portals/mesh-portal-material">
                <code>&lt;MeshPortalMaterial&gt;</code>
              </Link>{" "}
              turns a shape into a window onto another scene.
            </li>
            <li>
              <Link href="https://drei.docs.pmnd.rs/shaders/soft-shadows">
                <code>&lt;SoftShadows&gt;</code>
              </Link>{" "}
              swaps in soft, realistic contact shadows.
            </li>
          </ul>
        </Article>
      </Content>
    </Section>
  )
}
