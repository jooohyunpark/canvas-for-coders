import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

// Only the landing page is reachable without the password, so it is the only
// thing worth advertising to a crawler.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }]
}
