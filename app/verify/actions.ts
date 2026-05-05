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
  const expectedBuf = Buffer.from(expected, "utf8")
  const inputBuf = Buffer.from(password, "utf8")

  const ok =
    expectedBuf.length > 0 &&
    expectedBuf.length === inputBuf.length &&
    crypto.timingSafeEqual(expectedBuf, inputBuf)

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
