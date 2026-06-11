"use client"

import { useEffect } from "react"
import sdk from "@stackblitz/sdk"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type StackBlitzEmbedProps = {
  projectId: string
  openFile?: string
  height?: number
  className?: string
}

export function StackBlitzEmbed({
  projectId,
  openFile = "src/main.js",
  height = 600,
  className,
}: StackBlitzEmbedProps) {
  const containerId = `stackblitz-${projectId}`
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const container = document.getElementById(containerId)
    if (container) container.innerHTML = ""
    sdk.embedProjectId(containerId, projectId, {
      forceEmbedLayout: true,
      openFile,
      theme: resolvedTheme === "dark" ? "dark" : "light",
      hideNavigation: true,
      hideDevTools: true,
      height,
    })
  }, [projectId, openFile, containerId, height, resolvedTheme])

  return (
    <div
      id={containerId}
      className={cn("overflow-hidden rounded-lg", className)}
      style={{ height }}
    />
  )
}
