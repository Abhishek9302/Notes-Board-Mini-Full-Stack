'use client';

import { useState } from "react";

export default function NoteForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (payload: { title: string; body: string }) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      onSubmit({ title: title.trim(), body: body.trim() });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          style={{ width: "100%", padding: 8, marginTop: 4 }}
        />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={busy} style={{ padding: "8px 16px", cursor: "pointer" }}>
          {busy ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
