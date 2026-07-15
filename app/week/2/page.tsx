import { Article } from "@/components/site/article"
import { CodeBlock } from "@/components/site/code-block"
import { Content } from "@/components/site/content"
import { H1, H2, H3 } from "@/components/site/heading"
import { Link } from "@/components/site/link"
import { Section } from "@/components/site/section"
import { Exercise } from "./_components/exercise"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { BasicScene } from "./_components/basic-scene"
import { BasicSceneWithControls } from "./_components/basic-scene-with-controls"
import { BasicSceneWithDebugUI } from "./_components/basic-scene-with-debug-ui"
import { LightsScene } from "./_components/lights-scene"
import { MaterialsScene } from "./_components/materials-scene"
import { TexturesScene } from "./_components/textures-scene"

export const metadata: Metadata = {
  title: "Week 2",
}

export default function Week2Page() {
  return (
    <Section>
      <Content size="lg">
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
            Objects come in many forms: shapes, models, particles, and more.
            Let’s start with a blue box.
          </p>
          <p>
            Anything you see on screen is a <code>Mesh</code>: a{" "}
            <code>geometry</code> for the shape, paired with a{" "}
            <code>material</code> for the surface. <code>BoxGeometry</code>{" "}
            takes the box’s width, height, and depth.{" "}
            <code>MeshBasicMaterial</code> takes an options object &mdash; here
            just a <code>color</code>, which can be a hex number (
            <code>0x0000ff</code>), a hex string (
            <code>&apos;#2563eb&apos;</code>), or a name (
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
              <strong>Field of view</strong>: the vertical viewing angle, in
              degrees. A wide angle distorts; a narrow one zooms in. Around
              45–55° matches natural human perception.
            </li>
            <li>
              <strong>Aspect ratio</strong>: width divided by height. We keep a{" "}
              <code>sizes</code> object set to the window’s dimensions so
              the scene fills the screen.
            </li>
          </ul>
          <CodeBlock
            code={`const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.z = 5
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
            canvas as <code>renderer.domElement</code>; append it to the body to
            show it.
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
            it to <code>setAnimationLoop</code> as a function; here we call it{" "}
            <code>animate</code>, but the name is up to you. Later we’ll
            use it to animate objects, update controls, and more.
          </p>

          <CodeBlock
            code={`const animate = () => {
  renderer.render(scene, camera);
};`}
            lang="js"
          />

          <p>Congratulations. You’ve rendered your first Three.js scene.</p>
          <BasicScene />

          <H2>Around the scene</H2>
          <p>
            With the scene in place, a few tools make it more interactive and
            the development process smoother.
          </p>

          <H3>Controls</H3>
          <p>
            Right now the camera is fixed. Three.js ships several control types,
            each moving the camera in a different way.{" "}
            <code>OrbitControls</code> is the most common: it lets you orbit,
            pan, and zoom by dragging the mouse, great for viewing a scene from
            every angle.
          </p>
          <p>
            Controls live outside the core Three.js library, so import the one
            you want and pass it the camera and the renderer’s canvas.{" "}
            <code>enableDamping</code> smooths out the motion, so the camera
            eases to a stop instead of snapping &mdash; just call{" "}
            <code>controls.update()</code> each frame inside your{" "}
            <code>animate</code> loop.
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

          <BasicSceneWithControls className="mt-8" />

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
            A debug UI lets you tweak values live, such as a color, position, or
            intensity, without editing code and refreshing. <code>lil-gui</code>{" "}
            is the common choice in Three.js.
          </p>
          <p>
            Create a panel, then bind controls to an object’s properties.{" "}
            <code>add</code> handles numbers, booleans, and strings (pass{" "}
            <code>min</code>, <code>max</code>, and <code>step</code> for a
            slider); <code>addColor</code> handles colors.
          </p>
          <CodeBlock
            code={`import GUI from 'three/addons/libs/lil-gui.module.min.js'

const gui = new GUI()
gui.add(mesh.position, 'y', -3, 3, 0.01)
gui.add(material, 'wireframe')
gui.addColor(material, 'color')`}
            lang="js"
          />

          <BasicSceneWithDebugUI className="mt-8" />

          <H2>Geometries</H2>
          <p>
            Geometries are made of <strong>vertices</strong> (points in 3D
            space) and <strong>faces</strong> (triangles connecting them into a
            surface). Three.js has many built-in geometries; see the{" "}
            <Link href="https://threejs.org/manual/#en/primitives">
              primitives article
            </Link>{" "}
            for the full list.
          </p>

          <H3>BoxGeometry</H3>
          <p>Takes width, height, and depth.</p>
          <CodeBlock
            code={`const geometry = new THREE.BoxGeometry(1, 1, 1)`}
            lang="js"
          />

          <H3>SphereGeometry</H3>
          <p>
            Takes a radius, <code>widthSegments</code>, and{" "}
            <code>heightSegments</code>. More segments mean a smoother sphere at
            the cost of more vertices. A good rule: keep{" "}
            <code>widthSegments</code> at double <code>heightSegments</code>{" "}
            (64/32 is enough for most cases).
          </p>
          <CodeBlock
            code={`const geometry = new THREE.SphereGeometry(1, 64, 32)`}
            lang="js"
          />

          <H2>Materials</H2>
          <p>
            Materials define how a surface looks. The same geometry can appear
            flat, shaded, metallic, or glassy depending solely on the material
            you pair it with.
          </p>

          <H3>MeshBasicMaterial</H3>
          <p>
            The simplest material. It renders a solid color and ignores all
            lights in the scene, so every face looks the same regardless of
            where the light is. Useful for wireframes, helpers, or UI elements
            that should never be shaded.
          </p>
          <CodeBlock
            code={`const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })`}
            lang="js"
          />

          <H3>MeshStandardMaterial</H3>
          <p>
            A physically-based material that responds to lights. Two properties
            control its look:
          </p>
          <ul>
            <li>
              <strong>roughness</strong>: 0 is a perfect mirror, 1 is completely
              matte.
            </li>
            <li>
              <strong>metalness</strong>: 0 is non-metal (plastic, fabric), 1 is
              fully metallic.
            </li>
          </ul>
          <p>
            Because it reacts to light, you need at least one light in the scene
            or the mesh will appear black.
          </p>
          <CodeBlock
            code={`const material = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  roughness: 0.8,
  metalness: 0.2,
})`}
            lang="js"
          />

          <p>
            The difference is clear side by side. The left sphere uses{" "}
            <code>MeshBasicMaterial</code> and is flat. The right uses{" "}
            <code>MeshStandardMaterial</code> and picks up the directional
            light.
          </p>
          <MaterialsScene className="mt-8" />
          <p>
            Three.js has many more materials worth knowing. This{" "}
            <Link href="https://threejs.org/manual/?q=material#en/materials">
              materials article
            </Link>{" "}
            in the Three.js manual covers them well.
          </p>

          <H2>Mesh</H2>
          <p>
            A <code>Mesh</code> brings together two things: a geometry and a
            material. On their own, neither can appear in the scene; you have to
            combine them into a mesh before anything renders.
          </p>
          <CodeBlock
            code={`const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({ color: 0x0000ff })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)`}
            lang="js"
          />
          <p>
            Once the mesh is constructed, you can move, rotate, or scale it
            using its{" "}
            <Link href="/week/1#object-properties">object properties</Link>.
          </p>

          <H2>Lights</H2>
          <p>
            Lights are required for any material that reacts to shading. Beyond
            visibility, they’re also essential for setting the tone of your
            experience. (<code>MeshBasicMaterial</code> and{" "}
            <code>MeshNormalMaterial</code> ignore lights.) The{" "}
            <Link href="https://threejs.org/manual/?q=light#en/lights">
              lights article
            </Link>{" "}
            covers lighting in more detail.
          </p>

          <H3>AmbientLight</H3>
          <p>
            Lights every surface equally from all directions: no shadows, no
            shading, just a flat brightness boost across the scene. Use it to
            lift the darkest areas, not as your only light.
          </p>
          <CodeBlock
            code={`const ambientLight = new THREE.AmbientLight('white', 0.2)
scene.add(ambientLight)`}
            lang="js"
          />

          <H3>DirectionalLight</H3>
          <p>
            Emits parallel rays in one direction, like sunlight. It has only a
            direction and no position, so moving it changes the angle, not the
            distance. Good for outdoor scenes or a primary key light.
          </p>
          <CodeBlock
            code={`const directionalLight = new THREE.DirectionalLight('blue', 5)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)`}
            lang="js"
          />

          <H3>PointLight</H3>
          <p>
            Emits light in all directions from a single point, like a bare bulb,
            with intensity falling off over distance. Use it for lamps, candles,
            or any localized light source.
          </p>
          <CodeBlock
            code={`// PointLight(color, intensity, distance, decay)
// distance: max range, 0 = infinite
// decay: falloff rate, default 2 (physically correct)
const pointLight = new THREE.PointLight('red', 5, 10, 1)
pointLight.position.set(-3, 2, 0)
scene.add(pointLight)`}
            lang="js"
          />
          <H3>RectAreaLight</H3>
          <p>
            Emits light from a flat rectangular area, like film lighting.
            Produces soft, area-based lighting with a natural falloff across the
            surface. It requires <code>RectAreaLightUniformsLib.init()</code> to
            be called once before use.
          </p>
          <CodeBlock
            code={`import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js'

RectAreaLightUniformsLib.init()

// RectAreaLight(color, intensity, width, height)
const rectLight = new THREE.RectAreaLight('white', 5, 1, 1.618)
rectLight.position.set(0, -0.191, -3)
rectLight.lookAt(0, 0, 0)
scene.add(rectLight)`}
            lang="js"
          />

          <LightsScene className="mt-8" />

          <H2>Textures</H2>
          <p>
            A texture is an image wrapped onto the surface of a mesh. Load it
            with <code>TextureLoader</code> and pass it to a material through
            the <code>map</code> property. For photos, set the color space to{" "}
            <code>SRGBColorSpace</code>, or the colors will look washed out. The{" "}
            <Link href="https://threejs.org/manual/?q=texture#en/textures">
              textures article
            </Link>{" "}
            covers texturing in depth.
          </p>
          <CodeBlock
            code={`const texture = new THREE.TextureLoader().load('/hubble_telescope_picture.jpg')
texture.colorSpace = THREE.SRGBColorSpace
const material = new THREE.MeshBasicMaterial({ map: texture })`}
            lang="js"
          />
          <TexturesScene className="mt-8" />

          <hr />

          <H2>Exercise</H2>
          <p>
            As a team, build a scene using only BoxGeometry. You’re free to use
            any materials, lights, or textures. The theme is “Doors”.
          </p>
        </Article>

        <Exercise className="mt-8 mb-12" />

        <Article>
          <hr />

          <H2>Assignment</H2>
          <ul>
            <li>
              Build a scaffold for your project with the basics in place:
              lights, controls, and objects.
            </li>
            <li>
              Develop and research your final project idea: define its
              statement, concept, and aesthetic. Next class, we’ll do a group
              exercise to discuss ideas, ask questions, and give feedback, so
              come ready to share a question, a problem you’re stuck on, or
              anything you’d like feedback on.
            </li>
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
