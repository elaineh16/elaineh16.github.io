"use client"

import { useEffect, useState } from "react"

const STEPS = ["Generating terrain…", "Spawning Elaine…", "Sharpening épée…", "Brewing matcha…", "Casting fishing lines…", "Loading chunks…"]
const MIN_MS = 1300
const MAX_MS = 4500

/**
 * A Minecraft-style "Loading world" screen. It's in the static HTML so it covers the page
 * before scripts run. It shows once per browser session and leaves when the page has loaded
 * (or on any click or key press).
 */
export function Loader() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<"on" | "done" | "gone">("on")

  useEffect(() => {
    if (document.documentElement.classList.contains("skip-loader")) {
      setState("gone")
      return
    }
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const start = performance.now()
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      try {
        sessionStorage.setItem("ec.loaded", "1")
      } catch {
        // Storage can be blocked; the loader just shows again next time.
      }
      setState("done")
      setTimeout(() => setState("gone"), reduce ? 0 : 450)
    }
    const whenReady = () => setTimeout(finish, Math.max(0, (reduce ? 400 : MIN_MS) - (performance.now() - start)))
    if (document.readyState === "complete") whenReady()
    else window.addEventListener("load", whenReady, { once: true })
    const cap = setTimeout(finish, MAX_MS)
    const tick = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 380)
    const skip = () => finish()
    window.addEventListener("pointerdown", skip, { once: true })
    window.addEventListener("keydown", skip, { once: true })
    return () => {
      clearTimeout(cap)
      clearInterval(tick)
      window.removeEventListener("load", whenReady)
      window.removeEventListener("pointerdown", skip)
      window.removeEventListener("keydown", skip)
    }
  }, [])

  if (state === "gone") return null
  return (
    <div id="loader" className={state === "done" ? "done" : ""} role="status" aria-live="polite" aria-label="Loading Elaine's world">
      <div className="loader-box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="" width={64} height={64} className="loader-bear" />
        <p className="loader-title px">ELAINE HONG</p>
        <p className="loader-sub px">Loading world</p>
        <div className="loader-bar" aria-hidden="true">
          <span className={state === "done" ? "full" : ""} />
        </div>
        <p className="loader-step vt">{STEPS[step]}</p>
        <p className="loader-skip vt">Click anywhere to skip</p>
      </div>
    </div>
  )
}
