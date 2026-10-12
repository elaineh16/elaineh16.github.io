"use client"

import { useEffect, useRef, useState } from "react"
import { FEINT_SWITCH, RIVALS, TOUCHES_TO_WIN, rivalFor } from "@/data/fencing"
import { load, save } from "@/lib/storage"
import { playBuzz, playClang, playJingle, playNope, playSwish } from "@/lib/sound"

type Phase = "intro" | "guard" | "attack" | "riposte" | "touch" | "won" | "lost"
type Line = "high" | "low"
type Pose = "guard" | "high" | "low" | "parryHigh" | "parryLow" | "lunge" | "hit"

interface Saved {
  rung: number
  streak: number
  best: number
  defences: number
}
const START: Saved = { rung: 0, streak: 0, best: 0, defences: 0 }
const LAST = RIVALS.length - 1

export function Fencing({ sound, onWin }: { sound: boolean; onWin: (info: { streak: number; final: boolean }) => void }) {
  const [saved, setSaved] = useState<Saved>(START)
  const [phase, setPhaseState] = useState<Phase>("intro")
  const [score, setScoreState] = useState({ me: 0, them: 0 })
  const [line, setLineState] = useState<Line>("high")
  const [myPose, setMyPose] = useState<Pose>("guard")
  const [theirPose, setTheirPose] = useState<Pose>("guard")
  const [light, setLight] = useState<"me" | "them" | null>(null)
  const [msg, setMsg] = useState("")
  const [lastRival, setLastRival] = useState<string>("")

  // Mirrors for timers and key handlers, which must see the latest values.
  const phaseRef = useRef<Phase>("intro")
  const lineRef = useRef<Line>("high")
  const feintRef = useRef(false)
  const scoreRef = useRef({ me: 0, them: 0 })
  const savedRef = useRef<Saved>(START)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const soundRef = useRef(sound)
  soundRef.current = sound

  const setPhase = (p: Phase) => {
    phaseRef.current = p
    setPhaseState(p)
  }
  const setLine = (l: Line) => {
    lineRef.current = l
    setLineState(l)
  }
  const setScore = (s: { me: number; them: number }) => {
    scoreRef.current = s
    setScoreState(s)
  }
  const store = (s: Saved) => {
    savedRef.current = s
    setSaved(s)
    save("ec.fence", s)
  }
  const later = (ms: number, fn: () => void) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(fn, ms)
  }
  const rival = () => rivalFor(savedRef.current.rung, savedRef.current.defences)

  useEffect(() => {
    const s = { ...START, ...load<Saved>("ec.fence", START) }
    s.rung = Math.min(Math.max(0, s.rung | 0), LAST)
    savedRef.current = s
    setSaved(s)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  /* ---------- the bout ---------- */

  const startBout = () => {
    setScore({ me: 0, them: 0 })
    setLight(null)
    nextExchange()
  }

  const nextExchange = () => {
    setLight(null)
    setMyPose("guard")
    setTheirPose("guard")
    feintRef.current = false
    setPhase("guard")
    setMsg("En garde… Prêts? Allez!")
    later(900 + Math.random() * 1400, attack)
  }

  const attack = () => {
    const r = rival()
    const first: Line = Math.random() < 0.5 ? "high" : "low"
    const feint = Math.random() < r.feint
    setLine(first)
    setTheirPose(first)
    setPhase("attack")
    setMsg("Here it comes! Parry!")
    if (soundRef.current) playSwish()
    if (feint) {
      feintRef.current = true
      later(FEINT_SWITCH, () => {
        const real: Line = first === "high" ? "low" : "high"
        feintRef.current = false
        setLine(real)
        setTheirPose(real)
        later(r.window, () => theyScore("Too slow! They got through."))
      })
    } else {
      later(r.window, () => theyScore("Too slow! They got through."))
    }
  }

  const parry = (l: Line) => {
    const p = phaseRef.current
    if (p === "guard") {
      setMyPose(l === "high" ? "parryHigh" : "parryLow")
      return theyScore("Too early! Hold your guard until they attack.")
    }
    if (p !== "attack") return
    setMyPose(l === "high" ? "parryHigh" : "parryLow")
    if (feintRef.current) return theyScore("Fooled by the feint! Wait for the real line.")
    if (l !== lineRef.current) return theyScore(`Wrong line! That was a ${lineRef.current} attack.`)
    if (soundRef.current) playClang()
    setTheirPose("guard")
    setPhase("riposte")
    setMsg("Parried! Riposte, quick!")
    later(rival().riposte, () => {
      setPhase("touch")
      setMsg("Too slow to riposte. They recovered.")
      later(900, nextExchange)
    })
  }

  const riposte = () => {
    if (phaseRef.current !== "riposte") return
    if (timer.current) clearTimeout(timer.current)
    setMyPose("lunge")
    setTheirPose("hit")
    if (soundRef.current) playSwish()
    point("me", "Touché! Point Elaine.")
  }

  const theyScore = (text: string) => {
    if (timer.current) clearTimeout(timer.current)
    setTheirPose("lunge")
    setMyPose("hit")
    point("them", text)
  }

  const point = (who: "me" | "them", text: string) => {
    const s = { ...scoreRef.current, [who]: scoreRef.current[who] + 1 }
    setScore(s)
    setLight(who)
    setPhase("touch")
    setMsg(text)
    if (soundRef.current) playBuzz()
    later(1300, () => {
      if (s.me >= TOUCHES_TO_WIN) win()
      else if (s.them >= TOUCHES_TO_WIN) lose()
      else nextExchange()
    })
  }

  const win = () => {
    const cur = savedRef.current
    const r = rival()
    const streak = cur.streak + 1
    const final = cur.rung === LAST
    store({ rung: final ? LAST : cur.rung + 1, streak, best: Math.max(cur.best, streak), defences: final ? cur.defences + 1 : cur.defences })
    setLastRival(r.name)
    setPhase("won")
    setMsg(final ? (cur.defences ? `Title defended! ${cur.defences + 1} Finals won.` : "Champion! You won the Final.") : `You beat the ${r.name}, ${scoreRef.current.me}–${scoreRef.current.them}! On to the ${RIVALS[cur.rung + 1].rung}.`)
    if (soundRef.current) playJingle()
    onWin({ streak, final })
  }

  const lose = () => {
    const cur = savedRef.current
    const r = rival()
    store({ ...cur, rung: 0, streak: 0, defences: 0 })
    setLastRival(r.name)
    setPhase("lost")
    setMsg(`Eliminated by the ${r.name}, ${scoreRef.current.me}–${scoreRef.current.them}. Back to the pool.`)
    if (soundRef.current) playNope()
  }

  const resetStreak = () => {
    if (timer.current) clearTimeout(timer.current)
    store({ ...START })
    setScore({ me: 0, them: 0 })
    setLight(null)
    setMyPose("guard")
    setTheirPose("guard")
    setPhase("intro")
    setMsg("")
  }

  // Keyboard: ↑/W parry high, ↓/S parry low, Space/Enter riposte or start.
  const keys = useRef({ parry, riposte, startBout })
  keys.current = { parry, riposte, startBout }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return
      const k = e.key.toLowerCase()
      const p = phaseRef.current
      if (k === "arrowup" || k === "w") {
        e.preventDefault()
        keys.current.parry("high")
      } else if (k === "arrowdown" || k === "s") {
        e.preventDefault()
        keys.current.parry("low")
      } else if (k === " " || k === "enter") {
        if (p === "riposte") {
          e.preventDefault()
          keys.current.riposte()
        } else if ((p === "intro" || p === "won" || p === "lost") && t?.tagName !== "BUTTON") {
          e.preventDefault()
          keys.current.startBout()
        } else if (p === "guard" || p === "attack" || p === "touch") {
          e.preventDefault()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  /* ---------- view ---------- */

  const r = rivalFor(saved.rung, saved.defences)
  const inBout = phase === "guard" || phase === "attack" || phase === "riposte" || phase === "touch"
  const status =
    phase === "intro"
      ? `First to ${TOUCHES_TO_WIN} touches. Press Start, then parry the attack's line and riposte.`
      : msg
  const startLabel = phase === "won" ? "Next bout" : phase === "lost" ? "Try again" : "Start bout"
  const showHint = phase === "attack" && r.hint

  return (
    <div className="fencing">
      <section className="win fish-main" aria-labelledby="fdh">
        <div className="craft-headrow">
          <h2 id="fdh" className="px">
            Fencing Duel
          </h2>
          <span className="vt craft-count">
            Streak {saved.streak} · Best {saved.best}
          </span>
        </div>

        <div className="fence-board" aria-label={`Score: Elaine ${score.me}, ${r.name} ${score.them}`}>
          <span className={"fence-light red" + (light === "me" ? " on" : "")} />
          <span className="fence-name vt">Elaine</span>
          <span className="fence-score px">
            {score.me} – {score.them}
          </span>
          <span className="fence-name right vt">{r.name}</span>
          <span className={"fence-light green" + (light === "them" ? " on" : "")} />
        </div>

        <div className={"piste-wrap " + phase} data-line={phase === "attack" ? line : ""} aria-hidden="true">
          <svg className="piste" viewBox="0 0 320 150" shapeRendering="crispEdges" preserveAspectRatio="xMidYMid slice">
            <rect x="0" y="0" width="320" height="118" fill="#2f3446" />
            <rect x="0" y="96" width="320" height="22" fill="#262a39" />
            {[40, 120, 200, 280].map((x) => (
              <g key={x}>
                <rect x={x - 9} y="10" width="18" height="34" fill="#B31B1B" />
                <rect x={x - 9} y="10" width="18" height="4" fill="#7f1212" />
                <rect x={x - 3} y="22" width="6" height="10" fill="#F5E9D4" />
              </g>
            ))}
            <rect x="0" y="118" width="320" height="32" fill="#8a6a48" />
            <rect x="0" y="130" width="320" height="2" fill="#755a3c" />
            <rect x="0" y="142" width="320" height="2" fill="#755a3c" />
            <rect x="24" y="117" width="272" height="10" fill="#9aa3ad" />
            <rect x="24" y="117" width="272" height="2" fill="#c3cad2" />
            {[26, 130, 159, 190, 292].map((x) => (
              <rect key={x} x={x} y="117" width="2" height="10" fill="#f4f4f4" />
            ))}
            <Fencer x={110} facing={1} pose={myPose} sock="#B31B1B" hair />
            <Fencer x={210} facing={-1} pose={theirPose} sock={r.sock} />
            {showHint ? (
              <g className="fence-hint">
                {line === "high" ? <polygon points="160,22 151,35 169,35" fill="#ffff55" stroke="#3f3f00" strokeWidth="1" /> : <polygon points="160,112 151,99 169,99" fill="#ffff55" stroke="#3f3f00" strokeWidth="1" />}
              </g>
            ) : null}
          </svg>
        </div>

        <p className="vt craft-msg" aria-live="assertive">
          {status}
        </p>

        {inBout ? (
          <div className="fence-controls">
            <button type="button" className="mc-btn" onClick={() => parry("high")}>
              ↑ Parry high
            </button>
            <button type="button" className={"mc-btn" + (phase === "riposte" ? " fish-btn hot" : "")} onClick={riposte} disabled={phase !== "riposte"}>
              Riposte!
            </button>
            <button type="button" className="mc-btn" onClick={() => parry("low")}>
              ↓ Parry low
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button type="button" className="mc-btn fish-btn" onClick={startBout}>
              {startLabel}
            </button>
          </div>
        )}
        <p className="vt fence-keys">Keys: ↑ or W parry high · ↓ or S parry low · Space riposte</p>
      </section>

      <div className="craft-side stack-16">
        <article className="paper craft-result show" aria-live="polite">
          <span className="book-kicker">
            {phase === "won" ? `Beat the ${lastRival} · next up` : phase === "lost" ? `Lost to the ${lastRival} · next up` : "Next opponent"} · {r.rung}
          </span>
          <h3 className="px" style={{ margin: "2px 0 6px", fontSize: 17 }}>
            {r.name}
            {saved.rung === LAST && saved.defences ? ` · defence ${saved.defences + 1}` : ""}
          </h3>
          <p style={{ margin: 0 }}>{r.blurb}</p>
          <p className="vt" style={{ margin: "8px 0 0", fontSize: 13, color: "#5a4a44" }}>
            Parry window {(r.window / 1000).toFixed(2)}s · feints {Math.round(r.feint * 100)}%{r.hint ? " · arrows on" : ""}
          </p>
        </article>

        <section className="win recipe-book" aria-labelledby="ladder">
          <h2 id="ladder" className="px">
            Tournament
          </h2>
          <ol className="ladder">
            {RIVALS.map((rv, i) => {
              const done = i < saved.rung || (i === LAST && saved.defences > 0)
              const cur = i === saved.rung
              return (
                <li key={rv.rung} className={(done ? "done" : "") + (cur ? " cur" : "")}>
                  <span className="ladder-mark px" aria-hidden="true">
                    {done ? "✓" : cur ? "▶" : "·"}
                  </span>
                  <span>
                    <strong className="px">{rv.rung}</strong> <span className="vt">{rv.name}</span>
                  </span>
                </li>
              )
            })}
          </ol>
          <p className="vt" style={{ margin: "10px 0 0", fontSize: 12, color: "#3a3a3a" }}>
            Win to move up. Lose and you're back in the pool. Your best streak is saved in this browser.
          </p>
          {saved.best || saved.streak || saved.rung ? (
            <button type="button" className="tab small" onClick={resetStreak} style={{ marginTop: 10 }}>
              Reset streak
            </button>
          ) : null}
        </section>
      </div>
    </div>
  )
}

/* ---------- a blocky side-view épée fencer ---------- */

const HAND: Record<Pose, { x: number; y: number }> = {
  guard: { x: 16, y: -40 },
  high: { x: 10, y: -52 },
  low: { x: 13, y: -33 },
  parryHigh: { x: 14, y: -45 },
  parryLow: { x: 14, y: -36 },
  lunge: { x: 25, y: -44 },
  hit: { x: 12, y: -42 },
}
// Blade angle in degrees: 0 is straight ahead, positive points up.
const ANGLE: Record<Pose, number> = { guard: 12, high: 42, low: -32, parryHigh: 72, parryLow: -66, lunge: 0, hit: 28 }
const WHITE = "#f4f4f4"
const SHADE = "#d4d4d8"

function Fencer({ x, facing, pose, sock, hair }: { x: number; facing: 1 | -1; pose: Pose; sock: string; hair?: boolean }) {
  const dx = pose === "lunge" ? 14 : pose === "hit" ? -6 : 0
  const hand = HAND[pose]
  const a = (ANGLE[pose] * Math.PI) / 180
  const tip = { x: hand.x + Math.cos(a) * 36, y: hand.y - Math.sin(a) * 36 }
  const lunge = pose === "lunge"
  return (
    <g transform={`translate(${x} 121) scale(${facing * 1.4} 1.4)`}>
      <g transform={`translate(${dx} 0)`}>
        {/* legs */}
        {lunge ? (
          <>
            <rect x="-15" y="-26" width="5" height="10" fill={WHITE} />
            <rect x="-21" y="-16" width="5" height="10" fill={WHITE} />
            <rect x="-24" y="-8" width="5" height="6" fill={sock} />
            <rect x="-28" y="-2" width="9" height="2" fill="#2a2a2a" />
            <rect x="3" y="-26" width="13" height="6" fill={WHITE} />
            <rect x="12" y="-20" width="5" height="8" fill={WHITE} />
            <rect x="12" y="-12" width="5" height="10" fill={sock} />
            <rect x="12" y="-2" width="11" height="2" fill="#2a2a2a" />
          </>
        ) : (
          <>
            <rect x="-14" y="-26" width="5" height="12" fill={WHITE} />
            <rect x="-16" y="-14" width="5" height="12" fill={sock} />
            <rect x="-19" y="-2" width="9" height="2" fill="#2a2a2a" />
            <rect x="2" y="-26" width="5" height="12" fill={WHITE} />
            <rect x="5" y="-14" width="5" height="12" fill={sock} />
            <rect x="5" y="-2" width="10" height="2" fill="#2a2a2a" />
          </>
        )}
        <rect x="-14" y="-30" width="21" height="6" fill={WHITE} />
        {/* torso and back arm */}
        <rect x="-8" y="-52" width="14" height="23" fill={WHITE} />
        <rect x="-8" y="-52" width="3" height="23" fill={SHADE} />
        {lunge ? (
          <rect x="-24" y="-46" width="16" height="4" fill={WHITE} />
        ) : (
          <>
            <rect x="-14" y="-50" width="7" height="4" fill={WHITE} />
            <rect x="-17" y="-62" width="4" height="13" fill={WHITE} />
          </>
        )}
        {/* mask */}
        {hair ? <rect x="-9" y="-62" width="5" height="9" fill="#1b1418" /> : null}
        <rect x="-4" y="-65" width="12" height="13" fill="#e2e2e6" />
        <rect x="3" y="-64" width="6" height="10" fill="#2b2b33" />
        <rect x="4" y="-62" width="1" height="6" fill="#4a4a55" />
        <rect x="6" y="-62" width="1" height="6" fill="#4a4a55" />
        <rect x="1" y="-53" width="8" height="3" fill={WHITE} />
        {/* weapon arm, guard, blade */}
        <line x1="4" y1="-47" x2={hand.x} y2={hand.y} stroke={WHITE} strokeWidth="5" strokeLinecap="square" shapeRendering="auto" />
        <line x1={hand.x} y1={hand.y} x2={tip.x} y2={tip.y} stroke="#dfe4ea" strokeWidth="1.6" shapeRendering="auto" />
        <rect x={tip.x - 1} y={tip.y - 1} width="2.4" height="2.4" fill="#8a8a8a" />
        <rect x={hand.x - 2} y={hand.y - 2} width="4" height="4" fill="#e8e8e8" />
        <rect x={hand.x + 1} y={hand.y - 5} width="3" height="10" fill="#9aa3ad" />
      </g>
    </g>
  )
}
