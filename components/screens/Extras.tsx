"use client"

import { useEffect, useState } from "react"
/* eslint-disable @next/next/no-img-element */
import { LASTFM, PHOTOS } from "@/data/content"
import { Dialog } from "@/components/game/primitives"

/* ---------------- Camera: photo gallery ---------------- */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)
  const photo = open === null ? null : PHOTOS[open]
  return (
    <>
      <div className="gallery">
        {PHOTOS.map((p, i) => (
          <button key={p.src} type="button" className="polaroid" onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption}`}>
            <img src={p.thumb} alt={p.alt} loading="lazy" />
            <span>{p.caption}</span>
          </button>
        ))}
      </div>
      {photo ? (
        <Dialog title={photo.caption} onClose={() => setOpen(null)}>
          <div className="lightbox">
            <img src={photo.src} alt={photo.alt} />
            <div className="lightbox-nav">
              <button type="button" className="mc-btn small" onClick={() => setOpen((open! + PHOTOS.length - 1) % PHOTOS.length)}>
                ← Previous
              </button>
              <span className="vt">
                {open! + 1} / {PHOTOS.length}
              </span>
              <button type="button" className="mc-btn small" onClick={() => setOpen((open! + 1) % PHOTOS.length)}>
                Next →
              </button>
            </div>
          </div>
        </Dialog>
      ) : null}
    </>
  )
}

/* ---------------- Music disc: top tracks this week (Last.fm) ---------------- */
interface Track {
  name: string
  artist: string
  plays: number
}

type State = { kind: "off" } | { kind: "loading" } | { kind: "error" } | { kind: "ok"; tracks: Track[] }

export function TopTracks() {
  const [state, setState] = useState<State>(LASTFM.user && LASTFM.apiKey ? { kind: "loading" } : { kind: "off" })

  useEffect(() => {
    if (!LASTFM.user || !LASTFM.apiKey) return
    const url =
      "https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&period=7day&limit=5&format=json" +
      `&user=${encodeURIComponent(LASTFM.user)}&api_key=${encodeURIComponent(LASTFM.apiKey)}`
    let alive = true
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        const list = (json?.toptracks?.track ?? []) as { name: string; artist: { name: string }; playcount: string }[]
        if (alive) setState({ kind: "ok", tracks: list.map((t) => ({ name: t.name, artist: t.artist?.name ?? "", plays: Number(t.playcount) || 0 })) })
      })
      .catch(() => alive && setState({ kind: "error" }))
    return () => {
      alive = false
    }
  }, [])

  if (state.kind === "off") return <p className="jukebox-note">Live top tracks coming soon.</p>
  if (state.kind === "loading") return <p className="jukebox-note">Loading this week's tracks…</p>
  if (state.kind === "error") return <p className="jukebox-note">Couldn't reach Last.fm right now. Try again later.</p>
  if (!state.tracks.length) return <p className="jukebox-note">Nothing played yet this week.</p>
  return (
    <ol className="jukebox">
      {state.tracks.map((t, i) => (
        <li key={`${t.artist}-${t.name}`}>
          <span className="rank">{i + 1}</span>
          <span className="track">
            <a href={`https://open.spotify.com/search/${encodeURIComponent(`${t.name} ${t.artist}`)}`} target="_blank" rel="noreferrer">
              {t.name}
            </a>
            <span>{t.artist}</span>
          </span>
          <span className="plays">{t.plays} plays</span>
        </li>
      ))}
    </ol>
  )
}
