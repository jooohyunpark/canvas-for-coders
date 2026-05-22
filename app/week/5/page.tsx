import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "W5: Components in Space",
}

export default function Week5Page() {
  return (
    <Section>
      <Content>
        <Article>
          <H1>Week 5: Components in Space</H1>
          <p>Coming soon.</p>
        </Article>
      </Content>
    </Section>
  )
}
