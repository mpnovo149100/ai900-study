// Progresso do utilizador guardado em localStorage (por dispositivo).
// A DB de perguntas vive no git; o progresso é pessoal e não é commitado.

export interface QuestionStat {
  seen: number;
  correct: number;
  wrong: number;
  lastCorrect: boolean;
  lastAt: string; // ISO
}

export type Progress = Record<string, QuestionStat>;

const KEY = "ai900:progress:v1";

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function saveProgress(p: Progress): void {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function recordAnswer(
  p: Progress,
  questionId: string,
  correct: boolean,
  now: string
): Progress {
  const prev = p[questionId] ?? {
    seen: 0,
    correct: 0,
    wrong: 0,
    lastCorrect: false,
    lastAt: now,
  };
  const next: QuestionStat = {
    seen: prev.seen + 1,
    correct: prev.correct + (correct ? 1 : 0),
    wrong: prev.wrong + (correct ? 0 : 1),
    lastCorrect: correct,
    lastAt: now,
  };
  return { ...p, [questionId]: next };
}

export function resetProgress(): Progress {
  localStorage.removeItem(KEY);
  return {};
}
