// Fencing Duel: a ladder of rivals, each faster and trickier than the last.
// window   ms you have to parry once the attack shows
// riposte  ms you have to riposte after a good parry
// feint    chance the attack starts in one line and switches to the other
// hint     show an arrow with the attack (early rounds only)

export interface Rival {
  rung: string
  name: string
  blurb: string
  sock: string
  window: number
  riposte: number
  feint: number
  hint: boolean
}

export const RIVALS: Rival[] = [
  { rung: "Pool", name: "Club Fencer", blurb: "Telegraphs everything. A good warm-up.", sock: "#4aa3e0", window: 1300, riposte: 1100, feint: 0, hint: true },
  { rung: "Table of 64", name: "Varsity Fencer", blurb: "A little quicker, and every so often throws a feint.", sock: "#3f9a4a", window: 1100, riposte: 950, feint: 0.12, hint: true },
  { rung: "Table of 16", name: "National Hopeful", blurb: "Fast hands. Don't parry until you're sure.", sock: "#e0a32a", window: 920, riposte: 820, feint: 0.22, hint: true },
  { rung: "Semifinal", name: "World Cup Fencer", blurb: "No more arrows. Read the blade.", sock: "#8a4ad9", window: 780, riposte: 720, feint: 0.3, hint: false },
  { rung: "Final", name: "Olympian", blurb: "The fastest on the circuit. Win this and keep defending the title.", sock: "#1f1f26", window: 660, riposte: 640, feint: 0.38, hint: false },
]

export const TOUCHES_TO_WIN = 3

/** How long a feint shows its first line before switching (ms). */
export const FEINT_SWITCH = 380

/** Each title defence after winning the Final speeds the Olympian up a little. */
export function rivalFor(rung: number, defences: number): Rival {
  const r = RIVALS[Math.min(rung, RIVALS.length - 1)]
  if (rung < RIVALS.length - 1 || defences === 0) return r
  const k = Math.pow(0.94, defences)
  return { ...r, window: Math.max(420, Math.round(r.window * k)), riposte: Math.max(450, Math.round(r.riposte * k)), feint: Math.min(0.5, r.feint + defences * 0.03) }
}
