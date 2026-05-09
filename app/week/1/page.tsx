import type { Metadata } from "next"
import { Link } from "@/components/site/link"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CursorBall } from "@/components/demo/cursor-ball"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2, H3 } from "@/components/site/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Doors } from "@/components/demo/doors"

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
            <H1>Week 1: Intro</H1>
            <p>
              Hi, I’m Joohyun. I’m ITP class of 2019 and work as a design
              engineer.
            </p>

            <p>
              I remember the moment I was first introduced to p5.js in ICM.
              Until then, websites for me were just places to search for
              information, write documents, and so on. It was mind-blowing to
              realize I could do unconventional things in the browser.
            </p>

            <p>
              Since then, my practice has centered on making creative work with
              web-based media. Of all the tools I’ve tried, it’s the one I keep
              coming back to, and these are the characteristics that make it
              feel uniquely expressive to me.
            </p>

            <H3>1. It’s interactive.</H3>
            <p>
              A web page can react to a click, a scroll, or a keystroke — every
              interaction draws the audience deeper into the work. The demo
              below is one example: a ball that follows your cursor. It’s
              simple, but engaging. You can participate immediately without any
              context.
            </p>

            <CursorBall />

            <H3>2. It’s computational.</H3>
            <p>
              Every pixel on the screen is the result of code. That means your
              work can do things traditional mediums can’t — generate a
              different composition every time someone visits, respond to live
              data, or evolve based on audience input.
            </p>
            <p>
              Below is my work,{" "}
              <Link href="https://doors.joohyun.dev">Doors</Link>, from 2022.
              Each door is placed at a random position every time. Refresh the
              browser to see the composition rearrange.
            </p>

            <Doors />

            <H3>3. It’s universal.</H3>
            <p>
              The web page is one of the most universal mediums there is. Anyone
              with a computer and an internet connection can reach it with a
              URL, anytime, from anywhere in the world. No other medium offers
              that kind of reach.
            </p>

            <p>Now, let’s get into Three.js.</p>

            <H2>Thinking in xyz</H2>
            <p>
              <Link href="https://threejs.org/">Three.js</Link> is a 3D engine
              for the web. It gives you a virtual space where you place objects,
              point a camera at them, and render the result to a canvas. Open
              the{" "}
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
                <Link href="https://threejs.org/manual/#en/fundamentals">
                  Three.js fundamentals
                </Link>{" "}
                for a high-level overview.
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
              Vercel, every push to <code>main</code> builds and deploys
              automatically — a complete CI/CD pipeline.
            </p>
            <p>
              For this class, create a repository at the start and develop your
              final project in it across 7 weeks.
            </p>

            <H3>Vercel</H3>
            <p>
              Hosts your project at a public URL. Connect your repo once, and
              every push auto-deploys.
            </p>

            <H2>Three.js basic concepts</H2>

            <H3>Pattern</H3>
            <p>
              Three.js exposes everything through a single <code>THREE</code>{" "}
              namespace. You instantiate classes with <code>new</code> and reach
              every primitive: <code>PerspectiveCamera</code>,{" "}
              <code>Scene</code>, <code>AmbientLight</code>, and so on.
            </p>
            <CodeBlock
              code={`import * as THREE from "three"

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const scene = new THREE.Scene()
const light = new THREE.AmbientLight(0xffffff, 1)`}
              lang="ts"
            />

            <H3>Vectors</H3>
            <p>
              A <code>Vector3</code> holds three values: <code>x</code>,{" "}
              <code>y</code>, <code>z</code>. We use it for positions,
              directions, and any other quantity with three components.
            </p>

            <CodeBlock
              code={`//no arguments; will be initialised to (0, 0, 0)
const a = new THREE.Vector3()
const b = new THREE.Vector3(1, 2, 3);
const d = a.distanceTo(b);
`}
              lang="ts"
            />

            <H3>Colors</H3>
            <p>
              <code>Color</code> accepts a CSS name, a hex string, a JavaScript
              hex literal, or three numbers in the range 0&ndash;1. Three.js
              stores it as floats so the GPU can blend between values.
            </p>
            <CodeBlock
              code={`const color1 = new THREE.Color("coral")
const color2 = new THREE.Color(0x0000ff) // hex literal — same as "#0000ff"
const color3 = new THREE.Color("rgb(255, 0, 0)")
`}
              lang="js"
            />

            <H3>Object properties</H3>
            <p>
              Meshes, lights, cameras, and groups all extend{" "}
              <code>Object3D</code>. They share the same transform:{" "}
              <code>position</code>, <code>rotation</code>, and{" "}
              <code>scale</code>. Add an object with <code>scene.add()</code>.
            </p>
            <CodeBlock
              code={`const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0, 1, 0)
mesh.rotation.y = Math.PI / 4
mesh.scale.setScalar(2)

scene.add(mesh)`}
              lang="ts"
            />

            <hr />

            <H2>Assignment</H2>
            <ul>
              <li>
                Read{" "}
                <Link href="https://threejs.org/manual/#en/fundamentals">
                  Three.js fundamentals
                </Link>{" "}
                article.
              </li>
              <li>
                Share a few web projects that inspire you. What makes them stand
                out? How do they connect to your own work or interests?
              </li>
              <li>Start sketching ideas for your final project.</li>
            </ul>

            <Button
              render={
                <Link
                  href="https://github.com/jooohyunpark/canvas-for-coders/discussions/categories/assignments"
                  className="no-underline"
                >
                  Submit here
                </Link>
              }
              nativeButton={false}
            />
          </Article>
        </Content>
      </Section>
    </div>
  )
}
