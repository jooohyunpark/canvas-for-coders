import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ButtonDemo } from "./_components/button-demo"

export const metadata: Metadata = {
  title: "W4: React",
}

const CREATE_COMMANDS = [
  { name: "npm", command: "npm create vite@latest" },
  { name: "pnpm", command: "pnpm create vite" },
  { name: "yarn", command: "yarn create vite" },
  { name: "bun", command: "bun create vite" },
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
            you write naturally tends to be imperative: step-by-step
            instructions that tell the browser exactly what to do. You can see
            this in every Three.js project so far.
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
            data. React figures out what changed and updates just that.
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
            In React, <code>&lt;p&gt;</code> will update automatically based on
            count — React handles the state for you.
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
            You&apos;ve already felt this contrast in Three.js. Your animation
            loop is imperative: every frame, you move objects and call{" "}
            <code>renderer.render()</code> yourself. React does the opposite:
            you declare the result, and it handles the rest.
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
          <p>A few rules follow when using JSX.</p>

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
            Component names must be written in PascalCase. React uses the casing
            to tell your components apart from built-in HTML tags:{" "}
            <code>&lt;button&gt;</code> is a DOM element,{" "}
            <code>&lt;Greeting /&gt;</code> is your component.
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
            The same component now covers four looks, based on the prop you
            pass:
          </p>
          <CodeBlock
            code={`<div>
  <Button>Submit</Button>
  <Button variant="outline">Cancel</Button>
  <Button variant="ghost">Learn more</Button>
  <Button variant="destructive">Delete</Button>
</div>`}
            lang="jsx"
          />
          <ButtonDemo className="mt-4" />
        </Article>
      </Content>
    </Section>
  )
}
