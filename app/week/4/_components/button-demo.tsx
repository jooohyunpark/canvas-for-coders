import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ButtonDemo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-4 rounded-lg border border-border bg-muted/30 p-6",
        className
      )}
    >
      <Button>Submit</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="ghost">Learn more</Button>
      <Button variant="destructive">Delete</Button>
    </div>
  )
}
