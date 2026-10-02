// Reads the editable texts in /textos (plain Markdown so Jess can edit them on GitHub; see textos/README.md).
// Deliberately tiny: paragraphs, *italic*, and the "- year — title — place" lines of cv.md. Anything
// malformed fails the build with a message that names the file, so the live site keeps the last good version.
const arquivos = import.meta.glob<string>("../../textos/*.md", { query: "?raw", import: "default", eager: true });

function ler(nome: string): string {
  const txt = arquivos[`../../textos/${nome}.md`];
  if (txt === undefined) throw new Error(`textos/${nome}.md não encontrado`);
  return txt.replace(/<!--[\s\S]*?-->/g, "").trim();
}

/** Paragraphs separated by blank lines; line breaks inside a paragraph become spaces. */
export function paragrafos(nome: string): string[] {
  return ler(nome).split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
}

/** Escapes HTML and turns *text* into <em>text</em>. Output goes into set:html. */
export function inline(t: string): string {
  const esc = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return esc.replace(/\*(.+?)\*/g, "<em>$1</em>");
}

/** Removes the *italic* markers, for places that render plain text. */
export function semMarcas(t: string): string {
  return t.replace(/\*(.+?)\*/g, "$1");
}

export type Item = { ano: number; titulo: string; local: string };

// Separator between year, title and place: an em/en dash or hyphen with spaces around it.
const SEP = /\s+[—–-]\s+/;

/** cv.md: "## <section>" headings followed by "- 2026 — Title — Place" lines (place is optional). */
export function cv(): Record<string, Item[]> {
  const secoes: Record<string, Item[]> = {};
  let atual: Item[] | null = null;
  ler("cv").split("\n").forEach((linha, i) => {
    const l = linha.trim();
    if (!l) return;
    if (l.startsWith("#")) {
      atual = secoes[l.replace(/^#+\s*/, "").toLowerCase()] = [];
      return;
    }
    const m = l.match(/^[-*]\s*(\d{4})\s*[—–-]\s*(.+)$/);
    if (!m || !atual) throw new Error(`textos/cv.md, linha ${i + 1}: esperado "- 2026 — Título — Local", veio "${l}"`);
    const partes = m[2].split(SEP);
    const local = partes.length > 1 ? partes.pop()! : "";
    atual.push({ ano: Number(m[1]), titulo: partes.join(" — "), local });
  });
  return secoes;
}

/** The section whose heading starts with `prefixo` (so "Exposições" or "Exposições coletivas" both work). */
export function secao(secoes: Record<string, Item[]>, prefixo: string): Item[] {
  const chave = Object.keys(secoes).find((k) => k.startsWith(prefixo));
  if (!chave) throw new Error(`textos/cv.md: falta a seção "## ${prefixo}..."`);
  return secoes[chave];
}
