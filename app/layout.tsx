import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ELAINECRAFT · Elaine Hong",
  description:
    "Elaine Hong's portfolio as a Minecraft-inspired game: Cornell CS + Operations Research, software and ML engineering, research, and Division I fencing.",
  metadataBase: new URL("https://elaineh16.github.io"),
  openGraph: {
    title: "ELAINECRAFT · Elaine Hong",
    description: "Explore Elaine Hong's projects, journey, and links in a Minecraft-inspired portfolio.",
    url: "https://elaineh16.github.io",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1E1E24",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" />
        <link rel="preload" href="/fonts/monocraft.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
