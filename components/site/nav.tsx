"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { FocusTrap } from "focus-trap-react"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"
import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Content } from "@/components/site/content"
import { ThemeToggle } from "@/components/site/theme-toggle"

const navLinks = [
  { href: "/week/1", label: "W1: Intro" },
  { href: "/week/2", label: "W2: Scene" },
  { href: "/week/3", label: "W3: Motion / Assets" },
  { href: "/week/4", label: "W4: React" },
  { href: "/week/5", label: "W5: Components in Space" },
  { href: "/week/6", label: "W6: Interaction" },
] as const

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(({ href, label }) => {
        return (
          <Button
            key={href}
            variant="ghost"
            render={<Link href={href} onClick={onNavigate} />}
            nativeButton={false}
            className={cn("w-full justify-start")}
          >
            {label}
          </Button>
        )
      })}
    </nav>
  )
}

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    close()
  }, [pathname, close])

  useLockBodyScroll(isOpen)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 z-10 hidden h-svh w-64 flex-col border-r lg:flex">
        <div className="flex shrink-0 items-center border-b px-4 py-4">
          <Link href="/" className="flex flex-col px-2 tracking-tight">
            <span className="text-sm font-medium xl:text-base">
              Canvas for Coders
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              Fall 2026
            </span>
          </Link>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <NavLinks />

          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar + drawer */}
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          allowOutsideClick: true,
          escapeDeactivates: true,
          onDeactivate: close,
          returnFocusOnDeactivate: true,
          setReturnFocus: () => toggleRef.current as HTMLElement,
          initialFocus: false,
        }}
      >
        <div
          className="sticky top-0 z-50 lg:hidden"
          style={{ "--header-height": "3rem" } as React.CSSProperties}
        >
          <header
            className={cn(
              "border-b bg-background/90 backdrop-blur-lg transition-colors duration-150",
              isOpen && "bg-background"
            )}
          >
            <Content>
              <div className="flex h-(--header-height) items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium tracking-tight text-balance"
                  onClick={close}
                >
                  Canvas for Coders | Fall 2026
                </Link>
                <MobileToggle
                  ref={toggleRef}
                  isOpen={isOpen}
                  onToggle={() => setIsOpen((v) => !v)}
                />
              </div>
            </Content>
          </header>

          <AnimatePresence>
            {isOpen && (
              <motion.nav
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-x-0 top-[calc(var(--header-height)+1px)] z-50 h-[calc(100dvh-var(--header-height)-1px)] bg-background"
              >
                <div className="flex h-full flex-col gap-6 overflow-y-auto overscroll-contain px-6 py-6">
                  <NavLinks onNavigate={close} />
                  <div className="mt-auto">
                    <ThemeToggle />
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </FocusTrap>
    </>
  )
}

const ICON_TRANSITION =
  "absolute inset-0 m-auto size-5 transition-all duration-150 ease-out"
const ICON_VISIBLE = "scale-100 opacity-100 blur-none"

function MobileToggle({
  ref,
  isOpen,
  onToggle,
}: {
  ref: React.Ref<HTMLButtonElement>
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-nav"
      className="relative"
      onClick={onToggle}
    >
      <MenuIcon
        aria-hidden
        className={cn(
          ICON_TRANSITION,
          isOpen ? "scale-90 opacity-0 blur-xs" : ICON_VISIBLE
        )}
      />
      <XIcon
        aria-hidden
        className={cn(
          ICON_TRANSITION,
          isOpen ? ICON_VISIBLE : "scale-90 opacity-0 blur-xs"
        )}
      />
    </Button>
  )
}
