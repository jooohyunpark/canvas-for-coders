import type { MetadataRoute } from "next"
import { noindexRoutes, protectedRoutes, siteUrl } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The week pages sit behind the password gate, so a crawler only ever
      // reaches the /verify redirect. Keep both out of the index.
      disallow: [...protectedRoutes, ...noindexRoutes],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
