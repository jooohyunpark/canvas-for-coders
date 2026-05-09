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

            <h2>Tools</h2>
            <ul>
              <li>
                <Link href="https://vitejs.dev/">Vite</Link> &mdash; a fast
                build tool and dev server for modern web projects
              </li>
              <li>
                <Link href="https://vercel.com/">Vercel</Link> &mdash; a
                platform for deploying and hosting web projects
              </li>
              <li>
                <Link href="https://threejs.org/">Three.js</Link> &mdash; the
                foundational library for 3D graphics in the browser
              </li>
              <li>
                <Link href="https://github.com/pmndrs/react-three-fiber">
                  React Three Fiber
                </Link>{" "}
                &mdash; a React renderer for Three.js
              </li>
              <li>
                <Link href="https://github.com/pmndrs/drei">Drei</Link> &mdash;
                helpers and abstractions for React Three Fiber
              </li>
              <li>
                <Link href="https://gsap.com/">GSAP</Link> &mdash; a
                timeline-based animation library
              </li>
              <li>
                <Link href="https://www.react-spring.dev/">React Spring</Link>{" "}
                &mdash; physics-based animation for React
              </li>
              <li>
                <Link href="https://github.com/pmndrs/react-three-rapier">
                  React Three Rapier
                </Link>{" "}
                &mdash; a physics engine for realistic motion and collisions
              </li>
            </ul>
          </Article>
        </Content>
      </Section>
    </div>
  )
}
