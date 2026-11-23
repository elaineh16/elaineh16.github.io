"use client"

import { useEffect, useRef, useState } from "react"
import { MENU, SCREEN_TITLES, type ScreenId } from "@/data/content"

/** The pages you can scroll through, in order: the title screen, then the main menu. */
const ORDER: ScreenId[] = ["home", ...MENU.map((m) => m.screen)]

/** How far you have to keep scrolling past the end of a page before it moves on. */
const PULL = 420
/** After a page change, ignore scrolling for a moment so a trackpad's momentum doesn't skip a page. */
const COOLDOWN = 900

/** Can this element (or one of its parents) still scroll in that direction? Then the wheel belongs to it. */
function innerCanScroll(target: EventTarget | null, down: boolean) {
  let el = target instanceof Element ? target : null
  while (el && el !== document.body && el !== document.documentElement) {
    const style = getComputedStyle(el)
    if (/(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + 1) {
      if (down ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0) return true
      // A panel that contains its own scrolling (overscroll-behavior: contain) keeps the gesture.
      if (style.overscrollBehaviorY === "contain") return true
    }
    el = el.parentElement
  }
  return false
}

const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
const atTop = () => window.scrollY <= 1

/**
 * Keep scrolling past the bottom of a page (with some resistance) to move to the next page,
 * or past the top to go back. A Minecraft-style XP bar fills up as you pull.
 */
export function ScrollNav({ screen, go, paused }: { screen: ScreenId; go: (s: ScreenId) => void; paused: boolean }) {
  const index = ORDER.indexOf(screen)
  const [pull, setPull] = useState(0) // -1 … 1: negative pulls up (back), positive pulls down (next)
  const pullRef = useRef(0)
  const lockUntil = useRef(0)
  const idle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const touchY = useRef<number | null>(null)

  const next = index >= 0 && index < ORDER.length - 1 ? ORDER[index + 1] : null
  const prev = index > 0 ? ORDER[index - 1] : null

  useEffect(() => {
    pullRef.current = 0
    setPull(0)
  }, [screen])

  useEffect(() => {
    if (index < 0 || paused) return

    const release = () => {
      // Let go: the bar drains back down.
      clearTimeout(idle.current)
      idle.current = setTimeout(() => {
        pullRef.current = 0
        setPull(0)
      }, 260)
    }

    const push = (dy: number, target: EventTarget | null) => {
      if (performance.now() < lockUntil.current) return
      const down = dy > 0
      if (innerCanScroll(target, down)) return
      if (down ? !next || !atBottom() : !prev || !atTop()) {
        if (pullRef.current !== 0) {
          pullRef.current = 0
          setPull(0)
        }
        return
      }
      // Switching direction starts over.
      if (pullRef.current !== 0 && Math.sign(pullRef.current) !== Math.sign(dy)) pullRef.current = 0
      pullRef.current += Math.max(-80, Math.min(80, dy)) / PULL
      const p = Math.max(-1, Math.min(1, pullRef.current))
      setPull(p)
      release()
      if (Math.abs(p) >= 1) {
        lockUntil.current = performance.now() + COOLDOWN
        pullRef.current = 0
        setPull(0)
        const dest = down ? next : prev
        if (!dest) return
        go(dest)
        // Going back lands at the bottom of the previous page, so the motion feels continuous.
        if (!down) setTimeout(() => window.scrollTo(0, document.documentElement.scrollHeight), 60)
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch-zoom
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY
      push(dy, e.target)
    }
    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY
      if (touchY.current == null || y == null) return
      push((touchY.current - y) * 1.4, e.target)
      touchY.current = y
    }
    const onTouchEnd = () => {
      touchY.current = null
      release()
    }

    window.addEventListener("wheel", onWheel, { passive: true })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("touchend", onTouchEnd)
    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", onTouchEnd)
      clearTimeout(idle.current)
    }
  }, [index, next, prev, paused, go])

  if (index < 0 || pull === 0) return null
  const down = pull > 0
  const dest = down ? next : prev
  if (!dest) return null
  const label = dest === "home" ? "Title screen" : SCREEN_TITLES[dest]
  return (
    <div className={"scroll-nav px " + (down ? "down" : "up") + (screen === "home" ? " over-hotbar" : "")} role="status" aria-live="polite">
      <span className="scroll-nav-label">
        {down ? "Keep scrolling" : "Keep scrolling up"} · {label} {down ? "↓" : "↑"}
      </span>
      <span className="scroll-nav-bar" aria-hidden="true">
        <span style={{ width: `${Math.round(Math.abs(pull) * 100)}%` }} />
      </span>
    </div>
  )
}
