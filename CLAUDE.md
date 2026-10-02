# CLAUDE.md — jessduma

Portfolio site for **Jess Duma**, a visual artist (São Paulo, born in Paraná). Paulo Silveira hosts and
builds it as a favor; Jess reviews it in rounds and Paulo relays the feedback. Astro 7 + GitHub Pages
(`peas/jessduma`, custom domain https://jessduma.com.br since 2026-10-02; `public/CNAME`). DNS lives in
Registro.br (Jess's account), not in the 46graus panel (her old photography site builder).

## Who Jess is (read before writing any text)
- **Feminine wording on the site** (Paulo, 2026-10-02: "tirar o linguajar neutro e deixar no feminino").
  The portfolio PDF says "não binárie, nascide" in the bio and "o artista" in the series texts; the site uses
  "não binária, nascida" and "a artista". Earlier rounds (until 2026-10-01) used neutral language.
- Never make up facts, exhibitions, prices or quotes. Texts come verbatim from the portfolio PDF.

## Brief (Jess's audios, 27/09/2026)
Clean and chic; white background like a gallery wall; focus on the work photos. Fonts: **Anton** (name,
titles) + **Aileron** (body and contact info; public domain, @fontsource/aileron). She first asked for
Hagrid Text (paid) and switched to Aileron on 2026-09-28. Colors: gray, white, black as the base, and a deep "galactic" blue for details (`--azul`
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
- Indexed since 2026-10-02. Base.astro sets canonical, Open Graph (the cover at 1200px), JSON-LD Person,
  and `noindex` only on the proposal pages (`/a/ /b/ /c/ /propostas/`), which the sitemap
  (@astrojs/sitemap) also filters out. `public/robots.txt` points to the sitemap.

Round 2 (2026-09-28): cover back to the C cover (dark macro, white name); text and contact info in
Aileron (contact ~half the old size, the "Contato" label stays Anton); series titles black, line-height
1.02; "2014 Artista visual multidisciplinar autodidata" removed from the CV. The cover photo is the
portfolio cover (strips of a Saturação polyptych, I or II not confirmed), so its caption only names the series.

## Data
- `src/data/obras.ts` is the single source every page reads. Its prose comes from **`textos/*.md`** (bio, statement
  phrase, series texts, `cv.md` with exhibitions/training), plain Markdown so Jess can edit on GitHub without
  touching code (`textos/README.md` is her guide, in Portuguese). Parsed by `src/lib/textos.ts`: paragraphs,
  `*italic*`, and `- year — title — place` lines; malformed input fails the build with the file and line.
  Work data (titles, technique, sizes, photos) stays in `obras.ts`. Option for later: Sveltia CMS on `/admin`.
- Photos: `src/assets/obras/*.jpg`, extracted from the portfolio PDF by
  `python3 scripts/import-portfolio.py <pdf>` (mapping page/index -> name inside the script; `--help`).
  Astro builds the responsive webp versions (`Foto.astro`). New portfolio = update MAP and rerun.
- All internal links go through `u()` in `src/lib/url.ts` (base path is `/` on the custom domain).

## Commands
- `npm run dev` / `npm run build` / `npm run preview`. Push to `main` deploys (`.github/workflows/deploy.yml`).

## Open questions for Jess (also listed on `/`)
Chosen detail photo for the highlight; new e-mail (placeholder is jessduma.di@gmail.com); phone on the site
or not (left out); English version.
