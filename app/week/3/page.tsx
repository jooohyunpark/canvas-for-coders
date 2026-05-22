import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "W3: Motion / Assets",
}

export default function Week3Page() {
  return (
    <Section>
      <Content>
        <Article>
          <H1>Week 3: Motion / Assets</H1>
          <p>Coming soon.</p>
        </Article>
      </Content>
    </Section>
  )
}
