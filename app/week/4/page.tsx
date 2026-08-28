import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"
import { Button } from "@/components/ui/button"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ButtonDemo } from "./_components/button-demo"
import { CounterDemo } from "./_components/counter-demo"
import { LiftStateDemo } from "./_components/lift-state-demo"
import { EffectDemo } from "./_components/effect-demo"
import { Exercise } from "./_components/exercise"

export const metadata: Metadata = {
  title: "Week 4",
}

const CREATE_COMMANDS = [
  { name: "npm", command: "npm create vite@latest" },
  { name: "pnpm", command: "pnpm create vite" },
  { name: "yarn", command: "yarn create vite" },
]

export default function Week4Page() {
  return (
    <Section>
      <Content size="lg">
        <Article>
          <H1>Week 4: React</H1>

          <H2>Concept</H2>
          <p>
            JavaScript doesn&apos;t enforce a programming style, but the code
            you write tends to be imperative: step-by-step instructions that
            tell the browser exactly what to do. You can see this in every
            Three.js project so far.
          </p>
          <CodeBlock
            code={`const app = document.querySelector('#app')

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
app.appendChild(renderer.domElement)`}
            lang="js"
          />

          <H3>Declarative vs. imperative</H3>
          <p>
            React flips the model. Instead of writing steps for how to update
            the UI, you describe what it should look like for a given piece of
            data, and React takes care of applying that to the page.
          </p>
          <p>
            Here&apos;s the same counter built both ways, starting from the same
            markup:
          </p>
          <CodeBlock
            code={`<!-- index.html -->
<div>
  <p>0</p>
  <button>+</button>
</div>`}
            lang="html"
          />
          <p>
            In vanilla JS, you grab the elements yourself and update them by
            hand every time the count changes:
          </p>
          <CodeBlock
            code={`// Vanilla JS — imperative
let count = 0

const p = document.querySelector("p")
const button = document.querySelector("button")

button.addEventListener("click", () => {
  count++
  p.textContent = count // update manually every time
})`}
            lang="js"
          />
          <p>
            In React, you describe the markup for the current count, and React
            keeps the <code>&lt;p&gt;</code> in sync whenever it changes:
          </p>
          <CodeBlock
            code={`// React — declarative
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}`}
            lang="jsx"
          />
          <p>
            You&apos;ve already felt this contrast in Three.js, where you drive
            every frame yourself. React does the opposite: you declare the
            result, and it handles the rest.
          </p>

          <H3>UI as a function of state</H3>
          <p>
            The core idea: <code>UI = f(state)</code>. A component is a
            function: same state in, same UI out. When state changes, React
            re-runs the function and updates only what&apos;s different on the
            page.
          </p>
          <p>
            You never touch the DOM directly. Update the state, and the UI
            follows.
          </p>

          <H2>Setting up</H2>
          <p>
            Run the Vite scaffolding command and select{" "}
            <strong>React + JavaScript</strong> as the template. Then install
            and start:
          </p>

          <Tabs defaultValue="npm">
            <TabsList variant="line">
              {CREATE_COMMANDS.map(({ name }) => (
                <TabsTrigger key={name} value={name}>
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
            {CREATE_COMMANDS.map(({ name, command }) => (
              <TabsContent key={name} value={name}>
                <CodeBlock code={command} lang="bash" />
              </TabsContent>
            ))}
          </Tabs>

          <p>Then, move into the project and start the dev server:</p>
          <CodeBlock
            code={`cd my-project
npm install
npm run dev`}
            lang="bash"
          />

          <H2>JSX</H2>
          <p>
            Before we build anything, one piece of syntax you&apos;ll see
            everywhere in React: JSX.
          </p>
          <p>
            JSX looks like HTML, but it&apos;s actually JavaScript. It lets you
            write markup directly inside your code, and a build step turns it
            into plain JavaScript objects that describe the UI. It&apos;s not a
            template language, it&apos;s JavaScript wearing HTML. And because
            it&apos;s JavaScript, curly braces let you drop an expression right
            into the markup:
          </p>
          <CodeBlock
            code={`function Greeting() {
  const name = "Ada"

  return <h1>Hello, {name}!</h1>
}`}
            lang="jsx"
          />
          <p>JSX comes with a few rules.</p>

          <H3>One root element</H3>
          <p>
            A component can only return a single element. To return siblings
            without adding an extra <code>div</code> to the DOM, wrap them in a
            fragment: <code>&lt;&gt;...&lt;/&gt;</code>.
          </p>
          <CodeBlock
            code={`return (
  <>
    <h1>Title</h1>
    <p>Some text</p>
  </>
)`}
            lang="jsx"
          />

          <H3>Attributes</H3>
          <p>
            <code>class</code> is a reserved word in JavaScript, so JSX uses{" "}
            <code>className</code> instead. Multi-word attributes are camelCase
            (<code>onClick</code>, <code>tabIndex</code>), and tags with no
            children must self-close.
          </p>
          <CodeBlock
            code={`<div className="card" tabIndex={0}>
  <img src="/cover.jpg" alt="" />
  <br />
</div>`}
            lang="jsx"
          />

          <H3>Conditional rendering</H3>
          <p>
            There&apos;s no <code>if</code> inside JSX, only expressions. A
            ternary picks between two elements, and <code>&&</code> renders
            something or nothing.
          </p>
          <CodeBlock
            code={`{isLoggedIn ? <Dashboard /> : <Login />}

{hasError && <ErrorBanner />}`}
            lang="jsx"
          />

          <H3>Rendering lists</H3>
          <p>
            Use <code>.map()</code> to turn an array into elements. Each item
            needs a <code>key</code> prop, a stable, unique identifier that
            helps React track items across re-renders.
          </p>
          <CodeBlock
            code={`{items.map((item) => (
  <li key={item.id}>{item.label}</li>
))}`}
            lang="jsx"
          />

          <H2>Components &amp; props</H2>
          <p>
            A component is a function that returns JSX. That&apos;s the whole
            idea: you write a function, it returns some markup, and you use it
            like an HTML tag.
          </p>
          <CodeBlock
            code={`function Greeting() {
  return <h1>Hello!</h1>
}

// use it like a tag
<Greeting />`}
            lang="jsx"
          />
          <p>
            Component names must start with a capital letter (a convention
            called PascalCase). React uses the casing to tell your components
            apart from built-in HTML tags: <code>&lt;button&gt;</code> is a DOM
            element, <code>&lt;Greeting /&gt;</code> is your component.
          </p>

          <H3>Props</H3>
          <p>
            Props let you pass data into a component. They arrive as a single
            object, the function&apos;s parameter, and you use them like any
            other variable, with curly braces.
          </p>
          <CodeBlock
            code={`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>
}

<Greeting name="Ada" />`}
            lang="jsx"
          />
          <p>
            It&apos;s common to destructure them right in the function
            signature, so you can write <code>name</code> instead of{" "}
            <code>props.name</code>:
          </p>
          <CodeBlock
            code={`function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}`}
            lang="jsx"
          />
          <p>
            Props are read-only. A component should never change what it
            receives. Treat them like arguments passed into a function, not
            variables to reassign.
          </p>

          <H3>Children</H3>
          <p>
            Whatever you put between a component&apos;s opening and closing tags
            shows up as a special prop called <code>children</code>. This is how
            you nest components the way you nest HTML.
          </p>
          <CodeBlock
            code={`function Card({ children }) {
  return <div className="card">{children}</div>
}

<Card>
  <h2>Title</h2>
  <p>Some text inside the card.</p>
</Card>`}
            lang="jsx"
          />

          <H3>Example</H3>
          <p>
            A button demonstrates these concepts together. It uses a{" "}
            <code>variant</code> prop to determine its visual style (defaulting
            to <code>&quot;default&quot;</code> if omitted) and uses{" "}
            <code>children</code> to render its inner text or label.
          </p>
          <CodeBlock
            code={`function Button({ variant = "default", children }) {
  return <button className={\`btn \${variant}\`}>{children}</button>
}`}
            lang="jsx"
          />
          <p>
            One component with variations for different use cases, based on the
            prop you pass:
          </p>
          <CodeBlock
            code={`<div>
  <Button>Submit</Button>
  <Button variant="secondary">Preview</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Learn more</Button>
  <Button variant="destructive">Delete</Button>
</div>`}
            lang="jsx"
          />
          <ButtonDemo className="mt-4" />

          <H3>Scoped styling</H3>
          <p>
            Plain CSS is global: a <code>.button</code> rule in one file styles
            every <code>.button</code> on the page. Once you have a handful of
            components, those names start to collide. CSS Modules solve this by
            scoping styles to the component that imports them.
          </p>
          <p>
            Name the stylesheet with a <code>.module.css</code> extension and
            write ordinary CSS. That <code>.module.css</code> suffix is the
            signal that turns on scoping.
          </p>
          <CodeBlock
            code={`/* index.module.css */
.button {
  padding: 8px 16px;
  border-radius: 6px;
}`}
            lang="css"
          />
          <p>
            Import it as an object and access each class through a property.
            During the build step, each class is rewritten to a unique name, so
            the styles can&apos;t leak out to other components.
          </p>
          <CodeBlock
            code={`import styles from "./index.module.css"

function Button({ children }) {
  return <button className={styles.button}>{children}</button>
}`}
            lang="jsx"
          />
          <p>
            Since the styles belong to one component, keep them next to it. A
            common layout is a folder per component, each holding its markup and
            its stylesheet together:
          </p>
          <CodeBlock
            code={`src/
  components/
    Button/
      index.jsx
      index.module.css
    Card/
      index.jsx
      index.module.css`}
            lang="text"
          />
          <p>
            With this layout, importing a component points at its folder,{" "}
            <code>import Button from &quot;./components/Button&quot;</code>, and
            the <code>index.jsx</code> inside is picked up automatically.
          </p>

          <H2>Event handlers</H2>
          <p>
            Components respond to input through event handlers like{" "}
            <code>onClick</code>, <code>onChange</code>, and{" "}
            <code>onSubmit</code>. Pass a reference to your function, not a call
            to it.
          </p>
          <CodeBlock
            code={`<button onClick={handleClick}>Save</button>   // ✅ reference
<button onClick={handleClick()}>Save</button> // ❌ runs on render`}
            lang="jsx"
          />
          <p>To pass an argument, wrap it in an inline arrow:</p>
          <CodeBlock
            code={`<button onClick={() => handleDelete(id)}>Delete</button>`}
            lang="jsx"
          />
          <p>
            The same pattern works for any event. Pointer and keyboard events
            like <code>onMouseEnter</code>, <code>onMouseMove</code>, and{" "}
            <code>onKeyDown</code> receive an event object with details about
            what happened:
          </p>
          <CodeBlock
            code={`<div onMouseMove={(e) => console.log(e.clientX, e.clientY)}>
  Move your mouse here
</div>`}
            lang="jsx"
          />

          <H2>State</H2>

          <p>
            State is the data a component remembers and controls on its own.
            It&apos;s a big part of what makes React powerful: you can build
            complex interfaces from small, self-contained pieces, each managing
            its own part.
          </p>

          <H3>useState</H3>
          <p>
            A component is just a function, and it runs again on every render.
            So a normal variable won’t work since it gets recreated and reset
            each time. To keep a value between renders, React provides the{" "}
            <code>useState</code> hook. The convention is{" "}
            <code>[value, setValue]</code>.
          </p>
          <CodeBlock
            code={`import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0)

  const handleClick = () => setCount(count + 1)

  return (
    <button onClick={handleClick}>
      {count}
    </button>
  )
}`}
            lang="jsx"
          />
          <CounterDemo className="mt-4" />
          <p>
            In the example above, <code>useState(0)</code> sets the starting
            value and returns two things: the current value (<code>count</code>)
            and a function to change it (<code>setCount</code>). The key is to
            always update through the setter (<code>setCount</code>) rather than
            reassigning <code>count</code> yourself.
          </p>

          <H3>State is local</H3>
          <p>
            State belongs to the component that declares it. Each{" "}
            <code>&lt;Counter /&gt;</code> on the page keeps its own independent
            count, so updating one doesn&apos;t touch the others.
          </p>
          <CodeBlock
            code={`<Counter />   {/* has its own count */}
<Counter />   {/* completely separate count */}`}
            lang="jsx"
          />

          <H3>Don&apos;t mutate state directly</H3>
          <p>
            State often holds an array or object, not just a single value. Say
            you&apos;re keeping a list:
          </p>
          <CodeBlock
            code={`const [items, setItems] = useState([])`}
            lang="jsx"
          />
          <p>
            To add an item, your instinct might be to push onto the array. But
            that mutates it (changes the existing array in place), and React
            won&apos;t notice:
          </p>
          <CodeBlock
            code={`// wrong — mutates the existing array
items.push(newItem)
setItems(items)`}
            lang="jsx"
          />
          <p>
            React decides whether to re-render by checking if the value is a
            different one than before. <code>push</code> keeps the same array,
            so React assumes nothing changed and skips the update. Instead,
            build a new array with the old items plus the new one:
          </p>
          <CodeBlock
            code={`// right — creates a new array
setItems([...items, newItem])`}
            lang="jsx"
          />
          <p>
            The <code>...</code> spreads the existing items into a fresh array.
            React sees something new and re-renders. Same rule for objects: make
            a new one with <code>{`{ ...old, key: value }`}</code> rather than
            editing the old.
          </p>

          <H3>Lifting state up</H3>
          <p>
            When two sibling components need the same data, neither can own it:
            siblings can&apos;t see each other&apos;s state. Move the state up
            to their closest shared parent, then pass it down to both as props.
          </p>
          <CodeBlock
            code={`function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Display count={count} />
      <Controls
        onIncrement={() => setCount(count + 1)}
        onDecrement={() => setCount(count - 1)}
        onReset={() => setCount(0)}
      />
    </>
  )
}`}
            lang="jsx"
          />
          <p>
            The parent owns the state. <code>Display</code> reads it through a
            prop, and <code>Controls</code> changes it by calling a function the
            parent passed down. It&apos;s the props flow in action: data flows
            down, and a child changes the parent&apos;s state only through a
            function, never by editing a prop directly.
          </p>
          <LiftStateDemo className="mt-4" />

          <H2>Hooks</H2>
          <p>
            You&apos;ve already used one hook: <code>useState</code>. Hooks are
            functions that let a component tap into React features, and they all
            start with <code>use</code>. Two more will carry you into next
            week&apos;s Three.js work: <code>useEffect</code>, for running code
            around a render, and <code>useRef</code>, for holding onto a DOM
            node.
          </p>

          <H3>Rules of hooks</H3>
          <p>
            Hooks come with two rules. React&apos;s tooling warns you when you
            break them:
          </p>
          <ul>
            <li>
              Call them at the top level of your component, never inside a loop,
              condition, or nested function. React tracks hooks by the order
              they run, so that order has to stay the same on every render.
            </li>
            <li>
              Call them only from React functions: components or your own custom
              hooks, never plain JavaScript functions.
            </li>
          </ul>

          <H3>useEffect</H3>
          <p>
            Some work doesn&apos;t belong in the middle of rendering: starting a
            timer, fetching data, subscribing to an event, drawing to a canvas.
            These are called side effects, anything that reaches outside the
            component. <code>useEffect</code> runs them after React has
            rendered, so your render stays a clean <code>UI = f(state)</code>.
          </p>
          <CodeBlock
            code={`import { useEffect, useState } from "react"

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return <p>{time.toLocaleTimeString()}</p>
}`}
            lang="jsx"
          />
          <EffectDemo className="mt-4" />
          <p>
            Two parts do the work. The function you pass is the effect itself.
            The second argument is the dependency array, which tells React when
            to re-run it:
          </p>
          <ul>
            <li>
              <code>[]</code>: run once, after the first render. Good for
              one-time setup.
            </li>
            <li>
              <code>[count]</code>: run again whenever a listed value changes.
            </li>
          </ul>
          <p>
            If an effect sets up something that keeps running, like the interval
            above, it has to clean up after itself. Return a function from the
            effect, and React runs it before the next effect and when the
            component is removed. Skip it, and the interval keeps firing after
            the component is gone.
          </p>
          <CodeBlock
            code={`useEffect(() => {
  const handleResize = () => console.log(window.innerWidth)
  window.addEventListener("resize", handleResize)

  return () => window.removeEventListener("resize", handleResize)
}, [])`}
            lang="jsx"
          />

          <H3>useRef</H3>
          <p>
            <code>useRef</code> gives you a handle to a real DOM node. Pass a
            ref to an element&apos;s <code>ref</code> attribute, and React
            points <code>.current</code> at the actual node once it&apos;s on
            the page: an escape hatch to the DOM for when you need it.
          </p>
          <CodeBlock
            code={`function TextField() {
  const inputRef = useRef(null)

  const focusInput = () => inputRef.current.focus()

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  )
}`}
            lang="jsx"
          />
          <p>
            A ref can also hold onto a value between renders without triggering
            one, but reaching the DOM is what you&apos;ll use it for most.
          </p>

          <hr />

          <H2>Exercise</H2>
          <p>
            In this exercise you&apos;ll create an emoji chatbot: a chat app
            where every response comes back as emojis. The starter code gives
            you the skeleton: a message list, an input composer, and a{" "}
            <code>handleSend</code> function in <code>App.js</code>. Your job is
            to wire these pieces together into a functioning chat.
          </p>
          <p>
            You don&apos;t need to write the logic yourself; that lives in{" "}
            <code>emoji-api.js</code>. It exposes a single function,{" "}
            <code>sendMessage(prompt)</code>, which simulates an API call: pass
            it some text and, after a brief delay, it resolves with a random
            emoji string. Since <code>handleSend</code> already imports and{" "}
            <code>await</code>s it, you&apos;re free to concentrate on the React
            side of things.
          </p>
          <CodeBlock
            code={`import { sendMessage } from "./emoji-api"

const reply = await sendMessage("hello")
// → something like "🚀✨🦄🎉"`}
            lang="jsx"
          />
          <p>Here&apos;s a roadmap:</p>
          <ul>
            <li>
              Make the input a controlled field: store its text in{" "}
              <code>state</code> and update it via <code>onChange</code>.
            </li>
            <li>
              Track the conversation in a second state variable, an array of
              messages. When the user submits, append their prompt, call{" "}
              <code>sendMessage</code>, and append the emoji response. Always
              create a fresh array rather than modifying the existing one.
            </li>
            <li>
              Use <code>.map()</code> to render the message list, giving each
              item a stable <code>key</code>, and reset the input after sending.
            </li>
          </ul>
          <p>
            Want to go further? Try displaying a &ldquo;typing…&rdquo; indicator
            while waiting for the reply, or auto-scrolling to the latest message
            using a <code>ref</code> with <code>useEffect</code>.
          </p>
        </Article>

        <Exercise className="mt-8 mb-12" />

        <Article>
          <hr />

          <H2>Assignment</H2>
          <ul>
            <li>
              Read a <Link href="https://react.dev/learn">quick start</Link>{" "}
              from the React documentation.
            </li>
            <li>
              Continue developing your project — next week you’ll migrate it to
              a React app.
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
