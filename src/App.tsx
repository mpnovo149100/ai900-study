import { useMemo, useState } from "react";
import rawQuestions from "./data/questions.json";
import type { Question } from "./types";
import type { CategoryKey } from "./categories";
import { Home } from "./components/Home";
import { Study } from "./components/Study";
import { Report } from "./components/Report";
import { loadProgress, saveProgress, recordAnswer } from "./lib/progress";
import type { Progress } from "./lib/progress";

const ALL: Question[] = rawQuestions as Question[];

export type Filter =
  | { kind: "all" }
  | { kind: "category"; category: CategoryKey }
  | { kind: "review" }; // only the ones you got wrong last time

type View =
  | { name: "home" }
  | { name: "study"; queue: Question[] }
  | { name: "report"; queue: Question[] };

export default function App() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());
  const [view, setView] = useState<View>({ name: "home" });

  const start = (filter: Filter) => {
    let queue = ALL;
    if (filter.kind === "category") {
      queue = ALL.filter((q) => q.category === filter.category);
    } else if (filter.kind === "review") {
      queue = ALL.filter((q) => progress[q.id] && !progress[q.id].lastCorrect);
    }
    queue = shuffle(queue);
    if (queue.length === 0) return;
    setView({ name: "study", queue });
  };

  const onAnswer = (questionId: string, correct: boolean) => {
    // Date.now via new Date is fine in the browser (runtime, not the build script)
    const next = recordAnswer(progress, questionId, correct, new Date().toISOString());
    setProgress(next);
    saveProgress(next);
  };

  const counts = useMemo(() => {
    const byCat: Record<string, number> = {};
    for (const q of ALL) byCat[q.category] = (byCat[q.category] ?? 0) + 1;
    return { total: ALL.length, byCat };
  }, []);

  return (
    <div className="app">
      <header className="topbar">
        <h1>🧠 AI-900 · Study</h1>
        <span className="muted">{counts.total} questions in the DB</span>
      </header>

      {view.name === "home" && (
        <Home
          all={ALL}
          progress={progress}
          countsByCat={counts.byCat}
          onStart={start}
          onReset={() => setProgress(loadProgress())}
          setProgress={setProgress}
        />
      )}

      {view.name === "study" && (
        <Study
          queue={view.queue}
          progress={progress}
          onAnswer={onAnswer}
          onFinish={() => setView({ name: "report", queue: view.queue })}
          onQuit={() => setView({ name: "home" })}
        />
      )}

      {view.name === "report" && (
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
