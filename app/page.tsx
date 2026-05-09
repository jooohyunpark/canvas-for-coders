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
            <p></p>
            <p>
              Bring your curiosity, your questions, and whatever you’ve been
              wanting to make. I’m looking forward to building with you.
            </p>
            <p>:)</p>
            <p>Joohyun</p>
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
                  Thursdays, Oct 23 &ndash; Dec 11, 2026, 6:00&ndash;8:30pm
                </div>
                <div>370 Jay Street, Room 409, Brooklyn Campus</div>
              </dd>

              <dt>Office hours</dt>
              <dd>After class, same room</dd>
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
                <Link href="https://threejs.org/">Three.js</Link> &mdash;
                JavaScript 3D library
              </li>
              <li>
                <Link href="https://react.dev/">React</Link> &mdash; JavaScript
                library for building user interfaces
              </li>
              <li>
                <Link href="https://r3f.docs.pmnd.rs/">React Three Fiber</Link>{" "}
                &mdash; React renderer for Three.js
              </li>
              <li>
                <Link href="https://github.com/pmndrs/drei">Drei</Link> &mdash;
                helpers and abstractions for React Three Fiber
              </li>
              <li>
                <Link href="https://www.react-spring.dev/">React Spring</Link>{" "}
                &mdash; spring-based animation for React
              </li>
              <li>
                <Link href="https://github.com/pmndrs/react-three-rapier">
                  React Three Rapier
                </Link>{" "}
                &mdash; physics engine for React Three Fiber
              </li>
              <li>
                <Link href="https://gsap.com/">GSAP</Link> &mdash;
                timeline-based animation library
              </li>
              <li>
                <Link href="https://vitejs.dev/">Vite</Link> &mdash; build tool
                and dev server
              </li>
              <li>
                <Link href="https://vercel.com/">Vercel</Link> &mdash;
                deployment platform
              </li>
              <li>
                <Link href="https://github.com/">GitHub</Link> &mdash; code
                repository
              </li>
            </ul>
          </Article>
        </Content>
      </Section>
    </div>
  )
}
