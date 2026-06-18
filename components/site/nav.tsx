"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { FocusTrap } from "focus-trap-react"
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll"
import { cn } from "@/lib/utils"
import { MenuIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Content } from "@/components/site/content"
import { Link } from "@/components/site/link"
import { ThemeToggle } from "@/components/site/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const navLinks = [
  { href: "/week/1", label: "Intro", week: "1" },
  { href: "/week/2", label: "Scene", week: "2" },
  { href: "/week/3", label: "Motion / Assets", week: "3" },
  { href: "/week/4", label: "React", week: "4" },
  { href: "/week/5", label: "Components in Space", week: "5" },
  { href: "/week/6", label: "Interaction", week: "6" },
] as const

// --- Desktop sidebar ---

function DesktopNavMenu() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [pathname, setOpenMobile])

  return (
    <SidebarMenu>
      {navLinks.map(({ href, label, week }) => (
        <SidebarMenuItem key={href}>
          <SidebarMenuButton
            render={<Link href={href} />}
            isActive={pathname.startsWith(href)}
            tooltip={label}
          >
            <span className="flex size-4 shrink-0 items-center justify-center font-mono text-xs font-semibold tabular-nums">
              {week}
            </span>
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 py-1 group-data-[collapsible=icon]:gap-0">
          <Link
            href="/"
            className="flex max-w-48 flex-col overflow-hidden px-2 tracking-tight whitespace-nowrap transition-[max-width,padding,opacity] duration-150 ease-out group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:opacity-0"
          >
            <span className="text-sm font-medium">Canvas for Coders</span>
          </Link>
          <SidebarTrigger className="ml-auto shrink-0" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <DesktopNavMenu />
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

// --- Mobile nav ---

function MobileNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {navLinks.map(({ href, label, week }) => (
        <Button
          key={href}
          variant="ghost"
          render={<Link href={href} onClick={onNavigate} />}
          nativeButton={false}
          className={cn("w-full justify-start")}
        >
          <span className="font-mono text-xs font-semibold tabular-nums">
            {week}
          </span>
          <span>{label}</span>
        </Button>
      ))}
    </nav>
  )
}

export function NavMobile() {
  const [openPath, setOpenPath] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const isOpen = openPath === pathname
  const close = useCallback(() => setOpenPath(null), [])

  useLockBodyScroll(isOpen)

  return (
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
        className="sticky top-0 z-50 md:hidden"
        style={{ "--header-height": "3rem" } as React.CSSProperties}
      >
        <header className={cn("border-b bg-background")}>
          <Content>
            <div className="flex h-(--header-height) items-center justify-between">
              <Link
                href="/"
                className="text-sm font-medium tracking-tight text-balance"
                onClick={close}
              >
                Canvas for Coders
              </Link>
              <MobileToggle
                ref={toggleRef}
                isOpen={isOpen}
                onToggle={() =>
                  setOpenPath((current) =>
                    current === pathname ? null : pathname
                  )
                }
              />
            </div>
          </Content>
        </header>

        <AnimatePresence>
          {isOpen && (
            <motion.div
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
              <Content className="h-full py-8">
                <div className="flex h-full flex-col overflow-y-auto overscroll-contain">
                  <MobileNavLinks onNavigate={close} />
                  <div className="mt-auto">
                    <ThemeToggle />
                  </div>
                </div>
              </Content>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FocusTrap>
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
