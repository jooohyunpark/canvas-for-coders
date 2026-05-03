import { codeToHtml } from "shiki"
import { CodeBlockCopyButton } from "@/components/site/code-block-copy-button"

export async function CodeBlock({
  code,
  lang = "tsx",
}: {
  code: string
  lang?: string
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  })

  return (
    <div className="relative">
      <div className="absolute top-4 right-2 hidden h-lh items-center text-sm leading-relaxed md:inline-flex">
        <CodeBlockCopyButton text={code} />
      </div>
      <div
        className="rounded border bg-card p-4 text-sm leading-relaxed md:pr-12 [&_code]:bg-transparent! [&_code]:p-0 [&_code]:font-mono [&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:bg-transparent! [&_pre]:p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
