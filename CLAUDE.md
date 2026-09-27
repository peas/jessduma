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

## Phase: proposal (set/2026)
`/` is a landing for Jess comparing three directions; each has a floating switcher (`OpcaoBar`):
- `/a/` **Parede branca**: the brief to the letter, one page.
- `/b/` **Galeria**: gallery-site convention from the research (Mitre, Marcius Galan, Luana Vitra, Tauba
  Auerbach): close-up home, text index by series, one page per work (`/b/obras/<slug>/`, cm + inches,
  mailto inquiry), Bio e CV page.
- `/c/` **Matéria**: texture first: cover = portfolio cover crop, scroll-driven detail → whole work, loupe
  on hover, caption set like a medication leaflet ("Composição").
All pages are `noindex` (Base.astro) during this phase. Once she picks: the chosen option becomes `/`,
drop the others and `OpcaoBar`, remove noindex, set `site` (and drop `base`) in astro.config.mjs.

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
