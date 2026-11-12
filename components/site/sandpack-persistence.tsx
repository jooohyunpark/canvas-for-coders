"use client"

import { useEffect } from "react"
import { useSandpack, type SandpackFiles } from "@codesandbox/sandpack-react"

// Sandpack prefixes every path with "/" internally, but a defaultFiles map may
// be written either way. Normalize both sides so they always meet — otherwise
// saving and loading disagree and no edit survives a reload.
const normalize = (path: string) => (path.startsWith("/") ? path : `/${path}`)

// Students can't edit hidden or read-only files, so a saved copy of one can
// only ever be stale. Skipping them lets starter-code fixes to those files
// reach everyone, not just people who never opened the exercise.
const isLocked = (file: SandpackFiles[string]) =>
  typeof file !== "string" && (file.hidden === true || file.readOnly === true)

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
        // `codes[path]` is the fallback: Weeks 2 and 3 saved their entries
        // unprefixed under the old scheme, and dropping them would throw away
        // work already sitting in someone's browser.
        const savedCode = codes[normalize(path)] ?? codes[path]
        if (!savedCode || isLocked(file)) return [path, file]
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
        const defaultPaths = new Set(
          Object.entries(defaultFiles)
            .filter(([, file]) => !isLocked(file))
            .map(([path]) => normalize(path))
        )
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
