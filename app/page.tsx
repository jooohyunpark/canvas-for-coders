import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { Link } from "@/components/site/link"

export default function Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <h1>Welcome to Canvas for Coders!</h1>
            <p>
              I’ve always thought of the browser as a creative medium. It runs
              everywhere. It can generate visuals and sound through code.
              Anything you make can reach anyone with a link. And best of all,
              it’s interactive. As I like to say:
            </p>
            <blockquote>
              The web browser is a twenty-first century canvas.
            </blockquote>
            <p>
              In this course, we’ll explore creative expression on the web
              through Three.js: thinking in three dimensions, prototyping
              concepts, and shaping ideas into interactive experiences.
            </p>
            <p>
              Bring your curiosity, your questions, and whatever you’ve been
              wanting to make. I’m looking forward to building with you.
            </p>
            <p>— Joohyun</p>
          </Article>
        </Content>
      </Section>

      <Section>
        <Content>
          <Article>
            <h2>Info</h2>
            <dl className="not-prose grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2">
              <dt>Instructor</dt>
              <dd>
                <Link href="mailto:jhp527@nyu.edu" className="underline">
                  Joohyun Park
                </Link>
              </dd>

              <dt>Class</dt>
              <dd>
                <div>
                  Thursdays, Oct 22 &ndash; Dec 10, 2026, 6:00&ndash;8:30pm
                </div>
                <div>370 Jay Street, Room 409, Brooklyn Campus</div>
              </dd>

              <dt>Office hours</dt>
              <dd>After class, same room</dd>

              <dt>Zoom link</dt>
              <dd>
                <Link
                  href="https://nyu.zoom.us/my/joohyunpark"
                  className="underline"
                >
                  Join
                </Link>{" "}
                (Pre-approved only)
              </dd>
            </dl>

            <h2>Prerequisites</h2>
            <p>Please complete the following before the first class:</p>
            <ul>
              <li>
                Code editor:{" "}
                <Link href="https://code.visualstudio.com/">
                  Visual Studio Code
                </Link>{" "}
                or <Link href="https://www.cursor.com/">Cursor</Link>
              </li>
              <li>
                <Link href="https://nodejs.org/">Node.js</Link>
              </li>
              <li>
                <Link href="https://www.npmjs.com/">npm</Link> (included with
                Node.js)
              </li>
              <li>
                <Link href="https://git-scm.com/">Git</Link>
              </li>
              <li>
                <Link href="https://github.com/">GitHub</Link> account
              </li>
            </ul>

            <h2>Tools</h2>
            <ul>
              <li>
                <Link href="https://threejs.org/">Three.js</Link> — JavaScript
                3D library
              </li>
              <li>
                <Link href="https://react.dev/">React</Link> — JavaScript
                library for building user interfaces
              </li>
              <li>
                <Link href="https://r3f.docs.pmnd.rs/">React Three Fiber</Link>{" "}
                — React renderer for Three.js
              </li>
              <li>
                <Link href="https://github.com/pmndrs/drei">Drei</Link> —
                helpers and abstractions for React Three Fiber
              </li>
              <li>
                <Link href="https://www.react-spring.dev/">React Spring</Link> —
                spring-based animation for React
              </li>
              <li>
                <Link href="https://github.com/pmndrs/react-three-rapier">
                  React Three Rapier
                </Link>{" "}
                — physics engine for React Three Fiber
              </li>
              <li>
                <Link href="https://gsap.com/">GSAP</Link> — timeline-based
                animation library
              </li>
              <li>
                <Link href="https://vitejs.dev/">Vite</Link> — build tool and
                dev server
              </li>
              <li>
                <Link href="https://vercel.com/">Vercel</Link> — deployment
                platform
              </li>
              <li>
                <Link href="https://github.com/">GitHub</Link> — code repository
              </li>
            </ul>

            <h2>Weekly topics</h2>

            <h3>
              <Link href="/week/1">Week 1: Intro</Link>
            </h3>
            <ul>
              <li>Thinking in xyz</li>
              <li>Useful references</li>
              <li>Setting up a class project</li>
              <li>Three.js basic concepts</li>
            </ul>

            <h3>
              <Link href="/week/2">Week 2: Scene</Link>
            </h3>
            <ul>
              <li>First scene</li>
              <li>Around the scene</li>
              <li>Geometries</li>
              <li>Materials</li>
              <li>Mesh</li>
              <li>Lights</li>
              <li>Textures</li>
            </ul>

            <h3>
              <Link href="/week/3">Week 3: Motion / Assets</Link>
            </h3>
            <ul>
              <li>Animation loop</li>
              <li>GSAP</li>
              <li>Models</li>
              <li>Environment map</li>
              <li>Spatial audio</li>
            </ul>

            <h3>
              <Link href="/week/4">Week 4: React</Link>
            </h3>
            <ul>
              <li>Concept</li>
              <li>Setting up</li>
              <li>JSX</li>
              <li>Components &amp; props</li>
              <li>Event handlers</li>
              <li>State</li>
              <li>Hooks</li>
            </ul>

            <h3>
              <Link href="/week/5">Week 5: Components in Space</Link>
            </h3>
            <ul>
              <li>Concept</li>
              <li>Setting up</li>
              <li>Your first scene</li>
              <li>Reusable components</li>
              <li>State &amp; interaction</li>
              <li>Animating with react-spring</li>
              <li>drei: helpers</li>
            </ul>

            <h3>
              <Link href="/week/6">Week 6: Interaction</Link>
            </h3>
            <ul>
              <li>Text</li>
              <li>HTML in the scene</li>
              <li>Scroll-driven scenes</li>
              <li>Physics</li>
              <li>Wrapping up</li>
            </ul>

            <h3>Week 7: Final</h3>
            <ul>
              <li>Presentation</li>
            </ul>
          </Article>
        </Content>
      </Section>
    </div>
  )
}
