"use server"

import crypto from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIE, authToken, safePath } from "@/lib/auth"

export type VerifyState = { error: boolean }

export async function verifyPassword(
  _prev: VerifyState,
  formData: FormData
): Promise<VerifyState> {
  const password = formData.get("password")
  const redirectTo = safePath(formData.get("from"))

  if (typeof password !== "string" || !password || password.length > 128) {
    return { error: true }
  }

  const expected = process.env.SITE_PASSWORD ?? ""

  // Compare digests rather than the raw strings: SHA-256 output is always 32
  // bytes, so there is no length check to bail out of early and the comparison
  // cannot leak how long the password is.
  const digest = (value: string) =>
    crypto.createHash("sha256").update(value, "utf8").digest()

  const ok =
    expected.length > 0 &&
    crypto.timingSafeEqual(digest(expected), digest(password))

  if (!ok) return { error: true }

  const jar = await cookies()
  jar.set(AUTH_COOKIE, await authToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })

  redirect(redirectTo)
}
