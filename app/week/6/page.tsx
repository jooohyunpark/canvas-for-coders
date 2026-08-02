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
import { ScrollScene } from "./_components/scroll-scene"
import { ScrollHtmlScene } from "./_components/scroll-html-scene"
import { PhysicsScene } from "./_components/physics-scene"

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
            distance, and you position, rotate, and light it like any mesh. For
            type with real depth,{" "}
            <Link href="https://drei.docs.pmnd.rs/abstractions/text3d">
              <code>&lt;Text3D&gt;</code>
            </Link>{" "}
            extrudes each letter from a font file so it catches light like any
            solid object.
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

          <TextScene className="mt-8" />

          <H2>HTML in the scene</H2>
          <p>
            Sometimes you need a real HTML element in the scene: labels,
            tooltips, or buttons.{" "}
            <Link href="https://drei.docs.pmnd.rs/misc/html">
              <code>&lt;Html&gt;</code>
            </Link>{" "}
            pins a DOM element to a point in the scene so it tracks the object
            as the camera moves.
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
            Because <code>&lt;Html&gt;</code> renders a real DOM element, you
            can use a button&apos;s click event to drive the scene. It works
            like any React control: clicking updates state, and any mesh reading
            that state re-renders to match with new positions, fresh rotations,
            a shuffled layout.
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

          <H2>Scroll-driven scenes</H2>
          <p>
            <Link href="https://drei.docs.pmnd.rs/controls/scroll-controls">
              <code>&lt;ScrollControls&gt;</code>
            </Link>{" "}
            makes the area around the canvas scrollable, <code>pages</code>{" "}
            tall, and <code>useScroll</code> tells you where you are in it. Read
            that inside <code>useFrame</code> and nothing runs on a timer any
            more. The visitor scrubs it.
          </p>
          <CodeBlock
            code={`import { ScrollControls, useScroll } from "@react-three/drei"

function ScrollCamera() {
  const camera = useRef()
  const scroll = useScroll()

  useFrame(() => {
    const out = scroll.range(0, 0.6) // back out of the field
    const up = scroll.range(0.4, 0.6) // then climb overhead

    const radius = MathUtils.lerp(0.05, 50, out) // 0: in the middle
    const polar = MathUtils.lerp(Math.PI * 0.5, 0.02, up) // level to overhead
    const azimuth = START_ANGLE + scroll.offset * Math.PI

    camera.current.position.setFromSphericalCoords(radius, polar, azimuth)
    camera.current.lookAt(0, 0, 0)
  })

  return <PerspectiveCamera ref={camera} makeDefault />
}

<ScrollControls pages={3} damping={0.2}>
  <ScrollCamera />
  {DOORS.map((door) => (
    <Door key={door.color} {...door} />
  ))}
</ScrollControls>`}
            lang="jsx"
          />
          <p>
            <code>offset</code> is the whole scroll as 0 to 1. To stage one move
            inside it, <code>range(from, distance)</code> gives 0 to 1 across a
            slice, <code>curve</code> ramps the same slice up and back down, and{" "}
            <code>visible</code> is a boolean for skipping work. Below, the
            doors stay put and the scroll moves the camera.
          </p>
          <ScrollScene className="mt-8" />

          <H3>Scrolling scenes and HTML together</H3>
          <p>
            <code>useScroll</code> lets you react to the scroll.{" "}
            <Link href="https://drei.docs.pmnd.rs/controls/scroll-controls">
              <code>&lt;Scroll&gt;</code>
            </Link>{" "}
            does the moving for you: whatever sits inside travels with the
            scroll, so meshes placed a viewport apart arrive one at a time. Add{" "}
            <code>html</code> and you get a second track, this one real DOM,
            moving at the same speed. That is how you keep copy beside the
            object it describes.
          </p>
          <CodeBlock
            code={`import { Scroll, ScrollControls } from "@react-three/drei"

<ScrollControls pages={3} damping={0.2}>
  {/* 3D track: one box per page, each a viewport below the last */}
  <Scroll>
    <group position={[width * 0.25, 0, 0]}>
      {PAGES.map((page, i) => (
        <Box key={page.title} {...page} position={[0, -i * height, 0]} />
      ))}
    </group>
  </Scroll>

  {/* DOM track: one block per page, each a canvas tall */}
  <Scroll html style={{ width: "100%" }}>
    {PAGES.map((page) => (
      <div key={page.title} style={{ height }}>
        <h3>{page.title}</h3>
        <p>{page.body}</p>
      </div>
    ))}
  </Scroll>
</ScrollControls>`}
            lang="jsx"
          />
          <p>
            Mind the units. A page is <code>viewport.height</code> in the 3D
            track and <code>size.height</code> in the DOM one, both from{" "}
            <code>useThree</code>. Swap them and the two tracks drift apart the
            moment the window resizes.
          </p>
          <ScrollHtmlScene className="mt-8" />
          <p>
            One caveat: this scroll lives in the container, not the document, so
            your page cannot drive it. Give a scroll-driven scene the whole
            screen, or accept a second scroll area inside the page.
          </p>

          <H2>Physics</H2>
          <p>
            <Link href="https://github.com/pmndrs/react-three-rapier">
              <code>@react-three/rapier</code>
            </Link>{" "}
            wraps a physics engine as components. <code>&lt;Physics&gt;</code>{" "}
            creates a world and steps it every frame. Anything inside a{" "}
            <code>&lt;RigidBody&gt;</code> is handed to that world, which writes
            its position and rotation from then on. A dynamic body falls and
            collides. A <code>fixed</code> one collides but never moves, which
            is how you build a floor.
          </p>
          <CodeBlock
            code={`import { Text3D } from "@react-three/drei"
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier"

// One body per letter, each released from the same point with a random tumble
function Letter({ char, rotation }) {
  return (
    <RigidBody position={[0, 11, 0]} rotation={rotation} colliders="cuboid" ccd>
      <Text3D font="/fonts/helvetiker_regular.typeface.json" size={1} height={0.25}>
        {char}
        <meshStandardMaterial color="#ffffff" />
      </Text3D>
    </RigidBody>
  )
}

function Scene() {
  const [letters, setLetters] = useState([])

  return (
    <Physics gravity={[0, -9.81, 0]}>
      {/* the floor: fixed, so nothing it stops can push it */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[12, 1, 8]} position={[0, -1, 0]} />
      </RigidBody>

      {letters.map((letter) => (
        <Letter key={letter.id} {...letter} />
      ))}
    </Physics>
  )
}`}
            lang="jsx"
          />
          <p>
            Colliders are the shapes the engine collides, and they are not your
            geometry. <code>colliders=&quot;cuboid&quot;</code> measures each
            letter&apos;s bounding box and hands over that, so an <code>e</code>{" "}
            collides as the box around an <code>e</code>. A box is one
            comparison, a glyph is hundreds.{" "}
            <code>colliders=&quot;hull&quot;</code> wraps tighter when you need
            it, and <code>debug</code> on <code>&lt;Physics&gt;</code> draws
            whichever you chose. This works only because{" "}
            <code>&lt;Text3D&gt;</code> extrudes: flat text has no thickness,
            and a shape with no depth is one things fall through.
          </p>
          <p>
            Dropping a letter is a normal state update. It mounts its own{" "}
            <code>&lt;RigidBody&gt;</code> and the world takes over, so nothing
            already in the pile moves because of the render. Every letter starts
            at the same point, and what spreads them is what they land on. Key
            by id, not index, or removing the oldest letters remounts every body
            resting on them.
          </p>
          <PhysicsScene className="mt-8" />
          <p>
            One caveat: every body is a body forever. This scene caps the pile
            and takes the oldest letters out from under it.
          </p>
          <H2>Wrapping up</H2>
          <p>
            That&apos;s the last of the material. What you have now is enough to
            build the thing you sketched back in week one: a scene, a reason to
            look at it, and a way to make it interactive. Keep making, and keep
            sharing what you build. I can&apos;t wait to see where these go.
          </p>
        </Article>
      </Content>
    </Section>
  )
}
