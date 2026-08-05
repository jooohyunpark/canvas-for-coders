"use client"

import { useEffect } from "react"

/**
 * Locks body scroll when active.
 * Uses overflow:hidden with a scrollbar-width compensation to prevent layout
 * shift. On iOS Safari, also sets position:fixed and restores scroll position
 * on unlock.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const scrollY = window.scrollY
    const { style } = document.body

    const originalOverflow = style.overflow
    const originalPaddingRight = style.paddingRight
    const originalPosition = style.position
    const originalTop = style.top
    const originalWidth = style.width

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    style.overflow = "hidden"
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`
    }

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)

    if (isIOS) {
      style.position = "fixed"
      style.top = `-${scrollY}px`
      style.width = "100%"
    }

    return () => {
      style.overflow = originalOverflow
      style.paddingRight = originalPaddingRight
      style.position = originalPosition
      style.top = originalTop
      style.width = originalWidth

      if (isIOS) {
        window.scrollTo(0, scrollY)
      }
    }
  }, [locked])
}
