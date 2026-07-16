#!/usr/bin/env node
// Polir um resumo (ex.: exportado do Word) num módulo de estudo Markdown,
// usando a OpenAI. CORRE LOCALMENTE — precisa de OPENAI_API_KEY no ambiente.
// O site é estático, por isso a AI nunca é chamada no browser: só aqui.
//
// Uso:
//   export OPENAI_API_KEY=sk-...
//   npm run polish -- <ficheiro-entrada> [categorias] [--title "Título"] [--order N] [-o saida.md]
//
// Exemplos:
//   npm run polish -- notas.md computer-vision
//   npm run polish -- notas.txt "nlp,generative-ai" --title "Speech" --order 4
//
// Por omissão, escreve em src/content/modules/<slug>.md (slug a partir do título).

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o";
const OUT_DIR = "src/content/modules";

function parseArgs(argv) {
  const args = { positionals: [], title: "", order: "", out: "" };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--title") args.title = argv[++i] ?? "";
    else if (a === "--order") args.order = argv[++i] ?? "";
    else if (a === "-o" || a === "--out") args.out = argv[++i] ?? "";
    else args.positionals.push(a);
  }
  return args;
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const { positionals, title, order, out } = parseArgs(process.argv.slice(2));
  const [inputPath, categories = ""] = positionals;

  if (!inputPath) {
    console.error("Uso: npm run polish -- <ficheiro> [categorias] [--title T] [--order N] [-o saida.md]");
    process.exit(1);
  }
  if (!process.env.OPENAI_API_KEY) {
    console.error("Falta OPENAI_API_KEY no ambiente. Ex.: export OPENAI_API_KEY=sk-...");
    process.exit(1);
  }
  if (!existsSync(inputPath)) {
    console.error(`Ficheiro não encontrado: ${inputPath}`);
    process.exit(1);
  }

  const rawText = readFileSync(inputPath, "utf8");

  const system =
    "You are a study-notes editor for the Microsoft AI-900 / AI-901 exam. " +
    "Rewrite the user's raw notes into a clean, well-structured Markdown study module. " +
    "Rules: keep ALL factual content and add nothing invented; use clear headings (##), " +
    "concise bullet points, and Markdown tables where it helps; bold key terms; " +
    "keep it exam-focused and skimmable. Output ONLY the Markdown body (no frontmatter, no code fences).";

  const body = await callOpenAI(system, rawText);

  const finalTitle = title || firstHeading(body) || slugify(inputPath).replace(/-/g, " ");
  const slug = slugify(finalTitle);
  const front = [
    "---",
    `title: ${finalTitle}`,
    order ? `order: ${order}` : "order: 999",
    categories ? `categories: ${categories.split(",").map((c) => c.trim()).join(", ")}` : "categories:",
    "---",
    "",
  ].join("\n");

  const outPath = out || resolve(OUT_DIR, `${slug}.md`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, front + body.trim() + "\n");
  console.log(`✓ Módulo escrito em ${outPath}`);
}

function firstHeading(md) {
  const m = md.match(/^\s*#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

async function callOpenAI(system, user) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI API ${res.status}: ${txt}`);
  }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Resposta da OpenAI sem conteúdo.");
  return content.replace(/^```(?:markdown|md)?\s*\n?|\n?```\s*$/g, "");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
