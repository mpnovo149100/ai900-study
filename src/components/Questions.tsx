import { useMemo, useState } from "react";
import type { Question } from "../types";
import { CATEGORIES, CATEGORY_LABEL, CATEGORY_COLOR, DIFFICULTY_COLOR } from "../categories";
import type { CategoryKey, Difficulty } from "../categories";
import type { Progress } from "../lib/progress";

interface Props {
  all: Question[];
  progress: Progress;
}

type CatFilter = CategoryKey | "all";
type DiffFilter = Difficulty | "all";

const DIFFS: DiffFilter[] = ["all", "easy", "medium", "hard"];

export function Questions({ all, progress }: Props) {
  const [cat, setCat] = useState<CatFilter>("all");
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((item) => {
      if (cat !== "all" && item.category !== cat) return false;
      if (diff !== "all" && item.difficulty !== diff) return false;
      if (q && !item.prompt.toLowerCase().includes(q) && !item.subtopic.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [all, cat, diff, query]);

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="questions">
      <section className="card">
        <div className="filter-block">
          <span className="filter-label">Domain</span>
          <div className="diff-filter">
            <button
              className={`chip${cat === "all" ? " active" : ""}`}
              onClick={() => setCat("all")}
              style={cat === "all" ? { background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" } : undefined}
            >
              All
            </button>
            {CATEGORIES.map((c) => {
              const active = cat === c.key;
              return (
                <button
                  key={c.key}
                  className={`chip${active ? " active" : ""}`}
                  onClick={() => setCat(c.key)}
                  style={
                    active
                      ? { background: c.color, borderColor: c.color, color: "#fff" }
                      : { borderColor: c.color, color: c.color }
                  }
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter-block">
          <span className="filter-label">Difficulty</span>
          <div className="diff-filter">
            {DIFFS.map((d) => {
              const active = diff === d;
              const color = d === "all" ? "var(--accent)" : DIFFICULTY_COLOR[d as Difficulty];
              return (
                <button
                  key={d}
                  className={`chip${active ? " active" : ""}`}
                  onClick={() => setDiff(d)}
                  style={active ? { background: color, borderColor: color, color: "#fff" } : { borderColor: color, color }}
                >
                  {d === "all" ? "All" : d[0].toUpperCase() + d.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        <input
          className="text-input search"
          placeholder="Search questions or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="muted result-count">
          {filtered.length} {filtered.length === 1 ? "question" : "questions"}
        </p>
      </section>

      <ul className="q-list">
        {filtered.map((item) => {
          const isOpen = open.has(item.id);
          const stat = progress[item.id];
          const color = CATEGORY_COLOR[item.category];
          return (
            <li key={item.id} className="q-item" style={{ borderLeft: `4px solid ${color}` }}>
              <button className="q-head" onClick={() => toggle(item.id)} aria-expanded={isOpen}>
                <span className="q-head-main">
                  <span className="q-tags">
                    <span className="tag" style={{ background: color }}>
                      {CATEGORY_LABEL[item.category]}
                    </span>
                    <span
                      className="tag difficulty"
                      style={{ color: DIFFICULTY_COLOR[item.difficulty], borderColor: DIFFICULTY_COLOR[item.difficulty] }}
                    >
                      {item.difficulty}
                    </span>
                    {stat && (
                      <span className={`tag status ${stat.lastCorrect ? "ok" : "bad"}`}>
                        {stat.lastCorrect ? "correct" : "review"}
                      </span>
                    )}
                  </span>
                  <span className="q-prompt">{item.prompt}</span>
                </span>
                <span className="q-caret">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="q-body">
                  <ul className="options static">
                    {item.options.map((o) => {
                      const right = item.correct.includes(o.id);
                      return (
                        <li key={o.id} className={`option${right ? " right" : ""}`}>
                          <span className="opt-key">{o.id.toUpperCase()}</span>
                          <span>{o.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="feedback ok">
                    <strong>Explanation</strong>
                    <p>{item.explanation}</p>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
