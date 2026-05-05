export const AUTH_COOKIE = "site_auth"

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function authToken(): Promise<string> {
  const secret = process.env.AUTH_SECRET
  const password = process.env.SITE_PASSWORD
  if (!secret || !password) throw new Error("AUTH_SECRET or SITE_PASSWORD missing")
  return hmacHex(secret, password)
}

export function safePath(input: unknown): string {
  if (typeof input !== "string") return "/"
  try {
    const url = new URL(input, "http://_")
    if (url.origin !== "http://_") return "/"
    return url.pathname + url.search + url.hash
  } catch {
    return "/"
  }
}

export function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}
