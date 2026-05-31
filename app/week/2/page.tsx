import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"
import { H1, H2, H3 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "Week 2",
}

export default function Week2Page() {
  return (
    <Section>
      <Content>
        <Article>
          <H1>Week 2: Scene</H1>

          <H2>First scene</H2>
          <p>Let’s create our scene. We’ll need these to get started:</p>
          <ul>
            <li>Scene</li>
            <li>Objects</li>
            <li>Camera</li>
            <li>Renderer</li>
            <li>Animation loop</li>
          </ul>

          <H3>Scene</H3>
          <p>
            The scene is the container for everything you want to show. You
            place objects, models, and lights inside it, and Three.js renders
            whatever’s there.
          </p>
          <CodeBlock code={`const scene = new THREE.Scene()`} lang="js" />

          <H3>Objects</H3>
          <p>
            Objects come in many forms &mdash; shapes, models, particles, and
            more. Let’s start with a blue box.
          </p>
          <p>
            Anything you see on screen is a <code>Mesh</code>: a{" "}
            <code>geometry</code> for the shape, paired with a{" "}
            <code>material</code> for the surface. <code>BoxGeometry</code>{" "}
            takes the box’s width, height, and depth.{" "}
            <code>MeshBasicMaterial</code> takes an options object &mdash; here
            just a <code>color</code>, which can be a hex number (
            <code>0x0000ff</code>), a hex string (
            <code>&apos;#0000ff&apos;</code>), or a name (
            <code>&apos;blue&apos;</code>).
          </p>
          <p>
            One thing to remember: add the mesh to the scene, or it won’t appear
            in the render.
          </p>
          <CodeBlock
            code={`const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)`}
            lang="js"
          />

          <H3>Camera</H3>
          <p>
            The camera is your point of view. It’s invisible itself, but it
            decides what the render captures. A <code>PerspectiveCamera</code>{" "}
            mimics human sight, making nearer objects look bigger. It needs two
            values:
          </p>
          <ul>
            <li>
              <strong>Field of view</strong> &mdash; the vertical viewing angle,
              in degrees. A wide angle distorts; a narrow one zooms in. Around
              45–55° matches natural human perception.
            </li>
            <li>
              <strong>Aspect ratio</strong> &mdash; width divided by height. We
              keep a <code>sizes</code> object set to the window’s dimensions so
              the scene fills the screen.
            </li>
          </ul>
          <CodeBlock
            code={`const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
              
scene.add(camera)`}
            lang="js"
          />

          <H3>Renderer</H3>
          <p>
            The renderer takes the scene and the camera and paints the result
            onto a canvas. With this approach, you let Three.js create the
            canvas for you and add it to the page yourself.
          </p>
          <p>
            <code>antialias: true</code> smooths jagged edges.{" "}
            <code>setPixelRatio</code> keeps the render crisp on high-DPI
            screens, <code>setSize</code> fills the window, and{" "}
            <code>setAnimationLoop(animate)</code> runs your{" "}
            <code>animate</code> function every frame. Three.js builds its own
            canvas as <code>renderer.domElement</code> &mdash; append it to the
            body to show it.
          </p>
          <CodeBlock
            code={`const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);`}
            lang="js"
          />

          <H3>Animation loop</H3>
          <p>
            The animation loop runs every frame and renders the scene. We pass
            it to <code>setAnimationLoop</code> as a function &mdash; here we
            call it <code>animate</code>, but the name is up to you. Later we’ll
            use it to animate objects, update controls, and more.
          </p>

          <CodeBlock
            code={`const animate = () => {
  renderer.render(scene, camera);
};`}
            lang="js"
          />

          <H2>Around the scene</H2>
          <p>
            With the scene in place, two tools make development easier. Controls
            let you move the camera around, instead of leaving it fixed in one
            spot. A debug UI lets you tweak values as you build &mdash; handy
            during development, though you’ll usually remove it before shipping.
          </p>

          <H3>Controls</H3>
          <p>
            Right now the camera is fixed. <code>OrbitControls</code> lets you
            orbit, pan, and zoom by dragging the mouse &mdash; great for
            inspecting a scene from every angle. It isn’t part of the core
            library, so you import it separately and pass it the camera and the
            element to listen on (the renderer’s canvas).
          </p>
          <p>
            <code>enableDamping</code> adds a little inertia so movement feels
            smooth. When damping is on, call <code>controls.update()</code> each
            frame inside your <code>animate</code> loop.
          </p>
          <CodeBlock
            code={`import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animate() {
  controls.update()
  renderer.render(scene, camera)
}`}
            lang="js"
          />

          <H3>Resize</H3>
          <p>
            Make the scene responsive to the viewport. On resize, update the
            camera’s aspect ratio and the renderer’s size, and call{" "}
            <code>updateProjectionMatrix()</code> so the new aspect takes
            effect.
          </p>
          <CodeBlock
            code={`const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', onResize);`}
            lang="js"
          />

          <H3>Debug UI</H3>
          <p>
            While building, you’ll constantly want to nudge values &mdash; a
            color, a position, an intensity &mdash; without editing code and
            refreshing. A debug UI gives you live controls. <code>lil-gui</code>{" "}
            is the common choice in Three.js.
          </p>
          <p>
            You create a panel, then add controls bound to an object’s
            properties. <code>add</code> works for numbers, booleans, and
            strings (with <code>min</code>, <code>max</code>, and{" "}
            <code>step</code> for sliders); <code>addColor</code> handles
            colors.
          </p>
          <CodeBlock
            code={`import GUI from 'three/addons/libs/lil-gui.module.min.js'

const gui = new GUI()
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(material, 'wireframe')
gui.addColor(material, 'color')`}
            lang="js"
          />
        </Article>
      </Content>
    </Section>
  )
}
