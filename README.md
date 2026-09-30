# HYLIOX — templates landing page

Single-page dark landing built with React 18, Vite 6, TypeScript, Tailwind CSS 3, GSAP (ScrollTrigger), Framer Motion and hls.js.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # typecheck + production build to dist/
npm run preview
```

## Configuration

| Env var | Purpose |
| --- | --- |
| `VITE_HERO_HLS_URL` | `.m3u8` playlist for the hero background. Empty = gradient poster only (hls.js is then tree-shaken out entirely). |

## Where things live

- `tailwind.config.js` — design tokens (colors, type scale, spacing, radius).
- `src/data/content.ts` — all copy: templates, steps, stats, testimonials, tiers, FAQ.
- `index.html` — the 3s monogram loader and its critical CSS (painted before JS).
- `src/lib/loader.ts` — loader timing; skipped for reduced motion and repeat visits in the same tab.
- `src/lib/gsap.ts` — GSAP is lazy-loaded; `src/hooks/useReveal.ts` handles scroll reveals.

## Before launch

- **Testimonials and stats are placeholders.** Replace with real, attributable ones.
- Template thumbnails are vector stand-ins. Swap in real screenshots as `<picture>` with AVIF/WebP sources and `loading="lazy"`.
- Pricing CTAs point at `#checkout-*` placeholders; the FAQ refund policy and licence wording are draft copy.
