"use client"

import { useEffect, useRef, useState } from "react"
import { ENCHANTED_CHANCE, FORTUNES, GOLDEN_CHANCE, WORDS, luckyNumbers, pickFortune, type Fortune, type Tier, type Word } from "@/data/fortunes"
import { load, save } from "@/lib/storage"
import { playCrunch, playJingle, playTick } from "@/lib/sound"

type Phase = "idle" | "spinning" | "cracking" | "open"

const SLICES = 12
const STEP = 360 / SLICES
const GOLD_SLICE = 0
const ENCHANTED_SLICES = [4, 8]
const tierOfSlice = (i: number): Tier => (i === GOLD_SLICE ? "golden" : ENCHANTED_SLICES.includes(i) ? "enchanted" : "regular")
const SPIN_MS = 4200

interface Slip {
  fortune: Fortune
  numbers: number[]
  word: Word
}

export function FortuneWheel({ sound, onFortune }: { sound: boolean; onFortune: (f: Fortune, found: number, total: number) => void }) {
  const [phase, setPhase] = useState<Phase>("idle")
  const [angle, setAngle] = useState(0)
  const [slip, setSlip] = useState<Slip | null>(null)
  const [found, setFound] = useState<string[]>([])
  const [spins, setSpins] = useState(0)
  const [reduce, setReduce] = useState(false)
  const discRef = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const raf = useRef<number>(0)
  const foundRef = useRef<string[]>([])
  const soundRef = useRef(sound)
  soundRef.current = sound

  useEffect(() => {
    const f = load<string[]>("ec.fortunes", []).filter((id) => FORTUNES.some((x) => x.id === id))
    foundRef.current = f
    setFound(f)
    setReduce(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    return () => {
      timers.current.forEach(clearTimeout)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))

  // Tick once each time a slice boundary passes the pointer.
  const watchTicks = (until: number) => {
    let last = -1
    const loop = () => {
      const el = discRef.current
      if (el) {
        const m = new DOMMatrixReadOnly(getComputedStyle(el).transform)
        const deg = ((Math.atan2(m.b, m.a) * 180) / Math.PI + 360) % 360
        const idx = Math.floor((deg + STEP / 2) / STEP) % SLICES
        if (last !== -1 && idx !== last && soundRef.current) playTick()
        last = idx
      }
      if (performance.now() < until) raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
  }

  const spin = () => {
    if (phase === "spinning" || phase === "cracking") return
    const roll = Math.random()
    const tier: Tier = roll < GOLDEN_CHANCE ? "golden" : roll < GOLDEN_CHANCE + ENCHANTED_CHANCE ? "enchanted" : "regular"
    const choices = Array.from({ length: SLICES }, (_, i) => i).filter((i) => tierOfSlice(i) === tier)
    const slice = choices[Math.floor(Math.random() * choices.length)]
    const fortune = pickFortune(foundRef.current, tier)
    // Land the chosen slice under the top pointer, a little off-centre so it feels natural.
    const jitter = (Math.random() - 0.5) * STEP * 0.6
    const target = (((-slice * STEP + jitter - angle) % 360) + 360) % 360
    const next = angle + (reduce ? 360 : 360 * 5) + target
    const ms = reduce ? 600 : SPIN_MS
    setAngle(next)
    setSpins((n) => n + 1)
    setPhase("spinning")
    if (!reduce) watchTicks(performance.now() + ms)
    later(ms + 80, () => {
      setSlip({ fortune, numbers: luckyNumbers(), word: WORDS[Math.floor(Math.random() * WORDS.length)] })
      setPhase("cracking")
      if (soundRef.current) playCrunch()
      later(reduce ? 50 : 650, () => {
        setPhase("open")
        const isNew = !foundRef.current.includes(fortune.id)
        const nextFound = isNew ? [...foundRef.current, fortune.id] : foundRef.current
        foundRef.current = nextFound
        setFound(nextFound)
        save("ec.fortunes", nextFound)
        if (soundRef.current && (fortune.tier !== "regular" || isNew)) setTimeout(playJingle, 80)
        onFortune(fortune, nextFound.length, FORTUNES.length)
      })
    })
  }

  const resetJar = () => {
    foundRef.current = []
    setFound([])
    save("ec.fortunes", [])
    setSlip(null)
    setPhase("idle")
    setSpins(0)
  }

  const isNew = !!slip && found.indexOf(slip.fortune.id) === found.length - 1 && phase === "open"
  const busy = phase === "spinning" || phase === "cracking"
  const status =
    phase === "idle"
      ? "Spin the wheel to crack open a fortune cookie."
      : phase === "spinning"
        ? "Round and round it goes…"
        : phase === "cracking"
          ? "Crack!"
          : slip?.fortune.tier === "golden"
            ? "✨ The golden cookie! ✨"
            : slip?.fortune.tier === "enchanted"
              ? "✦ An enchanted cookie! ✦"
            : isNew
              ? "A new fortune for your jar!"
              : "You've read this one before. Spin again?"

  return (
    <div className="fortune">
      <section className="win fish-main" aria-labelledby="fwh">
        <div className="craft-headrow">
          <h2 id="fwh" className="px">
            Fortune Cookie Wheel
          </h2>
          <span className="vt craft-count" aria-live="polite">
            {found.length} / {FORTUNES.length} found · {spins} spins
          </span>
        </div>

        <div className="wheel-stage">
          <div className="wheel-pointer" aria-hidden="true" />
          <div
            ref={discRef}
            className="wheel-disc"
            style={{ transform: `rotate(${angle}deg)`, transitionDuration: `${reduce ? 600 : SPIN_MS}ms` }}
            aria-hidden="true"
          >
            <svg viewBox="-110 -110 220 220" shapeRendering="crispEdges">
              <circle r="108" fill="#3a2a20" />
              {Array.from({ length: SLICES }, (_, i) => {
                const a0 = ((i * STEP - STEP / 2 - 90) * Math.PI) / 180
                const a1 = ((i * STEP + STEP / 2 - 90) * Math.PI) / 180
                const r = 100
                const d = `M0 0 L${r * Math.cos(a0)} ${r * Math.sin(a0)} A${r} ${r} 0 0 1 ${r * Math.cos(a1)} ${r * Math.sin(a1)} Z`
                const t = tierOfSlice(i)
                const gold = t === "golden"
                return (
                  <g key={i}>
                    <path d={d} fill={gold ? "#f2c94c" : t === "enchanted" ? "#9a62e0" : i % 2 ? "var(--hv)" : "var(--hv-soft)"} stroke="#3a2a20" strokeWidth="2" shapeRendering="auto" />
                    <g transform={`rotate(${i * STEP}) translate(0 -70)`}>
                      <Cookie gold={gold} enchanted={t === "enchanted"} />
                    </g>
                  </g>
                )
              })}
              <circle r="20" fill="#3a2a20" />
              <circle r="15" fill="#f5e9d4" />
              <rect x="-4" y="-4" width="8" height="8" fill="#B31B1B" />
            </svg>
          </div>
        </div>

        <p className="vt craft-msg" aria-live="assertive">
          {status}
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button" className={"mc-btn fish-btn" + (busy ? "" : " hot")} onClick={spin} disabled={busy}>
            {phase === "idle" ? "Spin" : busy ? "Spinning…" : "Spin again"}
          </button>
        </div>
      </section>

      <div className="craft-side stack-16">
        <article className={"paper craft-result show fortune-card" + (slip && phase !== "spinning" && slip.fortune.tier !== "regular" ? " " + slip.fortune.tier : "")} aria-live="polite">
          {phase === "cracking" || phase === "open" ? (
            <div className={"cookie-crack " + phase} aria-hidden="true">
              <span className="half l">
                <Cookie gold={slip?.fortune.tier === "golden"} enchanted={slip?.fortune.tier === "enchanted"} big />
              </span>
              <span className="half r">
                <Cookie gold={slip?.fortune.tier === "golden"} enchanted={slip?.fortune.tier === "enchanted"} big />
              </span>
            </div>
          ) : null}
          {phase === "open" && slip ? (
            <div className="slip" key={spins}>
              <p className="slip-text">{slip.fortune.text}</p>
              <p className="slip-nums vt">
                Lucky numbers <b>{slip.numbers.join(" · ")}</b>
              </p>
              <p className="slip-learn vt">
                Learn Chinese: <b lang="zh">{slip.word.zh}</b> {slip.word.pinyin} · “{slip.word.en}”
              </p>
            </div>
          ) : phase === "spinning" ? (
            <div className="cookie-wait" aria-hidden="true">
              <Cookie big />
              <span className="vt">Your cookie is on its way…</span>
            </div>
          ) : phase === "idle" ? (
            <>
              <span className="book-kicker">How to play</span>
              <p style={{ margin: 0 }}>
                Spin the wheel and a fortune cookie cracks open with your fortune, lucky numbers and a word to learn. Collect them all in your jar, and watch out for the rare enchanted and golden cookies.
              </p>
            </>
          ) : null}
        </article>

        <section className="win recipe-book" aria-labelledby="jar">
          <h2 id="jar" className="px">
            Fortune Jar
          </h2>
          <div className="ach-bar" aria-hidden="true">
            <span style={{ width: `${(found.length / FORTUNES.length) * 100}%` }} />
          </div>
          {found.length ? (
            <ul className="jar-list">
              {[...found].reverse().map((id) => {
                const f = FORTUNES.find((x) => x.id === id)
                if (!f) return null
                return (
                  <li key={id} className={f.tier === "regular" ? "" : f.tier}>
                    {f.tier === "golden" ? "✨ " : f.tier === "enchanted" ? "✦ " : ""}
                    {f.text}
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="vt" style={{ margin: "10px 0 0", fontSize: 13, color: "#3a3a3a" }}>
              Your jar is empty. Every fortune you find is saved here.
            </p>
          )}
          {found.length ? (
            <>
              <p className="vt" style={{ margin: "10px 0 0", fontSize: 12, color: "#3a3a3a" }}>
                {FORTUNES.length - found.length ? `${FORTUNES.length - found.length} more to find.` : "You found every fortune!"}
              </p>
              <button type="button" className="tab small" onClick={resetJar} style={{ marginTop: 10 }}>
                Empty the jar
              </button>
            </>
          ) : null}
        </section>
      </div>
    </div>
  )
}

/* A blocky folded fortune cookie, drawn on a 10×8 grid centred on (0, 0). */
const COOKIE = ["...TTTT...", ".TTttttTT.", "TttttttttT", "TttttWtttT", "TtttTTtttT", "TttT..TttT", ".TT....TT."]

export function Cookie({ gold = false, enchanted = false, big = false }: { gold?: boolean; enchanted?: boolean; big?: boolean }) {
  const T = gold ? "#a8740f" : enchanted ? "#5a2f9a" : "#a8702e"
  const t = gold ? "#ffe27a" : enchanted ? "#d2b0ff" : "#e0b26a"
  const s = big ? 1 : 2.2
  const rects = COOKIE.flatMap((row, y) =>
    row.split("").flatMap((c, x) => (c === "." ? [] : [<rect key={`${x}-${y}`} x={(x - 5) * s} y={(y - 3.5) * s} width={s} height={s} fill={c === "T" ? T : c === "W" ? "#fffaf0" : t} />])),
  )
  if (big) {
    return (
      <svg viewBox="-5 -3.5 10 7" width="96" height="68" shapeRendering="crispEdges" className="pixel">
        {rects}
      </svg>
    )
  }
  return <g>{rects}</g>
}
