import type { Metadata } from "next"
import { Link } from "@/components/site/link"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2, H3 } from "@/components/site/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "W1: Intro",
}

const INSTALL_COMMANDS = [
  { name: "npm", command: "npm create vite@latest" },
  { name: "pnpm", command: "pnpm create vite" },
  { name: "yarn", command: "yarn create vite" },
  { name: "bun", command: "bun create vite" },
]

export default function Week1Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <H1>Week 1: Introduction</H1>
            <p>Welcome. XXXXX</p>

            <H2>Thinking in xyz</H2>
            <p>
              Three.js is a 3D engine for the web. It gives you a virtual space
              where you place objects, point a camera at them, and render the
              result to a canvas. Open the{" "}
              <Link href="https://threejs.org/editor/">Three.js editor</Link>{" "}
              and see what that looks like.
            </p>
            <ul>
              <li>A scene is a tree of objects.</li>
              <li>
                Every object carries a <code>position</code>,{" "}
                <code>rotation</code>, and <code>scale</code>, each with{" "}
                <code>x</code>, <code>y</code>, <code>z</code> properties.
              </li>
            </ul>

            <H2>Useful references</H2>
            <p>The following references will be helpful as you work:</p>
            <ul>
              <li>
                <Link href="https://threejs.org/docs/">
                  Three.js documentation
                </Link>{" "}
                for the API reference.
              </li>
              <li>
                <Link href="https://threejs.org/manual/">
                  Three.js fundamentals
                </Link>{" "}
                for core concepts.
              </li>
            </ul>

            <H2>Setting up a class project</H2>
            <p>
              We&rsquo;ll use <Link href="https://vite.dev">Vite</Link>,{" "}
              <Link href="https://github.com">GitHub</Link>, and{" "}
              <Link href="https://vercel.com">Vercel</Link> throughout the
              class. Commit your work each week to track how your project
              evolves.
            </p>

            <H3>Vite</H3>
            <p>
              A dev server and bundler with hot reloads and native ES module
              support — import <code>three</code> like any other package.
            </p>

            <Tabs defaultValue="npm">
              <TabsList variant="line">
                {INSTALL_COMMANDS.map(({ name }) => (
                  <TabsTrigger key={name} value={name}>
                    {name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {INSTALL_COMMANDS.map(({ name, command }) => (
                <TabsContent key={name} value={name}>
                  <CodeBlock code={command} lang="bash" />
                </TabsContent>
              ))}
            </Tabs>

            <p>
              The CLI will prompt for a project name and template — select{" "}
              <strong>Vanilla</strong> + <strong>Javascript</strong>. Then
              navigate into the new directory, install dependencies, and start
              the development server:
            </p>
            <CodeBlock
              code={`cd my-project
npm install
npm run dev`}
              lang="bash"
            />
            <p>
              Vite prints a local URL (usually{" "}
              <code>http://localhost:5173</code>). Open it — source changes
              hot-reload instantly.
            </p>

            <H3>GitHub</H3>
            <p>
              Stores your source code and tracks its history. Combined with
              Vercel, every push to <code>main</code> build and deploys
              automatically — a complete CI/CD pipeline.
            </p>

            <H3>Vercel</H3>
            <p>
              Hosts your project at a public URL. Connect your repo once, and
              every push auto-deploys.
            </p>

            <H2>Vectors</H2>
            <p>
              A <code>Vector3</code> holds three numbers: <code>x</code>,{" "}
              <code>y</code>, <code>z</code>. We use it for positions,
              directions, and any other quantity with three components.
            </p>

            <CodeBlock
              code={`const v = new THREE.Vector3(1, 2, 3)
v.x = 5
v.add(new THREE.Vector3(0, 1, 0))
console.log(v) // Vector3 { x: 5, y: 3, z: 3 }`}
              lang="ts"
            />

            <H2>Colors</H2>
            <p>
              <code>Color</code> accepts a CSS name, a hex string, or three
              numbers in the range 0&ndash;1. Three.js stores it as floats so
              the GPU can blend between values.
            </p>
            <CodeBlock
              code={`const a = new THREE.Color("tomato")
const b = new THREE.Color("#3366ff")
const c = new THREE.Color(1, 0, 0.5)`}
              lang="js"
            />

            <H2>Object properties</H2>
            <p>
              Meshes, lights, cameras, and groups all extend{" "}
              <code>Object3D</code>. They share the same transform:{" "}
              <code>position</code>, <code>rotation</code>, and{" "}
              <code>scale</code>. Add an object with <code>scene.add()</code>.
            </p>
            <CodeBlock
              code={`import * as THREE from "three"

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0, 1, 0)
mesh.rotation.y = Math.PI / 4
mesh.scale.setScalar(2)

scene.add(mesh)`}
              lang="ts"
            />
          </Article>
        </Content>
      </Section>
    </div>
  )
}
