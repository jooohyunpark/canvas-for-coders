import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1, H2, H3 } from "@/components/site/heading"
import { CodeBlock } from "@/components/site/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        </Article>
      </Content>
    </Section>
  )
}
