# Southern Epoxy Flooring — southernepoxyflooring.com

High-end, scroll-driven marketing site for Southern Epoxy Flooring (Georgia).
Next.js 15 / React 19 / Framer Motion. The hero is a canvas that scrubs
through JPEG frames of a video as you scroll — the finished floor pulls apart
into its five engineered layers.

## Stack

- **Next.js 15** (App Router, TypeScript)
- **Framer Motion** for scroll-entrance animation
- **Canvas + JPEG frame scrubbing** for the hero (no `<video>` element, no
  scroll listeners — a `requestAnimationFrame` loop reads scroll position)
- **Calendly inline embed** for estimate bookings (primary conversion path)
- **Optional quote form** → `/api/quote` (nodemailer). It renders only when
  `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` are set; otherwise
  Calendly stands alone.

## Content — edit these, not the components

| File | What it holds |
|---|---|
| `content/business.json` | Name, phone, email, Calendly URL, service cities, warranty |
| `content/reviews.json` | Real customer reviews (`[]` hides the section entirely) |
| `content/pricing.json` | Tier cards; `hasPrices: false` shows them without prices |
| `content/finishes.json` | Finish selector entries (name, file, blurb) |

**Never invent reviews, prices, phone numbers, or cities.** Fields still
containing `TODO` are automatically hidden on the site.

## Assets pipeline

Raw assets live in `assets-source/` (gitignored):

```
assets-source/
  hero.mp4          # 12s scroll-scrub hero video
  finishes/*.jpg    # same garage, different floor finishes
```

Then run:

```
node scripts/ingest-assets.mjs
```

which extracts `public/frames/frame_XXXX.jpg` (24fps, 1920px, JPEG q3),
copies `public/hero.mp4` and `public/finishes/`, rewrites `FRAME_COUNT` in
`lib/heroFrames.ts`, and regenerates `content/finishes.json`.

## Develop

```
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Deploy (Vercel)

1. Import this repo at vercel.com → Deploy (zero config).
2. Optional quote form: Settings → Environment Variables → add the four
   `SMTP_*` vars → redeploy. Secrets go **only** there and in `.env.local`
   locally — never in a committed file.
3. Settings → Domains → add `southernepoxyflooring.com` + `www`, then point
   GoDaddy DNS at the records Vercel shows. **Do not touch MX/TXT records —
   they carry the business email.**
