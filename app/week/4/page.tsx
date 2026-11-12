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
import { Block } from "@/components/site/block"

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
            JavaScript doesn’t enforce a programming style, but the code you
            write tends to be imperative: step-by-step instructions that tell
            the browser exactly what to do. You can see this in every Three.js
            project we’ve built so far.
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
            React works the other way around. Instead of writing the steps to
            update the UI, you describe what it should look like for a given
            piece of data, and React takes care of applying that to the page.
          </p>
          <p>
            Here’s the same counter built both ways, starting from the same
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
            In vanilla JS, you select the elements yourself and update them by
            hand each time the count changes:
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
            keeps the <code>{"<p>"}</code> in sync whenever it changes:
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
            You’ve already seen the imperative side in Three.js, where you drive
            every frame yourself. In React, you declare the result and let React
            handle the rest.
          </p>

          <H3>UI as a function of state</H3>
          <p>
            The core idea is <code>UI = f(state)</code>. A component is a
            function: the same state in always gives the same UI out. When state
            changes, React re-runs the function and updates only what’s
            different on the page.
          </p>
          <p>
            You don’t touch the DOM directly. You update the state, and the UI
            follows.
          </p>

          <H2>Setting up</H2>
          <p>
            Scaffold a new project with Vite, selecting{" "}
            <strong>React + JavaScript</strong> as the template:
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
                <CodeBlock code={command} lang="bash" className="mt-0" />
              </TabsContent>
            ))}
          </Tabs>

          <p>
            Next, move into the project folder, install the dependencies, and
            start the dev server:
          </p>
          <CodeBlock
            code={`cd my-project
npm install
npm run dev`}
            lang="bash"
          />

          <H2>JSX</H2>
          <p>
            Before we build anything, let’s look at one piece of syntax you’ll
            see throughout React:{" "}
            <Link href="https://react.dev/learn/writing-markup-with-jsx">
              JSX
            </Link>
            .
          </p>
          <p>
            JSX looks like HTML, but it’s JavaScript. It lets you write markup
            directly inside your code, and a build step turns it into plain
            JavaScript objects that describe the UI. Because it’s JavaScript,
            you can use curly braces to place any expression inside the markup:
          </p>
          <CodeBlock
            code={`function Greeting() {
  const name = "Ada"

  return <h1>Hello, {name}!</h1>
}`}
            lang="jsx"
          />
          <p>JSX has a few rules to keep in mind.</p>

          <H3>One root element</H3>
          <p>
            A component can only return a single element. To return siblings
            without adding an extra <code>div</code> to the DOM, wrap them in a
            fragment: <code>{"<>...</>"}</code>.
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
            JSX accepts expressions, not statements, so you can’t use{" "}
            <code>if</code> inside it. Instead, a ternary chooses between two
            elements, and <code>&&</code> renders something only when the
            condition is true.
          </p>
          <CodeBlock
            code={`{isLoggedIn ? <Dashboard /> : <Login />}

{hasError && <ErrorBanner />}`}
            lang="jsx"
          />

          <H3>Rendering lists</H3>
          <p>
            Use <code>.map()</code> to turn an array into elements. Each item
            needs a <code>key</code> prop: a stable, unique identifier that
            helps React keep track of items across re-renders.
          </p>
          <CodeBlock
            code={`{items.map((item) => (
  <li key={item.id}>{item.label}</li>
))}`}
            lang="jsx"
          />

          <H2>Components & props</H2>
          <p>
            A component is a function that returns JSX. You write the function,
            it returns some markup, and you use it like an HTML tag.
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
            apart from built-in HTML tags: <code>{"<button>"}</code> is a DOM
            element, while <code>{"<Greeting />"}</code> is your own component.
          </p>

          <H3>Props</H3>
          <p>
            Props let you pass data into a component. They arrive as a single
            object (the function’s parameter), and you use them in JSX with
            curly braces, like any other variable.
          </p>
          <CodeBlock
            code={`function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>
}

<Greeting name="Ada" />`}
            lang="jsx"
          />
          <p>
            It’s common to destructure them right in the function signature, so
            you can write <code>name</code> instead of <code>props.name</code>:
          </p>
          <CodeBlock
            code={`function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>
}`}
            lang="jsx"
          />
          <p>
            Props are read-only: a component should never change the props it
            receives. Think of them as arguments passed into a function, not
            variables to reassign.
          </p>

          <H3>Children</H3>
          <p>
            Whatever you put between a component’s opening and closing tags
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
            A button brings these ideas together. It uses a <code>variant</code>{" "}
            prop to set its visual style, falling back to{" "}
            <code>{'"default"'}</code> when none is given, and renders its label
            through <code>children</code>.
          </p>
          <CodeBlock
            code={`function Button({ variant = "default", children }) {
  return <button className={\`btn \${variant}\`}>{children}</button>
}`}
            lang="jsx"
          />
          <p>
            The result is one component that adapts to different use cases,
            depending on the prop you pass:
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
          <Block>
            <ButtonDemo />
          </Block>

          <H3>Scoped styling</H3>
          <p>
            Plain CSS is global: a <code>.button</code> rule in one file styles
            every <code>.button</code> on the page. Once you have a handful of
            components, those names start to collide. CSS Modules solve this by
            scoping styles to the component that imports them.
          </p>
          <p>
            Give the stylesheet a <code>.module.css</code> extension and write
            ordinary CSS inside it. The <code>.module.css</code> suffix is what
            turns on scoping.
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
            Import the stylesheet as an object and access each class as a
            property. During the build step, every class is renamed to something
            unique, so the styles can’t leak into other components.
          </p>
          <CodeBlock
            code={`import styles from "./index.module.css"

function Button({ children }) {
  return <button className={styles.button}>{children}</button>
}`}
            lang="jsx"
          />
          <p>
            Since the styles belong to a single component, it makes sense to
            keep them next to it. A common layout gives each component its own
            folder, holding its markup and stylesheet together:
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
            With this layout, you import a component by pointing at its folder (
            <code>{'import Button from "./components/Button"'}</code>), and the{" "}
            <code>index.jsx</code> inside is picked up automatically.
          </p>

          <H2>Event handlers</H2>
          <p>
            Components respond to input through event handlers like{" "}
            <code>onClick</code>, <code>onChange</code>, and{" "}
            <code>onSubmit</code>. Pass a reference to your function rather than
            calling it:
          </p>
          <CodeBlock
            code={`<button onClick={handleClick}>Save</button>   // ✅ reference
<button onClick={handleClick()}>Save</button> // ❌ runs on render`}
            lang="jsx"
          />
          <p>To pass an argument, wrap the call in an inline arrow function:</p>
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
            It’s a big part of what makes React powerful: you can build complex
            interfaces from small, self-contained pieces, each responsible for
            its own data.
          </p>

          <H3>useState</H3>
          <p>
            A component is a function, and it runs again on every render. That
            means a regular variable won’t work: it gets recreated and reset
            each time. To keep a value between renders, React provides the{" "}
            <code>useState</code> hook, which by convention is destructured as{" "}
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
          <Block>
            <CounterDemo />
          </Block>
          <p>
            In the example above, <code>useState(0)</code> sets the starting
            value and returns two things: the current value (<code>count</code>)
            and a function to change it (<code>setCount</code>). Always update
            the value through the setter (<code>setCount</code>) rather than
            reassigning <code>count</code> yourself.
          </p>

          <H3>State is local</H3>
          <p>
            State belongs to the component that declares it. Each{" "}
            <code>{"<Counter />"}</code> on the page keeps its own independent
            count, so updating one doesn’t touch the others.
          </p>
          <CodeBlock
            code={`<Counter />   {/* has its own count */}
<Counter />   {/* completely separate count */}`}
            lang="jsx"
          />

          <H3>Don’t mutate state directly</H3>
          <p>
            State often holds an array or an object rather than a single value.
            Say you’re keeping a list:
          </p>
          <CodeBlock
            code={`const [items, setItems] = useState([])`}
            lang="jsx"
          />
          <p>
            To add an item, it’s tempting to push onto the array. But that
            mutates it, changing the existing array in place, and React won’t
            notice:
          </p>
          <CodeBlock
            code={`// wrong — mutates the existing array
items.push(newItem)
setItems(items)`}
            lang="jsx"
          />
          <p>
            React decides whether to re-render by checking whether the value is
            different from before. <code>push</code> keeps the same array, so
            React assumes nothing changed and skips the update. Instead, build a
            new array with the old items plus the new one:
          </p>
          <CodeBlock
            code={`// right — creates a new array
setItems([...items, newItem])`}
            lang="jsx"
          />
          <p>
            The <code>...</code> spreads the existing items into a fresh array,
            so React sees a new value and re-renders. The same rule applies to
            objects: create a new one with{" "}
            <code>{`{ ...old, key: value }`}</code> rather than editing the old
            one.
          </p>

          <H3>Lifting state up</H3>
          <p>
            When two sibling components need the same data, neither can own it:
            siblings can’t see each other’s state. Move the state up to their
            closest shared parent, then pass it down to both as props.
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
            parent passed down. This is props flow in action: data flows down,
            and a child changes the parent’s state only through a function,
            never by editing a prop directly.
          </p>
          <Block>
            <LiftStateDemo />
          </Block>

          <H2>Hooks</H2>
          <p>
            You’ve already used one hook: <code>useState</code>. Hooks are
            functions that let a component tap into React features, and they all
            start with <code>use</code>. Two more will be especially useful in
            next week’s Three.js work: <code>useEffect</code>, for running code
            around a render, and <code>useRef</code>, for holding onto a DOM
            node.
          </p>

          <H3>Rules of hooks</H3>
          <p>
            Hooks follow two rules, and React’s tooling will warn you if you
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
            Some work doesn’t belong in the middle of rendering: starting a
            timer, fetching data, subscribing to an event, drawing to a canvas.
            These are called side effects: anything that reaches outside the
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
          <Block>
            <EffectDemo />
          </Block>
          <p>
            An effect has two parts. The function you pass is the effect itself,
            and the second argument is the dependency array, which tells React
            when to re-run it:
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
            above, it needs to clean up after itself. Return a function from the
            effect, and React will run it before the next effect and when the
            component is removed. Without it, the interval keeps firing even
            after the component is gone.
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
            <code>useRef</code> gives you a handle to a real DOM node, an escape
            hatch for when you need to work with the DOM directly. Pass a ref to
            an element’s <code>ref</code> attribute, and once the element is on
            the page, React points <code>.current</code> at the actual node.
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
            A ref can also hold a value between renders without triggering a
            re-render, but accessing the DOM is its most common use.
          </p>

          <hr />

          <H2>Exercise</H2>
          <p>
            In this exercise, you’ll build an emoji chatbot, a chat app where
            every reply comes back as emojis. The starter code provides the
            skeleton: a message list, an input composer, and a{" "}
            <code>handleSend</code> function in <code>App.js</code>. Your job is
            to wire these pieces together into a working chat.
          </p>
          <p>
            You won’t need to write the reply logic yourself, since it lives in{" "}
            <code>emoji-api.js</code>. It exposes a single function,{" "}
            <code>sendMessage(prompt)</code>, which simulates an API call: pass
            it some text and, after a brief delay, it resolves with a random
            emoji string. Since <code>handleSend</code> already imports and{" "}
            <code>await</code>s it, you can focus entirely on the React side.
          </p>
          <CodeBlock
            code={`import { sendMessage } from "./emoji-api"

const reply = await sendMessage("hello")
// → something like "🚀✨🦄🎉"`}
            lang="jsx"
          />
          <p>Here’s a suggested roadmap:</p>
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
            If you’d like to go further, try showing a “typing…” indicator while
            waiting for the reply, or auto-scrolling to the latest message with
            a <code>ref</code> and <code>useEffect</code>.
          </p>
        </Article>

        <Block type="exercise">
          <Exercise />
        </Block>

        <Article>
          <hr />

          <H2>Assignment</H2>
          <ul>
            <li>
              Read the <Link href="https://react.dev/learn">quick start</Link>{" "}
              in the React documentation.
            </li>
            <li>
              Keep developing your project. Next week, you’ll migrate it to a
              React app.
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
