# ELAINECRAFT

Elaine Hong's personal site as a Minecraft-inspired game: a title screen over a pixelated Cornell campus view that changes with the seasons, and menus that open each part of the portfolio.

Live at **https://elaineh16.github.io**

## Screens

| Menu | What's there |
|---|---|
| Singleplayer | About me, character, personal inventory |
| Inventory | Projects (with category filters) and skills |
| Advancements | Builder / Scholar / Athlete journey trees |
| Realms | "Currently" panel and scrapbook |
| Multiplayer | LinkedIn, GitHub, email, résumé |
| Options | Season, weather, sound, achievements |
| Quick View | One-page plain summary for recruiters |

Each screen has its own link (`/#inventory`, `/#advancements`, …), and the browser back button works.

## Editing content

All text, projects, links and stories live in **`data/content.ts`**. Anything still marked `[TODO …]` shows in a muted colour on the site so it's easy to find and fill in.

- Pixel art (icons, character, title logo): `lib/pixel-art.ts`
- Season colours for the background: `lib/seasons.ts`
- Background image: `public/backgrounds/campus.png` (128×128 pixelated). Replace it with your own photo for the public site.
- Click sound (synthesised, no audio files): `lib/sound.ts`

## Development

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
```

Pushing to `main` deploys to GitHub Pages through `.github/workflows/nextjs.yml`.

## Credits

- Font: [Monocraft](https://github.com/IdreesInc/Monocraft) by Idrees Hassan, SIL Open Font License 1.1 (`public/fonts/Monocraft-OFL.txt`).
- Inspired by Minecraft. Not affiliated with Mojang or Microsoft. All art is original.
