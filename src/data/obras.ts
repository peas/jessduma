// Single source for every version of the site. Texts and captions copied verbatim from
// Portfólio_JessDuma_2026.pdf (Canva export); images extracted by scripts/import-portfolio.py.
import type { ImageMetadata } from "astro";

const files = import.meta.glob<{ default: ImageMetadata }>("../assets/obras/*.jpg", { eager: true });

export function img(name: string): ImageMetadata {
  const hit = files[`../assets/obras/${name}.jpg`];
  if (!hit) throw new Error(`image not found: ${name}`);
  return hit.default;
}

export const artista = {
  nome: "Jess Duma",
  bio: "Jess Duma é artista visual não binárie, nascide no Paraná e residente em São Paulo. Encontrou na fotografia e nos objetos uma linguagem íntima de conexão com o mundo, desenvolvendo uma produção que nasce da observação das relações humanas e de processos de autoanálise. Sua pesquisa investiga temas como identidade, memória, afeto, saúde mental e pertencimento, partindo de vivências íntimas em constante diálogo com o coletivo. Sua prática mapeia os rastros das relações: entre corpos, espaços e o cotidiano.",
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
    texto: [
      "Na série Drogas Modernas, Jess Duma investiga os desdobramentos da psicofarmacologia no dia a dia, incorporando a fisicalidade dos remédios e dos metais à composição das obras. Com este conjunto de trabalhos, busca direcionar o olhar do público para além do diagnóstico clínico, propondo uma reflexão de caráter comunitário sobre como lidamos com a dor e com o corpo na sociedade atual.",
    ],
    obras: drogas,
  },
  {
    slug: "des-util",
    nome: DU,
    verbete: [
      "des-: prefixo de origem latina, geralmente indica negação, oposição, separação, privação ou inversão de estado.",
      "útil: do latim utilis, que vem de uti (usar). O que serve para algum fim. Relacionado a função, valor prático.",
    ],
    texto: [
      "A série parte da pergunta: o que nos resta dos nossos restos? Em caminhadas fotográficas por São Paulo, Jess Duma usa uma câmera Cybershot dos anos 2000 para registrar o lixo urbano, investigando-o como narrativa de consumo e obsolescência. Ao emoldurar as imagens com materiais encontrados no próprio descarte, propõe uma reflexão sobre como habitamos o mundo e a nossa relação com o que rejeitamos.",
    ],
    obras: desutil,
  },
  {
    slug: "fragmentos-do-que-se-e",
    nome: FR,
    texto: [
      "Esta série parte de agendas pessoais da infância e adolescência de Jess combinadas a registros cotidianos feitos com uma câmera dos anos 2000. Ao ativar esses arquivos íntimos, o trabalho apresenta o tempo como sobreposição de camadas, deslocando a importância para além dos grandes marcos históricos.",
      "As imagens, impressas em impressora doméstica, resgatam o hábito de colar, escrever e acumular lembranças. Entre afetos e traumas, o trabalho propõe um deslocamento da ideia de propósito, afirmando o existir como gesto suficiente. O cotidiano deixa de ser intervalo e se revela essência: uma memória que não monumentaliza, mas sustenta um legado íntimo e contínuo.",
    ],
    obras: fragmentos,
  },
];

export const todasObras = series.flatMap((s) => s.obras);

export function legenda(ob: Obra): string {
  const fmt = ob.formato ? ` (${ob.formato})` : "";
  return `${ob.tecnica}. ${ob.dimensoes}${fmt}.`;
}

export const exposicoes = [
  { ano: 2026, titulo: "Virar as Voltas", local: "Canteiro Arte Contemporânea, São Paulo" },
  { ano: 2026, titulo: "Além do Nome, Além da Norma, Além da Forma", local: "Ateliê Casarão, São Paulo" },
  { ano: 2026, titulo: "101 Janelas para Ver o Mundo", local: "Ateliê Casarão, São Paulo" },
  { ano: 2025, titulo: "Imagens para Adiar o Fim do Mundo COP30", local: "Museu da UFPA, Belém" },
  { ano: 2025, titulo: "Salão Municipal de Artes Plásticas de Guaratinguetá", local: "Guaratinguetá" },
  { ano: 2025, titulo: "Sítio Onírico", local: "Canteiro Arte Contemporânea, São Paulo" },
  { ano: 2024, titulo: "Janela em Movimento", local: "Espaço Casulo, São Paulo" },
];

export const formacao = [
  { ano: 2026, titulo: "Grupo de Desenvolvimento Artístico com Marina Frúgoli e Letícia Castro", local: "Marieta, São Paulo" },
  { ano: 2026, titulo: "Ateliê de Arte e Psicanálise com Flavia Corpas e Marcela Schwab", local: "Canteiro, São Paulo" },
  { ano: 2025, titulo: "Projetos Culturais", local: "Instituto Arlequim, São Paulo" },
  { ano: 2025, titulo: "Escrita Criativa: Técnicas e Práticas", local: "PUCRS" },
  { ano: 2011, titulo: "Design de Interiores", local: "UNICURITIBA, Curitiba" },
];
