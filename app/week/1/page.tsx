import type { Metadata } from "next"
import { Link } from "@/components/site/link"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CursorBall } from "./_components/cursor-ball"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2, H3 } from "@/components/site/heading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Doors } from "./_components/doors"
import { NewInterfaceOfTime } from "./_components/new-interface-of-time"

export const metadata: Metadata = {
  title: "Week 1",
}

const INSTALL_COMMANDS = [
  { name: "npm", command: "npm create vite@latest" },
  { name: "pnpm", command: "pnpm create vite" },
  { name: "yarn", command: "yarn create vite" },
]

export default function Week1Page() {
  return (
    <div>
      <Section>
        <Content size="lg">
          <Article>
            <H1>Week 1: Intro</H1>
            <p>
              Hi, I’m Joohyun. I’m ITP class of 2019 and work as a design
              engineer.
            </p>

            <p>
              I still remember the moment I was first introduced to{" "}
              <Link href="https://p5js.org/">p5.js</Link> in an ICM class. The
              exercise was about creating an animated circle bouncing off the
              four edges of the browser window. Until then, websites for me were
              just places to search for information, write documents, send
              emails, and so on. It was mind-blowing to realize the browser
              could be a space for artistic expression.
            </p>
            <p>
              That feeling stayed with me, shaping my perspective around the web
              as a creative medium. Of all the tools and media I’ve explored,
              these are the characteristics that make the web feel uniquely
              expressive to me.
            </p>

            <H3>1. It’s interactive.</H3>
            <p>
              Web pages react to every scroll, click, and keypress. Unlike
              static visuals or time-based media, a web experience is inherently
              hands-on, inviting the audience to participate. When integrated
              thoughtfully, interactivity adds a contextual dimension that makes
              art feel alive.
            </p>
            <p>
              Take the demo below, for example: an element that follows your
              cursor. It’s subtle, but engaging. You can participate immediately
              without explanation.
            </p>

            <CursorBall />

            <H3>2. It’s computational.</H3>
            <p>
              Every pixel in the browser is rendered through code. That means
              your work can be computationally dynamic — generating a unique
              composition on every load, responding to live APIs, or turning raw
              data directly into visual and auditory experiences. I call this
              computational nature a new aesthetic.
            </p>
            <p>
              Below is my work,{" "}
              <Link href="https://doors.joohyunpark.com">Doors (2022)</Link>.
              Every door is placed in a randomized position, producing a
              distinct composition every time the page loads. Try reloading the
              scene to see the layout rearrange.
            </p>

            <Doors showRefreshButton />

            <p className="mt-4">
              Another example is{" "}
              <Link href="https://new-interface-of-time.joohyunpark.com">
                New Interface of Time (2023)
              </Link>
              , where visuals are generated in real time from color palettes
              mapped directly to hours, minutes, and seconds. This dynamic
              rendering is possible with browser-native time APIs. In the demo
              below, each time anchor is mapped directly to red, green, and blue
              values. As time flows, it blends colors, creating a meditative
              artifact.
            </p>

            <NewInterfaceOfTime />

            <H3>3. It’s universal.</H3>
            <p>
              Websites are one of the most accessible digital media in
              existence. Anyone with a computer and internet access can open a
              URL—anytime, anywhere. The work doesn’t require specialized
              software, nor do you need to be standing in a museum to experience
              it. No other medium offers that kind of immediate proximity.
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
              <strong>Vanilla</strong> + <strong>JavaScript</strong>. Then
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
              For this class, create a repository and develop your final project
              throughout the semester.
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
    </div>
  )
}
