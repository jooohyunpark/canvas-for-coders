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
  "/App.js": `import "./styles.css"
import { Composer } from "./components/Composer"
import { Bubble } from "./components/Bubble"

/*
  Your job: make this chatbot reply in emojis.

  Replies come from sendMessage() in emoji-api.js — give it a prompt,
  await the result:

    import { sendMessage } from "./emoji-api"
    const reply = await sendMessage(prompt)
*/

export default function App() {
  return (
    <div className="app">
      <div className="messages">
        <Bubble type="user">hello</Bubble>
        <Bubble type="agent">👋</Bubble>
      </div>
      <Composer />
    </div>
  )
}
`,
  "/components/Composer/index.js": `import { useEffect, useRef, useState } from "react"
import { ArrowUp } from "lucide-react"
import styles from "./styles.module.css"

export function Composer({ onSend }) {
  const [value, setValue] = useState("")
  const textareaRef = useRef(null)

  // Reset the height, then grow it to fit the content.
  const resize = () => {
    const el = textareaRef.current
    el.style.height = "auto"
    el.style.height = el.scrollHeight + "px"
  }

  // Re-fit whenever the text changes.
  useEffect(() => resize(), [value])

  const submit = () => {
    if (!value.trim()) return
    onSend?.(value)
    setValue("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form
      className={styles.composer}
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
    >
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder="What's on your mind?"
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} type="submit" aria-label="Send">
        <ArrowUp size={16} />
      </button>
    </form>
  )
}
`,
  "/components/Composer/styles.module.css": `.composer {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 24px;
  padding: 8px 12px;
}

.composer:focus-within {
  border-color: #888;
}

.textarea {
  display: block;
  width: 100%;
  max-height: 160px;
  padding: 4px 40px 4px 4px;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.5;
  border: none;
  outline: none;
  resize: none;
  overflow-y: auto;
  background: transparent;
}

.button {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: black;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.button:hover {
  background: #333;
}
`,
  "/components/Bubble/index.js": `import styles from "./styles.module.css"

export function Bubble({ type = "agent", children }) {
  return <div className={\`\${styles.bubble} \${styles[type]}\`}>{children}</div>
}
`,
  "/components/Bubble/styles.module.css": `.bubble {
  max-width: 75%;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 16px;
}

.user {
  margin-left: auto;
  background: #007aff;
  color: white;
}

.agent {
  margin-right: auto;
  background: #e5e5ea;
  color: black;
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
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 40px;
  padding: 24px;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
`,
  "/emoji-api.js": `const EMOJIS = [
  "😀", "😂", "🥳", "😎", "🤖", "👾", "🎉", "🔥", "✨", "🌈",
  "🍕", "🍩", "🚀", "🌟", "💡", "🐙", "🦄", "🌮", "🪐", "💬",
  "😅", "😍", "🤩", "😜", "🤯", "😴", "🤔", "🙌", "👏", "💪",
  "👀", "🧠", "❤️", "💥", "⭐", "👋", "🌊", "🍔", "🍟", "🍦",
  "🍪", "🎸", "🎮", "🏆", "🎯", "🐱", "🐶", "🦊", "🐢", "🌸",
]

// Returns a promise, just like a real network request would.
// Use it with await, or .then().
export function sendMessage(prompt) {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
  const delay = 300 + Math.random() * 700 // 300–1000ms
  return new Promise((resolve) => {
    setTimeout(() => resolve(emoji), delay)
  })
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
        customSetup={{ dependencies: { "lucide-react": "^1.14.0" } }}
        options={{ activeFile: "/App.js" }}
      >
        <SandpackPersistence
          storageKey={STORAGE_KEY}
          defaultFiles={defaultFiles}
        />
        <SandpackLayout className="rounded-lg!">
          <SandpackCodeEditor style={{ height: 700 }} />
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
