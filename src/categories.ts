// Official AI-900 (Azure AI Fundamentals) exam domains, with the indicative exam
// weight. The "keys" are used in the DB (questions.json) `category` field.
export type CategoryKey =
  | "ai-workloads"
  | "machine-learning"
  | "computer-vision"
  | "nlp"
  | "generative-ai";

export interface Category {
  key: CategoryKey;
  label: string;
  weight: string; // indicative exam weight
  color: string; // accent color for this domain
}

export const CATEGORIES: Category[] = [
  { key: "ai-workloads", label: "AI workloads and considerations", weight: "15–20%", color: "#8b5cf6" },
  { key: "machine-learning", label: "Machine Learning on Azure", weight: "15–20%", color: "#10b981" },
  { key: "computer-vision", label: "Computer Vision", weight: "15–20%", color: "#f59e0b" },
  { key: "nlp", label: "Natural Language Processing (NLP)", weight: "15–20%", color: "#ec4899" },
  { key: "generative-ai", label: "Generative AI", weight: "20–25%", color: "#3b82f6" },
];

export const CATEGORY_LABEL: Record<CategoryKey, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.label])
) as Record<CategoryKey, string>;

export const CATEGORY_COLOR: Record<CategoryKey, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.key, c.color])
) as Record<CategoryKey, string>;

export type Difficulty = "easy" | "medium" | "hard";

export const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  easy: "#30a46c",
  medium: "#f5a524",
  hard: "#e5484d",
};
