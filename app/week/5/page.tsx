import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"
import { H1, H2 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
            canvas, and start an animation loop. <code>&lt;Canvas&gt;</code> does
            all of that for you.
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
        </Article>
      </Content>
    </Section>
  )
}
