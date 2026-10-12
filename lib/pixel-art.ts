// Original pixel art for ELAINECRAFT, drawn from character maps.
// Each map row is a string; each character is a colour key in its palette ('.' = transparent).

export type IconName =
  | "laptop" | "knight" | "redstone" | "disc" | "book" | "chart" | "epee" | "coffee" | "passport"
  | "medal" | "paper" | "mail" | "stone" | "sign" | "map" | "camera" | "cards"
  | "cod" | "salmon" | "matcha" | "banana" | "nametag" | "banner" | "chip" | "compass" | "stew" | "violin" | "boot" | "disc2" | "maple" | "goldepee" | "puffer" | "hat" | "ramen" | "git" | "heart" | "cookie" | "blackcoffee"

type PixelMap = [rows: string[], palette: Record<string, string>]

export const ICONS: Record<IconName, PixelMap> = {
  laptop: [["..........", ".GGGGGGGG.", ".GBBBBBBG.", ".GBCCBBBG.", ".GBBBCCBG.", ".GBCBBBBG.", ".GGGGGGGG.", "GGGGGGGGGG", "gggggggggg", ".........."], { G: "#9aa3ad", B: "#1e2a3a", C: "#6fe3c1", g: "#5e656e" }],
  knight: [["..........", "...KK.....", "..KKKK....", ".KKWKKK...", ".KKKKKKK..", "....KKKK..", "...KKKK...", "..KKKKKK..", ".KKKKKKKK.", ".kkkkkkkk."], { K: "#2b2b33", W: "#e6e6e6", k: "#55555f" }],
  redstone: [["..........", "....R.....", "...RrR..R.", "..RRRRR.r.", ".R.RrRR...", "...RRRR.R.", "..R.rRR...", ".....R..R.", "..R.......", ".........."], { R: "#e02a2a", r: "#8f1010" }],
  disc: [["...DDDD...", ".DDDDDDDD.", ".DDLLLLDD.", "DDLLPPLLDD", "DDLPOOPLDD", "DDLPOOPLDD", "DDLLPPLLDD", ".DDLLLLDD.", ".DDDDDDDD.", "...DDDD..."], { D: "#1f1f26", L: "#3a3a46", P: "#E6A4B4", O: "#F5E9D4" }],
  book: [["..........", ".BBBBBBBB.", ".BbPPPPPB.", ".BbPPPPPB.", ".BbPllPPB.", ".BbPPPPPB.", ".BbPllPPB.", ".BbPPPPPB.", ".BBBBBBBB.", ".........."], { B: "#7a4a2a", b: "#5a3318", P: "#F5E9D4", l: "#8b8b8b" }],
  chart: [["..........", "........Y.", ".......YY.", "......Y...", "..Y..Y....", ".Y.YY.....", "Y.........", "GGGGGGGGGG", "G.G.G.G.G.", ".........."], { Y: "#f2c94c", G: "#4f7342" }],
  epee: [[".........S", "........S.", ".......S..", "......S...", ".....S....", "..ggS.....", "..gGg.....", ".H.gg.....", "H.........", ".........."], { S: "#e8edf3", G: "#b5862a", g: "#d6a531", H: "#4a2f1f" }],
  coffee: [["..........", "...w.w....", "....w.w...", ".CCCCCC...", ".CBBBBCCC.", ".CBBBBC.C.", ".CBBBBCCC.", ".CBBBBC...", "..CCCC....", ".........."], { C: "#c9b48a", B: "#6b3e22", w: "#b0b0b0" }],
  passport: [["..........", "..NNNNNN..", "..NNNNNN..", "..NNYYNN..", "..NYNNYN..", "..NNYYNN..", "..NNNNNN..", "..NYYYYN..", "..NNNNNN..", ".........."], { N: "#2d3f6b", Y: "#f2c94c" }],
  medal: [["..R....R..", "...R..R...", "....RR....", "...YYYY...", "..YYWYYY..", "..YWYYYY..", "..YYYYYY..", "...YYYY...", "..........", ".........."], { R: "#B31B1B", Y: "#f2c94c", W: "#fff6c2" }],
  paper: [["..PPPPP...", "..PllPPP..", "..PPPPPP..", "..PllllP..", "..PPPPPP..", "..PllllP..", "..PPPPPP..", "..PllllP..", "..PPPPPP..", ".........."], { P: "#F5E9D4", l: "#8b8b8b" }],
  mail: [["..........", "..........", "EEEEEEEEEE", "EWEEEEEEWE", "EEWEEEEWEE", "EEEWEEWEEE", "EEEEWWEEEE", "EEEEEEEEEE", "EEEEEEEEEE", ".........."], { E: "#F5E9D4", W: "#B31B1B" }],
  stone: [["SSSSDSSSSL", "SDDSSSDDSS", "SSSDSLSSDS", "LSSSSSSSSS", "SSDDSSDSSS", "SSSSSSDDSL", "SDSSLSSSSS", "SDDSSSSDSS", "SSSSDDSSSS", "LSSSSSSSLS"], { S: "#8b8b8b", D: "#5e5e5e", L: "#b0b0b0" }],
  sign: [["..........", "WWWWWWWWWW", "WllllllllW", "WWWWWWWWWW", "WlllllWWWW", "WWWWWWWWWW", "....ww....", "....ww....", "....ww....", ".........."], { W: "#b08a52", l: "#6b4f2a", w: "#6b4f2a" }],
  map: [["MMMMMMMMMM", "MggMMMbbMM", "MgggMbbbMM", "MMgMMMbMRM", "MMMMMMMMMM", "MbbMMggMMM", "MbbbMgggMM", "MMMRMMMMMM", "MMMMMMMMMM", "MMMMMMMMMM"], { M: "#e8d9b5", g: "#6B9255", b: "#7fa7c9", R: "#B31B1B" }],
  camera: [["..........", "..........", "...KKK....", ".KKKKKKKK.", ".KGGGGGGK.", ".KGWWWGGK.", ".KGWBWGGK.", ".KGWWWGGK.", ".KKKKKKKK.", ".........."], { K: "#2b2b33", G: "#6f6f6f", W: "#d0d0d0", B: "#1e2a3a" }],
  cards: [["..........", ".WWWW.....", ".WRWWW....", ".WWWWWW...", ".WWRRWWW..", "..WWWWWW..", "...WWRWW..", "....WWWW..", "..........", ".........."], { W: "#F5E9D4", R: "#B31B1B" }],
  cod: [["..........", "..........", "...TTTT...", "..TttttT.T", ".TtEttttTT", ".TttttttTT", "..TttttT.T", "...TTTT...", "..........", ".........."], { T: "#8a6a48", t: "#c9a77c", E: "#222222" }],
  salmon: [["..........", "..........", "...SSSS...", "..SssssS.S", ".SsEssssSS", ".SssssssSS", "..SssssS.S", "...SSSS...", "..........", ".........."], { S: "#a3412e", s: "#e0876a", E: "#222222" }],
  matcha: [["..........", "...w..w...", "....w..w..", ".CCCCCCC..", ".CGGGGGCCC", ".CGgGGGC.C", ".CGGGgGCCC", ".CGGGGGC..", "..CCCCC...", ".........."], { C: "#F5E9D4", G: "#7fae4a", g: "#a8cf6f", w: "#e0e0e0" }],
  banana: [["..........", "........S.", ".......YY.", "......YYY.", ".....YYY..", "...YYYY...", ".YYYYY....", "YYYyy.....", ".yy.......", ".........."], { Y: "#f2d24c", y: "#c9a227", S: "#6b4f2a" }],
  nametag: [["..........", ".s........", "..s.......", "..TTTTTTT.", ".TTttttTT.", ".TtTTTTtT.", ".TTttttTT.", "..TTTTTTT.", "..........", ".........."], { T: "#c9b48a", t: "#8b7a5a", s: "#9a9a9a" }],
  banner: [["BBBBBBBBBB", ".RRRRRRRR.", ".RRWWWWRR.", ".RWRRRRWR.", ".RRWWWWRR.", ".RRRRRRRR.", ".RRRRRRRR.", "..RRRRRR..", "...RRRR...", "....RR...."], { B: "#6b4f2a", R: "#B31B1B", W: "#F5E9D4" }],
  chip: [["...RRRR...", ".RRWRRWRR.", ".RRRRRRRR.", "RWRRWWRRWR", "RRRWRRWRRR", "RRRWRRWRRR", "RWRRWWRRWR", ".RRRRRRRR.", ".RRWRRWRR.", "...RRRR..."], { R: "#2d5fb5", W: "#F5E9D4" }],
  compass: [["..GGGGGG..", ".GddddddG.", "GdddRRdddG", "GddRRddddG", "GddddWWddG", "GdddddWWdG", ".GddddddG.", "..GGGGGG..", "..........", ".........."], { G: "#9aa3ad", d: "#3a3a46", R: "#e02a2a", W: "#e8edf3" }],
  stew: [["..........", "..........", "...r..b...", ".BBrBBbBB.", "BbbbbbbbbB", ".BbbbbbbB.", "..BBBBBB..", "...BBBB...", "..........", ".........."], { B: "#7a4a2a", b: "#c98b4a", r: "#c43a3a" }],
  violin: [["........k.", ".......k..", "......B...", ".....B....", "..OOOB....", ".OoooO....", "OooOoO....", "OoooOO....", ".OooO.....", "..OO......"], { O: "#7a3f1a", o: "#b5652a", B: "#2b2b33", k: "#e0e0e0" }],
  boot: [["..........", "...LLLL...", "...LllL...", "...LllL...", "...LllL...", "...LllLLL.", "..LlllllL.", "..LLLLLLLL", "..........", ".........."], { L: "#5a3a22", l: "#8a5a32" }],
  disc2: [["...DDDD...", ".DDDDDDDD.", ".DDLLLLDD.", "DDLLPPLLDD", "DDLPOOPLDD", "DDLPOOPLDD", "DDLLPPLLDD", ".DDLLLLDD.", ".DDDDDDDD.", "...DDDD..."], { D: "#1f1f26", L: "#3a3a46", P: "#4aa3e0", O: "#F5E9D4" }],
  maple: [["....R.....", "...RRR....", ".R.RRR.R..", ".RRRRRRR..", "RRRRRRRRR.", ".RRRRRRR..", "..RRRRR...", ".R.RRR.R..", "....R.....", "....r....."], { R: "#d52b1e", r: "#7a1c12" }],
  puffer: [["...s.s.s..", "..sYYYYYs.", ".sYYYYYYYs", "TYYoYYYWEY", "TTYYYYYYYm", "TYYoYYoYYY", ".sYYYYYYYs", "..sYYYYYs.", "...s.s.s..", ".........."], { Y: "#e8c43a", o: "#c9862a", s: "#f6efb8", W: "#ffffff", E: "#222222", m: "#8a5a1a", T: "#c9862a" }],
  hat: [["..........", "..........", "...KKKK...", "..KKKKKK..", "..KKKKKK..", "..kkkkkk..", "KKKKKKKKKK", ".KKKKKKKK.", "..........", ".........."], { K: "#1f1f22", k: "#4a4a52" }],
  ramen: [["........c.", ".......c..", "......c...", ".NNWWNcNN.", "RNWYYWNNNR", "RRRRRRRRRR", ".RrrrrrrR.", "..RRRRRR..", "...RRRR...", ".........."], { N: "#f2d48a", W: "#fafafa", Y: "#f2a71c", R: "#c43a3a", r: "#8f2525", c: "#b5864a" }],
  git: [[".DDDDDDDD.", "DDDDDDDDDD", "DDWWDDDWWD", "DDWWDDDWWD", "DDDWDDDWDD", "DDDWDDWDDD", "DDDWWWDDDD", "DDWWDDDDDD", "DDWWDDDDDD", ".DDDDDDDD."], { D: "#24292f", W: "#f0f6fc" }],
  heart: [["..........", ".RRR..RRR.", "RRwRRRRRRR", "RwRRRRRRRR", "RRRRRRRRRR", ".RRRRRRRr.", "..RRRRRr..", "...RRRr...", "....Rr....", ".........."], { R: "#e0365c", r: "#a8203f", w: "#ffd0dc" }],
  cookie: [["..........", "..........", "....TTTT..", "..TTttttT.", ".TtttttttT", ".TttttWttT", ".TtttTTttT", ".TttT..TtT", "..TT....T.", ".........."], { T: "#a8702e", t: "#e0b26a", W: "#fffaf0" }],
  blackcoffee: [["......zzzz", "........z.", ".......z..", "......zzzz", ".kkkkkk...", ".KBBBBKKK.", ".KBbBBK.K.", ".KBBBBKKK.", ".KKKKKK...", "..KKKK...."], { K: "#3a3a44", k: "#6a6a78", B: "#1c120c", b: "#3a2618", z: "#c9d8ea" }],
  goldepee: [[".........S", "........S.", ".......S..", "......S...", ".....S....", "..ggS.....", "..gGg.....", ".H.gg.....", "H.........", ".........."], { S: "#ffe27a", G: "#b5862a", g: "#f2c94c", H: "#8a5a1a" }],
}

const spriteRows = [
  "....HHHHHHHH....", "...HHHHHHHHHH...", "...HHHHHHHHHH...", "...HHSSSSSSHH...", "...HSSSSSSSSH...", "...HSEESSEESH...",
  "...HSSSSSSSSH...", "...HSSSMMSSSH...", "...HHSSSSSSHH...", "..HHHHsSSsHHHH..", "..HHRRRRRRRRHH..", ".RRHHRRWWRRHHRR.",
  ".RRHHRRWWRRHHRR.", ".RRHHRRRRRRHHRR.", ".RrHRRRRRRRRHrR.", ".RrRRRRRRRRRRrR.", ".RrRRRRRRRRRRrR.", ".WWRRRRRRRRRRWW.",
  ".SSWWWWWWWWWWSS.", "...PPPPPPPPPP...", "...PPPPpPPPPP...", "...PPPPpPPPPP...", "...PPPPpPPPPP...", "...PPPPpPPPPP...",
  "...PPPPpPPPPP...", "...PPPPpPPPPP...", "...PPPPpPPPPP...", "...PPPPpPPPPP...", "...KKKKkKKKKK...", "..KKKKKkKKKKKK..",
  "..kkkkk.kkkkkk..", "................",
].map((row, i) => (i >= 1 && i <= 16 ? row.slice(0, 15) + "B" : i === 17 || i === 18 ? row.slice(0, 15) + "g" : row))

export const SPRITE: PixelMap = [
  spriteRows,
  { H: "#1b1418", S: "#f1c9a5", s: "#d9a784", E: "#2a1d22", M: "#c46a6a", R: "#B31B1B", r: "#7f1212", W: "#F5E9D4", P: "#1f1f26", p: "#33333d", K: "#eeeeee", k: "#9a9a9a", B: "#dfe4ea", g: "#d6a531" },
]

export function drawPixelMap(canvas: HTMLCanvasElement, [rows, palette]: PixelMap) {
  const w = rows[0].length
  const h = rows.length
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)
  rows.forEach((row, y) => {
    for (let x = 0; x < w; x++) {
      const colour = palette[row.charAt(x)]
      if (colour) {
        ctx.fillStyle = colour
        ctx.fillRect(x, y, 1, 1)
      }
    }
  })
}

// Chunky stone block letters for the title, with a 3D base and black outline.
const GLYPHS: Record<string, string[]> = {
  E: ["######", "######", "##....", "#####.", "#####.", "##....", "######", "######"],
  L: ["##....", "##....", "##....", "##....", "##....", "##....", "######", "######"],
  A: [".####.", "######", "##..##", "##..##", "######", "######", "##..##", "##..##"],
  I: ["####", "####", ".##.", ".##.", ".##.", ".##.", "####", "####"],
  N: ["##..##", "###.##", "######", "######", "##.###", "##..##", "##..##", "##..##"],
  C: [".#####", "######", "##....", "##....", "##....", "##....", "######", ".#####"],
  R: ["#####.", "######", "##..##", "######", "#####.", "##.##.", "##..##", "##..##"],
  F: ["######", "######", "##....", "#####.", "#####.", "##....", "##....", "##...."],
  T: ["######", "######", "..##..", "..##..", "..##..", "..##..", "..##..", "..##.."],
  H: ["##..##", "##..##", "##..##", "######", "######", "##..##", "##..##", "##..##"],
  O: [".####.", "######", "##..##", "##..##", "##..##", "##..##", "######", ".####."],
  G: [".#####", "######", "##....", "##.###", "##.###", "##..##", "######", ".#####"],
  " ": ["..", "..", "..", "..", "..", "..", "..", ".."],
}

export function drawBlockLogo(canvas: HTMLCanvasElement, word: string) {
  const H = 8
  const grid: boolean[][] = Array.from({ length: H }, () => [])
  let width = 0
  word.split("").forEach((ch, i) => {
    const glyph = GLYPHS[ch]
    if (!glyph) return
    const w = glyph[0].length
    for (let y = 0; y < H; y++) for (let x = 0; x < w; x++) grid[y][width + x] = glyph[y].charAt(x) === "#"
    width += w + (i < word.length - 1 ? 1 : 0)
  })
  const C = 5
  const pad = 4
  const ext = 10
  canvas.width = width * C + pad * 2
  canvas.height = H * C + pad * 2 + ext
  const ctx = canvas.getContext("2d")
  if (!ctx) return
  let seed = 9
  const rnd = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const on = (x: number, y: number) => y >= 0 && y < H && !!grid[y][x]
  const cells: [number, number][] = []
  for (let y = 0; y < H; y++) for (let x = 0; x < width; x++) if (grid[y][x]) cells.push([x, y])

  ctx.fillStyle = "#0e0e10"
  cells.forEach(([x, y]) => ctx.fillRect(pad + x * C - 2, pad + y * C - 2, C + 4, C + 4 + ext))
  cells.forEach(([x, y]) => {
    for (let k = 1; k <= ext; k++) {
      ctx.fillStyle = k <= 3 ? "#55555b" : k <= 7 ? "#43434a" : "#35353b"
      ctx.fillRect(pad + x * C, pad + y * C + k, C, C)
    }
  })
  const stone = [176, 160, 190, 148, 168, 204]
  cells.forEach(([x, y]) => {
    const ox = pad + x * C
    const oy = pad + y * C
    const lift = 1.12 - (y / H) * 0.22
    for (let sy = 0; sy < C; sy++) {
      for (let sx = 0; sx < C; sx++) {
        let v = stone[Math.floor(rnd() * stone.length)] * lift
        let tint = 0
        if (sy === 0 && !on(x, y - 1)) v = 236
        else if (sx === 0 && !on(x - 1, y)) v = 214
        else if (sy === C - 1 && !on(x, y + 1)) { v = 104; tint = 4 }
        else if (sx === C - 1 && !on(x + 1, y)) { v = 122; tint = 4 }
        const g = Math.min(255, v | 0)
        ctx.fillStyle = `rgb(${g},${g},${Math.min(255, g + tint)})`
        ctx.fillRect(ox + sx, oy + sy, 1, 1)
      }
    }
  })
}

// ---- Salute animation frames (20×32: the 16-wide sprite with 2 columns of room each side) ----
export type SpriteFrame = "idle" | "front" | "up" | "down" | "lookleft" | "waveA" | "waveB"

function frameRows(kind: SpriteFrame, base: string[] = spriteRows): string[] {
  // Start from the sprite without its épée (blade column and guard).
  const g = base.map((row, i) => {
    let r = row.split("")
    if (i >= 1 && i <= 18) r[15] = "."
    return ".." + r.join("") + ".."
  }).map((r) => r.split(""))
  const set = (row: number, col: number, ch: string) => {
    if (row >= 0 && row < g.length && col + 2 >= 0 && col + 2 < 20) g[row][col + 2] = ch
  }
  // Eyes: glancing sideways while idle, looking at you otherwise.
  // Eyes: "idle" glances right, "lookleft" glances left, the rest look at you.
  if (kind === "idle") {
    "SSEESSEE".split("").forEach((ch, k) => set(5, 4 + k, ch))
  }
  if (kind === "lookleft") {
    "EESSEESS".split("").forEach((ch, k) => set(5, 4 + k, ch))
  }
  if (kind === "waveA" || kind === "waveB") {
    // Free arm (viewer's left) raised beside her head, hand tipping out (A) and in (B).
    for (let r = 13; r <= 18; r++) {
      set(r, 0, ".")
      set(r, 1, ".")
      set(r, 2, ".")
    }
    // Sleeve colour matches the outfit: red tee, or the white fencing jacket.
    const [sl, sd, cf] = base === spriteRows ? ["R", "r", "W"] : ["J", "j", "L"]
    set(12, 1, sl); set(12, 2, sd)
    for (let r = 7; r <= 11; r++) {
      set(r, -1, sl)
      set(r, 0, sd)
    }
    // Smile while waving: mouth corners up, a curve underneath.
    set(7, 7, "S"); set(7, 8, "S")
    set(7, 6, "M"); set(7, 9, "M")
    set(8, 7, "M"); set(8, 8, "M")
    if (kind === "waveA") {
      // Hand tipped outward.
      set(6, -2, cf); set(6, -1, cf)
      set(5, -2, "S"); set(5, -1, "S")
      set(4, -2, "S"); set(4, -1, "s")
    } else {
      // Hand tipped inward, a little higher.
      set(6, -1, cf); set(6, 0, cf)
      set(5, 0, "S"); set(5, 1, "S")
      set(4, 0, "S"); set(4, 1, "S")
      set(3, 1, "s")
    }
  }
  if (kind === "idle" || kind === "front" || kind === "lookleft" || kind === "waveA" || kind === "waveB") {
    for (let r = 1; r <= 16; r++) set(r, 15, "B")
    set(17, 15, "g")
    set(18, 15, "g")
  }
  if (kind === "up") {
    // Guard to the chin, blade straight up in front of the face.
    for (let r = 13; r <= 18; r++) {
      set(r, 13, ".")
      set(r, 14, ".")
    }
    set(12, 13, "R"); set(12, 14, "r")
    set(11, 12, "R"); set(11, 13, "R")
    set(10, 11, "R"); set(10, 12, "R")
    set(9, 10, "W"); set(9, 11, "W")
    set(9, 9, "S"); set(8, 9, "S")
    set(8, 7, "g"); set(8, 8, "g"); set(8, 10, "g")
    for (let r = 0; r <= 7; r++) set(r, 8, "B")
  }
  if (kind === "down") {
    // Arm out, blade swept down towards the floor.
    set(18, 15, "g"); set(19, 15, "g"); set(19, 14, "g")
    ;[[20, 16], [21, 16], [22, 16], [23, 17], [24, 17], [25, 17]].forEach(([r, c]) => set(r, c, "B"))
  }
  return g.map((r) => r.join(""))
}

/** The same frame with eyes closed (eye pixels become eyelid shade). */
export function blinkFrame([rows, palette]: PixelMap): PixelMap {
  return [rows.map((r) => r.replace(/E/g, "s")), palette]
}

/* Fencing outfit: white jacket and knickers, red-and-white socks, mask tucked under her arm. */
const fencingRows = [
  ...spriteRows.slice(0, 9).map((r) => r.slice(0, 15) + "."),
  "..HHHHsSSsHHHH..", "..HHJJJJJJJJHH..", ".JJHHJJjJJJHHJJ.", ".JJHHJJjJJJHHJJ.", "XxXHHJJjJJJHHJJ.", "xXxHJJJjJJJJHjJ.",
  "XxXJJJJjJJJJJjJ.", "LLLJJJJjJJJJJjJ.", ".jjJJJJJJJJJJjj.", ".SSjjjjjjjjjjLL.", "...JJJJJJJJJJ...", "...JJJJjJJJJJ...",
  "...JJJJjJJJJJ...", "...JJJJjJJJJJ...", "...JJJJ.JJJJJ...", "...OOOO.OOOOO...", "...JJJJ.JJJJJ...", "...OOOO.OOOOO...",
  "...OOOO.OOOOO...", "...KKKKkKKKKK...", "..KKKKKkKKKKKK..", "..kkkkk.kkkkkk..", "................",
].map((row, i) => (i >= 1 && i <= 16 ? row.slice(0, 15) + "B" : i === 17 || i === 18 ? row.slice(0, 15) + "g" : row))

export type Outfit = "casual" | "fencing"
const FENCING_PALETTE = { ...SPRITE[1], J: "#f4f4f4", j: "#d0d0d6", X: "#2b2b33", x: "#55555f", L: "#e4e4e8", O: "#B31B1B" }
const FRAME_KINDS: SpriteFrame[] = ["idle", "lookleft", "front", "up", "down", "waveA", "waveB"]
export const SPRITE_FRAMES_FENCING = Object.fromEntries(FRAME_KINDS.map((k) => [k, [frameRows(k, fencingRows), FENCING_PALETTE] as PixelMap])) as unknown as Record<SpriteFrame, PixelMap>

export const SPRITE_FRAMES: Record<SpriteFrame, PixelMap> = {
  idle: [frameRows("idle"), SPRITE[1]],
  lookleft: [frameRows("lookleft"), SPRITE[1]],
  front: [frameRows("front"), SPRITE[1]],
  up: [frameRows("up"), SPRITE[1]],
  down: [frameRows("down"), SPRITE[1]],
  waveA: [frameRows("waveA"), SPRITE[1]],
  waveB: [frameRows("waveB"), SPRITE[1]],
}
