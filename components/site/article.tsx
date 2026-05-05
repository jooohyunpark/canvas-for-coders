import { cn } from "@/lib/utils"

export function Article({
  className,
  ...props
}: React.ComponentProps<"article">) {
  return (
    <article
      data-slot="article"
      className={cn(
        "prose max-w-none prose-neutral dark:prose-invert",
        "prose-headings:font-medium prose-headings:tracking-tight",
        "prose-hr:border-border",
        "marker:text-foreground",
        "prose-code:rounded-lg prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        className
      )}
      {...props}
    />
  )
}
