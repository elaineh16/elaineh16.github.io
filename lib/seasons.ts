// Seasons recolour the pixelated campus photo (public/backgrounds/campus.png).
// Fall shows the photo's own colours; the others swap foliage, grass and sky tones.

export type Season = "spring" | "summer" | "fall" | "winter"

export const SEASON_LIST: [Season, string][] = [
  ["spring", "Spring"],
  ["summer", "Summer"],
  ["fall", "Fall"],
  ["winter", "Winter"],
]

export const WEATHER: Record<Season, { label: string; p1: string; p2: string }> = {
  spring: { label: "Petals", p1: "#E6A4B4", p2: "#f7d3dc" },
  summer: { label: "Leaves", p1: "#9cd36b", p2: "#c8ec9f" },
  fall: { label: "Falling leaves", p1: "#d9682b", p2: "#B31B1B" },
  winter: { label: "Snow", p1: "#ffffff", p2: "#dfe8f3" },
}

const RECOLOR: Partial<Record<Season, { leaf: string[]; grass: string[]; sky: [number, number, number] }>> = {
  spring: { leaf: ["#b45a78", "#d27c98", "#e9a3b8", "#f7c9d6"], grass: ["#4f8a34", "#68a443", "#82bb57", "#9fd06f"], sky: [214, 230, 247] },
  summer: { leaf: ["#244f1b", "#336b25", "#4a8a33", "#66a846"], grass: ["#3f7f27", "#539a33", "#69b043", "#82c457"], sky: [168, 204, 240] },
  winter: { leaf: ["#8e9aa9", "#aeb9c7", "#ccd5e0", "#e9eef4"], grass: ["#b9c5d3", "#cfd8e3", "#e2e8ef", "#f4f7fb"], sky: [214, 222, 232] },
}

export function currentSeason(date = new Date()): Season {
  const m = date.getMonth()
  if (m >= 2 && m <= 4) return "spring"
  if (m >= 5 && m <= 7) return "summer"
  if (m >= 8 && m <= 10) return "fall"
  return "winter"
}

function hsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  const l = (mx + mn) / 2
  const d = mx - mn
  let h = 0
  let s = 0
  if (d) {
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
    h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
    h *= 60
  }
  return [h, s, l]
}

const hex = (h: string): [number, number, number] => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
const tone = (pal: string[], l: number) => hex(pal[Math.max(0, Math.min(3, Math.floor((l - 0.12) / 0.16)))])

export function paintSeason(canvas: HTMLCanvasElement, img: HTMLImageElement, season: Season) {
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.drawImage(img, 0, 0)
  const R = RECOLOR[season]
  if (!R) return
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = data.data
  for (let i = 0; i < d.length; i += 4) {
    const [h, s, l] = hsl(d[i], d[i + 1], d[i + 2])
    const row = Math.floor(i / 4 / canvas.width)
    const warm = h <= 58 || h >= 330
    let out: [number, number, number] | null = null
    if (row < canvas.height * 0.4 && l > 0.55) {
      const k = Math.min(1.08, 0.82 + (l - 0.55) * 0.6)
      out = [Math.min(255, Math.round(R.sky[0] * k)), Math.min(255, Math.round(R.sky[1] * k)), Math.min(255, Math.round(R.sky[2] * k))]
    } else if (season === "winter" && warm && l <= 0.2) {
      out = [66, 60, 60]
    } else if (warm && l <= 0.2 && s > 0.2) {
      const dk = hex(R.leaf[0])
      out = [Math.round(dk[0] * 0.55), Math.round(dk[1] * 0.55), Math.round(dk[2] * 0.55)]
    } else if (h > 58 && h <= 160 && s > 0.2) {
      out = tone(R.grass, l)
    } else if (warm && s > (season === "winter" ? 0.3 : 0.42) && l > 0.2) {
      out = tone(R.leaf, l)
    }
    if (out) {
      d[i] = out[0]
      d[i + 1] = out[1]
      d[i + 2] = out[2]
    }
  }
  ctx.putImageData(data, 0, 0)
}
