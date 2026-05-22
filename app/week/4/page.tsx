import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "W4: React",
}

export default function Week4Page() {
  return (
    <Section>
      <Content>
        <Article>
          <H1>Week 4: React</H1>
          <p>Coming soon.</p>
        </Article>
      </Content>
    </Section>
  )
}
