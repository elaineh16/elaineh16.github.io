"use client"

import { FEATURED, HOME_ITEMS, MENU, PROFILE, type HomeItem, type ScreenId } from "@/data/content"
import { Logo, Slot, Sprite } from "@/components/game/primitives"

const heart = (
  <svg width="16" height="14" viewBox="0 0 8 7" shapeRendering="crispEdges" aria-hidden="true">
    <path d="M1 0h2v1h2V0h2v1h1v3H7v1H6v1H5v1H3V6H2V5H1V4H0V1h1z" fill="#B31B1B" />
    <path d="M1 1h1v1H1z" fill="#ff8a8a" />
  </svg>
)

export function Home({
  go,
  splash,
  spinning,
  onTitle,
  onItem,
}: {
  go: (s: ScreenId) => void
  splash: string
  spinning: boolean
  onTitle: () => void
  onItem: (item: HomeItem) => void
}) {
  return (
    <section aria-label="Title screen" className="stack-32">
      <header className="head">
        <div className="title-wrap">
          <h1 style={{ margin: 0 }}>
            <button type="button" className={"title" + (spinning ? " spin" : "")} onClick={onTitle} aria-label="ELAINECRAFT">
              <Logo word="ELAINECRAFT" />
            </button>
          </h1>
          <span className="splash" aria-hidden="true">
            {splash}
          </span>
        </div>
      </header>

      <div className="home-row">
        <section className="col-left" aria-labelledby="pdat">
          <div className="win" style={{ paddingBottom: 16 }}>
            <div className="grass" />
            <div className="dirt" />
            <div style={{ padding: "14px 18px 0", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <h2 id="pdat" className="px" style={{ margin: 0, fontSize: 17, color: "var(--ink)" }}>
                  PLAYER.DAT
                </h2>
                <span className="vt online">
                  <span aria-hidden="true" className="online-dot" />
                  Online
                </span>
              </div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div className="sprite-box" style={{ padding: "8px 10px" }}>
                  <Sprite scale={5} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                  <span className="px" style={{ fontSize: 18, color: "var(--ink)" }}>
                    {PROFILE.name}
                  </span>
                  <span className="vt" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--wine)", display: "flex", flexDirection: "column" }}>
                    {PROFILE.classes.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </span>
                  <span role="img" aria-label="Health: full" style={{ display: "flex", gap: 3, marginTop: 2 }}>
                    {heart}
                    {heart}
                    {heart}
                    {heart}
                    {heart}
                  </span>
                </div>
              </div>
              <dl className="stats">
                {PROFILE.stats.map(([k, v]) => (
                  <div key={k} style={{ display: "contents" }}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <nav className="col-menu" aria-label="Main menu">
          {MENU.map((m) => (
            <button key={m.screen} type="button" className="mc-btn" onClick={() => go(m.screen)}>
              <span>{m.label}</span>
              <span className="sub">{m.sub}</span>
            </button>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            <button type="button" className="mc-btn small" onClick={() => go("options")}>
              Options…
            </button>
            <button type="button" className="mc-btn small" onClick={() => go("quick")}>
              Quick View
            </button>
          </div>
        </nav>

        <section className="col-right win" aria-labelledby="cinv">
          <h2 id="cinv" className="px" style={{ margin: "0 0 4px", fontSize: 18, color: "var(--ink)" }}>
            Creative Inventory
          </h2>
          <p className="vt" style={{ margin: "0 0 12px", fontSize: 15, color: "#4a4a4a" }}>
            Hover an item. Click to open.
          </p>
          <div className="inv3">
            {HOME_ITEMS.map((it) => (
              <Slot key={it.key} icon={it.icon} label={it.name} tip={{ t1: it.name, t2: it.type, t3: it.line }} onClick={() => onItem(it)} />
            ))}
          </div>
          <div style={{ marginTop: 16, borderTop: "2px solid var(--slot)", paddingTop: 12 }}>
            <h3 className="vt" style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 400, color: "#4a4a4a" }}>
              FEATURED BUILDS
            </h3>
            <ul className="featured">
              {FEATURED.map(([n, r]) => (
                <li key={n}>
                  <span style={{ fontWeight: 600 }}>{n}</span>
                  <span style={{ color: "var(--wine)" }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  )
}
