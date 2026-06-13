"use client"

import { useEffect } from "react"
import { useSandpack, type SandpackFiles } from "@codesandbox/sandpack-react"

export function loadSandpackFiles(
  storageKey: string,
  defaultFiles: SandpackFiles
): SandpackFiles {
  if (typeof window === "undefined") return defaultFiles
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : defaultFiles
  } catch {
    return defaultFiles
  }
}

export function SandpackPersistence({ storageKey }: { storageKey: string }) {
  const { sandpack } = useSandpack()

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(sandpack.files))
      } catch {}
    }, 500)
    return () => clearTimeout(timer)
  }, [sandpack.files, storageKey])

  return null
}
