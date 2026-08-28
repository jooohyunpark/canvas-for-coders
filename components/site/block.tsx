import { cn } from "@/lib/utils"

export function Block({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="block" className={cn("my-6", className)} {...props} />
}
