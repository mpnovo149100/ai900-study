import type { Question } from "../types";
import { CATEGORIES } from "../categories";
import type { Progress } from "../lib/progress";
import { resetProgress } from "../lib/progress";
import type { Filter } from "../App";

interface Props {
  all: Question[];
  progress: Progress;
  countsByCat: Record<string, number>;
  onStart: (f: Filter) => void;
  onReset: () => void;
  setProgress: (p: Progress) => void;
}

export function Home({ all, progress, countsByCat, onStart, setProgress }: Props) {
  const answered = Object.keys(progress).length;
  const wrongCount = all.filter((q) => progress[q.id] && !progress[q.id].lastCorrect).length;

  return (
    <main className="home">
      <section className="card">
        <h2>Start a session</h2>
        <div className="btn-row">
          <button className="primary" onClick={() => onStart({ kind: "all" })}>
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
      </section>

      <section className="card">
        <h2>By category</h2>
        <ul className="cat-list">
          {CATEGORIES.map((c) => {
            const n = countsByCat[c.key] ?? 0;
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
                    {c.weight} · {n} questions
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
          {answered} of {all.length} questions answered on this device.
        </p>
        <button
          className="ghost"
          onClick={() => {
            if (confirm("Erase all progress saved on this device?")) {
              setProgress(resetProgress());
            }
          }}
        >
          Reset progress
        </button>
      </section>
    </main>
  );
}
