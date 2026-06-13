"use client"

import { useEffect } from "react"
import { useSandpack, type SandpackFiles } from "@codesandbox/sandpack-react"

// Sandpack prefixes paths with "/" internally; strip it to match defaultFiles keys
const normalize = (path: string) => path.replace(/^\//, "")

export function loadSandpackFiles(
  storageKey: string,
  defaultFiles: SandpackFiles
): SandpackFiles {
  if (typeof window === "undefined") return defaultFiles
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return defaultFiles
    const codes = JSON.parse(saved) as Record<string, string>
    return Object.fromEntries(
      Object.entries(defaultFiles).map(([path, file]) => {
        const savedCode = codes[path]
        if (!savedCode) return [path, file]
        if (typeof file === "string") return [path, savedCode]
        return [path, { ...file, code: savedCode }]
      })
    )
  } catch {
    return defaultFiles
  }
}

export function SandpackPersistence({
  storageKey,
  defaultFiles,
}: {
  storageKey: string
  defaultFiles: SandpackFiles
}) {
  const { sandpack } = useSandpack()

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const defaultPaths = new Set(Object.keys(defaultFiles))
        const codes: Record<string, string> = {}
        for (const [path, file] of Object.entries(sandpack.files)) {
          const key = normalize(path)
          if (defaultPaths.has(key)) codes[key] = file.code
        }
        localStorage.setItem(storageKey, JSON.stringify(codes))
      } catch {}
    }, 500)
    return () => clearTimeout(timer)
  }, [sandpack.files, storageKey, defaultFiles])

  return null
}
