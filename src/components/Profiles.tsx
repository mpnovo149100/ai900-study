import { useState } from "react";
import type { Profile } from "../lib/profiles";
import { AVATARS } from "../lib/profiles";
import { answeredCount } from "../lib/progress";

interface Props {
  profiles: Profile[];
  activeId: string | null;
  total: number; // total de perguntas na DB
  onSelect: (id: string) => void;
  onCreate: (name: string, avatar: string) => void;
  onDelete: (id: string) => void;
  onCancel?: () => void; // voltar sem trocar (só quando já há perfil ativo)
}

export function Profiles({
  profiles,
  activeId,
  total,
  onSelect,
  onCreate,
  onDelete,
  onCancel,
}: Props) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [creating, setCreating] = useState(profiles.length === 0);

  const submit = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), avatar);
    setName("");
    setAvatar(AVATARS[0]);
    setCreating(false);
  };

  return (
    <main className="profiles">
      <section className="card">
        <h2>Who's studying?</h2>
        <p className="muted">
          Each profile keeps its own progress on this device — pick yours or create a new one.
        </p>

        {profiles.length > 0 && (
          <ul className="profile-list">
            {profiles.map((p) => {
              const done = answeredCount(p.id);
              return (
                <li key={p.id} className={`profile-card${p.id === activeId ? " active" : ""}`}>
                  <button className="profile-pick" onClick={() => onSelect(p.id)}>
                    <span className="avatar">{p.avatar}</span>
                    <span className="profile-meta">
                      <span className="profile-name">{p.name}</span>
                      <span className="muted">
                        {done} / {total} answered
                      </span>
                    </span>
                  </button>
                  <button
                    className="ghost profile-del"
                    title={`Delete ${p.name}`}
                    aria-label={`Delete ${p.name}`}
                    onClick={() => {
                      if (confirm(`Delete profile "${p.name}" and its progress? This can't be undone.`)) {
                        onDelete(p.id);
                      }
                    }}
                  >
                    🗑
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {creating ? (
        <section className="card">
          <h2>New profile</h2>
          <label className="field">
            <span className="muted">Name</span>
            <input
              className="text-input"
              value={name}
              maxLength={24}
              placeholder="e.g. Mariana"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </label>

          <div className="field">
            <span className="muted">Avatar</span>
            <div className="avatar-grid">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  className={`avatar-opt${a === avatar ? " selected" : ""}`}
                  onClick={() => setAvatar(a)}
                  aria-label={`Avatar ${a}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="btn-row end">
            {profiles.length > 0 && (
              <button className="ghost" onClick={() => setCreating(false)}>
                Cancel
              </button>
            )}
            <button className="primary" disabled={!name.trim()} onClick={submit}>
              Create profile
            </button>
          </div>
        </section>
      ) : (
        <div className="btn-row">
          <button className="primary" onClick={() => setCreating(true)}>
            + New profile
          </button>
          {onCancel && activeId && (
            <button className="ghost" onClick={onCancel}>
              Back
            </button>
          )}
        </div>
      )}
    </main>
  );
}
