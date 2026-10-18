import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Loader } from "@/components/game/Loader"

export const metadata: Metadata = {
  title: "Elaine Hong - Elaine's Craft",
  description:
    "Elaine Hong's portfolio as a Minecraft-inspired game: Cornell CS + Operations Research, software and ML engineering, research, and Division I fencing.",
  metadataBase: new URL("https://elaineh16.github.io"),
  openGraph: {
    title: "Elaine Hong - Elaine's Craft",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/monocraft.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <Loader />
        {children}
      </body>
    </html>
  )
}
