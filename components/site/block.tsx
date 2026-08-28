import { cn } from "@/lib/utils"

interface BlockProps {
  type?: "demo" | "exercise"
}

export function Block({
  className,
  type = "demo",
  ...props
}: React.ComponentProps<"div"> & BlockProps) {
  return (
    <div
      data-slot="block"
      className={cn(
        "my-6",
        type === "exercise" && "my-12",
        type === "demo" && "my-6",
        className
      )}
      {...props}
    />
  )
}
