"use client"

import { useEffect, useRef, useState } from "react"
import { CATCHES, rollCatch, type Catch } from "@/data/fishing"
import { PixelIcon } from "@/components/game/primitives"
import { playCraft, playJingle, playNope, playSplash } from "@/lib/sound"
import { load, save } from "@/lib/storage"

type Phase = "ready" | "waiting" | "bite" | "caught" | "escaped" | "early"

const BITE_WINDOW = 1500 // ms to reel in after the splash

export function Fishing({ sound, onCatch }: { sound: boolean; onCatch: (c: Catch, caughtCount: number, total: number) => void }) {
  const [phase, setPhase] = useState<Phase>("ready")
  const [caught, setCaught] = useState<string[]>([])
  const [last, setLast] = useState<Catch | null>(null)
  const [shown, setShown] = useState<Catch | null>(null)
  const [casts, setCasts] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const caughtRef = useRef(caught)
  caughtRef.current = caught

  useEffect(() => {
    setCaught(load<string[]>("ec.fish", []).filter((id) => CATCHES.some((c) => c.id === id)))
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const later = (ms: number, fn: () => void) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(fn, ms)
  }

  const cast = () => {
    setCasts((n) => n + 1)
    setLast(null)
    setPhase("waiting")
    if (sound) playSplash()
    later(2000 + Math.random() * 4000, () => {
      setPhase("bite")
      if (sound) playSplash(true)
      later(BITE_WINDOW, () => {
        setPhase("escaped")
        if (sound) playNope()
      })
    })
  }

  const reel = () => {
    if (phase === "waiting") {
      if (timer.current) clearTimeout(timer.current)
      setPhase("early")
      return
    }
    if (phase !== "bite") return
    if (timer.current) clearTimeout(timer.current)
    const c = rollCatch(caughtRef.current)
    const next = caughtRef.current.includes(c.id) ? caughtRef.current : [...caughtRef.current, c.id]
    setCaught(next)
    save("ec.fish", next)
    setLast(c)
    setShown(c)
    setPhase("caught")
    if (sound) (c.rarity === "common" ? playCraft : playJingle)()
    onCatch(c, next.length, CATCHES.length)
  }

  const main = phase === "waiting" || phase === "bite" ? reel : cast
  const label =
    phase === "waiting" ? "Reel in" : phase === "bite" ? "Reel in!" : phase === "ready" ? "Cast" : "Cast again"
  const status =
    phase === "ready"
      ? "Click Cast, then wait for the splash."
      : phase === "waiting"
        ? "Waiting for a bite…"
        : phase === "bite"
          ? "Splash! Reel it in, quick!"
          : phase === "early"
            ? "Too soon! The fish swam off. Wait for the splash."
            : phase === "escaped"
              ? "It got away! Cast again."
              : last
                ? `You caught ${last.rarity === "common" ? "" : last.rarity === "rare" ? "a rare " : "the legendary "}${last.name}!`
                : ""

  const isNew = last ? caught.indexOf(last.id) === caught.length - 1 : false

  return (
    <div className="fishing">
      <section className="win fish-main" aria-labelledby="fh">
        <div className="craft-headrow">
          <h2 id="fh" className="px">
            Gone Fishing
          </h2>
          <span className="vt craft-count" aria-live="polite">
            {caught.length} / {CATCHES.length} caught · {casts} casts
          </span>
        </div>

        <div className={"pond " + phase} aria-hidden="true">
          <div className="pond-sky" />
          <div className="rod" />
          {phase !== "ready" && phase !== "caught" ? (
            <>
              <svg className="line" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="4" y1="6" x2="58" y2={phase === "bite" ? 66 : 58} stroke="#e8e8e8" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="bobber" />
            </>
          ) : null}
          {phase === "bite" ? (
            <>
              <span className="bang px">!</span>
              <span className="splash-fx s1" />
              <span className="splash-fx s2" />
              <span className="splash-fx s3" />
            </>
          ) : null}
          {phase === "caught" && last ? (
            <span key={casts} className={"catch-pop " + last.rarity}>
              <PixelIcon name={last.icon} size={56} />
            </span>
          ) : null}
        </div>

        <p className="vt craft-msg" aria-live="assertive">
          {status}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className={"mc-btn fish-btn" + (phase === "bite" ? " hot" : "")} onClick={main}>
            {label}
          </button>
        </div>
      </section>

      <div className="craft-side stack-16">
        <article className={"paper craft-result" + (shown ? " show" : "")} aria-live="polite" key={shown ? `${shown.id}-${casts}` : "intro"}>
          {shown ? (
            <>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span className={"slot static rarity-" + shown.rarity + (shown.rarity !== "common" ? " enchanted" : "")}>
                  <PixelIcon name={shown.icon} />
                </span>
                <div>
                  <span className={"book-kicker rar-" + shown.rarity}>
                    {shown.rarity}
                    {shown === last && isNew ? " · new!" : ""}
                  </span>
                  <h3 className="px" style={{ margin: 0, fontSize: 17 }}>
                    {shown.name}
                  </h3>
                </div>
              </div>
              <p>{shown.fact}</p>
            </>
          ) : (
            <>
              <span className="book-kicker">How to play</span>
              <p>
                Cast your line and wait. When the bobber splashes, you have a second and a half to reel in. Every catch comes with a fun fact about me, and some are
                rare.
              </p>
            </>
          )}
        </article>

        <section className="win recipe-book" aria-labelledby="clog">
          <h2 id="clog" className="px">
            Catch Log
          </h2>
          <div className="ach-bar" aria-hidden="true">
            <span style={{ width: `${(caught.length / CATCHES.length) * 100}%` }} />
          </div>
          <div className="catch-grid">
            {CATCHES.map((c) => {
              const got = caught.includes(c.id)
              return got ? (
                <button
                  key={c.id}
                  type="button"
                  className={"slot rarity-" + c.rarity + (shown?.id === c.id ? " sel" : "")}
                  aria-label={`${c.name}: read its fact`}
                  data-t1={c.name}
                  data-t2={c.rarity}
                  onClick={() => setShown(c)}
                >
                  <PixelIcon name={c.icon} />
                </button>
              ) : (
                <div key={c.id} className={"slot locked rarity-" + c.rarity} aria-label={`Not caught yet (${c.rarity})`} data-t1="???" data-t2={c.rarity}>
                  ?
                </div>
              )
            })}
          </div>
          <p className="vt" style={{ margin: "10px 0 0", fontSize: 12, color: "#3a3a3a" }}>
            Border colour shows rarity: grey common, blue rare, gold legendary.
          </p>
        </section>
      </div>
    </div>
  )
}
