import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractionScene } from "./_components/interaction-scene"

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
            So far we&apos;ve covered Three.js (geometries, materials, meshes,
            lights, and a manual render loop) and React, where components
            describe the UI for the current state and keep the screen in sync.
            React Three Fiber (R3F) is the bridge: you write a Three.js scene
            the way you write a React component, as JSX.
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
            <code>UI = f(state)</code>. Here, <code>scene = f(state)</code>:
            describe what the scene should contain, and R3F creates, updates,
            and removes the objects to match. A component still takes props,
            holds state, and composes with others; it just returns meshes,
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
  <meshStandardMaterial color="orange" />
</mesh>`}
            lang="jsx"
          />
          <p>
            Because these are just props, they can come from state or a parent,
            which is the whole point of <code>scene = f(state)</code>: change
            the value and R3F updates the underlying object for you.
          </p>

          <H3>Same scene, both ways</H3>
          <p>
            Here is a lit orange cube written both ways: same geometry, same
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
        <meshStandardMaterial color="orange" />
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

          <H2>State &amp; interaction</H2>
          <p>
            You already know this loop: a click updates state, and the UI
            re-renders to match. The only difference here is that what changes
            is a mesh in 3D space. R3F puts the familiar event handlers right on
            the mesh (<code>onClick</code>, <code>onPointerOver</code>,{" "}
            <code>onPointerOut</code>) and handles the raycasting for you.
          </p>
          <p>
            Here&apos;s a counter-style example in 3D: click the cube to grow
            it, hover to highlight it.
          </p>
          <CodeBlock
            code={`import { useState } from "react"

function Box() {
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <mesh
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "cyan" : "blue"} />
    </mesh>
  )
}`}
            lang="jsx"
          />
          <InteractionScene className="mt-8" />
          <p>
            Nothing here is new. <code>useState</code> holds the values, the
            handlers update them, and because <code>scale</code> and{" "}
            <code>color</code> are just props, the mesh re-renders to match:{" "}
            <code>scene = f(state)</code> in action.
          </p>
          <p>
            One thing to notice: the change is instant, the cube jumps to its
            new size in a single frame. That snap is fine for a color, but a
            scale wants to ease into place, which is exactly what react-spring
            does next.
          </p>
        </Article>
      </Content>
    </Section>
  )
}
