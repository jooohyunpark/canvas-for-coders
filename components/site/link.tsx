import NextLink from "next/link"
import type { ComponentProps } from "react"

type LinkProps = ComponentProps<typeof NextLink>

function isExternal(href: LinkProps["href"]) {
  return typeof href === "string" && /^(https?:)?\/\//.test(href)
}

export function Link({ href, target, rel, ...props }: LinkProps) {
  const external = isExternal(href)
  return (
    <NextLink
      href={href}
      target={target ?? (external ? "_blank" : undefined)}
      rel={rel ?? (external ? "noreferrer" : undefined)}
      {...props}
    />
  )
}
