import { useEffect, useMemo, useRef, useState } from "react";
import { MODULES } from "../lib/modules";
import { CATEGORY_LABEL, CATEGORY_COLOR } from "../categories";

interface Props {
  // slug de um módulo a abrir (ex.: vindo de uma pergunta errada); null = nenhum
  openSlug?: string | null;
  onOpened?: () => void;
}

export function Modules({ openSlug, onOpened }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    () => MODULES[0]?.slug ?? null
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Abrir o módulo pedido de fora (link "Open study" no relatório).
  useEffect(() => {
    if (openSlug && MODULES.some((m) => m.slug === openSlug)) {
      setActiveSlug(openSlug);
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      onOpened?.();
    }
  }, [openSlug, onOpened]);

  const active = useMemo(
    () => MODULES.find((m) => m.slug === activeSlug) ?? MODULES[0] ?? null,
    [activeSlug]
  );

  if (MODULES.length === 0) {
    return (
      <div className="card">
        <p className="muted">
          No study modules yet. Add Markdown files in{" "}
          <code>src/content/modules/</code> to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="modules">
      <aside className="module-nav card">
        <span className="filter-label">Modules</span>
        <ul className="module-list">
          {MODULES.map((m) => (
            <li key={m.slug}>
              <button
                className={`module-link${m.slug === active?.slug ? " active" : ""}`}
                onClick={() => setActiveSlug(m.slug)}
                style={
                  m.categories[0]
                    ? { borderLeft: `4px solid ${CATEGORY_COLOR[m.categories[0]]}` }
                    : undefined
                }
              >
                {m.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <article className="module-content card" ref={contentRef}>
        {active && (
          <>
            {active.categories.length > 0 && (
              <div className="tags">
                {active.categories.map((c) => (
                  <span key={c} className="tag" style={{ background: CATEGORY_COLOR[c] }}>
                    {CATEGORY_LABEL[c]}
                  </span>
                ))}
              </div>
            )}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: active.html }}
            />
          </>
        )}
      </article>
    </div>
  );
}
