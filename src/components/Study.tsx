import { useState } from "react";
import type { Question } from "../types";
import { CATEGORY_LABEL, CATEGORY_COLOR, DIFFICULTY_COLOR } from "../categories";
import { isCorrect } from "../lib/grading";
import type { Progress } from "../lib/progress";

interface Props {
  queue: Question[];
  progress: Progress;
  onAnswer: (questionId: string, correct: boolean) => void;
  onFinish: () => void;
  onQuit: () => void;
}

export function Study({ queue, onAnswer, onFinish, onQuit }: Props) {
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const q = queue[idx];
  const multi = q.type === "multi";
  const correct = checked && isCorrect(q, chosen);

  const toggle = (optId: string) => {
    if (checked) return;
    if (multi) {
      setChosen((c) => (c.includes(optId) ? c.filter((x) => x !== optId) : [...c, optId]));
    } else {
      setChosen([optId]);
    }
  };

  const check = () => {
    if (chosen.length === 0) return;
    setChecked(true);
    onAnswer(q.id, isCorrect(q, chosen));
  };

  const next = () => {
    if (idx + 1 >= queue.length) {
      onFinish();
      return;
    }
    setIdx(idx + 1);
    setChosen([]);
    setChecked(false);
  };

  return (
    <main className="study">
      <div className="study-head">
        <button className="ghost" onClick={onQuit}>
          ← Quit
        </button>
        <span className="muted">
          {idx + 1} / {queue.length}
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${(idx / queue.length) * 100}%` }} />
      </div>

      <section className="card question">
        <div className="tags">
          <span className="tag" style={{ background: CATEGORY_COLOR[q.category] }}>
            {CATEGORY_LABEL[q.category]}
          </span>
          <span
            className="tag difficulty"
            style={{ color: DIFFICULTY_COLOR[q.difficulty], borderColor: DIFFICULTY_COLOR[q.difficulty] }}
          >
            {q.difficulty}
          </span>
          <span className="tag ghost-tag">{q.subtopic}</span>
          {multi && <span className="tag ghost-tag">multiple choice</span>}
        </div>
        <h2 className="prompt">{q.prompt}</h2>

        <ul className="options">
          {q.options.map((opt) => {
            const selected = chosen.includes(opt.id);
            const isRight = q.correct.includes(opt.id);
            let cls = "option";
            if (checked) {
              if (isRight) cls += " right";
              else if (selected) cls += " wrong";
            } else if (selected) {
              cls += " selected";
            }
            return (
              <li key={opt.id}>
                <button className={cls} onClick={() => toggle(opt.id)} disabled={checked}>
                  <span className="opt-key">{opt.id.toUpperCase()}</span>
                  <span>{opt.text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {checked && (
          <div className={`feedback ${correct ? "ok" : "bad"}`}>
            <strong>{correct ? "✓ Correct" : "✗ Incorrect"}</strong>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className="btn-row end">
          {!checked ? (
            <button className="primary" disabled={chosen.length === 0} onClick={check}>
              Check
            </button>
          ) : (
            <button className="primary" onClick={next}>
              {idx + 1 >= queue.length ? "See report" : "Next →"}
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
