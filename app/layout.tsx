import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Nav } from "@/components/site/nav"
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
    "Web browser is a twenty-first century canvas. A creative practice course exploring Three.js and React Three Fiber at NYU ITP.",
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
      <body className="flex min-h-svh flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          storageKey="itp-c4c-theme"
          enableSystem={true}
        >
          <Nav />
          <main className="flex-1 lg:py-8 lg:pl-64">{children}</main>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  )
}
