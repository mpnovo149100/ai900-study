import type { CategoryKey, Difficulty } from "./categories";

export type QuestionType = "single" | "multi" | "truefalse";

export interface Option {
  id: string; // "a", "b", "c"...
  text: string;
}

export interface Question {
  id: string; // "q001"
  category: CategoryKey;
  difficulty: Difficulty; // "easy" | "medium" | "hard"
  subtopic: string; // fine-grained topic, e.g. "OCR", "Prompt engineering"
  type: QuestionType;
  prompt: string;
  options: Option[];
  correct: string[]; // ids das opções corretas (1 para single/truefalse, N para multi)
  explanation: string;
  source?: string;
}
