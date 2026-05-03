import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "W1: Intro",
}

const installCode = `npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm install three
npm run dev`

const vectorCode = `import * as THREE from "three"

const v = new THREE.Vector3(1, 2, 3)
v.x = 5
v.add(new THREE.Vector3(0, 1, 0))
console.log(v) // Vector3 { x: 5, y: 3, z: 3 }`

const colorCode = `
const a = new THREE.Color("tomato")
const b = new THREE.Color("#3366ff")
const c = new THREE.Color(1, 0, 0.5)`

const objectCode = `import * as THREE from "three"

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0, 1, 0)
mesh.rotation.y = Math.PI / 4
mesh.scale.setScalar(2)

scene.add(mesh)`

export default function Week1Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <H1>Week 1: Introduction</H1>
            <p>Welcome. XXXXX</p>

            <H2>Your go-to reference</H2>
            <p>The following references will be helpful as you work:</p>
            <ul>
              <li>
                <a
                  href="https://threejs.org/docs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Three.js documentation
                </a>{" "}
                for the API reference.
              </li>
              <li>
                <a
                  href="https://threejs.org/manual/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Three.js fundamentals
                </a>{" "}
                for core concepts.
              </li>
            </ul>

            <H2>Thinking in xyz space</H2>
            <p>
              Open the{" "}
              <a
                href="https://threejs.org/editor/"
                target="_blank"
                rel="noreferrer"
              >
                Three.js editor
              </a>{" "}
              and add a few primitives. Three things to notice:
            </p>
            <ul>
              <li>
                <code>x</code> goes right, <code>y</code> goes up,{" "}
                <code>z</code> comes toward the camera.
              </li>
              <li>
                Every object has a <code>position</code>, <code>rotation</code>,
                and <code>scale</code>.
              </li>
              <li>
                The camera is also an object. Move it instead of moving the
                world.
              </li>
            </ul>

            <H2>Getting started with a Vite project</H2>
            <p>
              Vite is a dev server and bundler. It gives you fast reload and ES
              module imports, so you can pull in <code>three</code> like any
              other package.
            </p>

            <CodeBlock code={installCode} lang="sh" />

            <H2>Vectors</H2>
            <p>
              A <code>Vector3</code> holds three numbers: <code>x</code>,{" "}
              <code>y</code>, <code>z</code>. We use it for positions,
              directions, and any other quantity with three components.
            </p>

            <CodeBlock code={vectorCode} lang="ts" />

            <H2>Colors</H2>
            <p>
              <code>Color</code> accepts a CSS name, a hex string, or three
              numbers in the range 0&ndash;1. Three.js stores it as floats so
              the GPU can blend between values.
            </p>
            <CodeBlock code={colorCode} lang="js" />

            <H2>Object properties</H2>
            <p>
              Meshes, lights, cameras, and groups all extend{" "}
              <code>Object3D</code>. They share the same transform:{" "}
              <code>position</code>, <code>rotation</code>, and{" "}
              <code>scale</code>. Add an object with <code>scene.add()</code>.
            </p>
            <CodeBlock code={objectCode} lang="ts" />
          </Article>
        </Content>
      </Section>
    </div>
  )
}
