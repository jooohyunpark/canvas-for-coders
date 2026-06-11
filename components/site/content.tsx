import { cn } from "@/lib/utils"

const sizeMap = {
  md: "max-w-4xl",
  lg: "max-w-8xl",
} as const

type ContentSize = keyof typeof sizeMap

export function Content({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & { size?: ContentSize }) {
  return (
    <div
      data-slot="content"
      className={cn("g mx-auto px-6", sizeMap[size], className)}
      {...props}
    />
  )
}
