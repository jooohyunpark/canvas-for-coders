"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
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
  SidebarRail,
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

function NavMenu() {
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
            className="flex max-w-48 flex-col overflow-hidden px-2 tracking-tight whitespace-nowrap transition-[max-width,padding,opacity] duration-200 ease-linear group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:opacity-0"
          >
            <span className="text-sm font-medium">Canvas for Coders</span>
            <span className="text-sm text-muted-foreground">Fall 2026</span>
          </Link>
          <SidebarTrigger className="ml-auto shrink-0" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <NavMenu />
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
