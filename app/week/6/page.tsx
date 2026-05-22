import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { Article } from "@/components/site/article"
import { H1 } from "@/components/site/heading"

export const metadata: Metadata = {
  title: "W6: Interaction",
}

export default function Week6Page() {
  return (
    <Section>
      <Content>
        <Article>
          <H1>Week 6: Interaction</H1>
          <p>Coming soon.</p>
        </Article>
      </Content>
    </Section>
  )
}
