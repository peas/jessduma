// Single source for every version of the site. Prose (bio, series texts, CV) lives in /textos as Markdown
// that Jess edits on GitHub; work data stays here. Texts and captions copied verbatim from
// Portfólio_JessDuma_2026.pdf (Canva export); images extracted by scripts/import-portfolio.py.
import type { ImageMetadata } from "astro";
import { paragrafos, cv, secao } from "../lib/textos";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/obras/*.jpg", { eager: true });

export function img(name: string): ImageMetadata {
  const hit = files[`../assets/obras/${name}.jpg`];
  if (!hit) throw new Error(`image not found: ${name}`);
  return hit.default;
}

export const artista = {
  nome: "Jess Duma",
  bio: paragrafos("bio"),
  // Statement under the cover; may contain *italic*.
  frase: paragrafos("frase").join(" "),
  instagram: "jessduma",
  // Jess vai criar um e-mail novo; trocar aqui quando existir.
  email: "jessduma.di@gmail.com",
  cidade: "São Paulo",
};

export type Obra = {
  slug: string;
  titulo: string;
  ano: number;
  serie: string;
  tecnica: string;
  dimensoes: string;
  formato?: string; // Díptico, Tríptico, Políptico
  principal: string; // image name
  detalhes: string[];
  vistas: { img: string; legenda: string }[];
};

export type Serie = {
  slug: string;
  nome: string;
  texto: string[];
  verbete?: string[]; // des.útil opens with a dictionary-style definition
  obras: Obra[];
};

const DM = "Drogas Modernas";
const DU = "des.útil";
const FR = "Fragmentos do que se é";

const o = (x: Partial<Obra> & Pick<Obra, "slug" | "titulo" | "ano" | "serie" | "tecnica" | "dimensoes">): Obra => ({
  principal: x.slug,
  detalhes: [],
  vistas: [],
  ...x,
});

const drogas: Obra[] = [
  o({ slug: "para-que-eu-sirva", titulo: "Para Que Eu Sirva", ano: 2026, serie: DM, tecnica: "Inox, alumínio, cianotipia, venlafaxina e resina", dimensoes: "47 x 27 x 17 cm", detalhes: ["para-que-eu-sirva-detalhe"] }),
  o({ slug: "saturacao-i", titulo: "Saturação por recaptação I", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, venlafaxina e resina", dimensoes: "30 x 10 cm cada", formato: "Políptico", detalhes: ["saturacao-i-detalhe", "capa-detalhe"], vistas: [{ img: "saturacao-i-vista", legenda: "Vista da exposição Virar as Voltas, São Paulo" }] }),
  o({ slug: "vigilia-mental", titulo: "Vigília Mental", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, cloridrato de lurasidona e resina", dimensoes: "30 x 30 cm", detalhes: ["vigilia-mental-detalhe"] }),
  o({ slug: "biopsia-do-grito", titulo: "Biópsia do Grito", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, cloridrato de lurasidona e resina", dimensoes: "30 x 30 cm", detalhes: ["biopsia-do-grito-detalhe"] }),
  o({ slug: "margem-de-transbordamento", titulo: "Margem de Transbordamento", ano: 2026, serie: DM, tecnica: "Inox, alumínio, cianotipia, venlafaxina e resina", dimensoes: "10 x 10 cm", detalhes: ["margem-de-transbordamento-detalhe"] }),
  o({ slug: "saturacao-ii", titulo: "Saturação por recaptação II", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, cloridrato de lurasidona e resina", dimensoes: "30 x 10 cm cada", formato: "Políptico", detalhes: ["saturacao-ii-detalhe"] }),
  o({ slug: "topografia-da-falha", titulo: "Topografia da falha", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, venlafaxina e resina", dimensoes: "20 x 20 cm", detalhes: ["topografia-da-falha-detalhe"], vistas: [{ img: "topografia-da-falha-vista", legenda: "Vista da exposição Virar as Voltas, São Paulo" }] }),
  o({ slug: "fissura-mundi", titulo: "Fissura mundi", ano: 2026, serie: DM, tecnica: "Alumínio, cianotipia, cloridrato de bupropiona e resina", dimensoes: "10 x 30 cm" }),
  ...[1, 2, 3, 4, 5, 6].map((n) =>
    o({ slug: `afinidade-d2-${n}`, titulo: `Afinidade D2-${n}`, ano: 2026, serie: DM, tecnica: n === 1 ? "Alumínio, cianotipia, cloridrato de bupropiona e resina" : "Alumínio, cianotipia, venlafaxina e resina", dimensoes: "5 x 5 cm cada", formato: "Díptico" }),
  ),
  o({ slug: "ratoeira", titulo: "Há uma ratoeira em casa!", ano: 2026, serie: DM, tecnica: "Alumínio e resina", dimensoes: "17 x 9 cm cada", formato: "Tríptico", detalhes: ["ratoeira-detalhe-1", "ratoeira-detalhe-2", "ratoeira-detalhe-3"], vistas: [{ img: "ratoeira-vista", legenda: "Vista da exposição Além do Nome, Além da Norma, Além da Forma, São Paulo" }] }),
  o({ slug: "peso-de-papel", titulo: "Peso de papel", ano: 2026, serie: DM, tecnica: "Cerâmica e bula de remédio resinada", dimensoes: "40 x 10 x 2 cm", detalhes: ["peso-de-papel-detalhe"] }),
  o({ slug: "um-para-dormir", titulo: "Um para dormir, outro para levantar", ano: 2025, serie: DM, tecnica: "Algodão e remédios", dimensoes: "10 x 50 x 1 cm", detalhes: ["um-para-dormir-detalhe-1", "um-para-dormir-detalhe-2"] }),
  o({ slug: "doses", titulo: "Doses", ano: 2024, serie: DM, tecnica: "Fotografias digitais", dimensoes: "40 x 30 cm cada", formato: "Tríptico", principal: "doses-1", detalhes: ["doses-2", "doses-3"] }),
];

const desutil: Obra[] = [
  o({ slug: "obsolescencia", titulo: "Obsolescência", ano: 2026, serie: DU, tecnica: "Peça de computador com foto em impressão fine art", dimensoes: "15 x 21 x 2 cm", detalhes: ["obsolescencia-detalhe"] }),
  o({ slug: "santo", titulo: "Santo", ano: 2025, serie: DU, tecnica: "Foto em papel Hahnemühle com oratório de madeira reaproveitado", dimensoes: "20 x 9 x 6,5 cm", detalhes: ["santo-detalhe-1", "santo-detalhe-2"] }),
  o({ slug: "familiar", titulo: "Familiar", ano: 2025, serie: DU, tecnica: "Foto em papel Hahnemühle com moldura de mdf reaproveitada", dimensoes: "57 x 47 x 2 cm", detalhes: ["familiar-detalhe"] }),
  o({ slug: "heranca", titulo: "Herança", ano: 2025, serie: DU, tecnica: "Foto em impressão fine art e encosto de cadeira", dimensoes: "38 x 43 x 5 cm", detalhes: ["heranca-detalhe-1", "heranca-detalhe-2"] }),
  o({ slug: "conforto", titulo: "Conforto", ano: 2025, serie: DU, tecnica: "Foto em impressão fine art e moldura em latão reaproveitada", dimensoes: "30 x 24 cm", detalhes: ["conforto-detalhe"] }),
];

const fragmentos: Obra[] = [
  o({ slug: "o-valor-da-presenca", titulo: "O valor da presença", ano: 2025, serie: FR, tecnica: "Impressão digital e agenda usada", dimensoes: "18 x 13,5 cm", formato: "Políptico", vistas: [{ img: "o-valor-da-presenca-vista", legenda: "Vista da exposição Salão Municipal de Artes Plásticas de Guaratinguetá, Guaratinguetá" }] }),
];

export const series: Serie[] = [
  {
    slug: "drogas-modernas",
    nome: DM,
    texto: paragrafos("drogas-modernas"),
    obras: drogas,
  },
  {
    slug: "des-util",
    nome: DU,
    verbete: [
      "des-: prefixo de origem latina, geralmente indica negação, oposição, separação, privação ou inversão de estado.",
      "útil: do latim utilis, que vem de uti (usar). O que serve para algum fim. Relacionado a função, valor prático.",
    ],
    texto: paragrafos("des-util"),
    obras: desutil,
  },
  {
    slug: "fragmentos-do-que-se-e",
    nome: FR,
    texto: paragrafos("fragmentos-do-que-se-e"),
    obras: fragmentos,
  },
];

export const todasObras = series.flatMap((s) => s.obras);

export function legenda(ob: Obra): string {
  const fmt = ob.formato ? ` (${ob.formato})` : "";
  return `${ob.tecnica}. ${ob.dimensoes}${fmt}.`;
}

const curriculo = cv();
export const exposicoes = secao(curriculo, "exposi");
export const formacao = secao(curriculo, "forma");
