import { isValidElement, type ReactNode } from "react"
import { cn } from "@/lib/utils"

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children)
  }
  return ""
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

type Level = 1 | 2 | 3 | 4 | 5 | 6
type HeadingProps = React.ComponentProps<"h2"> & { level: Level }

function Heading({ level, className, children, id, ...props }: HeadingProps) {
  const Tag = `h${level}` as const
  const slug = id ?? slugify(extractText(children))
  return (
    <Tag id={slug} className={cn("scroll-mt-8", className)} {...props}>
      <a href={`#${slug}`} className="no-underline">
        {children}
      </a>
    </Tag>
  )
}

export const H1 = (props: React.ComponentProps<"h1">) => (
  <Heading {...props} level={1} />
)
export const H2 = (props: React.ComponentProps<"h2">) => (
  <Heading {...props} level={2} />
)
export const H3 = (props: React.ComponentProps<"h3">) => (
  <Heading {...props} level={3} />
)
export const H4 = (props: React.ComponentProps<"h4">) => (
  <Heading {...props} level={4} />
)
export const H5 = (props: React.ComponentProps<"h5">) => (
  <Heading {...props} level={5} />
)
export const H6 = (props: React.ComponentProps<"h6">) => (
  <Heading {...props} level={6} />
)
