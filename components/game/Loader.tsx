"use client"

import { useEffect, useState } from "react"

const STEPS = ["Generating terrain…", "Spawning Elaine…", "Sharpening épée…", "Brewing matcha…", "Casting fishing lines…", "Loading chunks…"]
const MIN_MS = 1300

/** Fire this to replay the intro (the Arcade's "Play intro" button does). */
export const INTRO_EVENT = "ec:intro"

/**
 * A Minecraft-style "Loading world" screen. It no longer shows on arrival, so visitors see the
 * site straight away. It plays only on request, and leaves after a moment or on any click or key press.
 */
export function Loader() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<"on" | "done" | "gone">("gone")
  const [run, setRun] = useState(0)

  useEffect(() => {
    const play = () => {
      setStep(0)
      setState("on")
      setRun((n) => n + 1)
    }
    window.addEventListener(INTRO_EVENT, play)
    return () => window.removeEventListener(INTRO_EVENT, play)
  }, [])

  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    let finished = false
    let fade: ReturnType<typeof setTimeout> | undefined
    const finish = () => {
      if (finished) return
      finished = true
      setState("done")
      fade = setTimeout(() => setState("gone"), reduce ? 0 : 450)
    }
    const end = setTimeout(finish, reduce ? 400 : MIN_MS + 1100)
    const tick = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 380)
    // Wait a beat so the click that started the intro doesn't also skip it.
    const arm = setTimeout(() => {
      window.addEventListener("pointerdown", finish, { once: true })
      window.addEventListener("keydown", finish, { once: true })
    }, 50)
    return () => {
      clearTimeout(end)
      clearTimeout(arm)
      if (fade) clearTimeout(fade)
      clearInterval(tick)
      window.removeEventListener("pointerdown", finish)
      window.removeEventListener("keydown", finish)
    }
  }, [run])

  if (state === "gone") return null
  return (
    <div id="loader" className={state === "done" ? "done" : ""} role="status" aria-live="polite" aria-label="Loading Elaine's world">
      <div className="loader-box">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon.png" alt="" width={64} height={64} className="loader-bear" />
        <p className="loader-title px">ELAINE HONG</p>
        <p className="loader-sub px">Loading world</p>
        <div className="loader-bar" aria-hidden="true">
          <span key={run} className={state === "done" ? "full" : ""} />
        </div>
        <p className="loader-step vt">{STEPS[step]}</p>
        <p className="loader-skip vt">Click anywhere to skip</p>
      </div>
    </div>
  )
}
