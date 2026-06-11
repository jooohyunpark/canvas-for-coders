import { cn } from "@/lib/utils"

const sizeMap = {
  md: "max-w-3xl",
  lg: "max-w-7xl",
} as const

type ContentSize = keyof typeof sizeMap

export function Content({
  className,
  size = "lg",
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
