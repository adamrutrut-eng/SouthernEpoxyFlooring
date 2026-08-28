# Southern Epoxy Flooring — southernepoxyflooring.com

High-end, scroll-driven marketing site for Southern Epoxy Flooring
(South Georgia & North Florida). Next.js 15 / React 19 / Framer Motion,
built as a **fully static site** — no server code, deploys anywhere.

## Stack

- **Next.js 15** (App Router, TypeScript, `output: 'export'` → static `out/`)
- **Framer Motion** for scroll-entrance animation
- **Canvas + JPEG frame scrubbing** for the hero (no `<video>` element, no
  scroll listeners — a `requestAnimationFrame` loop reads scroll position).
  Desktop gets 1920px landscape frames; phones get a portrait crop at full
  source height so cover-fit never stretches them soft.
- **Looping install b-roll** (`/work-loop.mp4|webm`) pinned dimly behind
  every section after the hero; paused off-screen, removed for
  reduced-motion visitors
- **Formspree quote form** — the form posts to Formspree once
  `formspreeId` is set in `content/business.json`; until then it opens the
  visitor's email app pre-filled (mailto), so it works with zero setup.
  A Calendly embed appears automatically if `calendlyUrl` is ever set.

## Content — edit these, not the components

| File | What it holds |
|---|---|
| `content/business.json` | Phone, emails, Formspree ID, service area, tagline, warranty |
| `content/reviews.json` | Real customer reviews (`[]` hides the section entirely) |
| `content/pricing.json` | The seven systems with real estimate ranges |
| `content/finishes.json` | Finish selector entries (name, file, blurb) |
| `content/spaces.json` | "Beyond the Garage" gallery entries |

**Never invent reviews, prices, phone numbers, or cities.** Fields still
containing `TODO` are automatically hidden or fall back gracefully.
`docs/original-site/` archives all 23 pages of the recovered original
site — the source for pricing, colors, and contact facts. Never delete it.

## Assets pipeline

Raw assets live in `assets-source/` (gitignored). To re-ingest after
replacing any of them:

```
node scripts/ingest-assets.mjs
```

Extracts both hero frame sets, copies media into `public/`, updates the
frame counts in `lib/heroFrames.ts`, and seeds (never overwrites)
`content/finishes.json` + `content/spaces.json`. Generated-asset download
links: `docs/ASSETS.md`.

## Develop

```
npm install
npm run dev     # http://localhost:3000
npm run build   # static export into out/
```

## Deploy (Netlify)

1. app.netlify.com → **Add new site → Import an existing project** →
   GitHub → pick this repo → Deploy. `netlify.toml` supplies the build
   command, the `out/` publish directory, and long-cache headers for the
   frame sequences — nothing to configure in the UI.
2. Quote form: create a form at formspree.io, then paste the form ID
   (the code after `/f/` in its endpoint) into `formspreeId` in
   `content/business.json` and push. Until then the form falls back to
   opening the visitor's mail app.
3. Site settings → **Domain management** → add `southernepoxyflooring.com`
   + `www`, then point GoDaddy DNS at the records Netlify shows.
   **Do not touch MX/TXT records — they carry the business email.**
