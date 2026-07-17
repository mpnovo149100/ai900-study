// Carrega os módulos de estudo (resumos) a partir de src/content/modules/*.md.
// Cada ficheiro tem um bloco de frontmatter simples + Markdown.

import { marked } from "marked";
import type { CategoryKey } from "../categories";

export interface StudyModule {
  slug: string; // nome do ficheiro sem .md
  title: string;
  order: number;
  categories: CategoryKey[];
  markdown: string; // corpo, sem frontmatter
  html: string; // markdown já renderizado
}

const VALID_CATEGORIES: CategoryKey[] = [
  "ai-workloads",
  "machine-learning",
  "computer-vision",
  "nlp",
  "generative-ai",
];

marked.setOptions({ gfm: true, breaks: false });

// Vite: importa o conteúdo bruto de todos os .md da pasta.
const RAW = import.meta.glob("../content/modules/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (key) meta[key] = val;
  }
  return { meta, body: m[2] };
}

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function firstHeading(body: string): string | null {
  const m = body.match(/^\s*#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function build(): StudyModule[] {
  const mods: StudyModule[] = [];
  for (const [path, raw] of Object.entries(RAW)) {
    const slug = slugFromPath(path);
    if (slug.toLowerCase() === "readme") continue; // README não é um módulo
    const { meta, body } = parseFrontmatter(raw);
    const categories = (meta.categories ?? "")
      .split(",")
      .map((c) => c.trim())
      .filter((c): c is CategoryKey => (VALID_CATEGORIES as string[]).includes(c));
    mods.push({
      slug,
      title: meta.title || firstHeading(body) || slug,
      order: Number(meta.order) || 999,
      categories,
      markdown: body,
      // tabelas largas fazem scroll dentro do próprio contentor (evita overflow da página)
      html: (marked.parse(body) as string)
        .replace(/<table>/g, '<div class="table-wrap"><table>')
        .replace(/<\/table>/g, "</table></div>"),
    });
  }
  return mods.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export const MODULES: StudyModule[] = build();

// Primeiro módulo que cobre uma dada categoria (para ligar erros do quiz ao estudo).
export function moduleForCategory(category: CategoryKey): StudyModule | undefined {
  return MODULES.find((m) => m.categories.includes(category));
}
