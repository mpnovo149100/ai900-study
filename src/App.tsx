import { useMemo, useState } from "react";
import rawQuestions from "./data/questions.json";
import type { Question } from "./types";
import type { CategoryKey, Difficulty } from "./categories";
import { Home } from "./components/Home";
import { Study } from "./components/Study";
import { Report } from "./components/Report";
import { Profiles } from "./components/Profiles";
import { loadProgress, saveProgress, recordAnswer } from "./lib/progress";
import type { Progress } from "./lib/progress";
import {
  loadProfiles,
  getActiveProfileId,
  setActiveProfileId,
  createProfile,
  deleteProfile,
} from "./lib/profiles";
import type { Profile } from "./lib/profiles";

const ALL: Question[] = rawQuestions as Question[];

export type Filter =
  | { kind: "all" }
  | { kind: "category"; category: CategoryKey }
  | { kind: "review" }; // only the ones you got wrong last time

export type DifficultyFilter = Difficulty | "all";

type View =
  | { name: "home" }
  | { name: "study"; queue: Question[] }
  | { name: "report"; queue: Question[] };

export default function App() {
  const [profiles, setProfiles] = useState<Profile[]>(() => loadProfiles());
  const [activeId, setActiveId] = useState<string | null>(() => {
    const id = getActiveProfileId();
    // só válido se o perfil ainda existir
    return id && loadProfiles().some((p) => p.id === id) ? id : null;
  });
  const [picking, setPicking] = useState(false);

  const [progress, setProgress] = useState<Progress>(() =>
    activeId ? loadProgress(activeId) : {}
  );
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [view, setView] = useState<View>({ name: "home" });

  const activeProfile = profiles.find((p) => p.id === activeId) ?? null;

  const selectProfile = (id: string) => {
    setActiveProfileId(id);
    setActiveId(id);
    setProgress(loadProgress(id));
    setDifficulty("all");
    setView({ name: "home" });
    setPicking(false);
  };

  const onCreateProfile = (name: string, avatar: string) => {
    const { list, profile } = createProfile(name, avatar);
    setProfiles(list);
    selectProfile(profile.id);
  };

  const onDeleteProfile = (id: string) => {
    const list = deleteProfile(id);
    setProfiles(list);
    if (id === activeId) {
      setActiveId(null);
      setProgress({});
    }
  };

  // pool = questions matching the active difficulty sub-filter
  const pool = useMemo(
    () => (difficulty === "all" ? ALL : ALL.filter((q) => q.difficulty === difficulty)),
    [difficulty]
  );

  const start = (filter: Filter) => {
    let queue = pool;
    if (filter.kind === "category") {
      queue = pool.filter((q) => q.category === filter.category);
    } else if (filter.kind === "review") {
      queue = pool.filter((q) => progress[q.id] && !progress[q.id].lastCorrect);
    }
    queue = shuffle(queue);
    if (queue.length === 0) return;
    setView({ name: "study", queue });
  };

  const onAnswer = (questionId: string, correct: boolean) => {
    if (!activeId) return;
    // Date.now via new Date is fine in the browser (runtime, not the build script)
    const next = recordAnswer(progress, questionId, correct, new Date().toISOString());
    setProgress(next);
    saveProgress(activeId, next);
  };

  const counts = useMemo(() => {
    const byCat: Record<string, number> = {};
    for (const q of pool) byCat[q.category] = (byCat[q.category] ?? 0) + 1;
    return { total: pool.length, byCat };
  }, [pool]);

  const diffCounts = useMemo(() => {
    const byDiff: Record<string, number> = { all: ALL.length };
    for (const q of ALL) byDiff[q.difficulty] = (byDiff[q.difficulty] ?? 0) + 1;
    return byDiff;
  }, []);

  // Sem perfil ativo, ou a trocar de perfil → mostra o seletor.
  const showProfiles = !activeId || picking;

  return (
    <div className="app">
      <header className="topbar">
        <h1>🧠 AI-900 · Study</h1>
        {activeProfile && !showProfiles ? (
          <button
            className="profile-chip"
            title="Switch profile"
            onClick={() => setPicking(true)}
          >
            <span className="avatar sm">{activeProfile.avatar}</span>
            <span>{activeProfile.name}</span>
          </button>
        ) : (
          <span className="muted">{ALL.length} questions in the DB</span>
        )}
      </header>

      {showProfiles && (
        <Profiles
          profiles={profiles}
          activeId={activeId}
          total={ALL.length}
          onSelect={selectProfile}
          onCreate={onCreateProfile}
          onDelete={onDeleteProfile}
          onCancel={activeId ? () => setPicking(false) : undefined}
        />
      )}

      {!showProfiles && view.name === "home" && (
        <Home
          all={pool}
          progress={progress}
          countsByCat={counts.byCat}
          difficulty={difficulty}
          diffCounts={diffCounts}
          onDifficulty={setDifficulty}
          onStart={start}
          activeId={activeId!}
          setProgress={setProgress}
        />
      )}

      {!showProfiles && view.name === "study" && (
        <Study
          queue={view.queue}
          progress={progress}
          onAnswer={onAnswer}
          onFinish={() => setView({ name: "report", queue: view.queue })}
          onQuit={() => setView({ name: "home" })}
        />
      )}

      {!showProfiles && view.name === "report" && (
        <Report
          queue={view.queue}
          progress={progress}
          onHome={() => setView({ name: "home" })}
        />
      )}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  // Fisher–Yates, random enough for studying (uses Math.random in the browser)
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
