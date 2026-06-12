import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar, NavMobile } from "@/components/site/nav"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { siteUrl } from "@/lib/site"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Canvas for Coders",
    template: "%s | Canvas for Coders",
  },
  description:
    "An NYU ITP course on reimagining the web as a creative medium with Three.js and React Three Fiber, taught by Joohyun Park.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          storageKey="itp-c4c-theme"
          enableSystem={true}
        >
          <TooltipProvider>
            <div className="md:hidden">
              <NavMobile />
            </div>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main className="flex-1 lg:py-8">{children}</main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
