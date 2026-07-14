import type { Question } from "../types";

/** Verdadeiro se o conjunto escolhido é exatamente igual ao conjunto correto. */
export function isCorrect(question: Question, chosen: string[]): boolean {
  const a = [...chosen].sort();
  const b = [...question.correct].sort();
  return a.length === b.length && a.every((v, i) => v === b[i]);
}
