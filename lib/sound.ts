// A soft menu click, synthesised with the Web Audio API (no audio files are shipped).

let ctx: AudioContext | null = null

export function playClick() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = ctx || new AC()
    if (ctx.state === "suspended") void ctx.resume()
    const t = ctx.currentTime + 0.005
    const sr = ctx.sampleRate

    const out = ctx.createGain()
    out.gain.value = 0.5
    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 2200
    lp.Q.value = 0.5
    out.connect(lp)
    lp.connect(ctx.destination)

    // Short, soft tick
    const len = Math.floor(sr * 0.012)
    const buf = ctx.createBuffer(1, len, sr)
    const data = buf.getChannelData(0)
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3)
    const src = ctx.createBufferSource()
    src.buffer = buf
    const bp = ctx.createBiquadFilter()
    bp.type = "bandpass"
    bp.frequency.value = 1600
    bp.Q.value = 0.8
    const ng = ctx.createGain()
    ng.gain.value = 0.22
    src.connect(bp)
    bp.connect(ng)
    ng.connect(out)
    src.start(t)

    // Hollow body of the click
    const partials: [number, number, number, number][] = [
      [880, 600, 0.26, 0.05],
      [440, 360, 0.2, 0.045],
    ]
    for (const [f0, f1, peak, dur] of partials) {
      const o = ctx.createOscillator()
      o.type = "triangle"
      o.frequency.setValueAtTime(f0, t)
      o.frequency.exponentialRampToValueAtTime(f1, t + dur)
      const g = ctx.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(peak, t + 0.004)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g)
      g.connect(out)
      o.start(t)
      o.stop(t + dur + 0.01)
    }
  } catch {
    // Audio is optional; ignore browsers that refuse it.
  }
}

// A short, soft three-note chime for achievement toasts.
export function playJingle() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = ctx || new AC()
    if (ctx.state === "suspended") void ctx.resume()
    const t0 = ctx.currentTime + 0.02
    const out = ctx.createGain()
    out.gain.value = 0.18
    out.connect(ctx.destination)
    ;[659.25, 830.61, 987.77].forEach((f, i) => {
      const t = t0 + i * 0.09
      const o = ctx!.createOscillator()
      o.type = "square"
      o.frequency.value = f
      const lp = ctx!.createBiquadFilter()
      lp.type = "lowpass"
      lp.frequency.value = 2400
      const g = ctx!.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.01)
      g.gain.exponentialRampToValueAtTime(0.0001, t + (i === 2 ? 0.35 : 0.12))
      o.connect(lp)
      lp.connect(g)
      g.connect(out)
      o.start(t)
      o.stop(t + 0.4)
    })
  } catch {
    // Audio is optional.
  }
}

// A bright two-note "pop" when a recipe crafts.
export function playCraft() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = ctx || new AC()
    if (ctx.state === "suspended") void ctx.resume()
    const t0 = ctx.currentTime + 0.01
    const out = ctx.createGain()
    out.gain.value = 0.16
    out.connect(ctx.destination)
    ;[523.25, 783.99].forEach((f, i) => {
      const t = t0 + i * 0.07
      const o = ctx!.createOscillator()
      o.type = "triangle"
      o.frequency.value = f
      const g = ctx!.createGain()
      g.gain.setValueAtTime(0.0001, t)
      g.gain.exponentialRampToValueAtTime(0.9, t + 0.008)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
      o.connect(g)
      g.connect(out)
      o.start(t)
      o.stop(t + 0.2)
    })
  } catch {
    // Audio is optional.
  }
}

// A low "thunk" when a combination doesn't craft anything.
export function playNope() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    ctx = ctx || new AC()
    const t = ctx.currentTime + 0.01
    const o = ctx.createOscillator()
    o.type = "square"
    o.frequency.setValueAtTime(180, t)
    o.frequency.exponentialRampToValueAtTime(110, t + 0.12)
    const lp = ctx.createBiquadFilter()
    lp.type = "lowpass"
    lp.frequency.value = 900
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14)
    o.connect(lp)
    lp.connect(g)
    g.connect(ctx.destination)
    o.start(t)
    o.stop(t + 0.16)
  } catch {
    // Audio is optional.
  }
}
