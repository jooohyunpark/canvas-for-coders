import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { TextScene } from "./_components/text-scene"
import { HtmlScene } from "./_components/html-scene"
import { HtmlButtonScene } from "./_components/html-button-scene"

export const metadata: Metadata = {
  title: "W6: Interaction",
}

export default function Week6Page() {
  return (
    <Section>
      <Content size="lg">
        <Article>
          <H1>Week 6: Interaction</H1>

          <H2>Text</H2>
          <p>
            <Link href="https://drei.docs.pmnd.rs/abstractions/text">
              <code>&lt;Text&gt;</code>
            </Link>{" "}
            renders text as real geometry in the scene. It stays crisp at any
            distance, and you position, rotate, and light it like any mesh.
          </p>
          <CodeBlock
            code={`import { Text } from "@react-three/drei"

<Text
  fontSize={1.6}
  letterSpacing={-0.03}
  anchorX="center"
  anchorY="middle"
  color="#ffffff"
>
  canvas
</Text>`}
            lang="jsx"
          />
          <p>
            Key props: <code>fontSize</code>, <code>letterSpacing</code>,{" "}
            <code>color</code>, <code>anchorX</code> / <code>anchorY</code>{" "}
            (which point sits at the position), <code>font</code> (a{" "}
            <code>.woff</code> URL for your own typeface), and{" "}
            <code>maxWidth</code> (wraps a paragraph). The word below spins so
            you can catch it edge-on — flat geometry in space, not a label stuck
            to the camera.
          </p>
          <TextScene className="mt-8" />
          <p>
            For type with real depth,{" "}
            <Link href="https://drei.docs.pmnd.rs/abstractions/text3d">
              <code>&lt;Text3D&gt;</code>
            </Link>{" "}
            takes a font file and gives each letter thickness to bevel and
            light.
          </p>

          <H2>HTML in the scene</H2>
          <p>
            For captions, tooltips, or menus, you want real HTML.{" "}
            <Link href="https://drei.docs.pmnd.rs/misc/html">
              <code>&lt;Html&gt;</code>
            </Link>{" "}
            pins a DOM element to a point in the scene so it tracks the object as
            the camera moves.
          </p>
          <CodeBlock
            code={`import { Html, Sphere } from "@react-three/drei"

<Sphere ref={sphereRef} args={[2, 64, 32]}>
  <meshStandardMaterial color="blue" />
</Sphere>

<group position={[5, 0, 0]}>
  <Sphere args={[0.2, 64, 32]}>
    <meshStandardMaterial color="yellow" />
  </Sphere>

  <Html center distanceFactor={8} occlude={[sphereRef]}>
    <div className="label">Hello world!</div>
  </Html>
</group>`}
            lang="jsx"
          />
          <p>
            Three props do most of the work: <code>center</code> anchors by the
            middle instead of the top-left, <code>distanceFactor</code> scales
            the element with distance, and <code>occlude</code> lists the meshes
            that can hide it, fading it out when the anchor passes behind one.
            Below, the label rides a marker orbiting the sphere and drops away
            each time it swings behind.
          </p>
          <HtmlScene className="mt-8" />
          <p>
            One caveat: this is DOM layered over the canvas, not pixels drawn
            inside it. Use it for interface, not for things that need to sit
            inside or behind your geometry.
          </p>

          <H3>Interacting with an HTML button</H3>
          <p>
            Because <code>&lt;Html&gt;</code> renders a real DOM element, you can
            use a button&apos;s click event to drive the scene. Drop it in and it
            works like any React control — clicking updates state, and any mesh
            reading that state re-renders to match: new positions, fresh
            rotations, a shuffled layout.
          </p>
          <CodeBlock
            code={`function Scene() {
  const [layout, setLayout] = useState(() => generateLayout(DOOR_COUNT + 1))
  const [{ scale }, api] = useSpring(() => ({ scale: 1 }))

  const randomize = () =>
    api.start({
      to: async (next) => {
        await next({ scale: 0 })                  // collapse the doors
        setLayout(generateLayout(DOOR_COUNT + 1)) // new random slots
        await next({ scale: 1 })                  // open them back out
      },
    })

  // the button takes the first slot (always placed), the rest are doors
  const [button, ...doors] = layout

  return (
    <>
      {doors.map((placement, i) => (
        <Door key={i} {...placement} scale={scale} />
      ))}

      <Html center position={button.position}>
        <button onClick={randomize}>
          <Shuffle />
        </button>
      </Html>
    </>
  )
}`}
            lang="jsx"
          />
          <HtmlButtonScene className="mt-8" />
        </Article>
      </Content>
    </Section>
  )
}
