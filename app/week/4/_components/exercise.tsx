"use client"

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react"
import { useSyncExternalStore, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  loadSandpackFiles,
  SandpackPersistence,
} from "@/components/site/sandpack-persistence"

const noopSubscribe = () => () => {}
const STORAGE_KEY = "cfc-week4-exercise"

const defaultFiles = {
  "/emoji-api.js": `// A pretend chatbot. Give it a prompt, get emojis back.
// There's no real model here — it just picks a few at random.

const EMOJIS = [
  "😀", "😂", "🥳", "😎", "🤖", "👾", "🎉", "🔥", "✨", "🌈",
  "🍕", "🍩", "🚀", "🌟", "💡", "🐙", "🦄", "🌮", "🪐", "💬",
]

function randomEmojis(count) {
  let reply = ""
  for (let i = 0; i < count; i++) {
    reply += EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
  }
  return reply
}

// Returns a promise, just like a real network request would.
// Use it with await, or .then().
export function sendMessage(prompt) {
  const count = 3 + Math.floor(Math.random() * 4) // 3–6 emojis
  return new Promise((resolve) => {
    setTimeout(() => resolve(randomEmojis(count)), 600)
  })
}
`,
  "/App.js": `import "./styles.css"

// The chatbot lives here. Right now it's just an input.
// Your job: make it talk back in emojis.
//
// The reply comes from sendMessage() in emoji-api.js:
//   import { sendMessage } from "./emoji-api"
//   const reply = await sendMessage(prompt)

export default function App() {
  return (
    <div className="app">
      <input className="prompt" placeholder="What's on your mind?" />
    </div>
  )
}
`,
  "/styles.css": `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.prompt {
  width: 320px;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 999px;
  outline: none;
}

.prompt:focus {
  border-color: #888;
}
`,
}

export function Exercise({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )

  const { resolvedTheme } = useTheme()
  const [resetKey, setResetKey] = useState(0)

  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {}
    setResetKey((k) => k + 1)
  }

  if (!mounted) {
    return (
      <div
        className={cn("w-full rounded-lg bg-muted", className)}
        style={{ height: 700 }}
      />
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-end">
        <Button variant="outline" size="xs" onClick={handleReset}>
          Reset
        </Button>
      </div>
      <SandpackProvider
        key={resetKey}
        template="react"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        files={loadSandpackFiles(STORAGE_KEY, defaultFiles)}
      >
        <SandpackPersistence
          storageKey={STORAGE_KEY}
          defaultFiles={defaultFiles}
        />
        <SandpackLayout className="rounded-lg!">
          <SandpackCodeEditor showLineNumbers style={{ height: 700 }} />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            style={{ height: 700 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
