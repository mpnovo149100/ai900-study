import type { Question } from "../types";
import { CATEGORIES, DIFFICULTY_COLOR } from "../categories";
import type { Difficulty } from "../categories";
import type { Progress } from "../lib/progress";
import { resetProgress } from "../lib/progress";
import type { Filter, DifficultyFilter } from "../App";

interface Props {
  all: Question[];
  progress: Progress;
  countsByCat: Record<string, number>;
  difficulty: DifficultyFilter;
  diffCounts: Record<string, number>;
  onDifficulty: (d: DifficultyFilter) => void;
  onStart: (f: Filter) => void;
  activeId: string;
  setProgress: (p: Progress) => void;
}

const DIFF_OPTIONS: DifficultyFilter[] = ["all", "easy", "medium", "hard"];
const DIFF_LABEL: Record<DifficultyFilter, string> = {
  all: "All",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function Home({
  all,
  progress,
  countsByCat,
  difficulty,
  diffCounts,
  onDifficulty,
  onStart,
  activeId,
  setProgress,
}: Props) {
  const answered = all.filter((q) => progress[q.id]).length;
  const wrongCount = all.filter((q) => progress[q.id] && !progress[q.id].lastCorrect).length;

  return (
    <main className="home">
      <section className="card">
        <h2>Difficulty</h2>
        <div className="diff-filter">
          {DIFF_OPTIONS.map((d) => {
            const active = difficulty === d;
            const color = d === "all" ? "var(--accent)" : DIFFICULTY_COLOR[d as Difficulty];
            return (
              <button
                key={d}
                className={`chip${active ? " active" : ""}`}
                onClick={() => onDifficulty(d)}
                style={active ? { background: color, borderColor: color, color: "#fff" } : { borderColor: color, color }}
              >
                {DIFF_LABEL[d]} ({diffCounts[d] ?? 0})
              </button>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h2>Start a session</h2>
        <div className="btn-row">
          <button className="primary" disabled={all.length === 0} onClick={() => onStart({ kind: "all" })}>
            All questions ({all.length})
          </button>
          <button
            className="warn"
            disabled={wrongCount === 0}
            onClick={() => onStart({ kind: "review" })}
            title={wrongCount === 0 ? "You haven't gotten any wrong yet" : ""}
          >
            Review wrong ({wrongCount})
          </button>
        </div>
        {difficulty !== "all" && (
          <p className="muted filter-note">
            Filtering by <strong>{DIFF_LABEL[difficulty]}</strong> difficulty.
          </p>
        )}
      </section>

      <section className="card">
        <h2>By category</h2>
        <ul className="cat-list">
          {CATEGORIES.map((c) => {
            const n = countsByCat[c.key] ?? 0;
            const done = all.filter((q) => q.category === c.key && progress[q.id]?.lastCorrect).length;
            return (
              <li key={c.key}>
                <button
                  className="cat-btn"
                  disabled={n === 0}
                  onClick={() => onStart({ kind: "category", category: c.key })}
                  style={{ borderLeft: `4px solid ${c.color}` }}
                >
                  <span className="cat-name">
                    <span className="cat-dot" style={{ background: c.color }} />
                    {c.label}
                  </span>
                  <span className="muted">
                    {done > 0 ? `${done}/${n} done` : `${c.weight} · ${n} questions`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card">
        <h2>Progress</h2>
        <p className="muted">
          {answered} of {all.length} questions answered by this profile.
        </p>
        <button
          className="ghost"
          onClick={() => {
            if (confirm("Erase all progress for this profile?")) {
              setProgress(resetProgress(activeId));
            }
          }}
        >
          Reset progress
        </button>
      </section>
    </main>
  );
}
