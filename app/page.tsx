import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import Link from "next/link"

export default function Page() {
  return (
    <div>
      <Section>
        <Content>
          <Article>
            <h1>Welcome to Canvas for Coders!</h1>
            <p>
              I’ve always thought of the browser as a creative medium. It runs
              everywhere, it can do visuals and sound, anything you make can
              reach anyone with a link, and best of all — it’s interactive. As I
              like to say:
            </p>
            <blockquote>
              The web browser is a twenty-first century canvas.
            </blockquote>
            <p>
              For the next seven weeks, we’ll explore Three.js and React Three
              Fiberas tools for your creative practice on the web. Each class is
              split in two: we’ll cover the week’s topic in the first half, then
              put it into practice with a hands-on exercise in the second.
            </p>
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
                  Thursdays, Oct 23 &ndash; Dec 11, 2025, 6:00&ndash;8:30pm
                </div>
                <div>370 Jay Street, Room 409, Brooklyn Campus</div>
              </dd>

              <dt>Office hours</dt>
              <dd>After class, same room</dd>
            </dl>
          </Article>
        </Content>
      </Section>
    </div>
  )
}
