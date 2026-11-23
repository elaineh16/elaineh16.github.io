import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Elaine Hong",
  description:
    "Elaine Hong: Cornell Computer Science + Operations Research, Class of 2028. Software engineering, ML evaluation, optimization research, and Division I fencing.",
  metadataBase: new URL("https://elaineh16.github.io"),
  openGraph: {
    title: "Elaine Hong",
    description: "Cornell CS + ORIE '28. Software engineering, ML evaluation, optimization research and Division I fencing.",
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
        {children}
      </body>
    </html>
  )
}
