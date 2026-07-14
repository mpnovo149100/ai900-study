// Validates the question DB (src/data/questions.json) before commit/deploy.
// Run with: npm run validate
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const CATEGORIES = ["ai-workloads", "machine-learning", "computer-vision", "nlp", "generative-ai"];
const TYPES = ["single", "multi", "truefalse"];
const DIFFICULTIES = ["easy", "medium", "hard"];

const data = JSON.parse(readFileSync(join(root, "src/data/questions.json"), "utf8"));
const errors = [];
const ids = new Set();

if (!Array.isArray(data)) {
  console.error("questions.json must be an array");
  process.exit(1);
}

for (const [i, q] of data.entries()) {
  const at = `#${i} (${q?.id ?? "no id"})`;
  if (!q.id) errors.push(`${at}: missing 'id'`);
  if (ids.has(q.id)) errors.push(`${at}: duplicate id`);
  ids.add(q.id);
  if (!CATEGORIES.includes(q.category)) errors.push(`${at}: invalid category '${q.category}'`);
  if (!DIFFICULTIES.includes(q.difficulty)) errors.push(`${at}: invalid difficulty '${q.difficulty}'`);
  if (!TYPES.includes(q.type)) errors.push(`${at}: invalid type '${q.type}'`);
  if (!q.subtopic) errors.push(`${at}: missing 'subtopic'`);
  if (!q.prompt) errors.push(`${at}: missing 'prompt'`);
  if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${at}: needs >=2 options`);
  const optIds = new Set((q.options ?? []).map((o) => o.id));
  if (!Array.isArray(q.correct) || q.correct.length === 0) errors.push(`${at}: missing 'correct'`);
  for (const c of q.correct ?? []) {
    if (!optIds.has(c)) errors.push(`${at}: correct '${c}' does not exist in options`);
  }
  if ((q.type === "single" || q.type === "truefalse") && (q.correct ?? []).length !== 1)
    errors.push(`${at}: type '${q.type}' must have exactly 1 correct answer`);
  if (!q.explanation) errors.push(`${at}: missing 'explanation'`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} error(s) in the DB:`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ ${data.length} valid questions.`);
