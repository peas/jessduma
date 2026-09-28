# CLAUDE.md — jessduma

Portfolio site for **Jess Duma**, a visual artist (São Paulo, born in Paraná). Paulo Silveira hosts and
builds it as a favor; Jess reviews it in rounds and Paulo relays the feedback. Astro 7 + GitHub Pages
(`peas/jessduma`, served at https://peas.github.io/jessduma/ until a domain is chosen).

## Who Jess is (read before writing any text)
- **Jess is non-binary** ("artista visual não binárie, nascide no Paraná"). Use neutral language in every
  text: "Jess", "a pessoa artista", constructions without gender. The portfolio PDF says "o artista" in the
  series texts; the site rewrote those as neutral forms, pending Jess's confirmation.
- Never make up facts, exhibitions, prices or quotes. Texts come verbatim from the portfolio PDF.

## Brief (Jess's audios, 27/09/2026)
Clean and chic; white background like a gallery wall; focus on the work photos. Fonts: **Anton** (name,
titles) + **Hagrid Text** (body; paid Zetafonts font, stand-in = Hanken Grotesk until there is a web
license). Colors: gray, white, black as the base, and a deep "galactic" blue for details (`--azul`
`#14215c`). Order: name, bio, trajectory (exhibitions + training), series (Drogas Modernas has priority
over des.útil), a Galeria Mitre-style close-up detail image, contacts. One page is fine. Materials: stainless
steel, aluminum, cyanotype, resin, psychiatric medication; future: brass. "I need to appeal to rich people."
Her one reference: readymag.website/u458517943/alissacica/ (macro detail next to the whole work).

## Phase: Jess chose A (2026-09-27, audio 21:20)
`/` is now Opção A with her changes: cover = Biópsia do Grito close-up (the one from B) with "JESS DUMA"
in black Anton on one line and the work title beside it; B's menu (Obras · Bio e CV · Contato), bio and
CV at the end; the phrase from C ("Sua prática mapeia os rastros das relações...") as the statement.
She complained the fonts were missing: they load, but only Anton + the Hagrid stand-in may appear on her
site (no Instrument Sans), and Anton is preloaded in Base.astro to avoid a fallback flash on mobile.
- `/propostas/` keeps the three-option comparison; `/a/` redirects to `/`; `/b/` and `/c/` stay online
  (reversible) with the floating `OpcaoBar`. Delete them once the site is final.
- Still `noindex` (Base.astro) until she approves the final version; then remove it and set `site`
  (dropping `base`) in astro.config.mjs when there is a domain.

## Data
- `src/data/obras.ts` is the single source: bio, series, works, exhibitions, training. Every page reads it.
- Photos: `src/assets/obras/*.jpg`, extracted from the portfolio PDF by
  `python3 scripts/import-portfolio.py <pdf>` (mapping page/index -> name inside the script; `--help`).
  Astro builds the responsive webp versions (`Foto.astro`). New portfolio = update MAP and rerun.
- All internal links go through `u()` in `src/lib/url.ts` (base path `/jessduma/`).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`. Push to `main` deploys (`.github/workflows/deploy.yml`).

## Open questions for Jess (also listed on `/`)
Chosen detail photo for the highlight; new e-mail (placeholder is jessduma.di@gmail.com); phone on the site
or not (left out); Hagrid Text web license; English version; domain; neutral wording of the series texts.
