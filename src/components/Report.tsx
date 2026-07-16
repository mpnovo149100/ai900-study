import { useMemo } from "react";
import type { Question } from "../types";
import { CATEGORIES, CATEGORY_COLOR } from "../categories";
import type { CategoryKey } from "../categories";
import type { Progress } from "../lib/progress";

interface Props {
  queue: Question[];
  progress: Progress;
  onHome: () => void;
}

interface Row {
  key: CategoryKey;
  label: string;
  answered: number;
  correct: number;
  accuracy: number; // 0..1
}

export function Report({ queue, progress, onHome }: Props) {
  const rows = useMemo<Row[]>(() => {
    return CATEGORIES.map((c) => {
      const qs = queue.filter((q) => q.category === c.key && progress[q.id]);
      const answered = qs.length;
      const correct = qs.filter((q) => progress[q.id].lastCorrect).length;
      return {
        key: c.key,
        label: c.label,
        answered,
        correct,
        accuracy: answered ? correct / answered : 1,
      };
    }).filter((r) => r.answered > 0);
  }, [queue, progress]);

  const totalAnswered = rows.reduce((s, r) => s + r.answered, 0);
  const totalCorrect = rows.reduce((s, r) => s + r.correct, 0);
  const overall = totalAnswered ? totalCorrect / totalAnswered : 0;

  // topics to review: sorted from worst to best accuracy
  const toReview = [...rows].filter((r) => r.accuracy < 0.8).sort((a, b) => a.accuracy - b.accuracy);

  return (
    <main className="report">
      <section className="card">
        <h2>Session result</h2>
        <div className="score">
          <div className="big">{Math.round(overall * 100)}%</div>
          <div className="muted">
            {totalCorrect} / {totalAnswered} correct
          </div>
        </div>
      </section>

      <section className="card">
        <h2>By category</h2>
        <ul className="report-list">
          {rows.map((r) => (
            <li key={r.key}>
              <div className="report-row-head">
                <span>
                  <span className="cat-dot" style={{ background: CATEGORY_COLOR[r.key] }} />
                  {r.label}
                </span>
                <span className="muted">
                  {r.correct}/{r.answered} · {Math.round(r.accuracy * 100)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${r.accuracy * 100}%`,
                    background: r.accuracy < 0.6 ? "#e5484d" : r.accuracy < 0.8 ? "#f5a524" : "#30a46c",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>Topics to review</h2>
        {toReview.length === 0 ? (
          <p className="muted">Nice! Every category is above 80%. 🎉</p>
        ) : (
          <ol className="review-list">
            {toReview.map((r) => (
              <li key={r.key}>
                <strong>{r.label}</strong> — only {Math.round(r.accuracy * 100)}% correct
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="btn-row">
        <button className="primary" onClick={onHome}>
          ← Back to start
        </button>
      </div>
    </main>
  );
}
