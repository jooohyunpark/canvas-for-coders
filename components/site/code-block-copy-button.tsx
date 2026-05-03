"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CodeBlockCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard unavailable; fail silently.
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="touch-hitbox bg-card text-muted-foreground hover:text-foreground"
      >
        <span className="grid">
          <Copy
            className={cn(
              "col-start-1 row-start-1 scale-100 blur-none transition-[opacity,scale,filter] duration-150 ease-out",
              copied && "scale-90 opacity-0 blur-[2px]"
            )}
          />
          <Check
            className={cn(
              "col-start-1 row-start-1 scale-100 blur-none transition-[opacity,scale,filter] duration-150 ease-out",
              !copied && "scale-90 opacity-0 blur-[2px]"
            )}
          />
        </span>
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </>
  )
}
