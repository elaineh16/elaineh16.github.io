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

  const reset = () => {
    if (timer.current) clearTimeout(timer.current)
    setCaught([])
    save("ec.fish", [])
    setCasts(0)
    setLast(null)
    setShown(null)
    setPhase("ready")
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

        <div className={"pond fp " + phase} aria-hidden="true">
          <Scene phase={phase} casts={casts} />
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
          {caught.length ? (
            <button type="button" className="tab small" onClick={reset} style={{ marginTop: 10 }}>
              Reset catch log
            </button>
          ) : null}
        </section>
      </div>
    </div>
  )
}

/* ---------- First-person scene (320×180 pixel grid) ---------- */

const W = 320
const H = 180
const HORIZON = 76
const TIP = { x: 214, y: 34 } // rod tip
const BOB = { x: 146, y: 112 } // bobber resting spot

// Water bands get taller toward the viewer to fake perspective.
const WATER: { y: number; h: number; c: string }[] = (() => {
  const rows = []
  let y = HORIZON
  let h = 3
  let i = 0
  while (y < H) {
    rows.push({ y, h, c: i % 2 ? "#3a63b8" : "#4472c8" })
    y += h
    h = Math.round(h * 1.28) + 1
    i++
  }
  return rows
})()

// Rod drawn as stepped pixel blocks from the hand up to the tip.
const ROD: { x: number; y: number }[] = (() => {
  const from = { x: 286, y: 176 }
  const n = 26
  return Array.from({ length: n }, (_, i) => ({
    x: Math.round((from.x + ((TIP.x - from.x) * i) / (n - 1)) / 2) * 2,
    y: Math.round((from.y + ((TIP.y - from.y) * i) / (n - 1)) / 2) * 2,
  }))
})()

const TREES = [18, 62, 112, 196, 248, 300]

function Scene({ phase, casts }: { phase: Phase; casts: number }) {
  const lineOut = phase === "waiting" || phase === "bite" || phase === "early" || phase === "escaped"
  const by = phase === "bite" ? BOB.y + 4 : BOB.y
  return (
    <svg className="fp-scene" viewBox={`0 0 ${W} ${H}`} shapeRendering="crispEdges" preserveAspectRatio="xMidYMid slice">
      {/* sky */}
      <rect x="0" y="0" width={W} height={HORIZON} fill="#7ea6ec" />
      <rect x="0" y="34" width={W} height={HORIZON - 34} fill="#94b8f0" />
      <rect x="0" y="56" width={W} height={HORIZON - 56} fill="#aecbf4" />
      <rect x="252" y="10" width="22" height="22" fill="#ffe27a" />
      <rect x="256" y="14" width="14" height="14" fill="#fff6c2" />
      <g className="fp-clouds">
        <rect x="20" y="16" width="44" height="8" fill="#fff" />
        <rect x="30" y="10" width="22" height="6" fill="#fff" />
        <rect x="130" y="24" width="56" height="8" fill="#f2f6ff" />
        <rect x="146" y="18" width="24" height="6" fill="#f2f6ff" />
      </g>
      {/* far shore */}
      <rect x="0" y={HORIZON - 8} width={W} height="5" fill="#5f8f45" />
      <rect x="0" y={HORIZON - 3} width={W} height="3" fill="#7a5a3a" />
      {TREES.map((x) => (
        <g key={x}>
          <rect x={x - 1} y={HORIZON - 14} width="3" height="7" fill="#5a3f24" />
          <rect x={x - 6} y={HORIZON - 24} width="13" height="11" fill="#3f7a30" />
          <rect x={x - 3} y={HORIZON - 27} width="7" height="3" fill="#3f7a30" />
          <rect x={x - 6} y={HORIZON - 24} width="4" height="3" fill="#559a40" />
        </g>
      ))}
      {/* water */}
      {WATER.map((r) => (
        <rect key={r.y} x="0" y={r.y} width={W} height={r.h} fill={r.c} />
      ))}
      <g className="fp-glints">
        <rect x="40" y="90" width="10" height="2" fill="#8fb4ee" />
        <rect x="222" y="98" width="14" height="2" fill="#8fb4ee" />
        <rect x="88" y="132" width="18" height="3" fill="#8fb4ee" />
        <rect x="190" y="150" width="22" height="3" fill="#8fb4ee" />
      </g>

      {phase === "bite" ? (
        <g className="fp-splash">
          <rect className="d1" x={BOB.x - 8} y={by} width="3" height="3" fill="#e8f3ff" />
          <rect className="d2" x={BOB.x + 1} y={by - 2} width="3" height="3" fill="#e8f3ff" />
          <rect className="d3" x={BOB.x + 9} y={by} width="3" height="3" fill="#e8f3ff" />
          <text x={BOB.x + 2} y={by - 12} textAnchor="middle" className="fp-bang">
            !
          </text>
        </g>
      ) : null}

      {/* rod + arm, swings on each cast; the line and bobber ride along so they stay attached */}
      <g key={casts} className={"fp-arm" + (phase === "waiting" ? " cast" : phase === "caught" ? " reel" : "")}>
        {/* line + bobber */}
        {lineOut ? (
          <>
            <path d={`M${TIP.x} ${TIP.y} Q ${(TIP.x + BOB.x) / 2} ${by - 18} ${BOB.x + 2} ${by}`} fill="none" stroke="#2b2b2b" strokeWidth="1" shapeRendering="auto" />
            <g className={"fp-bobber" + (phase === "bite" ? " bite" : "")}>
              <rect x={BOB.x - 2} y={by - 2} width="8" height="4" fill="#d93a3a" />
              <rect x={BOB.x - 2} y={by + 2} width="8" height="3" fill="#f4f4f4" />
              <rect x={BOB.x - 4} y={by + 5} width="12" height="1" fill="#2c4f94" />
            </g>
          </>
        ) : null}
        {ROD.map((p, i) => (
          <rect key={i} x={p.x - 2} y={p.y - 2} width="5" height="5" fill={i % 3 === 0 ? "#4a3420" : "#6b4f2a"} />
        ))}
        <rect x={TIP.x - 2} y={TIP.y - 2} width="4" height="4" fill="#9a9a9a" />
        <g transform="rotate(-28 290 180)">
          <rect x="272" y="146" width="34" height="60" fill="#B31B1B" />
          <rect x="272" y="146" width="8" height="60" fill="#7f1212" />
          <rect x="272" y="128" width="34" height="20" fill="#f1c9a5" />
          <rect x="272" y="128" width="8" height="20" fill="#d9a784" />
        </g>
      </g>
    </svg>
  )
}
