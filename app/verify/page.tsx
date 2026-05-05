import type { Metadata } from "next"
import { Section } from "@/components/site/section"
import { Content } from "@/components/site/content"
import { safePath } from "@/lib/auth"
import { PasswordForm } from "./PasswordForm"

export const metadata: Metadata = {
  title: "Verify",
  robots: { index: false, follow: false },
}

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>
}) {
  const { from } = await searchParams
  const redirectTo = safePath(from)

  return (
    <Section>
      <Content>
        <PasswordForm redirectTo={redirectTo} />
      </Content>
    </Section>
  )
}
