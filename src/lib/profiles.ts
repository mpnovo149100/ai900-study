// Perfis locais (por browser/dispositivo). Cada pessoa cria o seu perfil com
// nome + avatar (emoji) e mantém o seu progresso ao seu ritmo. Tudo em localStorage.

import { adoptLegacyProgress, resetProgress } from "./progress";

export interface Profile {
  id: string;
  name: string;
  avatar: string; // emoji
  createdAt: string; // ISO
}

const PROFILES_KEY = "ai900:profiles:v1";
const ACTIVE_KEY = "ai900:activeProfile:v1";

// Emojis disponíveis para avatar.
export const AVATARS = [
  "🦊", "🐼", "🐧", "🦉", "🐙", "🐳", "🦄", "🐝",
  "🐢", "🦁", "🐨", "🐸", "🦖", "🦋", "🐬", "🦇",
  "🌟", "🚀", "🧠", "🎯", "🔥", "🍀", "🌈", "⚡",
  "🎧", "📚", "☕", "🍩",
];

function newId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fallback abaixo */
  }
  return `p_${Date.now().toString(36)}_${Math.floor(Math.random() * 1e6).toString(36)}`;
}

export function loadProfiles(): Profile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    return raw ? (JSON.parse(raw) as Profile[]) : [];
  } catch {
    return [];
  }
}

export function saveProfiles(list: Profile[]): void {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(list));
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProfileId(id: string | null): void {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
}

// Cria um perfil, guarda-o e devolve a lista atualizada + o perfil criado.
export function createProfile(
  name: string,
  avatar: string
): { list: Profile[]; profile: Profile } {
  const existing = loadProfiles();
  const profile: Profile = {
    id: newId(),
    name: name.trim() || "Anónimo",
    avatar: avatar || AVATARS[0],
    createdAt: new Date().toISOString(),
  };
  // Se é o primeiro perfil, herda o progresso antigo (pré-perfis).
  if (existing.length === 0) adoptLegacyProgress(profile.id);
  const list = [...existing, profile];
  saveProfiles(list);
  return { list, profile };
}

// Renomeia / muda avatar de um perfil.
export function updateProfile(
  id: string,
  patch: Partial<Pick<Profile, "name" | "avatar">>
): Profile[] {
  const list = loadProfiles().map((p) =>
    p.id === id
      ? { ...p, ...patch, name: (patch.name ?? p.name).trim() || p.name }
      : p
  );
  saveProfiles(list);
  return list;
}

// Apaga um perfil e o seu progresso.
export function deleteProfile(id: string): Profile[] {
  resetProgress(id);
  const list = loadProfiles().filter((p) => p.id !== id);
  saveProfiles(list);
  if (getActiveProfileId() === id) setActiveProfileId(null);
  return list;
}
