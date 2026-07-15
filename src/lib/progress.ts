// Progresso do utilizador guardado em localStorage, por PERFIL (por dispositivo).
// Cada perfil tem a sua própria chave: `ai900:progress:v1:<profileId>`.
// A DB de perguntas vive no git; o progresso é pessoal e não é commitado.

export interface QuestionStat {
  seen: number;
  correct: number;
  wrong: number;
  lastCorrect: boolean;
  lastAt: string; // ISO
}

export type Progress = Record<string, QuestionStat>;

const BASE = "ai900:progress:v1";
// Chave antiga (antes de existirem perfis) — usada só para migração.
export const LEGACY_KEY = BASE;

function keyFor(profileId: string): string {
  return `${BASE}:${profileId}`;
}

export function loadProgress(profileId: string): Progress {
  try {
    const raw = localStorage.getItem(keyFor(profileId));
    return raw ? (JSON.parse(raw) as Progress) : {};
  } catch {
    return {};
  }
}

export function saveProgress(profileId: string, p: Progress): void {
  localStorage.setItem(keyFor(profileId), JSON.stringify(p));
}

export function resetProgress(profileId: string): Progress {
  localStorage.removeItem(keyFor(profileId));
  return {};
}

// Conta quantas perguntas um perfil já respondeu (para mostrar no seletor).
export function answeredCount(profileId: string): number {
  return Object.keys(loadProgress(profileId)).length;
}

// Se existir progresso da versão sem perfis, adota-o para este perfil (uma vez).
export function adoptLegacyProgress(profileId: string): void {
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy && !localStorage.getItem(keyFor(profileId))) {
    localStorage.setItem(keyFor(profileId), legacy);
    localStorage.removeItem(LEGACY_KEY);
  }
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
